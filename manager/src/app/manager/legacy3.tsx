'use client';

import React, { useState, useEffect, useRef } from 'react';
import * as Ably from 'ably';
import { AblyProvider, ChannelProvider, useChannel, useConnectionStateListener } from 'ably/react';
import { useRouter } from 'next/navigation';

const client = new Ably.Realtime({ key: 'DbbPfw.AkgsiA:b6TbDNYq1aUmyttQ_oo_Q7wc_qVcpwHKdKPt45vkjU0' });

export default function ManagerApp() {
  const [activeChatbotId, setActiveChatbotId] = useState<number | null>(null);
  const [chatbots, setChatbots] = useState<{ id: number, name: string, lastInput?: string, hasNewMessage?: boolean }[]>([]);
  const [userInput, setUserInput] = useState<string>('');
  const [reply, setReply] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    fetch('/api/chatbots')
      .then(response => response.json())
      .then(data => setChatbots(data))
      .catch(error => console.error('Error fetching chatbots:', error));
  }, []);

  const handleChatbotToggle = (id: number) => {
    setActiveChatbotId(activeChatbotId === id ? null : id);
    setChatbots(chatbots.map(chatbot =>
      chatbot.id === id ? { ...chatbot, hasNewMessage: false } : chatbot
    ));
  };

  const handleBackButtonClick = () => {
    router.back();
  };

  const handleSendMessage = async () => {
    if (userInput.trim() !== '') {
      try {
        const response = await fetch(`/api/chat`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: userInput }),
        });
        const result = await response.json();
        setReply(result.reply);
      } catch (error) {
        console.error('Error sending message:', error);
      }
      setUserInput('');
    }
  };

  return (
    <AblyProvider client={client}>
      <div className="flex flex-col h-screen">
        <div className="w-full p-4 bg-gray-100">
          <h2 className="text-lg font-semibold mb-4">Chatbot Manager</h2>
          <button
            onClick={handleBackButtonClick}
            className="mb-4 px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 focus:outline-none"
          >
            Back
          </button>
          <div className="space-y-2">
            {chatbots.map(chatbot => (
              <div key={chatbot.id} className="border border-gray-300 rounded">
                <button
                  className={`w-full p-4 text-left font-semibold ${activeChatbotId === chatbot.id ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                  onClick={() => handleChatbotToggle(chatbot.id)}
                >
                  {chatbot.name}
                  {chatbot.lastInput && (
                    <span className="ml-2 text-sm text-gray-500"> - {chatbot.lastInput}</span>
                  )}
                  {chatbot.hasNewMessage && (
                    <span className="ml-2 px-2 py-1 text-xs text-white bg-red-500 rounded-full">New</span>
                  )}
                </button>
                {activeChatbotId === chatbot.id && (
                  <div className="p-4 bg-white">
                    <ChannelProvider channelName={`chatbot-${chatbot.id}`}>
                      <ManagerChat chatbotId={chatbot.id} />
                    </ChannelProvider>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </AblyProvider>
  );
}

interface Message {
  name: string;
  data: string;
}

function ManagerChat({ chatbotId }: { chatbotId: number }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useConnectionStateListener('connected', () => {
    console.log('Connected to Ably!');
  });

  const { channel } = useChannel(`chatbot-${chatbotId}`, (message) => {
    if (message.data && typeof message.data === 'object') {
      setMessages(previousMessages => [
        ...previousMessages,
        message.data as Message
      ]);
    } else {
      console.error('Received message with unexpected data format:', message.data);
    }
  });

  const sendMessage = () => {
    if (input.trim() !== '') {
      console.log('Sending message:', input);
      channel.publish('manager-message', { name: 'Manager', data: input });
      setInput('');
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col max-w-md mx-auto bg-gray-100">
      <div className="flex-1 overflow-y-auto p-4 bg-white max-h-64">
        {messages.map((message, index) => (
          <div key={index} className="mb-2">
            <strong>{message.name}:</strong> {message.data}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 bg-white flex items-center">
        <input
          type="text"
          className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={sendMessage}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
        >
          Send
        </button>
      </div>
    </div>
  );
}

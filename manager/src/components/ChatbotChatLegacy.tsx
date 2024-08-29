'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useChannel, useConnectionStateListener } from 'ably/react';

interface Message {
  name: string;
  data: string;
}

interface ChatbotChatProps {
  chatbotId: number;
}

export default function ChatbotChat({ chatbotId }: ChatbotChatProps) {
  const [chatbotName, setChatbotName] = useState<string>(''); // 챗봇 이름 상태 추가
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useConnectionStateListener('connected', () => {
    console.log('Connected to Ably!');
  });

  const { channel } = useChannel(`chatbot-${chatbotId}`, (message) => {
    if (message.data && typeof message.data === 'object') {
      setMessages((previousMessages) => [
        ...previousMessages,
        message.data as Message
      ]);
    } else {
      console.error('Received message with unexpected data format:', message.data);
    }
  });

  // 챗봇 이름을 가져오는 함수
  const fetchChatbotName = async () => {
    try {
      const response = await fetch(`/api/chatbots/${chatbotId}`);
      if (response.ok) {
        const data = await response.json();
        setChatbotName(data.name);
      } else {
        console.error('Failed to fetch chatbot name');
      }
    } catch (error) {
      console.error('Error fetching chatbot name:', error);
    }
  };

  useEffect(() => {
    fetchChatbotName(); // 컴포넌트 마운트 시 챗봇 이름 가져오기
  }, [chatbotId]);

  const sendMessage = () => {
    if (input.trim() !== '') {
      channel.publish('chatbot-message', { name: 'User', data: input });
      setInput('');
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-gray-100">
      <div className="bg-blue-500 text-white p-4 flex items-center">
        <h1 className="text-lg font-semibold">{chatbotName} Chat</h1> {/* 챗봇 이름 표시 */}
      </div>

      <div className="flex-1 overflow-y-auto p-4 bg-white">
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
          onKeyDown={(e) => {
            if (e.key === 'Enter') sendMessage();
          }}
        />
        <button
          onClick={sendMessage}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
}

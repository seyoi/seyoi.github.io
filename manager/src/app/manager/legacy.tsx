'use client';

import { useEffect, useState } from 'react';
import * as Ably from 'ably';
import { AblyProvider, useChannel, useConnectionStateListener } from 'ably/react';

const client = new Ably.Realtime({ key: 'DbbPfw.AkgsiA:b6TbDNYq1aUmyttQ_oo_Q7wc_qVcpwHKdKPt45vkjU0' });

export default function ManagerPage() {
  const [chatbots, setChatbots] = useState<{ id: string, name: string }[]>([]);
  const [activeChatbot, setActiveChatbot] = useState<string | null>(null);
  const [messages, setMessages] = useState<{ [key: string]: any[] }>({});

  useConnectionStateListener('connected', () => {
    console.log('Connected to Ably!');
  });

  const fetchChatbots = async () => {
    try {
      const response = await fetch('/api/chatbots');
      const data = await response.json();
      setChatbots(data);
      if (data.length > 0) {
        setActiveChatbot(data[0].id.toString());
      }
    } catch (error) {
      console.error('Failed to fetch chatbots:', error);
    }
  };

  useEffect(() => {
    fetchChatbots();
  }, []);

  useEffect(() => {
    if (activeChatbot) {
      const { channel } = useChannel(`chatbot-${activeChatbot}`, (message) => {
        setMessages((prevMessages) => ({
          ...prevMessages,
          [activeChatbot]: [...(prevMessages[activeChatbot] || []), message],
        }));
      });

      return () => {
        channel.unsubscribe();
      };
    }
  }, [activeChatbot]);

  const handleChatbotSelect = (chatbotId: string) => {
    setActiveChatbot(chatbotId);
  };

  const respondToChatbot = (response: string) => {
    if (activeChatbot && response.trim() !== '') {
      const channel = client.channels.get(`chatbot-${activeChatbot}`);
      channel.publish('manager-response', response);
    }
  };

  return (
    <AblyProvider client={client}>
      <div className="flex flex-col h-screen max-w-md mx-auto bg-gray-100">
        <div className="bg-blue-500 text-white p-4 flex items-center">
          <h1 className="text-lg font-semibold">Manager Chat</h1>
        </div>

        <div className="bg-gray-200 p-2 flex space-x-2">
          {chatbots.map((chatbot) => (
            <button
              key={chatbot.id}
              onClick={() => handleChatbotSelect(chatbot.id.toString())}
              className={`px-3 py-1 rounded ${
                chatbot.id.toString() === activeChatbot ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'
              }`}
            >
              {chatbot.name}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-4 bg-white">
          {(messages[activeChatbot!] || []).map((message, index) => (
            <div key={index} className="mb-2">
              <strong>{message.name}:</strong> {message.data}
            </div>
          ))}
        </div>

        <div className="p-4 bg-white flex items-center">
          <input
            type="text"
            className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type a response..."
            onKeyDown={(e) => {
              if (e.key === 'Enter') respondToChatbot(e.currentTarget.value);
            }}
          />
          <button
            onClick={() => respondToChatbot('Hello! How can I assist you today?')}
            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
          >
            Respond
          </button>
        </div>
      </div>
    </AblyProvider>
  );
}

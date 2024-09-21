'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation'; // Use next/navigation to access URL params
import axios from 'axios';

interface ChatMessage {
  sender: 'manager' | 'chatbot' | 'user';
  content: string;
  timestamp: string;
}

export default function ChatPage() {
  const { id: chatbotId } = useParams<{ id: string }>(); // Access the dynamic route parameter
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    if (!chatbotId) return;

    // Fetch initial messages
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/get_conversation/${chatbotId}`);
        setMessages(response.data.messages);
      } catch (error) {
        console.error('Error fetching chat messages:', error);
      }
    };

    fetchMessages();

    // Poll for new messages periodically
    const interval = setInterval(fetchMessages, 5000); // Poll every 5 seconds

    return () => {
      clearInterval(interval); // Clear interval on component unmount
    };
  }, [chatbotId]);

  const handleSend = async () => {
    if (input.trim() === '') return;

    const newMessage: ChatMessage = {
      sender: 'user',
      content: input,
      timestamp: new Date().toISOString()
    };

    try {
      await axios.post('http://127.0.0.1:8000/api/send_message', {
        channel_id: `chat-${chatbotId}`,
        message: newMessage
      });
      setInput('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto bg-gray-100">
      <div className="flex-1 overflow-y-auto p-4 bg-white">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-4 p-3 rounded-lg ${msg.sender === 'user' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}
          >
            <div className="text-sm text-gray-500 mb-1">
              {new Date(msg.timestamp).toLocaleTimeString()}
            </div>
            <p>{msg.content}</p>
          </div>
        ))}
      </div>
      <div className="p-4 bg-white flex items-center border-t border-gray-300">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-2 border border-gray-300 rounded-md mr-2"
        />
        <button
          onClick={handleSend}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Send
        </button>
      </div>
    </div>
  );
}

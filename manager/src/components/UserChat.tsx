'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useChannel, useConnectionStateListener } from 'ably/react';

interface Message {
  name: string;
  data: string;
}

interface UserChatProps {
  userId: number;
}

export default function UserChat({ userId }: UserChatProps) {
  const [userName, setUserName] = useState<string>(''); // 유저 이름 상태 추가
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useConnectionStateListener('connected', () => {
    console.log('Connected to Ably!');
  });

  const { channel } = useChannel(`user-${userId}`, (message) => {
    if (message.data && typeof message.data === 'object') {
      setMessages((previousMessages) => [
        ...previousMessages,
        message.data as Message
      ]);
    } else {
      console.error('Received message with unexpected data format:', message.data);
    }
  });

  // 유저 이름을 가져오는 함수
  const fetchUserName = async () => {
    try {
      const response = await fetch(`/api/users/${userId}`);
      if (response.ok) {
        const data = await response.json();
        setUserName(data.name);
      } else {
        console.error('Failed to fetch user name');
      }
    } catch (error) {
      console.error('Error fetching user name:', error);
    }
  };

  useEffect(() => {
    fetchUserName(); // 컴포넌트 마운트 시 유저 이름 가져오기
  }, [userId]);

  const sendMessage = async () => {
    if (input.trim() !== '') {
      channel.publish('user-message', { name: 'Manager', data: input });
      setInput('');
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-gray-100">
      <div className="bg-blue-500 text-white p-4 flex items-center">
        <h1 className="text-lg font-semibold">{userName} Chat</h1> {/* 유저 이름 표시 */}
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

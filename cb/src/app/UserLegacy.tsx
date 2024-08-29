'use client';
import React, { useState } from 'react';
import * as Ably from 'ably';
import { AblyProvider, ChannelProvider, useChannel, useConnectionStateListener } from 'ably/react';

// Connect to Ably using the AblyProvider component and your API key
const client = new Ably.Realtime({ key: 'DbbPfw.AkgsiA:b6TbDNYq1aUmyttQ_oo_Q7wc_qVcpwHKdKPt45vkjU0' });

export default function UserApp() {
  return (
    <AblyProvider client={client}>
      <ChannelProvider channelName="chat-room"> {/* Ensure ChannelProvider is here */}
        <UserChat />
      </ChannelProvider>
    </AblyProvider>
  );
}

function UserChat() {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState<string>('');

  useConnectionStateListener('connected', () => {
    console.log('Connected to Ably!');
  });

  // Subscribe to the room and listen for incoming messages
  const { channel } = useChannel('chat-room', (message) => {
    setMessages(previousMessages => [...previousMessages, message]);
  });

  const sendMessage = () => {
    if (input.trim() !== '') {
      channel.publish('user-message', input);
      // setMessages(prev => [...prev, { id: Date.now().toString(), name: 'User', data: input }]);
      setInput('');
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-gray-100">
      {/* Top Bar with Menu Button */}
      <div className="bg-blue-500 text-white p-4 flex items-center">
        <button className="mr-2 text-white hover:bg-blue-600 p-2 rounded">
          ☰
        </button>
        <h1 className="text-lg font-semibold">User Chat</h1>
      </div>

      {/* Chat Messages Display */}
      <div className="flex-1 overflow-y-auto p-4 bg-white">
        {messages.map((message, index) => (
          <div key={index} className="mb-2">
            <strong>{message.name}:</strong> {message.data}
          </div>
        ))}
      </div>

      {/* Input Field */}
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
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
        >
          Send
        </button>
      </div>
    </div>
  );
}

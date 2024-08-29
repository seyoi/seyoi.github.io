'use client';

import { useState, useEffect } from 'react';
import { useChannel } from 'ably/react';
import Ably from 'ably';

interface Chatbot {
  name: string;
}

interface ChatbotChatProps {
  chatbot: Chatbot;
  chatbotId: string;
}

const ChatbotChat = ({ chatbot, chatbotId }: ChatbotChatProps) => {
  const [input, setInput] = useState<string>('');
  const [messages, setMessages] = useState<any[]>([]);

  // Access channel and potential error
  const { channel } = useChannel(`chatbot-${chatbotId}`);

  useEffect(() => {
    const handleMessage = (message: Ably.Message) => {
      if (message.data) {
        setMessages((prevMessages) => [...prevMessages, message.data]);
      } else {
        console.error('Received message with unexpected data format:', message.data);
      }
    };

    if (channel) {
      channel.subscribe(handleMessage);
      return () => {
        channel.unsubscribe(handleMessage);
      };
    }
  }, [channel]);

  const handleSend = async () => {
    if (input.trim()) {
      try {
        // Send user message to the FastAPI backend
        const response = await fetch('/api/chat/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            channel_id: chatbotId,
            message: {
              sender: 'user',
              content: input,
              timestamp: new Date().toISOString(),
            },
          }),
        });

        const data = await response.json();

        // Update messages with both user input and chatbot response
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: 'user', content: input },
          { sender: 'chatbot', content: data.reply },
        ]);

        setInput('');
      } catch (publishError) {
        console.error('Error publishing message:', publishError);
      }
    }
  };

  return (
    <div className="flex flex-col h-screen p-4 bg-gray-100">
      <h2 className="text-xl font-semibold mb-4">{chatbot.name}</h2>
      <div className="flex-1 overflow-y-auto p-4 bg-white border rounded mb-4 max-h-96">
        {messages.map((msg, index) => (
          <div key={index} className={`mb-2 ${msg.sender === 'chatbot' ? 'text-blue-500' : ''}`}>
            {msg.sender === 'chatbot' ? 'Chatbot: ' : 'You: '}
            {msg.content}
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message"
          className="flex-1 border rounded p-2 mr-2"
        />
        <button
          onClick={handleSend}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatbotChat;

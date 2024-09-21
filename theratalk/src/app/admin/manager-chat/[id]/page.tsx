'use client'
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import Ably from 'ably';

interface ChatMessage {
  sender: 'manager' | 'chatbot' | 'user';
  content: string;
//   timestamp: string;
}

export default function ManagerChatPage() {
  const { id: chatbotId } = useParams<{ id: string }>();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const router = useRouter();

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/get_conversation/chat-${chatbotId}`);
      if (response.status === 200) {
        setMessages(response.data.messages);
      } else {
        console.error('Unexpected response status:', response.status);
      }
    } catch (error) {
      console.error('Error fetching chat messages:');
    }
  };
  useEffect(() => {
    console.log('shit')
    if (!chatbotId) return;

    // Ably setup
    const ably = new Ably.Realtime({ key: process.env.NEXT_PUBLIC_ABLY_API_KEY, });
   
    const channel = ably.channels.get(`chat-${chatbotId}`);
    

    // Subscribe to new messages
    const onMessageReceived = (message: any) => {
        console.log('Received message:', message.data);
        setMessages((prevMessages) => [...prevMessages, message.data]);
    };

    channel.subscribe('message', onMessageReceived);

    
    // Fetch initial messages
   

    fetchMessages();
    
    return () => {
        channel.unsubscribe('message', onMessageReceived);  // Clean up 구독
        // ably.close();  // Ably 연결 종료
    };

      
   
},[chatbotId]);

  const handleSend = async () => {
    if (input.trim() === '') return;

    const newMessage: ChatMessage = {
      sender: 'manager',
      content: input,
    //   timestamp: new Date().toISOString()
    };

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/send_manager_message', {
        channel_id: `chat-${chatbotId}`,
        message: newMessage
      });
      if (response.status === 200) {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setInput('');
      } else {
        console.error('Unexpected response status:', response.status);
      }
    } catch (error) {
      console.error('Error sending message:');
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-3xl mx-auto bg-gray-100">
      <div className="flex-1 overflow-y-auto p-4 bg-white shadow-md rounded-t-lg">
        {messages.length === 0 ? (
          <p className="text-center text-gray-500">No messages yet</p>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-4 p-3 rounded-lg ${msg.sender === 'manager' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}
            >
              {/* <div className="text-sm text-gray-500 mb-1">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </div> */}
              <p>{msg.content}</p>
            </div>
          ))
        )}
      </div>
      <div className="p-4 bg-white flex items-center border-t border-gray-300">
        <button
          onClick={() => router.back()}
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 mr-4"
        >
          Back
        </button>
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

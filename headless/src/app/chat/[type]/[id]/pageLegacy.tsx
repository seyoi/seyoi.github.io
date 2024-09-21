'use client'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Ably from 'ably';
import { Dialog } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';

const ChatPage = () => {
  const router = useRouter();
  const { id } = router.query; // Get the chatbot ID from the query parameters
  const [messages, setMessages] = useState<string[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (!id) return;

    const ably = new Ably.Realtime('DbbPfw.AkgsiA:b6TbDNYq1aUmyttQ_oo_Q7wc_qVcpwHKdKPt45vkjU0');
    const channel = ably.channels.get(`chat-${id}`);

    // Subscribe to messages from the chatbot via Ably
    channel.subscribe('message', (msg) => {
      setMessages((prevMessages) => [...prevMessages, `Chatbot: ${msg.data}`]);
    });

    return () => {
      channel.unsubscribe();
      ably.close();
    };
  }, [id]);

  const sendMessage = async () => {
    if (!id) return;

    // Send the user's message to the backend
    const response = await fetch(`/api/chatbots/${id}/send_message`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: inputMessage })
    });
    
    const data = await response.json();

    // Update the messages with the user's input
    setMessages((prevMessages) => [...prevMessages, `User: ${inputMessage}`]);
    setInputMessage('');
  };

  const handleClose = () => {
    setOpen(false);
    router.back(); // Navigate back to the previous page or handle as needed
  };

  if (!id) return <p>Loading...</p>; // Handle loading state

  return (
    <Dialog open={open} onClose={handleClose} className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 text-center">
        <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Chat
            </h3>
            <button onClick={handleClose} className="text-gray-500 hover:text-gray-700">
              <XIcon className="w-6 h-6" />
            </button>
          </div>
          <div className="mt-2">
            <div className="space-y-4">
              {messages.map((msg, index) => (
                <p key={index}>{msg}</p>
              ))}
            </div>
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message..."
              className="w-full mt-4 px-4 py-2 border rounded-md"
            />
            <button
              onClick={sendMessage}
              className="w-full mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default ChatPage;

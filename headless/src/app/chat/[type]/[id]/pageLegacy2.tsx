'use client'
import React, { useEffect, useState } from 'react';
import Ably from 'ably';
import { Dialog } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import { useParams } from 'next/navigation';

const ChatPage = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [open, setOpen] = useState(true);
  const { id: chatbotId } = useParams<{ id: string }>();

  useEffect(() => {
    if (!chatbotId) return;

    const ably = new Ably.Realtime('DbbPfw.AkgsiA:b6TbDNYq1aUmyttQ_oo_Q7wc_qVcpwHKdKPt45vkjU0');
    const channel = ably.channels.get(`chat-${chatbotId}`);

    channel.subscribe('message', (msg) => {
      setMessages((prevMessages) => [...prevMessages, `Chatbot: ${msg.data}`]);
    });

    return () => {
      channel.unsubscribe();
      // ably.close();
    };
  }, [chatbotId]);

  const sendMessage = async () => {
    if (!chatbotId) return;

    const response = await fetch(`http://127.0.0.1:8000/api/chatbots/${chatbotId}/send_message`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: inputMessage })
    });

    const data = await response.json();
    setMessages((prevMessages) => [...prevMessages, `User: ${inputMessage}`]);
    setInputMessage('');
  };

  const handleClose = () => {
    setOpen(false);
    // Optionally navigate back or handle closure
  };

  if (!chatbotId) return <p>Loading...</p>;

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

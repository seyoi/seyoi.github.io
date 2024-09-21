'use client';
import React, { useEffect, useState } from 'react';
import Ably from 'ably';
import { useParams } from 'next/navigation';
import 'daisyui/dist/full.css'; // Import DaisyUI styles
import axios from 'axios';


const ChatPage = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [open, setOpen] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const { id: chatbotId } = useParams<{ id: string }>();
  const { type: speaker } = useParams<{ type: string }>();
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/create-user?chatbot_id=${chatbotId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        setUserId(data.user_id);
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };
  
    if (chatbotId) {
      fetchUserId();
    }
  }, [chatbotId]);
  

  useEffect(() => {
    // if (!chatbotId || !userId) return;

    const ably = new Ably.Realtime('DbbPfw.AkgsiA:b6TbDNYq1aUmyttQ_oo_Q7wc_qVcpwHKdKPt45vkjU0');
    const channel = ably.channels.get(`chat-${chatbotId}`);

    channel.subscribe('message', (msg) => {
      console.log('Received message from Ably:', msg.data); // Debugging line
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: msg.data.role, content: msg.data.content }
      ]);
    });

    return () => {
      channel.unsubscribe();
      // Ensure the connection is closed if no longer needed
      // ably.close();
    };
  }, [chatbotId]);

  const sendMessage = async () => {
    // if (!chatbotId || !inputMessage || !userId) return;
  
    const message = {
      message: inputMessage,
      role: speaker // Pass the speaker role (user, manager)
    };
  
    try {
      await axios.post(
        `http://127.0.0.1:8000/api/chatbots/${chatbotId}/send_message`,
        { ...message, user_id: userId },
        { params: { role: speaker } } // Add role as query parameter
      );
  
      // Clear the input field and add the message to local state
      setMessages((prevMessages) => [...prevMessages, message]);
      // setInputMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      
    }
  };
  

  const handleClose = () => {
    setOpen(false);
    // Optionally navigate back or handle closure
  };

  if (!chatbotId=== null) return <p>Loading...</p>;

  return (
    <div className={`fixed inset-0 z-50 overflow-y-auto ${open ? 'block' : 'hidden'}`}>
      <div className="flex items-center justify-center min-h-screen px-4 text-center">
        <div className="modal modal-open">
          <div className="modal-box">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Chat
              </h3>
              <button onClick={handleClose} className="btn btn-square btn-sm">
                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M6.293 4.293a1 1 0 011.414 0L10 5.586l2.293-1.293a1 1 0 111.414 1.414L11.414 7l2.293 2.293a1 1 0 01-1.414 1.414L10 8.414l-2.293 2.293a1 1 0 01-1.414-1.414L8.586 9 6.293 6.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            <div className="mt-2 space-y-4">
              {messages.map((msg, index) => (
                <p key={index} className={msg.role === 'chatbot' ? 'text-blue-500' : msg.role === 'manager' ? 'text-green-500' : 'text-gray-900'}>
                  {msg.role}: {msg.content}
                </p>
              ))}
            </div>
            <div className="mt-4">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                className="input input-bordered w-full"
              />
              <button
                onClick={sendMessage}
                className="btn btn-primary w-full mt-2"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;

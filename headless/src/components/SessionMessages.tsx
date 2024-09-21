import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Ably from 'ably';

// Ably configuration (make sure to replace with your actual API key)
const ably = new Ably.Realtime('DbbPfw.AkgsiA:b6TbDNYq1aUmyttQ_oo_Q7wc_qVcpwHKdKPt45vkjU0'); // Replace with your Ably API key

interface Message {
  role: 'manager' | 'chatbot';
  message: string;
}

const SessionMessages = ({ session, chatbotId, sessionId }: any) => {
  const [inputMessage, setInputMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [messages, setMessages] = useState<Message[]>(session.messages || []);

  useEffect(() => {
    // Subscribe to Ably channel
    const channel = ably.channels.get(`chat-${chatbotId}`);
    channel.subscribe('message', (message):any => {
      setMessages(prevMessages => [...prevMessages, message.data]);
      console.log(messages)
    });

    // Cleanup subscription on unmount
    return () => {
      channel.unsubscribe();
    };
  }, [chatbotId]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    setSending(true);

    try {
      await axios.post(
        `http://127.0.0.1:8000/api/chatbots/${chatbotId}/manager_send_message`,
        {
          message: inputMessage, // Request body
        },
        {
          params: {
            user_id: session.user_id, // Query parameter
            session_id: sessionId // Query parameter
          }
        }
      );

      // Clear the input field
      setInputMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setSending(false);
    }
  };

  return (
    <div>
      <ul className="border p-2 rounded bg-gray-50 max-h-64 overflow-y-auto">
        {messages.length > 0 ? (
          messages.map((msg: any, index: number) => (
            <li
              key={index}
              className={`p-2 ${msg.role === 'manager'
                ? 'text-green-600'
                : msg.role === 'chatbot'
                ? 'text-blue-600'
                : 'text-gray-600'
              }`}
            >
              <strong>{msg.role}:</strong> {msg.message}
            </li>
          ))
        ) : (
          <li>No messages available</li>
        )}
      </ul>
      <div className="mt-4">
        <textarea
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type a message as Manager..."
          className="textarea textarea-bordered w-full"
          rows={3}
        />
        <button
          onClick={handleSendMessage}
          className="btn btn-primary w-full mt-2"
          disabled={sending}
        >
          {sending ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  );
};

export default SessionMessages;

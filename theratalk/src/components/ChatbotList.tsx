// components/ChatbotList.tsx
'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import DataLearning from './DataLearning';
import ExcelEdit from './ExcelEdit';

interface Chatbot {
  _id: string;
  name: string;
}

export default function ChatbotList() {
  const [chatbots, setChatbots] = useState<Chatbot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedChatbotId, setSelectedChatbotId] = useState<string | null>(null);

  useEffect(() => {
    const fetchChatbots = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/chatbots');
        setChatbots(response.data);
      
      } catch (error) {
        console.error('Error fetching chatbots:', error);
        setError('Failed to fetch chatbots.');
      } finally {
        setLoading(false);
      }
    };

    fetchChatbots();

  }, []);
  
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/chatbots/${id}`);
      setChatbots(chatbots.filter(chatbot => chatbot._id !== id));
      setError(null); // Clear any previous error message
    } catch (error) {
      console.error('Error deleting chatbot:', error);
      setError('Failed to delete chatbot.');
    }
  };

  const handleUserChat = (id: string) => {
    window.open(`/user-chat/${id}`, '_blank');
  };

  const handleManagerChat = (id: string) => {
    window.open(`/admin/manager-chat/${id}`, '_blank');
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}
      <ul className="list-disc">
        {chatbots.map(chatbot => (
          <li key={chatbot._id} className="mb-2 flex items-center justify-between">
            <span>{chatbot.name}</span>
            <div>
              <button
                onClick={() => handleDelete(chatbot._id)}
                className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 mr-2"
              >
                Delete
              </button>
              <button
                onClick={() => handleUserChat(chatbot._id)}
                className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 mr-2"
              >
                User Chat
              </button>
              <button
                onClick={() => handleManagerChat(chatbot._id)}
                className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Manager Chat
              </button>
              <button
                onClick={() => setSelectedChatbotId(chatbot._id)}
                className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 ml-2"
              >
                Data Learning
              </button>
              <ExcelEdit chatbotId={chatbot._id}/>
            </div>
          </li>
        ))}
      </ul>
      {selectedChatbotId && <DataLearning chatbotId={selectedChatbotId} />}
   <div>
    
   </div>
   
    </div>
  );
}

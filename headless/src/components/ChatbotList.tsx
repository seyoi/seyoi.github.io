import { useEffect, useState } from 'react';
import axios from 'axios';

interface Chatbot {
  id: string;  // Assuming `id` is a string based on API response
  name: string;
}

export default function ChatbotList() {
  const [chatbots, setChatbots] = useState<Chatbot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChatbots = async () => {
      try {
        const response = await axios.get<Chatbot[]>('http://localhost:8000/api/chatbots');
        setChatbots(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching chatbots:', error);
        setError('Failed to fetch chatbots.');
      } finally {
        setLoading(false);
      }
    };
    fetchChatbots();
  }, []);

  const handleTest = async (chatbotId: string, type: 'user' | 'manager') => {
    try {
      window.open(`/chat/${type}/${chatbotId}`, '_blank');
    } catch (error) {
      console.error('Error testing chatbot:', error);
      setError('Failed to test chatbot.');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:8000/api/chatbots/${id}`);
      setChatbots((prevChatbots) => prevChatbots.filter((chatbot) => chatbot.id !== id));
    } catch (error) {
      console.error('Error deleting chatbot:', error);
      setError('Failed to delete chatbot.');
    }
  };

  if (loading) return <p>Loading chatbots...</p>;

  return (
    <div className="w-full max-w-md p-2 mx-auto bg-white rounded-2xl shadow-lg">
      {error && <p className="text-red-500">{error}</p>}
      {chatbots.length === 0 ? (
        <p>No chatbots available</p>
      ) : (
        <ul className="list-disc pl-5">
          {chatbots.map((chatbot) => (
            <li key={chatbot.id} className="py-2">
              <span className="font-medium">{chatbot.name}</span> (ID: {chatbot.id})
              <button
                onClick={() => handleTest(chatbot.id, 'user')}
                className="ml-4 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Test
              </button>
              <button
                onClick={() => handleDelete(chatbot.id)}
                className="ml-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

'use client';

import { useState } from 'react';
import axios from 'axios';

interface CreateChatbotProps {
  onChatbotCreated: (chatbot: any) => void;
}

export default function CreateChatbot({ onChatbotCreated }: CreateChatbotProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreateChatbot = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`http://localhost:8000/api/create-chatbot`)
      const newChatbot = response.data;
      onChatbotCreated(newChatbot); // Pass the new chatbot to the parent
      alert(`Chatbot created successfully! ID: ${newChatbot.id}`);
    } catch (error) {
      console.error('Error creating chatbot:', error);
      setError('Failed to create chatbot. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={handleCreateChatbot}
        className={`px-4 py-2 ${loading ? 'bg-gray-500' : 'bg-blue-500'} text-white rounded hover:bg-blue-600`}
        disabled={loading}
      >
        {loading ? 'Creating...' : 'Create Chatbot'}
      </button>
      {error && (
        <div className="mt-4 text-red-600">
          {error}
        </div>
      )}
    </div>
  );
}

'use client';
import React, { useState, useEffect } from 'react';

export default function ChatbotList() {
  const [chatbots, setChatbots] = useState([]);
  const [editingBot, setEditingBot] = useState(null);
  const [editName, setEditName] = useState('');

  useEffect(() => {
    // Fetch chatbots list on component mount
    const fetchChatbots = async () => {
      try {
        const response = await fetch('/api/chatbots');
        const data = await response.json();
        setChatbots(data);
      } catch (error) {
        console.error('Error fetching chatbots:', error);
      }
    };

    fetchChatbots();
  }, []);

  const handleTestChatbot = (id) => {
    // Open a new window with the chatbot for testing
    window.open(`/chatbot/${id}`, '_blank');
  };

  const handleDeleteChatbot = async (id) => {
    try {
      const response = await fetch('/api/chatbots', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (response.ok) {
        setChatbots(chatbots.filter(chatbot => chatbot.id !== id));
      } else {
        console.error('Failed to delete chatbot');
      }
    } catch (error) {
      console.error('Error deleting chatbot:', error);
    }
  };

  const handleEditChatbot = (chatbot) => {
    setEditingBot(chatbot);
    setEditName(chatbot.name);
  };

  const handleSaveEdit = async () => {
    if (editingBot) {
      const updatedBot = { ...editingBot, name: editName };
      try {
        const response = await fetch('/api/chatbots', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedBot),
        });
        if (response.ok) {
          setChatbots(chatbots.map(bot => bot.id === updatedBot.id ? updatedBot : bot));
          setEditingBot(null);
          setEditName('');
        } else {
          console.error('Failed to update chatbot');
        }
      } catch (error) {
        console.error('Error updating chatbot:', error);
      }
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Chatbot Lisㅡt</h2>
      <ul className="list-disc pl-5">
        {chatbots.map((chatbot) => (
          <li key={chatbot.id} className="mb-2 flex items-center space-x-2">
            {editingBot && editingBot.id === chatbot.id ? (
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="border rounded p-1"
              />
            ) : (
              <span className="font-bold">{chatbot.name}</span>
            )}
            <button
              onClick={() => handleTestChatbot(chatbot.id)}
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Test
            </button>
            {editingBot && editingBot.id === chatbot.id ? (
              <button
                onClick={handleSaveEdit}
                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => handleEditChatbot(chatbot)}
                className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                Edit
              </button>
            )}
            <button
              onClick={() => handleDeleteChatbot(chatbot.id)}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

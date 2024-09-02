'use client';
import React, { useState, useEffect } from 'react';

export default function ChatbotList() {
  const [chatbots, setChatbots] = useState([]);
  const [editingBot, setEditingBot] = useState(null);
  const [editName, setEditName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [dataInput, setDataInput] = useState('');

  useEffect(() => {
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

  const handleDataSubmit = async () => {
    if (editingBot) {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/chatbots/data', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chatbotId: editingBot.id, data: dataInput }),
        });
        if (response.ok) {
          console.log('Data submitted');
          setShowModal(false);
          setDataInput('');
        } else {
          console.error('Failed to submit data');
        }
      } catch (error) {
        console.error('Error submitting data:', error);
      }
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Chatbot List</h2>
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
            <button
              onClick={() => handleEditChatbot(chatbot)}
              className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            >
              Edit
            </button>
            <button
              onClick={() => handleDeleteChatbot(chatbot.id)}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Delete
            </button>
            <button
              onClick={() => { setEditingBot(chatbot); setShowModal(true); }}
              className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Data
            </button>
          </li>
        ))}
      </ul>

      {/* 모달 */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Enter Data</h3>
            <textarea
              className="w-full border p-2 rounded mb-4"
              rows={6}
              value={dataInput}
              onChange={(e) => setDataInput(e.target.value)}
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleDataSubmit}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

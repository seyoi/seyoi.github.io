'use client';

import React, { useState, useEffect } from 'react';

export default function ChatbotManager() {
  const [botName, setBotName] = useState('');
  const [chatbots, setChatbots] = useState([]);

  // Fetch the chatbot list initially when the component mounts
  useEffect(() => {
    fetchChatbots();
  }, []);

  const fetchChatbots = async () => {
    try {
      const response = await fetch('/api/chatbots');
      if (response.ok) {
        const data = await response.json();
        setChatbots(data);
      } else {
        console.error('Failed to fetch chatbots');
      }
    } catch (error) {
      console.error('Error fetching chatbots:', error);
    }
  };

  const createChatbot = async () => {
    if (!botName.trim()) {
      alert('Chatbot name cannot be empty');
      return;
    }

    try {
      const response = await fetch('/api/chatbots', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: botName })
      });

      if (response.ok) {
        const newBot = await response.json();
        setChatbots((prevChatbots) => [...prevChatbots, newBot]); // Update the chatbot list
        setBotName(''); // Clear the input field
        alert(`Chatbot created: ${newBot.name}`);
      } else {
        alert('Failed to create chatbot');
      }
    } catch (error) {
      console.error('Error creating chatbot:', error);
      alert('An error occurred while creating the chatbot');
    }
  };

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          value={botName}
          onChange={(e) => setBotName(e.target.value)}
          placeholder="Enter chatbot name"
          className="mr-2 p-1 border rounded"
        />
        <button onClick={createChatbot} className="px-2 py-1 bg-blue-500 text-white rounded">
          Create Chatbot
        </button>
      </div>
      
      <h2 className="text-xl font-semibold mb-4">Chatbot List</h2>
      {chatbots.length === 0 ? (
        <p>No chatbots available. Create a new one!</p>
      ) : (
        <ul className="list-disc pl-5">
          {chatbots.map((chatbot) => (
            <li key={chatbot.id} className="mb-2">
              {chatbot.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

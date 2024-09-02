'use client'
import React, { useState } from 'react';

export default function CreateChatbotButton() {
  const [botName, setBotName] = useState('');

  const createChatbot = async () => {
    try {
      const response = await fetch('/api/chatbots', {  // Ensure the correct API route URL
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: botName })
      });

      if (response.ok) {
        const newBot = await response.json();
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
      <input
        type="text"
        value={botName}
        onChange={(e) => setBotName(e.target.value)}
        placeholder="Enter chatbot name"
      />
      <button onClick={createChatbot}>Create Chatbot</button>
    </div>
  );
}

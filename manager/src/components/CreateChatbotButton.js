'use client';
import React, { useState } from 'react';
import { db } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function CreateChatbotButton() {
  const [botName, setBotName] = useState('');

  const createChatbot = async () => {
    if (!botName.trim()) {
      alert('Please enter a chatbot name');
      return;
    }

    try {
      const docRef = await addDoc(collection(db, 'chatbots'), {
        name: botName,
        createdAt: new Date()
      });

      alert(`Chatbot created with ID: ${docRef.id}`);
      setBotName(''); // Clear input field after creation
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
        className="border rounded p-2 mb-2"
      />
      <button
        onClick={createChatbot}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Create Chatbot
      </button>
    </div>
  );
}

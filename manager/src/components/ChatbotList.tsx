'use client';
import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';

interface Chatbot {
  id: string;
  name: string;
  createdAt?: Date; // Optional, include if you have this field
  data?: string;    // Optional, include if you have this field
}

export default function ChatbotList() {
  const [chatbots, setChatbots] = useState<Chatbot[]>([]);
  const [editingBot, setEditingBot] = useState<Chatbot | null>(null);
  const [editName, setEditName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [dataInput, setDataInput] = useState('');

  useEffect(() => {
    const fetchChatbots = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'chatbots'));
        const chatbotsData: Chatbot[] = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Chatbot));
        setChatbots(chatbotsData);
      } catch (error) {
        console.error('Error fetching chatbots:', error);
      }
    };

    fetchChatbots();
  }, []);

  const handleTestChatbot = (id: string) => {
    window.open(`/chatbot/${id}`, '_blank');
  };

  const handleDeleteChatbot = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'chatbots', id));
      setChatbots(chatbots.filter(chatbot => chatbot.id !== id));
    } catch (error) {
      console.error('Error deleting chatbot:', error);
    }
  };

  const handleSaveEdit = async () => {
    if (editingBot && editName.trim()) {
      try {
        const botDoc = doc(db, 'chatbots', editingBot.id);
        await updateDoc(botDoc, { name: editName });
        setChatbots(chatbots.map(bot => bot.id === editingBot.id ? { ...bot, name: editName } : bot));
        setEditingBot(null);
        setEditName('');
      } catch (error) {
        console.error('Error updating chatbot:', error);
      }
    }
  };

  const handleDataSubmit = async () => {
    if (editingBot) {
      try {
        const botDoc = doc(db, 'chatbots', editingBot.id);
        await updateDoc(botDoc, {
          data: dataInput, // Adjust if needed
        });
        setShowModal(false);
        setDataInput('');
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
              onClick={() => handleSaveEdit(chatbot.id)}
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

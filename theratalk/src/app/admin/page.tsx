// app/admin/page.tsx
'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface Conversation {
  _id: string;
}

export default function AdminDashboard() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const router = useRouter();
  
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/all_conversations');
        setConversations(response.data.conversations);
      } catch (error) {
        console.error('Error fetching conversations:', error);
      }
    };
    
    fetchConversations();
  }, []);

  const handleViewConversation = (id: string) => {
    router.push(`/admin/manager-chat/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>
        <div className="bg-white shadow-md rounded-lg p-6">
          <ul className="space-y-4">
            {conversations.map(convo => (
              <li key={convo._id} className="border-b pb-4">
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md w-full"
                  onClick={() => handleViewConversation(convo._id)}
                >
                  View Conversation {convo._id}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

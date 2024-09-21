// App.tsx

'use client'
import React, { useState } from 'react';
import ChatbotList from '@/components/ChatbotList';
import ChatsPanel from '@/components/Chats'; // Import the ChatsPanel component

function App() {
  const [isCreating, setIsCreating] = useState(false);
  const [newChatbotName, setNewChatbotName] = useState('');
  const [activeTab, setActiveTab] = useState<'bots' | 'chats' | 'settings'>('bots');

  const handleTabChange = (tab: 'bots' | 'chats' | 'settings') => {
    setActiveTab(tab);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4 text-center text-2xl font-bold">
        Theratalk+
      </header>
      <div className="flex-grow p-4">
        <div className="tabs">
          <a
            className={`tab tab-bordered ${activeTab === 'bots' ? 'tab-active' : ''}`}
            onClick={() => handleTabChange('bots')}
          >
            Bots
          </a>
          <a
            className={`tab tab-bordered ${activeTab === 'chats' ? 'tab-active' : ''}`}
            onClick={() => handleTabChange('chats')}
          >
            Chats
          </a>
          <a
            className={`tab tab-bordered ${activeTab === 'settings' ? 'tab-active' : ''}`}
            onClick={() => handleTabChange('settings')}
          >
            Settings
          </a>
        </div>

        <div className="p-6 bg-white rounded-lg shadow mt-6">
          {/* Bots Panel */}
          {activeTab === 'bots' && (
            <div>
              {/* ChatbotList and chatbot creation logic */}
              <ChatbotList />
            </div>
          )}

          {/* Chats Panel */}
          {activeTab === 'chats' && <ChatsPanel />}

          {/* Settings Panel */}
          {activeTab === 'settings' && (
            <div>
              {/* Settings UI */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

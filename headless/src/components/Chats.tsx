import React, { useState } from 'react';
import SessionList from './SessionList';
import ManagerChat from './ManagerChat';
// import History from './history'

const ChatApp: React.FC = () => {
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);

  const handleSelectSession = (sessionId: string) => {
    setSelectedSessionId(sessionId);
  };

  return (
    <div className="flex">
      <SessionList  />
     

    </div>
  );
};

export default ChatApp;

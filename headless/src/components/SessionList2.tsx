import React, { useEffect, useState } from 'react';

interface SessionListProps {
  onSelectSession: (sessionId: string) => void;
}

const SessionList: React.FC<SessionListProps> = ({ onSelectSession }) => {
  const [sessions, setSessions] = useState<any[]>([]);

  useEffect(() => {
    // Fetch chat sessions from the backend
    const fetchChatSessions = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/chatbots/sessions');
        const data = await response.json();
        setSessions(data);
      } catch (error) {
        console.error('Error fetching chat sessions:', error);
      }
    };

    fetchChatSessions();
  }, []);

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Available Sessions</h2>
      <ul className="space-y-2">
        {sessions.map((session) => (
          <li
            key={session.id}
            className="cursor-pointer p-2 bg-gray-200 rounded hover:bg-gray-300"
            onClick={() => onSelectSession(session.id)}
          >
            Session {session.id}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SessionList;

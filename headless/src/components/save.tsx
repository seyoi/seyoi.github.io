import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ChatsPanel = () => {
  const [sessions, setSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);

  // Fetch all sessions
  useEffect(() => {
    const fetchAllSessions = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:8000/api/chatbots/all_sessions');
        setSessions(response.data);
      } catch (error) {
        console.error('Error fetching sessions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllSessions();
  }, []);

  // Handle session toggle
  const handleToggleMessages = (sessionId: string) => {
    setSelectedSessionId(selectedSessionId === sessionId ? null : sessionId);
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {sessions.map((session) => (
            <li key={session.session_id} className="mb-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold mb-2">Session ID: {session.session_id}</h3>
                <button
                  onClick={() => handleToggleMessages(session.session_id)}
                  className="btn btn-secondary"
                >
                  {selectedSessionId === session.session_id ? 'Hide Messages' : 'Show Messages'}
                </button>
              </div>
              {selectedSessionId === session.session_id && (
                <ul className="border p-2 rounded bg-gray-50">
                  {session.messages.length > 0 ? (
                    session.messages.map((msg: any, index: number) => (
                      <li key={index} className={`p-2 ${msg.role === 'manager' ? 'text-green-600' : 'text-blue-600'}`}>
                        <strong>{msg.role}:</strong> {msg.message}
                      </li>
                    ))
                  ) : (
                    <li>No messages available</li>
                  )}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ChatsPanel;

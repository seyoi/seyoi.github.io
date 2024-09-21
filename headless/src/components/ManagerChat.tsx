import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface ChatsPanelProps {
  sessionId: string | null;
}

const ChatsPanel: React.FC<ChatsPanelProps> = ({ sessionId }) => {
  const [sessionData, setSessionData] = useState<any>(null);
  const [inputMessage, setInputMessage] = useState('');
  const [loadingHistory, setLoadingHistory] = useState(false);

  useEffect(() => {
    if (!sessionId) return;

    const fetchSessionData = async () => {
      setLoadingHistory(true);
      try {
        const response = await axios.get(`http://localhost:8000/api/sessions/${sessionId}`);
        setSessionData(response.data);
      } catch (error) {
        console.error('Error fetching session data:', error);
      } finally {
        setLoadingHistory(false);
      }
    };

    fetchSessionData();
  }, [sessionId]);

  const sendMessage = async () => {
    if (!inputMessage || !sessionId) return;

    try {
      await axios.post(`http://localhost:8000/api/sessions/${sessionId}/send_message`, {
        message: inputMessage,
        role: 'manager',
      });

      setSessionData((prevData:any) => ({
        ...prevData,
        messages: [...(prevData?.messages || []), { role: 'manager', message: inputMessage }],
      }));
      setInputMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  if (!sessionId) return <p>Select a session to view details.</p>;

  return (
    <div className="w-2/3 bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-semibold">Session {sessionId}</h2>
      <div className="h-64 overflow-y-auto mt-4 bg-gray-100 p-4 rounded-lg">
        {loadingHistory ? (
          <p>Loading chat history...</p>
        ) : (
          sessionData?.messages.map((msg:any, index:any) => (
            <p key={index} className={msg.role === 'manager' ? 'text-green-600' : 'text-blue-600'}>
              {msg.role}: {msg.message}
            </p>
          ))
        )}
      </div>
      <div className="mt-4">
        <textarea
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type a message..."
          className="textarea textarea-bordered w-full"
        />
        <button onClick={sendMessage} className="btn btn-primary w-full mt-2">
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatsPanel;

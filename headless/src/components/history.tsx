// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import SessionMessages from './SessionMessages';

// const ChatsPanel = () => {
//   const [sessions, setSessions] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchAllSessions = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get('http://localhost:8000/api/chatbots/all_sessions');
//         setSessions(response.data);
//       } catch (error) {
//         console.error('Error fetching sessions:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAllSessions();
//   }, []);

//   const handleToggleMessages = (sessionId: string) => {
//     setSelectedSessionId(selectedSessionId === sessionId ? null : sessionId);
//   };

//   return (
//     <div>
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <ul>
//           {sessions.map((session) => (
//             <li key={session.session_id} className="mb-4">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <h3 className="text-lg font-semibold mb-2">Session ID: {session.session_id}</h3>
//                   <p className="text-sm text-gray-600">Chatbot ID: {session.chatbot_id}</p>
//                 </div>
//                 <button
//                   onClick={() => handleToggleMessages(session.session_id)}
//                   className="btn btn-secondary"
//                 >
//                   {selectedSessionId === session.session_id ? 'Hide Messages' : 'Show Messages'}
//                 </button>
//               </div>
//               {selectedSessionId === session.session_id && (
//                 <SessionMessages
//                   session={session}
//                   chatbotId={session.chatbot_id} // chatbotId를 SessionMessages에 전달
//                 />
//               )}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default ChatsPanel;

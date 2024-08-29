'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { AblyProvider, ChannelProvider } from 'ably/react';
import * as Ably from 'ably';
import ChatbotChat from '@/components/ChatbotChat'; // Import the ChatbotChat component
import { db } from '../../../../firebase'; // Import your Firebase configuration
import { doc, getDoc } from 'firebase/firestore'; // Import Firestore functions

const client = new Ably.Realtime({ key: 'DbbPfw.AkgsiA:b6TbDNYq1aUmyttQ_oo_Q7wc_qVcpwHKdKPt45vkjU0' });

export default function ChatbotPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [chatbot, setChatbot] = useState<any>(null); // State to store chatbot data
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState<string>('');
  const chatbotId = params.id;

  useEffect(() => {
    // Fetch chatbot details from Firestore
    const fetchChatbot = async () => {
      try {
        const chatbotDoc = doc(db, 'chatbots', chatbotId);
        const chatbotData = await getDoc(chatbotDoc);
        
        if (chatbotData.exists()) {
          setChatbot(chatbotData.data());
        } else {
          console.error('No such chatbot!');
          router.push('/chatbots');
        }
      } catch (error) {
        console.error('Error fetching chatbot:', error);
        router.push('/chatbots');
      }
    };

    fetchChatbot();
  }, [chatbotId, router]);

  if (!chatbot) {
    return <div>Loading...</div>; // Or handle loading state as needed
  }

  return (
    <AblyProvider client={client}>
      <ChannelProvider channelName={`chatbot-${chatbotId}`}>
        <ChatbotChat chatbot={chatbot} chatbotId={chatbotId} /> {/* Pass chatbot data as a prop */}
      </ChannelProvider>
    </AblyProvider>
  );
}

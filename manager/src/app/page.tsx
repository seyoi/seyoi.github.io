// app/page.tsx
'use client'
import Link from 'next/link';
import CreateChatbotButton from '../components/CreateChatbotButton';
import ChatbotList from '../components/ChatbotList';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-4">manager</h1>

      <div className="mb-4">
        <CreateChatbotButton />
      </div>

      <div className="mb-4">
        <ChatbotList />
      </div>

      <Link href="/manager">
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Go to Manager
        </button>
      </Link>
    </div>
  );
}

// components/DataLearning.tsx
'use client';
import { useState } from 'react';
import axios from 'axios';
import React from 'react'
import DataLearned from './DataLearned';

interface DataLearningProps {
  chatbotId: string;
}

export default function DataLearning({ chatbotId }: DataLearningProps) {
  const [data, setData] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleDataSubmit = async () => {
    if (!data.trim()) {
      setError('Please enter some data.');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await axios.post('http://127.0.0.1:8000/api/chatbots/data', {
        chatbotId,
        data
      });
      setSuccess('Data submitted successfully.');
      setData('');
    } catch (error) {
      console.error('Error submitting data:', error);
      setError('Failed to submit data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white border rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-2">Submit Data for Learning</h2>
      <textarea
        value={data}
        onChange={(e) => setData(e.target.value)}
        placeholder="Enter data for learning..."
        className="w-full p-2 border border-gray-300 rounded-md mb-2"
        rows={4}
      />
      <button
        onClick={handleDataSubmit}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        disabled={loading}
      >
        {loading ? 'Submitting...' : 'Submit Data'}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {success && <p className="text-green-500 mt-2">{success}</p>}
     {/* Show learned data below */}
     <div className="mt-4">
        <DataLearned chatbotId={chatbotId} />
      </div>
    </div>
  );
}

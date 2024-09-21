'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface DataLearnedProps {
  chatbotId: string;
}

interface DataResponse {
  documents: string[];
}

export default function DataLearned({ chatbotId }: DataLearnedProps) {
  const [data, setData] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<DataResponse>(`http://127.0.0.1:8000/api/chatbots/${chatbotId}/data`);
        // setData(response.data?.documents || []);
    
        console.log('Fetched Data:', response);
        // Check if the response contains the documents field
        // if (response.data && Array.isArray(response.data.documents)) {
         
        // } else {
        //   setError('No valid data found.');
        // }
      } catch (error) {
        console.error('Error fetching learned data:', error);
        setError('Failed to fetch learned data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [chatbotId]);

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Learned Data</h3>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : data && data.length === 0 ? (
        <p>No data found.</p>
      ) : (
        <ul className="list-disc pl-5">
          {data.map((item, index) => (
            <li key={index} className="mb-2">{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

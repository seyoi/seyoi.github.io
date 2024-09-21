'use client'
import React, { useState, useEffect } from 'react';

interface ChatbotDataProps {
    chatbotId: string;
}

const ChatbotData: React.FC<ChatbotDataProps> = ({ chatbotId }) => {
    const [data, setData] = useState<string[][]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [editedData, setEditedData] = useState<string[][]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8000/get-chatbot-data/${chatbotId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const result = await response.json();
                setData(result.data);
                setEditedData(result.data); // Initialize edited data
            } catch (error) {
                setError(error instanceof Error ? error.message : 'Unknown error');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [chatbotId]);

    const handleCellChange = (rowIndex: number, cellIndex: number, value: string) => {
        const newData = [...editedData];
        newData[rowIndex][cellIndex] = value; // Update the specific cell
        setEditedData(newData);
    };

    const saveEdits = async () => {
        try {
            const response = await fetch(`http://localhost:8000/save-edits/${chatbotId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ data: editedData }), // Wrap editedData in an object
            });

            if (!response.ok) {
                throw new Error('Failed to save edits');
            }

            const result = await response.json();
            console.log(result.message);
            alert('Data saved successfully!');
        } catch (error) {
            console.error('Error:', error);
            alert('Error saving data: ' + (error instanceof Error ? error.message : 'Unknown error'));
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>Chatbot Data</h1> <button onClick={saveEdits}>Save Edits</button>
            <div style={{ overflowX: 'auto' }}>
                <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                    <thead>
                        <tr>
                            {data[0]?.map((_, index) => (
                                <th key={index} style={{ border: '1px solid black', padding: '8px', backgroundColor: '#f2f2f2' }}>
                                    Column {index + 1}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {editedData.slice(1).map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {row.map((cell, cellIndex) => (
                                    <td key={cellIndex} style={{ border: '1px solid black', padding: '8px' }}>
                                        <input
                                            type="text"
                                            value={cell}
                                            onChange={(e) => handleCellChange(rowIndex + 1, cellIndex, e.target.value)} // Adjust index for header
                                        />
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
           
        </div>
    );
};

export default ChatbotData;

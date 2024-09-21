import React, { useState, useEffect } from 'react';

// Define types for the data
type TableRow = string[];
type TableData = TableRow[];

function ChatbotData({ chatbotId }: { chatbotId: string }) {
    const [data, setData] = useState<TableData>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8000/get-chatbot-data/${chatbotId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const result = await response.json();
                setData(result.data); // Assuming result.data is of type TableData
            } catch (error) {
                // setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [chatbotId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>Chatbot Data</h1>
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
                    {data.slice(1).map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((cell, cellIndex) => (
                                <td key={cellIndex} style={{ border: '1px solid black', padding: '8px' }}>
                                    {cell}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ChatbotData;

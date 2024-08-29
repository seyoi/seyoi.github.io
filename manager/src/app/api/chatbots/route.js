import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'chatbots.json');
const readChatbots = () => {
  if (fs.existsSync(dataFilePath)) {
    try {
      const data = fs.readFileSync(dataFilePath, 'utf-8');
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error parsing JSON data:', error);
      return [];
    }
  }
  // 파일이 없을 경우 빈 배열 반환
  return [];
};

const writeChatbots = (chatbots) => {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(chatbots, null, 2), 'utf-8');
    console.log("Chatbots successfully written to file");
  } catch (error) {
    console.error('Error writing JSON data:', error);
  }
};


export async function POST(req) {
  try {
    const newBot = await req.json();
    const chatbots = readChatbots();
    newBot.id = chatbots.length ? chatbots[chatbots.length - 1].id + 1 : 1;
    chatbots.push(newBot);
    writeChatbots(chatbots);
    return new Response(JSON.stringify(newBot), { status: 200 });
  } catch (error) {
    console.error('Error handling POST request:', error);
    return new Response('Failed to create chatbot', { status: 500 });
  }
}

export async function GET() {
  try {
    const chatbots = readChatbots();
    return new Response(JSON.stringify(chatbots), { status: 200 });
  } catch (error) {
    console.error('Error handling GET request:', error);
    return new Response('Failed to get chatbots', { status: 500 });
  }
}

// Adding support for PUT and DELETE
export async function PUT(req) {
  try {
    const updatedBot = await req.json();
    let chatbots = readChatbots();
    const index = chatbots.findIndex(chatbot => chatbot.id === updatedBot.id);
    if (index !== -1) {
      chatbots[index] = updatedBot;
      writeChatbots(chatbots);
      return new Response(JSON.stringify(updatedBot), { status: 200 });
    } else {
      return new Response('Chatbot not found', { status: 404 });
    }
  } catch (error) {
    console.error('Error handling PUT request:', error);
    return new Response('Failed to update chatbot', { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { id } = await req.json();
    let chatbots = readChatbots();
    chatbots = chatbots.filter(chatbot => chatbot.id !== id);
    writeChatbots(chatbots);
    return new Response('Chatbot deleted', { status: 200 });
  } catch (error) {
    console.error('Error handling DELETE request:', error);
    return new Response('Failed to delete chatbot', { status: 500 });
  }
}

// Exporting a default handler to route methods
export default async function handler(req) {
  switch (req.method) {
    case 'POST':
      return POST(req);
    case 'GET':
      return GET();
    case 'PUT':
      return PUT(req);
    case 'DELETE':
      return DELETE(req);
    default:
      return new Response('Method Not Allowed', { status: 405 });
  }
}

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from pymongo import MongoClient
from pymongo.collection import Collection
from datetime import datetime
from typing import List
import openai
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI()

# MongoDB Client Setup
mongodb_uri = os.getenv('MONGODB_URI')
client = MongoClient(mongodb_uri)
db = client['your-database-name']  # Replace with your database name

# OpenAI API Key
openai.api_key = os.getenv('OPENAI_API_KEY')

# Define Models
class Message(BaseModel):
    sender: str  # "user", "chatbot", or "manager"
    content: str
    timestamp: datetime

class ChatRequest(BaseModel):
    channel_id: str
    message: Message

class Chatbot(BaseModel):
    name: str

class DataRequest(BaseModel):
    chatbotId: str
    data: str

class User(BaseModel):
    email: str
    password: str

# Create Channel Endpoint
@app.post("/api/create_channel")
async def create_channel(channel_id: str):
    try:
        channel_collection: Collection = db['conversation_channels']
        channel_collection.insert_one({
            '_id': channel_id,
            'messages': []
        })
        return {"message": "Channel created successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# Send Message Endpoint
@app.post("/api/send_message")
async def send_message(request: ChatRequest):
    try:
        channel_collection: Collection = db['conversation_channels']
        channel_collection.update_one(
            {'_id': request.channel_id},
            {'$push': {'messages': request.message.dict()}}
        )
        return {"message": "Message sent successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# Get Conversation Endpoint
@app.get("/api/get_conversation/{channel_id}")
async def get_conversation(channel_id: str):
    try:
        channel_collection: Collection = db['conversation_channels']
        channel_doc = channel_collection.find_one({'_id': channel_id})
        if channel_doc:
            return channel_doc
        else:
            raise HTTPException(status_code=404, detail="Channel not found")
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# Register User Endpoint
@app.post("/register")
async def register_user(user: User):
    try:
        user_collection: Collection = db['users']
        existing_user = user_collection.find_one({'email': user.email})
        if existing_user:
            raise HTTPException(status_code=400, detail="User already exists")
        user_collection.insert_one({
            'email': user.email,
            'password': user.password
        })
        return {"message": "User registered successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# Login User Endpoint
@app.post("/login")
async def login_user(user: User):
    try:
        user_collection: Collection = db['users']
        existing_user = user_collection.find_one({'email': user.email, 'password': user.password})
        if existing_user:
            return {"message": "Login successful"}
        else:
            raise HTTPException(status_code=401, detail="Invalid credentials")
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# Submit Data Endpoint
@app.post("/api/chatbots/data")
async def submit_data(request: DataRequest):
    try:
        chatbots_collection: Collection = db['chatbots']
        chatbot_doc = chatbots_collection.find_one({'_id': request.chatbotId})
        if chatbot_doc:
            chatbots_collection.update_one(
                {'_id': request.chatbotId},
                {'$push': {'documents': request.data}}
            )
            return {"message": "Data submitted successfully"}
        else:
            raise HTTPException(status_code=404, detail="Chatbot not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Chat Endpoint
@app.post("/api/chat/")
async def chat(request: ChatRequest):
    try:
        chatbots_collection: Collection = db['chatbots']
        chatbot_doc = chatbots_collection.find_one({'_id': request.channel_id})
        if chatbot_doc:
            relevant_data = chatbot_doc.get('documents', [])
            context = "\n".join(relevant_data)
            response = openai.ChatCompletion.create(
                model="gpt-4",
                messages=[
                    {"role": "system", "content": "You are a helpful assistant. Your responses should be based solely on the provided documents."},
                    {"role": "user", "content": request.message.content},
                    {"role": "system", "content": f"Context: {context}"}
                ]
            )
            reply = response.choices[0].message['content'].strip()
            return {"reply": reply}
        else:
            return {"reply": "No relevant data found"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

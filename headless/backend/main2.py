from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId
from bson.errors import InvalidId
from fastapi.middleware.cors import CORSMiddleware
from typing import List



app = FastAPI()

# CORS Middleware setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB client setup
MONGODB_URL = ''
client = AsyncIOMotorClient(MONGODB_URL)
db = client.get_database('seyoit')  # Use the correct database name here
chatbots_collection = db.get_collection('chatbots')

# Pydantic models
class Chatbot(BaseModel):
    name: str

class ChatbotInDB(Chatbot):
    id: str

# Utility to convert MongoDB document to Pydantic model
def chatbot_helper(chatbot) -> ChatbotInDB:
    return ChatbotInDB(
        id=str(chatbot["_id"]),
        name=chatbot["name"]
    )

@app.post("/api/chatbots", response_model=ChatbotInDB)
async def create_chatbot(chatbot: Chatbot):
    # Create a new chatbot document in MongoDB
    result = await chatbots_collection.insert_one(chatbot.dict())
    new_chatbot = await chatbots_collection.find_one({"_id": result.inserted_id})
    if new_chatbot is None:
        raise HTTPException(status_code=500, detail="Failed to retrieve created chatbot")
    return chatbot_helper(new_chatbot)

@app.get("/api/chatbots", response_model=List[ChatbotInDB])
async def list_chatbots():
    # Retrieve all chatbots from MongoDB
    chatbots_cursor = chatbots_collection.find()
    chatbots = await chatbots_cursor.to_list(length=100)  # Adjust the length as needed
    return [chatbot_helper(chatbot) for chatbot in chatbots]

@app.get("/api/chatbots/{chatbot_id}", response_model=ChatbotInDB)
async def get_chatbot(chatbot_id: str):
    # Retrieve a single chatbot by ID
    chatbot = await chatbots_collection.find_one({"_id": ObjectId(chatbot_id)})
    if chatbot is None:
        raise HTTPException(status_code=404, detail="Chatbot not found")
    return chatbot_helper(chatbot)






def is_valid_objectid(oid: str) -> bool:
    try:
        ObjectId(oid)
        return True
    except Exception:
        return False


@app.delete("/api/chatbots/{chatbot_id}", response_model=dict[str, str])
async def delete_chatbot(chatbot_id: str):
    # Validate ObjectId
    if not is_valid_objectid(chatbot_id):
        raise HTTPException(status_code=400, detail="Invalid ObjectId format")

    # Attempt to delete the chatbot
    result = await chatbots_collection.delete_one({"_id": ObjectId(chatbot_id)})
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Chatbot not found")

    return {"detail": "Chatbot deleted successfully"}
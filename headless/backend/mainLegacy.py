from fastapi import FastAPI, HTTPException, Query
from pydantic import BaseModel
from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId
from fastapi.middleware.cors import CORSMiddleware
import openai
import os
import uuid
from ably import AblyRealtime
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Ably configuration
ABLY_API_KEY = os.getenv('ABLY_API_KEY')
ably_client = AblyRealtime(ABLY_API_KEY)

# OpenAI configuration
OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
openai.api_key = OPENAI_API_KEY

# MongoDB setup
MONGODB_URL = os.getenv('MONGODB_URI')
client = AsyncIOMotorClient(MONGODB_URL)
db = client.get_database('seyoit')
chatbots_collection = db.get_collection('chatbots')

app = FastAPI()

ably_api_key = os.getenv('ABLY_API_KEY')
ably_client = AblyRealtime(ably_api_key)

# CORS Middleware setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models
class Chatbot(BaseModel):
    name: str

class ChatbotInDB(Chatbot):
    id: str

class Message(BaseModel):
    message: str

class User(BaseModel):
    username: str
    session_id: str
    
class CreateUserRequest(BaseModel):
    chatbot_id: str

# Utility to convert MongoDB document to Pydantic model
def user_helper(user) -> User:
    return User(
        username=user.get("username"),
        session_id=user.get("session_id")
    )

def chatbot_helper(chatbot) -> ChatbotInDB:
    return ChatbotInDB(
        id=str(chatbot["_id"]),
        name=chatbot["name"]
    )

@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.post("/api/chatbots/{chatbot_id}/send_message")
async def send_message(
    
    chatbot_id: str,
    message: Message,
    user_id: str = Query(None, description="The ID of the user sending the message"),
    role: str = Query(..., description="The role of the sender: user, manager, or chatbot")
):
    try:
        # Find the chatbot
        chatbot = await chatbots_collection.find_one({'_id': chatbot_id})
        if not chatbot:
            raise HTTPException(status_code=404, detail="Chatbot not found")

        # If user_id is not provided, create a new user and session
        if not user_id:
            user_id = str(uuid.uuid4())
            session_id = str(uuid.uuid4())

            # Create a new user session data
            session_data = {
                'user_id': user_id,
                'session_id': session_id,
                'messages': []
            }

            # Add the session to the specific chatbot's document
            result = await chatbots_collection.update_one(
                {'_id': chatbot_id},
                {'$push': {'sessions': session_data}}
            )
            if result.matched_count == 0:
                raise HTTPException(status_code=404, detail="Chatbot not found")

        # Check if the session exists, if not create the session
        session = next((s for s in chatbot.get('sessions', []) if s['user_id'] == user_id), None)
        if not session:
            session_id = str(uuid.uuid4())
            session_data = {
                'user_id': user_id,
                'session_id': session_id,
                'messages': []
            }
            await chatbots_collection.update_one(
                {'_id': chatbot_id},
                {'$push': {'sessions': session_data}}
            )
            session = session_data

        # Append the message to the session
        user_message = {
            "role": role,
            "message": message.message
        }
        await chatbots_collection.update_one(
            {'_id': chatbot_id, 'sessions.session_id': session['session_id']},
            {'$push': {'sessions.$.messages': user_message}}
        )
         # Publish user message to Ably
        try:
            channel_id = f"chat-{chatbot_id}"
            channel = ably_client.channels.get(channel_id)
            await channel.publish('message', {"role": role, "content": message.message})
        except Exception as ably_error:
            raise HTTPException(status_code=500, detail=f"Ably error: {str(ably_error)}")

        
        chatbot_reply = None
        # Generate chatbot response only if the role is 'user'
        if role == "user":
            # Fetch response from OpenAI
            response = openai.ChatCompletion.create(
                model="gpt-4",
                messages=[
                    {"role": "user", "content": message.message}
                ],
                max_tokens=150
            )
            chatbot_reply = response.choices[0].message['content'].strip()

            # Append chatbot response to the session
            chatbot_message = {
                "role": "chatbot",
                "message": chatbot_reply
            }
            await chatbots_collection.update_one(
                {'_id': chatbot_id, 'sessions.session_id': session['session_id']},
                {'$push': {'sessions.$.messages': chatbot_message}}
            )

            # Publish the chatbot's response to Ably
            try:
                channel_id = f"chat-{chatbot_id}"
                channel = ably_client.channels.get(channel_id)
                await channel.publish('message', {"role": "chatbot", "content": chatbot_reply})
            except Exception as ably_error:
                raise HTTPException(status_code=500, detail=f"Ably error: {str(ably_error)}")

        return {"status": "message sent", "response": chatbot_reply if role == "user" else None}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# @app.post("/api/create-user")
# async def create_user(chatbot_id: str):
#     try:
#         user_id = str(uuid.uuid4())
#         session_id = str(uuid.uuid4())

#         # Create a new user session data
#         session_data = {
#             'user_id': user_id,
#             'session_id': session_id,
#             'messages': []
#         }

#         # Add the session to the specific chatbot's document
#         result = await chatbots_collection.update_one(
#             {'_id': chatbot_id},
#             {'$push': {'sessions': session_data}}
#         )
#         if result.matched_count == 0:
#             raise HTTPException(status_code=404, detail="Chatbot not found")

#         return {"user_id": user_id, "session_id": session_id}

#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))


class Session(BaseModel):
    chatbot_id: str
    session_id: str
    user_id: str
    messages: list[Message]
    
@app.get("/api/chatbots/all_sessions", response_model=list[Session])
async def get_all_sessions():
    sessions = []
    try:
        async for chatbot in chatbots_collection.find():
            for session in chatbot.get('sessions', []):
                sessions.append({
                    'chatbot_id': str(chatbot['_id']),
                    'session_id': session['session_id'],
                    'user_id': session['user_id'],
                    'messages': session.get('messages', []),
                    'role':session.get('messages',{})
                })
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    return sessions



@app.get("/api/sessions/{session_id}", response_model=dict)
async def get_session_by_id(session_id: str):
    try:
        # Search for the session in the chatbots collection
        chatbot = await chatbots_collection.find_one({"sessions.session_id": session_id}, {"sessions.$": 1})

        if not chatbot:
            raise HTTPException(status_code=404, detail="Session not found")

        # Extract the session from the found chatbot document
        session = next((s for s in chatbot.get('sessions', []) if s['session_id'] == session_id), None)

        if not session:
            raise HTTPException(status_code=404, detail="Session not found")

        return {
            'chatbot_id': str(chatbot['_id']),
            'session_id': session['session_id'],
            'user_id': session['user_id'],
            'messages': session.get('messages', [])
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))




@app.get("/api/chatbots/sessions")
async def get_all_sessions():
    chatbots = await chatbots_collection.find().to_list(100)  # Get all chatbots
    sessions = []
    for chatbot in chatbots:
        for session in chatbot.get('sessions', []):
            sessions.append({
                'chatbot_id': chatbot['_id'],
                'session_id': session['session_id'],
                'user_id': session['user_id'],
                'messages': session['messages'],
            })
    return sessions


@app.get("/api/chatbots/all_sessions")
async def get_all_sessions():
    try:
        chatbots = await chatbots_collection.find().to_list(100)  # Get all chatbots
        sessions = []
        for chatbot in chatbots:
            for session in chatbot.get('sessions', []):
                sessions.append({
                    'chatbot_id': chatbot['_id'],
                    'session_id': session['session_id'],
                    'user_id': session['user_id'],
                    'messages': session['messages'],
                })
        return sessions
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/chatbots/{chatbot_id}/latest_session/history")
async def get_latest_session_history(chatbot_id: str):
    try:
        # Find the chatbot document
        chatbot = await chatbots_collection.find_one({
            "_id": chatbot_id
        })
        
        if not chatbot or not chatbot.get('sessions'):
            raise HTTPException(status_code=404, detail="Chatbot or sessions not found")
        
        # Find the most recent session based on creation date
        latest_session = max(chatbot['sessions'], key=lambda s: s.get('created_at', '1970-01-01T00:00:00Z'))
        
        # Return the messages from the most recent session
        return {"messages": latest_session['messages']}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
    
    
    
    
@app.get("/api/chatbots/{chatbot_id}/sessions/{session_id}")
async def get_session_messages(chatbot_id: str, session_id: str):
    try:
        chatbot = await chatbots_collection.find_one({"_id": chatbot_id})
        if not chatbot:
            raise HTTPException(status_code=404, detail="Chatbot not found")

        # Find the session within the chatbot
        session = next((s for s in chatbot.get('sessions', []) if s['session_id'] == session_id), None)
        if not session:
            raise HTTPException(status_code=404, detail="Session not found")

        return {"messages": session['messages']}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
    


@app.get("/api/chatbots")
async def get_chatbots():
    try:
        # Fetch chatbots from the collection
        chatbots = await chatbots_collection.find({}).to_list(length=None)
        return [chatbot_helper(chatbot) for chatbot in chatbots]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/create-chatbot")
async def create_chatbot(chatbot: Chatbot):
    try:
        # Generate a unique ID
        chatbot_id = str(uuid.uuid4())
        chatbot_data = {
            '_id':  chatbot_id,
            'name': chatbot.name,
            'sessions': []  # Initialize with empty sessions
        }

        # Insert chatbot into the collection
        chatbot_result = await chatbots_collection.insert_one(chatbot_data)
        if chatbot_result.inserted_id != chatbot_id:
            raise HTTPException(status_code=500, detail="Failed to insert chatbot")

        # Notify about the new chatbot via Ably
        try:
            channel_id = f"chat-{chatbot_id}"
            channel = ably_client.channels.get(channel_id)
            await channel.publish('notification', {'content': 'Chatbot created'})
        except Exception as ably_error:
            raise HTTPException(status_code=500, detail=f"Ably error: {str(ably_error)}")

        return {"_id": chatbot_id, "name": chatbot.name}

    except HTTPException as http_ex:
        raise http_ex
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# @app.post("/api/chatbots/{chatbot_id}/start_session")
# async def start_session(chatbot_id: str, user_id: str, manager_id: str = None):
#     try:
#         # Find the chatbot
#         chatbot = await chatbots_collection.find_one({'_id': chatbot_id})
#         if not chatbot:
#             raise HTTPException(status_code=404, detail="Chatbot not found")

#         # Check if the session already exists
#         session = next((s for s in chatbot.get('sessions', []) if s['user_id'] == user_id), None)
        
#         if session:
#             # Update the existing session
#             if manager_id:
#                 await chatbots_collection.update_one(
#                     {'_id': chatbot_id, 'sessions.user_id': user_id},
#                     {'$set': {'sessions.$.manager_id': manager_id}}
#                 )
#         else:
#             # Create a new session
#             session_id = str(uuid.uuid4())
#             session_data = {
#                 'user_id': user_id,
#                 'session_id': session_id,
#                 'manager_id': manager_id,
#                 'messages': []
#             }
#             await chatbots_collection.update_one(
#                 {'_id': chatbot_id},
#                 {'$push': {'sessions': session_data}}
#             )

#         return {"status": "session started", "session_id": session_id}

#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))
  
  
  
    
# @app.post("/api/chatbots/{chatbot_id}/send_message")
# async def send_message(
#     chatbot_id: str,
#     message: Message,
#     user_id: str = Query(None, description="The ID of the user sending the message"),
#     role: str = Query(..., description="The role of the sender: user, manager, or chatbot")
# ):
#     try:
#         # Find the chatbot
#         chatbot = await chatbots_collection.find_one({'_id': chatbot_id})
#         if not chatbot:
#             raise HTTPException(status_code=404, detail="Chatbot not found")

#         # If user_id is not provided, create a new user and session
#         if not user_id:
#             user_id = str(uuid.uuid4())
#             session_id = str(uuid.uuid4())

#             # Create a new user session data
#             session_data = {
#                 'user_id': user_id,
#                 'session_id': session_id,
#                 'messages': []
#             }

#             # Add the session to the specific chatbot's document
#             result = await chatbots_collection.update_one(
#                 {'_id': chatbot_id},
#                 {'$push': {'sessions': session_data}}
#             )
#             if result.matched_count == 0:
#                 raise HTTPException(status_code=404, detail="Chatbot not found")

#         # Check if the session exists, if not create the session
#         session = next((s for s in chatbot.get('sessions', []) if s['user_id'] == user_id), None)
#         if not session:
#             session_id = str(uuid.uuid4())
#             session_data = {
#                 'user_id': user_id,
#                 'session_id': session_id,
#                 'messages': []
#             }
#             await chatbots_collection.update_one(
#                 {'_id': chatbot_id},
#                 {'$push': {'sessions': session_data}}
#             )
#             session = session_data

#         # Append the message to the session
#         user_message = {
#             "role": role,
#             "message": message.message
#         }
#         await chatbots_collection.update_one(
#             {'_id': chatbot_id, 'sessions.session_id': session['session_id']},
#             {'$push': {'sessions.$.messages': user_message}}
#         )

#         chatbot_reply = None
#         # Generate chatbot response only if the role is 'user'
#         if role == "user":
#             # Fetch response from OpenAI
#             openai_response = openai.ChatCompletion.create(
#                 model="gpt-4",
#                 prompt=f"User: {message.message}\nChatbot:",
#                 max_tokens=150
#             )
#             chatbot_reply = openai_response.choices[0].text.strip()

#             # Append chatbot response to the session
#             chatbot_message = {
#                 "role": "chatbot",
#                 "message": chatbot_reply
#             }
#             await chatbots_collection.update_one(
#                 {'_id': chatbot_id, 'sessions.session_id': session['session_id']},
#                 {'$push': {'sessions.$.messages': chatbot_message}}
#             )

#             # Publish the chatbot's response to Ably
#             try:
#                 channel_id = f"chat-{chatbot_id}"
#                 channel = ably_client.channels.get(channel_id)
#                 await channel.publish('message', chatbot_reply)
#             except Exception as ably_error:
#                 raise HTTPException(status_code=500, detail=f"Ably error: {str(ably_error)}")

#         return {"status": "message sent", "response": chatbot_reply if role == "user" else None}

#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))

from fastapi import FastAPI, HTTPException, Request, UploadFile, File
from pydantic import BaseModel
from typing import Optional
from pymongo import MongoClient
from pymongo.collection import Collection
from datetime import datetime
import openai
from dotenv import load_dotenv
from ably import AblyRealtime
import uuid 
import os
from fastapi.middleware.cors import CORSMiddleware
import openai
from typing import List
import logging
from motor.motor_asyncio import AsyncIOMotorClient
import pandas as pd
from io import BytesIO, StringIO
from fastapi.responses import JSONResponse
from bson import ObjectId
import openpyxl

load_dotenv()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Ably Client Setup
ably_api_key = os.getenv('ABLY_API_KEY')
ably_client = AblyRealtime(ably_api_key)

# MongoDB Client Setup
mongodb_uri = os.getenv('MONGODB_URI')
if not mongodb_uri:
    raise ValueError("MONGODB_URI environment variable is missing")
client = MongoClient(mongodb_uri)
db = client['theratalk']  # Replace with your database name

# OpenAI API Key
openai.api_key = os.getenv('OPENAI_API_KEY')
if not openai.api_key:
    raise ValueError("OPENAI_API_KEY environment variable is missing")

# Define Models
class Message(BaseModel):
    sender: str  # "user", "chatbot", or "manager"
    content: str
    # timestamp: datetime

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

class QuestionRequest(BaseModel):
    question: str
    
    
class DataItem(BaseModel):
    content: str

class DataResponse(BaseModel):
    data: List[DataItem]
    
    
class RequestBody(BaseModel):
    userRequest: dict
    
    
    

    
#기본 센드메시지    
    
# @app.post("/api/send_message")
# async def send_message(request: ChatRequest):
#     try:
#         channel_id = request.channel_id
#         channel_collection = db['conversation_channels']
        
       
#         # Convert the timestamp to a string
#         message_data = request.message.model_dump()
#         # message_data['timestamp'] = message_data['timestamp'].isoformat()
        
#         # Update the channel with the new message
#         channel_collection.update_one(
#             {'_id': channel_id},
#             {'$push': {'messages': message_data}}
#         )
        
#         # Get the channel from Ably
#         channel = ably_client.channels.get(channel_id)
#         await channel.publish('message', message_data)

#         # Publish the message to the channel
       
#         # If the message is from the user, get a response from the chatbot
#         if request.message.sender == "user":
#             response = openai.ChatCompletion.create(
#                 model="gpt-4",
#                 messages=[
#                     {"role": "system", "content": "You are a helpful assistant. Answer the question as accurately as possible."},
#                     {"role": "user", "content": request.message.content}
#                 ]
#             )
            
#             # Extract the chatbot's response
#             reply = response.choices[0].message['content'].strip()
            
#             # Create a message data structure for the chatbot response
#             chatbot_response = {
#                 "sender": "chatbot",
#                 "content": reply,
#                 # "timestamp": message_data['timestamp']  # Use the same timestamp for consistency
#             }
            
#             # Store the chatbot's response in MongoDB
#             channel_collection.update_one(
#                 {'_id': channel_id},
#                 {'$push': {'messages': chatbot_response}}
#             )
            
#             # Publish the chatbot's reply to the channel
#             await channel.publish('message', chatbot_response)

#         return {"message": "Message sent successfully"}
#     except Exception as e:
#         print(f"Error sending message: {e}")
#         raise HTTPException(status_code=400, detail=str(e))
    
    
##데이터 기반 답변
@app.post("/api/send_message")
async def send_message(request: ChatRequest):
    try:
        # 채널 아이디와 챗봇 아이디 가져오기
        channel_id = request.channel_id
        chatbot_id = channel_id[len("chat-"):]

        # MongoDB 컬렉션 접근
        channel_collection = db['conversation_channels']
        chatbots_collection: Collection = db['chatbots']
        
        # 메시지 데이터를 MongoDB에 저장
        message_data = request.message.model_dump()
        
        channel_collection.update_one(
            {'_id': channel_id},
            {'$push': {'messages': message_data}}
        )
        
        # Ably 채널에 메시지 전송
        channel = ably_client.channels.get(channel_id)
        await channel.publish('message', message_data)
        
        # 사용자가 보낸 메시지일 경우
        if request.message.sender == "user":
            # 챗봇 아이디로 문서 데이터 가져오기
            chatbot_doc = chatbots_collection.find_one({'_id': chatbot_id})
            
            if chatbot_doc:
                # Chatbot의 문서 데이터 가져오기
                relevant_data = chatbot_doc.get('documents', [])
                context = "\n".join(relevant_data)  # 모든 문서를 하나의 문자열로 연결
                
                # OpenAI에게 문서 데이터 기반으로 답변 요청
                response = openai.ChatCompletion.create(
                    model="gpt-4o-mini",
                    messages=[
                        {"role": "system", "content": "You are a helpful assistant. Answer based only on the following documents."},
                        {"role": "system", "content": f"Context: {context}"},
                        {"role": "user", "content": request.message.content}
                    ]
                )
                
                # 챗봇 응답 처리
                reply = response.choices[0].message['content'].strip()
                
                # 챗봇의 응답을 MongoDB에 저장
                chatbot_response = {
                    "sender": "chatbot",
                    "content": reply,
                }
                channel_collection.update_one(
                    {'_id': channel_id},
                    {'$push': {'messages': chatbot_response}}
                )
                
                # Ably 채널에 챗봇 응답 전송
                await channel.publish('message', chatbot_response)
        
        return {"message": "Message sent successfully"}
    
    except Exception as e:
        print(f"Error sending message: {e}")
        raise HTTPException(status_code=400, detail=str(e))


@app.post("/api/chatbots")
async def create_chatbot(chatbot: Chatbot):
    try:
        chatbots_collection: Collection = db['chatbots']
        channel_collection: Collection = db['conversation_channels']

        # Generate a unique ID using uuid
        chatbot_id = str(uuid.uuid4())  
        chatbot_data = {
            '_id': chatbot_id,
            'name': chatbot.name
        }
        
        # Insert chatbot into the collection
        chatbot_result = chatbots_collection.insert_one(chatbot_data)
        if chatbot_result.inserted_id != chatbot_id:
            raise HTTPException(status_code=500, detail="Failed to insert chatbot")

        # Create a new channel for the chatbot
        channel_id = f"chat-{chatbot_id}"
        channel_result = channel_collection.insert_one({
            '_id': channel_id,
            'messages': []
        })
        if channel_result.inserted_id != channel_id:
            raise HTTPException(status_code=500, detail="Failed to insert channel")

        # Notify about channel creation via Ably
        try:
            channel = ably_client.channels.get(channel_id)
            channel.publish('notification', {'content': 'Channel created'})
        except Exception as ably_error:
            raise HTTPException(status_code=500, detail=f"Ably error: {str(ably_error)}")
        
        return {"_id": chatbot_id, "name": chatbot.name, "channel_id": channel_id}

    except HTTPException as http_ex:
        raise http_ex
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/chatbots")
async def get_chatbots():
    try:
        chatbots_collection: Collection = db['chatbots']
        chatbots = list(chatbots_collection.find({}, {'_id': 1, 'name': 1}))
        return chatbots
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
    
    

@app.delete("/api/chatbots/{chatbot_id}")
async def delete_chatbot(chatbot_id: str):
    try:
        chatbots_collection: Collection = db['chatbots']
        channel_collection: Collection = db['conversation_channels']

        # Delete the chatbot
        chatbot_result = chatbots_collection.delete_one({'_id': chatbot_id})

        if chatbot_result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Chatbot not found")

        # Delete the associated channel
        channel_id = f"chat-{chatbot_id}"
        channel_result = channel_collection.delete_one({'_id': channel_id})

        if channel_result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Channel not found")

        # Optionally, notify about channel deletion via Ably
        channel = ably_client.channels.get(channel_id)
        channel.publish('notification', {'content': 'Channel deleted'})

        return {"message": "Chatbot and associated channel deleted successfully"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# Send Message Endpoint


@app.post("/api/send_manager_message")
async def send_manager_message(request: ChatRequest):
    try:
        channel_id = request.channel_id
        channel_collection = db['conversation_channels']

        # Convert the timestamp to a string
        message_data = request.message.model_dump()
        # message_data['timestamp'] = message_data['timestamp'].isoformat()
        
        # Update the channel with the new message
        channel_collection.update_one(
            {'_id': channel_id},
            {'$push': {'messages': message_data}}
        )
        
        # Get the channel from Ably
        channel = ably_client.channels.get(channel_id)
        
        # Publish the manager's message to the channel
        await channel.publish('message', message_data)

        return {"message": "Manager message sent successfully"}
    except Exception as e:
        print(f"Error sending manager message: {e}")
        raise HTTPException(status_code=400, detail=str(e))


# Get Conversation Endpoint
@app.get("/api/get_conversation/{channel_id}")
async def get_conversation(channel_id: str):
    try:
        channel_collection: Collection = db['conversation_channels']
        channel_doc = channel_collection.find_one({'_id': channel_id})
        
        if channel_doc:
            return {"messages": channel_doc.get('messages', [])}  # Ensure the response format is correct
        else:
            raise HTTPException(status_code=404, detail="Channel not found")
    except Exception as e:
        print(f"Error: {e}")  # Print the error to the server log
        raise HTTPException(status_code=400, detail="An error occurred while fetching the conversation.")

@app.get("/api/all_conversations")
async def get_all_conversations():
    try:
        channel_collection: Collection = db['conversation_channels']
        # 모든 채널 문서의 '_id'와 'messages' 필드를 가져옵니다.
        conversations = list(channel_collection.find({}, {'_id': 1, 'messages': 1}))
        return {"conversations": conversations}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/intervene_message")
async def intervene_message(request: ChatRequest):
    try:
        channel_collection: Collection = db['conversation_channels']
        channel_doc = channel_collection.find_one({'_id': request.channel_id})
        
        if not channel_doc:
            raise HTTPException(status_code=404, detail="Channel not found")

        # Send the message to the channel
        channel = ably_client.channels.get(request.channel_id)
        channel.publish('message', request.message.dict())
        
        # Save the message in the database
        channel_collection.update_one(
            {'_id': request.channel_id},
            {'$push': {'messages': request.message.dict()}}
        )
        
        return {"message": "Message sent successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.delete("/api/delete_message")
async def delete_message(channel_id: str, message_timestamp: str):
    try:
        channel_collection: Collection = db['conversation_channels']
        channel_doc = channel_collection.find_one({'_id': channel_id})
        
        if not channel_doc:
            raise HTTPException(status_code=404, detail="Channel not found")

        # Remove the message from the database
        channel_collection.update_one(
            {'_id': channel_id},
            {'$pull': {'messages': {'timestamp': message_timestamp}}}
        )
        
        # Notify the channel via Ably
        channel = ably_client.channels.get(channel_id)
        channel.publish('notification', {'content': f'Message with timestamp {message_timestamp} was deleted'})
        
        return {"message": "Message deleted successfully"}
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





import math

chatbots_collection = db.chatbots  # 컬렉션 이름



# # 데이터에서 NaN, Infinity, -Infinity 값을 처리하는 함수
# def sanitize_data(data):
#     if isinstance(data, float) and (math.isnan(data) or math.isinf(data)):
#         return None
#     elif isinstance(data, list):
#         return [sanitize_data(item) for item in data]
#     elif isinstance(data, dict):
#         return {key: sanitize_data(value) for key, value in data.items()}
#     return data

# # 엑셀 파일을 업로드하고 데이터를 반환하며 MongoDB에 저장하는 API
# @app.post("/upload-excel/")
# async def upload_excel(file: UploadFile = File(...)):
#     try:
#         # 파일 확장자 검사
#         if not file.filename.endswith('.xlsx'):
#             raise HTTPException(status_code=400, detail="Invalid file type. Only .xlsx files are allowed.")

#         # 엑셀 파일 읽기
#         df = pd.read_excel(file.file)
        
#         # 엑셀 데이터를 JSON 형태로 변환
#         data = df.to_dict(orient="records")

#         # NaN 값 처리
#         sanitized_data = sanitize_data(data)

#         # MongoDB에 데이터 저장
#         if sanitized_data:
#             await chatbots_collection.insert_many(sanitized_data)

#         return JSONResponse(content=sanitized_data)

#     except Exception as e:
#         raise HTTPException(status_code=500, detail=f"Error processing file: {str(e)}")

# Pydantic model for the edited data

@app.get("/get-chatbot-data/{chatbot_id}")
async def get_chatbot_data(chatbot_id: str):
    try:
        # Fetch data from MongoDB
        document = chatbots_collection.find_one({"_id": chatbot_id})

        if not document:
            raise HTTPException(status_code=404, detail="Chatbot not found")

        # Log the document to verify its contents
        logger.info(f"Document fetched: {document}")

        # Assuming 'documents' field contains CSV-like data
        documents = document.get("documents", "")

        if not documents:
            raise HTTPException(status_code=404, detail="No documents found in chatbot")

        # Convert documents into the format needed for frontend
        data = [row.split(",") for row in documents.split("\n")]

        return {"data": data}

    except Exception as e:
        # Log the error
        logger.error(f"Error fetching data: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error fetching data: {str(e)}")

from typing import Optional

@app.post("/save-edits/{chatbot_id}")
async def save_edits(chatbot_id: str, data: dict):  # Keep as dict
    # Expecting 'data' to be a dictionary containing a 'data' key
    rows = data.get("data")
    msg = data.get("msg", None)  # Optional
    type_ = data.get("type", None)  # Optional

    if not rows:
        raise HTTPException(status_code=400, detail="Field 'data' is required")

    try:
        # Convert the list of rows back to the CSV format
        csv_data = "\n".join([",".join(row) for row in rows])

        # Update the documents field in the MongoDB collection
        result = chatbots_collection.update_one(
            {"_id": chatbot_id},
            {"$set": {"documents": [csv_data]}}  # Wrap csv_data in an array
        )

        if result.modified_count == 0:
            raise HTTPException(status_code=404, detail="Chatbot not found or no changes made")

        return {"message": "Data saved successfully", "msg": msg, "type": type_}  # Return optional fields

    except Exception as e:
        logger.error(f"Error saving data: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error saving data: {str(e)}")



    
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


@app.post("/api/plain-gpt")
async def ask_question(request: QuestionRequest):
    try:
        # OpenAI API call to get the response
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "You are a helpful assistant. Answer the question as accurately as possible."},
                {"role": "user", "content": request.question}
            ]
        )
        
        # Extract and return the response content
        reply = response.choices[0].message['content'].strip()
        return {"reply": reply}
    except Exception as e:
        # Log and return error details
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
from fastapi import FastAPI, Request, HTTPException
import logging
import openai
import ably
from pymongo import MongoClient
from pymongo.collection import Collection


@app.post("/kakao-wip")
async def kakao_skill(request: Request):
    try:
        # Parse the request data
        req_data = await request.json()
        user_question = req_data['userRequest']['utterance']
        
        # Extract channel_id from headers or request body
        channel_id = 'chat-4ce7baa6-7634-401b-b93e-deeacc84d83a'  # Example static value
        
        if not channel_id or not channel_id.startswith('chat-'):
            raise HTTPException(status_code=400, detail="Invalid Channel ID format.")
        
        chatbot_id = channel_id[len("chat-"):]

        # Access MongoDB collections
        channel_collection: Collection = db['conversation_channels']
        chatbots_collection: Collection = db['chatbots']

        # Save user question to MongoDB
        user_message = {
            "sender": "user",
            "content": user_question
        }
        channel_collection.update_one(
            {'_id': channel_id},
            {'$push': {'messages': user_message}},
            upsert=True
        )
        # Publish user message to Ably channel
        ably_channel = ably_client.channels.get(channel_id)
        await ably_channel.publish('message', user_message)

        # Get chatbot document and process if the message is from the user
        chatbot_doc = chatbots_collection.find_one({'_id': chatbot_id})
        
        if chatbot_doc:
            # Prepare context from documents
            relevant_data = chatbot_doc.get('documents', [])
            context = "\n".join(relevant_data)
            
            # Call OpenAI API with context
            response = openai.ChatCompletion.create(
                model="gpt-4",
                messages=[
                    {"role": "system", "content": "You are a helpful assistant. Answer based only on the following documents."},
                    {"role": "system", "content": f"Context: {context}"},
                    {"role": "user", "content": user_question}
                ]
            )
            
            # Process and store chatbot response
            reply = response.choices[0].message['content'].strip()
            chatbot_response = {
                "sender": "chatbot",
                "content": reply,
            }
            channel_collection.update_one(
                {'_id': channel_id},
                {'$push': {'messages': chatbot_response}},
                upsert=True
            )
            
            # Publish chatbot response to Ably channel
            await ably_channel.publish('message', chatbot_response)

            return {
                "version": "2.0",
                "template": {
                    "outputs": [
                        {
                            "simpleText": {
                                "text": reply
                            }
                        }
                    ]
                }
            }
        
        else:
            raise HTTPException(status_code=404, detail="Chatbot document not found.")
    
    except Exception as e:
        # Log detailed error message
        logging.error(f"Error: {str(e)}")
        raise HTTPException(status_code=500, detail="An error occurred while processing the request.")

    
    
    
    
    
    
#카카오    


# @app.post("/kakao-wip")
# async def kakao_skill(request: Request):
#     try:
#         # Parse the request data
#         req_data = await request.json()
#         user_question = req_data['userRequest']['utterance']
        
#         # Extract channel_id from headers or request body
#         channel_id = 'chat-4ce7baa6-7634-401b-b93e-deeacc84d83a'  # Check if channel_id is in headers
        
#         # if not channel_id:
#         #     channel_id = req_data.get('channel_id', '')  # Check if channel_id is in request body

#         if not channel_id or not channel_id.startswith('chat-'):
#             raise HTTPException(status_code=400, detail="Invalid Channel ID format.")
        
#         chatbot_id = channel_id[len("chat-"):]

#         # Access MongoDB collections
#         channel_collection: Collection = db['conversation_channels']
#         chatbots_collection: Collection = db['chatbots']

#         # Save user question to MongoDB
#         user_message = {
#             "sender": "user",
#             "content": user_question
#         }
#         channel_collection.update_one(
#             {'_id': channel_id},
#             {'$push': {'messages': user_message}},
#             upsert=True
#         )
#         # Publish chatbot response to Ably channel
#         ably_channel = ably_client.channels.get(channel_id)
#         await ably_channel.publish('message', user_message)

#         # Get chatbot document and process if the message is from the user
#         chatbot_doc = chatbots_collection.find_one({'_id': chatbot_id})
        
#         if chatbot_doc:
#             # Prepare context from documents
#             relevant_data = chatbot_doc.get('documents', [])
#             context = "\n".join(relevant_data)
            
#             # Call OpenAI API with context
#             response = openai.ChatCompletion.create(
#                 model="gpt-4",
#                 messages=[
#                     {"role": "system", "content": "You are a helpful assistant. Answer based only on the following documents."},
#                     {"role": "system", "content": f"Context: {context}"},
#                     {"role": "user", "content": user_question}
#                 ]
#             )
            
#             # Process and store chatbot response
#             reply = response.choices[0].message['content'].strip()
#             chatbot_response = {
#                 "sender": "chatbot",
#                 "content": reply,
#             }
#             channel_collection.update_one(
#                 {'_id': channel_id},
#                 {'$push': {'messages': chatbot_response}},
#                 upsert=True
#             )
            
#             # Publish chatbot response to Ably channel
#             ably_channel = ably_client.channels.get(channel_id)
#             await ably_channel.publish('message', chatbot_response)

#         return {
#             "version": "2.0",
#             "template": {
#                 "outputs": [
#                     {
#                         "simpleText": {
#                             "text": reply
#                         }
#                     }
#                 ]
#             }
#         }
        
#     except Exception as e:
#         # Log detailed error message
#         print(f"Error: {str(e)}")
#         raise HTTPException(status_code=500, detail="An error occurred while processing the request.")
    
    
# @app.post("/kakao")
# async def kakao_skill(request: Request):
#     try:
#         # 카카오에서 보낸 요청 데이터를 파싱
#         req_data = await request.json()
#         user_question = req_data['userRequest']['utterance']
        
#         # OpenAI API 호출하여 답변 받기
#         response = openai.ChatCompletion.create(
#             model="gpt-4",
#             messages=[
#                 {"role": "system", "content": "You are a helpful assistant. Answer the question as accurately as possible."},
#                 {"role": "user", "content": user_question}
#             ]
#         )
        
#         # GPT-4의 답변 추출
#         reply = response.choices[0].message['content'].strip()

#         # 카카오 스킬 응답 형식에 맞게 데이터 구성
#         return {
#             "version": "2.0",
#             "template": {
#                 "outputs": [
#                     {
#                         "simpleText": {
#                             "text": reply
#                         }
#                     }
#                 ]
#             }
#         }
#     except Exception as e:
#         # 에러 발생 시 로그 남기고 HTTP 500 반환
#         print(f"Error: {e}")
#         raise HTTPException(status_code=500, detail=str(e))
        
        

# @app.post("/")
# async def naver_talk_skill(request: Request):
#     try:
#         # 네이버 톡톡에서 보낸 요청 데이터를 파싱
#         req_data = await request.json()
#         user_question = req_data['eventContent']['textContent']['text']

#         # OpenAI API 호출하여 답변 받기
#         response = openai.ChatCompletion.create(
#             model="gpt-4",
#             messages=[
#                 {"role": "system", "content": "You are a helpful assistant. Answer the question as accurately as possible."},
#                 {"role": "user", "content": user_question}
#             ]
#         )
        
#         # GPT-4의 답변 추출
#         reply = response.choices[0].message['content'].strip()

#         # 네이버 톡톡 응답 형식에 맞게 데이터 구성
#         return {
#             "event": "send",
#             "textContent": {
#                 "text": reply
#             }
#         }

#     except Exception as e:
#         # 에러 발생 시 로그 남기고 HTTP 500 반환
#         print(f"Error: {e}")
#         raise HTTPException(status_code=500, detail=str(e))
    
    
    

# Pydantic 모델로 요청 형식 정의
class TextContent(BaseModel):
    text: Optional[str] = None

class Options(BaseModel):
    inflow: Optional[str] = None
    set: Optional[str] = None

class RequestBody(BaseModel):
    event: str
    textContent: Optional[TextContent] = None
    options: Optional[Options] = None



@app.post("/naver")
async def handle_request(request: RequestBody):
    # 기본 응답 설정
    response = {
        "event": "send",
        "textContent": {
            "text": "기본 응답 메시지"
        }
    }

    # 사용자의 질문을 처리
    if request.event == "send":
        if request.textContent and request.textContent.text:
            user_question = request.textContent.text

            try:
                # OpenAI GPT-4 API 호출하여 답변 받기
                ai_response = openai.ChatCompletion.create(
                    model="gpt-4",
                    messages=[
                        {"role": "system", "content": "You are a helpful assistant."},
                        {"role": "user", "content": user_question}
                    ]
                )

                # GPT-4의 답변 추출
                reply = ai_response.choices[0].message['content'].strip()

                # 응답 메시지를 네이버 톡톡에 맞게 설정
                response["textContent"]["text"] = reply
                return response

            except Exception as e:
                # 에러 발생 시 로그 남기고 HTTP 500 반환
                print(f"Error: {e}")
                raise HTTPException(status_code=500, detail="OpenAI API 호출 중 오류가 발생했습니다.")
        else:
            return {"status": "OK"}

    # 그 외 이벤트 처리
    elif request.event == "open":
        # inflow 처리
        if request.options and request.options.inflow == "list":
            response["textContent"]["text"] = "목록에서 눌러서 방문하셨네요."
        elif request.options and request.options.inflow == "button":
            response["textContent"]["text"] = "버튼을 눌러서 방문하셨네요."
        elif request.options and request.options.inflow == "none":
            response["textContent"]["text"] = "방문을 환영합니다."
        return response

    elif request.event == "friend":
        # 친구 이벤트 처리
        if request.options and request.options.set == "on":
            response["textContent"]["text"] = "친구가 되어 주셔서 감사합니다."
        elif request.options and request.options.set == "off":
            response["textContent"]["text"] = "다음 번에 꼭 친구 추가 부탁드려요."
        return response

    # 그 외 이벤트에 대해 200 응답
    return {"status": "OK"}

# FastAPI 실행 명령








from fastapi import FastAPI, Query
# from fastapi.responses import PlainTextResponse

# from fastapi import FastAPI, Request, HTTPException
# from pymongo.collection import Collection
import requests
# import logging
# import openai

# @app.get('/')
# def verify_subscription(
#     hub_mode: str = Query(..., alias="hub.mode"),
#     hub_challenge: str = Query(..., alias="hub.challenge"),
#     hub_verify_token: str = Query(..., alias="hub.verify_token")
# ):
#     # Make sure that the verify token matches what Instagram expects
#     if hub_mode == 'subscribe' and hub_verify_token == 'EAAH0ZCNZBfNwwBO5ipucP2MlWd5O27vE3bi6Bei6AZBKu04jPwvorp45Y5Q7rjOLMnGrw9IlDQZCU2xZCZCm5nfNQP4vsZBC8ATbrYN9GGPqqW76wZAYjhJPElmfoT2pl8zZCM6sqEiNV1UZA8bDmISyurJVG5bmalD98MarbA4ZA0n2dojIpL7knvtC8SaL6ZCMkBZC6wL9ZBnZAVhtwZDZD':
#         # Return the challenge as plain text, not as JSON
#         return PlainTextResponse(content=hub_challenge)
#     return {"status": "Verification failed"}, 403

# INSTAGRAM_API_URL = "https://graph.instagram.com"
# INSTAGRAM_APP_ID = "550841897400076"


# # Instagram 웹훅 인증

# # 웹훅 인증 엔드포인트 수정
# @app.get("/webhook")
# async def verify_webhook(
#     hub_mode: str = Query(..., alias="hub.mode"),
#     hub_challenge: str = Query(..., alias="hub.challenge"),
#     hub_verify_token: str = Query(..., alias="hub.verify_token")
# ):
#     if hub_mode == "subscribe" and hub_verify_token == 'EAAH0ZCNZBfNwwBO89NQZAbj1pGFZByDSL9ZADUPgWr3DT5pEFZBNzecnUlcvowcxbzmyQ9V7qmEOlUZAKp3QSP9SSx1kiBuceZCFjCBPji9F5Qi5oMLERmXVaPVtGx62RYKRZC2iLZBzn0GqTl9KFcZBe9QL9qFvpK7hKN4D65db3uk7juBYSDypMJRFutyFZASi0JYxz0IQe80jRAZDZD':
#         return int(hub_challenge)
#     raise HTTPException(status_code=403, detail="Verification token mismatch")
# # Instagram DM 처리 및 자동 응답


# # Instagram 메시지 보내기
# def send_instagram_message(recipient_id, message_text):
#     url = f"https://graph.instagram.com/v20.0/me/messages?access_token={INSTAGRAM_ACCESS_TOKEN}"
#     headers = {"Content-Type": "application/json"}
#     payload = {
#         "recipient": {"id": recipient_id},
#         "message": {"text": message_text},
#     }
#     response = requests.post(url, headers=headers, json=payload)
#     return response.json()

# # OpenAI GPT-3 답변 생성
# def get_gpt_response(message_text):
#     response = openai.Completion.create(
#         model="text-davinci-003",
#         prompt=message_text,
#         max_tokens=150
#     )
#     return response.choices[0].text.strip()
# @app.post("/webhook")
# async def receive_message(request: Request):
#     body = await request.json()

#     if body.get("object") == "user":
#         for entry in body.get("entry", []):
#             for messaging_event in entry.get("messaging", []):
#                 if messaging_event.get("message"):
#                     sender_id = messaging_event["sender"]["id"]
#                     message_text = messaging_event["message"].get("text")

#                     if message_text:
#                         # OpenAI GPT-3 API로 답변 생성
#                         gpt_response = get_gpt_response(message_text)

#                         # 답변을 인스타그램 DM으로 전송
#                         send_instagram_message(sender_id, gpt_response)
    
#     return {"status": "received"}

INSTAGRAM_ACCESS_TOKEN = os.getenv("INSTAGRAM_ACCESS_TOKEN")

if not INSTAGRAM_ACCESS_TOKEN:
    logging.error("Instagram Access Token is missing or not set properly")



@app.get("/webhook")
async def verify_webhook(
    hub_mode: str = Query(..., alias="hub.mode"),
    hub_challenge: str = Query(..., alias="hub.challenge"),
    hub_verify_token: str = Query(..., alias="hub.verify_token")
):
    VERIFY_TOKEN = os.getenv("INSTAGRAM_VERIFY_TOKEN")  # .env에 저장된 verify token을 사용
    if hub_mode == "subscribe" and hub_verify_token == VERIFY_TOKEN:
        return int(hub_challenge)
    raise HTTPException(status_code=403, detail="Verification token mismatch")

import logging

def send_instagram_message(recipient_id, message_text):
    url = f"https://graph.instagram.com/me/messages?access_token={os.getenv('INSTAGRAM_ACCESS_TOKEN')}"
    headers = {"Content-Type": "application/json"}
    payload = {
        "recipient": {"id": recipient_id},
        "message": {"text": message_text},
    }

    response = requests.post(url, headers=headers, json=payload)

    if response.status_code != 200:
        logging.error(f"Failed to send message: {response.status_code}, {response.text}")
        raise HTTPException(status_code=400, detail=f"Failed to send message: {response.status_code}, {response.text}")

    return response.json()

@app.post("/webhook")
async def receive_message(request: Request):
    body = await request.json()
    logging.info(f"Received body: {body}")

    if body.get("object") == "instagram":
        for entry in body.get("entry", []):
            for messaging_event in entry.get("messaging", []):
                if "message" in messaging_event:
                    sender_id = messaging_event["sender"]["id"]
                    message_text = messaging_event["message"].get("text")
                    logging.info(f"Received DM from {sender_id}: {message_text}")

                    if message_text:
                        reply_text = "what do you mean?"
                        logging.info(f"Sending message to {sender_id}: {reply_text}")

                        # 메시지 전송 시도
                        try:
                            send_instagram_message(sender_id, reply_text)
                        except HTTPException as e:
                            logging.error(f"Error sending message: {e}")
                            return {"status": "error", "detail": str(e)}

    return {"status": "received"}


# # 로깅 설정
# logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")
# @app.post("/webhook")
# async def receive_message(request: Request):
#     try:
#         # 요청된 JSON 데이터 확인
#         body = await request.json()
#         logging.info(f"Received body: {body}")

#         # Instagram 메시지 보내기
#         # def send_instagram_message(recipient_id, message_text):
#         #     url = f"https://graph.instagram.com/me/messages?access_token=EAAH0ZCNZBfNwwBO89NQZAbj1pGFZByDSL9ZADUPgWr3DT5pEFZBNzecnUlcvowcxbzmyQ9V7qmEOlUZAKp3QSP9SSx1kiBuceZCFjCBPji9F5Qi5oMLERmXVaPVtGx62RYKRZC2iLZBzn0GqTl9KFcZBe9QL9qFvpK7hKN4D65db3uk7juBYSDypMJRFutyFZASi0JYxz0IQe80jRAZDZD"
#         #     headers = {"Content-Type": "application/json"}
#         #     payload = {
#         #         "recipient": {"id": recipient_id},
#         #         "message": {"text": message_text},
#         #     }
#         #     logging.info(f"Sending message to {recipient_id}: {message_text}")
#         #     response = requests.post(url, headers=headers, json=payload)

#         #     if response.status_code == 200:
#         #         logging.info("Message sent successfully")
#         #     else:
#         #         logging.error(f"Failed to send message: {response.status_code}, {response.text}")

#         #     return response.json()
        
        
#         # Instagram 메시지 보내기
#         def send_instagram_message(recipient_id, message_text):
#             url = f"https://graph.instagram.com/me/messages?access_token=EAAH0ZCNZBfNwwBO89NQZAbj1pGFZByDSL9ZADUPgWr3DT5pEFZBNzecnUlcvowcxbzmyQ9V7qmEOlUZAKp3QSP9SSx1kiBuceZCFjCBPji9F5Qi5oMLERmXVaPVtGx62RYKRZC2iLZBzn0GqTl9KFcZBe9QL9qFvpK7hKN4D65db3uk7juBYSDypMJRFutyFZASi0JYxz0IQe80jRAZDZD"
#             headers = {"Content-Type": "application/json"}
#             payload = {
#                 "recipient": {"id": recipient_id},
#                 "message": {"text": message_text},
#             }

#             try:
#                 response = requests.post(url, headers=headers, json=payload)
#                 response.raise_for_status()  # HTTPError가 발생하면 예외로 처리
#                 logging.info(f"Successfully sent message to {recipient_id}: {message_text}")
#                 return response.json()
#             except requests.exceptions.HTTPError as http_err:
#                 logging.error(f"HTTP error occurred: {http_err}")
#                 logging.error(f"Response content: {response.content}")
#             except Exception as e:
#                 logging.error(f"Failed to send message: {e}")

#             return None


#         # OpenAI GPT-3 답변 생성
#         def get_gpt_response(message_text):
#             try:
#                 logging.info(f"Generating GPT-3 response for message: {message_text}")
#                 response = openai.ChatCompletion.create(
#                     model="gpt-3.5-turbo",  # 최신 모델 사용
#                     messages=[
#                         {"role": "system", "content": "You are a helpful assistant."},
#                         {"role": "user", "content": message_text}
#                     ],
#                     max_tokens=150
#                 )
#                 gpt_text = response['choices'][0]['message']['content'].strip()
#                 logging.info(f"GPT-3 response: {gpt_text}")
#                 return gpt_text
#             except Exception as e:
#                 logging.error(f"Error generating GPT response: {e}")
#                 return None

#         # 인스타그램으로부터 메시지 이벤트가 도착하면 처리
#         if body.get("object") == "instagram":  # "user" 대신 "instagram"으로 수정
#             for entry in body.get("entry", []):
#                 for messaging_event in entry.get("messaging", []):
#                     if messaging_event.get("message"):
#                         sender_id = messaging_event["sender"]["id"]
#                         message_text = messaging_event["message"].get("text")

#                         logging.info(f"Received DM from {sender_id}: {message_text}")

#                         if message_text:
#                             # OpenAI GPT-3 API로 답변 생성
#                             gpt_response = get_gpt_response(message_text)

#                             if gpt_response:
#                                 # 답변을 인스타그램 DM으로 전송
#                                 send_instagram_message(sender_id, gpt_response)
#                             else:
#                                 logging.error("GPT response was not generated")
#                         else:
#                             logging.warning(f"Message text is empty: {messaging_event}")

#         return {"status": "received"}
    
#     except Exception as e:
#         logging.error(f"Error in webhook processing: {e}")
#         raise HTTPException(status_code=500, detail="Internal Server Error")






# @app.post("/")
# async def handle_request(request: RequestBody):
#     # 요청 본문 로깅
#     print(request.dict())

#     # 기본 응답 설정
#     response = {
#         "event": "send",
#         "textContent": {
#             "text": "ㄴㅇㄹㄴㅇㄹ"
#         }
#     }

#     # 이벤트 처리
#     if request.event == "send":
#         if request.textContent and request.textContent.text:
#             # echo 메시지 처리
#             response["textContent"]["text"] = f"echo: {request.textContent.text}"
#             return response
#         else:
#             return {"status": "OK"}

#     elif request.event == "open":
#         # inflow 처리
#         if request.options and request.options.inflow == "list":
#             response["textContent"]["text"] = "목록에서 눌러서 방문하셨네요."
#         elif request.options and request.options.inflow == "button":
#             response["textContent"]["text"] = "버튼을 눌러서 방문하셨네요."
#         elif request.options and request.options.inflow == "none":
#             response["textContent"]["text"] = "방문을 환영합니다."
#         return response

#     elif request.event == "friend":
#         # 친구 이벤트 처리
#         if request.options and request.options.set == "on":
#             response["textContent"]["text"] = "친구가 되어 주셔서 감사합니다."
#         elif request.options and request.options.set == "off":
#             response["textContent"]["text"] = "다음 번에 꼭 친구 추가 부탁드려요."
#         return response

#     # 그 외 이벤트에 대해 200 응답
#     return {"status": "OK"}

# # FastAPI 실행 명령
# # uvicorn main:app --reload

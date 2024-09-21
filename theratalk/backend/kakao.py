from fastapi import FastAPI, HTTPException, Request
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

load_dotenv()

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
    id: str
    content: str
    # Add other fields as necessary

class DataResponse(BaseModel):
    data: List[DataItem]

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

@app.post("/api/send_message")
async def send_message(request: ChatRequest):
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
        await channel.publish('message', message_data)

        # Publish the message to the channel
       
        # If the message is from the user, get a response from the chatbot
        if request.message.sender == "user":
            response = openai.ChatCompletion.create(
                model="gpt-4",
                messages=[
                    {"role": "system", "content": "You are a helpful assistant. Answer the question as accurately as possible."},
                    {"role": "user", "content": request.message.content}
                ]
            )
            
            # Extract the chatbot's response
            reply = response.choices[0].message['content'].strip()
            
            # Create a message data structure for the chatbot response
            chatbot_response = {
                "sender": "chatbot",
                "content": reply,
                # "timestamp": message_data['timestamp']  # Use the same timestamp for consistency
            }
            
            # Store the chatbot's response in MongoDB
            channel_collection.update_one(
                {'_id': channel_id},
                {'$push': {'messages': chatbot_response}}
            )
            
            # Publish the chatbot's reply to the channel
            await channel.publish('message', chatbot_response)

        return {"message": "Message sent successfully"}
    except Exception as e:
        print(f"Error sending message: {e}")
        raise HTTPException(status_code=400, detail=str(e))
    
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



@app.get("/api/chatbots/{chatbot_id}/data", response_model=DataResponse)
async def get_data(chatbot_id: str):
    try:
        chatbots_collection: Collection = db['chatbots']
        chatbot_doc = chatbots_collection.find_one({'_id': chatbot_id})
        if chatbot_doc:
            # Assuming 'documents' is a list of dicts
            data = chatbot_doc.get('documents', [])
            # Convert data to a list of DataItem instances if necessary
            # Here we assume the data is already in the required format
            return {"data": data}
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
    
    
    
@app.post("/kakao-wip")
async def kakao_skill(request: Request):
    try:
        # 카카오에서 보낸 요청 데이터를 파싱
        req_data = await request.json()
        user_question = req_data['userRequest']['utterance']
        
        # OpenAI API 호출하여 답변 받기
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "You are a helpful assistant. Answer the question as accurately as possible."},
                {"role": "user", "content": user_question}
            ]
        )
        
        # GPT-4의 답변 추출
        reply = response.choices[0].message['content'].strip()

        # 카카오 스킬 응답 형식에 맞게 데이터 구성
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
    except Exception as e:
        # 에러 발생 시 로그 남기고 HTTP 500 반환
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))
        
        

@app.post("/")
async def naver_talk_skill(request: Request):
    try:
        # 네이버 톡톡에서 보낸 요청 데이터를 파싱
        req_data = await request.json()
        user_question = req_data['eventContent']['textContent']['text']

        # OpenAI API 호출하여 답변 받기
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "You are a helpful assistant. Answer the question as accurately as possible."},
                {"role": "user", "content": user_question}
            ]
        )
        
        # GPT-4의 답변 추출
        reply = response.choices[0].message['content'].strip()

        # 네이버 톡톡 응답 형식에 맞게 데이터 구성
        return {
            "event": "send",
            "textContent": {
                "text": reply
            }
        }

    except Exception as e:
        # 에러 발생 시 로그 남기고 HTTP 500 반환
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))
    
    
    
# @app.post('/naver')
# async def root(request:Request):

#     req_data = await request.json()
#     print(req_data)
    
#     return {'status':'okok'}


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



@app.post("/")
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

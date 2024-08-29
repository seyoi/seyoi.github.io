from fastapi import FastAPI, HTTPException, Request
from pydantic import BaseModel
import openai
import firebase_admin
from firebase_admin import credentials, firestore, auth
from typing import List
from datetime import datetime
from fastapi.middleware.cors import CORSMiddleware

# Firebase 초기화
cred = credentials.Certificate("/Users/matias/Documents/github/seyoi.github.io/gpt/hanna-9d44a-firebase-adminsdk-z3ecc-098497e37f.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

app = FastAPI()

from dotenv import load_dotenv
import os
load_dotenv()
api_key = os.environ.get('OPENAI_API_KEY')

# CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


print("hihi")

# 모델 정의
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
    chatbotId: int
    data: str

class User(BaseModel):
    email: str
    password: str

# 대화 채널 생성 엔드포인트
@app.post("/api/create_channel")
async def create_channel(channel_id: str):
    try:
        # Firestore에 새로운 대화 채널 생성
        channel_ref = db.collection('conversation_channels').document(channel_id)
        channel_ref.set({
            'messages': []
        })
        return {"message": "Channel created successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# 대화 내용 저장 엔드포인트
@app.post("/api/send_message")
async def send_message(request: ChatRequest):
    try:
        # Firestore에서 대화 채널 참조
        channel_ref = db.collection('conversation_channels').document(request.channel_id)
        # 대화 내용 추가
        channel_ref.update({
            'messages': firestore.ArrayUnion([request.message.dict()])
        })
        return {"message": "Message sent successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# 대화 내용 조회 엔드포인트
@app.get("/api/get_conversation/{channel_id}")
async def get_conversation(channel_id: str):
    try:
        # Firestore에서 대화 채널 조회
        channel_ref = db.collection('conversation_channels').document(channel_id)
        doc = channel_ref.get()
        if doc.exists:
            return doc.to_dict()
        else:
            raise HTTPException(status_code=404, detail="Channel not found")
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# 사용자 등록 엔드포인트
@app.post("/register")
async def register_user(user: User):
    try:
        # Firebase Authentication을 사용하여 사용자 등록
        user_record = auth.create_user(
            email=user.email,
            password=user.password
        )
        return {"uid": user_record.uid}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# 사용자 인증 엔드포인트
@app.post("/login")
async def login_user(user: User):
    try:
        # Firebase Authentication을 사용하여 사용자 로그인
        user_record = auth.get_user_by_email(user.email)
        return {"uid": user_record.uid}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# 챗봇 데이터 전송 엔드포인트
@app.post("/api/chatbots/data")
async def submit_data(request: DataRequest):
    try:
        # Firestore에 챗봇 데이터 저장
        chatbots_ref = db.collection('chatbots')
        chatbot_ref = chatbots_ref.document(str(request.chatbotId))
        chatbot_doc = chatbot_ref.get()
        if chatbot_doc.exists:
            chatbot_data = chatbot_doc.to_dict()
            if "documents" not in chatbot_data:
                chatbot_data["documents"] = []
            chatbot_data["documents"].append(request.data)
            chatbot_ref.update({"documents": chatbot_data["documents"]})
            return {"message": "Data submitted successfully"}
        else:
            raise HTTPException(status_code=404, detail="Chatbot not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 대화 엔드포인트
@app.post("/api/chat/")
async def chat(request: ChatRequest):
    try:
        # Firestore에서 챗봇 데이터 조회
        chatbots_ref = db.collection('chatbots')
        chatbot_doc = chatbots_ref.document(str(request.channel_id)).get()
        if chatbot_doc.exists:
            chatbot_data = chatbot_doc.to_dict()
            relevant_data = chatbot_data.get("documents", [])
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

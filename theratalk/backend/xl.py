from fastapi import FastAPI, File, UploadFile, HTTPException
import pandas as pd
from fastapi.middleware.cors import CORSMiddleware
from io import BytesIO
import math
from fastapi.responses import JSONResponse

app = FastAPI()

# CORS 설정 (React 또는 다른 클라이언트와 통신할 수 있도록)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 특정 도메인을 허용하거나 "*"로 모든 도메인을 허용할 수 있음
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 데이터에서 NaN, Infinity, -Infinity 값을 처리하는 함수
def sanitize_data(data):
    if isinstance(data, float) and (math.isnan(data) or math.isinf(data)):
        return None
    elif isinstance(data, list):
        return [sanitize_data(item) for item in data]
    elif isinstance(data, dict):
        return {key: sanitize_data(value) for key, value in data.items()}
    return data

# 엑셀 파일을 업로드하고 데이터를 반환하는 API
@app.post("/upload-excel/")
async def upload_excel(file: UploadFile = File(...)):
    try:
        # 파일 확장자 검사
        if not file.filename.endswith('.xlsx'):
            raise HTTPException(status_code=400, detail="Invalid file type. Only .xlsx files are allowed.")

        # 엑셀 파일 읽기
        df = pd.read_excel(file.file)
        
        # 엑셀 데이터를 JSON 형태로 변환
        data = df.to_dict(orient="records")

        # NaN 값 처리
        sanitized_data = sanitize_data(data)
        
        return JSONResponse(content=sanitized_data)

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing file: {str(e)}")
    
@app.post("/upload-excel/")
async def upload_excel(file: UploadFile = File(...)):
    # 엑셀 파일 확장자 검증
    if not file.filename.endswith(('.xls', '.xlsx')):
        raise HTTPException(status_code=400, detail="엑셀 파일만 업로드 가능합니다.")
    
    # 엑셀 파일을 판다스로 읽음
    contents = await file.read()
    excel_data = pd.read_excel(BytesIO(contents))
    
    # DataFrame을 JSON으로 변환하여 반환
    return {"data": excel_data.to_dict(orient="records")}

@app.post("/save-edits/")
async def save_edits(data: list):
    # 데이터를 받으면 서버에서 처리를 할 수 있음 (파일로 저장 또는 데이터베이스에 저장)
    df = pd.DataFrame(data)
    # 예시로 엑셀 파일로 다시 저장 (파일 경로는 실제로 원하는 위치에 맞게 변경)
    df.to_excel("edited_data.xlsx", index=False)
    
    return {"message": "Data saved successfully"}

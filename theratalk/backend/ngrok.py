from pyngrok import ngrok

# FastAPI 서버가 실행될 포트
port = 8000

# ngrok 터널 열기
public_url = ngrok.connect(port)
print(f"ngrok tunnel opened: {public_url}")



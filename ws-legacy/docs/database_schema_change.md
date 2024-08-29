# Prisma 스키마 + DB 업데이트(마이그레이션) 방법
1. 로컬에서 스키마 변경사항 발생시(./prisma/schema.prisma) 실행
   ```npx prisma migrate dev```
1. 로컬에서 생성된 마이그레이션 히스토리는 deva / prod에 코드 푸시되면 빌드할 때 자동으로 반영. 로컬에서 npx prisma migrate deploy
명령어 사용 안해도됨.

## 주의사항
- 마이그레이션 히스토리는 DB 서버에서 직접 건들지말고 롤백 히스토리 남기기. 꼬일 수 있음

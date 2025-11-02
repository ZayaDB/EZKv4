# Railway 배포 가이드

## 1. Railway 프로젝트 생성

1. [Railway](https://railway.app)에 로그인
2. "New Project" 클릭
3. "Deploy from GitHub repo" 선택
4. `ZayaDB/EZKv4` 레포지토리 선택
5. 백엔드 디렉토리 설정:
   - Root Directory: `backend`

## 2. PostgreSQL 데이터베이스 추가

1. Railway 프로젝트에서 "New" → "Database" → "Add PostgreSQL" 클릭
2. 생성된 데이터베이스의 연결 정보 확인:
   - `DATABASE_URL` 환경 변수가 자동으로 생성됨

## 3. 환경 변수 설정

Railway 프로젝트의 "Variables" 탭에서 다음 환경 변수 추가:

### 필수 환경 변수
- `DATABASE_URL`: PostgreSQL 연결 문자열 (자동 생성됨)
- `JWT_SECRET`: JWT 암호화 키 (랜덤 문자열 권장)
- `JWT_REFRESH_SECRET`: Refresh Token 암호화 키 (랜덤 문자열 권장)

### 선택적 환경 변수
- `JWT_EXPIRES_IN`: Access Token 만료 시간 (기본값: `15m`)
- `JWT_REFRESH_EXPIRES_IN`: Refresh Token 만료 시간 (기본값: `7d`)
- `PORT`: 서버 포트 (기본값: 3000, Railway가 자동 설정)
- `NODE_ENV`: 환경 모드 (`production`)
- `FRONTEND_URL`: 프론트엔드 URL (Netlify 배포 후 URL)

### 환경 변수 예시
```
JWT_SECRET=your-super-secret-jwt-key-min-32-characters-long
JWT_REFRESH_SECRET=your-super-secret-refresh-jwt-key-min-32-characters-long
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
NODE_ENV=production
FRONTEND_URL=https://your-frontend.netlify.app
```

## 4. 빌드 및 배포 설정

Railway는 자동으로 다음을 수행합니다:
1. `npm install` - 의존성 설치
2. `npm run build` - Prisma Client 생성 + TypeScript 컴파일
3. `npm run start` - 서버 시작

### Prisma 마이그레이션

Railway에서 배포 후, 서비스에 연결하여 마이그레이션 실행:

```bash
# Railway CLI 사용
railway link
railway run npx prisma migrate deploy
```

또는 Railway 웹 인터페이스에서:
1. 프로젝트 → 서비스 → "Variables" 탭
2. "New Variable"에서 커맨드 실행:
   - Command: `npx prisma migrate deploy`

## 5. 배포 확인

1. 배포 완료 후 서비스 URL 확인 (Railway가 자동 생성)
2. Health check 엔드포인트 테스트:
   ```
   GET https://your-api.railway.app/api/health
   ```
3. 응답 확인:
   ```json
   {
     "status": "ok",
     "message": "EZKv4 API is running"
   }
   ```

## 6. 프론트엔드 환경 변수 설정

Netlify 배포 시 프론트엔드 `.env` 파일에 다음 추가:
```
VITE_API_URL=https://your-api.railway.app
```

## 7. 트러블슈팅

### Prisma Client 생성 오류
- Railway 빌드 로그 확인
- `postinstall` 스크립트가 실행되는지 확인

### 데이터베이스 연결 오류
- `DATABASE_URL` 환경 변수 확인
- PostgreSQL 서비스가 실행 중인지 확인

### CORS 오류
- `FRONTEND_URL` 환경 변수 설정 확인
- 백엔드에서 올바른 프론트엔드 URL 허용 확인

## 8. 자동 배포 설정

GitHub 레포지토리와 연결하면:
- `master` 브랜치에 푸시할 때마다 자동 배포
- Pull Request마다 Preview 배포 가능


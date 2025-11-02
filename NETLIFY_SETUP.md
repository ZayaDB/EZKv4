# Netlify 배포 설정 가이드

## 1. Netlify 프로젝트 생성

1. [Netlify](https://netlify.com)에 로그인
2. "Add new site" → "Import an existing project" 클릭
3. GitHub 레포지토리 선택: `ZayaDB/EZKv4`
4. 빌드 설정:
   - Build command: `npm run build:frontend`
   - Publish directory: `frontend/dist`
   - Base directory: (비워두거나 `frontend`)

## 2. 환경 변수 설정

Netlify 프로젝트의 "Site settings" → "Environment variables"에서:

### 필수 환경 변수
- `VITE_API_URL`: Railway 백엔드 API URL
  - 형식: `https://your-backend-api.railway.app`
  - 예시: `https://ezkv4-frontend-production.up.railway.app`
  - ⚠️ **주의**: `https://` 프로토콜 포함해야 함
  - ⚠️ **주의**: 백엔드 API 서비스의 URL이어야 함 (프론트엔드가 아닌)

### 빌드 설정
- Node version: `18` (netlify.toml에 설정됨)

## 3. 빌드 명령어

Netlify는 다음과 같이 빌드를 실행합니다:
1. `npm install` (루트 디렉토리)
2. `npm run build:frontend` (프론트엔드 빌드)
3. `frontend/dist` 디렉토리를 배포

## 4. 트러블슈팅

### 빌드 실패 시
1. Netlify 빌드 로그 확인
2. 로컬에서 빌드 테스트:
   ```bash
   npm run build:frontend
   ```
3. `frontend/dist` 디렉토리가 생성되는지 확인

### 환경 변수 오류
- `VITE_API_URL`이 설정되어 있는지 확인
- Netlify 대시보드에서 환경 변수 재확인

### SPA 라우팅 오류
- `netlify.toml`의 `redirects` 설정 확인
- 모든 경로가 `index.html`로 리다이렉트되어야 함

## 5. 배포 확인

1. 배포 완료 후 Netlify URL로 접속
2. 개발자 도구 콘솔 확인 (오류 체크)
3. API 연결 테스트 (Railway 백엔드와 통신)


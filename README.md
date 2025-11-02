# EZKv4 - 유학생 온라인 클래스 플랫폼

한국 유학생을 위한 종합 온라인 클래스 플랫폼

## 기술 스택

### 프론트엔드
- React + Vite
- Tailwind CSS
- react-i18next (다국어: 몽골어, 한국어, 영어)
- Socket.io-client
- Zustand (상태 관리)

### 백엔드
- Node.js + Express
- PostgreSQL + Prisma
- JWT 인증
- Socket.io

### 배포
- 백엔드: Railway
- 프론트엔드: Netlify

## 프로젝트 구조

```
EZKv4/
├── frontend/       # React 프론트엔드
├── backend/        # Node.js 백엔드
└── shared/         # 공통 타입/유틸리티
```

## 개발 시작하기

### 1. 의존성 설치

```bash
npm run install:all
```

### 2. 환경 변수 설정

#### Backend (.env)
```env
DATABASE_URL="postgresql://..."
JWT_SECRET="..."
JWT_REFRESH_SECRET="..."
PORT=3000
NODE_ENV=development
```

#### Frontend (.env)
```env
VITE_API_URL=http://localhost:3000
```

### 3. 개발 서버 실행

```bash
npm run dev
```

## 주요 기능

- 사용자 인증 및 역할 관리 (Admin, 강사, 학생)
- 온라인 강의 시스템
- 실시간 채팅
- 라이브 방송
- 블로그/게시판
- 동아리 시스템
- 다국어 지원
- 다크 모드
- Notification 시스템

## 라이선스

MIT


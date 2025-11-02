# Railway 설정 가이드

## 현재 설정 상태

### ✅ PostgreSQL 데이터베이스
```
postgresql://postgres:WyiAfGdEBOYjVCFcNZYqaIaVgUtnREfW@switchyard.proxy.rlwy.net:42610/railway
```

### ✅ 환경 변수 설정

#### 백엔드 서비스 Variables에 다음 추가 필요:
- `DATABASE_URL` = `postgresql://postgres:WyiAfGdEBOYjVCFcNZYqaIaVgUtnREfW@switchyard.proxy.rlwy.net:42610/railway`
- `JWT_SECRET` = `JWT_SECRET123` (⚠️ 보안상 더 강력한 값 권장)
- `JWT_REFRESH_SECRET` = `JWT_REFRESH_SECRET123` (⚠️ 보안상 더 강력한 값 권장)
- `NODE_ENV` = `production` (선택사항)
- `PORT` = (Railway가 자동 설정)

## 중요 사항

### 1. DATABASE_URL 설정
- PostgreSQL 서비스를 추가하면 `DATABASE_URL`이 자동으로 생성됩니다
- 백엔드 서비스와 PostgreSQL 서비스를 연결해야 합니다:
  - 백엔드 서비스 → "Variables" 탭 → "Reference Variable" 클릭
  - PostgreSQL 서비스 선택 → `DATABASE_URL` 선택
  - 또는 직접 값 복사해서 추가

### 2. JWT Secret 보안 강화 권장
현재 값이 너무 단순하므로 프로덕션 환경에서는 다음을 권장합니다:

```bash
# Node.js로 랜덤 문자열 생성
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

또는 온라인 랜덤 문자열 생성기 사용

### 3. 배포 확인
1. 백엔드 서비스 배포 완료 확인
2. Health check 테스트:
   ```
   https://your-api.railway.app/api/health
   ```
3. 로그 확인:
   - Railway 대시보드 → 서비스 → "Deployments" → 최신 배포 클릭 → "View Logs"

### 4. Prisma 마이그레이션
배포 시 `npm run start` 스크립트가 자동으로 `prisma migrate deploy`를 실행합니다.
마이그레이션이 성공했는지 로그에서 확인하세요.

## 트러블슈팅

### DATABASE_URL 연결 오류
- PostgreSQL 서비스가 실행 중인지 확인
- 백엔드 서비스의 Variables에 `DATABASE_URL`이 제대로 설정되었는지 확인
- 값에 특수문자가 있다면 인코딩 필요할 수 있음

### 마이그레이션 실패
- 로그에서 오류 메시지 확인
- Prisma 스키마 문법 오류 확인
- 데이터베이스 연결 확인


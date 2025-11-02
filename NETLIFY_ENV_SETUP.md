# Netlify 환경 변수 설정 가이드

## Railway 백엔드 URL 설정

### 1. Netlify 대시보드 접속
1. Netlify 프로젝트 선택
2. "Site settings" 클릭
3. 왼쪽 메뉴에서 "Environment variables" 클릭

### 2. 환경 변수 추가
"Add a variable" 버튼 클릭 후 다음 설정:

- **Key**: `VITE_API_URL`
- **Value**: `https://ezkv4-frontend-production.up.railway.app`
- **Scopes**: "All scopes" 선택 (Production, Deploy previews, Branch deploys)

⚠️ **주의사항**:
- `https://` 프로토콜을 반드시 포함해야 합니다
- Railway URL이 백엔드 API 서비스인지 확인 (프론트엔드 서비스가 아님)
- 값 끝에 `/` 슬래시를 포함하지 않습니다

### 3. 재배포
환경 변수를 추가한 후:
1. "Deploys" 탭으로 이동
2. "Trigger deploy" → "Deploy site" 클릭
3. 빌드 완료 후 배포 확인

### 4. 확인 방법
배포 후 브라우저 개발자 도구(F12) → Console에서:
```javascript
console.log(import.meta.env.VITE_API_URL)
```
설정한 URL이 출력되는지 확인

## 환경 변수 확인 체크리스트

- [ ] `VITE_API_URL` 변수 추가 완료
- [ ] Value에 `https://` 포함 확인
- [ ] Railway 백엔드 API URL 확인 (프론트엔드 URL이 아님)
- [ ] 재배포 완료
- [ ] 브라우저에서 API 연결 테스트

## 트러블슈팅

### CORS 오류 발생 시
- Railway 백엔드의 `FRONTEND_URL` 환경 변수 확인
- Netlify 배포된 URL을 Railway 백엔드 `FRONTEND_URL`에 추가

### API 연결 안 됨
1. Railway 백엔드 서비스가 실행 중인지 확인
2. Health check 테스트:
   ```
   https://ezkv4-frontend-production.up.railway.app/api/health
   ```
3. Netlify 환경 변수가 올바르게 설정되었는지 확인
4. 재배포 후 브라우저 캐시 삭제


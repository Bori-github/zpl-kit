# ZPL Kit Web Demo

React 기반 웹 데모 애플리케이션입니다. `@zpl-kit/react-zpl` 컴포넌트를 사용하여 ZPL Kit 기능을 테스트할 수 있습니다.

## 기능

- React ZPL 라이브러리 통합
- Hot Module Replacement (HMR) 지원
- 빠른 개발 환경 (Vite)

## 개발

```bash
# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm dev
```

개발 서버는 기본적으로 `http://localhost:3000`에서 실행됩니다.

## 빌드

```bash
# 프로덕션 빌드
pnpm build

# 빌드 결과 미리보기
pnpm preview
```

## 구조

```
web/
├── src/
│   ├── App.tsx        # 메인 앱 컴포넌트
│   ├── App.css        # 앱 스타일
│   ├── main.tsx       # 진입점
│   └── index.css      # 전역 스타일
├── public/            # 정적 파일
├── index.html         # HTML 템플릿
├── vite.config.ts     # Vite 설정
└── package.json       # 프로젝트 설정

```

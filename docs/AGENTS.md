# AGENTS.md — docs 작업 가이드

You are an expert in JavaScript, TypeScript, React, and ZPL (Zebra Programming Language) label development. You write maintainable, performant, and well-typed code.

---

## Project Overview

`zpl-kit` is a monorepo for building and previewing ZPL labels using React. It provides a core library for generating ZPL commands via React components, along with demos for web and Electron environments.

---

## Monorepo Structure

```
zpl-kit/
├── apps/
│   └── react-zpl/          # Core library: ZPL command generation via React
│       └── src/
│           ├── commands/   # ZPL command builders (graphicBox, text, etc.)
│           ├── components/ # React components (ZplLabel, Text, Line, etc.)
│           ├── constants/  # align, color, encoding, orientation
│           ├── types/      # Shared TypeScript types
│           └── utils/      # render, print utilities
│
├── demos/
│   ├── web/                # Vite + React demo app
│   │   └── src/
│   │       ├── App.tsx
│   │       └── examples/
│   │
│   └── electron/           # Electron demo app
│       └── src/
│           ├── main/       # Electron main process
│           ├── preload/    # Preload scripts
│           └── renderer/src/
│               ├── App.tsx
│               └── examples/
│
└── docs/                   # Documentation (Rspress v2)
    ├── docs/               # 문서 콘텐츠 루트
    ├── plans/              # (gitignore)
    └── rspress.config.ts
```

---

## Commands

**루트(zpl-kit/)에서 실행:**

- `pnpm docs:dev` — 문서 개발 서버 (포트 8000)
- `pnpm docs:build` — 문서 빌드
- `pnpm docs:preview` — 문서 빌드 미리보기

**docs/에서 실행:**

- `pnpm dev` — 문서 개발 서버 (rspress dev --port 8000)
- `pnpm build` — 문서 빌드 (rspress build)
- `pnpm preview` — 문서 빌드 미리보기 (rspress preview)

---

## Docs

- Rspress: https://rspress.rs/llms.txt
- Rsbuild: https://rsbuild.rs/llms.txt
- Rspack: https://rspack.rs/llms.txt
- ZPL Reference: https://www.zebra.com/content/dam/zebra/manuals/printers/common/programming/zpl-zbi2-pm-en.pdf

---

## Key Conventions

- ZPL commands are generated at render time from React component trees
- Components in `apps/react-zpl/src/components/` map 1:1 to ZPL commands
- All ZPL output should begin with `^XA` and end with `^XZ`
- Use TypeScript strict mode; avoid `any` types
- Shared types live in `apps/react-zpl/src/types/`

---

## docs/ 디렉토리 구조

```
docs/
├── docs/                        # 문서 콘텐츠 루트 (rspress root: 'docs')
│   ├── _nav.json                # 최상위 네비게이션 탭 정의 (v2 file-based)
│   ├── index.mdx                # 홈 페이지 (pageType: home)
│   ├── guide/
│   │   ├── _meta.json           # 사이드바 순서 정의 (배열)
│   │   ├── introduction.mdx
│   │   └── getting-started.mdx
│   └── zpl-commands/
│       ├── _meta.json
│       └── reference.mdx
├── plans/                       # (gitignore)
│   └── YYYY-MM-DD-<slug>.md
├── rspress.config.ts
└── package.json
```

- **문서 도구**: [Rspress](https://rspress.dev) v2 (`@rspress/core@^2.0.0`)
- **설정 파일**: `docs/rspress.config.ts`

---

## 파일 명명 규칙

| 대상             | 규칙             | 예시                  |
| ---------------- | ---------------- | --------------------- |
| 문서 페이지      | `kebab-case.mdx` | `getting-started.mdx` |
| 스니펫/예제 파일 | `PascalCase.tsx` | `BasicExample.tsx`    |

- 문서 파일 확장자는 `.mdx` 사용 (`.md` 사용 금지 — Rspress MDX 기능 활용)

---

## MDX 작성 규칙

### 기본 구조

```mdx
# 페이지 제목

본문 내용.

## 섹션
```

- 모든 페이지는 `# H1` 제목으로 시작
- 섹션은 `## H2`, 하위 섹션은 `### H3`
- 홈 페이지(`index.mdx`)는 frontmatter에 `pageType: home` 필수

### 코드 블록

- 언어 태그 필수: ` ```tsx `, ` ```bash `, ` ```ts ` 등
- 라이브 데모(도입 예정): ` ```tsx live ` 로 표시

### 링크

- 내부 링크는 절대 경로 사용: `/guide/getting-started` (상대 경로 사용 금지)
- `index.mdx`에서 `/guide/getting-started`로 링크 (오타 `/guides/getting-started` 금지)

### JSX 인라인 사용

Rspress는 MDX이므로 JSX 직접 사용 가능:

```mdx
<div style={{ color: '#666' }}>내용</div>
```

---

## 네비게이션 / 사이드바 수정 규칙 (v2 file-based)

Rspress v2는 `_nav.json`(탑 네비)과 `_meta.json`(사이드바)으로 file-based 설정. `rspress.config.ts`의 nav/sidebar는 사용하지 않음.

### 새 페이지 추가 시

**`docs/docs/<section>/_meta.json`** — 사이드바 순서에 파일명 추가

```json
["introduction", "getting-started", "new-page"]
```

### 새 섹션(디렉토리) 추가 시

1. `docs/docs/<section>/` 디렉토리 생성
2. `docs/docs/<section>/_meta.json` 생성 (사이드바 순서 배열)
3. **`docs/docs/_nav.json`** — 최상위 탭에 `{ text, link, activeMatch }` 항목 추가

---

## 금지 사항

- `docs/doc_build/` 내 파일 직접 수정 금지 (빌드 산출물)
- `node_modules/` 수정 금지
- 문서 파일에 `.md` 확장자 사용 금지 (`.mdx` 사용)
- 내부 링크에 상대 경로 사용 금지
- `_meta.json` 수정 없이 새 페이지 추가 금지 (사이드바에 노출 안 됨)

---

## 주요 참고 파일

| 파일                                | 역할                                 |
| ----------------------------------- | ------------------------------------ |
| `docs/rspress.config.ts`            | 전체 설정 (nav/sidebar는 file-based) |
| `docs/docs/_nav.json`               | 최상위 탭 네비게이션                 |
| `docs/docs/guide/_meta.json`        | Guide 사이드바 순서                  |
| `docs/docs/zpl-commands/_meta.json` | ZPL Commands 사이드바 순서           |

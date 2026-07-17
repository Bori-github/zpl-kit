# zpl-kit

**Composable ZPL for modern JavaScript** — React에서는 JSX로, Node·CLI에서는 순수 함수로 ZPL 라벨 문자열(`^XA` … `^XZ`)을 만듭니다.

## 패키지

| 패키지               | 역할                                                                                                         |
| -------------------- | ------------------------------------------------------------------------------------------------------------ |
| `@zpl-kit/react-zpl` | `ZplLabel`, `Text`, `Line`, `DiagonalLine`, `Circle`, `Ellipse`, `QrCode` 등 — `ZplLabel.print()`로 ZPL 생성 |
| `@zpl-kit/zpl-core`  | `renderLabel()` 등 — React 없이 `LabelRootNode` 트리로 ZPL 생성                                              |

`@zpl-kit/react-zpl`을 쓰면 `@zpl-kit/zpl-core`가 함께 포함되며, `print()`는 내부에서 `renderLabel()`을 호출합니다.

## 한 줄 예시

```tsx
import { ZplLabel, Text } from '@zpl-kit/react-zpl';

const zpl = ZplLabel.print(
  <ZplLabel width={200} height={100}>
    <Text fieldOriginX={0} fieldOriginY={0}>
      Hello ZPL
    </Text>
  </ZplLabel>
);
```

자세한 내용은 [문서](https://bori-github.github.io/zpl-kit/)를 참고해 주세요.

## 프로젝트 구조

```
zpl-kit/
├── apps/
│   ├── react-zpl/     # @zpl-kit/react-zpl
│   ├── zpl-core/      # @zpl-kit/zpl-core
│   └── zpl-viewer/    # ZPL 뷰어 웹
├── demos/
│   ├── web/
│   └── electron/
├── docs/              # 문서 (Rspress)
└── tests/
```

## 개발

- **요구**: Node.js ≥ 22, pnpm ≥ 10
- **설치**: `pnpm install`

```sh
pnpm dev            # apps/* 개발
pnpm demo:web       # 웹 데모
pnpm demo:electron  # Electron 데모
pnpm build          # zpl-core → 기타 apps, demos (docs 제외)
pnpm test           # Vitest
pnpm lint / pnpm format
pnpm docs:dev       # 문서 (포트 8000)
pnpm docs:build && pnpm docs:preview
```

## ZPL 미리보기

[ZPL Kit Viewer](https://zpl-kit-viewer.vercel.app/)

## 라이선스

MIT

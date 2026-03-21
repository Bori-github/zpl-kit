# zpl-kit

React로 ZPL 라벨을 작성합니다. React 컴포넌트로 ZPL 라벨을 선언적으로 작성하면 `ZplLabel.print()`가 컴포넌트 트리를 ZPL 문자열로 변환합니다.

```tsx
import { ZplLabel, Text, Line } from '@zpl-kit/react-zpl';

const zpl = ZplLabel.print(
  <ZplLabel width={800} height={400}>
    <Text fieldOriginX={50} fieldOriginY={50}>
      Hello, ZPL!
    </Text>
    <Line
      direction="horizontal"
      length={700}
      fieldOriginX={50}
      fieldOriginY={120}
      thickness={3}
    />
  </ZplLabel>
);

// ^XA
// ^PW800
// ^LL400
// ^FWN
// ^LH0,0
// ^CI28
// ^CFJ,30,30
// ^FO50,50
// ^AJN,30,30
// ^FDHello, ZPL!
// ^FS
// ^FO50,120
// ^GB700,3,3,B,0^FS
// ^XZ
```

## 컴포넌트

### `<ZplLabel>`

라벨 루트 컴포넌트. 모든 내용을 `^XA`와 `^XZ` 사이에 감쌉니다.

```tsx
<ZplLabel width={800} height={400}>
  ...
</ZplLabel>

<ZplLabel width={800} height={400} offsetX={10} offsetY={10} defaultFontName="J" defaultFontWidth={30} defaultFontHeight={30}>
  ...
</ZplLabel>
```

| Prop                | Type          | Default       | Description                |
| ------------------- | ------------- | ------------- | -------------------------- |
| `width`             | `number`      | —             | 라벨 너비 (dots)           |
| `height`            | `number`      | —             | 라벨 높이 (dots)           |
| `offsetX`           | `number`      | `0`           | 라벨 홈 X 오프셋 (dots)    |
| `offsetY`           | `number`      | `0`           | 라벨 홈 Y 오프셋 (dots)    |
| `labelOrientation`  | `ORIENTATION` | `NO_ROTATION` | 라벨 방향 (`^FW`)          |
| `encoding`          | `string[]`    | `['28']`      | 국제 인코딩 (`^CI`, UTF-8) |
| `defaultFontName`   | `string`      | `"J"`         | 기본 폰트 이름 (`^CF`)     |
| `defaultFontWidth`  | `number`      | `30`          | 기본 폰트 너비 (dots)      |
| `defaultFontHeight` | `number`      | `30`          | 기본 폰트 높이 (dots)      |

### `<Text>`

텍스트 필드를 ZPL 문자열로 변환합니다.

```tsx
<Text fieldOriginX={50} fieldOriginY={50}>Hello</Text>
<Text fieldOriginX={50} fieldOriginY={100} fontInherit={false} fontName="A" fontWidth={20} fontHeight={20}>Custom font</Text>
```

| Prop               | Type            | Default | Description                                      |
| ------------------ | --------------- | ------- | ------------------------------------------------ |
| `fieldOriginX`     | `number`        | `0`     | X 위치 (dots, `^FO`)                             |
| `fieldOriginY`     | `number`        | `0`     | Y 위치 (dots, `^FO`)                             |
| `fieldOrientation` | `ORIENTATION`   | 상속    | 필드 회전 방향 (필드 폰트 `^A`에 반영)           |
| `fontInherit`      | `true \| false` | `true`  | `ZplLabel` 기본 폰트 상속 여부                   |
| `fontName`         | `string`        | —       | 폰트 이름 — `fontInherit={false}` 시 필수        |
| `fontWidth`        | `number`        | —       | 폰트 너비 (dots) — `fontInherit={false}` 시 필수 |
| `fontHeight`       | `number`        | —       | 폰트 높이 (dots) — `fontInherit={false}` 시 필수 |

### `<Line>`

`^GB`를 사용하여 수평 또는 수직 선을 ZPL 문자열로 변환합니다.

```tsx
<Line direction="horizontal" length={400} fieldOriginX={50} fieldOriginY={100} />
<Line direction="vertical" length={200} thickness={4} lineColor={COLOR.BLACK} />
```

| Prop           | Type                         | Default | Description            |
| -------------- | ---------------------------- | ------- | ---------------------- |
| `direction`    | `"horizontal" \| "vertical"` | —       | 선 방향                |
| `length`       | `number`                     | —       | 선 길이 (dots)         |
| `fieldOriginX` | `number`                     | `0`     | X 위치 (dots)          |
| `fieldOriginY` | `number`                     | `0`     | Y 위치 (dots)          |
| `thickness`    | `number`                     | `1`     | 선 두께 (dots)         |
| `lineColor`    | `COLOR`                      | `BLACK` | 선 색상 (`B` 또는 `W`) |

### `<DiagonalLine>`

`^GD`를 사용하여 대각선을 ZPL 문자열로 변환합니다.

```tsx
<DiagonalLine width={100} height={100} fieldOriginX={50} fieldOriginY={50} />
```

### `<Circle>`

`^GC`를 사용하여 원을 ZPL 문자열로 변환합니다.

```tsx
<Circle diameter={100} fieldOriginX={50} fieldOriginY={50} />
```

### `<Ellipse>`

`^GE`를 사용하여 타원을 ZPL 문자열로 변환합니다.

```tsx
<Ellipse width={150} height={100} fieldOriginX={50} fieldOriginY={50} />
```

---

## 기술 스택

|               | 기술                                            |
| ------------- | ----------------------------------------------- |
| 언어          | TypeScript                                      |
| 라이브러리    | React 18 (코어·뷰어), 일부 데모·문서는 React 19 |
| 빌드          | Rolldown, Vite, electron-vite                   |
| 테스트        | Vitest                                          |
| 린트 / 포맷   | oxlint, Prettier                                |
| 패키지 매니저 | pnpm (workspace)                                |
| 데모          | Vite + React, Electron                          |
| 문서          | Rspress v2                                      |

---

## 프로젝트 구조

```
zpl-kit/
├── apps/
│   ├── react-zpl/          # 코어 라이브러리 (@zpl-kit/react-zpl)
│   └── zpl-viewer/         # ZPL 뷰어 웹
│
├── demos/
│   ├── web/                # Vite + React 데모
│   └── electron/           # Electron 데모
│
├── docs/                   # 문서 사이트 (Rspress v2)
└── tests/                  # 테스트 (Vitest)
```

## 개발하기

### 요구사항

- Node.js >= 22.0.0
- pnpm >= 10.0.0

### 설치하기

```sh
pnpm install
```

### 스크립트

```sh
pnpm dev            # apps/* 개발 모드 (react-zpl: Rolldown watch, zpl-viewer: Vite)
pnpm demo:web       # 웹 데모 실행 (Vite)
pnpm demo:electron  # Electron 데모 실행
pnpm build          # apps/* 및 demos/* 빌드 (docs 제외)
pnpm test           # 테스트 실행 (vitest)
pnpm lint           # 린트 (oxlint)
pnpm format         # 포맷 (prettier)
pnpm docs:dev       # 문서 개발 서버 (포트 8000)
pnpm docs:build     # 문서 빌드
pnpm docs:preview   # 문서 빌드 미리보기
```

## 향후 계획

- **ZPL 출력 줄바꿈**: 현재는 명령 사이에 줄바꿈(`\n`)을 넣습니다. 추후 제거하거나 옵션으로 제어할 예정입니다.
- **React 19**: 모노레포 전반(코어·뷰어·데모·문서)을 React 19 기준으로 맞출 계획입니다.
- **Node 환경**: 브라우저뿐 아니라 Node에서도 `ZplLabel.print()` 등으로 동일하게 ZPL 문자열을 얻을 수 있도록 지원을 추가할 계획입니다.

## ZPL 미리보기

[zpl-kit-viewer](https://zpl-kit-viewer.vercel.app/)에서 생성된 ZPL 문자열을 브라우저에서 미리볼 수 있습니다.

## 라이선스

MIT

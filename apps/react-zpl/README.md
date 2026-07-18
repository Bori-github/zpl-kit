# @zpl-kit/react-zpl

ZPL(Zebra Programming Language) 라벨을 React 컴포넌트로 작성합니다.

JSX로 라벨을 조립하면 프린터에 보낼 ZPL 문자열이 나옵니다. 화면에 렌더링하는 라이브러리가 아니라, **컴포넌트 트리를 ZPL로 변환**하는 라이브러리입니다.

## 설치

```bash
pnpm add @zpl-kit/react-zpl
```

React 18 또는 19가 필요합니다. `@zpl-kit/zpl-core`는 의존성으로 함께 설치됩니다.

## 사용법

```tsx
import { ZplLabel, Text, Line, QrCode } from '@zpl-kit/react-zpl';

const zpl = ZplLabel.print(
  <ZplLabel width={400} height={300}>
    <Text fieldOriginX={20} fieldOriginY={20}>
      주문번호 A-1024
    </Text>
    <Line fieldOriginX={20} fieldOriginY={60} direction="horizontal" length={360} />
    <QrCode fieldOriginX={20} fieldOriginY={80} magnification={5}>
      https://example.com/o/1024
    </QrCode>
  </ZplLabel>
);
```

`zpl`에 담기는 값:

```
^XA^PW400^LL300...^XZ
```

좌표 단위는 **도트**입니다. 실제 크기는 프린터 해상도(dpmm)에 따라 달라집니다 — 203dpi(8dpmm) 프린터에서 `width: 400`은 50mm입니다.

## `ZplLabel.print()`

라벨을 ZPL 문자열로 바꾸는 진입점입니다. React DOM이 필요 없고 렌더링도 일어나지 않으므로, 서버·CLI·브라우저 어디서든 호출할 수 있습니다.

`print()`에는 **`ZplLabel` 엘리먼트**를 넘겨야 합니다. 라벨을 컴포넌트로 나눠 쓸 때는 JSX 태그가 아니라 **함수를 호출**해서 넘기세요.

```tsx
const OrderLabel = ({ orderNo }: { orderNo: string }) => (
  <ZplLabel width={400} height={300}>
    <Text fieldOriginX={20} fieldOriginY={20}>
      {orderNo}
    </Text>
  </ZplLabel>
);

ZplLabel.print(OrderLabel({ orderNo: 'A-1024' })); // ✅
ZplLabel.print(<OrderLabel orderNo="A-1024" />); // ❌
```

> ⚠️ `print()`에 `<OrderLabel />`처럼 **감싼 컴포넌트를 넘기면 `^PWundefined`가 나옵니다.** `print()`가 넘겨받은 엘리먼트의 props에서 라벨 크기를 읽는데, 그 자리에 `OrderLabel`의 props가 들어오기 때문입니다. 예외 없이 조용히 잘못된 ZPL이 생성되고 타입 검사에도 걸리지 않으니 주의하세요.

## 컴포넌트

| 컴포넌트       | ZPL         | 용도                                        |
| -------------- | ----------- | ------------------------------------------- |
| `ZplLabel`     | `^XA` `^XZ` | 라벨 루트. 크기·기본 폰트·인코딩을 정합니다 |
| `Text`         | `^A` `^FD`  | 텍스트                                      |
| `Line`         | `^GB`       | 수평·수직선                                 |
| `DiagonalLine` | `^GD`       | 대각선                                      |
| `Circle`       | `^GC`       | 원                                          |
| `Ellipse`      | `^GE`       | 타원                                        |
| `QrCode`       | `^BQ`       | QR 코드                                     |

`ZplLabel`의 주요 props:

| 이름                                    | 타입     | 기본값 | 설명                  |
| --------------------------------------- | -------- | ------ | --------------------- |
| `width`                                 | `number` | 필수   | 라벨 폭 (도트)        |
| `height`                                | `number` | 필수   | 라벨 길이 (도트)      |
| `offsetX`, `offsetY`                    | `number` | `0`    | 라벨 원점 이동        |
| `defaultFontName`                       | `string` | `'J'`  | 기본 폰트             |
| `defaultFontWidth`, `defaultFontHeight` | `number` | `30`   | 기본 폰트 크기 (도트) |

`Text`·`QrCode`는 내용을 children으로 받습니다. 나머지는 props만 씁니다.

## 검증

프린터가 받아주지 않을 값은 `print()` 시점에 `Error`를 던집니다.

```tsx
ZplLabel.print(
  <ZplLabel width={400} height={300}>
    <Circle fieldOriginX={0} fieldOriginY={0} diameter={5000} />
  </ZplLabel>
);
// Error: renderCircle: diameter는 3~4095 사이여야 합니다. (diameter=5000)
```

## zpl-core와의 관계

이 패키지는 [`@zpl-kit/zpl-core`](https://www.npmjs.com/package/@zpl-kit/zpl-core)의 JSX 어댑터입니다. ZPL 생성은 전부 코어가 담당하고, 같은 라벨은 **양쪽에서 동일한 ZPL**을 냅니다.

React 없이 쓰거나, 렌더러·커맨드 계층을 직접 다루고 싶다면 코어를 쓰세요.

## 문서

- [가이드](https://bori-github.github.io/zpl-kit/guide/react-zpl-getting-started)
- [컴포넌트](https://bori-github.github.io/zpl-kit/guide/react-zpl-components)
- [API 레퍼런스](https://bori-github.github.io/zpl-kit/guide/react-zpl-api/zpl-label)
- [ZPL 미리보기](https://zpl-kit-viewer.vercel.app/) — 생성한 ZPL을 브라우저에서 확인

## 라이선스

MIT

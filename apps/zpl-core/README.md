# @zpl-kit/zpl-core

ZPL(Zebra Programming Language) 라벨을 코드로 만드는 프레임워크 비의존 라이브러리입니다.

라벨을 일반 객체로 기술하면 프린터에 보낼 ZPL 문자열이 나옵니다. 런타임 의존성이 없고 Node.js·브라우저 어디서나 동작합니다.

React를 쓰신다면 [`@zpl-kit/react-zpl`](https://www.npmjs.com/package/@zpl-kit/react-zpl)이 이 패키지를 감싼 JSX 인터페이스를 제공합니다.

## 설치

```bash
pnpm add @zpl-kit/zpl-core
```

## 사용법

```ts
import { renderLabel } from '@zpl-kit/zpl-core';

const zpl = renderLabel({
  type: 'label',
  props: { width: 400, height: 300 },
  children: [
    { type: 'text', props: { text: '주문번호 A-1024', fieldOriginX: 20, fieldOriginY: 20 } },
    {
      type: 'line',
      props: { direction: 'horizontal', length: 360, fieldOriginX: 20, fieldOriginY: 60 },
    },
    {
      type: 'qrCode',
      props: {
        text: 'https://example.com/o/1024',
        fieldOriginX: 20,
        fieldOriginY: 80,
        magnification: 5,
      },
    },
  ],
});
```

`zpl`에 담기는 값:

```
^XA^PW400^LL300...^XZ
```

좌표 단위는 **도트**입니다. 실제 크기는 프린터 해상도(dpmm)에 따라 달라집니다 — 203dpi(8dpmm) 프린터에서 `width: 400`은 50mm입니다.

## 라벨 구조

`renderLabel`은 루트 노드 하나를 받습니다.

```ts
{
  type: 'label',
  props: LabelCoreProps,
  children: ChildLabelNode[]
}
```

`props`에서 자주 쓰는 값:

| 이름                                    | 타입          | 기본값        | 설명                  |
| --------------------------------------- | ------------- | ------------- | --------------------- |
| `width`                                 | `number`      | 필수          | 라벨 폭 (도트)        |
| `height`                                | `number`      | 필수          | 라벨 길이 (도트)      |
| `offsetX`, `offsetY`                    | `number`      | `0`           | 라벨 원점 이동        |
| `labelOrientation`                      | `ORIENTATION` | `NO_ROTATION` | 라벨 전체 회전        |
| `defaultFontName`                       | `string`      | `'J'`         | 기본 폰트             |
| `defaultFontWidth`, `defaultFontHeight` | `number`      | `30`          | 기본 폰트 크기 (도트) |

`children`에 넣을 수 있는 노드는 6종입니다.

| `type`         | 렌더러               | ZPL        |
| -------------- | -------------------- | ---------- |
| `text`         | `renderText`         | `^A` `^FD` |
| `line`         | `renderLine`         | `^GB`      |
| `diagonalLine` | `renderDiagonalLine` | `^GD`      |
| `circle`       | `renderCircle`       | `^GC`      |
| `ellipse`      | `renderEllipse`      | `^GE`      |
| `qrCode`       | `renderQrCode`       | `^BQ`      |

각 렌더러는 개별로도 호출할 수 있습니다. 조합을 직접 제어하고 싶을 때 씁니다.

```ts
import { createLabelContext, renderText } from '@zpl-kit/zpl-core';

const context = createLabelContext({ width: 400, height: 300 });
const field = renderText({ text: 'hello', fieldOriginX: 10, fieldOriginY: 10 }, context);
```

`renderText`·`renderQrCode`는 라벨의 기본 폰트·방향을 상속받으므로 두 번째 인자로 컨텍스트를 받습니다. 나머지 렌더러는 props만 받습니다.

## 커맨드 계층

렌더러보다 낮은 층에서 ZPL 커맨드를 직접 만들 수도 있습니다. 렌더러가 다루지 않는 조합이 필요할 때 씁니다.

```ts
import { startFormat, printWidth, fieldOrigin, fieldData, endFormat } from '@zpl-kit/zpl-core';

const zpl = [
  startFormat(),
  printWidth(400),
  fieldOrigin({ offsetX: 10, offsetY: 10 }),
  fieldData('hello'),
  endFormat(),
].join('');
// ^XA^PW400^FO10,10^FDhello...^XZ
```

지원하는 커맨드 17개:

`^XA` `^XZ` `^PW` `^LL` `^LH` `^FO` `^FD` `^FB` `^FW` `^A` `^CF` `^CI` `^GB` `^GC` `^GD` `^GE` `^BQ`

> ZPL 명세 전체를 덮지는 않습니다. 위 목록에 없는 커맨드는 아직 지원하지 않습니다.

## 상수

문자열 리터럴 대신 상수를 쓰면 오타를 컴파일 단계에서 잡습니다.

```ts
import { ALIGN, COLOR, ORIENTATION, DIAGONAL_ORIENTATION } from '@zpl-kit/zpl-core';
```

## 검증

렌더러는 프린터가 받아주지 않을 값을 미리 막습니다. 범위를 벗어나면 `Error`를 던집니다.

```ts
renderCircle({ diameter: 5000, fieldOriginX: 0, fieldOriginY: 0 });
// Error: renderCircle: diameter는 3~4095 사이여야 합니다. (diameter=5000)
```

## 문서

- [가이드](https://bori-github.github.io/zpl-kit/guide/zpl-core-getting-started)
- [API 레퍼런스](https://bori-github.github.io/zpl-kit/guide/zpl-core-api/render-label)
- [ZPL 미리보기](https://zpl-kit-viewer.vercel.app/) — 생성한 ZPL을 브라우저에서 확인

## 라이선스

MIT

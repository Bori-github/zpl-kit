# AGENTS.md — tests 작업 가이드

## 환경

| 항목    | 값                                                                               |
| ------- | -------------------------------------------------------------------------------- |
| 러너    | Vitest (`tests/vitest.config.ts`)                                                |
| 실행    | `tests/` 디렉터리에서 `pnpm test`                                                |
| 환경    | `node` (기본값, jsdom/happy-dom 없음)                                            |
| globals | `true` — `describe`, `it`, `expect` import 필요 없음 (하지만 명시적 import 권장) |

---

## 디렉터리 구조

- **`tests/unit/`** — 컴포넌트·명령 등 단위 테스트 (`*.test.ts`, `*.test.tsx`)
- **`tests/unit/fixtures/`** (선택) — 여러 테스트에서 공유하는 픽스처
- 루트에 `package.json`, `tsconfig.json`, `vitest.config.ts`, `AGENTS.md`

새 테스트는 `tests/unit/` 아래에 두며, 이름 규칙은 아래 표를 따른다.

---

## 파일 명명 규칙

| 대상            | 규칙                       | 예시                  |
| --------------- | -------------------------- | --------------------- |
| 컴포넌트 테스트 | `{ComponentName}.test.tsx` | `Barcode.test.tsx`    |
| command 테스트  | `{commandName}.test.tsx`   | `barcode128.test.tsx` |
| 유틸 테스트     | `{utilName}.test.tsx`      | `imageToZpl.test.tsx` |

> `.tsx` 확장자는 JSX 유무와 관계없이 통일해서 사용한다.

---

## Import 규칙

```ts
import { createElement } from 'react';
import { describe, it, expect } from 'vitest';

import { ComponentName, type ZplElementContext } from '@zpl-kit/react-zpl';
```

- 컴포넌트·타입은 `@zpl-kit/react-zpl`에서 import하는 것을 기본으로 한다
- 패키지 진입점에 없는 심볼(예: `commands/barcodeQR`)은 `../../apps/react-zpl/src/...`로만 검증 가능하다

---

## `ZplElementContext` 픽스처

공통 컨텍스트는 `tests/unit/fixtures/context`에서 import한다.

```ts
import { defaultLabelContext } from './fixtures/context';
```

---

## 테스트 구조

각 컴포넌트 테스트는 아래 세 블록으로 구성한다.

```ts
describe('ComponentName', () => {
  describe('print', () => {
    // 정상 동작: 기본값, 각 prop 조합
  });

  describe('print - 검증', () => {
    // 잘못된 입력 → throw 검증
  });

  describe('displayName', () => {
    // displayName 고정값 확인
  });
});
```

---

## 단언 규칙

### 전체 ZPL 문자열 비교 (기본)

ZPL 출력은 결정적(deterministic)이므로 `toBe()`로 전체 문자열을 검증한다.

```ts
expect(Line.print(el, defaultLabelContext)).toBe('^FO0,0\\&^GB100,1,1,B,0^FS');
```

### 부분 포함 검증 (보조)

출력이 길거나 일부만 확인할 때만 `toContain()`을 사용한다.

```ts
expect(Circle.print(el, defaultLabelContext)).toContain('^GC60,1,W^FS');
```

### 에러 검증

잘못된 입력은 `throw`를 기대하며, 에러 메시지를 한국어로 정확히 명시한다.

```ts
expect(() => Line.print(el, defaultLabelContext)).toThrow('length는 1 이상이어야 합니다');
```

### 금지 사항

- `toMatchSnapshot()` 사용 금지 — 외부 스냅샷 파일 생성을 피하고 `toBe()`로 인라인 검증
- `toMatchInlineSnapshot()` 은 ZPL 문자열이 너무 길어 `toBe()` 가독성이 떨어질 때만 허용

---

## 테스트 작성 패턴

### 컴포넌트 테스트

```ts
import { createElement } from 'react';
import { describe, it, expect } from 'vitest';

import { Barcode } from '@zpl-kit/react-zpl';

import { defaultLabelContext } from './fixtures/context';

describe('Barcode', () => {
  describe('print', () => {
    it('code128 기본값 — ^FO, ^BC, ^FD, ^FS 순서로 생성', () => {
      const el = createElement(Barcode, {
        type: 'code128',
        value: 'ABC',
        fieldOriginX: 10,
        fieldOriginY: 20,
        height: 60,
      });
      expect(Barcode.print(el, defaultLabelContext)).toBe('^FO10,20\\&^BCN,60,Y,N,N^FDABC^FS');
    });

    it('qr — ^BQ 명령어와 ^FD에 QA, 프리픽스 포함', () => {
      const el = createElement(Barcode, {
        type: 'qr',
        value: 'https://example.com',
        fieldOriginX: 0,
        fieldOriginY: 0,
        magnification: 3,
      });
      const zpl = Barcode.print(el, defaultLabelContext);
      expect(zpl).toContain('^BQ');
      expect(zpl).toContain('^FDQA,https://example.com^FS');
    });
  });

  describe('print - 검증', () => {
    it('value가 빈 문자열이면 에러 throw', () => {
      const el = createElement(Barcode, { type: 'code128', value: '' });
      expect(() => Barcode.print(el, defaultLabelContext)).toThrow('value는 비어있을 수 없습니다');
    });

    it('ean13에 13자리가 아닌 값을 전달하면 에러 throw', () => {
      const el = createElement(Barcode, { type: 'ean13', value: '123' });
      expect(() => Barcode.print(el, defaultLabelContext)).toThrow(
        'EAN-13은 13자리 숫자여야 합니다'
      );
    });
  });

  describe('displayName', () => {
    it('Barcode으로 설정됨', () => {
      expect(Barcode.displayName).toBe('Barcode');
    });
  });
});
```

### 케이스 이름 규칙

- 정상 케이스: `'{prop} {값} 시 {기대 동작}'` 또는 `'기본값으로 {기대 ZPL} 생성'`
- 에러 케이스: `'{조건} 시 에러 throw'`
- 한국어로 작성

---

## 실행

```bash
# tests/ 디렉터리에서
pnpm test           # watch 모드
pnpm test:ui        # UI 모드
pnpm test:coverage  # 커버리지
```

import { createElement } from 'react';
import { describe, expect, it } from 'vitest';

import { QrCode } from '@zpl-kit/react-zpl';
import { testLabelContext } from './fixtures/context';

describe('QrCode.print', () => {
  it('emits ^FO, ^BQ, and ^FD with matching error correction (QA, + value)', () => {
    const el = createElement(
      QrCode,
      {
        fieldOriginX: 40,
        fieldOriginY: 60,
        magnification: 4,
      },
      'https://example.com'
    );
    const zpl = QrCode.print(el, testLabelContext());
    expect(zpl).toBe(
      '^FO40,60\\&^BQN,2,4,Q,7\\&^FDQA,https://example.com\\&^FS'
    );
  });

  it('throws on empty children', () => {
    const el = createElement(QrCode, {}, '');
    expect(() => QrCode.print(el, testLabelContext())).toThrow(/빈 문자열/);
  });

  it('throws when children is not a string', () => {
    const el = createElement(QrCode, {}, <span />);
    expect(() => QrCode.print(el, testLabelContext())).toThrow(
      /문자열만 허용/
    );
  });

  it('uses fieldOrientation for ^BQ when set', () => {
    const el = createElement(
      QrCode,
      {
        fieldOrientation: 'R',
        magnification: 2,
        errorCorrectionLevel: 'M',
      },
      'x'
    );
    const zpl = QrCode.print(el, testLabelContext());
    expect(zpl).toContain('^BQR,2,2,M,7');
    expect(zpl).toContain('^FDMA,x');
  });
});

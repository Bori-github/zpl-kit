import { describe, expect, it } from 'vitest';
import { renderQrCode } from '@zpl-kit/zpl-core';
import { QrCode } from '@zpl-kit/react-zpl';
import { defaultLabelContext } from './fixtures/context';

describe('QrCode', () => {
  describe('renderQrCode', () => {
    it('^FO, ^BQ, ^FD 순서로 올바른 ZPL 생성', () => {
      expect(
        renderQrCode(
          {
            text: 'https://example.com',
            fieldOriginX: 40,
            fieldOriginY: 60,
            magnification: 4,
          },
          defaultLabelContext
        )
      ).toBe('^FO40,60\\&^BQN,2,4,Q,7\\&^FDQA,https://example.com\\&^FS');
    });

    it('빈 문자열 시 에러 throw', () => {
      expect(() => renderQrCode({ text: '' }, defaultLabelContext)).toThrow(/빈 문자열/);
    });

    it('fieldOrientation 지정 시 ^BQ에 반영', () => {
      const zpl = renderQrCode(
        {
          text: 'x',
          fieldOrientation: 'R',
          magnification: 2,
          errorCorrectionLevel: 'M',
        },
        defaultLabelContext
      );
      expect(zpl).toContain('^BQR,2,2,M,7');
      expect(zpl).toContain('^FDMA,x');
    });
  });

  describe('displayName', () => {
    it('QrCode으로 설정됨', () => {
      expect(QrCode.displayName).toBe('QrCode');
    });
  });
});

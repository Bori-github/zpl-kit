import { createElement } from 'react';
import { describe, it, expect } from 'vitest';

import { Line, type ZplElementContext } from '@zpl-kit/react-zpl';

const defaultContext: ZplElementContext = {
  labelOrientation: 'N',
  defaultFontName: 'J',
  defaultFontWidth: 30,
  defaultFontHeight: 30,
};

describe('Line', () => {
  describe('print - 수평선', () => {
    it('기본값으로 ^FO{x},{y}^GB{length},0,1,B,0^FS 생성', () => {
      const el = createElement(Line, {
        length: 100,
        direction: 'horizontal',
      });
      expect(Line.print(el, defaultContext)).toBe('^FO0,0\n^GB100,0,1,B,0^FS');
    });

    it('fieldOrigin, thickness, lineColor 지정 시 올바른 ZPL 생성', () => {
      const el = createElement(Line, {
        length: 100,
        direction: 'horizontal',
        fieldOriginX: 10,
        fieldOriginY: 20,
        thickness: 2,
        lineColor: 'B',
      });
      expect(Line.print(el, defaultContext)).toBe(
        '^FO10,20\n^GB100,0,2,B,0^FS'
      );
    });

    it('흰색 라인(lineColor=W) 생성', () => {
      const el = createElement(Line, {
        length: 50,
        direction: 'horizontal',
        lineColor: 'W',
      });
      expect(Line.print(el, defaultContext)).toContain('^GB50,0,1,W,0^FS');
    });
  });

  describe('print - 수직선', () => {
    it('기본값으로 ^FO{x},{y}^GB0,{length},1,B,0^FS 생성', () => {
      const el = createElement(Line, {
        length: 50,
        direction: 'vertical',
      });
      expect(Line.print(el, defaultContext)).toBe('^FO0,0\n^GB0,50,1,B,0^FS');
    });

    it('fieldOrigin, thickness 지정 시 올바른 ZPL 생성', () => {
      const el = createElement(Line, {
        length: 80,
        direction: 'vertical',
        fieldOriginX: 30,
        fieldOriginY: 40,
        thickness: 3,
      });
      expect(Line.print(el, defaultContext)).toBe('^FO30,40\n^GB0,80,3,B,0^FS');
    });
  });

  describe('print - 검증', () => {
    it('length < 1 시 에러 throw', () => {
      const el = createElement(Line, { length: 0, direction: 'horizontal' });
      expect(() => Line.print(el, defaultContext)).toThrow(
        'length는 1 이상이어야 합니다'
      );
    });

    it('length가 음수일 때 에러 throw', () => {
      const el = createElement(Line, { length: -10, direction: 'vertical' });
      expect(() => Line.print(el, defaultContext)).toThrow(
        'length는 1 이상이어야 합니다'
      );
    });

    it('thickness < 1 시 에러 throw', () => {
      const el = createElement(Line, {
        length: 100,
        direction: 'horizontal',
        thickness: 0,
      });
      expect(() => Line.print(el, defaultContext)).toThrow(
        'thickness는 1 이상이어야 합니다'
      );
    });
  });

  describe('displayName', () => {
    it('Line으로 설정됨', () => {
      expect(Line.displayName).toBe('Line');
    });
  });
});

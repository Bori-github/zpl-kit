import { createElement } from 'react';
import { describe, it, expect } from 'vitest';

import { Circle, type ZplElementContext } from '@zpl-kit/react-zpl';

const defaultContext: ZplElementContext = {
  labelOrientation: 'N',
  defaultFontName: 'J',
  defaultFontWidth: 30,
  defaultFontHeight: 30,
};

describe('Circle', () => {
  describe('print', () => {
    it('기본값으로 ^FO0,0\\&^GC{diameter},1,B^FS 생성', () => {
      const el = createElement(Circle, { diameter: 50 });
      expect(Circle.print(el, defaultContext)).toBe('^FO0,0\\&^GC50,1,B^FS');
    });

    it('fieldOrigin, thickness, lineColor 지정 시 올바른 ZPL 생성', () => {
      const el = createElement(Circle, {
        diameter: 100,
        fieldOriginX: 10,
        fieldOriginY: 20,
        thickness: 5,
        lineColor: 'B',
      });
      expect(Circle.print(el, defaultContext)).toBe('^FO10,20\\&^GC100,5,B^FS');
    });

    it('흰색 원(lineColor=W) 생성', () => {
      const el = createElement(Circle, { diameter: 60, lineColor: 'W' });
      expect(Circle.print(el, defaultContext)).toContain('^GC60,1,W^FS');
    });

    it('채워진 원 (thickness >= diameter) 허용', () => {
      const el = createElement(Circle, { diameter: 50, thickness: 50 });
      expect(Circle.print(el, defaultContext)).toBe('^FO0,0\\&^GC50,50,B^FS');
    });
  });

  describe('print - 검증', () => {
    it('diameter < 3 시 에러 throw', () => {
      const el = createElement(Circle, { diameter: 2 });
      expect(() => Circle.print(el, defaultContext)).toThrow(
        'diameter는 3~4095 사이여야 합니다'
      );
    });

    it('diameter > 4095 시 에러 throw', () => {
      const el = createElement(Circle, { diameter: 4096 });
      expect(() => Circle.print(el, defaultContext)).toThrow(
        'diameter는 3~4095 사이여야 합니다'
      );
    });

    it('thickness < 1 시 에러 throw', () => {
      const el = createElement(Circle, { diameter: 50, thickness: 0 });
      expect(() => Circle.print(el, defaultContext)).toThrow(
        'thickness는 1~4095 사이여야 합니다'
      );
    });

    it('thickness > 4095 시 에러 throw', () => {
      const el = createElement(Circle, { diameter: 50, thickness: 4096 });
      expect(() => Circle.print(el, defaultContext)).toThrow(
        'thickness는 1~4095 사이여야 합니다'
      );
    });
  });

  describe('displayName', () => {
    it('Circle으로 설정됨', () => {
      expect(Circle.displayName).toBe('Circle');
    });
  });
});

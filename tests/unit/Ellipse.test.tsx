import { createElement } from 'react';
import { describe, it, expect } from 'vitest';

import { Ellipse, type ZplElementContext } from '@zpl-kit/react-zpl';

const defaultContext: ZplElementContext = {
  labelOrientation: 'N',
  defaultFontName: 'J',
  defaultFontWidth: 30,
  defaultFontHeight: 30,
};

describe('Ellipse', () => {
  describe('print', () => {
    it('기본값으로 ^FO0,0\\&^GE{width},{height},1,B^FS 생성', () => {
      const el = createElement(Ellipse, { width: 80, height: 40 });
      expect(Ellipse.print(el, defaultContext)).toBe('^FO0,0\\&^GE80,40,1,B^FS');
    });

    it('fieldOrigin, thickness, lineColor 지정 시 올바른 ZPL 생성', () => {
      const el = createElement(Ellipse, {
        width: 100,
        height: 60,
        fieldOriginX: 10,
        fieldOriginY: 20,
        thickness: 3,
        lineColor: 'B',
      });
      expect(Ellipse.print(el, defaultContext)).toBe('^FO10,20\\&^GE100,60,3,B^FS');
    });

    it('흰색 타원(lineColor=W) 생성', () => {
      const el = createElement(Ellipse, { width: 80, height: 40, lineColor: 'W' });
      expect(Ellipse.print(el, defaultContext)).toContain('^GE80,40,1,W^FS');
    });
  });

  describe('print - 검증', () => {
    it('width < 3 시 에러 throw', () => {
      const el = createElement(Ellipse, { width: 2, height: 40 });
      expect(() => Ellipse.print(el, defaultContext)).toThrow(
        'width와 height는 3~4095 사이여야 합니다'
      );
    });

    it('height < 3 시 에러 throw', () => {
      const el = createElement(Ellipse, { width: 80, height: 2 });
      expect(() => Ellipse.print(el, defaultContext)).toThrow(
        'width와 height는 3~4095 사이여야 합니다'
      );
    });

    it('width > 4095 시 에러 throw', () => {
      const el = createElement(Ellipse, { width: 4096, height: 40 });
      expect(() => Ellipse.print(el, defaultContext)).toThrow(
        'width와 height는 3~4095 사이여야 합니다'
      );
    });

    it('thickness < 1 시 에러 throw', () => {
      const el = createElement(Ellipse, { width: 80, height: 40, thickness: 0 });
      expect(() => Ellipse.print(el, defaultContext)).toThrow(
        'thickness는 1~4095 사이여야 합니다'
      );
    });

    it('thickness > 4095 시 에러 throw', () => {
      const el = createElement(Ellipse, { width: 80, height: 40, thickness: 4096 });
      expect(() => Ellipse.print(el, defaultContext)).toThrow(
        'thickness는 1~4095 사이여야 합니다'
      );
    });
  });

  describe('displayName', () => {
    it('Ellipse으로 설정됨', () => {
      expect(Ellipse.displayName).toBe('Ellipse');
    });
  });
});

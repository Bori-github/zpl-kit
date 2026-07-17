import { describe, it, expect } from 'vitest';
import { renderEllipse } from '@zpl-kit/zpl-core';
import { Ellipse } from '@zpl-kit/react-zpl';

describe('Ellipse', () => {
  describe('renderEllipse', () => {
    it('기본값으로 ^FO0,0\\&^GE{width},{height},1,B^FS 생성', () => {
      expect(renderEllipse({ width: 80, height: 40 })).toBe('^FO0,0\\&^GE80,40,1,B^FS');
    });

    it('fieldOrigin, thickness, lineColor 지정 시 올바른 ZPL 생성', () => {
      expect(
        renderEllipse({
          width: 100,
          height: 60,
          fieldOriginX: 10,
          fieldOriginY: 20,
          thickness: 3,
          lineColor: 'B',
        })
      ).toBe('^FO10,20\\&^GE100,60,3,B^FS');
    });

    it('흰색 타원(lineColor=W) 생성', () => {
      expect(renderEllipse({ width: 80, height: 40, lineColor: 'W' })).toContain('^GE80,40,1,W^FS');
    });
  });

  describe('renderEllipse - 검증', () => {
    it('width < 3 시 에러 throw', () => {
      expect(() => renderEllipse({ width: 2, height: 40 })).toThrow(
        'width와 height는 3~4095 사이여야 합니다'
      );
    });

    it('height < 3 시 에러 throw', () => {
      expect(() => renderEllipse({ width: 80, height: 2 })).toThrow(
        'width와 height는 3~4095 사이여야 합니다'
      );
    });

    it('width > 4095 시 에러 throw', () => {
      expect(() => renderEllipse({ width: 4096, height: 40 })).toThrow(
        'width와 height는 3~4095 사이여야 합니다'
      );
    });

    it('thickness < 1 시 에러 throw', () => {
      expect(() => renderEllipse({ width: 80, height: 40, thickness: 0 })).toThrow(
        'thickness는 1~4095 사이여야 합니다'
      );
    });

    it('thickness > 4095 시 에러 throw', () => {
      expect(() => renderEllipse({ width: 80, height: 40, thickness: 4096 })).toThrow(
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

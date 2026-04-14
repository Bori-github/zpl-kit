import { describe, it, expect } from 'vitest';
import { renderCircle } from '@zpl-kit/zpl-core';
import { Circle } from '@zpl-kit/react-zpl';

describe('Circle', () => {
  describe('renderCircle', () => {
    it('기본값으로 ^FO0,0\\&^GC{diameter},1,B^FS 생성', () => {
      expect(renderCircle({ diameter: 50 })).toBe('^FO0,0\\&^GC50,1,B^FS');
    });

    it('fieldOrigin, thickness, lineColor 지정 시 올바른 ZPL 생성', () => {
      expect(
        renderCircle({
          diameter: 100,
          fieldOriginX: 10,
          fieldOriginY: 20,
          thickness: 5,
          lineColor: 'B',
        })
      ).toBe('^FO10,20\\&^GC100,5,B^FS');
    });

    it('흰색 원(lineColor=W) 생성', () => {
      expect(renderCircle({ diameter: 60, lineColor: 'W' })).toContain(
        '^GC60,1,W^FS'
      );
    });

    it('채워진 원 (thickness >= diameter) 허용', () => {
      expect(renderCircle({ diameter: 50, thickness: 50 })).toBe(
        '^FO0,0\\&^GC50,50,B^FS'
      );
    });
  });

  describe('renderCircle - 검증', () => {
    it('diameter < 3 시 에러 throw', () => {
      expect(() => renderCircle({ diameter: 2 })).toThrow(
        'diameter는 3~4095 사이여야 합니다'
      );
    });

    it('diameter > 4095 시 에러 throw', () => {
      expect(() => renderCircle({ diameter: 4096 })).toThrow(
        'diameter는 3~4095 사이여야 합니다'
      );
    });

    it('thickness < 1 시 에러 throw', () => {
      expect(() => renderCircle({ diameter: 50, thickness: 0 })).toThrow(
        'thickness는 1~4095 사이여야 합니다'
      );
    });

    it('thickness > 4095 시 에러 throw', () => {
      expect(() => renderCircle({ diameter: 50, thickness: 4096 })).toThrow(
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

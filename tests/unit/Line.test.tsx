import { describe, it, expect } from 'vitest';
import { renderLine } from '@zpl-kit/zpl-core';
import { Line } from '@zpl-kit/react-zpl';

describe('Line', () => {
  describe('renderLine - 수평선', () => {
    it('기본값으로 ^FO{x},{y}^GB{length},0,1,B,0^FS 생성', () => {
      expect(renderLine({ length: 100, direction: 'horizontal' })).toBe(
        '^FO0,0\\&^GB100,1,1,B,0^FS'
      );
    });

    it('fieldOrigin, thickness, lineColor 지정 시 올바른 ZPL 생성', () => {
      expect(
        renderLine({
          length: 100,
          direction: 'horizontal',
          fieldOriginX: 10,
          fieldOriginY: 20,
          thickness: 2,
          lineColor: 'B',
        })
      ).toBe('^FO10,20\\&^GB100,2,2,B,0^FS');
    });

    it('흰색 라인(lineColor=W) 생성', () => {
      expect(
        renderLine({ length: 50, direction: 'horizontal', lineColor: 'W' })
      ).toContain('^GB50,1,1,W,0^FS');
    });
  });

  describe('renderLine - 수직선', () => {
    it('기본값으로 ^FO{x},{y}^GB0,{length},1,B,0^FS 생성', () => {
      expect(renderLine({ length: 50, direction: 'vertical' })).toBe(
        '^FO0,0\\&^GB1,50,1,B,0^FS'
      );
    });

    it('fieldOrigin, thickness 지정 시 올바른 ZPL 생성', () => {
      expect(
        renderLine({
          length: 80,
          direction: 'vertical',
          fieldOriginX: 30,
          fieldOriginY: 40,
          thickness: 3,
        })
      ).toBe('^FO30,40\\&^GB3,80,3,B,0^FS');
    });
  });

  describe('renderLine - 검증', () => {
    it('length < 1 시 에러 throw', () => {
      expect(() => renderLine({ length: 0, direction: 'horizontal' })).toThrow(
        'length는 1 이상이어야 합니다'
      );
    });

    it('length가 음수일 때 에러 throw', () => {
      expect(() => renderLine({ length: -10, direction: 'vertical' })).toThrow(
        'length는 1 이상이어야 합니다'
      );
    });

    it('thickness < 1 시 에러 throw', () => {
      expect(() =>
        renderLine({ length: 100, direction: 'horizontal', thickness: 0 })
      ).toThrow('thickness는 1 이상이어야 합니다');
    });
  });

  describe('displayName', () => {
    it('Line으로 설정됨', () => {
      expect(Line.displayName).toBe('Line');
    });
  });
});

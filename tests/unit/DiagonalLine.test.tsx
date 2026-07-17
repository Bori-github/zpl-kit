import { describe, it, expect } from 'vitest';
import { renderDiagonalLine } from '@zpl-kit/zpl-core';
import { DiagonalLine } from '@zpl-kit/react-zpl';

describe('DiagonalLine', () => {
  describe('renderDiagonalLine - 대각선', () => {
    it('기본값으로 ^FO{x},{y}^GD{w},{h},{t},{c},{o}^FS 생성', () => {
      expect(renderDiagonalLine({ width: 30, height: 30 })).toBe('^FO0,0\\&^GD30,30,1,B,R^FS');
    });

    it('fieldOrigin, thickness, orientation 지정 시 올바른 ZPL 생성', () => {
      expect(
        renderDiagonalLine({
          width: 50,
          height: 40,
          orientation: 'L',
          fieldOriginX: 10,
          fieldOriginY: 20,
          thickness: 2,
        })
      ).toBe('^FO10,20\\&^GD50,40,2,B,L^FS');
    });

    it('orientation R (우하향) 생성', () => {
      expect(renderDiagonalLine({ width: 20, height: 20, orientation: 'R' })).toContain(
        '^GD20,20,1,B,R^FS'
      );
    });

    it('orientation L (우상향) 생성', () => {
      expect(renderDiagonalLine({ width: 20, height: 20, orientation: 'L' })).toContain(
        '^GD20,20,1,B,L^FS'
      );
    });
  });

  describe('renderDiagonalLine - 검증', () => {
    it('width < 3 시 에러 throw', () => {
      expect(() => renderDiagonalLine({ width: 2, height: 30 })).toThrow(
        'width와 height는 3 이상이어야 합니다'
      );
    });

    it('height < 3 시 에러 throw', () => {
      expect(() => renderDiagonalLine({ width: 30, height: 2 })).toThrow(
        'width와 height는 3 이상이어야 합니다'
      );
    });

    it('thickness < 1 시 에러 throw', () => {
      expect(() => renderDiagonalLine({ width: 30, height: 30, thickness: 0 })).toThrow(
        'thickness는 1 이상이어야 합니다'
      );
    });
  });

  describe('displayName', () => {
    it('DiagonalLine으로 설정됨', () => {
      expect(DiagonalLine.displayName).toBe('DiagonalLine');
    });
  });
});

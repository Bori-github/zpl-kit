import { createElement } from 'react';
import { describe, it, expect } from 'vitest';

import { DiagonalLine } from '@zpl-kit/react-zpl';

import { defaultLabelContext } from './fixtures/context';

describe('DiagonalLine', () => {
  describe('print - 대각선', () => {
    it('기본값으로 ^FO{x},{y}^GD{w},{h},{t},{c},{o}^FS 생성', () => {
      const el = createElement(DiagonalLine, {
        width: 30,
        height: 30,
      });
      expect(DiagonalLine.print(el, defaultLabelContext)).toBe(
        '^FO0,0\\&^GD30,30,1,B,R^FS'
      );
    });

    it('fieldOrigin, thickness, orientation 지정 시 올바른 ZPL 생성', () => {
      const el = createElement(DiagonalLine, {
        width: 50,
        height: 40,
        orientation: 'L',
        fieldOriginX: 10,
        fieldOriginY: 20,
        thickness: 2,
      });
      expect(DiagonalLine.print(el, defaultLabelContext)).toBe(
        '^FO10,20\\&^GD50,40,2,B,L^FS'
      );
    });

    it('orientation R (우하향) 생성', () => {
      const el = createElement(DiagonalLine, {
        width: 20,
        height: 20,
        orientation: 'R',
      });
      expect(DiagonalLine.print(el, defaultLabelContext)).toContain('^GD20,20,1,B,R^FS');
    });

    it('orientation L (우상향) 생성', () => {
      const el = createElement(DiagonalLine, {
        width: 20,
        height: 20,
        orientation: 'L',
      });
      expect(DiagonalLine.print(el, defaultLabelContext)).toContain('^GD20,20,1,B,L^FS');
    });
  });

  describe('print - 검증', () => {
    it('width < 3 시 에러 throw', () => {
      const el = createElement(DiagonalLine, { width: 2, height: 30 });
      expect(() => DiagonalLine.print(el, defaultLabelContext)).toThrow(
        'width와 height는 3 이상이어야 합니다'
      );
    });

    it('height < 3 시 에러 throw', () => {
      const el = createElement(DiagonalLine, { width: 30, height: 2 });
      expect(() => DiagonalLine.print(el, defaultLabelContext)).toThrow(
        'width와 height는 3 이상이어야 합니다'
      );
    });

    it('thickness < 1 시 에러 throw', () => {
      const el = createElement(DiagonalLine, {
        width: 30,
        height: 30,
        thickness: 0,
      });
      expect(() => DiagonalLine.print(el, defaultLabelContext)).toThrow(
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

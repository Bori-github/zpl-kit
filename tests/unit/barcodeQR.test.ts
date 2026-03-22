import { describe, expect, it } from 'vitest';

import { barcodeQR } from '../../apps/react-zpl/src/commands/barcodeQR';

describe('barcodeQR', () => {
  it('emits ^BQ with explicit orientation (Zebra-style)', () => {
    expect(
      barcodeQR({
        orientation: 'N',
        model: 2,
        magnification: 5,
        errorCorrection: 'Q',
        maskValue: 7,
      })
    ).toBe('^BQN,2,5,Q,7');
  });

  it('rejects magnification out of range', () => {
    expect(() =>
      barcodeQR({
        orientation: 'N',
        model: 2,
        magnification: 0,
        errorCorrection: 'M',
        maskValue: 7,
      })
    ).toThrow(/magnification/);

    expect(() =>
      barcodeQR({
        orientation: 'N',
        model: 2,
        magnification: 101,
        errorCorrection: 'M',
        maskValue: 7,
      })
    ).toThrow(/magnification/);
  });

  it('rejects invalid maskValue', () => {
    expect(() =>
      barcodeQR({
        orientation: 'N',
        model: 2,
        magnification: 3,
        errorCorrection: 'H',
        maskValue: 8,
      })
    ).toThrow(/maskValue/);
  });
});

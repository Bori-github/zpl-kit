import { defineCommand } from './base';
import { ORIENTATION } from '../constants';
import type { ObjectValues } from '../types';

/** ZPL `^BQ`의 `d`(에러 정정). `^FD` QR 데이터 첫 문자와 반드시 일치해야 함 */
export type QrErrorCorrection = 'H' | 'Q' | 'M' | 'L';

export interface BarcodeQRParams {
  orientation: ObjectValues<typeof ORIENTATION>;
  model: 1 | 2;
  magnification: number;
  errorCorrection: QrErrorCorrection;
  maskValue: number;
}

const MIN_MAGNIFICATION = 1;
const MAX_MAGNIFICATION = 100;

/**
 * ZPL `^BQ` — QR 코드 필드 명령. `^FD`/`^FS`는 포함하지 않으며 {@link fieldData}와 함께 사용해야 함.
 *
 * @see https://docs.zebra.com/us/en/printers/software/zpl-pg/c-zpl-zpl-commands/r-zpl-bq.html
 */
export const barcodeQR = defineCommand<BarcodeQRParams>((params) => {
  const { orientation, model, magnification, errorCorrection, maskValue } = params;

  if (magnification < MIN_MAGNIFICATION || magnification > MAX_MAGNIFICATION) {
    throw new Error(
      `barcodeQR: magnification은 ${MIN_MAGNIFICATION}~${MAX_MAGNIFICATION}이어야 합니다. (magnification=${magnification})`
    );
  }
  if (!Number.isInteger(maskValue) || maskValue < 0 || maskValue > 7) {
    throw new Error(`barcodeQR: maskValue는 0~7 정수여야 합니다. (maskValue=${maskValue})`);
  }
  if (model !== 1 && model !== 2) {
    throw new Error(`barcodeQR: model은 1 또는 2여야 합니다. (model=${model})`);
  }

  return `^BQ${orientation},${model},${magnification},${errorCorrection},${maskValue}`;
});

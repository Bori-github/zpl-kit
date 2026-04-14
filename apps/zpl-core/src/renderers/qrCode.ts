import { barcodeQR, fieldData, fieldOrigin, newLine, type QrErrorCorrection } from '../commands';
import { ORIENTATION } from '../constants';
import { ObjectValues, ZplElementContext } from '../types';

export interface QrCodeCoreProps {
  text: string;
  fieldOriginX?: number;
  fieldOriginY?: number;
  fieldOrientation?: ObjectValues<typeof ORIENTATION>;
  model?: 1 | 2;
  magnification?: number;
  errorCorrectionLevel?: QrErrorCorrection;
  maskValue?: number;
}

export function renderQrCode(
  props: QrCodeCoreProps,
  context: ZplElementContext
): string {
  const {
    text,
    fieldOriginX = 0,
    fieldOriginY = 0,
    fieldOrientation,
    model = 2,
    magnification = 5,
    errorCorrectionLevel = 'Q',
    maskValue = 7,
  } = props;

  if (typeof text !== 'string') {
    throw new Error('renderQrCode: text는 문자열이어야 합니다.');
  }
  if (text.length === 0) {
    throw new Error('renderQrCode: text는 빈 문자열일 수 없습니다.');
  }

  const orientation = fieldOrientation ?? context.labelOrientation;

  const output: string[] = [];

  output.push(fieldOrigin({ offsetX: fieldOriginX, offsetY: fieldOriginY }));
  output.push(
    barcodeQR({
      orientation,
      model,
      magnification,
      errorCorrection: errorCorrectionLevel,
      maskValue,
    })
  );
  output.push(fieldData(`${errorCorrectionLevel}A,${text}`));

  return output.join(newLine());
}

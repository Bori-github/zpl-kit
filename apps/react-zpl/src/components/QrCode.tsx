import { PropsWithChildren } from 'react';

import {
  barcodeQR,
  fieldData,
  fieldOrigin,
  newLine,
  type QrErrorCorrection,
} from '../commands';
import { ORIENTATION } from '../constants';
import type { ObjectValues, ZplElement, ZplElementContext } from '../types';

export interface QrCodeProps extends PropsWithChildren {
  fieldOriginX?: number;
  fieldOriginY?: number;
  fieldOrientation?: ObjectValues<typeof ORIENTATION>;
  model?: 1 | 2;
  magnification?: number;
  /** `^BQ`의 `d`와 `^FD` 스위치 첫 글자가 동일해야 함 */
  errorCorrectionLevel?: QrErrorCorrection;
  maskValue?: number;
}

export const QrCode: ZplElement<QrCodeProps> = ({ children }) => (
  <span>{children}</span>
);

QrCode.displayName = 'QrCode';

QrCode.print = (element, context: ZplElementContext) => {
  const {
    children,
    fieldOriginX = 0,
    fieldOriginY = 0,
    fieldOrientation,
    model = 2,
    magnification = 5,
    errorCorrectionLevel = 'Q',
    maskValue = 7,
  } = element.props;

  if (typeof children !== 'string') {
    throw new Error('QrCode 컴포넌트는 children에 문자열만 허용합니다.');
  }
  if (children.length === 0) {
    throw new Error('QrCode: children은 빈 문자열일 수 없습니다.');
  }

  const orientation: ObjectValues<typeof ORIENTATION> =
    fieldOrientation ?? context.labelOrientation;

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
  /** 자동 데이터 입력 모드 `A` — Zebra QR `^FD` 규칙에 따라 페이로드는 `"{ECC}A,{payload}"` 형식 */
  output.push(fieldData(`${errorCorrectionLevel}A,${children}`));

  return output.join(newLine());
};

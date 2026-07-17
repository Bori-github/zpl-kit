import { PropsWithChildren } from 'react';

import { type QrErrorCorrection } from '@zpl-kit/zpl-core';
import { ObjectValues } from '../types';
import { ORIENTATION } from '../constants';

export interface QrCodeProps extends PropsWithChildren {
  fieldOriginX?: number;
  fieldOriginY?: number;
  fieldOrientation?: ObjectValues<typeof ORIENTATION>;
  model?: 1 | 2;
  magnification?: number;
  errorCorrectionLevel?: QrErrorCorrection;
  maskValue?: number;
}

export const QrCode = ({ children }: QrCodeProps) => <span>{children}</span>;

QrCode.displayName = 'QrCode';

import { defineCommand } from './base';

import { COLOR } from '../constants';
import { ObjectValues } from '../types';

interface GraphicEllipseParams {
  width: number;
  height: number;
  thickness?: number;
  lineColor?: ObjectValues<typeof COLOR>;
}

export const graphicEllipse = defineCommand<GraphicEllipseParams>(
  ({ width, height, thickness = 1, lineColor = COLOR.BLACK }) =>
    `^GE${width},${height},${thickness},${lineColor}^FS`
);

import { defineCommand } from './base';

import { COLOR } from '../constants';
import { ObjectValues } from '../types';

interface GraphicCircleParams {
  diameter: number;
  thickness?: number;
  lineColor?: ObjectValues<typeof COLOR>;
}

export const graphicCircle = defineCommand<GraphicCircleParams>(
  ({ diameter, thickness = 1, lineColor = COLOR.BLACK }) =>
    `^GC${diameter},${thickness},${lineColor}^FS`
);

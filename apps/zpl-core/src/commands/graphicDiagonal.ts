import { defineCommand } from './base';

import { COLOR, DIAGONAL_ORIENTATION } from '../constants';
import { ObjectValues } from '../types';

interface GraphicDiagonalParams {
  width: number;
  height: number;
  thickness?: number;
  lineColor?: ObjectValues<typeof COLOR>;
  orientation?: ObjectValues<typeof DIAGONAL_ORIENTATION>;
}

export const graphicDiagonal = defineCommand<GraphicDiagonalParams>(
  ({ width, height, thickness = 1, lineColor = 'B', orientation = 'R' }) =>
    `^GD${width},${height},${thickness},${lineColor},${orientation}^FS`
);

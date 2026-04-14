import { ObjectValues } from '../types';
import { COLOR, DIAGONAL_ORIENTATION } from '../constants';

export interface DiagonalLineProps {
  width: number;
  height: number;
  orientation?: ObjectValues<typeof DIAGONAL_ORIENTATION>;
  fieldOriginX?: number;
  fieldOriginY?: number;
  thickness?: number;
  lineColor?: ObjectValues<typeof COLOR>;
}

export const DiagonalLine = (_props: DiagonalLineProps) => <span />;

DiagonalLine.displayName = 'DiagonalLine';

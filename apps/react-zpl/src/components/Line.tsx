import { ObjectValues } from '../types';
import { COLOR } from '../constants';

export interface LineProps {
  direction: 'horizontal' | 'vertical';
  length: number;
  fieldOriginX?: number;
  fieldOriginY?: number;
  thickness?: number;
  lineColor?: ObjectValues<typeof COLOR>;
}

export const Line = (_props: LineProps) => <span />;

Line.displayName = 'Line';

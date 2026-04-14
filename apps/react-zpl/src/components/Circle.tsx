import { ObjectValues } from '../types';
import { COLOR } from '../constants';

export interface CircleProps {
  diameter: number;
  fieldOriginX?: number;
  fieldOriginY?: number;
  thickness?: number;
  lineColor?: ObjectValues<typeof COLOR>;
}

export const Circle = (_props: CircleProps) => <span />;

Circle.displayName = 'Circle';

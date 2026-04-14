import { ObjectValues } from '../types';
import { COLOR } from '../constants';

export interface EllipseProps {
  width: number;
  height: number;
  fieldOriginX?: number;
  fieldOriginY?: number;
  thickness?: number;
  lineColor?: ObjectValues<typeof COLOR>;
}

export const Ellipse = (_props: EllipseProps) => <span />;

Ellipse.displayName = 'Ellipse';

import { fieldOrigin, graphicCircle, newLine } from '../commands';
import { COLOR } from '../constants';
import { ObjectValues, ZplElement } from '../types';

const MIN_DIAMETER = 3;
const MAX_DIAMETER = 4095;
const MIN_THICKNESS = 1;
const MAX_THICKNESS = 4095;

interface CircleProps {
  diameter: number;
  fieldOriginX?: number;
  fieldOriginY?: number;
  thickness?: number;
  lineColor?: ObjectValues<typeof COLOR>;
}

export const Circle: ZplElement<CircleProps> = () => <span />;

Circle.displayName = 'Circle';

Circle.print = (element, _context) => {
  const {
    diameter,
    fieldOriginX = 0,
    fieldOriginY = 0,
    thickness = MIN_THICKNESS,
    lineColor = COLOR.BLACK,
  } = element.props;

  if (diameter < MIN_DIAMETER || diameter > MAX_DIAMETER) {
    throw new Error(
      `Circle: diameter는 ${MIN_DIAMETER}~${MAX_DIAMETER} 사이여야 합니다. (diameter=${diameter})`
    );
  }
  if (thickness < MIN_THICKNESS || thickness > MAX_THICKNESS) {
    throw new Error(
      `Circle: thickness는 ${MIN_THICKNESS}~${MAX_THICKNESS} 사이여야 합니다. (thickness=${thickness})`
    );
  }

  const output: string[] = [];

  output.push(fieldOrigin({ offsetX: fieldOriginX, offsetY: fieldOriginY }));
  output.push(graphicCircle({ diameter, thickness, lineColor }));

  return output.flat().join(newLine());
};

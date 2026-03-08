import { fieldOrigin, graphicDiagonal, newLine } from '../commands';
import { COLOR, DIAGONAL_ORIENTATION } from '../constants';
import { ObjectValues, ZplElement } from '../types';

const MIN_THICKNESS = 1;
const DIAGONAL_MIN = 3;

interface DiagonalLineProps {
  width: number;
  height: number;
  orientation?: ObjectValues<typeof DIAGONAL_ORIENTATION>;
  fieldOriginX?: number;
  fieldOriginY?: number;
  thickness?: number;
  lineColor?: ObjectValues<typeof COLOR>;
}

export const DiagonalLine: ZplElement<DiagonalLineProps> = () => <span />;

DiagonalLine.displayName = 'DiagonalLine';

DiagonalLine.print = (element, _context) => {
  const {
    width,
    height,
    orientation = DIAGONAL_ORIENTATION.RIGHT_DOWN,
    fieldOriginX = 0,
    fieldOriginY = 0,
    thickness = MIN_THICKNESS,
    lineColor = COLOR.BLACK,
  } = element.props;

  if (width < DIAGONAL_MIN || height < DIAGONAL_MIN) {
    throw new Error(
      `DiagonalLine: width와 height는 ${DIAGONAL_MIN} 이상이어야 합니다. (width=${width}, height=${height})`
    );
  }

  if (thickness < MIN_THICKNESS) {
    throw new Error(
      `DiagonalLine: thickness는 ${MIN_THICKNESS} 이상이어야 합니다. (thickness=${thickness})`
    );
  }

  const graphic = graphicDiagonal({
    width,
    height,
    thickness,
    lineColor,
    orientation,
  });

  const output: string[] = [];

  output.push(fieldOrigin({ offsetX: fieldOriginX, offsetY: fieldOriginY }));
  output.push(graphic);

  return output.flat().join(newLine());
};

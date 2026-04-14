import { fieldOrigin, graphicDiagonal, newLine } from '../commands';
import { COLOR, DIAGONAL_ORIENTATION } from '../constants';
import { ObjectValues } from '../types';

const MIN_THICKNESS = 1;
const DIAGONAL_MIN = 3;

export interface DiagonalLineCoreProps {
  width: number;
  height: number;
  orientation?: ObjectValues<typeof DIAGONAL_ORIENTATION>;
  fieldOriginX?: number;
  fieldOriginY?: number;
  thickness?: number;
  lineColor?: ObjectValues<typeof COLOR>;
}

export function renderDiagonalLine(props: DiagonalLineCoreProps): string {
  const {
    width,
    height,
    orientation = DIAGONAL_ORIENTATION.RIGHT_DOWN,
    fieldOriginX = 0,
    fieldOriginY = 0,
    thickness = MIN_THICKNESS,
    lineColor = COLOR.BLACK,
  } = props;

  if (width < DIAGONAL_MIN || height < DIAGONAL_MIN) {
    throw new Error(
      `renderDiagonalLine: width와 height는 ${DIAGONAL_MIN} 이상이어야 합니다. (width=${width}, height=${height})`
    );
  }
  if (thickness < MIN_THICKNESS) {
    throw new Error(
      `renderDiagonalLine: thickness는 ${MIN_THICKNESS} 이상이어야 합니다. (thickness=${thickness})`
    );
  }

  const output: string[] = [];

  output.push(fieldOrigin({ offsetX: fieldOriginX, offsetY: fieldOriginY }));
  output.push(graphicDiagonal({ width, height, thickness, lineColor, orientation }));

  return output.join(newLine());
}

import { fieldOrigin, graphicBox, newLine } from '../commands';
import { COLOR } from '../constants';
import { ObjectValues } from '../types';

const MIN_LENGTH = 1;
const MIN_THICKNESS = 1;

export interface LineCoreProps {
  direction: 'horizontal' | 'vertical';
  length: number;
  fieldOriginX?: number;
  fieldOriginY?: number;
  thickness?: number;
  lineColor?: ObjectValues<typeof COLOR>;
}

export function renderLine(props: LineCoreProps): string {
  const {
    direction,
    length,
    fieldOriginX = 0,
    fieldOriginY = 0,
    thickness = MIN_THICKNESS,
    lineColor = COLOR.BLACK,
  } = props;

  if (length < MIN_LENGTH) {
    throw new Error(`renderLine: length는 ${MIN_LENGTH} 이상이어야 합니다. (length=${length})`);
  }
  if (thickness < MIN_THICKNESS) {
    throw new Error(
      `renderLine: thickness는 ${MIN_THICKNESS} 이상이어야 합니다. (thickness=${thickness})`
    );
  }

  const graphic =
    direction === 'horizontal'
      ? graphicBox({ width: length, height: thickness, borderThickness: thickness, lineColor })
      : graphicBox({ width: thickness, height: length, borderThickness: thickness, lineColor });

  const output: string[] = [];

  output.push(fieldOrigin({ offsetX: fieldOriginX, offsetY: fieldOriginY }));
  output.push(graphic);

  return output.join(newLine());
}

import { fieldOrigin, graphicEllipse, newLine } from '../commands';
import { COLOR } from '../constants';
import { ObjectValues } from '../types';

const MIN_SIZE = 3;
const MAX_SIZE = 4095;
const MIN_THICKNESS = 1;
const MAX_THICKNESS = 4095;

export interface EllipseCoreProps {
  width: number;
  height: number;
  fieldOriginX?: number;
  fieldOriginY?: number;
  thickness?: number;
  lineColor?: ObjectValues<typeof COLOR>;
}

export function renderEllipse(props: EllipseCoreProps): string {
  const {
    width,
    height,
    fieldOriginX = 0,
    fieldOriginY = 0,
    thickness = MIN_THICKNESS,
    lineColor = COLOR.BLACK,
  } = props;

  if (
    width < MIN_SIZE || width > MAX_SIZE ||
    height < MIN_SIZE || height > MAX_SIZE
  ) {
    throw new Error(
      `renderEllipse: width와 height는 ${MIN_SIZE}~${MAX_SIZE} 사이여야 합니다. (width=${width}, height=${height})`
    );
  }
  if (thickness < MIN_THICKNESS || thickness > MAX_THICKNESS) {
    throw new Error(
      `renderEllipse: thickness는 ${MIN_THICKNESS}~${MAX_THICKNESS} 사이여야 합니다. (thickness=${thickness})`
    );
  }

  const output: string[] = [];

  output.push(fieldOrigin({ offsetX: fieldOriginX, offsetY: fieldOriginY }));
  output.push(graphicEllipse({ width, height, thickness, lineColor }));

  return output.join(newLine());
}

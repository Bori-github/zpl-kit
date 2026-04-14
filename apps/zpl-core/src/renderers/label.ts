import {
  changeDefaultFont,
  changeInternationalEncoding,
  endFormat,
  fieldOrientation,
  labelHome,
  labelLength,
  newLine,
  printWidth,
  startFormat,
} from '../commands';
import { ORIENTATION, UTF8_ENCODING } from '../constants';
import { LabelRootNode, ObjectValues, ZplElementContext } from '../types';
import { renderChildren } from './renderChildNode';

export interface LabelCoreProps {
  width: number;
  height: number;
  offsetX?: number;
  offsetY?: number;
  labelOrientation?: ObjectValues<typeof ORIENTATION>;
  encoding?: string[];
  defaultFontName?: string;
  defaultFontWidth?: number;
  defaultFontHeight?: number;
}

export function renderLabel(node: LabelRootNode): string {
  const {
    width,
    height,
    offsetX = 0,
    offsetY = 0,
    labelOrientation = ORIENTATION.NO_ROTATION,
    encoding = [UTF8_ENCODING],
    defaultFontName = 'J',
    defaultFontWidth = 30,
    defaultFontHeight = 30,
  } = node.props;

  const context = createLabelContext(node.props);

  const output: string[] = [];

  output.push(startFormat());
  output.push(printWidth(width));
  output.push(labelLength(height));
  output.push(fieldOrientation({ orientation: labelOrientation }));
  output.push(labelHome({ offsetX, offsetY }));
  output.push(changeInternationalEncoding(encoding));
  output.push(
    changeDefaultFont({
      fontName: defaultFontName,
      width: defaultFontWidth,
      height: defaultFontHeight,
    })
  );
  output.push(...renderChildren(node.children, context));
  output.push(endFormat());

  return output.join(newLine());
}

export function createLabelContext(props: LabelCoreProps): ZplElementContext {
  return {
    labelOrientation: props.labelOrientation ?? ORIENTATION.NO_ROTATION,
    defaultFontName: props.defaultFontName ?? 'J',
    defaultFontWidth: props.defaultFontWidth ?? 30,
    defaultFontHeight: props.defaultFontHeight ?? 30,
  };
}

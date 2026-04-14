import { fieldData, fieldFont, fieldOrigin, newLine } from '../commands';
import { ORIENTATION } from '../constants';
import { ObjectValues, ZplElementContext } from '../types';

interface TextBaseCoreProps {
  text: string;
  fieldOriginX?: number;
  fieldOriginY?: number;
  fieldOrientation?: ObjectValues<typeof ORIENTATION>;
}

interface TextFontInheritCoreProps extends TextBaseCoreProps {
  fontInherit?: true;
  fontName?: never;
  fontWidth?: never;
  fontHeight?: never;
}

interface TextFontOwnCoreProps extends TextBaseCoreProps {
  fontInherit: false;
  fontName: string;
  fontWidth: number;
  fontHeight: number;
}

export type TextCoreProps = TextFontInheritCoreProps | TextFontOwnCoreProps;

export function renderText(
  props: TextCoreProps,
  context: ZplElementContext
): string {
  const {
    text,
    fieldOriginX = 0,
    fieldOriginY = 0,
    fieldOrientation,
    fontInherit,
  } = props;

  if (typeof text !== 'string') {
    throw new Error('renderText: text는 문자열이어야 합니다.');
  }

  const { defaultFontName, defaultFontWidth, defaultFontHeight, labelOrientation } = context;

  const { fontName, width, height } =
    fontInherit === false
      ? { fontName: props.fontName, width: props.fontWidth, height: props.fontHeight }
      : { fontName: defaultFontName, width: defaultFontWidth, height: defaultFontHeight };

  const _fieldOrientation = fieldOrientation ?? labelOrientation;

  const output: string[] = [];

  output.push(fieldOrigin({ offsetX: fieldOriginX, offsetY: fieldOriginY }));
  output.push(fieldFont({ fontName, fieldOrientation: _fieldOrientation, width, height }));
  output.push(fieldData(text));

  return output.join(newLine());
}

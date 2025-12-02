import { PropsWithChildren } from 'react';

import { ObjectValues, ZplElement } from '../types';
import { ORIENTATION } from '../constants';
import { fieldData, fieldFont, fieldOrigin, newLine } from '../commands';

interface BaseTextProps extends PropsWithChildren {
  fieldOriginX?: number;
  fieldOriginY?: number;
  fieldOrientation?: ObjectValues<typeof ORIENTATION>;
}

interface TextFontInheritProps extends BaseTextProps {
  fontInherit?: true;
  fontName?: never;
  fontWidth?: never;
  fontHeight?: never;
}

interface TextNotFontInheritProps extends BaseTextProps {
  fontInherit: false;
  fontName: string;
  fontWidth: number;
  fontHeight: number;
}

type TextProps = TextFontInheritProps | TextNotFontInheritProps;

export const Text: ZplElement<TextProps> = ({ children }) => {
  return <span>{children}</span>;
};

Text.displayName = 'Text';

Text.print = (element, context) => {
  const {
    children,
    fieldOriginX = 0,
    fieldOriginY = 0,
    fieldOrientation,
    fontInherit,
  } = element.props;

  if (typeof children !== 'string') {
    throw new Error('Text 컴포넌트는 children에 문자열만 허용합니다.');
  }

  const {
    defaultFontName,
    defaultFontWidth,
    defaultFontHeight,
    labelOrientation,
  } = context;

  const { fontName, width, height } =
    fontInherit === false
      ? {
          fontName: element.props.fontName,
          width: element.props.fontWidth,
          height: element.props.fontHeight,
        }
      : {
          fontName: defaultFontName,
          width: defaultFontWidth,
          height: defaultFontHeight,
        };
  const _fieldOrientation = fieldOrientation ?? labelOrientation;

  const output: string[] = [];

  // Set field origin
  output.push(fieldOrigin({ offsetX: fieldOriginX, offsetY: fieldOriginY }));
  // Set field font
  output.push(
    fieldFont({
      fontName,
      fieldOrientation: _fieldOrientation,
      width,
      height,
    })
  );
  // Set print text
  output.push(fieldData(children));

  return output.flat().join(newLine());
};

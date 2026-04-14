import { PropsWithChildren } from 'react';

import { ObjectValues } from '../types';
import { ORIENTATION } from '../constants';

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

export type TextProps = TextFontInheritProps | TextNotFontInheritProps;

export const Text = ({ children }: TextProps) => {
  return <span>{children}</span>;
};

Text.displayName = 'Text';

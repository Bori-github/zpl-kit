import { PropsWithChildren, ReactElement } from "react";
import { ObjectValues, ZplElementContext } from "../types";
import { ORIENTATION } from "../constants";
import { fieldData, fieldFont, fieldOrigin, newLine } from "../commands";

interface TextProps extends PropsWithChildren {
  fieldOriginX?: number;
  fieldOriginY?: number;
  fontName?: string;
  fontWidth?: number;
  fontHeight?: number;
  fieldOrientation?: ObjectValues<typeof ORIENTATION>;
  fontInherit?: boolean;
}

export const Text = ({ children }: TextProps) => {
  return <span>{children}</span>;
};

Text.displayName = "Text";

Text.print = (element: ReactElement<TextProps>, context: ZplElementContext) => {
  const {
    children,
    fieldOriginX = 0,
    fieldOriginY = 0,
    fontName = "0",
    fontWidth = 30,
    fontHeight = 30,
    fieldOrientation = ORIENTATION.NO_ROTATION,
    fontInherit = true,
  } = element.props;

  if (typeof children !== "string") {
    throw new Error("Text 컴포넌트는 children에 문자열만 허용합니다.");
  }

  const { defaultFontName, defaultFontWidth, defaultFontHeight } = context;

  const _fontName = fontInherit ? defaultFontName : fontName;
  const _fontWidth = fontInherit ? defaultFontWidth : fontWidth;
  const _fontHeight = fontInherit ? defaultFontHeight : fontHeight;

  const output: string[] = [];

  // Set field origin
  output.push(fieldOrigin({ offsetX: fieldOriginX, offsetY: fieldOriginY }));
  // Set field font
  output.push(
    fieldFont({
      fontName: _fontName,
      fieldOrientation,
      width: _fontWidth,
      height: _fontHeight,
    }),
  );
  // Set print text
  output.push(fieldData(children));

  return output.flat().join(newLine());
};

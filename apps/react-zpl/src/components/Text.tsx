import { PropsWithChildren, ReactElement } from "react";
import { ObjectValues } from "../types";
import { ORIENTATION } from "../constants";
import { fieldData, fieldFont, fieldOrigin, newLine } from "../commands";

interface TextProps extends PropsWithChildren {
  fieldOriginX?: number;
  fieldOriginY?: number;
  fontName?: string;
  fontWidth?: number;
  fontHeight?: number;
  fieldOrientation?: ObjectValues<typeof ORIENTATION>;
}

export const Text = ({ children }: TextProps) => {
  return <span>{children}</span>;
};

Text.displayName = "Text";

Text.print = (element: ReactElement<TextProps>) => {
  const {
    children,
    fieldOriginX = 0,
    fieldOriginY = 0,
    fontName = "",
    fontWidth = 30,
    fontHeight = 30,
    fieldOrientation = ORIENTATION.NO_ROTATION,
  } = element.props;

  if (typeof children !== "string") {
    throw new Error("Text 컴포넌트는 children에 문자열만 허용합니다.");
  }

  const output: string[] = [];

  // Set field origin
  output.push(fieldOrigin({ offsetX: fieldOriginX, offsetY: fieldOriginY }));
  // Set field font
  output.push(
    fieldFont({
      fontName,
      fieldOrientation,
      width: fontWidth,
      height: fontHeight,
    }),
  );
  // Set print text
  output.push(fieldData(children));

  return output.flat().join(newLine());
};

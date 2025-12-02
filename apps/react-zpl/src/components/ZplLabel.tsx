import { PropsWithChildren, ReactElement } from "react";

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
} from "../commands";
import { printChildren } from "../utils";
import { ObjectValues, ZplElement, ZplElementContext } from "../types";
import { ORIENTATION, UTF8_ENCODING } from "../constants";

export interface ZplLabelProps extends PropsWithChildren {
  width: number; // dots
  height: number; // dots
  offsetX?: number; // dots
  offsetY?: number; // dots
  labelOrientation?: ObjectValues<typeof ORIENTATION>;
  defaultFontName?: string;
  defaultFontWidth?: number;
  defaultFontHeight?: number;
  encoding?: string[];
}

export const ZplLabel: ZplElement<ZplLabelProps> = ({ children }) => {
  return <div>{children}</div>;
};

ZplLabel.displayName = "ZplLabel";

ZplLabel.print = (element: ReactElement<ZplLabelProps>) => {
  const {
    width,
    height,
    offsetX = 0,
    offsetY = 0,
    labelOrientation = ORIENTATION.NO_ROTATION,
    defaultFontName = "J",
    defaultFontWidth = 30,
    defaultFontHeight = 30,
    encoding = [UTF8_ENCODING],
  } = element.props;
  // TODO: improve context
  const context: ZplElementContext = {};

  const output = [];

  // Start format
  output.push(startFormat());

  // Set label size, orientation, home position
  output.push(printWidth(width));
  output.push(labelLength(height));
  output.push(fieldOrientation({ orientation: labelOrientation }));
  output.push(labelHome({ offsetX, offsetY }));

  // TODO: add zpl commands

  // Set encoding
  output.push(changeInternationalEncoding(encoding));
  // Set default fonts
  output.push(
    changeDefaultFont({
      fontName: defaultFontName,
      width: defaultFontWidth,
      height: defaultFontHeight,
    }),
  );

  // Add print children
  output.push(printChildren(element, context));
  // End format
  output.push(endFormat());

  return output.flat(Infinity).join(newLine());
};

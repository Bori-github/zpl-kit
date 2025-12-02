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

interface ZplLabelProps extends PropsWithChildren {
  width: number; // dots
  height: number; // dots
  offsetX?: number; // dots
  offsetY?: number; // dots
  labelOrientation?: ObjectValues<typeof ORIENTATION>;
  encoding?: string[];
  defaultFontName?: string;
  defaultFontWidth?: number;
  defaultFontHeight?: number;
}

interface ZplLabelComponent extends ZplElement<ZplLabelProps> {
  print: (element: ReactElement<ZplLabelProps>) => string;
}

export const ZplLabel: ZplLabelComponent = ({ children }) => {
  return <div>{children}</div>;
};

ZplLabel.displayName = "ZplLabel";

ZplLabel.print = (element) => {
  const {
    width,
    height,
    offsetX = 0,
    offsetY = 0,
    labelOrientation = ORIENTATION.NO_ROTATION,
    encoding = [UTF8_ENCODING],
    defaultFontName = "J", // default korean
    defaultFontWidth = 30,
    defaultFontHeight = 30,
  } = element.props;

  const context: ZplElementContext = {
    labelOrientation,
    defaultFontName,
    defaultFontWidth,
    defaultFontHeight,
  };

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

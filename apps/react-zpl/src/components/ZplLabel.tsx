import { PropsWithChildren, ReactElement } from "react";

import {
  endFormat,
  fieldOrientation,
  labelHome,
  labelLength,
  newLine,
  printWidth,
  startFormat,
} from "../commands";
import { printChildren } from "../utils";
import { ObjectValues } from "../types";
import { ORIENTATION } from "../constants";

export interface ZplLabelProps extends PropsWithChildren {
  width: number; // dots
  height: number; // dots
  offsetX?: number; // dots
  offsetY?: number; // dots
  labelOrientation?: ObjectValues<typeof ORIENTATION>;
}

export const ZplLabel = ({ children }: ZplLabelProps) => {
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
  } = element.props;
  // TODO: improve context
  const context = {};

  const output = [];

  // Start format
  output.push(startFormat());

  // Set label size, orientation, home position
  output.push(printWidth(width));
  output.push(labelLength(height));
  output.push(fieldOrientation({ orientation: labelOrientation }));
  output.push(labelHome({ offsetX, offsetY }));

  // TODO: add zpl commands

  // Add print children
  output.push(printChildren(element, context));
  // End format
  output.push(endFormat());

  // TODO: 추후 제거(for debugging)
  console.log("output", output);
  console.log("element", element.props);

  return output.flat(Infinity).join(newLine());
};

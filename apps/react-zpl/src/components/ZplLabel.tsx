import { PropsWithChildren, ReactElement } from "react";

import { endFormat, newLine, startFormat } from "../commands";
import { printChildren } from "../utils";

export interface ZplLabelProps extends PropsWithChildren {}

export const ZplLabel = ({ children }: ZplLabelProps) => {
  return <div>{children}</div>;
};

ZplLabel.displayName = "ZplLabel";

ZplLabel.print = (element: ReactElement<ZplLabelProps>) => {
  const context = {};

  const output = [];

  // Start format
  output.push(startFormat());

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

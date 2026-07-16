import { PropsWithChildren, ReactElement } from 'react';

import { renderLabel } from '@zpl-kit/zpl-core';
import { toLabelNode } from '../utils';
import { ObjectValues, ZplElement } from '../types';
import { ORIENTATION } from '../constants';

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

ZplLabel.displayName = 'ZplLabel';

ZplLabel.print = (element) => {
  const node = toLabelNode(element); // ReactElement → LabelRootNode
  return renderLabel(node); // LabelRootNode → ZPL
};

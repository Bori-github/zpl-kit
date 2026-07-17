import { ChildLabelNode, ZplElementContext } from '../types';
import { renderCircle } from './circle';
import { renderDiagonalLine } from './diagonalLine';
import { renderEllipse } from './ellipse';
import { renderLine } from './line';
import { renderQrCode } from './qrCode';
import { renderText } from './text';

export function renderChildren(nodes: ChildLabelNode[], context: ZplElementContext): string[] {
  return nodes.map((node) => renderChildNode(node, context));
}

export function renderChildNode(node: ChildLabelNode, context: ZplElementContext): string {
  switch (node.type) {
    case 'text':
      return renderText(node.props, context);
    case 'line':
      return renderLine(node.props);
    case 'diagonalLine':
      return renderDiagonalLine(node.props);
    case 'circle':
      return renderCircle(node.props);
    case 'ellipse':
      return renderEllipse(node.props);
    case 'qrCode':
      return renderQrCode(node.props, context);
  }
}

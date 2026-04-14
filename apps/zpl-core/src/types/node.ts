import {
  CircleCoreProps,
  DiagonalLineCoreProps,
  EllipseCoreProps,
  LabelCoreProps,
  LineCoreProps,
  QrCodeCoreProps,
  TextCoreProps,
} from '../renderers';

export type ChildLabelNode =
  | { type: 'text'; props: TextCoreProps }
  | { type: 'line'; props: LineCoreProps }
  | { type: 'diagonalLine'; props: DiagonalLineCoreProps }
  | { type: 'circle'; props: CircleCoreProps }
  | { type: 'ellipse'; props: EllipseCoreProps }
  | { type: 'qrCode'; props: QrCodeCoreProps };

export interface LabelRootNode {
  type: 'label';
  props: LabelCoreProps;
  children: ChildLabelNode[];
}

export type LabelNode = LabelRootNode | ChildLabelNode;

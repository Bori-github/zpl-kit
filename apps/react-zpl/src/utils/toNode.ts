import { Children, isValidElement, ReactElement, ReactNode } from 'react';

import { ChildLabelNode, LabelRootNode, type LabelCoreProps } from '@zpl-kit/zpl-core';

import { renderReactElement } from './render';

/**
 * ReactElement 트리를 LabelRootNode로 변환한다.
 *
 * ZplLabel element를 받아 자식 컴포넌트들을 재귀적으로 순회하며
 * zpl-core가 이해하는 순수 데이터 트리(LabelNode)를 생성한다.
 */
export function toLabelNode(element: ReactElement): LabelRootNode {
  return {
    type: 'label',
    props: element.props as LabelCoreProps,
    children: collectChildNodes(element),
  };
}

function collectChildNodes(element: ReactElement): ChildLabelNode[] {
  const nodes: ChildLabelNode[] = [];
  for (const child of renderReactElement(element)) {
    nodes.push(...extractNodes(child));
  }
  return nodes;
}

function extractNodes(node: ReactNode): ChildLabelNode[] {
  if (!isValidElement(node)) return [];

  const displayName = (node.type as { displayName?: string }).displayName;
  const childNode = toChildNode(node, displayName);
  if (childNode) return [childNode];

  // ZPL 컴포넌트가 아닌 경우 (div 등) children을 재귀 탐색
  const children = node.props?.children;
  if (children) {
    return Children.toArray(children).flatMap(extractNodes);
  }

  return [];
}

function toChildNode(
  node: ReactElement,
  displayName: string | undefined
): ChildLabelNode | undefined {
  switch (displayName) {
    case 'Text': {
      const { children, ...rest } = node.props;
      return { type: 'text', props: { text: children, ...rest } };
    }
    case 'Line':
      return { type: 'line', props: node.props };
    case 'DiagonalLine':
      return { type: 'diagonalLine', props: node.props };
    case 'Circle':
      return { type: 'circle', props: node.props };
    case 'Ellipse':
      return { type: 'ellipse', props: node.props };
    case 'QrCode': {
      const { children, errorCorrectionLevel, ...rest } = node.props;
      return {
        type: 'qrCode',
        props: { text: children, errorCorrectionLevel, ...rest },
      };
    }
    default:
      return undefined;
  }
}

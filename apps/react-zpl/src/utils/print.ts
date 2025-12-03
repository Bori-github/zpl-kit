import { isValidElement, ReactNode } from 'react';

import { renderReactElement } from './render';
import { isZplElement, ZplElementContext } from '../types';

/**
 * 단일 React 노드를 재귀적으로 순회하면서 자식 노드를 ZPL 렌더링 파이프라인에 맞게 처리하는 헬퍼
 *
 * @param node - 처리할 React 노드 (ReactNode 타입)
 * @param context - ZPL 명령어 생성에 필요한 컨텍스트 정보
 * @returns 렌더링된 ReactNode 배열. 유효하지 않은 노드인 경우 `undefined`를 반환합니다.
 */
export const printChild = (
  node: ReactNode,
  context: ZplElementContext
): ReactNode[] | undefined => {
  if (!isValidElement(node)) return;

  const children: ReactNode[] = [];

  for (const element of renderReactElement(node)) {
    if (!isValidElement(element)) return;

    // TODO: print element with context
    if (isZplElement(element.type)) {
      children.push(element.type.print(element, context));
    } else if (node.props.children) {
      children.push(printChild(node.props.children, context));
    }
  }

  return children;
};

/**
 * React 노드의 자식 요소들을 렌더링하여 배열로 반환하는 함수
 *
 * 이 함수는 ZPL 라벨 생성 과정에서 React 컴포넌트 트리를 순회하며
 * 각 노드의 children을 추출하고 렌더링하는 역할을 합니다.
 *
 * @param node - 처리할 React 노드 (ReactNode 타입)
 * @param context - ZPL 명령어 생성에 필요한 컨텍스트 정보
 * @returns 렌더링된 ReactNode 배열. 유효하지 않은 노드인 경우 `undefined`를 반환합니다.
 *
 * @see {@link renderReactElement} - 내부적으로 사용하는 렌더링 함수
 */
export const printChildren = (
  node: ReactNode,
  context: ZplElementContext
): ReactNode[] | undefined => {
  if (!isValidElement(node)) return;

  const children: ReactNode[] = [];

  for (const child of renderReactElement(node)) {
    children.push(printChild(child, context));
  }

  return children;
};

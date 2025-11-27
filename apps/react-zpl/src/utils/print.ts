import { isValidElement, ReactNode } from "react";

import { renderReactElement } from "./render";

/**
 * React 노드의 자식 요소들을 렌더링하여 배열로 반환하는 함수
 *
 * 이 함수는 ZPL 라벨 생성 과정에서 React 컴포넌트 트리를 순회하며
 * 각 노드의 children을 추출하고 렌더링하는 역할을 합니다.
 *
 * ### Context 파라미터
 * `context` 파라미터는 현재 사용되지 않지만, 향후 다음 용도로 활용될 예정입니다:
 * - 라벨 포맷, 폰트, 위치 등의 컨텍스트 정보 관리
 * - 재귀적 렌더링 시 상위 컨텍스트 정보 전달
 *
 * @param node - 처리할 React 노드 (ReactNode 타입)
 * @param _context - ZPL 명령어 생성에 필요한 컨텍스트 정보 (현재 미사용, 향후 개선 예정)
 * @returns 렌더링된 ReactNode 배열. 유효하지 않은 노드인 경우 `undefined`를 반환합니다.
 *
 * @see {@link renderReactElement} - 내부적으로 사용하는 렌더링 함수
 */
export const printChildren = (
  node: ReactNode,
  _context: any, // TODO: improve context type
): ReactNode[] | undefined => {
  if (!isValidElement(node)) return;

  const children: ReactNode[] = [];

  for (const child of renderReactElement(node)) {
    // TODO: print child with context
    children.push(child);
  }

  return children;
};

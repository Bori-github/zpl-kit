import {
  Children,
  ComponentClass,
  FunctionComponent,
  ReactElement,
  ReactNode,
} from 'react';

/**
 * React 엘리먼트를 렌더링하여 ReactNode 배열로 변환하는 함수
 *
 * 이 함수는 React 엘리먼트를 받아서 실제 렌더링된 결과를 배열 형태로 반환합니다.
 * 함수 컴포넌트, 클래스 컴포넌트, 그리고 일반 엘리먼트를 모두 처리할 수 있습니다.
 * 단순히 JSX를 렌더링하는 용도로 사용되며, 실제 React 렌더링 트리와는 별개입니다.
 *
 * ### 동작 방식
 * 1. **함수 컴포넌트 처리**: `element.type`이 함수인 경우
 *    - 클래스 컴포넌트인지 확인 (`isReactComponent` 프로토타입 체크)
 *    - 클래스 컴포넌트: 인스턴스를 생성하고 `render()` 메서드를 호출
 *    - 함수 컴포넌트: 함수를 직접 호출하여 JSX를 반환
 *
 * 2. **일반 엘리먼트 처리**: `element.type`이 함수가 아닌 경우
 *    - `children` 속성이 있으면 해당 children을 반환
 *    - children이 없으면 빈 배열 반환
 *
 * 3. **배열 변환**: 최종적으로 `Children.toArray()`를 사용하여
 *    - 단일 노드든 여러 노드든 일관된 배열 형태로 변환
 *    - React Fragment나 배열을 평탄화하여 처리
 *
 * @param element - 렌더링할 React 엘리먼트
 * @returns 렌더링된 ReactNode 배열. 엘리먼트를 렌더링할 수 없는 경우 빈 배열을 반환합니다.
 */
export const renderReactElement = (element: ReactElement): ReactNode[] => {
  let rendered: ReactNode | ReactNode[] = [];

  if (typeof element.type === 'function') {
    const isClassComponent =
      !!element.type.prototype && !!element.type.prototype.isReactComponent;

    rendered = isClassComponent
      ? new (element.type as ComponentClass)(element.props).render()
      : (element.type as FunctionComponent)(element.props);
  } else if (element.props.children) {
    rendered = element.props.children;
  }

  return Children.toArray(rendered);
};

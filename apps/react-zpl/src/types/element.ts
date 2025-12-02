import { ReactElement } from "react";

/**
 * ZPL 명령어 생성에 필요한 컨텍스트 정보
 *
 * 이 인터페이스는 ZPL 라벨 생성 과정에서 컴포넌트 간 공유되는 컨텍스트 정보를 담는 용도입니다.
 *
 * - 라벨 전역 설정 (폰트, 위치, 정렬 등)
 * - 재귀적 렌더링 시 상위 컴포넌트의 설정 정보
 * - ZPL 명령어 생성에 필요한 메타데이터
 *
 * @see {@link ZplElement} - 이 컨텍스트를 사용하는 인터페이스
 */
export interface ZplElementContext {
  defaultFontName: string;
  defaultFontWidth: number;
  defaultFontHeight: number;
}

/**
 * ZPL 명령어를 생성할 수 있는 React 컴포넌트를 정의하는 인터페이스
 */
export interface ZplElement<Props = unknown> {
  /**
   * 컴포넌트 식별자
   */
  displayName: string;

  /**
   * React 컴포넌트 함수 시그니처
   *
   * @param props - 컴포넌트가 받는 props
   * @returns 렌더링된 JSX 엘리먼트
   */
  (props: Props): JSX.Element;

  /**
   * ReactElement를 ZPL 명령어 문자열로 변환하는 메서드
   *
   * @param element - 변환할 React 엘리먼트 (자신의 props를 포함)
   * @param context - ZPL 명령어 생성에 필요한 컨텍스트 정보
   * @returns ZPL 명령어 문자열
   */
  print: (
    element: ReactElement<Props>,
    context: ZplElementContext | undefined,
  ) => string;
}

/**
 * 주어진 요소가 ZplElement인지 확인하는 타입 가드 함수
 *
 * @param element - 검증할 요소
 * @returns 요소가 ZplElement면 `true`, 그렇지 않으면 `false`
 *
 * @see {@link ZplElement} - 검증 대상 인터페이스
 */
export function isZplElement(element: unknown): element is ZplElement {
  return (
    typeof element === "function" &&
    typeof (element as ZplElement).print === "function"
  );
}

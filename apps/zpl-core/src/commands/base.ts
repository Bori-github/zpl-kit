/**
 * ZPL 명령어를 문자열로 생성하는 함수 시그니처
 *
 * - `P`가 `void`이면 사용자가 전달할 매개변수가 없으므로 단순히 문자열을 반환하는 함수가 됩니다.
 * - `P`가 객체 타입이면 `params`로 해당 속성을 전달하여 명령 문자열을 동적으로 구성합니다.
 */
export type Command<P = void> = P extends void
  ? () => string
  : (params: P) => string;

/**
 * 명령어 생성을 담당하는 실제 구현 함수 타입
 */
export type Resolver<P> = P extends void ? () => string : (params: P) => string;

/**
 * 명령어 정의 헬퍼 함수
 *
 * @param resolver - 실제 명령 문자열을 만드는 함수. 파라미터 유무를 자동으로 처리합니다.
 * @returns `Command<P>` - `resolver`와 동일한 시그니처의 호출 가능한 명령어 함수
 */
export const defineCommand = <P = void>(resolver: Resolver<P>): Command<P> => {
  return resolver as Command<P>;
};

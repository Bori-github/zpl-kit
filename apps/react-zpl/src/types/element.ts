import { ReactElement } from 'react';
import { ZplElementContext } from '@zpl-kit/zpl-core';

export type { ZplElementContext };

/**
 * ZPL 라벨 루트 컴포넌트(ZplLabel)의 인터페이스
 * print()는 ZplLabel에서만 사용되며, ReactElement 트리를 ZPL 문자열로 변환한다.
 */
export interface ZplElement<Props = unknown> {
  displayName: string;

  (props: Props): JSX.Element;

  print: (element: ReactElement<Props>) => string;
}

import { ObjectValues } from './common';
import { ORIENTATION } from '../constants';

/**
 * ZPL 명령어 생성에 필요한 컨텍스트 정보
 *
 * 라벨 전역 설정(폰트, 방향 등)을 담으며, renderer 함수들 간에 공유된다.
 */
export interface ZplElementContext {
  labelOrientation: ObjectValues<typeof ORIENTATION>;
  defaultFontName: string;
  defaultFontWidth: number;
  defaultFontHeight: number;
}

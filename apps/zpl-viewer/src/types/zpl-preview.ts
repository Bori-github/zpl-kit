export type LabelaryDpmm = 6 | 8 | 12 | 24;

export interface FetchLabelaryPngParams {
  zpl: string;
  widthMm: number;
  heightMm: number;
  dpmm: LabelaryDpmm;
}

export type ZplPreviewError =
  | { code: 'RATE_LIMIT'; message: string; retryAfterSeconds: number }
  | { code: 'BAD_REQUEST' | 'NETWORK' | 'TIMEOUT' | 'EMPTY_ZPL'; message: string };

export interface Example {
  id: string;
  label: string;
  zpl: string;
  widthMm: number;
  heightMm: number;
}

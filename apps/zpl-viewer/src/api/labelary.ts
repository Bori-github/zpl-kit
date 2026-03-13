import type { FetchLabelaryPngParams, LabelaryDpmm, ZplPreviewError } from '@/types/zpl-preview';

const LABEL_MAX_MM = 381;
const LABELARY_BASE = 'https://api.labelary.com/v1/printers';

function validateLabelDimensions(
  w: unknown,
  h: unknown
): { widthMm: number; heightMm: number } | null {
  if (!Number.isFinite(w) || !Number.isFinite(h)) return null;
  const widthMm = Number(w);
  const heightMm = Number(h);
  if (widthMm < 1 || widthMm > LABEL_MAX_MM || heightMm < 1 || heightMm > LABEL_MAX_MM)
    return null;
  return { widthMm, heightMm };
}

function isValidDpmm(value: unknown): value is LabelaryDpmm {
  return value === 6 || value === 8 || value === 12 || value === 24;
}

export function parseRetryAfterSeconds(header: string | null): number {
  const raw = header ? parseInt(header, 10) : NaN;
  return Math.min(300, Math.max(2, isNaN(raw) || raw < 0 ? 2 : raw));
}

export async function fetchLabelaryPng(
  params: FetchLabelaryPngParams,
  signal?: AbortSignal
): Promise<Blob> {
  const { zpl, widthMm, heightMm, dpmm } = params;

  if (!zpl.trim()) {
    const err: ZplPreviewError = { code: 'EMPTY_ZPL', message: 'ZPL을 입력해 주세요' };
    throw err;
  }

  const byteLength = new TextEncoder().encode(zpl).length;
  if (byteLength > 1024 * 1024) {
    const err: ZplPreviewError = { code: 'BAD_REQUEST', message: 'ZPL 크기가 1MB를 초과합니다' };
    throw err;
  }

  const dims = validateLabelDimensions(widthMm, heightMm);
  if (!dims) {
    const err: ZplPreviewError = {
      code: 'BAD_REQUEST',
      message: '라벨 크기가 유효하지 않습니다 (1~381mm)',
    };
    throw err;
  }

  if (!isValidDpmm(dpmm)) {
    const err: ZplPreviewError = { code: 'BAD_REQUEST', message: '잘못된 dpmm 값입니다' };
    throw err;
  }

  const widthInch = dims.widthMm / 25.4;
  const heightInch = dims.heightMm / 25.4;
  const url = `${LABELARY_BASE}/${dpmm}dpmm/labels/${widthInch}x${heightInch}/0/`;

  const timeoutSignal = AbortSignal.timeout(5000);
  const effectiveSignal = signal ? AbortSignal.any([signal, timeoutSignal]) : timeoutSignal;

  let res: Response;
  try {
    res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: zpl,
      signal: effectiveSignal,
    });
  } catch (e) {
    if (e instanceof Error && (e.name === 'AbortError' || e.name === 'TimeoutError')) {
      throw e;
    }
    const err: ZplPreviewError = { code: 'NETWORK', message: '네트워크 오류가 발생했습니다' };
    throw err;
  }

  if (res.status === 429) {
    const retryAfterSeconds = parseRetryAfterSeconds(res.headers.get('Retry-After'));
    const err: ZplPreviewError = {
      code: 'RATE_LIMIT',
      message: '요청이 너무 많습니다. 잠시 후 다시 시도해 주세요',
      retryAfterSeconds,
    };
    throw err;
  }

  if (!res.ok) {
    let message = `오류가 발생했습니다 (HTTP ${res.status})`;
    try {
      const text = await res.text();
      if (text) message = text.substring(0, 200);
    } catch {
      // ignore
    }
    const err: ZplPreviewError = { code: 'BAD_REQUEST', message };
    throw err;
  }

  return res.blob();
}

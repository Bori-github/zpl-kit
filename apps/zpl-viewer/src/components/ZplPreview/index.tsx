import type { ZplPreviewError } from '@/types/zpl-preview';

interface ZplPreviewProps {
  imageUrl: string | null;
  isPending: boolean;
  error: ZplPreviewError | null;
  retryCountdown: number;
  widthMm: number;
  heightMm: number;
}

export function ZplPreview({
  imageUrl,
  isPending,
  error,
  retryCountdown,
  widthMm,
  heightMm,
}: ZplPreviewProps) {
  if (isPending) {
    return (
      <div
        data-testid="preview-loading"
        aria-live="polite"
        className="flex items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50"
        style={{
          aspectRatio: `${widthMm} / ${heightMm}`,
          minHeight: 120,
        }}
      >
        <div className="flex flex-col items-center gap-2 text-zinc-400">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-zinc-300 border-t-zinc-600" />
          <span className="text-sm">미리보기 생성 중...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        data-testid="preview-error"
        aria-live="assertive"
        className="rounded-lg border border-red-200 bg-red-50 p-4"
      >
        <p className="text-sm font-medium text-red-700">{error.message}</p>
        {retryCountdown > 0 && (
          <p data-testid="retry-countdown" className="mt-1 text-xs text-red-500">
            {retryCountdown}초 후 재시도 가능
          </p>
        )}
      </div>
    );
  }

  if (imageUrl) {
    return (
      <div className="rounded-lg border border-zinc-200 bg-white p-2">
        <img
          data-testid="preview-image"
          src={imageUrl}
          alt="ZPL 미리보기"
          className="w-full object-contain"
          style={{ aspectRatio: `${widthMm} / ${heightMm}` }}
        />
      </div>
    );
  }

  return (
    <div
      className="flex items-center justify-center rounded-lg border border-dashed border-zinc-200 bg-zinc-50 text-sm text-zinc-400"
      style={{
        aspectRatio: `${widthMm} / ${heightMm}`,
        minHeight: 120,
      }}
    >
      Preview 버튼을 눌러 미리보기를 생성하세요
    </div>
  );
}

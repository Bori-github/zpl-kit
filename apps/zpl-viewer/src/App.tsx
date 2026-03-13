import { useCallback, useEffect, useRef, useState } from 'react';
import { ZplInput } from '@/components/ZplInput';
import { OptionsPanel } from '@/components/OptionsPanel';
import { ZplPreview } from '@/components/ZplPreview';
import { useZplPreview } from '@/hooks/use-zpl-preview';
import type { Example, LabelaryDpmm } from '@/types/zpl-preview';
import examples from '@/data/examples.json';

const EXAMPLES = examples as Example[];
const THROTTLE_MS = 400;

export default function App() {
  const [zpl, setZpl] = useState('');
  const [widthMm, setWidthMm] = useState(75);
  const [heightMm, setHeightMm] = useState(50);
  const [dpmm, setDpmm] = useState<LabelaryDpmm>(8);

  const lastTriggerRef = useRef(0);

  const { trigger, clearPreview, imageUrl, isPending, error, retryCountdown } = useZplPreview();

  const handleExampleSelect = (example: Example) => {
    setZpl(example.zpl);
    setWidthMm(example.widthMm);
    setHeightMm(example.heightMm);
    clearPreview();
  };

  const handleZplChange = (value: string) => {
    setZpl(value);
    clearPreview();
  };

  const handlePreview = useCallback(() => {
    const now = Date.now();
    if (now - lastTriggerRef.current < THROTTLE_MS) return;
    lastTriggerRef.current = now;
    trigger({ zpl, widthMm, heightMm, dpmm });
  }, [trigger, zpl, widthMm, heightMm, dpmm]);

  // Cmd/Ctrl+Enter
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        e.preventDefault();
        handlePreview();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handlePreview]);

  const isPreviewDisabled = isPending || retryCountdown > 0 || !zpl.trim();

  return (
    <div className="min-h-screen bg-zinc-50">
      <header className="border-b border-zinc-200 bg-white px-6 py-4">
        <h1 className="text-lg font-semibold text-zinc-900">zpl-viewer</h1>
      </header>

      <main className="mx-auto max-w-6xl p-6">
        <div className="flex gap-6">
          {/* Examples sidebar */}
          <aside className="flex w-36 shrink-0 flex-col gap-1">
            <p className="mb-1 text-xs font-medium text-zinc-400">예제</p>
            {EXAMPLES.map((example) => (
              <button
                key={example.id}
                type="button"
                data-testid={`example-${example.id}`}
                aria-label={`예제: ${example.label}`}
                onClick={() => handleExampleSelect(example)}
                className="rounded-md border border-zinc-200 bg-white px-3 py-2 text-left text-sm text-zinc-700 transition-colors hover:border-zinc-400"
              >
                {example.label}
              </button>
            ))}
          </aside>

          <div className="grid min-w-0 flex-1 grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Center: Input */}
            <div className="flex flex-col gap-4">
              <ZplInput zpl={zpl} onZplChange={handleZplChange} />

              <OptionsPanel
                widthMm={widthMm}
                heightMm={heightMm}
                dpmm={dpmm}
                onWidthChange={setWidthMm}
                onHeightChange={setHeightMm}
                onDpmmChange={setDpmm}
              />

              <button
                type="button"
                data-testid="preview-button"
                aria-label="미리보기 생성"
                disabled={isPreviewDisabled}
                onClick={handlePreview}
                className="rounded-md bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {retryCountdown > 0 ? `${retryCountdown}초 후 재시도` : 'Preview'}
              </button>

              <p className="text-xs text-zinc-400">
                ZPL 데이터는 미리보기 생성을 위해 Labelary(labelary.com)로 전송되며 최대 60일간
                보존될 수 있습니다.
              </p>
            </div>

            {/* Right: Preview */}
            <ZplPreview
              imageUrl={imageUrl}
              isPending={isPending}
              error={error}
              retryCountdown={retryCountdown}
              widthMm={widthMm}
              heightMm={heightMm}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

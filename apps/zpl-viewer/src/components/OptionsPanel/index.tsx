import type { LabelaryDpmm } from '@/types/zpl-preview';

const DPMM_OPTIONS: LabelaryDpmm[] = [6, 8, 12, 24];

interface OptionsPanelProps {
  widthMm: number;
  heightMm: number;
  dpmm: LabelaryDpmm;
  onWidthChange: (v: number) => void;
  onHeightChange: (v: number) => void;
  onDpmmChange: (v: LabelaryDpmm) => void;
}

export function OptionsPanel({
  widthMm,
  heightMm,
  dpmm,
  onWidthChange,
  onHeightChange,
  onDpmmChange,
}: OptionsPanelProps) {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <label className="flex items-center gap-2 text-sm text-zinc-600">
        가로
        <input
          type="number"
          data-testid="width-input"
          value={widthMm}
          min={1}
          max={381}
          onChange={(e) => onWidthChange(Number(e.target.value))}
          className="w-20 rounded-md border border-zinc-200 px-2 py-1.5 text-sm text-zinc-800 focus:border-zinc-400 focus:outline-none"
        />
        mm
      </label>

      <label className="flex items-center gap-2 text-sm text-zinc-600">
        세로
        <input
          type="number"
          data-testid="height-input"
          value={heightMm}
          min={1}
          max={381}
          onChange={(e) => onHeightChange(Number(e.target.value))}
          className="w-20 rounded-md border border-zinc-200 px-2 py-1.5 text-sm text-zinc-800 focus:border-zinc-400 focus:outline-none"
        />
        mm
      </label>

      <label className="flex items-center gap-2 text-sm text-zinc-600">
        dpmm
        <select
          data-testid="dpmm-select"
          value={dpmm}
          onChange={(e) => onDpmmChange(Number(e.target.value) as LabelaryDpmm)}
          className="rounded-md border border-zinc-200 px-2 py-1.5 text-sm text-zinc-800 focus:border-zinc-400 focus:outline-none"
        >
          {DPMM_OPTIONS.map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

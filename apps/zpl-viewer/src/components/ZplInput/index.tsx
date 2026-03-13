interface ZplInputProps {
  zpl: string;
  onZplChange: (zpl: string) => void;
}

export function ZplInput({ zpl, onZplChange }: ZplInputProps) {
  return (
    <textarea
      data-testid="zpl-input"
      value={zpl}
      onChange={(e) => onZplChange(e.target.value)}
      placeholder="ZPL 코드를 입력하세요..."
      spellCheck={false}
      className="h-64 w-full resize-none rounded-md border border-zinc-200 bg-white p-3 font-mono text-xs text-zinc-800 placeholder:text-zinc-400 focus:border-zinc-400 focus:outline-none"
    />
  );
}

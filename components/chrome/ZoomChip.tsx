import clsx from "clsx";

export function ZoomChip({ scale, className }: { scale: number; className?: string }) {
  return (
    <span
      className={clsx(
        "rounded-lg border border-line bg-white px-3 py-1.5 font-mono text-xs text-ink-2",
        className
      )}
    >
      {Math.round(scale * 100)}%
    </span>
  );
}

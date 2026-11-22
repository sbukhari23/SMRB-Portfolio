import clsx from "clsx";

export function SizeChip({
  width,
  height,
  className,
}: {
  width: number;
  height: number;
  className?: string;
}) {
  return (
    <span
      className={clsx(
        "self-center rounded bg-emerald px-2 py-[3px] font-mono text-[11px] text-white",
        className
      )}
    >
      {width} × {height}
    </span>
  );
}

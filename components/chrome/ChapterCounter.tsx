import clsx from "clsx";
import { ChevronUp } from "lucide-react";

export function ChapterCounter({
  current,
  total,
  label,
  onClick,
  className,
}: {
  current: number;
  total: number;
  label: string;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "flex h-11 items-center gap-2 rounded-full bg-transparent px-3 font-mono text-[13px] text-ink-2 transition-opacity duration-150 hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald",
        className
      )}
    >
      {String(current).padStart(2, "0")} / {String(total).padStart(2, "0")} · {label}
      <ChevronUp aria-hidden="true" className="h-3.5 w-3.5" />
    </button>
  );
}

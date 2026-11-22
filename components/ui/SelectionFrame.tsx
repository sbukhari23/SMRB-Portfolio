import clsx from "clsx";
import type { CSSProperties, ReactNode } from "react";
import { SizeChip } from "./SizeChip";

type SelectionFrameProps = {
  /** e.g. "# Muneeb.tsx". Only shown while active, per ANIMATION_SPEC.md §2.4. */
  label?: string;
  size?: { width: number; height: number };
  /** Inactive frames get a thin grey border and no handles, label or size chip. */
  active?: boolean;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
};

export function SelectionFrame({
  label,
  size,
  active = true,
  children,
  className,
  style,
}: SelectionFrameProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <span
          aria-hidden={!active || undefined}
          className={clsx(
            "font-mono text-xs text-emerald transition-opacity duration-150",
            active ? "opacity-100" : "opacity-0"
          )}
        >
          {label}
        </span>
      )}
      <div
        className={clsx(
          "relative bg-white shadow-[0_24px_60px_rgba(40,30,10,0.08)] transition-colors duration-150",
          active ? "border-[1.5px] border-emerald" : "border border-line",
          className
        )}
        style={style}
      >
        {children}
        {active && (
          <>
            <Handle className="-left-[5px] -top-[5px]" />
            <Handle className="-right-[5px] -top-[5px]" />
            <Handle className="-bottom-[5px] -left-[5px]" />
            <Handle className="-bottom-[5px] -right-[5px]" />
          </>
        )}
      </div>
      {active && size && <SizeChip width={size.width} height={size.height} />}
    </div>
  );
}

function Handle({ className }: { className: string }) {
  return (
    <span
      aria-hidden="true"
      className={clsx(
        "absolute h-2 w-2 border-[1.5px] border-emerald bg-white transition-opacity duration-150",
        className
      )}
    />
  );
}

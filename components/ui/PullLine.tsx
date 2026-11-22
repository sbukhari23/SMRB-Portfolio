import clsx from "clsx";
import type { ReactNode } from "react";

export function PullLine({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={clsx("border-l-2 border-emerald pl-3.5 text-[15px] leading-normal text-ink-2", className)}>
      {children}
    </p>
  );
}

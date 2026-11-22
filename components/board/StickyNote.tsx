import clsx from "clsx";
import type { CSSProperties, ReactNode } from "react";

export type StickyColor = "yellow" | "mint" | "sky" | "rose";

const colorClasses: Record<StickyColor, string> = {
  yellow: "bg-sticky-yellow text-sticky-yellow-ink",
  mint: "bg-sticky-mint text-sticky-mint-ink",
  sky: "bg-sticky-sky text-sticky-sky-ink",
  rose: "bg-sticky-rose text-sticky-rose-ink",
};

export function StickyNote({
  children,
  color = "yellow",
  rotate = -3,
  /** Back-layer stickies are decorative and blurred; front ones are real notes. */
  blurred = false,
  className,
  style,
}: {
  children: ReactNode;
  color?: StickyColor;
  rotate?: number;
  blurred?: boolean;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      aria-hidden={blurred ? true : undefined}
      className={clsx(
        "min-h-[96px] w-[140px] p-3 text-base leading-[1.25] shadow-[0_12px_24px_rgba(60,45,10,0.12)]",
        colorClasses[color],
        blurred && "opacity-55 blur-[3px]"
      )}
      style={{ transform: `rotate(${rotate}deg)`, ...style }}
    >
      <span className={className}>{children}</span>
    </div>
  );
}

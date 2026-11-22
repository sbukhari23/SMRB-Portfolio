import clsx from "clsx";
import type { ChapterAction } from "@/content/chapters";
import { Button } from "@/components/ui/Button";

// Shared between ChapterText (desktop board) and ChapterStack (mobile /
// reduced motion), so the action-variant rendering rules stay in one place.
export function ChapterActions({
  chapterId,
  actions,
  onOpenVideo,
  onOpenMenu,
  onNavigateHash,
  className,
}: {
  chapterId: string;
  actions: ChapterAction[];
  onOpenVideo?: (chapterId: string) => void;
  onOpenMenu?: () => void;
  onNavigateHash?: (chapterId: string) => void;
  className?: string;
}) {
  if (actions.length === 0) return null;

  return (
    <div className={clsx("flex flex-wrap items-center gap-2.5", className)}>
      {actions.map((action) => {
        if (action.variant === "video") {
          return (
            <Button key={action.label} variant="outline" onClick={() => onOpenVideo?.(chapterId)}>
              {action.label}
            </Button>
          );
        }
        if (action.variant === "link") {
          const href = action.href ?? "";
          const isHash = href.startsWith("#");
          const external = href.startsWith("http");
          if (isHash) {
            const hashId = href.slice(1);
            return (
              <button
                key={action.label}
                type="button"
                onClick={() => onNavigateHash?.(hashId)}
                className="inline-flex h-11 items-center gap-1 rounded-sm text-[15px] font-medium text-emerald transition-colors duration-150 hover:text-emerald-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald"
              >
                {action.label} →
              </button>
            );
          }
          return (
            <a
              key={action.label}
              href={action.href}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              className="inline-flex h-11 items-center gap-1 rounded-sm text-[15px] font-medium text-emerald transition-colors duration-150 hover:text-emerald-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald"
            >
              {action.label} {external ? "↗" : "→"}
            </a>
          );
        }
        if (action.variant === "outline" && !action.href) {
          return (
            <Button key={action.label} variant="outline" onClick={onOpenMenu}>
              {action.label}
            </Button>
          );
        }
        return (
          <Button
            key={action.label}
            href={action.href}
            variant={action.variant}
            arrow={action.variant === "ink" ? "internal" : "none"}
          >
            {action.label}
          </Button>
        );
      })}
    </div>
  );
}

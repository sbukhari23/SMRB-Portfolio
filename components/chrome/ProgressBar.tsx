import clsx from "clsx";

// Width equals scroll progress with no easing, per ANIMATION_SPEC.md §3:
// this is a direct scroll-linked readout, not a camera animation, so it is
// exempt from the transform/opacity-only rule that governs the board.
export function ProgressBar({ progress, className }: { progress: number; className?: string }) {
  const pct = Math.min(100, Math.max(0, progress * 100));
  return (
    <div aria-hidden="true" className={clsx("h-0.5 w-full bg-transparent", className)}>
      <div className="h-full bg-emerald" style={{ width: `${pct}%` }} />
    </div>
  );
}

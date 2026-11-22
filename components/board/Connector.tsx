import { chapters } from "@/content/chapters";
import { BOARD_HEIGHT, BOARD_WIDTH } from "@/lib/motion";

// One continuous path through every chapter's camera focus point. Mostly
// legible only when the camera is zoomed out (chapter 10), matching
// REDESIGN_PLAN.md §2.3's "snake path" description of Chapter 10.
export function Connector() {
  const points = chapters.map((c) => `${c.camera.x},${c.camera.y}`).join(" L ");
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute left-0 top-0"
      width={BOARD_WIDTH}
      height={BOARD_HEIGHT}
      viewBox={`0 0 ${BOARD_WIDTH} ${BOARD_HEIGHT}`}
    >
      <path d={`M ${points}`} fill="none" stroke="#0F6B4F" strokeOpacity={0.35} strokeWidth={2} strokeDasharray="2 10" />
    </svg>
  );
}

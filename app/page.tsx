import { Board } from "@/components/board/Board";
import { ChapterStack } from "@/components/board/ChapterStack";

// Below 900px, or with prefers-reduced-motion, <ChapterStack/> shows and
// <Board/> hides, purely via CSS (both always render, so there is no
// hydration mismatch and no flash while JS decides). See
// lib/useIsDesktopMotion.ts for why Board's own JS setup is also gated.
export default function Home() {
  return (
    <main>
      <div className="hidden motion-safe:min-[900px]:block">
        <Board />
      </div>
      <div className="block motion-safe:min-[900px]:hidden">
        <ChapterStack />
      </div>
    </main>
  );
}

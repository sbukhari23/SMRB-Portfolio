"use client";

import { useEffect, useState } from "react";

// Starts false to match server-rendered markup (no hydration mismatch);
// corrected in an effect, which is imperceptible since CSS (not this hook)
// is what actually shows/hides <Board/> vs <ChapterStack/> with no flash.
// This hook only gates whether Board.tsx's GSAP/ScrollTrigger setup runs.
export function useIsDesktopMotion(): boolean {
  const [value, setValue] = useState(false);

  useEffect(() => {
    const widthMq = window.matchMedia("(min-width: 900px)");
    const motionMq = window.matchMedia("(prefers-reduced-motion: no-preference)");
    const update = () => setValue(widthMq.matches && motionMq.matches);
    update();
    widthMq.addEventListener("change", update);
    motionMq.addEventListener("change", update);
    return () => {
      widthMq.removeEventListener("change", update);
      motionMq.removeEventListener("change", update);
    };
  }, []);

  return value;
}

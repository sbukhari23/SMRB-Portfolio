"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import type { Chapter } from "@/content/chapters";
import { PullLine } from "@/components/ui/PullLine";
import { Stat } from "@/components/ui/Stat";
import { ChapterActions } from "./ChapterActions";
import { ContactLinks } from "./ContactLinks";

export function ChapterText({
  chapter,
  onOpenVideo,
  onOpenMenu,
  onNavigateHash,
}: {
  chapter: Chapter;
  onOpenVideo?: (chapterId: string) => void;
  onOpenMenu?: () => void;
  onNavigateHash?: (chapterId: string) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const targets = el.querySelectorAll("[data-animate]");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      gsap.set(targets, { opacity: 1, y: 0 });
      return;
    }
    // ANIMATION_SPEC.md §2.4: new text in at 350ms, 300ms, 60ms stagger.
    gsap.fromTo(
      targets,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.3, delay: 0.35, stagger: 0.06, ease: "power2.out", overwrite: true }
    );
  }, [chapter.id]);

  return (
    <div ref={ref} className="flex w-[610px] max-w-[calc(100vw-128px)] flex-col gap-5">
      <p data-animate className="flex items-baseline gap-2.5 text-sm text-muted">
        <span className="font-mono font-medium text-emerald">{String(chapter.n).padStart(2, "0")}</span>
        {chapter.eyebrow}
      </p>
      <h1 data-animate className="font-serif text-6xl leading-[0.94] tracking-[-0.02em] sm:text-[96px]">
        {chapter.title}
      </h1>
      {chapter.body && (
        <p data-animate className="max-w-[540px] text-lg leading-normal">
          {chapter.body}
        </p>
      )}
      {chapter.pullLine && (
        <div data-animate>
          <PullLine>{chapter.pullLine}</PullLine>
        </div>
      )}
      {chapter.stats && (
        <div data-animate className="mt-1.5 grid grid-cols-3 gap-6">
          {chapter.stats.map((stat) => (
            <Stat key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </div>
      )}
      <div data-animate>
        <ChapterActions
          chapterId={chapter.id}
          actions={chapter.actions}
          onOpenVideo={onOpenVideo}
          onOpenMenu={onOpenMenu}
          onNavigateHash={onNavigateHash}
          className="mt-1.5"
        />
      </div>
      {chapter.id === "lets-build" && (
        <div data-animate>
          <ContactLinks />
        </div>
      )}
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { chapters, footerLine, type Chapter } from "@/content/chapters";
import { projects } from "@/content/projects";
import { Frame } from "./Frame";
import { StickyNote } from "./StickyNote";
import { ChapterActions } from "./ChapterActions";
import { ContactLinks } from "./ContactLinks";
import { PullLine } from "@/components/ui/PullLine";
import { Stat } from "@/components/ui/Stat";
import { Header } from "@/components/chrome/Header";
import { ChapterMenu } from "@/components/chrome/ChapterMenu";
import { VideoDialog } from "@/components/ui/VideoDialog";

const CHAPTER_PROJECT: Record<string, string> = {
  "built-for-a-quarry": "asset-management-system",
  "habits-together": "peer-support-hub",
};

// Below 900px, or with prefers-reduced-motion, this renders instead of
// <Board/>: no camera, no parallax, just a vertical stack of sections
// reusing the same content and primitives (ANIMATION_SPEC.md §5).
export function ChapterStack() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [videoChapterId, setVideoChapterId] = useState<string | null>(null);
  const [activeId, setActiveId] = useState(chapters[0].id);
  const sectionsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) return;
        const topMost = visible.reduce((a, b) => (a.boundingClientRect.top < b.boundingClientRect.top ? a : b));
        const id = topMost.target.getAttribute("id");
        if (id) setActiveId(id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );
    sectionsRef.current.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const activeChapter = chapters.find((c) => c.id === activeId) ?? chapters[0];
  const videoProject = videoChapterId ? projects.find((p) => p.slug === CHAPTER_PROJECT[videoChapterId]) : null;

  return (
    <div className="flex min-h-screen flex-col">
      <div className="sticky top-0 z-30 bg-paper/95 backdrop-blur-sm">
        <Header onOpenChapterMenu={() => setMenuOpen(true)} onOpenWork={() => setMenuOpen(true)} />
      </div>

      <div className="flex flex-col gap-12 px-4 pb-28 pt-7">
        {chapters.map((chapter, idx) => (
          <ChapterSection
            key={chapter.id}
            chapter={chapter}
            // Chapter 1 is the page's <h1>; the desktop board's ChapterText
            // also renders its active chapter as an <h1>, but that panel is
            // the only one in the DOM at a time there, so it never produces
            // more than one. Here all 11 sections render at once, so only
            // the first gets <h1> - the rest are <h2> siblings. Without
            // this, a page viewed under prefers-reduced-motion or <900px
            // (where Board is hidden instead of unmounted) has no visible
            // <h1> at all, since Board's own <h1> is display:none.
            isFirst={idx === 0}
            ref={(el) => {
              if (el) sectionsRef.current[idx] = el;
            }}
            onOpenVideo={setVideoChapterId}
            onOpenMenu={() => setMenuOpen(true)}
          />
        ))}
        <p className="text-center font-mono text-xs text-muted">{footerLine}</p>
      </div>

      <a
        href="#chapter-menu"
        onClick={(e) => {
          e.preventDefault();
          setMenuOpen(true);
        }}
        className="fixed inset-x-4 bottom-4 z-20 flex h-12 items-center justify-between rounded-full bg-ink px-4 font-mono text-xs text-white transition-colors duration-150 hover:bg-ink/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald"
      >
        <span>
          {String(activeChapter.n).padStart(2, "0")} / {chapters.length} · {activeChapter.shortTitle}
        </span>
        <span aria-hidden="true">⌃</span>
      </a>

      <ChapterMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        currentId={activeChapter.id}
        onNavigate={(id) => {
          setMenuOpen(false);
          document.getElementById(id)?.scrollIntoView({ block: "start" });
        }}
      />

      {videoProject && (
        <VideoDialog
          open={Boolean(videoChapterId)}
          onClose={() => setVideoChapterId(null)}
          label={`# demo.mp4 · ${videoProject.name}`}
          title={`${videoProject.name}, walkthrough`}
          src={videoProject.actions.demo?.video ?? ""}
          caseStudyHref={`/work/${videoProject.slug}`}
          codeHref={videoProject.actions.code?.href}
        />
      )}
    </div>
  );
}

function ChapterSection({
  chapter,
  isFirst,
  ref,
  onOpenVideo,
  onOpenMenu,
}: {
  chapter: Chapter;
  isFirst: boolean;
  ref: (el: HTMLElement | null) => void;
  onOpenVideo: (chapterId: string) => void;
  onOpenMenu: () => void;
}) {
  const firstSticky = chapter.stickies.find((s) => s.layer === "front") ?? chapter.stickies[0];
  const Heading = isFirst ? "h1" : "h2";

  return (
    <section id={chapter.id} ref={ref} className="flex scroll-mt-20 flex-col gap-3">
      <p className="flex items-baseline gap-2 text-xs text-muted">
        <span className="font-mono text-emerald">{String(chapter.n).padStart(2, "0")}</span>
        {chapter.eyebrow}
      </p>
      <Heading className="font-serif text-[44px] leading-[0.95]">{chapter.title}</Heading>
      {chapter.body && <p className="text-[15px] leading-normal">{chapter.body}</p>}
      {chapter.pullLine && <PullLine>{chapter.pullLine}</PullLine>}
      {chapter.stats && (
        <div className="grid grid-cols-3 gap-3">
          {chapter.stats.map((stat) => (
            <Stat key={stat.label} value={stat.value} label={stat.label} className="gap-0.5" />
          ))}
        </div>
      )}
      {chapter.frame.rect && (
        <div className="relative w-full" style={{ maxWidth: chapter.frame.rect.w }}>
          <Frame chapterId={chapter.id} frame={chapter.frame} active />
          {firstSticky && (
            <StickyNote
              color="yellow"
              rotate={-3}
              blurred={false}
              // Inset from the right edge (not hanging past it like on the
              // desktop board): there's no extra canvas margin on mobile to
              // spill into without causing horizontal scroll.
              style={{ position: "absolute", right: 8, top: -20 }}
            >
              {firstSticky.text}
            </StickyNote>
          )}
        </div>
      )}
      <ChapterActions chapterId={chapter.id} actions={chapter.actions} onOpenVideo={onOpenVideo} onOpenMenu={onOpenMenu} />
      {chapter.id === "lets-build" && <ContactLinks />}
    </section>
  );
}

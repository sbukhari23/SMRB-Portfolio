"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { chapters, footerLine } from "@/content/chapters";
import { projects } from "@/content/projects";
import { BOARD_HEIGHT, BOARD_WIDTH } from "@/lib/motion";
import { Frame } from "./Frame";
import { Connector } from "./Connector";
import { StickyNote, type StickyColor } from "./StickyNote";
import { LiveCursor } from "./LiveCursor";
import { ChapterText } from "./ChapterText";
import { Header } from "@/components/chrome/Header";
import { ChapterCounter } from "@/components/chrome/ChapterCounter";
import { ChapterMenu } from "@/components/chrome/ChapterMenu";
import { VideoDialog } from "@/components/ui/VideoDialog";
import { useIsDesktopMotion } from "@/lib/useIsDesktopMotion";

gsap.registerPlugin(ScrollTrigger);

const DEFAULT_CX = 0.62;

const STICKY_OFFSETS: { dx: number; dy: number; rotate: number; color: StickyColor }[] = [
  { dx: -40, dy: -70, rotate: -4, color: "yellow" },
  { dx: 0, dy: -90, rotate: 5, color: "mint" },
  { dx: -60, dy: 0, rotate: -3, color: "sky" },
  { dx: 0, dy: 0, rotate: 6, color: "rose" },
];

// Chapters whose "Read the case study" action maps to a /work/[slug] page.
const CHAPTER_PROJECT: Record<string, string> = {
  "built-for-a-quarry": "asset-management-system",
  "habits-together": "peer-support-hub",
};

type Camera = { x: number; y: number; scale: number; cx: number };

export function Board() {
  const storyRef = useRef<HTMLDivElement>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const zoomRef = useRef<HTMLSpanElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const stRef = useRef<ScrollTrigger | null>(null);
  const activeIndexRef = useRef(0);
  const cameraRef = useRef<Camera>({
    x: chapters[0].camera.x,
    y: chapters[0].camera.y,
    scale: chapters[0].camera.scale,
    cx: chapters[0].camera.cx ?? DEFAULT_CX,
  });
  const applyCameraRef = useRef<() => void>(() => {});

  const [activeIndex, setActiveIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [videoChapterId, setVideoChapterId] = useState<string | null>(null);

  const activeChapter = chapters[activeIndex];
  const isDesktopMotion = useIsDesktopMotion();

  const goToChapter = useCallback((id: string) => {
    const idx = chapters.findIndex((c) => c.id === id);
    const st = stRef.current;
    if (idx < 0 || !st) return;
    const target = st.start + (idx / (chapters.length - 1)) * (st.end - st.start);
    // A large instant (or native-smooth) scroll reads as a huge velocity
    // spike to ScrollTrigger's snap, which then "flings" past the intended
    // chapter, and re-enabling the trigger doesn't reliably re-fire
    // onUpdate for the jump either. So: reposition the scrollbar for
    // future natural scrolling, but drive the camera and active chapter
    // ourselves rather than waiting on ScrollTrigger to notice.
    st.disable(false);
    window.scrollTo(0, target);
    st.enable();

    const chapter = chapters[idx];
    cameraRef.current.x = chapter.camera.x;
    cameraRef.current.y = chapter.camera.y;
    cameraRef.current.scale = chapter.camera.scale;
    cameraRef.current.cx = chapter.camera.cx ?? DEFAULT_CX;
    applyCameraRef.current();
    if (progressRef.current) {
      progressRef.current.style.width = `${(idx / (chapters.length - 1)) * 100}%`;
    }
    activeIndexRef.current = idx;
    setActiveIndex(idx);
  }, []);

  useEffect(() => {
    const board = boardRef.current;
    const story = storyRef.current;
    if (!board || !story || !isDesktopMotion) return;

    const camera = cameraRef.current;

    function applyCamera() {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const stageCx = vw * camera.cx;
      const stageCy = vh * 0.5;
      const tx = stageCx - camera.x * camera.scale;
      const ty = stageCy - camera.y * camera.scale;
      if (board) board.style.transform = `translate3d(${tx}px, ${ty}px, 0) scale(${camera.scale})`;
      if (zoomRef.current) zoomRef.current.textContent = `${Math.round(camera.scale * 100)}%`;
    }
    applyCameraRef.current = applyCamera;

    applyCamera();

    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: story,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.6,
        snap: {
          snapTo: 1 / (chapters.length - 1),
          duration: { min: 0.4, max: 0.9 },
          ease: "power3.out",
          delay: 0.05,
        },
        onUpdate: (self) => {
          const idx = Math.round(self.progress * (chapters.length - 1));
          if (idx !== activeIndexRef.current) {
            activeIndexRef.current = idx;
            setActiveIndex(idx);
          }
          if (progressRef.current) {
            progressRef.current.style.width = `${self.progress * 100}%`;
          }
        },
      },
    });

    chapters.slice(1).forEach((c) => {
      tl.to(camera, {
        x: c.camera.x,
        y: c.camera.y,
        scale: c.camera.scale,
        cx: c.camera.cx ?? DEFAULT_CX,
        duration: 1,
        onUpdate: applyCamera,
      });
    });

    stRef.current = tl.scrollTrigger ?? null;
    // GSAP batches new ScrollTriggers' start/end measurement onto its own
    // schedule rather than computing it synchronously on creation; force it
    // now so the deep-link jump below has real numbers to work with.
    ScrollTrigger.refresh();

    // Deep link: land on the right chapter before the visitor scrolls.
    const hashId = window.location.hash.replace("#", "");
    const hashIdx = chapters.findIndex((c) => c.id === hashId);
    if (hashIdx > 0 && stRef.current) {
      const st = stRef.current;
      const target = st.start + (hashIdx / (chapters.length - 1)) * (st.end - st.start);
      window.scrollTo(0, target);
    }

    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [isDesktopMotion]);

  // Keep the URL hash in sync with the active chapter (ANIMATION_SPEC.md §4).
  // Skips its first run: activeIndex starts at 0 before isDesktopMotion (and
  // therefore the GSAP setup effect below) turns on, and without this guard
  // that first run clobbers an incoming deep-link hash before it's read.
  const skippedFirstHashSync = useRef(false);
  useEffect(() => {
    if (!skippedFirstHashSync.current) {
      skippedFirstHashSync.current = true;
      return;
    }
    const id = chapters[activeIndex].id;
    if (window.location.hash !== `#${id}`) {
      window.history.replaceState(null, "", `#${id}`);
    }
  }, [activeIndex]);

  // Keyboard navigation (ANIMATION_SPEC.md §4).
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      if (target && /^(input|textarea)$/i.test(target.tagName)) return;
      if (document.querySelector("dialog[open]")) return;

      if (event.key === "ArrowDown" || event.key === "PageDown" || event.key === "j") {
        event.preventDefault();
        goToChapter(chapters[Math.min(activeIndexRef.current + 1, chapters.length - 1)].id);
      } else if (event.key === "ArrowUp" || event.key === "PageUp" || event.key === "k") {
        event.preventDefault();
        goToChapter(chapters[Math.max(activeIndexRef.current - 1, 0)].id);
      } else if (event.key === "Home") {
        event.preventDefault();
        goToChapter(chapters[0].id);
      } else if (event.key === "End") {
        event.preventDefault();
        goToChapter(chapters[chapters.length - 1].id);
      } else if (event.key === "m") {
        setMenuOpen(true);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToChapter]);

  const videoProject = videoChapterId
    ? projects.find((p) => p.slug === CHAPTER_PROJECT[videoChapterId])
    : null;

  return (
    <div className="relative">
      <div className="fixed left-0 right-0 top-0 z-30 bg-paper/95 backdrop-blur-sm">
        <Header onOpenChapterMenu={() => setMenuOpen(true)} onOpenWork={() => setMenuOpen(true)} />
        <div ref={progressRef} className="h-0.5 bg-emerald" style={{ width: "0%" }} />
      </div>

      <div ref={storyRef} style={{ height: `${chapters.length * 100}vh` }}>
        <div className="sticky top-0 h-screen overflow-hidden">
          <div
            ref={boardRef}
            className="absolute left-0 top-0 will-change-transform"
            style={{ width: BOARD_WIDTH, height: BOARD_HEIGHT, transformOrigin: "0 0" }}
          >
            <DotGrid />
            <Connector />
            {chapters.map((chapter, idx) => {
              if (!chapter.frame.rect) return null;
              const { w, h } = chapter.frame.rect;
              const left = chapter.camera.x - w / 2;
              const top = chapter.camera.y - h / 2;
              const isActive = idx === activeIndex;
              return (
                <div key={chapter.id} className="absolute" style={{ left, top, width: w }}>
                  <button
                    type="button"
                    onClick={() => goToChapter(chapter.id)}
                    className="block cursor-pointer border-0 bg-transparent p-0 text-left transition-opacity duration-150 hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald"
                  >
                    {/* No aria-label: the frame's own visible text (filename, code)
                        becomes the accessible name, so it's never out of sync with
                        what's on screen (WCAG 2.5.3, caught by @axe-core/playwright). */}
                    <span className="sr-only">Jump to {chapter.shortTitle}: </span>
                    <Frame chapterId={chapter.id} frame={chapter.frame} active={isActive} />
                  </button>
                  {isActive && <LiveCursor style={{ position: "absolute", left: w - 10, top: h - 10 }} />}
                  {chapter.stickies.map((sticky, i) => {
                    const offset = STICKY_OFFSETS[i % STICKY_OFFSETS.length];
                    return (
                      <StickyNote
                        key={sticky.text}
                        color={offset.color}
                        rotate={offset.rotate}
                        blurred={sticky.layer === "back"}
                        style={{
                          position: "absolute",
                          left: offset.dx < 0 ? offset.dx : w + offset.dx,
                          top: offset.dy < 0 ? offset.dy : h + offset.dy,
                        }}
                      >
                        {sticky.text}
                      </StickyNote>
                    );
                  })}
                </div>
              );
            })}
          </div>

          <div className="pointer-events-auto absolute left-16 top-[136px] z-10">
            <ChapterText
              chapter={activeChapter}
              onOpenVideo={setVideoChapterId}
              onOpenMenu={() => setMenuOpen(true)}
              onNavigateHash={goToChapter}
            />
          </div>

          <div className="pointer-events-none absolute inset-x-7 bottom-[22px] z-20 flex items-center justify-between">
            <ChapterCounter
              current={activeChapter.n}
              total={chapters.length}
              label={activeChapter.shortTitle}
              onClick={() => setMenuOpen(true)}
              className="pointer-events-auto"
            />
            {activeIndex === 0 && (
              <span className="hidden font-sans text-sm text-muted sm:inline">Scroll to follow the build ↓</span>
            )}
            {activeChapter.id === "lets-build" && (
              <span className="hidden font-sans text-sm text-muted sm:inline">{footerLine}</span>
            )}
            <span
              ref={zoomRef}
              className="pointer-events-auto rounded-lg border border-line bg-white px-3 py-1.5 font-mono text-xs text-ink-2"
            >
              {Math.round(activeChapter.camera.scale * 100)}%
            </span>
          </div>
        </div>
      </div>

      <ChapterMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        currentId={activeChapter.id}
        onNavigate={(id) => {
          setMenuOpen(false);
          goToChapter(id);
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

function DotGrid() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute left-0 top-0"
      style={{
        width: BOARD_WIDTH,
        height: BOARD_HEIGHT,
        backgroundImage: "radial-gradient(#D8D2C4 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    />
  );
}

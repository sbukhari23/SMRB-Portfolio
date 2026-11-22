"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { SelectionFrame } from "@/components/ui/SelectionFrame";
import { CodeCard } from "@/components/ui/CodeCard";
import { withBase } from "@/lib/withBase";
import type { Frame as FrameData, FrameCard as FrameCardData } from "@/content/chapters";

// Chapters whose "image" frame already has a real demo video (the only
// two projects with footage in public/videos/ so far). Everything else
// without real art renders a dev-only TODO placeholder. `poster` is an
// optional still frame shown at rest, before the hover-to-play kicks in
// (extracted from the same video via scripts/extract-poster-frame.js).
const CHAPTER_VIDEO: Record<string, { src: string; poster?: string }> = {
  "built-for-a-quarry": {
    src: "/videos/asset-management-system.mp4",
    poster: "/images/asset-management-system-poster.jpg",
  },
  "habits-together": { src: "/videos/peer-support-hub.mp4" },
};

export function Frame({
  chapterId,
  frame,
  active,
}: {
  chapterId: string;
  frame: FrameData;
  active: boolean;
}) {
  if (!frame.rect) return null;
  const { w, h } = frame.rect;
  const filename = frame.label.replace(/^#\s*/, "");

  let body: React.ReactNode;
  if (frame.type === "code") {
    body = <CodeCard filename={filename} lines={frame.code ?? []} className="h-full border-0 shadow-none" />;
  } else if (frame.type === "image" && CHAPTER_VIDEO[chapterId]) {
    body = <HoverVideo {...CHAPTER_VIDEO[chapterId]} />;
  } else if (frame.type === "image" && frame.images?.[0]) {
    body = <StaticImage src={frame.images[0]} alt={filename} />;
  } else if (frame.type === "grid") {
    body = frame.images ? <ImageGrid images={frame.images} /> : <GridPlaceholder todo={frame.todo} />;
  } else if (frame.type === "card" && frame.card) {
    body = <FrameCardView card={frame.card} />;
  } else {
    body = <Placeholder label={filename} todo={frame.todo} />;
  }

  return (
    <SelectionFrame label={frame.label} size={{ width: w, height: h }} active={active}>
      {/* width:100% + aspect-ratio (not a fixed px size) so this shrinks to
          fit a narrower parent (ChapterStack on mobile) instead of
          overflowing; desktop callers give this an explicitly w-px-wide
          parent so 100% still resolves to the original design size. */}
      <div style={{ width: "100%", aspectRatio: `${w} / ${h}` }} className="overflow-hidden">
        {body}
      </div>
    </SelectionFrame>
  );
}

function HoverVideo({ src, poster }: { src: string; poster?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="relative h-full w-full">
      {/* preload="none" leaves no frame to show before the first hover
          triggers a fetch, so without a `poster` a skeleton stands in until
          the video's first frame actually decodes (onLoadedData), per
          REDESIGN_PLAN.md Phase 7's "loading skeletons for video posters". */}
      {!loaded && !poster && <VideoSkeleton />}
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        src={withBase(src)}
        poster={poster ? withBase(poster) : undefined}
        muted
        loop
        playsInline
        preload="none"
        onLoadedData={() => setLoaded(true)}
        onMouseEnter={() => {
          // play() returns a promise that rejects with an AbortError if a
          // quick mouseleave calls pause() before it resolves (a fast
          // hover in/out) - a known, harmless browser race, not a bug to
          // surface as an unhandled rejection.
          videoRef.current?.play().catch(() => {});
        }}
        onMouseLeave={() => {
          const v = videoRef.current;
          if (!v) return;
          v.pause();
          v.currentTime = 0;
        }}
      />
    </div>
  );
}

export function VideoSkeleton({ className }: { className?: string }) {
  return (
    <div
      // pointer-events-none: this sits visually on top of the <video> it's
      // masking, so without it the skeleton (not the video) would catch the
      // hover that's supposed to start playback.
      className={
        className ??
        "pointer-events-none absolute inset-0 flex items-center justify-center bg-line-soft/60 motion-safe:animate-pulse"
      }
    >
      <span className="h-10 w-10 rounded-full border-[1.5px] border-muted/50" />
    </div>
  );
}

function Placeholder({ label, todo }: { label: string; todo?: string }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-surface p-4 text-center">
      <span className="font-mono text-xs text-muted">{label}</span>
      {todo && (
        <span className="rounded bg-placeholder-chip px-2 py-1 font-mono text-[11px] text-placeholder-chip-ink">
          {"// TODO(muneeb): "}
          {todo}
        </span>
      )}
    </div>
  );
}

function StaticImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative h-full w-full">
      <Image src={withBase(src)} alt={alt} fill sizes="700px" className="object-cover" />
    </div>
  );
}

function ImageGrid({ images }: { images: string[] }) {
  return (
    <div className="grid h-full w-full grid-cols-3 gap-1 bg-surface p-1">
      {images.map((src) => (
        <div key={src} className="relative overflow-hidden bg-line-soft">
          <Image src={withBase(src)} alt="" fill sizes="160px" className="object-cover" />
        </div>
      ))}
    </div>
  );
}

function GridPlaceholder({ todo }: { todo?: string }) {
  return (
    <div className="flex h-full w-full flex-col gap-1 bg-surface p-1">
      <div className="grid flex-1 grid-cols-3 gap-1">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="bg-line-soft" />
        ))}
      </div>
      {todo && (
        <span className="rounded bg-placeholder-chip px-2 py-1 text-center font-mono text-[10px] text-placeholder-chip-ink">
          {"// TODO(muneeb): "}
          {todo}
        </span>
      )}
    </div>
  );
}

function FrameCardView({ card }: { card: FrameCardData }) {
  return (
    <div className="flex h-full w-full flex-col justify-between gap-4 bg-white p-6">
      <div className="flex flex-col gap-1">
        <span className="text-lg font-semibold text-ink">{card.heading}</span>
        {card.subheading && <span className="text-sm text-ink-2">{card.subheading}</span>}
      </div>
      {card.tags && (
        <div className="flex flex-wrap gap-2">
          {card.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-[#EFEBE2] px-2.5 py-1 text-xs text-ink">
              {tag}
            </span>
          ))}
        </div>
      )}
      {card.status && (
        <span className="self-start rounded-full bg-emerald-tint px-3 py-1.5 text-[13px] font-semibold text-emerald-dark">
          ● {card.status}
        </span>
      )}
      {card.note && <span className="text-xs text-muted">{card.note}</span>}
    </div>
  );
}

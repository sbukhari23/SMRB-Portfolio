"use client";

import { useState } from "react";
import Link from "next/link";
import { StickyNote } from "@/components/board/StickyNote";
import { ChapterMenu } from "@/components/chrome/ChapterMenu";
import { withBase } from "@/lib/withBase";

// Page-404.html mockup, ported 1:1: same dashed poster-frame corners,
// sticky notes and copy. "See all chapters" reuses the real ChapterMenu
// rather than a second nav, since it's self-contained (chapters + onNavigate).
export default function NotFound() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[radial-gradient(#D8D2C4_1px,transparent_1px)] bg-[length:24px_24px] px-6 py-24 text-center">
      <div className="absolute left-6 top-8 hidden sm:block">
        <StickyNote color="rose" rotate={-6}>
          error (which?)
        </StickyNote>
      </div>
      <div className="absolute right-6 top-40 hidden sm:block">
        <StickyNote color="yellow" rotate={5}>
          try again?
        </StickyNote>
      </div>

      <div className="flex flex-col items-center gap-1.5">
        <span className="font-mono text-xs text-[#A0522D]"># missing-frame · 0 × 0</span>
        <div className="relative flex h-[220px] w-[min(600px,88vw)] items-center justify-center border-[1.5px] border-dashed border-[#A0522D] bg-white/40 sm:h-[300px]">
          <span className="font-serif text-[110px] leading-none sm:text-[160px]">404</span>
          <Corner className="-left-[5px] -top-[5px]" />
          <Corner className="-right-[5px] -top-[5px]" />
          <Corner className="-bottom-[5px] -left-[5px]" />
          <Corner className="-bottom-[5px] -right-[5px]" />
        </div>
      </div>

      <div className="mt-14 flex flex-col items-center gap-4">
        <h1 className="font-serif text-4xl leading-none sm:text-[56px]">This frame doesn&apos;t exist.</h1>
        <p className="max-w-[460px] text-lg text-ink-2">
          The link may be old, or the page moved when the site was rebuilt.
        </p>
        <div className="mt-2 flex flex-wrap justify-center gap-2.5">
          <Link
            href="/"
            className="flex h-11 items-center rounded-full bg-emerald px-[18px] text-[15px] font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald"
          >
            Back to the board
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="flex h-11 items-center rounded-full border border-line bg-white px-[18px] text-[15px] font-medium text-ink hover:border-emerald/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald"
          >
            See all chapters
          </button>
        </div>
      </div>

      <ChapterMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        onNavigate={(id) => {
          window.location.href = withBase(`/#${id}`);
        }}
      />
    </main>
  );
}

function Corner({ className }: { className: string }) {
  return (
    <div
      aria-hidden="true"
      className={`absolute h-2 w-2 border-[1.5px] border-[#A0522D] bg-white ${className}`}
    />
  );
}

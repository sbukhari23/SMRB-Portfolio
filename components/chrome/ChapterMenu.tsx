"use client";

import { useEffect, useRef } from "react";
import clsx from "clsx";
import Link from "next/link";
import { X } from "lucide-react";
import { chapters } from "@/content/chapters";
import { links } from "@/content/profile";

export function ChapterMenu({
  open,
  onClose,
  currentId,
  onNavigate,
}: {
  open: boolean;
  onClose: () => void;
  currentId?: string;
  /** Intercept navigation (e.g. to scroll the board) instead of following the hash link. */
  onNavigate?: (id: string) => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="chapter-menu-title"
      onClose={onClose}
      onCancel={onClose}
      className="m-auto h-full w-full max-w-none border-0 bg-surface p-0 shadow-[0_40px_100px_rgba(20,15,5,0.35)] backdrop:bg-ink/40 sm:h-auto sm:w-[min(820px,92vw)] sm:rounded-[14px] sm:border sm:border-line"
    >
      {/* Flex layout lives on this inner wrapper, not the <dialog> itself:
          a display utility directly on <dialog> overrides the browser's
          native `dialog:not([open]) { display: none }`, so it would stay
          visible even when closed. */}
      <div className="flex h-full w-full flex-col sm:h-auto">
        <div className="flex items-center justify-between border-b border-line-soft px-5 py-4 sm:px-7 sm:py-5">
          <div className="flex flex-col gap-0.5">
            <span className="hidden font-mono text-xs text-muted sm:inline">smrb / portfolio.tsx</span>
            <h2 id="chapter-menu-title" className="font-serif text-[28px] leading-none sm:text-4xl">
              All chapters
            </h2>
          </div>
          <button
            type="button"
            aria-label="Close chapter menu"
            onClick={onClose}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white transition-colors duration-150 hover:border-emerald/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald"
          >
            <X aria-hidden="true" className="h-[18px] w-[18px]" />
          </button>
        </div>
        <nav
          aria-label="Chapters"
          className="grid flex-1 grid-cols-1 gap-1 overflow-y-auto p-4 sm:flex-none sm:grid-cols-2"
        >
          {chapters.map((chapter) => {
            const isCurrent = chapter.id === currentId;
            return (
              <a
                key={chapter.id}
                href={`#${chapter.id}`}
                aria-current={isCurrent ? "true" : undefined}
                onClick={(event) => {
                  if (onNavigate) {
                    event.preventDefault();
                    onNavigate(chapter.id);
                  }
                }}
                className={clsx(
                  "flex gap-3.5 rounded-lg p-3 text-ink no-underline transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald",
                  isCurrent ? "bg-emerald-tint outline outline-[1.5px] outline-emerald" : "hover:bg-line-soft/60"
                )}
              >
                <span className={clsx("w-[22px] font-mono text-xs", isCurrent ? "text-emerald" : "text-muted")}>
                  {String(chapter.n).padStart(2, "0")}
                </span>
                <span className="flex flex-col gap-0.5">
                  <span className="font-serif text-2xl leading-none">{chapter.shortTitle}</span>
                  <span className={clsx("text-xs", isCurrent ? "text-[#24493A]" : "text-muted")}>
                    {isCurrent ? `You are here · ${chapter.menuLabel}` : chapter.menuLabel}
                  </span>
                </span>
              </a>
            );
          })}
        </nav>
        <div className="hidden items-center justify-between border-t border-line-soft px-7 py-3.5 font-mono text-xs text-muted sm:flex">
          <span>↑ ↓ move · Enter open · Esc close</span>
          <span className="flex gap-4">
            <Link
              href="/work/asset-management-system"
              prefetch={false}
              className="rounded-sm transition-colors duration-150 hover:text-emerald focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald"
            >
              Case studies
            </Link>
            <a
              href="#lets-build"
              className="rounded-sm transition-colors duration-150 hover:text-emerald focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald"
            >
              Contact
            </a>
          </span>
        </div>
        <div className="flex gap-2 border-t border-line-soft p-4 sm:hidden">
          <a
            href={`mailto:${links.email}`}
            className="flex h-12 flex-1 items-center justify-center rounded-full bg-emerald text-[15px] font-semibold text-white transition-colors duration-150 hover:bg-emerald-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald"
          >
            Email me
          </a>
          {links.resume && (
            <a
              href={links.resume}
              className="flex h-12 flex-1 items-center justify-center rounded-full border border-line bg-white text-[15px] font-medium text-ink transition-colors duration-150 hover:border-emerald/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald"
            >
              Resume
            </a>
          )}
        </div>
      </div>
    </dialog>
  );
}

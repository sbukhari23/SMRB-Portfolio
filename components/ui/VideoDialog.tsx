"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { withBase } from "@/lib/withBase";
import { VideoSkeleton } from "@/components/board/Frame";

export type VideoDialogProps = {
  open: boolean;
  onClose: () => void;
  /** e.g. "# demo.mp4 · Asset Management System" */
  label: string;
  title: string;
  /** public/ path to the video, e.g. "/videos/asset-management-system.mp4" */
  src: string;
  caseStudyHref?: string;
  codeHref?: string;
};

// Native <dialog>: showModal() gives us a focus trap, Esc-to-close and
// returning focus to the trigger for free, per REDESIGN_PLAN.md's
// accessibility rules and ANIMATION_SPEC.md §3.
export function VideoDialog({ open, onClose, label, title, src, caseStudyHref, codeHref }: VideoDialogProps) {
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
      aria-labelledby="video-dialog-title"
      onClose={onClose}
      onCancel={onClose}
      className="m-auto w-[min(1200px,92vw)] max-w-none border-0 bg-transparent p-0 backdrop:bg-[#121413]/90"
    >
      <div className="flex flex-col gap-4 bg-[#121413] p-6 text-[#F3F0E9] sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <span className="font-mono text-xs text-[#9FD3BC]">{label}</span>
            <h2 id="video-dialog-title" className="font-serif text-3xl leading-none sm:text-4xl">
              {title}
            </h2>
          </div>
          <button
            type="button"
            aria-label="Close video"
            onClick={onClose}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#3A403D] bg-[#1C1F1E] transition-colors duration-150 hover:border-[#9FD3BC] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9FD3BC]"
          >
            <X aria-hidden="true" className="h-[18px] w-[18px]" />
          </button>
        </div>
        <div className="relative aspect-video w-full border-[1.5px] border-emerald bg-[#1C1F1E]">
          {/* Keyed on src so each open gets a fresh mount, which resets
              DialogVideo's own "loaded" state without an effect. */}
          {open && <DialogVideo key={src} src={src} />}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 text-[13px] text-[#B9C2BC]">
          <span>Esc closes · focus returns to the Watch demo button</span>
          <span className="flex gap-4">
            {caseStudyHref && (
              <a
                href={caseStudyHref}
                className="rounded-sm text-[#9FD3BC] transition-colors duration-150 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9FD3BC]"
              >
                Read the case study
              </a>
            )}
            {codeHref && (
              <a
                href={codeHref}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-sm text-[#9FD3BC] transition-colors duration-150 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9FD3BC]"
              >
                View code
              </a>
            )}
          </span>
        </div>
      </div>
    </dialog>
  );
}

function DialogVideo({ src }: { src: string }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <>
      {!loaded && (
        <VideoSkeleton className="pointer-events-none absolute inset-0 flex items-center justify-center bg-[#1C1F1E] motion-safe:animate-pulse" />
      )}
      <video
        className="h-full w-full"
        src={withBase(src)}
        controls
        muted
        playsInline
        preload="none"
        onLoadedData={() => setLoaded(true)}
      />
    </>
  );
}

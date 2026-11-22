"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { links } from "@/content/profile";

// Chapter 11's contact block (Ch11-Contact.html): big email link, a
// copy-to-clipboard button with a "Copied" toast, then social links.
// Shared between ChapterText (desktop) and ChapterStack (mobile).
export function ContactLinks({ className }: { className?: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(links.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard API unavailable (e.g. insecure context); the email link itself still works.
    }
  }

  return (
    <div className={className}>
      <div className="flex flex-wrap items-center gap-3">
        <a
          href={`mailto:${links.email}`}
          className="rounded-sm font-serif text-3xl leading-tight text-ink decoration-emerald decoration-2 underline-offset-8 transition-colors duration-150 hover:text-emerald-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald sm:text-[44px]"
        >
          {links.email}
        </a>
        <button
          type="button"
          onClick={handleCopy}
          aria-label="Copy email address"
          className="flex h-11 items-center gap-2 rounded-full border border-[#CFC8B8] bg-white px-3.5 text-sm font-medium text-ink transition-colors duration-150 hover:border-emerald/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald"
        >
          {copied ? <Check aria-hidden="true" className="h-4 w-4" /> : <Copy aria-hidden="true" className="h-4 w-4" />}
          Copy
        </button>
        <span role="status" aria-live="polite" className="text-sm font-semibold text-emerald">
          {copied ? "Copied ✓" : ""}
        </span>
      </div>
      <div className="mt-6 flex flex-wrap gap-6 text-base font-medium">
        <a
          href={links.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-sm py-2.5 text-emerald transition-colors duration-150 hover:text-emerald-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald"
        >
          LinkedIn ↗
        </a>
        <a
          href={links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-sm py-2.5 text-emerald transition-colors duration-150 hover:text-emerald-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald"
        >
          GitHub ↗
        </a>
        <a
          href={links.upwork}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-sm py-2.5 text-emerald transition-colors duration-150 hover:text-emerald-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald"
        >
          Upwork ↗
        </a>
        {links.resume ? (
          <a
            href={links.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-sm py-2.5 text-emerald transition-colors duration-150 hover:text-emerald-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald"
          >
            Resume (PDF) ↗
          </a>
        ) : (
          <span className="self-center rounded bg-placeholder-chip px-2 py-1 font-mono text-xs text-placeholder-chip-ink">
            {"// TODO(muneeb): resume PDF"}
          </span>
        )}
      </div>
    </div>
  );
}

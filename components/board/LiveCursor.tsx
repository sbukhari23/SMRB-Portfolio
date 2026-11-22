import clsx from "clsx";
import Image from "next/image";
import type { CSSProperties } from "react";
import { withBase } from "@/lib/withBase";

// Always tagged "Muneeb" and never follows the visitor's real pointer,
// per ANIMATION_SPEC.md §2.6. The idle drift uses the live-cursor-drift
// keyframe defined in globals.css, gated by Tailwind's motion-safe: variant.
export function LiveCursor({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <div
      aria-hidden="true"
      className={clsx("pointer-events-none flex items-start gap-0.5 motion-safe:animate-live-cursor-drift", className)}
      style={style}
    >
      <svg width="22" height="22" viewBox="0 0 24 24" className="-mt-3.5">
        <path
          d="M4 2 L4 20 L9 15 L13 23 L16 21.5 L12 14 L19 14 Z"
          fill="#0F6B4F"
          stroke="#FFFFFF"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
      <span className="flex items-center gap-1.5 rounded-full bg-emerald py-1 pl-1 pr-2.5 text-[13px] font-semibold text-white">
        <Image
          src={withBase("/images/muneeb.jpeg")}
          alt=""
          width={20}
          height={20}
          className="h-5 w-5 rounded-full object-cover"
        />
        Muneeb
      </span>
    </div>
  );
}

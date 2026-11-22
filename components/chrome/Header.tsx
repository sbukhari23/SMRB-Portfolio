import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Mail, Menu } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { withBase } from "@/lib/withBase";

export function Header({
  filenameLabel = "portfolio.tsx",
  onOpenChapterMenu,
  onOpenWork,
  workHref,
}: {
  /** e.g. "asset-management-system" on a case-study page. */
  filenameLabel?: string;
  onOpenChapterMenu?: () => void;
  onOpenWork?: () => void;
  /** Case-study pages have no chapter menu to open, so Work is a plain link back to the board. */
  workHref?: string;
}) {
  return (
    <header className="flex h-[60px] items-center justify-between border-b border-line-soft px-4 sm:h-[68px] sm:px-7">
      <div className="flex items-center gap-2.5">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-sm text-ink no-underline transition-opacity duration-150 hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald sm:gap-2.5"
        >

          <Image
            src={withBase("/images/muneeb.jpeg")}
            alt="Muneeb"
            width={34}
            height={34}
            className="h-8 w-8 rounded-full border border-dot object-cover sm:h-[34px] sm:w-[34px]"
          />
          <span className="font-mono text-sm font-medium sm:text-[15px]">smrb</span>
          <span className="hidden font-mono text-sm text-muted sm:inline">/ {filenameLabel}</span>
        </Link>
        {onOpenChapterMenu && (
          <button
            type="button"
            aria-label="Open chapter menu"
            onClick={onOpenChapterMenu}
            className="hidden h-9 w-9 items-center justify-center rounded-full transition-colors duration-150 hover:bg-line-soft/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald sm:flex"
          >
            <ChevronDown aria-hidden="true" className="h-3.5 w-3.5 text-muted" />
          </button>
        )}
      </div>
      <nav aria-label="Primary" className="flex items-center gap-2 sm:gap-2.5">
        {workHref ? (
          <Link
            href={workHref}
            className="hidden h-11 items-center rounded-full border border-line bg-white px-[18px] text-[15px] font-medium text-ink transition-colors duration-150 hover:border-emerald/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald sm:flex"
          >
            Work
          </Link>
        ) : (
          <button
            type="button"
            onClick={onOpenWork}
            className="hidden h-11 items-center gap-2 rounded-full border border-line bg-white px-[18px] text-[15px] font-medium text-ink transition-colors duration-150 hover:border-emerald/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald sm:flex"
          >
            Work
            <ChevronDown aria-hidden="true" className="h-3.5 w-3.5" />
          </button>
        )}
        <Button href="#lets-build" variant="emerald">
          <Mail aria-hidden="true" className="h-4 w-4" />
          <span className="hidden sm:inline">Let&apos;s talk</span>
          <span className="sm:hidden">Talk</span>
        </Button>
        {onOpenChapterMenu && (
          <button
            type="button"
            aria-label="Open chapter menu"
            onClick={onOpenChapterMenu}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white transition-colors duration-150 hover:border-emerald/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald sm:hidden"
          >
            <Menu aria-hidden="true" className="h-[18px] w-[18px]" />
          </button>
        )}
      </nav>
    </header>
  );
}

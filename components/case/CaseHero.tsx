import Link from "next/link";
import { MetaStrip } from "./MetaStrip";

export function CaseHero({
  name,
  summary,
  meta,
  children,
}: {
  name: string;
  summary: string;
  meta: { label: string; value: string }[];
  /** Action buttons (Watch demo / View code), rendered by the client wrapper. */
  children?: React.ReactNode;
}) {
  return (
    <section id="overview" className="flex scroll-mt-20 flex-col gap-5 pb-10 pt-14 sm:gap-6 sm:pt-[72px]">
      <p className="font-mono text-[13px] text-muted">
        <Link href="/" className="text-muted hover:text-ink">
          Work
        </Link>{" "}
        / {name}
      </p>
      <h1 className="max-w-[900px] font-serif text-[52px] leading-[0.95] tracking-[-0.02em] sm:text-[88px]">
        {name}
      </h1>
      <p className="max-w-[720px] text-lg leading-normal text-[#2E2B26] sm:text-xl">{summary}</p>
      <MetaStrip items={meta} />
      {children}
    </section>
  );
}

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { SelectionFrame } from "@/components/ui/SelectionFrame";
import { CodeCard } from "@/components/ui/CodeCard";
import { PullLine } from "@/components/ui/PullLine";
import { Stat } from "@/components/ui/Stat";
import { SizeChip } from "@/components/ui/SizeChip";
import { VideoDialog } from "@/components/ui/VideoDialog";
import { StickyNote } from "@/components/board/StickyNote";
import { LiveCursor } from "@/components/board/LiveCursor";
import { Header } from "@/components/chrome/Header";
import { ChapterMenu } from "@/components/chrome/ChapterMenu";
import { ChapterCounter } from "@/components/chrome/ChapterCounter";
import { ZoomChip } from "@/components/chrome/ZoomChip";
import { ProgressBar } from "@/components/chrome/ProgressBar";

const COLORS: { name: string; cssVar: string; swatch: string }[] = [
  { name: "paper", cssVar: "--color-paper", swatch: "bg-paper border border-line" },
  { name: "surface", cssVar: "--color-surface", swatch: "bg-surface border border-line" },
  { name: "ink", cssVar: "--color-ink", swatch: "bg-ink" },
  { name: "ink-2", cssVar: "--color-ink-2", swatch: "bg-ink-2" },
  { name: "muted", cssVar: "--color-muted", swatch: "bg-muted" },
  { name: "line", cssVar: "--color-line", swatch: "bg-line" },
  { name: "emerald", cssVar: "--color-emerald", swatch: "bg-emerald" },
  { name: "emerald-tint", cssVar: "--color-emerald-tint", swatch: "bg-emerald-tint border border-line" },
];

const STICKY_COLORS = ["yellow", "mint", "sky", "rose"] as const;

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.08em] text-muted">{title}</h2>
      {children}
    </section>
  );
}

export default function StyleguidePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <main className="flex flex-col gap-14 bg-paper px-8 py-12 sm:px-14">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
        <h1 className="font-serif text-5xl leading-none sm:text-6xl">Build board · style guide</h1>
        <span className="font-mono text-[13px] text-muted">tokens for tailwind.config / globals.css</span>
      </div>

      <Section title="Color">
        <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-4 lg:grid-cols-8">
          {COLORS.map((c) => (
            <div key={c.name} className="flex flex-col gap-1.5">
              <span className={`h-[72px] rounded-lg ${c.swatch}`} />
              <span className="text-[13px] font-semibold">{c.name}</span>
              <span className="font-mono text-xs text-ink-2">{c.cssVar}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-3.5">
          <span className="w-[110px] text-[13px] text-ink-2">Sticky notes</span>
          {STICKY_COLORS.map((color) => (
            <StickyNote key={color} color={color} rotate={0} className="text-[11px] font-mono">
              {color}
            </StickyNote>
          ))}
        </div>
      </Section>

      <Section title="Type">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="flex items-baseline gap-4">
            <span className="font-serif text-[72px] leading-none">Aa</span>
            <span className="text-[13px] text-ink-2">
              Instrument Serif 400 · display 112 / 96 / 84 / 52 · tracking -0.02em · lh 0.95
            </span>
          </div>
          <div className="flex items-baseline gap-4">
            <span className="text-[32px] font-medium">Aa</span>
            <span className="text-[13px] text-ink-2">Inter 400/500/600 · body 20 / 18 / 16 / 13 · lh 1.5</span>
          </div>
          <div className="flex items-baseline gap-4">
            <span className="font-mono text-[28px]">Aa</span>
            <span className="text-[13px] text-ink-2">JetBrains Mono 400/500 · labels, code, counters 11 to 15</span>
          </div>
        </div>
      </Section>

      <Section title="Button (3 variants)">
        <div className="flex flex-wrap gap-2.5">
          <Button variant="emerald">Let&apos;s talk</Button>
          <Button variant="ink" arrow="internal">
            Read the case study
          </Button>
          <Button variant="outline">Watch demo</Button>
        </div>
      </Section>

      <Section title="SelectionFrame + SizeChip">
        <div className="flex flex-wrap items-start gap-9">
          <SelectionFrame label="# Frame.tsx" size={{ width: 220, height: 110 }}>
            <div className="h-[110px] w-[220px]" />
          </SelectionFrame>
          <div className="flex flex-col gap-1.5">
            <span className="font-mono text-xs text-transparent">spacer</span>
            <SelectionFrame active={false}>
              <div className="h-[110px] w-[220px]" />
            </SelectionFrame>
            <span className="self-center text-[11px] text-muted">inactive</span>
          </div>
          <SizeChip width={670} height={420} />
        </div>
      </Section>

      <Section title="LiveCursor">
        <div className="flex h-24 items-center">
          <LiveCursor />
        </div>
      </Section>

      <Section title="CodeCard">
        <CodeCard
          filename="Muneeb.tsx"
          lines={[
            "// 2023 to 2027 · BS Software Engineering",
            "// NUST SEECS, Islamabad",
            "",
            "export function Muneeb() {",
            "  return (",
            '    <Developer stack="MERN" designsFirst>',
            "      Start with people. Ship with code.",
            "    </Developer>",
            "  )",
            "}",
          ]}
          className="max-w-[600px]"
        />
      </Section>

      <Section title="PullLine + Stat">
        <div className="flex flex-wrap items-end gap-10">
          <PullLine className="w-[280px]">BS Software Engineering, NUST SEECS · Class of 2027</PullLine>
          <Stat value="104" label="survey responses that shaped Peer Support Hub" />
        </div>
      </Section>

      <Section title="ChapterCounter + ZoomChip + ProgressBar">
        <div className="flex flex-wrap items-center gap-3">
          <ChapterCounter current={4} total={11} label="Built for a quarry" />
          <ZoomChip scale={0.85} />
        </div>
        <ProgressBar progress={0.36} className="max-w-[300px]" />
      </Section>

      <Section title="Header">
        <div className="rounded-lg border border-line bg-white">
          <Header onOpenChapterMenu={() => setMenuOpen(true)} onOpenWork={() => {}} />
        </div>
      </Section>

      <Section title="ChapterMenu + VideoDialog">
        <div className="flex gap-2.5">
          <Button variant="outline" onClick={() => setMenuOpen(true)}>
            Open chapter menu
          </Button>
          <Button variant="outline" onClick={() => setVideoOpen(true)}>
            Open video dialog
          </Button>
        </div>
      </Section>

      <p className="flex flex-wrap gap-6 text-[13px] text-ink-2">
        <span>Grid: 24px dot grid on paper · radius 0 on frames, 8 to 10 on cards, pill on buttons</span>
        <span>Touch targets ≥ 44px · body contrast ≥ 4.5:1 on paper</span>
      </p>

      <ChapterMenu open={menuOpen} onClose={() => setMenuOpen(false)} currentId="built-for-a-quarry" />
      <VideoDialog
        open={videoOpen}
        onClose={() => setVideoOpen(false)}
        label="# demo.mp4 · Asset Management System"
        title="Asset Management System, walkthrough"
        src="/videos/asset-management-system.mp4"
        caseStudyHref="/work/asset-management-system"
        codeHref="https://github.com/faisaliqbalkhattak/asset-management-system"
      />
    </main>
  );
}

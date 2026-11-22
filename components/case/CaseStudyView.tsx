"use client";

import { useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { VideoDialog } from "@/components/ui/VideoDialog";
import { Header } from "@/components/chrome/Header";
import { CaseHero } from "./CaseHero";
import { SideIndex, type SideIndexSection } from "./SideIndex";
import { ArchitectureDiagram } from "./ArchitectureDiagram";
import { projects, type Project } from "@/content/projects";

const STICKY_TILT = [
  "bg-[#CFE0EE] text-[#1C3650] -rotate-1",
  "bg-[#F3E39A] text-[#3E3410] rotate-1",
  "bg-[#CFE6D4] text-[#1B3F2D] -rotate-[0.5deg]",
];

const SECTIONS: SideIndexSection[] = [
  { id: "overview", label: "Overview" },
  { id: "short", label: "The 30-second version" },
  { id: "constraints", label: "Constraints" },
  { id: "architecture", label: "Architecture" },
  { id: "features", label: "What it does" },
  { id: "reflections", label: "Reflections" },
  { id: "next", label: "Next project" },
];

export function CaseStudyView({ project }: { project: Project }) {
  const [videoOpen, setVideoOpen] = useState(false);
  const nextIndex = (projects.findIndex((p) => p.slug === project.slug) + 1) % projects.length;
  const next = projects[nextIndex];

  return (
    <>
      <Header filenameLabel={project.slug} workHref="/" />
      {/* min-w-0: <body> (layout.tsx) is flex flex-col, so without this
          <main>'s default min-width:auto lets wide descendants (the meta
          strip, nowrap buttons) push the whole page past the viewport. */}
      <main className="mx-auto flex w-full min-w-0 max-w-[1200px] flex-col gap-16 px-4 pb-28 sm:px-8">
        <CaseHero
          name={project.name}
          summary={project.summary}
          meta={[
            { label: "Role", value: project.meta.role },
            { label: "Timeline", value: project.meta.timeline },
            { label: "Stack", value: project.meta.stack.join(" · ") },
            { label: "Status", value: project.meta.status },
          ]}
        >
          <div className="flex flex-wrap gap-2.5">
            {project.actions.demo && (
              <Button variant="ink" onClick={() => setVideoOpen(true)}>
                <Play aria-hidden="true" className="h-3.5 w-3.5" fill="currentColor" />
                Watch demo
              </Button>
            )}
            {project.actions.code && (
              <Button href={project.actions.code.href} variant="outline">
                {project.actions.code.label}
              </Button>
            )}
          </div>
        </CaseHero>

        {/* No aria-label on this button: the visible "Watch the walkthrough"
            text below already names the action, so it stays the accessible
            name too (an aria-label here would go out of sync with it). */}
        {project.actions.demo && (
          <button
            type="button"
            onClick={() => setVideoOpen(true)}
            className="relative aspect-video w-full border-[1.5px] border-emerald bg-[#E9E4D8] transition-colors duration-150 hover:bg-[#E3DCCC] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald"
          >
            <span aria-hidden="true" className="absolute -top-6 left-0 font-mono text-xs text-emerald">
              # demo.mp4
            </span>
            <span className="flex h-full w-full flex-col items-center justify-center gap-2.5">
              <span className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-white shadow-[0_8px_24px_rgba(40,30,10,0.12)]">
                <Play aria-hidden="true" className="h-6 w-6 text-ink" fill="currentColor" />
              </span>
              <span className="font-mono text-[13px] text-ink-2">Watch the walkthrough</span>
            </span>
          </button>
        )}

        <div className="flex flex-col gap-10 lg:flex-row lg:gap-12">
          <SideIndex title={project.name} sections={SECTIONS} />

          <div className="flex min-w-0 flex-1 flex-col gap-16 lg:gap-[72px]">
            <section
              id="short"
              className="flex scroll-mt-20 flex-col gap-7 rounded-[10px] border border-line-soft bg-white p-6 sm:p-10"
            >
              <p className="font-mono text-xs text-emerald">02 · The 30-second version</p>
              <h2 className="font-serif text-4xl leading-none sm:text-[52px]">The 30-second version</h2>
              <div className="grid gap-8 sm:grid-cols-2">
                <div className="flex flex-col gap-2.5">
                  <span className="text-xs font-semibold uppercase tracking-[0.08em] text-muted">The challenge</span>
                  <p className="text-base leading-relaxed">{project.theThirtySecondVersion.challenge}</p>
                </div>
                <div className="flex flex-col gap-2.5">
                  <span className="text-xs font-semibold uppercase tracking-[0.08em] text-muted">My role</span>
                  <p className="text-base leading-relaxed">{project.theThirtySecondVersion.role}</p>
                </div>
              </div>
            </section>

            {project.constraints.length > 0 && (
              <section id="constraints" className="flex scroll-mt-20 flex-col gap-5">
                <p className="font-mono text-xs text-emerald">03 · Constraints</p>
                <h2 className="font-serif text-4xl leading-none sm:text-[52px]">What it had to handle</h2>
                <div className="grid gap-[18px] sm:grid-cols-3">
                  {project.constraints.map((c, i) => (
                    <div
                      key={c.label}
                      className={clsx("flex flex-col gap-2 rounded p-[18px]", STICKY_TILT[i % STICKY_TILT.length])}
                    >
                      <span className="text-[15px] leading-snug">{c.label}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {project.architecture.length > 0 && (
              <section id="architecture" className="flex scroll-mt-20 flex-col gap-5">
                <p className="font-mono text-xs text-emerald">04 · Architecture</p>
                <h2 className="font-serif text-4xl leading-none sm:text-[52px]">Layered, simple</h2>
                <ArchitectureDiagram layers={project.architecture} />
              </section>
            )}

            {project.features.length > 0 && (
              <section id="features" className="flex scroll-mt-20 flex-col gap-5">
                <p className="font-mono text-xs text-emerald">05 · What it does</p>
                <h2 className="font-serif text-4xl leading-none sm:text-[52px]">What it does</h2>
                <div className="grid gap-[18px] sm:grid-cols-2">
                  {project.features.map((f) => (
                    <div
                      key={f.title}
                      className="flex flex-col gap-2.5 rounded-[10px] border border-line-soft bg-white p-6"
                    >
                      <span className="font-serif text-4xl leading-none text-emerald">
                        {String(f.n).padStart(2, "0")}
                      </span>
                      <span className="text-lg font-semibold">{f.title}</span>
                      <span className="text-[15px] leading-relaxed text-ink-2">{f.detail}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section id="reflections" className="flex scroll-mt-20 flex-col gap-4">
              <p className="font-mono text-xs text-emerald">06 · Reflections</p>
              {project.reflections ? (
                <blockquote className="max-w-[760px] border-l-2 border-emerald pl-5 font-serif text-[28px] leading-tight sm:text-[34px]">
                  {project.reflections}
                </blockquote>
              ) : (
                <span className="self-start rounded bg-placeholder-chip px-2 py-1 font-mono text-xs text-placeholder-chip-ink">
                  {"// TODO(muneeb): a reflection on this project"}
                </span>
              )}
            </section>

            <section id="next" className="flex scroll-mt-20 flex-col gap-3.5">
              <p className="font-mono text-xs text-emerald">07 · Next in the file</p>
              <div className="flex flex-wrap items-center gap-8 rounded-[10px] border-[1.5px] border-emerald bg-white p-9">
                <div className="flex min-w-[260px] flex-1 flex-col gap-3.5">
                  <span className="self-start rounded-full bg-[#EFEBE2] px-2.5 py-1 text-xs text-ink-2">
                    {next.meta.status}
                  </span>
                  <span className="font-serif text-4xl leading-none">{next.name}</span>
                  <span className="text-base leading-relaxed text-ink-2">{next.summary}</span>
                  <Button href={`/work/${next.slug}`} variant="ink" arrow="internal">
                    Open the case study
                  </Button>
                </div>
              </div>
              <div className="flex gap-5 text-sm">
                <Link
                  href="/"
                  className="rounded-sm text-emerald transition-colors duration-150 hover:text-emerald-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald"
                >
                  Back to the board
                </Link>
                <Link
                  href="/#the-whole-picture"
                  className="rounded-sm text-emerald transition-colors duration-150 hover:text-emerald-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald"
                >
                  All case studies
                </Link>
              </div>
            </section>
          </div>
        </div>
      </main>

      {project.actions.demo && (
        <VideoDialog
          open={videoOpen}
          onClose={() => setVideoOpen(false)}
          label={`# demo.mp4 · ${project.name}`}
          title={`${project.name}, walkthrough`}
          src={project.actions.demo.video}
          codeHref={project.actions.code?.href}
        />
      )}
    </>
  );
}

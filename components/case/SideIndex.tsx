"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";

export type SideIndexSection = { id: string; label: string };

export function SideIndex({ title, sections }: { title: string; sections: SideIndexSection[] }) {
  const [activeId, setActiveId] = useState(sections[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) return;
        const topMost = visible.reduce((a, b) => (a.boundingClientRect.top < b.boundingClientRect.top ? a : b));
        const id = topMost.target.getAttribute("id");
        if (id) setActiveId(id);
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    );
    for (const section of sections) {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav
      aria-label="Case study sections"
      className="flex gap-1 overflow-x-auto pb-2 text-sm lg:sticky lg:top-24 lg:max-w-[240px] lg:flex-1 lg:flex-col lg:gap-0.5 lg:overflow-visible lg:pb-0"
    >
      <span className="mb-3 hidden font-serif text-2xl lg:block">{title}</span>
      {sections.map((section, i) => {
        const isActive = section.id === activeId;
        return (
          <a
            key={section.id}
            href={`#${section.id}`}
            aria-current={isActive ? "true" : undefined}
            className={clsx(
              "shrink-0 whitespace-nowrap rounded-sm py-1.5 pl-3 text-left no-underline transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald lg:whitespace-normal lg:border-l-2",
              isActive ? "border-emerald font-semibold text-ink" : "border-line text-ink-2 hover:border-emerald/50 hover:text-ink"
            )}
          >
            {String(i + 1).padStart(2, "0")} {section.label}
          </a>
        );
      })}
    </nav>
  );
}

import { ArrowRight } from "lucide-react";
import type { ArchitectureLayer } from "@/content/projects";

// A layer diagram built from HTML boxes, not an image (REDESIGN_PLAN.md §2.4).
export function ArchitectureDiagram({ layers }: { layers: ArchitectureLayer[] }) {
  return (
    <div className="flex flex-col gap-3.5 rounded-xl border border-dashed border-[#CFC8B8] p-7">
      <div className="flex flex-wrap items-center gap-3.5">
        {layers.map((layer, i) => (
          <div key={layer.name} className="contents">
            <div
              className={
                i === layers.length - 1
                  ? "flex min-w-[180px] flex-1 flex-col gap-1 rounded-lg border border-[#B9D6C6] bg-emerald-tint p-[18px] text-[#24493A]"
                  : "flex min-w-[180px] flex-1 flex-col gap-1 rounded-lg border border-line bg-white p-[18px]"
              }
            >
              <span className="font-semibold">{layer.name}</span>
              <span className="text-[13px] text-ink-2">{layer.detail}</span>
            </div>
            {i < layers.length - 1 && (
              <ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0 text-emerald" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

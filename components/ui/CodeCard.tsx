import clsx from "clsx";
import type { ReactNode } from "react";

// Simple token colouring, not a real syntax highlighter: a whole-line "//"
// comment gets the comment colour; JSX-looking tags, quoted strings and a
// short list of JS keywords get picked out of the rest of the line.
const KEYWORDS = ["export", "function", "return", "const"];
const TOKEN_PATTERN = new RegExp(
  `(</?[A-Za-z][\\w.]*/?>)|("[^"]*")|\\b(${KEYWORDS.join("|")})\\b`,
  "g"
);

function highlightLine(line: string, lineKey: number): ReactNode {
  if (/^\s*\/\//.test(line)) {
    return <span className="italic text-code-comment">{line}</span>;
  }

  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let tokenIndex = 0;
  TOKEN_PATTERN.lastIndex = 0;

  while ((match = TOKEN_PATTERN.exec(line))) {
    if (match.index > lastIndex) {
      nodes.push(line.slice(lastIndex, match.index));
    }
    const [text, tag, string] = match;
    const colorClass = tag ? "text-code-tag" : string ? "text-code-string" : "text-code-keyword";
    nodes.push(
      <span key={`${lineKey}-${tokenIndex++}`} className={colorClass}>
        {text}
      </span>
    );
    lastIndex = TOKEN_PATTERN.lastIndex;
  }
  if (lastIndex < line.length) {
    nodes.push(line.slice(lastIndex));
  }
  return nodes;
}

export function CodeCard({
  filename,
  lines,
  className,
}: {
  filename: string;
  lines: string[];
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "w-full border-[1.5px] border-emerald bg-surface shadow-[0_24px_60px_rgba(40,30,10,0.08)]",
        className
      )}
    >
      <div className="flex h-11 items-center border-b border-line-soft px-5 font-mono text-[13px] text-muted">
        {filename}
      </div>
      <div className="whitespace-pre px-5 py-4 font-mono text-[14px] leading-[27px]">
        {lines.length === 0 ? (
          <span className="text-muted">{"// TODO(muneeb)"}</span>
        ) : (
          lines.map((line, i) => (
            <div key={i} className="flex">
              <span className="inline-block w-8 shrink-0 select-none text-code-line-number">
                {i + 1}
              </span>
              <span>{line === "" ? " " : highlightLine(line, i)}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

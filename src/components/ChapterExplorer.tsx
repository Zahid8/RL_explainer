"use client";

import { useMemo, useState } from "react";
import { chapters, type Chapter } from "@/lib/paper";
import { Chip, Plain } from "./Section";

const filters = ["All", "Foundations", "Tabular", "Approximation", "Looking deeper"] as const;

type Filter = (typeof filters)[number];

export function ChapterExplorer() {
  const [filter, setFilter] = useState<Filter>("All");
  const [query, setQuery] = useState("");
  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return chapters.filter((chapter) => {
      const matchesFilter = filter === "All" || chapter.part === filter;
      const haystack = [chapter.title, chapter.claim, chapter.technical, chapter.easy, ...chapter.keyIdeas, ...chapter.sections].join(" ").toLowerCase();
      return matchesFilter && (!q || haystack.includes(q));
    });
  }, [filter, query]);

  return (
    <div className="grid gap-8">
      <div className="flex flex-col gap-4 rounded-xl border border-line bg-panel p-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {filters.map((item) => (
            <button key={item} onClick={() => setFilter(item)} className={`rounded-full border px-3 py-2 text-sm ${filter === item ? "border-cyan bg-cyan text-white" : "border-line bg-panel-2 text-muted hover:border-cyan"}`}>
              {item}
            </button>
          ))}
        </div>
        <label className="flex min-w-0 items-center gap-3 rounded-full border border-line bg-panel-2 px-4 py-2 lg:w-[360px]">
          <span className="mono text-[11px] uppercase tracking-[0.14em] text-dim">Search</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="TD, policy gradient, reward..." className="min-w-0 flex-1 bg-transparent text-sm text-ink outline-none" />
        </label>
      </div>
      <div className="grid gap-6">
        {visible.map((chapter) => <ChapterCard key={chapter.n} chapter={chapter} />)}
      </div>
    </div>
  );
}

function ChapterCard({ chapter }: { chapter: Chapter }) {
  const accent = chapter.part === "Tabular" ? "cyan" : chapter.part === "Approximation" ? "violet" : chapter.part === "Looking deeper" ? "lime" : "orange";
  return (
    <article id={`chapter-${chapter.n}`} className="scroll-mt-24 overflow-hidden rounded-xl border border-line bg-panel">
      <div className="grid gap-px bg-line lg:grid-cols-[0.9fr_1.1fr]">
        <div className="bg-panel p-6 lg:p-7">
          <div className="flex flex-wrap items-center gap-2">
            <Chip accent={accent}>{chapter.part}</Chip>
            <Chip accent="blue">pages {chapter.pages}</Chip>
          </div>
          <h3 className="display mt-5 text-[clamp(28px,3vw,40px)] font-medium text-ink">{chapter.n}. {chapter.title}</h3>
          <p className="mt-4 text-[16px] leading-relaxed text-muted">{chapter.claim}</p>
          <div className="mt-6 grid gap-4">
            <Plain title="Easy explanation"><p>{chapter.easy}</p></Plain>
            <div className="rounded-xl border border-line bg-panel-2 p-5">
              <p className="eyebrow mb-3">Technical layer</p>
              <p className="text-sm leading-relaxed text-muted">{chapter.technical}</p>
            </div>
          </div>
        </div>
        <div className="bg-panel p-6 lg:p-7">
          <TwoColumnList title="Section checklist" items={chapter.sections} />
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <TwoColumnList title="Key ideas" items={chapter.keyIdeas} compact />
            <TwoColumnList title="Algorithms" items={chapter.algorithms} compact />
            <TwoColumnList title="Equations / forms" items={chapter.equations} compact />
            <TwoColumnList title="Examples" items={chapter.examples} compact />
          </div>
          <div className="mt-6 rounded-xl border border-line bg-panel-2 p-5">
            <p className="eyebrow mb-3">Common confusions</p>
            <ul className="grid gap-2 text-sm leading-relaxed text-muted">
              {chapter.commonConfusions.map((item) => <li key={item} className="flex gap-2"><span className="text-orange">•</span><span>{item}</span></li>)}
            </ul>
          </div>
          <p className="mt-5 border-l-2 border-cyan pl-4 text-sm leading-relaxed text-muted"><span className="font-medium text-ink">Bridge forward:</span> {chapter.bridge}</p>
        </div>
      </div>
    </article>
  );
}

function TwoColumnList({ title, items, compact = false }: { title: string; items: string[]; compact?: boolean }) {
  return (
    <div>
      <p className="eyebrow mb-3">{title}</p>
      <ul className={`grid ${compact ? "gap-2" : "gap-2 sm:grid-cols-2"} text-sm leading-relaxed text-muted`}>
        {items.map((item) => <li key={item} className="rounded-lg border border-line bg-white px-3 py-2">{item}</li>)}
      </ul>
    </div>
  );
}

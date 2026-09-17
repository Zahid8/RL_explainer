"use client";

import { useMemo, useState } from "react";
import { evidenceGuideItems, evidenceTotals, type EvidenceGuideItem, type EvidenceKind } from "@/lib/evidenceGuide";
import { Chip } from "./Section";

const kindFilters = ["all", "figure", "example", "table"] as const;
type KindFilter = (typeof kindFilters)[number];

const kindLabel: Record<KindFilter, string> = {
  all: "All",
  figure: "Figures",
  example: "Examples",
  table: "Tables",
};

const partLabel = (n: number) => n === 1 ? "Foundations" : n <= 8 ? "Tabular" : n <= 13 ? "Approximation" : "Looking deeper";

export function EvidenceGuide() {
  const [kind, setKind] = useState<KindFilter>("all");
  const [query, setQuery] = useState("");

  const groups = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = evidenceGuideItems.filter((item) => {
      const kindMatch = kind === "all" || item.kind === kind;
      const haystack = [item.kind, item.chapter, item.ref, item.title, item.easy, item.technical, ...item.tags].join(" ").toLowerCase();
      return kindMatch && (!q || haystack.includes(q));
    });
    const byChapter = new Map<number, EvidenceGuideItem[]>();
    for (const item of filtered) {
      const current = byChapter.get(item.chapter) ?? [];
      current.push(item);
      byChapter.set(item.chapter, current);
    }
    return Array.from(byChapter.entries()).sort(([a], [b]) => a - b);
  }, [kind, query]);

  return (
    <div className="grid gap-7">
      <div className="grid gap-4 rounded-xl border border-line bg-panel p-5 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <p className="eyebrow">Figure and example companion</p>
          <h3 className="display mt-2 text-3xl font-medium text-ink">147 book anchors: figures, the TD-Gammon table, and worked examples.</h3>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">
            This layer tells you what each visual or named example is doing in the argument. It does not reproduce the book&apos;s figures; it gives a study guide for what to look for and why each anchor matters technically.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Chip accent="cyan">{evidenceTotals.figures} figures</Chip>
            <Chip accent="blue">{evidenceTotals.examples} examples</Chip>
            <Chip accent="orange">{evidenceTotals.tables} table</Chip>
            <Chip accent="lime">{evidenceTotals.chapters} chapters</Chip>
          </div>
        </div>
        <label className="flex min-w-0 items-center gap-3 rounded-full border border-line bg-panel-2 px-4 py-2 lg:w-[360px]">
          <span className="mono text-[11px] uppercase tracking-[0.14em] text-dim">Search</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Figure 12.14, blackjack, Baird..." className="min-w-0 flex-1 bg-transparent text-sm text-ink outline-none" />
        </label>
      </div>

      <div className="flex flex-wrap gap-2">
        {kindFilters.map((item) => (
          <button key={item} onClick={() => setKind(item)} className={`rounded-full border px-3 py-2 text-sm ${kind === item ? "border-cyan bg-cyan text-white" : "border-line bg-panel text-muted hover:border-cyan"}`}>
            {kindLabel[item]}
          </button>
        ))}
      </div>

      <div className="grid gap-5">
        {groups.map(([chapter, items]) => <EvidenceChapter key={chapter} chapter={chapter} items={items} />)}
      </div>
    </div>
  );
}

function EvidenceChapter({ chapter, items }: { chapter: number; items: EvidenceGuideItem[] }) {
  const part = partLabel(chapter);
  const accent = part === "Tabular" ? "cyan" : part === "Approximation" ? "violet" : part === "Looking deeper" ? "lime" : "orange";
  return (
    <details className="rounded-xl border border-line bg-panel p-5" open={chapter <= 2}>
      <summary className="cursor-pointer list-none">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex flex-wrap gap-2">
              <Chip accent={accent}>{part}</Chip>
              <Chip accent="blue">chapter {chapter}</Chip>
              <Chip accent="lime">{items.length} anchors</Chip>
            </div>
            <h4 className="display mt-3 text-2xl font-medium text-ink">Chapter {chapter} visual/example anchors</h4>
          </div>
          <span className="mono rounded-full border border-line bg-panel-2 px-3 py-1 text-[11px] uppercase tracking-[0.12em] text-dim">open guide</span>
        </div>
      </summary>
      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        {items.map((item) => <EvidenceCard key={`${item.kind}-${item.ref}-${item.title}`} item={item} />)}
      </div>
    </details>
  );
}

function EvidenceCard({ item }: { item: EvidenceGuideItem }) {
  const accent: Record<EvidenceKind, "cyan" | "orange" | "blue"> = {
    figure: "cyan",
    example: "blue",
    table: "orange",
  };
  return (
    <article className="rounded-lg border border-line bg-white p-4">
      <div className="flex flex-wrap gap-2">
        <Chip accent={accent[item.kind]}>{item.kind}</Chip>
        <Chip accent="lime">{item.ref}</Chip>
      </div>
      <h5 className="display mt-3 text-2xl font-medium text-ink">{item.title}</h5>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <div className="rounded-md border border-line bg-panel p-3">
          <p className="mono mb-2 text-[10px] uppercase tracking-[0.14em] text-lime">Easy read</p>
          <p className="text-sm leading-relaxed text-muted">{item.easy}</p>
        </div>
        <div className="rounded-md border border-line bg-panel-2 p-3">
          <p className="mono mb-2 text-[10px] uppercase tracking-[0.14em] text-dim">Technical role</p>
          <p className="text-sm leading-relaxed text-muted">{item.technical}</p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {item.tags.map((tag) => <span key={tag} className="mono rounded-full border border-line bg-panel-2 px-2 py-1 text-[10px] text-dim">{tag}</span>)}
      </div>
    </article>
  );
}

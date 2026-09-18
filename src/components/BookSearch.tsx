"use client";

import { useMemo, useState } from "react";
import type { BookIndexEntry, BookIndexLayer } from "@/lib/bookIndex";

type Accent = "cyan" | "orange" | "blue" | "violet" | "lime";

export function BookSearch({ entries, contextTitle = "Whole-book search", compact = false, defaultChapter, defaultQuery = "", defaultLayer = "all" }: { entries: BookIndexEntry[]; contextTitle?: string; compact?: boolean; defaultChapter?: number; defaultQuery?: string; defaultLayer?: BookIndexLayer | "all" }) {
  const [query, setQuery] = useState(defaultQuery);
  const [layer, setLayer] = useState<BookIndexLayer | "all">(entries.some((entry) => entry.layer === defaultLayer) ? defaultLayer : "all");
  const [chapter, setChapter] = useState<number | "all">(defaultChapter ?? "all");

  const layers = useMemo(() => Array.from(new Set(entries.map((entry) => entry.layer))).sort(), [entries]);
  const chapters = useMemo(() => Array.from(new Set(entries.map((entry) => entry.chapter))).sort((a, b) => a - b), [entries]);
  const visible = useMemo(() => rankedEntries(entries, query, layer, chapter).slice(0, compact ? 18 : 42), [entries, query, layer, chapter, compact]);
  const matchingTotal = useMemo(() => rankedEntries(entries, query, layer, chapter).length, [entries, query, layer, chapter]);
  const activeChapterTitle = chapter === "all" ? "all chapters" : entries.find((entry) => entry.chapter === chapter)?.chapterTitle ?? `Chapter ${chapter}`;

  return (
    <section className="book-search rounded-2xl border border-line bg-panel p-5 lg:p-6" data-query={query} data-layer={layer} data-chapter={chapter} data-count={matchingTotal}>
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div>
          <div className="flex flex-wrap gap-2">
            <SearchChip accent="cyan">{entries.length} indexed explanations</SearchChip>
            <SearchChip accent="lime">{layers.length} layers</SearchChip>
            <SearchChip accent="blue">{chapters.length} chapters</SearchChip>
            <SearchChip accent="violet">{matchingTotal} matches</SearchChip>
          </div>
          <h3 className="display mt-4 text-3xl font-medium text-ink">{contextTitle}</h3>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">
            Search the standalone web book in plain words or technical language. Try terms like <span className="font-medium text-ink">Bellman</span>, <span className="font-medium text-ink">policy gradient</span>, <span className="font-medium text-ink">eligibility trace</span>, <span className="font-medium text-ink">reward</span>, or <span className="font-medium text-ink">deadly triad</span>.
          </p>
        </div>
        <a href="/search" className="mono self-start rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan hover:text-ink">Open full search</a>
      </div>

      <div className="mt-5 grid gap-3 lg:grid-cols-[minmax(0,1fr)_220px_180px]">
        <label className="grid gap-2">
          <span className="mono text-[10px] uppercase tracking-[0.16em] text-dim">Search every explanation</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search concepts, equations, algorithms, traps, examples..."
            className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-cyan focus:ring-4 focus:ring-cyan/10"
          />
        </label>
        <label className="grid gap-2">
          <span className="mono text-[10px] uppercase tracking-[0.16em] text-dim">Layer</span>
          <select value={layer} onChange={(event) => setLayer(event.target.value as BookIndexLayer | "all")} className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-cyan focus:ring-4 focus:ring-cyan/10">
            <option value="all">All layers</option>
            {layers.map((item) => <option key={item} value={item}>{titleCase(item)}</option>)}
          </select>
        </label>
        <label className="grid gap-2">
          <span className="mono text-[10px] uppercase tracking-[0.16em] text-dim">Chapter</span>
          <select value={chapter} onChange={(event) => setChapter(event.target.value === "all" ? "all" : Number(event.target.value))} className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-cyan focus:ring-4 focus:ring-cyan/10">
            <option value="all">All chapters</option>
            {chapters.map((item) => <option key={item} value={item}>Chapter {item}</option>)}
          </select>
        </label>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-line bg-white p-3 text-sm leading-relaxed text-muted">
        <p>Showing <span className="font-medium text-ink">{visible.length}</span> of <span className="font-medium text-ink">{matchingTotal}</span> matches in <span className="font-medium text-ink">{activeChapterTitle}</span>.</p>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => { setQuery("Bellman"); setLayer("all"); }} className="rounded-full border border-line px-3 py-1 text-xs hover:border-cyan hover:text-cyan">Bellman</button>
          <button type="button" onClick={() => { setQuery("policy"); setLayer("all"); }} className="rounded-full border border-line px-3 py-1 text-xs hover:border-cyan hover:text-cyan">policy</button>
          <button type="button" onClick={() => { setQuery("trace"); setLayer("all"); }} className="rounded-full border border-line px-3 py-1 text-xs hover:border-cyan hover:text-cyan">trace</button>
          <button type="button" onClick={() => { setQuery(""); setLayer("all"); setChapter(defaultChapter ?? "all"); }} className="rounded-full border border-line px-3 py-1 text-xs hover:border-orange hover:text-orange">Reset</button>
        </div>
      </div>

      <div className={`mt-5 grid gap-3 ${compact ? "lg:grid-cols-2" : "lg:grid-cols-3"}`}>
        {visible.map((entry) => <SearchResultCard key={entry.id} entry={entry} query={query} />)}
      </div>

      {visible.length === 0 ? (
        <div className="mt-5 rounded-xl border border-orange/30 bg-orange/[0.06] p-5 text-sm leading-relaxed text-muted">
          No entries match this exact filter. Clear one filter or search for a broader object such as “reward”, “value”, “model”, “policy”, “target”, “gradient”, or “trace”.
        </div>
      ) : null}
    </section>
  );
}

function SearchResultCard({ entry, query }: { entry: BookIndexEntry; query: string }) {
  return (
    <article className="rounded-xl border border-line bg-white p-4 transition hover:-translate-y-0.5 hover:border-cyan hover:shadow-card">
      <div className="flex flex-wrap gap-2">
        <SearchChip accent="cyan">Ch {entry.chapter}</SearchChip>
        <SearchChip accent={accentForLayer(entry.layer)}>{titleCase(entry.layer)}</SearchChip>
      </div>
      <a href={entry.route} className="display mt-3 block text-2xl font-medium leading-tight text-ink hover:text-cyan">{entry.title}</a>
      <p className="mono mt-2 text-[10px] uppercase tracking-[0.14em] text-dim">{entry.chapterTitle}</p>
      <p className="mt-3 text-sm leading-relaxed text-muted">{clip(entry.summary, query)}</p>
      <p className="mt-3 rounded-lg border border-line bg-panel-2 p-3 text-xs leading-relaxed text-muted"><span className="font-medium text-ink">Technical handle:</span> {clip(entry.technical, query)}</p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {entry.tags.slice(0, 6).map((tag) => <span key={`${entry.id}-${tag}`} className="rounded-full border border-line px-2 py-1 text-[10px] text-dim">{tag}</span>)}
      </div>
    </article>
  );
}

function rankedEntries(entries: BookIndexEntry[], query: string, layer: BookIndexLayer | "all", chapter: number | "all") {
  const terms = query.toLowerCase().split(/\s+/).map((term) => term.trim()).filter(Boolean);

  return entries
    .filter((entry) => layer === "all" || entry.layer === layer)
    .filter((entry) => chapter === "all" || entry.chapter === chapter)
    .map((entry) => ({ entry, score: scoreEntry(entry, terms) }))
    .filter(({ score }) => terms.length === 0 || score > 0)
    .sort((a, b) => b.score - a.score || b.entry.weight - a.entry.weight || a.entry.chapter - b.entry.chapter || a.entry.title.localeCompare(b.entry.title))
    .map(({ entry }) => entry);
}

function scoreEntry(entry: BookIndexEntry, terms: string[]) {
  if (terms.length === 0) return entry.weight;
  const title = entry.title.toLowerCase();
  const layer = entry.layer.toLowerCase();
  const chapter = `${entry.chapter} ${entry.chapterTitle}`.toLowerCase();
  const tags = entry.tags.join(" ").toLowerCase();
  const summary = entry.summary.toLowerCase();
  const technical = entry.technical.toLowerCase();
  let score = 0;

  for (const term of terms) {
    if (title.includes(term)) score += 70;
    if (layer.includes(term)) score += 45;
    if (chapter.includes(term)) score += 35;
    if (tags.includes(term)) score += 30;
    if (summary.includes(term)) score += 18;
    if (technical.includes(term)) score += 12;
  }

  const allTermsPresent = terms.every((term) => `${title} ${layer} ${chapter} ${tags} ${summary} ${technical}`.includes(term));
  return allTermsPresent ? score + entry.weight : score;
}

function clip(text: string, query: string) {
  const clean = text.replace(/\s+/g, " ").trim();
  if (!clean) return "Open this item to inspect the complete explanation.";
  const firstTerm = query.toLowerCase().split(/\s+/).find(Boolean);
  if (!firstTerm) return clean.length > 320 ? `${clean.slice(0, 317)}...` : clean;
  const index = clean.toLowerCase().indexOf(firstTerm);
  if (index <= 90) return clean.length > 320 ? `${clean.slice(0, 317)}...` : clean;
  const start = Math.max(0, index - 90);
  const end = Math.min(clean.length, index + 230);
  return `${start > 0 ? "..." : ""}${clean.slice(start, end)}${end < clean.length ? "..." : ""}`;
}

function SearchChip({ children, accent = "cyan" }: { children: React.ReactNode; accent?: Accent }) {
  const color = {
    cyan: "border-cyan/30 bg-cyan/[0.08] text-cyan",
    orange: "border-orange/30 bg-orange/[0.08] text-orange",
    blue: "border-blue/30 bg-blue/[0.08] text-blue",
    violet: "border-violet/30 bg-violet/[0.08] text-violet",
    lime: "border-lime/30 bg-lime/[0.08] text-lime",
  }[accent];
  return <span className={`mono inline-flex rounded-full border px-2.5 py-1 text-[11px] ${color}`}>{children}</span>;
}

function accentForLayer(layer: BookIndexLayer): Accent {
  if (/algorithm|formula|technical|mastery/i.test(layer)) return "violet";
  if (/misconception|exercise|source/i.test(layer)) return "orange";
  if (/primer|practice|synthesis/i.test(layer)) return "lime";
  if (/chapter|section|dependency/i.test(layer)) return "blue";
  return "cyan";
}

function titleCase(value: string) {
  return value.replace(/\b\w/g, (letter) => letter.toUpperCase());
}

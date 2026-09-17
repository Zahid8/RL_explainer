"use client";

import { useMemo, useState } from "react";
import { chapterMastery, masteryDetailCount, masteryTotals, type ChapterMastery, type MasteryStepCard } from "@/lib/mastery";
import { Chip } from "./Section";

const partLabel = (n: number) => n === 1 ? "Foundations" : n <= 8 ? "Tabular" : n <= 13 ? "Approximation" : "Looking deeper";

export function MasteryNotebook() {
  const [query, setQuery] = useState("");
  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return chapterMastery;
    return chapterMastery.filter((chapter) => {
      const haystack = [
        chapter.title,
        chapter.thesis,
        ...chapter.derivations.flatMap((item) => [item.label, item.source, item.easy, item.technical, ...item.steps]),
        ...chapter.process.flatMap((item) => [item.label, item.source, item.easy, item.technical, ...item.steps]),
        ...chapter.traps.flatMap((item) => [item.mistake, item.fix, item.why]),
        ...chapter.checks.flatMap((item) => [item.prompt, item.answer]),
      ].join(" ").toLowerCase();
      return haystack.includes(q);
    });
  }, [query]);

  return (
    <div className="grid gap-7">
      <div className="grid gap-4 rounded-xl border border-line bg-panel p-5 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <p className="eyebrow">Ultra-detail layer</p>
          <h3 className="display mt-2 text-3xl font-medium text-ink">A second notebook for derivations, algorithms, traps, and self-checks.</h3>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">
            This expands the chapter cards with {masteryDetailCount} additional detail tiles: {masteryTotals.derivations} derivation clinics, {masteryTotals.processWalkthroughs} process walkthroughs, {masteryTotals.traps} diagnostic traps, and {masteryTotals.checks} practice checks.
          </p>
        </div>
        <label className="flex min-w-0 items-center gap-3 rounded-full border border-line bg-panel-2 px-4 py-2 lg:w-[360px]">
          <span className="mono text-[11px] uppercase tracking-[0.14em] text-dim">Search</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="deadly triad, lambda, dopamine..." className="min-w-0 flex-1 bg-transparent text-sm text-ink outline-none" />
        </label>
      </div>

      <div className="grid gap-5">
        {visible.map((chapter) => <MasteryChapter key={chapter.n} chapter={chapter} />)}
      </div>
    </div>
  );
}

function MasteryChapter({ chapter }: { chapter: ChapterMastery }) {
  const part = partLabel(chapter.n);
  const accent = part === "Tabular" ? "cyan" : part === "Approximation" ? "violet" : part === "Looking deeper" ? "lime" : "orange";

  return (
    <details className="rounded-xl border border-line bg-panel p-5" open={chapter.n === 1}>
      <summary className="cursor-pointer list-none">
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="flex flex-wrap gap-2">
              <Chip accent={accent}>{part}</Chip>
              <Chip accent="blue">chapter {chapter.n}</Chip>
              <Chip accent="lime">10 mastery tiles</Chip>
            </div>
            <h4 className="display mt-4 text-[clamp(24px,3vw,34px)] font-medium text-ink">{chapter.n}. {chapter.title}</h4>
            <p className="mt-3 max-w-4xl text-sm leading-relaxed text-muted">{chapter.thesis}</p>
          </div>
          <span className="mono rounded-full border border-line bg-panel-2 px-3 py-1 text-[11px] uppercase tracking-[0.12em] text-dim">open notebook</span>
        </div>
      </summary>

      <div className="mt-6 grid gap-5">
        <NotebookBlock label="Derivation clinics" tone="cyan" items={chapter.derivations} />
        <NotebookBlock label="Algorithm / process walkthroughs" tone="violet" items={chapter.process} />

        <div className="grid gap-4 lg:grid-cols-3">
          {chapter.traps.map((trap) => (
            <article key={trap.mistake} className="rounded-lg border border-orange/30 bg-orange/[0.06] p-4">
              <p className="mono mb-2 text-[10px] uppercase tracking-[0.14em] text-orange">Diagnostic trap</p>
              <h5 className="font-medium text-ink">{trap.mistake}</h5>
              <p className="mt-3 text-sm leading-relaxed text-muted"><span className="font-medium text-ink">Fix:</span> {trap.fix}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted"><span className="font-medium text-ink">Why it matters:</span> {trap.why}</p>
            </article>
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {chapter.checks.map((check) => (
            <article key={check.prompt} className="rounded-lg border border-line bg-panel-2 p-4">
              <p className="mono mb-2 text-[10px] uppercase tracking-[0.14em] text-dim">Self-check</p>
              <h5 className="font-medium leading-snug text-ink">{check.prompt}</h5>
              <p className="mt-3 text-sm leading-relaxed text-muted">{check.answer}</p>
            </article>
          ))}
        </div>
      </div>
    </details>
  );
}

function NotebookBlock({ label, tone, items }: { label: string; tone: "cyan" | "violet"; items: MasteryStepCard[] }) {
  const color = tone === "cyan" ? "text-cyan" : "text-violet";
  return (
    <div>
      <p className="eyebrow mb-3">{label}</p>
      <div className="grid gap-4 lg:grid-cols-2">
        {items.map((item) => (
          <article key={item.label} className="rounded-lg border border-line bg-white p-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <h5 className="display text-2xl font-medium text-ink">{item.label}</h5>
              <span className="mono rounded-full border border-line bg-panel-2 px-2 py-1 text-[10px] uppercase tracking-[0.1em] text-dim">{item.source}</span>
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <div className="rounded-md border border-line bg-panel p-3">
                <p className={`mono mb-2 text-[10px] uppercase tracking-[0.14em] ${color}`}>Easy handle</p>
                <p className="text-sm leading-relaxed text-muted">{item.easy}</p>
              </div>
              <div className="rounded-md border border-line bg-panel-2 p-3">
                <p className="mono mb-2 text-[10px] uppercase tracking-[0.14em] text-dim">Technical handle</p>
                <p className="text-sm leading-relaxed text-muted">{item.technical}</p>
              </div>
            </div>
            <ol className="mt-4 grid gap-2 text-sm leading-relaxed text-muted">
              {item.steps.map((step, index) => (
                <li key={step} className="grid grid-cols-[26px_1fr] gap-2">
                  <span className="mono grid size-6 place-items-center rounded-full border border-line bg-panel-2 text-[10px] text-dim">{index + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </article>
        ))}
      </div>
    </div>
  );
}

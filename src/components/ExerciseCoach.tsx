"use client";

import { useMemo, useState } from "react";
import { exerciseCoachCards, exerciseCoachTotals, type ExerciseCoachCard, type ExerciseKind } from "@/lib/exerciseCoach";
import { Chip } from "./Section";

const kindFilters = ["all", "conceptual", "derivation", "algorithm design", "programming", "interpretation"] as const;
type KindFilter = (typeof kindFilters)[number];

const kindLabels: Record<KindFilter, string> = {
  all: "All",
  conceptual: "Conceptual",
  derivation: "Derivations",
  "algorithm design": "Algorithms",
  programming: "Programming",
  interpretation: "Interpretation",
};

const partLabel = (n: number) => n === 1 ? "Foundations" : n <= 8 ? "Tabular" : n <= 13 ? "Approximation" : "Looking deeper";

export function ExerciseCoach() {
  const [kind, setKind] = useState<KindFilter>("all");
  const [query, setQuery] = useState("");

  const groups = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = exerciseCoachCards.filter((card) => {
      const kindMatch = kind === "all" || card.kind === kind;
      const haystack = [card.id, card.chapter, card.kind, card.title, card.easyGoal, card.technicalGoal, card.checkpoint, ...card.strategy, ...card.tags].join(" ").toLowerCase();
      return kindMatch && (!q || haystack.includes(q));
    });
    const byChapter = new Map<number, ExerciseCoachCard[]>();
    for (const card of filtered) {
      const current = byChapter.get(card.chapter) ?? [];
      current.push(card);
      byChapter.set(card.chapter, current);
    }
    return Array.from(byChapter.entries()).sort(([a], [b]) => a - b);
  }, [kind, query]);

  return (
    <div className="grid gap-7">
      <div className="grid gap-4 rounded-xl border border-line bg-panel p-5 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <p className="eyebrow">Exercise coach</p>
          <h3 className="display mt-2 text-3xl font-medium text-ink">145 exercise guide cards: what each exercise is testing and how to attack it.</h3>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">
            This does not copy the exercise text. It gives a coaching layer: the exercise number, the skill being practiced, a plain-language goal, a technical goal, a solution strategy, and a checkpoint for knowing whether the answer is on track.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Chip accent="cyan">{exerciseCoachTotals.total} exercises</Chip>
            <Chip accent="blue">{exerciseCoachTotals.chapters} chapters with exercises</Chip>
            <Chip accent="lime">{exerciseCoachTotals.programming} programming</Chip>
            <Chip accent="violet">{exerciseCoachTotals.derivation} derivations</Chip>
            <Chip accent="orange">{exerciseCoachTotals.interpretation} figure/results reads</Chip>
          </div>
        </div>
        <label className="flex min-w-0 items-center gap-3 rounded-full border border-line bg-panel-2 px-4 py-2 lg:w-[360px]">
          <span className="mono text-[11px] uppercase tracking-[0.14em] text-dim">Search</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Exercise 6.11, racetrack, baseline..." className="min-w-0 flex-1 bg-transparent text-sm text-ink outline-none" />
        </label>
      </div>

      <div className="flex flex-wrap gap-2">
        {kindFilters.map((item) => (
          <button key={item} onClick={() => setKind(item)} className={`rounded-full border px-3 py-2 text-sm ${kind === item ? "border-cyan bg-cyan text-white" : "border-line bg-panel text-muted hover:border-cyan"}`}>
            {kindLabels[item]}
          </button>
        ))}
      </div>

      <div className="grid gap-5">
        {groups.map(([chapter, cards]) => <ExerciseChapter key={chapter} chapter={chapter} cards={cards} />)}
      </div>
    </div>
  );
}

function ExerciseChapter({ chapter, cards }: { chapter: number; cards: ExerciseCoachCard[] }) {
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
              <Chip accent="lime">{cards.length} exercises</Chip>
            </div>
            <h4 className="display mt-3 text-2xl font-medium text-ink">Chapter {chapter} exercise coach</h4>
          </div>
          <span className="mono rounded-full border border-line bg-panel-2 px-3 py-1 text-[11px] uppercase tracking-[0.12em] text-dim">open practice plan</span>
        </div>
      </summary>
      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        {cards.map((card) => <ExerciseCard key={card.id} card={card} />)}
      </div>
    </details>
  );
}

function ExerciseCard({ card }: { card: ExerciseCoachCard }) {
  const accent: Record<ExerciseKind, "cyan" | "orange" | "blue" | "violet" | "lime"> = {
    conceptual: "blue",
    derivation: "violet",
    "algorithm design": "cyan",
    programming: "lime",
    interpretation: "orange",
  };
  return (
    <article className="rounded-lg border border-line bg-white p-4">
      <div className="flex flex-wrap gap-2">
        <Chip accent={accent[card.kind]}>Exercise {card.id}</Chip>
        <Chip accent="blue">{card.kind}</Chip>
      </div>
      <h5 className="display mt-3 text-2xl font-medium text-ink">{card.title}</h5>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <div className="rounded-md border border-line bg-panel p-3">
          <p className="mono mb-2 text-[10px] uppercase tracking-[0.14em] text-lime">Easy goal</p>
          <p className="text-sm leading-relaxed text-muted">{card.easyGoal}</p>
        </div>
        <div className="rounded-md border border-line bg-panel-2 p-3">
          <p className="mono mb-2 text-[10px] uppercase tracking-[0.14em] text-dim">Technical goal</p>
          <p className="text-sm leading-relaxed text-muted">{card.technicalGoal}</p>
        </div>
      </div>
      <ol className="mt-4 grid gap-2 text-sm leading-relaxed text-muted">
        {card.strategy.map((step, index) => (
          <li key={step} className="grid grid-cols-[26px_1fr] gap-2">
            <span className="mono grid size-6 place-items-center rounded-full border border-line bg-panel-2 text-[10px] text-dim">{index + 1}</span>
            <span>{step}</span>
          </li>
        ))}
      </ol>
      <p className="mt-4 rounded-md border border-orange/30 bg-orange/[0.06] p-3 text-sm leading-relaxed text-muted">{card.checkpoint}</p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {card.tags.map((tag) => <span key={tag} className="mono rounded-full border border-line bg-panel-2 px-2 py-1 text-[10px] text-dim">{tag}</span>)}
      </div>
    </article>
  );
}

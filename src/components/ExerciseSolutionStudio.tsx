"use client";

import { useMemo, useState, type ReactNode } from "react";
import type { ExerciseSolutionCard, ExerciseSolutionMode } from "@/lib/exerciseSolutionStudio";

type Accent = "cyan" | "orange" | "blue" | "violet" | "lime";

const exerciseSolutionModes = ["attempt", "hint", "solution", "debug", "extension"] as const satisfies readonly ExerciseSolutionMode[];

const modeLabels: Record<ExerciseSolutionMode, string> = {
  attempt: "Attempt",
  hint: "Hint",
  solution: "Solution",
  debug: "Debug",
  extension: "Extension",
};

export function ExerciseSolutionStudio({ cards, contextTitle = "Exercise solution studio", compact = false }: { cards: ExerciseSolutionCard[]; contextTitle?: string; compact?: boolean }) {
  const [index, setIndex] = useState(0);
  const [mode, setMode] = useState<ExerciseSolutionMode>("attempt");
  const safeIndex = Math.min(index, Math.max(cards.length - 1, 0));
  const card = cards[safeIndex];
  const modeIndex = exerciseSolutionModes.indexOf(mode);
  const geometry = useMemo(() => exerciseGeometry(safeIndex, modeIndex), [safeIndex, modeIndex]);

  if (!card) return null;

  return (
    <article className="exercise-solution-studio overflow-hidden rounded-xl border border-line bg-panel" data-exercise-card={card.id} data-mode={mode} data-card-count={cards.length}>
      <div className="grid gap-px bg-line lg:grid-cols-[0.9fr_1.1fr]">
        <div className="bg-panel-2 p-5 lg:p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="flex flex-wrap gap-2"><StudioChip>Exercise solution</StudioChip><StudioChip accent="blue">Ch {card.chapter}</StudioChip><StudioChip accent="lime">Exercise {card.exerciseId}</StudioChip><StudioChip accent="orange">{safeIndex + 1}/{cards.length}</StudioChip></div>
            <span className="mono rounded-full border border-line bg-white px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-muted">{modeLabels[mode]}</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted">{contextTitle}</p>
          <h3 className="display mt-2 text-3xl font-medium text-ink">{card.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted"><span className="font-medium text-ink">Practice type:</span> {card.kind}</p>
          <svg viewBox="0 0 430 255" role="img" aria-label={`${card.title} exercise solution diagram`} className="mt-5 h-auto w-full">
            <defs>
              <linearGradient id={`exercise-solution-grad-${card.chapter}-${safeIndex}-${modeIndex}`} x1="0" x2="1">
                <stop offset="0%" stopColor="#f97316" />
                <stop offset="45%" stopColor="#14b8a6" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
            <rect x="10" y="10" width="410" height="235" rx="24" fill="white" stroke="rgba(15,23,42,0.12)" />
            <path d={geometry.path} fill="none" stroke={`url(#exercise-solution-grad-${card.chapter}-${safeIndex}-${modeIndex})`} strokeWidth="5" strokeLinecap="round" strokeDasharray="8 10" className="rl-dash" />
            {geometry.nodes.map((node, nodeIndex) => {
              const active = nodeIndex === modeIndex % geometry.nodes.length;
              return (
                <g key={node.label}>
                  <circle cx={node.x} cy={node.y} r={active ? 29 : 22} fill={active ? "#f97316" : "#f8fafc"} stroke="rgba(15,23,42,0.28)" strokeWidth="2" />
                  <text x={node.x} y={node.y + 4} textAnchor="middle" className={active ? "fill-white text-[10px] font-semibold" : "fill-ink text-[10px] font-semibold"}>{node.label}</text>
                </g>
              );
            })}
            <foreignObject x="35" y="190" width="360" height="44">
              <div className="rounded-lg border border-line bg-panel px-3 py-2 text-xs leading-snug text-muted">
                Try first → take a hint → study a model solution → debug → extend.
              </div>
            </foreignObject>
          </svg>
          <p className="mt-4 rounded-lg border border-orange/20 bg-orange/[0.06] p-3 text-sm leading-relaxed text-muted"><span className="font-medium text-ink">Rule:</span> hide the solution until you have written a plain answer, a formal object, and one tiny sanity check.</p>
        </div>

        <div className="bg-panel p-5 lg:p-6">
          <div className="grid gap-4">
            <div>
              <p className="eyebrow mb-2">Choose exercise</p>
              <div className={`grid gap-2 ${compact || cards.length > 8 ? "max-h-72 overflow-auto pr-1" : "md:grid-cols-2"}`}>
                {cards.map((item, cardIndex) => (
                  <button key={item.id} type="button" onClick={() => setIndex(cardIndex)} className={`rounded-lg border px-3 py-2 text-left text-sm leading-snug transition ${cardIndex === safeIndex ? "border-orange bg-orange/[0.08] text-ink" : "border-line bg-white text-muted hover:border-orange hover:text-ink"}`}>
                    <span className="mono block text-[10px] uppercase tracking-[0.12em] text-dim">Ch {item.chapter} · Ex {item.exerciseId}</span>
                    {item.title.replace(" solution studio", "")}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="eyebrow mb-2">Solution mode</p>
              <div className="flex flex-wrap gap-2">
                {exerciseSolutionModes.map((item) => (
                  <button key={item} type="button" onClick={() => setMode(item)} className={`rounded-full border px-3 py-2 text-sm transition ${item === mode ? "border-orange bg-orange text-white" : "border-line bg-white text-muted hover:border-orange hover:text-ink"}`}>{modeLabels[item]}</button>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-line bg-white p-5">
              <div className="flex flex-wrap gap-2"><StudioChip accent="blue">Chapter {card.chapter}</StudioChip><StudioChip accent="lime">{modeLabels[mode]}</StudioChip><StudioChip accent="violet">{card.tags.slice(0, 2).join(" · ")}</StudioChip></div>
              <h4 className="display mt-3 text-3xl font-medium text-ink">{modeHeadline(mode)}</h4>
              <div className="mt-4 text-sm leading-relaxed text-muted">{renderMode(card, mode)}</div>
              <a href={card.route} className="mono mt-5 inline-flex rounded-full border border-orange bg-orange px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-white hover:bg-white hover:text-orange">Open chapter exercises</a>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function renderMode(card: ExerciseSolutionCard, mode: ExerciseSolutionMode) {
  if (mode === "attempt") return <div className="grid gap-3"><p>{card.attemptPrompt}</p><p><span className="font-medium text-ink">Tiny rehearsal world:</span> {card.miniWorld}</p><NumberedList items={card.scratchPlan} accent="orange" /><TagRow tags={card.tags} /></div>;
  if (mode === "hint") return <NumberedList items={card.hint} accent="cyan" />;
  if (mode === "solution") return <div className="grid gap-3"><div className="rounded-lg border border-lime/30 bg-lime/[0.06] p-4"><p>{card.solution}</p></div><div className="rounded-lg border border-violet/30 bg-violet/[0.06] p-4"><p><span className="font-medium text-ink">Technical solution:</span> {card.technicalSolution}</p></div><PanelList title="Self-grading rubric" items={card.gradingRubric} /></div>;
  if (mode === "debug") return <PanelList title="Debug checklist" items={card.debugChecklist} />;
  return <div className="rounded-lg border border-blue/30 bg-blue/[0.06] p-4"><p>{card.extension}</p></div>;
}

function PanelList({ title, items }: { title: string; items: string[] }) {
  return <div className="rounded-lg border border-line bg-panel-2 p-4"><p className="mono mb-3 text-[10px] uppercase tracking-[0.14em] text-dim">{title}</p><NumberedList items={items} accent="violet" /></div>;
}

function NumberedList({ items, accent }: { items: string[]; accent: Accent }) {
  return <ol className="grid gap-2">{items.map((item, itemIndex) => <li key={item} className="flex gap-2"><span className={accent === "orange" ? "text-orange" : accent === "violet" ? "text-violet" : accent === "lime" ? "text-lime" : "text-cyan"}>{itemIndex + 1}.</span><span>{item}</span></li>)}</ol>;
}

function TagRow({ tags }: { tags: string[] }) {
  return <div className="flex flex-wrap gap-1.5">{tags.slice(0, 8).map((tag) => <span key={tag} className="mono rounded-full border border-line bg-panel-2 px-2 py-1 text-[10px] text-dim">{tag}</span>)}</div>;
}

function modeHeadline(mode: ExerciseSolutionMode) {
  return {
    attempt: "Try before revealing.",
    hint: "Nudge, not answer.",
    solution: "Model solution path.",
    debug: "Find the broken step.",
    extension: "Change the exercise world.",
  }[mode];
}

function StudioChip({ children, accent = "cyan" }: { children: ReactNode; accent?: Accent }) {
  const color = {
    cyan: "border-cyan/30 bg-cyan/[0.08] text-cyan",
    orange: "border-orange/30 bg-orange/[0.08] text-orange",
    blue: "border-blue/30 bg-blue/[0.08] text-blue",
    violet: "border-violet/30 bg-violet/[0.08] text-violet",
    lime: "border-lime/30 bg-lime/[0.08] text-lime",
  }[accent];
  return <span className={`mono inline-flex rounded-full border px-2.5 py-1 text-[11px] ${color}`}>{children}</span>;
}

function exerciseGeometry(cardIndex: number, modeIndex: number) {
  const layouts = [
    { path: "M52 176 C112 60 188 72 216 132 S304 190 378 78", nodes: [[52, 176, "try"], [132, 84, "hint"], [216, 132, "solve"], [304, 136, "debug"], [378, 78, "extend"]] },
    { path: "M58 92 L132 92 L214 180 L296 92 L374 92", nodes: [[58, 92, "read"], [132, 92, "objects"], [214, 180, "line"], [296, 92, "check"], [374, 92, "vary"]] },
    { path: "M58 178 L116 120 L184 148 L252 76 L318 134 L376 82", nodes: [[58, 178, "tiny"], [116, 120, "plan"], [184, 148, "formal"], [252, 76, "answer"], [376, 82, "new"]] },
  ];
  const layout = layouts[(cardIndex + modeIndex) % layouts.length];
  return { path: layout.path, nodes: layout.nodes.map(([x, y, label]) => ({ x: Number(x), y: Number(y), label: String(label) })) };
}

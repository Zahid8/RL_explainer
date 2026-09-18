"use client";

import { useMemo, useState, type ReactNode } from "react";
import { chapterExamModes, type ChapterExamCard, type ChapterExamMode } from "@/lib/chapterExam";

type Accent = "cyan" | "orange" | "blue" | "violet" | "lime";

const modeLabels: Record<ChapterExamMode, string> = {
  prompt: "Prompt",
  plan: "Plan",
  solution: "Solution",
  rubric: "Rubric",
  transfer: "Transfer",
};

export function ChapterExamStudio({ cards, contextTitle = "Chapter exam studio", compact = false }: { cards: ChapterExamCard[]; contextTitle?: string; compact?: boolean }) {
  const [index, setIndex] = useState(0);
  const [mode, setMode] = useState<ChapterExamMode>("prompt");
  const safeIndex = Math.min(index, Math.max(cards.length - 1, 0));
  const card = cards[safeIndex];
  const modeIndex = chapterExamModes.indexOf(mode);
  const geometry = useMemo(() => examGeometry(safeIndex, modeIndex), [safeIndex, modeIndex]);

  if (!card) return null;

  return (
    <article className="chapter-exam-studio overflow-hidden rounded-xl border border-line bg-panel" data-exam-card={card.id} data-mode={mode} data-card-count={cards.length}>
      <div className="grid gap-px bg-line lg:grid-cols-[0.92fr_1.08fr]">
        <div className="bg-panel-2 p-5 lg:p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="flex flex-wrap gap-2"><ExamChip>Exam studio</ExamChip><ExamChip accent="lime">Ch {card.chapter}</ExamChip><ExamChip accent="blue">{safeIndex + 1}/{cards.length}</ExamChip></div>
            <span className="mono rounded-full border border-line bg-white px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-muted">{modeLabels[mode]}</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted">{contextTitle}</p>
          <h3 className="display mt-2 text-3xl font-medium text-ink">{card.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted"><span className="font-medium text-ink">Exam kind:</span> {card.kind}</p>
          <svg viewBox="0 0 430 255" role="img" aria-label={`${card.title} exam diagram`} className="mt-5 h-auto w-full">
            <defs>
              <linearGradient id={`exam-grad-${card.chapter}-${safeIndex}-${modeIndex}`} x1="0" x2="1">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="50%" stopColor="#84cc16" />
                <stop offset="100%" stopColor="#fb923c" />
              </linearGradient>
            </defs>
            <rect x="10" y="10" width="410" height="235" rx="24" fill="white" stroke="rgba(15,23,42,0.12)" />
            <path d={geometry.path} fill="none" stroke={`url(#exam-grad-${card.chapter}-${safeIndex}-${modeIndex})`} strokeWidth="5" strokeLinecap="round" strokeDasharray="9 9" className="rl-dash" />
            {geometry.nodes.map((node, nodeIndex) => (
              <g key={node.label}>
                <circle cx={node.x} cy={node.y} r={nodeIndex === modeIndex % geometry.nodes.length ? 28 : 22} fill={nodeIndex === modeIndex % geometry.nodes.length ? "#06b6d4" : "#f8fafc"} stroke="rgba(15,23,42,0.28)" strokeWidth="2" />
                <text x={node.x} y={node.y + 4} textAnchor="middle" className={nodeIndex === modeIndex % geometry.nodes.length ? "fill-white text-[10px] font-semibold" : "fill-ink text-[10px] font-semibold"}>{node.label}</text>
              </g>
            ))}
            <foreignObject x="34" y="188" width="362" height="44">
              <div className="rounded-lg border border-line bg-panel px-3 py-2 text-xs leading-snug text-muted">
                Try → plan → solve → grade → transfer.
              </div>
            </foreignObject>
          </svg>
          <p className="mt-4 rounded-lg border border-cyan/20 bg-cyan/[0.06] p-3 text-sm leading-relaxed text-muted"><span className="font-medium text-ink">Exam rule:</span> try the prompt before opening the solution. A standalone book is only complete when you can explain, draw, compute, debug, trust-check, and transfer the chapter yourself.</p>
        </div>

        <div className="bg-panel p-5 lg:p-6">
          <div className="grid gap-4">
            <div>
              <p className="eyebrow mb-2">Choose exam card</p>
              <div className={`grid gap-2 ${compact || cards.length > 7 ? "max-h-72 overflow-auto pr-1" : "md:grid-cols-2"}`}>
                {cards.map((item, cardIndex) => (
                  <button key={item.id} type="button" onClick={() => setIndex(cardIndex)} className={`rounded-lg border px-3 py-2 text-left text-sm leading-snug transition ${cardIndex === safeIndex ? "border-cyan bg-cyan/[0.08] text-ink" : "border-line bg-white text-muted hover:border-cyan hover:text-ink"}`}>
                    <span className="mono block text-[10px] uppercase tracking-[0.12em] text-dim">Ch {item.chapter} · {item.kind}</span>
                    {item.title}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="eyebrow mb-2">Exam mode</p>
              <div className="flex flex-wrap gap-2">
                {chapterExamModes.map((item) => (
                  <button key={item} type="button" onClick={() => setMode(item)} className={`rounded-full border px-3 py-2 text-sm transition ${item === mode ? "border-cyan bg-cyan text-white" : "border-line bg-white text-muted hover:border-cyan hover:text-ink"}`}>{modeLabels[item]}</button>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-line bg-white p-5">
              <div className="flex flex-wrap gap-2"><ExamChip>Chapter {card.chapter}</ExamChip><ExamChip accent="lime">{modeLabels[mode]}</ExamChip><ExamChip accent="orange">{card.rubric.length} rubric checks</ExamChip></div>
              <h4 className="display mt-3 text-3xl font-medium text-ink">{modeHeadline(mode)}</h4>
              <div className="mt-4 text-sm leading-relaxed text-muted">{renderMode(card, mode)}</div>
              <a href={card.route} className="mono mt-5 inline-flex rounded-full border border-cyan bg-cyan px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-white hover:bg-white hover:text-cyan">Open chapter exam</a>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function renderMode(card: ChapterExamCard, mode: ChapterExamMode) {
  if (mode === "prompt") return <div className="grid gap-3"><p>{card.prompt}</p><p><span className="font-medium text-ink">Diagnostic:</span> {card.diagnostic}</p><TagRow tags={card.tags} /></div>;
  if (mode === "plan") return <NumberedList items={card.plan} accent="cyan" />;
  if (mode === "solution") return <div className="rounded-lg border border-lime/30 bg-lime/[0.06] p-4"><p>{card.solution}</p></div>;
  if (mode === "rubric") return <NumberedList items={card.rubric} accent="orange" />;
  return <div className="rounded-lg border border-violet/30 bg-violet/[0.06] p-4"><p>{card.transfer}</p></div>;
}

function NumberedList({ items, accent }: { items: string[]; accent: Accent }) {
  return <ol className="grid gap-2">{items.map((item, itemIndex) => <li key={item} className="flex gap-2"><span className={accent === "orange" ? "text-orange" : accent === "violet" ? "text-violet" : "text-cyan"}>{itemIndex + 1}.</span><span>{item}</span></li>)}</ol>;
}

function modeHeadline(mode: ChapterExamMode) {
  return {
    prompt: "Try first, then reveal.",
    plan: "A strong answer plan.",
    solution: "One high-quality answer.",
    rubric: "How to grade yourself.",
    transfer: "Can you use it somewhere new?",
  }[mode];
}

function TagRow({ tags }: { tags: string[] }) {
  return <div className="flex flex-wrap gap-1.5">{tags.slice(0, 8).map((tag) => <span key={tag} className="mono rounded-full border border-line bg-panel-2 px-2 py-1 text-[10px] text-dim">{tag}</span>)}</div>;
}

function ExamChip({ children, accent = "cyan" }: { children: ReactNode; accent?: Accent }) {
  const color = {
    cyan: "border-cyan/30 bg-cyan/[0.08] text-cyan",
    orange: "border-orange/30 bg-orange/[0.08] text-orange",
    blue: "border-blue/30 bg-blue/[0.08] text-blue",
    violet: "border-violet/30 bg-violet/[0.08] text-violet",
    lime: "border-lime/30 bg-lime/[0.08] text-lime",
  }[accent];
  return <span className={`mono inline-flex rounded-full border px-2.5 py-1 text-[11px] ${color}`}>{children}</span>;
}

function examGeometry(cardIndex: number, modeIndex: number) {
  const layouts = [
    { path: "M54 168 C116 78 178 78 218 130 S322 194 376 76", nodes: [[54, 168, "try"], [136, 86, "plan"], [218, 130, "solve"], [306, 126, "grade"], [376, 76, "move"]] },
    { path: "M58 88 H132 L214 178 L302 88 H374", nodes: [[58, 88, "ask"], [132, 88, "draw"], [214, 178, "math"], [302, 88, "debug"], [374, 88, "use"]] },
    { path: "M58 178 L130 96 L214 146 L300 72 L372 178", nodes: [[58, 178, "story"], [130, 96, "board"], [214, 146, "claim"], [300, 72, "test"], [372, 178, "world"]] },
  ];
  const layout = layouts[(cardIndex + modeIndex) % layouts.length];
  return { path: layout.path, nodes: layout.nodes.map(([x, y, label]) => ({ x: Number(x), y: Number(y), label: String(label) })) };
}

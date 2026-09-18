"use client";

import { useMemo, useState, type ReactNode } from "react";
import type { SocraticMode, SocraticTutorCard } from "@/lib/socraticTutor";

type Accent = "cyan" | "orange" | "blue" | "violet" | "lime";

const socraticModes = ["question", "hint", "board", "technical", "try"] as const satisfies readonly SocraticMode[];

const modeLabels: Record<SocraticMode, string> = {
  question: "Question",
  hint: "Hint",
  board: "Board",
  technical: "Technical",
  try: "Try it",
};

export function SocraticTutorStudio({ cards, contextTitle = "Socratic tutor studio", compact = false }: { cards: SocraticTutorCard[]; contextTitle?: string; compact?: boolean }) {
  const [index, setIndex] = useState(0);
  const [mode, setMode] = useState<SocraticMode>("question");
  const safeIndex = Math.min(index, Math.max(cards.length - 1, 0));
  const card = cards[safeIndex];
  const modeIndex = socraticModes.indexOf(mode);
  const board = useMemo(() => tutorGeometry(safeIndex, modeIndex), [safeIndex, modeIndex]);

  if (!card) return null;

  return (
    <article className="socratic-tutor-studio overflow-hidden rounded-xl border border-line bg-panel" data-tutor-card={card.id} data-mode={mode} data-card-count={cards.length}>
      <div className="grid gap-px bg-line lg:grid-cols-[1fr_1fr]">
        <div className="bg-panel-2 p-5 lg:p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="flex flex-wrap gap-2"><TutorChip>Socratic tutor</TutorChip><TutorChip accent="blue">Ch {card.chapter}</TutorChip><TutorChip accent="lime">{safeIndex + 1}/{cards.length}</TutorChip><TutorChip accent="orange">{card.sourceLabel}</TutorChip></div>
            <span className="mono rounded-full border border-line bg-white px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-muted">{modeLabels[mode]}</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted">{contextTitle}</p>
          <h3 className="display mt-2 text-3xl font-medium text-ink">{card.title}</h3>
          <div className="mt-5 grid gap-3">
            <SpeechBubble speaker="Learner" text={card.learnerQuestion} />
            <SpeechBubble speaker="Tutor" text={card.tutorHint} tutor />
          </div>
          <svg viewBox="0 0 460 284" role="img" aria-label={`${card.title} Socratic board`} className="mt-5 h-auto w-full">
            <defs>
              <linearGradient id={`tutor-grad-${card.chapter}-${safeIndex}-${modeIndex}`} x1="0" x2="1">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="50%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#84cc16" />
              </linearGradient>
            </defs>
            <rect x="10" y="10" width="440" height="264" rx="26" fill="white" stroke="rgba(15,23,42,0.12)" />
            <path d={board.path} fill="none" stroke={`url(#tutor-grad-${card.chapter}-${safeIndex}-${modeIndex})`} strokeWidth="5" strokeLinecap="round" strokeDasharray="10 9" className="rl-dash" />
            <g>
              <rect x="36" y="40" width="150" height="62" rx="18" fill="#ecfeff" stroke="rgba(6,182,212,0.34)" />
              <text x="111" y="68" textAnchor="middle" className="fill-ink text-[10px] font-semibold">learner asks</text>
              <text x="111" y="84" textAnchor="middle" className="fill-muted text-[8px]">confusion becomes a handle</text>
            </g>
            <g>
              <rect x="274" y="40" width="150" height="62" rx="18" fill="#f5f3ff" stroke="rgba(139,92,246,0.34)" />
              <text x="349" y="68" textAnchor="middle" className="fill-ink text-[10px] font-semibold">tutor responds</text>
              <text x="349" y="84" textAnchor="middle" className="fill-muted text-[8px]">hint → board → precision</text>
            </g>
            {board.nodes.map((node, nodeIndex) => {
              const active = nodeIndex === modeIndex % board.nodes.length;
              return (
                <g key={node.label}>
                  <circle cx={node.x} cy={node.y} r={active ? 30 : 22} fill={active ? "#06b6d4" : "#f8fafc"} stroke="rgba(15,23,42,0.25)" strokeWidth="2" />
                  <text x={node.x} y={node.y + 4} textAnchor="middle" className={active ? "fill-white text-[9px] font-semibold" : "fill-ink text-[9px] font-semibold"}>{node.label}</text>
                </g>
              );
            })}
            <foreignObject x="42" y="222" width="376" height="40">
              <div className="rounded-lg border border-line bg-panel px-3 py-2 text-xs leading-snug text-muted">
                Tutor rule: ask the naive question, take a hint, draw the board, state the exact object, then try a fresh case.
              </div>
            </foreignObject>
          </svg>
        </div>

        <div className="bg-panel p-5 lg:p-6">
          <div className="grid gap-4">
            <div>
              <p className="eyebrow mb-2">Choose tutor card</p>
              <div className={`grid gap-2 ${compact || cards.length > 8 ? "max-h-72 overflow-auto pr-1" : "md:grid-cols-2"}`}>
                {cards.map((item, cardIndex) => (
                  <button key={item.id} type="button" onClick={() => setIndex(cardIndex)} className={`rounded-lg border px-3 py-2 text-left text-sm leading-snug transition ${cardIndex === safeIndex ? "border-cyan bg-cyan/[0.08] text-ink" : "border-line bg-white text-muted hover:border-cyan hover:text-ink"}`}>
                    <span className="mono block text-[10px] uppercase tracking-[0.12em] text-dim">Ch {item.chapter} · {item.sourceLabel}</span>
                    {item.title}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="eyebrow mb-2">Tutor mode</p>
              <div className="flex flex-wrap gap-2">
                {socraticModes.map((item) => (
                  <button key={item} type="button" onClick={() => setMode(item)} className={`rounded-full border px-3 py-2 text-sm transition ${item === mode ? "border-cyan bg-cyan text-white" : "border-line bg-white text-muted hover:border-cyan hover:text-ink"}`}>{modeLabels[item]}</button>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-line bg-white p-5">
              <div className="flex flex-wrap gap-2"><TutorChip accent="blue">Chapter {card.chapter}</TutorChip><TutorChip accent="lime">{modeLabels[mode]}</TutorChip><TutorChip accent="orange">{card.sourceLabel}</TutorChip></div>
              <h4 className="display mt-3 text-3xl font-medium text-ink">{modeHeadline(mode)}</h4>
              <div className="mt-4 text-sm leading-relaxed text-muted">{renderMode(card, mode)}</div>
              <a href={card.route} className="mono mt-5 inline-flex rounded-full border border-cyan bg-cyan px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-white hover:bg-white hover:text-cyan">Open chapter tutor</a>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function renderMode(card: SocraticTutorCard, mode: SocraticMode) {
  if (mode === "question") return <div className="grid gap-3"><SpeechBubble speaker="Learner" text={card.learnerQuestion} /><TagRow tags={card.tags} /></div>;
  if (mode === "hint") return <div className="grid gap-3"><SpeechBubble speaker="Tutor" text={card.tutorHint} tutor /><p><span className="font-medium text-ink">Misconception probe:</span> {card.misconceptionProbe}</p></div>;
  if (mode === "board") return <ol className="grid gap-2">{card.boardSteps.map((step, index) => <li key={`${card.id}-${step}`} className="flex gap-2"><span className="text-cyan">{index + 1}.</span><span>{step}</span></li>)}</ol>;
  if (mode === "technical") return <div className="rounded-lg border border-violet/25 bg-violet/[0.06] p-4"><p>{card.technicalAnswer}</p></div>;
  return <div className="grid gap-3"><p>{card.tryIt}</p><p><span className="font-medium text-ink">Expected shape:</span> {card.expectedAnswer}</p></div>;
}

function modeHeadline(mode: SocraticMode) {
  return {
    question: "Start with the question you would ask in class.",
    hint: "Take one hint before seeing the full answer.",
    board: "Draw the idea as a sequence of visible moves.",
    technical: "Translate the board into exact RL language.",
    try: "Try a new case and compare your answer.",
  }[mode];
}

function SpeechBubble({ speaker, text, tutor = false }: { speaker: string; text: string; tutor?: boolean }) {
  return (
    <div className={`rounded-2xl border ${tutor ? "border-violet/25 bg-violet/[0.06]" : "border-cyan/25 bg-cyan/[0.06]"} p-4`}>
      <p className="mono text-[10px] uppercase tracking-[0.14em] text-dim">{speaker}</p>
      <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
    </div>
  );
}

function TagRow({ tags }: { tags: string[] }) {
  return <div className="flex flex-wrap gap-1.5">{tags.slice(0, 9).map((tag) => <span key={tag} className="mono rounded-full border border-line bg-panel-2 px-2 py-1 text-[10px] text-dim">{tag}</span>)}</div>;
}

function TutorChip({ children, accent = "cyan" }: { children: ReactNode; accent?: Accent }) {
  const color = {
    cyan: "border-cyan/30 bg-cyan/[0.08] text-cyan",
    orange: "border-orange/30 bg-orange/[0.08] text-orange",
    blue: "border-blue/30 bg-blue/[0.08] text-blue",
    violet: "border-violet/30 bg-violet/[0.08] text-violet",
    lime: "border-lime/30 bg-lime/[0.08] text-lime",
  }[accent];
  return <span className={`mono inline-flex rounded-full border px-2.5 py-1 text-[11px] ${color}`}>{children}</span>;
}

function tutorGeometry(cardIndex: number, modeIndex: number) {
  const layouts = [
    { path: "M80 158 C130 110 174 184 226 138 S318 96 386 158", nodes: [[80, 158, "ask"], [150, 126, "hint"], [226, 138, "draw"], [310, 126, "name"], [386, 158, "try"]] },
    { path: "M72 178 L150 122 L230 178 L310 122 L390 178", nodes: [[72, 178, "why"], [150, 122, "clue"], [230, 178, "board"], [310, 122, "exact"], [390, 178, "test"]] },
    { path: "M76 126 C130 86 172 204 232 170 S322 96 384 132", nodes: [[76, 126, "naive"], [148, 126, "nudge"], [232, 170, "trace"], [322, 132, "proof"], [384, 132, "own"]] },
  ];
  const layout = layouts[(cardIndex + modeIndex) % layouts.length];
  return { path: layout.path, nodes: layout.nodes.map(([x, y, label]) => ({ x: Number(x), y: Number(y), label: String(label) })) };
}

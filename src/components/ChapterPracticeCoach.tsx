"use client";

import { useMemo, useState, type ReactNode } from "react";
import type { ChapterPracticeCard } from "@/lib/chapterPractice";

const modes = ["prompt", "hint", "solution", "trap", "transfer"] as const;

type Mode = (typeof modes)[number];

const modeLabels: Record<Mode, string> = {
  prompt: "Prompt",
  hint: "Hint",
  solution: "Solution",
  trap: "Trap",
  transfer: "Transfer",
};

export function ChapterPracticeCoach({ cards, contextTitle = "Active recall practice", compact = false }: { cards: ChapterPracticeCard[]; contextTitle?: string; compact?: boolean }) {
  const [cardIndex, setCardIndex] = useState(0);
  const [mode, setMode] = useState<Mode>("prompt");
  const safeIndex = Math.min(cardIndex, Math.max(cards.length - 1, 0));
  const card = cards[safeIndex];
  const modeIndex = modes.indexOf(mode);
  const geometry = useMemo(() => geometryFor(safeIndex, modeIndex), [safeIndex, modeIndex]);

  if (!card) return null;

  return (
    <article className="chapter-practice-coach overflow-hidden rounded-xl border border-line bg-panel" data-card={card.id} data-mode={mode}>
      <div className="grid gap-px bg-line lg:grid-cols-[0.9fr_1.1fr]">
        <div className="bg-ink p-5 text-white lg:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2"><CoachChip>Active recall coach</CoachChip><CoachChip accent="lime">Ch {card.chapter}</CoachChip><CoachChip accent="blue">{safeIndex + 1}/{cards.length}</CoachChip></div>
            <span className="mono rounded-full border border-white/20 px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-white/70">{modeLabels[mode]}</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-white/60">{contextTitle}</p>
          <h3 className="display mt-2 text-3xl font-medium text-white">{card.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-white/70"><span className="text-white">Skill:</span> {card.skill}</p>
          <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.04] p-4">
            <svg viewBox="0 0 430 260" role="img" aria-label={`${card.title} active recall diagram`} className="h-auto w-full">
              <defs>
                <linearGradient id={`practice-grad-${card.chapter}-${safeIndex}-${modeIndex}`} x1="0" x2="1">
                  <stop offset="0%" stopColor="#84cc16" />
                  <stop offset="50%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#f97316" />
                </linearGradient>
              </defs>
              <rect x="8" y="8" width="414" height="244" rx="24" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.14)" />
              <path d={geometry.path} fill="none" stroke={`url(#practice-grad-${card.chapter}-${safeIndex}-${modeIndex})`} strokeWidth="5" strokeLinecap="round" strokeDasharray="10 10" className="rl-dash" />
              {geometry.nodes.map((node, index) => (
                <g key={node.label}>
                  <circle cx={node.x} cy={node.y} r={index === modeIndex % geometry.nodes.length ? 29 : 23} fill={index === modeIndex % geometry.nodes.length ? "#84cc16" : "rgba(255,255,255,0.12)"} stroke="rgba(255,255,255,0.55)" strokeWidth="2" />
                  <text x={node.x} y={node.y + 4} textAnchor="middle" className="fill-white text-[10px] font-semibold">{node.label}</text>
                </g>
              ))}
              <foreignObject x="30" y="184" width="370" height="54">
                <div className="rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-xs leading-snug text-white/75">
                  {card.tags.slice(0, 5).join(" • ")}
                </div>
              </foreignObject>
            </svg>
          </div>
          <p className="mt-4 rounded-lg border border-white/10 bg-white/[0.04] p-3 text-sm leading-relaxed text-white/70"><span className="text-white">How to use:</span> answer the prompt out loud first, then reveal hint, solution, trap, and transfer only after trying.</p>
        </div>

        <div className="bg-panel p-5 lg:p-6">
          <div className="grid gap-4">
            <div>
              <p className="eyebrow mb-2">Choose checkpoint</p>
              <div className={`grid gap-2 ${compact || cards.length > 6 ? "max-h-72 overflow-auto pr-1" : "md:grid-cols-2"}`}>
                {cards.map((item, index) => (
                  <button key={item.id} onClick={() => setCardIndex(index)} className={`rounded-lg border px-3 py-2 text-left text-sm leading-snug transition ${index === safeIndex ? "border-lime bg-lime/[0.08] text-ink" : "border-line bg-white text-muted hover:border-lime hover:text-ink"}`}>
                    <span className="mono block text-[10px] uppercase tracking-[0.12em] text-dim">Ch {item.chapter} · {item.skill}</span>
                    {item.title}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="eyebrow mb-2">Reveal mode</p>
              <div className="flex flex-wrap gap-2">
                {modes.map((item) => (
                  <button key={item} onClick={() => setMode(item)} className={`rounded-full border px-3 py-2 text-sm transition ${item === mode ? "border-lime bg-lime text-white" : "border-line bg-white text-muted hover:border-lime hover:text-ink"}`}>
                    {modeLabels[item]}
                  </button>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-line bg-white p-5">
              <div className="flex flex-wrap gap-2"><CoachChip>Chapter {card.chapter}</CoachChip><CoachChip accent="blue">{card.skill}</CoachChip><CoachChip accent="lime">{modeLabels[mode]}</CoachChip></div>
              <h4 className="display mt-3 text-3xl font-medium text-ink">{modeHeadline(mode)}</h4>
              <p className="mt-4 text-sm leading-relaxed text-muted">{modeText(card, mode)}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {card.tags.map((tag) => <span key={tag} className="mono rounded-full border border-line bg-panel-2 px-2 py-1 text-[10px] text-dim">{tag}</span>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function modeText(card: ChapterPracticeCard, mode: Mode) {
  return {
    prompt: card.prompt,
    hint: card.hint,
    solution: card.solution,
    trap: card.trap,
    transfer: card.transfer,
  }[mode];
}

function modeHeadline(mode: Mode) {
  return {
    prompt: "Try before revealing.",
    hint: "Nudge, do not solve yet.",
    solution: "What a strong answer contains.",
    trap: "The answer that sounds right but fails.",
    transfer: "Prove it works elsewhere.",
  }[mode];
}

function CoachChip({ children, accent = "cyan" }: { children: ReactNode; accent?: "cyan" | "lime" | "blue" }) {
  const color = {
    cyan: "border-cyan/30 bg-cyan/[0.08] text-cyan",
    lime: "border-lime/30 bg-lime/[0.08] text-lime",
    blue: "border-blue/30 bg-blue/[0.08] text-blue",
  }[accent];
  return <span className={`mono inline-flex rounded-full border px-2.5 py-1 text-[11px] ${color}`}>{children}</span>;
}

function geometryFor(cardIndex: number, modeIndex: number) {
  const layouts = [
    { path: "M56 184 C118 74 186 82 224 142 S320 198 374 84", nodes: [[56, 184, "try"], [138, 78, "hint"], [224, 142, "solve"], [318, 104, "trap"], [374, 84, "move"]] },
    { path: "M62 92 H138 V174 H224 V92 H368", nodes: [[62, 92, "ask"], [138, 92, "draw"], [138, 174, "name"], [224, 174, "repair"], [368, 92, "apply"]] },
    { path: "M58 176 L122 70 L204 132 L286 78 L370 180", nodes: [[58, 176, "recall"], [122, 70, "cue"], [204, 132, "answer"], [286, 78, "debug"], [370, 180, "test"]] },
  ];
  const layout = layouts[(cardIndex + modeIndex) % layouts.length];
  return { path: layout.path, nodes: layout.nodes.map(([x, y, label]) => ({ x: Number(x), y: Number(y), label: String(label) })) };
}

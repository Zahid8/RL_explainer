"use client";

import { useMemo, useState, type ReactNode } from "react";
import type { ChapterMisconceptionCard } from "@/lib/chapterMisconceptions";

const modes = ["mistake", "temptation", "repair", "technical", "check"] as const;

type Mode = (typeof modes)[number];

const modeLabels: Record<Mode, string> = {
  mistake: "Mistake",
  temptation: "Why tempting",
  repair: "Repair",
  technical: "Technical consequence",
  check: "Self-check",
};

export function MisconceptionClinic({ cards, contextTitle = "Misconception clinic", compact = false }: { cards: ChapterMisconceptionCard[]; contextTitle?: string; compact?: boolean }) {
  const [cardIndex, setCardIndex] = useState(0);
  const [mode, setMode] = useState<Mode>("mistake");
  const safeIndex = Math.min(cardIndex, Math.max(cards.length - 1, 0));
  const card = cards[safeIndex];
  const modeIndex = modes.indexOf(mode);
  const geometry = useMemo(() => geometryFor(safeIndex, modeIndex), [safeIndex, modeIndex]);

  if (!card) return null;

  return (
    <article className="misconception-clinic overflow-hidden rounded-xl border border-line bg-panel" data-card={card.id} data-mode={mode}>
      <div className="grid gap-px bg-line lg:grid-cols-[0.9fr_1.1fr]">
        <div className="bg-ink p-5 text-white lg:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2"><ClinicChip>Misconception clinic</ClinicChip><ClinicChip accent="lime">Ch {card.chapter}</ClinicChip><ClinicChip accent="blue">{safeIndex + 1}/{cards.length}</ClinicChip></div>
            <span className="mono rounded-full border border-white/20 px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-white/70">{modeLabels[mode]}</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-white/60">{contextTitle}</p>
          <h3 className="display mt-2 text-3xl font-medium text-white">{card.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-white/70"><span className="text-white">Wrong sentence:</span> {card.misconception}</p>
          <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.04] p-4">
            <svg viewBox="0 0 430 260" role="img" aria-label={`${card.title} misconception repair diagram`} className="h-auto w-full">
              <defs>
                <linearGradient id={`clinic-grad-${card.chapter}-${safeIndex}-${modeIndex}`} x1="0" x2="1">
                  <stop offset="0%" stopColor="#ef4444" />
                  <stop offset="45%" stopColor="#f97316" />
                  <stop offset="100%" stopColor="#84cc16" />
                </linearGradient>
              </defs>
              <rect x="8" y="8" width="414" height="244" rx="24" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.14)" />
              <path d={geometry.path} fill="none" stroke={`url(#clinic-grad-${card.chapter}-${safeIndex}-${modeIndex})`} strokeWidth="5" strokeLinecap="round" strokeDasharray="10 10" className="rl-dash" />
              {geometry.nodes.map((node, index) => (
                <g key={node.label}>
                  <circle cx={node.x} cy={node.y} r={index === modeIndex % geometry.nodes.length ? 29 : 23} fill={index === modeIndex % geometry.nodes.length ? "#ef4444" : "rgba(255,255,255,0.12)"} stroke="rgba(255,255,255,0.55)" strokeWidth="2" />
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
          <p className="mt-4 rounded-lg border border-white/10 bg-white/[0.04] p-3 text-sm leading-relaxed text-white/70"><span className="text-white">Clinic rule:</span> never only say “wrong.” Explain why it sounded right, locate the missing distinction, repair the board, then test it.</p>
        </div>

        <div className="bg-panel p-5 lg:p-6">
          <div className="grid gap-4">
            <div>
              <p className="eyebrow mb-2">Choose misconception</p>
              <div className={`grid gap-2 ${compact || cards.length > 6 ? "max-h-72 overflow-auto pr-1" : "md:grid-cols-2"}`}>
                {cards.map((item, index) => (
                  <button key={item.id} onClick={() => setCardIndex(index)} className={`rounded-lg border px-3 py-2 text-left text-sm leading-snug transition ${index === safeIndex ? "border-orange bg-orange/[0.08] text-ink" : "border-line bg-white text-muted hover:border-orange hover:text-ink"}`}>
                    <span className="mono block text-[10px] uppercase tracking-[0.12em] text-dim">Ch {item.chapter}</span>
                    {item.title}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="eyebrow mb-2">Clinic mode</p>
              <div className="flex flex-wrap gap-2">
                {modes.map((item) => (
                  <button key={item} onClick={() => setMode(item)} className={`rounded-full border px-3 py-2 text-sm transition ${item === mode ? "border-orange bg-orange text-white" : "border-line bg-white text-muted hover:border-orange hover:text-ink"}`}>
                    {modeLabels[item]}
                  </button>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-line bg-white p-5">
              <div className="flex flex-wrap gap-2"><ClinicChip>Chapter {card.chapter}</ClinicChip><ClinicChip accent="blue">{card.tags[0]}</ClinicChip><ClinicChip accent="lime">{modeLabels[mode]}</ClinicChip></div>
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

function modeText(card: ChapterMisconceptionCard, mode: Mode) {
  return {
    mistake: card.misconception,
    temptation: card.whyTempting,
    repair: card.repair,
    technical: `${card.boardFix} ${card.technicalConsequence}`,
    check: card.selfCheck,
  }[mode];
}

function modeHeadline(mode: Mode) {
  return {
    mistake: "The wrong shortcut.",
    temptation: "Why smart readers fall for it.",
    repair: "The corrected mental model.",
    technical: "What changes in the formal story.",
    check: "Prove the repair works.",
  }[mode];
}

function ClinicChip({ children, accent = "cyan" }: { children: ReactNode; accent?: "cyan" | "lime" | "blue" }) {
  const color = {
    cyan: "border-cyan/30 bg-cyan/[0.08] text-cyan",
    lime: "border-lime/30 bg-lime/[0.08] text-lime",
    blue: "border-blue/30 bg-blue/[0.08] text-blue",
  }[accent];
  return <span className={`mono inline-flex rounded-full border px-2.5 py-1 text-[11px] ${color}`}>{children}</span>;
}

function geometryFor(cardIndex: number, modeIndex: number) {
  const layouts = [
    { path: "M58 94 C124 52 178 88 218 140 S322 210 372 86", nodes: [[58, 94, "wrong"], [140, 82, "why"], [218, 140, "split"], [316, 122, "repair"], [372, 86, "test"]] },
    { path: "M58 174 L130 82 L210 154 L292 74 L372 176", nodes: [[58, 174, "claim"], [130, 82, "tempt"], [210, 154, "object"], [292, 74, "formal"], [372, 176, "check"]] },
    { path: "M60 98 H140 V176 H224 V98 H368", nodes: [[60, 98, "hear"], [140, 98, "locate"], [140, 176, "draw"], [224, 176, "fix"], [368, 98, "own"]] },
  ];
  const layout = layouts[(cardIndex + modeIndex) % layouts.length];
  return { path: layout.path, nodes: layout.nodes.map(([x, y, label]) => ({ x: Number(x), y: Number(y), label: String(label) })) };
}

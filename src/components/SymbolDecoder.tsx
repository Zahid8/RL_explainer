"use client";

import { useMemo, useState } from "react";
import type { SymbolCard } from "@/lib/symbolAtlas";
import { symbolLectureModes, type SymbolLectureMode } from "@/lib/symbolAtlas";
import { TeX } from "@/components/Math";

type Accent = "cyan" | "orange" | "blue" | "violet" | "lime";

const modeLabels: Record<SymbolLectureMode, string> = {
  plain: "Plain meaning",
  technical: "Technical role",
  formula: "Formula context",
  pitfall: "Watch out",
  check: "Self-check",
};

export function SymbolDecoder({ cards, contextTitle = "Symbol decoder", compact = false }: { cards: SymbolCard[]; contextTitle?: string; compact?: boolean }) {
  const [index, setIndex] = useState(0);
  const [mode, setMode] = useState<SymbolLectureMode>("plain");
  const safeIndex = Math.min(index, Math.max(cards.length - 1, 0));
  const card = cards[safeIndex];
  const modeIndex = symbolLectureModes.indexOf(mode);
  const geometry = useMemo(() => symbolGeometry(safeIndex, modeIndex), [safeIndex, modeIndex]);

  if (!card) return null;

  return (
    <article className="symbol-decoder overflow-hidden rounded-xl border border-line bg-panel" data-symbol={card.id} data-mode={mode} data-symbol-count={cards.length}>
      <div className="grid gap-px bg-line lg:grid-cols-[0.92fr_1.08fr]">
        <div className="bg-ink p-5 text-white lg:p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="flex flex-wrap gap-2"><SymbolChip>Symbol decoder</SymbolChip><SymbolChip accent="lime">Ch {card.chapter}</SymbolChip><SymbolChip accent="blue">{safeIndex + 1}/{cards.length}</SymbolChip></div>
            <span className="mono rounded-full border border-white/20 px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-white/70">{modeLabels[mode]}</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-white/60">{contextTitle}</p>
          <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.04] p-4">
            <p className="mono text-[10px] uppercase tracking-[0.16em] text-white/50">Current mark</p>
            <div className="mt-2 text-4xl text-white"><TeX>{card.symbol}</TeX></div>
            <p className="mt-3 text-sm leading-relaxed text-white/70"><span className="text-white">Say it as:</span> {card.spokenAs}</p>
            <p className="mt-2 text-sm leading-relaxed text-white/70"><span className="text-white">Role:</span> {card.role}</p>
          </div>
          <svg viewBox="0 0 430 220" role="img" aria-label={`${card.symbol} symbol flow diagram`} className="mt-5 h-auto w-full">
            <defs>
              <linearGradient id={`symbol-grad-${card.chapter}-${safeIndex}-${modeIndex}`} x1="0" x2="1">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="50%" stopColor="#a78bfa" />
                <stop offset="100%" stopColor="#84cc16" />
              </linearGradient>
            </defs>
            <rect x="10" y="10" width="410" height="200" rx="24" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.14)" />
            <path d={geometry.path} fill="none" stroke={`url(#symbol-grad-${card.chapter}-${safeIndex}-${modeIndex})`} strokeWidth="5" strokeLinecap="round" strokeDasharray="10 10" className="rl-dash" />
            {geometry.nodes.map((node, nodeIndex) => (
              <g key={node.label}>
                <circle cx={node.x} cy={node.y} r={nodeIndex === modeIndex % geometry.nodes.length ? 27 : 21} fill={nodeIndex === modeIndex % geometry.nodes.length ? "#06b6d4" : "rgba(255,255,255,0.12)"} stroke="rgba(255,255,255,0.55)" strokeWidth="2" />
                <text x={node.x} y={node.y + 4} textAnchor="middle" className="fill-white text-[10px] font-semibold">{node.label}</text>
              </g>
            ))}
          </svg>
          <p className="mt-4 rounded-lg border border-white/10 bg-white/[0.04] p-3 text-sm leading-relaxed text-white/70"><span className="text-white">Lecture rule:</span> a symbol is learned only when you can say it, locate it in an equation, name the mistake it prevents, and use it in a self-check.</p>
        </div>

        <div className="bg-panel p-5 lg:p-6">
          <div className="grid gap-4">
            <div>
              <p className="eyebrow mb-2">Choose symbol</p>
              <div className={`grid gap-2 ${compact || cards.length > 8 ? "max-h-72 overflow-auto pr-1" : "md:grid-cols-2"}`}>
                {cards.map((item, cardIndex) => (
                  <button key={item.id} type="button" onClick={() => setIndex(cardIndex)} className={`rounded-lg border px-3 py-2 text-left text-sm leading-snug transition ${cardIndex === safeIndex ? "border-violet bg-violet/[0.08] text-ink" : "border-line bg-white text-muted hover:border-violet hover:text-ink"}`}>
                    <span className="mono block text-[10px] uppercase tracking-[0.12em] text-dim">Ch {item.chapter} · {item.family}</span>
                    <span className="block text-base text-ink"><TeX>{item.symbol}</TeX></span>
                    <span className="mt-1 block text-xs text-muted">{item.spokenAs}</span>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="eyebrow mb-2">Symbol mode</p>
              <div className="flex flex-wrap gap-2">
                {symbolLectureModes.map((item) => (
                  <button key={item} type="button" onClick={() => setMode(item)} className={`rounded-full border px-3 py-2 text-sm transition ${item === mode ? "border-violet bg-violet text-white" : "border-line bg-white text-muted hover:border-violet hover:text-ink"}`}>{modeLabels[item]}</button>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-line bg-white p-5">
              <div className="flex flex-wrap gap-2"><SymbolChip>Chapter {card.chapter}</SymbolChip><SymbolChip accent="violet">{modeLabels[mode]}</SymbolChip><SymbolChip accent="blue">{card.formulaLabels.length} formula link{card.formulaLabels.length === 1 ? "" : "s"}</SymbolChip></div>
              <h4 className="display mt-3 text-3xl font-medium text-ink">{modeHeadline(mode)}</h4>
              <div className="mt-4 text-sm leading-relaxed text-muted">{renderMode(card, mode)}</div>
              <div className="mt-4 flex flex-wrap gap-1.5">{card.tags.slice(0, 8).map((tag) => <span key={`${card.id}-${tag}`} className="mono rounded-full border border-line bg-panel-2 px-2 py-1 text-[10px] text-dim">{tag}</span>)}</div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function renderMode(card: SymbolCard, mode: SymbolLectureMode) {
  if (mode === "plain") return <p>{card.plain}</p>;
  if (mode === "technical") return <p>{card.technical}</p>;
  if (mode === "pitfall") return <p>{card.pitfall}</p>;
  if (mode === "check") return <p>{card.selfCheck}</p>;
  return (
    <div className="grid gap-3">
      <p>This symbol appears in: {card.formulaLabels.join("; ")}.</p>
      {card.formulaTex.slice(0, 2).map((tex) => <div key={tex} className="rounded-lg border border-line bg-panel-2 p-3"><TeX block>{tex}</TeX></div>)}
    </div>
  );
}

function modeHeadline(mode: SymbolLectureMode) {
  return {
    plain: "What does this mark mean in plain English?",
    technical: "What formal job does it do?",
    formula: "Where does it sit in the equation?",
    pitfall: "What mistake does this notation invite?",
    check: "Can you own it without looking?",
  }[mode];
}

function SymbolChip({ children, accent = "cyan" }: { children: React.ReactNode; accent?: Accent }) {
  const color = {
    cyan: "border-cyan/30 bg-cyan/[0.08] text-cyan",
    orange: "border-orange/30 bg-orange/[0.08] text-orange",
    blue: "border-blue/30 bg-blue/[0.08] text-blue",
    violet: "border-violet/30 bg-violet/[0.08] text-violet",
    lime: "border-lime/30 bg-lime/[0.08] text-lime",
  }[accent];
  return <span className={`mono inline-flex rounded-full border px-2.5 py-1 text-[11px] ${color}`}>{children}</span>;
}

function symbolGeometry(cardIndex: number, modeIndex: number) {
  const layouts = [
    { path: "M56 156 C104 62 162 68 214 120 S318 178 374 70", nodes: [[56, 156, "say"], [128, 72, "place"], [214, 120, "role"], [302, 126, "guard"], [374, 70, "own"]] },
    { path: "M54 92 H128 V160 H216 V92 H374", nodes: [[54, 92, "mark"], [128, 92, "object"], [128, 160, "target"], [216, 160, "error"], [374, 92, "check"]] },
    { path: "M58 164 L132 68 L214 142 L300 72 L372 166", nodes: [[58, 164, "plain"], [132, 68, "math"], [214, 142, "formula"], [300, 72, "risk"], [372, 166, "teach"]] },
  ];
  const layout = layouts[(cardIndex + modeIndex) % layouts.length];
  return { path: layout.path, nodes: layout.nodes.map(([x, y, label]) => ({ x: Number(x), y: Number(y), label: String(label) })) };
}

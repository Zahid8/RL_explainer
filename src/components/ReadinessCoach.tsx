"use client";

import { useMemo, useState, type ReactNode } from "react";
import { readinessModes, type ReadinessCoachCard, type ReadinessMode } from "@/lib/readinessCoach";

type Accent = "cyan" | "orange" | "blue" | "violet" | "lime";

const modeLabels: Record<ReadinessMode, string> = {
  diagnose: "Diagnose",
  bridge: "Bridge",
  visual: "Visualize",
  technical: "Technical",
  exit: "Exit check",
};

export function ReadinessCoach({ cards, contextTitle = "Readiness coach", compact = false }: { cards: ReadinessCoachCard[]; contextTitle?: string; compact?: boolean }) {
  const [index, setIndex] = useState(0);
  const [mode, setMode] = useState<ReadinessMode>("diagnose");
  const safeIndex = Math.min(index, Math.max(cards.length - 1, 0));
  const card = cards[safeIndex];
  const modeIndex = readinessModes.indexOf(mode);
  const geometry = useMemo(() => readinessGeometry(card?.stage ?? "entry", safeIndex, modeIndex), [card?.stage, safeIndex, modeIndex]);

  if (!card) return null;

  return (
    <article className="readiness-coach overflow-hidden rounded-xl border border-line bg-panel" data-readiness-card={card.id} data-mode={mode} data-card-count={cards.length}>
      <div className="grid gap-px bg-line lg:grid-cols-[0.92fr_1.08fr]">
        <div className="bg-ink p-5 text-white lg:p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="flex flex-wrap gap-2"><ReadyChip>Readiness coach</ReadyChip><ReadyChip accent="lime">Ch {card.chapter}</ReadyChip><ReadyChip accent="blue">{safeIndex + 1}/{cards.length}</ReadyChip></div>
            <span className="mono rounded-full border border-white/20 px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-white/70">{modeLabels[mode]}</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-white/60">{contextTitle}</p>
          <h3 className="display mt-2 text-3xl font-medium text-white">{card.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-white/70"><span className="text-white">Stage:</span> {card.stageLabel} · {card.part}</p>
          <svg viewBox="0 0 430 250" role="img" aria-label={`${card.title} readiness diagram`} className="mt-5 h-auto w-full">
            <defs>
              <linearGradient id={`ready-grad-${card.chapter}-${safeIndex}-${modeIndex}`} x1="0" x2="1">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="50%" stopColor="#a78bfa" />
                <stop offset="100%" stopColor="#84cc16" />
              </linearGradient>
            </defs>
            <rect x="10" y="10" width="410" height="230" rx="24" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.14)" />
            <path d={geometry.path} fill="none" stroke={`url(#ready-grad-${card.chapter}-${safeIndex}-${modeIndex})`} strokeWidth="5" strokeLinecap="round" strokeDasharray="9 10" className="rl-dash" />
            {geometry.nodes.map((node, nodeIndex) => (
              <g key={node.label}>
                <circle cx={node.x} cy={node.y} r={nodeIndex === modeIndex % geometry.nodes.length ? 28 : 22} fill={nodeIndex === modeIndex % geometry.nodes.length ? "#06b6d4" : "rgba(255,255,255,0.12)"} stroke="rgba(255,255,255,0.55)" strokeWidth="2" />
                <text x={node.x} y={node.y + 4} textAnchor="middle" className="fill-white text-[10px] font-semibold">{node.label}</text>
              </g>
            ))}
            <foreignObject x="34" y="178" width="362" height="42">
              <div className="rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-xs leading-snug text-white/75">
                Diagnose → repair prerequisite → draw → name technical target → exit.
              </div>
            </foreignObject>
          </svg>
          <p className="mt-4 rounded-lg border border-white/10 bg-white/[0.04] p-3 text-sm leading-relaxed text-white/70"><span className="text-white">Readiness rule:</span> do not enter a chapter cold; diagnose the missing idea, repair it on the board, then pass an exit check.</p>
        </div>

        <div className="bg-panel p-5 lg:p-6">
          <div className="grid gap-4">
            <div>
              <p className="eyebrow mb-2">Choose checkpoint</p>
              <div className={`grid gap-2 ${compact || cards.length > 6 ? "max-h-72 overflow-auto pr-1" : "md:grid-cols-2"}`}>
                {cards.map((item, cardIndex) => (
                  <button key={item.id} type="button" onClick={() => setIndex(cardIndex)} className={`rounded-lg border px-3 py-2 text-left text-sm leading-snug transition ${cardIndex === safeIndex ? "border-cyan bg-cyan/[0.08] text-ink" : "border-line bg-white text-muted hover:border-cyan hover:text-ink"}`}>
                    <span className="mono block text-[10px] uppercase tracking-[0.12em] text-dim">Ch {item.chapter} · {item.stageLabel}</span>
                    {item.title}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="eyebrow mb-2">Readiness mode</p>
              <div className="flex flex-wrap gap-2">
                {readinessModes.map((item) => (
                  <button key={item} type="button" onClick={() => setMode(item)} className={`rounded-full border px-3 py-2 text-sm transition ${item === mode ? "border-cyan bg-cyan text-white" : "border-line bg-white text-muted hover:border-cyan hover:text-ink"}`}>{modeLabels[item]}</button>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-line bg-white p-5">
              <div className="flex flex-wrap gap-2"><ReadyChip>Chapter {card.chapter}</ReadyChip><ReadyChip accent="violet">{card.stageLabel}</ReadyChip><ReadyChip accent="lime">{card.rescueSteps.length} repairs</ReadyChip></div>
              <h4 className="display mt-3 text-3xl font-medium text-ink">{modeHeadline(mode)}</h4>
              <div className="mt-4 text-sm leading-relaxed text-muted">{renderMode(card, mode)}</div>
              <a href={card.route} className="mono mt-5 inline-flex rounded-full border border-cyan bg-cyan px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-white hover:bg-white hover:text-cyan">Open chapter readiness</a>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function renderMode(card: ReadinessCoachCard, mode: ReadinessMode) {
  if (mode === "diagnose") return <div className="grid gap-3"><p>{card.entryQuestion}</p><PrereqRow prerequisites={card.prerequisites} /></div>;
  if (mode === "bridge") return <div className="grid gap-3"><p>{card.noviceBridge}</p><NumberedList items={card.rescueSteps.slice(0, 2)} accent="cyan" /></div>;
  if (mode === "visual") return <div className="rounded-lg border border-violet/30 bg-violet/[0.06] p-4"><p>{card.visualModel}</p></div>;
  if (mode === "technical") return <div className="grid gap-3"><p><span className="font-medium text-ink">Technical target:</span> {card.technicalTarget}</p><NumberedList items={card.rescueSteps.slice(2, 4)} accent="violet" /></div>;
  return <div className="grid gap-3"><p>{card.exitCheck}</p><NumberedList items={card.rescueSteps.slice(4)} accent="lime" /></div>;
}

function NumberedList({ items, accent }: { items: string[]; accent: Accent }) {
  const color = accent === "lime" ? "text-lime" : accent === "violet" ? "text-violet" : "text-cyan";
  return <ol className="grid gap-2">{items.map((item, itemIndex) => <li key={item} className="flex gap-2"><span className={color}>{itemIndex + 1}.</span><span>{item}</span></li>)}</ol>;
}

function modeHeadline(mode: ReadinessMode) {
  return {
    diagnose: "What must you already be able to say?",
    bridge: "Repair the missing beginner idea.",
    visual: "Draw the board before the formula.",
    technical: "Name the exact target the chapter will use.",
    exit: "Pass this check before moving on.",
  }[mode];
}

function PrereqRow({ prerequisites }: { prerequisites: string[] }) {
  return <div className="flex flex-wrap gap-1.5">{prerequisites.slice(0, 8).map((item) => <span key={item} className="mono rounded-full border border-line bg-panel-2 px-2 py-1 text-[10px] text-dim">{item}</span>)}</div>;
}

function ReadyChip({ children, accent = "cyan" }: { children: ReactNode; accent?: Accent }) {
  const color = {
    cyan: "border-cyan/30 bg-cyan/[0.08] text-cyan",
    orange: "border-orange/30 bg-orange/[0.08] text-orange",
    blue: "border-blue/30 bg-blue/[0.08] text-blue",
    violet: "border-violet/30 bg-violet/[0.08] text-violet",
    lime: "border-lime/30 bg-lime/[0.08] text-lime",
  }[accent];
  return <span className={`mono inline-flex rounded-full border px-2.5 py-1 text-[11px] ${color}`}>{children}</span>;
}

function readinessGeometry(stage: string, cardIndex: number, modeIndex: number) {
  const layouts = {
    entry: { path: "M58 174 C102 90 166 84 214 126 S314 190 374 78", nodes: [[58, 174, "loop"], [134, 90, "word"], [214, 126, "board"], [302, 126, "target"], [374, 78, "exit"]] },
    math: { path: "M56 86 H132 V178 H218 V86 H374", nodes: [[56, 86, "quantity"], [132, 86, "data"], [132, 178, "target"], [218, 178, "symbol"], [374, 86, "check"]] },
    method: { path: "M58 176 L124 82 L210 148 L296 78 L372 174", nodes: [[58, 176, "data"], [124, 82, "target"], [210, 148, "update"], [296, 78, "test"], [372, 174, "transfer"]] },
  } as const;
  const fallback = layouts.entry;
  const layout = layouts[stage as keyof typeof layouts] ?? fallback;
  return { path: layout.path, nodes: layout.nodes.map(([x, y, label], index) => ({ x: Number(x) + ((cardIndex + modeIndex + index) % 2 === 0 ? 0 : 2), y: Number(y), label: String(label) })) };
}

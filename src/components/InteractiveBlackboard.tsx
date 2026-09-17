"use client";

import { useMemo, useState, type ReactNode } from "react";
import type { ChapterBlackboard } from "@/lib/interactiveBlackboards";

export function InteractiveBlackboard({ board, compact = false }: { board: ChapterBlackboard; compact?: boolean }) {
  const [active, setActive] = useState(0);
  const [showTechnical, setShowTechnical] = useState(true);
  const stage = board.stages[active];
  const progress = `${active + 1}/${board.stages.length}`;
  const accent = accentForChapter(board.chapter);
  const geometry = useMemo(() => geometryForChapter(board.chapter, active), [board.chapter, active]);

  return (
    <article className="interactive-blackboard overflow-hidden rounded-xl border border-line bg-panel" data-chapter={board.chapter}>
      <div className="grid gap-px bg-line lg:grid-cols-[0.95fr_1.05fr]">
        <div className="bg-ink p-5 text-white lg:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2"><BoardChip accent="cyan">Interactive blackboard</BoardChip><BoardChip accent="lime">Ch {board.chapter}</BoardChip></div>
            <span className="mono rounded-full border border-white/20 px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-white/70">{progress}</span>
          </div>
          <h3 className="display mt-4 text-3xl font-medium text-white">{board.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-white/70">{board.prompt}</p>
          <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.04] p-4">
            <svg viewBox="0 0 420 250" role="img" aria-label={`${board.title} visual stage ${stage.label}`} className="h-auto w-full">
              <defs>
                <linearGradient id={`grad-${board.chapter}`} x1="0" x2="1">
                  <stop offset="0%" stopColor={accent.primary} />
                  <stop offset="100%" stopColor={accent.secondary} />
                </linearGradient>
                <filter id={`glow-${board.chapter}`} x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="5" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>
              <rect x="8" y="8" width="404" height="234" rx="24" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.14)" />
              <path d={geometry.path} fill="none" stroke={`url(#grad-${board.chapter})`} strokeWidth="5" strokeLinecap="round" strokeDasharray="10 10" className="rl-dash" />
              {geometry.nodes.map((node, index) => (
                <g key={`${node.label}-${index}`} filter={index === active % geometry.nodes.length ? `url(#glow-${board.chapter})` : undefined}>
                  <circle cx={node.x} cy={node.y} r={node.r} fill={index === active % geometry.nodes.length ? accent.primary : "rgba(255,255,255,0.12)"} stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
                  <text x={node.x} y={node.y + 4} textAnchor="middle" className="fill-white text-[11px] font-semibold">{node.label}</text>
                </g>
              ))}
              <foreignObject x="34" y="178" width="352" height="48">
                <div className="rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-xs leading-snug text-white/75">{stage.visualCue}</div>
              </foreignObject>
            </svg>
          </div>
          <p className="mt-4 rounded-lg border border-white/10 bg-white/[0.04] p-3 text-sm leading-relaxed text-white/70"><span className="text-white">Board metaphor:</span> {board.metaphor}</p>
        </div>

        <div className="bg-panel p-5 lg:p-6">
          <div className="flex flex-wrap gap-2">
            {board.stages.map((item, index) => (
              <button key={item.label} onClick={() => setActive(index)} className={`rounded-full border px-3 py-2 text-sm transition ${index === active ? "border-cyan bg-cyan text-white" : "border-line bg-white text-muted hover:border-cyan hover:text-ink"}`}>
                {index + 1}. {item.label}
              </button>
            ))}
          </div>
          <div className="mt-5 rounded-xl border border-line bg-white p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="eyebrow">Current board move</p>
                <h4 className="display mt-2 text-3xl font-medium text-ink">{stage.label}</h4>
              </div>
              <button onClick={() => setShowTechnical((value) => !value)} className="mono rounded-full border border-line bg-panel px-3 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan hover:text-ink">
                {showTechnical ? "Hide" : "Show"} technical
              </button>
            </div>
            <div className={`mt-4 grid gap-3 ${compact ? "" : "md:grid-cols-2"}`}>
              <MiniBoard label="Beginner explanation" text={stage.beginner} />
              <MiniBoard label="Board note" text={stage.boardNote} tint />
              {showTechnical ? <MiniBoard label="Technical explanation" text={stage.technical} tint /> : null}
              <MiniBoard label="Self-check" text={stage.check} />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function MiniBoard({ label, text, tint = false }: { label: string; text: string; tint?: boolean }) {
  return (
    <div className={`rounded-lg border border-line ${tint ? "bg-panel-2" : "bg-white"} p-3`}>
      <p className="mono mb-2 text-[10px] uppercase tracking-[0.14em] text-dim">{label}</p>
      <p className="text-sm leading-relaxed text-muted">{text}</p>
    </div>
  );
}

function BoardChip({ children, accent = "cyan" }: { children: ReactNode; accent?: "cyan" | "lime" }) {
  const color = {
    cyan: "border-cyan/30 bg-cyan/[0.08] text-cyan",
    lime: "border-lime/30 bg-lime/[0.08] text-lime",
  }[accent];
  return <span className={`mono inline-flex rounded-full border px-2.5 py-1 text-[11px] ${color}`}>{children}</span>;
}

function accentForChapter(chapter: number) {
  const palette = [
    { primary: "#06b6d4", secondary: "#84cc16" },
    { primary: "#3b82f6", secondary: "#f59e0b" },
    { primary: "#8b5cf6", secondary: "#06b6d4" },
    { primary: "#84cc16", secondary: "#3b82f6" },
  ];
  return palette[chapter % palette.length];
}

function geometryForChapter(chapter: number, active: number) {
  const layouts = [
    { path: "M70 130 C110 55 190 55 220 130 S330 205 360 110", nodes: [[70, 130, "sense"], [180, 84, "act"], [270, 166, "value"], [360, 110, "update"]] },
    { path: "M58 190 L120 85 L190 150 L260 62 L345 172", nodes: [[58, 190, "try"], [120, 85, "reward"], [190, 150, "error"], [260, 62, "target"], [345, 172, "policy"]] },
    { path: "M70 80 H170 V170 H270 V80 H350", nodes: [[70, 80, "state"], [170, 80, "action"], [170, 170, "reward"], [270, 170, "next"], [350, 80, "check"]] },
  ];
  const layout = layouts[(chapter + active) % layouts.length];
  return { path: layout.path, nodes: layout.nodes.map(([x, y, label]) => ({ x: Number(x), y: Number(y), r: 24, label: String(label) })) };
}

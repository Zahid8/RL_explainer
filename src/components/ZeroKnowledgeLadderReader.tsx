"use client";

import { useMemo, useState, type ReactNode } from "react";
import type { ZeroKnowledgeLadder } from "@/lib/zeroKnowledgeLadders";

const modes = ["plain", "visual", "technical", "practice"] as const;

type Mode = (typeof modes)[number];

const modeLabels: Record<Mode, string> = {
  plain: "Plain start",
  visual: "Board picture",
  technical: "Technical pass",
  practice: "Try it",
};

export function ZeroKnowledgeLadderReader({ ladders, contextTitle = "Zero-knowledge RL primer", compact = false }: { ladders: ZeroKnowledgeLadder[]; contextTitle?: string; compact?: boolean }) {
  const [chapterIndex, setChapterIndex] = useState(0);
  const [rungIndex, setRungIndex] = useState(0);
  const [mode, setMode] = useState<Mode>("plain");
  const safeChapterIndex = Math.min(chapterIndex, Math.max(ladders.length - 1, 0));
  const ladder = ladders[safeChapterIndex];
  const safeRungIndex = Math.min(rungIndex, Math.max((ladder?.rungs.length ?? 1) - 1, 0));
  const rung = ladder?.rungs[safeRungIndex];
  const modeIndex = modes.indexOf(mode);
  const geometry = useMemo(() => geometryFor(safeChapterIndex, safeRungIndex, modeIndex), [safeChapterIndex, safeRungIndex, modeIndex]);

  if (!ladder || !rung) return null;

  return (
    <article className="zero-knowledge-reader overflow-hidden rounded-xl border border-line bg-panel" data-chapter={ladder.chapter} data-rung={rung.title} data-mode={mode}>
      <div className="grid gap-px bg-line lg:grid-cols-[0.92fr_1.08fr]">
        <div className="bg-ink p-5 text-white lg:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2"><ReaderChip>Zero-knowledge ladder</ReaderChip><ReaderChip accent="lime">Ch {ladder.chapter}</ReaderChip><ReaderChip accent="blue">{safeRungIndex + 1}/{ladder.rungs.length}</ReaderChip></div>
            <span className="mono rounded-full border border-white/20 px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-white/70">{modeLabels[mode]}</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-white/60">{contextTitle}</p>
          <h3 className="display mt-2 text-3xl font-medium text-white">{ladder.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-white/70">{ladder.promise}</p>
          <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.04] p-4">
            <svg viewBox="0 0 430 260" role="img" aria-label={`${ladder.title} ${rung.title} starter ladder diagram`} className="h-auto w-full">
              <defs>
                <linearGradient id={`zk-grad-${ladder.chapter}-${safeRungIndex}-${modeIndex}`} x1="0" x2="1">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="45%" stopColor="#84cc16" />
                  <stop offset="100%" stopColor="#f97316" />
                </linearGradient>
              </defs>
              <rect x="8" y="8" width="414" height="244" rx="24" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.14)" />
              <path d={geometry.path} fill="none" stroke={`url(#zk-grad-${ladder.chapter}-${safeRungIndex}-${modeIndex})`} strokeWidth="5" strokeLinecap="round" strokeDasharray="10 10" className="rl-dash" />
              {geometry.nodes.map((node, index) => (
                <g key={node.label}>
                  <circle cx={node.x} cy={node.y} r={index === modeIndex % geometry.nodes.length ? 29 : 23} fill={index === modeIndex % geometry.nodes.length ? "#06b6d4" : "rgba(255,255,255,0.12)"} stroke="rgba(255,255,255,0.55)" strokeWidth="2" />
                  <text x={node.x} y={node.y + 4} textAnchor="middle" className="fill-white text-[10px] font-semibold">{node.label}</text>
                </g>
              ))}
              <foreignObject x="30" y="184" width="370" height="54">
                <div className="rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-xs leading-snug text-white/75">
                  {rung.tags.slice(0, 5).join(" • ")}
                </div>
              </foreignObject>
            </svg>
          </div>
          <p className="mt-4 rounded-lg border border-white/10 bg-white/[0.04] p-3 text-sm leading-relaxed text-white/70"><span className="text-white">No prior RL assumed:</span> each rung starts with an everyday picture, then earns the technical wording.</p>
        </div>

        <div className="bg-panel p-5 lg:p-6">
          <div className="grid gap-4">
            <div>
              <p className="eyebrow mb-2">Choose chapter ladder</p>
              <div className={`grid gap-2 ${compact || ladders.length > 4 ? "max-h-56 overflow-auto pr-1" : "md:grid-cols-2"}`}>
                {ladders.map((item, index) => (
                  <button key={item.chapter} onClick={() => { setChapterIndex(index); setRungIndex(0); }} className={`rounded-lg border px-3 py-2 text-left text-sm leading-snug transition ${index === safeChapterIndex ? "border-cyan bg-cyan/[0.08] text-ink" : "border-line bg-white text-muted hover:border-cyan hover:text-ink"}`}>
                    <span className="mono block text-[10px] uppercase tracking-[0.12em] text-dim">Chapter {item.chapter}</span>
                    {item.title}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="eyebrow mb-2">Choose rung</p>
              <div className="grid gap-2 md:grid-cols-2">
                {ladder.rungs.map((item, index) => (
                  <button key={item.title} onClick={() => setRungIndex(index)} className={`rounded-lg border px-3 py-2 text-left text-sm leading-snug transition ${index === safeRungIndex ? "border-lime bg-lime/[0.08] text-ink" : "border-line bg-white text-muted hover:border-lime hover:text-ink"}`}>
                    <span className="mono block text-[10px] uppercase tracking-[0.12em] text-dim">Rung {index + 1}</span>
                    {item.title}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="eyebrow mb-2">Learning mode</p>
              <div className="flex flex-wrap gap-2">
                {modes.map((item) => (
                  <button key={item} onClick={() => setMode(item)} className={`rounded-full border px-3 py-2 text-sm transition ${item === mode ? "border-cyan bg-cyan text-white" : "border-line bg-white text-muted hover:border-cyan hover:text-ink"}`}>
                    {modeLabels[item]}
                  </button>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-line bg-white p-5">
              <div className="flex flex-wrap gap-2"><ReaderChip>Chapter {ladder.chapter}</ReaderChip><ReaderChip accent="blue">{rung.tags[0]}</ReaderChip><ReaderChip accent="lime">{modeLabels[mode]}</ReaderChip></div>
              <h4 className="display mt-3 text-3xl font-medium text-ink">{rung.title}</h4>
              <p className="mt-4 text-sm leading-relaxed text-muted">{modeText(rung, mode)}</p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function modeText(rung: ZeroKnowledgeLadder["rungs"][number], mode: Mode) {
  return {
    plain: rung.plain,
    visual: rung.visual,
    technical: rung.technical,
    practice: rung.practice,
  }[mode];
}

function ReaderChip({ children, accent = "cyan" }: { children: ReactNode; accent?: "cyan" | "lime" | "blue" }) {
  const color = {
    cyan: "border-cyan/30 bg-cyan/[0.08] text-cyan",
    lime: "border-lime/30 bg-lime/[0.08] text-lime",
    blue: "border-blue/30 bg-blue/[0.08] text-blue",
  }[accent];
  return <span className={`mono inline-flex rounded-full border px-2.5 py-1 text-[11px] ${color}`}>{children}</span>;
}

function geometryFor(chapterIndex: number, rungIndex: number, modeIndex: number) {
  const layouts = [
    { path: "M58 188 L118 70 L196 142 L284 78 L368 174", nodes: [[58, 188, "story"], [118, 70, "draw"], [196, 142, "name"], [284, 78, "math"], [368, 174, "try"]] },
    { path: "M60 98 H140 V176 H222 V98 H368", nodes: [[60, 98, "see"], [140, 98, "act"], [140, 176, "score"], [222, 176, "update"], [368, 98, "own"]] },
    { path: "M62 148 C112 54 186 78 222 142 S320 202 370 90", nodes: [[62, 148, "zero"], [150, 78, "picture"], [236, 154, "term"], [326, 100, "check"]] },
  ];
  const layout = layouts[(chapterIndex + rungIndex + modeIndex) % layouts.length];
  return { path: layout.path, nodes: layout.nodes.map(([x, y, label]) => ({ x: Number(x), y: Number(y), label: String(label) })) };
}

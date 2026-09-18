"use client";

import { useMemo, useState, type ReactNode } from "react";
import type { CaseStudyMode, ChapterCaseStudy } from "@/lib/caseStudies";

type Accent = "cyan" | "orange" | "blue" | "violet" | "lime";

const caseStudyModes = ["scene", "walkthrough", "technical", "debug", "transfer"] as const satisfies readonly CaseStudyMode[];

const modeLabels: Record<CaseStudyMode, string> = {
  scene: "Scene",
  walkthrough: "Walkthrough",
  technical: "Technical",
  debug: "Debug",
  transfer: "Transfer",
};

export function CaseStudyStudio({ cases, contextTitle = "Case study studio", compact = false }: { cases: ChapterCaseStudy[]; contextTitle?: string; compact?: boolean }) {
  const [index, setIndex] = useState(0);
  const [mode, setMode] = useState<CaseStudyMode>("scene");
  const safeIndex = Math.min(index, Math.max(cases.length - 1, 0));
  const card = cases[safeIndex];
  const modeIndex = caseStudyModes.indexOf(mode);
  const board = useMemo(() => caseGeometry(safeIndex, modeIndex), [safeIndex, modeIndex]);

  if (!card) return null;

  return (
    <article className="case-study-studio overflow-hidden rounded-xl border border-line bg-panel" data-case-card={card.id} data-mode={mode} data-card-count={cases.length}>
      <div className="grid gap-px bg-line lg:grid-cols-[1fr_1fr]">
        <div className="bg-panel-2 p-5 lg:p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="flex flex-wrap gap-2"><CaseChip>Case study</CaseChip><CaseChip accent="blue">Ch {card.chapter}</CaseChip><CaseChip accent="lime">{safeIndex + 1}/{cases.length}</CaseChip><CaseChip accent="orange">{card.sourceLabel}</CaseChip></div>
            <span className="mono rounded-full border border-line bg-white px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-muted">{modeLabels[mode]}</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted">{contextTitle}</p>
          <h3 className="display mt-2 text-3xl font-medium text-ink">{card.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted"><span className="font-medium text-ink">Case goal:</span> {card.learnerGoal}</p>
          <svg viewBox="0 0 460 286" role="img" aria-label={`${card.title} case map`} className="mt-5 h-auto w-full">
            <defs>
              <linearGradient id={`case-grad-${card.chapter}-${safeIndex}-${modeIndex}`} x1="0" x2="1">
                <stop offset="0%" stopColor="#14b8a6" />
                <stop offset="50%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#f97316" />
              </linearGradient>
            </defs>
            <rect x="10" y="10" width="440" height="266" rx="26" fill="white" stroke="rgba(15,23,42,0.12)" />
            <path d={board.path} fill="none" stroke={`url(#case-grad-${card.chapter}-${safeIndex}-${modeIndex})`} strokeWidth="5" strokeLinecap="round" strokeDasharray="10 9" className="rl-dash" />
            <g>
              <rect x="34" y="38" width="132" height="62" rx="17" fill="#ecfeff" stroke="rgba(6,182,212,0.34)" />
              <text x="100" y="66" textAnchor="middle" className="fill-ink text-[10px] font-semibold">case world</text>
              <text x="100" y="82" textAnchor="middle" className="fill-muted text-[8px]">concrete situation</text>
            </g>
            <g>
              <rect x="294" y="38" width="132" height="62" rx="17" fill="#fff7ed" stroke="rgba(249,115,22,0.34)" />
              <text x="360" y="66" textAnchor="middle" className="fill-ink text-[10px] font-semibold">RL machinery</text>
              <text x="360" y="82" textAnchor="middle" className="fill-muted text-[8px]">data target update</text>
            </g>
            {board.nodes.map((node, nodeIndex) => {
              const active = nodeIndex === modeIndex % board.nodes.length;
              return (
                <g key={node.label}>
                  <circle cx={node.x} cy={node.y} r={active ? 30 : 22} fill={active ? "#14b8a6" : "#f8fafc"} stroke="rgba(15,23,42,0.25)" strokeWidth="2" />
                  <text x={node.x} y={node.y + 4} textAnchor="middle" className={active ? "fill-white text-[9px] font-semibold" : "fill-ink text-[9px] font-semibold"}>{node.label}</text>
                </g>
              );
            })}
            <foreignObject x="42" y="224" width="376" height="42">
              <div className="rounded-lg border border-line bg-panel px-3 py-2 text-xs leading-snug text-muted">
                Case rule: identify the world, replay the loop, name the technical objects, debug the failure, then transfer it.
              </div>
            </foreignObject>
          </svg>
        </div>

        <div className="bg-panel p-5 lg:p-6">
          <div className="grid gap-4">
            <div>
              <p className="eyebrow mb-2">Choose case</p>
              <div className={`grid gap-2 ${compact || cases.length > 8 ? "max-h-72 overflow-auto pr-1" : "md:grid-cols-2"}`}>
                {cases.map((item, cardIndex) => (
                  <button key={item.id} type="button" onClick={() => setIndex(cardIndex)} className={`rounded-lg border px-3 py-2 text-left text-sm leading-snug transition ${cardIndex === safeIndex ? "border-cyan bg-cyan/[0.08] text-ink" : "border-line bg-white text-muted hover:border-cyan hover:text-ink"}`}>
                    <span className="mono block text-[10px] uppercase tracking-[0.12em] text-dim">Ch {item.chapter} · {item.sourceLabel}</span>
                    {item.title}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="eyebrow mb-2">Case mode</p>
              <div className="flex flex-wrap gap-2">
                {caseStudyModes.map((item) => (
                  <button key={item} type="button" onClick={() => setMode(item)} className={`rounded-full border px-3 py-2 text-sm transition ${item === mode ? "border-cyan bg-cyan text-white" : "border-line bg-white text-muted hover:border-cyan hover:text-ink"}`}>{modeLabels[item]}</button>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-line bg-white p-5">
              <div className="flex flex-wrap gap-2"><CaseChip accent="blue">Chapter {card.chapter}</CaseChip><CaseChip accent="lime">{modeLabels[mode]}</CaseChip><CaseChip accent="orange">{card.sourceLabel}</CaseChip></div>
              <h4 className="display mt-3 text-3xl font-medium text-ink">{modeHeadline(mode)}</h4>
              <div className="mt-4 text-sm leading-relaxed text-muted">{renderMode(card, mode)}</div>
              <a href={card.route} className="mono mt-5 inline-flex rounded-full border border-cyan bg-cyan px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-white hover:bg-white hover:text-cyan">Open chapter cases</a>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function renderMode(card: ChapterCaseStudy, mode: CaseStudyMode) {
  if (mode === "scene") return <div className="grid gap-3"><p>{card.scene}</p><TagRow tags={card.tags} /></div>;
  if (mode === "walkthrough") return <div className="grid gap-3"><p>{card.walkthrough}</p><ol className="grid gap-2">{card.boardFrames.map((step, index) => <li key={step} className="flex gap-2"><span className="text-cyan">{index + 1}.</span><span>{step}</span></li>)}</ol></div>;
  if (mode === "technical") return <div className="rounded-lg border border-violet/25 bg-violet/[0.06] p-4"><p>{card.technicalPass}</p></div>;
  if (mode === "debug") return <div className="grid gap-3"><p>{card.debugProbe}</p><ul className="grid gap-2">{card.successCriteria.map((item) => <li key={item} className="flex gap-2"><span className="text-lime">✓</span><span>{item}</span></li>)}</ul></div>;
  return <div className="grid gap-3"><p>{card.transferChallenge}</p><p><span className="font-medium text-ink">Success test:</span> replay the case in a new domain and keep the data, target, update, failure, and transfer bridge separate.</p></div>;
}

function modeHeadline(mode: CaseStudyMode) {
  return {
    scene: "Place the chapter in one concrete world.",
    walkthrough: "Replay the loop as board frames.",
    technical: "Translate the case into exact RL objects.",
    debug: "Find the first way the case can fail.",
    transfer: "Move the case to a new domain.",
  }[mode];
}

function TagRow({ tags }: { tags: string[] }) {
  return <div className="flex flex-wrap gap-1.5">{tags.slice(0, 9).map((tag) => <span key={tag} className="mono rounded-full border border-line bg-panel-2 px-2 py-1 text-[10px] text-dim">{tag}</span>)}</div>;
}

function CaseChip({ children, accent = "cyan" }: { children: ReactNode; accent?: Accent }) {
  const color = {
    cyan: "border-cyan/30 bg-cyan/[0.08] text-cyan",
    orange: "border-orange/30 bg-orange/[0.08] text-orange",
    blue: "border-blue/30 bg-blue/[0.08] text-blue",
    violet: "border-violet/30 bg-violet/[0.08] text-violet",
    lime: "border-lime/30 bg-lime/[0.08] text-lime",
  }[accent];
  return <span className={`mono inline-flex rounded-full border px-2.5 py-1 text-[11px] ${color}`}>{children}</span>;
}

function caseGeometry(cardIndex: number, modeIndex: number) {
  const layouts = [
    { path: "M74 160 C130 112 172 186 230 140 S324 108 388 160", nodes: [[74, 160, "world"], [150, 126, "choice"], [230, 140, "feedback"], [312, 126, "update"], [388, 160, "transfer"]] },
    { path: "M72 178 L150 122 L230 178 L310 122 L390 178", nodes: [[72, 178, "setup"], [150, 122, "data"], [230, 178, "target"], [310, 122, "debug"], [390, 178, "reuse"]] },
    { path: "M76 126 C130 86 172 204 232 170 S322 96 384 132", nodes: [[76, 126, "scene"], [148, 126, "trace"], [232, 170, "object"], [322, 132, "risk"], [384, 132, "new"]] },
  ];
  const layout = layouts[(cardIndex + modeIndex) % layouts.length];
  return { path: layout.path, nodes: layout.nodes.map(([x, y, label]) => ({ x: Number(x), y: Number(y), label: String(label) })) };
}

"use client";

import { useMemo, useState, type ReactNode } from "react";
import type { SectionTextbookLesson } from "@/lib/sectionNarratives";

const sectionLessonModes = ["from scratch", "technical", "board", "formula", "algorithm", "self-check"] as const;

type Mode = (typeof sectionLessonModes)[number];

const modeLabels: Record<Mode, string> = {
  "from scratch": "From scratch",
  technical: "Technical",
  board: "Board walk",
  formula: "Formula bridge",
  algorithm: "Algorithm bridge",
  "self-check": "Self-check",
};

export function SectionLessonReader({ lessons, chapterTitle, compact = false }: { lessons: SectionTextbookLesson[]; chapterTitle: string; compact?: boolean }) {
  const [sectionIndex, setSectionIndex] = useState(0);
  const [mode, setMode] = useState<Mode>("from scratch");
  const lesson = lessons[Math.min(sectionIndex, Math.max(lessons.length - 1, 0))];
  const modeIndex = sectionLessonModes.indexOf(mode);
  const progress = lessons.length ? `${sectionIndex + 1}/${lessons.length}` : "0/0";
  const geometry = useMemo(() => geometryFor(sectionIndex, modeIndex), [sectionIndex, modeIndex]);

  if (!lesson) return null;

  return (
    <article className="section-lesson-reader overflow-hidden rounded-xl border border-line bg-panel" data-chapter={lesson.chapter} data-mode={mode}>
      <div className="grid gap-px bg-line lg:grid-cols-[0.9fr_1.1fr]">
        <div className="bg-ink p-5 text-white lg:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2"><ReaderChip>Guided section lecture</ReaderChip><ReaderChip accent="lime">{progress}</ReaderChip></div>
            <span className="mono rounded-full border border-white/20 px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-white/70">{modeLabels[mode]}</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-white/60">{chapterTitle}</p>
          <h3 className="display mt-2 text-3xl font-medium text-white">{lesson.section}</h3>
          <p className="mt-3 text-sm leading-relaxed text-white/70">{lesson.opener}</p>
          <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.04] p-4">
            <svg viewBox="0 0 430 250" role="img" aria-label={`${lesson.section} guided lecture diagram`} className="h-auto w-full">
              <defs>
                <linearGradient id={`section-grad-${lesson.chapter}-${sectionIndex}-${modeIndex}`} x1="0" x2="1">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="55%" stopColor="#84cc16" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
              <rect x="8" y="8" width="414" height="234" rx="24" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.14)" />
              <path d={geometry.path} fill="none" stroke={`url(#section-grad-${lesson.chapter}-${sectionIndex}-${modeIndex})`} strokeWidth="5" strokeLinecap="round" strokeDasharray="10 10" className="rl-dash" />
              {geometry.nodes.map((node, index) => (
                <g key={node.label}>
                  <circle cx={node.x} cy={node.y} r={index === modeIndex % geometry.nodes.length ? 28 : 23} fill={index === modeIndex % geometry.nodes.length ? "#06b6d4" : "rgba(255,255,255,0.12)"} stroke="rgba(255,255,255,0.55)" strokeWidth="2" />
                  <text x={node.x} y={node.y + 4} textAnchor="middle" className="fill-white text-[10px] font-semibold">{node.label}</text>
                </g>
              ))}
              <foreignObject x="30" y="176" width="370" height="50">
                <div className="rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-xs leading-snug text-white/75">{lesson.terms.slice(0, 4).join(" • ") || "section terms"}</div>
              </foreignObject>
            </svg>
          </div>
          <p className="mt-4 rounded-lg border border-white/10 bg-white/[0.04] p-3 text-sm leading-relaxed text-white/70"><span className="text-white">Lecture control:</span> pick a section, then switch modes to move from intuition to math, algorithm use, and recall.</p>
        </div>

        <div className="bg-panel p-5 lg:p-6">
          <div className="grid gap-4">
            <div>
              <p className="eyebrow mb-2">Choose section</p>
              <div className={`grid gap-2 ${compact ? "max-h-60 overflow-auto pr-1" : "md:grid-cols-2"}`}>
                {lessons.map((item, index) => (
                  <button key={item.section} onClick={() => setSectionIndex(index)} className={`rounded-lg border px-3 py-2 text-left text-sm leading-snug transition ${index === sectionIndex ? "border-cyan bg-cyan/[0.08] text-ink" : "border-line bg-white text-muted hover:border-cyan hover:text-ink"}`}>
                    <span className="mono block text-[10px] uppercase tracking-[0.12em] text-dim">Section {index + 1}</span>
                    {item.section}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="eyebrow mb-2">Lecture mode</p>
              <div className="flex flex-wrap gap-2">
                {sectionLessonModes.map((item) => (
                  <button key={item} onClick={() => setMode(item)} className={`rounded-full border px-3 py-2 text-sm transition ${item === mode ? "border-cyan bg-cyan text-white" : "border-line bg-white text-muted hover:border-cyan hover:text-ink"}`}>
                    {modeLabels[item]}
                  </button>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-line bg-white p-5">
              <div className="flex flex-wrap gap-2"><ReaderChip>{modeLabels[mode]}</ReaderChip><ReaderChip accent="blue">Ch {lesson.chapter}</ReaderChip></div>
              <h4 className="display mt-3 text-3xl font-medium text-ink">{modeHeadline(mode)}</h4>
              <ModeContent lesson={lesson} mode={mode} />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function ModeContent({ lesson, mode }: { lesson: SectionTextbookLesson; mode: Mode }) {
  if (mode === "board") {
    return (
      <ol className="mt-4 grid gap-2 text-sm leading-relaxed text-muted">
        {lesson.boardWalkthrough.map((step, index) => <li key={step} className="flex gap-2"><span className="text-cyan">{index + 1}.</span><span>{step}</span></li>)}
      </ol>
    );
  }

  const text = {
    "from scratch": lesson.fromScratch,
    technical: lesson.technicalPass,
    formula: lesson.formulaBridge,
    algorithm: lesson.algorithmBridge,
    "self-check": `${lesson.selfCheck} ${lesson.nextLink}`,
  }[mode];

  return <p className="mt-4 text-sm leading-relaxed text-muted">{text}</p>;
}

function modeHeadline(mode: Mode) {
  return {
    "from scratch": "Start before symbols.",
    technical: "Translate into precise RL language.",
    board: "Draw the mechanism step by step.",
    formula: "Connect prose to compact notation.",
    algorithm: "See how algorithms will use it.",
    "self-check": "Prove you own the idea.",
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

function geometryFor(sectionIndex: number, modeIndex: number) {
  const layouts = [
    { path: "M62 130 C112 60 175 70 213 130 S326 198 368 96", nodes: [[62, 130, "idea"], [152, 82, "terms"], [238, 154, "target"], [326, 102, "check"]] },
    { path: "M58 185 L122 70 L205 142 L284 76 L366 180", nodes: [[58, 185, "story"], [122, 70, "math"], [205, 142, "update"], [284, 76, "policy"], [366, 180, "test"]] },
    { path: "M66 82 H160 V166 H256 V82 H360", nodes: [[66, 82, "state"], [160, 82, "action"], [160, 166, "reward"], [256, 166, "value"], [360, 82, "next"]] },
  ];
  const layout = layouts[(sectionIndex + modeIndex) % layouts.length];
  return { path: layout.path, nodes: layout.nodes.map(([x, y, label]) => ({ x: Number(x), y: Number(y), label: String(label) })) };
}

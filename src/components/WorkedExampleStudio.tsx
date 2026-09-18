"use client";

import { useMemo, useState, type ReactNode } from "react";
import type { ChapterWorkedExample } from "@/lib/chapterWorkedExamples";

const modes = ["scenario", "board", "trace", "debug", "check"] as const;

type Mode = (typeof modes)[number];

const modeLabels: Record<Mode, string> = {
  scenario: "Scenario",
  board: "Board steps",
  trace: "Technical trace",
  debug: "Pitfall",
  check: "Try it",
};

export function WorkedExampleStudio({ examples, contextTitle = "Worked example studio", compact = false }: { examples: ChapterWorkedExample[]; contextTitle?: string; compact?: boolean }) {
  const [exampleIndex, setExampleIndex] = useState(0);
  const [mode, setMode] = useState<Mode>("scenario");
  const safeIndex = Math.min(exampleIndex, Math.max(examples.length - 1, 0));
  const example = examples[safeIndex];
  const modeIndex = modes.indexOf(mode);
  const geometry = useMemo(() => geometryFor(safeIndex, modeIndex), [safeIndex, modeIndex]);

  if (!example) return null;

  return (
    <article className="worked-example-studio overflow-hidden rounded-xl border border-line bg-panel" data-example={example.id} data-mode={mode}>
      <div className="grid gap-px bg-line lg:grid-cols-[0.9fr_1.1fr]">
        <div className="bg-ink p-5 text-white lg:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2"><StudioChip>Worked example studio</StudioChip><StudioChip accent="lime">Ch {example.chapter}</StudioChip><StudioChip accent="blue">{safeIndex + 1}/{examples.length}</StudioChip></div>
            <span className="mono rounded-full border border-white/20 px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-white/70">{modeLabels[mode]}</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-white/60">{contextTitle}</p>
          <h3 className="display mt-2 text-3xl font-medium text-white">{example.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-white/70"><span className="text-white">Kind:</span> {example.kind}</p>
          <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.04] p-4">
            <svg viewBox="0 0 430 260" role="img" aria-label={`${example.title} worked example diagram`} className="h-auto w-full">
              <defs>
                <linearGradient id={`worked-grad-${example.chapter}-${safeIndex}-${modeIndex}`} x1="0" x2="1">
                  <stop offset="0%" stopColor="#f97316" />
                  <stop offset="48%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#84cc16" />
                </linearGradient>
              </defs>
              <rect x="8" y="8" width="414" height="244" rx="24" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.14)" />
              <path d={geometry.path} fill="none" stroke={`url(#worked-grad-${example.chapter}-${safeIndex}-${modeIndex})`} strokeWidth="5" strokeLinecap="round" strokeDasharray="10 10" className="rl-dash" />
              {geometry.nodes.map((node, index) => (
                <g key={node.label}>
                  <circle cx={node.x} cy={node.y} r={index === modeIndex % geometry.nodes.length ? 29 : 23} fill={index === modeIndex % geometry.nodes.length ? "#f97316" : "rgba(255,255,255,0.12)"} stroke="rgba(255,255,255,0.55)" strokeWidth="2" />
                  <text x={node.x} y={node.y + 4} textAnchor="middle" className="fill-white text-[10px] font-semibold">{node.label}</text>
                </g>
              ))}
              <foreignObject x="30" y="184" width="370" height="54">
                <div className="rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-xs leading-snug text-white/75">
                  {example.tags.slice(0, 5).join(" • ")}
                </div>
              </foreignObject>
            </svg>
          </div>
          <p className="mt-4 rounded-lg border border-white/10 bg-white/[0.04] p-3 text-sm leading-relaxed text-white/70"><span className="text-white">How to use:</span> read the scenario, draw the board, follow the trace, inspect the pitfall, then solve the mini exercise without looking.</p>
        </div>

        <div className="bg-panel p-5 lg:p-6">
          <div className="grid gap-4">
            <div>
              <p className="eyebrow mb-2">Choose worked example</p>
              <div className={`grid gap-2 ${compact || examples.length > 6 ? "max-h-72 overflow-auto pr-1" : "md:grid-cols-2"}`}>
                {examples.map((item, index) => (
                  <button key={item.id} onClick={() => setExampleIndex(index)} className={`rounded-lg border px-3 py-2 text-left text-sm leading-snug transition ${index === safeIndex ? "border-orange bg-orange/[0.08] text-ink" : "border-line bg-white text-muted hover:border-orange hover:text-ink"}`}>
                    <span className="mono block text-[10px] uppercase tracking-[0.12em] text-dim">Ch {item.chapter} · {item.kind}</span>
                    {item.title}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="eyebrow mb-2">Example mode</p>
              <div className="flex flex-wrap gap-2">
                {modes.map((item) => (
                  <button key={item} onClick={() => setMode(item)} className={`rounded-full border px-3 py-2 text-sm transition ${item === mode ? "border-orange bg-orange text-white" : "border-line bg-white text-muted hover:border-orange hover:text-ink"}`}>
                    {modeLabels[item]}
                  </button>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-line bg-white p-5">
              <div className="flex flex-wrap gap-2"><StudioChip>Chapter {example.chapter}</StudioChip><StudioChip accent="blue">{example.kind}</StudioChip><StudioChip accent="lime">{modeLabels[mode]}</StudioChip></div>
              <h4 className="display mt-3 text-3xl font-medium text-ink">{modeHeadline(mode)}</h4>
              {mode === "board" ? (
                <ol className="mt-4 grid gap-2 text-sm leading-relaxed text-muted">
                  {example.boardSteps.map((step, index) => <li key={step} className="flex gap-2"><span className="text-orange">{index + 1}.</span><span>{step}</span></li>)}
                </ol>
              ) : (
                <p className="mt-4 text-sm leading-relaxed text-muted">{modeText(example, mode)}</p>
              )}
              <div className="mt-4 flex flex-wrap gap-1.5">
                {example.tags.map((tag) => <span key={tag} className="mono rounded-full border border-line bg-panel-2 px-2 py-1 text-[10px] text-dim">{tag}</span>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function modeText(example: ChapterWorkedExample, mode: Mode) {
  return {
    scenario: `${example.scenario} ${example.plainWalkthrough}`,
    board: example.boardSteps.join(" "),
    trace: example.technicalTrace,
    debug: example.pitfall,
    check: `${example.miniExercise} Check: ${example.answerCheck}`,
  }[mode];
}

function modeHeadline(mode: Mode) {
  return {
    scenario: "Make the abstract idea concrete.",
    board: "Draw the sequence before symbols.",
    trace: "Translate the story into technical roles.",
    debug: "The tempting mistake to avoid.",
    check: "Own it with a small task.",
  }[mode];
}

function StudioChip({ children, accent = "cyan" }: { children: ReactNode; accent?: "cyan" | "lime" | "blue" }) {
  const color = {
    cyan: "border-cyan/30 bg-cyan/[0.08] text-cyan",
    lime: "border-lime/30 bg-lime/[0.08] text-lime",
    blue: "border-blue/30 bg-blue/[0.08] text-blue",
  }[accent];
  return <span className={`mono inline-flex rounded-full border px-2.5 py-1 text-[11px] ${color}`}>{children}</span>;
}

function geometryFor(exampleIndex: number, modeIndex: number) {
  const layouts = [
    { path: "M58 176 C112 72 184 72 224 136 S324 206 374 86", nodes: [[58, 176, "case"], [138, 80, "draw"], [224, 136, "target"], [314, 118, "fix"], [374, 86, "try"]] },
    { path: "M58 92 H130 V176 H218 V92 H370", nodes: [[58, 92, "set"], [130, 92, "act"], [130, 176, "see"], [218, 176, "update"], [370, 92, "test"]] },
    { path: "M58 174 L118 74 L202 140 L288 78 L372 178", nodes: [[58, 174, "old"], [118, 74, "data"], [202, 140, "target"], [288, 78, "error"], [372, 178, "new"]] },
  ];
  const layout = layouts[(exampleIndex + modeIndex) % layouts.length];
  return { path: layout.path, nodes: layout.nodes.map(([x, y, label]) => ({ x: Number(x), y: Number(y), label: String(label) })) };
}

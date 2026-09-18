"use client";

import { useMemo, useState, type ReactNode } from "react";
import type { AlgorithmDebugCard, AlgorithmDebugMode } from "@/lib/algorithmDebug";
import { algorithmDebugModes } from "@/lib/algorithmDebug";

type Accent = "cyan" | "orange" | "blue" | "violet" | "lime";

const modeLabels: Record<AlgorithmDebugMode, string> = {
  symptom: "Symptom",
  diagnose: "Diagnose",
  repair: "Repair",
  test: "Test fixture",
  transfer: "Transfer",
};

export function AlgorithmDebugClinic({ cards, contextTitle = "Algorithm debugging clinic", compact = false }: { cards: AlgorithmDebugCard[]; contextTitle?: string; compact?: boolean }) {
  const [index, setIndex] = useState(0);
  const [mode, setMode] = useState<AlgorithmDebugMode>("symptom");
  const safeIndex = Math.min(index, Math.max(cards.length - 1, 0));
  const card = cards[safeIndex];
  const modeIndex = algorithmDebugModes.indexOf(mode);
  const geometry = useMemo(() => debugGeometry(safeIndex, modeIndex), [safeIndex, modeIndex]);

  if (!card) return null;

  return (
    <article className="algorithm-debug-clinic overflow-hidden rounded-xl border border-line bg-panel" data-debug-card={card.id} data-mode={mode} data-card-count={cards.length}>
      <div className="grid gap-px bg-line lg:grid-cols-[0.92fr_1.08fr]">
        <div className="bg-ink p-5 text-white lg:p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="flex flex-wrap gap-2"><DebugChip>Algorithm debugging clinic</DebugChip><DebugChip accent="lime">Ch {card.chapter}</DebugChip><DebugChip accent="blue">{safeIndex + 1}/{cards.length}</DebugChip></div>
            <span className="mono rounded-full border border-white/20 px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-white/70">{modeLabels[mode]}</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-white/60">{contextTitle}</p>
          <h3 className="display mt-2 text-3xl font-medium text-white">{card.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-white/70"><span className="text-white">Family:</span> {card.family}</p>
          <svg viewBox="0 0 430 250" role="img" aria-label={`${card.title} debugging diagram`} className="mt-5 h-auto w-full">
            <defs>
              <linearGradient id={`debug-grad-${card.chapter}-${safeIndex}-${modeIndex}`} x1="0" x2="1">
                <stop offset="0%" stopColor="#fb923c" />
                <stop offset="48%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#84cc16" />
              </linearGradient>
            </defs>
            <rect x="10" y="10" width="410" height="230" rx="24" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.14)" />
            <path d={geometry.path} fill="none" stroke={`url(#debug-grad-${card.chapter}-${safeIndex}-${modeIndex})`} strokeWidth="5" strokeLinecap="round" strokeDasharray="10 10" className="rl-dash" />
            {geometry.nodes.map((node, nodeIndex) => (
              <g key={node.label}>
                <circle cx={node.x} cy={node.y} r={nodeIndex === modeIndex % geometry.nodes.length ? 28 : 22} fill={nodeIndex === modeIndex % geometry.nodes.length ? "#fb923c" : "rgba(255,255,255,0.12)"} stroke="rgba(255,255,255,0.55)" strokeWidth="2" />
                <text x={node.x} y={node.y + 4} textAnchor="middle" className="fill-white text-[10px] font-semibold">{node.label}</text>
              </g>
            ))}
            <foreignObject x="34" y="178" width="362" height="42">
              <div className="rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-xs leading-snug text-white/75">
                Symptom → isolate → repair one cause → retest → transfer.
              </div>
            </foreignObject>
          </svg>
          <p className="mt-4 rounded-lg border border-white/10 bg-white/[0.04] p-3 text-sm leading-relaxed text-white/70"><span className="text-white">Debug rule:</span> do not tune a mystery; name the symptom, isolate the assumption, repair one cause, then retest.</p>
        </div>

        <div className="bg-panel p-5 lg:p-6">
          <div className="grid gap-4">
            <div>
              <p className="eyebrow mb-2">Choose algorithm</p>
              <div className={`grid gap-2 ${compact || cards.length > 6 ? "max-h-72 overflow-auto pr-1" : "md:grid-cols-2"}`}>
                {cards.map((item, cardIndex) => (
                  <button key={item.id} type="button" onClick={() => setIndex(cardIndex)} className={`rounded-lg border px-3 py-2 text-left text-sm leading-snug transition ${cardIndex === safeIndex ? "border-orange bg-orange/[0.08] text-ink" : "border-line bg-white text-muted hover:border-orange hover:text-ink"}`}>
                    <span className="mono block text-[10px] uppercase tracking-[0.12em] text-dim">Ch {item.chapter} · {item.family}</span>
                    {item.title}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="eyebrow mb-2">Debug mode</p>
              <div className="flex flex-wrap gap-2">
                {algorithmDebugModes.map((item) => (
                  <button key={item} type="button" onClick={() => setMode(item)} className={`rounded-full border px-3 py-2 text-sm transition ${item === mode ? "border-orange bg-orange text-white" : "border-line bg-white text-muted hover:border-orange hover:text-ink"}`}>{modeLabels[item]}</button>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-line bg-white p-5">
              <div className="flex flex-wrap gap-2"><DebugChip>Chapter {card.chapter}</DebugChip><DebugChip accent="orange">{modeLabels[mode]}</DebugChip><DebugChip accent="blue">{card.diagnosis.length} checks</DebugChip></div>
              <h4 className="display mt-3 text-3xl font-medium text-ink">{modeHeadline(mode)}</h4>
              <div className="mt-4 text-sm leading-relaxed text-muted">{renderMode(card, mode)}</div>
              <a href={card.route} className="mono mt-5 inline-flex rounded-full border border-orange bg-orange px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-white hover:bg-white hover:text-orange">Open chapter debug</a>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function renderMode(card: AlgorithmDebugCard, mode: AlgorithmDebugMode) {
  if (mode === "symptom") return <div className="grid gap-3"><p>{card.plainSymptom}</p><p><span className="font-medium text-ink">Technical frame:</span> {card.technicalFrame}</p><TagRow tags={card.tags} /></div>;
  if (mode === "diagnose") return <NumberedList items={card.diagnosis} accent="cyan" />;
  if (mode === "repair") return <NumberedList items={card.repairPlan} accent="orange" />;
  if (mode === "test") return <NumberedList items={card.testFixture} accent="lime" />;
  return <div className="rounded-lg border border-violet/30 bg-violet/[0.06] p-4"><p>{card.transfer}</p></div>;
}

function NumberedList({ items, accent }: { items: string[]; accent: Accent }) {
  const color = accent === "orange" ? "text-orange" : accent === "lime" ? "text-lime" : "text-cyan";
  return <ol className="grid gap-2">{items.map((item, itemIndex) => <li key={item} className="flex gap-2"><span className={color}>{itemIndex + 1}.</span><span>{item}</span></li>)}</ol>;
}

function modeHeadline(mode: AlgorithmDebugMode) {
  return {
    symptom: "What is the visible failure?",
    diagnose: "Which assumption or trace broke first?",
    repair: "Change one cause, not every knob.",
    test: "Prove the repair on a tiny fixture.",
    transfer: "Move the debug habit to the next task.",
  }[mode];
}

function TagRow({ tags }: { tags: string[] }) {
  return <div className="flex flex-wrap gap-1.5">{tags.slice(0, 8).map((tag) => <span key={tag} className="mono rounded-full border border-line bg-panel-2 px-2 py-1 text-[10px] text-dim">{tag}</span>)}</div>;
}

function DebugChip({ children, accent = "cyan" }: { children: ReactNode; accent?: Accent }) {
  const color = {
    cyan: "border-cyan/30 bg-cyan/[0.08] text-cyan",
    orange: "border-orange/30 bg-orange/[0.08] text-orange",
    blue: "border-blue/30 bg-blue/[0.08] text-blue",
    violet: "border-violet/30 bg-violet/[0.08] text-violet",
    lime: "border-lime/30 bg-lime/[0.08] text-lime",
  }[accent];
  return <span className={`mono inline-flex rounded-full border px-2.5 py-1 text-[11px] ${color}`}>{children}</span>;
}

function debugGeometry(cardIndex: number, modeIndex: number) {
  const layouts = [
    { path: "M58 170 C106 82 164 78 218 130 S318 196 374 82", nodes: [[58, 170, "symptom"], [136, 84, "trace"], [218, 130, "cause"], [306, 126, "repair"], [374, 82, "test"]] },
    { path: "M56 88 H132 V176 H220 V88 H374", nodes: [[56, 88, "data"], [132, 88, "target"], [132, 176, "error"], [220, 176, "update"], [374, 88, "proof"]] },
    { path: "M58 174 L128 78 L214 148 L300 76 L372 174", nodes: [[58, 174, "log"], [128, 78, "isolate"], [214, 148, "patch"], [300, 76, "rerun"], [372, 174, "transfer"]] },
  ];
  const layout = layouts[(cardIndex + modeIndex) % layouts.length];
  return { path: layout.path, nodes: layout.nodes.map(([x, y, label]) => ({ x: Number(x), y: Number(y), label: String(label) })) };
}

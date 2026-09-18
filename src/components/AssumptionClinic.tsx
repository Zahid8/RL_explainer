"use client";

import { useMemo, useState, type ReactNode } from "react";
import type { AssumptionClinicCard, AssumptionClinicMode } from "@/lib/assumptionClinic";
import { assumptionClinicModes } from "@/lib/assumptionClinic";

type Accent = "cyan" | "orange" | "blue" | "violet" | "lime";

const modeLabels: Record<AssumptionClinicMode, string> = {
  plain: "Plain stakes",
  assumption: "Assumptions",
  guarantee: "Guarantee",
  failure: "Failure mode",
  repair: "Repair plan",
};

export function AssumptionClinic({ cards, contextTitle = "Assumption and guarantee clinic", compact = false }: { cards: AssumptionClinicCard[]; contextTitle?: string; compact?: boolean }) {
  const [index, setIndex] = useState(0);
  const [mode, setMode] = useState<AssumptionClinicMode>("plain");
  const safeIndex = Math.min(index, Math.max(cards.length - 1, 0));
  const card = cards[safeIndex];
  const modeIndex = assumptionClinicModes.indexOf(mode);
  const geometry = useMemo(() => clinicGeometry(safeIndex, modeIndex), [safeIndex, modeIndex]);

  if (!card) return null;

  return (
    <article className="assumption-clinic overflow-hidden rounded-xl border border-line bg-panel" data-assumption-card={card.id} data-mode={mode} data-card-count={cards.length}>
      <div className="grid gap-px bg-line lg:grid-cols-[0.9fr_1.1fr]">
        <div className="bg-panel-2 p-5 lg:p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="flex flex-wrap gap-2"><ClinicChip>Assumption clinic</ClinicChip><ClinicChip accent="lime">Ch {card.chapter}</ClinicChip><ClinicChip accent="blue">{safeIndex + 1}/{cards.length}</ClinicChip></div>
            <span className="mono rounded-full border border-line bg-white px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-muted">{modeLabels[mode]}</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted">{contextTitle}</p>
          <h3 className="display mt-2 text-3xl font-medium text-ink">{card.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted"><span className="font-medium text-ink">Family:</span> {card.family}</p>
          <svg viewBox="0 0 430 250" role="img" aria-label={`${card.title} assumption clinic diagram`} className="mt-5 h-auto w-full">
            <defs>
              <linearGradient id={`assumption-grad-${card.chapter}-${safeIndex}-${modeIndex}`} x1="0" x2="1">
                <stop offset="0%" stopColor="#84cc16" />
                <stop offset="48%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#fb923c" />
              </linearGradient>
            </defs>
            <rect x="10" y="10" width="410" height="230" rx="24" fill="white" stroke="rgba(15,23,42,0.12)" />
            <path d={geometry.path} fill="none" stroke={`url(#assumption-grad-${card.chapter}-${safeIndex}-${modeIndex})`} strokeWidth="5" strokeLinecap="round" strokeDasharray="9 9" className="rl-dash" />
            {geometry.nodes.map((node, nodeIndex) => (
              <g key={node.label}>
                <circle cx={node.x} cy={node.y} r={nodeIndex === modeIndex % geometry.nodes.length ? 28 : 22} fill={nodeIndex === modeIndex % geometry.nodes.length ? "#84cc16" : "#f8fafc"} stroke="rgba(15,23,42,0.28)" strokeWidth="2" />
                <text x={node.x} y={node.y + 4} textAnchor="middle" className="fill-ink text-[10px] font-semibold">{node.label}</text>
              </g>
            ))}
            <foreignObject x="34" y="180" width="362" height="42">
              <div className="rounded-lg border border-line bg-panel px-3 py-2 text-xs leading-snug text-muted">
                Assumption → target → guarantee → breakage → repair.
              </div>
            </foreignObject>
          </svg>
          <p className="mt-4 rounded-lg border border-orange/20 bg-orange/[0.06] p-3 text-sm leading-relaxed text-muted"><span className="font-medium text-ink">Clinic rule:</span> never ask whether an algorithm works in general. Ask which world, data, target, update, and representation would make its guarantee honest.</p>
        </div>

        <div className="bg-panel p-5 lg:p-6">
          <div className="grid gap-4">
            <div>
              <p className="eyebrow mb-2">Choose method</p>
              <div className={`grid gap-2 ${compact || cards.length > 6 ? "max-h-72 overflow-auto pr-1" : "md:grid-cols-2"}`}>
                {cards.map((item, cardIndex) => (
                  <button key={item.id} type="button" onClick={() => setIndex(cardIndex)} className={`rounded-lg border px-3 py-2 text-left text-sm leading-snug transition ${cardIndex === safeIndex ? "border-lime bg-lime/[0.08] text-ink" : "border-line bg-white text-muted hover:border-lime hover:text-ink"}`}>
                    <span className="mono block text-[10px] uppercase tracking-[0.12em] text-dim">Ch {item.chapter} · {item.family}</span>
                    {item.title}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="eyebrow mb-2">Clinic mode</p>
              <div className="flex flex-wrap gap-2">
                {assumptionClinicModes.map((item) => (
                  <button key={item} type="button" onClick={() => setMode(item)} className={`rounded-full border px-3 py-2 text-sm transition ${item === mode ? "border-lime bg-lime text-ink" : "border-line bg-white text-muted hover:border-lime hover:text-ink"}`}>{modeLabels[item]}</button>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-line bg-white p-5">
              <div className="flex flex-wrap gap-2"><ClinicChip>Chapter {card.chapter}</ClinicChip><ClinicChip accent="lime">{modeLabels[mode]}</ClinicChip><ClinicChip accent="orange">{card.assumptions.length} assumptions</ClinicChip></div>
              <h4 className="display mt-3 text-3xl font-medium text-ink">{modeHeadline(mode)}</h4>
              <div className="mt-4 text-sm leading-relaxed text-muted">{renderMode(card, mode)}</div>
              <a href={card.route} className="mono mt-5 inline-flex rounded-full border border-lime bg-lime px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-ink hover:bg-white">Open algorithm card</a>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function renderMode(card: AssumptionClinicCard, mode: AssumptionClinicMode) {
  if (mode === "plain") return <div className="grid gap-3"><p>{card.plain}</p><p><span className="font-medium text-ink">Diagnostic:</span> {card.diagnostic}</p><TagRow tags={card.tags} /></div>;
  if (mode === "assumption") return <NumberedList items={card.assumptions} accent="cyan" />;
  if (mode === "guarantee") return <div className="rounded-lg border border-lime/30 bg-lime/[0.06] p-4"><p>{card.guarantee}</p></div>;
  if (mode === "failure") return <div className="rounded-lg border border-orange/30 bg-orange/[0.06] p-4"><p>{card.failure}</p><p className="mt-3"><span className="font-medium text-ink">First diagnostic:</span> {card.diagnostic}</p></div>;
  return <NumberedList items={card.repair} accent="orange" />;
}

function NumberedList({ items, accent }: { items: string[]; accent: Accent }) {
  return <ol className="grid gap-2">{items.map((item, itemIndex) => <li key={item} className="flex gap-2"><span className={accent === "orange" ? "text-orange" : "text-cyan"}>{itemIndex + 1}.</span><span>{item}</span></li>)}</ol>;
}

function modeHeadline(mode: AssumptionClinicMode) {
  return {
    plain: "What has to be true?",
    assumption: "The world this update assumes.",
    guarantee: "The promise if those assumptions hold.",
    failure: "How the promise breaks.",
    repair: "How to repair the setup.",
  }[mode];
}

function TagRow({ tags }: { tags: string[] }) {
  return <div className="flex flex-wrap gap-1.5">{tags.slice(0, 8).map((tag) => <span key={tag} className="mono rounded-full border border-line bg-panel-2 px-2 py-1 text-[10px] text-dim">{tag}</span>)}</div>;
}

function ClinicChip({ children, accent = "cyan" }: { children: ReactNode; accent?: Accent }) {
  const color = {
    cyan: "border-cyan/30 bg-cyan/[0.08] text-cyan",
    orange: "border-orange/30 bg-orange/[0.08] text-orange",
    blue: "border-blue/30 bg-blue/[0.08] text-blue",
    violet: "border-violet/30 bg-violet/[0.08] text-violet",
    lime: "border-lime/30 bg-lime/[0.08] text-lime",
  }[accent];
  return <span className={`mono inline-flex rounded-full border px-2.5 py-1 text-[11px] ${color}`}>{children}</span>;
}

function clinicGeometry(cardIndex: number, modeIndex: number) {
  const layouts = [
    { path: "M54 170 C112 72 174 72 218 132 S322 196 374 76", nodes: [[54, 170, "world"], [134, 82, "data"], [218, 132, "target"], [306, 126, "proof"], [374, 76, "fix"]] },
    { path: "M58 86 H130 L214 176 L300 86 H374", nodes: [[58, 86, "state"], [130, 86, "policy"], [214, 176, "error"], [300, 86, "risk"], [374, 86, "repair"]] },
    { path: "M58 174 L130 96 L214 146 L300 72 L372 174", nodes: [[58, 174, "sample"], [130, 96, "assume"], [214, 146, "learn"], [300, 72, "break"], [372, 174, "test"]] },
  ];
  const layout = layouts[(cardIndex + modeIndex) % layouts.length];
  return { path: layout.path, nodes: layout.nodes.map(([x, y, label]) => ({ x: Number(x), y: Number(y), label: String(label) })) };
}

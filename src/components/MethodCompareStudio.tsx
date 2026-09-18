"use client";

import { useMemo, useState, type ReactNode } from "react";
import type { MethodCompareCard, MethodCompareMode } from "@/lib/methodCompare";

type Accent = "cyan" | "orange" | "blue" | "violet" | "lime";

const methodCompareModes = ["choose", "axis", "tradeoff", "failure", "bridge"] as const satisfies readonly MethodCompareMode[];

const modeLabels: Record<MethodCompareMode, string> = {
  choose: "Choose",
  axis: "Axes",
  tradeoff: "Tradeoff",
  failure: "Failure",
  bridge: "Bridge",
};

export function MethodCompareStudio({ cards, contextTitle = "Method comparison studio", compact = false }: { cards: MethodCompareCard[]; contextTitle?: string; compact?: boolean }) {
  const [index, setIndex] = useState(0);
  const [mode, setMode] = useState<MethodCompareMode>("choose");
  const safeIndex = Math.min(index, Math.max(cards.length - 1, 0));
  const card = cards[safeIndex];
  const modeIndex = methodCompareModes.indexOf(mode);
  const geometry = useMemo(() => compareGeometry(safeIndex, modeIndex), [safeIndex, modeIndex]);

  if (!card) return null;

  return (
    <article className="method-compare-studio overflow-hidden rounded-xl border border-line bg-panel" data-method-card={card.id} data-mode={mode} data-card-count={cards.length}>
      <div className="grid gap-px bg-line lg:grid-cols-[0.92fr_1.08fr]">
        <div className="bg-panel-2 p-5 lg:p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="flex flex-wrap gap-2"><CompareChip>Method comparison</CompareChip><CompareChip accent="blue">Ch {card.chapter}</CompareChip><CompareChip accent="lime">{safeIndex + 1}/{cards.length}</CompareChip><CompareChip accent="orange">{card.family}</CompareChip></div>
            <span className="mono rounded-full border border-line bg-white px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-muted">{modeLabels[mode]}</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted">{contextTitle}</p>
          <h3 className="display mt-2 text-3xl font-medium text-ink">{card.algorithmName}</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted"><span className="font-medium text-ink">Compared with:</span> {card.compareWith}</p>
          <svg viewBox="0 0 440 260" role="img" aria-label={`${card.algorithmName} method comparison diagram`} className="mt-5 h-auto w-full">
            <defs>
              <linearGradient id={`method-compare-grad-${card.chapter}-${safeIndex}-${modeIndex}`} x1="0" x2="1">
                <stop offset="0%" stopColor="#0ea5e9" />
                <stop offset="45%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#f97316" />
              </linearGradient>
            </defs>
            <rect x="10" y="10" width="420" height="240" rx="24" fill="white" stroke="rgba(15,23,42,0.12)" />
            <path d={geometry.path} fill="none" stroke={`url(#method-compare-grad-${card.chapter}-${safeIndex}-${modeIndex})`} strokeWidth="5" strokeLinecap="round" strokeDasharray="8 10" className="rl-dash" />
            <g>
              <rect x="34" y="42" width="144" height="58" rx="16" fill="#ecfeff" stroke="rgba(14,165,233,0.36)" />
              <text x="106" y="68" textAnchor="middle" className="fill-ink text-[10px] font-semibold">current method</text>
              <text x="106" y="84" textAnchor="middle" className="fill-muted text-[8px]">target / data / backup</text>
            </g>
            <g>
              <rect x="262" y="42" width="144" height="58" rx="16" fill="#fff7ed" stroke="rgba(249,115,22,0.36)" />
              <text x="334" y="68" textAnchor="middle" className="fill-ink text-[10px] font-semibold">contrast method</text>
              <text x="334" y="84" textAnchor="middle" className="fill-muted text-[8px]">different bargain</text>
            </g>
            {geometry.nodes.map((node, nodeIndex) => {
              const active = nodeIndex === modeIndex % geometry.nodes.length;
              return (
                <g key={node.label}>
                  <circle cx={node.x} cy={node.y} r={active ? 29 : 22} fill={active ? "#8b5cf6" : "#f8fafc"} stroke="rgba(15,23,42,0.28)" strokeWidth="2" />
                  <text x={node.x} y={node.y + 4} textAnchor="middle" className={active ? "fill-white text-[10px] font-semibold" : "fill-ink text-[10px] font-semibold"}>{node.label}</text>
                </g>
              );
            })}
            <foreignObject x="38" y="196" width="364" height="44">
              <div className="rounded-lg border border-line bg-panel px-3 py-2 text-xs leading-snug text-muted">
                Compare by available data, target, model use, backup depth, variance, bias, and stability.
              </div>
            </foreignObject>
          </svg>
          <p className="mt-4 rounded-lg border border-violet/20 bg-violet/[0.06] p-3 text-sm leading-relaxed text-muted"><span className="font-medium text-ink">Selection rule:</span> first draw the same tiny transition or episode, then mark the exact line where the two methods build different targets or pressure the policy differently.</p>
        </div>

        <div className="bg-panel p-5 lg:p-6">
          <div className="grid gap-4">
            <div>
              <p className="eyebrow mb-2">Choose method card</p>
              <div className={`grid gap-2 ${compact || cards.length > 8 ? "max-h-72 overflow-auto pr-1" : "md:grid-cols-2"}`}>
                {cards.map((item, cardIndex) => (
                  <button key={item.id} type="button" onClick={() => setIndex(cardIndex)} className={`rounded-lg border px-3 py-2 text-left text-sm leading-snug transition ${cardIndex === safeIndex ? "border-violet bg-violet/[0.08] text-ink" : "border-line bg-white text-muted hover:border-violet hover:text-ink"}`}>
                    <span className="mono block text-[10px] uppercase tracking-[0.12em] text-dim">Ch {item.chapter} · {item.family}</span>
                    {item.algorithmName}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="eyebrow mb-2">Comparison mode</p>
              <div className="flex flex-wrap gap-2">
                {methodCompareModes.map((item) => (
                  <button key={item} type="button" onClick={() => setMode(item)} className={`rounded-full border px-3 py-2 text-sm transition ${item === mode ? "border-violet bg-violet text-white" : "border-line bg-white text-muted hover:border-violet hover:text-ink"}`}>{modeLabels[item]}</button>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-line bg-white p-5">
              <div className="flex flex-wrap gap-2"><CompareChip accent="blue">Chapter {card.chapter}</CompareChip><CompareChip accent="lime">{modeLabels[mode]}</CompareChip><CompareChip accent="orange">vs {card.compareWith}</CompareChip></div>
              <h4 className="display mt-3 text-3xl font-medium text-ink">{modeHeadline(mode)}</h4>
              <div className="mt-4 text-sm leading-relaxed text-muted">{renderMode(card, mode)}</div>
              <a href={card.route} className="mono mt-5 inline-flex rounded-full border border-violet bg-violet px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-white hover:bg-white hover:text-violet">Open chapter comparison</a>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function renderMode(card: MethodCompareCard, mode: MethodCompareMode) {
  if (mode === "choose") return <div className="grid gap-3"><p>{card.primaryQuestion}</p><p>{card.plainComparison}</p><NumberedList items={card.chooseWhen} accent="cyan" /><TagRow tags={card.tags} /></div>;
  if (mode === "axis") return <AxisTable card={card} />;
  if (mode === "tradeoff") return <div className="rounded-lg border border-blue/30 bg-blue/[0.06] p-4"><p>{card.tradeoff}</p></div>;
  if (mode === "failure") return <div className="grid gap-3"><div className="rounded-lg border border-orange/30 bg-orange/[0.06] p-4"><p>{card.failureMode}</p></div><p><span className="font-medium text-ink">Technical comparison:</span> {card.technicalComparison}</p></div>;
  return <div className="rounded-lg border border-lime/30 bg-lime/[0.06] p-4"><p>{card.bridge}</p></div>;
}

function AxisTable({ card }: { card: MethodCompareCard }) {
  return (
    <div className="grid gap-3">
      <p>{card.technicalComparison}</p>
      <div className="grid gap-2">
        {card.axisRows.map((row) => (
          <div key={row.label} className="grid gap-2 rounded-lg border border-line bg-panel-2 p-3 md:grid-cols-[0.55fr_1fr_1fr]">
            <p className="mono text-[10px] uppercase tracking-[0.14em] text-dim">{row.label}</p>
            <p><span className="font-medium text-ink">{card.algorithmName}:</span> {row.current}</p>
            <p><span className="font-medium text-ink">{card.compareWith}:</span> {row.contrast}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function NumberedList({ items, accent }: { items: string[]; accent: Accent }) {
  return <ol className="grid gap-2">{items.map((item, itemIndex) => <li key={item} className="flex gap-2"><span className={accent === "orange" ? "text-orange" : accent === "violet" ? "text-violet" : accent === "lime" ? "text-lime" : "text-cyan"}>{itemIndex + 1}.</span><span>{item}</span></li>)}</ol>;
}

function TagRow({ tags }: { tags: string[] }) {
  return <div className="flex flex-wrap gap-1.5">{tags.slice(0, 8).map((tag) => <span key={tag} className="mono rounded-full border border-line bg-panel-2 px-2 py-1 text-[10px] text-dim">{tag}</span>)}</div>;
}

function modeHeadline(mode: MethodCompareMode) {
  return {
    choose: "Choose by situation, not by name.",
    axis: "Technical axes side by side.",
    tradeoff: "What the method buys and spends.",
    failure: "What breaks first.",
    bridge: "Transfer the comparison forward.",
  }[mode];
}

function CompareChip({ children, accent = "cyan" }: { children: ReactNode; accent?: Accent }) {
  const color = {
    cyan: "border-cyan/30 bg-cyan/[0.08] text-cyan",
    orange: "border-orange/30 bg-orange/[0.08] text-orange",
    blue: "border-blue/30 bg-blue/[0.08] text-blue",
    violet: "border-violet/30 bg-violet/[0.08] text-violet",
    lime: "border-lime/30 bg-lime/[0.08] text-lime",
  }[accent];
  return <span className={`mono inline-flex rounded-full border px-2.5 py-1 text-[11px] ${color}`}>{children}</span>;
}

function compareGeometry(cardIndex: number, modeIndex: number) {
  const layouts = [
    { path: "M74 152 C126 86 188 168 220 128 S306 80 372 150", nodes: [[74, 152, "data"], [146, 116, "target"], [220, 128, "backup"], [300, 116, "risk"], [372, 150, "use"]] },
    { path: "M62 160 L136 104 L214 160 L294 104 L378 160", nodes: [[62, 160, "state"], [136, 104, "policy"], [214, 160, "model"], [294, 104, "cost"], [378, 160, "trust"]] },
    { path: "M70 92 L152 92 L222 168 L300 92 L374 92", nodes: [[70, 92, "when"], [152, 92, "why"], [222, 168, "price"], [300, 92, "break"], [374, 92, "next"]] },
  ];
  const layout = layouts[(cardIndex + modeIndex) % layouts.length];
  return { path: layout.path, nodes: layout.nodes.map(([x, y, label]) => ({ x: Number(x), y: Number(y), label: String(label) })) };
}

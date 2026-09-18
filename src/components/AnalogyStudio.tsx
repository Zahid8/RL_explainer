"use client";

import { useMemo, useState, type ReactNode } from "react";
import type { AnalogyCard, AnalogyMode } from "@/lib/analogies";

type Accent = "cyan" | "orange" | "blue" | "violet" | "lime";

const analogyModes = ["everyday", "mapping", "technical", "limits", "transfer"] as const satisfies readonly AnalogyMode[];

const modeLabels: Record<AnalogyMode, string> = {
  everyday: "Everyday",
  mapping: "Mapping",
  technical: "Technical",
  limits: "Limits",
  transfer: "Transfer",
};

export function AnalogyStudio({ cards, contextTitle = "Analogy bridge studio", compact = false }: { cards: AnalogyCard[]; contextTitle?: string; compact?: boolean }) {
  const [index, setIndex] = useState(0);
  const [mode, setMode] = useState<AnalogyMode>("everyday");
  const safeIndex = Math.min(index, Math.max(cards.length - 1, 0));
  const card = cards[safeIndex];
  const modeIndex = analogyModes.indexOf(mode);
  const board = useMemo(() => analogyGeometry(safeIndex, modeIndex), [safeIndex, modeIndex]);

  if (!card) return null;

  return (
    <article className="analogy-studio overflow-hidden rounded-xl border border-line bg-panel" data-analogy-card={card.id} data-mode={mode} data-card-count={cards.length}>
      <div className="grid gap-px bg-line lg:grid-cols-[0.98fr_1.02fr]">
        <div className="bg-panel-2 p-5 lg:p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="flex flex-wrap gap-2"><AnalogyChip>Analogy bridge</AnalogyChip><AnalogyChip accent="blue">Ch {card.chapter}</AnalogyChip><AnalogyChip accent="lime">{safeIndex + 1}/{cards.length}</AnalogyChip><AnalogyChip accent="orange">{card.sourceLabel}</AnalogyChip></div>
            <span className="mono rounded-full border border-line bg-white px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-muted">{modeLabels[mode]}</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted">{contextTitle}</p>
          <h3 className="display mt-2 text-3xl font-medium text-ink">{card.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted"><span className="font-medium text-ink">Everyday doorway:</span> {card.everyday}</p>
          <svg viewBox="0 0 460 280" role="img" aria-label={`${card.title} analogy map`} className="mt-5 h-auto w-full">
            <defs>
              <linearGradient id={`analogy-grad-${card.chapter}-${safeIndex}-${modeIndex}`} x1="0" x2="1">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="50%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#84cc16" />
              </linearGradient>
            </defs>
            <rect x="10" y="10" width="440" height="260" rx="26" fill="white" stroke="rgba(15,23,42,0.12)" />
            <path d={board.path} fill="none" stroke={`url(#analogy-grad-${card.chapter}-${safeIndex}-${modeIndex})`} strokeWidth="5" strokeLinecap="round" strokeDasharray="10 9" className="rl-dash" />
            <g>
              <rect x="34" y="42" width="148" height="62" rx="17" fill="#f5f3ff" stroke="rgba(139,92,246,0.34)" />
              <text x="108" y="70" textAnchor="middle" className="fill-ink text-[10px] font-semibold">everyday world</text>
              <text x="108" y="86" textAnchor="middle" className="fill-muted text-[8px]">familiar intuition</text>
            </g>
            <g>
              <rect x="278" y="42" width="148" height="62" rx="17" fill="#ecfeff" stroke="rgba(6,182,212,0.34)" />
              <text x="352" y="70" textAnchor="middle" className="fill-ink text-[10px] font-semibold">RL object</text>
              <text x="352" y="86" textAnchor="middle" className="fill-muted text-[8px]">precise role</text>
            </g>
            {board.nodes.map((node, nodeIndex) => {
              const active = nodeIndex === modeIndex % board.nodes.length;
              return (
                <g key={node.label}>
                  <circle cx={node.x} cy={node.y} r={active ? 30 : 22} fill={active ? "#8b5cf6" : "#f8fafc"} stroke="rgba(15,23,42,0.25)" strokeWidth="2" />
                  <text x={node.x} y={node.y + 4} textAnchor="middle" className={active ? "fill-white text-[9px] font-semibold" : "fill-ink text-[9px] font-semibold"}>{node.label}</text>
                </g>
              );
            })}
            <foreignObject x="42" y="220" width="376" height="38">
              <div className="rounded-lg border border-line bg-panel px-3 py-2 text-xs leading-snug text-muted">
                Analogy rule: use the familiar story, map it carefully, then state where it stops being exact.
              </div>
            </foreignObject>
          </svg>
          <p className="mt-4 rounded-lg border border-violet/20 bg-violet/[0.06] p-3 text-sm leading-relaxed text-muted"><span className="font-medium text-ink">Guardrail:</span> an analogy is a bridge, not proof. Always finish by naming the exact RL object and the condition where the analogy would mislead.</p>
        </div>

        <div className="bg-panel p-5 lg:p-6">
          <div className="grid gap-4">
            <div>
              <p className="eyebrow mb-2">Choose analogy</p>
              <div className={`grid gap-2 ${compact || cards.length > 8 ? "max-h-72 overflow-auto pr-1" : "md:grid-cols-2"}`}>
                {cards.map((item, cardIndex) => (
                  <button key={item.id} type="button" onClick={() => setIndex(cardIndex)} className={`rounded-lg border px-3 py-2 text-left text-sm leading-snug transition ${cardIndex === safeIndex ? "border-violet bg-violet/[0.08] text-ink" : "border-line bg-white text-muted hover:border-violet hover:text-ink"}`}>
                    <span className="mono block text-[10px] uppercase tracking-[0.12em] text-dim">Ch {item.chapter} · {item.sourceLabel}</span>
                    {item.title}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="eyebrow mb-2">Bridge mode</p>
              <div className="flex flex-wrap gap-2">
                {analogyModes.map((item) => (
                  <button key={item} type="button" onClick={() => setMode(item)} className={`rounded-full border px-3 py-2 text-sm transition ${item === mode ? "border-violet bg-violet text-white" : "border-line bg-white text-muted hover:border-violet hover:text-ink"}`}>{modeLabels[item]}</button>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-line bg-white p-5">
              <div className="flex flex-wrap gap-2"><AnalogyChip accent="blue">Chapter {card.chapter}</AnalogyChip><AnalogyChip accent="lime">{modeLabels[mode]}</AnalogyChip><AnalogyChip accent="orange">{card.sourceLabel}</AnalogyChip></div>
              <h4 className="display mt-3 text-3xl font-medium text-ink">{modeHeadline(mode)}</h4>
              <div className="mt-4 text-sm leading-relaxed text-muted">{renderMode(card, mode)}</div>
              <a href={card.route} className="mono mt-5 inline-flex rounded-full border border-violet bg-violet px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-white hover:bg-white hover:text-violet">Open chapter analogies</a>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function renderMode(card: AnalogyCard, mode: AnalogyMode) {
  if (mode === "everyday") return <div className="grid gap-3"><p>{card.everyday}</p><TagRow tags={card.tags} /></div>;
  if (mode === "mapping") return <ol className="grid gap-2">{card.mapping.map((item, index) => <li key={item} className="flex gap-2"><span className="text-violet">{index + 1}.</span><span>{item}</span></li>)}</ol>;
  if (mode === "technical") return <div className="grid gap-3"><p>{card.technical}</p><p><span className="font-medium text-ink">Board prompt:</span> {card.imagePrompt}</p></div>;
  if (mode === "limits") return <div className="rounded-lg border border-orange/30 bg-orange/[0.06] p-4"><p>{card.limits}</p></div>;
  return <div className="grid gap-3"><p>{card.transfer}</p><p><span className="font-medium text-ink">Blank-board test:</span> tell the analogy, map four pieces, then explain one way it can mislead.</p></div>;
}

function modeHeadline(mode: AnalogyMode) {
  return {
    everyday: "Start with a familiar situation.",
    mapping: "Map each familiar piece to RL.",
    technical: "Translate the bridge into exact language.",
    limits: "Mark where the analogy breaks.",
    transfer: "Use the analogy somewhere new.",
  }[mode];
}

function TagRow({ tags }: { tags: string[] }) {
  return <div className="flex flex-wrap gap-1.5">{tags.slice(0, 9).map((tag) => <span key={tag} className="mono rounded-full border border-line bg-panel-2 px-2 py-1 text-[10px] text-dim">{tag}</span>)}</div>;
}

function AnalogyChip({ children, accent = "cyan" }: { children: ReactNode; accent?: Accent }) {
  const color = {
    cyan: "border-cyan/30 bg-cyan/[0.08] text-cyan",
    orange: "border-orange/30 bg-orange/[0.08] text-orange",
    blue: "border-blue/30 bg-blue/[0.08] text-blue",
    violet: "border-violet/30 bg-violet/[0.08] text-violet",
    lime: "border-lime/30 bg-lime/[0.08] text-lime",
  }[accent];
  return <span className={`mono inline-flex rounded-full border px-2.5 py-1 text-[11px] ${color}`}>{children}</span>;
}

function analogyGeometry(cardIndex: number, modeIndex: number) {
  const layouts = [
    { path: "M82 154 C140 110 178 172 230 136 S326 108 382 154", nodes: [[82, 154, "story"], [154, 126, "piece"], [230, 136, "map"], [308, 126, "limit"], [382, 154, "use"]] },
    { path: "M72 172 L142 118 L226 172 L310 118 L390 172", nodes: [[72, 172, "familiar"], [142, 118, "label"], [226, 172, "object"], [310, 118, "guard"], [390, 172, "transfer"]] },
    { path: "M76 122 C136 90 170 202 232 168 S320 96 384 132", nodes: [[76, 122, "see"], [150, 120, "match"], [232, 168, "name"], [320, 132, "break"], [384, 132, "teach"]] },
  ];
  const layout = layouts[(cardIndex + modeIndex) % layouts.length];
  return { path: layout.path, nodes: layout.nodes.map(([x, y, label]) => ({ x: Number(x), y: Number(y), label: String(label) })) };
}

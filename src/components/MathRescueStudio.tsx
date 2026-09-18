"use client";

import { useMemo, useState, type ReactNode } from "react";
import type { MathRescueCard, MathRescueMode } from "@/lib/mathRescue";

type Accent = "cyan" | "orange" | "blue" | "violet" | "lime";

const mathRescueModes = ["intuition", "picture", "notation", "use", "check"] as const satisfies readonly MathRescueMode[];

const modeLabels: Record<MathRescueMode, string> = {
  intuition: "Intuition",
  picture: "Picture",
  notation: "Notation",
  use: "Chapter use",
  check: "Self-check",
};

export function MathRescueStudio({ cards, contextTitle = "Math rescue studio", compact = false }: { cards: MathRescueCard[]; contextTitle?: string; compact?: boolean }) {
  const [index, setIndex] = useState(0);
  const [mode, setMode] = useState<MathRescueMode>("intuition");
  const safeIndex = Math.min(index, Math.max(cards.length - 1, 0));
  const card = cards[safeIndex];
  const modeIndex = mathRescueModes.indexOf(mode);
  const geometry = useMemo(() => mathGeometry(safeIndex, modeIndex), [safeIndex, modeIndex]);

  if (!card) return null;

  return (
    <article className="math-rescue-studio overflow-hidden rounded-xl border border-line bg-panel" data-math-card={card.id} data-mode={mode} data-card-count={cards.length}>
      <div className="grid gap-px bg-line lg:grid-cols-[0.94fr_1.06fr]">
        <div className="bg-panel-2 p-5 lg:p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="flex flex-wrap gap-2"><MathChip>Math rescue</MathChip><MathChip accent="blue">Ch {card.chapter}</MathChip><MathChip accent="lime">{safeIndex + 1}/{cards.length}</MathChip><MathChip accent="orange">{card.sourceLabel}</MathChip></div>
            <span className="mono rounded-full border border-line bg-white px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-muted">{modeLabels[mode]}</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted">{contextTitle}</p>
          <h3 className="display mt-2 text-3xl font-medium text-ink">{card.object}</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted"><span className="font-medium text-ink">Why this math exists:</span> {card.intuition}</p>
          <svg viewBox="0 0 440 260" role="img" aria-label={`${card.object} math rescue diagram`} className="mt-5 h-auto w-full">
            <defs>
              <linearGradient id={`math-grad-${card.chapter}-${safeIndex}-${modeIndex}`} x1="0" x2="1">
                <stop offset="0%" stopColor="#f97316" />
                <stop offset="45%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
            <rect x="10" y="10" width="420" height="240" rx="24" fill="white" stroke="rgba(15,23,42,0.12)" />
            <path d={geometry.path} fill="none" stroke={`url(#math-grad-${card.chapter}-${safeIndex}-${modeIndex})`} strokeWidth="5" strokeLinecap="round" strokeDasharray="10 9" className="rl-dash" />
            <g>
              <rect x="34" y="40" width="150" height="60" rx="16" fill="#fff7ed" stroke="rgba(249,115,22,0.34)" />
              <text x="109" y="68" textAnchor="middle" className="fill-ink text-[10px] font-semibold">story object</text>
              <text x="109" y="84" textAnchor="middle" className="fill-muted text-[8px]">what changes?</text>
            </g>
            <g>
              <rect x="256" y="40" width="150" height="60" rx="16" fill="#f5f3ff" stroke="rgba(139,92,246,0.34)" />
              <text x="331" y="68" textAnchor="middle" className="fill-ink text-[10px] font-semibold">notation object</text>
              <text x="331" y="84" textAnchor="middle" className="fill-muted text-[8px]">what is computed?</text>
            </g>
            {geometry.nodes.map((node, nodeIndex) => {
              const active = nodeIndex === modeIndex % geometry.nodes.length;
              return (
                <g key={node.label}>
                  <circle cx={node.x} cy={node.y} r={active ? 29 : 22} fill={active ? "#f97316" : "#f8fafc"} stroke="rgba(15,23,42,0.28)" strokeWidth="2" />
                  <text x={node.x} y={node.y + 4} textAnchor="middle" className={active ? "fill-white text-[10px] font-semibold" : "fill-ink text-[10px] font-semibold"}>{node.label}</text>
                </g>
              );
            })}
            <foreignObject x="38" y="196" width="364" height="44">
              <div className="rounded-lg border border-line bg-panel px-3 py-2 text-xs leading-snug text-muted">
                Rescue path: intuition → board picture → notation → chapter use → self-check.
              </div>
            </foreignObject>
          </svg>
          <p className="mt-4 rounded-lg border border-orange/20 bg-orange/[0.06] p-3 text-sm leading-relaxed text-muted"><span className="font-medium text-ink">Rule:</span> never manipulate a symbol until you can say what quantity it names, what is random, what is estimated, and what error or comparison changes next.</p>
        </div>

        <div className="bg-panel p-5 lg:p-6">
          <div className="grid gap-4">
            <div>
              <p className="eyebrow mb-2">Choose math object</p>
              <div className={`grid gap-2 ${compact || cards.length > 8 ? "max-h-72 overflow-auto pr-1" : "md:grid-cols-2"}`}>
                {cards.map((item, cardIndex) => (
                  <button key={item.id} type="button" onClick={() => setIndex(cardIndex)} className={`rounded-lg border px-3 py-2 text-left text-sm leading-snug transition ${cardIndex === safeIndex ? "border-orange bg-orange/[0.08] text-ink" : "border-line bg-white text-muted hover:border-orange hover:text-ink"}`}>
                    <span className="mono block text-[10px] uppercase tracking-[0.12em] text-dim">Ch {item.chapter} · {item.sourceLabel}</span>
                    {item.object}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="eyebrow mb-2">Rescue mode</p>
              <div className="flex flex-wrap gap-2">
                {mathRescueModes.map((item) => (
                  <button key={item} type="button" onClick={() => setMode(item)} className={`rounded-full border px-3 py-2 text-sm transition ${item === mode ? "border-orange bg-orange text-white" : "border-line bg-white text-muted hover:border-orange hover:text-ink"}`}>{modeLabels[item]}</button>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-line bg-white p-5">
              <div className="flex flex-wrap gap-2"><MathChip accent="blue">Chapter {card.chapter}</MathChip><MathChip accent="lime">{modeLabels[mode]}</MathChip><MathChip accent="orange">{card.sourceLabel}</MathChip></div>
              <h4 className="display mt-3 text-3xl font-medium text-ink">{modeHeadline(mode)}</h4>
              <div className="mt-4 text-sm leading-relaxed text-muted">{renderMode(card, mode)}</div>
              <a href={card.route} className="mono mt-5 inline-flex rounded-full border border-orange bg-orange px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-white hover:bg-white hover:text-orange">Open chapter math rescue</a>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function renderMode(card: MathRescueCard, mode: MathRescueMode) {
  if (mode === "intuition") return <div className="grid gap-3"><p>{card.intuition}</p><NumberedList items={[`Source layer: ${card.sourceLabel}`, `Chapter role: ${card.chapterTitle}`, `Symbols/handles: ${card.symbols.join(", ") || "plain objects first"}`]} accent="orange" /><TagRow tags={card.tags} /></div>;
  if (mode === "picture") return <div className="rounded-lg border border-lime/30 bg-lime/[0.06] p-4"><p>{card.boardPicture}</p></div>;
  if (mode === "notation") return <div className="grid gap-3"><p>{card.notationBridge}</p><NumberedList items={card.symbols.slice(0, 5).map((symbol) => `Say ${symbol} aloud and point to the story object it names.`)} accent="violet" /></div>;
  if (mode === "use") return <div className="grid gap-3"><p>{card.chapterUse}</p><p><span className="font-medium text-ink">Pitfall:</span> {card.pitfall}</p></div>;
  return <div className="grid gap-3"><p>{card.selfCheck}</p><p><span className="font-medium text-ink">No-notes test:</span> explain it with no formula, then with symbols, then with one tiny transition or sample.</p></div>;
}

function modeHeadline(mode: MathRescueMode) {
  return {
    intuition: "Why this mathematical object exists.",
    picture: "Draw the calculation before symbols.",
    notation: "Translate every symbol into a role.",
    use: "Use it inside the chapter argument.",
    check: "Test understanding without notes.",
  }[mode];
}

function NumberedList({ items, accent }: { items: string[]; accent: Accent }) {
  return <ol className="grid gap-2">{items.filter(Boolean).map((item, itemIndex) => <li key={item} className="flex gap-2"><span className={accent === "orange" ? "text-orange" : accent === "violet" ? "text-violet" : accent === "lime" ? "text-lime" : accent === "blue" ? "text-blue" : "text-cyan"}>{itemIndex + 1}.</span><span>{item}</span></li>)}</ol>;
}

function TagRow({ tags }: { tags: string[] }) {
  return <div className="flex flex-wrap gap-1.5">{tags.slice(0, 8).map((tag) => <span key={tag} className="mono rounded-full border border-line bg-panel-2 px-2 py-1 text-[10px] text-dim">{tag}</span>)}</div>;
}

function MathChip({ children, accent = "cyan" }: { children: ReactNode; accent?: Accent }) {
  const color = {
    cyan: "border-cyan/30 bg-cyan/[0.08] text-cyan",
    orange: "border-orange/30 bg-orange/[0.08] text-orange",
    blue: "border-blue/30 bg-blue/[0.08] text-blue",
    violet: "border-violet/30 bg-violet/[0.08] text-violet",
    lime: "border-lime/30 bg-lime/[0.08] text-lime",
  }[accent];
  return <span className={`mono inline-flex rounded-full border px-2.5 py-1 text-[11px] ${color}`}>{children}</span>;
}

function mathGeometry(cardIndex: number, modeIndex: number) {
  const layouts = [
    { path: "M72 154 C128 92 168 166 220 128 S310 94 374 154", nodes: [[72, 154, "why"], [146, 116, "draw"], [220, 128, "name"], [300, 116, "use"], [374, 154, "test"]] },
    { path: "M64 160 L136 106 L218 162 L304 106 L380 160", nodes: [[64, 160, "story"], [136, 106, "shape"], [218, 162, "symbol"], [304, 106, "role"], [380, 160, "check"]] },
    { path: "M70 100 L150 100 L220 168 L298 100 L372 100", nodes: [[70, 100, "object"], [150, 100, "target"], [220, 168, "error"], [298, 100, "step"], [372, 100, "guard"]] },
  ];
  const layout = layouts[(cardIndex + modeIndex) % layouts.length];
  return { path: layout.path, nodes: layout.nodes.map(([x, y, label]) => ({ x: Number(x), y: Number(y), label: String(label) })) };
}

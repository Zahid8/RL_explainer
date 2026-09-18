"use client";

import { useMemo, useState, type ReactNode } from "react";
import type { FoundationDictionaryCard, FoundationDictionaryMode } from "@/lib/foundationDictionary";

type Accent = "cyan" | "orange" | "blue" | "violet" | "lime";

const foundationDictionaryModes = ["meaning", "picture", "technical", "trap", "teach"] as const satisfies readonly FoundationDictionaryMode[];

const modeLabels: Record<FoundationDictionaryMode, string> = {
  meaning: "Meaning",
  picture: "Picture",
  technical: "Technical",
  trap: "Trap",
  teach: "Teach-back",
};

export function FoundationDictionaryStudio({ cards, contextTitle = "Foundation dictionary studio", compact = false }: { cards: FoundationDictionaryCard[]; contextTitle?: string; compact?: boolean }) {
  const [index, setIndex] = useState(0);
  const [mode, setMode] = useState<FoundationDictionaryMode>("meaning");
  const safeIndex = Math.min(index, Math.max(cards.length - 1, 0));
  const card = cards[safeIndex];
  const modeIndex = foundationDictionaryModes.indexOf(mode);
  const geometry = useMemo(() => foundationGeometry(safeIndex, modeIndex), [safeIndex, modeIndex]);

  if (!card) return null;

  return (
    <article className="foundation-dictionary-studio overflow-hidden rounded-xl border border-line bg-panel" data-foundation-card={card.id} data-mode={mode} data-card-count={cards.length}>
      <div className="grid gap-px bg-line lg:grid-cols-[0.92fr_1.08fr]">
        <div className="bg-panel-2 p-5 lg:p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="flex flex-wrap gap-2"><FoundationChip>Foundation dictionary</FoundationChip><FoundationChip accent="blue">Ch {card.chapter}</FoundationChip><FoundationChip accent="lime">{safeIndex + 1}/{cards.length}</FoundationChip><FoundationChip accent="orange">{card.sourceLabel}</FoundationChip></div>
            <span className="mono rounded-full border border-line bg-white px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-muted">{modeLabels[mode]}</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted">{contextTitle}</p>
          <h3 className="display mt-2 text-3xl font-medium text-ink">{card.term}</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted"><span className="font-medium text-ink">Beginner handle:</span> {card.beginnerMeaning}</p>
          <svg viewBox="0 0 440 260" role="img" aria-label={`${card.term} foundation dictionary diagram`} className="mt-5 h-auto w-full">
            <defs>
              <linearGradient id={`foundation-grad-${card.chapter}-${safeIndex}-${modeIndex}`} x1="0" x2="1">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="45%" stopColor="#84cc16" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
            <rect x="10" y="10" width="420" height="240" rx="24" fill="white" stroke="rgba(15,23,42,0.12)" />
            <path d={geometry.path} fill="none" stroke={`url(#foundation-grad-${card.chapter}-${safeIndex}-${modeIndex})`} strokeWidth="5" strokeLinecap="round" strokeDasharray="8 10" className="rl-dash" />
            <g>
              <rect x="34" y="42" width="144" height="58" rx="16" fill="#ecfeff" stroke="rgba(14,165,233,0.36)" />
              <text x="106" y="68" textAnchor="middle" className="fill-ink text-[10px] font-semibold">plain word</text>
              <text x="106" y="84" textAnchor="middle" className="fill-muted text-[8px]">what job it does</text>
            </g>
            <g>
              <rect x="262" y="42" width="144" height="58" rx="16" fill="#f5f3ff" stroke="rgba(139,92,246,0.36)" />
              <text x="334" y="68" textAnchor="middle" className="fill-ink text-[10px] font-semibold">technical object</text>
              <text x="334" y="84" textAnchor="middle" className="fill-muted text-[8px]">how math uses it</text>
            </g>
            {geometry.nodes.map((node, nodeIndex) => {
              const active = nodeIndex === modeIndex % geometry.nodes.length;
              return (
                <g key={node.label}>
                  <circle cx={node.x} cy={node.y} r={active ? 29 : 22} fill={active ? "#06b6d4" : "#f8fafc"} stroke="rgba(15,23,42,0.28)" strokeWidth="2" />
                  <text x={node.x} y={node.y + 4} textAnchor="middle" className={active ? "fill-white text-[10px] font-semibold" : "fill-ink text-[10px] font-semibold"}>{node.label}</text>
                </g>
              );
            })}
            <foreignObject x="38" y="196" width="364" height="44">
              <div className="rounded-lg border border-line bg-panel px-3 py-2 text-xs leading-snug text-muted">
                Learn the word as meaning → picture → technical role → trap → teach-back.
              </div>
            </foreignObject>
          </svg>
          <p className="mt-4 rounded-lg border border-cyan/20 bg-cyan/[0.06] p-3 text-sm leading-relaxed text-muted"><span className="font-medium text-ink">Study rule:</span> before using this term in an equation, say it in plain English, draw where it lives in the loop, then name the technical object it modifies.</p>
        </div>

        <div className="bg-panel p-5 lg:p-6">
          <div className="grid gap-4">
            <div>
              <p className="eyebrow mb-2">Choose foundation term</p>
              <div className={`grid gap-2 ${compact || cards.length > 8 ? "max-h-72 overflow-auto pr-1" : "md:grid-cols-2"}`}>
                {cards.map((item, cardIndex) => (
                  <button key={item.id} type="button" onClick={() => setIndex(cardIndex)} className={`rounded-lg border px-3 py-2 text-left text-sm leading-snug transition ${cardIndex === safeIndex ? "border-cyan bg-cyan/[0.08] text-ink" : "border-line bg-white text-muted hover:border-cyan hover:text-ink"}`}>
                    <span className="mono block text-[10px] uppercase tracking-[0.12em] text-dim">Ch {item.chapter} · {item.sourceLabel}</span>
                    {item.term}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="eyebrow mb-2">Dictionary mode</p>
              <div className="flex flex-wrap gap-2">
                {foundationDictionaryModes.map((item) => (
                  <button key={item} type="button" onClick={() => setMode(item)} className={`rounded-full border px-3 py-2 text-sm transition ${item === mode ? "border-cyan bg-cyan text-white" : "border-line bg-white text-muted hover:border-cyan hover:text-ink"}`}>{modeLabels[item]}</button>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-line bg-white p-5">
              <div className="flex flex-wrap gap-2"><FoundationChip accent="blue">Chapter {card.chapter}</FoundationChip><FoundationChip accent="lime">{modeLabels[mode]}</FoundationChip><FoundationChip accent="orange">{card.sourceLabel}</FoundationChip></div>
              <h4 className="display mt-3 text-3xl font-medium text-ink">{modeHeadline(mode)}</h4>
              <div className="mt-4 text-sm leading-relaxed text-muted">{renderMode(card, mode)}</div>
              <a href={card.route} className="mono mt-5 inline-flex rounded-full border border-cyan bg-cyan px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-white hover:bg-white hover:text-cyan">Open chapter foundations</a>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function renderMode(card: FoundationDictionaryCard, mode: FoundationDictionaryMode) {
  if (mode === "meaning") return <div className="grid gap-3"><p>{card.beginnerMeaning}</p><NumberedList items={[`Chapter role: ${card.chapterTitle}`, `Source layer: ${card.sourceLabel}`, `Prerequisites: ${card.prerequisites.join(", ") || "none"}`]} accent="cyan" /><TagRow tags={card.tags} /></div>;
  if (mode === "picture") return <div className="rounded-lg border border-lime/30 bg-lime/[0.06] p-4"><p>{card.boardPicture}</p></div>;
  if (mode === "technical") return <div className="grid gap-3"><p>{card.technicalMeaning}</p><NumberedList items={card.neighbors.map((term) => `Connect with ${term}`)} accent="violet" /></div>;
  if (mode === "trap") return <div className="rounded-lg border border-orange/30 bg-orange/[0.06] p-4"><p>{card.commonTrap}</p></div>;
  return <div className="grid gap-3"><p>{card.teachBack}</p><p><span className="font-medium text-ink">Teach-back pattern:</span> define it, draw it, name the technical object, then say one mistake it prevents.</p></div>;
}

function modeHeadline(mode: FoundationDictionaryMode) {
  return {
    meaning: "Plain meaning before formulas.",
    picture: "Draw the term on the board.",
    technical: "Name the exact technical object.",
    trap: "Avoid the common wrong shortcut.",
    teach: "Teach it back without notes.",
  }[mode];
}

function NumberedList({ items, accent }: { items: string[]; accent: Accent }) {
  return <ol className="grid gap-2">{items.filter(Boolean).map((item, itemIndex) => <li key={item} className="flex gap-2"><span className={accent === "orange" ? "text-orange" : accent === "violet" ? "text-violet" : accent === "lime" ? "text-lime" : accent === "blue" ? "text-blue" : "text-cyan"}>{itemIndex + 1}.</span><span>{item}</span></li>)}</ol>;
}

function TagRow({ tags }: { tags: string[] }) {
  return <div className="flex flex-wrap gap-1.5">{tags.slice(0, 8).map((tag) => <span key={tag} className="mono rounded-full border border-line bg-panel-2 px-2 py-1 text-[10px] text-dim">{tag}</span>)}</div>;
}

function FoundationChip({ children, accent = "cyan" }: { children: ReactNode; accent?: Accent }) {
  const color = {
    cyan: "border-cyan/30 bg-cyan/[0.08] text-cyan",
    orange: "border-orange/30 bg-orange/[0.08] text-orange",
    blue: "border-blue/30 bg-blue/[0.08] text-blue",
    violet: "border-violet/30 bg-violet/[0.08] text-violet",
    lime: "border-lime/30 bg-lime/[0.08] text-lime",
  }[accent];
  return <span className={`mono inline-flex rounded-full border px-2.5 py-1 text-[11px] ${color}`}>{children}</span>;
}

function foundationGeometry(cardIndex: number, modeIndex: number) {
  const layouts = [
    { path: "M72 154 C126 96 172 168 220 126 S306 88 374 152", nodes: [[72, 154, "word"], [146, 116, "picture"], [220, 126, "object"], [300, 116, "trap"], [374, 152, "teach"]] },
    { path: "M64 160 L134 106 L218 160 L304 106 L380 160", nodes: [[64, 160, "sense"], [134, 106, "draw"], [218, 160, "define"], [304, 106, "guard"], [380, 160, "use"]] },
    { path: "M70 98 L150 98 L220 168 L298 98 L372 98", nodes: [[70, 98, "plain"], [150, 98, "board"], [220, 168, "math"], [298, 98, "risk"], [372, 98, "check"]] },
  ];
  const layout = layouts[(cardIndex + modeIndex) % layouts.length];
  return { path: layout.path, nodes: layout.nodes.map(([x, y, label]) => ({ x: Number(x), y: Number(y), label: String(label) })) };
}

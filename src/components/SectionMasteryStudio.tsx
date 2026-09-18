"use client";

import { useMemo, useState, type ReactNode } from "react";
import type { SectionMasteryCard, SectionMasteryMode } from "@/lib/sectionMastery";

type Accent = "cyan" | "orange" | "blue" | "violet" | "lime";

const modeLabels: Record<SectionMasteryMode, string> = {
  prompt: "Prompt",
  hint: "Hint",
  answer: "Answer",
  technical: "Technical",
  transfer: "Transfer",
};

const sectionMasteryModes = ["prompt", "hint", "answer", "technical", "transfer"] as const satisfies readonly SectionMasteryMode[];

export function SectionMasteryStudio({ cards, contextTitle = "Section mastery studio", compact = false }: { cards: SectionMasteryCard[]; contextTitle?: string; compact?: boolean }) {
  const [index, setIndex] = useState(0);
  const [mode, setMode] = useState<SectionMasteryMode>("prompt");
  const safeIndex = Math.min(index, Math.max(cards.length - 1, 0));
  const card = cards[safeIndex];
  const modeIndex = sectionMasteryModes.indexOf(mode);
  const geometry = useMemo(() => sectionGeometry(safeIndex, modeIndex), [safeIndex, modeIndex]);

  if (!card) return null;

  return (
    <article className="section-mastery-studio overflow-hidden rounded-xl border border-line bg-panel" data-section-card={card.id} data-mode={mode} data-card-count={cards.length}>
      <div className="grid gap-px bg-line lg:grid-cols-[0.9fr_1.1fr]">
        <div className="bg-panel-2 p-5 lg:p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="flex flex-wrap gap-2"><MasteryChip>Section mastery</MasteryChip><MasteryChip accent="blue">Ch {card.chapter}</MasteryChip><MasteryChip accent="lime">{safeIndex + 1}/{cards.length}</MasteryChip></div>
            <span className="mono rounded-full border border-line bg-white px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-muted">{modeLabels[mode]}</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted">{contextTitle}</p>
          <h3 className="display mt-2 text-3xl font-medium text-ink">{card.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted"><span className="font-medium text-ink">Section:</span> {card.section}</p>
          <svg viewBox="0 0 430 255" role="img" aria-label={`${card.title} section mastery diagram`} className="mt-5 h-auto w-full">
            <defs>
              <linearGradient id={`section-mastery-grad-${card.chapter}-${safeIndex}-${modeIndex}`} x1="0" x2="1">
                <stop offset="0%" stopColor="#14b8a6" />
                <stop offset="50%" stopColor="#0ea5e9" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
            <rect x="10" y="10" width="410" height="235" rx="24" fill="white" stroke="rgba(15,23,42,0.12)" />
            <path d={geometry.path} fill="none" stroke={`url(#section-mastery-grad-${card.chapter}-${safeIndex}-${modeIndex})`} strokeWidth="5" strokeLinecap="round" strokeDasharray="8 10" className="rl-dash" />
            {geometry.nodes.map((node, nodeIndex) => {
              const active = nodeIndex === modeIndex % geometry.nodes.length;
              return (
                <g key={node.label}>
                  <circle cx={node.x} cy={node.y} r={active ? 28 : 22} fill={active ? "#14b8a6" : "#f8fafc"} stroke="rgba(15,23,42,0.28)" strokeWidth="2" />
                  <text x={node.x} y={node.y + 4} textAnchor="middle" className={active ? "fill-white text-[10px] font-semibold" : "fill-ink text-[10px] font-semibold"}>{node.label}</text>
                </g>
              );
            })}
            <foreignObject x="36" y="190" width="358" height="44">
              <div className="rounded-lg border border-line bg-panel px-3 py-2 text-xs leading-snug text-muted">
                Try the section cold → ask for one hint → reveal → technical pass → transfer.
              </div>
            </foreignObject>
          </svg>
          <p className="mt-4 rounded-lg border border-cyan/20 bg-cyan/[0.06] p-3 text-sm leading-relaxed text-muted"><span className="font-medium text-ink">Section rule:</span> do not leave a named section until you can teach its plain story, draw its board, state the technical version, and carry it into the next section.</p>
        </div>

        <div className="bg-panel p-5 lg:p-6">
          <div className="grid gap-4">
            <div>
              <p className="eyebrow mb-2">Choose section card</p>
              <div className={`grid gap-2 ${compact || cards.length > 8 ? "max-h-72 overflow-auto pr-1" : "md:grid-cols-2"}`}>
                {cards.map((item, cardIndex) => (
                  <button key={item.id} type="button" onClick={() => setIndex(cardIndex)} className={`rounded-lg border px-3 py-2 text-left text-sm leading-snug transition ${cardIndex === safeIndex ? "border-cyan bg-cyan/[0.08] text-ink" : "border-line bg-white text-muted hover:border-cyan hover:text-ink"}`}>
                    <span className="mono block text-[10px] uppercase tracking-[0.12em] text-dim">Ch {item.chapter}</span>
                    {item.section}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="eyebrow mb-2">Mastery mode</p>
              <div className="flex flex-wrap gap-2">
                {sectionMasteryModes.map((item) => (
                  <button key={item} type="button" onClick={() => setMode(item)} className={`rounded-full border px-3 py-2 text-sm transition ${item === mode ? "border-cyan bg-cyan text-white" : "border-line bg-white text-muted hover:border-cyan hover:text-ink"}`}>{modeLabels[item]}</button>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-line bg-white p-5">
              <div className="flex flex-wrap gap-2"><MasteryChip>Chapter {card.chapter}</MasteryChip><MasteryChip accent="lime">{modeLabels[mode]}</MasteryChip><MasteryChip accent="violet">{card.tags.slice(0, 2).join(" · ")}</MasteryChip></div>
              <h4 className="display mt-3 text-3xl font-medium text-ink">{modeHeadline(mode)}</h4>
              <div className="mt-4 text-sm leading-relaxed text-muted">{renderMode(card, mode)}</div>
              <a href={card.route} className="mono mt-5 inline-flex rounded-full border border-cyan bg-cyan px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-white hover:bg-white hover:text-cyan">Open chapter section</a>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function renderMode(card: SectionMasteryCard, mode: SectionMasteryMode) {
  if (mode === "prompt") return <div className="grid gap-3"><p>{card.prompt}</p><p><span className="font-medium text-ink">Diagnostic:</span> {card.diagnostic}</p><TagRow tags={card.tags} /></div>;
  if (mode === "hint") return <NumberedList items={card.hint} accent="cyan" />;
  if (mode === "answer") return <div className="rounded-lg border border-lime/30 bg-lime/[0.06] p-4"><p>{card.answer}</p></div>;
  if (mode === "technical") return <div className="rounded-lg border border-violet/30 bg-violet/[0.06] p-4"><p>{card.technical}</p></div>;
  return <div className="rounded-lg border border-blue/30 bg-blue/[0.06] p-4"><p>{card.transfer}</p></div>;
}

function NumberedList({ items, accent }: { items: string[]; accent: Accent }) {
  return <ol className="grid gap-2">{items.map((item, itemIndex) => <li key={item} className="flex gap-2"><span className={accent === "orange" ? "text-orange" : accent === "violet" ? "text-violet" : "text-cyan"}>{itemIndex + 1}.</span><span>{item}</span></li>)}</ol>;
}

function modeHeadline(mode: SectionMasteryMode) {
  return {
    prompt: "Teach the section cold.",
    hint: "One board hint, not the answer.",
    answer: "A complete plain-language answer.",
    technical: "The formal section pass.",
    transfer: "Use it in a new tiny world.",
  }[mode];
}

function TagRow({ tags }: { tags: string[] }) {
  return <div className="flex flex-wrap gap-1.5">{tags.slice(0, 8).map((tag) => <span key={tag} className="mono rounded-full border border-line bg-panel-2 px-2 py-1 text-[10px] text-dim">{tag}</span>)}</div>;
}

function MasteryChip({ children, accent = "cyan" }: { children: ReactNode; accent?: Accent }) {
  const color = {
    cyan: "border-cyan/30 bg-cyan/[0.08] text-cyan",
    orange: "border-orange/30 bg-orange/[0.08] text-orange",
    blue: "border-blue/30 bg-blue/[0.08] text-blue",
    violet: "border-violet/30 bg-violet/[0.08] text-violet",
    lime: "border-lime/30 bg-lime/[0.08] text-lime",
  }[accent];
  return <span className={`mono inline-flex rounded-full border px-2.5 py-1 text-[11px] ${color}`}>{children}</span>;
}

function sectionGeometry(cardIndex: number, modeIndex: number) {
  const layouts = [
    { path: "M54 178 C112 72 184 72 218 134 S314 190 376 78", nodes: [[54, 178, "try"], [132, 88, "hint"], [218, 134, "say"], [306, 132, "formal"], [376, 78, "move"]] },
    { path: "M58 90 L140 90 L214 180 L292 90 L374 90", nodes: [[58, 90, "story"], [140, 90, "board"], [214, 180, "terms"], [292, 90, "math"], [374, 90, "next"]] },
    { path: "M58 178 L118 118 L184 150 L256 78 L324 132 L374 84", nodes: [[58, 178, "cold"], [118, 118, "draw"], [184, 150, "name"], [256, 78, "check"], [374, 84, "use"]] },
  ];
  const layout = layouts[(cardIndex + modeIndex) % layouts.length];
  return { path: layout.path, nodes: layout.nodes.map(([x, y, label]) => ({ x: Number(x), y: Number(y), label: String(label) })) };
}

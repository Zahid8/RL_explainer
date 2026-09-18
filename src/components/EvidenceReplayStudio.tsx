"use client";

import { useMemo, useState, type ReactNode } from "react";
import type { EvidenceReplayCard, EvidenceReplayMode } from "@/lib/evidenceReplay";

type Accent = "cyan" | "orange" | "blue" | "violet" | "lime";

const modes = ["read", "reconstruct", "technical", "pitfall", "transfer"] as const satisfies readonly EvidenceReplayMode[];

const modeLabels: Record<EvidenceReplayMode, string> = {
  read: "Read",
  reconstruct: "Reconstruct",
  technical: "Technical",
  pitfall: "Pitfall",
  transfer: "Transfer",
};

export function EvidenceReplayStudio({ cards, contextTitle = "Evidence replay studio", compact = false }: { cards: EvidenceReplayCard[]; contextTitle?: string; compact?: boolean }) {
  const [index, setIndex] = useState(0);
  const [mode, setMode] = useState<EvidenceReplayMode>("read");
  const safeIndex = Math.min(index, Math.max(cards.length - 1, 0));
  const card = cards[safeIndex];
  const modeIndex = modes.indexOf(mode);
  const geometry = useMemo(() => replayGeometry(safeIndex, modeIndex), [safeIndex, modeIndex]);

  if (!card) return null;

  return (
    <article className="evidence-replay-studio overflow-hidden rounded-xl border border-line bg-panel" data-evidence-card={card.id} data-mode={mode} data-card-count={cards.length}>
      <div className="grid gap-px bg-line lg:grid-cols-[0.95fr_1.05fr]">
        <div className="bg-panel-2 p-5 lg:p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="flex flex-wrap gap-2"><ReplayChip>Evidence replay</ReplayChip><ReplayChip accent="blue">Ch {card.chapter}</ReplayChip><ReplayChip accent="lime">{safeIndex + 1}/{cards.length}</ReplayChip><ReplayChip accent={accentForKind(card.kind)}>{card.ref}</ReplayChip></div>
            <span className="mono rounded-full border border-line bg-white px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-muted">{modeLabels[mode]}</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted">{contextTitle}</p>
          <h3 className="display mt-2 text-3xl font-medium text-ink">{card.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted"><span className="font-medium text-ink">Replay target:</span> Read the anchor, rebuild it from memory, translate it technically, avoid the trap, and transfer the same idea to a tiny new world.</p>
          <svg viewBox="0 0 460 286" role="img" aria-label={`${card.title} evidence replay map`} className="mt-5 h-auto w-full">
            <defs>
              <linearGradient id={`evidence-grad-${card.chapter}-${safeIndex}-${modeIndex}`} x1="0" x2="1">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="50%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
            <rect x="10" y="10" width="440" height="266" rx="26" fill="white" stroke="rgba(15,23,42,0.12)" />
            <path d={geometry.path} fill="none" stroke={`url(#evidence-grad-${card.chapter}-${safeIndex}-${modeIndex})`} strokeWidth="5" strokeLinecap="round" strokeDasharray="9 9" className="rl-dash" />
            <rect x="38" y="42" width="160" height="92" rx="18" fill="#ecfeff" stroke="rgba(6,182,212,0.32)" />
            <text x="118" y="78" textAnchor="middle" className="fill-ink text-[10px] font-semibold">anchor</text>
            <text x="118" y="96" textAnchor="middle" className="fill-muted text-[8px]">figure · table · example</text>
            <rect x="262" y="42" width="160" height="92" rx="18" fill="#fff7ed" stroke="rgba(245,158,11,0.32)" />
            <text x="342" y="78" textAnchor="middle" className="fill-ink text-[10px] font-semibold">meaning</text>
            <text x="342" y="96" textAnchor="middle" className="fill-muted text-[8px]">mechanism · transfer</text>
            {geometry.nodes.map((node, nodeIndex) => {
              const active = nodeIndex === modeIndex % geometry.nodes.length;
              return (
                <g key={node.label}>
                  <circle cx={node.x} cy={node.y} r={active ? 30 : 22} fill={active ? "#06b6d4" : "#f8fafc"} stroke="rgba(15,23,42,0.25)" strokeWidth="2" />
                  <text x={node.x} y={node.y + 4} textAnchor="middle" className={active ? "fill-white text-[9px] font-semibold" : "fill-ink text-[9px] font-semibold"}>{node.label}</text>
                </g>
              );
            })}
            <foreignObject x="42" y="224" width="376" height="42">
              <div className="rounded-lg border border-line bg-panel px-3 py-2 text-xs leading-snug text-muted">
                Replay rule: do not memorize the picture; reconstruct the mechanism it teaches.
              </div>
            </foreignObject>
          </svg>
        </div>

        <div className="bg-panel p-5 lg:p-6">
          <div className="grid gap-4">
            <div>
              <p className="eyebrow mb-2">Choose anchor</p>
              <div className={`grid gap-2 ${compact || cards.length > 8 ? "max-h-72 overflow-auto pr-1" : "md:grid-cols-2"}`}>
                {cards.map((item, cardIndex) => (
                  <button key={item.id} type="button" onClick={() => setIndex(cardIndex)} className={`rounded-lg border px-3 py-2 text-left text-sm leading-snug transition ${cardIndex === safeIndex ? "border-cyan bg-cyan/[0.08] text-ink" : "border-line bg-white text-muted hover:border-cyan hover:text-ink"}`}>
                    <span className="mono block text-[10px] uppercase tracking-[0.12em] text-dim">Ch {item.chapter} · {item.ref} · {item.kind}</span>
                    {item.title}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="eyebrow mb-2">Replay mode</p>
              <div className="flex flex-wrap gap-2">
                {modes.map((item) => (
                  <button key={item} type="button" onClick={() => setMode(item)} className={`rounded-full border px-3 py-2 text-sm transition ${item === mode ? "border-cyan bg-cyan text-white" : "border-line bg-white text-muted hover:border-cyan hover:text-ink"}`}>{modeLabels[item]}</button>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-line bg-white p-5">
              <div className="flex flex-wrap gap-2"><ReplayChip accent="blue">Chapter {card.chapter}</ReplayChip><ReplayChip accent="lime">{modeLabels[mode]}</ReplayChip><ReplayChip accent={accentForKind(card.kind)}>{card.sourceLabel}</ReplayChip></div>
              <h4 className="display mt-3 text-3xl font-medium text-ink">{modeHeadline(mode)}</h4>
              <div className="mt-4 text-sm leading-relaxed text-muted">{renderMode(card, mode)}</div>
              <a href={card.route} className="mono mt-5 inline-flex rounded-full border border-cyan bg-cyan px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-white hover:bg-white hover:text-cyan">Open chapter replay</a>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function renderMode(card: EvidenceReplayCard, mode: EvidenceReplayMode) {
  if (mode === "read") return <div className="grid gap-3"><p>{card.plainRead}</p><TagRow tags={card.tags} /></div>;
  if (mode === "reconstruct") return <NumberedList items={card.reconstruction} accent="orange" />;
  if (mode === "technical") return <div className="rounded-lg border border-cyan/30 bg-cyan/[0.06] p-4"><p>{card.technicalFrame}</p></div>;
  if (mode === "pitfall") return <div className="rounded-lg border border-orange/30 bg-orange/[0.06] p-4"><p>{card.pitfall}</p></div>;
  return <div className="rounded-lg border border-violet/30 bg-violet/[0.06] p-4"><p>{card.transfer}</p></div>;
}

function modeHeadline(mode: EvidenceReplayMode) {
  return {
    read: "Read the anchor like a lecture board.",
    reconstruct: "Rebuild the figure or example from memory.",
    technical: "Translate the anchor into exact RL language.",
    pitfall: "Name the misleading shortcut before it sticks.",
    transfer: "Move the same mechanism into a new tiny world.",
  }[mode];
}

function NumberedList({ items, accent }: { items: string[]; accent: Accent }) {
  const color = accent === "orange" ? "text-orange" : accent === "violet" ? "text-violet" : accent === "lime" ? "text-lime" : "text-cyan";
  return <ol className="grid gap-2">{items.map((item, itemIndex) => <li key={item} className="flex gap-2"><span className={color}>{itemIndex + 1}.</span><span>{item}</span></li>)}</ol>;
}

function TagRow({ tags }: { tags: string[] }) {
  return <div className="flex flex-wrap gap-1.5">{tags.slice(0, 9).map((tag) => <span key={tag} className="mono rounded-full border border-line bg-panel-2 px-2 py-1 text-[10px] text-dim">{tag}</span>)}</div>;
}

function ReplayChip({ children, accent = "cyan" }: { children: ReactNode; accent?: Accent }) {
  const color = {
    cyan: "border-cyan/30 bg-cyan/[0.08] text-cyan",
    orange: "border-orange/30 bg-orange/[0.08] text-orange",
    blue: "border-blue/30 bg-blue/[0.08] text-blue",
    violet: "border-violet/30 bg-violet/[0.08] text-violet",
    lime: "border-lime/30 bg-lime/[0.08] text-lime",
  }[accent];
  return <span className={`mono inline-flex rounded-full border px-2.5 py-1 text-[11px] ${color}`}>{children}</span>;
}

function accentForKind(kind: EvidenceReplayCard["kind"]): Accent {
  return kind === "figure" ? "cyan" : kind === "table" ? "orange" : "blue";
}

function replayGeometry(cardIndex: number, modeIndex: number) {
  const layouts = [
    { path: "M74 170 C130 120 178 196 232 144 S324 104 388 166", nodes: [[74, 170, "read"], [150, 132, "rebuild"], [232, 144, "translate"], [312, 132, "trap"], [388, 166, "transfer"]] },
    { path: "M72 132 L152 132 L232 180 L312 132 L392 132", nodes: [[72, 132, "look"], [152, 132, "label"], [232, 180, "mechanism"], [312, 132, "check"], [392, 132, "reuse"]] },
    { path: "M76 188 C132 206 160 86 226 118 S324 206 386 132", nodes: [[76, 188, "anchor"], [150, 126, "objects"], [226, 118, "rule"], [318, 162, "edge"], [386, 132, "new"]] },
  ];
  const layout = layouts[(cardIndex + modeIndex) % layouts.length];
  return { path: layout.path, nodes: layout.nodes.map(([x, y, label]) => ({ x: Number(x), y: Number(y), label: String(label) })) };
}

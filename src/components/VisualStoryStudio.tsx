"use client";

import { useMemo, useState, type ReactNode } from "react";
import type { VisualStoryCard, VisualStoryMode } from "@/lib/visualStory";

type Accent = "cyan" | "orange" | "blue" | "violet" | "lime";

const visualStoryModes = ["scene", "observe", "move", "technical", "check"] as const satisfies readonly VisualStoryMode[];

const modeLabels: Record<VisualStoryMode, string> = {
  scene: "Scene",
  observe: "Observe",
  move: "Move",
  technical: "Technical",
  check: "Check",
};

export function VisualStoryStudio({ cards, contextTitle = "Visual story studio", compact = false }: { cards: VisualStoryCard[]; contextTitle?: string; compact?: boolean }) {
  const [index, setIndex] = useState(0);
  const [mode, setMode] = useState<VisualStoryMode>("scene");
  const safeIndex = Math.min(index, Math.max(cards.length - 1, 0));
  const card = cards[safeIndex];
  const modeIndex = visualStoryModes.indexOf(mode);
  const board = useMemo(() => storyBoardGeometry(safeIndex, modeIndex), [safeIndex, modeIndex]);

  if (!card) return null;

  return (
    <article className="visual-story-studio overflow-hidden rounded-xl border border-line bg-panel" data-story-card={card.id} data-mode={mode} data-card-count={cards.length}>
      <div className="grid gap-px bg-line lg:grid-cols-[1.02fr_0.98fr]">
        <div className="bg-panel-2 p-5 lg:p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="flex flex-wrap gap-2"><StoryChip>Visual story</StoryChip><StoryChip accent="blue">Ch {card.chapter}</StoryChip><StoryChip accent="lime">{safeIndex + 1}/{cards.length}</StoryChip><StoryChip accent="orange">{card.sourceLabel}</StoryChip></div>
            <span className="mono rounded-full border border-line bg-white px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-muted">{modeLabels[mode]}</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted">{contextTitle}</p>
          <h3 className="display mt-2 text-3xl font-medium text-ink">{card.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted"><span className="font-medium text-ink">Scene setup:</span> {card.setting}</p>

          <svg viewBox="0 0 460 286" role="img" aria-label={`${card.title} visual story board`} className="mt-5 h-auto w-full">
            <defs>
              <linearGradient id={`story-grad-${card.chapter}-${safeIndex}-${modeIndex}`} x1="0" x2="1">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="42%" stopColor="#84cc16" />
                <stop offset="100%" stopColor="#f97316" />
              </linearGradient>
            </defs>
            <rect x="10" y="10" width="440" height="266" rx="26" fill="white" stroke="rgba(15,23,42,0.12)" />
            <path d={board.path} fill="none" stroke={`url(#story-grad-${card.chapter}-${safeIndex}-${modeIndex})`} strokeWidth="5" strokeLinecap="round" strokeDasharray="11 9" className="rl-dash" />
            <g>
              <rect x="36" y="44" width="116" height="70" rx="18" fill="#ecfeff" stroke="rgba(6,182,212,0.34)" />
              <text x="94" y="72" textAnchor="middle" className="fill-ink text-[10px] font-semibold">learner</text>
              <text x="94" y="90" textAnchor="middle" className="fill-muted text-[8px]">asks what is visible</text>
            </g>
            <g>
              <rect x="172" y="44" width="116" height="70" rx="18" fill="#f7fee7" stroke="rgba(132,204,22,0.34)" />
              <text x="230" y="72" textAnchor="middle" className="fill-ink text-[10px] font-semibold">world</text>
              <text x="230" y="90" textAnchor="middle" className="fill-muted text-[8px]">answers with feedback</text>
            </g>
            <g>
              <rect x="308" y="44" width="116" height="70" rx="18" fill="#fff7ed" stroke="rgba(249,115,22,0.34)" />
              <text x="366" y="72" textAnchor="middle" className="fill-ink text-[10px] font-semibold">memory</text>
              <text x="366" y="90" textAnchor="middle" className="fill-muted text-[8px]">changes next move</text>
            </g>
            {board.nodes.map((node, nodeIndex) => {
              const active = nodeIndex === modeIndex % board.nodes.length;
              return (
                <g key={node.label}>
                  <circle cx={node.x} cy={node.y} r={active ? 30 : 22} fill={active ? "#06b6d4" : "#f8fafc"} stroke="rgba(15,23,42,0.25)" strokeWidth="2" />
                  <text x={node.x} y={node.y + 4} textAnchor="middle" className={active ? "fill-white text-[9px] font-semibold" : "fill-ink text-[9px] font-semibold"}>{node.label}</text>
                </g>
              );
            })}
            <foreignObject x="42" y="226" width="376" height="38">
              <div className="rounded-lg border border-line bg-panel px-3 py-2 text-xs leading-snug text-muted">
                Visual loop: scene → observe → move → technical translation → no-notes check.
              </div>
            </foreignObject>
          </svg>

          <div className="mt-4 grid gap-2 md:grid-cols-2">
            <MiniBox title="Actors" items={card.actors} accent="cyan" />
            <MiniBox title="Props" items={card.props} accent="orange" />
          </div>
        </div>

        <div className="bg-panel p-5 lg:p-6">
          <div className="grid gap-4">
            <div>
              <p className="eyebrow mb-2">Choose story scene</p>
              <div className={`grid gap-2 ${compact || cards.length > 8 ? "max-h-72 overflow-auto pr-1" : "md:grid-cols-2"}`}>
                {cards.map((item, cardIndex) => (
                  <button key={item.id} type="button" onClick={() => setIndex(cardIndex)} className={`rounded-lg border px-3 py-2 text-left text-sm leading-snug transition ${cardIndex === safeIndex ? "border-cyan bg-cyan/[0.08] text-ink" : "border-line bg-white text-muted hover:border-cyan hover:text-ink"}`}>
                    <span className="mono block text-[10px] uppercase tracking-[0.12em] text-dim">Ch {item.chapter} · {item.sourceLabel}</span>
                    {item.title}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="eyebrow mb-2">Lecture camera</p>
              <div className="flex flex-wrap gap-2">
                {visualStoryModes.map((item) => (
                  <button key={item} type="button" onClick={() => setMode(item)} className={`rounded-full border px-3 py-2 text-sm transition ${item === mode ? "border-cyan bg-cyan text-white" : "border-line bg-white text-muted hover:border-cyan hover:text-ink"}`}>{modeLabels[item]}</button>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-line bg-white p-5">
              <div className="flex flex-wrap gap-2"><StoryChip accent="blue">Chapter {card.chapter}</StoryChip><StoryChip accent="lime">{modeLabels[mode]}</StoryChip><StoryChip accent="orange">{card.sourceLabel}</StoryChip></div>
              <h4 className="display mt-3 text-3xl font-medium text-ink">{modeHeadline(mode)}</h4>
              <div className="mt-4 text-sm leading-relaxed text-muted">{renderMode(card, mode)}</div>
              <a href={card.route} className="mono mt-5 inline-flex rounded-full border border-cyan bg-cyan px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-white hover:bg-white hover:text-cyan">Open chapter story board</a>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function renderMode(card: VisualStoryCard, mode: VisualStoryMode) {
  if (mode === "scene") return <div className="grid gap-3"><p>{card.setting}</p><TagRow tags={card.tags} /></div>;
  if (mode === "observe") return <div className="rounded-lg border border-cyan/30 bg-cyan/[0.06] p-4"><p>{card.learnerSees}</p></div>;
  if (mode === "move") return <div className="grid gap-3"><p>{card.learnerMoves}</p><p><span className="font-medium text-ink">Board motion:</span> {card.boardAnimation}</p></div>;
  if (mode === "technical") return <div className="grid gap-3"><p>{card.technicalTranslation}</p><p><span className="font-medium text-ink">Pitfall:</span> {card.pitfall}</p></div>;
  return <div className="grid gap-3"><p>{card.checkpoint}</p><p><span className="font-medium text-ink">No-notes test:</span> redraw the scene, narrate the learner&apos;s move, then translate one object into the chapter&apos;s technical language.</p></div>;
}

function modeHeadline(mode: VisualStoryMode) {
  return {
    scene: "Set the movie before terminology.",
    observe: "Point to what the learner can see.",
    move: "Animate the next learning move.",
    technical: "Translate the scene into RL language.",
    check: "Teach it back from a blank board.",
  }[mode];
}

function MiniBox({ title, items, accent }: { title: string; items: string[]; accent: Accent }) {
  return <div className="rounded-lg border border-line bg-white p-3"><p className="mono text-[10px] uppercase tracking-[0.14em] text-dim">{title}</p><div className="mt-2 flex flex-wrap gap-1.5">{items.slice(0, 6).map((item) => <StoryChip key={item} accent={accent}>{item}</StoryChip>)}</div></div>;
}

function TagRow({ tags }: { tags: string[] }) {
  return <div className="flex flex-wrap gap-1.5">{tags.slice(0, 9).map((tag) => <span key={tag} className="mono rounded-full border border-line bg-panel-2 px-2 py-1 text-[10px] text-dim">{tag}</span>)}</div>;
}

function StoryChip({ children, accent = "cyan" }: { children: ReactNode; accent?: Accent }) {
  const color = {
    cyan: "border-cyan/30 bg-cyan/[0.08] text-cyan",
    orange: "border-orange/30 bg-orange/[0.08] text-orange",
    blue: "border-blue/30 bg-blue/[0.08] text-blue",
    violet: "border-violet/30 bg-violet/[0.08] text-violet",
    lime: "border-lime/30 bg-lime/[0.08] text-lime",
  }[accent];
  return <span className={`mono inline-flex rounded-full border px-2.5 py-1 text-[11px] ${color}`}>{children}</span>;
}

function storyBoardGeometry(cardIndex: number, modeIndex: number) {
  const layouts = [
    { path: "M78 172 C116 126 160 184 210 142 S318 110 382 172", nodes: [[78, 172, "scene"], [150, 146, "see"], [226, 154, "act"], [306, 138, "learn"], [382, 172, "teach"]] },
    { path: "M70 178 L140 126 L224 178 L310 126 L390 178", nodes: [[70, 178, "world"], [140, 126, "choice"], [224, 178, "signal"], [310, 126, "update"], [390, 178, "next"]] },
    { path: "M78 128 C156 88 162 210 232 170 S318 96 386 138", nodes: [[78, 128, "blank"], [156, 116, "draw"], [232, 170, "arrow"], [318, 132, "name"], [386, 138, "check"]] },
  ];
  const layout = layouts[(cardIndex + modeIndex) % layouts.length];
  return { path: layout.path, nodes: layout.nodes.map(([x, y, label]) => ({ x: Number(x), y: Number(y), label: String(label) })) };
}

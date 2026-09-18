"use client";

import { useMemo, useState, type ReactNode } from "react";
import { proofLabModes, type ProofLabCard, type ProofLabMode } from "@/lib/proofLab";

type Accent = "cyan" | "orange" | "blue" | "violet" | "lime";

const modeLabels: Record<ProofLabMode, string> = {
  plain: "Plain idea",
  claim: "Claim",
  proof: "Proof sketch",
  equation: "Equation bridge",
  stress: "Stress test",
};

export function ProofLab({ cards, contextTitle = "Proof intuition lab", compact = false }: { cards: ProofLabCard[]; contextTitle?: string; compact?: boolean }) {
  const [index, setIndex] = useState(0);
  const [mode, setMode] = useState<ProofLabMode>("plain");
  const safeIndex = Math.min(index, Math.max(cards.length - 1, 0));
  const card = cards[safeIndex];
  const modeIndex = proofLabModes.indexOf(mode);
  const geometry = useMemo(() => proofGeometry(safeIndex, modeIndex), [safeIndex, modeIndex]);

  if (!card) return null;

  return (
    <article className="proof-lab overflow-hidden rounded-xl border border-line bg-panel" data-proof-card={card.id} data-mode={mode} data-card-count={cards.length}>
      <div className="grid gap-px bg-line lg:grid-cols-[0.92fr_1.08fr]">
        <div className="bg-panel-2 p-5 lg:p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="flex flex-wrap gap-2"><ProofChip>Proof lab</ProofChip><ProofChip accent="lime">Ch {card.chapter}</ProofChip><ProofChip accent="blue">{safeIndex + 1}/{cards.length}</ProofChip></div>
            <span className="mono rounded-full border border-line bg-white px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-muted">{modeLabels[mode]}</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted">{contextTitle}</p>
          <h3 className="display mt-2 text-3xl font-medium text-ink">{card.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted"><span className="font-medium text-ink">Kind:</span> {card.kind} · <span className="font-medium text-ink">Family:</span> {card.family}</p>
          <svg viewBox="0 0 430 255" role="img" aria-label={`${card.title} proof intuition diagram`} className="mt-5 h-auto w-full">
            <defs>
              <linearGradient id={`proof-grad-${card.chapter}-${safeIndex}-${modeIndex}`} x1="0" x2="1">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="50%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#84cc16" />
              </linearGradient>
            </defs>
            <rect x="10" y="10" width="410" height="235" rx="24" fill="white" stroke="rgba(15,23,42,0.12)" />
            <path d={geometry.path} fill="none" stroke={`url(#proof-grad-${card.chapter}-${safeIndex}-${modeIndex})`} strokeWidth="5" strokeLinecap="round" strokeDasharray="9 9" className="rl-dash" />
            {geometry.nodes.map((node, nodeIndex) => (
              <g key={node.label}>
                <circle cx={node.x} cy={node.y} r={nodeIndex === modeIndex % geometry.nodes.length ? 28 : 22} fill={nodeIndex === modeIndex % geometry.nodes.length ? "#8b5cf6" : "#f8fafc"} stroke="rgba(15,23,42,0.28)" strokeWidth="2" />
                <text x={node.x} y={node.y + 4} textAnchor="middle" className={nodeIndex === modeIndex % geometry.nodes.length ? "fill-white text-[10px] font-semibold" : "fill-ink text-[10px] font-semibold"}>{node.label}</text>
              </g>
            ))}
            <foreignObject x="34" y="188" width="362" height="44">
              <div className="rounded-lg border border-line bg-panel px-3 py-2 text-xs leading-snug text-muted">
                Claim → objects → argument → equation → counterexample.
              </div>
            </foreignObject>
          </svg>
          <p className="mt-4 rounded-lg border border-violet/20 bg-violet/[0.06] p-3 text-sm leading-relaxed text-muted"><span className="font-medium text-ink">Proof rule:</span> a proof is not a magic paragraph. It names the object, the claim, the update or identity, and the case that would make the claim false.</p>
        </div>

        <div className="bg-panel p-5 lg:p-6">
          <div className="grid gap-4">
            <div>
              <p className="eyebrow mb-2">Choose proof card</p>
              <div className={`grid gap-2 ${compact || cards.length > 6 ? "max-h-72 overflow-auto pr-1" : "md:grid-cols-2"}`}>
                {cards.map((item, cardIndex) => (
                  <button key={item.id} type="button" onClick={() => setIndex(cardIndex)} className={`rounded-lg border px-3 py-2 text-left text-sm leading-snug transition ${cardIndex === safeIndex ? "border-violet bg-violet/[0.08] text-ink" : "border-line bg-white text-muted hover:border-violet hover:text-ink"}`}>
                    <span className="mono block text-[10px] uppercase tracking-[0.12em] text-dim">Ch {item.chapter} · {item.kind}</span>
                    {item.title}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="eyebrow mb-2">Proof mode</p>
              <div className="flex flex-wrap gap-2">
                {proofLabModes.map((item) => (
                  <button key={item} type="button" onClick={() => setMode(item)} className={`rounded-full border px-3 py-2 text-sm transition ${item === mode ? "border-violet bg-violet text-white" : "border-line bg-white text-muted hover:border-violet hover:text-ink"}`}>{modeLabels[item]}</button>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-line bg-white p-5">
              <div className="flex flex-wrap gap-2"><ProofChip>Chapter {card.chapter}</ProofChip><ProofChip accent="violet">{modeLabels[mode]}</ProofChip><ProofChip accent="orange">{card.ingredients.length} ingredients</ProofChip></div>
              <h4 className="display mt-3 text-3xl font-medium text-ink">{modeHeadline(mode)}</h4>
              <div className="mt-4 text-sm leading-relaxed text-muted">{renderMode(card, mode)}</div>
              <a href={card.route} className="mono mt-5 inline-flex rounded-full border border-violet bg-violet px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-white hover:bg-white hover:text-violet">Open proof layer</a>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function renderMode(card: ProofLabCard, mode: ProofLabMode) {
  if (mode === "plain") return <div className="grid gap-3"><p>{card.plain}</p><p><span className="font-medium text-ink">Takeaway:</span> {card.takeaway}</p><TagRow tags={card.tags} /></div>;
  if (mode === "claim") return <div className="grid gap-3"><div className="rounded-lg border border-cyan/30 bg-cyan/[0.06] p-4"><p>{card.claim}</p></div><NumberedList items={card.ingredients} accent="cyan" /></div>;
  if (mode === "proof") return <NumberedList items={card.proofSketch} accent="violet" />;
  if (mode === "equation") return <div className="rounded-lg border border-violet/30 bg-violet/[0.06] p-4"><p><span className="font-medium text-ink">Equation bridge:</span> {card.equationBridge}</p></div>;
  return <div className="rounded-lg border border-orange/30 bg-orange/[0.06] p-4"><p><span className="font-medium text-ink">Stress test:</span> {card.stressTest}</p><p className="mt-3"><span className="font-medium text-ink">Repair move:</span> restate the object, the sample/expectation distinction, and the assumption before trusting the conclusion.</p></div>;
}

function NumberedList({ items, accent }: { items: string[]; accent: Accent }) {
  return <ol className="grid gap-2">{items.map((item, itemIndex) => <li key={item} className="flex gap-2"><span className={accent === "violet" ? "text-violet" : accent === "orange" ? "text-orange" : "text-cyan"}>{itemIndex + 1}.</span><span>{item}</span></li>)}</ol>;
}

function modeHeadline(mode: ProofLabMode) {
  return {
    plain: "Why should I believe this?",
    claim: "The exact claim and its ingredients.",
    proof: "The proof as a board argument.",
    equation: "Where the symbols enter.",
    stress: "How the argument can fail.",
  }[mode];
}

function TagRow({ tags }: { tags: string[] }) {
  return <div className="flex flex-wrap gap-1.5">{tags.slice(0, 8).map((tag) => <span key={tag} className="mono rounded-full border border-line bg-panel-2 px-2 py-1 text-[10px] text-dim">{tag}</span>)}</div>;
}

function ProofChip({ children, accent = "cyan" }: { children: ReactNode; accent?: Accent }) {
  const color = {
    cyan: "border-cyan/30 bg-cyan/[0.08] text-cyan",
    orange: "border-orange/30 bg-orange/[0.08] text-orange",
    blue: "border-blue/30 bg-blue/[0.08] text-blue",
    violet: "border-violet/30 bg-violet/[0.08] text-violet",
    lime: "border-lime/30 bg-lime/[0.08] text-lime",
  }[accent];
  return <span className={`mono inline-flex rounded-full border px-2.5 py-1 text-[11px] ${color}`}>{children}</span>;
}

function proofGeometry(cardIndex: number, modeIndex: number) {
  const layouts = [
    { path: "M54 164 C108 76 176 76 218 126 S320 190 376 74", nodes: [[54, 164, "claim"], [134, 84, "object"], [218, 126, "step"], [306, 122, "symbol"], [376, 74, "break"]] },
    { path: "M58 86 H132 L214 178 L302 86 H374", nodes: [[58, 86, "given"], [132, 86, "target"], [214, 178, "proof"], [302, 86, "math"], [374, 86, "test"]] },
    { path: "M58 178 L130 96 L214 146 L300 72 L372 178", nodes: [[58, 178, "sample"], [130, 96, "mean"], [214, 146, "error"], [300, 72, "fixed"], [372, 178, "limit"]] },
  ];
  const layout = layouts[(cardIndex + modeIndex) % layouts.length];
  return { path: layout.path, nodes: layout.nodes.map(([x, y, label]) => ({ x: Number(x), y: Number(y), label: String(label) })) };
}

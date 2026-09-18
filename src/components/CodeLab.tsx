"use client";

import { useMemo, useState, type ReactNode } from "react";
import type { CodeLabCard, CodeLabMode } from "@/lib/codeLab";
import { codeLabModes } from "@/lib/codeLab";

type Accent = "cyan" | "orange" | "blue" | "violet" | "lime";

const modeLabels: Record<CodeLabMode, string> = {
  plain: "Plain plan",
  code: "Code scaffold",
  invariants: "Invariants",
  test: "Tiny tests",
  debug: "Debug checks",
};

export function CodeLab({ cards, contextTitle = "Implementation code lab", compact = false }: { cards: CodeLabCard[]; contextTitle?: string; compact?: boolean }) {
  const [index, setIndex] = useState(0);
  const [mode, setMode] = useState<CodeLabMode>("plain");
  const safeIndex = Math.min(index, Math.max(cards.length - 1, 0));
  const card = cards[safeIndex];
  const modeIndex = codeLabModes.indexOf(mode);
  const geometry = useMemo(() => codeGeometry(safeIndex, modeIndex), [safeIndex, modeIndex]);

  if (!card) return null;

  return (
    <article className="code-lab overflow-hidden rounded-xl border border-line bg-panel" data-code-card={card.id} data-mode={mode} data-card-count={cards.length}>
      <div className="grid gap-px bg-line lg:grid-cols-[0.9fr_1.1fr]">
        <div className="bg-ink p-5 text-white lg:p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="flex flex-wrap gap-2"><CodeChip>Code lab</CodeChip><CodeChip accent="lime">Ch {card.chapter}</CodeChip><CodeChip accent="blue">{safeIndex + 1}/{cards.length}</CodeChip></div>
            <span className="mono rounded-full border border-white/20 px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-white/70">{modeLabels[mode]}</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-white/60">{contextTitle}</p>
          <h3 className="display mt-2 text-3xl font-medium text-white">{card.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-white/70"><span className="text-white">Family:</span> {card.family}</p>
          <svg viewBox="0 0 430 250" role="img" aria-label={`${card.title} code lab diagram`} className="mt-5 h-auto w-full">
            <defs>
              <linearGradient id={`code-grad-${card.chapter}-${safeIndex}-${modeIndex}`} x1="0" x2="1">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="52%" stopColor="#fb923c" />
                <stop offset="100%" stopColor="#84cc16" />
              </linearGradient>
            </defs>
            <rect x="10" y="10" width="410" height="230" rx="24" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.14)" />
            <path d={geometry.path} fill="none" stroke={`url(#code-grad-${card.chapter}-${safeIndex}-${modeIndex})`} strokeWidth="5" strokeLinecap="round" strokeDasharray="10 10" className="rl-dash" />
            {geometry.nodes.map((node, nodeIndex) => (
              <g key={node.label}>
                <circle cx={node.x} cy={node.y} r={nodeIndex === modeIndex % geometry.nodes.length ? 28 : 22} fill={nodeIndex === modeIndex % geometry.nodes.length ? "#06b6d4" : "rgba(255,255,255,0.12)"} stroke="rgba(255,255,255,0.55)" strokeWidth="2" />
                <text x={node.x} y={node.y + 4} textAnchor="middle" className="fill-white text-[10px] font-semibold">{node.label}</text>
              </g>
            ))}
            <foreignObject x="34" y="178" width="362" height="42">
              <div className="rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-xs leading-snug text-white/75">
                Inputs → target → error → update → invariant check.
              </div>
            </foreignObject>
          </svg>
          <p className="mt-4 rounded-lg border border-white/10 bg-white/[0.04] p-3 text-sm leading-relaxed text-white/70"><span className="text-white">Implementation rule:</span> do not trust an algorithm name until you can name its stored state, target, update line, and one test that would fail if the update were wrong.</p>
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
              <p className="eyebrow mb-2">Implementation mode</p>
              <div className="flex flex-wrap gap-2">
                {codeLabModes.map((item) => (
                  <button key={item} type="button" onClick={() => setMode(item)} className={`rounded-full border px-3 py-2 text-sm transition ${item === mode ? "border-orange bg-orange text-white" : "border-line bg-white text-muted hover:border-orange hover:text-ink"}`}>{modeLabels[item]}</button>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-line bg-white p-5">
              <div className="flex flex-wrap gap-2"><CodeChip>Chapter {card.chapter}</CodeChip><CodeChip accent="orange">{modeLabels[mode]}</CodeChip><CodeChip accent="blue">{card.codeLines.length} lines</CodeChip></div>
              <h4 className="display mt-3 text-3xl font-medium text-ink">{modeHeadline(mode)}</h4>
              <div className="mt-4 text-sm leading-relaxed text-muted">{renderMode(card, mode)}</div>
              <a href={card.route} className="mono mt-5 inline-flex rounded-full border border-orange bg-orange px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-white hover:bg-white hover:text-orange">Open algorithm card</a>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function renderMode(card: CodeLabCard, mode: CodeLabMode) {
  if (mode === "plain") return <div className="grid gap-3"><p>{card.plain}</p><p>{card.implementationGoal}</p><TagRow tags={card.tags} /></div>;
  if (mode === "code") return <pre className="overflow-auto rounded-lg border border-line bg-ink p-4 text-xs leading-relaxed text-white"><code>{card.codeLines.join("\n")}</code></pre>;
  const items = mode === "invariants" ? card.invariants : mode === "test" ? card.testPlan : card.debugChecklist;
  return <ol className="grid gap-2">{items.map((item, itemIndex) => <li key={item} className="flex gap-2"><span className="text-orange">{itemIndex + 1}.</span><span>{item}</span></li>)}</ol>;
}

function modeHeadline(mode: CodeLabMode) {
  return {
    plain: "What are we implementing?",
    code: "Python-style teaching scaffold.",
    invariants: "What must stay true?",
    test: "How do we test it by hand?",
    debug: "Where does this implementation break?",
  }[mode];
}

function TagRow({ tags }: { tags: string[] }) {
  return <div className="flex flex-wrap gap-1.5">{tags.slice(0, 8).map((tag) => <span key={tag} className="mono rounded-full border border-line bg-panel-2 px-2 py-1 text-[10px] text-dim">{tag}</span>)}</div>;
}

function CodeChip({ children, accent = "cyan" }: { children: ReactNode; accent?: Accent }) {
  const color = {
    cyan: "border-cyan/30 bg-cyan/[0.08] text-cyan",
    orange: "border-orange/30 bg-orange/[0.08] text-orange",
    blue: "border-blue/30 bg-blue/[0.08] text-blue",
    violet: "border-violet/30 bg-violet/[0.08] text-violet",
    lime: "border-lime/30 bg-lime/[0.08] text-lime",
  }[accent];
  return <span className={`mono inline-flex rounded-full border px-2.5 py-1 text-[11px] ${color}`}>{children}</span>;
}

function codeGeometry(cardIndex: number, modeIndex: number) {
  const layouts = [
    { path: "M58 170 C104 82 162 76 218 130 S322 196 374 82", nodes: [[58, 170, "input"], [136, 84, "target"], [218, 130, "error"], [306, 126, "update"], [374, 82, "test"]] },
    { path: "M56 88 H132 V176 H220 V88 H374", nodes: [[56, 88, "state"], [132, 88, "loop"], [132, 176, "calc"], [220, 176, "assert"], [374, 88, "debug"]] },
    { path: "M58 174 L128 78 L214 148 L300 76 L372 174", nodes: [[58, 174, "data"], [128, 78, "model"], [214, 148, "value"], [300, 76, "policy"], [372, 174, "log"]] },
  ];
  const layout = layouts[(cardIndex + modeIndex) % layouts.length];
  return { path: layout.path, nodes: layout.nodes.map(([x, y, label]) => ({ x: Number(x), y: Number(y), label: String(label) })) };
}

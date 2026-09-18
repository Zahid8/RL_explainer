"use client";

import { useMemo, useState, type ReactNode } from "react";
import type { ChapterConceptCard } from "@/lib/conceptAtlas";

const modes = ["plain", "visual", "technical", "contrast", "check"] as const;

type Mode = (typeof modes)[number];

const modeLabels: Record<Mode, string> = {
  plain: "Plain role",
  visual: "Board picture",
  technical: "Technical use",
  contrast: "Do not confuse",
  check: "Self-check",
};

export function ConceptLectureDeck({ concepts, contextTitle = "Concept microscope", compact = false }: { concepts: ChapterConceptCard[]; contextTitle?: string; compact?: boolean }) {
  const [conceptIndex, setConceptIndex] = useState(0);
  const [mode, setMode] = useState<Mode>("plain");
  const safeIndex = Math.min(conceptIndex, Math.max(concepts.length - 1, 0));
  const concept = concepts[safeIndex];
  const modeIndex = modes.indexOf(mode);
  const geometry = useMemo(() => geometryFor(safeIndex, modeIndex), [safeIndex, modeIndex]);

  if (!concept) return null;

  return (
    <article className="concept-lecture-deck overflow-hidden rounded-xl border border-line bg-panel" data-concept={concept.id} data-mode={mode}>
      <div className="grid gap-px bg-line lg:grid-cols-[0.9fr_1.1fr]">
        <div className="bg-ink p-5 text-white lg:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2"><DeckChip>Concept microscope</DeckChip><DeckChip accent="lime">Ch {concept.chapter}</DeckChip><DeckChip accent="blue">{safeIndex + 1}/{concepts.length}</DeckChip></div>
            <span className="mono rounded-full border border-white/20 px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-white/70">{modeLabels[mode]}</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-white/60">{contextTitle}</p>
          <h3 className="display mt-2 text-3xl font-medium text-white">{concept.term}</h3>
          <p className="mt-3 text-sm leading-relaxed text-white/70"><span className="text-white">Section:</span> {concept.section}</p>
          <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.04] p-4">
            <svg viewBox="0 0 430 260" role="img" aria-label={`${concept.term} concept lecture diagram`} className="h-auto w-full">
              <defs>
                <linearGradient id={`concept-grad-${concept.chapter}-${safeIndex}-${modeIndex}`} x1="0" x2="1">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="50%" stopColor="#a78bfa" />
                  <stop offset="100%" stopColor="#84cc16" />
                </linearGradient>
              </defs>
              <rect x="8" y="8" width="414" height="244" rx="24" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.14)" />
              <path d={geometry.path} fill="none" stroke={`url(#concept-grad-${concept.chapter}-${safeIndex}-${modeIndex})`} strokeWidth="5" strokeLinecap="round" strokeDasharray="10 10" className="rl-dash" />
              {geometry.nodes.map((node, index) => (
                <g key={node.label}>
                  <circle cx={node.x} cy={node.y} r={index === modeIndex % geometry.nodes.length ? 29 : 23} fill={index === modeIndex % geometry.nodes.length ? "#06b6d4" : "rgba(255,255,255,0.12)"} stroke="rgba(255,255,255,0.55)" strokeWidth="2" />
                  <text x={node.x} y={node.y + 4} textAnchor="middle" className="fill-white text-[10px] font-semibold">{node.label}</text>
                </g>
              ))}
              <foreignObject x="30" y="184" width="370" height="54">
                <div className="rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-xs leading-snug text-white/75">
                  {concept.tags.slice(0, 5).join(" • ")}
                </div>
              </foreignObject>
            </svg>
          </div>
          <p className="mt-4 rounded-lg border border-white/10 bg-white/[0.04] p-3 text-sm leading-relaxed text-white/70"><span className="text-white">Lecture rule:</span> every important word must earn an everyday meaning, a drawing, a technical role, a contrast, and a check.</p>
        </div>

        <div className="bg-panel p-5 lg:p-6">
          <div className="grid gap-4">
            <div>
              <p className="eyebrow mb-2">Choose concept</p>
              <div className={`grid gap-2 ${compact || concepts.length > 6 ? "max-h-72 overflow-auto pr-1" : "md:grid-cols-2"}`}>
                {concepts.map((item, index) => (
                  <button key={item.id} onClick={() => setConceptIndex(index)} className={`rounded-lg border px-3 py-2 text-left text-sm leading-snug transition ${index === safeIndex ? "border-violet bg-violet/[0.08] text-ink" : "border-line bg-white text-muted hover:border-violet hover:text-ink"}`}>
                    <span className="mono block text-[10px] uppercase tracking-[0.12em] text-dim">Ch {item.chapter} · {item.kind}</span>
                    {item.term}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="eyebrow mb-2">Lecture mode</p>
              <div className="flex flex-wrap gap-2">
                {modes.map((item) => (
                  <button key={item} onClick={() => setMode(item)} className={`rounded-full border px-3 py-2 text-sm transition ${item === mode ? "border-violet bg-violet text-white" : "border-line bg-white text-muted hover:border-violet hover:text-ink"}`}>
                    {modeLabels[item]}
                  </button>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-line bg-white p-5">
              <div className="flex flex-wrap gap-2"><DeckChip>Chapter {concept.chapter}</DeckChip><DeckChip accent="blue">{concept.kind}</DeckChip><DeckChip accent="lime">{modeLabels[mode]}</DeckChip></div>
              <h4 className="display mt-3 text-3xl font-medium text-ink">{modeHeadline(mode)}</h4>
              <p className="mt-4 text-sm leading-relaxed text-muted">{modeText(concept, mode)}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {concept.tags.map((tag) => <span key={tag} className="mono rounded-full border border-line bg-panel-2 px-2 py-1 text-[10px] text-dim">{tag}</span>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function modeText(concept: ChapterConceptCard, mode: Mode) {
  return {
    plain: concept.plain,
    visual: concept.visual,
    technical: concept.technical,
    contrast: concept.contrast,
    check: concept.check,
  }[mode];
}

function modeHeadline(mode: Mode) {
  return {
    plain: "What job does this word do?",
    visual: "Where does it sit on the board?",
    technical: "How the chapter uses it precisely.",
    contrast: "The nearby idea it is not.",
    check: "Own it without looking.",
  }[mode];
}

function DeckChip({ children, accent = "cyan" }: { children: ReactNode; accent?: "cyan" | "lime" | "blue" }) {
  const color = {
    cyan: "border-cyan/30 bg-cyan/[0.08] text-cyan",
    lime: "border-lime/30 bg-lime/[0.08] text-lime",
    blue: "border-blue/30 bg-blue/[0.08] text-blue",
  }[accent];
  return <span className={`mono inline-flex rounded-full border px-2.5 py-1 text-[11px] ${color}`}>{children}</span>;
}

function geometryFor(conceptIndex: number, modeIndex: number) {
  const layouts = [
    { path: "M58 180 C112 74 174 76 218 132 S322 204 372 84", nodes: [[58, 180, "word"], [134, 82, "picture"], [218, 132, "role"], [312, 118, "not"], [372, 84, "own"]] },
    { path: "M62 92 H138 V176 H224 V92 H368", nodes: [[62, 92, "plain"], [138, 92, "draw"], [138, 176, "math"], [224, 176, "split"], [368, 92, "check"]] },
    { path: "M58 170 L124 74 L204 142 L286 78 L372 176", nodes: [[58, 170, "sense"], [124, 74, "label"], [204, 142, "use"], [286, 78, "guard"], [372, 176, "test"]] },
  ];
  const layout = layouts[(conceptIndex + modeIndex) % layouts.length];
  return { path: layout.path, nodes: layout.nodes.map(([x, y, label]) => ({ x: Number(x), y: Number(y), label: String(label) })) };
}

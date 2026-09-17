"use client";

import { useId, useMemo, useState } from "react";

type Variant = "loop" | "backup" | "gradient" | "tree" | "coverage" | "algorithm" | "chapter" | "formula";
type Accent = "cyan" | "orange" | "blue" | "violet" | "lime";

const phaseCopy = [
  ["Sense", "observe state, reward, and context"],
  ["Target", "build return, Bellman target, or gradient signal"],
  ["Update", "move values, policy, model, or weights"],
  ["Act", "choose, plan, improve, or explain behavior"],
] as const;

const accentColors: Record<Accent, { stroke: string; fill: string; glow: string }> = {
  cyan: { stroke: "#087e64", fill: "rgba(8,126,100,0.12)", glow: "rgba(8,126,100,0.24)" },
  orange: { stroke: "#cf5c26", fill: "rgba(207,92,38,0.12)", glow: "rgba(207,92,38,0.24)" },
  blue: { stroke: "#347fc4", fill: "rgba(52,127,196,0.12)", glow: "rgba(52,127,196,0.24)" },
  violet: { stroke: "#7056be", fill: "rgba(112,86,190,0.12)", glow: "rgba(112,86,190,0.24)" },
  lime: { stroke: "#658b1e", fill: "rgba(101,139,30,0.12)", glow: "rgba(101,139,30,0.24)" },
};

const variantAccent: Record<Variant, Accent> = {
  loop: "cyan",
  backup: "blue",
  gradient: "violet",
  tree: "lime",
  coverage: "orange",
  algorithm: "cyan",
  chapter: "violet",
  formula: "blue",
};

export function AnimatedConceptGraphic({
  label,
  variant = "loop",
  caption,
  compact = false,
}: {
  label: string;
  variant?: Variant;
  caption?: string;
  compact?: boolean;
}) {
  const [phase, setPhase] = useState(0);
  const rawId = useId().replace(/:/g, "");
  const colors = accentColors[variantAccent[variant]];
  const geometry = useMemo(() => geometryForVariant(variant), [variant]);
  const [phaseTitle, phaseText] = phaseCopy[phase];

  return (
    <div className={`rl-graphic group/graphic relative overflow-hidden rounded-xl border border-line bg-white ${compact ? "p-3" : "p-4"}`}>
      <div className="pointer-events-none absolute inset-0 paper-grid opacity-40" />
      <div className="pointer-events-none absolute -right-10 -top-10 size-28 rounded-full blur-2xl" style={{ background: colors.glow }} />
      <div className="relative flex items-start justify-between gap-3">
        <div>
          <p className="mono text-[10px] uppercase tracking-[0.16em] text-dim">Animated visual</p>
          <p className="display mt-1 text-xl font-medium text-ink">{label}</p>
        </div>
        <span className="mono rounded-full border border-line bg-panel-2 px-2 py-1 text-[10px] uppercase tracking-[0.12em] text-dim">hover/click</span>
      </div>

      <svg className={`${compact ? "mt-3 h-36" : "mt-4 h-48"} w-full`} viewBox="0 0 520 250" role="img" aria-label={`${label} animated reinforcement-learning graphic`}>
        <defs>
          <linearGradient id={`${rawId}-grad`} x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor={colors.stroke} stopOpacity="0.92" />
            <stop offset="100%" stopColor="#101613" stopOpacity="0.72" />
          </linearGradient>
          <filter id={`${rawId}-glow`}>
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <rect x="12" y="14" width="496" height="220" rx="24" fill="rgba(244,245,240,0.86)" stroke="rgba(13,22,18,0.12)" />
        <g className="rl-scan-lines" opacity="0.36">
          {Array.from({ length: 9 }, (_, index) => <line key={index} x1="34" x2="486" y1={42 + index * 21} y2={42 + index * 21} stroke="rgba(13,22,18,0.14)" />)}
          {Array.from({ length: 10 }, (_, index) => <line key={index} y1="35" y2="216" x1={52 + index * 43} x2={52 + index * 43} stroke="rgba(13,22,18,0.11)" />)}
        </g>
        <path className="rl-flow-path" d={geometry.path} fill="none" stroke={`url(#${rawId}-grad)`} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        <path className="rl-flow-dash" d={geometry.path} fill="none" stroke={colors.stroke} strokeWidth="2" strokeLinecap="round" strokeDasharray="12 15" opacity="0.8" />
        <circle className="rl-flow-dot" r="7" fill={colors.stroke} filter={`url(#${rawId}-glow)`}>
          <animateMotion dur="5.8s" repeatCount="indefinite" path={geometry.path} />
        </circle>
        {geometry.nodes.map((node, index) => {
          const active = index === phase;
          return (
            <g key={node.label} className={active ? "rl-node-active" : "rl-node"} style={{ transformOrigin: `${node.x}px ${node.y}px` }}>
              <circle cx={node.x} cy={node.y} r={active ? 27 : 22} fill={active ? colors.fill : "#fff"} stroke={active ? colors.stroke : "rgba(13,22,18,0.24)"} strokeWidth={active ? 3 : 1.5} />
              <circle className="rl-pulse-ring" cx={node.x} cy={node.y} r="32" fill="none" stroke={colors.stroke} strokeWidth="1.5" opacity={active ? 0.46 : 0.12} />
              <text x={node.x} y={node.y + 4} textAnchor="middle" className="fill-ink" style={{ fontSize: 10, fontFamily: "var(--font-mono-var)" }}>{node.short}</text>
              <text x={node.x} y={node.y + 45} textAnchor="middle" className="fill-muted" style={{ fontSize: 11, fontFamily: "var(--font-mono-var)", letterSpacing: "0.08em" }}>{node.label}</text>
            </g>
          );
        })}
        {variant === "tree" || variant === "coverage" ? <BranchOverlay color={colors.stroke} /> : null}
        {variant === "gradient" ? <GradientOverlay color={colors.stroke} /> : null}
      </svg>

      <div className="relative grid gap-3 md:grid-cols-[1fr_auto] md:items-end">
        <div className="rounded-lg border border-line bg-panel-2 p-3">
          <p className="mono text-[10px] uppercase tracking-[0.14em] text-dim">Current animation state</p>
          <p className="mt-1 text-sm leading-relaxed text-muted"><span className="font-medium text-ink">{phaseTitle}:</span> {caption ?? phaseText}</p>
        </div>
        <div className="grid grid-cols-4 gap-1.5 md:w-[260px]">
          {phaseCopy.map(([title], index) => (
            <button
              key={title}
              type="button"
              onMouseEnter={() => setPhase(index)}
              onFocus={() => setPhase(index)}
              onClick={() => setPhase(index)}
              className={`mono rounded-md border px-2 py-2 text-[10px] uppercase tracking-[0.12em] transition ${phase === index ? "border-cyan bg-cyan text-white" : "border-line bg-white text-dim hover:border-cyan hover:text-ink"}`}
              aria-pressed={phase === index}
            >
              {title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function BranchOverlay({ color }: { color: string }) {
  return (
    <g className="rl-branch" opacity="0.72">
      <path d="M260 124 C300 78 344 66 395 68" fill="none" stroke={color} strokeWidth="2" strokeDasharray="5 8" />
      <path d="M260 124 C304 160 348 178 412 178" fill="none" stroke={color} strokeWidth="2" strokeDasharray="5 8" />
      <circle cx="395" cy="68" r="8" fill="white" stroke={color} strokeWidth="2" />
      <circle cx="412" cy="178" r="8" fill="white" stroke={color} strokeWidth="2" />
    </g>
  );
}

function GradientOverlay({ color }: { color: string }) {
  return (
    <g className="rl-gradient-bars" opacity="0.78">
      {[0, 1, 2, 3, 4].map((index) => <rect key={index} x={338 + index * 20} y={154 - index * 17} width="12" height={26 + index * 17} rx="6" fill={color} opacity={0.22 + index * 0.11} />)}
      <path d="M332 186 C360 158 386 130 430 72" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" />
    </g>
  );
}

function geometryForVariant(variant: Variant) {
  const loopNodes = [
    { x: 90, y: 130, label: "state", short: "S" },
    { x: 215, y: 70, label: "target", short: "G" },
    { x: 330, y: 142, label: "update", short: "δ" },
    { x: 445, y: 95, label: "policy", short: "π" },
  ];
  const treeNodes = [
    { x: 82, y: 126, label: "root", short: "s" },
    { x: 210, y: 78, label: "branch", short: "a" },
    { x: 306, y: 132, label: "backup", short: "v" },
    { x: 440, y: 130, label: "choice", short: "max" },
  ];
  if (variant === "tree" || variant === "coverage") return { nodes: treeNodes, path: "M82 126 C120 76 166 54 210 78 C258 105 258 156 306 132 C352 108 388 112 440 130" };
  if (variant === "gradient") return { nodes: loopNodes, path: "M90 130 C142 50 190 42 215 70 C252 112 286 154 330 142 C382 128 410 58 445 95" };
  if (variant === "formula" || variant === "backup") return { nodes: loopNodes, path: "M90 130 L215 70 L330 142 L445 95" };
  return { nodes: loopNodes, path: "M90 130 C122 186 197 185 215 70 C250 20 312 75 330 142 C352 202 445 170 445 95 C445 36 154 38 90 130" };
}

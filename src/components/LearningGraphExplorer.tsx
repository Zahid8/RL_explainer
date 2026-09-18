"use client";

import { useMemo, useState } from "react";
import type { ChapterLearningGraph, LearningGraphNodeKind } from "@/lib/learningGraph";

type Accent = "cyan" | "orange" | "blue" | "violet" | "lime";
type ViewMode = "plain" | "technical" | "path";

export function LearningGraphExplorer({ graphs, contextTitle = "Interactive learning graph", compact = false, defaultChapter }: { graphs: ChapterLearningGraph[]; contextTitle?: string; compact?: boolean; defaultChapter?: number }) {
  const initialGraph = graphs.find((graph) => graph.chapter === defaultChapter) ?? graphs[0];
  const [chapter, setChapter] = useState(initialGraph?.chapter ?? 1);
  const graph = useMemo(() => graphs.find((candidate) => candidate.chapter === chapter) ?? graphs[0], [chapter, graphs]);
  const [selectedId, setSelectedId] = useState(graph?.nodes[0]?.id ?? "");
  const [mode, setMode] = useState<ViewMode>("plain");

  const selected = graph.nodes.find((node) => node.id === selectedId) ?? graph.nodes[0];
  const selectedEdges = graph.edges.filter((edge) => edge.from === selected?.id || edge.to === selected?.id);
  const nodeCount = graphs.reduce((sum, item) => sum + item.nodes.length, 0);
  const edgeCount = graphs.reduce((sum, item) => sum + item.edges.length, 0);

  function chooseChapter(nextChapter: number) {
    const nextGraph = graphs.find((candidate) => candidate.chapter === nextChapter) ?? graph;
    setChapter(nextGraph.chapter);
    setSelectedId(nextGraph.nodes[0]?.id ?? "");
  }

  return (
    <section className="learning-graph-explorer rounded-2xl border border-line bg-panel p-5 lg:p-6" data-chapter={graph.chapter} data-node={selected?.id ?? ""} data-view={mode} data-node-count={graph.nodes.length} data-edge-count={graph.edges.length}>
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div>
          <div className="flex flex-wrap gap-2">
            <GraphChip accent="cyan">{graphs.length} chapter maps</GraphChip>
            <GraphChip accent="lime">{nodeCount} nodes</GraphChip>
            <GraphChip accent="blue">{edgeCount} links</GraphChip>
            <GraphChip accent="violet">{graph.nodes.length} in this chapter</GraphChip>
          </div>
          <h3 className="display mt-4 text-3xl font-medium text-ink">{contextTitle}</h3>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">{graph.promise}</p>
        </div>
        <a href="/graph" className="mono self-start rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan hover:text-ink">Open graph route</a>
      </div>

      <div className="mt-5 grid gap-3 lg:grid-cols-[220px_minmax(0,1fr)_240px]">
        <label className="grid gap-2">
          <span className="mono text-[10px] uppercase tracking-[0.16em] text-dim">Chapter map</span>
          <select value={graph.chapter} onChange={(event) => chooseChapter(Number(event.target.value))} className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-cyan focus:ring-4 focus:ring-cyan/10">
            {graphs.map((item) => <option key={item.chapter} value={item.chapter}>Chapter {item.chapter}: {item.title}</option>)}
          </select>
        </label>
        <div className="grid gap-2">
          <span className="mono text-[10px] uppercase tracking-[0.16em] text-dim">View mode</span>
          <div className="flex flex-wrap gap-2">
            {(["plain", "technical", "path"] as const).map((item) => (
              <button key={item} type="button" onClick={() => setMode(item)} className={`mono rounded-full border px-3 py-2 text-[11px] uppercase tracking-[0.12em] transition ${mode === item ? "border-cyan bg-cyan text-white" : "border-line bg-white text-muted hover:border-cyan hover:text-ink"}`}>{item}</button>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-line bg-white p-3">
          <p className="mono text-[10px] uppercase tracking-[0.14em] text-dim">Selected node</p>
          <p className="mt-2 text-sm font-medium leading-snug text-ink">{selected?.title}</p>
        </div>
      </div>

      <div className={`mt-6 grid gap-5 ${compact ? "lg:grid-cols-[1fr_0.9fr]" : "lg:grid-cols-[1.05fr_0.95fr]"}`}>
        <div className="overflow-hidden rounded-2xl border border-line bg-white p-4">
          <svg viewBox="0 0 100 100" role="img" aria-label={`Learning graph for Chapter ${graph.chapter}`} className="h-[440px] w-full">
            <defs>
              <radialGradient id={`glow-${graph.chapter}`} cx="50%" cy="50%" r="60%">
                <stop offset="0%" stopColor="#8be9ff" stopOpacity="0.16" />
                <stop offset="100%" stopColor="#8be9ff" stopOpacity="0" />
              </radialGradient>
              <marker id={`arrow-${graph.chapter}`} markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L6,3 L0,6 Z" fill="#91a3b0" />
              </marker>
            </defs>
            <rect x="2" y="2" width="96" height="96" rx="8" fill={`url(#glow-${graph.chapter})`} />
            {graph.edges.map((edge) => {
              const from = graph.nodes.find((node) => node.id === edge.from);
              const to = graph.nodes.find((node) => node.id === edge.to);
              if (!from || !to) return null;
              const active = selected ? edge.from === selected.id || edge.to === selected.id : false;
              return <line key={edge.id} x1={from.x} y1={from.y} x2={to.x} y2={to.y} stroke={active ? kindColor(selected.kind) : "#d8e0e6"} strokeWidth={active ? 0.75 : 0.35} strokeDasharray={active ? "" : "1.4 1.6"} markerEnd={`url(#arrow-${graph.chapter})`} />;
            })}
            {graph.nodes.map((node) => {
              const active = selected?.id === node.id;
              return (
                <g key={node.id} className="cursor-pointer" onClick={() => setSelectedId(node.id)}>
                  <circle cx={node.x} cy={node.y} r={active ? 3.8 : node.kind === "chapter" ? 3.5 : 2.6} fill={kindColor(node.kind)} opacity={active ? 1 : 0.84} stroke={active ? "#111827" : "white"} strokeWidth={active ? 0.8 : 0.45} />
                  <circle cx={node.x} cy={node.y} r={active ? 7.5 : 5.2} fill="transparent" stroke={active ? kindColor(node.kind) : "transparent"} strokeWidth="0.35" strokeDasharray="1.2 1.3" className={active ? "rl-dash" : ""} />
                  <text x={node.x} y={node.y + (node.y > 82 ? -4.8 : 5.2)} textAnchor="middle" className="fill-ink" style={{ fontSize: node.kind === "chapter" ? "2.9px" : "2.25px", fontFamily: "var(--font-mono)", letterSpacing: "0.02em" }}>{shortLabel(node.title)}</text>
                </g>
              );
            })}
          </svg>
          <div className="mt-3 flex flex-wrap gap-2">
            {graph.legend.map((item) => <button type="button" key={item.kind} onClick={() => { const node = graph.nodes.find((candidate) => candidate.kind === item.kind); if (node) setSelectedId(node.id); }} className="rounded-full border border-line px-2.5 py-1 text-[11px] text-muted hover:border-cyan hover:text-ink"><span className="mr-1 inline-block size-2 rounded-full" style={{ backgroundColor: kindColor(item.kind) }} />{item.label}</button>)}
          </div>
        </div>

        <div className="grid gap-4">
          <article className="rounded-xl border border-line bg-white p-5">
            <div className="flex flex-wrap gap-2"><GraphChip accent={accentForKind(selected.kind)}>{kindLabel(selected.kind)}</GraphChip><GraphChip accent="blue">Chapter {selected.chapter}</GraphChip></div>
            <h4 className="display mt-4 text-3xl font-medium text-ink">{selected.title}</h4>
            {mode === "plain" ? <p className="mt-4 text-sm leading-relaxed text-muted">{selected.easy}</p> : null}
            {mode === "technical" ? <p className="mt-4 text-sm leading-relaxed text-muted">{selected.technical}</p> : null}
            {mode === "path" ? <ol className="mt-4 grid gap-2 text-sm leading-relaxed text-muted">{graph.readingPath.map((step, index) => <li key={step} className="flex gap-2"><span className="text-cyan">{index + 1}.</span><span>{step}</span></li>)}</ol> : null}
            <div className="mt-4 flex flex-wrap gap-1.5">{selected.tags.slice(0, 7).map((tag) => <span key={`${selected.id}-${tag}`} className="rounded-full border border-line px-2 py-1 text-[10px] text-dim">{tag}</span>)}</div>
            <a href={selected.route} className="mono mt-5 inline-flex rounded-full border border-cyan bg-cyan px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-white hover:bg-white hover:text-cyan">Open exact layer</a>
          </article>

          <article className="rounded-xl border border-line bg-panel-2 p-5">
            <p className="eyebrow mb-3">Connected links</p>
            <div className="grid gap-2">
              {selectedEdges.slice(0, 6).map((edge) => <button type="button" key={edge.id} onClick={() => setSelectedId(edge.from === selected.id ? edge.to : edge.from)} className="rounded-lg border border-line bg-white p-3 text-left text-sm leading-relaxed text-muted hover:border-cyan"><span className="font-medium text-ink">{edge.relation}:</span> {mode === "technical" ? edge.technical : edge.easy}</button>)}
              {selectedEdges.length === 0 ? <p className="rounded-lg border border-line bg-white p-3 text-sm text-muted">No direct links recorded for this node.</p> : null}
            </div>
          </article>

          <article className="rounded-xl border border-line bg-white p-5">
            <p className="eyebrow mb-3">Chapter reading path</p>
            <ol className="grid gap-2 text-sm leading-relaxed text-muted">
              {graph.readingPath.map((step, index) => <li key={step} className="flex gap-2"><span className="text-cyan">{index + 1}.</span><span>{step}</span></li>)}
            </ol>
          </article>
        </div>
      </div>
    </section>
  );
}

function GraphChip({ children, accent = "cyan" }: { children: React.ReactNode; accent?: Accent }) {
  const color = {
    cyan: "border-cyan/30 bg-cyan/[0.08] text-cyan",
    orange: "border-orange/30 bg-orange/[0.08] text-orange",
    blue: "border-blue/30 bg-blue/[0.08] text-blue",
    violet: "border-violet/30 bg-violet/[0.08] text-violet",
    lime: "border-lime/30 bg-lime/[0.08] text-lime",
  }[accent];
  return <span className={`mono inline-flex rounded-full border px-2.5 py-1 text-[11px] ${color}`}>{children}</span>;
}

function kindColor(kind: LearningGraphNodeKind) {
  const colors: Record<LearningGraphNodeKind, string> = {
    chapter: "#0ea5e9",
    foundation: "#06b6d4",
    math: "#f97316",
    story: "#06b6d4",
    analogy: "#8b5cf6",
    tutor: "#06b6d4",
    case: "#14b8a6",
    concept: "#22c55e",
    section: "#0d9488",
    formula: "#8b5cf6",
    symbol: "#a855f7",
    proof: "#6366f1",
    algorithm: "#f97316",
    compare: "#8b5cf6",
    code: "#fb923c",
    assumption: "#84cc16",
    example: "#14b8a6",
    practice: "#84cc16",
    exercise: "#f97316",
    exam: "#10b981",
    simulator: "#06b6d4",
    prerequisite: "#64748b",
    unlock: "#ec4899",
  };
  return colors[kind];
}

function accentForKind(kind: LearningGraphNodeKind): Accent {
  if (kind === "foundation") return "cyan";
  if (kind === "math") return "orange";
  if (kind === "story") return "cyan";
  if (kind === "analogy") return "violet";
  if (kind === "tutor") return "cyan";
  if (kind === "case") return "lime";
  if (kind === "formula") return "violet";
  if (kind === "symbol") return "violet";
  if (kind === "proof") return "violet";
  if (kind === "compare") return "violet";
  if (kind === "algorithm" || kind === "code" || kind === "unlock") return "orange";
  if (kind === "exercise") return "orange";
  if (kind === "concept" || kind === "section" || kind === "practice" || kind === "assumption" || kind === "exam") return "lime";
  if (kind === "prerequisite" || kind === "chapter") return "blue";
  return "cyan";
}

function kindLabel(kind: LearningGraphNodeKind) {
  return kind.replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function shortLabel(label: string) {
  const cleaned = label.replace(/^Chapter \d+:\s*/, "").replace(/^(Formula|Algorithm|Method comparison|Practice|Exercise|Worked example|Section mastery):\s*/i, "");
  return cleaned.length > 18 ? `${cleaned.slice(0, 16)}…` : cleaned;
}

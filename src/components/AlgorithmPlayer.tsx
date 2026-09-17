"use client";

import { useEffect, useState } from "react";
import { algorithmLines } from "@/lib/paper";

export function AlgorithmPlayer() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => setActive((i) => (i + 1) % algorithmLines.length), 1300);
    return () => window.clearInterval(id);
  }, [playing]);

  const line = algorithmLines[active];
  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
      <div className="rounded-xl border border-line bg-panel p-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <p className="eyebrow">Unified algorithm player</p>
          <div className="flex gap-2">
            <button className="rounded-lg border border-line bg-panel-2 px-3 py-2 text-sm" onClick={() => setPlaying((v) => !v)}>{playing ? "Pause" : "Play"}</button>
            <button className="rounded-lg border border-line bg-panel-2 px-3 py-2 text-sm" onClick={() => setActive((i) => (i - 1 + algorithmLines.length) % algorithmLines.length)}>‹</button>
            <button className="rounded-lg border border-line bg-panel-2 px-3 py-2 text-sm" onClick={() => setActive((i) => (i + 1) % algorithmLines.length)}>›</button>
          </div>
        </div>
        <ol className="grid gap-2">
          {algorithmLines.map((item, index) => (
            <li key={item.n}>
              <button onClick={() => setActive(index)} className={`grid w-full grid-cols-[44px_1fr] rounded-lg border px-3 py-3 text-left transition ${index === active ? "border-cyan bg-cyan/[0.08]" : "border-line bg-white hover:border-cyan"}`}>
                <span className="mono text-xs text-dim">{String(item.n).padStart(2, "0")}</span>
                <span className="mono text-sm text-ink" style={{ paddingLeft: `${item.indent * 22}px` }}>{item.text}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>
      <div className="rounded-xl border border-line bg-panel p-5">
        <p className="eyebrow">Active line</p>
        <h3 className="display mt-2 text-3xl font-medium text-ink">{line.text}</h3>
        <p className="mt-4 text-sm leading-relaxed text-muted">{line.note}</p>
        <Flow active={line.tag ?? "loop"} />
      </div>
    </div>
  );
}

function Flow({ active }: { active: string }) {
  const nodes = [
    ["choice", "choose action", 66, 80],
    ["model", "world responds", 220, 80],
    ["target", "make target", 220, 190],
    ["update", "update", 66, 190],
  ] as const;
  return (
    <svg viewBox="0 0 300 260" className="mt-6 w-full rounded-xl border border-line bg-panel-2">
      <defs><marker id="arrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="var(--cyan)" /></marker></defs>
      <path d="M105 80 H181 M220 108 V158 M181 190 H105 M66 158 V108" stroke="var(--cyan)" strokeWidth="3" fill="none" markerEnd="url(#arrow)" opacity="0.65" />
      {nodes.map(([id, label, x, y]) => (
        <g key={id}>
          <rect x={x - 46} y={y - 22} width="92" height="44" rx="12" fill={active === id ? "var(--cyan)" : "var(--panel)"} stroke="var(--line)" />
          <text x={x} y={y + 4} textAnchor="middle" className="mono" fontSize="10" fill={active === id ? "#fff" : "var(--muted)"}>{label}</text>
        </g>
      ))}
    </svg>
  );
}

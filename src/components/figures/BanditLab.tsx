"use client";

import { useMemo, useState } from "react";
import { FigureFrame } from "../Section";

const trueValues = [0.2, 0.42, 0.78, 0.55, 0.33];

function nextRng(seed: number) {
  return (seed * 1664525 + 1013904223) >>> 0;
}

export function BanditLab() {
  const [epsilon, setEpsilon] = useState(0.12);
  const [seed, setSeed] = useState(123456);
  const [counts, setCounts] = useState([0, 0, 0, 0, 0]);
  const [estimates, setEstimates] = useState([0.5, 0.5, 0.5, 0.5, 0.5]);
  const total = counts.reduce((a, b) => a + b, 0);
  const greedy = estimates.indexOf(Math.max(...estimates));

  const advance = (steps: number) => {
    let s = seed;
    let nextCounts = [...counts];
    let nextEstimates = [...estimates];
    for (let stepIndex = 0; stepIndex < steps; stepIndex += 1) {
      const localGreedy = nextEstimates.indexOf(Math.max(...nextEstimates));
      s = nextRng(s);
      const explore = s / 4294967296 < epsilon;
      s = nextRng(s);
      const action = explore ? Math.floor((s / 4294967296) * trueValues.length) : localGreedy;
      s = nextRng(s);
      const reward = s / 4294967296 < trueValues[action] ? 1 : 0;
      nextCounts = nextCounts.map((c, i) => (i === action ? c + 1 : c));
      nextEstimates = nextEstimates.map((q, i) => (i === action ? q + (reward - q) / nextCounts[i] : q));
    }
    setSeed(s);
    setCounts(nextCounts);
    setEstimates(nextEstimates);
  };

  const step = () => advance(1);
  const run = () => advance(25);

  const reset = () => {
    setSeed(123456);
    setCounts([0, 0, 0, 0, 0]);
    setEstimates([0.5, 0.5, 0.5, 0.5, 0.5]);
  };

  return (
    <FigureFrame label="Interactive figure 01" title="Bandit exploration lab" caption="Synthetic five-arm bandit. It illustrates Chapter 2's exploration/exploitation tradeoff; the hidden action probabilities are teaching data, not reported book results.">
      <div className="grid gap-5 lg:grid-cols-[1fr_280px]">
        <div>
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <label className="mono text-xs text-dim">epsilon <span className="text-ink">{epsilon.toFixed(2)}</span></label>
            <input aria-label="epsilon" type="range" min="0" max="0.5" step="0.01" value={epsilon} onChange={(event) => setEpsilon(Number(event.target.value))} />
            <button className="rounded-lg border border-line bg-panel-2 px-3 py-2 text-sm" onClick={step}>one pull</button>
            <button className="rounded-lg border border-line bg-panel-2 px-3 py-2 text-sm" onClick={run}>run 25</button>
            <button className="rounded-lg border border-line bg-panel-2 px-3 py-2 text-sm" onClick={reset}>reset</button>
          </div>
          <div className="grid gap-3">
            {trueValues.map((truth, i) => (
              <div key={i} className="grid grid-cols-[64px_1fr_70px] items-center gap-3">
                <span className="mono text-xs text-dim">arm {i + 1}</span>
                <div className="relative h-10 overflow-hidden rounded-lg border border-line bg-panel-2">
                  <div className="absolute inset-y-0 left-0 bg-cyan/70" style={{ width: `${estimates[i] * 100}%` }} />
                  <div className="absolute inset-y-0 w-px bg-orange" style={{ left: `${truth * 100}%` }} />
                </div>
                <span className="mono text-xs text-muted">Q {estimates[i].toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
        <aside className="rounded-xl border border-line bg-panel-2 p-4">
          <p className="eyebrow">Readout</p>
          <p className="mt-3 text-sm leading-relaxed text-muted">Greedy arm now: <span className="font-medium text-ink">{greedy + 1}</span>. Total pulls: <span className="font-medium text-ink">{total}</span>.</p>
          <p className="mt-3 text-sm leading-relaxed text-muted">Cyan bars are learned estimates. Orange ticks are hidden true reward probabilities. Higher epsilon samples more alternatives.</p>
          <div className="mt-4 grid gap-2">
            {counts.map((count, i) => <div key={i} className="mono flex justify-between rounded-md bg-white px-3 py-2 text-xs"><span>arm {i + 1}</span><span>{count} pulls</span></div>)}
          </div>
        </aside>
      </div>
    </FigureFrame>
  );
}

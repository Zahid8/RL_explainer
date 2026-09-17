"use client";

import { useMemo, useState } from "react";
import { FigureFrame } from "../Section";

export function TraceLab() {
  const [lambda, setLambda] = useState(0.72);
  const weights = useMemo(() => Array.from({ length: 8 }, (_, i) => (1 - lambda) * Math.pow(lambda, i)), [lambda]);
  const mcTail = Math.pow(lambda, 8);
  return (
    <FigureFrame label="Interactive figure 03" title="Lambda-return mixer" caption="A teaching visualization for Chapters 7 and 12. Bars show how lambda mixes 1-step, 2-step, and longer returns; the leftover tail represents still-longer returns.">
      <div className="grid gap-5 lg:grid-cols-[300px_1fr]">
        <div className="rounded-xl border border-line bg-panel-2 p-5">
          <label>
            <span className="mb-2 flex justify-between mono text-xs uppercase tracking-[0.12em] text-dim"><span>lambda</span><span className="text-ink">{lambda.toFixed(2)}</span></span>
            <input className="w-full" type="range" min="0" max="0.99" step="0.01" value={lambda} onChange={(event) => setLambda(Number(event.target.value))} />
          </label>
          <p className="mt-5 text-sm leading-relaxed text-muted">Low lambda behaves like one-step TD. High lambda puts more weight on long returns, closer to Monte Carlo, while traces keep it online.</p>
        </div>
        <div className="rounded-xl border border-line bg-white p-5">
          <div className="grid gap-3">
            {weights.map((weight, i) => (
              <div key={i} className="grid grid-cols-[72px_1fr_72px] items-center gap-3">
                <span className="mono text-xs text-dim">{i + 1}-step</span>
                <div className="h-8 rounded-lg border border-line bg-panel-2"><div className="h-full rounded-lg bg-cyan" style={{ width: `${Math.max(weight * 100, 1)}%`, opacity: 0.35 + Math.min(weight * 4, 0.65) }} /></div>
                <span className="mono text-xs text-muted">{weight.toFixed(3)}</span>
              </div>
            ))}
            <div className="grid grid-cols-[72px_1fr_72px] items-center gap-3">
              <span className="mono text-xs text-dim">tail</span>
              <div className="h-8 rounded-lg border border-line bg-panel-2"><div className="h-full rounded-lg bg-violet" style={{ width: `${Math.max(mcTail * 100, 1)}%`, opacity: 0.4 + Math.min(mcTail, 0.5) }} /></div>
              <span className="mono text-xs text-muted">{mcTail.toFixed(3)}</span>
            </div>
          </div>
        </div>
      </div>
    </FigureFrame>
  );
}

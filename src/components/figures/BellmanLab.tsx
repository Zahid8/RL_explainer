"use client";

import { useMemo, useState } from "react";
import { FigureFrame } from "../Section";

export function BellmanLab() {
  const [gamma, setGamma] = useState(0.9);
  const [reward, setReward] = useState(1);
  const [next, setNext] = useState(4);
  const target = useMemo(() => reward + gamma * next, [reward, gamma, next]);
  return (
    <FigureFrame label="Interactive figure 02" title="Bellman backup arithmetic" caption="This computes the one-step target used by dynamic programming and TD-style methods: immediate reward plus discounted next value.">
      <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-xl border border-line bg-panel-2 p-5">
          <Control label="reward r" value={reward} min={-2} max={4} step={0.25} onChange={setReward} />
          <Control label="discount gamma" value={gamma} min={0} max={0.99} step={0.01} onChange={setGamma} />
          <Control label="next value V(s')" value={next} min={-2} max={8} step={0.25} onChange={setNext} />
          <div className="mt-6 rounded-xl bg-white p-4">
            <p className="eyebrow">Live arithmetic</p>
            <div className="mt-3 grid gap-2 mono text-sm text-muted">
              <div className="flex justify-between"><span>r</span><span>{reward.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>gamma · V(s&apos;)</span><span>{(gamma * next).toFixed(2)}</span></div>
              <div className="flex justify-between border-t border-line pt-2 text-ink"><span>target</span><span>{target.toFixed(2)}</span></div>
            </div>
          </div>
        </div>
        <svg viewBox="0 0 680 310" className="w-full rounded-xl border border-line bg-panel">
          <defs><marker id="arrowBellman" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10z" fill="var(--cyan)" /></marker></defs>
          <rect x="58" y="96" width="150" height="112" rx="18" fill="var(--panel-2)" stroke="var(--line)" />
          <text x="133" y="146" textAnchor="middle" className="mono" fontSize="14" fill="var(--dim)">current</text>
          <text x="133" y="176" textAnchor="middle" className="display" fontSize="30" fill="var(--ink)">V(s)</text>
          <path d="M220 152 H342" stroke="var(--cyan)" strokeWidth="5" markerEnd="url(#arrowBellman)" />
          <rect x="360" y="62" width="110" height="78" rx="16" fill="var(--orange)" opacity="0.12" stroke="var(--orange)" />
          <text x="415" y="95" textAnchor="middle" className="mono" fontSize="12" fill="var(--dim)">reward</text>
          <text x="415" y="121" textAnchor="middle" className="display" fontSize="24" fill="var(--orange)">{reward.toFixed(2)}</text>
          <rect x="500" y="168" width="126" height="82" rx="16" fill="var(--blue)" opacity="0.1" stroke="var(--blue)" />
          <text x="563" y="202" textAnchor="middle" className="mono" fontSize="12" fill="var(--dim)">next value</text>
          <text x="563" y="229" textAnchor="middle" className="display" fontSize="24" fill="var(--blue)">{next.toFixed(2)}</text>
          <path d="M470 101 C530 101 562 128 563 160" stroke="var(--line)" strokeWidth="3" fill="none" strokeDasharray="8 8" />
          <text x="338" y="246" className="mono" fontSize="15" fill="var(--ink)">target = r + gamma V(s&apos;) = {target.toFixed(2)}</text>
        </svg>
      </div>
    </FigureFrame>
  );
}

function Control({ label, value, min, max, step, onChange }: { label: string; value: number; min: number; max: number; step: number; onChange: (value: number) => void }) {
  return (
    <label className="mb-5 block">
      <span className="mb-2 flex justify-between mono text-xs uppercase tracking-[0.12em] text-dim"><span>{label}</span><span className="text-ink">{value.toFixed(2)}</span></span>
      <input className="w-full" type="range" min={min} max={max} step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} />
    </label>
  );
}

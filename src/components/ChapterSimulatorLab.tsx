"use client";

import { useMemo, useState, type ReactNode } from "react";
import type { ChapterSimulator } from "@/lib/chapterSimulators";

type ControlId = ChapterSimulator["controls"][number]["id"];
type ControlValues = Record<ControlId, number>;

export function ChapterSimulatorLab({ simulators, contextTitle = "Chapter simulator lab", compact = false }: { simulators: ChapterSimulator[]; contextTitle?: string; compact?: boolean }) {
  const [simIndex, setSimIndex] = useState(0);
  const safeIndex = Math.min(simIndex, Math.max(simulators.length - 1, 0));
  const simulator = simulators[safeIndex];
  const [valuesById, setValuesById] = useState<Record<string, ControlValues>>({});
  const values = valuesById[simulator?.id ?? ""] ?? defaultValues(simulator);
  const metrics = useMemo(() => computeMetrics(values, simulator?.chapter ?? 1), [values, simulator?.chapter]);
  const path = chartPath(metrics);

  if (!simulator) return null;

  const updateValue = (id: ControlId, value: number) => {
    setValuesById((current) => ({
      ...current,
      [simulator.id]: { ...values, [id]: value },
    }));
  };

  return (
    <article className="chapter-simulator-lab overflow-hidden rounded-xl border border-line bg-panel" data-simulation={simulator.id} data-exploration={values.exploration} data-step-size={values.stepSize} data-horizon={values.horizon}>
      <div className="grid gap-px bg-line lg:grid-cols-[0.92fr_1.08fr]">
        <div className="bg-ink p-5 text-white lg:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2"><LabChip>Interactive simulator</LabChip><LabChip accent="lime">Ch {simulator.chapter}</LabChip><LabChip accent="blue">{safeIndex + 1}/{simulators.length}</LabChip></div>
            <span className="mono rounded-full border border-white/20 px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-white/70">live knobs</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-white/60">{contextTitle}</p>
          <h3 className="display mt-2 text-3xl font-medium text-white">{simulator.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-white/70">{simulator.question}</p>
          <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.04] p-4">
            <svg viewBox="0 0 460 300" role="img" aria-label={`${simulator.title} live control chart`} className="h-auto w-full">
              <defs>
                <linearGradient id={`sim-grad-${simulator.chapter}-${safeIndex}`} x1="0" x2="1">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="50%" stopColor="#f97316" />
                  <stop offset="100%" stopColor="#84cc16" />
                </linearGradient>
              </defs>
              <rect x="10" y="10" width="440" height="280" rx="24" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.14)" />
              <line x1="64" y1="235" x2="400" y2="235" stroke="rgba(255,255,255,0.22)" />
              <line x1="64" y1="60" x2="64" y2="235" stroke="rgba(255,255,255,0.22)" />
              {[0, 25, 50, 75, 100].map((tick) => <line key={tick} x1="60" x2="400" y1={235 - tick * 1.6} y2={235 - tick * 1.6} stroke="rgba(255,255,255,0.08)" />)}
              <path d={path} fill="none" stroke={`url(#sim-grad-${simulator.chapter}-${safeIndex})`} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="10 10" className="rl-dash" />
              {metricEntries(metrics).map((entry, index) => {
                const x = 82 + index * 92;
                const y = 235 - entry.value * 1.6;
                return <g key={entry.label}><circle cx={x} cy={y} r="18" fill={entry.color} stroke="rgba(255,255,255,0.7)" strokeWidth="2" /><text x={x} y="265" textAnchor="middle" className="fill-white text-[10px] font-semibold">{entry.short}</text><text x={x} y={y + 4} textAnchor="middle" className="fill-white text-[10px] font-semibold">{Math.round(entry.value)}</text></g>;
              })}
            </svg>
          </div>
          <p className="mt-4 rounded-lg border border-white/10 bg-white/[0.04] p-3 text-sm leading-relaxed text-white/70"><span className="text-white">Board setup:</span> {simulator.board}</p>
        </div>

        <div className="bg-panel p-5 lg:p-6">
          <div className="grid gap-4">
            <div>
              <p className="eyebrow mb-2">Choose chapter simulator</p>
              <div className={`grid gap-2 ${compact || simulators.length > 4 ? "max-h-64 overflow-auto pr-1" : "md:grid-cols-2"}`}>
                {simulators.map((item, index) => (
                  <button key={item.id} onClick={() => setSimIndex(index)} className={`rounded-lg border px-3 py-2 text-left text-sm leading-snug transition ${index === safeIndex ? "border-cyan bg-cyan/[0.08] text-ink" : "border-line bg-white text-muted hover:border-cyan hover:text-ink"}`}>
                    <span className="mono block text-[10px] uppercase tracking-[0.12em] text-dim">Chapter {item.chapter}</span>
                    {item.title.replace(/^Chapter \d+ control lab: /, "")}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-3">
              {simulator.controls.map((control) => (
                <label key={control.id} className="rounded-xl border border-line bg-white p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="font-medium text-ink">{control.label}</p>
                      <p className="mt-1 text-xs leading-relaxed text-dim">{control.lowLabel} → {control.highLabel}</p>
                    </div>
                    <span className="display text-3xl text-ink">{values[control.id]}</span>
                  </div>
                  <input className="mt-4 w-full accent-cyan" aria-label={control.label} type="range" min={control.min} max={control.max} step={control.step} value={values[control.id]} onChange={(event) => updateValue(control.id, Number(event.target.value))} />
                  <div className="mt-3 grid gap-2 md:grid-cols-2">
                    <MiniReadout label="Easy effect" text={control.easy} />
                    <MiniReadout label="Technical effect" text={control.technical} tint />
                  </div>
                </label>
              ))}
            </div>

            <div className="rounded-xl border border-line bg-white p-5">
              <div className="flex flex-wrap gap-2"><LabChip>Chapter {simulator.chapter}</LabChip><LabChip accent="blue">live readout</LabChip><LabChip accent="lime">{metricSummary(metrics)}</LabChip></div>
              <h4 className="display mt-3 text-3xl font-medium text-ink">What the knobs are showing.</h4>
              <p className="mt-4 text-sm leading-relaxed text-muted">{simulator.readoutGuide}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted"><span className="font-medium text-ink">Technical guide:</span> {simulator.technicalGuide}</p>
              <p className="mt-3 rounded-lg border border-orange/30 bg-orange/[0.06] p-3 text-sm leading-relaxed text-muted"><span className="font-medium text-orange">Pitfall:</span> {simulator.pitfall}</p>
              <p className="mt-3 rounded-lg border border-lime/30 bg-lime/[0.06] p-3 text-sm leading-relaxed text-muted"><span className="font-medium text-ink">Transfer:</span> {simulator.transfer}</p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function defaultValues(simulator?: ChapterSimulator): ControlValues {
  return {
    exploration: simulator?.controls.find((control) => control.id === "exploration")?.defaultValue ?? 50,
    stepSize: simulator?.controls.find((control) => control.id === "stepSize")?.defaultValue ?? 40,
    horizon: simulator?.controls.find((control) => control.id === "horizon")?.defaultValue ?? 50,
  };
}

function computeMetrics(values: ControlValues, chapter: number) {
  const exploration = values.exploration / 100;
  const step = values.stepSize / 100;
  const horizon = values.horizon / 100;
  const advanced = chapter >= 9 ? 1 : 0;
  return {
    learning: clamp(18 + exploration * 24 + step * 38 + horizon * 14),
    stability: clamp(94 - Math.abs(step - 0.38) * 105 - exploration * 12 - advanced * horizon * 12),
    bias: clamp(78 - horizon * 42 - exploration * 10 + (1 - step) * 12),
    variance: clamp(18 + exploration * 35 + step * 30 + horizon * 12 + advanced * 8),
  };
}

function metricEntries(metrics: ReturnType<typeof computeMetrics>) {
  return [
    { label: "learning speed", short: "learn", value: metrics.learning, color: "#06b6d4" },
    { label: "stability", short: "stable", value: metrics.stability, color: "#84cc16" },
    { label: "bias", short: "bias", value: metrics.bias, color: "#a78bfa" },
    { label: "variance", short: "var", value: metrics.variance, color: "#f97316" },
  ];
}

function chartPath(metrics: ReturnType<typeof computeMetrics>) {
  return metricEntries(metrics).map((entry, index) => `${index === 0 ? "M" : "L"} ${82 + index * 92} ${235 - entry.value * 1.6}`).join(" ");
}

function metricSummary(metrics: ReturnType<typeof computeMetrics>) {
  const entries = metricEntries(metrics).sort((a, b) => b.value - a.value);
  return `${entries[0].short} leads`;
}

function clamp(value: number) {
  return Math.max(5, Math.min(98, value));
}

function MiniReadout({ label, text, tint = false }: { label: string; text: string; tint?: boolean }) {
  return <div className={`rounded-lg border border-line ${tint ? "bg-panel-2" : "bg-panel"} p-3`}><p className="mono text-[10px] uppercase tracking-[0.14em] text-dim">{label}</p><p className="mt-2 text-xs leading-relaxed text-muted">{text}</p></div>;
}

function LabChip({ children, accent = "cyan" }: { children: ReactNode; accent?: "cyan" | "lime" | "blue" }) {
  const color = {
    cyan: "border-cyan/30 bg-cyan/[0.08] text-cyan",
    lime: "border-lime/30 bg-lime/[0.08] text-lime",
    blue: "border-blue/30 bg-blue/[0.08] text-blue",
  }[accent];
  return <span className={`mono inline-flex rounded-full border px-2.5 py-1 text-[11px] ${color}`}>{children}</span>;
}

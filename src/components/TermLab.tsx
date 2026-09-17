"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { terms } from "@/lib/paper";
import { TeX } from "./Math";
import { TermGlyph } from "./figures/TermGlyph";

export function TermLab() {
  const [active, setActive] = useState(0);
  const buttons = useRef<Array<HTMLButtonElement | null>>([]);
  const term = terms[active];
  const activeId = term.id;
  const byAccent = useMemo(() => terms.reduce<Record<string, number>>((acc, item) => ({ ...acc, [item.accent]: (acc[item.accent] ?? 0) + 1 }), {}), []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") setActive((i) => (i + 1) % terms.length);
      if (event.key === "ArrowLeft") setActive((i) => (i - 1 + terms.length) % terms.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    buttons.current[active]?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }, [active, activeId]);

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
      <div className="min-w-0 overflow-hidden rounded-xl border border-line bg-panel p-5">
        <div className="flex min-w-0 gap-2 overflow-x-auto pb-3" aria-label="Term buttons">
          {terms.map((item, index) => (
            <button
              key={item.id}
              ref={(node) => { buttons.current[index] = node; }}
              onClick={() => setActive(index)}
              className={`shrink-0 rounded-full border px-3 py-2 text-sm transition ${index === active ? "border-cyan bg-cyan text-white" : "border-line bg-panel-2 text-ink hover:border-cyan"}`}
              aria-pressed={index === active}
            >
              <TeX>{item.sym}</TeX>
            </button>
          ))}
        </div>
        <div className="mt-5 grid min-w-0 gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
          <div className="min-w-0">
            <p className="eyebrow">{active + 1} of {terms.length}</p>
            <h3 className="display mt-2 text-4xl font-medium text-ink"><TeX>{term.sym}</TeX></h3>
            <p className="mt-2 text-lg font-medium text-ink">{term.name}</p>
            <div className="mt-6 grid gap-4">
              <Info title="In plain words" text={term.plain} />
              <Info title="Precisely" text={term.precise} />
              <Info title="Why it is there" text={term.why} />
              <Info title="Where it appears" text={term.appears} />
            </div>
          </div>
          <div className="rounded-xl border border-line bg-panel-2 p-3">
            <TermGlyph kind={term.glyph} accent={term.accent} />
          </div>
        </div>
        <div className="mt-5 flex justify-between gap-3">
          <button className="rounded-lg border border-line bg-panel-2 px-4 py-2 text-sm" onClick={() => setActive((i) => (i - 1 + terms.length) % terms.length)}>‹ previous</button>
          <button className="rounded-lg border border-line bg-panel-2 px-4 py-2 text-sm" onClick={() => setActive((i) => (i + 1) % terms.length)}>next ›</button>
        </div>
      </div>
      <aside className="min-w-0 rounded-xl border border-line bg-panel p-6">
        <p className="eyebrow">Coverage check</p>
        <h3 className="display mt-2 text-2xl font-medium text-ink">Symbols before formulas</h3>
        <p className="mt-4 text-sm leading-relaxed text-muted">This term lab front-loads notation that appears across the chapter explanations: policies, returns, values, dynamics, backups, sampling ratios, traces, gradients, and options.</p>
        <div className="mt-6 grid gap-3">
          {Object.entries(byAccent).map(([accent, count]) => (
            <div key={accent} className="flex items-center justify-between rounded-lg border border-line bg-panel-2 px-3 py-2">
              <span className="mono text-[11px] uppercase tracking-[0.14em] text-dim">{accent}</span>
              <span className="display text-xl text-ink">{count}</span>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}

function Info({ title, text }: { title: string; text: string }) {
  return (
    <div className="min-w-0 rounded-lg border border-line bg-white p-4">
      <p className="mono mb-2 text-[11px] uppercase tracking-[0.14em] text-dim">{title}</p>
      <p className="text-sm leading-relaxed text-muted">{text}</p>
    </div>
  );
}

"use client";

import { useMemo, useState } from "react";
import { formulaAtlas } from "@/lib/formulaAtlas";
import { FormulaLectureReader } from "./FormulaLectureReader";
import { TeX } from "./Math";
import { Chip } from "./Section";

const families = ["All", ...Array.from(new Set(formulaAtlas.map((formula) => formula.family)))] as const;

type Family = (typeof families)[number];

export function FormulaAtlas() {
  const [family, setFamily] = useState<Family>("All");
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return formulaAtlas.filter((formula) => {
      const familyMatch = family === "All" || formula.family === family;
      const haystack = [formula.chapter, formula.family, formula.label, formula.tex, formula.easy, formula.technical, formula.useWhen, formula.watchOut, ...formula.symbols].join(" ").toLowerCase();
      return familyMatch && (!q || haystack.includes(q));
    });
  }, [family, query]);

  return (
    <div className="mt-8 grid gap-6">
      <div className="rounded-xl border border-line bg-panel p-5">
        <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="eyebrow">Formula atlas</p>
            <h3 className="display mt-2 text-3xl font-medium text-ink">44 book-wide equations and formal templates with easy and technical handles.</h3>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">
              The spine above shows the recurring shape. This atlas is denser: it covers bandits, MDPs, DP, MC, TD, multi-step methods, planning, approximation, off-policy stability, traces, policy gradients, psychology, neuroscience, applications, options, and GVFs.
            </p>
          </div>
          <label className="flex min-w-0 items-center gap-3 rounded-full border border-line bg-panel-2 px-4 py-2 lg:w-[340px]">
            <span className="mono text-[11px] uppercase tracking-[0.14em] text-dim">Search</span>
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="UCB, MSPBE, option..." className="min-w-0 flex-1 bg-transparent text-sm text-ink outline-none" />
          </label>
        </div>
        <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
          {families.map((item) => (
            <button key={item} onClick={() => setFamily(item)} className={`whitespace-nowrap rounded-full border px-3 py-2 text-xs ${family === item ? "border-cyan bg-cyan text-white" : "border-line bg-white text-muted hover:border-cyan"}`}>
              {item}
            </button>
          ))}
        </div>
      </div>

      <FormulaLectureReader formulas={visible} contextTitle="Global formula atlas: all chapters" compact />

      <div className="grid gap-4 lg:grid-cols-2">
        {visible.map((formula) => (
          <article key={`${formula.chapter}-${formula.label}`} className="rounded-xl border border-line bg-panel p-5">
            <div className="flex flex-wrap gap-2">
              <Chip accent="blue">chapter {formula.chapter}</Chip>
              <Chip accent="cyan">{formula.family}</Chip>
            </div>
            <h4 className="display mt-4 text-2xl font-medium text-ink">{formula.label}</h4>
            <TeX block>{formula.tex}</TeX>
            <div className="grid gap-3 md:grid-cols-2">
              <div className="rounded-lg border border-line bg-white p-3">
                <p className="mono mb-2 text-[10px] uppercase tracking-[0.14em] text-lime">Easy handle</p>
                <p className="text-sm leading-relaxed text-muted">{formula.easy}</p>
              </div>
              <div className="rounded-lg border border-line bg-panel-2 p-3">
                <p className="mono mb-2 text-[10px] uppercase tracking-[0.14em] text-dim">Technical handle</p>
                <p className="text-sm leading-relaxed text-muted">{formula.technical}</p>
              </div>
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <div>
                <p className="mono mb-2 text-[10px] uppercase tracking-[0.14em] text-dim">Use when</p>
                <p className="text-sm leading-relaxed text-muted">{formula.useWhen}</p>
              </div>
              <div>
                <p className="mono mb-2 text-[10px] uppercase tracking-[0.14em] text-orange">Watch out</p>
                <p className="text-sm leading-relaxed text-muted">{formula.watchOut}</p>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {formula.symbols.map((symbol) => <span key={symbol} className="mono rounded-full border border-line bg-panel-2 px-2 py-1 text-[10px] text-dim">{symbol}</span>)}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

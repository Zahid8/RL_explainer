"use client";

import { useEffect, useState } from "react";

const links = [
  ["book", "Book"],
  ["primer", "Primer"],
  ["foundations", "Foundations"],
  ["math", "Math"],
  ["stories", "Stories"],
  ["analogies", "Analogies"],
  ["theater", "Theater"],
  ["sections", "Sections"],
  ["search", "Search"],
  ["graph", "Graph"],
  ["symbols", "Symbols"],
  ["code", "Code"],
  ["assumptions", "Trust"],
  ["proofs", "Proofs"],
  ["exam", "Exam"],
  ["recall", "Recall"],
  ["concepts", "Concepts"],
  ["worked", "Worked"],
  ["clinic", "Clinic"],
  ["simulators", "Sim"],
  ["terms", "Terms"],
  ["map", "Map"],
  ["chapters", "Chapters"],
  ["mastery", "Mastery"],
  ["equations", "Equations"],
  ["evidence", "Evidence"],
  ["exercises", "Exercises"],
  ["algorithms", "Algorithms"],
  ["compare", "Compare"],
  ["labs", "Labs"],
  ["glossary", "Glossary"],
] as const;

export function Nav() {
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState("terms");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
      setScrolled(window.scrollY > 40);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    links.forEach(([id]) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <nav className={`fixed inset-x-0 top-0 z-50 transition-colors ${scrolled ? "border-b border-line bg-bg/85 backdrop-blur-xl" : "bg-transparent"}`}>
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-6 lg:px-10">
        <a href="#top" className="flex items-center gap-3" aria-label="Back to top">
          <span className="mono grid size-8 place-items-center rounded-lg bg-ink text-xs text-white">RL</span>
          <span className="display text-xl font-medium text-ink">RLbook Explainer</span>
        </a>
        <div className="hidden items-center gap-5 lg:flex">
          {links.map(([id, label]) => (
            <a key={id} href={`#${id}`} className={`mono text-[11px] uppercase tracking-[0.14em] transition-colors ${active === id ? "text-cyan" : "text-dim hover:text-ink"}`}>
              {label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <a className="mono rounded-full border border-line bg-panel px-3 py-1.5 text-[11px] uppercase tracking-[0.14em] text-muted" href="/book">Book mode</a>
          <a className="mono rounded-full border border-line bg-panel px-3 py-1.5 text-[11px] uppercase tracking-[0.14em] text-muted" href="/foundations">Foundations</a>
          <a className="mono rounded-full border border-line bg-panel px-3 py-1.5 text-[11px] uppercase tracking-[0.14em] text-muted" href="/math">Math</a>
          <a className="mono rounded-full border border-line bg-panel px-3 py-1.5 text-[11px] uppercase tracking-[0.14em] text-muted" href="/stories">Stories</a>
          <a className="mono rounded-full border border-line bg-panel px-3 py-1.5 text-[11px] uppercase tracking-[0.14em] text-muted" href="/analogies">Analogies</a>
          <a className="mono rounded-full border border-line bg-panel px-3 py-1.5 text-[11px] uppercase tracking-[0.14em] text-muted" href="/sections">Sections</a>
          <a className="mono rounded-full border border-line bg-panel px-3 py-1.5 text-[11px] uppercase tracking-[0.14em] text-muted" href="/search">Search</a>
          <a className="mono rounded-full border border-line bg-panel px-3 py-1.5 text-[11px] uppercase tracking-[0.14em] text-muted" href="/graph">Graph</a>
          <a className="mono rounded-full border border-line bg-panel px-3 py-1.5 text-[11px] uppercase tracking-[0.14em] text-muted" href="/symbols">Symbols</a>
          <a className="mono rounded-full border border-line bg-panel px-3 py-1.5 text-[11px] uppercase tracking-[0.14em] text-muted" href="/code">Code</a>
          <a className="mono rounded-full border border-line bg-panel px-3 py-1.5 text-[11px] uppercase tracking-[0.14em] text-muted" href="/assumptions">Trust</a>
          <a className="mono rounded-full border border-line bg-panel px-3 py-1.5 text-[11px] uppercase tracking-[0.14em] text-muted" href="/proofs">Proofs</a>
          <a className="mono rounded-full border border-line bg-panel px-3 py-1.5 text-[11px] uppercase tracking-[0.14em] text-muted" href="/exam">Exam</a>
          <a className="mono rounded-full border border-line bg-panel px-3 py-1.5 text-[11px] uppercase tracking-[0.14em] text-muted" href="/exercises">Exercises</a>
          <a className="mono rounded-full border border-line bg-panel px-3 py-1.5 text-[11px] uppercase tracking-[0.14em] text-muted" href="/algorithms">109 algorithms</a>
          <a className="mono rounded-full border border-line bg-panel px-3 py-1.5 text-[11px] uppercase tracking-[0.14em] text-muted" href="/compare">Compare</a>
          <a className="mono rounded-full border border-line bg-panel px-3 py-1.5 text-[11px] uppercase tracking-[0.14em] text-muted" href="/coverage">Coverage</a>
        </div>
      </div>
      <div className="h-px bg-line-soft">
        <div className="h-px bg-cyan" style={{ width: `${Math.round(progress * 100)}%` }} />
      </div>
    </nav>
  );
}

import { book } from "@/lib/paper";
import { SceneMount } from "./three/SceneMount";

export function Hero() {
  return (
    <header id="top" className="relative min-h-[760px] overflow-hidden border-b border-line pt-24">
      <div className="paper-grid absolute inset-0 opacity-70" />
      <div className="absolute inset-y-0 right-0 hidden w-[56%] lg:block">
        <SceneMount />
      </div>
      <div className="absolute inset-y-0 left-0 hidden w-[62%] bg-gradient-to-r from-bg via-bg to-transparent lg:block" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg to-transparent" />
      <div className="relative mx-auto flex max-w-[1280px] px-6 py-24 lg:px-10 lg:py-32">
        <div className="max-w-3xl">
          <div className="mono mb-8 inline-flex rounded-full border border-line bg-panel/80 px-3 py-1.5 text-[11px] uppercase tracking-[0.16em] text-cyan">
            Sutton & Barto - second edition
          </div>
          <h1 className="display text-[clamp(42px,7vw,84px)] font-normal text-ink">
            Reinforcement Learning,
            <span className="block italic text-cyan">as a standalone web book.</span>
          </h1>
          <p className="mt-7 max-w-2xl text-[18px] leading-8 text-muted">{book.claim}</p>
          <p className="mt-4 text-sm leading-7 text-dim">Source structure: {book.source}. This is an original, standalone teaching rewrite in new words and diagrams; it does not reproduce the book&apos;s prose.</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a className="rounded-lg bg-cyan px-5 py-3 text-sm font-medium text-white" href="#chapters">Start with chapters</a>
            <a className="rounded-lg border border-line bg-panel px-5 py-3 text-sm font-medium text-ink" href="/algorithms">Browse all algorithms</a>
            <a className="rounded-lg border border-line bg-panel px-5 py-3 text-sm font-medium text-ink" href="/coverage">Open coverage audit</a>
            <a className="rounded-lg border border-line bg-panel px-5 py-3 text-sm font-medium text-ink" href="#labs">Try the interactive labs</a>
          </div>
          <div className="mt-12 grid max-w-3xl gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-4">
            {book.stats.map((stat) => (
              <div key={stat.label} className="bg-panel p-5">
                <div className="display text-4xl font-medium text-ink">{stat.value}</div>
                <div className="mono mt-2 text-[11px] uppercase tracking-[0.14em] text-dim">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}

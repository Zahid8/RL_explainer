import type { Metadata } from "next";
import Link from "next/link";
import { AnimatedConceptGraphic } from "@/components/AnimatedConceptGraphic";
import { MotionGlyph } from "@/components/MotionGlyph";
import { Chip } from "@/components/Section";
import { SymbolDecoder } from "@/components/SymbolDecoder";
import { allSymbolCards, symbolCardCount, symbolChapterCount, symbolLectureModeCount, uniqueSymbolCount } from "@/lib/symbolAtlas";

export const metadata: Metadata = {
  title: "Symbol Decoder | RLbook Explainer",
  description: "A chapter-by-chapter notation decoder for RL symbols, equations, pitfalls, and self-checks.",
};

export default function SymbolsPage() {
  const cards = allSymbolCards();
  const byChapter = Array.from(new Map(cards.map((card) => [card.chapter, cards.filter((item) => item.chapter === card.chapter)])).entries());

  return (
    <main className="min-h-screen bg-bg text-ink">
      <header className="border-b border-line bg-panel paper-grid">
        <div className="mx-auto max-w-[1280px] px-6 py-8 lg:px-10">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
            <Link href="/" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">← Home overview</Link>
            <Link href="/book" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Linear book</Link>
            <Link href="/search" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Search index</Link>
            <Link href="/graph" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Learning graph</Link>
            <Link href="/sections" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Section mastery</Link>
            <Link href="/code" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Code lab</Link>
            <Link href="/assumptions" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Trust clinic</Link>
            <Link href="/compare" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Compare methods</Link>
            <Link href="/proofs" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Proof lab</Link>
            <Link href="/exam" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Exam studio</Link>
            <Link href="/exercises" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Exercise solutions</Link>
            <Link href="/coverage" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Coverage audit</Link>
          </div>
          <div className="grid gap-8 lg:grid-cols-[1fr_440px] lg:items-end">
            <div>
              <p className="eyebrow">Symbol decoder</p>
              <h1 className="display mt-4 max-w-5xl text-[clamp(42px,7vw,88px)] font-medium text-ink">Learn every recurring RL mark before equations feel scary.</h1>
              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted">This notation layer turns formula symbols into mini lectures. Each mark gets a plain-language role, a technical role, formula context, a watch-out, and a self-check so the standalone book can teach math from scratch before the code lab asks readers to name targets, updates, and invariants, before the proof lab asks why the equation is believable, and before the trust clinic asks when those targets are valid, and before the section mastery studio and exam studio ask you to explain the symbols without hints.</p>
              <div className="mt-6 flex flex-wrap gap-2">
                <Chip accent="cyan">{symbolCardCount()} chapter symbol cards</Chip>
                <Chip accent="lime">{uniqueSymbolCount()} unique marks</Chip>
                <Chip accent="blue">{symbolLectureModeCount()} symbol modes</Chip>
                <Chip accent="violet">{symbolChapterCount()} chapters</Chip>
                <Chip accent="orange">plain + technical + pitfalls</Chip>
              </div>
            </div>
            <div className="grid gap-4">
              <AnimatedConceptGraphic label="Symbol decoder" variant="formula" caption="The symbol decoder creates a path from mark, to spoken name, to formula role, to technical condition, to self-check." compact />
              <div className="rounded-xl border border-line bg-white p-5">
                <div className="mb-3 flex items-start justify-between gap-3"><p className="eyebrow">Chapter notation density</p><MotionGlyph label="symbol density" variant="formula" accent="violet" className="-mr-2 -mt-2 motion-glyph-small" /></div>
                <div className="grid gap-2">
                  {byChapter.map(([chapter, items]) => (
                    <a key={chapter} href={`#symbols-chapter-${chapter}`} className="flex items-center justify-between gap-3 rounded-lg border border-line bg-panel-2 px-3 py-2 text-sm hover:border-cyan">
                      <span className="text-muted">Chapter {chapter}</span>
                      <span className="display text-xl text-ink">{items.length}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1280px] px-6 py-12 lg:px-10">
        <SymbolDecoder cards={cards} contextTitle="Whole-book notation decoder" />
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {byChapter.map(([chapter, items]) => (
            <a id={`symbols-chapter-${chapter}`} key={chapter} href={`/chapters/${chapter}#symbols`} className="rounded-xl border border-line bg-panel p-5 hover:border-cyan">
              <div className="flex flex-wrap gap-2"><Chip accent="cyan">Chapter {chapter}</Chip><Chip accent="lime">{items.length} symbols</Chip><Chip accent="blue">{items.length * 5} modes</Chip></div>
              <h2 className="display mt-4 text-2xl font-medium text-ink">Notation decoded in context</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">Includes {items.slice(0, 5).map((item) => item.spokenAs).join(", ")}{items.length > 5 ? ", and more" : ""}.</p>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}

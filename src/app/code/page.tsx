import type { Metadata } from "next";
import Link from "next/link";
import { AnimatedConceptGraphic } from "@/components/AnimatedConceptGraphic";
import { CodeLab } from "@/components/CodeLab";
import { MotionGlyph } from "@/components/MotionGlyph";
import { Chip } from "@/components/Section";
import { allCodeLabCards, codeLabCardCount, codeLabChapterCount, codeLabModeCount } from "@/lib/codeLab";

export const metadata: Metadata = {
  title: "Implementation Code Lab | RLbook Explainer",
  description: "Python-style implementation scaffolds, invariants, tests, and debugging checks for every algorithm in the standalone RL web book.",
};

export default function CodePage() {
  const cards = allCodeLabCards();
  const byChapter = Array.from(new Map(cards.map((card) => [card.chapter, cards.filter((item) => item.chapter === card.chapter)])).entries());
  const denseChapters = [...byChapter].sort((a, b) => b[1].length - a[1].length).slice(0, 6);

  return (
    <main className="min-h-screen bg-bg text-ink">
      <header className="border-b border-line bg-panel paper-grid">
        <div className="mx-auto max-w-[1280px] px-6 py-8 lg:px-10">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
            <Link href="/" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">← Home overview</Link>
            <Link href="/book" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Linear book</Link>
            <Link href="/search" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Search index</Link>
            <Link href="/symbols" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Symbols</Link>
            <Link href="/assumptions" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Trust clinic</Link>
            <Link href="/coverage" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Coverage audit</Link>
          </div>
          <div className="grid gap-8 lg:grid-cols-[1fr_440px] lg:items-end">
            <div>
              <p className="eyebrow">Implementation code lab</p>
              <h1 className="display mt-4 max-w-5xl text-[clamp(42px,7vw,88px)] font-medium text-ink">Turn each RL algorithm into code you can debug by hand.</h1>
              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted">This layer converts every algorithm card into a Python-style teaching scaffold: plain implementation plan, code structure, invariants, tiny tests, debugging checks, and a bridge to the assumption clinic that asks when the implementation deserves trust.</p>
              <div className="mt-6 flex flex-wrap gap-2">
                <Chip accent="cyan">{codeLabCardCount()} implementation labs</Chip>
                <Chip accent="lime">{codeLabModeCount()} code modes</Chip>
                <Chip accent="blue">{codeLabChapterCount()} chapters</Chip>
                <Chip accent="violet">code + invariants + tests</Chip>
                <Chip accent="orange">debug checklists</Chip>
              </div>
            </div>
            <div className="grid gap-4">
              <AnimatedConceptGraphic label="Implementation code lab" variant="algorithm" caption="Implementation is a loop: read data, compute a target, form an error, update state, and test invariants." compact />
              <div className="rounded-xl border border-line bg-white p-5">
                <div className="mb-3 flex items-start justify-between gap-3"><p className="eyebrow">Dense implementation chapters</p><MotionGlyph label="code density" variant="bars" accent="orange" className="-mr-2 -mt-2 motion-glyph-small" /></div>
                <div className="grid gap-2">
                  {denseChapters.map(([chapter, items]) => (
                    <a key={chapter} href={`#code-chapter-${chapter}`} className="flex items-center justify-between gap-3 rounded-lg border border-line bg-panel-2 px-3 py-2 text-sm hover:border-cyan">
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
        <CodeLab cards={cards} contextTitle="Whole-book implementation code lab" />
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {byChapter.map(([chapter, items]) => (
            <a id={`code-chapter-${chapter}`} key={chapter} href={`/chapters/${chapter}#code-lab`} className="rounded-xl border border-line bg-panel p-5 hover:border-cyan">
              <div className="flex flex-wrap gap-2"><Chip accent="cyan">Chapter {chapter}</Chip><Chip accent="lime">{items.length} labs</Chip><Chip accent="blue">{items.length * 5} modes</Chip></div>
              <h2 className="display mt-4 text-2xl font-medium text-ink">Implementation path</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">Includes {items.slice(0, 4).map((item) => item.title.replace(" implementation lab", "")).join(", ")}{items.length > 4 ? ", and more" : ""}.</p>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { AnimatedConceptGraphic } from "@/components/AnimatedConceptGraphic";
import { MathRescueStudio } from "@/components/MathRescueStudio";
import { MotionGlyph } from "@/components/MotionGlyph";
import { Chip } from "@/components/Section";
import { allMathRescueCards, mathRescueCardCount, mathRescueChapterCount, mathRescueModeCount, mathRescueObjectCount, mathRescueSourceCount, mathRescueSymbolCount } from "@/lib/mathRescue";
import { chapters } from "@/lib/paper";

export const metadata: Metadata = {
  title: "Math Rescue | RLbook Explainer",
  description: "A from-scratch rescue studio for the mathematical objects used in reinforcement learning chapters.",
};

export default function MathPage() {
  const cards = allMathRescueCards();
  const byChapter = chapters.map((chapter) => [chapter.n, cards.filter((card) => card.chapter === chapter.n)] as const).filter(([, items]) => items.length > 0);
  const bySource = Array.from(new Map(cards.map((card) => [card.sourceLabel, cards.filter((item) => item.sourceLabel === card.sourceLabel)] as const)).entries()).sort((a, b) => b[1].length - a[1].length);

  return (
    <main className="min-h-screen bg-bg text-ink">
      <header className="border-b border-line bg-panel paper-grid">
        <div className="mx-auto max-w-[1280px] px-6 py-8 lg:px-10">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
            <Link href="/" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-orange">← Home overview</Link>
            <Link href="/book" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-orange">Linear book</Link>
            <Link href="/foundations" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-orange">Foundations</Link>
            <Link href="/stories" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-orange">Stories</Link>
            <Link href="/analogies" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-violet">Analogies</Link>
            <Link href="/tutor" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Tutor</Link>
            <Link href="/cases" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Cases</Link>
            <Link href="/projects" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-lime">Projects</Link>
            <Link href="/symbols" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-orange">Symbols</Link>
            <Link href="/code" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-orange">Code lab</Link>
            <Link href="/coverage" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-orange">Coverage audit</Link>
          </div>
          <div className="grid gap-8 lg:grid-cols-[1fr_440px] lg:items-end">
            <div>
              <p className="eyebrow">Math rescue studio</p>
              <h1 className="display mt-4 max-w-5xl text-[clamp(42px,7vw,88px)] font-medium text-ink">Learn the calculation before the notation gets dense.</h1>
              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted">
                This route rescues the mathematical objects behind the RL book: expectations, returns, Bellman backups, update errors, gradients, importance ratios, traces, projections, and optimization steps. Every card starts with why the object exists, then draws it, names symbols, places it in the chapter, and tests understanding.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <Chip accent="orange">{mathRescueCardCount()} math rescue cards</Chip>
                <Chip accent="lime">{mathRescueModeCount()} rescue modes</Chip>
                <Chip accent="blue">{mathRescueChapterCount()} chapters</Chip>
                <Chip accent="violet">{mathRescueObjectCount()} unique objects</Chip>
                <Chip accent="cyan">{mathRescueSymbolCount()} symbol handles</Chip>
                <Chip accent="orange">{mathRescueSourceCount()} source layers</Chip>
              </div>
            </div>
            <div className="grid gap-4">
              <AnimatedConceptGraphic label="Math rescue studio" variant="formula" caption="Every formula becomes a five-step rescue: intuition, board drawing, symbol translation, chapter use, and no-notes check." compact />
              <div className="rounded-xl border border-line bg-white p-5">
                <div className="mb-3 flex items-start justify-between gap-3"><p className="eyebrow">Source blend</p><MotionGlyph label="math rescue source layers" variant="bars" accent="orange" className="-mr-2 -mt-2 motion-glyph-small" /></div>
                <div className="grid gap-2">
                  {bySource.map(([source, items]) => (
                    <a key={source} href={`#source-${slug(source)}`} className="flex items-center justify-between gap-3 rounded-lg border border-line bg-panel-2 px-3 py-2 text-sm hover:border-orange">
                      <span className="text-muted">{source}</span>
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
        <MathRescueStudio cards={cards} contextTitle="Whole-book math rescue studio" />
        <section className="mt-10 grid gap-4 lg:grid-cols-3">
          {byChapter.map(([chapter, items]) => (
            <a id={`math-chapter-${chapter}`} key={chapter} href={`/chapters/${chapter}#math-rescue`} className="rounded-xl border border-line bg-panel p-5 hover:border-orange">
              <div className="flex flex-wrap gap-2"><Chip accent="blue">Chapter {chapter}</Chip><Chip accent="orange">{items.length} objects</Chip><Chip accent="lime">{items.length * 5} modes</Chip></div>
              <h2 className="display mt-4 text-2xl font-medium text-ink">Chapter math bridge</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">Rescues {items.slice(0, 4).map((item) => item.object).join(", ")}{items.length > 4 ? ", and more" : ""}.</p>
            </a>
          ))}
        </section>
        <section className="mt-12 grid gap-4 lg:grid-cols-4">
          {bySource.map(([source, items]) => (
            <article id={`source-${slug(source)}`} key={source} className="rounded-xl border border-line bg-panel p-5">
              <div className="flex flex-wrap gap-2"><Chip accent="orange">{source}</Chip><Chip accent="cyan">{items.length} cards</Chip></div>
              <h2 className="display mt-4 text-2xl font-medium text-ink">Rescue source layer</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">Uses {items.slice(0, 4).map((item) => item.object).join(", ")}{items.length > 4 ? ", and related objects" : ""} to turn chapter math into a board explanation.</p>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}

function slug(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60) || "source";
}

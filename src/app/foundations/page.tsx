import type { Metadata } from "next";
import Link from "next/link";
import { AnimatedConceptGraphic } from "@/components/AnimatedConceptGraphic";
import { FoundationDictionaryStudio } from "@/components/FoundationDictionaryStudio";
import { MotionGlyph } from "@/components/MotionGlyph";
import { Chip } from "@/components/Section";
import { allFoundationDictionaryCards, foundationDictionaryCardCount, foundationDictionaryChapterCount, foundationDictionaryModeCount, foundationDictionarySourceCount, foundationDictionaryTermCount } from "@/lib/foundationDictionary";
import { chapters } from "@/lib/paper";

export const metadata: Metadata = {
  title: "Foundation Dictionary | RLbook Explainer",
  description: "A from-scratch RL vocabulary studio with plain meaning, board picture, technical role, trap, and teach-back modes.",
};

export default function FoundationsPage() {
  const cards = allFoundationDictionaryCards();
  const byChapter = chapters.map((chapter) => [chapter.n, cards.filter((card) => card.chapter === chapter.n)] as const).filter(([, items]) => items.length > 0);
  const bySource = Array.from(new Map(cards.map((card) => [card.sourceLabel, cards.filter((item) => item.sourceLabel === card.sourceLabel)] as const)).entries()).sort((a, b) => b[1].length - a[1].length);

  return (
    <main className="min-h-screen bg-bg text-ink">
      <header className="border-b border-line bg-panel paper-grid">
        <div className="mx-auto max-w-[1280px] px-6 py-8 lg:px-10">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
            <Link href="/" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">← Home overview</Link>
            <Link href="/book" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Linear book</Link>
            <Link href="/math" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-orange">Math rescue</Link>
            <Link href="/stories" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Stories</Link>
            <Link href="/analogies" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-violet">Analogies</Link>
            <Link href="/tutor" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Tutor</Link>
            <Link href="/cases" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Cases</Link>
            <Link href="/projects" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-lime">Projects</Link>
            <Link href="/evidence" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Evidence replay</Link>
            <Link href="/search" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Search</Link>
            <Link href="/graph" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Learning graph</Link>
            <Link href="/symbols" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Symbols</Link>
            <Link href="/compare" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Compare methods</Link>
            <Link href="/coverage" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Coverage audit</Link>
          </div>
          <div className="grid gap-8 lg:grid-cols-[1fr_440px] lg:items-end">
            <div>
              <p className="eyebrow">Foundation dictionary studio</p>
              <h1 className="display mt-4 max-w-5xl text-[clamp(42px,7vw,88px)] font-medium text-ink">Learn RL words before they become equations.</h1>
              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted">
                This route is the from-scratch vocabulary desk for the standalone book. Pick a term, read its plain meaning, draw it on the board, name the technical object, avoid the common trap, then teach it back without notes.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <Chip accent="cyan">{foundationDictionaryCardCount()} foundation cards</Chip>
                <Chip accent="lime">{foundationDictionaryModeCount()} dictionary modes</Chip>
                <Chip accent="blue">{foundationDictionaryChapterCount()} chapters</Chip>
                <Chip accent="violet">{foundationDictionaryTermCount()} unique terms</Chip>
                <Chip accent="orange">{foundationDictionarySourceCount()} source layers</Chip>
              </div>
            </div>
            <div className="grid gap-4">
              <AnimatedConceptGraphic label="Foundation dictionary studio" variant="tree" caption="Every technical term should pass through plain meaning, drawing, formal role, trap, and teach-back before it is used in the dense chapter lecture." compact />
              <div className="rounded-xl border border-line bg-white p-5">
                <div className="mb-3 flex items-start justify-between gap-3"><p className="eyebrow">Source blend</p><MotionGlyph label="foundation source layers" variant="bars" accent="cyan" className="-mr-2 -mt-2 motion-glyph-small" /></div>
                <div className="grid gap-2">
                  {bySource.map(([source, items]) => (
                    <a key={source} href={`#source-${slug(source)}`} className="flex items-center justify-between gap-3 rounded-lg border border-line bg-panel-2 px-3 py-2 text-sm hover:border-cyan">
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
        <FoundationDictionaryStudio cards={cards} contextTitle="Whole-book foundation dictionary studio" />
        <section className="mt-10 grid gap-4 lg:grid-cols-3">
          {byChapter.map(([chapter, items]) => (
            <a id={`foundation-chapter-${chapter}`} key={chapter} href={`/chapters/${chapter}#foundations`} className="rounded-xl border border-line bg-panel p-5 hover:border-cyan">
              <div className="flex flex-wrap gap-2"><Chip accent="blue">Chapter {chapter}</Chip><Chip accent="cyan">{items.length} terms</Chip><Chip accent="lime">{items.length * 5} modes</Chip></div>
              <h2 className="display mt-4 text-2xl font-medium text-ink">Chapter vocabulary bridge</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">Includes {items.slice(0, 4).map((item) => item.term).join(", ")}{items.length > 4 ? ", and more" : ""}.</p>
            </a>
          ))}
        </section>
        <section className="mt-12 grid gap-4 lg:grid-cols-3">
          {bySource.map(([source, items]) => (
            <article id={`source-${slug(source)}`} key={source} className="rounded-xl border border-line bg-panel p-5">
              <div className="flex flex-wrap gap-2"><Chip accent="orange">{source}</Chip><Chip accent="cyan">{items.length} cards</Chip></div>
              <h2 className="display mt-4 text-2xl font-medium text-ink">Dictionary source layer</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">Uses terms such as {items.slice(0, 4).map((item) => item.term).join(", ")}{items.length > 4 ? ", and related terms" : ""} to connect beginner language with technical chapter objects.</p>
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

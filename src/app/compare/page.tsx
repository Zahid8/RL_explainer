import type { Metadata } from "next";
import Link from "next/link";
import { AnimatedConceptGraphic } from "@/components/AnimatedConceptGraphic";
import { MethodCompareStudio } from "@/components/MethodCompareStudio";
import { MotionGlyph } from "@/components/MotionGlyph";
import { Chip } from "@/components/Section";
import { allMethodCompareCards, methodCompareCardCount, methodCompareChapterCount, methodCompareFamilyCount, methodCompareModeCount } from "@/lib/methodCompare";
import { chapters } from "@/lib/paper";

export const metadata: Metadata = {
  title: "Method Comparison Studio | RLbook Explainer",
  description: "Interactive choose, axis, tradeoff, failure, and bridge comparisons for RL algorithms and procedures.",
};

export default function ComparePage() {
  const cards = allMethodCompareCards();
  const byChapter = chapters.map((chapter) => [chapter.n, cards.filter((card) => card.chapter === chapter.n)] as const).filter(([, items]) => items.length > 0);
  const byFamily = Array.from(new Map(cards.map((card) => [card.family, cards.filter((item) => item.family === card.family)] as const)).entries()).sort((a, b) => b[1].length - a[1].length).slice(0, 9);

  return (
    <main className="min-h-screen bg-bg text-ink">
      <header className="border-b border-line bg-panel paper-grid">
        <div className="mx-auto max-w-[1280px] px-6 py-8 lg:px-10">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
            <Link href="/" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-violet">← Home overview</Link>
            <Link href="/book" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-violet">Linear book</Link>
            <Link href="/foundations" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Foundations</Link>
            <Link href="/math" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-orange">Math rescue</Link>
            <Link href="/stories" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Stories</Link>
            <Link href="/analogies" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-violet">Analogies</Link>
            <Link href="/algorithms" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-violet">Algorithms</Link>
            <Link href="/code" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-violet">Code lab</Link>
            <Link href="/assumptions" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-violet">Trust clinic</Link>
            <Link href="/search" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-violet">Search</Link>
            <Link href="/coverage" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-violet">Coverage audit</Link>
          </div>
          <div className="grid gap-8 lg:grid-cols-[1fr_440px] lg:items-end">
            <div>
              <p className="eyebrow">Method comparison studio</p>
              <h1 className="display mt-4 max-w-5xl text-[clamp(42px,7vw,88px)] font-medium text-ink">Choose RL methods by evidence, not by memorized names.</h1>
              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted">
                This layer turns every algorithm card into a comparison lecture. Pick a method, compare it with a nearby alternative, inspect the technical axes, name the tradeoff, debug the failure mode, and bridge the decision to a new chapter setting.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <Chip accent="violet">{methodCompareCardCount()} comparison cards</Chip>
                <Chip accent="lime">{methodCompareModeCount()} comparison modes</Chip>
                <Chip accent="blue">{methodCompareChapterCount()} chapters</Chip>
                <Chip accent="orange">{methodCompareFamilyCount()} method families</Chip>
                <Chip accent="cyan">choose + axes</Chip>
                <Chip accent="violet">tradeoff + failure + bridge</Chip>
              </div>
            </div>
            <div className="grid gap-4">
              <AnimatedConceptGraphic label="Method comparison studio" variant="algorithm" caption="A method is a bargain: data access, target construction, backup depth, model use, variance, bias, and stability." compact />
              <div className="rounded-xl border border-line bg-white p-5">
                <div className="mb-3 flex items-start justify-between gap-3"><p className="eyebrow">Densest families</p><MotionGlyph label="method families" variant="bars" accent="violet" className="-mr-2 -mt-2 motion-glyph-small" /></div>
                <div className="grid gap-2">
                  {byFamily.map(([family, items]) => (
                    <a key={family} href={`#family-${slug(family)}`} className="flex items-center justify-between gap-3 rounded-lg border border-line bg-panel-2 px-3 py-2 text-sm hover:border-violet">
                      <span className="text-muted">{family}</span>
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
        <MethodCompareStudio cards={cards} contextTitle="Whole-book method comparison studio" />
        <section className="mt-10 grid gap-4 lg:grid-cols-3">
          {byChapter.map(([chapter, items]) => (
            <a id={`compare-chapter-${chapter}`} key={chapter} href={`/chapters/${chapter}#method-compare`} className="rounded-xl border border-line bg-panel p-5 hover:border-violet">
              <div className="flex flex-wrap gap-2"><Chip accent="blue">Chapter {chapter}</Chip><Chip accent="violet">{items.length} comparisons</Chip><Chip accent="lime">{items.length * 5} modes</Chip></div>
              <h2 className="display mt-4 text-2xl font-medium text-ink">Method choice board</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">Includes {items.slice(0, 4).map((item) => item.algorithmName).join(", ")}{items.length > 4 ? ", and more" : ""}.</p>
            </a>
          ))}
        </section>
        <section className="mt-12 grid gap-4 lg:grid-cols-3">
          {byFamily.map(([family, items]) => (
            <article id={`family-${slug(family)}`} key={family} className="rounded-xl border border-line bg-panel p-5">
              <div className="flex flex-wrap gap-2"><Chip accent="orange">{family}</Chip><Chip accent="violet">{items.length} cards</Chip></div>
              <h2 className="display mt-4 text-2xl font-medium text-ink">Family comparison lens</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">Use this family to compare {items.slice(0, 3).map((item) => item.algorithmName).join(", ")}{items.length > 3 ? ", and related variants" : ""} by data, target, backup, model use, approximation, and stability.</p>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}

function slug(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60) || "family";
}

import type { Metadata } from "next";
import Link from "next/link";
import { AnimatedConceptGraphic } from "@/components/AnimatedConceptGraphic";
import { AnalogyStudio } from "@/components/AnalogyStudio";
import { MotionGlyph } from "@/components/MotionGlyph";
import { Chip } from "@/components/Section";
import { allAnalogyCards, analogyAnchorCount, analogyCardCount, analogyChapterCount, analogyMappingCount, analogyModeCount, analogySourceCount } from "@/lib/analogies";
import { chapters } from "@/lib/paper";

export const metadata: Metadata = {
  title: "Analogy Bridge Studio | RLbook Explainer",
  description: "Everyday analogies mapped carefully into technical reinforcement-learning objects, with limits and transfer checks.",
};

export default function AnalogiesPage() {
  const cards = allAnalogyCards();
  const byChapter = chapters.map((chapter) => [chapter.n, cards.filter((card) => card.chapter === chapter.n)] as const).filter(([, items]) => items.length > 0);
  const bySource = Array.from(new Map(cards.map((card) => [card.sourceLabel, cards.filter((item) => item.sourceLabel === card.sourceLabel)] as const)).entries()).sort((a, b) => b[1].length - a[1].length);

  return (
    <main className="min-h-screen bg-bg text-ink">
      <header className="border-b border-line bg-panel paper-grid">
        <div className="mx-auto max-w-[1280px] px-6 py-8 lg:px-10">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
            <Link href="/" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-violet">← Home overview</Link>
            <Link href="/book" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-violet">Linear book</Link>
            <Link href="/stories" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-violet">Stories</Link>
            <Link href="/analogies" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-violet">Analogies</Link>
            <Link href="/foundations" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-violet">Foundations</Link>
            <Link href="/math" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-violet">Math rescue</Link>
            <Link href="/coverage" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-violet">Coverage audit</Link>
          </div>
          <div className="grid gap-8 lg:grid-cols-[1fr_440px] lg:items-end">
            <div>
              <p className="eyebrow">Analogy bridge studio</p>
              <h1 className="display mt-4 max-w-5xl text-[clamp(42px,7vw,88px)] font-medium text-ink">Use familiar stories without losing technical precision.</h1>
              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted">
                This studio turns chapter ideas into careful analogies: start with an everyday doorway, map each piece to reinforcement-learning objects, translate into exact language, mark where the analogy breaks, and transfer it to a new example.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <Chip accent="violet">{analogyCardCount()} analogy cards</Chip>
                <Chip accent="lime">{analogyModeCount()} bridge modes</Chip>
                <Chip accent="blue">{analogyChapterCount()} chapters</Chip>
                <Chip accent="cyan">{analogyMappingCount()} mapping rows</Chip>
                <Chip accent="orange">{analogyAnchorCount()} anchors</Chip>
                <Chip accent="violet">{analogySourceCount()} source layers</Chip>
              </div>
            </div>
            <div className="grid gap-4">
              <AnimatedConceptGraphic label="Analogy bridge studio" variant="tree" caption="Every analogy is treated as a bridge: useful for intuition, checked against exact RL language, and fenced by limits." compact />
              <div className="rounded-xl border border-line bg-white p-5">
                <div className="mb-3 flex items-start justify-between gap-3"><p className="eyebrow">Analogy source blend</p><MotionGlyph label="analogy source layers" variant="tree" accent="violet" className="-mr-2 -mt-2 motion-glyph-small" /></div>
                <div className="grid gap-2">
                  {bySource.map(([source, items]) => (
                    <a key={source} href={`#source-${slug(source)}`} className="flex items-center justify-between gap-3 rounded-lg border border-line bg-panel-2 px-3 py-2 text-sm hover:border-violet">
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
        <AnalogyStudio cards={cards} contextTitle="Whole-book analogy bridge studio" />
        <section className="mt-10 grid gap-4 lg:grid-cols-4">
          {byChapter.map(([chapter, items]) => (
            <a id={`analogy-chapter-${chapter}`} key={chapter} href={`/chapters/${chapter}#analogies`} className="rounded-xl border border-line bg-panel p-5 hover:border-violet">
              <div className="flex flex-wrap gap-2"><Chip accent="blue">Chapter {chapter}</Chip><Chip accent="violet">{items.length} analogies</Chip><Chip accent="lime">{items.length * 5} modes</Chip></div>
              <h2 className="display mt-4 text-2xl font-medium text-ink">Chapter analogy bridge</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">Analogies include {items.slice(0, 3).map((item) => item.anchor).join(", ")}{items.length > 3 ? ", and more" : ""}.</p>
            </a>
          ))}
        </section>
        <section className="mt-12 grid gap-4 lg:grid-cols-3">
          {bySource.map(([source, items]) => (
            <article id={`source-${slug(source)}`} key={source} className="rounded-xl border border-line bg-panel p-5">
              <div className="flex flex-wrap gap-2"><Chip accent="violet">{source}</Chip><Chip accent="cyan">{items.length} cards</Chip></div>
              <h2 className="display mt-4 text-2xl font-medium text-ink">Analogy source layer</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">Uses {items.slice(0, 4).map((item) => item.anchor).join(", ")}{items.length > 4 ? ", and related anchors" : ""} to connect everyday intuition to exact chapter language.</p>
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

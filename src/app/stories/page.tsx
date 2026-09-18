import type { Metadata } from "next";
import Link from "next/link";
import { AnimatedConceptGraphic } from "@/components/AnimatedConceptGraphic";
import { MotionGlyph } from "@/components/MotionGlyph";
import { Chip } from "@/components/Section";
import { VisualStoryStudio } from "@/components/VisualStoryStudio";
import { chapters } from "@/lib/paper";
import { allVisualStoryCards, visualStoryActorCount, visualStoryCardCount, visualStoryChapterCount, visualStoryModeCount, visualStoryPropCount, visualStorySceneCount, visualStorySourceCount } from "@/lib/visualStory";

export const metadata: Metadata = {
  title: "Visual Story Studio | RLbook Explainer",
  description: "A graphical story-board route that teaches every RL chapter as scenes before formulas and algorithms.",
};

export default function StoriesPage() {
  const cards = allVisualStoryCards();
  const byChapter = chapters.map((chapter) => [chapter.n, cards.filter((card) => card.chapter === chapter.n)] as const).filter(([, items]) => items.length > 0);
  const bySource = Array.from(new Map(cards.map((card) => [card.sourceLabel, cards.filter((item) => item.sourceLabel === card.sourceLabel)] as const)).entries()).sort((a, b) => b[1].length - a[1].length);

  return (
    <main className="min-h-screen bg-bg text-ink">
      <header className="border-b border-line bg-panel paper-grid">
        <div className="mx-auto max-w-[1280px] px-6 py-8 lg:px-10">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
            <Link href="/" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">← Home overview</Link>
            <Link href="/book" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Linear book</Link>
            <Link href="/foundations" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Foundations</Link>
            <Link href="/math" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Math rescue</Link>
            <Link href="/stories" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Stories</Link>
            <Link href="/analogies" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-violet">Analogies</Link>
            <Link href="/tutor" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Tutor</Link>
            <Link href="/cases" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Cases</Link>
            <Link href="/projects" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-lime">Projects</Link>
            <Link href="/graph" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Learning graph</Link>
            <Link href="/coverage" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Coverage audit</Link>
          </div>
          <div className="grid gap-8 lg:grid-cols-[1fr_440px] lg:items-end">
            <div>
              <p className="eyebrow">Visual story studio</p>
              <h1 className="display mt-4 max-w-5xl text-[clamp(42px,7vw,88px)] font-medium text-ink">Turn every chapter into a mental movie before formulas appear.</h1>
              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted">
                The story studio is the graphical lecture layer for readers starting from zero: each card sets a concrete scene, shows what the learner can observe, animates the next move, translates the picture into technical RL language, and ends with a blank-board check.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <Chip accent="cyan">{visualStoryCardCount()} story scenes</Chip>
                <Chip accent="lime">{visualStoryModeCount()} story modes</Chip>
                <Chip accent="blue">{visualStoryChapterCount()} chapters</Chip>
                <Chip accent="violet">{visualStorySceneCount()} unique scene titles</Chip>
                <Chip accent="orange">{visualStoryActorCount()} actor handles</Chip>
                <Chip accent="cyan">{visualStoryPropCount()} visual props</Chip>
                <Chip accent="orange">{visualStorySourceCount()} source layers</Chip>
              </div>
            </div>
            <div className="grid gap-4">
              <AnimatedConceptGraphic label="Visual story studio" variant="tree" caption="Every abstract RL object first appears as a scene: learner, world, choice, feedback, changed memory, and next action." compact />
              <div className="rounded-xl border border-line bg-white p-5">
                <div className="mb-3 flex items-start justify-between gap-3"><p className="eyebrow">Scene source blend</p><MotionGlyph label="story source layers" variant="loop" accent="cyan" className="-mr-2 -mt-2 motion-glyph-small" /></div>
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
        <VisualStoryStudio cards={cards} contextTitle="Whole-book visual story studio" />
        <section className="mt-10 grid gap-4 lg:grid-cols-4">
          {byChapter.map(([chapter, items]) => (
            <a id={`story-chapter-${chapter}`} key={chapter} href={`/chapters/${chapter}#visual-story`} className="rounded-xl border border-line bg-panel p-5 hover:border-cyan">
              <div className="flex flex-wrap gap-2"><Chip accent="blue">Chapter {chapter}</Chip><Chip accent="cyan">{items.length} scenes</Chip><Chip accent="lime">{items.length * 5} modes</Chip></div>
              <h2 className="display mt-4 text-2xl font-medium text-ink">Chapter story board</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">Scenes include {items.slice(0, 3).map((item) => item.title.replace(/^Scene: /, "")).join(", ")}{items.length > 3 ? ", and more" : ""}.</p>
            </a>
          ))}
        </section>
        <section className="mt-12 grid gap-4 lg:grid-cols-3">
          {bySource.map(([source, items]) => (
            <article id={`source-${slug(source)}`} key={source} className="rounded-xl border border-line bg-panel p-5">
              <div className="flex flex-wrap gap-2"><Chip accent="cyan">{source}</Chip><Chip accent="orange">{items.length} scenes</Chip></div>
              <h2 className="display mt-4 text-2xl font-medium text-ink">Story source layer</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">Uses {items.slice(0, 4).map((item) => item.title.replace(/^Scene: /, "")).join(", ")}{items.length > 4 ? ", and related scenes" : ""} to make chapter ideas visible before notation.</p>
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

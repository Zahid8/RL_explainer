import type { Metadata } from "next";
import Link from "next/link";
import { AnimatedConceptGraphic } from "@/components/AnimatedConceptGraphic";
import { CaseStudyStudio } from "@/components/CaseStudyStudio";
import { MotionGlyph } from "@/components/MotionGlyph";
import { Chip } from "@/components/Section";
import { allCaseStudies, caseStudyAnchorCount, caseStudyBoardFrameCount, caseStudyCardCount, caseStudyChapterCount, caseStudyModeCount, caseStudySourceCount, caseStudySuccessCriteriaCount } from "@/lib/caseStudies";
import { chapters } from "@/lib/paper";

export const metadata: Metadata = {
  title: "Case Study Studio | RLbook Explainer",
  description: "End-to-end reinforcement-learning case studies that connect chapter scenes, board frames, technical objects, debugging, and transfer.",
};

export default function CasesPage() {
  const cards = allCaseStudies();
  const byChapter = chapters.map((chapter) => [chapter.n, cards.filter((card) => card.chapter === chapter.n)] as const).filter(([, items]) => items.length > 0);
  const bySource = Array.from(new Map(cards.map((card) => [card.sourceLabel, cards.filter((item) => item.sourceLabel === card.sourceLabel)] as const)).entries()).sort((a, b) => b[1].length - a[1].length);

  return (
    <main className="min-h-screen bg-bg text-ink">
      <header className="border-b border-line bg-panel paper-grid">
        <div className="mx-auto max-w-[1280px] px-6 py-8 lg:px-10">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
            <Link href="/" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">← Home overview</Link>
            <Link href="/book" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Linear book</Link>
            <Link href="/readiness" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Readiness</Link>
            <Link href="/tutor" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Tutor</Link>
            <Link href="/cases" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Cases</Link>
            <Link href="/projects" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-lime">Projects</Link>
            <Link href="/evidence" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Evidence replay</Link>
            <Link href="/graph" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Graph</Link>
            <Link href="/coverage" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Coverage audit</Link>
          </div>
          <div className="grid gap-8 lg:grid-cols-[1fr_440px] lg:items-end">
            <div>
              <p className="eyebrow">Case study studio</p>
              <h1 className="display mt-4 max-w-5xl text-[clamp(42px,7vw,88px)] font-medium text-ink">See each chapter working inside a complete scenario.</h1>
              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted">
                This studio connects the pieces: one concrete world, a board-frame walkthrough, a technical translation, a debugging probe, and a transfer challenge. It turns isolated concepts into end-to-end RL cases.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <Chip accent="cyan">{caseStudyCardCount()} case studies</Chip>
                <Chip accent="lime">{caseStudyModeCount()} case modes</Chip>
                <Chip accent="blue">{caseStudyChapterCount()} chapters</Chip>
                <Chip accent="orange">{caseStudyBoardFrameCount()} board frames</Chip>
                <Chip accent="violet">{caseStudySuccessCriteriaCount()} success checks</Chip>
                <Chip accent="cyan">{caseStudyAnchorCount()} anchors</Chip>
                <Chip accent="lime">{caseStudySourceCount()} source layers</Chip>
              </div>
            </div>
            <div className="grid gap-4">
              <AnimatedConceptGraphic label="Case study studio" variant="loop" caption="Case studies join scene, data, target, update, failure, and transfer into one continuous lecture path." compact />
              <div className="rounded-xl border border-line bg-white p-5">
                <div className="mb-3 flex items-start justify-between gap-3"><p className="eyebrow">Case source blend</p><MotionGlyph label="case source layers" variant="tree" accent="cyan" className="-mr-2 -mt-2 motion-glyph-small" /></div>
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
        <CaseStudyStudio cases={cards} contextTitle="Whole-book case study studio" />
        <section className="mt-10 grid gap-4 lg:grid-cols-4">
          {byChapter.map(([chapter, items]) => (
            <a id={`case-chapter-${chapter}`} key={chapter} href={`/chapters/${chapter}#case-studies`} className="rounded-xl border border-line bg-panel p-5 hover:border-cyan">
              <div className="flex flex-wrap gap-2"><Chip accent="blue">Chapter {chapter}</Chip><Chip accent="cyan">{items.length} cases</Chip><Chip accent="lime">{items.length * 5} modes</Chip></div>
              <h2 className="display mt-4 text-2xl font-medium text-ink">Chapter case path</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">Cases include {items.map((item) => item.anchor).slice(0, 3).join(", ")}{items.length > 3 ? ", and more" : ""}.</p>
            </a>
          ))}
        </section>
        <section className="mt-12 grid gap-4 lg:grid-cols-4">
          {bySource.map(([source, items]) => (
            <article id={`source-${slug(source)}`} key={source} className="rounded-xl border border-line bg-panel p-5">
              <div className="flex flex-wrap gap-2"><Chip accent="cyan">{source}</Chip><Chip accent="violet">{items.length} cards</Chip></div>
              <h2 className="display mt-4 text-2xl font-medium text-ink">Case source layer</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">Uses {items.slice(0, 4).map((item) => item.anchor).join(", ")}{items.length > 4 ? ", and related anchors" : ""} to build complete chapter scenarios.</p>
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

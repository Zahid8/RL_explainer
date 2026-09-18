import type { Metadata } from "next";
import Link from "next/link";
import { AnimatedConceptGraphic } from "@/components/AnimatedConceptGraphic";
import { MotionGlyph } from "@/components/MotionGlyph";
import { Chip } from "@/components/Section";
import { SocraticTutorStudio } from "@/components/SocraticTutorStudio";
import { chapters } from "@/lib/paper";
import { allSocraticTutorCards, socraticTutorAnchorCount, socraticTutorBoardStepCount, socraticTutorCardCount, socraticTutorChapterCount, socraticTutorModeCount, socraticTutorSourceCount, socraticTutorTurnCount } from "@/lib/socraticTutor";

export const metadata: Metadata = {
  title: "Socratic Tutor Studio | RLbook Explainer",
  description: "Question, hint, board, technical, and try-it tutor cards for every reinforcement-learning chapter.",
};

export default function TutorPage() {
  const cards = allSocraticTutorCards();
  const byChapter = chapters.map((chapter) => [chapter.n, cards.filter((card) => card.chapter === chapter.n)] as const).filter(([, items]) => items.length > 0);
  const bySource = Array.from(new Map(cards.map((card) => [card.sourceLabel, cards.filter((item) => item.sourceLabel === card.sourceLabel)] as const)).entries()).sort((a, b) => b[1].length - a[1].length);

  return (
    <main className="min-h-screen bg-bg text-ink">
      <header className="border-b border-line bg-panel paper-grid">
        <div className="mx-auto max-w-[1280px] px-6 py-8 lg:px-10">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
            <Link href="/" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">← Home overview</Link>
            <Link href="/book" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Linear book</Link>
            <Link href="/analogies" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-violet">Analogies</Link>
            <Link href="/tutor" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Tutor</Link>
            <Link href="/cases" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Cases</Link>
            <Link href="/projects" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-lime">Projects</Link>
            <Link href="/evidence" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Evidence replay</Link>
            <Link href="/sections" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Sections</Link>
            <Link href="/coverage" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Coverage audit</Link>
          </div>
          <div className="grid gap-8 lg:grid-cols-[1fr_440px] lg:items-end">
            <div>
              <p className="eyebrow">Socratic tutor studio</p>
              <h1 className="display mt-4 max-w-5xl text-[clamp(42px,7vw,88px)] font-medium text-ink">Ask the naive question, then climb to technical precision.</h1>
              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted">
                This studio turns the standalone book into a guided tutoring session. Every card begins with a question a beginner would ask, offers one hint, draws the board, gives the technical answer, and ends with a fresh try-it prompt.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <Chip accent="cyan">{socraticTutorCardCount()} tutor cards</Chip>
                <Chip accent="lime">{socraticTutorModeCount()} tutor modes</Chip>
                <Chip accent="blue">{socraticTutorChapterCount()} chapters</Chip>
                <Chip accent="violet">{socraticTutorTurnCount()} dialogue turns</Chip>
                <Chip accent="orange">{socraticTutorBoardStepCount()} board steps</Chip>
                <Chip accent="cyan">{socraticTutorAnchorCount()} anchors</Chip>
                <Chip accent="lime">{socraticTutorSourceCount()} source layers</Chip>
              </div>
            </div>
            <div className="grid gap-4">
              <AnimatedConceptGraphic label="Socratic tutor studio" variant="loop" caption="Each card follows a tutor loop: learner question, hint, board trace, technical answer, and fresh attempt." compact />
              <div className="rounded-xl border border-line bg-white p-5">
                <div className="mb-3 flex items-start justify-between gap-3"><p className="eyebrow">Tutor source blend</p><MotionGlyph label="tutor source layers" variant="tree" accent="cyan" className="-mr-2 -mt-2 motion-glyph-small" /></div>
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
        <SocraticTutorStudio cards={cards} contextTitle="Whole-book Socratic tutor studio" />
        <section className="mt-10 grid gap-4 lg:grid-cols-4">
          {byChapter.map(([chapter, items]) => (
            <a id={`tutor-chapter-${chapter}`} key={chapter} href={`/chapters/${chapter}#socratic-tutor`} className="rounded-xl border border-line bg-panel p-5 hover:border-cyan">
              <div className="flex flex-wrap gap-2"><Chip accent="blue">Chapter {chapter}</Chip><Chip accent="cyan">{items.length} tutor cards</Chip><Chip accent="lime">{items.length * 5} modes</Chip></div>
              <h2 className="display mt-4 text-2xl font-medium text-ink">Chapter tutor loop</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">Tutor prompts include {items.slice(0, 3).map((item) => item.anchor).join(", ")}{items.length > 3 ? ", and more" : ""}.</p>
            </a>
          ))}
        </section>
        <section className="mt-12 grid gap-4 lg:grid-cols-3">
          {bySource.map(([source, items]) => (
            <article id={`source-${slug(source)}`} key={source} className="rounded-xl border border-line bg-panel p-5">
              <div className="flex flex-wrap gap-2"><Chip accent="cyan">{source}</Chip><Chip accent="violet">{items.length} cards</Chip></div>
              <h2 className="display mt-4 text-2xl font-medium text-ink">Tutor source layer</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">Uses {items.slice(0, 4).map((item) => item.anchor).join(", ")}{items.length > 4 ? ", and related anchors" : ""} to turn passive reading into question-led learning.</p>
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

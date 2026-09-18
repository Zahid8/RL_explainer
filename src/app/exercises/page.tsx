import type { Metadata } from "next";
import Link from "next/link";
import { AnimatedConceptGraphic } from "@/components/AnimatedConceptGraphic";
import { ExerciseSolutionStudio } from "@/components/ExerciseSolutionStudio";
import { MotionGlyph } from "@/components/MotionGlyph";
import { Chip } from "@/components/Section";
import { allExerciseSolutionCards, exerciseSolutionCardCount, exerciseSolutionChapterCount, exerciseSolutionModeCount } from "@/lib/exerciseSolutionStudio";
import { chapters } from "@/lib/paper";

export const metadata: Metadata = {
  title: "Exercise Solution Studio | RLbook Explainer",
  description: "Interactive attempt, hint, solution, debug, and extension paths for numbered RLbook practice exercises.",
};

export default function ExercisesPage() {
  const cards = allExerciseSolutionCards();
  const byChapter = chapters.map((chapter) => [chapter.n, cards.filter((card) => card.chapter === chapter.n)] as const).filter(([, items]) => items.length > 0);
  const denseChapters = [...byChapter].sort((a, b) => b[1].length - a[1].length).slice(0, 6);

  return (
    <main className="min-h-screen bg-bg text-ink">
      <header className="border-b border-line bg-panel paper-grid">
        <div className="mx-auto max-w-[1280px] px-6 py-8 lg:px-10">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
            <Link href="/" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-orange">← Home overview</Link>
            <Link href="/book" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-orange">Linear book</Link>
            <Link href="/foundations" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Foundations</Link>
            <Link href="/math" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-orange">Math rescue</Link>
            <Link href="/sections" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-orange">Section mastery</Link>
            <Link href="/compare" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-orange">Compare methods</Link>
            <Link href="/exam" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-orange">Exam studio</Link>
            <Link href="/search" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-orange">Search</Link>
            <Link href="/coverage" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-orange">Coverage audit</Link>
          </div>
          <div className="grid gap-8 lg:grid-cols-[1fr_440px] lg:items-end">
            <div>
              <p className="eyebrow">Exercise solution studio</p>
              <h1 className="display mt-4 max-w-5xl text-[clamp(42px,7vw,88px)] font-medium text-ink">Practice problems become guided solutions.</h1>
              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted">
                This layer turns the exercise-coach anchors into a standalone solution lab. Each card asks you to attempt first, gives a hint, reveals an original model solution path, debugs common failures, and extends the exercise to a new tiny RL world.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <Chip accent="orange">{exerciseSolutionCardCount()} solution cards</Chip>
                <Chip accent="lime">{exerciseSolutionModeCount()} solution modes</Chip>
                <Chip accent="blue">{exerciseSolutionChapterCount()} chapters with exercises</Chip>
                <Chip accent="violet">attempt + hint + solution</Chip>
                <Chip accent="cyan">debug + extension</Chip>
              </div>
            </div>
            <div className="grid gap-4">
              <AnimatedConceptGraphic label="Exercise solution studio" variant="coverage" caption="Practice becomes a loop: try first, ask for a hint, compare with a solution path, debug, then extend." compact />
              <div className="rounded-xl border border-line bg-white p-5">
                <div className="mb-3 flex items-start justify-between gap-3"><p className="eyebrow">Exercise density</p><MotionGlyph label="exercise density" variant="bars" accent="orange" className="-mr-2 -mt-2 motion-glyph-small" /></div>
                <div className="grid gap-2">
                  {denseChapters.map(([chapter, items]) => (
                    <a key={chapter} href={`#exercises-chapter-${chapter}`} className="flex items-center justify-between gap-3 rounded-lg border border-line bg-panel-2 px-3 py-2 text-sm hover:border-orange">
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
        <ExerciseSolutionStudio cards={cards} contextTitle="Whole-book exercise solution studio" />
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {byChapter.map(([chapter, items]) => (
            <a id={`exercises-chapter-${chapter}`} key={chapter} href={`/chapters/${chapter}#exercise-solutions`} className="rounded-xl border border-line bg-panel p-5 hover:border-orange">
              <div className="flex flex-wrap gap-2"><Chip accent="orange">Chapter {chapter}</Chip><Chip accent="lime">{items.length} solutions</Chip><Chip accent="blue">{items.length * 5} modes</Chip></div>
              <h2 className="display mt-4 text-2xl font-medium text-ink">Exercise solution path</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">Includes {items.slice(0, 4).map((item) => `Exercise ${item.exerciseId}`).join(", ")}{items.length > 4 ? ", and more" : ""}.</p>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}

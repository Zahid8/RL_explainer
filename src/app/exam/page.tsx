import type { Metadata } from "next";
import Link from "next/link";
import { AnimatedConceptGraphic } from "@/components/AnimatedConceptGraphic";
import { ChapterExamStudio } from "@/components/ChapterExamStudio";
import { MotionGlyph } from "@/components/MotionGlyph";
import { Chip } from "@/components/Section";
import { allChapterExamCards, chapterExamCardCount, chapterExamChapterCount, chapterExamModeCount } from "@/lib/chapterExam";
import { chapters } from "@/lib/paper";

export const metadata: Metadata = {
  title: "Chapter Exam Studio | RLbook Explainer",
  description: "Generated chapter-end oral exams, solution plans, rubrics, and transfer checks for the standalone RL web book.",
};

export default function ExamPage() {
  const cards = allChapterExamCards();
  const byChapter = chapters.map((chapter) => [chapter.n, cards.filter((card) => card.chapter === chapter.n)] as const);
  const denseChapters = [...byChapter].sort((a, b) => b[1].length - a[1].length).slice(0, 6);

  return (
    <main className="min-h-screen bg-bg text-ink">
      <header className="border-b border-line bg-panel paper-grid">
        <div className="mx-auto max-w-[1280px] px-6 py-8 lg:px-10">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
            <Link href="/" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">← Home overview</Link>
            <Link href="/book" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Linear book</Link>
            <Link href="/proofs" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Proof lab</Link>
            <Link href="/assumptions" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Trust clinic</Link>
            <Link href="/coverage" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Coverage audit</Link>
          </div>
          <div className="grid gap-8 lg:grid-cols-[1fr_440px] lg:items-end">
            <div>
              <p className="eyebrow">Chapter exam studio</p>
              <h1 className="display mt-4 max-w-5xl text-[clamp(42px,7vw,88px)] font-medium text-ink">Prove you can explain, draw, compute, debug, trust-check, and transfer each chapter.</h1>
              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted">
                A standalone book should not leave mastery vague. This studio gives every chapter generated oral-exam prompts with answer plans, high-quality solutions, self-grading rubrics, and transfer tests synthesized from the chapter&apos;s concepts, formulas, proofs, code labs, assumptions, worked examples, and simulator knobs.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <Chip accent="cyan">{chapterExamCardCount()} exam cards</Chip>
                <Chip accent="lime">{chapterExamModeCount()} exam modes</Chip>
                <Chip accent="blue">{chapterExamChapterCount()} chapters</Chip>
                <Chip accent="violet">prompt + plan + rubric</Chip>
                <Chip accent="orange">transfer checks</Chip>
              </div>
            </div>
            <div className="grid gap-4">
              <AnimatedConceptGraphic label="Chapter exam studio" variant="coverage" caption="Exam cards close the loop: try the prompt, plan the answer, reveal a solution, grade with a rubric, then transfer." compact />
              <div className="rounded-xl border border-line bg-white p-5">
                <div className="mb-3 flex items-start justify-between gap-3"><p className="eyebrow">Chapter exam density</p><MotionGlyph label="exam density" variant="check" accent="lime" className="-mr-2 -mt-2 motion-glyph-small" /></div>
                <div className="grid gap-2">
                  {denseChapters.map(([chapter, items]) => (
                    <a key={chapter} href={`#exam-chapter-${chapter}`} className="flex items-center justify-between gap-3 rounded-lg border border-line bg-panel-2 px-3 py-2 text-sm hover:border-cyan">
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
        <ChapterExamStudio cards={cards} contextTitle="Whole-book chapter exam studio" />
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {byChapter.map(([chapter, items]) => (
            <a id={`exam-chapter-${chapter}`} key={chapter} href={`/chapters/${chapter}#exam`} className="rounded-xl border border-line bg-panel p-5 hover:border-cyan">
              <div className="flex flex-wrap gap-2"><Chip accent="cyan">Chapter {chapter}</Chip><Chip accent="lime">{items.length} exam cards</Chip><Chip accent="blue">{items.length * 5} modes</Chip></div>
              <h2 className="display mt-4 text-2xl font-medium text-ink">Chapter mastery exam</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">Includes {items.map((item) => item.kind).join(", ")} checks.</p>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}

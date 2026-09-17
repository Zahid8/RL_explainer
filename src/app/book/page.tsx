import type { Metadata } from "next";
import Link from "next/link";
import { AnimatedConceptGraphic } from "@/components/AnimatedConceptGraphic";
import { InteractiveBlackboard } from "@/components/InteractiveBlackboard";
import { MotionGlyph } from "@/components/MotionGlyph";
import { Chip } from "@/components/Section";
import { manuscriptForChapter, manuscriptSectionCount, type ChapterManuscript } from "@/lib/chapterManuscripts";
import { blackboardForChapter, blackboardStageCount, type ChapterBlackboard } from "@/lib/interactiveBlackboards";
import { chapters } from "@/lib/paper";
import { standaloneLectureForChapter, standaloneLectureTileCount, type StandaloneChapterLecture } from "@/lib/standaloneBook";

export const metadata: Metadata = {
  title: "Standalone RL Web Book | RLbook Explainer",
  description: "A linear standalone web-book reader for the RLbook explainer: from basics to advanced, chapter by chapter, in original words.",
};

const lectures = chapters.map((chapter) => ({ chapter, lecture: standaloneLectureForChapter(chapter), manuscript: manuscriptForChapter(chapter.n), blackboard: blackboardForChapter(chapter.n) }));

export default function BookPage() {
  const lectureBeats = standaloneLectureTileCount();
  const manuscriptSections = manuscriptSectionCount();
  const blackboardStages = blackboardStageCount();

  return (
    <main className="min-h-screen bg-bg text-ink">
      <header className="border-b border-line bg-panel paper-grid">
        <div className="mx-auto max-w-[1280px] px-6 py-8 lg:px-10">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
            <Link href="/" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">← Home overview</Link>
            <Link href="/coverage" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Coverage audit</Link>
          </div>
          <div className="grid gap-8 lg:grid-cols-[1fr_440px] lg:items-end">
            <div>
              <p className="eyebrow">Standalone linear reader</p>
              <h1 className="display mt-4 max-w-5xl text-[clamp(42px,7vw,88px)] font-medium text-ink">The RL book at your fingertips.</h1>
              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted">
                This is the continuous web-book mode: all 17 chapters in order, written as an original lecture path. Start with the beginner story, draw the mental model, then expand each section into technical language, equations, algorithms, and checks.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <Chip accent="cyan">17 chapters</Chip>
                <Chip accent="blue">{manuscriptSections} manuscript moves</Chip>
                <Chip accent="violet">{blackboardStages} blackboard stages</Chip>
                <Chip accent="lime">{lectureBeats} lecture beats</Chip>
                <Chip accent="violet">beginner → advanced</Chip>
                <Chip accent="orange">original wording</Chip>
              </div>
            </div>
            <div className="grid gap-4">
              <AnimatedConceptGraphic label="Standalone web-book reader" variant="tree" caption="A single reading path connects basics, tabular methods, approximation, policy gradients, psychology, neuroscience, applications, and frontier ideas." compact />
              <div className="rounded-xl border border-line bg-white p-5">
                <p className="eyebrow mb-3">How to read this page</p>
                <ol className="grid gap-2 text-sm leading-relaxed text-muted">
                  <li>1. Read the chapter promise and zero-level story.</li>
                  <li>2. Draw the mental model before reading equations.</li>
                  <li>3. Open the section beats and translate each picture into technical language.</li>
                  <li>4. Use the full chapter page for algorithms, formulas, exercises, and interactive detail.</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1280px] gap-10 px-6 py-12 lg:grid-cols-[290px_1fr] lg:px-10">
        <aside className="self-start lg:sticky lg:top-20">
          <nav className="rounded-xl border border-line bg-panel p-4">
            <p className="eyebrow mb-3">Book table of contents</p>
            <div className="grid max-h-[70vh] gap-1 overflow-auto pr-1">
              {lectures.map(({ chapter }) => (
                <a key={chapter.n} href={`#book-chapter-${chapter.n}`} className="rounded-lg border border-transparent px-3 py-2 text-sm leading-snug text-muted hover:border-line hover:bg-white hover:text-ink">
                  <span className="mono text-[10px] uppercase tracking-[0.12em] text-dim">Chapter {chapter.n}</span>
                  <span className="mt-1 block font-medium text-ink">{chapter.title}</span>
                </a>
              ))}
            </div>
          </nav>
        </aside>

        <div className="grid gap-12">
          {lectures.map(({ chapter, lecture, manuscript, blackboard }) => <BookChapter key={chapter.n} chapter={chapter} lecture={lecture} manuscript={manuscript} blackboard={blackboard} />)}
        </div>
      </div>
    </main>
  );
}

function BookChapter({ chapter, lecture, manuscript, blackboard }: { chapter: (typeof chapters)[number]; lecture: StandaloneChapterLecture; manuscript: ChapterManuscript; blackboard: ChapterBlackboard }) {
  return (
    <article id={`book-chapter-${chapter.n}`} className="scroll-mt-24 overflow-hidden rounded-2xl border border-line bg-panel">
      <div className="grid gap-px bg-line lg:grid-cols-[0.9fr_1.1fr]">
        <div className="bg-panel p-6 lg:p-7">
          <div className="flex flex-wrap gap-2"><Chip accent="cyan">Chapter {chapter.n}</Chip><Chip accent="blue">{chapter.part}</Chip><Chip accent="lime">{lecture.beats.length} section lessons</Chip></div>
          <h2 className="display mt-5 text-[clamp(32px,5vw,56px)] font-medium text-ink">{chapter.title}</h2>
          <p className="mt-4 text-base leading-relaxed text-muted">{lecture.promise}</p>
          <div className="mt-5 grid gap-3">
            {lecture.startFromZero.map((paragraph, index) => (
              <p key={paragraph} className="rounded-lg border border-line bg-white p-4 text-sm leading-relaxed text-muted"><span className="font-medium text-ink">Zero-level pass {index + 1}:</span> {paragraph}</p>
            ))}
          </div>
          <div className="mt-5 grid gap-3">
            <MiniLesson label="Mental model to draw" text={lecture.mentalModel} />
            <MiniLesson label="Why this chapter belongs here" text={lecture.whyNow} tint />
          </div>
          <div className="mt-5 rounded-xl border border-line bg-white p-4">
            <p className="eyebrow mb-3">Original manuscript opening</p>
            <p className="text-sm leading-relaxed text-muted">{manuscript.opening}</p>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            <Link href={`/chapters/${chapter.n}`} className="mono rounded-full border border-cyan bg-cyan px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-white">Open full chapter lab</Link>
            {chapter.n < chapters.length ? <a href={`#book-chapter-${chapter.n + 1}`} className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Next chapter ↓</a> : null}
          </div>
        </div>
        <div className="bg-panel p-6 lg:p-7">
          <div className="rounded-xl border border-line bg-white p-4">
            <div className="mb-3 flex items-start justify-between gap-3">
              <div><p className="eyebrow">Learning contract</p><p className="mt-2 text-sm leading-relaxed text-muted">What you should own before leaving this chapter.</p></div>
              <MotionGlyph label="Learning contract" variant="check" accent="lime" />
            </div>
            <ul className="grid gap-2 text-sm leading-relaxed text-muted">
              {lecture.learningContract.map((item) => <li key={item} className="flex gap-2"><span className="text-lime">•</span><span>{item}</span></li>)}
            </ul>
          </div>

          <div className="mt-5 rounded-xl border border-line bg-panel-2 p-4">
            <p className="eyebrow mb-3">Core vocabulary</p>
            <div className="grid gap-3 md:grid-cols-2">
              {lecture.vocabulary.slice(0, 6).map((item) => (
                <div key={item.name} className="rounded-lg border border-line bg-white p-3">
                  <p className="font-medium text-ink">{item.name}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.plain}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-5 bg-panel p-6 lg:p-7">
        <section className="grid gap-4">
          <div>
            <p className="eyebrow">Bespoke chapter manuscript</p>
            <h3 className="display mt-2 text-3xl font-medium text-ink">Three moves from beginner intuition to technical precision.</h3>
          </div>
          <div className="grid gap-4">
            {manuscript.sections.map((section, index) => (
              <article key={section.title} className="rounded-xl border border-line bg-white p-4">
                <div className="flex flex-wrap gap-2"><Chip accent="cyan">Move {index + 1}</Chip><Chip accent="violet">original prose</Chip></div>
                <h4 className="display mt-3 text-2xl font-medium text-ink">{section.title}</h4>
                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  <MiniLesson label="Beginner explanation" text={section.beginner} />
                  <MiniLesson label="Graphical lecture" text={section.visual} tint />
                  <MiniLesson label="Technical version" text={section.technical} tint />
                  <MiniLesson label="Takeaway" text={section.takeaway} />
                </div>
              </article>
            ))}
          </div>
          <p className="rounded-lg border border-lime/30 bg-lime/[0.06] p-3 text-sm leading-relaxed text-muted"><span className="font-medium text-ink">Chapter landing:</span> {manuscript.closing}</p>
        </section>
        <section className="grid gap-4">
          <div>
            <p className="eyebrow">Interactive blackboard</p>
            <h3 className="display mt-2 text-3xl font-medium text-ink">Click the chapter&apos;s visual learning model.</h3>
          </div>
          <InteractiveBlackboard board={blackboard} compact />
        </section>
        <div className="grid gap-3 md:grid-cols-2">
          <MiniLesson label="Hands-on reading sequence" text={lecture.handsOnSequence.join(" ")} />
          <MiniLesson label="Technical finish line" text={lecture.technicalFinish.join(" ")} tint />
        </div>
        <div className="grid gap-4">
          {lecture.beats.map((beat, index) => (
            <details key={beat.section} className="rounded-xl border border-line bg-white p-4" open={index < 2}>
              <summary className="cursor-pointer list-none">
                <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                  <div>
                    <div className="flex flex-wrap gap-2"><Chip accent="cyan">Lesson {index + 1}</Chip><Chip accent="blue">{beat.terms.length ? beat.terms.slice(0, 2).join(" / ") : "concept"}</Chip></div>
                    <h3 className="display mt-3 text-2xl font-medium text-ink">{beat.section}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted"><span className="font-medium text-ink">Question:</span> {beat.question}</p>
                  </div>
                  <span className="mono rounded-full border border-line bg-panel-2 px-3 py-1 text-[11px] uppercase tracking-[0.12em] text-dim">open lesson</span>
                </div>
              </summary>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <MiniLesson label="From scratch" text={beat.fromScratch} />
                <MiniLesson label="Picture it" text={beat.visualLecture} tint />
                <MiniLesson label="Technical build" text={beat.technicalBuild} tint />
                <MiniLesson label="Checkpoint" text={beat.checkpoint} />
              </div>
              <div className="mt-4 rounded-lg border border-line bg-panel p-3">
                <p className="mono mb-2 text-[10px] uppercase tracking-[0.14em] text-dim">Board work</p>
                <ol className="grid gap-1 text-sm leading-relaxed text-muted">
                  {beat.boardWork.map((step, stepIndex) => <li key={step}>{stepIndex + 1}. {step}</li>)}
                </ol>
              </div>
            </details>
          ))}
        </div>
      </div>
    </article>
  );
}

function MiniLesson({ label, text, tint = false }: { label: string; text: string; tint?: boolean }) {
  return (
    <div className={`rounded-lg border border-line ${tint ? "bg-panel-2" : "bg-white"} p-3`}>
      <div className="mb-2 flex items-start justify-between gap-2">
        <p className="mono text-[10px] uppercase tracking-[0.14em] text-dim">{label}</p>
        <MotionGlyph label={label} variant={glyphVariantForLabel(label)} accent={glyphAccentForLabel(label)} className="-mr-2 -mt-2 motion-glyph-small" />
      </div>
      <p className="text-sm leading-relaxed text-muted">{text}</p>
    </div>
  );
}

function glyphVariantForLabel(label: string): "loop" | "bars" | "tree" | "target" | "formula" | "check" {
  if (/technical|formula|equation|gradient|finish/i.test(label)) return "formula";
  if (/sequence|step|board|lesson/i.test(label)) return "bars";
  if (/chapter|model|vocabulary|contract/i.test(label)) return "tree";
  if (/checkpoint|check|finish/i.test(label)) return "check";
  if (/goal|promise|target/i.test(label)) return "target";
  return "loop";
}

function glyphAccentForLabel(label: string): "cyan" | "orange" | "blue" | "violet" | "lime" {
  if (/warning|trap|risk/i.test(label)) return "orange";
  if (/technical|formula|gradient/i.test(label)) return "violet";
  if (/checkpoint|check|finish|contract/i.test(label)) return "lime";
  if (/chapter|vocabulary|model/i.test(label)) return "blue";
  return "cyan";
}

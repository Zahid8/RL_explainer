import type { Metadata } from "next";
import Link from "next/link";
import { ReadinessCoach } from "@/components/ReadinessCoach";
import { Chip } from "@/components/Section";
import { allReadinessCards, readinessCardCount, readinessChapterCount, readinessModeCount, readinessPrerequisiteCount, readinessRescueStepCount } from "@/lib/readinessCoach";
import { chapters } from "@/lib/paper";

export const metadata: Metadata = {
  title: "Readiness Coach | RLbook Explainer",
  description: "Chapter-by-chapter entry diagnostics and prerequisite repair checks for the standalone RL web book.",
};

export default function ReadinessPage() {
  const cards = allReadinessCards();
  const total = readinessCardCount();
  const modes = readinessModeCount();
  const chapterCount = readinessChapterCount();
  const rescueSteps = readinessRescueStepCount();
  const prerequisites = readinessPrerequisiteCount();

  return (
    <main className="min-h-screen bg-bg text-ink">
      <header className="border-b border-line bg-panel paper-grid">
        <div className="mx-auto max-w-[1280px] px-6 py-8 lg:px-10">
          <div className="mb-8 flex flex-wrap items-center gap-3">
            <Link href="/" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">← Home</Link>
            <Link href="/book" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Book</Link>
            <Link href="/foundations" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Foundations</Link>
            <Link href="/math" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-orange">Math rescue</Link>
            <Link href="/search" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Search</Link>
            <Link href="/coverage" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-lime">Coverage</Link>
          </div>
          <p className="eyebrow">Readiness coach</p>
          <h1 className="display mt-4 max-w-5xl text-[clamp(42px,7vw,88px)] font-medium text-ink">Enter every chapter with the missing prerequisite repaired.</h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted">A standalone book cannot assume the reader is already ready. This route gives every chapter an entry diagnosis, a beginner repair bridge, a board sketch, a technical target, and an exit check before the dense lecture begins.</p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Chip accent="cyan">{total} readiness checks</Chip>
            <Chip accent="lime">{modes} modes</Chip>
            <Chip accent="orange">{rescueSteps} rescue steps</Chip>
            <Chip accent="violet">{prerequisites} prerequisite handles</Chip>
            <Chip accent="blue">{chapterCount} chapters</Chip>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1280px] gap-10 px-6 py-12 lg:px-10">
        <section>
          <ReadinessCoach cards={cards} contextTitle="Whole-book readiness coach" compact />
        </section>

        <section className="grid gap-4">
          <div>
            <p className="eyebrow">Chapter coverage</p>
            <h2 className="display mt-2 text-4xl font-medium text-ink">Each chapter gets entry, math, and method readiness checks.</h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">Use these checks before reading, before equations, or before implementation. If the exit check fails, repair the prerequisite first instead of pretending the later chapter is clear.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {chapters.map((chapter) => {
              const chapterCards = cards.filter((card) => card.chapter === chapter.n);
              return (
                <Link key={chapter.n} href={`/chapters/${chapter.n}#readiness`} className="rounded-xl border border-line bg-panel p-5 transition hover:border-cyan hover:bg-white">
                  <div className="flex flex-wrap gap-2"><Chip accent="blue">Chapter {chapter.n}</Chip><Chip accent="cyan">{chapterCards.length} checks</Chip><Chip accent="lime">{chapterCards.length * 5} modes</Chip></div>
                  <h3 className="display mt-3 text-2xl font-medium text-ink">{chapter.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">Covers {chapterCards.map((card) => card.stageLabel.toLowerCase()).join(", ")} before the chapter becomes technical.</p>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}

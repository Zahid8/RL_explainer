import type { Metadata } from "next";
import Link from "next/link";
import { AlgorithmDebugClinic } from "@/components/AlgorithmDebugClinic";
import { Chip } from "@/components/Section";
import { allAlgorithmDebugCards, algorithmDebugCardCount, algorithmDebugChapterCount, algorithmDebugModeCount, algorithmDebugRepairStepCount, algorithmDebugTestStepCount } from "@/lib/algorithmDebug";
import { chapters } from "@/lib/paper";

export const metadata: Metadata = {
  title: "Algorithm Debugging Clinic | RLbook Explainer",
  description: "Symptom, diagnosis, repair, tiny-test, and transfer drills for every algorithm in the standalone RL web book.",
};

export default function DebugPage() {
  const cards = allAlgorithmDebugCards();
  const total = algorithmDebugCardCount();
  const modes = algorithmDebugModeCount();
  const chapterCount = algorithmDebugChapterCount();
  const repairSteps = algorithmDebugRepairStepCount();
  const testSteps = algorithmDebugTestStepCount();

  return (
    <main className="min-h-screen bg-bg text-ink">
      <header className="border-b border-line bg-panel paper-grid">
        <div className="mx-auto max-w-[1280px] px-6 py-8 lg:px-10">
          <div className="mb-8 flex flex-wrap items-center gap-3">
            <Link href="/" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">← Home</Link>
            <Link href="/book" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Book</Link>
            <Link href="/readiness" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Readiness</Link>
            <Link href="/code" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-orange">Code lab</Link>
            <Link href="/debug" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-orange">Debug clinic</Link>
            <Link href="/assumptions" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-lime">Trust clinic</Link>
            <Link href="/compare" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-violet">Compare</Link>
            <Link href="/coverage" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Coverage</Link>
          </div>
          <p className="eyebrow">Algorithm debugging clinic</p>
          <h1 className="display mt-4 max-w-5xl text-[clamp(42px,7vw,88px)] font-medium text-ink">Diagnose every RL algorithm before tuning it.</h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted">A standalone book should teach what to do when learning fails. This route turns every method into a debugging lecture: name the symptom, isolate the broken assumption or trace, repair one cause, prove the repair on a tiny fixture, and transfer the habit to the next task.</p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Chip accent="orange">{total} debug cards</Chip>
            <Chip accent="lime">{modes} debug modes</Chip>
            <Chip accent="cyan">{repairSteps} repair steps</Chip>
            <Chip accent="blue">{testSteps} test fixtures</Chip>
            <Chip accent="violet">{chapterCount} chapters</Chip>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1280px] gap-10 px-6 py-12 lg:px-10">
        <section>
          <AlgorithmDebugClinic cards={cards} contextTitle="Whole-book algorithm debugging clinic" compact />
        </section>

        <section className="grid gap-4">
          <div>
            <p className="eyebrow">Chapter coverage</p>
            <h2 className="display mt-2 text-4xl font-medium text-ink">Every chapter gets algorithm failure diagnosis, repair, and retest practice.</h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">Use these cards whenever a method seems unstable, too good, too slow, or impossible to trust. The goal is not more knobs; the goal is a named failure and a hand-checkable repair.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {chapters.map((chapter) => {
              const chapterCards = cards.filter((card) => card.chapter === chapter.n);
              return (
                <Link key={chapter.n} href={`/chapters/${chapter.n}#debug`} className="rounded-xl border border-line bg-panel p-5 transition hover:border-orange hover:bg-white">
                  <div className="flex flex-wrap gap-2"><Chip accent="blue">Chapter {chapter.n}</Chip><Chip accent="orange">{chapterCards.length} debug cards</Chip><Chip accent="lime">{chapterCards.length * 5} modes</Chip></div>
                  <h3 className="display mt-3 text-2xl font-medium text-ink">{chapter.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">Includes {chapterCards.slice(0, 3).map((card) => card.title.replace(" debugging clinic", "")).join(", ")}{chapterCards.length > 3 ? ", and related methods" : ""}.</p>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}

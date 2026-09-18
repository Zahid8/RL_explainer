import type { Metadata } from "next";
import Link from "next/link";
import { AnimatedConceptGraphic } from "@/components/AnimatedConceptGraphic";
import { AssumptionClinic } from "@/components/AssumptionClinic";
import { MotionGlyph } from "@/components/MotionGlyph";
import { Chip } from "@/components/Section";
import { allAssumptionClinicCards, assumptionCardCount, assumptionChapterCount, assumptionModeCount } from "@/lib/assumptionClinic";

export const metadata: Metadata = {
  title: "Assumption and Guarantee Clinic | RLbook Explainer",
  description: "A chapter-by-chapter clinic explaining the assumptions, guarantees, failures, and repairs behind each RL algorithm.",
};

export default function AssumptionsPage() {
  const cards = allAssumptionClinicCards();
  const byChapter = Array.from(new Map(cards.map((card) => [card.chapter, cards.filter((item) => item.chapter === card.chapter)])).entries());
  const denseChapters = [...byChapter].sort((a, b) => b[1].length - a[1].length).slice(0, 6);

  return (
    <main className="min-h-screen bg-bg text-ink">
      <header className="border-b border-line bg-panel paper-grid">
        <div className="mx-auto max-w-[1280px] px-6 py-8 lg:px-10">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
            <Link href="/" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">← Home overview</Link>
            <Link href="/book" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Linear book</Link>
            <Link href="/foundations" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Foundations</Link>
            <Link href="/math" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-orange">Math rescue</Link>
            <Link href="/stories" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Stories</Link>
            <Link href="/analogies" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-violet">Analogies</Link>
            <Link href="/tutor" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Tutor</Link>
            <Link href="/cases" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Cases</Link>
            <Link href="/projects" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-lime">Projects</Link>
            <Link href="/evidence" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Evidence replay</Link>
            <Link href="/code" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Code lab</Link>
            <Link href="/search" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Search index</Link>
            <Link href="/sections" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Section mastery</Link>
            <Link href="/compare" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Compare methods</Link>
            <Link href="/proofs" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Proof lab</Link>
            <Link href="/exam" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Exam studio</Link>
            <Link href="/exercises" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Exercise solutions</Link>
            <Link href="/coverage" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Coverage audit</Link>
          </div>
          <div className="grid gap-8 lg:grid-cols-[1fr_440px] lg:items-end">
            <div>
              <p className="eyebrow">Assumption and guarantee clinic</p>
              <h1 className="display mt-4 max-w-5xl text-[clamp(42px,7vw,88px)] font-medium text-ink">Know when an RL method deserves trust.</h1>
              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted">A complete book cannot only say how to run an update; it has to say when the update is valid. This clinic explains the world each method assumes, the guarantee it wants, how the promise breaks, how to repair the setup, and how the proof lab justifies the claims being trusted, and how the section mastery studio tests the named lesson and how the exam studio grades whether you can transfer the contract.</p>
              <div className="mt-6 flex flex-wrap gap-2">
                <Chip accent="cyan">{assumptionCardCount()} assumption clinics</Chip>
                <Chip accent="lime">{assumptionModeCount()} clinic modes</Chip>
                <Chip accent="blue">{assumptionChapterCount()} chapters</Chip>
                <Chip accent="violet">assumptions + guarantees</Chip>
                <Chip accent="orange">failure + repair</Chip>
              </div>
            </div>
            <div className="grid gap-4">
              <AnimatedConceptGraphic label="Assumption clinic" variant="coverage" caption="A method earns trust only after the data, target, update, representation, and diagnostic story line up." compact />
              <div className="rounded-xl border border-line bg-white p-5">
                <div className="mb-3 flex items-start justify-between gap-3"><p className="eyebrow">Dense assumption chapters</p><MotionGlyph label="assumption density" variant="check" accent="lime" className="-mr-2 -mt-2 motion-glyph-small" /></div>
                <div className="grid gap-2">
                  {denseChapters.map(([chapter, items]) => (
                    <a key={chapter} href={`#assumptions-chapter-${chapter}`} className="flex items-center justify-between gap-3 rounded-lg border border-line bg-panel-2 px-3 py-2 text-sm hover:border-cyan">
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
        <AssumptionClinic cards={cards} contextTitle="Whole-book assumption and guarantee clinic" />
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {byChapter.map(([chapter, items]) => (
            <a id={`assumptions-chapter-${chapter}`} key={chapter} href={`/chapters/${chapter}#assumptions`} className="rounded-xl border border-line bg-panel p-5 hover:border-cyan">
              <div className="flex flex-wrap gap-2"><Chip accent="cyan">Chapter {chapter}</Chip><Chip accent="lime">{items.length} clinics</Chip><Chip accent="blue">{items.length * 5} modes</Chip></div>
              <h2 className="display mt-4 text-2xl font-medium text-ink">Assumptions and guarantees</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">Includes {items.slice(0, 4).map((item) => item.title.replace(" assumptions and guarantee", "")).join(", ")}{items.length > 4 ? ", and more" : ""}.</p>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}

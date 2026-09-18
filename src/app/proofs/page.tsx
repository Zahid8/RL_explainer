import type { Metadata } from "next";
import Link from "next/link";
import { AnimatedConceptGraphic } from "@/components/AnimatedConceptGraphic";
import { ProofLab } from "@/components/ProofLab";
import { allProofLabCards, chapterProofSpineCount, formulaProofCardCount, proofCardCount, proofChapterCount, proofModeCount } from "@/lib/proofLab";
import { chapters } from "@/lib/paper";

export const metadata: Metadata = {
  title: "Proof Intuition Lab | RLbook Explainer",
  description: "Interactive proof-intuition cards for the standalone RL web book: claims, proof sketches, equation bridges, and stress tests chapter by chapter.",
};

export default function ProofsPage() {
  const cards = allProofLabCards();
  const total = proofCardCount();
  const modes = proofModeCount();
  const formulaCards = formulaProofCardCount();
  const chapterSpines = chapterProofSpineCount();
  const chapterCount = proofChapterCount();

  return (
    <main className="min-h-screen bg-bg text-ink">
      <header className="border-b border-line bg-panel paper-grid">
        <div className="mx-auto max-w-[1280px] px-6 py-10 lg:px-10">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
            <Link href="/" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-violet">← Home overview</Link>
            <div className="flex flex-wrap gap-2">
              <Link href="/book" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-violet">Book mode</Link>
              <Link href="/readiness" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Readiness</Link>
            <Link href="/foundations" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Foundations</Link>
            <Link href="/math" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-orange">Math rescue</Link>
            <Link href="/stories" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Stories</Link>
            <Link href="/analogies" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-violet">Analogies</Link>
            <Link href="/tutor" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Tutor</Link>
            <Link href="/cases" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Cases</Link>
            <Link href="/projects" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-lime">Projects</Link>
            <Link href="/evidence" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Evidence replay</Link>
              <Link href="/compare" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-violet">Compare methods</Link>
            <Link href="/assumptions" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-violet">Trust clinic</Link>
              <Link href="/sections" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-violet">Section mastery</Link>
              <Link href="/exam" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-violet">Exam studio</Link>
            <Link href="/exercises" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Exercise solutions</Link>
              <Link href="/coverage" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-violet">Coverage audit</Link>
            </div>
          </div>
          <div className="grid gap-8 lg:grid-cols-[1fr_420px] lg:items-end">
            <div>
              <p className="eyebrow">Proof intuition lab</p>
              <h1 className="display mt-4 max-w-5xl text-[clamp(42px,7vw,88px)] font-medium text-ink">Believe the equations, not by faith, but by tracing the argument.</h1>
              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted">
                This route teaches theorem-style thinking in original words. Each card states the claim, names the objects, walks the proof as a board argument, translates the equation, and stress-tests the counterexample that would break it, then feeds the section mastery studio for named lessons and the chapter exam studio where readers grade and transfer the argument.
              </p>
            </div>
            <div className="grid gap-4">
              <AnimatedConceptGraphic label="Proof intuition lab" variant="formula" caption="Every proof card moves from claim to objects to argument to equation bridge to stress test." compact />
              <div className="grid grid-cols-2 overflow-hidden rounded-xl border border-line bg-white">
                <Stat value={String(total)} label="proof cards" />
                <Stat value={String(modes)} label="proof modes" />
                <Stat value={String(chapterSpines)} label="chapter spines" />
                <Stat value={String(formulaCards)} label="formula proofs" />
                <Stat value={String(chapterCount)} label="chapters covered" />
                <Stat value="5" label="modes each" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-[1280px] px-6 py-12 lg:px-10">
        <ProofLab cards={cards} contextTitle="Whole-book proof intuition lab" />
      </section>

      <section className="border-t border-line bg-panel-2/50">
        <div className="mx-auto max-w-[1280px] px-6 py-12 lg:px-10">
          <p className="eyebrow">Chapter proof index</p>
          <h2 className="display mt-3 text-4xl font-medium text-ink">Jump from each chapter to its proof layer.</h2>
          <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {chapters.map((chapter) => {
              const chapterCards = cards.filter((card) => card.chapter === chapter.n);
              return (
                <Link key={chapter.n} href={`/chapters/${chapter.n}#proofs`} className="rounded-xl border border-line bg-white p-4 transition hover:border-violet">
                  <p className="mono text-[10px] uppercase tracking-[0.14em] text-dim">Chapter {chapter.n}</p>
                  <h3 className="display mt-2 text-2xl font-medium text-ink">{chapter.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{chapterCards.length} proof cards · {chapterCards.length * 5} claim/proof/equation/stress modes.</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return <div className="border-b border-r border-line p-4"><p className="display text-3xl text-ink">{value}</p><p className="mono mt-2 text-[10px] uppercase tracking-[0.16em] text-dim">{label}</p></div>;
}

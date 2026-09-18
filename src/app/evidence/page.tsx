import type { Metadata } from "next";
import Link from "next/link";
import { EvidenceReplayStudio } from "@/components/EvidenceReplayStudio";
import { Chip } from "@/components/Section";
import { allEvidenceReplayCards, evidenceReplayCardCount, evidenceReplayChapterCount, evidenceReplayKindCount, evidenceReplayModeCount, evidenceReplayReconstructionStepCount } from "@/lib/evidenceReplay";
import { chapters } from "@/lib/paper";

export const metadata: Metadata = {
  title: "Evidence Replay Studio | RLbook Explainer",
  description: "Replay every figure, table, and named example as an original interactive RL lecture.",
};

export default function EvidencePage() {
  const cards = allEvidenceReplayCards();
  const total = evidenceReplayCardCount();
  const modes = evidenceReplayModeCount();
  const chapterCount = evidenceReplayChapterCount();
  const steps = evidenceReplayReconstructionStepCount();
  const kindTypes = evidenceReplayKindCount();
  const figures = evidenceReplayKindCount("figure");
  const examples = evidenceReplayKindCount("example");
  const tables = evidenceReplayKindCount("table");

  return (
    <main className="min-h-screen bg-bg text-ink">
      <header className="border-b border-line bg-panel paper-grid">
        <div className="mx-auto max-w-[1280px] px-6 py-8 lg:px-10">
          <div className="mb-8 flex flex-wrap items-center gap-3">
            <Link href="/" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">← Home</Link>
            <Link href="/book" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Book</Link>
            <Link href="/projects" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-lime">Projects</Link>
            <Link href="/evidence" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Evidence replay</Link>
            <Link href="/search" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Search</Link>
            <Link href="/coverage" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Coverage</Link>
          </div>
          <p className="eyebrow">Evidence replay studio</p>
          <h1 className="display mt-4 max-w-5xl text-[clamp(42px,7vw,88px)] font-medium text-ink">Turn every figure and example into a replayable lecture.</h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted">This route does not reproduce the original figures. It teaches what each anchor is doing: how to read it, rebuild it, translate it technically, avoid the common misread, and transfer the same mechanism to a tiny new RL world.</p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Chip accent="cyan">{total} evidence replays</Chip>
            <Chip accent="lime">{modes} replay modes</Chip>
            <Chip accent="orange">{steps} reconstruction steps</Chip>
            <Chip accent="blue">{chapterCount} chapters</Chip>
            <Chip accent="cyan">{figures} figures</Chip>
            <Chip accent="blue">{examples} examples</Chip>
            <Chip accent="orange">{tables} table</Chip>
            <Chip accent="violet">{kindTypes} source kinds</Chip>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1280px] gap-10 px-6 py-12 lg:px-10">
        <section>
          <EvidenceReplayStudio cards={cards} contextTitle="Whole-book evidence replay studio" compact />
        </section>

        <section className="grid gap-4">
          <div>
            <p className="eyebrow">Chapter coverage</p>
            <h2 className="display mt-2 text-4xl font-medium text-ink">Every chapter gets replayable visual/example anchors.</h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">Use these cards when a plot, backup diagram, table, benchmark, or named example is the fastest way to understand the chapter argument.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {chapters.map((chapter) => {
              const chapterCards = cards.filter((card) => card.chapter === chapter.n);
              return (
                <Link key={chapter.n} href={`/chapters/${chapter.n}#evidence-replay`} className="rounded-xl border border-line bg-panel p-5 transition hover:border-cyan hover:bg-white">
                  <div className="flex flex-wrap gap-2"><Chip accent="blue">Chapter {chapter.n}</Chip><Chip accent="cyan">{chapterCards.length} replays</Chip><Chip accent="lime">{chapterCards.length * 5} modes</Chip></div>
                  <h3 className="display mt-3 text-2xl font-medium text-ink">{chapter.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">Includes {chapterCards.slice(0, 3).map((card) => card.ref).join(", ")}{chapterCards.length > 3 ? ", and related anchors" : ""} as reconstructable chapter evidence.</p>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}

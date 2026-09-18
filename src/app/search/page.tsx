import type { Metadata } from "next";
import Link from "next/link";
import { AnimatedConceptGraphic } from "@/components/AnimatedConceptGraphic";
import { BookSearch } from "@/components/BookSearch";
import { MotionGlyph } from "@/components/MotionGlyph";
import { Chip } from "@/components/Section";
import { allBookIndexEntries, bookIndexChapterCount, bookIndexEntryCount, bookIndexLayerCount } from "@/lib/bookIndex";

export const metadata: Metadata = {
  title: "Whole-book Search | RLbook Explainer",
  description: "Search the standalone RL web book across chapters, algorithms, formulas, examples, misconceptions, implementation code labs, assumption clinics, proof labs, chapter exams, section mastery checks, and practice layers.",
};

type SearchParams = Promise<{ q?: string; query?: string; chapter?: string; layer?: string }>;

export default async function SearchPage({ searchParams }: { searchParams?: SearchParams }) {
  const params = searchParams ? await searchParams : {};
  const entries = allBookIndexEntries();
  const chapterCount = bookIndexChapterCount();
  const layerCount = bookIndexLayerCount();
  const entryCount = bookIndexEntryCount();
  const topLayers = layerBreakdown(entries).slice(0, 8);
  const defaultChapter = params.chapter ? Number(params.chapter) : undefined;
  const defaultQuery = params.q ?? params.query ?? "";
  const defaultLayer = entries.some((entry) => entry.layer === params.layer) ? params.layer as (typeof entries)[number]["layer"] : "all";

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
            <Link href="/sections" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Section mastery</Link>
            <Link href="/symbols" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Symbol decoder</Link>
            <Link href="/code" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Code lab</Link>
            <Link href="/assumptions" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Trust clinic</Link>
            <Link href="/compare" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Compare methods</Link>
            <Link href="/proofs" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Proof lab</Link>
            <Link href="/exam" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Exam studio</Link>
            <Link href="/exercises" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Exercise solutions</Link>
            <Link href="/coverage" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Coverage audit</Link>
          </div>
          <div className="grid gap-8 lg:grid-cols-[1fr_440px] lg:items-end">
            <div>
              <p className="eyebrow">Whole-book knowledge index</p>
              <h1 className="display mt-4 max-w-5xl text-[clamp(42px,7vw,88px)] font-medium text-ink">Search the RL book from beginner story to advanced machinery.</h1>
              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted">
                This page turns the standalone web book into a searchable lecture desk. It indexes chapter stories, zero-knowledge rungs, guided theater slides, contextual symbol cards, implementation code labs, assumption clinics, proof arguments, chapter exams, section mastery checks, concepts, worked examples, misconceptions, simulators, manuscripts, section lessons, algorithms, formulas, evidence anchors, and exercise coaches.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <Chip accent="cyan">{entryCount} indexed entries</Chip>
                <Chip accent="lime">{layerCount} explanation layers</Chip>
                <Chip accent="blue">{chapterCount} chapters</Chip>
                <Chip accent="violet">plain + technical search</Chip>
                <Chip accent="orange">direct chapter links</Chip>
              </div>
            </div>
            <div className="grid gap-4">
              <AnimatedConceptGraphic label="Whole-book search" variant="tree" caption="A searchable index connects beginner intuition, board pictures, equations, algorithm machinery, code scaffolds, assumptions, guarantees, proof sketches, chapter exams, section mastery checks, examples, traps, and exercises across the full course." compact />
              <div className="rounded-xl border border-line bg-white p-5">
                <div className="mb-3 flex items-start justify-between gap-3">
                  <p className="eyebrow">Index composition</p>
                  <MotionGlyph label="search index" variant="check" accent="lime" className="-mr-2 -mt-2 motion-glyph-small" />
                </div>
                <div className="grid gap-2">
                  {topLayers.map(([layer, count]) => (
                    <div key={layer} className="flex items-center justify-between gap-3 rounded-lg border border-line bg-panel-2 px-3 py-2 text-sm">
                      <span className="text-muted">{layer}</span>
                      <span className="display text-xl text-ink">{count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1280px] px-6 py-12 lg:px-10">
        <BookSearch entries={entries} contextTitle="Search across the complete standalone RL web book" defaultQuery={defaultQuery} defaultLayer={defaultLayer} defaultChapter={Number.isFinite(defaultChapter) ? defaultChapter : undefined} />
      </div>
    </main>
  );
}

function layerBreakdown(entries: ReturnType<typeof allBookIndexEntries>) {
  const counts = new Map<string, number>();
  for (const entry of entries) counts.set(entry.layer, (counts.get(entry.layer) ?? 0) + 1);
  return Array.from(counts.entries()).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
}

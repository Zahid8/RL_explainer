import type { Metadata } from "next";
import Link from "next/link";
import { AnimatedConceptGraphic } from "@/components/AnimatedConceptGraphic";
import { LearningGraphExplorer } from "@/components/LearningGraphExplorer";
import { MotionGlyph } from "@/components/MotionGlyph";
import { Chip } from "@/components/Section";
import { allLearningGraphs, learningGraphChapterCount, learningGraphEdgeCount, learningGraphNodeCount } from "@/lib/learningGraph";

export const metadata: Metadata = {
  title: "Interactive Learning Graph | RLbook Explainer",
  description: "A clickable graphical map connecting RLbook concepts, formulas, decoded symbols, algorithms, code scaffolds, assumptions, proof sketches, chapter exams, section mastery checks, examples, practice, and simulators chapter by chapter.",
};

export default function GraphPage() {
  const graphs = allLearningGraphs();
  const nodeCount = learningGraphNodeCount();
  const edgeCount = learningGraphEdgeCount();
  const chapterCount = learningGraphChapterCount();
  const densest = [...graphs].sort((a, b) => b.nodes.length - a.nodes.length).slice(0, 6);

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
            <Link href="/search" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Search index</Link>
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
              <p className="eyebrow">Interactive learning graph</p>
              <h1 className="display mt-4 max-w-5xl text-[clamp(42px,7vw,88px)] font-medium text-ink">See how every chapter idea connects before you dive into details.</h1>
              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted">
                This is the graphical lecture map for the standalone book. Each chapter becomes a clickable network of prerequisites, concepts, formulas, decoded symbols, algorithms, code scaffolds, assumption clinics, proof labs, chapter exam studios, section mastery studios, worked examples, practice checkpoints, simulator knobs, and later unlocks.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <Chip accent="cyan">{chapterCount} chapter maps</Chip>
                <Chip accent="lime">{nodeCount} graph nodes</Chip>
                <Chip accent="blue">{edgeCount} learning links</Chip>
                <Chip accent="violet">plain + technical modes</Chip>
                <Chip accent="orange">direct layer links</Chip>
              </div>
            </div>
            <div className="grid gap-4">
              <AnimatedConceptGraphic label="Learning graph" variant="tree" caption="The graph turns the book into a map: prerequisite ideas feed chapter concepts, concepts become notation, notation becomes algorithms, algorithms become code scaffolds, proof sketches, assumption checks, section mastery prompts, and exam prompts, then scaffolds become worked traces and practice." compact />
              <div className="rounded-xl border border-line bg-white p-5">
                <div className="mb-3 flex items-start justify-between gap-3">
                  <p className="eyebrow">Dense chapter maps</p>
                  <MotionGlyph label="learning graph" variant="tree" accent="cyan" className="-mr-2 -mt-2 motion-glyph-small" />
                </div>
                <div className="grid gap-2">
                  {densest.map((graph) => (
                    <a key={graph.chapter} href={`#graph-chapter-${graph.chapter}`} className="flex items-center justify-between gap-3 rounded-lg border border-line bg-panel-2 px-3 py-2 text-sm hover:border-cyan">
                      <span className="text-muted">Chapter {graph.chapter}: {graph.title}</span>
                      <span className="display text-xl text-ink">{graph.nodes.length}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1280px] px-6 py-12 lg:px-10">
        <LearningGraphExplorer graphs={graphs} contextTitle="Book-wide graphical learning map" />
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {graphs.map((graph) => (
            <a id={`graph-chapter-${graph.chapter}`} key={graph.chapter} href={`/chapters/${graph.chapter}#learning-graph`} className="rounded-xl border border-line bg-panel p-5 hover:border-cyan">
              <div className="flex flex-wrap gap-2"><Chip accent="cyan">Chapter {graph.chapter}</Chip><Chip accent="lime">{graph.nodes.length} nodes</Chip><Chip accent="blue">{graph.edges.length} links</Chip></div>
              <h2 className="display mt-4 text-2xl font-medium text-ink">{graph.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">{graph.promise}</p>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}

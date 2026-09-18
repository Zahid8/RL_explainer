import type { Metadata } from "next";
import Link from "next/link";
import { AnimatedConceptGraphic } from "@/components/AnimatedConceptGraphic";
import { MotionGlyph } from "@/components/MotionGlyph";
import { Chip } from "@/components/Section";
import { algorithmCatalog, algorithmTotals, type AlgorithmDetail } from "@/lib/algorithmCatalog";
import { algorithmDerivation, derivationPreview } from "@/lib/algorithmDerivations";
import { algorithmDossier } from "@/lib/algorithmDossier";
import { algorithmProfile, profileRows } from "@/lib/algorithmProfiles";
import { algorithmSourceAudits } from "@/lib/algorithmSourceAudit";
import { workedExampleForAlgorithm } from "@/lib/algorithmWorkedExamples";
import { chapters } from "@/lib/paper";

export const metadata: Metadata = {
  title: "RL Algorithm Index | RLbook Explainer",
  description: "A whole-book index of RL algorithms, source cues, updates, assumptions, and worked examples from the RLbook explainer.",
};

export default function AlgorithmIndexPage() {
  const byChapter = chapters.map((chapter) => ({
    chapter,
    algorithms: algorithmCatalog.filter((algorithm) => algorithm.chapter === chapter.n),
    sourceAudits: algorithmSourceAudits.filter((audit) => audit.chapter === chapter.n),
  }));
  const families = Array.from(new Set(algorithmCatalog.map((algorithm) => algorithm.family))).sort();

  return (
    <main className="min-h-screen bg-bg text-ink">
      <header className="border-b border-line bg-panel paper-grid">
        <div className="mx-auto max-w-[1280px] px-6 py-8 lg:px-10">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
            <Link href="/" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">← Home overview</Link>
            <Link href="/foundations" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Foundations</Link>
            <Link href="/math" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-orange">Math rescue</Link>
            <Link href="/stories" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Stories</Link>
            <Link href="/analogies" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-violet">Analogies</Link>
            <Link href="/tutor" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Tutor</Link>
            <Link href="/cases" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Cases</Link>
            <Link href="/compare" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Compare methods</Link>
            <a href="#all-algorithms" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Jump to all cards</a>
          </div>
          <div className="grid gap-8 lg:grid-cols-[1fr_460px] lg:items-end">
            <div>
              <p className="eyebrow">Whole-book algorithm index</p>
              <h1 className="display mt-4 max-w-5xl text-[clamp(42px,7vw,88px)] font-medium text-ink">Every RL algorithmic thread, cross-linked.</h1>
              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted">This page is the global coverage ledger for the chapter pages: source cues from the PDF, detailed algorithm cards, implementation dossiers, worked update microscopes, and direct links back to the chapter explanations.</p>
            </div>
            <div className="grid gap-4">
              <AnimatedConceptGraphic label="Algorithm universe" variant="algorithm" caption="Hover or click the phases to see how every algorithm cycles through sensing, target construction, updating, and action pressure." compact />
              <div className="grid grid-cols-2 overflow-hidden rounded-xl border border-line bg-white">
                <Stat value={String(algorithmTotals.total)} label="algorithm cards" />
                <Stat value={String(algorithmSourceAudits.length)} label="source cues" />
                <Stat value={String(algorithmTotals.chapters)} label="chapters" />
                <Stat value={String(families.length)} label="families" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1280px] gap-12 px-6 py-12 lg:px-10">
        <section className="rounded-xl border border-line bg-panel p-5">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
            <div>
              <p className="eyebrow mb-3">Index navigation</p>
              <div className="flex flex-wrap gap-2">
                {byChapter.map(({ chapter, algorithms, sourceAudits }) => (
                  <a key={chapter.n} href={`#chapter-${chapter.n}`} className="mono rounded-full border border-line bg-panel-2 px-3 py-2 text-[11px] uppercase tracking-[0.12em] text-muted hover:border-cyan hover:text-ink">
                    Ch {chapter.n}: {algorithms.length} cards / {sourceAudits.length} cues
                  </a>
                ))}
              </div>
            </div>
            <AnimatedConceptGraphic label="Jump map" variant="tree" caption="Each chip jumps to an animated chapter cluster; every cluster contains interactive algorithm cards." compact />
          </div>
        </section>

        <section id="coverage-dashboard" className="scroll-mt-24">
          <SectionTitle eyebrow="01 - Coverage dashboard" title="A chapter-by-chapter audit before the details." lead="Use this table to confirm that each chapter has standalone pages, source-cue coverage, and direct links to detailed algorithm cards." />
          <div className="mt-6 overflow-hidden rounded-xl border border-line bg-panel">
            {byChapter.map(({ chapter, algorithms, sourceAudits }) => (
              <div key={chapter.n} className="grid gap-4 border-b border-line p-4 last:border-b-0 lg:grid-cols-[90px_1fr_160px_160px_180px] lg:items-center">
                <p className="display text-3xl text-ink">{chapter.n}</p>
                <div>
                  <h2 className="display text-2xl font-medium text-ink">{chapter.title}</h2>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{chapter.claim}</p>
                </div>
                <Metric label="cards" value={algorithms.length} />
                <Metric label="source cues" value={sourceAudits.length} />
                <Link href={`/chapters/${chapter.n}`} className="mono rounded-full border border-line bg-panel-2 px-3 py-2 text-center text-[11px] uppercase tracking-[0.12em] text-muted hover:border-cyan hover:text-ink">Open chapter</Link>
              </div>
            ))}
          </div>
        </section>

        <section id="families" className="scroll-mt-24">
          <SectionTitle eyebrow="02 - Families" title="The algorithms are grouped by what kind of update pressure they apply." lead="Families make it easier to compare methods that share a target shape or implementation risk even when they appear in different chapters." />
          <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {families.map((family) => {
              const members = algorithmCatalog.filter((algorithm) => algorithm.family === family);
              return (
                <article key={family} className="rounded-xl border border-line bg-panel p-4">
                  <div className="flex flex-wrap gap-2"><Chip accent="cyan">{members.length} cards</Chip></div>
                  <h3 className="display mt-3 text-2xl font-medium text-ink">{family}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">Chapters {Array.from(new Set(members.map((member) => member.chapter))).join(", ")}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section id="all-algorithms" className="scroll-mt-24">
          <SectionTitle eyebrow="03 - All algorithm cards" title="Direct links to every detailed algorithm explanation." lead="Each index card summarizes the objective, update target, source evidence, implementation dossier, and worked-example preview. The chapter link opens the complete expanded treatment." />
          <div className="mt-6 grid gap-10">
            {byChapter.map(({ chapter, algorithms, sourceAudits }) => (
              <section id={`chapter-${chapter.n}`} key={chapter.n} className="scroll-mt-24 rounded-2xl border border-line bg-panel-2 p-5 lg:p-6">
                <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
                  <div>
                    <p className="eyebrow">Chapter {chapter.n} / {chapter.part}</p>
                    <h2 className="display mt-2 text-[clamp(30px,4vw,48px)] font-medium text-ink">{chapter.title}</h2>
                    <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">{chapter.technical}</p>
                    <Link href={`/chapters/${chapter.n}`} className="mono mt-4 inline-flex rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.12em] text-muted hover:border-cyan hover:text-ink">Open full page</Link>
                  </div>
                  <AnimatedConceptGraphic label={`Chapter ${chapter.n} cluster`} variant="chapter" caption={chapter.claim} compact />
                </div>
                <div className="mt-5 grid gap-5">
                  {algorithms.map((algorithm) => <AlgorithmIndexCard key={algorithm.id} algorithm={algorithm} sourceAudits={sourceAudits.filter((audit) => audit.catalogIds.includes(algorithm.id))} />)}
                </div>
              </section>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function AlgorithmIndexCard({ algorithm, sourceAudits }: { algorithm: AlgorithmDetail; sourceAudits: typeof algorithmSourceAudits }) {
  const dossier = algorithmDossier(algorithm);
  const worked = workedExampleForAlgorithm(algorithm);
  const profile = algorithmProfile(algorithm);
  const derivation = algorithmDerivation(algorithm);

  return (
    <article className="rounded-xl border border-line bg-panel p-5">
      <div className="flex flex-wrap gap-2"><Chip accent="cyan">{algorithm.family}</Chip><Chip accent="blue">{algorithm.bookAnchor}</Chip>{sourceAudits.length ? <Chip accent="violet">{sourceAudits.length} source cue{sourceAudits.length === 1 ? "" : "s"}</Chip> : null}</div>
      <div className="mt-4 grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <h3 className="display text-3xl font-medium text-ink">{algorithm.name}</h3>
          <div className="mt-4"><AnimatedConceptGraphic label={algorithm.name} variant="algorithm" caption={algorithm.plain} compact /></div>
          <p className="mt-3 text-sm leading-relaxed text-muted"><span className="font-medium text-ink">Easy:</span> {algorithm.plain}</p>
          <p className="mt-2 text-sm leading-relaxed text-muted"><span className="font-medium text-ink">Technical:</span> {algorithm.technical}</p>
          <p className="mt-3 rounded-lg border border-line bg-panel-2 p-3 text-sm leading-relaxed text-muted"><span className="font-medium text-ink">Core update:</span> {algorithm.coreUpdate}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link href={`/chapters/${algorithm.chapter}#${algorithm.id}`} className="mono rounded-full border border-line bg-white px-3 py-2 text-[11px] uppercase tracking-[0.12em] text-muted hover:border-cyan hover:text-ink">Open expanded card</Link>
            <Link href={`/chapters/${algorithm.chapter}#source-audit`} className="mono rounded-full border border-line bg-white px-3 py-2 text-[11px] uppercase tracking-[0.12em] text-muted hover:border-cyan hover:text-ink">Source audit</Link>
          </div>
        </div>
        <div className="grid gap-4">
          <MiniPanel title="PDF source cues" items={sourceAudits.length ? sourceAudits.map((audit) => `${audit.bookAnchor}: ${audit.sourceTitle}`) : ["No separate source-audit row; this card supports chapter context, formulation, or an application procedure."]} />
          <MiniPanel title="Technical profile axes" items={profileRows(profile).slice(0, 6).map(([label, value]) => `${label}: ${value}`)} />
          <MiniPanel title="Derivation path" items={derivationPreview(derivation)} />
          <MiniPanel title="Dossier sections" items={dossier.map((section) => section.label)} />
          <MiniPanel title="Worked microscope preview" items={[worked.title, ...worked.calculation.slice(0, 3), `Debug: ${worked.debuggingProbe}`]} />
        </div>
      </div>
    </article>
  );
}

function glyphVariantForLabel(label: string): "loop" | "bars" | "tree" | "target" | "formula" | "check" {
  if (/derivation|formula|technical|core|target|update/i.test(label)) return "formula";
  if (/profile|objective|family|axis|cards|algorithm/i.test(label)) return "target";
  if (/chapter|source|coverage|cue|map/i.test(label)) return "tree";
  if (/worked|dossier|preview|steps|pseudo/i.test(label)) return "bars";
  if (/warning|debug|check|complete/i.test(label)) return "check";
  return "loop";
}

function glyphAccentForLabel(label: string): "cyan" | "orange" | "blue" | "violet" | "lime" {
  if (/debug|warning|risk|failure/i.test(label)) return "orange";
  if (/derivation|formula|profile|technical/i.test(label)) return "violet";
  if (/worked|check|complete/i.test(label)) return "lime";
  if (/chapter|source|coverage/i.test(label)) return "blue";
  return "cyan";
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="border-b border-r border-line p-4">
      <div className="flex items-start justify-between gap-2">
        <div><p className="display text-3xl text-ink">{value}</p><p className="mono mt-2 text-[10px] uppercase tracking-[0.16em] text-dim">{label}</p></div>
        <MotionGlyph label={label} variant={glyphVariantForLabel(label)} accent={glyphAccentForLabel(label)} className="-mr-2 -mt-2 motion-glyph-small" />
      </div>
    </div>
  );
}

function Metric({ value, label }: { value: number; label: string }) {
  return <div className="rounded-lg border border-line bg-panel-2 p-3"><div className="flex items-start justify-between gap-2"><div><p className="display text-2xl text-ink">{value}</p><p className="mono mt-1 text-[10px] uppercase tracking-[0.14em] text-dim">{label}</p></div><MotionGlyph label={label} variant={glyphVariantForLabel(label)} accent={glyphAccentForLabel(label)} className="-mr-2 -mt-2 motion-glyph-small" /></div></div>;
}

function SectionTitle({ eyebrow, title, lead }: { eyebrow: string; title: string; lead: string }) {
  return <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start"><div><p className="eyebrow">{eyebrow}</p><h2 className="display mt-3 text-[clamp(30px,4vw,48px)] font-medium text-ink">{title}</h2><p className="mt-4 max-w-4xl text-base leading-relaxed text-muted">{lead}</p></div><AnimatedConceptGraphic label={eyebrow} variant="coverage" caption={lead} compact /></div>;
}

function MiniPanel({ title, items }: { title: string; items: string[] }) {
  return <div className="rounded-lg border border-line bg-white p-4"><div className="mb-3 flex items-start justify-between gap-2"><p className="mono text-[10px] uppercase tracking-[0.14em] text-dim">{title}</p><MotionGlyph label={title} variant={glyphVariantForLabel(title)} accent={glyphAccentForLabel(title)} className="-mr-2 -mt-2 motion-glyph-small" /></div><ul className="grid gap-2 text-sm leading-relaxed text-muted">{items.map((item, index) => <li key={`${title}-${index}`} className="flex gap-2"><span className="text-cyan">•</span><span>{item}</span></li>)}</ul></div>;
}

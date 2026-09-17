import type { Metadata } from "next";
import Link from "next/link";
import { Chip } from "@/components/Section";
import { buildCoverageAudit, type AlgorithmCoverageRow, type ChapterCoverageRow, type RequirementProof } from "@/lib/coverageAudit";

export const metadata: Metadata = {
  title: "Coverage Audit | RLbook Explainer",
  description: "A current-state audit proving chapter route coverage and algorithm detail layers for the RLbook explainer.",
};

export default function CoveragePage() {
  const audit = buildCoverageAudit();

  return (
    <main className="min-h-screen bg-bg text-ink">
      <header className="border-b border-line bg-panel paper-grid">
        <div className="mx-auto max-w-[1280px] px-6 py-8 lg:px-10">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
            <Link href="/" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">← Home overview</Link>
            <Link href="/algorithms" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Algorithm index</Link>
          </div>
          <div className="grid gap-8 lg:grid-cols-[1fr_460px] lg:items-end">
            <div>
              <p className="eyebrow">Whole-book coverage audit</p>
              <h1 className="display mt-4 max-w-5xl text-[clamp(42px,7vw,88px)] font-medium text-ink">Proof ledger for chapters and algorithms.</h1>
              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted">This page is generated from the current repository data. It checks whether every chapter has a standalone detail route and whether every algorithm card has the required easy, technical, derivation, profile, dossier, and worked-example layers.</p>
              <p className="mt-4 text-sm leading-relaxed text-dim">Generated from: {audit.generatedFrom}.</p>
            </div>
            <div className="grid grid-cols-2 overflow-hidden rounded-xl border border-line bg-white">
              <Stat value={String(audit.totals.chapterRoutes)} label="chapter routes" />
              <Stat value={String(audit.totals.algorithms)} label="algorithm cards" />
              <Stat value={String(audit.totals.completeAlgorithms)} label="complete alg cards" />
              <Stat value={String(audit.totals.warnings)} label="audit warnings" />
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1280px] gap-12 px-6 py-12 lg:px-10">
        <section id="requirements" className="scroll-mt-24">
          <SectionTitle eyebrow="01 - Requirement proofs" title="The user-facing goal is translated into inspectable evidence." lead="A requirement is marked complete only when the current data proves the corresponding route or detail layer exists." />
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {audit.requirements.map((requirement) => <RequirementCard key={requirement.label} requirement={requirement} />)}
          </div>
        </section>

        <section id="chapter-matrix" className="scroll-mt-24">
          <SectionTitle eyebrow="02 - Chapter coverage matrix" title="Every chapter route and every major study layer in one audit table." lead="Open any chapter to inspect the rendered detail layers: synthesis, dependencies, source audit, algorithms, deep dives, mastery notes, formulas, anchors, and exercises." />
          <div className="mt-6 grid gap-4">
            {audit.chapters.map((chapter) => <ChapterCoverageCard key={chapter.chapter} chapter={chapter} />)}
          </div>
        </section>

        <section id="algorithm-matrix" className="scroll-mt-24">
          <SectionTitle eyebrow="03 - Algorithm detail matrix" title="All algorithm cards are audited for technical and easy explanation layers." lead="This is intentionally exhaustive: one row per algorithm/procedure card, with counts for operational steps, pseudocode, dossiers, derivations, profile axes, and worked examples." />
          <div className="mt-6 grid gap-3">
            {audit.algorithms.map((algorithm) => <AlgorithmCoverageCard key={algorithm.id} algorithm={algorithm} />)}
          </div>
        </section>
      </div>
    </main>
  );
}

function RequirementCard({ requirement }: { requirement: RequirementProof }) {
  return (
    <article className="rounded-xl border border-line bg-panel p-5">
      <div className="flex flex-wrap gap-2"><Chip accent={requirement.status === "complete" ? "lime" : "orange"}>{requirement.status}</Chip></div>
      <h2 className="display mt-4 text-2xl font-medium text-ink">{requirement.label}</h2>
      <p className="mt-3 text-sm leading-relaxed text-muted"><span className="font-medium text-ink">Evidence:</span> {requirement.evidence}</p>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <MiniBlock label="Easy proof" text={requirement.easy} />
        <MiniBlock label="Technical proof" text={requirement.technical} tint />
      </div>
    </article>
  );
}

function ChapterCoverageCard({ chapter }: { chapter: ChapterCoverageRow }) {
  return (
    <article className="rounded-xl border border-line bg-panel p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="eyebrow">Chapter {chapter.chapter}</p>
          <h2 className="display mt-2 text-2xl font-medium text-ink">{chapter.title}</h2>
        </div>
        <Link href={chapter.route} className="mono rounded-full border border-line bg-white px-3 py-2 text-[11px] uppercase tracking-[0.12em] text-muted hover:border-cyan hover:text-ink">Open chapter</Link>
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-4 lg:grid-cols-8">
        <Metric label="algorithms" value={chapter.algorithms} />
        <Metric label="source cues" value={chapter.sourceCues} />
        <Metric label="sections" value={chapter.sectionNotes} />
        <Metric label="mastery" value={chapter.masteryTiles} />
        <Metric label="formulas" value={chapter.formulas} />
        <Metric label="anchors" value={chapter.evidenceAnchors} />
        <Metric label="exercises" value={chapter.exerciseGuides} />
        <Metric label="gates" value={chapter.synthesisGates + chapter.dependencyGates} />
      </div>
      <div className="mt-4 flex flex-wrap gap-2">{chapter.layers.map((layer) => <Chip key={layer} accent="cyan">{layer}</Chip>)}</div>
      {chapter.warnings.length ? <Panel title="Warnings" items={chapter.warnings} accent="orange" /> : <p className="mt-4 rounded-lg border border-lime/30 bg-lime/[0.06] p-3 text-sm leading-relaxed text-muted">All expected chapter-level layers are represented in the current data.</p>}
    </article>
  );
}

function AlgorithmCoverageCard({ algorithm }: { algorithm: AlgorithmCoverageRow }) {
  return (
    <article className="rounded-xl border border-line bg-panel p-4">
      <div className="grid gap-4 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
        <div>
          <div className="flex flex-wrap gap-2"><Chip accent={algorithm.status === "complete" ? "lime" : "orange"}>{algorithm.status}</Chip><Chip accent="cyan">Ch {algorithm.chapter}</Chip><Chip accent="blue">{algorithm.family}</Chip></div>
          <Link href={algorithm.route} className="display mt-3 block text-2xl font-medium text-ink hover:text-cyan">{algorithm.name}</Link>
          <p className="mt-2 text-sm leading-relaxed text-muted">{algorithm.proof}</p>
        </div>
        <div className="grid gap-2 md:grid-cols-3 lg:grid-cols-6">
          <Metric label="steps" value={algorithm.operationalSteps} />
          <Metric label="pseudo" value={algorithm.pseudocodeLines} />
          <Metric label="dossier" value={algorithm.dossierSections} />
          <Metric label="derivation" value={algorithm.derivationSteps} />
          <Metric label="profile" value={algorithm.profileAxes} />
          <Metric label="worked" value={algorithm.workedCalculations + algorithm.workedChecks} />
        </div>
      </div>
    </article>
  );
}

function SectionTitle({ eyebrow, title, lead }: { eyebrow: string; title: string; lead: string }) {
  return <div><p className="eyebrow">{eyebrow}</p><h2 className="display mt-3 text-[clamp(30px,4vw,48px)] font-medium text-ink">{title}</h2><p className="mt-4 max-w-4xl text-base leading-relaxed text-muted">{lead}</p></div>;
}

function Stat({ value, label }: { value: string; label: string }) {
  return <div className="border-b border-r border-line p-4"><p className="display text-3xl text-ink">{value}</p><p className="mono mt-2 text-[10px] uppercase tracking-[0.16em] text-dim">{label}</p></div>;
}

function Metric({ value, label }: { value: number; label: string }) {
  return <div className="rounded-lg border border-line bg-white p-3"><p className="display text-2xl text-ink">{value}</p><p className="mono mt-1 text-[10px] uppercase tracking-[0.14em] text-dim">{label}</p></div>;
}

function MiniBlock({ label, text, tint = false }: { label: string; text: string; tint?: boolean }) {
  return <div className={`rounded-lg border border-line ${tint ? "bg-panel-2" : "bg-white"} p-3`}><p className="mono mb-2 text-[10px] uppercase tracking-[0.14em] text-dim">{label}</p><p className="text-sm leading-relaxed text-muted">{text}</p></div>;
}

function Panel({ title, items, accent = "cyan" }: { title: string; items: string[]; accent?: "cyan" | "orange" | "blue" | "violet" | "lime" }) {
  const color = { cyan: "text-cyan", orange: "text-orange", blue: "text-blue", violet: "text-violet", lime: "text-lime" }[accent];
  return <div className="mt-4 rounded-lg border border-line bg-white p-4"><p className="mono mb-3 text-[10px] uppercase tracking-[0.14em] text-dim">{title}</p><ul className="grid gap-2 text-sm leading-relaxed text-muted">{items.map((item, index) => <li key={`${title}-${index}`} className="flex gap-2"><span className={color}>•</span><span>{item}</span></li>)}</ul></div>;
}

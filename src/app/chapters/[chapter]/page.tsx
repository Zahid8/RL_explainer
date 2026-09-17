import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TeX } from "@/components/Math";
import { Chip, Plain } from "@/components/Section";
import { algorithmsForChapter, type AlgorithmDetail } from "@/lib/algorithmCatalog";
import { algorithmDossier, type AlgorithmDossierSection } from "@/lib/algorithmDossier";
import { workedExampleForAlgorithm, type AlgorithmWorkedExample } from "@/lib/algorithmWorkedExamples";
import { sourceAuditsForChapter, type AlgorithmSourceAudit } from "@/lib/algorithmSourceAudit";
import { chapterDeepDives } from "@/lib/deepDives";
import { evidenceGuideItems } from "@/lib/evidenceGuide";
import { exerciseCoachCards } from "@/lib/exerciseCoach";
import { formulaAtlas } from "@/lib/formulaAtlas";
import { chapterMastery } from "@/lib/mastery";
import { chapters } from "@/lib/paper";

export const dynamicParams = false;

type Params = Promise<{ chapter: string }>;

export function generateStaticParams() {
  return chapters.map((chapter) => ({ chapter: String(chapter.n) }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { chapter } = await params;
  const item = getChapter(Number(chapter));
  if (!item) return { title: "Chapter not found" };
  return {
    title: `Chapter ${item.n}: ${item.title} | RLbook Explainer`,
    description: item.claim,
  };
}

export default async function ChapterPage({ params }: { params: Params }) {
  const { chapter } = await params;
  const n = Number(chapter);
  const item = getChapter(n);
  if (!item) notFound();

  const deep = chapterDeepDives[item.n];
  const mastery = chapterMastery.find((entry) => entry.n === item.n);
  const algorithms = algorithmsForChapter(item.n);
  const formulas = formulaAtlas.filter((formula) => formula.chapter === item.n);
  const sourceAudits = sourceAuditsForChapter(item.n);
  const evidence = evidenceGuideItems.filter((entry) => entry.chapter === item.n);
  const exercises = exerciseCoachCards.filter((entry) => entry.chapter === item.n);
  const prev = chapters.find((entry) => entry.n === item.n - 1);
  const next = chapters.find((entry) => entry.n === item.n + 1);

  return (
    <main className="min-h-screen bg-bg text-ink">
      <header className="border-b border-line bg-panel paper-grid">
        <div className="mx-auto max-w-[1280px] px-6 py-8 lg:px-10">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
            <Link href="/" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">← Home overview</Link>
            <div className="flex flex-wrap gap-2">
              {prev ? <Link className="mono rounded-full border border-line bg-white px-3 py-2 text-[11px] uppercase tracking-[0.12em] text-muted hover:border-cyan" href={`/chapters/${prev.n}`}>← Ch {prev.n}</Link> : null}
              {next ? <Link className="mono rounded-full border border-line bg-white px-3 py-2 text-[11px] uppercase tracking-[0.12em] text-muted hover:border-cyan" href={`/chapters/${next.n}`}>Ch {next.n} →</Link> : null}
            </div>
          </div>
          <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-end">
            <div>
              <p className="eyebrow">Chapter {item.n} / {item.part}</p>
              <h1 className="display mt-4 max-w-5xl text-[clamp(42px,7vw,88px)] font-medium text-ink">{item.title}</h1>
              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted">{item.claim}</p>
            </div>
            <div className="grid grid-cols-2 overflow-hidden rounded-xl border border-line bg-white">
              <Stat value={String(deep?.sectionDetails.length ?? item.sections.length)} label="section notes" />
              <Stat value={String(algorithms.length)} label="algorithms" />
              <Stat value={String(formulas.length)} label="formula cards" />
              <Stat value={String(sourceAudits.length)} label="source cues" />
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1280px] gap-12 px-6 py-12 lg:px-10">
        <section className="grid gap-5 lg:grid-cols-2">
          <Plain title="Easy chapter story"><p>{item.easy}</p></Plain>
          <div className="rounded-xl border border-line bg-panel p-5">
            <p className="eyebrow mb-3">Technical chapter story</p>
            <p className="text-sm leading-relaxed text-muted">{item.technical}</p>
          </div>
        </section>

        <ChapterIndex n={item.n} counts={{ algorithms: algorithms.length, sections: deep?.sectionDetails.length ?? 0, formulas: formulas.length, evidence: evidence.length, exercises: exercises.length, sourceAudits: sourceAudits.length }} />

        <section id="source-audit" className="scroll-mt-24">
          <SectionTitle eyebrow="01 - Book-source algorithm audit" title="Named algorithm boxes and source methods from the PDF, mapped to this page." lead="This crosswalk is the coverage check: every source entry names where it appears in the book and which detailed card(s) below explain it." />
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {sourceAudits.map((audit) => <SourceAuditCard key={audit.sourceTitle} audit={audit} algorithms={algorithms} />)}
          </div>
        </section>

        <section id="algorithms" className="scroll-mt-24">
          <SectionTitle eyebrow="02 - Algorithmic machinery" title="Every algorithmic idea attached to this chapter, explained as implementation steps." lead="Each card names the objective, the update target, operational steps, pseudocode, equations, implementation notes, and failure modes." />
          <div className="mt-6 grid gap-5">
            {algorithms.map((algorithm) => <AlgorithmCard key={algorithm.id} algorithm={algorithm} />)}
          </div>
        </section>

        {deep ? (
          <section id="sections" className="scroll-mt-24">
            <SectionTitle eyebrow="03 - Section-by-section deep dive" title="The chapter broken into its PDF section structure." lead={deep.focus} />
            <div className="mt-6 grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
              <div className="grid gap-4 self-start">
                <Panel title="Mechanics to trace" items={deep.mechanics} accent="cyan" />
                <Panel title="Remember this" items={deep.remember} accent="orange" />
              </div>
              <div className="grid gap-4">
                {deep.sectionDetails.map((section) => (
                  <article key={section.section} className="rounded-xl border border-line bg-panel p-5">
                    <h3 className="display text-2xl font-medium text-ink">{section.section}</h3>
                    <div className="mt-4 grid gap-3 md:grid-cols-2">
                      <MiniBlock label="Easy explanation" text={section.easy} />
                      <MiniBlock label="Technical detail" text={section.technical} tint />
                    </div>
                    <ul className="mt-4 grid gap-2 text-sm leading-relaxed text-muted">
                      {section.details.map((detail) => <li key={detail} className="flex gap-2"><span className="text-lime">•</span><span>{detail}</span></li>)}
                    </ul>
                    <TagRow tags={section.terms} />
                  </article>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {mastery ? (
          <section id="mastery" className="scroll-mt-24">
            <SectionTitle eyebrow="04 - Mastery notebook" title="Derivations, process walkthroughs, traps, and checks." lead={mastery.thesis} />
            <div className="mt-6 grid gap-5">
              <DetailGroup label="Derivation clinics" items={mastery.derivations} />
              <DetailGroup label="Process walkthroughs" items={mastery.process} />
              <div className="grid gap-4 lg:grid-cols-3">
                {mastery.traps.map((trap) => (
                  <article key={trap.mistake} className="rounded-xl border border-orange/30 bg-orange/[0.06] p-4">
                    <p className="mono mb-2 text-[10px] uppercase tracking-[0.14em] text-orange">Trap</p>
                    <h3 className="font-medium text-ink">{trap.mistake}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted"><span className="font-medium text-ink">Fix:</span> {trap.fix}</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted"><span className="font-medium text-ink">Why:</span> {trap.why}</p>
                  </article>
                ))}
              </div>
              <div className="grid gap-4 lg:grid-cols-3">
                {mastery.checks.map((check) => (
                  <article key={check.prompt} className="rounded-xl border border-line bg-panel-2 p-4">
                    <p className="mono mb-2 text-[10px] uppercase tracking-[0.14em] text-dim">Self-check</p>
                    <h3 className="font-medium text-ink">{check.prompt}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{check.answer}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <section id="formulas" className="scroll-mt-24">
          <SectionTitle eyebrow="05 - Formula atlas for this chapter" title="Formal templates and what each symbol is doing." lead="These are the chapter-relevant entries from the global formula atlas." />
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {formulas.map((formula) => (
              <article key={formula.label} className="rounded-xl border border-line bg-panel p-5">
                <div className="flex flex-wrap gap-2"><Chip accent="cyan">{formula.family}</Chip><Chip accent="blue">chapter {formula.chapter}</Chip></div>
                <h3 className="display mt-4 text-2xl font-medium text-ink">{formula.label}</h3>
                <TeX block>{formula.tex}</TeX>
                <div className="grid gap-3 md:grid-cols-2">
                  <MiniBlock label="Easy handle" text={formula.easy} />
                  <MiniBlock label="Technical handle" text={formula.technical} tint />
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted"><span className="font-medium text-ink">Use when:</span> {formula.useWhen}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted"><span className="font-medium text-orange">Watch out:</span> {formula.watchOut}</p>
                <TagRow tags={formula.symbols} />
              </article>
            ))}
          </div>
        </section>

        <section id="anchors" className="scroll-mt-24">
          <SectionTitle eyebrow="06 - Figures, examples, and practice" title="All book anchors for this chapter in one place." lead="Use this as the chapter study checklist after reading the original PDF." />
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <div>
              <p className="eyebrow mb-3">Figure / table / example companion</p>
              <div className="grid gap-3">
                {evidence.map((entry) => (
                  <article key={`${entry.kind}-${entry.ref}-${entry.title}`} className="rounded-lg border border-line bg-panel p-4">
                    <div className="flex flex-wrap gap-2"><Chip accent={entry.kind === "figure" ? "cyan" : entry.kind === "table" ? "orange" : "blue"}>{entry.kind}</Chip><Chip accent="lime">{entry.ref}</Chip></div>
                    <h3 className="display mt-3 text-xl font-medium text-ink">{entry.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted"><span className="font-medium text-ink">Easy read:</span> {entry.easy}</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted"><span className="font-medium text-ink">Technical role:</span> {entry.technical}</p>
                    <TagRow tags={entry.tags} />
                  </article>
                ))}
              </div>
            </div>
            <div>
              <p className="eyebrow mb-3">Exercise coach</p>
              <div className="grid gap-3">
                {exercises.map((exercise) => (
                  <article key={exercise.id} className="rounded-lg border border-line bg-panel p-4">
                    <div className="flex flex-wrap gap-2"><Chip accent="violet">Exercise {exercise.id}</Chip><Chip accent="blue">{exercise.kind}</Chip></div>
                    <h3 className="display mt-3 text-xl font-medium text-ink">{exercise.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted"><span className="font-medium text-ink">Easy goal:</span> {exercise.easyGoal}</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted"><span className="font-medium text-ink">Technical goal:</span> {exercise.technicalGoal}</p>
                    <ol className="mt-3 grid gap-1 text-sm leading-relaxed text-muted">
                      {exercise.strategy.map((step, index) => <li key={step}>{index + 1}. {step}</li>)}
                    </ol>
                    <p className="mt-3 rounded-md border border-orange/30 bg-orange/[0.06] p-3 text-sm leading-relaxed text-muted">{exercise.checkpoint}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function getChapter(n: number) {
  return chapters.find((chapter) => chapter.n === n);
}

function Stat({ value, label }: { value: string; label: string }) {
  return <div className="border-b border-r border-line p-4"><p className="display text-3xl text-ink">{value}</p><p className="mono mt-2 text-[10px] uppercase tracking-[0.16em] text-dim">{label}</p></div>;
}

function ChapterIndex({ n, counts }: { n: number; counts: { algorithms: number; sections: number; formulas: number; evidence: number; exercises: number; sourceAudits: number } }) {
  const items = [
    ["source-audit", `${counts.sourceAudits} source cues`],
    ["algorithms", `${counts.algorithms} algorithms`],
    ["sections", `${counts.sections} section notes`],
    ["mastery", "mastery notebook"],
    ["formulas", `${counts.formulas} formulas`],
    ["anchors", `${counts.evidence} anchors + ${counts.exercises} exercises`],
  ];
  return (
    <nav className="rounded-xl border border-line bg-panel p-4">
      <p className="eyebrow mb-3">Chapter {n} page index</p>
      <div className="flex flex-wrap gap-2">
        {items.map(([id, label]) => <a key={id} href={`#${id}`} className="mono rounded-full border border-line bg-panel-2 px-3 py-2 text-[11px] uppercase tracking-[0.12em] text-muted hover:border-cyan hover:text-ink">{label}</a>)}
      </div>
    </nav>
  );
}

function SectionTitle({ eyebrow, title, lead }: { eyebrow: string; title: string; lead: string }) {
  return <div><p className="eyebrow">{eyebrow}</p><h2 className="display mt-3 text-[clamp(30px,4vw,48px)] font-medium text-ink">{title}</h2><p className="mt-4 max-w-4xl text-base leading-relaxed text-muted">{lead}</p></div>;
}


function SourceAuditCard({ audit, algorithms }: { audit: AlgorithmSourceAudit; algorithms: AlgorithmDetail[] }) {
  const covered = audit.catalogIds
    .map((id) => algorithms.find((algorithm) => algorithm.id === id))
    .filter((algorithm): algorithm is AlgorithmDetail => Boolean(algorithm));

  return (
    <article className="rounded-xl border border-line bg-panel p-5">
      <div className="flex flex-wrap gap-2"><Chip accent="cyan">{audit.bookAnchor}</Chip><Chip accent="violet">{audit.sourceCue}</Chip></div>
      <h3 className="display mt-4 text-2xl font-medium text-ink">{audit.sourceTitle}</h3>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <MiniBlock label="Easy coverage" text={audit.easy} />
        <MiniBlock label="Technical coverage" text={audit.technical} tint />
      </div>
      <div className="mt-4 rounded-lg border border-line bg-panel-2 p-3">
        <p className="mono mb-2 text-[10px] uppercase tracking-[0.14em] text-dim">Detailed card coverage</p>
        <div className="flex flex-wrap gap-1.5">
          {covered.map((algorithm) => <a key={algorithm.id} href={`#${algorithm.id}`} className="mono rounded-full border border-line bg-white px-2 py-1 text-[10px] text-dim hover:border-cyan hover:text-ink">{algorithm.name}</a>)}
        </div>
      </div>
    </article>
  );
}

function AlgorithmCard({ algorithm }: { algorithm: AlgorithmDetail }) {
  const dossier = algorithmDossier(algorithm);
  const worked = workedExampleForAlgorithm(algorithm);

  return (
    <article id={algorithm.id} className="scroll-mt-24 overflow-hidden rounded-xl border border-line bg-panel">
      <div className="grid gap-px bg-line lg:grid-cols-[0.85fr_1.15fr]">
        <div className="bg-panel p-5 lg:p-6">
          <div className="flex flex-wrap gap-2"><Chip accent="cyan">{algorithm.family}</Chip><Chip accent="blue">{algorithm.bookAnchor}</Chip></div>
          <h3 className="display mt-4 text-[clamp(26px,3vw,38px)] font-medium text-ink">{algorithm.name}</h3>
          <div className="mt-5 grid gap-3">
            <MiniBlock label="Plain explanation" text={algorithm.plain} />
            <MiniBlock label="Technical explanation" text={algorithm.technical} tint />
            <MiniBlock label="Objective" text={algorithm.objective} />
            <MiniBlock label="Core update / target" text={algorithm.coreUpdate} tint />
          </div>
        </div>
        <div className="bg-panel p-5 lg:p-6">
          <div className="grid gap-5 lg:grid-cols-2">
            <Panel title="Operational steps" items={algorithm.steps} accent="cyan" ordered />
            <Panel title="Pseudocode" items={algorithm.pseudocode} accent="violet" mono ordered />
          </div>
          {algorithm.equations.length ? <div className="mt-5 grid gap-3">{algorithm.equations.map((equation) => <TeX key={equation} block>{equation}</TeX>)}</div> : null}
          <WorkedExampleBlock example={worked} />
          <div className="mt-5 grid gap-5 lg:grid-cols-2">
            <Panel title="Implementation notes" items={algorithm.implementationNotes} accent="lime" />
            <Panel title="Failure modes" items={algorithm.failureModes} accent="orange" />
          </div>
          <div className="mt-5 rounded-xl border border-line bg-panel-2 p-4">
            <p className="mono text-[10px] uppercase tracking-[0.14em] text-dim">Detailed algorithm dossier</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">This expands the card into the implementation-level questions to answer before coding or deriving the method.</p>
            <div className="mt-4 grid gap-3">
              {dossier.map((section) => <DossierBlock key={section.label} section={section} />)}
            </div>
          </div>
          <TagRow tags={algorithm.related} />
        </div>
      </div>
    </article>
  );
}


function DossierBlock({ section }: { section: AlgorithmDossierSection }) {
  return (
    <article className="rounded-lg border border-line bg-white p-4">
      <div className="flex flex-wrap gap-2"><Chip accent={section.accent}>{section.label}</Chip></div>
      <div className="mt-3 grid gap-3 md:grid-cols-2">
        <MiniBlock label="Easy" text={section.easy} />
        <MiniBlock label="Technical" text={section.technical} tint />
      </div>
      <ul className="mt-3 grid gap-2 text-sm leading-relaxed text-muted">
        {section.checkpoints.map((checkpoint, index) => <li key={`${section.label}-${index}`} className="flex gap-2"><span className="text-cyan">•</span><span>{checkpoint}</span></li>)}
      </ul>
    </article>
  );
}


function WorkedExampleBlock({ example }: { example: AlgorithmWorkedExample }) {
  return (
    <div className="mt-5 rounded-xl border border-blue/25 bg-blue/[0.045] p-4">
      <div className="flex flex-wrap gap-2"><Chip accent="blue">{example.title}</Chip></div>
      <p className="mt-3 text-sm leading-relaxed text-muted"><span className="font-medium text-ink">Setup:</span> {example.setup}</p>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <MiniBlock label="Easy walkthrough" text={example.easyWalkthrough} />
        <MiniBlock label="Technical walkthrough" text={example.technicalWalkthrough} tint />
      </div>
      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Panel title="Calculation / symbolic trace" items={example.calculation} accent="blue" ordered />
        <Panel title="Implementation checks" items={example.implementationChecks} accent="lime" />
      </div>
      <p className="mt-4 rounded-lg border border-orange/30 bg-orange/[0.06] p-3 text-sm leading-relaxed text-muted"><span className="font-medium text-orange">Debug probe:</span> {example.debuggingProbe}</p>
    </div>
  );
}

function MiniBlock({ label, text, tint = false }: { label: string; text: string; tint?: boolean }) {
  return <div className={`rounded-lg border border-line ${tint ? "bg-panel-2" : "bg-white"} p-3`}><p className="mono mb-2 text-[10px] uppercase tracking-[0.14em] text-dim">{label}</p><p className="text-sm leading-relaxed text-muted">{text}</p></div>;
}

function Panel({ title, items, accent = "cyan", ordered = false, mono = false }: { title: string; items: string[]; accent?: "cyan" | "orange" | "blue" | "violet" | "lime"; ordered?: boolean; mono?: boolean }) {
  const List = ordered ? "ol" : "ul";
  const color = {
    cyan: "text-cyan",
    orange: "text-orange",
    blue: "text-blue",
    violet: "text-violet",
    lime: "text-lime",
  }[accent];
  return <div className="rounded-lg border border-line bg-white p-4"><p className="mono mb-3 text-[10px] uppercase tracking-[0.14em] text-dim">{title}</p><List className={`grid gap-2 text-sm leading-relaxed text-muted ${mono ? "mono text-xs" : ""}`}>{items.map((item, index) => <li key={`${item}-${index}`} className="flex gap-2"><span className={color}>{ordered ? `${index + 1}.` : "•"}</span><span>{item}</span></li>)}</List></div>;
}

function DetailGroup({ label, items }: { label: string; items: { label: string; source: string; easy: string; technical: string; steps: string[] }[] }) {
  return <div><p className="eyebrow mb-3">{label}</p><div className="grid gap-4 lg:grid-cols-2">{items.map((item) => <article key={item.label} className="rounded-xl border border-line bg-panel p-5"><div className="flex flex-wrap gap-2"><Chip accent="cyan">{item.source}</Chip></div><h3 className="display mt-3 text-2xl font-medium text-ink">{item.label}</h3><div className="mt-4 grid gap-3 md:grid-cols-2"><MiniBlock label="Easy" text={item.easy} /><MiniBlock label="Technical" text={item.technical} tint /></div><ol className="mt-4 grid gap-2 text-sm leading-relaxed text-muted">{item.steps.map((step, index) => <li key={step}>{index + 1}. {step}</li>)}</ol></article>)}</div></div>;
}

function TagRow({ tags }: { tags: string[] }) {
  if (!tags.length) return null;
  return <div className="mt-4 flex flex-wrap gap-1.5">{tags.map((tag) => <span key={tag} className="mono rounded-full border border-line bg-panel-2 px-2 py-1 text-[10px] text-dim">{tag}</span>)}</div>;
}

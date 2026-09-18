import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TeX } from "@/components/Math";
import { AnimatedConceptGraphic } from "@/components/AnimatedConceptGraphic";
import { AssumptionClinic } from "@/components/AssumptionClinic";
import { BookSearch } from "@/components/BookSearch";
import { ChapterExamStudio } from "@/components/ChapterExamStudio";
import { ChapterPracticeCoach } from "@/components/ChapterPracticeCoach";
import { CodeLab } from "@/components/CodeLab";
import { ChapterLectureTheater } from "@/components/ChapterLectureTheater";
import { ChapterSimulatorLab } from "@/components/ChapterSimulatorLab";
import { ConceptLectureDeck } from "@/components/ConceptLectureDeck";
import { FormulaLectureReader } from "@/components/FormulaLectureReader";
import { InteractiveBlackboard } from "@/components/InteractiveBlackboard";
import { LearningGraphExplorer } from "@/components/LearningGraphExplorer";
import { SectionLessonReader } from "@/components/SectionLessonReader";
import { SymbolDecoder } from "@/components/SymbolDecoder";
import { ZeroKnowledgeLadderReader } from "@/components/ZeroKnowledgeLadderReader";
import { MotionGlyph } from "@/components/MotionGlyph";
import { ProofLab } from "@/components/ProofLab";
import { WorkedExampleStudio } from "@/components/WorkedExampleStudio";
import { MisconceptionClinic } from "@/components/MisconceptionClinic";
import { Chip, Plain } from "@/components/Section";
import { algorithmsForChapter, type AlgorithmDetail } from "@/lib/algorithmCatalog";
import { algorithmDerivation, type AlgorithmDerivation } from "@/lib/algorithmDerivations";
import { chapterDependencyMap, type ChapterDependencyMap } from "@/lib/chapterDependencyMap";
import { chapterSynthesis, type ChapterSynthesis } from "@/lib/chapterSynthesis";
import { algorithmDossier, type AlgorithmDossierSection } from "@/lib/algorithmDossier";
import { algorithmProfile, profileRows, type AlgorithmProfile } from "@/lib/algorithmProfiles";
import { workedExampleForAlgorithm, type AlgorithmWorkedExample } from "@/lib/algorithmWorkedExamples";
import { sourceAuditsForChapter, type AlgorithmSourceAudit } from "@/lib/algorithmSourceAudit";
import { chapterDeepDives } from "@/lib/deepDives";
import { evidenceGuideItems } from "@/lib/evidenceGuide";
import { exerciseCoachCards } from "@/lib/exerciseCoach";
import { practiceCardsForChapter, practiceModeCount, type ChapterPracticeCard } from "@/lib/chapterPractice";
import { conceptCardsForChapter, conceptModeCount, type ChapterConceptCard } from "@/lib/conceptAtlas";
import { workedExamplesForChapter, workedExampleModeCount, type ChapterWorkedExample } from "@/lib/chapterWorkedExamples";
import { misconceptionCardsForChapter, misconceptionModeCount, type ChapterMisconceptionCard } from "@/lib/chapterMisconceptions";
import { lectureTheaterForChapter, lectureTheaterModeCount, lectureTheaterSlideCount, type ChapterLectureTheater as ChapterLectureTheaterData } from "@/lib/chapterLectureTheater";
import { simulatorControlCount, simulatorForChapter, simulatorReadoutCount, type ChapterSimulator } from "@/lib/chapterSimulators";
import { formulaLectureModeCount, formulasForChapter } from "@/lib/formulaAtlas";
import { bookIndexEntriesForChapter, bookIndexEntryCount } from "@/lib/bookIndex";
import { codeLabCardsForChapter, codeLabModeCount, type CodeLabCard } from "@/lib/codeLab";
import { chapterExamCardsForChapter, chapterExamModeCount, type ChapterExamCard } from "@/lib/chapterExam";
import { assumptionCardsForChapter, assumptionModeCount, type AssumptionClinicCard } from "@/lib/assumptionClinic";
import { blackboardForChapter } from "@/lib/interactiveBlackboards";
import { learningGraphEdgeCount, learningGraphForChapter, learningGraphNodeCount } from "@/lib/learningGraph";
import { chapterMastery } from "@/lib/mastery";
import { chapters } from "@/lib/paper";
import { proofCardsForChapter, proofModeCount, type ProofLabCard } from "@/lib/proofLab";
import { manuscriptForChapter, type ChapterManuscript } from "@/lib/chapterManuscripts";
import { sectionLessonsForChapter, type SectionTextbookLesson } from "@/lib/sectionNarratives";
import { standaloneLectureForChapter, type StandaloneChapterLecture } from "@/lib/standaloneBook";
import { symbolCardsForChapter, symbolLectureModeCount, type SymbolCard } from "@/lib/symbolAtlas";
import { zeroKnowledgeLadderForChapter, zeroKnowledgeModeCount, type ZeroKnowledgeLadder } from "@/lib/zeroKnowledgeLadders";

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
  const synthesis = chapterSynthesis(item, algorithms);
  const dependencyMap = chapterDependencyMap(item, chapters, algorithms);
  const formulas = formulasForChapter(item.n);
  const formulaModes = formulaLectureModeCount(item.n);
  const sourceAudits = sourceAuditsForChapter(item.n);
  const evidence = evidenceGuideItems.filter((entry) => entry.chapter === item.n);
  const exercises = exerciseCoachCards.filter((entry) => entry.chapter === item.n);
  const lecture = standaloneLectureForChapter(item);
  const starter = zeroKnowledgeLadderForChapter(item.n);
  const starterModes = zeroKnowledgeModeCount(item.n);
  const theater = lectureTheaterForChapter(item.n);
  const theaterSlides = lectureTheaterSlideCount(item.n);
  const theaterModes = lectureTheaterModeCount(item.n);
  const practiceCards = practiceCardsForChapter(item.n);
  const practiceModes = practiceModeCount(item.n);
  const conceptCards = conceptCardsForChapter(item.n);
  const conceptModes = conceptModeCount(item.n);
  const workedExamples = workedExamplesForChapter(item.n);
  const workedExampleModes = workedExampleModeCount(item.n);
  const misconceptionCards = misconceptionCardsForChapter(item.n);
  const misconceptionModes = misconceptionModeCount(item.n);
  const simulator = simulatorForChapter(item.n);
  const simulatorControls = simulatorControlCount(item.n);
  const simulatorReadouts = simulatorReadoutCount(item.n);
  const manuscript = manuscriptForChapter(item.n);
  const blackboard = blackboardForChapter(item.n);
  const sectionLessons = sectionLessonsForChapter(item.n);
  const searchEntries = bookIndexEntriesForChapter(item.n);
  const searchEntryTotal = bookIndexEntryCount(item.n);
  const learningGraph = learningGraphForChapter(item.n);
  const graphNodes = learningGraphNodeCount(item.n);
  const graphEdges = learningGraphEdgeCount(item.n);
  const symbolCards = symbolCardsForChapter(item.n);
  const symbolModes = symbolLectureModeCount(item.n);
  const codeCards = codeLabCardsForChapter(item.n);
  const codeModes = codeLabModeCount(item.n);
  const assumptionCards = assumptionCardsForChapter(item.n);
  const assumptionModes = assumptionModeCount(item.n);
  const proofCards = proofCardsForChapter(item.n);
  const proofModes = proofModeCount(item.n);
  const examCards = chapterExamCardsForChapter(item.n);
  const examModes = chapterExamModeCount(item.n);
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
          <div className="grid gap-8 lg:grid-cols-[1fr_420px] lg:items-end">
            <div>
              <p className="eyebrow">Chapter {item.n} / {item.part}</p>
              <h1 className="display mt-4 max-w-5xl text-[clamp(42px,7vw,88px)] font-medium text-ink">{item.title}</h1>
              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted">{item.claim}</p>
            </div>
            <div className="grid gap-4">
              <AnimatedConceptGraphic label={`Chapter ${item.n} motion map`} variant="chapter" caption={item.easy} compact />
              <div className="grid grid-cols-2 overflow-hidden rounded-xl border border-line bg-white">
                <Stat value={String(starter.rungs.length)} label="starter rungs" />
                <Stat value={String(theaterSlides)} label="theater slides" />
                <Stat value={String(theaterModes)} label="theater modes" />
                <Stat value={String(deep?.sectionDetails.length ?? item.sections.length)} label="section notes" />
                <Stat value={String(algorithms.length)} label="algorithms" />
                <Stat value={String(formulas.length)} label="formula cards" />
                <Stat value={String(formulaModes)} label="formula modes" />
                <Stat value={String(conceptCards.length)} label="concept cards" />
                <Stat value={String(conceptModes)} label="concept modes" />
                <Stat value={String(workedExamples.length)} label="worked examples" />
                <Stat value={String(workedExampleModes)} label="worked modes" />
                <Stat value={String(misconceptionCards.length)} label="clinic cards" />
                <Stat value={String(misconceptionModes)} label="clinic modes" />
                <Stat value={String(simulatorControls)} label="sim controls" />
                <Stat value={String(simulatorReadouts)} label="sim readouts" />
                <Stat value={String(sourceAudits.length)} label="source cues" />
                <Stat value={String(searchEntryTotal)} label="search entries" />
                <Stat value={String(graphNodes)} label="graph nodes" />
                <Stat value={String(graphEdges)} label="graph links" />
                <Stat value={String(symbolCards.length)} label="symbol cards" />
                <Stat value={String(symbolModes)} label="symbol modes" />
                <Stat value={String(codeCards.length)} label="code labs" />
                <Stat value={String(codeModes)} label="code modes" />
                <Stat value={String(assumptionCards.length)} label="trust clinics" />
                <Stat value={String(assumptionModes)} label="trust modes" />
                <Stat value={String(proofCards.length)} label="proof cards" />
                <Stat value={String(proofModes)} label="proof modes" />
                <Stat value={String(examCards.length)} label="exam cards" />
                <Stat value={String(examModes)} label="exam modes" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1280px] gap-12 px-6 py-12 lg:px-10">
        <section className="grid gap-5 lg:grid-cols-[1fr_1fr_360px]">
          <Plain title="Easy chapter story"><p>{item.easy}</p></Plain>
          <div className="rounded-xl border border-line bg-panel p-5">
            <p className="eyebrow mb-3">Technical chapter story</p>
            <p className="text-sm leading-relaxed text-muted">{item.technical}</p>
          </div>
          <AnimatedConceptGraphic label="Story loop" variant="loop" caption="The easy story and the technical story update each other: intuition points at notation, notation checks intuition." compact />
        </section>

        <ChapterIndex n={item.n} counts={{ algorithms: algorithms.length, starterRungs: starter.rungs.length, starterModes, theaterSlides, theaterModes, practiceCards: practiceCards.length, practiceModes, conceptCards: conceptCards.length, conceptModes, workedExamples: workedExamples.length, workedExampleModes, misconceptionCards: misconceptionCards.length, misconceptionModes, manuscriptSections: manuscript.sections.length, blackboardStages: blackboard.stages.length, sectionLessons: sectionLessons.length, lectureBeats: lecture.beats.length, sections: deep?.sectionDetails.length ?? 0, formulas: formulas.length, formulaModes, evidence: evidence.length, exercises: exercises.length, simulatorControls, simulatorReadouts, sourceAudits: sourceAudits.length, searchEntries: searchEntryTotal, graphNodes, graphEdges, symbolCards: symbolCards.length, symbolModes, codeCards: codeCards.length, codeModes, assumptionCards: assumptionCards.length, assumptionModes, proofCards: proofCards.length, proofModes, examCards: examCards.length, examModes }} />

        <section id="search" className="scroll-mt-24">
          <SectionTitle eyebrow="00a - Chapter search index" title="Search this chapter's explanations without leaving the page." lead="Use this chapter-local index when you remember a term, formula, trap, method, or example but do not know which layer contains it. It searches the original standalone prose and technical explanations for this chapter." />
          <div className="mt-6">
            <BookSearch entries={searchEntries} contextTitle={`Chapter ${item.n} searchable explanation index`} compact defaultChapter={item.n} />
          </div>
        </section>

        <section id="learning-graph" className="scroll-mt-24">
          <SectionTitle eyebrow="00b - Interactive learning graph" title="Map the chapter before memorizing the details." lead="Click nodes to see how prerequisites feed the chapter, how concepts become formulas, how formulas become methods, and how examples, practice, and simulator knobs prove understanding." />
          <div className="mt-6">
            <LearningGraphExplorer graphs={[learningGraph]} contextTitle={`Chapter ${item.n} graphical learning map`} compact defaultChapter={item.n} />
          </div>
        </section>

        <ChapterSymbolDecoderBlock chapter={item} cards={symbolCards} symbolModes={symbolModes} />

        <ChapterCodeLabBlock chapter={item} cards={codeCards} codeModes={codeModes} />

        <ChapterAssumptionClinicBlock chapter={item} cards={assumptionCards} assumptionModes={assumptionModes} />

        <ChapterProofLabBlock chapter={item} cards={proofCards} proofModes={proofModes} />

        <ChapterExamBlock chapter={item} cards={examCards} examModes={examModes} />

        <ChapterStarterLadderBlock chapter={item} starter={starter} starterModes={starterModes} />

        <ChapterLectureTheaterBlock chapter={item} theater={theater} theaterSlides={theaterSlides} theaterModes={theaterModes} />

        <ChapterPracticeBlock chapter={item} cards={practiceCards} practiceModes={practiceModes} />

        <ChapterConceptBlock chapter={item} cards={conceptCards} conceptModes={conceptModes} />

        <ChapterWorkedExampleBlock chapter={item} examples={workedExamples} workedExampleModes={workedExampleModes} />

        <ChapterMisconceptionBlock chapter={item} cards={misconceptionCards} misconceptionModes={misconceptionModes} />

        <ChapterSimulatorBlock chapter={item} simulator={simulator} simulatorControls={simulatorControls} simulatorReadouts={simulatorReadouts} />

        <ChapterManuscriptBlock manuscript={manuscript} />

        <section id="blackboard" className="scroll-mt-24">
          <SectionTitle eyebrow="00b - Interactive blackboard" title="Click through the chapter's core visual model." lead="This is the graphical lecture board for the chapter: change stages, watch the diagram shift, then compare the beginner explanation with the technical version." />
          <div className="mt-6">
            <InteractiveBlackboard board={blackboard} />
          </div>
        </section>

        <section id="section-reader" className="scroll-mt-24">
          <SectionTitle eyebrow="00c - Interactive section lecturer" title="Control the lecture mode for every section." lead="Choose a section, then switch between beginner, technical, board, formula, algorithm, and self-check views. This turns the section manuscript into a graphical lecture console." />
          <div className="mt-6">
            <SectionLessonReader lessons={sectionLessons} chapterTitle={`Chapter ${item.n}: ${item.title}`} />
          </div>
        </section>

        <SectionTextbookBlock lessons={sectionLessons} />

        <StandaloneLectureBlock lecture={lecture} />

        <ChapterSynthesisBlock synthesis={synthesis} />

        <ChapterDependencyMapBlock map={dependencyMap} />

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
          <SectionTitle eyebrow="05 - Formula atlas for this chapter" title="Formal templates and what each symbol is doing." lead="These are the chapter-relevant entries from the global formula atlas, plus an interactive lecturer that moves each formula through story, symbols, trace, use, and pitfall modes." />
          <div className="mt-6">
            <FormulaLectureReader formulas={formulas} contextTitle={`Chapter ${item.n}: ${item.title}`} />
          </div>
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
          <SectionTitle eyebrow="06 - Figures, examples, and practice" title="All book anchors for this chapter in one place." lead="Use this as the built-in chapter study checklist. Source figures remain the reference artwork; these cards teach what each anchor means in original words." />
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <div>
              <p className="eyebrow mb-3">Figure / table / example lecture atlas</p>
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
  return (
    <div className="border-b border-r border-line p-4">
      <div className="flex items-start justify-between gap-2">
        <div><p className="display text-3xl text-ink">{value}</p><p className="mono mt-2 text-[10px] uppercase tracking-[0.16em] text-dim">{label}</p></div>
        <MotionGlyph label={label} variant={glyphVariantForLabel(label)} accent={glyphAccentForLabel(label)} className="-mr-2 -mt-2 motion-glyph-small" />
      </div>
    </div>
  );
}

function ChapterIndex({ n, counts }: { n: number; counts: { algorithms: number; starterRungs: number; starterModes: number; theaterSlides: number; theaterModes: number; practiceCards: number; practiceModes: number; conceptCards: number; conceptModes: number; workedExamples: number; workedExampleModes: number; misconceptionCards: number; misconceptionModes: number; simulatorControls: number; simulatorReadouts: number; manuscriptSections: number; blackboardStages: number; sectionLessons: number; lectureBeats: number; sections: number; formulas: number; formulaModes: number; evidence: number; exercises: number; sourceAudits: number; searchEntries: number; graphNodes: number; graphEdges: number; symbolCards: number; symbolModes: number; codeCards: number; codeModes: number; assumptionCards: number; assumptionModes: number; proofCards: number; proofModes: number; examCards: number; examModes: number } }) {
  const items = [
    ["search", `${counts.searchEntries} search entries`],
    ["learning-graph", `${counts.graphNodes} graph nodes · ${counts.graphEdges} links`],
    ["symbols", `${counts.symbolCards} symbols · ${counts.symbolModes} modes`],
    ["code-lab", `${counts.codeCards} code labs · ${counts.codeModes} modes`],
    ["assumptions", `${counts.assumptionCards} trust clinics · ${counts.assumptionModes} modes`],
    ["proofs", `${counts.proofCards} proofs · ${counts.proofModes} modes`],
    ["exam", `${counts.examCards} exams · ${counts.examModes} modes`],
    ["starter", `${counts.starterRungs} starter rungs · ${counts.starterModes} modes`],
    ["theater", `${counts.theaterSlides} lecture slides · ${counts.theaterModes} modes`],
    ["practice", `${counts.practiceCards} practice checks · ${counts.practiceModes} modes`],
    ["concepts", `${counts.conceptCards} concepts · ${counts.conceptModes} modes`],
    ["worked", `${counts.workedExamples} worked examples · ${counts.workedExampleModes} modes`],
    ["clinic", `${counts.misconceptionCards} misconception cards · ${counts.misconceptionModes} modes`],
    ["simulators", `${counts.simulatorControls} simulator controls · ${counts.simulatorReadouts} readouts`],
    ["manuscript", `${counts.manuscriptSections} manuscript moves`],
    ["blackboard", `${counts.blackboardStages} blackboard stages`],
    ["section-reader", `${counts.sectionLessons * 6} guided modes`],
    ["section-manuscript", `${counts.sectionLessons} section manuscripts`],
    ["lecture", `${counts.lectureBeats} lecture beats`],
    ["synthesis", "synthesis ladder"],
    ["dependencies", "dependency map"],
    ["source-audit", `${counts.sourceAudits} source cues`],
    ["algorithms", `${counts.algorithms} algorithms`],
    ["sections", `${counts.sections} section notes`],
    ["mastery", "mastery notebook"],
    ["formulas", `${counts.formulas} formulas · ${counts.formulaModes} modes`],
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

function ChapterSymbolDecoderBlock({ chapter, cards, symbolModes }: { chapter: (typeof chapters)[number]; cards: SymbolCard[]; symbolModes: number }) {
  return (
    <section id="symbols" className="scroll-mt-24">
      <SectionTitle
        eyebrow="00c - Contextual symbol decoder"
        title="Learn the chapter's notation before the equations get dense."
        lead="Every symbol card says the mark out loud, gives the plain meaning, names its technical role, shows the formula context, calls out the likely mistake, and ends with a self-check."
      />
      <div className="mt-6 grid gap-4">
        <div className="rounded-xl border border-violet/30 bg-violet/[0.06] p-4">
          <p className="text-sm leading-relaxed text-muted"><span className="font-medium text-ink">Chapter {chapter.n} notation promise:</span> {cards.length} contextual symbols become {symbolModes} explanation modes so notation is taught as part of the lecture rather than assumed.</p>
        </div>
        <SymbolDecoder cards={cards} contextTitle={`Chapter ${chapter.n}: ${chapter.title}`} compact />
      </div>
    </section>
  );
}


function ChapterCodeLabBlock({ chapter, cards, codeModes }: { chapter: (typeof chapters)[number]; cards: CodeLabCard[]; codeModes: number }) {
  return (
    <section id="code-lab" className="scroll-mt-24">
      <SectionTitle
        eyebrow="00d - Implementation code lab"
        title="Translate the chapter's algorithms into testable code structure."
        lead="Every implementation card names the stored state, target calculation, update line, invariant, hand-test, and debug checklist so algorithm names become executable thinking rather than labels."
      />
      <div className="mt-6 grid gap-4">
        <div className="rounded-xl border border-orange/30 bg-orange/[0.06] p-4">
          <p className="text-sm leading-relaxed text-muted"><span className="font-medium text-ink">Chapter {chapter.n} implementation promise:</span> {cards.length} code labs become {codeModes} plain, code, invariant, tiny-test, and debug modes tied back to the chapter algorithm cards.</p>
        </div>
        <CodeLab cards={cards} contextTitle={`Chapter ${chapter.n}: ${chapter.title}`} compact />
      </div>
    </section>
  );
}


function ChapterAssumptionClinicBlock({ chapter, cards, assumptionModes }: { chapter: (typeof chapters)[number]; cards: AssumptionClinicCard[]; assumptionModes: number }) {
  return (
    <section id="assumptions" className="scroll-mt-24">
      <SectionTitle
        eyebrow="00e - Assumption and guarantee clinic"
        title="Ask when each method's promise is valid."
        lead="This layer makes the advanced contract explicit: data coverage, target legitimacy, update stability, representation limits, guarantee, failure mode, and repair plan."
      />
      <div className="mt-6 grid gap-4">
        <div className="rounded-xl border border-lime/30 bg-lime/[0.06] p-4">
          <p className="text-sm leading-relaxed text-muted"><span className="font-medium text-ink">Chapter {chapter.n} trust promise:</span> {cards.length} assumption clinics become {assumptionModes} plain, assumption, guarantee, failure, and repair modes tied back to chapter algorithms.</p>
        </div>
        <AssumptionClinic cards={cards} contextTitle={`Chapter ${chapter.n}: ${chapter.title}`} compact />
      </div>
    </section>
  );
}

function ChapterProofLabBlock({ chapter, cards, proofModes }: { chapter: (typeof chapters)[number]; cards: ProofLabCard[]; proofModes: number }) {
  return (
    <section id="proofs" className="scroll-mt-24">
      <SectionTitle
        eyebrow="00f - Proof intuition lab"
        title="Ask why the chapter's equations and claims are true."
        lead="This layer turns advanced formal material into proof thinking: claim, ingredients, proof sketch, equation bridge, stress test, and repair move."
      />
      <div className="mt-6 grid gap-4">
        <div className="rounded-xl border border-violet/30 bg-violet/[0.06] p-4">
          <p className="text-sm leading-relaxed text-muted"><span className="font-medium text-ink">Chapter {chapter.n} proof promise:</span> {cards.length} proof cards become {proofModes} plain, claim, proof-sketch, equation-bridge, and stress-test modes tied back to chapter formulas and claims.</p>
        </div>
        <ProofLab cards={cards} contextTitle={`Chapter ${chapter.n}: ${chapter.title}`} compact />
      </div>
    </section>
  );
}

function ChapterExamBlock({ chapter, cards, examModes }: { chapter: (typeof chapters)[number]; cards: ChapterExamCard[]; examModes: number }) {
  return (
    <section id="exam" className="scroll-mt-24">
      <SectionTitle
        eyebrow="00g - Chapter exam studio"
        title="Prove you can explain, draw, compute, trust-check, and transfer the chapter."
        lead="This layer closes the standalone chapter loop: try an oral exam prompt, inspect a plan, reveal a strong solution, grade with a rubric, and transfer the idea to a new task."
      />
      <div className="mt-6 grid gap-4">
        <div className="rounded-xl border border-cyan/30 bg-cyan/[0.06] p-4">
          <p className="text-sm leading-relaxed text-muted"><span className="font-medium text-ink">Chapter {chapter.n} exam promise:</span> {cards.length} exam cards become {examModes} prompt, plan, solution, rubric, and transfer modes tied back to concepts, formulas, code, assumptions, proofs, examples, and simulator knobs.</p>
        </div>
        <ChapterExamStudio cards={cards} contextTitle={`Chapter ${chapter.n}: ${chapter.title}`} compact />
      </div>
    </section>
  );
}

function SectionTitle({ eyebrow, title, lead }: { eyebrow: string; title: string; lead: string }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
      <div><p className="eyebrow">{eyebrow}</p><h2 className="display mt-3 text-[clamp(30px,4vw,48px)] font-medium text-ink">{title}</h2><p className="mt-4 max-w-4xl text-base leading-relaxed text-muted">{lead}</p></div>
      <AnimatedConceptGraphic label={eyebrow} variant={visualVariantForTitle(eyebrow)} caption={lead} compact />
    </div>
  );
}

function visualVariantForTitle(text: string) {
  if (/algorithm|source|coverage|code|implementation|assumption|guarantee|exam/i.test(text)) return "algorithm";
  if (/formula|equation|symbol|proof/i.test(text)) return "formula";
  if (/dependency|synthesis/i.test(text)) return "tree";
  if (/mastery|section/i.test(text)) return "gradient";
  return "loop";
}

function glyphVariantForLabel(label: string): "loop" | "bars" | "tree" | "target" | "formula" | "check" {
  if (/formula|equation|technical|core|proof|target|update/i.test(label)) return "formula";
  if (/exam|rubric|transfer/i.test(label)) return "check";
  if (/step|process|protocol|trace|pseudo|calculation|code|scaffold/i.test(label)) return "bars";
  if (/dependency|gate|source|coverage|chapter|related/i.test(label)) return "tree";
  if (/check|warning|trap|debug|failure|risk|status|trust|guarantee|assumption|exam|rubric|transfer/i.test(label)) return "check";
  if (/objective|goal|profile|metric|axis/i.test(label)) return "target";
  return "loop";
}

function glyphAccentForLabel(label: string): "cyan" | "orange" | "blue" | "violet" | "lime" {
  if (/warning|trap|debug|failure|risk|watch/i.test(label)) return "orange";
  if (/formula|equation|technical|profile|axis/i.test(label)) return "violet";
  if (/check|complete|implementation|test|exam|rubric|transfer/i.test(label)) return "lime";
  if (/source|chapter|dependency|coverage/i.test(label)) return "blue";
  return "cyan";
}

function ChapterStarterLadderBlock({ chapter, starter, starterModes }: { chapter: (typeof chapters)[number]; starter: ZeroKnowledgeLadder; starterModes: number }) {
  return (
    <section id="starter" className="scroll-mt-24">
      <SectionTitle
        eyebrow="00z - Zero-knowledge starter ladder"
        title="Begin here if you know nothing about this chapter yet."
        lead="This ladder is deliberately before the manuscript, formulas, and algorithms: it gives everyday intuition, a board picture, precise language, and a practice prompt for the chapter's prerequisite ideas."
      />
      <div className="mt-6 grid gap-4">
        <div className="rounded-xl border border-lime/30 bg-lime/[0.06] p-4">
          <p className="text-sm leading-relaxed text-muted"><span className="font-medium text-ink">Chapter {chapter.n} starter promise:</span> {starter.promise} The {starter.rungs.length} rungs below expose {starterModes} learning modes before the dense chapter layers begin.</p>
        </div>
        <ZeroKnowledgeLadderReader ladders={[starter]} contextTitle={`Chapter ${chapter.n}: ${chapter.title}`} />
      </div>
    </section>
  );
}

function ChapterLectureTheaterBlock({ chapter, theater, theaterSlides, theaterModes }: { chapter: (typeof chapters)[number]; theater: ChapterLectureTheaterData; theaterSlides: number; theaterModes: number }) {
  return (
    <section id="theater" className="scroll-mt-24">
      <SectionTitle
        eyebrow="00y - Guided lecture theater"
        title="Walk the chapter as a graphical lecture, not a checklist."
        lead="This layer gives the chapter a live five-slide lecture path: beginner story, board drawing, technical pass, equation lens, and teach-back check. It is designed for readers starting from zero and climbing toward advanced transfer."
      />
      <div className="mt-6 grid gap-4">
        <div className="rounded-xl border border-cyan/30 bg-cyan/[0.06] p-4">
          <p className="text-sm leading-relaxed text-muted"><span className="font-medium text-ink">Chapter {chapter.n} lecture theater:</span> {theaterSlides} slides expose {theaterModes} beginner, picture, technical, equation, and check modes before the practice and dense chapter layers begin.</p>
        </div>
        <ChapterLectureTheater theaters={[theater]} contextTitle={`Chapter ${chapter.n}: ${chapter.title}`} />
      </div>
    </section>
  );
}

function ChapterPracticeBlock({ chapter, cards, practiceModes }: { chapter: (typeof chapters)[number]; cards: ChapterPracticeCard[]; practiceModes: number }) {
  return (
    <section id="practice" className="scroll-mt-24">
      <SectionTitle
        eyebrow="00y - Active recall practice coach"
        title="Try explaining the chapter before you reveal the answer."
        lead="This layer turns the chapter into an oral-exam drill: answer the prompt first, then reveal a hint, a strong solution, the common trap, and a transfer test."
      />
      <div className="mt-6 grid gap-4">
        <div className="rounded-xl border border-lime/30 bg-lime/[0.06] p-4">
          <p className="text-sm leading-relaxed text-muted"><span className="font-medium text-ink">Chapter {chapter.n} recall set:</span> {cards.length} active-recall checkpoints expose {practiceModes} prompt, hint, solution, trap, and transfer modes, so the chapter can be practiced after it is read.</p>
        </div>
        <ChapterPracticeCoach cards={cards} contextTitle={`Chapter ${chapter.n}: ${chapter.title}`} />
      </div>
    </section>
  );
}


function ChapterConceptBlock({ chapter, cards, conceptModes }: { chapter: (typeof chapters)[number]; cards: ChapterConceptCard[]; conceptModes: number }) {
  return (
    <section id="concepts" className="scroll-mt-24">
      <SectionTitle
        eyebrow="00x - Concept microscope"
        title="Make every important word earn its meaning."
        lead="This layer turns terminology into mini lectures: plain role, board picture, technical use, nearby confusion, and self-check. It is built for readers who do not yet speak RL notation."
      />
      <div className="mt-6 grid gap-4">
        <div className="rounded-xl border border-violet/30 bg-violet/[0.06] p-4">
          <p className="text-sm leading-relaxed text-muted"><span className="font-medium text-ink">Chapter {chapter.n} concept set:</span> {cards.length} concepts expose {conceptModes} plain, visual, technical, contrast, and self-check modes before the later formula and algorithm layers use those words.</p>
        </div>
        <ConceptLectureDeck concepts={cards} contextTitle={`Chapter ${chapter.n}: ${chapter.title}`} />
      </div>
    </section>
  );
}

function ChapterWorkedExampleBlock({ chapter, examples, workedExampleModes }: { chapter: (typeof chapters)[number]; examples: ChapterWorkedExample[]; workedExampleModes: number }) {
  return (
    <section id="worked" className="scroll-mt-24">
      <SectionTitle
        eyebrow="00w - Worked example studio"
        title="Turn the explanation into tiny solved cases."
        lead="This layer makes each chapter do something concrete: a toy world, board trace, tiny target calculation, method trace, and debug repair. It bridges reading and practice."
      />
      <div className="mt-6 grid gap-4">
        <div className="rounded-xl border border-orange/30 bg-orange/[0.06] p-4">
          <p className="text-sm leading-relaxed text-muted"><span className="font-medium text-ink">Chapter {chapter.n} worked set:</span> {examples.length} worked examples expose {workedExampleModes} scenario, board, technical trace, pitfall, and self-check modes, so readers can see the chapter operate on tiny concrete cases.</p>
        </div>
        <WorkedExampleStudio examples={examples} contextTitle={`Chapter ${chapter.n}: ${chapter.title}`} />
      </div>
    </section>
  );
}

function ChapterMisconceptionBlock({ chapter, cards, misconceptionModes }: { chapter: (typeof chapters)[number]; cards: ChapterMisconceptionCard[]; misconceptionModes: number }) {
  return (
    <section id="clinic" className="scroll-mt-24">
      <SectionTitle
        eyebrow="00v - Misconception clinic"
        title="Repair the wrong idea, not just the answer."
        lead="This layer shows why a tempting shortcut sounds reasonable, redraws the missing distinction, names the technical consequence, and gives a self-check so the repair transfers."
      />
      <div className="mt-6 grid gap-4">
        <div className="rounded-xl border border-orange/30 bg-orange/[0.06] p-4">
          <p className="text-sm leading-relaxed text-muted"><span className="font-medium text-ink">Chapter {chapter.n} clinic:</span> {cards.length} misconception cards expose {misconceptionModes} mistake, temptation, repair, technical consequence, and self-check modes.</p>
        </div>
        <MisconceptionClinic cards={cards} contextTitle={`Chapter ${chapter.n}: ${chapter.title}`} />
      </div>
    </section>
  );
}

function ChapterSimulatorBlock({ chapter, simulator, simulatorControls, simulatorReadouts }: { chapter: (typeof chapters)[number]; simulator: ChapterSimulator; simulatorControls: number; simulatorReadouts: number }) {
  return (
    <section id="simulators" className="scroll-mt-24">
      <SectionTitle
        eyebrow="00u - Chapter simulator lab"
        title="Move the chapter's control knobs and explain the tradeoff."
        lead="This layer is a live teaching board, not a benchmark: exploration pressure changes the data, update strength changes how strongly estimates move, and future horizon changes how delayed consequences enter the target."
      />
      <div className="mt-6 grid gap-4">
        <div className="rounded-xl border border-cyan/30 bg-cyan/[0.06] p-4">
          <p className="text-sm leading-relaxed text-muted"><span className="font-medium text-ink">Chapter {chapter.n} simulator:</span> {simulatorControls} live controls drive {simulatorReadouts} learning, stability, bias, and variance readouts, so readers can test the chapter&apos;s central tradeoff before dense notation.</p>
        </div>
        <ChapterSimulatorLab simulators={[simulator]} contextTitle={`Chapter ${chapter.n}: ${chapter.title}`} />
      </div>
    </section>
  );
}

function ChapterManuscriptBlock({ manuscript }: { manuscript: ChapterManuscript }) {
  return (
    <section id="manuscript" className="scroll-mt-24">
      <SectionTitle
        eyebrow="00a - Original chapter manuscript"
        title="A bespoke prose lecture before the cards and audits."
        lead="This is the web-book manuscript layer: a direct explanation in new words, written as if the chapter were being taught on a board from zero to technical precision."
      />
      <div className="mt-6 grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
        <article className="rounded-xl border border-line bg-panel p-5">
          <div className="flex flex-wrap gap-2"><Chip accent="cyan">original prose</Chip><Chip accent="lime">chapter {manuscript.n}</Chip></div>
          <h3 className="display mt-4 text-3xl font-medium text-ink">Opening lecture</h3>
          <p className="mt-3 text-base leading-relaxed text-muted">{manuscript.opening}</p>
          <p className="mt-4 rounded-lg border border-lime/30 bg-lime/[0.06] p-3 text-sm leading-relaxed text-muted"><span className="font-medium text-ink">Where this chapter lands:</span> {manuscript.closing}</p>
        </article>
        <div className="grid gap-4">
          {manuscript.sections.map((section, index) => (
            <article key={section.title} className="rounded-xl border border-line bg-panel p-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="flex flex-wrap gap-2"><Chip accent="cyan">Move {index + 1}</Chip><Chip accent="violet">beginner → technical</Chip></div>
                  <h3 className="display mt-3 text-2xl font-medium text-ink">{section.title}</h3>
                </div>
                <MotionGlyph label={section.title} variant={glyphVariantForLabel(section.title)} accent={glyphAccentForLabel(section.title)} />
              </div>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <MiniBlock label="Beginner explanation" text={section.beginner} />
                <MiniBlock label="Graphical lecture" text={section.visual} tint />
                <MiniBlock label="Technical version" text={section.technical} tint />
                <MiniBlock label="Takeaway" text={section.takeaway} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}



function SectionTextbookBlock({ lessons }: { lessons: SectionTextbookLesson[] }) {
  return (
    <section id="section-manuscript" className="scroll-mt-24">
      <SectionTitle
        eyebrow="00c - Full section textbook manuscript"
        title="Every section gets a from-scratch prose lesson."
        lead="This is the closest layer to a standalone rewritten textbook: each PDF section title becomes an original mini-lesson with beginner framing, technical pass, board walkthrough, formula bridge, algorithm bridge, misconception guard, and self-check."
      />
      <div className="mt-6 grid gap-4">
        {lessons.map((lesson, index) => (
          <article key={lesson.section} className="rounded-xl border border-line bg-panel p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="flex flex-wrap gap-2"><Chip accent="cyan">Section manuscript {index + 1}</Chip><Chip accent="blue">{lesson.terms.slice(0, 3).join(" / ")}</Chip></div>
                <h3 className="display mt-3 text-2xl font-medium text-ink">{lesson.section}</h3>
              </div>
              <MotionGlyph label={lesson.section} variant={glyphVariantForLabel(lesson.section)} accent={glyphAccentForLabel(lesson.section)} />
            </div>
            <p className="mt-4 rounded-lg border border-cyan/25 bg-cyan/[0.045] p-3 text-sm leading-relaxed text-muted">{lesson.opener}</p>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <MiniBlock label="From scratch" text={lesson.fromScratch} />
              <MiniBlock label="Technical pass" text={lesson.technicalPass} tint />
              <MiniBlock label="Formula bridge" text={lesson.formulaBridge} tint />
              <MiniBlock label="Algorithm bridge" text={lesson.algorithmBridge} />
              <MiniBlock label="Misconception guard" text={lesson.misconceptionGuard} />
              <MiniBlock label="Self-check" text={lesson.selfCheck} tint />
            </div>
            <div className="mt-4 rounded-lg border border-line bg-white p-4">
              <p className="mono mb-2 text-[10px] uppercase tracking-[0.14em] text-dim">Board walkthrough</p>
              <ol className="grid gap-2 text-sm leading-relaxed text-muted">
                {lesson.boardWalkthrough.map((step, stepIndex) => <li key={step} className="flex gap-2"><span className="text-cyan">{stepIndex + 1}.</span><span>{step}</span></li>)}
              </ol>
            </div>
            <p className="mt-4 rounded-lg border border-lime/30 bg-lime/[0.06] p-3 text-sm leading-relaxed text-muted"><span className="font-medium text-ink">Next link:</span> {lesson.nextLink}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function StandaloneLectureBlock({ lecture }: { lecture: StandaloneChapterLecture }) {
  return (
    <section id="lecture" className="scroll-mt-24">
      <SectionTitle
        eyebrow="00 - Standalone lecture from scratch"
        title="Read this first: the chapter as a complete web-book lesson."
        lead="This layer is not a pointer back to the PDF. It teaches the chapter in original words: first intuition, then pictures, then technical objects, then board-work checkpoints."
      />
      <div className="mt-6 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
        <article className="rounded-xl border border-line bg-panel p-5">
          <div className="flex flex-wrap gap-2"><Chip accent="cyan">beginner-first</Chip><Chip accent="lime">standalone</Chip></div>
          <h3 className="display mt-4 text-3xl font-medium text-ink">Chapter promise</h3>
          <p className="mt-3 text-base leading-relaxed text-muted">{lecture.promise}</p>
          <div className="mt-5 grid gap-3">
            {lecture.startFromZero.map((paragraph, index) => (
              <p key={paragraph} className="rounded-lg border border-line bg-white p-4 text-sm leading-relaxed text-muted">
                <span className="font-medium text-ink">From zero {index + 1}:</span> {paragraph}
              </p>
            ))}
          </div>
        </article>
        <div className="grid gap-5">
          <MiniBlock label="Mental model to draw" text={lecture.mentalModel} />
          <MiniBlock label="Why this chapter now" text={lecture.whyNow} tint />
          <Panel title="Learning contract" items={lecture.learningContract} accent="cyan" />
        </div>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="grid gap-5 self-start">
          <div className="rounded-xl border border-line bg-panel p-5">
            <p className="eyebrow mb-3">Vocabulary before formulas</p>
            <div className="grid gap-3">
              {lecture.vocabulary.map((item) => (
                <article key={item.name} className="rounded-lg border border-line bg-white p-3">
                  <div className="flex items-start justify-between gap-3">
                    <h4 className="font-medium text-ink">{item.name}</h4>
                    <MotionGlyph label={item.name} variant={glyphVariantForLabel(item.name)} accent={glyphAccentForLabel(item.name)} className="-mr-2 -mt-2 motion-glyph-small" />
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted"><span className="font-medium text-ink">Plain:</span> {item.plain}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted"><span className="font-medium text-ink">Technical:</span> {item.technical}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted"><span className="font-medium text-orange">Why it matters:</span> {item.why}</p>
                </article>
              ))}
            </div>
          </div>
          <Panel title="Hands-on sequence" items={lecture.handsOnSequence} accent="lime" ordered />
          <Panel title="Technical finish" items={lecture.technicalFinish} accent="violet" ordered />
          <MiniBlock label="Completion standard" text={lecture.completionStandard} tint />
          <MiniBlock label="Bridge to the next chapter" text={lecture.nextChapterBridge} />
        </div>
        <div className="grid gap-4">
          {lecture.beats.map((beat, index) => (
            <article key={beat.section} className="rounded-xl border border-line bg-panel p-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="flex flex-wrap gap-2"><Chip accent="cyan">Beat {index + 1}</Chip><Chip accent="blue">{beat.terms.length ? beat.terms.slice(0, 2).join(" / ") : "concept"}</Chip></div>
                  <h3 className="display mt-3 text-2xl font-medium text-ink">{beat.section}</h3>
                </div>
                <MotionGlyph label={beat.section} variant={glyphVariantForLabel(beat.section)} accent={glyphAccentForLabel(beat.section)} />
              </div>
              <p className="mt-4 rounded-lg border border-cyan/25 bg-cyan/[0.045] p-3 text-sm leading-relaxed text-muted"><span className="font-medium text-ink">Lecture question:</span> {beat.question}</p>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <MiniBlock label="From scratch" text={beat.fromScratch} />
                <MiniBlock label="Picture it" text={beat.visualLecture} tint />
                <MiniBlock label="Technical build" text={beat.technicalBuild} tint />
                <MiniBlock label="Checkpoint" text={beat.checkpoint} />
              </div>
              <Panel title="Board work" items={beat.boardWork} accent="blue" ordered />
              <TagRow tags={beat.terms} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}



function ChapterSynthesisBlock({ synthesis }: { synthesis: ChapterSynthesis }) {
  return (
    <section id="synthesis" className="scroll-mt-24">
      <SectionTitle eyebrow="00 - Chapter synthesis ladder" title="How the chapter fits together before the individual cards." lead="This is the bridge between an easy reading and an implementation reading: dependencies, algorithm contrasts, study passes, and oral-exam checks." />
      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <Plain title="Easy synthesis"><p>{synthesis.easyThesis}</p></Plain>
        <MiniBlock label="Technical synthesis" text={synthesis.technicalThesis} tint />
      </div>
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {synthesis.dependencyStack.map((step) => (
          <article key={step.label} className="rounded-xl border border-line bg-panel p-4">
            <p className="mono text-[10px] uppercase tracking-[0.14em] text-cyan">{step.label}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted"><span className="font-medium text-ink">Easy:</span> {step.easy}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted"><span className="font-medium text-ink">Technical:</span> {step.technical}</p>
          </article>
        ))}
      </div>
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-line bg-panel p-4">
          <p className="eyebrow mb-3">Algorithm ladder</p>
          <div className="grid gap-3">
            {synthesis.algorithmLadder.map((item, index) => (
              <article key={item.id} className="rounded-lg border border-line bg-white p-3">
                <div className="flex flex-wrap gap-2"><Chip accent="cyan">Step {index + 1}</Chip><Chip accent="blue">{item.family}</Chip></div>
                <a href={`#${item.id}`} className="display mt-2 block text-xl font-medium text-ink hover:text-cyan">{item.name}</a>
                <p className="mt-2 text-sm leading-relaxed text-muted"><span className="font-medium text-ink">Starts from:</span> {item.startsFrom}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted"><span className="font-medium text-ink">Adds:</span> {item.adds}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted"><span className="font-medium text-ink">Use when:</span> {item.useWhen}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted"><span className="font-medium text-orange">Main risk:</span> {item.mainRisk}</p>
                <p className="mt-2 rounded-md border border-line bg-panel-2 p-2 text-sm leading-relaxed text-muted"><span className="font-medium text-ink">Implementation test:</span> {item.implementationTest}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="grid gap-4 self-start">
          <Panel title="Study protocol" items={synthesis.studyProtocol} accent="lime" ordered />
          <div className="rounded-xl border border-line bg-panel p-4">
            <p className="eyebrow mb-3">Comparison axes</p>
            <div className="grid gap-3">
              {synthesis.comparisonAxes.map((axis) => (
                <article key={axis.label} className="rounded-lg border border-line bg-white p-3">
                  <p className="mono text-[10px] uppercase tracking-[0.14em] text-violet">{axis.label}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted"><span className="font-medium text-ink">Easy:</span> {axis.easy}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted"><span className="font-medium text-ink">Technical:</span> {axis.technical}</p>
                  <TagRow tags={axis.members} />
                </article>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-line bg-panel p-4">
            <p className="eyebrow mb-3">Oral exam checks</p>
            <div className="grid gap-3">
              {synthesis.oralExamPrompts.map((prompt) => <MiniBlock key={prompt.prompt} label={prompt.prompt} text={prompt.answer} />)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


function ChapterDependencyMapBlock({ map }: { map: ChapterDependencyMap }) {
  return (
    <section id="dependencies" className="scroll-mt-24">
      <SectionTitle eyebrow="00b - Cross-chapter dependency map" title="What this chapter needs, unlocks, and can break." lead="Use this map when a chapter feels isolated: it shows incoming prerequisites, outgoing bridges, concept gates, skip risks, and a review loop." />
      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <MiniBlock label="Easy map" text={map.easyMap} />
        <MiniBlock label="Technical map" text={map.technicalMap} tint />
      </div>
      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <DependencyLinks title="Incoming prerequisites" links={map.incoming} accent="cyan" />
        <DependencyLinks title="Outgoing unlocks" links={map.outgoing} accent="violet" />
      </div>
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-line bg-panel p-4">
          <p className="eyebrow mb-3">Concept gates</p>
          <div className="grid gap-3">
            {map.gates.map((gate) => (
              <article key={gate.label} className="rounded-lg border border-line bg-white p-3">
                <p className="mono text-[10px] uppercase tracking-[0.14em] text-cyan">{gate.label}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted"><span className="font-medium text-ink">Easy:</span> {gate.easy}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted"><span className="font-medium text-ink">Technical:</span> {gate.technical}</p>
                <p className="mt-2 rounded-md border border-orange/30 bg-orange/[0.06] p-2 text-sm leading-relaxed text-muted"><span className="font-medium text-orange">Diagnostic:</span> {gate.diagnostic}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="grid gap-4 self-start">
          <Panel title="If you skip this, these break" items={map.skipRisks} accent="orange" />
          <Panel title="Review loop" items={map.reviewLoop} accent="lime" ordered />
        </div>
      </div>
    </section>
  );
}

function DependencyLinks({ title, links, accent }: { title: string; links: ChapterDependencyMap["incoming"]; accent: "cyan" | "violet" }) {
  return (
    <div className="rounded-xl border border-line bg-panel p-4">
      <p className="eyebrow mb-3">{title}</p>
      <div className="grid gap-3">
        {links.length ? links.map((link) => (
          <article key={`${title}-${link.chapter}`} className="rounded-lg border border-line bg-white p-3">
            <div className="flex flex-wrap gap-2"><Chip accent={accent}>Chapter {link.chapter}</Chip><Chip accent="blue">{link.relation}</Chip></div>
            <h3 className="display mt-3 text-xl font-medium text-ink">{link.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted"><span className="font-medium text-ink">Easy:</span> {link.easy}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted"><span className="font-medium text-ink">Technical:</span> {link.technical}</p>
          </article>
        )) : <p className="rounded-lg border border-line bg-white p-3 text-sm leading-relaxed text-muted">No adjacent dependency in this direction; this chapter starts or completes a major arc.</p>}
      </div>
    </div>
  );
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
  const profile = algorithmProfile(algorithm);
  const derivation = algorithmDerivation(algorithm);

  return (
    <article id={algorithm.id} className="scroll-mt-24 overflow-hidden rounded-xl border border-line bg-panel">
      <div className="grid gap-px bg-line lg:grid-cols-[0.85fr_1.15fr]">
        <div className="bg-panel p-5 lg:p-6">
          <div className="flex flex-wrap gap-2"><Chip accent="cyan">{algorithm.family}</Chip><Chip accent="blue">{algorithm.bookAnchor}</Chip></div>
          <h3 className="display mt-4 text-[clamp(26px,3vw,38px)] font-medium text-ink">{algorithm.name}</h3>
          <div className="mt-4"><AnimatedConceptGraphic label={algorithm.name} variant="algorithm" caption={algorithm.plain} compact /></div>
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
          <AlgorithmDerivationBlock derivation={derivation} />
          <AlgorithmProfileBlock profile={profile} />
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



function AlgorithmDerivationBlock({ derivation }: { derivation: AlgorithmDerivation }) {
  return (
    <div className="mt-5 rounded-xl border border-cyan/25 bg-cyan/[0.045] p-4">
      <div className="flex flex-wrap gap-2"><Chip accent="cyan">Derivation path</Chip><Chip accent="blue">easy + technical</Chip></div>
      <h4 className="display mt-3 text-2xl font-medium text-ink">{derivation.title}</h4>
      <div className="mt-3 grid gap-3 md:grid-cols-2">
        <MiniBlock label="Easy idea" text={derivation.bigIdea} />
        <MiniBlock label="Technical route" text={derivation.technicalPath} tint />
      </div>
      <div className="mt-4 grid gap-3 lg:grid-cols-2">
        {derivation.steps.map((step) => (
          <article key={step.label} className="rounded-lg border border-line bg-white p-3">
            <p className="mono text-[10px] uppercase tracking-[0.14em] text-cyan">{step.label}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted"><span className="font-medium text-ink">Easy:</span> {step.easy}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted"><span className="font-medium text-ink">Technical:</span> {step.technical}</p>
          </article>
        ))}
      </div>
      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <Panel title="Equation audit" items={derivation.equationNotes} accent="cyan" />
        <Panel title="Coding trace" items={derivation.codingTrace} accent="lime" />
        <MiniBlock label="Proof / debug obligation" text={derivation.proofObligation} tint />
      </div>
    </div>
  );
}

function AlgorithmProfileBlock({ profile }: { profile: AlgorithmProfile }) {
  return (
    <div className="mt-5 rounded-xl border border-violet/25 bg-violet/[0.045] p-4">
      <div className="flex flex-wrap gap-2"><Chip accent="violet">Technical profile axes</Chip></div>
      <div className="mt-4 grid gap-2 md:grid-cols-2">
        {profileRows(profile).map(([label, value]) => (
          <div key={label} className="rounded-lg border border-line bg-white p-3">
            <p className="mono text-[10px] uppercase tracking-[0.14em] text-dim">{label}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">{value}</p>
          </div>
        ))}
      </div>
    </div>
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
  return (
    <div className={`rounded-lg border border-line ${tint ? "bg-panel-2" : "bg-white"} p-3`}>
      <div className="mb-2 flex items-start justify-between gap-2">
        <p className="mono text-[10px] uppercase tracking-[0.14em] text-dim">{label}</p>
        <MotionGlyph label={label} variant={glyphVariantForLabel(label)} accent={glyphAccentForLabel(label)} className="-mr-2 -mt-2 motion-glyph-small" />
      </div>
      <p className="text-sm leading-relaxed text-muted">{text}</p>
    </div>
  );
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
  return (
    <div className="rounded-lg border border-line bg-white p-4">
      <div className="mb-3 flex items-start justify-between gap-2">
        <p className="mono text-[10px] uppercase tracking-[0.14em] text-dim">{title}</p>
        <MotionGlyph label={title} variant={glyphVariantForLabel(title)} accent={accent} className="-mr-2 -mt-2 motion-glyph-small" />
      </div>
      <List className={`grid gap-2 text-sm leading-relaxed text-muted ${mono ? "mono text-xs" : ""}`}>{items.map((item, index) => <li key={`${item}-${index}`} className="flex gap-2"><span className={color}>{ordered ? `${index + 1}.` : "•"}</span><span>{item}</span></li>)}</List>
    </div>
  );
}

function DetailGroup({ label, items }: { label: string; items: { label: string; source: string; easy: string; technical: string; steps: string[] }[] }) {
  return <div><p className="eyebrow mb-3">{label}</p><div className="grid gap-4 lg:grid-cols-2">{items.map((item) => <article key={item.label} className="rounded-xl border border-line bg-panel p-5"><div className="flex items-start justify-between gap-3"><div><div className="flex flex-wrap gap-2"><Chip accent="cyan">{item.source}</Chip></div><h3 className="display mt-3 text-2xl font-medium text-ink">{item.label}</h3></div><MotionGlyph label={item.label} variant={glyphVariantForLabel(item.label)} accent="cyan" /></div><div className="mt-4 grid gap-3 md:grid-cols-2"><MiniBlock label="Easy" text={item.easy} /><MiniBlock label="Technical" text={item.technical} tint /></div><ol className="mt-4 grid gap-2 text-sm leading-relaxed text-muted">{item.steps.map((step, index) => <li key={step}>{index + 1}. {step}</li>)}</ol></article>)}</div></div>;
}

function TagRow({ tags }: { tags: string[] }) {
  if (!tags.length) return null;
  return <div className="mt-4 flex flex-wrap gap-1.5">{tags.map((tag) => <span key={tag} className="mono rounded-full border border-line bg-panel-2 px-2 py-1 text-[10px] text-dim">{tag}</span>)}</div>;
}

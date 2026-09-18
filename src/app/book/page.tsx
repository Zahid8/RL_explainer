import type { Metadata } from "next";
import Link from "next/link";
import { AnimatedConceptGraphic } from "@/components/AnimatedConceptGraphic";
import { AnalogyStudio } from "@/components/AnalogyStudio";
import { CaseStudyStudio } from "@/components/CaseStudyStudio";
import { SocraticTutorStudio } from "@/components/SocraticTutorStudio";
import { AssumptionClinic } from "@/components/AssumptionClinic";
import { ChapterExamStudio } from "@/components/ChapterExamStudio";
import { ChapterPracticeCoach } from "@/components/ChapterPracticeCoach";
import { CodeLab } from "@/components/CodeLab";
import { ChapterLectureTheater } from "@/components/ChapterLectureTheater";
import { ChapterSimulatorLab } from "@/components/ChapterSimulatorLab";
import { ConceptLectureDeck } from "@/components/ConceptLectureDeck";
import { ExerciseSolutionStudio } from "@/components/ExerciseSolutionStudio";
import { FormulaLectureReader } from "@/components/FormulaLectureReader";
import { FoundationDictionaryStudio } from "@/components/FoundationDictionaryStudio";
import { MathRescueStudio } from "@/components/MathRescueStudio";
import { VisualStoryStudio } from "@/components/VisualStoryStudio";
import { InteractiveBlackboard } from "@/components/InteractiveBlackboard";
import { MethodCompareStudio } from "@/components/MethodCompareStudio";
import { SectionLessonReader } from "@/components/SectionLessonReader";
import { SectionMasteryStudio } from "@/components/SectionMasteryStudio";
import { MotionGlyph } from "@/components/MotionGlyph";
import { ProofLab } from "@/components/ProofLab";
import { SymbolDecoder } from "@/components/SymbolDecoder";
import { WorkedExampleStudio } from "@/components/WorkedExampleStudio";
import { MisconceptionClinic } from "@/components/MisconceptionClinic";
import { Chip } from "@/components/Section";
import { ZeroKnowledgeLadderReader } from "@/components/ZeroKnowledgeLadderReader";
import { manuscriptForChapter, manuscriptSectionCount, type ChapterManuscript } from "@/lib/chapterManuscripts";
import { bookIndexEntryCount, bookIndexLayerCount } from "@/lib/bookIndex";
import { exerciseSolutionCardCount, exerciseSolutionCardsForChapter, exerciseSolutionModeCount } from "@/lib/exerciseSolutionStudio";
import { codeLabCardsForChapter, codeLabModeCount, type CodeLabCard } from "@/lib/codeLab";
import { assumptionCardsForChapter, assumptionModeCount, type AssumptionClinicCard } from "@/lib/assumptionClinic";
import { chapterExamCardsForChapter, chapterExamModeCount, type ChapterExamCard } from "@/lib/chapterExam";
import { learningGraphEdgeCount, learningGraphNodeCount } from "@/lib/learningGraph";
import { methodCompareCardsForChapter, methodCompareModeCount, methodCompareCardCount, type MethodCompareCard } from "@/lib/methodCompare";
import { blackboardForChapter, blackboardStageCount, type ChapterBlackboard } from "@/lib/interactiveBlackboards";
import { practiceCardsForChapter, practiceModeCount, type ChapterPracticeCard } from "@/lib/chapterPractice";
import { conceptCardsForChapter, conceptModeCount, type ChapterConceptCard } from "@/lib/conceptAtlas";
import { workedExamplesForChapter, workedExampleModeCount, type ChapterWorkedExample } from "@/lib/chapterWorkedExamples";
import { misconceptionCardsForChapter, misconceptionModeCount, type ChapterMisconceptionCard } from "@/lib/chapterMisconceptions";
import { lectureTheaterForChapter, lectureTheaterModeCount, lectureTheaterSlideCount, type ChapterLectureTheater as ChapterLectureTheaterData } from "@/lib/chapterLectureTheater";
import { simulatorControlCount, simulatorForChapter, simulatorReadoutCount, type ChapterSimulator } from "@/lib/chapterSimulators";
import { formulaLectureModeCount, formulasForChapter, type FormulaNote } from "@/lib/formulaAtlas";
import { foundationDictionaryCardCount, foundationDictionaryCardsForChapter, foundationDictionaryModeCount, foundationDictionaryTermCount, type FoundationDictionaryCard } from "@/lib/foundationDictionary";
import { mathRescueCardCount, mathRescueCardsForChapter, mathRescueModeCount, mathRescueObjectCount, type MathRescueCard } from "@/lib/mathRescue";
import { visualStoriesForChapter, visualStoryActorCount, visualStoryCardCount, visualStoryModeCount, visualStoryPropCount, type VisualStoryCard } from "@/lib/visualStory";
import { analogiesForChapter, analogyCardCount, analogyMappingCount, analogyModeCount, type AnalogyCard } from "@/lib/analogies";
import { socraticTutorBoardStepCount, socraticTutorCardCount, socraticTutorCardsForChapter, socraticTutorModeCount, type SocraticTutorCard } from "@/lib/socraticTutor";
import { caseStudiesForChapter, caseStudyBoardFrameCount, caseStudyCardCount, caseStudyModeCount, type ChapterCaseStudy } from "@/lib/caseStudies";
import { chapters } from "@/lib/paper";
import { proofCardsForChapter, proofModeCount, type ProofLabCard } from "@/lib/proofLab";
import { sectionMasteryCardsForChapter, sectionMasteryModeCount, type SectionMasteryCard } from "@/lib/sectionMastery";
import { sectionLessonModeCount, sectionLessonsForChapter, sectionNarrativeCount, type SectionTextbookLesson } from "@/lib/sectionNarratives";
import { standaloneLectureForChapter, standaloneLectureTileCount, type StandaloneChapterLecture } from "@/lib/standaloneBook";
import { symbolCardsForChapter, symbolLectureModeCount, type SymbolCard } from "@/lib/symbolAtlas";
import { zeroKnowledgeLadderForChapter, zeroKnowledgeModeCount, zeroKnowledgeRungCount, type ZeroKnowledgeLadder } from "@/lib/zeroKnowledgeLadders";

export const metadata: Metadata = {
  title: "Standalone RL Web Book | RLbook Explainer",
  description: "A linear standalone web-book reader for the RLbook explainer: from basics to advanced, chapter by chapter, in original words.",
};

const lectures = chapters.map((chapter) => ({
  chapter,
  lecture: standaloneLectureForChapter(chapter),
  starter: zeroKnowledgeLadderForChapter(chapter.n),
  starterModes: zeroKnowledgeModeCount(chapter.n),
  foundationCards: foundationDictionaryCardsForChapter(chapter.n),
  foundationModes: foundationDictionaryModeCount(chapter.n),
  mathCards: mathRescueCardsForChapter(chapter.n),
  mathModes: mathRescueModeCount(chapter.n),
  storyCards: visualStoriesForChapter(chapter.n),
  storyModes: visualStoryModeCount(chapter.n),
  analogyCards: analogiesForChapter(chapter.n),
  analogyModes: analogyModeCount(chapter.n),
  tutorCards: socraticTutorCardsForChapter(chapter.n),
  tutorModes: socraticTutorModeCount(chapter.n),
  caseStudies: caseStudiesForChapter(chapter.n),
  caseModes: caseStudyModeCount(chapter.n),
  theater: lectureTheaterForChapter(chapter.n),
  theaterSlides: lectureTheaterSlideCount(chapter.n),
  theaterModes: lectureTheaterModeCount(chapter.n),
  practiceCards: practiceCardsForChapter(chapter.n),
  practiceModes: practiceModeCount(chapter.n),
  conceptCards: conceptCardsForChapter(chapter.n),
  conceptModes: conceptModeCount(chapter.n),
  workedExamples: workedExamplesForChapter(chapter.n),
  workedExampleModes: workedExampleModeCount(chapter.n),
  misconceptionCards: misconceptionCardsForChapter(chapter.n),
  misconceptionModes: misconceptionModeCount(chapter.n),
  simulator: simulatorForChapter(chapter.n),
  simulatorControls: simulatorControlCount(chapter.n),
  simulatorReadouts: simulatorReadoutCount(chapter.n),
  manuscript: manuscriptForChapter(chapter.n),
  blackboard: blackboardForChapter(chapter.n),
  sectionLessons: sectionLessonsForChapter(chapter.n),
  sectionMasteryCards: sectionMasteryCardsForChapter(chapter.n),
  sectionMasteryModes: sectionMasteryModeCount(chapter.n),
  symbolCards: symbolCardsForChapter(chapter.n),
  symbolModes: symbolLectureModeCount(chapter.n),
  codeCards: codeLabCardsForChapter(chapter.n),
  codeModes: codeLabModeCount(chapter.n),
  assumptionCards: assumptionCardsForChapter(chapter.n),
  assumptionModes: assumptionModeCount(chapter.n),
  compareCards: methodCompareCardsForChapter(chapter.n),
  compareModes: methodCompareModeCount(chapter.n),
  proofCards: proofCardsForChapter(chapter.n),
  proofModes: proofModeCount(chapter.n),
  examCards: chapterExamCardsForChapter(chapter.n),
  examModes: chapterExamModeCount(chapter.n),
  formulas: formulasForChapter(chapter.n),
  formulaModes: formulaLectureModeCount(chapter.n),
}));

export default function BookPage() {
  const lectureBeats = standaloneLectureTileCount();
  const manuscriptSections = manuscriptSectionCount();
  const blackboardStages = blackboardStageCount();
  const sectionNarratives = sectionNarrativeCount();
  const guidedSectionModes = sectionLessonModeCount();
  const formulaModes = formulaLectureModeCount();
  const starterRungs = zeroKnowledgeRungCount();
  const starterModes = zeroKnowledgeModeCount();
  const foundationCardTotal = foundationDictionaryCardCount();
  const foundationModes = foundationDictionaryModeCount();
  const foundationTerms = foundationDictionaryTermCount();
  const mathCardTotal = mathRescueCardCount();
  const mathModes = mathRescueModeCount();
  const mathObjects = mathRescueObjectCount();
  const storyCards = visualStoryCardCount();
  const storyModes = visualStoryModeCount();
  const storyActors = visualStoryActorCount();
  const storyProps = visualStoryPropCount();
  const analogyCards = analogyCardCount();
  const analogyModes = analogyModeCount();
  const analogyMappings = analogyMappingCount();
  const tutorCards = socraticTutorCardCount();
  const tutorModes = socraticTutorModeCount();
  const tutorBoardSteps = socraticTutorBoardStepCount();
  const caseStudies = caseStudyCardCount();
  const caseModes = caseStudyModeCount();
  const caseFrames = caseStudyBoardFrameCount();
  const theaterSlides = lectureTheaterSlideCount();
  const theaterModes = lectureTheaterModeCount();
  const activeRecallModes = practiceModeCount();
  const conceptModes = conceptModeCount();
  const workedExampleModes = workedExampleModeCount();
  const misconceptionModes = misconceptionModeCount();
  const simulatorControls = simulatorControlCount();
  const simulatorReadouts = simulatorReadoutCount();
  const searchEntries = bookIndexEntryCount();
  const searchLayers = bookIndexLayerCount();
  const graphNodes = learningGraphNodeCount();
  const graphEdges = learningGraphEdgeCount();
  const symbolModes = symbolLectureModeCount();
  const codeModes = codeLabModeCount();
  const assumptionModes = assumptionModeCount();
  const compareCards = methodCompareCardCount();
  const compareModes = methodCompareModeCount();
  const proofModes = proofModeCount();
  const examModes = chapterExamModeCount();
  const sectionMasteryModes = sectionMasteryModeCount();
  const exerciseSolutionCards = exerciseSolutionCardCount();
  const exerciseSolutionModes = exerciseSolutionModeCount();

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
            <Link href="/sections" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Section mastery</Link>
            <Link href="/search" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Search index</Link>
            <Link href="/graph" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Learning graph</Link>
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
              <p className="eyebrow">Standalone linear reader</p>
              <h1 className="display mt-4 max-w-5xl text-[clamp(42px,7vw,88px)] font-medium text-ink">The RL book at your fingertips.</h1>
              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted">
                This is the continuous web-book mode: all 17 chapters in order, written as an original lecture path. Start with the beginner story, draw the mental model, then expand each section into technical language, equations, algorithms, and checks.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <Chip accent="cyan">17 chapters</Chip>
                <Chip accent="lime">{starterRungs} starter rungs</Chip>
                <Chip accent="cyan">{starterModes} primer modes</Chip>
                <Chip accent="cyan">{foundationCardTotal} foundation cards</Chip>
                <Chip accent="lime">{foundationModes} foundation modes</Chip>
                <Chip accent="violet">{foundationTerms} foundation terms</Chip>
                <Chip accent="orange">{mathCardTotal} math rescue cards</Chip>
                <Chip accent="lime">{mathModes} math modes</Chip>
                <Chip accent="violet">{mathObjects} math objects</Chip>
                <Chip accent="cyan">{storyCards} story scenes</Chip>
                <Chip accent="lime">{storyModes} story modes</Chip>
                <Chip accent="orange">{storyActors} actors</Chip>
                <Chip accent="blue">{storyProps} props</Chip>
                <Chip accent="violet">{analogyCards} analogies</Chip>
                <Chip accent="lime">{analogyModes} analogy modes</Chip>
                <Chip accent="cyan">{analogyMappings} mappings</Chip>
                <Chip accent="cyan">{tutorCards} tutor cards</Chip>
                <Chip accent="lime">{tutorModes} tutor modes</Chip>
                <Chip accent="orange">{tutorBoardSteps} tutor board steps</Chip>
                <Chip accent="cyan">{caseStudies} case studies</Chip>
                <Chip accent="lime">{caseModes} case modes</Chip>
                <Chip accent="orange">{caseFrames} case frames</Chip>
                <Chip accent="blue">{theaterSlides} theater slides</Chip>
                <Chip accent="cyan">{theaterModes} theater modes</Chip>
                <Chip accent="lime">{activeRecallModes} practice modes</Chip>
                <Chip accent="violet">{conceptModes} concept modes</Chip>
                <Chip accent="orange">{workedExampleModes} worked modes</Chip>
                <Chip accent="orange">{misconceptionModes} clinic modes</Chip>
                <Chip accent="cyan">{simulatorControls} simulator controls</Chip>
                <Chip accent="blue">{simulatorReadouts} simulator readouts</Chip>
                <Chip accent="blue">{manuscriptSections} manuscript moves</Chip>
                <Chip accent="violet">{blackboardStages} blackboard stages</Chip>
                <Chip accent="cyan">{sectionNarratives} section manuscripts</Chip>
                <Chip accent="blue">{guidedSectionModes} guided section modes</Chip>
                <Chip accent="lime">{sectionMasteryModes} section mastery modes</Chip>
                <Chip accent="orange">{exerciseSolutionCards} exercise solutions</Chip>
                <Chip accent="orange">{exerciseSolutionModes} solution modes</Chip>
                <Chip accent="violet">{formulaModes} formula lecture modes</Chip>
                <Chip accent="cyan">{searchEntries} search entries</Chip>
                <Chip accent="blue">{searchLayers} search layers</Chip>
                <Chip accent="lime">{graphNodes} graph nodes</Chip>
                <Chip accent="cyan">{graphEdges} graph links</Chip>
                <Chip accent="violet">{symbolModes} symbol modes</Chip>
                <Chip accent="orange">{codeModes} code modes</Chip>
                <Chip accent="lime">{assumptionModes} trust modes</Chip>
                <Chip accent="violet">{compareCards} comparisons</Chip>
                <Chip accent="violet">{compareModes} compare modes</Chip>
                <Chip accent="violet">{proofModes} proof modes</Chip>
                <Chip accent="lime">{examModes} exam modes</Chip>
                <Chip accent="lime">{lectureBeats} lecture beats</Chip>
                <Chip accent="violet">beginner → advanced</Chip>
                <Chip accent="orange">original wording</Chip>
              </div>
            </div>
            <div className="grid gap-4">
              <AnimatedConceptGraphic label="Standalone web-book reader" variant="tree" caption="A single reading path connects basics, tabular methods, approximation, policy gradients, psychology, neuroscience, applications, and frontier ideas." compact />
              <div className="rounded-xl border border-line bg-white p-5">
                <p className="eyebrow mb-3">How to read this page</p>
                <ol className="grid gap-2 text-sm leading-relaxed text-muted">
                  <li>1. Read the chapter promise and zero-level story.</li>
                  <li>2. Draw the mental model before reading equations.</li>
                  <li>3. Use the foundation dictionary whenever a word needs plain meaning, board picture, technical role, trap, and teach-back.</li>
                  <li>4. Use math rescue when a return, expectation, backup, gradient, ratio, trace, or update needs intuition before symbols.</li>
                  <li>5. Use visual stories to watch the chapter as learner-world-feedback scenes before formulas appear.</li>
                  <li>6. Use analogies to map familiar examples to exact RL objects, then read the limits so the analogy does not mislead.</li>
                  <li>7. Use the Socratic tutor to ask a beginner question, take a hint, draw the board, read the technical answer, and try a fresh case.</li>
                  <li>8. Use case studies to see the chapter as one full scenario: scene, board walkthrough, technical translation, debug probe, and transfer challenge.</li>
                  <li>9. Open the section beats and translate each picture into technical language.</li>
                  <li>8. Use the section mastery studio to try each named section cold before chapter-level drills.</li>
                  <li>9. Use the full chapter page for algorithms, formulas, exercises, and interactive detail.</li>
                  <li>10. Use the search index when you remember a term but not the chapter.</li>
                  <li>11. Use the learning graph when you need to see why a concept, formula, algorithm, and example belong together.</li>
                  <li>10. Use the symbol decoder whenever a mathematical mark needs a plain meaning, technical role, pitfall, and self-check.</li>
                  <li>11. Use the implementation code lab to translate algorithm names into state, target, update, invariants, tests, and debug checks.</li>
                  <li>12. Use the assumption clinic to ask when a method&apos;s data, target, update, and representation make its guarantee honest.</li>
                  <li>13. Use the method comparison studio to choose between nearby algorithms by data, target, backup style, model use, and failure risk.</li>
                  <li>14. Use the proof lab to turn formulas and chapter claims into claim, ingredient, proof-sketch, equation, and stress-test arguments.</li>
                  <li>15. Use the chapter exam studio to answer, plan, reveal, grade, and transfer the chapter before moving on.</li>
                  <li>16. Use the exercise solution studio to attempt, hint, solve, debug, and extend numbered practice problems.</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1280px] gap-10 px-6 py-12 lg:grid-cols-[290px_1fr] lg:px-10">
        <aside className="self-start lg:sticky lg:top-20">
          <nav className="rounded-xl border border-line bg-panel p-4">
            <p className="eyebrow mb-3">Book table of contents</p>
            <div className="grid max-h-[70vh] gap-1 overflow-auto pr-1">
              {lectures.map(({ chapter }) => (
                <a key={chapter.n} href={`#book-chapter-${chapter.n}`} className="rounded-lg border border-transparent px-3 py-2 text-sm leading-snug text-muted hover:border-line hover:bg-white hover:text-ink">
                  <span className="mono text-[10px] uppercase tracking-[0.12em] text-dim">Chapter {chapter.n}</span>
                  <span className="mt-1 block font-medium text-ink">{chapter.title}</span>
                </a>
              ))}
            </div>
          </nav>
        </aside>

        <div className="grid gap-12">
          {lectures.map(({ chapter, lecture, starter, starterModes, foundationCards, foundationModes, mathCards, mathModes, storyCards, storyModes, analogyCards, analogyModes, tutorCards, tutorModes, caseStudies, caseModes, theater, theaterSlides, theaterModes, practiceCards, practiceModes, conceptCards, conceptModes, workedExamples, workedExampleModes, misconceptionCards, misconceptionModes, simulator, simulatorControls, simulatorReadouts, manuscript, blackboard, sectionLessons, sectionMasteryCards, sectionMasteryModes, symbolCards, symbolModes, codeCards, codeModes, assumptionCards, assumptionModes, compareCards, compareModes, proofCards, proofModes, examCards, examModes, formulas, formulaModes }) => <BookChapter key={chapter.n} chapter={chapter} lecture={lecture} starter={starter} starterModes={starterModes} foundationCards={foundationCards} foundationModes={foundationModes} mathCards={mathCards} mathModes={mathModes} storyCards={storyCards} storyModes={storyModes} analogyCards={analogyCards} analogyModes={analogyModes} tutorCards={tutorCards} tutorModes={tutorModes} caseStudies={caseStudies} caseModes={caseModes} theater={theater} theaterSlides={theaterSlides} theaterModes={theaterModes} practiceCards={practiceCards} practiceModes={practiceModes} conceptCards={conceptCards} conceptModes={conceptModes} workedExamples={workedExamples} workedExampleModes={workedExampleModes} misconceptionCards={misconceptionCards} misconceptionModes={misconceptionModes} simulator={simulator} simulatorControls={simulatorControls} simulatorReadouts={simulatorReadouts} manuscript={manuscript} blackboard={blackboard} sectionLessons={sectionLessons} sectionMasteryCards={sectionMasteryCards} sectionMasteryModes={sectionMasteryModes} symbolCards={symbolCards} symbolModes={symbolModes} codeCards={codeCards} codeModes={codeModes} assumptionCards={assumptionCards} assumptionModes={assumptionModes} compareCards={compareCards} compareModes={compareModes} proofCards={proofCards} proofModes={proofModes} examCards={examCards} examModes={examModes} formulas={formulas} formulaModes={formulaModes} />)}
        </div>
      </div>
    </main>
  );
}

function BookChapter({ chapter, lecture, starter, starterModes, foundationCards, foundationModes, mathCards, mathModes, storyCards, storyModes, analogyCards, analogyModes, tutorCards, tutorModes, caseStudies, caseModes, theater, theaterSlides, theaterModes, practiceCards, practiceModes, conceptCards, conceptModes, workedExamples, workedExampleModes, misconceptionCards, misconceptionModes, simulator, simulatorControls, simulatorReadouts, manuscript, blackboard, sectionLessons, sectionMasteryCards, sectionMasteryModes, symbolCards, symbolModes, codeCards, codeModes, assumptionCards, assumptionModes, compareCards, compareModes, proofCards, proofModes, examCards, examModes, formulas, formulaModes }: { chapter: (typeof chapters)[number]; lecture: StandaloneChapterLecture; starter: ZeroKnowledgeLadder; starterModes: number; foundationCards: FoundationDictionaryCard[]; foundationModes: number; mathCards: MathRescueCard[]; mathModes: number; storyCards: VisualStoryCard[]; storyModes: number; analogyCards: AnalogyCard[]; analogyModes: number; tutorCards: SocraticTutorCard[]; tutorModes: number; caseStudies: ChapterCaseStudy[]; caseModes: number; theater: ChapterLectureTheaterData; theaterSlides: number; theaterModes: number; practiceCards: ChapterPracticeCard[]; practiceModes: number; conceptCards: ChapterConceptCard[]; conceptModes: number; workedExamples: ChapterWorkedExample[]; workedExampleModes: number; misconceptionCards: ChapterMisconceptionCard[]; misconceptionModes: number; simulator: ChapterSimulator; simulatorControls: number; simulatorReadouts: number; manuscript: ChapterManuscript; blackboard: ChapterBlackboard; sectionLessons: SectionTextbookLesson[]; sectionMasteryCards: SectionMasteryCard[]; sectionMasteryModes: number; symbolCards: SymbolCard[]; symbolModes: number; codeCards: CodeLabCard[]; codeModes: number; assumptionCards: AssumptionClinicCard[]; assumptionModes: number; compareCards: MethodCompareCard[]; compareModes: number; proofCards: ProofLabCard[]; proofModes: number; examCards: ChapterExamCard[]; examModes: number; formulas: FormulaNote[]; formulaModes: number }) {
  const exerciseSolutions = exerciseSolutionCardsForChapter(chapter.n);
  const exerciseSolutionModes = exerciseSolutionModeCount(chapter.n);
  return (
    <article id={`book-chapter-${chapter.n}`} className="scroll-mt-24 overflow-hidden rounded-2xl border border-line bg-panel">
      <div className="grid gap-px bg-line lg:grid-cols-[0.9fr_1.1fr]">
        <div className="bg-panel p-6 lg:p-7">
          <div className="flex flex-wrap gap-2"><Chip accent="cyan">Chapter {chapter.n}</Chip><Chip accent="blue">{chapter.part}</Chip><Chip accent="lime">{lecture.beats.length} section lessons</Chip><Chip accent="cyan">{foundationCards.length} foundations</Chip><Chip accent="orange">{mathCards.length} math rescue</Chip><Chip accent="cyan">{storyCards.length} stories</Chip><Chip accent="lime">{storyModes} story modes</Chip><Chip accent="violet">{analogyCards.length} analogies</Chip><Chip accent="lime">{analogyModes} analogy modes</Chip><Chip accent="cyan">{tutorCards.length} tutor cards</Chip><Chip accent="lime">{tutorModes} tutor modes</Chip><Chip accent="cyan">{caseStudies.length} cases</Chip><Chip accent="lime">{caseModes} case modes</Chip><Chip accent="cyan">{theaterSlides} theater slides</Chip><Chip accent="blue">{theaterModes} theater modes</Chip><Chip accent="violet">{conceptCards.length} concepts</Chip><Chip accent="violet">{symbolCards.length} symbols</Chip><Chip accent="orange">{codeCards.length} code labs</Chip><Chip accent="lime">{assumptionCards.length} trust clinics</Chip><Chip accent="violet">{compareCards.length} comparisons</Chip><Chip accent="violet">{proofCards.length} proofs</Chip><Chip accent="lime">{examCards.length} exams</Chip><Chip accent="cyan">{sectionMasteryCards.length} section drills</Chip><Chip accent="orange">{exerciseSolutions.length} exercise solutions</Chip><Chip accent="orange">{workedExamples.length} examples</Chip><Chip accent="orange">{misconceptionCards.length} clinics</Chip><Chip accent="cyan">{simulatorControls} sim controls</Chip><Chip accent="blue">{simulatorReadouts} readouts</Chip></div>
          <h2 className="display mt-5 text-[clamp(32px,5vw,56px)] font-medium text-ink">{chapter.title}</h2>
          <p className="mt-4 text-base leading-relaxed text-muted">{lecture.promise}</p>
          <div className="mt-5 grid gap-3">
            {lecture.startFromZero.map((paragraph, index) => (
              <p key={paragraph} className="rounded-lg border border-line bg-white p-4 text-sm leading-relaxed text-muted"><span className="font-medium text-ink">Zero-level pass {index + 1}:</span> {paragraph}</p>
            ))}
          </div>
          <div className="mt-5 grid gap-3">
            <MiniLesson label="Mental model to draw" text={lecture.mentalModel} />
            <MiniLesson label="Why this chapter belongs here" text={lecture.whyNow} tint />
          </div>
          <div className="mt-5 rounded-xl border border-line bg-white p-4">
            <p className="eyebrow mb-3">Original manuscript opening</p>
            <p className="text-sm leading-relaxed text-muted">{manuscript.opening}</p>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            <Link href={`/chapters/${chapter.n}`} className="mono rounded-full border border-cyan bg-cyan px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-white">Open full chapter lab</Link>
            {chapter.n < chapters.length ? <a href={`#book-chapter-${chapter.n + 1}`} className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Next chapter ↓</a> : null}
          </div>
        </div>
        <div className="bg-panel p-6 lg:p-7">
          <div className="rounded-xl border border-line bg-white p-4">
            <div className="mb-3 flex items-start justify-between gap-3">
              <div><p className="eyebrow">Learning contract</p><p className="mt-2 text-sm leading-relaxed text-muted">What you should own before leaving this chapter.</p></div>
              <MotionGlyph label="Learning contract" variant="check" accent="lime" />
            </div>
            <ul className="grid gap-2 text-sm leading-relaxed text-muted">
              {lecture.learningContract.map((item) => <li key={item} className="flex gap-2"><span className="text-lime">•</span><span>{item}</span></li>)}
            </ul>
          </div>

          <div className="mt-5 rounded-xl border border-line bg-panel-2 p-4">
            <p className="eyebrow mb-3">Core vocabulary</p>
            <div className="grid gap-3 md:grid-cols-2">
              {lecture.vocabulary.slice(0, 6).map((item) => (
                <div key={item.name} className="rounded-lg border border-line bg-white p-3">
                  <p className="font-medium text-ink">{item.name}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.plain}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-5 bg-panel p-6 lg:p-7">
        <section className="grid gap-4">
          <div>
            <p className="eyebrow">Zero-knowledge starter ladder</p>
            <h3 className="display mt-2 text-3xl font-medium text-ink">Build the chapter from no RL background before the manuscript begins.</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{starter.rungs.length} starter rungs become {starterModes} plain, visual, technical, and practice modes for this chapter.</p>
          </div>
          <ZeroKnowledgeLadderReader ladders={[starter]} contextTitle={`Chapter ${chapter.n}: ${chapter.title}`} compact />
        </section>
        <section className="grid gap-4">
          <div>
            <p className="eyebrow">Foundation dictionary studio</p>
            <h3 className="display mt-2 text-3xl font-medium text-ink">Define chapter language before equations and algorithms use it.</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{foundationCards.length} foundation terms become {foundationModes} meaning, picture, technical, trap, and teach-back modes for this chapter.</p>
          </div>
          <FoundationDictionaryStudio cards={foundationCards} contextTitle={`Chapter ${chapter.n}: ${chapter.title}`} compact />
        </section>
        <section className="grid gap-4">
          <div>
            <p className="eyebrow">Math rescue studio</p>
            <h3 className="display mt-2 text-3xl font-medium text-ink">Translate chapter math from intuition to notation before manipulating formulas.</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{mathCards.length} mathematical objects become {mathModes} intuition, picture, notation, chapter-use, and self-check modes for this chapter.</p>
          </div>
          <MathRescueStudio cards={mathCards} contextTitle={`Chapter ${chapter.n}: ${chapter.title}`} compact />
        </section>
        <section className="grid gap-4">
          <div>
            <p className="eyebrow">Visual story studio</p>
            <h3 className="display mt-2 text-3xl font-medium text-ink">Watch the chapter as a scene before formulas appear.</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{storyCards.length} scenes become {storyModes} scene, observe, move, technical, and check modes for this chapter.</p>
          </div>
          <VisualStoryStudio cards={storyCards} contextTitle={`Chapter ${chapter.n}: ${chapter.title}`} compact />
        </section>
        <section className="grid gap-4">
          <div>
            <p className="eyebrow">Analogy bridge studio</p>
            <h3 className="display mt-2 text-3xl font-medium text-ink">Map familiar examples to exact RL language.</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{analogyCards.length} analogies become {analogyModes} everyday, mapping, technical, limits, and transfer modes for this chapter.</p>
          </div>
          <AnalogyStudio cards={analogyCards} contextTitle={`Chapter ${chapter.n}: ${chapter.title}`} compact />
        </section>
        <section className="grid gap-4">
          <div>
            <p className="eyebrow">Socratic tutor studio</p>
            <h3 className="display mt-2 text-3xl font-medium text-ink">Turn the chapter into a tutor dialogue.</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{tutorCards.length} tutor cards become {tutorModes} question, hint, board, technical, and try-it modes for this chapter.</p>
          </div>
          <SocraticTutorStudio cards={tutorCards} contextTitle={`Chapter ${chapter.n}: ${chapter.title}`} compact />
        </section>
        <section className="grid gap-4">
          <div>
            <p className="eyebrow">Case study studio</p>
            <h3 className="display mt-2 text-3xl font-medium text-ink">See the chapter working inside complete scenarios.</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{caseStudies.length} case studies become {caseModes} scene, walkthrough, technical, debug, and transfer modes for this chapter.</p>
          </div>
          <CaseStudyStudio cases={caseStudies} contextTitle={`Chapter ${chapter.n}: ${chapter.title}`} compact />
        </section>
        <section className="grid gap-4">
          <div>
            <p className="eyebrow">Guided lecture theater</p>
            <h3 className="display mt-2 text-3xl font-medium text-ink">Move from beginner story to advanced transfer in five slides.</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{theaterSlides} lecture slides expose {theaterModes} beginner, board, technical, equation, and teach-back modes for this chapter.</p>
          </div>
          <ChapterLectureTheater theaters={[theater]} contextTitle={`Chapter ${chapter.n}: ${chapter.title}`} compact />
        </section>
        <section className="grid gap-4">
          <div>
            <p className="eyebrow">Active recall coach</p>
            <h3 className="display mt-2 text-3xl font-medium text-ink">Try the chapter before revealing the answer.</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{practiceCards.length} checkpoints become {practiceModes} prompt, hint, solution, trap, and transfer modes for this chapter.</p>
          </div>
          <ChapterPracticeCoach cards={practiceCards} contextTitle={`Chapter ${chapter.n}: ${chapter.title}`} compact />
        </section>
        <section className="grid gap-4">
          <div>
            <p className="eyebrow">Concept microscope</p>
            <h3 className="display mt-2 text-3xl font-medium text-ink">Make the chapter vocabulary earn its meaning before dense notation.</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{conceptCards.length} concept cards become {conceptModes} plain, visual, technical, contrast, and self-check modes for this chapter.</p>
          </div>
          <ConceptLectureDeck concepts={conceptCards} contextTitle={`Chapter ${chapter.n}: ${chapter.title}`} compact />
        </section>
        <section className="grid gap-4">
          <div>
            <p className="eyebrow">Contextual symbol decoder</p>
            <h3 className="display mt-2 text-3xl font-medium text-ink">Learn the chapter&apos;s notation before reading equations.</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{symbolCards.length} contextual symbol cards become {symbolModes} plain, technical, formula-context, pitfall, and self-check modes for this chapter.</p>
          </div>
          <SymbolDecoder cards={symbolCards} contextTitle={`Chapter ${chapter.n}: ${chapter.title}`} compact />
        </section>
        <section className="grid gap-4">
          <div>
            <p className="eyebrow">Implementation code lab</p>
            <h3 className="display mt-2 text-3xl font-medium text-ink">Translate methods into state, targets, updates, tests, and debug checks.</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{codeCards.length} implementation labs become {codeModes} plain, code, invariant, tiny-test, and debug modes for this chapter.</p>
          </div>
          <CodeLab cards={codeCards} contextTitle={`Chapter ${chapter.n}: ${chapter.title}`} compact />
        </section>
        <section className="grid gap-4">
          <div>
            <p className="eyebrow">Assumption and guarantee clinic</p>
            <h3 className="display mt-2 text-3xl font-medium text-ink">Ask when this method&apos;s promise is actually valid.</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{assumptionCards.length} assumption clinics become {assumptionModes} plain, assumption, guarantee, failure, and repair modes for this chapter.</p>
          </div>
          <AssumptionClinic cards={assumptionCards} contextTitle={`Chapter ${chapter.n}: ${chapter.title}`} compact />
        </section>
        <section className="grid gap-4">
          <div>
            <p className="eyebrow">Method comparison studio</p>
            <h3 className="display mt-2 text-3xl font-medium text-ink">Compare methods before treating any algorithm as a recipe.</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{compareCards.length} comparison cards become {compareModes} choose, axis, tradeoff, failure, and bridge modes for this chapter.</p>
          </div>
          <MethodCompareStudio cards={compareCards} contextTitle={`Chapter ${chapter.n}: ${chapter.title}`} compact />
        </section>
        <section className="grid gap-4">
          <div>
            <p className="eyebrow">Proof intuition lab</p>
            <h3 className="display mt-2 text-3xl font-medium text-ink">Turn chapter claims and equations into believable arguments.</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{proofCards.length} proof cards become {proofModes} plain, claim, proof-sketch, equation-bridge, and stress-test modes for this chapter.</p>
          </div>
          <ProofLab cards={proofCards} contextTitle={`Chapter ${chapter.n}: ${chapter.title}`} compact />
        </section>
        <section className="grid gap-4">
          <div>
            <p className="eyebrow">Chapter exam studio</p>
            <h3 className="display mt-2 text-3xl font-medium text-ink">Prove the chapter with prompts, rubrics, and transfer tests.</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{examCards.length} exam cards become {examModes} prompt, plan, solution, rubric, and transfer modes for this chapter.</p>
          </div>
          <ChapterExamStudio cards={examCards} contextTitle={`Chapter ${chapter.n}: ${chapter.title}`} compact />
        </section>
        <section className="grid gap-4">
          <div>
            <p className="eyebrow">Worked example studio</p>
            <h3 className="display mt-2 text-3xl font-medium text-ink">Turn the chapter into tiny worlds, board traces, and hand checks.</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{workedExamples.length} worked examples become {workedExampleModes} scenario, board, trace, pitfall, and self-check modes for this chapter.</p>
          </div>
          <WorkedExampleStudio examples={workedExamples} contextTitle={`Chapter ${chapter.n}: ${chapter.title}`} compact />
        </section>
        <section className="grid gap-4">
          <div>
            <p className="eyebrow">Misconception clinic</p>
            <h3 className="display mt-2 text-3xl font-medium text-ink">Repair tempting wrong shortcuts before moving on.</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{misconceptionCards.length} misconception cards become {misconceptionModes} mistake, temptation, repair, technical, and self-check modes for this chapter.</p>
          </div>
          <MisconceptionClinic cards={misconceptionCards} contextTitle={`Chapter ${chapter.n}: ${chapter.title}`} compact />
        </section>
        <section className="grid gap-4">
          <div>
            <p className="eyebrow">Chapter simulator lab</p>
            <h3 className="display mt-2 text-3xl font-medium text-ink">Move the chapter&apos;s tradeoff knobs and watch the readouts.</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{simulatorControls} live controls drive {simulatorReadouts} learning, stability, bias, and variance readouts for this chapter.</p>
          </div>
          <ChapterSimulatorLab simulators={[simulator]} contextTitle={`Chapter ${chapter.n}: ${chapter.title}`} compact />
        </section>
        <section className="grid gap-4">
          <div>
            <p className="eyebrow">Bespoke chapter manuscript</p>
            <h3 className="display mt-2 text-3xl font-medium text-ink">Three moves from beginner intuition to technical precision.</h3>
          </div>
          <div className="grid gap-4">
            {manuscript.sections.map((section, index) => (
              <article key={section.title} className="rounded-xl border border-line bg-white p-4">
                <div className="flex flex-wrap gap-2"><Chip accent="cyan">Move {index + 1}</Chip><Chip accent="violet">original prose</Chip></div>
                <h4 className="display mt-3 text-2xl font-medium text-ink">{section.title}</h4>
                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  <MiniLesson label="Beginner explanation" text={section.beginner} />
                  <MiniLesson label="Graphical lecture" text={section.visual} tint />
                  <MiniLesson label="Technical version" text={section.technical} tint />
                  <MiniLesson label="Takeaway" text={section.takeaway} />
                </div>
              </article>
            ))}
          </div>
          <p className="rounded-lg border border-lime/30 bg-lime/[0.06] p-3 text-sm leading-relaxed text-muted"><span className="font-medium text-ink">Chapter landing:</span> {manuscript.closing}</p>
        </section>
        <section className="grid gap-4">
          <div>
            <p className="eyebrow">Interactive blackboard</p>
            <h3 className="display mt-2 text-3xl font-medium text-ink">Click the chapter&apos;s visual learning model.</h3>
          </div>
          <InteractiveBlackboard board={blackboard} compact />
        </section>

        <section className="grid gap-4">
          <div>
            <p className="eyebrow">Interactive section lecturer</p>
            <h3 className="display mt-2 text-3xl font-medium text-ink">Pick any section and switch between beginner, technical, board, formula, algorithm, and check modes.</h3>
          </div>
          <SectionLessonReader lessons={sectionLessons} chapterTitle={`Chapter ${chapter.n}: ${chapter.title}`} compact />
        </section>
        <section className="grid gap-4">
          <div>
            <p className="eyebrow">Section mastery studio</p>
            <h3 className="display mt-2 text-3xl font-medium text-ink">Try each section cold, then reveal the answer.</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{sectionMasteryCards.length} section cards become {sectionMasteryModes} prompt, hint, answer, technical, and transfer modes for this chapter.</p>
          </div>
          <SectionMasteryStudio cards={sectionMasteryCards} contextTitle={`Chapter ${chapter.n}: ${chapter.title}`} compact />
        </section>
        <section className="grid gap-4">
          <div>
            <p className="eyebrow">Exercise solution studio</p>
            <h3 className="display mt-2 text-3xl font-medium text-ink">Attempt, hint, solve, debug, and extend practice problems.</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{exerciseSolutions.length} exercise solution cards become {exerciseSolutionModes} attempt, hint, solution, debug, and extension modes for this chapter.</p>
          </div>
          {exerciseSolutions.length ? <ExerciseSolutionStudio cards={exerciseSolutions} contextTitle={`Chapter ${chapter.n}: ${chapter.title}`} compact /> : <p className="rounded-lg border border-line bg-white p-4 text-sm leading-relaxed text-muted">This chapter has no numbered exercise anchor in the current exercise-coach data, so the solution studio defers to the chapter exam and active recall layers.</p>}
        </section>
        <section className="grid gap-4">
          <div>
            <p className="eyebrow">Interactive formula lecturer</p>
            <h3 className="display mt-2 text-3xl font-medium text-ink">Read each equation as a story, symbol map, trace, use case, and pitfall.</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{formulas.length} chapter formulas become {formulaModes} equation lecture modes in this continuous book view.</p>
          </div>
          <FormulaLectureReader formulas={formulas} contextTitle={`Chapter ${chapter.n}: ${chapter.title}`} compact />
        </section>
        <section className="grid gap-4">
          <div>
            <p className="eyebrow">Full section textbook manuscript</p>
            <h3 className="display mt-2 text-3xl font-medium text-ink">Each section rewritten as a self-contained mini-lesson.</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">These entries are original prose lessons: start from the board story, translate into technical language, guard against the common mistake, and bridge to the next section.</p>
          </div>
          <div className="grid gap-3">
            {sectionLessons.map((lesson, index) => <BookSectionLesson key={lesson.section} lesson={lesson} index={index} />)}
          </div>
        </section>
        <div className="grid gap-3 md:grid-cols-2">
          <MiniLesson label="Hands-on reading sequence" text={lecture.handsOnSequence.join(" ")} />
          <MiniLesson label="Technical finish line" text={lecture.technicalFinish.join(" ")} tint />
        </div>
        <div className="grid gap-4">
          {lecture.beats.map((beat, index) => (
            <details key={beat.section} className="rounded-xl border border-line bg-white p-4" open={index < 2}>
              <summary className="cursor-pointer list-none">
                <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                  <div>
                    <div className="flex flex-wrap gap-2"><Chip accent="cyan">Lesson {index + 1}</Chip><Chip accent="blue">{beat.terms.length ? beat.terms.slice(0, 2).join(" / ") : "concept"}</Chip></div>
                    <h3 className="display mt-3 text-2xl font-medium text-ink">{beat.section}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted"><span className="font-medium text-ink">Question:</span> {beat.question}</p>
                  </div>
                  <span className="mono rounded-full border border-line bg-panel-2 px-3 py-1 text-[11px] uppercase tracking-[0.12em] text-dim">open lesson</span>
                </div>
              </summary>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <MiniLesson label="From scratch" text={beat.fromScratch} />
                <MiniLesson label="Picture it" text={beat.visualLecture} tint />
                <MiniLesson label="Technical build" text={beat.technicalBuild} tint />
                <MiniLesson label="Checkpoint" text={beat.checkpoint} />
              </div>
              <div className="mt-4 rounded-lg border border-line bg-panel p-3">
                <p className="mono mb-2 text-[10px] uppercase tracking-[0.14em] text-dim">Board work</p>
                <ol className="grid gap-1 text-sm leading-relaxed text-muted">
                  {beat.boardWork.map((step, stepIndex) => <li key={step}>{stepIndex + 1}. {step}</li>)}
                </ol>
              </div>
            </details>
          ))}
        </div>
      </div>
    </article>
  );
}

function BookSectionLesson({ lesson, index }: { lesson: SectionTextbookLesson; index: number }) {
  return (
    <details className="rounded-xl border border-line bg-white p-4" open={index === 0}>
      <summary className="cursor-pointer list-none">
        <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="flex flex-wrap gap-2"><Chip accent="cyan">Section manuscript {index + 1}</Chip><Chip accent="blue">{lesson.terms.slice(0, 2).join(" / ")}</Chip></div>
            <h4 className="display mt-3 text-2xl font-medium text-ink">{lesson.section}</h4>
            <p className="mt-2 text-sm leading-relaxed text-muted">{lesson.opener}</p>
          </div>
          <span className="mono rounded-full border border-line bg-panel-2 px-3 py-1 text-[11px] uppercase tracking-[0.12em] text-dim">read section</span>
        </div>
      </summary>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <MiniLesson label="From scratch" text={lesson.fromScratch} />
        <MiniLesson label="Technical pass" text={lesson.technicalPass} tint />
        <MiniLesson label="Formula bridge" text={lesson.formulaBridge} tint />
        <MiniLesson label="Algorithm bridge" text={lesson.algorithmBridge} />
        <MiniLesson label="Misconception guard" text={lesson.misconceptionGuard} />
        <MiniLesson label="Self-check" text={lesson.selfCheck} tint />
      </div>
      <div className="mt-4 rounded-lg border border-line bg-panel p-3">
        <p className="mono mb-2 text-[10px] uppercase tracking-[0.14em] text-dim">Board walkthrough</p>
        <ol className="grid gap-1 text-sm leading-relaxed text-muted">
          {lesson.boardWalkthrough.map((step, stepIndex) => <li key={step}>{stepIndex + 1}. {step}</li>)}
        </ol>
      </div>
      <p className="mt-4 rounded-lg border border-lime/30 bg-lime/[0.06] p-3 text-sm leading-relaxed text-muted"><span className="font-medium text-ink">Next link:</span> {lesson.nextLink}</p>
    </details>
  );
}

function MiniLesson({ label, text, tint = false }: { label: string; text: string; tint?: boolean }) {
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

function glyphVariantForLabel(label: string): "loop" | "bars" | "tree" | "target" | "formula" | "check" {
  if (/technical|formula|equation|gradient|finish|proof/i.test(label)) return "formula";
  if (/exam|rubric|transfer|section mastery/i.test(label)) return "check";
  if (/sequence|step|board|lesson/i.test(label)) return "bars";
  if (/chapter|model|vocabulary|contract/i.test(label)) return "tree";
  if (/checkpoint|check|finish|exam|rubric|transfer|section mastery/i.test(label)) return "check";
  if (/goal|promise|target/i.test(label)) return "target";
  return "loop";
}

function glyphAccentForLabel(label: string): "cyan" | "orange" | "blue" | "violet" | "lime" {
  if (/warning|trap|risk/i.test(label)) return "orange";
  if (/technical|formula|gradient/i.test(label)) return "violet";
  if (/checkpoint|check|finish|contract|section mastery|transfer/i.test(label)) return "lime";
  if (/chapter|vocabulary|model/i.test(label)) return "blue";
  return "cyan";
}

import { algorithmCatalog, algorithmsForChapter } from "@/lib/algorithmCatalog";
import { analogiesForChapter, analogyAnchorCount, analogyCardCount, analogyChapterCount, analogyMappingCount, analogyModeCount, analogyModes, analogySourceCount } from "@/lib/analogies";
import { assumptionCardCount, assumptionCardsForChapter, assumptionChapterCount, assumptionClinicModes, assumptionModeCount } from "@/lib/assumptionClinic";
import { algorithmDerivation } from "@/lib/algorithmDerivations";
import { algorithmDossier } from "@/lib/algorithmDossier";
import { algorithmProfile, profileRows } from "@/lib/algorithmProfiles";
import { sourceAuditsForChapter } from "@/lib/algorithmSourceAudit";
import { workedExampleForAlgorithm } from "@/lib/algorithmWorkedExamples";
import { bookIndexChapterCount, bookIndexEntryCount, bookIndexLayerCount } from "@/lib/bookIndex";
import { chapterDependencyMap } from "@/lib/chapterDependencyMap";
import { chapterExamCardCount, chapterExamCardsForChapter, chapterExamChapterCount, chapterExamModeCount, chapterExamModes } from "@/lib/chapterExam";
import { chapterSynthesis } from "@/lib/chapterSynthesis";
import { chapterDeepDives } from "@/lib/deepDives";
import { evidenceGuideItems } from "@/lib/evidenceGuide";
import { exerciseCoachCards } from "@/lib/exerciseCoach";
import { exerciseSolutionCardCount, exerciseSolutionCardsForChapter, exerciseSolutionChapterCount, exerciseSolutionModeCount, exerciseSolutionModes } from "@/lib/exerciseSolutionStudio";
import { practiceCardCount, practiceCardsForChapter, practiceModeCount, practiceModes } from "@/lib/chapterPractice";
import { conceptCardCount, conceptCardsForChapter, conceptLectureModes, conceptModeCount } from "@/lib/conceptAtlas";
import { workedExampleCount, workedExampleModeCount, workedExampleModes, workedExamplesForChapter } from "@/lib/chapterWorkedExamples";
import { misconceptionCardCount, misconceptionCardsForChapter, misconceptionModeCount, misconceptionModes } from "@/lib/chapterMisconceptions";
import { lectureTheaterCount, lectureTheaterForChapter, lectureTheaterModeCount, lectureTheaterSlideCount, theaterModes as theaterModeKinds } from "@/lib/chapterLectureTheater";
import { simulatorControlCount, simulatorCount, simulatorForChapter, simulatorReadoutCount, simulatorReadouts } from "@/lib/chapterSimulators";
import { codeLabCardCount, codeLabCardsForChapter, codeLabChapterCount, codeLabModeCount, codeLabModes } from "@/lib/codeLab";
import { formulaAtlas, formulaLectureModeCount, formulaLectureModes, formulasForChapter } from "@/lib/formulaAtlas";
import { foundationDictionaryCardCount, foundationDictionaryCardsForChapter, foundationDictionaryChapterCount, foundationDictionaryModeCount, foundationDictionaryModes, foundationDictionarySourceCount, foundationDictionaryTermCount } from "@/lib/foundationDictionary";
import { mathRescueCardCount, mathRescueCardsForChapter, mathRescueChapterCount, mathRescueModeCount, mathRescueModes, mathRescueObjectCount, mathRescueSourceCount, mathRescueSymbolCount } from "@/lib/mathRescue";
import { visualStoriesForChapter, visualStoryActorCount, visualStoryCardCount, visualStoryChapterCount, visualStoryModeCount, visualStoryModes, visualStoryPropCount, visualStorySceneCount, visualStorySourceCount } from "@/lib/visualStory";
import { proofCardCount, proofCardsForChapter, proofChapterCount, proofLabModes, proofModeCount } from "@/lib/proofLab";
import { sectionMasteryCardCount, sectionMasteryCardsForChapter, sectionMasteryChapterCount, sectionMasteryModeCount, sectionMasteryModes } from "@/lib/sectionMastery";
import { chapterMastery } from "@/lib/mastery";
import { manuscriptForChapter, manuscriptSectionCount } from "@/lib/chapterManuscripts";
import { blackboardForChapter, blackboardStageCount } from "@/lib/interactiveBlackboards";
import { learningGraphChapterCount, learningGraphEdgeCount, learningGraphForChapter, learningGraphNodeCount } from "@/lib/learningGraph";
import { methodCompareCardCount, methodCompareCardsForChapter, methodCompareChapterCount, methodCompareFamilyCount, methodCompareModeCount, methodCompareModes } from "@/lib/methodCompare";
import { chapters } from "@/lib/paper";
import { sectionLessonModeCount, sectionLessonModes, sectionLessonsForChapter, sectionNarrativeCount } from "@/lib/sectionNarratives";
import { socraticModes, socraticTutorAnchorCount, socraticTutorBoardStepCount, socraticTutorCardCount, socraticTutorCardsForChapter, socraticTutorChapterCount, socraticTutorModeCount, socraticTutorSourceCount, socraticTutorTurnCount } from "@/lib/socraticTutor";
import { caseStudiesForChapter, caseStudyAnchorCount, caseStudyBoardFrameCount, caseStudyCardCount, caseStudyChapterCount, caseStudyModeCount, caseStudyModes, caseStudySourceCount, caseStudySuccessCriteriaCount } from "@/lib/caseStudies";
import { standaloneLectureForChapter, standaloneLectureTileCount } from "@/lib/standaloneBook";
import { symbolCardCount, symbolCardsForChapter, symbolChapterCount, symbolLectureModeCount, symbolLectureModes, uniqueSymbolCount } from "@/lib/symbolAtlas";
import { zeroKnowledgeLadderForChapter, zeroKnowledgeModeCount, zeroKnowledgeModes, zeroKnowledgeRungCount } from "@/lib/zeroKnowledgeLadders";

export interface RequirementProof {
  label: string;
  status: "complete" | "warning";
  evidence: string;
  easy: string;
  technical: string;
}

export interface ChapterCoverageRow {
  chapter: number;
  title: string;
  route: string;
  algorithms: number;
  sourceCues: number;
  zeroKnowledgeRungs: number;
  zeroKnowledgeModes: number;
  foundationDictionaryCards: number;
  foundationDictionaryModes: number;
  mathRescueCards: number;
  mathRescueModes: number;
  visualStoryCards: number;
  visualStoryModes: number;
  analogyCards: number;
  analogyModes: number;
  socraticTutorCards: number;
  socraticTutorModes: number;
  socraticTutorTurns: number;
  socraticTutorBoardSteps: number;
  caseStudies: number;
  caseStudyModes: number;
  caseStudyBoardFrames: number;
  caseStudySuccessCriteria: number;
  lectureTheaters: number;
  lectureTheaterSlides: number;
  lectureTheaterModes: number;
  practiceCards: number;
  practiceInteractiveModes: number;
  conceptCards: number;
  conceptInteractiveModes: number;
  workedExamples: number;
  workedExampleInteractiveModes: number;
  misconceptionCards: number;
  misconceptionInteractiveModes: number;
  simulators: number;
  simulatorControls: number;
  simulatorReadouts: number;
  searchIndexEntries: number;
  learningGraphNodes: number;
  learningGraphEdges: number;
  symbolCards: number;
  symbolModes: number;
  codeLabs: number;
  codeLabModes: number;
  assumptionClinics: number;
  assumptionModes: number;
  methodComparisons: number;
  methodCompareModes: number;
  proofCards: number;
  proofModes: number;
  examCards: number;
  examModes: number;
  sectionMasteryCards: number;
  sectionMasteryModes: number;
  manuscriptSections: number;
  blackboardStages: number;
  sectionNarratives: number;
  sectionInteractiveModes: number;
  lectureBeats: number;
  sectionNotes: number;
  masteryTiles: number;
  formulas: number;
  formulaInteractiveModes: number;
  evidenceAnchors: number;
  exerciseGuides: number;
  exerciseSolutions: number;
  exerciseSolutionModes: number;
  synthesisGates: number;
  dependencyGates: number;
  layers: string[];
  warnings: string[];
}

export interface AlgorithmCoverageRow {
  id: string;
  chapter: number;
  name: string;
  route: string;
  family: string;
  sourceCueCount: number;
  easyTechnical: boolean;
  operationalSteps: number;
  pseudocodeLines: number;
  equations: number;
  implementationNotes: number;
  failureModes: number;
  dossierSections: number;
  derivationSteps: number;
  profileAxes: number;
  workedCalculations: number;
  workedChecks: number;
  status: "complete" | "warning";
  proof: string;
}

export interface CoverageAudit {
  generatedFrom: string;
  totals: {
    chapters: number;
    bookReaderRoutes: number;
    chapterRoutes: number;
    algorithms: number;
    algorithmFamilies: number;
    sourceCues: number;
    zeroKnowledgeRungs: number;
    zeroKnowledgeModes: number;
    foundationDictionaryCards: number;
    foundationDictionaryModes: number;
    foundationDictionaryChapters: number;
    foundationDictionaryTerms: number;
    foundationDictionarySources: number;
    mathRescueCards: number;
    mathRescueModes: number;
    mathRescueChapters: number;
    mathRescueObjects: number;
    mathRescueSymbols: number;
    mathRescueSources: number;
    visualStoryCards: number;
    visualStoryModes: number;
    visualStoryChapters: number;
    visualStoryScenes: number;
    visualStoryActors: number;
    visualStoryProps: number;
    visualStorySources: number;
    analogyCards: number;
    analogyModes: number;
    analogyChapters: number;
    analogyMappings: number;
    analogyAnchors: number;
    analogySources: number;
    socraticTutorCards: number;
    socraticTutorModes: number;
    socraticTutorChapters: number;
    socraticTutorTurns: number;
    socraticTutorBoardSteps: number;
    socraticTutorAnchors: number;
    socraticTutorSources: number;
    caseStudies: number;
    caseStudyModes: number;
    caseStudyChapters: number;
    caseStudyBoardFrames: number;
    caseStudySuccessCriteria: number;
    caseStudyAnchors: number;
    caseStudySources: number;
    lectureTheaters: number;
    lectureTheaterSlides: number;
    lectureTheaterModes: number;
    practiceCards: number;
    practiceInteractiveModes: number;
    conceptCards: number;
    conceptInteractiveModes: number;
    workedExamples: number;
    workedExampleInteractiveModes: number;
    misconceptionCards: number;
    misconceptionInteractiveModes: number;
    simulators: number;
    simulatorControls: number;
    simulatorReadouts: number;
    searchIndexEntries: number;
    searchIndexLayers: number;
    searchIndexedChapters: number;
    learningGraphNodes: number;
    learningGraphEdges: number;
    learningGraphChapters: number;
    symbolCards: number;
    symbolModes: number;
    uniqueSymbols: number;
    symbolChapters: number;
    codeLabs: number;
    codeLabModes: number;
    codeLabChapters: number;
    assumptionClinics: number;
    assumptionModes: number;
    assumptionChapters: number;
    methodComparisons: number;
    methodCompareModes: number;
    methodCompareChapters: number;
    methodCompareFamilies: number;
    proofCards: number;
    proofModes: number;
    proofChapters: number;
    examCards: number;
    examModes: number;
    examChapters: number;
    sectionMasteryCards: number;
    sectionMasteryModes: number;
    sectionMasteryChapters: number;
    manuscriptSections: number;
    blackboardStages: number;
    sectionNarratives: number;
    sectionInteractiveModes: number;
    lectureBeats: number;
    sectionNotes: number;
    masteryTiles: number;
    formulas: number;
    formulaInteractiveModes: number;
    evidenceAnchors: number;
    exerciseGuides: number;
    exerciseSolutions: number;
    exerciseSolutionModes: number;
    exerciseSolutionChapters: number;
    completeAlgorithms: number;
    warnings: number;
  };
  requirements: RequirementProof[];
  chapters: ChapterCoverageRow[];
  algorithms: AlgorithmCoverageRow[];
}

export function buildCoverageAudit(): CoverageAudit {
  const chapterRows = chapters.map((chapter) => chapterCoverageRow(chapter.n));
  const algorithmRows = algorithmCatalog.map(algorithmCoverageRow);
  const sourceCues = chapters.reduce((sum, chapter) => sum + sourceAuditsForChapter(chapter.n).length, 0);
  const zeroKnowledgeRungs = zeroKnowledgeRungCount();
  const zeroKnowledgeModeTotal = zeroKnowledgeModeCount();
  const foundationCards = foundationDictionaryCardCount();
  const foundationModeTotal = foundationDictionaryModeCount();
  const foundationChapters = foundationDictionaryChapterCount();
  const foundationTerms = foundationDictionaryTermCount();
  const foundationSources = foundationDictionarySourceCount();
  const mathRescueCards = mathRescueCardCount();
  const mathRescueModeTotal = mathRescueModeCount();
  const mathRescueChapters = mathRescueChapterCount();
  const mathRescueObjects = mathRescueObjectCount();
  const mathRescueSymbols = mathRescueSymbolCount();
  const mathRescueSources = mathRescueSourceCount();
  const visualStories = visualStoryCardCount();
  const visualStoryModeTotal = visualStoryModeCount();
  const visualStoryChapters = visualStoryChapterCount();
  const visualStoryScenes = visualStorySceneCount();
  const visualStoryActors = visualStoryActorCount();
  const visualStoryProps = visualStoryPropCount();
  const visualStorySources = visualStorySourceCount();
  const analogyCards = analogyCardCount();
  const analogyModeTotal = analogyModeCount();
  const analogyChapters = analogyChapterCount();
  const analogyMappings = analogyMappingCount();
  const analogyAnchors = analogyAnchorCount();
  const analogySources = analogySourceCount();
  const socraticTutorCards = socraticTutorCardCount();
  const socraticTutorModeTotal = socraticTutorModeCount();
  const socraticTutorChapters = socraticTutorChapterCount();
  const socraticTutorTurns = socraticTutorTurnCount();
  const socraticTutorBoardSteps = socraticTutorBoardStepCount();
  const socraticTutorAnchors = socraticTutorAnchorCount();
  const socraticTutorSources = socraticTutorSourceCount();
  const caseStudies = caseStudyCardCount();
  const caseStudyModeTotal = caseStudyModeCount();
  const caseStudyChapters = caseStudyChapterCount();
  const caseStudyBoardFrames = caseStudyBoardFrameCount();
  const caseStudySuccessCriteria = caseStudySuccessCriteriaCount();
  const caseStudyAnchors = caseStudyAnchorCount();
  const caseStudySources = caseStudySourceCount();
  const lectureTheaters = lectureTheaterCount();
  const lectureTheaterSlides = lectureTheaterSlideCount();
  const lectureTheaterModeTotal = lectureTheaterModeCount();
  const activeRecallCards = practiceCardCount();
  const activeRecallModes = practiceModeCount();
  const conceptCards = conceptCardCount();
  const conceptModes = conceptModeCount();
  const workedExamples = workedExampleCount();
  const workedExampleModesTotal = workedExampleModeCount();
  const misconceptionCards = misconceptionCardCount();
  const misconceptionModeTotal = misconceptionModeCount();
  const simulatorTotal = simulatorCount();
  const simulatorControls = simulatorControlCount();
  const simulatorReadoutTotal = simulatorReadoutCount();
  const searchIndexEntries = bookIndexEntryCount();
  const searchIndexLayers = bookIndexLayerCount();
  const searchIndexedChapters = bookIndexChapterCount();
  const learningGraphNodes = learningGraphNodeCount();
  const learningGraphEdges = learningGraphEdgeCount();
  const learningGraphChapters = learningGraphChapterCount();
  const symbolCards = symbolCardCount();
  const symbolModes = symbolLectureModeCount();
  const uniqueSymbols = uniqueSymbolCount();
  const symbolChapters = symbolChapterCount();
  const codeLabs = codeLabCardCount();
  const codeLabModeTotal = codeLabModeCount();
  const codeLabChapters = codeLabChapterCount();
  const assumptionClinics = assumptionCardCount();
  const assumptionModeTotal = assumptionModeCount();
  const assumptionChapters = assumptionChapterCount();
  const methodComparisons = methodCompareCardCount();
  const methodCompareModeTotal = methodCompareModeCount();
  const methodCompareChapters = methodCompareChapterCount();
  const methodCompareFamilies = methodCompareFamilyCount();
  const proofCards = proofCardCount();
  const proofModes = proofModeCount();
  const proofChapters = proofChapterCount();
  const examCards = chapterExamCardCount();
  const examModes = chapterExamModeCount();
  const examChapters = chapterExamChapterCount();
  const sectionMasteryCards = sectionMasteryCardCount();
  const sectionMasteryModeTotal = sectionMasteryModeCount();
  const sectionMasteryChapters = sectionMasteryChapterCount();
  const exerciseSolutions = exerciseSolutionCardCount();
  const exerciseSolutionModeTotal = exerciseSolutionModeCount();
  const exerciseSolutionChapters = exerciseSolutionChapterCount();
  const manuscriptSections = manuscriptSectionCount();
  const blackboardStages = blackboardStageCount();
  const sectionNarratives = sectionNarrativeCount();
  const sectionInteractiveModes = sectionLessonModeCount();
  const formulaInteractiveModes = formulaLectureModeCount();
  const lectureBeats = standaloneLectureTileCount();
  const sectionNotes = chapters.reduce((sum, chapter) => sum + (chapterDeepDives[chapter.n]?.sectionDetails.length ?? 0), 0);
  const masteryTiles = chapterMastery.reduce((sum, chapter) => sum + chapter.derivations.length + chapter.process.length + chapter.traps.length + chapter.checks.length, 0);
  const warnings = chapterRows.reduce((sum, row) => sum + row.warnings.length, 0) + algorithmRows.filter((row) => row.status === "warning").length;
  const completeAlgorithms = algorithmRows.filter((row) => row.status === "complete").length;

  const totals = {
    chapters: chapters.length,
    bookReaderRoutes: 1,
    chapterRoutes: chapterRows.length,
    algorithms: algorithmCatalog.length,
    algorithmFamilies: new Set(algorithmCatalog.map((algorithm) => algorithm.family)).size,
    sourceCues,
    zeroKnowledgeRungs,
    zeroKnowledgeModes: zeroKnowledgeModeTotal,
    foundationDictionaryCards: foundationCards,
    foundationDictionaryModes: foundationModeTotal,
    foundationDictionaryChapters: foundationChapters,
    foundationDictionaryTerms: foundationTerms,
    foundationDictionarySources: foundationSources,
    mathRescueCards,
    mathRescueModes: mathRescueModeTotal,
    mathRescueChapters,
    mathRescueObjects,
    mathRescueSymbols,
    mathRescueSources,
    visualStoryCards: visualStories,
    visualStoryModes: visualStoryModeTotal,
    visualStoryChapters,
    visualStoryScenes,
    visualStoryActors,
    visualStoryProps,
    visualStorySources,
    analogyCards,
    analogyModes: analogyModeTotal,
    analogyChapters,
    analogyMappings,
    analogyAnchors,
    analogySources,
    socraticTutorCards,
    socraticTutorModes: socraticTutorModeTotal,
    socraticTutorChapters,
    socraticTutorTurns,
    socraticTutorBoardSteps,
    socraticTutorAnchors,
    socraticTutorSources,
    caseStudies,
    caseStudyModes: caseStudyModeTotal,
    caseStudyChapters,
    caseStudyBoardFrames,
    caseStudySuccessCriteria,
    caseStudyAnchors,
    caseStudySources,
    lectureTheaters,
    lectureTheaterSlides,
    lectureTheaterModes: lectureTheaterModeTotal,
    practiceCards: activeRecallCards,
    practiceInteractiveModes: activeRecallModes,
    conceptCards,
    conceptInteractiveModes: conceptModes,
    workedExamples,
    workedExampleInteractiveModes: workedExampleModesTotal,
    misconceptionCards,
    misconceptionInteractiveModes: misconceptionModeTotal,
    simulators: simulatorTotal,
    simulatorControls,
    simulatorReadouts: simulatorReadoutTotal,
    searchIndexEntries,
    searchIndexLayers,
    searchIndexedChapters,
    learningGraphNodes,
    learningGraphEdges,
    learningGraphChapters,
    symbolCards,
    symbolModes,
    uniqueSymbols,
    symbolChapters,
    codeLabs,
    codeLabModes: codeLabModeTotal,
    codeLabChapters,
    assumptionClinics,
    assumptionModes: assumptionModeTotal,
    assumptionChapters,
    methodComparisons,
    methodCompareModes: methodCompareModeTotal,
    methodCompareChapters,
    methodCompareFamilies,
    proofCards,
    proofModes,
    proofChapters,
    examCards,
    examModes,
    examChapters,
    sectionMasteryCards,
    sectionMasteryModes: sectionMasteryModeTotal,
    sectionMasteryChapters,
    exerciseSolutions,
    exerciseSolutionModes: exerciseSolutionModeTotal,
    exerciseSolutionChapters,
    manuscriptSections,
    blackboardStages,
    sectionNarratives,
    sectionInteractiveModes,
    lectureBeats,
    sectionNotes,
    masteryTiles,
    formulas: formulaAtlas.length,
    formulaInteractiveModes,
    evidenceAnchors: evidenceGuideItems.length,
    exerciseGuides: exerciseCoachCards.length,
    completeAlgorithms,
    warnings,
  };

  return {
    generatedFrom: "current repository data modules at build/render time",
    totals,
    requirements: requirementProofs(totals),
    chapters: chapterRows,
    algorithms: algorithmRows,
  };
}

function chapterCoverageRow(chapterNumber: number): ChapterCoverageRow {
  const chapter = chapters.find((candidate) => candidate.n === chapterNumber);
  if (!chapter) throw new Error(`Missing chapter ${chapterNumber}`);

  const algorithms = algorithmsForChapter(chapterNumber);
  const mastery = chapterMastery.find((entry) => entry.n === chapterNumber);
  const synthesis = chapterSynthesis(chapter, algorithms);
  const dependencies = chapterDependencyMap(chapter, chapters, algorithms);
  const deep = chapterDeepDives[chapterNumber];
  const formulas = formulasForChapter(chapterNumber);
  const formulaInteractiveModes = formulaLectureModeCount(chapterNumber);
  const evidence = evidenceGuideItems.filter((item) => item.chapter === chapterNumber);
  const exercises = exerciseCoachCards.filter((item) => item.chapter === chapterNumber);
  const exerciseSolutions = exerciseSolutionCardsForChapter(chapterNumber);
  const exerciseSolutionModeTotal = exerciseSolutionModeCount(chapterNumber);
  const sourceCues = sourceAuditsForChapter(chapterNumber);
  const starter = zeroKnowledgeLadderForChapter(chapterNumber);
  const foundationCards = foundationDictionaryCardsForChapter(chapterNumber);
  const foundationModeTotal = foundationDictionaryModeCount(chapterNumber);
  const mathCards = mathRescueCardsForChapter(chapterNumber);
  const mathModeTotal = mathRescueModeCount(chapterNumber);
  const visualStories = visualStoriesForChapter(chapterNumber);
  const visualStoryModeTotal = visualStoryModeCount(chapterNumber);
  const analogyCards = analogiesForChapter(chapterNumber);
  const analogyModeTotal = analogyModeCount(chapterNumber);
  const socraticTutorCards = socraticTutorCardsForChapter(chapterNumber);
  const socraticTutorModeTotal = socraticTutorModeCount(chapterNumber);
  const socraticTutorTurnTotal = socraticTutorTurnCount(chapterNumber);
  const socraticTutorBoardStepTotal = socraticTutorBoardStepCount(chapterNumber);
  const caseStudies = caseStudiesForChapter(chapterNumber);
  const caseStudyModeTotal = caseStudyModeCount(chapterNumber);
  const caseStudyBoardFrameTotal = caseStudyBoardFrameCount(chapterNumber);
  const caseStudySuccessCriteriaTotal = caseStudySuccessCriteriaCount(chapterNumber);
  const theater = lectureTheaterForChapter(chapterNumber);
  const theaterSlides = lectureTheaterSlideCount(chapterNumber);
  const theaterModeTotal = lectureTheaterModeCount(chapterNumber);
  const practiceCards = practiceCardsForChapter(chapterNumber);
  const activeRecallModes = practiceModeCount(chapterNumber);
  const conceptCards = conceptCardsForChapter(chapterNumber);
  const conceptModes = conceptModeCount(chapterNumber);
  const workedExamples = workedExamplesForChapter(chapterNumber);
  const workedModes = workedExampleModeCount(chapterNumber);
  const misconceptionCards = misconceptionCardsForChapter(chapterNumber);
  const clinicModes = misconceptionModeCount(chapterNumber);
  const simulator = simulatorForChapter(chapterNumber);
  const simulatorControls = simulatorControlCount(chapterNumber);
  const simulatorReadoutTotal = simulatorReadoutCount(chapterNumber);
  const searchIndexEntries = bookIndexEntryCount(chapterNumber);
  const learningGraph = learningGraphForChapter(chapterNumber);
  const learningGraphNodes = learningGraphNodeCount(chapterNumber);
  const learningGraphEdges = learningGraphEdgeCount(chapterNumber);
  const symbolCards = symbolCardsForChapter(chapterNumber);
  const symbolModes = symbolLectureModeCount(chapterNumber);
  const codeLabs = codeLabCardsForChapter(chapterNumber);
  const codeLabModeTotal = codeLabModeCount(chapterNumber);
  const assumptionClinics = assumptionCardsForChapter(chapterNumber);
  const assumptionModeTotal = assumptionModeCount(chapterNumber);
  const methodComparisons = methodCompareCardsForChapter(chapterNumber);
  const methodCompareModeTotal = methodCompareModeCount(chapterNumber);
  const proofCards = proofCardsForChapter(chapterNumber);
  const proofModeTotal = proofModeCount(chapterNumber);
  const examCards = chapterExamCardsForChapter(chapterNumber);
  const examModeTotal = chapterExamModeCount(chapterNumber);
  const sectionMasteryCards = sectionMasteryCardsForChapter(chapterNumber);
  const sectionMasteryModeTotal = sectionMasteryModeCount(chapterNumber);
  const manuscript = manuscriptForChapter(chapterNumber);
  const blackboard = blackboardForChapter(chapterNumber);
  const sectionLessons = sectionLessonsForChapter(chapterNumber);
  const lecture = standaloneLectureForChapter(chapter);

  const masteryTiles = mastery ? mastery.derivations.length + mastery.process.length + mastery.traps.length + mastery.checks.length : 0;
  const layers = [
    "standalone route",
    "zero-knowledge starter ladder",
    "foundation dictionary studio",
    "math rescue studio",
    "visual story studio",
    "analogy bridge studio",
    "Socratic tutor studio",
    "case study studio",
    "guided lecture theater",
    "active recall practice coach",
    "concept microscope",
    "worked example studio",
    "misconception clinic",
    "chapter simulator lab",
    "whole-book search index",
    "interactive learning graph",
    "contextual symbol decoder",
    "implementation code lab",
    "assumption guarantee clinic",
    "method comparison studio",
    "proof intuition lab",
    "chapter exam studio",
    "section mastery studio",
    "exercise solution studio",
    "original manuscript",
    "interactive blackboard",
    "section textbook manuscript",
    "interactive section lecturer",
    "from-scratch lecture",
    "chapter synthesis ladder",
    "cross-chapter dependency map",
    "book-source algorithm audit",
    "algorithmic machinery",
    "section deep dives",
    "mastery notebook",
    "formula atlas",
    "interactive formula lecturer",
    "figure/example anchors",
    "exercise coach",
  ];
  const warnings = [
    algorithms.length ? "" : "No algorithm cards found for this chapter.",
    sourceCues.length ? "" : "No source-audit cues found for this chapter.",
    starter.rungs.length >= 5 ? "" : "Zero-knowledge starter ladder has fewer than five rungs.",
    starter.rungs.length * zeroKnowledgeModes.length >= 20 ? "" : "Zero-knowledge starter ladder does not expose all four modes for every rung.",
    foundationCards.length >= 10 ? "" : "Foundation dictionary studio has fewer than ten chapter terms.",
    foundationCards.length * foundationDictionaryModes.length === foundationModeTotal ? "" : "Foundation dictionary studio count does not match mode coverage.",
    mathCards.length >= 8 ? "" : "Math rescue studio has fewer than eight chapter objects.",
    mathCards.length * mathRescueModes.length === mathModeTotal ? "" : "Math rescue studio count does not match mode coverage.",
    visualStories.length >= 8 ? "" : "Visual story studio has fewer than eight chapter scenes.",
    visualStories.length * visualStoryModes.length === visualStoryModeTotal ? "" : "Visual story studio count does not match mode coverage.",
    analogyCards.length >= 6 ? "" : "Analogy bridge studio has fewer than six chapter analogies.",
    analogyCards.length * analogyModes.length === analogyModeTotal ? "" : "Analogy bridge studio count does not match mode coverage.",
    socraticTutorCards.length >= 6 ? "" : "Socratic tutor studio has fewer than six chapter tutor cards.",
    socraticTutorCards.length * socraticModes.length === socraticTutorModeTotal ? "" : "Socratic tutor studio count does not match mode coverage.",
    socraticTutorBoardStepTotal >= socraticTutorCards.length * 4 ? "" : "Socratic tutor studio has fewer than four board steps per card.",
    caseStudies.length >= 4 ? "" : "Case study studio has fewer than four chapter cases.",
    caseStudies.length * caseStudyModes.length === caseStudyModeTotal ? "" : "Case study studio count does not match mode coverage.",
    caseStudyBoardFrameTotal >= caseStudies.length * 4 ? "" : "Case study studio has fewer than four board frames per case.",
    caseStudySuccessCriteriaTotal >= caseStudies.length * 4 ? "" : "Case study studio has fewer than four success checks per case.",
    theater.slides.length >= 5 ? "" : "Guided lecture theater has fewer than five slides.",
    theater.slides.length * theaterModeKinds.length === theaterModeTotal ? "" : "Guided lecture theater count does not match mode coverage.",
    practiceCards.length >= 5 ? "" : "Active recall practice coach has fewer than five checkpoints.",
    practiceCards.length * practiceModes.length === activeRecallModes ? "" : "Active recall practice coach count does not match practice mode coverage.",
    conceptCards.length >= 6 ? "" : "Concept microscope has fewer than six chapter concepts.",
    conceptCards.length * conceptLectureModes.length === conceptModes ? "" : "Concept microscope count does not match concept mode coverage.",
    workedExamples.length >= 5 ? "" : "Worked example studio has fewer than five examples.",
    workedExamples.length * workedExampleModes.length === workedModes ? "" : "Worked example studio count does not match mode coverage.",
    misconceptionCards.length >= 5 ? "" : "Misconception clinic has fewer than five cards.",
    misconceptionCards.length * misconceptionModes.length === clinicModes ? "" : "Misconception clinic count does not match mode coverage.",
    simulator.controls.length >= 3 ? "" : "Chapter simulator has fewer than three live controls.",
    simulatorReadoutTotal >= simulatorReadouts.length ? "" : "Chapter simulator does not expose all readouts.",
    searchIndexEntries >= 30 ? "" : "Chapter search index has fewer than thirty searchable entries.",
    learningGraph.nodes.length >= 20 ? "" : "Learning graph has fewer than twenty nodes.",
    learningGraph.edges.length >= 18 ? "" : "Learning graph has fewer than eighteen links.",
    symbolCards.length >= formulas.length ? "" : "Contextual symbol decoder has fewer symbol cards than formula cards.",
    symbolCards.length * symbolLectureModes.length === symbolModes ? "" : "Contextual symbol decoder count does not match mode coverage.",
    codeLabs.length >= algorithms.length ? "" : "Implementation code lab has fewer cards than algorithm cards.",
    codeLabs.length * codeLabModes.length === codeLabModeTotal ? "" : "Implementation code lab count does not match mode coverage.",
    assumptionClinics.length >= algorithms.length ? "" : "Assumption clinic has fewer cards than algorithm cards.",
    assumptionClinics.length * assumptionClinicModes.length === assumptionModeTotal ? "" : "Assumption clinic count does not match mode coverage.",
    methodComparisons.length >= algorithms.length ? "" : "Method comparison studio has fewer cards than algorithm cards.",
    methodComparisons.length * methodCompareModes.length === methodCompareModeTotal ? "" : "Method comparison studio count does not match mode coverage.",
    proofCards.length >= formulas.length + 1 ? "" : "Proof lab has fewer cards than chapter formulas plus the chapter proof spine.",
    proofCards.length * proofLabModes.length === proofModeTotal ? "" : "Proof lab count does not match mode coverage.",
    examCards.length >= 7 ? "" : "Chapter exam studio has fewer than seven exam cards.",
    examCards.length * chapterExamModes.length === examModeTotal ? "" : "Chapter exam studio count does not match mode coverage.",
    sectionMasteryCards.length >= sectionLessons.length ? "" : "Section mastery studio does not cover every section lesson.",
    sectionMasteryCards.length * sectionMasteryModes.length === sectionMasteryModeTotal ? "" : "Section mastery studio count does not match mode coverage.",
    exercises.length === 0 || exerciseSolutions.length >= exercises.length ? "" : "Exercise solution studio has fewer solution cards than exercise guides.",
    exercises.length === 0 || exerciseSolutions.length * exerciseSolutionModes.length === exerciseSolutionModeTotal ? "" : "Exercise solution studio count does not match mode coverage.",
    manuscript.sections.length >= 3 ? "" : "Original manuscript has fewer than three chapter-specific moves.",
    blackboard.stages.length >= 4 ? "" : "Interactive blackboard has fewer than four stages.",
    sectionLessons.length >= (deep?.sectionDetails.length ?? chapter.sections.length) ? "" : "Section textbook manuscript does not cover every section.",
    sectionLessons.length * sectionLessonModes.length >= 6 * (deep?.sectionDetails.length ?? chapter.sections.length) ? "" : "Interactive section lecturer does not expose all six modes for every section.",
    lecture.beats.length >= (deep?.sectionDetails.length ?? chapter.sections.length) ? "" : "Standalone lecture beats do not cover every section.",
    deep?.sectionDetails.length ? "" : "No section-level deep dives found for this chapter.",
    masteryTiles ? "" : "No mastery tiles found for this chapter.",
    formulas.length * formulaLectureModes.length === formulaInteractiveModes ? "" : "Interactive formula lecturer count does not match formula mode coverage.",
  ].filter(Boolean);

  return {
    chapter: chapterNumber,
    title: chapter.title,
    route: `/chapters/${chapterNumber}`,
    algorithms: algorithms.length,
    sourceCues: sourceCues.length,
    zeroKnowledgeRungs: starter.rungs.length,
    zeroKnowledgeModes: starter.rungs.length * zeroKnowledgeModes.length,
    foundationDictionaryCards: foundationCards.length,
    foundationDictionaryModes: foundationModeTotal,
    mathRescueCards: mathCards.length,
    mathRescueModes: mathModeTotal,
    visualStoryCards: visualStories.length,
    visualStoryModes: visualStoryModeTotal,
    analogyCards: analogyCards.length,
    analogyModes: analogyModeTotal,
    socraticTutorCards: socraticTutorCards.length,
    socraticTutorModes: socraticTutorModeTotal,
    socraticTutorTurns: socraticTutorTurnTotal,
    socraticTutorBoardSteps: socraticTutorBoardStepTotal,
    caseStudies: caseStudies.length,
    caseStudyModes: caseStudyModeTotal,
    caseStudyBoardFrames: caseStudyBoardFrameTotal,
    caseStudySuccessCriteria: caseStudySuccessCriteriaTotal,
    lectureTheaters: 1,
    lectureTheaterSlides: theaterSlides,
    lectureTheaterModes: theaterModeTotal,
    practiceCards: practiceCards.length,
    practiceInteractiveModes: activeRecallModes,
    conceptCards: conceptCards.length,
    conceptInteractiveModes: conceptModes,
    workedExamples: workedExamples.length,
    workedExampleInteractiveModes: workedModes,
    misconceptionCards: misconceptionCards.length,
    misconceptionInteractiveModes: clinicModes,
    simulators: 1,
    simulatorControls,
    simulatorReadouts: simulatorReadoutTotal,
    searchIndexEntries,
    learningGraphNodes,
    learningGraphEdges,
    symbolCards: symbolCards.length,
    symbolModes,
    codeLabs: codeLabs.length,
    codeLabModes: codeLabModeTotal,
    assumptionClinics: assumptionClinics.length,
    assumptionModes: assumptionModeTotal,
    methodComparisons: methodComparisons.length,
    methodCompareModes: methodCompareModeTotal,
    proofCards: proofCards.length,
    proofModes: proofModeTotal,
    examCards: examCards.length,
    examModes: examModeTotal,
    sectionMasteryCards: sectionMasteryCards.length,
    sectionMasteryModes: sectionMasteryModeTotal,
    manuscriptSections: manuscript.sections.length,
    blackboardStages: blackboard.stages.length,
    sectionNarratives: sectionLessons.length,
    sectionInteractiveModes: sectionLessons.length * sectionLessonModes.length,
    lectureBeats: lecture.beats.length,
    sectionNotes: deep?.sectionDetails.length ?? 0,
    masteryTiles,
    formulas: formulas.length,
    formulaInteractiveModes,
    evidenceAnchors: evidence.length,
    exerciseGuides: exercises.length,
    exerciseSolutions: exerciseSolutions.length,
    exerciseSolutionModes: exerciseSolutionModeTotal,
    synthesisGates: synthesis.dependencyStack.length + synthesis.comparisonAxes.length + synthesis.oralExamPrompts.length,
    dependencyGates: dependencies.incoming.length + dependencies.outgoing.length + dependencies.gates.length + dependencies.skipRisks.length + dependencies.reviewLoop.length,
    layers,
    warnings,
  };
}

function algorithmCoverageRow(algorithm: (typeof algorithmCatalog)[number]): AlgorithmCoverageRow {
  const sourceCueCount = sourceAuditsForChapter(algorithm.chapter).filter((audit) => audit.catalogIds.includes(algorithm.id)).length;
  const dossier = algorithmDossier(algorithm);
  const derivation = algorithmDerivation(algorithm);
  const profile = algorithmProfile(algorithm);
  const worked = workedExampleForAlgorithm(algorithm);
  const easyTechnical = Boolean(algorithm.plain && algorithm.technical && algorithm.objective && algorithm.coreUpdate);
  const complete = easyTechnical && algorithm.steps.length > 0 && algorithm.pseudocode.length > 0 && algorithm.implementationNotes.length > 0 && algorithm.failureModes.length > 0 && dossier.length >= 6 && derivation.steps.length >= 6 && profileRows(profile).length >= 12 && worked.calculation.length > 0 && worked.implementationChecks.length > 0;

  return {
    id: algorithm.id,
    chapter: algorithm.chapter,
    name: algorithm.name,
    route: `/chapters/${algorithm.chapter}#${algorithm.id}`,
    family: algorithm.family,
    sourceCueCount,
    easyTechnical,
    operationalSteps: algorithm.steps.length,
    pseudocodeLines: algorithm.pseudocode.length,
    equations: algorithm.equations.length,
    implementationNotes: algorithm.implementationNotes.length,
    failureModes: algorithm.failureModes.length,
    dossierSections: dossier.length,
    derivationSteps: derivation.steps.length,
    profileAxes: profileRows(profile).length,
    workedCalculations: worked.calculation.length,
    workedChecks: worked.implementationChecks.length,
    status: complete ? "complete" : "warning",
    proof: complete
      ? "Has easy/technical text, objective, core update, operational steps, pseudocode, implementation notes, failure modes, dossier, derivation path, technical profile axes, and worked microscope."
      : "One or more expected detail layers is missing from the current repository data.",
  };
}

function requirementProofs(totals: CoverageAudit["totals"]): RequirementProof[] {
  return [
    {
      label: "Linear standalone book reader",
      status: totals.bookReaderRoutes === 1 && totals.zeroKnowledgeRungs >= totals.chapters * 5 && totals.zeroKnowledgeModes >= totals.zeroKnowledgeRungs * zeroKnowledgeModes.length && totals.foundationDictionaryCards >= totals.chapters * 10 && totals.foundationDictionaryModes >= totals.foundationDictionaryCards * foundationDictionaryModes.length && totals.foundationDictionaryChapters === totals.chapters && totals.mathRescueCards >= totals.chapters * 8 && totals.mathRescueModes >= totals.mathRescueCards * mathRescueModes.length && totals.mathRescueChapters === totals.chapters && totals.caseStudies >= totals.chapters * 4 && totals.caseStudyModes >= totals.caseStudies * caseStudyModes.length && totals.caseStudyChapters === totals.chapters && totals.caseStudyBoardFrames >= totals.caseStudies * 4 && totals.caseStudySuccessCriteria >= totals.caseStudies * 4 && totals.lectureTheaters >= totals.chapters && totals.lectureTheaterSlides >= totals.chapters * 5 && totals.lectureTheaterModes >= totals.lectureTheaterSlides * theaterModeKinds.length && totals.practiceCards >= totals.chapters * 5 && totals.practiceInteractiveModes >= totals.practiceCards * practiceModes.length && totals.conceptCards >= totals.chapters * 6 && totals.conceptInteractiveModes >= totals.conceptCards * conceptLectureModes.length && totals.workedExamples >= totals.chapters * 5 && totals.workedExampleInteractiveModes >= totals.workedExamples * workedExampleModes.length && totals.misconceptionCards >= totals.chapters * 5 && totals.misconceptionInteractiveModes >= totals.misconceptionCards * misconceptionModes.length && totals.simulators >= totals.chapters && totals.simulatorControls >= totals.chapters * 3 && totals.simulatorReadouts >= totals.chapters * simulatorReadouts.length && totals.searchIndexEntries >= totals.chapters * 30 && totals.searchIndexLayers >= 20 && totals.searchIndexedChapters === totals.chapters && totals.learningGraphNodes >= totals.chapters * 20 && totals.learningGraphEdges >= totals.chapters * 18 && totals.learningGraphChapters === totals.chapters && totals.symbolCards >= totals.formulas && totals.symbolModes >= totals.symbolCards * symbolLectureModes.length && totals.symbolChapters === totals.chapters && totals.codeLabs >= totals.algorithms && totals.codeLabModes >= totals.codeLabs * codeLabModes.length && totals.codeLabChapters === totals.chapters && totals.assumptionClinics >= totals.algorithms && totals.assumptionModes >= totals.assumptionClinics * assumptionClinicModes.length && totals.assumptionChapters === totals.chapters && totals.methodComparisons >= totals.algorithms && totals.methodCompareModes >= totals.methodComparisons * methodCompareModes.length && totals.methodCompareChapters === totals.chapters && totals.proofCards >= totals.formulas + totals.chapters && totals.proofModes >= totals.proofCards * proofLabModes.length && totals.proofChapters === totals.chapters && totals.examCards >= totals.chapters * 7 && totals.examModes >= totals.examCards * chapterExamModes.length && totals.examChapters === totals.chapters && totals.sectionMasteryCards >= totals.sectionNarratives && totals.sectionMasteryModes >= totals.sectionMasteryCards * sectionMasteryModes.length && totals.sectionMasteryChapters === totals.chapters && totals.exerciseSolutions >= totals.exerciseGuides && totals.exerciseSolutionModes >= totals.exerciseSolutions * exerciseSolutionModes.length && totals.lectureBeats >= totals.sectionNotes && totals.sectionNarratives >= totals.sectionNotes && totals.sectionInteractiveModes >= totals.sectionNotes * 6 && totals.formulaInteractiveModes >= totals.formulas * formulaLectureModes.length && totals.manuscriptSections >= 51 && totals.blackboardStages >= 68 ? "complete" : "warning",
      evidence: `/book is the continuous web-book route and renders ${totals.zeroKnowledgeRungs} zero-knowledge starter rungs, ${totals.foundationDictionaryCards} foundation dictionary cards with ${totals.foundationDictionaryModes} foundation modes, ${totals.mathRescueCards} math rescue cards with ${totals.mathRescueModes} math modes, ${totals.visualStoryCards} visual story scenes with ${totals.visualStoryModes} story modes, ${totals.analogyCards} analogy cards with ${totals.analogyModes} analogy modes, ${totals.socraticTutorCards} Socratic tutor cards with ${totals.socraticTutorModes} tutor modes, ${totals.caseStudies} case studies with ${totals.caseStudyModes} case modes, ${totals.caseStudyBoardFrames} case board frames, ${totals.caseStudySuccessCriteria} case success checks, ${totals.lectureTheaters} guided lecture theaters, ${totals.lectureTheaterSlides} lecture slides, ${totals.lectureTheaterModes} theater modes, ${totals.practiceCards} active-recall checkpoints, ${totals.conceptCards} concept microscope cards, ${totals.workedExamples} worked examples, ${totals.misconceptionCards} misconception clinic cards, ${totals.simulators} chapter simulator labs, ${totals.simulatorControls} simulator controls, ${totals.simulatorReadouts} simulator readouts, ${totals.searchIndexEntries} whole-book search entries across ${totals.searchIndexLayers} layers, ${totals.learningGraphNodes} learning-graph nodes and ${totals.learningGraphEdges} learning links, ${totals.symbolCards} contextual symbol cards with ${totals.symbolModes} symbol modes, ${totals.codeLabs} implementation code labs with ${totals.codeLabModes} code modes, ${totals.assumptionClinics} assumption clinics with ${totals.assumptionModes} trust modes, ${totals.methodComparisons} method comparisons with ${totals.methodCompareModes} comparison modes, ${totals.proofCards} proof cards with ${totals.proofModes} proof modes, ${totals.examCards} chapter exam cards with ${totals.examModes} exam modes, ${totals.sectionMasteryCards} section mastery cards with ${totals.sectionMasteryModes} mastery modes, ${totals.exerciseSolutions} exercise solution cards with ${totals.exerciseSolutionModes} solution modes, ${totals.manuscriptSections} bespoke manuscript moves, ${totals.blackboardStages} interactive blackboard stages, ${totals.sectionNarratives} section textbook manuscripts, ${totals.sectionInteractiveModes} guided section lecture modes, ${totals.formulaInteractiveModes} formula lecture modes, plus the same ${totals.lectureBeats} lecture beats used by the chapter lessons.`,
      easy: "Readers can now read the whole course in order without jumping between chapter cards.",
      technical: "The App Router `/book` page imports the chapter dataset, zero-knowledge ladders, foundation dictionary cards, math rescue cards, visual story cards, analogy cards, Socratic tutor cards, guided lecture theaters, active-recall practice cards, concept microscope cards, worked example cards, misconception clinic cards, chapter simulators, standaloneLectureForChapter() output, section manuscripts, chapter-filtered symbol props, chapter-filtered code-lab props, chapter-filtered assumption-clinic props, chapter-filtered method-comparison props, chapter-filtered proof-lab props, chapter-filtered exam-studio props, chapter-filtered section-mastery props, chapter-filtered exercise-solution props, chapter-filtered case-study props, and chapter-filtered formula props, then renders every chapter sequentially with table of contents anchors and links to full chapter labs.",
    },
    {
      label: "Zero-knowledge starter ladders",
      status: totals.zeroKnowledgeRungs >= totals.chapters * 5 && totals.zeroKnowledgeModes >= totals.zeroKnowledgeRungs * zeroKnowledgeModes.length ? "complete" : "warning",
      evidence: `${totals.zeroKnowledgeRungs} starter rungs and ${totals.zeroKnowledgeModes} primer modes are present: five rungs for each of the ${totals.chapters} chapters, with plain, visual, technical, and practice modes.`,
      easy: "A reader who knows nothing about RL can now begin each chapter with a guided ladder before reading dense formulas or algorithms.",
      technical: "zeroKnowledgeLadders.ts supplies chapter-specific prerequisite rungs and ZeroKnowledgeLadderReader renders the mode-switching lecture console on the homepage, /book, and chapter routes.",
    },
    {
      label: "Foundation dictionary studios",
      status: totals.foundationDictionaryCards >= totals.chapters * 10 && totals.foundationDictionaryModes >= totals.foundationDictionaryCards * foundationDictionaryModes.length && totals.foundationDictionaryChapters === totals.chapters ? "complete" : "warning",
      evidence: `${totals.foundationDictionaryCards} foundation dictionary cards cover ${totals.foundationDictionaryChapters}/${totals.chapters} chapters, ${totals.foundationDictionaryTerms} unique terms, and ${totals.foundationDictionarySources} source layers with ${totals.foundationDictionaryModes} meaning/picture/technical/trap/teach-back modes.`,
      easy: "Readers can learn vocabulary from scratch before the same words become formulas, methods, proofs, and exercises.",
      technical: "foundationDictionary.ts derives balanced chapter terms from starter rungs, vocabulary, concept cards, formulas, and algorithms; FoundationDictionaryStudio renders mode-switching definitions on /foundations, home, /book, and chapter routes.",
    },
    {
      label: "Math rescue studios",
      status: totals.mathRescueCards >= totals.chapters * 8 && totals.mathRescueModes >= totals.mathRescueCards * mathRescueModes.length && totals.mathRescueChapters === totals.chapters ? "complete" : "warning",
      evidence: `${totals.mathRescueCards} math rescue cards cover ${totals.mathRescueChapters}/${totals.chapters} chapters, ${totals.mathRescueObjects} mathematical objects, ${totals.mathRescueSymbols} symbol handles, and ${totals.mathRescueSources} source layers with ${totals.mathRescueModes} intuition/picture/notation/chapter-use/self-check modes.`,
      easy: "Readers can learn the calculation before the notation gets dense, so returns, expectations, backups, gradients, ratios, traces, and updates have a plain board explanation first.",
      technical: "mathRescue.ts derives rescue cards from formula, concept, algorithm, and starter-ladder modules; MathRescueStudio renders mode-switching math explanations on /math, home, /book, and chapter routes.",
    },
    {
      label: "Visual story studios",
      status: totals.visualStoryCards >= totals.chapters * 8 && totals.visualStoryModes >= totals.visualStoryCards * visualStoryModes.length && totals.visualStoryChapters === totals.chapters ? "complete" : "warning",
      evidence: `${totals.visualStoryCards} visual story scenes cover ${totals.visualStoryChapters}/${totals.chapters} chapters with ${totals.visualStoryModes} scene/observe/move/technical/check modes, ${totals.visualStoryActors} actor handles, ${totals.visualStoryProps} props, and ${totals.visualStorySources} source layers.`,
      easy: "Readers can watch a chapter as a concrete learner-world-feedback movie before the formal chapter language appears.",
      technical: "visualStory.ts derives scenes from zero-knowledge rungs, concept cards, worked examples, algorithms, section headings, and simulator controls; VisualStoryStudio renders scene, observe, move, technical, and check modes on /stories, home, /book, and chapter routes.",
    },
    {
      label: "Analogy bridge studios",
      status: totals.analogyCards >= totals.chapters * 6 && totals.analogyModes >= totals.analogyCards * analogyModes.length && totals.analogyChapters === totals.chapters ? "complete" : "warning",
      evidence: `${totals.analogyCards} analogy cards cover ${totals.analogyChapters}/${totals.chapters} chapters with ${totals.analogyModes} everyday/mapping/technical/limits/transfer modes, ${totals.analogyMappings} mapping rows, ${totals.analogyAnchors} anchors, and ${totals.analogySources} source layers.`,
      easy: "Readers can start from familiar stories, map them into RL objects, and learn where each analogy stops being exact.",
      technical: "analogies.ts derives cards from starter rungs, concept cards, math rescue objects, worked examples, visual stories, and algorithm cards; AnalogyStudio renders everyday, mapping, technical, limits, and transfer modes on /analogies, home, /book, and chapter routes.",
    },
    {
      label: "Socratic tutor studios",
      status: totals.socraticTutorCards >= totals.chapters * 6 && totals.socraticTutorModes >= totals.socraticTutorCards * socraticModes.length && totals.socraticTutorChapters === totals.chapters && totals.socraticTutorBoardSteps >= totals.socraticTutorCards * 4 ? "complete" : "warning",
      evidence: `${totals.socraticTutorCards} tutor cards cover ${totals.socraticTutorChapters}/${totals.chapters} chapters with ${totals.socraticTutorModes} question/hint/board/technical/try modes, ${totals.socraticTutorTurns} dialogue turns, ${totals.socraticTutorBoardSteps} board steps, ${totals.socraticTutorAnchors} anchors, and ${totals.socraticTutorSources} source layers.`,
      easy: "Readers can study each chapter like an office-hours conversation: ask the naive question, take a hint, draw the board, hear the technical answer, and try a new case.",
      technical: "socraticTutor.ts derives cards from starter rungs, concept cards, math rescue objects, visual stories, analogy bridges, and algorithm cards; SocraticTutorStudio renders question, hint, board, technical, and try-it modes on /tutor, home, /book, and chapter routes.",
    },
    {
      label: "Case study studios",
      status: totals.caseStudies >= totals.chapters * 4 && totals.caseStudyModes >= totals.caseStudies * caseStudyModes.length && totals.caseStudyChapters === totals.chapters && totals.caseStudyBoardFrames >= totals.caseStudies * 4 && totals.caseStudySuccessCriteria >= totals.caseStudies * 4 ? "complete" : "warning",
      evidence: `${totals.caseStudies} case studies cover ${totals.caseStudyChapters}/${totals.chapters} chapters with ${totals.caseStudyModes} scene/walkthrough/technical/debug/transfer modes, ${totals.caseStudyBoardFrames} board frames, ${totals.caseStudySuccessCriteria} success checks, ${totals.caseStudyAnchors} anchors, and ${totals.caseStudySources} source layers.`,
      easy: "Readers can follow complete chapter scenarios instead of learning isolated definitions, formulas, or algorithms.",
      technical: "caseStudies.ts derives story, worked, method, and simulator case cards from visual stories, worked examples, algorithms, simulators, misconceptions, analogies, concepts, and Socratic tutor cards; CaseStudyStudio renders scene, walkthrough, technical, debug, and transfer modes on /cases, home, /book, and chapter routes.",
    },
    {
      label: "Guided chapter lecture theaters",
      status: totals.lectureTheaters === totals.chapters && totals.lectureTheaterSlides >= totals.chapters * 5 && totals.lectureTheaterModes >= totals.lectureTheaterSlides * theaterModeKinds.length ? "complete" : "warning",
      evidence: `${totals.lectureTheaters} guided lecture theaters expose ${totals.lectureTheaterSlides} slide stages and ${totals.lectureTheaterModes} explanation modes across the ${totals.chapters} chapters.`,
      easy: "Every chapter now has a live lecture path that starts from a plain story, draws the board, builds technical language, reads an equation lens, and ends with a teach-back check.",
      technical: "chapterLectureTheater.ts derives five-stage lecture theaters from original chapter, section, concept, formula, algorithm, and worked-example modules; ChapterLectureTheater renders the interactive mode switcher on the homepage, /book, and chapter routes.",
    },
    {
      label: "Whole-book searchable index",
      status: totals.searchIndexEntries >= totals.chapters * 30 && totals.searchIndexLayers >= 20 && totals.searchIndexedChapters === totals.chapters ? "complete" : "warning",
      evidence: `${totals.searchIndexEntries} searchable entries cover ${totals.searchIndexedChapters}/${totals.chapters} chapters across ${totals.searchIndexLayers} layers, with a dedicated /search route plus chapter-local search consoles.`,
      easy: "Readers can type a term or technical phrase and jump directly to the relevant standalone explanation instead of hunting through pages.",
      technical: "bookIndex.ts aggregates chapter stories, zero-primer rungs, foundation dictionary terms, math rescue objects, lecture slides, section mastery cards, symbol cards, active recall, concept cards, examples, misconception repairs, simulators, implementation code labs, assumption clinics, manuscripts, section lessons, synthesis/dependency gates, source audits, algorithms, mastery notes, formulas, evidence anchors, exercise coaches, exercise solution cards, and method comparison cards into serialized search entries consumed by BookSearch.",
    },
    {
      label: "Interactive learning graph",
      status: totals.learningGraphNodes >= totals.chapters * 20 && totals.learningGraphEdges >= totals.chapters * 18 && totals.learningGraphChapters === totals.chapters ? "complete" : "warning",
      evidence: `${totals.learningGraphNodes} graph nodes and ${totals.learningGraphEdges} learning links cover ${totals.learningGraphChapters}/${totals.chapters} chapters, with clickable foundation/math/concept/section/formula/algorithm/example/practice/simulator/prerequisite/unlock maps.`,
      easy: "Readers can see each chapter as a map before diving into details, then click a node for plain explanation or technical explanation.",
      technical: "learningGraph.ts derives typed graph nodes and edges from original chapter, concept, section-mastery, formula, algorithm, case-study, method-comparison, worked-example, practice, exercise-solution, simulator, code-lab, assumption-clinic, and dependency modules; LearningGraphExplorer renders the interactive SVG graph on /graph, home, and chapter routes.",
    },
    {
      label: "Contextual symbol decoder",
      status: totals.symbolCards >= totals.formulas && totals.symbolModes >= totals.symbolCards * symbolLectureModes.length && totals.symbolChapters === totals.chapters ? "complete" : "warning",
      evidence: `${totals.symbolCards} chapter-context symbol cards decode ${totals.uniqueSymbols} unique marks across ${totals.symbolChapters}/${totals.chapters} chapters, with ${totals.symbolModes} plain, technical, formula-context, pitfall, and self-check modes.`,
      easy: "Readers can learn what each mark means before equations feel like a foreign language.",
      technical: "symbolAtlas.ts derives chapter-context notation cards from formulaAtlas.ts symbols; SymbolDecoder renders a mode-switching notation console on /symbols, home, /book, and chapter routes.",
    },
    {
      label: "Implementation code labs",
      status: totals.codeLabs >= totals.algorithms && totals.codeLabModes >= totals.codeLabs * codeLabModes.length && totals.codeLabChapters === totals.chapters ? "complete" : "warning",
      evidence: `${totals.codeLabs} implementation code labs cover ${totals.codeLabChapters}/${totals.chapters} chapters with ${totals.codeLabModes} plain/code/invariant/test/debug modes.`,
      easy: "Readers can turn a named method into stored state, target computation, update line, tiny test, and debug checklist before writing real code.",
      technical: "codeLab.ts derives implementation cards from algorithmCatalog.ts and CodeLab renders selectable plain plans, Python-style scaffolds, invariants, tests, and debug checks on /code, home, /book, and chapter routes.",
    },
    {
      label: "Assumption and guarantee clinics",
      status: totals.assumptionClinics >= totals.algorithms && totals.assumptionModes >= totals.assumptionClinics * assumptionClinicModes.length && totals.assumptionChapters === totals.chapters ? "complete" : "warning",
      evidence: `${totals.assumptionClinics} assumption clinics cover ${totals.assumptionChapters}/${totals.chapters} chapters with ${totals.assumptionModes} plain/assumption/guarantee/failure/repair modes.`,
      easy: "Readers can see when a method deserves trust, what it promises, how it breaks, and how to repair the setup.",
      technical: "assumptionClinic.ts derives validity-contract cards from algorithmCatalog.ts; AssumptionClinic renders mode-switching assumptions, guarantees, failures, diagnostics, and repairs on /assumptions, home, /book, and chapter routes.",
    },
    {
      label: "Method comparison studios",
      status: totals.methodComparisons >= totals.algorithms && totals.methodCompareModes >= totals.methodComparisons * methodCompareModes.length && totals.methodCompareChapters === totals.chapters ? "complete" : "warning",
      evidence: `${totals.methodComparisons} method comparison cards cover ${totals.methodCompareChapters}/${totals.chapters} chapters and ${totals.methodCompareFamilies} method families with ${totals.methodCompareModes} choose/axis/tradeoff/failure/bridge modes.`,
      easy: "Readers can decide between nearby methods by situation instead of memorizing names in isolation.",
      technical: "methodCompare.ts derives comparison cards from algorithmCatalog.ts and algorithmProfiles.ts; MethodCompareStudio renders choice criteria, profile axes, tradeoffs, failure checks, and transfer bridges on /compare, home, /book, and chapter routes.",
    },
    {
      label: "Proof intuition labs",
      status: totals.proofCards >= totals.formulas + totals.chapters && totals.proofModes >= totals.proofCards * proofLabModes.length && totals.proofChapters === totals.chapters ? "complete" : "warning",
      evidence: `${totals.proofCards} proof cards cover ${totals.proofChapters}/${totals.chapters} chapters with ${totals.proofModes} plain/claim/proof/equation/stress modes.`,
      easy: "Readers can learn why chapter claims and equations are believable instead of memorizing formulas by faith.",
      technical: "proofLab.ts derives chapter proof spines plus formula-level proof cards from chapters, formulaAtlas.ts, concept cards, and algorithm cards; ProofLab renders claim, ingredient, proof sketch, equation bridge, and stress-test modes on /proofs, home, /book, and chapter routes.",
    },
    {
      label: "Chapter exam studios",
      status: totals.examCards >= totals.chapters * 7 && totals.examModes >= totals.examCards * chapterExamModes.length && totals.examChapters === totals.chapters ? "complete" : "warning",
      evidence: `${totals.examCards} chapter exam cards cover ${totals.examChapters}/${totals.chapters} chapters with ${totals.examModes} prompt/plan/solution/rubric/transfer modes.`,
      easy: "Readers can prove chapter ownership by trying a prompt, inspecting a plan, revealing a model solution, grading with a rubric, and transferring the idea.",
      technical: "chapterExam.ts synthesizes chapter-end mastery cards from concepts, formulas, code labs, assumptions, proof cards, worked examples, and simulators; ChapterExamStudio renders the mode-switching exam console on /exam, home, /book, and chapter routes.",
    },
    {
      label: "Section mastery studios",
      status: totals.sectionMasteryCards >= totals.sectionNarratives && totals.sectionMasteryModes >= totals.sectionMasteryCards * sectionMasteryModes.length && totals.sectionMasteryChapters === totals.chapters ? "complete" : "warning",
      evidence: `${totals.sectionMasteryCards} section mastery cards cover ${totals.sectionMasteryChapters}/${totals.chapters} chapters with ${totals.sectionMasteryModes} prompt/hint/answer/technical/transfer modes.`,
      easy: "Readers can stop after each named section, teach it from memory, request a hint, reveal an answer, read the technical pass, and transfer the idea before continuing.",
      technical: "sectionMastery.ts derives one mastery card per sectionNarratives.ts lesson; SectionMasteryStudio renders prompt, hint, answer, technical, and transfer modes on /sections, home, /book, and chapter routes.",
    },
    {
      label: "Exercise solution studios",
      status: totals.exerciseSolutions >= totals.exerciseGuides && totals.exerciseSolutionModes >= totals.exerciseSolutions * exerciseSolutionModes.length && totals.exerciseSolutionChapters >= 1 ? "complete" : "warning",
      evidence: `${totals.exerciseSolutions} exercise solution cards cover ${totals.exerciseSolutionChapters} chapters with ${totals.exerciseSolutionModes} attempt/hint/solution/debug/extension modes, matching the ${totals.exerciseGuides} exercise guide cards.`,
      easy: "Readers can try numbered practice problems, ask for a hint, inspect a model solution path, debug the answer, and transfer it to a new tiny world.",
      technical: "exerciseSolutionStudio.ts derives original attempt/hint/solution/debug/extension cards from exerciseCoach.ts and chapter metadata; ExerciseSolutionStudio renders the mode-switching solution lab on /exercises, home, /book, and chapter routes without copying exercise text.",
    },
    {
      label: "Active recall practice coach",
      status: totals.practiceCards >= totals.chapters * 5 && totals.practiceInteractiveModes >= totals.practiceCards * practiceModes.length ? "complete" : "warning",
      evidence: `${totals.practiceCards} active-recall checkpoints and ${totals.practiceInteractiveModes} reveal modes are present: five checkpoints for each of the ${totals.chapters} chapters, with prompt, hint, solution, trap, and transfer modes.`,
      easy: "Readers can test whether they can teach the chapter instead of passively reading it.",
      technical: "chapterPractice.ts derives chapter-specific active-recall checkpoints from the original data modules, and ChapterPracticeCoach renders prompt/hint/solution/trap/transfer controls on the homepage, /book, and chapter routes.",
    },
    {
      label: "Concept microscope vocabulary lectures",
      status: totals.conceptCards >= totals.chapters * 6 && totals.conceptInteractiveModes >= totals.conceptCards * conceptLectureModes.length ? "complete" : "warning",
      evidence: `${totals.conceptCards} concept microscope cards and ${totals.conceptInteractiveModes} concept lecture modes are present across the ${totals.chapters} chapters, with plain role, board picture, technical use, contrast, and self-check modes.`,
      easy: "Important RL words are no longer just glossary entries; each one gets a mini lecture that starts from plain language and ends with a self-check.",
      technical: "conceptAtlas.ts derives chapter-filtered concept cards from original deep-dive and chapter metadata, and ConceptLectureDeck renders the interactive mode switcher on the homepage, /book, and chapter routes.",
    },
    {
      label: "Worked example studio",
      status: totals.workedExamples >= totals.chapters * 5 && totals.workedExampleInteractiveModes >= totals.workedExamples * workedExampleModes.length ? "complete" : "warning",
      evidence: `${totals.workedExamples} worked examples and ${totals.workedExampleInteractiveModes} worked-example modes are present: five examples for each of the ${totals.chapters} chapters, with scenario, board, technical trace, pitfall, and self-check modes.`,
      easy: "Every chapter now has tiny concrete cases that show the idea operating before the reader tries exercises alone.",
      technical: "chapterWorkedExamples.ts derives chapter-specific toy worlds, board traces, numeric traces, method traces, and debug repairs from the original data modules, and WorkedExampleStudio renders the interactive mode switcher on the homepage, /book, and chapter routes.",
    },
    {
      label: "Misconception clinic",
      status: totals.misconceptionCards >= totals.chapters * 5 && totals.misconceptionInteractiveModes >= totals.misconceptionCards * misconceptionModes.length ? "complete" : "warning",
      evidence: `${totals.misconceptionCards} misconception clinic cards and ${totals.misconceptionInteractiveModes} repair modes are present: five cards for each of the ${totals.chapters} chapters, with mistake, temptation, repair, technical consequence, and self-check modes.`,
      easy: "Readers can see why tempting wrong shortcuts fail and how to repair them before those shortcuts become habits.",
      technical: "chapterMisconceptions.ts derives chapter-specific repair cards from common confusions, concept cards, formulas, algorithms, and worked examples; MisconceptionClinic renders the mode switcher on the homepage, /book, and chapter routes.",
    },
    {
      label: "Chapter simulator labs",
      status: totals.simulators === totals.chapters && totals.simulatorControls >= totals.chapters * 3 && totals.simulatorReadouts >= totals.chapters * simulatorReadouts.length ? "complete" : "warning",
      evidence: `${totals.simulators} chapter simulator labs expose ${totals.simulatorControls} live controls and ${totals.simulatorReadouts} readouts across the ${totals.chapters} chapters.`,
      easy: "Readers can move exploration, update strength, and future-horizon knobs and watch how the chapter tradeoff changes.",
      technical: "chapterSimulators.ts derives one simulator per chapter from original chapter, concept, formula, algorithm, and worked-example modules; ChapterSimulatorLab renders range controls and learning/stability/bias/variance readouts on the homepage, /book, and chapter routes.",
    },
    {
      label: "Interactive graphical lecture boards",
      status: totals.blackboardStages >= 68 ? "complete" : "warning",
      evidence: `${totals.blackboardStages} clickable blackboard stages are present: four stages for each of the 17 chapters.`,
      easy: "Every chapter now has a visual board students can click through instead of only reading prose.",
      technical: "interactiveBlackboards.ts provides staged beginner/technical/visual/check content for each chapter, rendered by the client-side InteractiveBlackboard component in /book and chapter routes.",
    },
    {
      label: "Interactive section lecture controls",
      status: totals.sectionInteractiveModes >= totals.sectionNotes * 6 ? "complete" : "warning",
      evidence: `${totals.sectionInteractiveModes} guided section modes are available: six lecture controls for each of the ${totals.sectionNarratives} section manuscripts.`,
      easy: "Every section can now be driven like a lecture console: pick the section, then switch between beginner, technical, board, formula, algorithm, and self-check views.",
      technical: "SectionLessonReader is a client component over sectionNarratives.ts data, exposing six mode controls and an animated SVG board for every section in `/book` and chapter routes.",
    },
    {
      label: "Interactive formula lecture controls",
      status: totals.formulaInteractiveModes >= totals.formulas * formulaLectureModes.length ? "complete" : "warning",
      evidence: `${totals.formulaInteractiveModes} formula lecture modes are available: ${formulaLectureModes.length} controls for each of the ${totals.formulas} formula-atlas entries.`,
      easy: "Every equation can now be read like a mini lecture: what it says, what each symbol means, how to trace it, when to use it, and what mistake to avoid.",
      technical: "FormulaLectureReader is a client component over formulaAtlas.ts data or chapter-filtered formula props; it renders story, symbol, trace, use-case, and pitfall modes with an animated formula diagram in `/book`, chapter routes, and the global formula atlas.",
    },
    {
      label: "Full section-by-section textbook manuscript",
      status: totals.sectionNarratives >= totals.sectionNotes ? "complete" : "warning",
      evidence: `${totals.sectionNarratives} section textbook manuscripts cover the ${totals.sectionNotes} section-note anchors across all 17 chapters.`,
      easy: "Every named section now has a prose lesson that starts from scratch and reads like part of the web book, not just a checklist card.",
      technical: "sectionNarratives.ts generates original section-level lessons with beginner framing, technical pass, board walkthrough, formula bridge, algorithm bridge, misconception guard, self-check, and next-section link; `/book` and chapter routes render the layer.",
    },
    {
      label: "Original bespoke manuscript prose",
      status: totals.manuscriptSections >= 51 ? "complete" : "warning",
      evidence: `${totals.manuscriptSections} chapter-specific manuscript moves are present: three original beginner-to-technical prose moves for each of the 17 chapters.`,
      easy: "Every chapter now has custom prose that reads more like a lecture than a generated checklist.",
      technical: "chapterManuscripts.ts supplies an opening, three manuscript moves, graphical explanation, technical explanation, takeaway, and closing for each chapter; chapter routes and /book both render it.",
    },
    {
      label: "Standalone web-book lecture layer",
      status: totals.chapters === 17 && totals.lectureBeats >= totals.sectionNotes ? "complete" : "warning",
      evidence: `${totals.lectureBeats} from-scratch lecture beats are generated across ${totals.chapters} chapters, covering the ${totals.sectionNotes} section-note anchors.`,
      easy: "The site now teaches each chapter directly instead of only pointing readers back to a source text.",
      technical: "Each chapter route composes a standaloneLectureForChapter() object with beginner openings, visual mental models, vocabulary, section beat questions, technical builds, board-work steps, and checkpoints.",
    },
    {
      label: "Separate page for each chapter",
      status: totals.chapterRoutes === 17 ? "complete" : "warning",
      evidence: `${totals.chapterRoutes}/17 static chapter route data rows are present at /chapters/[chapter].`,
      easy: "Every chapter has its own place to study instead of being buried in one long page.",
      technical: "The app-router route uses generateStaticParams over the chapter data, and this audit sees one row for every chapter in the source dataset.",
    },
    {
      label: "Highly detailed chapter explanations",
      status: totals.foundationDictionaryCards >= totals.chapters * 10 && totals.foundationDictionaryModes >= totals.foundationDictionaryCards * foundationDictionaryModes.length && totals.mathRescueCards >= totals.chapters * 8 && totals.mathRescueModes >= totals.mathRescueCards * mathRescueModes.length && totals.visualStoryCards >= totals.chapters * 8 && totals.visualStoryModes >= totals.visualStoryCards * visualStoryModes.length && totals.analogyCards >= totals.chapters * 6 && totals.analogyModes >= totals.analogyCards * analogyModes.length && totals.socraticTutorCards >= totals.chapters * 6 && totals.socraticTutorModes >= totals.socraticTutorCards * socraticModes.length && totals.caseStudies >= totals.chapters * 4 && totals.caseStudyModes >= totals.caseStudies * caseStudyModes.length && totals.caseStudyBoardFrames >= totals.caseStudies * 4 && totals.lectureBeats >= 161 && totals.sectionInteractiveModes >= 966 && totals.sectionNarratives >= 161 && totals.sectionNotes >= 161 && totals.lectureTheaterSlides >= 85 && totals.lectureTheaterModes >= 425 && totals.conceptCards >= 102 && totals.workedExamples >= 85 && totals.misconceptionCards >= 85 && totals.simulators >= 17 && totals.simulatorControls >= 51 && totals.simulatorReadouts >= 68 && totals.symbolCards >= totals.formulas && totals.symbolModes >= totals.symbolCards * symbolLectureModes.length && totals.codeLabs >= totals.algorithms && totals.codeLabModes >= totals.codeLabs * codeLabModes.length && totals.assumptionClinics >= totals.algorithms && totals.assumptionModes >= totals.assumptionClinics * assumptionClinicModes.length && totals.methodComparisons >= totals.algorithms && totals.methodCompareModes >= totals.methodComparisons * methodCompareModes.length && totals.proofCards >= totals.formulas + totals.chapters && totals.proofModes >= totals.proofCards * proofLabModes.length && totals.examCards >= totals.chapters * 7 && totals.examModes >= totals.examCards * chapterExamModes.length && totals.sectionMasteryCards >= totals.sectionNarratives && totals.sectionMasteryModes >= totals.sectionMasteryCards * sectionMasteryModes.length && totals.exerciseSolutions >= totals.exerciseGuides && totals.exerciseSolutionModes >= totals.exerciseSolutions * exerciseSolutionModes.length && totals.masteryTiles >= 170 ? "complete" : "warning",
      evidence: `${totals.zeroKnowledgeRungs} starter rungs, ${totals.zeroKnowledgeModes} primer modes, ${totals.foundationDictionaryCards} foundation dictionary cards, ${totals.foundationDictionaryModes} foundation modes, ${totals.mathRescueCards} math rescue cards, ${totals.mathRescueModes} math rescue modes, ${totals.visualStoryCards} visual story scenes, ${totals.visualStoryModes} story modes, ${totals.analogyCards} analogy cards, ${totals.analogyModes} analogy modes, ${totals.socraticTutorCards} Socratic tutor cards, ${totals.socraticTutorModes} tutor modes, ${totals.caseStudies} case studies, ${totals.caseStudyModes} case modes, ${totals.caseStudyBoardFrames} case board frames, ${totals.lectureTheaterSlides} guided lecture slides, ${totals.lectureTheaterModes} theater modes, ${totals.practiceCards} active-recall checkpoints, ${totals.practiceInteractiveModes} practice reveal modes, ${totals.conceptCards} concept cards, ${totals.conceptInteractiveModes} concept lecture modes, ${totals.workedExamples} worked examples, ${totals.workedExampleInteractiveModes} worked-example modes, ${totals.misconceptionCards} misconception clinic cards, ${totals.misconceptionInteractiveModes} repair modes, ${totals.simulators} chapter simulators, ${totals.simulatorControls} simulator controls, ${totals.simulatorReadouts} simulator readouts, ${totals.sectionNarratives} section textbook manuscripts, ${totals.sectionInteractiveModes} guided section modes, ${totals.symbolCards} contextual symbol cards, ${totals.symbolModes} symbol decoder modes, ${totals.codeLabs} implementation code labs, ${totals.codeLabModes} code modes, ${totals.assumptionClinics} assumption clinics, ${totals.assumptionModes} trust modes, ${totals.methodComparisons} method comparison cards, ${totals.methodCompareModes} comparison modes, ${totals.proofCards} proof cards, ${totals.proofModes} proof modes, ${totals.examCards} exam cards, ${totals.examModes} exam modes, ${totals.sectionMasteryCards} section mastery cards, ${totals.sectionMasteryModes} section mastery modes, ${totals.exerciseSolutions} exercise solution cards, ${totals.exerciseSolutionModes} exercise solution modes, ${totals.formulaInteractiveModes} formula lecture modes, ${totals.lectureBeats} lecture beats, ${totals.sectionNotes} section notes, ${totals.masteryTiles} mastery tiles, ${totals.formulas} formulas, ${totals.evidenceAnchors} anchors, and ${totals.exerciseGuides} exercise guides are connected to chapters.`,
      easy: "Each chapter has a from-scratch lecture, story, sections, formulas, examples, exercises, traps, and review scaffolding.",
      technical: "Chapter pages now compose zero-knowledge starter ladders, foundation dictionary studios, math rescue studios, visual story studios, analogy bridge studios, Socratic tutor studios, case study studios, guided lecture theaters, active-recall practice, concept microscope lectures, worked example studio, misconception clinic, chapter simulator labs, contextual symbol decoders, implementation code labs, assumption and guarantee clinics, method comparison studios, proof intuition labs, chapter exam studios, section mastery studios, exercise solution studios, interactive section lecture controls, interactive formula lecture controls, section textbook manuscripts, standalone lectures, synthesis, dependency maps, source audits, algorithm cards, deep dives, mastery notes, formula atlas entries, evidence anchors, and exercise coaching.",
    },
    {
      label: "Every algorithm has technical and easy explanation",
      status: totals.completeAlgorithms === totals.algorithms ? "complete" : "warning",
      evidence: `${totals.completeAlgorithms}/${totals.algorithms} algorithm cards pass the detail-layer audit across ${totals.algorithmFamilies} families.`,
      easy: "Every algorithm card has a plain-language and technical path, not just a name.",
      technical: "The audit requires plain/technical/objective/core update plus steps, pseudocode, implementation notes, failure modes, dossier sections, derivation steps, profile axes, and worked-example checks.",
    },
    {
      label: "Source-grounded navigation",
      status: totals.sourceCues >= 90 ? "complete" : "warning",
      evidence: `${totals.sourceCues} source-cue rows map PDF algorithm boxes/source methods to chapter cards.`,
      easy: "The site shows where book-named methods enter the explainer.",
      technical: "Source-audit data cross-links chapter-level PDF cues to detailed catalog IDs, with global index and chapter anchors for navigation.",
    },
  ];
}

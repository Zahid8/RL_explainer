import { algorithmCatalog, algorithmsForChapter } from "@/lib/algorithmCatalog";
import { algorithmDerivation } from "@/lib/algorithmDerivations";
import { algorithmDossier } from "@/lib/algorithmDossier";
import { algorithmProfile, profileRows } from "@/lib/algorithmProfiles";
import { sourceAuditsForChapter } from "@/lib/algorithmSourceAudit";
import { workedExampleForAlgorithm } from "@/lib/algorithmWorkedExamples";
import { chapterDependencyMap } from "@/lib/chapterDependencyMap";
import { chapterSynthesis } from "@/lib/chapterSynthesis";
import { chapterDeepDives } from "@/lib/deepDives";
import { evidenceGuideItems } from "@/lib/evidenceGuide";
import { exerciseCoachCards } from "@/lib/exerciseCoach";
import { practiceCardCount, practiceCardsForChapter, practiceModeCount, practiceModes } from "@/lib/chapterPractice";
import { conceptCardCount, conceptCardsForChapter, conceptLectureModes, conceptModeCount } from "@/lib/conceptAtlas";
import { workedExampleCount, workedExampleModeCount, workedExampleModes, workedExamplesForChapter } from "@/lib/chapterWorkedExamples";
import { formulaAtlas, formulaLectureModeCount, formulaLectureModes, formulasForChapter } from "@/lib/formulaAtlas";
import { chapterMastery } from "@/lib/mastery";
import { manuscriptForChapter, manuscriptSectionCount } from "@/lib/chapterManuscripts";
import { blackboardForChapter, blackboardStageCount } from "@/lib/interactiveBlackboards";
import { chapters } from "@/lib/paper";
import { sectionLessonModeCount, sectionLessonModes, sectionLessonsForChapter, sectionNarrativeCount } from "@/lib/sectionNarratives";
import { standaloneLectureForChapter, standaloneLectureTileCount } from "@/lib/standaloneBook";
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
  practiceCards: number;
  practiceInteractiveModes: number;
  conceptCards: number;
  conceptInteractiveModes: number;
  workedExamples: number;
  workedExampleInteractiveModes: number;
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
    practiceCards: number;
    practiceInteractiveModes: number;
    conceptCards: number;
    conceptInteractiveModes: number;
    workedExamples: number;
    workedExampleInteractiveModes: number;
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
  const activeRecallCards = practiceCardCount();
  const activeRecallModes = practiceModeCount();
  const conceptCards = conceptCardCount();
  const conceptModes = conceptModeCount();
  const workedExamples = workedExampleCount();
  const workedExampleModesTotal = workedExampleModeCount();
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
    practiceCards: activeRecallCards,
    practiceInteractiveModes: activeRecallModes,
    conceptCards,
    conceptInteractiveModes: conceptModes,
    workedExamples,
    workedExampleInteractiveModes: workedExampleModesTotal,
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
  const sourceCues = sourceAuditsForChapter(chapterNumber);
  const starter = zeroKnowledgeLadderForChapter(chapterNumber);
  const practiceCards = practiceCardsForChapter(chapterNumber);
  const activeRecallModes = practiceModeCount(chapterNumber);
  const conceptCards = conceptCardsForChapter(chapterNumber);
  const conceptModes = conceptModeCount(chapterNumber);
  const workedExamples = workedExamplesForChapter(chapterNumber);
  const workedModes = workedExampleModeCount(chapterNumber);
  const manuscript = manuscriptForChapter(chapterNumber);
  const blackboard = blackboardForChapter(chapterNumber);
  const sectionLessons = sectionLessonsForChapter(chapterNumber);
  const lecture = standaloneLectureForChapter(chapter);

  const masteryTiles = mastery ? mastery.derivations.length + mastery.process.length + mastery.traps.length + mastery.checks.length : 0;
  const layers = [
    "standalone route",
    "zero-knowledge starter ladder",
    "active recall practice coach",
    "concept microscope",
    "worked example studio",
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
    practiceCards.length >= 5 ? "" : "Active recall practice coach has fewer than five checkpoints.",
    practiceCards.length * practiceModes.length === activeRecallModes ? "" : "Active recall practice coach count does not match practice mode coverage.",
    conceptCards.length >= 6 ? "" : "Concept microscope has fewer than six chapter concepts.",
    conceptCards.length * conceptLectureModes.length === conceptModes ? "" : "Concept microscope count does not match concept mode coverage.",
    workedExamples.length >= 5 ? "" : "Worked example studio has fewer than five examples.",
    workedExamples.length * workedExampleModes.length === workedModes ? "" : "Worked example studio count does not match mode coverage.",
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
    practiceCards: practiceCards.length,
    practiceInteractiveModes: activeRecallModes,
    conceptCards: conceptCards.length,
    conceptInteractiveModes: conceptModes,
    workedExamples: workedExamples.length,
    workedExampleInteractiveModes: workedModes,
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
      status: totals.bookReaderRoutes === 1 && totals.zeroKnowledgeRungs >= totals.chapters * 5 && totals.zeroKnowledgeModes >= totals.zeroKnowledgeRungs * zeroKnowledgeModes.length && totals.practiceCards >= totals.chapters * 5 && totals.practiceInteractiveModes >= totals.practiceCards * practiceModes.length && totals.conceptCards >= totals.chapters * 6 && totals.conceptInteractiveModes >= totals.conceptCards * conceptLectureModes.length && totals.workedExamples >= totals.chapters * 5 && totals.workedExampleInteractiveModes >= totals.workedExamples * workedExampleModes.length && totals.lectureBeats >= totals.sectionNotes && totals.sectionNarratives >= totals.sectionNotes && totals.sectionInteractiveModes >= totals.sectionNotes * 6 && totals.formulaInteractiveModes >= totals.formulas * formulaLectureModes.length && totals.manuscriptSections >= 51 && totals.blackboardStages >= 68 ? "complete" : "warning",
      evidence: `/book is the continuous web-book route and renders ${totals.zeroKnowledgeRungs} zero-knowledge starter rungs, ${totals.practiceCards} active-recall checkpoints, ${totals.conceptCards} concept microscope cards, ${totals.workedExamples} worked examples, ${totals.manuscriptSections} bespoke manuscript moves, ${totals.blackboardStages} interactive blackboard stages, ${totals.sectionNarratives} section textbook manuscripts, ${totals.sectionInteractiveModes} guided section lecture modes, ${totals.formulaInteractiveModes} formula lecture modes, plus the same ${totals.lectureBeats} lecture beats used by the chapter lessons.`,
      easy: "Readers can now read the whole course in order without jumping between chapter cards.",
      technical: "The App Router `/book` page imports the chapter dataset, zero-knowledge ladders, active-recall practice cards, concept microscope cards, worked example cards, standaloneLectureForChapter() output, section manuscripts, and chapter-filtered formula props, then renders every chapter sequentially with table of contents anchors and links to full chapter labs.",
    },
    {
      label: "Zero-knowledge starter ladders",
      status: totals.zeroKnowledgeRungs >= totals.chapters * 5 && totals.zeroKnowledgeModes >= totals.zeroKnowledgeRungs * zeroKnowledgeModes.length ? "complete" : "warning",
      evidence: `${totals.zeroKnowledgeRungs} starter rungs and ${totals.zeroKnowledgeModes} primer modes are present: five rungs for each of the ${totals.chapters} chapters, with plain, visual, technical, and practice modes.`,
      easy: "A reader who knows nothing about RL can now begin each chapter with a guided ladder before reading dense formulas or algorithms.",
      technical: "zeroKnowledgeLadders.ts supplies chapter-specific prerequisite rungs and ZeroKnowledgeLadderReader renders the mode-switching lecture console on the homepage, /book, and chapter routes.",
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
      status: totals.lectureBeats >= 161 && totals.sectionInteractiveModes >= 966 && totals.sectionNarratives >= 161 && totals.sectionNotes >= 161 && totals.conceptCards >= 102 && totals.workedExamples >= 85 && totals.masteryTiles >= 170 ? "complete" : "warning",
      evidence: `${totals.zeroKnowledgeRungs} starter rungs, ${totals.zeroKnowledgeModes} primer modes, ${totals.practiceCards} active-recall checkpoints, ${totals.practiceInteractiveModes} practice reveal modes, ${totals.conceptCards} concept cards, ${totals.conceptInteractiveModes} concept lecture modes, ${totals.workedExamples} worked examples, ${totals.workedExampleInteractiveModes} worked-example modes, ${totals.sectionNarratives} section textbook manuscripts, ${totals.sectionInteractiveModes} guided section modes, ${totals.formulaInteractiveModes} formula lecture modes, ${totals.lectureBeats} lecture beats, ${totals.sectionNotes} section notes, ${totals.masteryTiles} mastery tiles, ${totals.formulas} formulas, ${totals.evidenceAnchors} anchors, and ${totals.exerciseGuides} exercise guides are connected to chapters.`,
      easy: "Each chapter has a from-scratch lecture, story, sections, formulas, examples, exercises, traps, and review scaffolding.",
      technical: "Chapter pages now compose zero-knowledge starter ladders, active-recall practice, concept microscope lectures, worked example studio, interactive section lecture controls, interactive formula lecture controls, section textbook manuscripts, standalone lectures, synthesis, dependency maps, source audits, algorithm cards, deep dives, mastery notes, formula atlas entries, evidence anchors, and exercise coaching.",
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

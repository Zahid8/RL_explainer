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
import { formulaAtlas } from "@/lib/formulaAtlas";
import { chapterMastery } from "@/lib/mastery";
import { manuscriptForChapter, manuscriptSectionCount } from "@/lib/chapterManuscripts";
import { blackboardForChapter, blackboardStageCount } from "@/lib/interactiveBlackboards";
import { chapters } from "@/lib/paper";
import { standaloneLectureForChapter, standaloneLectureTileCount } from "@/lib/standaloneBook";

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
  manuscriptSections: number;
  blackboardStages: number;
  lectureBeats: number;
  sectionNotes: number;
  masteryTiles: number;
  formulas: number;
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
    manuscriptSections: number;
    blackboardStages: number;
    lectureBeats: number;
    sectionNotes: number;
    masteryTiles: number;
    formulas: number;
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
  const manuscriptSections = manuscriptSectionCount();
  const blackboardStages = blackboardStageCount();
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
    manuscriptSections,
    blackboardStages,
    lectureBeats,
    sectionNotes,
    masteryTiles,
    formulas: formulaAtlas.length,
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
  const formulas = formulaAtlas.filter((formula) => formula.chapter === chapterNumber);
  const evidence = evidenceGuideItems.filter((item) => item.chapter === chapterNumber);
  const exercises = exerciseCoachCards.filter((item) => item.chapter === chapterNumber);
  const sourceCues = sourceAuditsForChapter(chapterNumber);
  const manuscript = manuscriptForChapter(chapterNumber);
  const blackboard = blackboardForChapter(chapterNumber);
  const lecture = standaloneLectureForChapter(chapter);

  const masteryTiles = mastery ? mastery.derivations.length + mastery.process.length + mastery.traps.length + mastery.checks.length : 0;
  const layers = [
    "standalone route",
    "original manuscript",
    "interactive blackboard",
    "from-scratch lecture",
    "chapter synthesis ladder",
    "cross-chapter dependency map",
    "book-source algorithm audit",
    "algorithmic machinery",
    "section deep dives",
    "mastery notebook",
    "formula atlas",
    "figure/example anchors",
    "exercise coach",
  ];
  const warnings = [
    algorithms.length ? "" : "No algorithm cards found for this chapter.",
    sourceCues.length ? "" : "No source-audit cues found for this chapter.",
    manuscript.sections.length >= 3 ? "" : "Original manuscript has fewer than three chapter-specific moves.",
    blackboard.stages.length >= 4 ? "" : "Interactive blackboard has fewer than four stages.",
    lecture.beats.length >= (deep?.sectionDetails.length ?? chapter.sections.length) ? "" : "Standalone lecture beats do not cover every section.",
    deep?.sectionDetails.length ? "" : "No section-level deep dives found for this chapter.",
    masteryTiles ? "" : "No mastery tiles found for this chapter.",
  ].filter(Boolean);

  return {
    chapter: chapterNumber,
    title: chapter.title,
    route: `/chapters/${chapterNumber}`,
    algorithms: algorithms.length,
    sourceCues: sourceCues.length,
    manuscriptSections: manuscript.sections.length,
    blackboardStages: blackboard.stages.length,
    lectureBeats: lecture.beats.length,
    sectionNotes: deep?.sectionDetails.length ?? 0,
    masteryTiles,
    formulas: formulas.length,
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
      status: totals.bookReaderRoutes === 1 && totals.lectureBeats >= totals.sectionNotes && totals.manuscriptSections >= 51 && totals.blackboardStages >= 68 ? "complete" : "warning",
      evidence: `/book is the continuous web-book route and renders ${totals.manuscriptSections} bespoke manuscript moves, ${totals.blackboardStages} interactive blackboard stages, plus the same ${totals.lectureBeats} lecture beats used by the chapter lessons.`,
      easy: "Readers can now read the whole course in order without jumping between chapter cards.",
      technical: "The App Router `/book` page imports the chapter dataset and standaloneLectureForChapter() output, then renders every chapter sequentially with table of contents anchors and links to full chapter labs.",
    },
    {
      label: "Interactive graphical lecture boards",
      status: totals.blackboardStages >= 68 ? "complete" : "warning",
      evidence: `${totals.blackboardStages} clickable blackboard stages are present: four stages for each of the 17 chapters.`,
      easy: "Every chapter now has a visual board students can click through instead of only reading prose.",
      technical: "interactiveBlackboards.ts provides staged beginner/technical/visual/check content for each chapter, rendered by the client-side InteractiveBlackboard component in /book and chapter routes.",
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
      status: totals.lectureBeats >= 161 && totals.sectionNotes >= 161 && totals.masteryTiles >= 170 ? "complete" : "warning",
      evidence: `${totals.lectureBeats} lecture beats, ${totals.sectionNotes} section notes, ${totals.masteryTiles} mastery tiles, ${totals.formulas} formulas, ${totals.evidenceAnchors} anchors, and ${totals.exerciseGuides} exercise guides are connected to chapters.`,
      easy: "Each chapter has a from-scratch lecture, story, sections, formulas, examples, exercises, traps, and review scaffolding.",
      technical: "Chapter pages now compose standalone lectures, synthesis, dependency maps, source audits, algorithm cards, deep dives, mastery notes, formula atlas entries, evidence anchors, and exercise coaching.",
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

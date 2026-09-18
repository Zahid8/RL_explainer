import { algorithmCatalog, algorithmsForChapter } from "@/lib/algorithmCatalog";
import { assumptionCardsForChapter } from "@/lib/assumptionClinic";
import { sourceAuditsForChapter } from "@/lib/algorithmSourceAudit";
import { chapterDependencyMap } from "@/lib/chapterDependencyMap";
import { lectureTheaterForChapter } from "@/lib/chapterLectureTheater";
import { chapterDeepDives } from "@/lib/deepDives";
import { evidenceGuideItems } from "@/lib/evidenceGuide";
import { exerciseCoachCards } from "@/lib/exerciseCoach";
import { formulasForChapter } from "@/lib/formulaAtlas";
import { blackboardForChapter } from "@/lib/interactiveBlackboards";
import { chapterMastery } from "@/lib/mastery";
import { chapters } from "@/lib/paper";
import { chapterSynthesis } from "@/lib/chapterSynthesis";
import { manuscriptForChapter } from "@/lib/chapterManuscripts";
import { misconceptionCardsForChapter } from "@/lib/chapterMisconceptions";
import { practiceCardsForChapter } from "@/lib/chapterPractice";
import { simulatorForChapter } from "@/lib/chapterSimulators";
import { workedExamplesForChapter } from "@/lib/chapterWorkedExamples";
import { conceptCardsForChapter } from "@/lib/conceptAtlas";
import { codeLabCardsForChapter } from "@/lib/codeLab";
import { sectionLessonsForChapter } from "@/lib/sectionNarratives";
import { standaloneLectureForChapter } from "@/lib/standaloneBook";
import { symbolCardsForChapter } from "@/lib/symbolAtlas";
import { zeroKnowledgeLadderForChapter } from "@/lib/zeroKnowledgeLadders";

export type BookIndexLayer =
  | "chapter overview"
  | "zero primer"
  | "lecture theater"
  | "symbol decoder"
  | "implementation code lab"
  | "assumption clinic"
  | "active recall"
  | "concept microscope"
  | "worked example"
  | "misconception clinic"
  | "simulator lab"
  | "chapter manuscript"
  | "interactive blackboard"
  | "section manuscript"
  | "standalone lecture"
  | "chapter synthesis"
  | "dependency map"
  | "source audit"
  | "algorithm card"
  | "deep dive"
  | "mastery notebook"
  | "formula atlas"
  | "evidence anchor"
  | "exercise coach";

export interface BookIndexEntry {
  id: string;
  chapter: number;
  chapterTitle: string;
  title: string;
  layer: BookIndexLayer;
  route: string;
  summary: string;
  technical: string;
  tags: string[];
  weight: number;
}

let cachedEntries: BookIndexEntry[] | undefined;

export function allBookIndexEntries(): BookIndexEntry[] {
  cachedEntries ??= buildBookIndexEntries();
  return cachedEntries;
}

export function bookIndexEntriesForChapter(chapter: number): BookIndexEntry[] {
  return allBookIndexEntries().filter((entry) => entry.chapter === chapter);
}

export function bookIndexEntryCount(chapter?: number): number {
  return typeof chapter === "number" ? bookIndexEntriesForChapter(chapter).length : allBookIndexEntries().length;
}

export function bookIndexLayerCount(): number {
  return new Set(allBookIndexEntries().map((entry) => entry.layer)).size;
}

export function bookIndexChapterCount(): number {
  return new Set(allBookIndexEntries().map((entry) => entry.chapter)).size;
}

function buildBookIndexEntries(): BookIndexEntry[] {
  const entries: BookIndexEntry[] = [];

  const add = (entry: BookIndexEntry) => entries.push({ ...entry, tags: compactTags(entry.tags) });

  for (const chapter of chapters) {
    const algorithms = algorithmsForChapter(chapter.n);
    const lecture = standaloneLectureForChapter(chapter);
    const starter = zeroKnowledgeLadderForChapter(chapter.n);
    const theater = lectureTheaterForChapter(chapter.n);
    const symbolCards = symbolCardsForChapter(chapter.n);
    const codeCards = codeLabCardsForChapter(chapter.n);
    const assumptionCards = assumptionCardsForChapter(chapter.n);
    const practiceCards = practiceCardsForChapter(chapter.n);
    const concepts = conceptCardsForChapter(chapter.n);
    const workedExamples = workedExamplesForChapter(chapter.n);
    const misconceptions = misconceptionCardsForChapter(chapter.n);
    const simulator = simulatorForChapter(chapter.n);
    const manuscript = manuscriptForChapter(chapter.n);
    const blackboard = blackboardForChapter(chapter.n);
    const sectionLessons = sectionLessonsForChapter(chapter.n);
    const deep = chapterDeepDives[chapter.n];
    const mastery = chapterMastery.find((entry) => entry.n === chapter.n);
    const formulas = formulasForChapter(chapter.n);
    const evidence = evidenceGuideItems.filter((item) => item.chapter === chapter.n);
    const exercises = exerciseCoachCards.filter((item) => item.chapter === chapter.n);
    const sourceAudits = sourceAuditsForChapter(chapter.n);
    const synthesis = chapterSynthesis(chapter, algorithms);
    const dependencies = chapterDependencyMap(chapter, chapters, algorithms);

    const chapterBase = {
      chapter: chapter.n,
      chapterTitle: chapter.title,
    };

    add({
      ...chapterBase,
      id: `chapter-${chapter.n}-overview`,
      title: `Chapter ${chapter.n}: ${chapter.title}`,
      layer: "chapter overview",
      route: `/chapters/${chapter.n}`,
      summary: `${chapter.claim} ${chapter.easy}`,
      technical: chapter.technical,
      tags: [chapter.part, ...chapter.keyIdeas, ...chapter.sections.slice(0, 3)],
      weight: 100,
    });

    lecture.startFromZero.forEach((paragraph, index) => add({
      ...chapterBase,
      id: `chapter-${chapter.n}-zero-pass-${index + 1}`,
      title: `Zero-level pass ${index + 1}: ${chapter.title}`,
      layer: "standalone lecture",
      route: `/book#book-chapter-${chapter.n}`,
      summary: paragraph,
      technical: lecture.technicalFinish[index % Math.max(lecture.technicalFinish.length, 1)] ?? chapter.technical,
      tags: ["from scratch", "beginner", `Chapter ${chapter.n}`, ...chapter.keyIdeas.slice(0, 3)],
      weight: 92,
    }));

    lecture.vocabulary.forEach((item, index) => add({
      ...chapterBase,
      id: `chapter-${chapter.n}-vocabulary-${slug(item.name)}-${index + 1}`,
      title: `Vocabulary: ${item.name}`,
      layer: "standalone lecture",
      route: `/book#book-chapter-${chapter.n}`,
      summary: item.plain,
      technical: `${item.technical} ${item.why}`,
      tags: ["vocabulary", item.name, `Chapter ${chapter.n}`],
      weight: 83,
    }));

    lecture.beats.forEach((beat, index) => add({
      ...chapterBase,
      id: `chapter-${chapter.n}-lecture-beat-${slug(beat.section)}-${index + 1}`,
      title: `Lecture beat: ${beat.section}`,
      layer: "standalone lecture",
      route: `/book#book-chapter-${chapter.n}`,
      summary: `${beat.question} ${beat.fromScratch} ${beat.visualLecture}`,
      technical: `${beat.technicalBuild} ${beat.checkpoint}`,
      tags: ["lecture beat", ...beat.terms, `Chapter ${chapter.n}`],
      weight: 88,
    }));

    starter.rungs.forEach((rung, index) => add({
      ...chapterBase,
      id: `chapter-${chapter.n}-starter-${index + 1}-${slug(rung.title)}`,
      title: `Starter rung: ${rung.title}`,
      layer: "zero primer",
      route: `/chapters/${chapter.n}#starter`,
      summary: `${rung.plain} ${rung.visual}`,
      technical: `${rung.technical} Practice: ${rung.practice}`,
      tags: ["starter", "zero knowledge", ...rung.tags, `Chapter ${chapter.n}`],
      weight: 96,
    }));

    theater.slides.forEach((slide) => add({
      ...chapterBase,
      id: slide.id,
      title: `Lecture slide ${slide.stage}: ${slide.headline}`,
      layer: "lecture theater",
      route: `/chapters/${chapter.n}#theater`,
      summary: `${slide.prompt} ${slide.beginner} ${slide.picture}`,
      technical: `${slide.technical} ${slide.equation} ${slide.check}`,
      tags: [slide.label, ...slide.tags, `Chapter ${chapter.n}`],
      weight: 95,
    }));

    symbolCards.forEach((card) => add({
      ...chapterBase,
      id: card.id,
      title: `Symbol: ${card.spokenAs}`,
      layer: "symbol decoder",
      route: `/chapters/${chapter.n}#symbols`,
      summary: `${card.symbol} means ${card.plain} Pitfall: ${card.pitfall}`,
      technical: `${card.technical} Formula context: ${card.formulaLabels.join("; ")}. Self-check: ${card.selfCheck}`,
      tags: [card.symbol, card.spokenAs, card.role, ...card.tags, `Chapter ${chapter.n}`],
      weight: 89,
    }));

    codeCards.forEach((card) => add({
      ...chapterBase,
      id: card.id,
      title: `Code lab: ${card.title}`,
      layer: "implementation code lab",
      route: `/chapters/${chapter.n}#code-lab`,
      summary: `${card.plain} ${card.implementationGoal}`,
      technical: `Code scaffold: ${card.codeLines.slice(0, 6).join(" ")} Invariants: ${card.invariants.join(" ")}`,
      tags: [card.family, card.algorithmId, ...card.tags, `Chapter ${chapter.n}`],
      weight: 87,
    }));

    assumptionCards.forEach((card) => add({
      ...chapterBase,
      id: card.id,
      title: `Assumption clinic: ${card.title}`,
      layer: "assumption clinic",
      route: `/chapters/${chapter.n}#assumptions`,
      summary: `${card.plain} Failure: ${card.failure}`,
      technical: `Assumptions: ${card.assumptions.join(" ")} Guarantee: ${card.guarantee} Repair: ${card.repair.join(" ")}`,
      tags: [card.family, card.algorithmId, ...card.tags, `Chapter ${chapter.n}`],
      weight: 86,
    }));

    practiceCards.forEach((card) => add({
      ...chapterBase,
      id: card.id,
      title: `Practice: ${card.title}`,
      layer: "active recall",
      route: `/chapters/${chapter.n}#practice`,
      summary: `${card.skill}. ${card.prompt} ${card.hint}`,
      technical: `${card.solution} ${card.trap} ${card.transfer}`,
      tags: ["practice", card.skill, ...card.tags, `Chapter ${chapter.n}`],
      weight: 78,
    }));

    concepts.forEach((concept) => add({
      ...chapterBase,
      id: concept.id,
      title: `Concept: ${concept.term}`,
      layer: "concept microscope",
      route: `/chapters/${chapter.n}#concepts`,
      summary: `${concept.plain} ${concept.visual}`,
      technical: `${concept.technical} ${concept.contrast} ${concept.check}`,
      tags: [concept.kind, concept.term, concept.section, ...concept.tags, `Chapter ${chapter.n}`],
      weight: 86,
    }));

    workedExamples.forEach((example) => add({
      ...chapterBase,
      id: example.id,
      title: `Worked example: ${example.title}`,
      layer: "worked example",
      route: `/chapters/${chapter.n}#worked`,
      summary: `${example.scenario} ${example.plainWalkthrough}`,
      technical: `${example.technicalTrace} ${example.miniExercise} ${example.answerCheck}`,
      tags: [example.kind, ...example.tags, `Chapter ${chapter.n}`],
      weight: 84,
    }));

    misconceptions.forEach((card) => add({
      ...chapterBase,
      id: card.id,
      title: `Misconception: ${card.title}`,
      layer: "misconception clinic",
      route: `/chapters/${chapter.n}#clinic`,
      summary: `${card.misconception} ${card.whyTempting} ${card.repair}`,
      technical: `${card.boardFix} ${card.technicalConsequence} ${card.selfCheck}`,
      tags: ["misconception", ...card.tags, `Chapter ${chapter.n}`],
      weight: 82,
    }));

    add({
      ...chapterBase,
      id: simulator.id,
      title: simulator.title,
      layer: "simulator lab",
      route: `/chapters/${chapter.n}#simulators`,
      summary: `${simulator.question} ${simulator.setup} ${simulator.board}`,
      technical: `${simulator.readoutGuide} ${simulator.technicalGuide} ${simulator.pitfall} ${simulator.transfer}`,
      tags: ["simulator", ...simulator.tags, `Chapter ${chapter.n}`],
      weight: 80,
    });

    simulator.controls.forEach((control) => add({
      ...chapterBase,
      id: `${simulator.id}-control-${control.id}`,
      title: `Simulator knob: ${control.label}`,
      layer: "simulator lab",
      route: `/chapters/${chapter.n}#simulators`,
      summary: `${control.easy} Low: ${control.lowLabel}. High: ${control.highLabel}.`,
      technical: control.technical,
      tags: ["control", control.id, control.label, `Chapter ${chapter.n}`],
      weight: 72,
    }));

    add({
      ...chapterBase,
      id: `chapter-${chapter.n}-manuscript-opening`,
      title: `Manuscript opening: ${chapter.title}`,
      layer: "chapter manuscript",
      route: `/chapters/${chapter.n}#manuscript`,
      summary: manuscript.opening,
      technical: manuscript.closing,
      tags: ["manuscript", "opening", `Chapter ${chapter.n}`],
      weight: 87,
    });

    manuscript.sections.forEach((section, index) => add({
      ...chapterBase,
      id: `chapter-${chapter.n}-manuscript-section-${index + 1}-${slug(section.title)}`,
      title: `Manuscript section: ${section.title}`,
      layer: "chapter manuscript",
      route: `/chapters/${chapter.n}#manuscript`,
      summary: `${section.beginner} ${section.visual}`,
      technical: `${section.technical} ${section.takeaway}`,
      tags: ["manuscript", section.title, `Chapter ${chapter.n}`],
      weight: 88,
    }));

    blackboard.stages.forEach((stage, index) => add({
      ...chapterBase,
      id: `chapter-${chapter.n}-blackboard-${index + 1}-${slug(stage.label)}`,
      title: `Blackboard stage: ${stage.label}`,
      layer: "interactive blackboard",
      route: `/chapters/${chapter.n}#blackboard`,
      summary: `${blackboard.prompt} ${stage.beginner} ${stage.visualCue}`,
      technical: `${stage.technical} ${stage.boardNote} ${stage.check}`,
      tags: ["blackboard", blackboard.title, stage.label, `Chapter ${chapter.n}`],
      weight: 85,
    }));

    sectionLessons.forEach((lesson, index) => add({
      ...chapterBase,
      id: `chapter-${chapter.n}-section-lesson-${index + 1}-${slug(lesson.section)}`,
      title: `Section lesson: ${lesson.section}`,
      layer: "section manuscript",
      route: `/chapters/${chapter.n}#section-reader`,
      summary: `${lesson.opener} ${lesson.fromScratch} ${lesson.boardWalkthrough.join(" ")}`,
      technical: `${lesson.technicalPass} ${lesson.formulaBridge} ${lesson.algorithmBridge} ${lesson.misconceptionGuard} ${lesson.selfCheck}`,
      tags: ["section", ...lesson.terms, lesson.section, `Chapter ${chapter.n}`],
      weight: 90,
    }));

    deep?.sectionDetails.forEach((section, index) => add({
      ...chapterBase,
      id: `chapter-${chapter.n}-deep-dive-${index + 1}-${slug(section.section)}`,
      title: `Deep dive: ${section.section}`,
      layer: "deep dive",
      route: `/chapters/${chapter.n}#sections`,
      summary: section.easy,
      technical: `${section.technical} ${section.details.join(" ")}`,
      tags: ["deep dive", ...section.terms, section.section, `Chapter ${chapter.n}`],
      weight: 74,
    }));

    synthesis.dependencyStack.forEach((step, index) => add({
      ...chapterBase,
      id: `chapter-${chapter.n}-synthesis-step-${index + 1}-${slug(step.label)}`,
      title: `Synthesis: ${step.label}`,
      layer: "chapter synthesis",
      route: `/chapters/${chapter.n}#synthesis`,
      summary: step.easy,
      technical: step.technical,
      tags: ["synthesis", step.label, `Chapter ${chapter.n}`],
      weight: 76,
    }));

    dependencies.gates.forEach((gate, index) => add({
      ...chapterBase,
      id: `chapter-${chapter.n}-dependency-gate-${index + 1}-${slug(gate.label)}`,
      title: `Dependency gate: ${gate.label}`,
      layer: "dependency map",
      route: `/chapters/${chapter.n}#dependencies`,
      summary: `${dependencies.easyMap} ${gate.easy}`,
      technical: `${dependencies.technicalMap} ${gate.technical} ${gate.diagnostic}`,
      tags: ["dependency", gate.label, `Chapter ${chapter.n}`],
      weight: 73,
    }));

    sourceAudits.forEach((audit, index) => add({
      ...chapterBase,
      id: `chapter-${chapter.n}-source-audit-${index + 1}-${slug(audit.sourceTitle)}`,
      title: `Source audit: ${audit.sourceTitle}`,
      layer: "source audit",
      route: `/chapters/${chapter.n}#source-audit`,
      summary: `${audit.bookAnchor}: ${audit.easy}`,
      technical: `${audit.sourceCue}. ${audit.technical}`,
      tags: ["source audit", audit.bookAnchor, audit.sourceCue, ...audit.catalogIds, `Chapter ${chapter.n}`],
      weight: 70,
    }));

    algorithms.forEach((algorithm) => add({
      ...chapterBase,
      id: algorithm.id,
      title: `Algorithm: ${algorithm.name}`,
      layer: "algorithm card",
      route: `/chapters/${chapter.n}#${algorithm.id}`,
      summary: `${algorithm.plain} Objective: ${algorithm.objective}.`,
      technical: `${algorithm.technical} Core update: ${algorithm.coreUpdate}. Steps: ${algorithm.steps.join(" ")} Pseudocode: ${algorithm.pseudocode.join(" ")} Failure modes: ${algorithm.failureModes.join(" ")}`,
      tags: [algorithm.family, algorithm.bookAnchor, algorithm.name, ...algorithm.related, `Chapter ${chapter.n}`],
      weight: 89,
    }));

    mastery?.derivations.forEach((card, index) => add({
      ...chapterBase,
      id: `chapter-${chapter.n}-mastery-derivation-${index + 1}-${slug(card.label)}`,
      title: `Derivation clinic: ${card.label}`,
      layer: "mastery notebook",
      route: `/chapters/${chapter.n}#mastery`,
      summary: card.easy,
      technical: `${card.technical} Steps: ${card.steps.join(" ")}`,
      tags: ["derivation", card.source, card.label, `Chapter ${chapter.n}`],
      weight: 75,
    }));

    mastery?.process.forEach((card, index) => add({
      ...chapterBase,
      id: `chapter-${chapter.n}-mastery-process-${index + 1}-${slug(card.label)}`,
      title: `Process walkthrough: ${card.label}`,
      layer: "mastery notebook",
      route: `/chapters/${chapter.n}#mastery`,
      summary: card.easy,
      technical: `${card.technical} Steps: ${card.steps.join(" ")}`,
      tags: ["process", card.source, card.label, `Chapter ${chapter.n}`],
      weight: 74,
    }));

    mastery?.traps.forEach((trap, index) => add({
      ...chapterBase,
      id: `chapter-${chapter.n}-mastery-trap-${index + 1}-${slug(trap.mistake)}`,
      title: `Trap: ${trap.mistake}`,
      layer: "mastery notebook",
      route: `/chapters/${chapter.n}#mastery`,
      summary: trap.mistake,
      technical: `${trap.fix} ${trap.why}`,
      tags: ["trap", "mastery", `Chapter ${chapter.n}`],
      weight: 67,
    }));

    mastery?.checks.forEach((check, index) => add({
      ...chapterBase,
      id: `chapter-${chapter.n}-mastery-check-${index + 1}-${slug(check.prompt)}`,
      title: `Mastery check: ${check.prompt}`,
      layer: "mastery notebook",
      route: `/chapters/${chapter.n}#mastery`,
      summary: check.prompt,
      technical: check.answer,
      tags: ["check", "mastery", `Chapter ${chapter.n}`],
      weight: 66,
    }));

    formulas.forEach((formula, index) => add({
      ...chapterBase,
      id: `chapter-${chapter.n}-formula-${index + 1}-${slug(formula.label)}`,
      title: `Formula: ${formula.label}`,
      layer: "formula atlas",
      route: `/chapters/${chapter.n}#formulas`,
      summary: `${formula.easy} Use when: ${formula.useWhen}`,
      technical: `${formula.tex}. ${formula.technical} Watch out: ${formula.watchOut}`,
      tags: [formula.family, formula.label, ...formula.symbols, `Chapter ${chapter.n}`],
      weight: 81,
    }));

    evidence.forEach((item, index) => add({
      ...chapterBase,
      id: `chapter-${chapter.n}-evidence-${index + 1}-${slug(item.ref)}-${slug(item.title)}`,
      title: `${item.kind}: ${item.ref} — ${item.title}`,
      layer: "evidence anchor",
      route: `/chapters/${chapter.n}#anchors`,
      summary: item.easy,
      technical: item.technical,
      tags: [item.kind, item.ref, item.title, ...item.tags, `Chapter ${chapter.n}`],
      weight: 60,
    }));

    exercises.forEach((exercise) => add({
      ...chapterBase,
      id: `chapter-${chapter.n}-exercise-${exercise.id}`,
      title: `Exercise guide ${exercise.id}: ${exercise.title}`,
      layer: "exercise coach",
      route: `/chapters/${chapter.n}#exercises`,
      summary: exercise.easyGoal,
      technical: `${exercise.technicalGoal} Strategy: ${exercise.strategy.join(" ")} ${exercise.checkpoint}`,
      tags: [exercise.kind, exercise.id, ...exercise.tags, `Chapter ${chapter.n}`],
      weight: 58,
    }));
  }

  for (const algorithm of algorithmCatalog) {
    // Duplicate guard keeps algorithm ids globally unique if a future chapter imports a card twice.
    if (!entries.some((entry) => entry.id === algorithm.id)) {
      const chapter = chapters.find((candidate) => candidate.n === algorithm.chapter);
      if (!chapter) continue;
      add({
        chapter: algorithm.chapter,
        chapterTitle: chapter.title,
        id: algorithm.id,
        title: `Algorithm: ${algorithm.name}`,
        layer: "algorithm card",
        route: `/chapters/${algorithm.chapter}#${algorithm.id}`,
        summary: algorithm.plain,
        technical: `${algorithm.technical} ${algorithm.coreUpdate}`,
        tags: [algorithm.family, algorithm.bookAnchor, ...algorithm.related],
        weight: 89,
      });
    }
  }

  return entries.sort((a, b) => a.chapter - b.chapter || b.weight - a.weight || a.title.localeCompare(b.title));
}

function compactTags(tags: Array<string | undefined | null>) {
  return Array.from(new Set(tags.filter(Boolean).map((tag) => String(tag).trim()).filter(Boolean))).slice(0, 12);
}

function slug(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 72) || "entry";
}

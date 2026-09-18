import { algorithmsForChapter } from "@/lib/algorithmCatalog";
import { conceptCardsForChapter } from "@/lib/conceptAtlas";
import { formulasForChapter } from "@/lib/formulaAtlas";
import { foundationDictionaryCardsForChapter } from "@/lib/foundationDictionary";
import { mathRescueCardsForChapter } from "@/lib/mathRescue";
import { chapters, type Chapter } from "@/lib/paper";
import { zeroKnowledgeLadderForChapter, type ZeroKnowledgeRung } from "@/lib/zeroKnowledgeLadders";

export const readinessModes = ["diagnose", "bridge", "visual", "technical", "exit"] as const;

export type ReadinessMode = (typeof readinessModes)[number];
export type ReadinessStage = "entry" | "math" | "method";

export interface ReadinessCoachCard {
  id: string;
  chapter: number;
  chapterTitle: string;
  part: string;
  stage: ReadinessStage;
  stageLabel: string;
  route: string;
  title: string;
  entryQuestion: string;
  noviceBridge: string;
  visualModel: string;
  technicalTarget: string;
  rescueSteps: string[];
  exitCheck: string;
  prerequisites: string[];
  tags: string[];
}

let cachedCards: ReadinessCoachCard[] | undefined;

export function allReadinessCards(): ReadinessCoachCard[] {
  cachedCards ??= chapters.flatMap((chapter) => readinessCardsForChapter(chapter.n));
  return cachedCards;
}

export function readinessCardsForChapter(chapterNumber: number): ReadinessCoachCard[] {
  const chapter = chapters.find((entry) => entry.n === chapterNumber);
  if (!chapter) throw new Error(`Missing chapter ${chapterNumber}`);

  const ladder = zeroKnowledgeLadderForChapter(chapter.n);
  const foundations = foundationDictionaryCardsForChapter(chapter.n);
  const mathCards = mathRescueCardsForChapter(chapter.n);
  const concepts = conceptCardsForChapter(chapter.n);
  const formulas = formulasForChapter(chapter.n);
  const algorithms = algorithmsForChapter(chapter.n);
  const firstAlgorithm = algorithms[0];
  const firstFormula = formulas[0];
  const firstMath = mathCards[0];
  const firstConcept = concepts[0];

  return [
    makeCard({
      chapter,
      stage: "entry",
      stageLabel: "Entry diagnosis",
      title: `Can you draw Chapter ${chapter.n}'s learning loop before any notation?`,
      rung: ladder.rungs[0],
      anchorTerm: foundations[0]?.term ?? chapter.keyIdeas[0] ?? chapter.title,
      anchorPlain: foundations[0]?.beginnerMeaning ?? firstConcept?.plain ?? chapter.easy,
      visualModel: ladder.rungs[0]?.visual ?? `Draw the agent, environment, action, feedback, and learned object for ${chapter.title}.`,
      technicalTarget: `${chapter.technical} Before proceeding, connect this target to ${chapter.keyIdeas.slice(0, 3).join(", ")}.`,
      rescueFocus: `the learner-world-feedback loop in Chapter ${chapter.n}`,
      exitCheck: `Without notes, explain why ${chapter.claim.charAt(0).toLowerCase()}${chapter.claim.slice(1)} Then label agent, environment, state or observation, action, reward, and learned object on one sketch.`,
      prerequisites: compactTags(["agent", "environment", "reward", ...ladder.rungs[0]?.tags ?? [], ...chapter.keyIdeas.slice(0, 2)]),
    }),
    makeCard({
      chapter,
      stage: "math",
      stageLabel: "Math readiness",
      title: `Can you say what the chapter's main calculation is measuring?`,
      rung: ladder.rungs[1] ?? ladder.rungs[0],
      anchorTerm: firstMath?.object ?? firstFormula?.label ?? chapter.equations[0] ?? chapter.keyIdeas[0] ?? chapter.title,
      anchorPlain: firstMath?.intuition ?? firstFormula?.easy ?? firstConcept?.plain ?? chapter.easy,
      visualModel: firstMath?.boardPicture ?? `Put the chapter's estimate on the board, draw the data that moves it, and mark what future reward or prediction it is trying to summarize.`,
      technicalTarget: firstMath?.notationBridge ?? firstFormula?.technical ?? chapter.technical,
      rescueFocus: `the chapter calculation ${firstMath?.object ?? firstFormula?.label ?? chapter.equations[0] ?? "before symbols"}`,
      exitCheck: firstMath?.selfCheck ?? firstFormula?.useWhen ?? `State which quantity Chapter ${chapter.n} estimates, what target teaches it, and what would make the calculation misleading.`,
      prerequisites: compactTags([...(firstMath?.symbols ?? []), ...(firstFormula?.symbols ?? []), ...chapter.equations.slice(0, 2), ...chapter.keyIdeas.slice(0, 2)]),
    }),
    makeCard({
      chapter,
      stage: "method",
      stageLabel: "Method readiness",
      title: `Can you turn the first method into data, target, update, and check?`,
      rung: ladder.rungs[2] ?? ladder.rungs[0],
      anchorTerm: firstAlgorithm?.name ?? chapter.algorithms[0] ?? firstConcept?.term ?? chapter.title,
      anchorPlain: firstAlgorithm?.plain ?? firstConcept?.plain ?? chapter.easy,
      visualModel: `Draw a four-column trace for ${firstAlgorithm?.name ?? chapter.title}: data observed, target computed, object changed, and evidence that the change helped.`,
      technicalTarget: firstAlgorithm ? `${firstAlgorithm.technical} Core target/update: ${firstAlgorithm.coreUpdate}.` : `${chapter.technical} Turn the chapter method into named data, target, update, and evaluation objects.`,
      rescueFocus: `the method trace for ${firstAlgorithm?.name ?? chapter.algorithms[0] ?? chapter.title}`,
      exitCheck: firstAlgorithm ? `Run one imagined transition and say which line of ${firstAlgorithm.name} reads data, builds the target, changes the estimate or policy, and could fail first.` : `Explain one chapter method as a repeatable trace with data, target, update, and a failure check.`,
      prerequisites: compactTags([firstAlgorithm?.family, firstAlgorithm?.bookAnchor, ...(firstAlgorithm?.related ?? []), ...chapter.algorithms.slice(0, 2), ...chapter.commonConfusions.slice(0, 1)]),
    }),
  ];
}

export function readinessCardCount(chapter?: number): number {
  return typeof chapter === "number" ? readinessCardsForChapter(chapter).length : allReadinessCards().length;
}

export function readinessModeCount(chapter?: number): number {
  return readinessCardCount(chapter) * readinessModes.length;
}

export function readinessChapterCount(): number {
  return new Set(allReadinessCards().map((card) => card.chapter)).size;
}

export function readinessRescueStepCount(chapter?: number): number {
  const cards = typeof chapter === "number" ? readinessCardsForChapter(chapter) : allReadinessCards();
  return cards.reduce((sum, card) => sum + card.rescueSteps.length, 0);
}

export function readinessPrerequisiteCount(chapter?: number): number {
  const cards = typeof chapter === "number" ? readinessCardsForChapter(chapter) : allReadinessCards();
  return new Set(cards.flatMap((card) => card.prerequisites.map(normalize))).size;
}

type CardInput = {
  chapter: Chapter;
  stage: ReadinessStage;
  stageLabel: string;
  title: string;
  rung?: ZeroKnowledgeRung;
  anchorTerm: string;
  anchorPlain: string;
  visualModel: string;
  technicalTarget: string;
  rescueFocus: string;
  exitCheck: string;
  prerequisites: string[];
};

function makeCard(input: CardInput): ReadinessCoachCard {
  const plainTerm = input.anchorTerm.replace(/\s+/g, " ").trim();
  const bridge = input.rung?.plain ?? input.anchorPlain;
  return {
    id: `readiness-ch${input.chapter.n}-${input.stage}-${slug(plainTerm)}`,
    chapter: input.chapter.n,
    chapterTitle: input.chapter.title,
    part: input.chapter.part,
    stage: input.stage,
    stageLabel: input.stageLabel,
    route: `/chapters/${input.chapter.n}#readiness`,
    title: input.title,
    entryQuestion: `Readiness question: before opening the dense lecture, can you explain ${plainTerm} in your own words and point to its job in Chapter ${input.chapter.n}?`,
    noviceBridge: `If the answer is no, start here: ${bridge} In plain language, ${input.anchorPlain.charAt(0).toLowerCase()}${input.anchorPlain.slice(1)} The point is not to memorize a term; it is to know what problem the chapter is solving before formulas appear.`,
    visualModel: input.visualModel,
    technicalTarget: input.technicalTarget,
    rescueSteps: compactList([
      `Pause and name the missing object in ${input.rescueFocus}: is it data, state, reward, value, policy, model, target, or update?`,
      `Rewrite the idea in one sentence using no symbols: ${input.anchorPlain}`,
      `Draw the board picture: ${input.visualModel}`,
      `Attach the technical target: ${input.technicalTarget}`,
      `Try the exit check and only continue when you can answer without copying text: ${input.exitCheck}`,
    ]),
    exitCheck: input.exitCheck,
    prerequisites: input.prerequisites,
    tags: compactTags(["readiness coach", input.stage, input.stageLabel, `Chapter ${input.chapter.n}`, input.chapter.part, plainTerm, ...input.prerequisites]),
  };
}

function compactList(items: (string | undefined)[]): string[] {
  return Array.from(new Set(items.filter(Boolean).map((item) => item!.trim()).filter(Boolean))).slice(0, 6);
}

function compactTags(tags: Array<string | undefined | null>) {
  return Array.from(new Set(tags.filter(Boolean).map((tag) => String(tag).trim()).filter(Boolean))).slice(0, 12);
}

function normalize(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function slug(value: string) {
  return normalize(value).replace(/\s+/g, "-").slice(0, 72) || "checkpoint";
}

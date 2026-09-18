import { algorithmsForChapter } from "@/lib/algorithmCatalog";
import { analogiesForChapter } from "@/lib/analogies";
import { conceptCardsForChapter } from "@/lib/conceptAtlas";
import { mathRescueCardsForChapter } from "@/lib/mathRescue";
import { chapters, type Chapter } from "@/lib/paper";
import { visualStoriesForChapter } from "@/lib/visualStory";
import { zeroKnowledgeLadderForChapter } from "@/lib/zeroKnowledgeLadders";

export const socraticModes = ["question", "hint", "board", "technical", "try"] as const;

export type SocraticMode = (typeof socraticModes)[number];
export type SocraticSource = "starter" | "concept" | "math" | "story" | "analogy" | "algorithm";

export interface SocraticTutorCard {
  id: string;
  chapter: number;
  chapterTitle: string;
  part: string;
  title: string;
  source: SocraticSource;
  sourceLabel: string;
  route: string;
  anchor: string;
  learnerQuestion: string;
  tutorHint: string;
  boardSteps: string[];
  technicalAnswer: string;
  tryIt: string;
  expectedAnswer: string;
  misconceptionProbe: string;
  tags: string[];
}

type Candidate = Omit<SocraticTutorCard, "id" | "chapter" | "chapterTitle" | "part" | "route" | "tags"> & { tags: string[] };

let cachedCards: SocraticTutorCard[] | undefined;

export function allSocraticTutorCards(): SocraticTutorCard[] {
  cachedCards ??= chapters.flatMap((chapter) => socraticTutorCardsForChapter(chapter.n));
  return cachedCards;
}

export function socraticTutorCardsForChapter(chapterNumber: number): SocraticTutorCard[] {
  const chapter = chapters.find((entry) => entry.n === chapterNumber);
  if (!chapter) throw new Error(`Missing chapter ${chapterNumber}`);

  const candidates = socraticCandidatesForChapter(chapter);
  const chosen = roundRobinUnique(candidates, 6);

  return chosen.map((candidate, index) => ({
    id: `socratic-ch${chapter.n}-${slug(candidate.title)}-${index + 1}`,
    chapter: chapter.n,
    chapterTitle: chapter.title,
    part: chapter.part,
    route: `/chapters/${chapter.n}#socratic-tutor`,
    ...candidate,
    tags: compactTags(["socratic tutor", candidate.source, `Chapter ${chapter.n}`, chapter.part, candidate.anchor, ...candidate.tags, ...chapter.keyIdeas.slice(0, 2)]),
  }));
}

export function socraticTutorCardCount(chapter?: number): number {
  return typeof chapter === "number" ? socraticTutorCardsForChapter(chapter).length : allSocraticTutorCards().length;
}

export function socraticTutorModeCount(chapter?: number): number {
  return socraticTutorCardCount(chapter) * socraticModes.length;
}

export function socraticTutorChapterCount(): number {
  return new Set(allSocraticTutorCards().map((card) => card.chapter)).size;
}

export function socraticTutorSourceCount(): number {
  return new Set(allSocraticTutorCards().map((card) => card.source)).size;
}

export function socraticTutorTurnCount(chapter?: number): number {
  const cards = typeof chapter === "number" ? socraticTutorCardsForChapter(chapter) : allSocraticTutorCards();
  return cards.length * 5;
}

export function socraticTutorBoardStepCount(chapter?: number): number {
  const cards = typeof chapter === "number" ? socraticTutorCardsForChapter(chapter) : allSocraticTutorCards();
  return cards.reduce((sum, card) => sum + card.boardSteps.length, 0);
}

export function socraticTutorAnchorCount(): number {
  return new Set(allSocraticTutorCards().map((card) => normalize(card.anchor))).size;
}

function socraticCandidatesForChapter(chapter: Chapter): Candidate[][] {
  const starter = zeroKnowledgeLadderForChapter(chapter.n).rungs.slice(0, 4).map((rung): Candidate => ({
    title: `Tutor: ${rung.title}`,
    source: "starter",
    sourceLabel: "zero-level tutor",
    anchor: rung.title,
    learnerQuestion: `I do not know reinforcement learning yet. When this chapter says ${rung.title.toLowerCase()}, what should I picture first?`,
    tutorHint: `${rung.plain} Say it before the symbols: who chooses, what world answers, what feedback matters, and what changes next time?`,
    boardSteps: [
      rung.visual,
      `Label one arrow as the learner's choice and one arrow as the world's feedback.`,
      `Write the remembered lesson underneath the loop before naming any theorem.`,
      `Connect the board to Chapter ${chapter.n}'s promise: ${chapter.claim}`,
    ],
    technicalAnswer: `${rung.technical} In this chapter, the precise version is: ${chapter.technical}`,
    tryIt: rung.practice,
    expectedAnswer: `A strong answer names the learner, environment, feedback signal, stored estimate or policy, and one way the chapter will refine that object technically.`,
    misconceptionProbe: `If the learner expects a labeled correct action at every step, pause: the chapter is about learning from consequences, not answer keys.`,
    tags: rung.tags,
  }));

  const concepts = conceptCardsForChapter(chapter.n).slice(0, 4).map((concept): Candidate => ({
    title: `Tutor: ${concept.term}`,
    source: "concept",
    sourceLabel: "concept tutor",
    anchor: concept.term,
    learnerQuestion: `When I see the term ${concept.term}, what is it doing inside the learning loop rather than as a memorized definition?`,
    tutorHint: concept.plain,
    boardSteps: [
      concept.visual,
      `Circle the part of the loop where ${concept.term} changes prediction, choice, or feedback.`,
      `Write one contrast beside it so the term is not confused with the whole chapter.`,
      `End by saying how the term supports the chapter claim: ${chapter.claim}`,
    ],
    technicalAnswer: concept.technical,
    tryIt: concept.check,
    expectedAnswer: `The answer should give a plain role, a location on the board, a technical role, and one contrast such as data versus target, reward versus return, estimate versus policy, or model versus experience.`,
    misconceptionProbe: concept.contrast,
    tags: concept.tags,
  }));

  const math = mathRescueCardsForChapter(chapter.n).slice(0, 4).map((card): Candidate => ({
    title: `Tutor: ${card.object}`,
    source: "math",
    sourceLabel: "math tutor",
    anchor: card.object,
    learnerQuestion: `Why does ${card.object} exist here? What problem would I have if I tried to reason without this mathematical object?`,
    tutorHint: card.intuition,
    boardSteps: [
      card.boardPicture,
      `Point to the reading, target, or error that ${card.object} compresses.`,
      `Write the symbol next to its spoken meaning before manipulating it.`,
      `Ask whether the chapter uses it to predict, improve, compare, weight, trace, or optimize.` ,
    ],
    technicalAnswer: card.notationBridge,
    tryIt: card.selfCheck,
    expectedAnswer: `A complete answer says what ${card.object} measures, which symbols carry it, how Chapter ${chapter.n} uses it, and which pitfall would make the calculation misleading.`,
    misconceptionProbe: card.pitfall,
    tags: card.tags,
  }));

  const stories = visualStoriesForChapter(chapter.n).slice(0, 4).map((story): Candidate => ({
    title: `Tutor: ${story.title.replace(/^Scene: /, "")}`,
    source: "story",
    sourceLabel: "visual tutor",
    anchor: story.title.replace(/^Scene: /, ""),
    learnerQuestion: `In this scene, what should I notice before the formal RL words arrive?`,
    tutorHint: `${story.setting} First describe what the learner sees, then describe the move and feedback in ordinary words.`,
    boardSteps: [
      story.boardAnimation,
      `Put the learner on the left and the world on the right.`,
      `Draw the next move as an arrow, then write the feedback above that arrow.`,
      `Translate the drawing into the chapter's technical vocabulary only after the picture is clear.`,
    ],
    technicalAnswer: story.technicalTranslation,
    tryIt: story.checkpoint,
    expectedAnswer: `The answer should identify the visible state of the scene, the learner's possible move, the feedback or target, and the technical label that Chapter ${chapter.n} gives that piece.`,
    misconceptionProbe: story.pitfall,
    tags: story.tags,
  }));

  const analogies = analogiesForChapter(chapter.n).slice(0, 4).map((analogy): Candidate => ({
    title: `Tutor: ${analogy.title}`,
    source: "analogy",
    sourceLabel: "analogy tutor",
    anchor: analogy.anchor,
    learnerQuestion: `This analogy feels familiar, but how do I keep it from becoming vague?`,
    tutorHint: analogy.everyday,
    boardSteps: [
      `Draw two columns: familiar world on the left, RL object on the right.`,
      ...analogy.mapping.slice(0, 2),
      `Write the limit in a warning box so the analogy becomes a bridge instead of a proof.`,
    ],
    technicalAnswer: analogy.technical,
    tryIt: analogy.transfer,
    expectedAnswer: `The answer should map at least four familiar pieces to exact RL objects and name one place where the analogy breaks.`,
    misconceptionProbe: analogy.limits,
    tags: analogy.tags,
  }));

  const algorithms = algorithmsForChapter(chapter.n).slice(0, 4).map((algorithm): Candidate => ({
    title: `Tutor: ${algorithm.name}`,
    source: "algorithm",
    sourceLabel: "algorithm tutor",
    anchor: algorithm.name,
    learnerQuestion: `Before code or pseudocode, what job is ${algorithm.name} trying to do?`,
    tutorHint: algorithm.plain,
    boardSteps: [
      `Write the inputs: ${algorithm.steps[0] ?? "experience or a model"}.`,
      `Write the target or objective: ${algorithm.objective}.`,
      `Draw the update site: ${algorithm.coreUpdate || "change the estimate, policy, or model"}.`,
      `Add the first failure check: ${algorithm.failureModes[0] ?? "check data coverage, target validity, and representation limits"}.`,
    ],
    technicalAnswer: algorithm.technical,
    tryIt: `On a two-state toy problem, name the data, target, update, and diagnostic you would inspect before trusting ${algorithm.name}.`,
    expectedAnswer: `A strong answer distinguishes the algorithm's data source, target construction, update location, control knob, and first failure mode.`,
    misconceptionProbe: algorithm.failureModes[0] ?? `Do not treat ${algorithm.name} as a magic recipe; it inherits assumptions about data, targets, updates, and representation.`,
    tags: [algorithm.family, algorithm.name, ...algorithm.related],
  }));

  return [starter, concepts, math, stories, analogies, algorithms];
}

function roundRobinUnique(pools: Candidate[][], limit: number): Candidate[] {
  const selected: Candidate[] = [];
  const seen = new Set<string>();
  const maxLength = Math.max(...pools.map((pool) => pool.length));
  for (let row = 0; row < maxLength && selected.length < limit; row++) {
    for (const pool of pools) {
      const candidate = pool[row];
      if (!candidate) continue;
      const key = normalize(candidate.title);
      if (!key || seen.has(key)) continue;
      seen.add(key);
      selected.push(candidate);
      if (selected.length >= limit) break;
    }
  }
  return selected;
}

function compactTags(tags: Array<string | undefined | null>) {
  return Array.from(new Set(tags.filter(Boolean).map((tag) => String(tag).trim()).filter(Boolean))).slice(0, 14);
}

function normalize(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function slug(value: string) {
  return normalize(value).replace(/\s+/g, "-").slice(0, 72) || "tutor";
}

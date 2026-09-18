import { algorithmsForChapter } from "@/lib/algorithmCatalog";
import { conceptCardsForChapter } from "@/lib/conceptAtlas";
import { formulasForChapter } from "@/lib/formulaAtlas";
import { chapters, type Chapter } from "@/lib/paper";
import { standaloneLectureForChapter } from "@/lib/standaloneBook";
import { zeroKnowledgeLadderForChapter } from "@/lib/zeroKnowledgeLadders";

export const foundationDictionaryModes = ["meaning", "picture", "technical", "trap", "teach"] as const;

export type FoundationDictionaryMode = (typeof foundationDictionaryModes)[number];
export type FoundationDictionarySource = "starter" | "vocabulary" | "concept" | "formula" | "algorithm";

export interface FoundationDictionaryCard {
  id: string;
  chapter: number;
  chapterTitle: string;
  part: string;
  term: string;
  source: FoundationDictionarySource;
  sourceLabel: string;
  route: string;
  beginnerMeaning: string;
  boardPicture: string;
  technicalMeaning: string;
  commonTrap: string;
  teachBack: string;
  prerequisites: string[];
  neighbors: string[];
  tags: string[];
}

type Candidate = Omit<FoundationDictionaryCard, "id" | "chapter" | "chapterTitle" | "part" | "route" | "neighbors" | "tags"> & { tags: string[] };

let cachedCards: FoundationDictionaryCard[] | undefined;

export function allFoundationDictionaryCards(): FoundationDictionaryCard[] {
  cachedCards ??= chapters.flatMap((chapter) => foundationDictionaryCardsForChapter(chapter.n));
  return cachedCards;
}

export function foundationDictionaryCardsForChapter(chapterNumber: number): FoundationDictionaryCard[] {
  const chapter = chapters.find((entry) => entry.n === chapterNumber);
  if (!chapter) throw new Error(`Missing chapter ${chapterNumber}`);

  const candidates = foundationCandidatesForChapter(chapter);
  const chosen = roundRobinUnique(candidates, 14);
  const terms = chosen.map((candidate) => candidate.term);

  return chosen.map((candidate, index) => ({
    id: `foundation-ch${chapter.n}-${slug(candidate.term)}-${index + 1}`,
    chapter: chapter.n,
    chapterTitle: chapter.title,
    part: chapter.part,
    route: `/chapters/${chapter.n}#foundations`,
    ...candidate,
    neighbors: neighboringTerms(terms, index, chapter),
    tags: compactTags(["foundation dictionary", candidate.source, `Chapter ${chapter.n}`, chapter.part, ...candidate.tags, ...chapter.keyIdeas.slice(0, 2)]),
  }));
}

export function foundationDictionaryCardCount(chapter?: number): number {
  return typeof chapter === "number" ? foundationDictionaryCardsForChapter(chapter).length : allFoundationDictionaryCards().length;
}

export function foundationDictionaryModeCount(chapter?: number): number {
  return foundationDictionaryCardCount(chapter) * foundationDictionaryModes.length;
}

export function foundationDictionaryChapterCount(): number {
  return new Set(allFoundationDictionaryCards().map((card) => card.chapter)).size;
}

export function foundationDictionaryTermCount(): number {
  return new Set(allFoundationDictionaryCards().map((card) => normalize(card.term))).size;
}

export function foundationDictionarySourceCount(): number {
  return new Set(allFoundationDictionaryCards().map((card) => card.source)).size;
}

function foundationCandidatesForChapter(chapter: Chapter): Candidate[][] {
  const starter = zeroKnowledgeLadderForChapter(chapter.n).rungs.map((rung): Candidate => ({
    term: rung.title,
    source: "starter",
    sourceLabel: "zero-knowledge starter",
    beginnerMeaning: rung.plain,
    boardPicture: rung.visual,
    technicalMeaning: rung.technical,
    commonTrap: `Do not treat ${rung.title.toLowerCase()} as a slogan. In Chapter ${chapter.n}, the word matters because it changes how you draw the agent, feedback, target, or update before formulas appear.`,
    teachBack: rung.practice,
    prerequisites: ["agent", "environment", "reward", ...rung.tags].slice(0, 5),
    tags: rung.tags,
  }));

  const lecture = standaloneLectureForChapter(chapter);
  const vocabulary = lecture.vocabulary.slice(0, 6).map((item): Candidate => ({
    term: item.name,
    source: "vocabulary",
    sourceLabel: "chapter vocabulary",
    beginnerMeaning: item.plain,
    boardPicture: `Draw ${item.name} as a labeled part of Chapter ${chapter.n}'s loop: put the situation on the left, the learner's choice in the middle, feedback on the right, and the memory or policy update underneath.`,
    technicalMeaning: `${item.technical} Why it matters: ${item.why}`,
    commonTrap: `A common mistake is to memorize ${item.name} without saying what object it changes. Always state whether it affects data, reward, return, value, policy, model, target, or update.`,
    teachBack: `Teach-back: explain ${item.name} to a new learner in one sentence, then point to the line of the chapter where ${item.name} becomes necessary: ${chapter.claim}`,
    prerequisites: lecture.vocabulary.slice(0, 4).map((entry) => entry.name),
    tags: [item.name, "vocabulary"],
  }));

  const concepts = conceptCardsForChapter(chapter.n).slice(0, 6).map((concept): Candidate => ({
    term: concept.term,
    source: "concept",
    sourceLabel: "concept microscope",
    beginnerMeaning: concept.plain,
    boardPicture: concept.visual,
    technicalMeaning: concept.technical,
    commonTrap: concept.contrast,
    teachBack: concept.check,
    prerequisites: [concept.section, ...concept.tags].slice(0, 5),
    tags: [concept.kind, concept.section, ...concept.tags],
  }));

  const formulas = formulasForChapter(chapter.n).slice(0, 4).map((formula): Candidate => ({
    term: formula.label,
    source: "formula",
    sourceLabel: "formula atlas",
    beginnerMeaning: formula.easy,
    boardPicture: `Write the formula as a board sentence before symbols: ${formula.label} connects ${formula.symbols.slice(0, 4).join(", ") || "the chapter objects"}. Put each symbol next to the story object it names.`,
    technicalMeaning: `${formula.technical} Formal template: ${formula.tex}`,
    commonTrap: formula.watchOut,
    teachBack: `Use case: ${formula.useWhen} Teach it back by naming every symbol, then saying what would be wrong if one symbol were omitted.`,
    prerequisites: formula.symbols.slice(0, 5),
    tags: [formula.family, formula.label, ...formula.symbols],
  }));

  const algorithms = algorithmsForChapter(chapter.n).slice(0, 5).map((algorithm): Candidate => ({
    term: algorithm.name,
    source: "algorithm",
    sourceLabel: "algorithm card",
    beginnerMeaning: algorithm.plain,
    boardPicture: `Draw ${algorithm.name} as four boxes: data comes in, a target is built, an estimate or policy changes, and behavior is tested on the next small transition.`,
    technicalMeaning: `${algorithm.technical} Objective: ${algorithm.objective} Core update: ${algorithm.coreUpdate}`,
    commonTrap: algorithm.failureModes[0] ?? `Do not run ${algorithm.name} before checking whether the chapter's data and target assumptions hold.`,
    teachBack: `Teach-back: run ${algorithm.name} on a one-transition toy example, naming the stored object, target, update, and failure check in order.`,
    prerequisites: [algorithm.family, ...algorithm.related].slice(0, 5),
    tags: [algorithm.family, algorithm.name, ...algorithm.related],
  }));

  return [starter, vocabulary, concepts, formulas, algorithms];
}

function roundRobinUnique(pools: Candidate[][], limit: number): Candidate[] {
  const selected: Candidate[] = [];
  const seen = new Set<string>();
  const maxLength = Math.max(...pools.map((pool) => pool.length));
  for (let row = 0; row < maxLength && selected.length < limit; row++) {
    for (const pool of pools) {
      const candidate = pool[row];
      if (!candidate) continue;
      const key = normalize(candidate.term);
      if (!key || seen.has(key)) continue;
      seen.add(key);
      selected.push(candidate);
      if (selected.length >= limit) break;
    }
  }
  return selected;
}

function neighboringTerms(terms: string[], index: number, chapter: Chapter) {
  const before = terms[index - 1];
  const after = terms[index + 1];
  return compactTags([before, after, ...chapter.keyIdeas.slice(0, 3)]).slice(0, 5);
}

function compactTags(tags: Array<string | undefined | null>) {
  return Array.from(new Set(tags.filter(Boolean).map((tag) => String(tag).trim()).filter(Boolean))).slice(0, 12);
}

function normalize(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function slug(value: string) {
  return normalize(value).replace(/\s+/g, "-").slice(0, 72) || "term";
}

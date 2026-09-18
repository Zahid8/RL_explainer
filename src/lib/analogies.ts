import { algorithmsForChapter } from "@/lib/algorithmCatalog";
import { conceptCardsForChapter } from "@/lib/conceptAtlas";
import { mathRescueCardsForChapter } from "@/lib/mathRescue";
import { chapters, type Chapter } from "@/lib/paper";
import { visualStoriesForChapter } from "@/lib/visualStory";
import { workedExamplesForChapter } from "@/lib/chapterWorkedExamples";
import { zeroKnowledgeLadderForChapter } from "@/lib/zeroKnowledgeLadders";

export const analogyModes = ["everyday", "mapping", "technical", "limits", "transfer"] as const;

export type AnalogyMode = (typeof analogyModes)[number];
export type AnalogySource = "starter" | "concept" | "math" | "worked" | "story" | "algorithm";

export interface AnalogyCard {
  id: string;
  chapter: number;
  chapterTitle: string;
  part: string;
  title: string;
  source: AnalogySource;
  sourceLabel: string;
  route: string;
  everyday: string;
  mapping: string[];
  technical: string;
  limits: string;
  transfer: string;
  imagePrompt: string;
  anchor: string;
  tags: string[];
}

type Candidate = Omit<AnalogyCard, "id" | "chapter" | "chapterTitle" | "part" | "route" | "tags"> & { tags: string[] };

let cachedAnalogies: AnalogyCard[] | undefined;

export function allAnalogyCards(): AnalogyCard[] {
  cachedAnalogies ??= chapters.flatMap((chapter) => analogiesForChapter(chapter.n));
  return cachedAnalogies;
}

export function analogiesForChapter(chapterNumber: number): AnalogyCard[] {
  const chapter = chapters.find((entry) => entry.n === chapterNumber);
  if (!chapter) throw new Error(`Missing chapter ${chapterNumber}`);

  const candidates = analogyCandidatesForChapter(chapter);
  const chosen = roundRobinUnique(candidates, 6);

  return chosen.map((candidate, index) => ({
    id: `analogy-ch${chapter.n}-${slug(candidate.title)}-${index + 1}`,
    chapter: chapter.n,
    chapterTitle: chapter.title,
    part: chapter.part,
    route: `/chapters/${chapter.n}#analogies`,
    ...candidate,
    tags: compactTags(["analogy", candidate.source, `Chapter ${chapter.n}`, chapter.part, candidate.anchor, ...candidate.tags, ...chapter.keyIdeas.slice(0, 2)]),
  }));
}

export function analogyCardCount(chapter?: number): number {
  return typeof chapter === "number" ? analogiesForChapter(chapter).length : allAnalogyCards().length;
}

export function analogyModeCount(chapter?: number): number {
  return analogyCardCount(chapter) * analogyModes.length;
}

export function analogyChapterCount(): number {
  return new Set(allAnalogyCards().map((card) => card.chapter)).size;
}

export function analogySourceCount(): number {
  return new Set(allAnalogyCards().map((card) => card.source)).size;
}

export function analogyAnchorCount(): number {
  return new Set(allAnalogyCards().map((card) => normalize(card.anchor))).size;
}

export function analogyMappingCount(chapter?: number): number {
  const cards = typeof chapter === "number" ? analogiesForChapter(chapter) : allAnalogyCards();
  return cards.reduce((sum, card) => sum + card.mapping.length, 0);
}

function analogyCandidatesForChapter(chapter: Chapter): Candidate[][] {
  const starter = zeroKnowledgeLadderForChapter(chapter.n).rungs.slice(0, 4).map((rung): Candidate => ({
    title: `${rung.title} as a coaching analogy`,
    source: "starter",
    sourceLabel: "zero-level analogy",
    anchor: rung.title,
    everyday: `Think of ${rung.title.toLowerCase()} like coaching a beginner through a game they have never seen: the coach does not hand over all future answers, but points to what the learner can try, what feedback arrives, and what should be remembered next time.`,
    mapping: [
      `Learner in the analogy → the RL agent or decision maker.`,
      `Game/world response → observation, transition, or reward feedback.`,
      `Remembered lesson → estimate, policy, model, value, or update pressure.`,
      `Next attempt → improved behavior under the chapter's goal.`,
    ],
    technical: `${rung.technical} Chapter ${chapter.n} uses this doorway to reach: ${chapter.technical}`,
    limits: `The analogy is only a doorway. A human coach can explain intent, but an RL problem must specify feedback, data, targets, and updates precisely enough for an algorithm to use them.`,
    transfer: `Transfer check: invent a new activity, label the learner/world/feedback/memory pieces, then say which piece Chapter ${chapter.n} formalizes first.`,
    imagePrompt: rung.visual,
    tags: rung.tags,
  }));

  const concepts = conceptCardsForChapter(chapter.n).slice(0, 4).map((concept): Candidate => ({
    title: `${concept.term} as a map legend`,
    source: "concept",
    sourceLabel: "concept analogy",
    anchor: concept.term,
    everyday: `Treat ${concept.term} like a label on a map: it is not the whole territory, but it tells the learner which landmark to watch while moving through ${chapter.title}.`,
    mapping: [
      `${concept.term} → the named landmark in the chapter loop.`,
      `Map route → the sequence from situation to action to feedback to changed behavior.`,
      `Legend warning → the common confusion that would make the route misleading.`,
      `Destination → the chapter claim: ${chapter.claim}`,
    ],
    technical: concept.technical,
    limits: concept.contrast,
    transfer: concept.check,
    imagePrompt: concept.visual,
    tags: concept.tags,
  }));

  const math = mathRescueCardsForChapter(chapter.n).slice(0, 4).map((card): Candidate => ({
    title: `${card.object} as a measuring instrument`,
    source: "math",
    sourceLabel: "math analogy",
    anchor: card.object,
    everyday: `Read ${card.object} like an instrument on a dashboard: it compresses a moving situation into a number, comparison, or direction so the learner knows what changed.`,
    mapping: [
      `Instrument reading → ${card.object}.`,
      `Needle movement → target, error, gradient, return, ratio, trace, or update pressure.`,
      `Calibration → the assumptions behind symbols and sampling.`,
      `Pilot correction → the policy, value, model, or parameter change the chapter studies.`,
    ],
    technical: card.notationBridge,
    limits: card.pitfall,
    transfer: card.selfCheck,
    imagePrompt: card.boardPicture,
    tags: card.tags,
  }));

  const worked = workedExamplesForChapter(chapter.n).slice(0, 4).map((example): Candidate => ({
    title: `${example.title} as a rehearsal`,
    source: "worked",
    sourceLabel: "worked-example analogy",
    anchor: example.title,
    everyday: `Use ${example.title.toLowerCase()} like rehearsal before a performance: the small scene is not the real deployment, but it lets the learner practice the moves slowly enough to notice errors.`,
    mapping: [
      `Rehearsal script → the toy scenario.`,
      `Stage marks → the board steps.`,
      `Director notes → pitfall and answer check.`,
      `Performance → using the same chapter idea on a new domain.`,
    ],
    technical: example.technicalTrace,
    limits: example.pitfall,
    transfer: example.answerCheck,
    imagePrompt: example.boardSteps.join(" "),
    tags: example.tags,
  }));

  const stories = visualStoriesForChapter(chapter.n).slice(0, 4).map((story): Candidate => ({
    title: `${story.title.replace(/^Scene: /, "")} as a movie frame`,
    source: "story",
    sourceLabel: "visual-story analogy",
    anchor: story.title.replace(/^Scene: /, ""),
    everyday: `Imagine pausing a movie at this frame: ${story.setting} The paused frame lets the learner point at what is visible before technical labels arrive.`,
    mapping: [
      `Movie frame → concrete scene.`,
      `Camera focus → what the learner observes.`,
      `Next cut → the learning move.`,
      `Subtitle → the technical translation.`,
    ],
    technical: story.technicalTranslation,
    limits: story.pitfall,
    transfer: story.checkpoint,
    imagePrompt: story.boardAnimation,
    tags: story.tags,
  }));

  const algorithms = algorithmsForChapter(chapter.n).slice(0, 4).map((algorithm): Candidate => ({
    title: `${algorithm.name} as a feedback recipe`,
    source: "algorithm",
    sourceLabel: "algorithm analogy",
    anchor: algorithm.name,
    everyday: `Treat ${algorithm.name} like a recipe that tastes the result and adjusts the next batch: data comes in, the target is mixed, an error or preference is tasted, and the stored rule changes.`,
    mapping: [
      `Ingredients → data, state, action, reward, or sample.`,
      `Recipe target → ${algorithm.objective}.`,
      `Taste test → error, advantage, preference, or diagnostic.`,
      `Adjusted recipe → ${algorithm.coreUpdate || "the next estimate or policy update"}.`,
    ],
    technical: algorithm.technical,
    limits: algorithm.failureModes[0] ?? `The recipe analogy fails if the data distribution, target, or representation assumptions are ignored.`,
    transfer: `Transfer check: name the input, target, update site, and failure check before using ${algorithm.name} on a new toy problem.`,
    imagePrompt: `Draw ${algorithm.name} as data → target → error/preference → update → behavior.`,
    tags: [algorithm.family, algorithm.name, ...algorithm.related],
  }));

  return [starter, concepts, math, worked, stories, algorithms];
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
  return normalize(value).replace(/\s+/g, "-").slice(0, 72) || "analogy";
}

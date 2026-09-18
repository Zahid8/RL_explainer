import { algorithmsForChapter } from "@/lib/algorithmCatalog";
import { conceptCardsForChapter } from "@/lib/conceptAtlas";
import { workedExamplesForChapter } from "@/lib/chapterWorkedExamples";
import { simulatorForChapter } from "@/lib/chapterSimulators";
import { chapters, type Chapter } from "@/lib/paper";
import { zeroKnowledgeLadderForChapter } from "@/lib/zeroKnowledgeLadders";

export const visualStoryModes = ["scene", "observe", "move", "technical", "check"] as const;

export type VisualStoryMode = (typeof visualStoryModes)[number];
export type VisualStorySource = "starter" | "concept" | "worked" | "algorithm" | "section" | "simulator";

export interface VisualStoryCard {
  id: string;
  chapter: number;
  chapterTitle: string;
  part: string;
  title: string;
  source: VisualStorySource;
  sourceLabel: string;
  route: string;
  setting: string;
  learnerSees: string;
  learnerMoves: string;
  boardAnimation: string;
  technicalTranslation: string;
  checkpoint: string;
  pitfall: string;
  actors: string[];
  props: string[];
  tags: string[];
}

type Candidate = Omit<VisualStoryCard, "id" | "chapter" | "chapterTitle" | "part" | "route" | "tags"> & { tags: string[] };

let cachedStories: VisualStoryCard[] | undefined;

export function allVisualStoryCards(): VisualStoryCard[] {
  cachedStories ??= chapters.flatMap((chapter) => visualStoriesForChapter(chapter.n));
  return cachedStories;
}

export function visualStoriesForChapter(chapterNumber: number): VisualStoryCard[] {
  const chapter = chapters.find((entry) => entry.n === chapterNumber);
  if (!chapter) throw new Error(`Missing chapter ${chapterNumber}`);

  const candidates = visualStoryCandidatesForChapter(chapter);
  const chosen = roundRobinUnique(candidates, 8);

  return chosen.map((candidate, index) => ({
    id: `visual-story-ch${chapter.n}-${slug(candidate.title)}-${index + 1}`,
    chapter: chapter.n,
    chapterTitle: chapter.title,
    part: chapter.part,
    route: `/chapters/${chapter.n}#visual-story`,
    ...candidate,
    tags: compactTags(["visual story", candidate.source, `Chapter ${chapter.n}`, chapter.part, ...candidate.tags, ...candidate.actors, ...candidate.props, ...chapter.keyIdeas.slice(0, 2)]),
  }));
}

export function visualStoryCardCount(chapter?: number): number {
  return typeof chapter === "number" ? visualStoriesForChapter(chapter).length : allVisualStoryCards().length;
}

export function visualStoryModeCount(chapter?: number): number {
  return visualStoryCardCount(chapter) * visualStoryModes.length;
}

export function visualStoryChapterCount(): number {
  return new Set(allVisualStoryCards().map((card) => card.chapter)).size;
}

export function visualStorySceneCount(): number {
  return new Set(allVisualStoryCards().map((card) => normalize(card.title))).size;
}

export function visualStoryActorCount(): number {
  return new Set(allVisualStoryCards().flatMap((card) => card.actors.map(normalize)).filter(Boolean)).size;
}

export function visualStoryPropCount(): number {
  return new Set(allVisualStoryCards().flatMap((card) => card.props.map(normalize)).filter(Boolean)).size;
}

export function visualStorySourceCount(): number {
  return new Set(allVisualStoryCards().map((card) => card.source)).size;
}

function visualStoryCandidatesForChapter(chapter: Chapter): Candidate[][] {
  const ladder = zeroKnowledgeLadderForChapter(chapter.n);
  const concepts = conceptCardsForChapter(chapter.n);
  const worked = workedExamplesForChapter(chapter.n);
  const algorithms = algorithmsForChapter(chapter.n);
  const simulator = simulatorForChapter(chapter.n);
  const primaryIdea = chapter.keyIdeas[0] ?? chapter.claim;
  const secondIdea = chapter.keyIdeas[1] ?? chapter.technical;

  const starter = ladder.rungs.slice(0, 5).map((rung): Candidate => ({
    title: `Scene: ${rung.title}`,
    source: "starter",
    sourceLabel: "from-zero scene",
    setting: `A learner enters Chapter ${chapter.n}, ${chapter.title}, with no RL vocabulary. The first scene is ${rung.title.toLowerCase()}: ${rung.plain}`,
    learnerSees: rung.visual,
    learnerMoves: `Ask the learner to point to the agent, world, choice, feedback, memory, or goal signal before naming any equation. The move is to turn ${rung.title.toLowerCase()} into something visible on the board.`,
    boardAnimation: `Animate the loop as five beats: blank world → visible learner → action arrow → feedback meter → changed memory. Keep ${rung.title.toLowerCase()} highlighted while the arrows move.`,
    technicalTranslation: `${rung.technical} In Chapter ${chapter.n}, this is the doorway into: ${chapter.technical}`,
    checkpoint: rung.practice,
    pitfall: `Do not let the learner memorize the phrase "${rung.title}" without drawing what information moves and what changes after feedback.`,
    actors: compactTags(["learner", "world", rung.tags[0], rung.tags[1]]),
    props: compactTags(["action arrow", "feedback meter", "memory box", ...rung.tags]),
    tags: rung.tags,
  }));

  const conceptScenes = concepts.slice(0, 6).map((concept): Candidate => ({
    title: `Scene: ${concept.term}`,
    source: "concept",
    sourceLabel: "concept story",
    setting: `Freeze the chapter movie at ${concept.section}. The scene asks what ${concept.term} does before the learner sees formal notation.`,
    learnerSees: concept.visual,
    learnerMoves: `The learner marks where ${concept.term} lives in the loop, then says which other object it must not be confused with.`,
    boardAnimation: `Show three layers on the board: everyday story, loop diagram, technical label. Slide ${concept.term} from the story layer into the technical layer only after its role is clear.`,
    technicalTranslation: concept.technical,
    checkpoint: concept.check,
    pitfall: concept.contrast,
    actors: compactTags(["agent", "environment", "estimate", concept.kind]),
    props: compactTags([concept.term, concept.section, "loop arrow", "label card"]),
    tags: concept.tags,
  }));

  const workedScenes = worked.slice(0, 5).map((example): Candidate => ({
    title: `Scene: ${example.title}`,
    source: "worked",
    sourceLabel: "worked-world scene",
    setting: example.scenario,
    learnerSees: example.plainWalkthrough,
    learnerMoves: `Walk the learner through the board one object at a time: ${example.boardSteps.slice(0, 3).join(" ")}`,
    boardAnimation: `Use a left-to-right chalk motion: situation → choice → feedback → changed estimate → next choice. Pause at the pitfall before revealing the repaired path.`,
    technicalTranslation: example.technicalTrace,
    checkpoint: example.miniExercise,
    pitfall: example.pitfall,
    actors: compactTags(["agent", "choice", "feedback", example.kind]),
    props: compactTags([example.title, "toy numbers", "trace arrows", ...example.tags.slice(0, 3)]),
    tags: example.tags,
  }));

  const algorithmScenes = algorithms.slice(0, 5).map((algorithm): Candidate => ({
    title: `Scene: ${algorithm.name}`,
    source: "algorithm",
    sourceLabel: "method movie",
    setting: `Turn ${algorithm.name} into a short movie: data arrives, a target or pressure is built, an error or preference is read, and the stored object changes.`,
    learnerSees: algorithm.plain,
    learnerMoves: `Ask the learner to identify input, target, update site, behavior effect, and first failure check before reading pseudocode.`,
    boardAnimation: `Animate estimate → target → error → update → policy/decision. For ${algorithm.name}, keep the family label "${algorithm.family}" on the side so the reader knows what kind of method is moving.`,
    technicalTranslation: `${algorithm.technical} Core update handle: ${algorithm.coreUpdate || algorithm.objective}`,
    checkpoint: `Run one tiny transition or sample and say which stored quantity ${algorithm.name} changes first. Then name the implementation note you would log: ${algorithm.implementationNotes[0] ?? "check the update input and output"}.`,
    pitfall: algorithm.failureModes[0] ?? `Do not treat ${algorithm.name} as a name without a data path, target, update, and failure condition.`,
    actors: compactTags(["data", "target", "error", "update"]),
    props: compactTags([algorithm.name, algorithm.family, ...algorithm.related.slice(0, 3)]),
    tags: [algorithm.family, algorithm.name, ...algorithm.related],
  }));

  const sectionScenes = chapter.sections.slice(0, 6).map((section, index): Candidate => ({
    title: `Scene: ${section}`,
    source: "section",
    sourceLabel: "section movie",
    setting: `Treat ${section} as a lecture scene inside Chapter ${chapter.n}. The scene begins with ${chapter.easy}`,
    learnerSees: `The learner sees ${primaryIdea} as the first visible object and ${secondIdea} as the reason the scene cannot stay informal forever.`,
    learnerMoves: `Ask what question ${section} answers, what object changes, and which later chapter idea this scene prepares.`,
    boardAnimation: `Stage ${index + 1}: draw a title card, add the agent-environment loop, place one chapter idea on the loop, then reveal the technical label only after the board picture is stable.`,
    technicalTranslation: `Technically, ${section} contributes to the chapter claim: ${chapter.claim} It should connect to ${chapter.keyIdeas.slice(0, 3).join(", ")}.`,
    checkpoint: `Teach ${section} in thirty seconds using one diagram, one everyday sentence, and one technical sentence.`,
    pitfall: `Do not read ${section} as isolated facts; explain how it changes the reader's ability to reason about ${chapter.title}.`,
    actors: compactTags(["agent", "environment", "reader", "teacher"]),
    props: compactTags([section, primaryIdea, secondIdea, "scene card"]),
    tags: [section, primaryIdea, secondIdea],
  }));

  const simulatorScene: Candidate = {
    title: `Scene: ${simulator.title}`,
    source: "simulator",
    sourceLabel: "live-control scene",
    setting: simulator.setup,
    learnerSees: simulator.board,
    learnerMoves: `Move one knob at a time. Predict how learning speed, stability, bias, and variance should change before reading the readout.`,
    boardAnimation: `Animate the three knobs as exploration widens the data stream, update strength changes the size of the correction arrow, and horizon stretches or shrinks the future path.`,
    technicalTranslation: simulator.technicalGuide,
    checkpoint: simulator.transfer,
    pitfall: simulator.pitfall,
    actors: compactTags(["agent", "environment", "experimenter", "future self"]),
    props: compactTags([simulator.controls[0]?.label, simulator.controls[1]?.label, simulator.controls[2]?.label, ...simulator.tags]),
    tags: simulator.tags,
  };

  return [starter, conceptScenes, workedScenes, algorithmScenes, sectionScenes, [simulatorScene]];
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
  return normalize(value).replace(/\s+/g, "-").slice(0, 72) || "scene";
}

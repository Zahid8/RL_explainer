import { algorithmsForChapter } from "@/lib/algorithmCatalog";
import { analogiesForChapter } from "@/lib/analogies";
import { conceptCardsForChapter } from "@/lib/conceptAtlas";
import { misconceptionCardsForChapter } from "@/lib/chapterMisconceptions";
import { simulatorForChapter } from "@/lib/chapterSimulators";
import { workedExamplesForChapter } from "@/lib/chapterWorkedExamples";
import { chapters, type Chapter } from "@/lib/paper";
import { socraticTutorCardsForChapter } from "@/lib/socraticTutor";
import { visualStoriesForChapter } from "@/lib/visualStory";

export const caseStudyModes = ["scene", "walkthrough", "technical", "debug", "transfer"] as const;

export type CaseStudyMode = (typeof caseStudyModes)[number];
export type CaseStudySource = "story" | "worked" | "algorithm" | "simulator";

export interface ChapterCaseStudy {
  id: string;
  chapter: number;
  chapterTitle: string;
  part: string;
  title: string;
  source: CaseStudySource;
  sourceLabel: string;
  anchor: string;
  route: string;
  scene: string;
  learnerGoal: string;
  boardFrames: string[];
  walkthrough: string;
  technicalPass: string;
  debugProbe: string;
  transferChallenge: string;
  successCriteria: string[];
  tags: string[];
}

type Candidate = Omit<ChapterCaseStudy, "id" | "chapter" | "chapterTitle" | "part" | "route" | "tags"> & { tags: string[] };

let cachedCases: ChapterCaseStudy[] | undefined;

export function allCaseStudies(): ChapterCaseStudy[] {
  cachedCases ??= chapters.flatMap((chapter) => caseStudiesForChapter(chapter.n));
  return cachedCases;
}

export function caseStudiesForChapter(chapterNumber: number): ChapterCaseStudy[] {
  const chapter = chapters.find((entry) => entry.n === chapterNumber);
  if (!chapter) throw new Error(`Missing chapter ${chapterNumber}`);

  return caseStudyCandidatesForChapter(chapter).slice(0, 4).map((candidate, index) => ({
    id: `case-study-ch${chapter.n}-${slug(candidate.title)}-${index + 1}`,
    chapter: chapter.n,
    chapterTitle: chapter.title,
    part: chapter.part,
    route: `/chapters/${chapter.n}#case-studies`,
    ...candidate,
    tags: compactTags(["case study", candidate.source, `Chapter ${chapter.n}`, chapter.part, candidate.anchor, ...candidate.tags, ...chapter.keyIdeas.slice(0, 2)]),
  }));
}

export function caseStudyCardCount(chapter?: number): number {
  return typeof chapter === "number" ? caseStudiesForChapter(chapter).length : allCaseStudies().length;
}

export function caseStudyModeCount(chapter?: number): number {
  return caseStudyCardCount(chapter) * caseStudyModes.length;
}

export function caseStudyChapterCount(): number {
  return new Set(allCaseStudies().map((card) => card.chapter)).size;
}

export function caseStudySourceCount(): number {
  return new Set(allCaseStudies().map((card) => card.source)).size;
}

export function caseStudyAnchorCount(): number {
  return new Set(allCaseStudies().map((card) => normalize(card.anchor))).size;
}

export function caseStudyBoardFrameCount(chapter?: number): number {
  const cards = typeof chapter === "number" ? caseStudiesForChapter(chapter) : allCaseStudies();
  return cards.reduce((sum, card) => sum + card.boardFrames.length, 0);
}

export function caseStudySuccessCriteriaCount(chapter?: number): number {
  const cards = typeof chapter === "number" ? caseStudiesForChapter(chapter) : allCaseStudies();
  return cards.reduce((sum, card) => sum + card.successCriteria.length, 0);
}

function caseStudyCandidatesForChapter(chapter: Chapter): Candidate[] {
  const stories = visualStoriesForChapter(chapter.n);
  const examples = workedExamplesForChapter(chapter.n);
  const algorithms = algorithmsForChapter(chapter.n);
  const simulator = simulatorForChapter(chapter.n);
  const misconceptions = misconceptionCardsForChapter(chapter.n);
  const concepts = conceptCardsForChapter(chapter.n);
  const analogies = analogiesForChapter(chapter.n);
  const tutors = socraticTutorCardsForChapter(chapter.n);
  const concept = concepts[0];
  const analogy = analogies[0];
  const tutor = tutors[0];

  const story = stories[0];
  const example = examples[0];
  const algorithm = algorithms[0];
  const misconception = misconceptions[0];
  const mainIdea = chapter.keyIdeas[0] ?? chapter.claim;
  const secondIdea = chapter.keyIdeas[1] ?? chapter.technical;

  return [
    {
      title: `${chapter.title}: learner-world case`,
      source: "story",
      sourceLabel: "story case",
      anchor: story?.title.replace(/^Scene: /, "") ?? chapter.title,
      scene: story ? `${story.setting} The case begins by asking what the learner can see before it knows the right technical word.` : `Imagine one learner facing the central situation in ${chapter.title}.`,
      learnerGoal: `Make ${mainIdea} visible as a sequence of choices, feedback, memory, and changed behavior rather than as a detached definition.`,
      boardFrames: [
        story?.boardAnimation ?? `Draw Chapter ${chapter.n} as learner → world → feedback → memory.`,
        `Frame 2: label the learner's available information and one action choice.`,
        `Frame 3: write the feedback signal and the estimate or policy that changes.`,
        `Frame 4: connect the case to ${chapter.claim}`,
      ],
      walkthrough: story ? `${story.learnerSees} ${story.learnerMoves} The plain reading is: the learner tries something, receives evidence, and carries a better question into the next moment.` : chapter.easy,
      technicalPass: story ? `${story.technicalTranslation} Chapter-level technical anchor: ${chapter.technical}` : chapter.technical,
      debugProbe: story?.pitfall ?? `If the case sounds like a labeled-answer problem, redraw it as consequences after actions rather than labels before actions.`,
      transferChallenge: story?.checkpoint ?? `Build the same case in a new domain and identify the state information, action, reward, estimate, and next decision.`,
      successCriteria: [
        `Names the learner and the world boundary.`,
        `Identifies one feedback signal and one learned object.`,
        `Explains why ${mainIdea} matters in this chapter.`,
        `States one way the case can mislead if treated too literally.`,
      ],
      tags: ["scene", story?.sourceLabel, concept?.term, analogy?.anchor].filter(Boolean) as string[],
    },
    {
      title: `${example?.title ?? chapter.title}: worked case`,
      source: "worked",
      sourceLabel: "worked case",
      anchor: example?.title ?? chapter.title,
      scene: example?.scenario ?? `Use a tiny version of ${chapter.title} with one learner, two choices, feedback, and one stored estimate.`,
      learnerGoal: `Follow the case slowly enough to see where the chapter's board trace, calculation, and technical vocabulary meet.`,
      boardFrames: example?.boardSteps.slice(0, 4) ?? [
        `Draw the starting situation.`,
        `Choose one action and observe feedback.`,
        `Write the target or diagnostic that uses the feedback.`,
        `Update the stored estimate, model, or policy.`,
      ],
      walkthrough: example?.plainWalkthrough ?? chapter.easy,
      technicalPass: example?.technicalTrace ?? chapter.technical,
      debugProbe: example?.pitfall ?? misconception?.misconception ?? `The case fails if the learner memorizes a label without tracing data, target, and update.`,
      transferChallenge: example?.miniExercise ?? `Change one number, state feature, or feedback delay and explain what has to be recalculated.`,
      successCriteria: [
        `Can replay the board frames without notes.`,
        `Can say which quantity is observed and which quantity is learned.`,
        `Can explain the technical pass in Chapter ${chapter.n}'s vocabulary.`,
        `Can solve the transfer prompt before revealing another hint.`,
      ],
      tags: ["worked", example?.kind, ...(example?.tags.slice(0, 3) ?? [])].filter(Boolean) as string[],
    },
    {
      title: `${algorithm?.name ?? chapter.title}: method case`,
      source: "algorithm",
      sourceLabel: "method case",
      anchor: algorithm?.name ?? secondIdea,
      scene: `Put ${algorithm?.name ?? secondIdea} inside a tiny deployment: the learner receives data, forms a target or comparison, updates something stored, and changes what it will do next.`,
      learnerGoal: algorithm?.objective ?? `Use ${secondIdea} to turn experience into better prediction, behavior, or problem formulation.`,
      boardFrames: [
        `Inputs: ${algorithm?.steps[0] ?? "name the data stream and the decision boundary"}.`,
        `Target: ${algorithm?.objective ?? chapter.claim}.`,
        `Update: ${algorithm?.coreUpdate || "change the estimate, policy, model, or representation"}.`,
        `Check: ${algorithm?.failureModes[0] ?? misconception?.technicalConsequence ?? "inspect the first failure mode before trusting the result"}.`,
      ],
      walkthrough: algorithm?.plain ?? tutor?.tutorHint ?? chapter.easy,
      technicalPass: algorithm?.technical ?? tutor?.technicalAnswer ?? chapter.technical,
      debugProbe: algorithm?.failureModes[0] ?? misconception?.repair ?? `Ask whether the data, target, update, and representation match the chapter's assumptions.`,
      transferChallenge: `Move this method case to a new toy problem. Name the input data, target, update site, and first diagnostic before choosing ${algorithm?.name ?? "the chapter method"}.`,
      successCriteria: [
        `Separates data from target construction.`,
        `Names the update location.`,
        `States the first failure mode.`,
        `Explains why the method belongs in ${chapter.title}.`,
      ],
      tags: ["method", algorithm?.family, algorithm?.name, ...(algorithm?.related.slice(0, 2) ?? [])].filter(Boolean) as string[],
    },
    {
      title: `${simulator.title}: tradeoff case`,
      source: "simulator",
      sourceLabel: "tradeoff case",
      anchor: simulator.title,
      scene: simulator.setup,
      learnerGoal: simulator.question,
      boardFrames: [
        simulator.board,
        `Move exploration and predict what data will become visible or hidden.`,
        `Move update strength and predict whether learning becomes stable or jumpy.`,
        `Move horizon and predict which delayed consequences now matter.`,
      ],
      walkthrough: simulator.readoutGuide,
      technicalPass: simulator.technicalGuide,
      debugProbe: simulator.pitfall,
      transferChallenge: simulator.transfer,
      successCriteria: [
        `Can explain the exploration/data distribution tradeoff.`,
        `Can explain the update/stability tradeoff.`,
        `Can explain the horizon/delayed-consequence tradeoff.`,
        `Can connect the knob case to ${chapter.bridge}`,
      ],
      tags: ["simulator", ...simulator.tags.slice(0, 5)],
    },
  ];
}

function compactTags(tags: Array<string | undefined | null>) {
  return Array.from(new Set(tags.filter(Boolean).map((tag) => String(tag).trim()).filter(Boolean))).slice(0, 14);
}

function normalize(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function slug(value: string) {
  return normalize(value).replace(/\s+/g, "-").slice(0, 72) || "case";
}

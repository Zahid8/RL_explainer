import { caseStudiesForChapter } from "@/lib/caseStudies";
import { codeLabCardsForChapter } from "@/lib/codeLab";
import { chapterExamCardsForChapter } from "@/lib/chapterExam";
import { simulatorForChapter } from "@/lib/chapterSimulators";
import { exerciseSolutionCardsForChapter } from "@/lib/exerciseSolutionStudio";
import { methodCompareCardsForChapter } from "@/lib/methodCompare";
import { chapters, type Chapter } from "@/lib/paper";

export const projectStudioModes = ["brief", "build", "experiment", "rubric", "extend"] as const;

export type ProjectStudioMode = (typeof projectStudioModes)[number];
export type ProjectStudioSource = "case" | "code" | "experiment" | "assessment";

export interface ChapterProjectCard {
  id: string;
  chapter: number;
  chapterTitle: string;
  part: string;
  title: string;
  source: ProjectStudioSource;
  sourceLabel: string;
  route: string;
  drivingQuestion: string;
  brief: string;
  buildSteps: string[];
  experimentPlan: string;
  technicalFrame: string;
  rubric: string[];
  extension: string;
  deliverables: string[];
  tags: string[];
}

type Candidate = Omit<ChapterProjectCard, "id" | "chapter" | "chapterTitle" | "part" | "route" | "tags"> & { tags: string[] };

let cachedProjects: ChapterProjectCard[] | undefined;

export function allProjectCards(): ChapterProjectCard[] {
  cachedProjects ??= chapters.flatMap((chapter) => projectCardsForChapter(chapter.n));
  return cachedProjects;
}

export function projectCardsForChapter(chapterNumber: number): ChapterProjectCard[] {
  const chapter = chapters.find((entry) => entry.n === chapterNumber);
  if (!chapter) throw new Error(`Missing chapter ${chapterNumber}`);

  return projectCandidatesForChapter(chapter).slice(0, 3).map((candidate, index) => ({
    id: `project-ch${chapter.n}-${slug(candidate.title)}-${index + 1}`,
    chapter: chapter.n,
    chapterTitle: chapter.title,
    part: chapter.part,
    route: `/chapters/${chapter.n}#projects`,
    ...candidate,
    tags: compactTags(["project studio", candidate.source, `Chapter ${chapter.n}`, chapter.part, ...candidate.tags, ...chapter.keyIdeas.slice(0, 3)]),
  }));
}

export function projectCardCount(chapter?: number): number {
  return typeof chapter === "number" ? projectCardsForChapter(chapter).length : allProjectCards().length;
}

export function projectModeCount(chapter?: number): number {
  return projectCardCount(chapter) * projectStudioModes.length;
}

export function projectChapterCount(): number {
  return new Set(allProjectCards().map((card) => card.chapter)).size;
}

export function projectSourceCount(): number {
  return new Set(allProjectCards().map((card) => card.source)).size;
}

export function projectMilestoneCount(chapter?: number): number {
  const cards = typeof chapter === "number" ? projectCardsForChapter(chapter) : allProjectCards();
  return cards.reduce((sum, card) => sum + card.buildSteps.length, 0);
}

export function projectRubricCount(chapter?: number): number {
  const cards = typeof chapter === "number" ? projectCardsForChapter(chapter) : allProjectCards();
  return cards.reduce((sum, card) => sum + card.rubric.length, 0);
}

export function projectDeliverableCount(chapter?: number): number {
  const cards = typeof chapter === "number" ? projectCardsForChapter(chapter) : allProjectCards();
  return cards.reduce((sum, card) => sum + card.deliverables.length, 0);
}

function projectCandidatesForChapter(chapter: Chapter): Candidate[] {
  const cases = caseStudiesForChapter(chapter.n);
  const codeCards = codeLabCardsForChapter(chapter.n);
  const simulator = simulatorForChapter(chapter.n);
  const comparisons = methodCompareCardsForChapter(chapter.n);
  const exercises = exerciseSolutionCardsForChapter(chapter.n);
  const exams = chapterExamCardsForChapter(chapter.n);
  const primaryCase = cases[0];
  const secondaryCase = cases[1] ?? primaryCase;
  const code = codeCards[0];
  const comparison = comparisons[0];
  const exercise = exercises[0];
  const exam = exams[0];
  const mainIdea = chapter.keyIdeas[0] ?? chapter.claim;
  const secondIdea = chapter.keyIdeas[1] ?? chapter.technical;

  return [
    {
      title: `${chapter.title}: case-to-artifact project`,
      source: "case",
      sourceLabel: "case build",
      drivingQuestion: `Can you turn ${primaryCase?.title ?? chapter.title} into a concrete artifact that proves the chapter is not just vocabulary?`,
      brief: `Start with the chapter's most concrete case. The project is to redraw the learner-world-feedback loop, name the state/action/reward/value or policy objects, and create one artifact a future learner could inspect without reading any source book prose.`,
      buildSteps: compactList([
        `Open the case scene: ${primaryCase?.scene ?? chapter.easy}`,
        `Draw the learner, world boundary, feedback signal, stored estimate or policy, and next decision for ${mainIdea}.`,
        `Turn the board into a one-page artifact: diagram, table, or tiny trace with labels for data, target, update, and failure check.`,
        `Add a beginner caption that explains the artifact without using unexplained RL words.`,
        `Add a technical caption that lands on this chapter claim: ${chapter.claim}`,
      ]),
      experimentPlan: `Change one part of the case—reward timing, state description, exploration rule, update strength, or horizon—and predict which line of the artifact changes first. Then compare the prediction against the simulator prompt: ${simulator.question}`,
      technicalFrame: `The technical frame is not the drawing itself; it is the contract behind it. Identify the data distribution, target construction, update location, and evaluation criterion. For Chapter ${chapter.n}, the key technical anchor is: ${chapter.technical}`,
      rubric: compactList([
        `The artifact names the learner/environment boundary and at least one observed signal.`,
        `It separates sampled data, target construction, update, and resulting decision.`,
        `It explains ${mainIdea} in plain language before using technical labels.`,
        `It includes a failure warning from the case: ${primaryCase?.debugProbe ?? "the artifact must say what would make the interpretation wrong"}`,
        `It includes a transfer note for a new domain, not only the original case.`,
      ]),
      extension: primaryCase?.transferChallenge ?? `Move the same artifact to another domain and preserve the data-target-update-failure-transfer structure.`,
      deliverables: compactList([
        "One diagram or table of the learner-world-feedback loop.",
        "One beginner caption and one technical caption.",
        "One changed-case prediction and one failure warning.",
        "One transfer note connecting the project to a later chapter or method.",
      ]),
      tags: ["artifact", primaryCase?.sourceLabel, mainIdea].filter(Boolean) as string[],
    },
    {
      title: `${code?.title ?? chapter.title}: experiment project`,
      source: "code",
      sourceLabel: "build + test",
      drivingQuestion: `Can you implement the chapter's main update or decision rule as an inspectable experiment instead of a black-box recipe?`,
      brief: `This project turns the chapter method into a tiny controlled build. The point is not production performance; the point is to make every estimate, target, error, update, and diagnostic visible enough to debug by hand.`,
      buildSteps: compactList([
        `Create a tiny fixture with one or two states/actions tied to ${secondaryCase?.anchor ?? chapter.title}.`,
        code ? `Use this implementation goal: ${code.implementationGoal}` : `Write a teaching scaffold for ${secondIdea}.`,
        code?.codeLines[0] ? `Begin with the scaffold shape: ${code.codeLines[0]}` : "Name the function inputs, stored estimates, and output trace before writing update logic.",
        code?.testPlan[0] ?? "Run exactly one update and print the old estimate, target, error, and new estimate.",
        comparison ? `Compare against the nearby method question: ${comparison.primaryQuestion}` : `Explain why this method is the right tool for ${chapter.title}.`,
      ]),
      experimentPlan: `Run three variants: low exploration or narrow data, high update strength, and long-horizon pressure. For each variant, predict learning speed, stability, bias, and variance using the simulator guide: ${simulator.technicalGuide}`,
      technicalFrame: code?.plain
        ? `${code.plain} Project-level technical check: every logged update should make the chapter's target and failure mode visible.`
        : `Technical project frame: implement the smallest possible loop that exposes ${chapter.technical}`,
      rubric: compactList([
        `Inputs, stored state, target calculation, update line, and output trace are visible.`,
        `A one-step hand check reproduces the printed target, error, and update.`,
        `At least one deliberate broken version fails in the predicted way.`,
        comparison ? `The report says when to prefer ${comparison.algorithmName} versus ${comparison.compareWith}.` : `The report names one method alternative and why it is not being used here.`,
        `The conclusion distinguishes implementation bugs from conceptual failure.`,
      ]),
      extension: `Scale the tiny fixture by one dimension: add a state, feature, action, delayed reward, behavior policy, model roll-out, or representation knob. Report which invariant from the original project still protects correctness.`,
      deliverables: compactList([
        "A minimal teaching scaffold or pseudocode loop.",
        "A one-step hand-check trace.",
        "A three-variant experiment table.",
        "A debug note explaining the first broken run.",
      ]),
      tags: ["implementation", code?.family, comparison?.family, secondIdea].filter(Boolean) as string[],
    },
    {
      title: `${chapter.title}: mastery capstone project`,
      source: "assessment",
      sourceLabel: "capstone",
      drivingQuestion: `Can you prove you own Chapter ${chapter.n} by teaching it, solving a tiny task, grading the answer, and transferring it?`,
      brief: `The capstone combines the chapter's tutorial, case, exercise, and exam layers. It asks for a teach-back, a mini-world solution, a rubric-based self-grade, and a transfer variation so reading becomes demonstrable mastery.`,
      buildSteps: compactList([
        exam ? `Start from the exam prompt: ${exam.prompt}` : `Teach Chapter ${chapter.n} from scratch using the agent-environment loop.`,
        exercise ? `Use the exercise mini-world: ${exercise.miniWorld}` : `Create a two-case mini-world that stresses ${mainIdea} and ${secondIdea}.`,
        `Write a solution plan before revealing any answer: name objects, assumptions, target, update, diagnostic, and transfer point.`,
        exercise?.scratchPlan[0] ?? `Solve the tiny case first, then replace numbers or labels with the chapter's general objects.`,
        `Grade the result with the rubric before calling the chapter finished.`,
      ]),
      experimentPlan: simulator.readoutGuide,
      technicalFrame: exercise?.technicalSolution
        ? `${exercise.technicalSolution} The capstone passes only if this technical solution can be explained from the board picture and then stress-tested.`
        : `The capstone technical frame is the chapter claim plus its working objects: ${chapter.technical}`,
      rubric: compactList([
        `Teach-back starts from no RL background and names the learner, world, feedback, and learned object.`,
        `Mini-world solution names the relevant state, action, reward, value, policy, target, or sampling object before solving.`,
        ...(exercise?.gradingRubric.slice(0, 4) ?? []),
        ...(exam?.rubric.slice(0, 3) ?? []),
        `The transfer answer says what would change under a different policy, representation, reward, horizon, model access, or sampling rule.`,
      ]),
      extension: exercise?.extension ?? exam?.transfer ?? `Change one assumption and say which part of Chapter ${chapter.n}'s answer survives, breaks, or needs a later chapter to repair it.`,
      deliverables: compactList([
        "A five-minute teach-back script.",
        "A solved tiny task or mini-world.",
        "A self-grade against a rubric.",
        "A transfer variant with one changed assumption.",
      ]),
      tags: ["capstone", exercise?.kind, exam?.kind, chapter.part].filter(Boolean) as string[],
    },
  ];
}

function compactList(items: Array<string | undefined | null>) {
  return items.filter(Boolean).map((item) => String(item).trim()).filter(Boolean).slice(0, 6);
}

function compactTags(tags: Array<string | undefined | null>) {
  return Array.from(new Set(tags.filter(Boolean).map((tag) => String(tag).trim()).filter(Boolean))).slice(0, 14);
}

function slug(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 72) || "project";
}

import { exerciseCoachCards, type ExerciseCoachCard, type ExerciseKind } from "@/lib/exerciseCoach";
import { chapters } from "@/lib/paper";

export const exerciseSolutionModes = ["attempt", "hint", "solution", "debug", "extension"] as const;

export type ExerciseSolutionMode = (typeof exerciseSolutionModes)[number];

export interface ExerciseSolutionCard {
  id: string;
  exerciseId: string;
  chapter: number;
  chapterTitle: string;
  kind: ExerciseKind;
  title: string;
  route: string;
  attemptPrompt: string;
  miniWorld: string;
  scratchPlan: string[];
  hint: string[];
  solution: string;
  technicalSolution: string;
  debugChecklist: string[];
  gradingRubric: string[];
  extension: string;
  tags: string[];
}

let cachedCards: ExerciseSolutionCard[] | undefined;

export function allExerciseSolutionCards(): ExerciseSolutionCard[] {
  cachedCards ??= exerciseCoachCards.map(exerciseSolutionCardForCoach);
  return cachedCards;
}

export function exerciseSolutionCardsForChapter(chapter: number): ExerciseSolutionCard[] {
  return allExerciseSolutionCards().filter((card) => card.chapter === chapter);
}

export function exerciseSolutionCardCount(chapter?: number): number {
  return typeof chapter === "number" ? exerciseSolutionCardsForChapter(chapter).length : allExerciseSolutionCards().length;
}

export function exerciseSolutionModeCount(chapter?: number): number {
  return exerciseSolutionCardCount(chapter) * exerciseSolutionModes.length;
}

export function exerciseSolutionChapterCount(): number {
  return new Set(allExerciseSolutionCards().map((card) => card.chapter)).size;
}

function exerciseSolutionCardForCoach(card: ExerciseCoachCard): ExerciseSolutionCard {
  const chapter = chapters.find((entry) => entry.n === card.chapter);
  if (!chapter) throw new Error(`Missing chapter ${card.chapter}`);

  const chapterHandles = compactList([chapter.keyIdeas[0], chapter.keyIdeas[1], chapter.sections[0], ...card.tags]);
  const kind = kindFrame(card.kind);
  const methodName = card.title.toLowerCase();
  const firstHandle = chapterHandles[0] ?? chapter.title;
  const secondHandle = chapterHandles[1] ?? card.kind;

  return {
    id: `exercise-solution-${slug(card.id)}-${slug(card.title)}`,
    exerciseId: card.id,
    chapter: card.chapter,
    chapterTitle: chapter.title,
    kind: card.kind,
    title: `${card.title} solution studio`,
    route: `/chapters/${card.chapter}#exercise-solutions`,
    attemptPrompt: `Try Exercise ${card.id} without opening a final answer. Restate ${card.title} as a tiny Chapter ${card.chapter} problem, name the state/action/reward/value or policy objects involved, and write what would count as a correct answer before doing any algebra or code.`,
    miniWorld: `Mini-world: imagine a two-case version of ${methodName}. One case makes ${firstHandle} obvious; the second case stresses ${secondHandle}. Solve the tiny case first so the general answer has something concrete to defend.`,
    scratchPlan: compactList([
      `Translate the words into chapter objects: ${chapterHandles.slice(0, 4).join(", ")}.`,
      ...card.strategy,
      kind.plan,
      card.checkpoint,
    ]),
    hint: compactList([
      `Do not start with a slogan. Start with the object the exercise asks you to change, estimate, compare, or prove.`,
      kind.hint,
      `Use the chapter claim as the guardrail: ${chapter.claim}`,
      `If stuck, solve the two-case mini-world and then replace the numbers with symbols.`,
      `Your last line should explain what changes if the policy, reward, state description, update target, or sampling rule changes.`,
    ]),
    solution: solutionFrame(card, chapterHandles, kind),
    technicalSolution: technicalFrame(card, chapter, kind),
    debugChecklist: compactList([
      `Check that every symbol or variable keeps one meaning from the first line to the last line.`,
      kind.debug,
      `Compare the final sentence against the easy goal: ${card.easyGoal}`,
      `Compare the final formal object against the technical goal: ${card.technicalGoal}`,
      `Run the answer on the mini-world before trusting the general form.`,
    ]),
    gradingRubric: compactList([
      `Plain framing: the answer identifies what the exercise is really testing, not only a method name.`,
      `Formal framing: the answer names the relevant state/action/reward/value, policy, target, or sampling distribution.`,
      `Mechanism: the answer explains why the result happens under the chapter's update or objective.`,
      `Sanity check: the answer tests an edge case or tiny example.`,
      `Transfer: the answer says what would change under a different policy, representation, or reward signal.`,
    ]),
    extension: `Extension challenge: change one assumption in Exercise ${card.id}—for example the exploration rule, reward scale, horizon, representation, baseline, or model access. Predict which line of the solution would change first, which conclusion would survive, and how Chapter ${card.chapter}'s later material would repair the broken case.`,
    tags: compactTags(["exercise solution", `Exercise ${card.id}`, `Chapter ${card.chapter}`, chapter.part, card.kind, ...card.tags, ...chapterHandles]),
  };
}

function solutionFrame(card: ExerciseCoachCard, handles: string[], kind: ReturnType<typeof kindFrame>) {
  const handleText = handles.slice(0, 4).join(", ") || card.kind;
  return `A strong solution to ${card.title} begins by turning the prompt into the chapter objects ${handleText}. Then it follows the exercise's requested skill: ${kind.solution} The answer should end with the checkpoint in plain words: ${card.checkpoint.replace(/^Checkpoint:\s*/i, "")}`;
}

function technicalFrame(card: ExerciseCoachCard, chapter: (typeof chapters)[number], kind: ReturnType<typeof kindFrame>) {
  return `Technical pass: ${card.technicalGoal} Work inside Chapter ${chapter.n}'s setting, where ${chapter.technical} ${kind.technical} The final derivation, algorithm, experiment, or interpretation should preserve the same target policy/objective and conditioning information from the first line through the conclusion.`;
}

function kindFrame(kind: ExerciseKind) {
  const frames: Record<ExerciseKind, { plan: string; hint: string; solution: string; technical: string; debug: string }> = {
    conceptual: {
      plan: "Write one sentence for the intuitive claim, one sentence for the formal object, and one sentence for the consequence if an assumption changes.",
      hint: "For a conceptual exercise, the key move is to separate the learner's story from the formal variable that makes the story precise.",
      solution: "state the intuitive answer, translate it into the formal RL object, test it on a tiny case, and then explain the dependency on the chapter assumptions.",
      technical: "The proof burden is semantic consistency: the state, action, reward, return, value, or policy named in the answer must be the same object the chapter uses.",
      debug: "If the answer would still sound true after renaming the policy or reward arbitrarily, it is probably too vague.",
    },
    derivation: {
      plan: "Copy the definition, expand one expectation/sum/product at a time, carry time indices explicitly, then check the endpoint with an easy special case.",
      hint: "For a derivation, do not jump to the final identity; the grading evidence is the sequence of legal transformations.",
      solution: "start from the definition, substitute the chapter identities, move expectations or sums only when conditioning allows it, simplify, and mark the exact equality that gives the requested form.",
      technical: "Every equality must preserve the same random variables, policy, conditioning event, time index, and objective; use gamma-zero, one-step, or deterministic-policy limits as sanity checks.",
      debug: "Audit each equality sign: if a distribution, time index, or conditioning event disappeared, the derivation needs another line.",
    },
    "algorithm design": {
      plan: "List inputs, stored estimates, sampling rule, target construction, update line, loop order, and stopping rule before discussing performance.",
      hint: "For algorithm design, first decide what data the method is allowed to see and what quantity is updated after each sample.",
      solution: "name the algorithmic state, describe the sample path, construct the target, apply the update, and explain whether the method is on-policy, off-policy, episodic, or continuing.",
      technical: "The answer should expose target construction, bootstrapping choice, exploration/control rule, step-size behavior, and the invariant that remains true after each update.",
      debug: "Trace one full loop by hand; missing target construction or a stale policy/update order is the usual failure.",
    },
    programming: {
      plan: "Define the smallest environment or data generator, specify seeds/runs/sweeps, log the metric, and plot or tabulate the comparison that would falsify the claim.",
      hint: "For programming, the solution is an experiment specification before it is code: environment, policy/update, parameters, metric, and averaging protocol.",
      solution: "write the experiment contract, implement the minimal loop, record the learning statistic, average enough independent runs, and interpret the curve by mechanism instead of by method name alone.",
      technical: "The answer should specify state arrays, action selection, reward sampling, update equations, step-size/exploration sweeps, random seeds, confidence/averaging protocol, and the plotted statistic.",
      debug: "If changing the seed changes the conclusion, add runs or simplify the environment until the mechanism is visible.",
    },
    interpretation: {
      plan: "Read axes, compared methods, averaging protocol, and controlled variables before naming a winner or mechanism.",
      hint: "For interpretation, the first answer is not 'which curve is highest'; it is what the axes and protocol make that curve mean.",
      solution: "identify the measured quantity, compare methods only under the same protocol, explain the mechanism behind the visible pattern, and state which confounder would change the interpretation.",
      technical: "Tie every curve or table cell to the algorithmic choice that generated it: target, update, exploration, step-size, representation, or baseline.",
      debug: "If the answer cannot explain an axis label or averaging protocol, it is not ready to compare methods.",
    },
  };
  return frames[kind];
}

function compactList(items: Array<string | undefined | null>) {
  return items.filter(Boolean).map((item) => String(item).trim()).filter(Boolean).slice(0, 6);
}

function compactTags(tags: Array<string | undefined | null>) {
  return Array.from(new Set(tags.filter(Boolean).map((tag) => String(tag).trim()).filter(Boolean))).slice(0, 12);
}

function slug(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 72) || "exercise";
}

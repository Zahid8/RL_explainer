import { algorithmsForChapter } from "@/lib/algorithmCatalog";
import { conceptCardsForChapter } from "@/lib/conceptAtlas";
import { formulasForChapter } from "@/lib/formulaAtlas";
import { chapters } from "@/lib/paper";
import { workedExamplesForChapter } from "@/lib/chapterWorkedExamples";

export interface SimulationControl {
  id: "exploration" | "stepSize" | "horizon";
  label: string;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  lowLabel: string;
  highLabel: string;
  easy: string;
  technical: string;
}

export interface ChapterSimulator {
  chapter: number;
  id: string;
  title: string;
  question: string;
  setup: string;
  board: string;
  controls: SimulationControl[];
  readoutGuide: string;
  technicalGuide: string;
  pitfall: string;
  transfer: string;
  tags: string[];
}

export const simulatorReadouts = ["learning", "stability", "bias", "variance"] as const;

export function simulatorForChapter(chapterNumber: number): ChapterSimulator {
  const chapter = chapters.find((entry) => entry.n === chapterNumber);
  if (!chapter) throw new Error(`Missing chapter ${chapterNumber}`);

  const algorithms = algorithmsForChapter(chapterNumber);
  const formulas = formulasForChapter(chapterNumber);
  const concepts = conceptCardsForChapter(chapterNumber);
  const examples = workedExamplesForChapter(chapterNumber);
  const algorithm = algorithms[0];
  const formula = formulas[0];
  const concept = concepts[0];
  const example = examples[0];
  const mainIdea = chapter.keyIdeas[0] ?? chapter.claim;
  const secondIdea = chapter.keyIdeas[1] ?? chapter.technical;

  return {
    chapter: chapterNumber,
    id: `chapter-${chapterNumber}-simulator`,
    title: `Chapter ${chapterNumber} control lab: ${chapter.title}`,
    question: `What changes when a learner in ${chapter.title} explores more, updates faster, or looks farther ahead?`,
    setup: `Use a tiny teaching world tied to ${example?.title ?? chapter.title}. The sliders are not benchmark results; they are a live board model for seeing the chapter's tradeoffs before reading the dense equations.`,
    board: `Draw three knobs beside the agent-environment loop: exploration controls what data arrives, step-size controls how strongly new information moves the estimate, and horizon controls how far delayed consequences shape the target. Then connect those knobs to ${mainIdea}.`,
    controls: [
      {
        id: "exploration",
        label: "Exploration pressure",
        min: 0,
        max: 100,
        step: 5,
        defaultValue: defaultExploration(chapterNumber),
        lowLabel: "greedy / narrow data",
        highLabel: "curious / broad data",
        easy: `Low exploration repeats what currently looks best; high exploration tries more possibilities so ${concept?.term ?? mainIdea} can be learned from broader evidence.`,
        technical: `This knob stands for behavior-policy entropy, random action probability, search breadth, or perturbation pressure depending on the chapter. It changes the data distribution before any target is estimated.`,
      },
      {
        id: "stepSize",
        label: "Update strength",
        min: 5,
        max: 95,
        step: 5,
        defaultValue: defaultStepSize(chapterNumber),
        lowLabel: "slow / stable",
        highLabel: "fast / jumpy",
        easy: `Low update strength changes beliefs cautiously; high update strength lets new evidence reshape behavior quickly but can overshoot.`,
        technical: `This knob represents step-size, backup aggressiveness, policy update size, trace pressure, or representation-change strength. It changes how much the current target alters stored estimates or policy parameters.`,
      },
      {
        id: "horizon",
        label: "Future horizon",
        min: 0,
        max: 100,
        step: 5,
        defaultValue: defaultHorizon(chapterNumber),
        lowLabel: "myopic / immediate",
        highLabel: "long-horizon / delayed",
        easy: `Low horizon listens mostly to near feedback; high horizon gives delayed consequences more authority in the current decision.`,
        technical: `This knob stands for discounting, backup depth, planning depth, trace length, episode reach, or option duration. It changes how much future value enters the target.`,
      },
    ],
    readoutGuide: `The chart is a teaching instrument: push one knob at a time and narrate how learning speed, stability, bias, and variance move. The goal is to own the chapter's tradeoff, not to tune a real system from these numbers.`,
    technicalGuide: `${chapter.technical} ${formula ? `When you read ${formula.label}, ask which part of the expression would be affected by exploration, update strength, or horizon.` : "When no single equation dominates, map each knob to the data distribution, target, update, or policy-improvement pressure."} ${algorithm ? `For ${algorithm.name}, the first implementation check is whether the knob changes the behavior data, target construction, or update magnitude.` : "For the chapter method, identify whether the knob changes data, targets, representation, or control."}`,
    pitfall: `Do not read high numbers as always better. In ${chapter.title}, the useful setting depends on the failure mode: too little exploration hides data, too much update strength destabilizes estimates, and too long a horizon can amplify approximation or model errors.`,
    transfer: `Transfer the lab to a new domain by naming the learner, the action choices, the feedback, and which knob you would adjust first. Then explain how that choice supports the bridge idea: ${chapter.bridge}`,
    tags: [mainIdea, secondIdea, concept?.term ?? "concept", algorithm?.family ?? "method", `Ch ${chapterNumber}`].slice(0, 6),
  };
}

export function allSimulators() {
  return chapters.map((chapter) => simulatorForChapter(chapter.n));
}

export function simulatorCount(chapter?: number) {
  return typeof chapter === "number" ? 1 : chapters.length;
}

export function simulatorControlCount(chapter?: number) {
  return typeof chapter === "number" ? simulatorForChapter(chapter).controls.length : allSimulators().reduce((sum, simulator) => sum + simulator.controls.length, 0);
}

export function simulatorReadoutCount(chapter?: number) {
  return simulatorCount(chapter) * simulatorReadouts.length;
}

function defaultExploration(chapter: number) {
  if (chapter <= 2) return 65;
  if (chapter <= 8) return 35;
  if (chapter <= 13) return 45;
  return 55;
}

function defaultStepSize(chapter: number) {
  if (chapter <= 4) return 35;
  if (chapter <= 8) return 50;
  if (chapter <= 13) return 40;
  return 30;
}

function defaultHorizon(chapter: number) {
  if (chapter <= 2) return 15;
  if (chapter <= 8) return 65;
  if (chapter <= 13) return 55;
  return 70;
}

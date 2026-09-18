import { algorithmsForChapter } from "@/lib/algorithmCatalog";
import { assumptionCardsForChapter } from "@/lib/assumptionClinic";
import { codeLabCardsForChapter } from "@/lib/codeLab";
import { conceptCardsForChapter } from "@/lib/conceptAtlas";
import { formulasForChapter } from "@/lib/formulaAtlas";
import { chapters } from "@/lib/paper";
import { proofCardsForChapter } from "@/lib/proofLab";
import { simulatorForChapter } from "@/lib/chapterSimulators";
import { workedExamplesForChapter } from "@/lib/chapterWorkedExamples";

export const chapterExamModes = ["prompt", "plan", "solution", "rubric", "transfer"] as const;

export type ChapterExamMode = (typeof chapterExamModes)[number];
export type ChapterExamKind = "teach-back" | "board" | "formula" | "method" | "assumption" | "trace" | "experiment";

export interface ChapterExamCard {
  id: string;
  chapter: number;
  title: string;
  kind: ChapterExamKind;
  route: string;
  prompt: string;
  plan: string[];
  solution: string;
  rubric: string[];
  transfer: string;
  diagnostic: string;
  tags: string[];
}

let cachedCards: ChapterExamCard[] | undefined;

export function allChapterExamCards(): ChapterExamCard[] {
  cachedCards ??= chapters.flatMap((chapter) => chapterExamCardsForChapter(chapter.n));
  return cachedCards;
}

export function chapterExamCardsForChapter(chapterNumber: number): ChapterExamCard[] {
  const chapter = chapters.find((entry) => entry.n === chapterNumber);
  if (!chapter) throw new Error(`Missing chapter ${chapterNumber}`);

  const concepts = conceptCardsForChapter(chapterNumber);
  const formulas = formulasForChapter(chapterNumber);
  const algorithms = algorithmsForChapter(chapterNumber);
  const codeCards = codeLabCardsForChapter(chapterNumber);
  const assumptions = assumptionCardsForChapter(chapterNumber);
  const proofs = proofCardsForChapter(chapterNumber);
  const examples = workedExamplesForChapter(chapterNumber);
  const simulator = simulatorForChapter(chapterNumber);

  const conceptNames = concepts.slice(0, 4).map((concept) => concept.term);
  const formula = formulas[0];
  const algorithm = algorithms[0];
  const code = codeCards[0];
  const assumption = assumptions[0];
  const proof = proofs[0];
  const example = examples[0];

  return [
    {
      id: `chapter-${chapterNumber}-exam-teach-back`,
      chapter: chapterNumber,
      title: `Teach-back exam: ${chapter.title}`,
      kind: "teach-back",
      route: `/chapters/${chapterNumber}#exam`,
      prompt: `Explain Chapter ${chapterNumber} to someone who knows no RL. You must start from the everyday problem, name the agent/environment loop, then climb to the technical claim: ${chapter.claim}`,
      plan: [
        "Start with the chapter's real-world question before naming any symbol.",
        `Use these anchor ideas: ${compactSentence(conceptNames, chapter.keyIdeas.slice(0, 4))}.`,
        "State what quantity is being predicted, improved, or controlled.",
        "End by saying why the next chapter needs this one.",
      ],
      solution: `${chapter.easy} Technically, the answer must land on this statement: ${chapter.technical} A strong teach-back separates the plain story from the formal objects without pretending they are different subjects.`,
      rubric: [
        "Names the agent, environment, action, feedback, and learned object when they are relevant.",
        "Uses at least two chapter concepts correctly and not as isolated vocabulary.",
        "Mentions what would go wrong if the chapter's main distinction is ignored.",
        "Connects the chapter to a later need rather than ending with a memorized definition.",
      ],
      transfer: `Transfer test: take the same explanation to a new task and ask what the state, action, reward, target, and failure warning would become. Use this bridge: ${chapter.bridge}`,
      diagnostic: `If the answer sounds like a list of terms, return to the concept microscope and redraw where ${conceptNames[0] ?? chapter.keyIdeas[0]} sits in the loop.`,
      tags: compactTags(["exam", "teach-back", `Chapter ${chapterNumber}`, chapter.part, ...chapter.keyIdeas]),
    },
    {
      id: `chapter-${chapterNumber}-exam-board`,
      chapter: chapterNumber,
      title: `Board exam: draw ${chapter.title}`,
      kind: "board",
      route: `/chapters/${chapterNumber}#exam`,
      prompt: `Draw the chapter as a board diagram. The drawing must show what changes over time, what is observed, what is estimated, what is chosen, and where feedback enters.`,
      plan: [
        "Draw boxes for situation, choice, feedback, and memory/estimate.",
        `Place ${conceptNames.slice(0, 3).join(", ") || "the chapter's key ideas"} on arrows rather than in a word bank.`,
        "Mark which arrow is data and which arrow is a target or update.",
        "Add one red warning label for the common confusion.",
      ],
      solution: `A good board for Chapter ${chapterNumber} starts with the simple story (${chapter.easy}) and then annotates the technical object (${chapter.technical}). The picture should make the update pressure visible instead of hiding it inside notation.`,
      rubric: [
        "The board has a time arrow or feedback loop, not a static glossary.",
        "The estimate/policy/model being changed is visibly separate from raw experience.",
        "At least one formula, method, or proof card can be pointed to from the drawing.",
        "The warning label matches a real chapter confusion, not a generic 'be careful'.",
      ],
      transfer: `Transfer test: erase the chapter title and ask a friend to infer which problem the board solves. If they cannot, add the missing state/action/reward or target labels.`,
      diagnostic: "If the drawing cannot show what changes after one experience sample, revisit the blackboard and worked-example studio before moving to formulas.",
      tags: compactTags(["exam", "board", "visual", `Chapter ${chapterNumber}`, ...conceptNames]),
    },
    {
      id: `chapter-${chapterNumber}-exam-formula-proof`,
      chapter: chapterNumber,
      title: `Formula/proof exam: ${formula?.label ?? chapter.title}`,
      kind: "formula",
      route: `/chapters/${chapterNumber}#exam`,
      prompt: formula
        ? `Take the formula "${formula.label}" and explain what each symbol does, what claim it supports, and what proof idea makes it believable.`
        : `Take the chapter's central formal claim and explain why it is true enough to use.` ,
      plan: [
        `Name the formal object: ${formula?.label ?? proof?.title ?? chapter.claim}.`,
        `Translate symbols or ingredients: ${formula?.symbols.join(", ") || proof?.ingredients.slice(0, 4).join(", ") || conceptNames.join(", ")}.`,
        "Say whether the equation defines, estimates, backs up, or optimizes something.",
        "Give the stress test before claiming the result is general.",
      ],
      solution: proof
        ? `${proof.claim} The proof sketch should sound like this: ${proof.proofSketch.slice(0, 3).join(" ")} Equation bridge: ${proof.equationBridge}`
        : `${formula?.technical ?? chapter.technical} The answer must connect notation back to the chapter's learning loop rather than manipulating symbols in isolation.`,
      rubric: [
        "Every symbol or proof ingredient is named in words.",
        "The proof idea is described as a sequence, not as 'because the book says so'.",
        "The answer distinguishes sample, expectation, max, update, and fixed point when those objects appear.",
        "The stress test matches the formula's watch-out or the proof lab's counterexample.",
      ],
      transfer: `Transfer test: change one assumption or symbol meaning and explain which line of the proof no longer holds. ${proof?.stressTest ?? formula?.watchOut ?? chapter.commonConfusions[0]}`,
      diagnostic: "If the answer starts with algebra before naming the object, use the symbol decoder and proof lab first.",
      tags: compactTags(["exam", "formula", "proof", formula?.family, proof?.family, `Chapter ${chapterNumber}`, ...(formula?.symbols ?? [])]),
    },
    {
      id: `chapter-${chapterNumber}-exam-method-code`,
      chapter: chapterNumber,
      title: `Method/code exam: ${algorithm?.name ?? chapter.title}`,
      kind: "method",
      route: `/chapters/${chapterNumber}#exam`,
      prompt: `Turn one chapter method into executable thinking: name the state kept in memory, the target or error, the update, one invariant, and one tiny test.`,
      plan: [
        `Choose a method: ${algorithm?.name ?? chapter.algorithms[0] ?? chapter.title}.`,
        `State the objective: ${algorithm?.objective ?? chapter.claim}.`,
        `Write the core update or code goal: ${algorithm?.coreUpdate ?? code?.implementationGoal ?? chapter.technical}.`,
        "Give one invariant and one hand-test before mentioning large experiments.",
      ],
      solution: code
        ? `${code.plain} Implementation goal: ${code.implementationGoal} A correct answer includes at least this invariant: ${code.invariants[0]} and can be debugged by ${code.debugChecklist[0]}.`
        : `${algorithm?.plain ?? chapter.easy} Core technical move: ${algorithm?.technical ?? chapter.technical}`,
      rubric: [
        "Names stored state separately from incoming data.",
        "Names the target/error with the correct sign and subject.",
        "Includes an invariant that can be checked on a tiny case.",
        "Includes a debug symptom and a likely cause.",
      ],
      transfer: `Transfer test: run the same method on a two-state or two-action toy world and predict the direction of the first update before computing it.`,
      diagnostic: "If code variables cannot be named without looking at pseudocode, return to the implementation code lab.",
      tags: compactTags(["exam", "method", "code", algorithm?.family, code?.family, `Chapter ${chapterNumber}`]),
    },
    {
      id: `chapter-${chapterNumber}-exam-assumption`,
      chapter: chapterNumber,
      title: `Trust exam: ${assumption?.title.replace(" assumptions and guarantee", "") ?? chapter.title}`,
      kind: "assumption",
      route: `/chapters/${chapterNumber}#exam`,
      prompt: `Before trusting a chapter method, state the data assumption, target assumption, guarantee, failure mode, and repair move in your own words.`,
      plan: [
        `Pick the method contract: ${assumption?.title ?? chapter.title}.`,
        `Name the most important assumption: ${assumption?.assumptions[0] ?? chapter.commonConfusions[0] ?? chapter.claim}.`,
        "Say what promise follows only if the assumptions hold.",
        "Break the assumption deliberately and explain the repair.",
      ],
      solution: assumption
        ? `${assumption.plain} Guarantee: ${assumption.guarantee} Failure: ${assumption.failure} Repair begins with: ${assumption.repair[0]}.`
        : `The trust answer must say when the chapter's technical claim applies and when its common confusion breaks it: ${chapter.commonConfusions[0] ?? chapter.bridge}.`,
      rubric: [
        "States at least one data coverage condition.",
        "States what target or objective is legitimate under the setup.",
        "Explains the guarantee as conditional, not absolute.",
        "Gives a repair that changes evidence, target, update, representation, or diagnostics.",
      ],
      transfer: `Transfer test: describe a task where the method seems attractive but the assumption fails. Then propose the smallest diagnostic that would reveal the failure.`,
      diagnostic: "If the answer says 'it works when tuned well,' return to the assumption clinic and name the missing condition.",
      tags: compactTags(["exam", "trust", "assumption", assumption?.family, `Chapter ${chapterNumber}`]),
    },
    {
      id: `chapter-${chapterNumber}-exam-trace`,
      chapter: chapterNumber,
      title: `Trace exam: ${example?.title ?? chapter.title}`,
      kind: "trace",
      route: `/chapters/${chapterNumber}#exam`,
      prompt: `Walk through a tiny example by hand. You must state the scenario, show the board trace, identify the target/error, and answer the pitfall check.`,
      plan: [
        `Use this scenario: ${example?.scenario ?? chapter.examples[0] ?? chapter.easy}.`,
        "Write the old estimate or policy state before the update.",
        "Compute or describe the target/error in one line.",
        "Say what the pitfall would make you compute incorrectly.",
      ],
      solution: example
        ? `${example.plainWalkthrough} Technical trace: ${example.technicalTrace} Answer check: ${example.answerCheck}`
        : `${chapter.easy} A good trace must make one concrete transition or decision visible, not only repeat the chapter summary.`,
      rubric: [
        "Uses a concrete toy state/action/reward/policy/model object.",
        "Shows at least one before/after change.",
        "Identifies the target/error or decision criterion.",
        "Uses the pitfall to check the trace rather than as an afterthought.",
      ],
      transfer: `Transfer test: change one number, action, feature, or transition and predict which part of the trace changes first.`,
      diagnostic: "If the trace cannot be run with a finger line by line, shrink the problem until one update fits on the board.",
      tags: compactTags(["exam", "trace", "worked example", example?.kind, `Chapter ${chapterNumber}`, ...(example?.tags ?? [])]),
    },
    {
      id: `chapter-${chapterNumber}-exam-experiment`,
      chapter: chapterNumber,
      title: `Experiment exam: ${simulator.title}`,
      kind: "experiment",
      route: `/chapters/${chapterNumber}#exam`,
      prompt: `Design a tiny experiment for this chapter. Choose what to vary, what to measure, what failure you expect, and how the result should change your explanation.`,
      plan: [
        `Start with the simulator question: ${simulator.question}`,
        "Choose one knob: exploration pressure, update strength, future horizon, model accuracy, or representation capacity.",
        "Predict the direction of learning speed, stability, bias, or variance before moving the knob.",
        "Explain what result would falsify your current story.",
      ],
      solution: `${simulator.setup} ${simulator.technicalGuide} A complete experiment answer predicts a tradeoff, observes a readout, and then revises the chapter explanation rather than only reporting 'higher is better'.`,
      rubric: [
        "Names the independent knob and the dependent readout.",
        "Predicts direction before observing the result.",
        "Connects the result to a chapter concept, formula, method, proof, or assumption.",
        "Names a falsifying outcome or diagnostic follow-up.",
      ],
      transfer: `Transfer test: apply the same experimental design to a new task and explain which knob becomes unsafe first. ${simulator.transfer}`,
      diagnostic: "If every knob is described as simply better when larger, revisit the simulator readouts and name the bias/variance or stability tradeoff.",
      tags: compactTags(["exam", "experiment", "simulator", `Chapter ${chapterNumber}`, ...simulator.tags]),
    },
  ];
}

export function chapterExamCardCount(chapter?: number): number {
  return typeof chapter === "number" ? chapterExamCardsForChapter(chapter).length : allChapterExamCards().length;
}

export function chapterExamModeCount(chapter?: number): number {
  return chapterExamCardCount(chapter) * chapterExamModes.length;
}

export function chapterExamChapterCount(): number {
  return new Set(allChapterExamCards().map((card) => card.chapter)).size;
}

function compactSentence(primary: string[], fallback: string[]) {
  const items = compactTags([...primary, ...fallback]).slice(0, 4);
  return items.length ? items.join(", ") : "the chapter's core idea";
}

function compactTags(tags: Array<string | undefined | null>) {
  return Array.from(new Set(tags.filter(Boolean).map((tag) => String(tag).trim()).filter(Boolean))).slice(0, 10);
}

import { algorithmsForChapter } from "@/lib/algorithmCatalog";
import { conceptCardsForChapter } from "@/lib/conceptAtlas";
import { formulasForChapter } from "@/lib/formulaAtlas";
import { chapters } from "@/lib/paper";
import { zeroKnowledgeLadderForChapter } from "@/lib/zeroKnowledgeLadders";

export interface ChapterWorkedExample {
  chapter: number;
  id: string;
  title: string;
  kind: "toy world" | "board trace" | "numeric trace" | "method trace" | "debug trace";
  scenario: string;
  plainWalkthrough: string;
  boardSteps: string[];
  technicalTrace: string;
  miniExercise: string;
  pitfall: string;
  answerCheck: string;
  tags: string[];
}

export const workedExampleModes = ["scenario", "board", "trace", "debug", "check"] as const;

export function workedExamplesForChapter(chapterNumber: number): ChapterWorkedExample[] {
  const chapter = chapters.find((entry) => entry.n === chapterNumber);
  if (!chapter) throw new Error(`Missing chapter ${chapterNumber}`);

  const starter = zeroKnowledgeLadderForChapter(chapterNumber);
  const formulas = formulasForChapter(chapterNumber);
  const algorithms = algorithmsForChapter(chapterNumber);
  const concepts = conceptCardsForChapter(chapterNumber);
  const firstFormula = formulas[0];
  const firstAlgorithm = algorithms[0];
  const firstConcept = concepts[0];
  const secondConcept = concepts[1] ?? firstConcept;
  const firstSection = chapter.sections[0] ?? chapter.title;
  const secondSection = chapter.sections[1] ?? firstSection;
  const mainIdea = chapter.keyIdeas[0] ?? chapter.claim;
  const secondIdea = chapter.keyIdeas[1] ?? chapter.technical;
  const confusion = chapter.commonConfusions[0] ?? "The learner memorizes a word without tracking how it changes learning.";
  const bridge = chapter.bridge;
  const starterTitle = starter.rungs[0]?.title ?? "chapter starting idea";

  return [
    {
      chapter: chapterNumber,
      id: `chapter-${chapterNumber}-worked-toy-world`,
      title: "Toy world: make the idea concrete",
      kind: "toy world",
      scenario: `Build a tiny example for Chapter ${chapterNumber}, ${chapter.title}: imagine one learner, two possible choices, one feedback signal, and one estimate that changes after experience. The learner is studying ${starterTitle}.`,
      plainWalkthrough: `In plain words, the learner tries a choice, sees whether the result helped, and then changes what it expects next time. This makes ${mainIdea} visible as a small story instead of an abstract label.`,
      boardSteps: [
        `Draw the learner on the left and the situation from ${firstSection} on the right.`,
        "Draw two action arrows and put a small reward meter after the chosen arrow.",
        "Under the diagram, draw an estimate box that receives the feedback and changes the next choice.",
        `Label the chapter-specific handle: ${mainIdea}.`,
      ],
      technicalTrace: `Technically, the example should name the state-like information, the action choice, the feedback signal, and the learned object. For this chapter, connect the learned object to: ${chapter.technical}`,
      miniExercise: `Invent values for the two choices, such as 3 and 5. Say which choice the learner would currently pick, then say what new observation could make the other choice look better.`,
      pitfall: "Do not let the example become a supervised-learning flashcard. The learner must discover consequences by acting, not by being told the correct action in advance.",
      answerCheck: `A good answer identifies the agent, choice, feedback, estimate, and next behavior, then explains how this prepares the bridge idea: ${bridge}`,
      tags: ["toy world", firstConcept?.term ?? "agent", mainIdea, `Ch ${chapterNumber}`],
    },
    {
      chapter: chapterNumber,
      id: `chapter-${chapterNumber}-worked-board-trace`,
      title: "Board trace: follow one pass through the loop",
      kind: "board trace",
      scenario: `Trace one complete loop from ${firstSection} to ${secondSection}. The goal is to see what information moves before formal notation appears.`,
      plainWalkthrough: `Start with a situation, choose an action, watch the consequence, then revise the learner's future choice. The trace turns the chapter's story into a moving board diagram.`,
      boardSteps: [
        `Write ${firstSection} as the starting box.`,
        "Add an action arrow and a feedback arrow, using short labels instead of formulas.",
        `Add ${secondSection} as the next box and mark what became clearer after the feedback.`,
        `Circle the distinction that Chapter ${chapterNumber} protects: ${secondIdea}.`,
      ],
      technicalTrace: `Read the board as a conditional dependency: what the learner knows affects what it chooses; what it chooses affects the data; the data affects the estimate or policy. Chapter ${chapterNumber} makes that dependency precise through ${chapter.keyIdeas.slice(0, 3).join(", ")}.`,
      miniExercise: "Change one arrow in the board, such as making feedback delayed or making the state description incomplete. Explain which part of the trace becomes harder.",
      pitfall: "Do not draw a one-way pipeline. Reinforcement learning is a feedback system: the learner's current behavior controls the data it will later learn from.",
      answerCheck: `A correct board trace has a loop, labels at least one chapter-specific object, and says why the next chapter or next section needs this object: ${bridge}`,
      tags: ["board trace", secondConcept?.term ?? "loop", secondIdea, `Ch ${chapterNumber}`],
    },
    {
      chapter: chapterNumber,
      id: `chapter-${chapterNumber}-worked-numeric-trace`,
      title: "Tiny numbers: read the target by hand",
      kind: "numeric trace",
      scenario: firstFormula
        ? `Use ${firstFormula.label} as the formal anchor, but shrink it to one tiny hand calculation.`
        : `Use the chapter's first formal pattern as a tiny hand calculation: ${chapter.equations[0] ?? chapter.title}.`,
      plainWalkthrough: "The point of the numbers is not realism. The point is to see what is observed now, what is predicted for later, and what gets nudged after the comparison.",
      boardSteps: [
        "Write old estimate = 3.0.",
        "Write immediate signal = +1 and next estimate = 4.0.",
        "Use a future weight of 0.9, so a simple target is 1 + 0.9 × 4 = 4.6.",
        "Move the old estimate partway toward 4.6; with step-size 0.5, the new estimate is 3.8.",
      ],
      technicalTrace: firstFormula
        ? `${firstFormula.technical} For the toy trace, separate the target construction from the update. The target says what the estimate should move toward; the step-size says how far it actually moves this time.`
        : `For this chapter, treat the toy arithmetic as a generic update skeleton: old quantity plus step-size times error. Then map the skeleton back to ${chapter.technical}`,
      miniExercise: "Redo the calculation with next estimate 2.0 instead of 4.0. Say whether the new target moves above or below the old estimate and why.",
      pitfall: firstFormula?.watchOut ?? "Do not mistake the toy arithmetic for the whole algorithm. It is a microscope for the target/update pattern, not a full environment simulation.",
      answerCheck: "A strong answer states the old estimate, target, error direction, step-size role, and why the calculation is only a tiny local piece of learning.",
      tags: ["numeric trace", firstFormula?.label ?? "update", "target", `Ch ${chapterNumber}`],
    },
    {
      chapter: chapterNumber,
      id: `chapter-${chapterNumber}-worked-method-trace`,
      title: "Method trace: run one algorithmic step",
      kind: "method trace",
      scenario: firstAlgorithm
        ? `Run one tiny step of ${firstAlgorithm.name}: one data item arrives, the method builds its target or decision pressure, and one learned object changes.`
        : `Run one tiny step of a Chapter ${chapterNumber} method: one data item arrives, a target or decision pressure is built, and one learned object changes.`,
      plainWalkthrough: firstAlgorithm
        ? firstAlgorithm.plain
        : `The method should show how ${chapter.title} turns experience into a more useful estimate, policy, model, or representation.`,
      boardSteps: firstAlgorithm
        ? firstAlgorithm.steps.slice(0, 4)
        : [
          "Name the data the learner receives.",
          "Name the target or comparison the method builds.",
          "Name the stored quantity that changes.",
          "Name the behavior change the update is supposed to support.",
        ],
      technicalTrace: firstAlgorithm
        ? `${firstAlgorithm.technical} The trace should verify this core update: ${firstAlgorithm.coreUpdate}`
        : `The technical trace must name the data stream, target, update site, and control or prediction effect. For this chapter, connect those pieces to ${chapter.keyIdeas.slice(0, 3).join(", ")}.`,
      miniExercise: firstAlgorithm
        ? `Take the first implementation note for ${firstAlgorithm.name}: ${firstAlgorithm.implementationNotes[0] ?? "check that data arrives in the order the update expects"}. Explain how you would test it in a toy run.`
        : "Write one line of pseudocode for the update site, then say what could be logged to check it.",
      pitfall: firstAlgorithm?.failureModes[0] ?? "Do not describe a method only by its name. If you cannot identify its input, target, update, and failure mode, you have not traced it.",
      answerCheck: `A complete trace names why this method is appropriate for ${chapter.title}, what it changes, and what evidence would show the update is moving in the intended direction.`,
      tags: ["method trace", firstAlgorithm?.family ?? "method", firstAlgorithm?.name ?? mainIdea, `Ch ${chapterNumber}`],
    },
    {
      chapter: chapterNumber,
      id: `chapter-${chapterNumber}-worked-debug-trace`,
      title: "Debug trace: repair a wrong solution",
      kind: "debug trace",
      scenario: `A learner gives this incomplete explanation: "${confusion}" Use a concrete example to show what is missing and how to fix it.`,
      plainWalkthrough: "First, be charitable: identify the piece that sounds plausible. Then locate the missing distinction and rebuild the example so the learner can use it on a new problem.",
      boardSteps: [
        "Write the learner's statement on the board.",
        "Underline the word that is doing too much work or hiding a distinction.",
        `Draw the missing object from Chapter ${chapterNumber}: ${chapter.keyIdeas.slice(0, 2).join(" or ")}.`,
        "Rewrite the statement so it says what changes in the learner and why that matters later.",
      ],
      technicalTrace: `The repair should connect the mistake to the chapter's formal role: ${chapter.technical} It should also name whether the confusion is about reward, return, value, policy, model, representation, objective, or sampling distribution.`,
      miniExercise: `Make a second wrong statement about ${chapter.title}, then repair it with the same pattern: plausible part, missing distinction, corrected trace, transfer example.`,
      pitfall: "Do not only say 'wrong.' The useful repair identifies the object being confused and explains the consequence for learning or decision making.",
      answerCheck: `The repaired explanation should be usable in a new domain and should end by pointing forward: ${bridge}`,
      tags: ["debug trace", "misconception", chapter.commonConfusions[1] ?? "repair", `Ch ${chapterNumber}`],
    },
  ];
}

export function allWorkedExamples() {
  return chapters.flatMap((chapter) => workedExamplesForChapter(chapter.n));
}

export function workedExampleCount(chapter?: number) {
  return typeof chapter === "number" ? workedExamplesForChapter(chapter).length : allWorkedExamples().length;
}

export function workedExampleModeCount(chapter?: number) {
  return workedExampleCount(chapter) * workedExampleModes.length;
}

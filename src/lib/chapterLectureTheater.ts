import { algorithmsForChapter } from "@/lib/algorithmCatalog";
import { conceptCardsForChapter } from "@/lib/conceptAtlas";
import { formulasForChapter } from "@/lib/formulaAtlas";
import { chapters } from "@/lib/paper";
import { sectionLessonsForChapter } from "@/lib/sectionNarratives";
import { standaloneLectureForChapter } from "@/lib/standaloneBook";
import { workedExamplesForChapter } from "@/lib/chapterWorkedExamples";

export const theaterModes = ["beginner", "picture", "technical", "equation", "check"] as const;

export type TheaterMode = (typeof theaterModes)[number];

export interface ChapterTheaterSlide {
  id: string;
  chapter: number;
  stage: number;
  label: string;
  headline: string;
  prompt: string;
  beginner: string;
  picture: string;
  technical: string;
  equation: string;
  check: string;
  boardSteps: string[];
  tags: string[];
}

export interface ChapterLectureTheater {
  chapter: number;
  id: string;
  title: string;
  promise: string;
  route: string;
  slides: ChapterTheaterSlide[];
  finalTakeaway: string;
}

const slideLabels = [
  "Start from nothing",
  "Draw the world",
  "Name the objects",
  "Run the method",
  "Own the transfer",
] as const;

export function lectureTheaterForChapter(chapterNumber: number): ChapterLectureTheater {
  const chapter = chapters.find((entry) => entry.n === chapterNumber);
  if (!chapter) throw new Error(`Missing chapter ${chapterNumber}`);

  const lecture = standaloneLectureForChapter(chapter);
  const algorithms = algorithmsForChapter(chapterNumber);
  const formulas = formulasForChapter(chapterNumber);
  const concepts = conceptCardsForChapter(chapterNumber);
  const examples = workedExamplesForChapter(chapterNumber);
  const lessons = sectionLessonsForChapter(chapterNumber);
  const mainConcept = concepts[0];
  const secondConcept = concepts[1] ?? mainConcept;
  const mainFormula = formulas[0];
  const secondFormula = formulas[1] ?? mainFormula;
  const mainAlgorithm = algorithms[0];
  const example = examples[0];
  const finalLesson = lessons[lessons.length - 1];

  const slides: ChapterTheaterSlide[] = [
    {
      id: theaterSlideId(chapterNumber, 1),
      chapter: chapterNumber,
      stage: 1,
      label: slideLabels[0],
      headline: `Why ${chapter.title} exists`,
      prompt: `If a reader knows no reinforcement learning yet, what problem should Chapter ${chapterNumber} solve first?`,
      beginner: lecture.startFromZero[0] ?? chapter.easy,
      picture: lecture.mentalModel,
      technical: chapter.technical,
      equation: mainFormula ? `Keep ${mainFormula.label} in the background: ${mainFormula.easy} Technically, ${mainFormula.technical}` : `Before equations, locate the agent, environment, action, reward, policy, and value object that Chapter ${chapterNumber} is about to formalize.`,
      check: `Close the notes and say the chapter goal in one sentence: ${lecture.promise}`,
      boardSteps: [
        "Write the everyday story on the left side of the board.",
        "Circle the learner, the choices, the feedback, and the delayed consequence.",
        "Name which part of the story the chapter is trying to make precise.",
      ],
      tags: compactTags([chapter.part, mainConcept?.term, mainFormula?.label, `Ch ${chapterNumber}`]),
    },
    {
      id: theaterSlideId(chapterNumber, 2),
      chapter: chapterNumber,
      stage: 2,
      label: slideLabels[1],
      headline: "Turn the story into a board picture",
      prompt: "What should be drawn before symbols appear?",
      beginner: lecture.startFromZero[1] ?? chapter.easy,
      picture: mainConcept ? mainConcept.visual : lecture.mentalModel,
      technical: finalLesson ? `${finalLesson.technicalPass} The board picture should still preserve the formal boundary used later by the chapter.` : chapter.technical,
      equation: secondFormula ? `${secondFormula.label} is the equation checkpoint for this picture: ${secondFormula.useWhen}` : `Use the picture to decide whether the chapter is changing data, targets, updates, policy pressure, or representation.`,
      check: mainConcept ? mainConcept.check : `Point at each arrow in the drawing and say what information crosses it in Chapter ${chapterNumber}.`,
      boardSteps: [
        "Draw the agent-environment or estimator-update loop as boxes and arrows.",
        "Put the chapter's main concept on the arrow or box where it actually acts.",
        "Add one warning mark where an intuitive drawing could become technically false.",
      ],
      tags: compactTags([secondConcept?.term, finalLesson?.section, secondFormula?.family, "board first"]),
    },
    {
      id: theaterSlideId(chapterNumber, 3),
      chapter: chapterNumber,
      stage: 3,
      label: slideLabels[2],
      headline: "Translate the drawing into technical language",
      prompt: "Which variables, estimates, distributions, or objectives does the chapter need?",
      beginner: mainConcept ? mainConcept.plain : lecture.startFromZero[2] ?? chapter.easy,
      picture: mainConcept ? mainConcept.contrast : lecture.mentalModel,
      technical: mainConcept ? mainConcept.technical : chapter.technical,
      equation: mainFormula ? `${mainFormula.label}: ${mainFormula.technical} Watch-out: ${mainFormula.watchOut}` : `The technical translation should identify the estimand, data distribution, target, update rule, and policy-improvement pressure.`,
      check: `Explain ${mainConcept?.term ?? chapter.title} without using the book open, then connect it to the chapter claim: ${chapter.claim}`,
      boardSteps: [
        "Replace each plain word in the picture with its technical name.",
        "Mark what is known, what is sampled, what is estimated, and what is optimized.",
        "Write the smallest equation or update target that makes the picture precise.",
      ],
      tags: compactTags([mainConcept?.kind, mainConcept?.term, mainFormula?.family, "technical pass"]),
    },
    {
      id: theaterSlideId(chapterNumber, 4),
      chapter: chapterNumber,
      stage: 4,
      label: slideLabels[3],
      headline: "Run one method by hand",
      prompt: "How does the chapter actually change a value, policy, model, or representation?",
      beginner: example ? example.scenario : `Use a toy version of ${chapter.title} so the update can be followed with a finger before code appears.`,
      picture: example ? example.boardSteps.join(" ") : `Draw a tiny state-action-reward trace and mark where the method reads data and writes an improved estimate.`,
      technical: mainAlgorithm ? `${mainAlgorithm.name}: ${mainAlgorithm.plain} Technically, ${mainAlgorithm.coreUpdate}` : chapter.technical,
      equation: mainAlgorithm?.equations[0] ? `Method equation: ${mainAlgorithm.equations[0]}. Treat it as a recipe for target construction, error measurement, and parameter or table movement.` : mainFormula ? `${mainFormula.label} supplies the formal target for this hand run.` : "Write the hand trace as data, target, error, update, and improved behavior.",
      check: mainAlgorithm ? `Before moving on, identify whether ${mainAlgorithm.name} changes behavior data, target construction, the update magnitude, or the policy itself.` : `Before moving on, state the chapter's update in data-target-error-update language.`,
      boardSteps: [
        "Choose a tiny example with one or two decisions.",
        "Compute or narrate the target produced by the chapter idea.",
        "Show exactly which stored number, weight, or policy preference moves.",
      ],
      tags: compactTags([mainAlgorithm?.family, mainAlgorithm?.name, example?.title, "hand trace"]),
    },
    {
      id: theaterSlideId(chapterNumber, 5),
      chapter: chapterNumber,
      stage: 5,
      label: slideLabels[4],
      headline: "Connect the chapter to advanced RL",
      prompt: "What should the reader be able to transfer after the lecture?",
      beginner: lecture.handsOnSequence.join(" "),
      picture: chapter.bridge,
      technical: lecture.technicalFinish.join(" "),
      equation: secondFormula ? `Advanced equation handle: ${secondFormula.label}. It matters because ${secondFormula.useWhen}` : `Advanced handle: decide what breaks when scale, approximation, off-policy data, partial observability, hierarchy, or exploration pressure enters the same chapter idea.`,
      check: lecture.completionStandard,
      boardSteps: [
        "Draw the next chapter or advanced setting beside the current one.",
        "Mark which object stays the same and which object becomes harder.",
        "Ask what evidence would prove the reader can apply the idea without this page.",
      ],
      tags: compactTags(["transfer", finalLesson?.nextLink, chapter.part, "advanced"]),
    },
  ];

  return {
    chapter: chapterNumber,
    id: `chapter-${chapterNumber}-lecture-theater`,
    title: `Chapter ${chapterNumber} lecture theater: ${chapter.title}`,
    promise: lecture.promise,
    route: `/chapters/${chapterNumber}#theater`,
    slides,
    finalTakeaway: lecture.nextChapterBridge,
  };
}

export function allLectureTheaters() {
  return chapters.map((chapter) => lectureTheaterForChapter(chapter.n));
}

export function lectureTheaterCount(chapter?: number) {
  return typeof chapter === "number" ? 1 : chapters.length;
}

export function lectureTheaterSlideCount(chapter?: number) {
  return typeof chapter === "number" ? lectureTheaterForChapter(chapter).slides.length : allLectureTheaters().reduce((sum, theater) => sum + theater.slides.length, 0);
}

export function lectureTheaterModeCount(chapter?: number) {
  return lectureTheaterSlideCount(chapter) * theaterModes.length;
}

function theaterSlideId(chapter: number, stage: number) {
  return `chapter-${chapter}-lecture-slide-${stage}`;
}

function compactTags(values: Array<string | undefined>) {
  const seen = new Set<string>();
  const tags: string[] = [];
  for (const value of values) {
    const tag = value?.trim();
    if (!tag || seen.has(tag)) continue;
    seen.add(tag);
    tags.push(tag);
  }
  return tags.slice(0, 5);
}

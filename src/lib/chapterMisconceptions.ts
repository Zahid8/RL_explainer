import { algorithmsForChapter } from "@/lib/algorithmCatalog";
import { conceptCardsForChapter } from "@/lib/conceptAtlas";
import { formulasForChapter } from "@/lib/formulaAtlas";
import { chapters } from "@/lib/paper";
import { workedExamplesForChapter } from "@/lib/chapterWorkedExamples";

export interface ChapterMisconceptionCard {
  chapter: number;
  id: string;
  title: string;
  misconception: string;
  whyTempting: string;
  repair: string;
  boardFix: string;
  technicalConsequence: string;
  selfCheck: string;
  tags: string[];
}

export const misconceptionModes = ["mistake", "temptation", "repair", "technical", "check"] as const;

type Seed = {
  title: string;
  misconception: string;
  anchor: string;
  kind: string;
};

export function misconceptionCardsForChapter(chapterNumber: number): ChapterMisconceptionCard[] {
  const chapter = chapters.find((entry) => entry.n === chapterNumber);
  if (!chapter) throw new Error(`Missing chapter ${chapterNumber}`);

  const concepts = conceptCardsForChapter(chapterNumber);
  const formulas = formulasForChapter(chapterNumber);
  const algorithms = algorithmsForChapter(chapterNumber);
  const examples = workedExamplesForChapter(chapterNumber);
  const firstConcept = concepts[0];
  const secondConcept = concepts[1] ?? firstConcept;
  const firstFormula = formulas[0];
  const firstAlgorithm = algorithms[0];
  const firstExample = examples[0];

  const seeds: Seed[] = [
    ...(chapter.commonConfusions.slice(0, 3).map((confusion, index) => ({
      title: `Confusion ${index + 1}: ${shortTitle(confusion)}`,
      misconception: confusion,
      anchor: chapter.keyIdeas[index] ?? chapter.claim,
      kind: "chapter confusion",
    }))),
    {
      title: `Word trap: ${firstConcept?.term ?? chapter.keyIdeas[0] ?? chapter.title}`,
      misconception: `If I can define ${firstConcept?.term ?? "the main term"}, then I understand Chapter ${chapterNumber}.`,
      anchor: firstConcept?.technical ?? chapter.technical,
      kind: "concept trap",
    },
    {
      title: firstFormula ? `Formula trap: ${firstFormula.label}` : `Method trap: ${firstAlgorithm?.name ?? chapter.title}`,
      misconception: firstFormula
        ? `${firstFormula.label} is just a formula to memorize; the story around it is optional.`
        : `${firstAlgorithm?.name ?? "The chapter method"} is the answer by itself; I do not need to know the data, target, or failure mode.`,
      anchor: firstFormula?.technical ?? firstAlgorithm?.technical ?? chapter.technical,
      kind: firstFormula ? "formula trap" : "method trap",
    },
  ].slice(0, 5);

  while (seeds.length < 5) {
    const idea = chapter.keyIdeas[seeds.length % Math.max(chapter.keyIdeas.length, 1)] ?? chapter.title;
    seeds.push({
      title: `Boundary trap: ${idea}`,
      misconception: `${idea} explains everything in Chapter ${chapterNumber} without needing the agent-environment loop or the next chapter bridge.`,
      anchor: chapter.bridge,
      kind: "boundary trap",
    });
  }

  return seeds.map((seed, index) => {
    const concept = concepts[index % Math.max(concepts.length, 1)];
    const example = examples[index % Math.max(examples.length, 1)] ?? firstExample;
    const algorithm = algorithms[index % Math.max(algorithms.length, 1)] ?? firstAlgorithm;
    const formula = formulas[index % Math.max(formulas.length, 1)] ?? firstFormula;
    const repairedObject = concept?.term ?? chapter.keyIdeas[index] ?? chapter.title;
    return {
      chapter: chapterNumber,
      id: `chapter-${chapterNumber}-misconception-${index + 1}-${slug(seed.title)}`,
      title: seed.title,
      misconception: seed.misconception,
      whyTempting: `This sounds plausible because Chapter ${chapterNumber} really does emphasize ${seed.anchor}. The shortcut fails because the chapter is not asking you to recite one label; it is asking you to track how the learner's information, choice, feedback, and update relate over time.`,
      repair: `Repair it by naming the missing object: ${repairedObject}. In plain language, ask what the learner knows, what it does, what feedback arrives, and what changes afterward. Then restate the idea as part of the chapter claim: ${chapter.claim}`,
      boardFix: `On the board, write the wrong sentence at the top. Underline the overloaded word. Draw a loop with situation → action → feedback → update → next situation. Put ${repairedObject} on the arrow or box where it actually belongs, then connect it to ${secondConcept?.term ?? chapter.keyIdeas[1] ?? "the next idea"}.`,
      technicalConsequence: `Technically, the corrected explanation must preserve this chapter's role: ${chapter.technical} ${formula ? `If notation appears, connect it to ${formula.label} instead of treating it as decoration.` : "If no equation is central, name the target, update, or policy relation in words."} ${algorithm ? `If a method appears, check it against ${algorithm.name}: ${algorithm.coreUpdate}` : "If no algorithm is central, check the representation or objective being used."}`,
      selfCheck: `Self-check: use the worked example "${example?.title ?? "Toy world"}" to show the misconception failing. Then give a corrected two-sentence answer and finish by saying how the repair prepares this bridge: ${chapter.bridge}`,
      tags: [seed.kind, repairedObject, chapter.keyIdeas[0] ?? "RL", `Ch ${chapterNumber}`].slice(0, 5),
    };
  });
}

export function allMisconceptionCards() {
  return chapters.flatMap((chapter) => misconceptionCardsForChapter(chapter.n));
}

export function misconceptionCardCount(chapter?: number) {
  return typeof chapter === "number" ? misconceptionCardsForChapter(chapter).length : allMisconceptionCards().length;
}

export function misconceptionModeCount(chapter?: number) {
  return misconceptionCardCount(chapter) * misconceptionModes.length;
}

function shortTitle(value: string) {
  const clean = value.replace(/["“”]/g, "").trim();
  return clean.length > 48 ? `${clean.slice(0, 45)}...` : clean;
}

function slug(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "trap";
}

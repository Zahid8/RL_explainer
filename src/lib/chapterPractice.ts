import { algorithmsForChapter } from "@/lib/algorithmCatalog";
import { formulasForChapter } from "@/lib/formulaAtlas";
import { chapters } from "@/lib/paper";
import { zeroKnowledgeLadderForChapter } from "@/lib/zeroKnowledgeLadders";

export interface ChapterPracticeCard {
  chapter: number;
  id: string;
  title: string;
  skill: string;
  prompt: string;
  hint: string;
  solution: string;
  trap: string;
  transfer: string;
  tags: string[];
}

export const practiceModes = ["prompt", "hint", "solution", "trap", "transfer"] as const;

export function practiceCardsForChapter(chapterNumber: number): ChapterPracticeCard[] {
  const chapter = chapters.find((entry) => entry.n === chapterNumber);
  if (!chapter) throw new Error(`Missing chapter ${chapterNumber}`);

  const starter = zeroKnowledgeLadderForChapter(chapterNumber);
  const formulas = formulasForChapter(chapterNumber);
  const algorithms = algorithmsForChapter(chapterNumber);
  const firstFormula = formulas[0];
  const firstAlgorithm = algorithms[0];
  const mainIdea = chapter.keyIdeas[0] ?? chapter.claim;
  const secondIdea = chapter.keyIdeas[1] ?? chapter.technical;
  const firstSection = chapter.sections[0] ?? chapter.title;
  const secondSection = chapter.sections[1] ?? firstSection;
  const confusion = chapter.commonConfusions[0] ?? "Do not memorize the label while losing the learning mechanism.";
  const bridge = chapter.bridge;
  const starterTags = starter.rungs.flatMap((rung) => rung.tags).slice(0, 4);

  return [
    {
      chapter: chapterNumber,
      id: `chapter-${chapterNumber}-teach-back`,
      title: "Teach-back in one minute",
      skill: "plain-language explanation",
      prompt: `Explain Chapter ${chapterNumber}, ${chapter.title}, to a reader who knows no reinforcement learning. You must include the chapter's core claim without using formulas first: ${chapter.claim}`,
      hint: `Start from the starter ladder: ${starter.rungs.slice(0, 2).map((rung) => rung.title).join(" → ")}. Then say why the chapter belongs in ${chapter.part}.`,
      solution: `${chapter.easy} In technical language, ${chapter.technical} A complete answer names the learner, the relevant state/action/reward/value object, and why this chapter changes how later chapters build targets or policies.`,
      trap: `Do not describe the chapter as a list of terms. The mistake is to say "this chapter is about ${mainIdea}" without explaining what problem that idea solves for an agent that is learning from interaction.` ,
      transfer: `Transfer test: use the same explanation on a new domain such as tutoring, robotics, trading, or game play. Identify what would count as state, action, reward, estimate, and behavior in that domain.`,
      tags: ["teach-back", "beginner", ...starterTags],
    },
    {
      chapter: chapterNumber,
      id: `chapter-${chapterNumber}-board-draw`,
      title: "Draw the board mechanism",
      skill: "graphical reasoning",
      prompt: `Draw the chapter's mechanism as a board diagram. Your drawing must connect ${firstSection} to ${secondSection} and show what information moves through the loop.` ,
      hint: `Use arrows before equations: situation → choice → feedback → estimate → improved choice. Add the chapter-specific labels ${chapter.keyIdeas.slice(0, 3).join(", ")}.`,
      solution: `A strong board diagram starts with the agent-environment loop, then overlays this chapter's extra machinery: ${chapter.keyIdeas.slice(0, 4).join("; ")}. It should show where data arrives, what target or prediction is built, and what estimate or policy changes after the update.`,
      trap: "Do not draw a one-way pipeline that ends after reward. Reinforcement learning is cyclic: today's estimate changes tomorrow's behavior, which changes tomorrow's data.",
      transfer: `Transfer test: redraw the mechanism for a continuing task and mark which arrows would still exist if there were no terminal episode boundary. Use the bridge idea: ${bridge}`,
      tags: ["board", "diagram", "loop", secondIdea],
    },
    {
      chapter: chapterNumber,
      id: `chapter-${chapterNumber}-math-reading`,
      title: "Read the chapter's math aloud",
      skill: "notation-to-meaning translation",
      prompt: firstFormula
        ? `Read this formula as a sentence, then say what each symbol is doing: ${firstFormula.label}.`
        : `Read one of this chapter's formal patterns as a sentence, then say what each symbol is doing: ${chapter.equations[0] ?? chapter.title}.`,
      hint: firstFormula
        ? `Use the easy handle first: ${firstFormula.easy} Then decide which symbols are observed, estimated, averaged, optimized, or used as knobs.`
        : `Use the equation list as a compact target description: ${chapter.equations.slice(0, 2).join("; ")}.`,
      solution: firstFormula
        ? `${firstFormula.technical} Use it when: ${firstFormula.useWhen} The symbols to account for are ${firstFormula.symbols.join(", ")}; the answer should explain the left side as the quantity being defined or updated and the right side as the construction that supplies it.`
        : `The chapter's formal move is about ${chapter.technical}. A good translation names the object being predicted or improved, the data that enters the target, and the condition under which the expression is valid.`,
      trap: firstFormula ? firstFormula.watchOut : `Do not treat notation as decoration. If the answer cannot say what changes when the policy, model, reward, or representation changes, it has not explained the formula.`,
      transfer: `Transfer test: invent tiny numbers or a tiny two-state example and walk through one symbolic calculation by hand, even if the chapter later scales the idea up.` ,
      tags: ["formula", "symbols", ...(firstFormula?.symbols ?? chapter.equations.slice(0, 2))],
    },
    {
      chapter: chapterNumber,
      id: `chapter-${chapterNumber}-method-choice`,
      title: "Choose the method, not the name",
      skill: "algorithmic judgment",
      prompt: firstAlgorithm
        ? `When would you use ${firstAlgorithm.name}, and what is the first implementation detail you would verify?`
        : `Choose one method from this chapter and explain what data it needs before it can update.` ,
      hint: firstAlgorithm
        ? `Look for the objective and core update: ${firstAlgorithm.objective} ${firstAlgorithm.coreUpdate}`
        : `Use the chapter algorithm list: ${chapter.algorithms.slice(0, 3).join(", ")}.`,
      solution: firstAlgorithm
        ? `${firstAlgorithm.plain} Technically, ${firstAlgorithm.technical} The first implementation check is that the inputs required by the update are available in the right time order and that the behavior/target-policy relation matches the method.`
        : `A good answer names the data stream, the target, the update site, and the failure mode. It should explain why the method is appropriate for ${chapter.title}, not merely quote the method name.`,
      trap: firstAlgorithm?.failureModes[0] ?? "Do not choose an algorithm just because it appears in the chapter. Match it to the model access, sampling regime, policy relation, and representation limits.",
      transfer: `Transfer test: change one constraint, such as removing the model, making the task continuing, or using function approximation, and explain whether the method still fits.` ,
      tags: ["algorithm", "implementation", firstAlgorithm?.family ?? "method"],
    },
    {
      chapter: chapterNumber,
      id: `chapter-${chapterNumber}-diagnose-mistake`,
      title: "Diagnose the common mistake",
      skill: "misconception repair",
      prompt: `A learner says: "${confusion}" Diagnose what is wrong or incomplete, then repair it in both everyday and technical language.`,
      hint: `Compare the confusion with the chapter bridge: ${bridge} Ask whether the learner mixed up immediate reward, return, value, policy, model, representation, or objective.` ,
      solution: `The repair should first restate the idea in plain language using the chapter story, then connect it to the technical object. For this chapter, the answer should include: ${chapter.commonConfusions.slice(0, 3).join("; ")}. The final sentence should say how the repaired idea prepares the next chapter: ${bridge}`,
      trap: "Do not answer by saying only that the statement is false. The goal is to locate the missing distinction and rebuild the idea so the learner can use it on a new example.",
      transfer: `Transfer test: write a new wrong statement about ${chapter.title}, then repair it using the same diagnosis pattern: name the confusion, name the correct object, explain the consequence for learning.`,
      tags: ["diagnosis", "misconception", "transfer"],
    },
  ];
}

export function allPracticeCards() {
  return chapters.flatMap((chapter) => practiceCardsForChapter(chapter.n));
}

export function practiceCardCount(chapter?: number) {
  return typeof chapter === "number" ? practiceCardsForChapter(chapter).length : allPracticeCards().length;
}

export function practiceModeCount(chapter?: number) {
  return practiceCardCount(chapter) * practiceModes.length;
}

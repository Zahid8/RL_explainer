import { algorithmsForChapter } from "@/lib/algorithmCatalog";
import { conceptCardsForChapter } from "@/lib/conceptAtlas";
import { formulaAtlas, formulasForChapter, type FormulaNote } from "@/lib/formulaAtlas";
import { chapters } from "@/lib/paper";

export const proofLabModes = ["plain", "claim", "proof", "equation", "stress"] as const;

export type ProofLabMode = (typeof proofLabModes)[number];
export type ProofLabKind = "chapter theorem" | "formula proof";

export interface ProofLabCard {
  id: string;
  chapter: number;
  kind: ProofLabKind;
  title: string;
  family: string;
  route: string;
  plain: string;
  claim: string;
  ingredients: string[];
  proofSketch: string[];
  equationBridge: string;
  stressTest: string;
  takeaway: string;
  tags: string[];
}

let cachedCards: ProofLabCard[] | undefined;

export function allProofLabCards(): ProofLabCard[] {
  cachedCards ??= chapters.flatMap((chapter) => [chapterProofCard(chapter.n), ...formulasForChapter(chapter.n).map((formula, index) => formulaProofCard(formula, index + 1))]);
  return cachedCards;
}

export function proofCardsForChapter(chapter: number): ProofLabCard[] {
  return allProofLabCards().filter((card) => card.chapter === chapter);
}

export function proofCardCount(chapter?: number): number {
  return typeof chapter === "number" ? proofCardsForChapter(chapter).length : allProofLabCards().length;
}

export function proofModeCount(chapter?: number): number {
  return proofCardCount(chapter) * proofLabModes.length;
}

export function proofChapterCount(): number {
  return new Set(allProofLabCards().map((card) => card.chapter)).size;
}

function chapterProofCard(chapterNumber: number): ProofLabCard {
  const chapter = chapters.find((entry) => entry.n === chapterNumber);
  if (!chapter) throw new Error(`Missing chapter ${chapterNumber}`);
  const formulas = formulasForChapter(chapterNumber);
  const concepts = conceptCardsForChapter(chapterNumber).slice(0, 4);
  const algorithms = algorithmsForChapter(chapterNumber).slice(0, 4);
  const formulaNames = formulas.slice(0, 3).map((formula) => formula.label);
  return {
    id: `chapter-${chapterNumber}-proof-spine`,
    chapter: chapterNumber,
    kind: "chapter theorem",
    title: `Chapter ${chapterNumber} proof spine`,
    family: chapter.part,
    route: `/chapters/${chapterNumber}#proofs`,
    plain: `This card explains why Chapter ${chapterNumber} is not just a list of methods. It turns the chapter promise into a chain of claims: define the object, name the target, show why the update points at that target, then test where the argument breaks.`,
    claim: `If the chapter's state, reward, policy, model, and update objects are named consistently, then its methods are different ways of making this promise operational: ${chapter.claim}`,
    ingredients: compactList([
      ...chapter.keyIdeas.slice(0, 4),
      ...concepts.map((concept) => concept.term),
      ...formulaNames,
      ...algorithms.map((algorithm) => algorithm.name),
    ]).slice(0, 8),
    proofSketch: [
      `Start from the plain loop: ${chapter.easy}`,
      `Translate the loop into the technical objects used by the chapter: ${chapter.technical}`,
      `Use the chapter formulas as invariants or targets: ${formulaNames.length ? formulaNames.join("; ") : "the chapter's definitions and update targets"}.`,
      `Show that the algorithms are not separate facts; they are procedures for moving estimates, policies, or models toward those targets.`,
      `Close the proof by checking the chapter's common confusion: ${chapter.commonConfusions[0] ?? chapter.bridge}`,
    ],
    equationBridge: formulas.length
      ? `The formula bridge for this chapter starts with ${formulas[0].label}: ${formulas[0].easy} Its technical role is: ${formulas[0].technical}`
      : `This chapter is mostly conceptual, so the proof bridge is the modeling chain: boundary → state/action/reward → objective → update target.`,
    stressTest: `The proof spine fails if the reader swaps a definition for a procedure, confuses a sample with an expectation, or ignores this chapter warning: ${chapter.commonConfusions[0] ?? "the assumptions behind the update"}.`,
    takeaway: `A proof in this web book is a transferable explanation: you should be able to say what is being claimed, what objects it uses, what update or identity supports it, and what counterexample would break it.`,
    tags: compactTags(["proof", "chapter spine", chapter.part, `Chapter ${chapterNumber}`, ...chapter.keyIdeas]),
  };
}

function formulaProofCard(formula: FormulaNote, index: number): ProofLabCard {
  const pattern = proofPattern(formula);
  return {
    id: `chapter-${formula.chapter}-proof-${slug(formula.label)}-${index}`,
    chapter: formula.chapter,
    kind: "formula proof",
    title: `${formula.label} proof intuition`,
    family: formula.family,
    route: `/chapters/${formula.chapter}#proofs`,
    plain: `Before treating ${formula.label} as a memorized equation, read it as a claim about the learning loop: ${formula.easy}`,
    claim: pattern.claim,
    ingredients: compactList([...formula.symbols, formula.family, ...pattern.ingredients]),
    proofSketch: pattern.steps,
    equationBridge: `Equation bridge: ${formula.tex}. Read it as: ${formula.technical} Use it when ${formula.useWhen.charAt(0).toLowerCase()}${formula.useWhen.slice(1)}`,
    stressTest: `Stress test: ${formula.watchOut} If that warning is ignored, the proof may still look syntactically correct while proving the wrong object.`,
    takeaway: pattern.takeaway,
    tags: compactTags(["proof", "equation", formula.family, formula.label, ...formula.symbols, `Chapter ${formula.chapter}`]),
  };
}

function proofPattern(formula: FormulaNote) {
  const text = `${formula.label} ${formula.family} ${formula.technical} ${formula.useWhen} ${formula.watchOut}`;
  if (/bellman|dynamics|one-step|return|value|policy evaluation|optimality|expectation/i.test(text)) {
    return {
      claim: `The formula is true because a long-run return can be split into the immediate consequence plus the discounted continuation, then averaged over the policy and environment.` ,
      ingredients: ["condition on the current state", "split first reward from future return", "average over next states", "apply the same value definition recursively"],
      steps: [
        "Freeze the current state or state-action pair so the claim has a subject.",
        "Peel off the first reward; the rest of the score is the same kind of return one step later.",
        "Average over the policy choice if the policy is fixed, or maximize if the claim is an optimality claim.",
        "Average over the world's possible next states and rewards using the model or sampled estimate.",
        "The same value symbol reappears on the continuation, which creates the Bellman-style self-consistency claim.",
      ],
      takeaway: "Bellman-style proofs are bookkeeping proofs: split the future at one step, then require the estimate to agree with its own continuation.",
    };
  }
  if (/sample-average|constant step|mean|monte carlo|return|importance|weighted/i.test(text)) {
    return {
      claim: `The formula is true because an estimate can be rewritten as old estimate plus a step-size times new evidence minus old estimate.`,
      ingredients: ["sample target", "old estimate", "step-size", "error correction", "law of averages"],
      steps: [
        "Name the random quantity being estimated before writing the update.",
        "Write the newest target as evidence and subtract the current estimate to form an error.",
        "Choose a step-size: one-over-count for an exact running average, or a constant value for tracking.",
        "Add only a controlled fraction of the error so many samples can accumulate rather than overwrite each other.",
        "Check whether the evidence is unbiased, weighted, or truncated before claiming convergence to the intended expectation.",
      ],
      takeaway: "Averaging proofs show that the update is not magic; it is a running compromise between old belief and new evidence.",
    };
  }
  if (/td|sarsa|q-learning|eligibility|trace|lambda|n-step|backup/i.test(text)) {
    return {
      claim: `The formula is true as an update rule because the bootstrapped target is treated as a one-step or multi-step guess of the same return the value function is trying to predict.`,
      ingredients: ["bootstrapped target", "TD error", "successor estimate", "step-size", "credit assignment"],
      steps: [
        "Start with the value definition: predict future return from the current state or action.",
        "Replace the unknown full future with a target that uses observed reward plus a successor estimate.",
        "Subtract the old estimate to make a prediction error.",
        "Move the estimate in the sign of that error; traces or n-step returns decide how far backward the credit spreads.",
        "The proof intuition is fixed-point consistency: when targets and estimates agree, the expected update becomes zero.",
      ],
      takeaway: "Bootstrapping proofs are fixed-point proofs: the estimate is correct when its own targets stop pushing it around.",
    };
  }
  if (/gradient|softmax|policy|objective|preference|actor|baseline/i.test(text)) {
    return {
      claim: `The formula is justified by asking whether a small parameter move raises the objective and by estimating that direction from sampled experience.`,
      ingredients: ["objective", "parameter", "score signal", "baseline or advantage", "gradient direction"],
      steps: [
        "Name the scalar objective first; policy-gradient equations are meaningless without the objective being optimized.",
        "Ask how a small parameter change affects action probabilities or value predictions.",
        "Use the chain rule or log-probability trick to attach sampled returns or advantages to the chosen action.",
        "Subtract baselines only when they reduce variance without changing the expected direction.",
        "Update parameters in the direction that should increase the objective, then monitor variance and probability collapse.",
      ],
      takeaway: "Gradient proofs are direction proofs: they justify which way to push parameters, not that one sample is reliable by itself.",
    };
  }
  if (/model|planning|dyna|search|rollout|option|prediction/i.test(text)) {
    return {
      claim: `The formula is justified by replacing real interaction with a model, option, or prediction target while keeping the same Bellman-style accounting of consequences.`,
      ingredients: ["model or option", "imagined transition", "backup target", "consistency check", "real-world validation"],
      steps: [
        "State what object is standing in for real environment experience.",
        "Use the same target construction as direct learning, but feed it model-generated or temporally extended transitions.",
        "Check that imagined samples and real samples name the same state, action, reward, and continuation objects.",
        "Use repeated backups or option summaries only while their abstraction remains faithful enough for the decision being made.",
        "Break the proof deliberately by making the model wrong; this reveals what the formula was assuming.",
      ],
      takeaway: "Planning proofs borrow the same value logic as learning proofs, but add one more question: is the imagined evidence faithful?",
    };
  }
  return {
    claim: `The formula is a precise version of the chapter's technical statement: ${formula.technical}`,
    ingredients: ["definition", "target", "update", "diagnostic", "counterexample"],
    steps: [
      "Translate every symbol into a named object before manipulating the equation.",
      "Ask whether the equation defines a quantity, estimates a quantity, or updates a quantity.",
      "Identify the target and the error term, even if the formula is not written as an update.",
      "Check which expectation, maximum, sample, or approximation is being used.",
      "Use the watch-out as the counterexample that tells you what the proof does not cover.",
    ],
    takeaway: "The useful proof is the one that names the object, target, update pressure, and limitation without hiding behind notation.",
  };
}

function compactList(items: string[]) {
  return Array.from(new Set(items.filter(Boolean).map((item) => item.trim()).filter(Boolean))).slice(0, 10);
}

function compactTags(tags: string[]) {
  return Array.from(new Set(tags.filter(Boolean).map((tag) => tag.trim()).filter(Boolean))).slice(0, 10);
}

function slug(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 72) || "proof";
}

export function proofCardsForFamily(family: string): ProofLabCard[] {
  return allProofLabCards().filter((card) => card.family === family);
}

export function formulaProofCardCount(): number {
  return allProofLabCards().filter((card) => card.kind === "formula proof").length;
}

export function chapterProofSpineCount(): number {
  return allProofLabCards().filter((card) => card.kind === "chapter theorem").length;
}

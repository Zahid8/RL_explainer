import type { AlgorithmDetail } from "@/lib/algorithmCatalog";
import { algorithmProfile } from "@/lib/algorithmProfiles";
import type { Chapter } from "@/lib/paper";

export interface ChapterDependencyLink {
  chapter: number;
  title: string;
  relation: string;
  easy: string;
  technical: string;
}

export interface ChapterConceptGate {
  label: string;
  easy: string;
  technical: string;
  diagnostic: string;
}

export interface ChapterDependencyMap {
  easyMap: string;
  technicalMap: string;
  incoming: ChapterDependencyLink[];
  outgoing: ChapterDependencyLink[];
  gates: ChapterConceptGate[];
  skipRisks: string[];
  reviewLoop: string[];
}

export function chapterDependencyMap(chapter: Chapter, allChapters: Chapter[], algorithms: AlgorithmDetail[]): ChapterDependencyMap {
  const previous = allChapters.filter((candidate) => candidate.n < chapter.n).slice(-3);
  const next = allChapters.filter((candidate) => candidate.n > chapter.n).slice(0, 3);
  const families = Array.from(new Set(algorithms.map((algorithm) => algorithm.family))).slice(0, 6);
  const profiles = algorithms.map((algorithm) => algorithmProfile(algorithm));

  return {
    easyMap: `Use this as the study GPS for Chapter ${chapter.n}. It tells you what earlier ideas you must bring in, what gates you must pass inside this chapter, and what later chapters become easier once this chapter is solid.`,
    technicalMap: `Dependency view: Chapter ${chapter.n} (${chapter.title}) consumes earlier notation/objectives, introduces ${families.join(", ") || "chapter-specific machinery"}, and exports assumptions about ${dominantProfiles(profiles)}. The map below is an implementation-oriented prerequisite checklist rather than a replacement for the PDF.`,
    incoming: previous.map((item) => linkFromPrevious(item, chapter)),
    outgoing: next.map((item) => linkToNext(chapter, item)),
    gates: conceptGates(chapter, algorithms),
    skipRisks: skipRisks(chapter, algorithms),
    reviewLoop: reviewLoop(chapter, algorithms),
  };
}

function dominantProfiles(profiles: ReturnType<typeof algorithmProfile>[]) {
  if (!profiles.length) return "the chapter's definitions and examples";
  const regimes = topCounts(profiles.map((profile) => profile.backupStyle)).slice(0, 2).map(([label]) => label);
  const approximations = topCounts(profiles.map((profile) => profile.approximation)).slice(0, 2).map(([label]) => label);
  return [...regimes, ...approximations].join("; ");
}

function linkFromPrevious(previous: Chapter, current: Chapter): ChapterDependencyLink {
  return {
    chapter: previous.n,
    title: previous.title,
    relation: "Prerequisite",
    easy: `Bring forward the core story from Chapter ${previous.n}: ${previous.claim}`,
    technical: `Before using Chapter ${current.n}, be able to restate Chapter ${previous.n}'s technical handle: ${previous.technical}`,
  };
}

function linkToNext(current: Chapter, next: Chapter): ChapterDependencyLink {
  return {
    chapter: next.n,
    title: next.title,
    relation: "Unlocks",
    easy: `Chapter ${current.n} prepares the intuition needed for Chapter ${next.n}: ${next.claim}`,
    technical: `The bridge exported from the current chapter is '${current.bridge}', which becomes input context for ${next.title}: ${next.technical}`,
  };
}

function conceptGates(chapter: Chapter, algorithms: AlgorithmDetail[]): ChapterConceptGate[] {
  const gates: ChapterConceptGate[] = [
    {
      label: "Objective gate",
      easy: `Say what success means in this chapter without naming an algorithm: ${chapter.claim}`,
      technical: `Identify the return/objective, sampling regime, and policy/model assumptions that make ${chapter.title} well-defined.`,
      diagnostic: "If you cannot say what is being optimized or predicted, stop before reading the update rule.",
    },
    {
      label: "Notation gate",
      easy: "Point to each symbol and say whether it is observed, chosen, estimated, or fixed by the problem designer.",
      technical: chapter.equations.length
        ? `Audit these forms: ${chapter.equations.join(" | ")}. For each one, tag sampled variables, expectations, parameters, and bootstrap terms.`
        : "No formula-heavy gate is required here; instead audit the definitions, examples, and boundary choices that later formulas assume.",
      diagnostic: "A formula is not understood until changing one symbol's meaning would produce a predictable bug.",
    },
    {
      label: "Algorithm gate",
      easy: `Explain why the chapter needs ${algorithms.length} algorithm/procedure card${algorithms.length === 1 ? "" : "s"}, not just one slogan.`,
      technical: algorithms.length
        ? `Compare at least two cards by target, residual, credit assignment, and stability contract: ${algorithms.slice(0, 4).map((algorithm) => algorithm.name).join(", ")}.`
        : "This chapter's algorithmic content is mostly definitional; the gate is to connect definitions to later learning algorithms.",
      diagnostic: "If two cards sound identical, compare their target construction and failure mode until the distinction is operational.",
    },
    {
      label: "Implementation gate",
      easy: "Create a toy case where you can calculate the first update by hand.",
      technical: `The minimum implementation proof is one trace row per update: inputs, target, residual/score, step-size or control knob, updated storage, behavior decision, and terminal/continuing flag when relevant.`,
      diagnostic: "Do not trust aggregate reward curves until the tiny trace matches the chapter's derivation exactly.",
    },
  ];

  if (chapter.n >= 9) {
    gates.push({
      label: "Approximation gate",
      easy: "Check what generalizes from one state/action to another.",
      technical: "For approximate methods, inspect feature activations, weight sharing, projected targets, and whether bootstrapping/off-policy/function approximation are combined.",
      diagnostic: "A stable tabular toy example does not prove the approximate version is stable.",
    });
  }

  if (chapter.n >= 13) {
    gates.push({
      label: "Policy-parameter gate",
      easy: "Separate changing action probabilities from estimating action values.",
      technical: "For policy-gradient, options, psychology, and application chapters, identify whether the learned object is a value estimate, policy parameter, option component, prediction error, or full system pipeline.",
      diagnostic: "If the update changes behavior directly, debug probability normalization and score/advantage signs before value accuracy.",
    });
  }

  return gates;
}

function skipRisks(chapter: Chapter, algorithms: AlgorithmDetail[]) {
  const risks = [
    `You may confuse the chapter's easy story with its technical invariant: ${chapter.technical}`,
    `You may miss the bridge to the next topic: ${chapter.bridge}`,
  ];

  const profileRisks = algorithms.slice(0, 5).map((algorithm) => {
    const profile = algorithmProfile(algorithm);
    return `${algorithm.name}: ${profile.avoidWhen}`;
  });

  return [...risks, ...profileRisks];
}

function reviewLoop(chapter: Chapter, algorithms: AlgorithmDetail[]) {
  return [
    `Reconstruct Chapter ${chapter.n}'s claim from memory, then compare it with the source claim on the page.`,
    "Pick one algorithm card and write target, prediction, residual, credit assignment, and storage object without looking.",
    algorithms.length
      ? `Contrast the first and last algorithm cards: ${algorithms[0].name} versus ${algorithms[algorithms.length - 1].name}.`
      : "Connect the chapter definitions to the next chapter's first update rule.",
    "Run the toy trace/proof obligation from the algorithm card, then deliberately break one assumption and predict the failure.",
    `Finish by answering why the chapter must hand off to the next idea: ${chapter.bridge}`,
  ];
}

function topCounts(values: string[]) {
  const counts = values.reduce<Record<string, number>>((acc, value) => {
    acc[value] = (acc[value] ?? 0) + 1;
    return acc;
  }, {});
  return Object.entries(counts).sort((a, b) => b[1] - a[1]);
}

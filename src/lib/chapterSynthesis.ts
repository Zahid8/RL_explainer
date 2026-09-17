import type { AlgorithmDetail } from "@/lib/algorithmCatalog";
import { algorithmProfile } from "@/lib/algorithmProfiles";
import type { Chapter } from "@/lib/paper";

export interface ChapterDependencyStep {
  label: string;
  easy: string;
  technical: string;
}

export interface ChapterAlgorithmLadderItem {
  id: string;
  name: string;
  family: string;
  startsFrom: string;
  adds: string;
  useWhen: string;
  mainRisk: string;
  implementationTest: string;
}

export interface ChapterComparisonAxis {
  label: string;
  easy: string;
  technical: string;
  members: string[];
}

export interface ChapterSynthesis {
  easyThesis: string;
  technicalThesis: string;
  dependencyStack: ChapterDependencyStep[];
  algorithmLadder: ChapterAlgorithmLadderItem[];
  comparisonAxes: ChapterComparisonAxis[];
  studyProtocol: string[];
  oralExamPrompts: { prompt: string; answer: string }[];
}

export function chapterSynthesis(chapter: Chapter, algorithms: AlgorithmDetail[]): ChapterSynthesis {
  const algorithmNames = algorithms.map((algorithm) => algorithm.name).join(", ") || "the chapter's procedures";
  const keyIdea = chapter.keyIdeas[0] ?? chapter.claim;
  const recurringConfusion = chapter.commonConfusions[0] ?? "mixing the objective, target, and behavior policy";

  return {
    easyThesis: `This chapter is best read as one connected toolchain: ${chapter.easy} The algorithm cards below show how ${algorithmNames} each move one part of that toolchain from intuition to executable update rule.`,
    technicalThesis: `Technically, Chapter ${chapter.n} studies ${chapter.technical} The controlling invariant is: ${keyIdea} Every detailed card should be checked against the same pipeline: variables -> target -> residual -> credit assignment -> behavior change -> stability assumption.`,
    dependencyStack: dependencyStack(chapter, algorithms),
    algorithmLadder: algorithms.map((algorithm, index) => ladderItem(algorithm, index, chapter)),
    comparisonAxes: comparisonAxes(chapter, algorithms),
    studyProtocol: studyProtocol(chapter, algorithms.length),
    oralExamPrompts: oralExamPrompts(chapter, recurringConfusion, algorithms),
  };
}

function dependencyStack(chapter: Chapter, algorithms: AlgorithmDetail[]): ChapterDependencyStep[] {
  const firstAlgorithm = algorithms[0]?.name ?? "the first update rule";
  const lastAlgorithm = algorithms[algorithms.length - 1]?.name ?? "the final procedure";
  return [
    {
      label: "1. Prerequisite mental object",
      easy: `Before the chapter's formulas, say what kind of thing is being learned: ${chapter.claim}`,
      technical: `Prerequisites are the earlier definitions needed by ${chapter.title}: ${chapter.keyIdeas.slice(0, 3).join("; ")}. If any of these are fuzzy, the chapter's update equations become symbol manipulation rather than RL reasoning.`,
    },
    {
      label: "2. New abstraction introduced here",
      easy: `The chapter adds a new lens: ${chapter.easy}`,
      technical: `The new abstraction changes the object being estimated, optimized, represented, or explained. In this chapter that object is operationalized by ${firstAlgorithm} and then refined through the remaining cards.`,
    },
    {
      label: "3. Equations to keep live",
      easy: "Keep the main equations nearby and read each symbol as a piece of the agent-environment loop.",
      technical: chapter.equations.length
        ? `Primary equation handles: ${chapter.equations.join(" | ")}. Track which symbols are sampled data, current estimates, model expectations, or parameters.`
        : "This chapter is more conceptual/procedural than equation-heavy; the technical burden is to preserve the semantics of state, action, reward, policy, and return.",
    },
    {
      label: "4. Algorithm ladder",
      easy: `Read the algorithms in order; each one explains why ${lastAlgorithm} needs the earlier machinery.` ,
      technical: `There are ${algorithms.length} algorithm/procedure cards in this chapter. For each one, identify its estimand, target, residual, credit assignment object, and stability contract before comparing it with the next card.`,
    },
    {
      label: "5. Implementation checkpoint",
      easy: "Do one tiny hand-computed trace before trusting a large experiment.",
      technical: `For Chapter ${chapter.n}, the minimum trace is prediction_before, target, residual, step_size/control knob, prediction_after, behavior policy, and terminal/continuing flag when relevant.`,
    },
    {
      label: "6. Common failure boundary",
      easy: `Watch for this trap first: ${chapter.commonConfusions[0] ?? "forgetting which quantity the update is changing"}`,
      technical: `The bridge to the next chapter is: ${chapter.bridge} Use that bridge as the exit test: if you cannot explain why the next chapter is needed, the current chapter's limitation is not yet clear.`,
    },
  ];
}

function ladderItem(algorithm: AlgorithmDetail, index: number, chapter: Chapter): ChapterAlgorithmLadderItem {
  const profile = algorithmProfile(algorithm);
  const previous = index === 0 ? chapter.keyIdeas[0] ?? chapter.claim : "the previous algorithm card's target and failure mode";
  const text = `${algorithm.name} ${algorithm.family} ${algorithm.coreUpdate} ${algorithm.technical}`.toLowerCase();
  return {
    id: algorithm.id,
    name: algorithm.name,
    family: algorithm.family,
    startsFrom: `Starts from ${previous}; in this card the stored object is governed by: ${profile.role}`,
    adds: `Adds ${profile.backupStyle.toLowerCase()} with ${profile.creditAssignment.toLowerCase()}`,
    useWhen: profile.bestUse,
    mainRisk: profile.avoidWhen,
    implementationTest: implementationTest(text, algorithm),
  };
}

function comparisonAxes(chapter: Chapter, algorithms: AlgorithmDetail[]): ChapterComparisonAxis[] {
  const byFamily = groupBy(algorithms, (algorithm) => algorithm.family);
  const byModel = groupBy(algorithms, (algorithm) => algorithmProfile(algorithm).modelUse);
  const byBackup = groupBy(algorithms, (algorithm) => algorithmProfile(algorithm).backupStyle);
  return [
    {
      label: "Family contrast",
      easy: "Methods in the same family usually share the same kind of learning pressure.",
      technical: summarizeGroups(byFamily, "family"),
      members: Object.keys(byFamily).slice(0, 6),
    },
    {
      label: "Model-free vs model-based pressure",
      easy: "Ask whether the card learns only from experience or also imagines/model-checks outcomes.",
      technical: summarizeGroups(byModel, "model-use regime"),
      members: Object.keys(byModel).slice(0, 6),
    },
    {
      label: "Backup and credit-assignment contrast",
      easy: "The chapter's methods differ mainly in how far a lesson travels backward from reward to decisions.",
      technical: summarizeGroups(byBackup, "backup style"),
      members: Object.keys(byBackup).slice(0, 6),
    },
    {
      label: "Chapter exit criterion",
      easy: "You understand the chapter when you can say why the next chapter is necessary.",
      technical: `Exit bridge for Chapter ${chapter.n}: ${chapter.bridge}`,
      members: chapter.keyIdeas.slice(0, 6),
    },
  ];
}

function studyProtocol(chapter: Chapter, algorithmCount: number) {
  return [
    `Pass 1 - story: explain the chapter claim in plain English: ${chapter.claim}`,
    `Pass 2 - notation: rewrite each equation/form as a sentence and label sampled data versus current estimates.`,
    `Pass 3 - algorithms: for all ${algorithmCount} cards, fill in target, residual, credit assignment, control knob, and failure mode.`,
    "Pass 4 - implementation: run or hand-simulate a two-state/two-action toy case and verify every scalar in the update trace.",
    `Pass 5 - transfer: answer how the chapter bridges forward: ${chapter.bridge}`,
  ];
}

function oralExamPrompts(chapter: Chapter, recurringConfusion: string, algorithms: AlgorithmDetail[]) {
  const first = algorithms[0]?.name ?? "the first algorithm";
  const last = algorithms[algorithms.length - 1]?.name ?? "the final algorithm";
  return [
    {
      prompt: `Explain Chapter ${chapter.n} to a beginner in three sentences without using formulas.`,
      answer: chapter.easy,
    },
    {
      prompt: `Now explain the same chapter technically, naming the quantity being estimated or optimized.`,
      answer: chapter.technical,
    },
    {
      prompt: `Compare ${first} and ${last}: what changed in target, credit assignment, or assumptions?`,
      answer: `Use the ladder cards to compare how ${first} starts the chapter's machinery and how ${last} exposes the later limitation or extension.`,
    },
    {
      prompt: `What is the most likely misunderstanding in this chapter?`,
      answer: recurringConfusion,
    },
  ];
}

function implementationTest(text: string, algorithm: AlgorithmDetail) {
  if (/off-policy|importance|emphatic|tree backup|q\(sigma\)/.test(text)) return "Trace behavior probability, target probability, ratio/emphasis, target, residual, and update magnitude on the same row.";
  if (/policy-gradient|reinforce|actor|critic|softmax|gaussian/.test(text)) return "Check probability normalization, log-prob gradient sign, baseline/advantage value, and actor step norm after one sampled trajectory.";
  if (/planning|dyna|model|search|mcts|rollout/.test(text)) return "Separate real-transition rows from simulated/search rows and compare model-predicted rewards against real rewards.";
  if (/trace|lambda|n-step|eligibility/.test(text)) return "Run an episode-boundary test that proves buffers/traces reset or truncate exactly where the algorithm says they should.";
  if (/function|linear|tile|semi-gradient|least-squares|dqn|deep/.test(text)) return "Log feature activations, target scale, weight norm, and gradient norm on a deterministic toy problem before scaling.";
  if (/bandit|ucb|sample-average|optimistic|gradient bandit/.test(text)) return "Use a deterministic reward arm and confirm estimates/counts/preferences move monotonically according to the hand calculation.";
  if (/dynamic programming|policy iteration|value iteration/.test(text)) return "Verify every transition probability row sums to one and Bellman residual decreases on a tiny known MDP.";
  if (/monte carlo/.test(text)) return "Construct one short episode by hand and verify return indexing, first/every-visit choice, and terminal handling.";
  return `Create a one-card trace for ${algorithm.name}: inputs, target, residual or decision score, stored-state change, and expected failure mode.`;
}

function groupBy<T>(items: T[], keyFn: (item: T) => string) {
  return items.reduce<Record<string, T[]>>((groups, item) => {
    const key = keyFn(item);
    groups[key] = groups[key] ?? [];
    groups[key].push(item);
    return groups;
  }, {});
}

function summarizeGroups(groups: Record<string, AlgorithmDetail[]>, label: string) {
  const entries = Object.entries(groups)
    .sort((a, b) => b[1].length - a[1].length)
    .slice(0, 4)
    .map(([name, members]) => `${name} (${members.length}: ${members.map((member) => member.name).join(", ")})`);
  return entries.length ? `Dominant ${label} groups: ${entries.join("; ")}.` : `No ${label} grouping is available for this chapter.`;
}

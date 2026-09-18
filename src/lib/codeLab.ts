import { algorithmCatalog, algorithmsForChapter, type AlgorithmDetail } from "@/lib/algorithmCatalog";

export const codeLabModes = ["plain", "code", "invariants", "test", "debug"] as const;

export type CodeLabMode = (typeof codeLabModes)[number];

export interface CodeLabCard {
  id: string;
  chapter: number;
  algorithmId: string;
  title: string;
  family: string;
  route: string;
  plain: string;
  implementationGoal: string;
  codeLines: string[];
  invariants: string[];
  testPlan: string[];
  debugChecklist: string[];
  tags: string[];
}

let cachedCards: CodeLabCard[] | undefined;

export function allCodeLabCards(): CodeLabCard[] {
  cachedCards ??= algorithmCatalog.map(codeLabCardForAlgorithm);
  return cachedCards;
}

export function codeLabCardsForChapter(chapter: number): CodeLabCard[] {
  return allCodeLabCards().filter((card) => card.chapter === chapter);
}

export function codeLabCardCount(chapter?: number): number {
  return typeof chapter === "number" ? codeLabCardsForChapter(chapter).length : allCodeLabCards().length;
}

export function codeLabModeCount(chapter?: number): number {
  return codeLabCardCount(chapter) * codeLabModes.length;
}

export function codeLabChapterCount(): number {
  return new Set(allCodeLabCards().map((card) => card.chapter)).size;
}

function codeLabCardForAlgorithm(algorithm: AlgorithmDetail): CodeLabCard {
  const codeLines = pythonLikeSkeleton(algorithm);
  const setup = setupPhrase(algorithm);
  const target = targetPhrase(algorithm);
  const update = updatePhrase(algorithm);
  return {
    id: `${algorithm.id}-code-lab`,
    chapter: algorithm.chapter,
    algorithmId: algorithm.id,
    title: `${algorithm.name} implementation lab`,
    family: algorithm.family,
    route: `/chapters/${algorithm.chapter}#${algorithm.id}`,
    plain: `${algorithm.plain} In code, the job is to make the inputs, stored estimates, target calculation, and update line visible instead of hiding them inside a name.`,
    implementationGoal: `${algorithm.objective} The implementation scaffold below treats the method as ${setup}, then computes ${target}, applies ${update}, and checks the state after each pass.`,
    codeLines,
    invariants: compactList([
      `Name the state carried between updates: ${statePhrase(algorithm)}.`,
      `Keep the core update recognizable: ${algorithm.coreUpdate}.`,
      `Every loop should identify what is sampled data, what is an estimate, and what is a control knob.`,
      ...algorithm.implementationNotes.slice(0, 3),
      algorithm.equations[0] ? `Equation checkpoint: the code should still read as ${algorithm.equations[0]}.` : "If there is no equation, the code invariant is the modeling boundary and data contract.",
    ]),
    testPlan: compactList([
      `Build a tiny deterministic fixture for ${algorithm.name}: one or two states/actions, one reward pattern, and fixed random choices.`,
      `Run exactly one update and print the old estimate, target, error, and new estimate so the arithmetic can be checked by hand.`,
      `Run a short repeated case and confirm the estimate moves in the direction predicted by the plain explanation.`,
      `Change one knob such as step-size, exploration, model trust, or horizon and verify only the expected part of behavior changes.`,
      `Compare against a deliberately frozen-update version; the frozen version should fail to improve or adapt.`,
    ]),
    debugChecklist: compactList([
      ...algorithm.failureModes.slice(0, 4),
      "If learning looks impossible, first log the reward, target, prediction, error, and chosen action before changing the algorithm.",
      "If learning looks too good, check for target leakage, using future information, or evaluating on the same samples used to tune behavior.",
      "If results are unstable, reduce the step-size/exploration pressure or isolate bootstrapping, off-policy data, and approximation as separate suspects.",
    ]),
    tags: compactTags([algorithm.family, algorithm.bookAnchor, ...algorithm.related, `Chapter ${algorithm.chapter}`, "implementation", "code lab"]),
  };
}

function pythonLikeSkeleton(algorithm: AlgorithmDetail): string[] {
  const fn = slugFunction(algorithm.name);
  const pseudocode = algorithm.pseudocode.length ? algorithm.pseudocode : algorithm.steps;
  const comments = pseudocode.slice(0, 7).map((line) => `    # ${line}`);
  return [
    `def ${fn}(experience, config):`,
    `    """Minimal teaching scaffold for ${escapeDoc(algorithm.name)}."""`,
    "    state = initialize_estimates(config)",
    "    trace = []",
    ...comments,
    "    for transition in experience:",
    "        observation = read_transition(transition)",
    "        prediction = estimate_current_value(state, observation)",
    `        target = compute_target(state, observation, rule=${JSON.stringify(algorithm.coreUpdate.slice(0, 80))})`,
    "        error = target - prediction",
    "        state = apply_update(state, observation, error, config.step_size)",
    "        trace.append({\"target\": target, \"error\": error})",
    "        assert_no_nan_or_illegal_probability(state)",
    "    return state, trace",
  ];
}

function setupPhrase(algorithm: AlgorithmDetail) {
  const text = haystack(algorithm);
  if (/model|planning|dyna|search|tree|rollout/i.test(text)) return "a loop over real or imagined transitions";
  if (/policy gradient|actor|preference|softmax|parameter/i.test(text)) return "a parameterized policy loop";
  if (/bandit|action-value|Q\(|Q-|sarsa|control/i.test(text)) return "an action-value update loop";
  if (/feature|approx|weight|gradient/i.test(text)) return "a feature-and-weight update loop";
  if (/episode|monte carlo|return/i.test(text)) return "an episode-return processing loop";
  return "a sequence of observed transitions and stored estimates";
}

function targetPhrase(algorithm: AlgorithmDetail) {
  const text = haystack(algorithm);
  if (/max|optimal|q-learning|greedy/i.test(text)) return "a greedy or optimality target";
  if (/policy|sarsa|on-policy/i.test(text)) return "a target under the current policy";
  if (/importance|off-policy/i.test(text)) return "a corrected target for behavior/target mismatch";
  if (/model|planning|expected/i.test(text)) return "an expected or simulated target";
  if (/return|monte carlo/i.test(text)) return "a sampled return target";
  return "the target named by the algorithm card";
}

function updatePhrase(algorithm: AlgorithmDetail) {
  const text = haystack(algorithm);
  if (/gradient|semi-gradient|policy gradient/i.test(text)) return "a gradient step";
  if (/average|sample-average/i.test(text)) return "an incremental average correction";
  if (/trace|lambda|eligibility/i.test(text)) return "a trace-weighted correction";
  if (/planning|backup|bellman|dynamic programming/i.test(text)) return "a backup assignment";
  return "an error-correction update";
}

function statePhrase(algorithm: AlgorithmDetail) {
  const text = haystack(algorithm);
  if (/model|planning|dyna|search/i.test(text)) return "model tables, planning queue/search tree, and value/action-value estimates";
  if (/policy gradient|actor|preference|softmax/i.test(text)) return "policy parameters, baseline/critic estimates, and sampled returns";
  if (/feature|approx|weight/i.test(text)) return "feature vectors, weight parameters, and prediction traces";
  if (/bandit/i.test(text)) return "action counts, action-value estimates, and exploration settings";
  if (/monte carlo|episode/i.test(text)) return "episode buffers, returns, and visit/update counters";
  return "estimates, counters, policy/model knobs, and diagnostic trace rows";
}

function haystack(algorithm: AlgorithmDetail) {
  return [algorithm.name, algorithm.family, algorithm.plain, algorithm.technical, algorithm.objective, algorithm.coreUpdate, ...algorithm.related].join(" ");
}

function compactList(items: string[]) {
  return Array.from(new Set(items.filter(Boolean).map((item) => item.trim()).filter(Boolean))).slice(0, 8);
}

function compactTags(tags: string[]) {
  return Array.from(new Set(tags.filter(Boolean).map((tag) => tag.trim()).filter(Boolean))).slice(0, 10);
}

function slugFunction(input: string) {
  const stem = input.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "").slice(0, 48) || "rl_algorithm";
  return stem.match(/^[a-z_]/) ? stem : `rl_${stem}`;
}

function escapeDoc(input: string) {
  return input.replace(/"""/g, "'''");
}

export function codeLabCardsForAlgorithmFamily(family: string): CodeLabCard[] {
  return allCodeLabCards().filter((card) => card.family === family);
}

export function algorithmsWithCodeLabForChapter(chapter: number): AlgorithmDetail[] {
  const ids = new Set(codeLabCardsForChapter(chapter).map((card) => card.algorithmId));
  return algorithmsForChapter(chapter).filter((algorithm) => ids.has(algorithm.id));
}

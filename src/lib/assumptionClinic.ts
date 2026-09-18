import { algorithmCatalog, algorithmsForChapter, type AlgorithmDetail } from "@/lib/algorithmCatalog";

export const assumptionClinicModes = ["plain", "assumption", "guarantee", "failure", "repair"] as const;

export type AssumptionClinicMode = (typeof assumptionClinicModes)[number];

export interface AssumptionClinicCard {
  id: string;
  chapter: number;
  algorithmId: string;
  title: string;
  family: string;
  route: string;
  plain: string;
  assumptions: string[];
  guarantee: string;
  failure: string;
  repair: string[];
  diagnostic: string;
  tags: string[];
}

let cachedCards: AssumptionClinicCard[] | undefined;

export function allAssumptionClinicCards(): AssumptionClinicCard[] {
  cachedCards ??= algorithmCatalog.map(assumptionCardForAlgorithm);
  return cachedCards;
}

export function assumptionCardsForChapter(chapter: number): AssumptionClinicCard[] {
  return allAssumptionClinicCards().filter((card) => card.chapter === chapter);
}

export function assumptionCardCount(chapter?: number): number {
  return typeof chapter === "number" ? assumptionCardsForChapter(chapter).length : allAssumptionClinicCards().length;
}

export function assumptionModeCount(chapter?: number): number {
  return assumptionCardCount(chapter) * assumptionClinicModes.length;
}

export function assumptionChapterCount(): number {
  return new Set(allAssumptionClinicCards().map((card) => card.chapter)).size;
}

function assumptionCardForAlgorithm(algorithm: AlgorithmDetail): AssumptionClinicCard {
  const text = haystack(algorithm);
  const assumptions = compactList([
    dataAssumption(text, algorithm),
    targetAssumption(text, algorithm),
    updateAssumption(text, algorithm),
    representationAssumption(text, algorithm),
    evaluationAssumption(text, algorithm),
  ]);
  return {
    id: `${algorithm.id}-assumption-clinic`,
    chapter: algorithm.chapter,
    algorithmId: algorithm.id,
    title: `${algorithm.name} assumptions and guarantee`,
    family: algorithm.family,
    route: `/chapters/${algorithm.chapter}#${algorithm.id}`,
    plain: `${algorithm.name} is not magic; it works only when its data story, target story, update story, and checking story fit together. This card says what has to be true before the update deserves trust.`,
    assumptions,
    guarantee: guaranteePhrase(text, algorithm),
    failure: failurePhrase(text, algorithm),
    repair: compactList([
      repairData(text),
      repairTarget(text),
      repairUpdate(text),
      repairRepresentation(text),
      `Return to the core update and verify the code still matches: ${algorithm.coreUpdate}.`,
    ]),
    diagnostic: diagnosticPhrase(text, algorithm),
    tags: compactTags([algorithm.family, algorithm.bookAnchor, ...algorithm.related, `Chapter ${algorithm.chapter}`, "assumptions", "guarantee", "diagnostics"]),
  };
}

function dataAssumption(text: string, algorithm: AlgorithmDetail) {
  if (/off-policy|importance|behavior|target policy/i.test(text)) return "The behavior policy must visit every action the target policy may need, and the correction weights must describe the behavior/target mismatch.";
  if (/monte carlo|episode|return/i.test(text)) return "Episodes or sampled returns must represent the task distribution the estimate is meant to describe.";
  if (/planning|model|dyna|search|rollout/i.test(text)) return "Real or simulated transitions must be close enough to the environment that planning backups do not optimize a false world.";
  if (/bandit/i.test(text)) return "Action samples must be tied to the same reward-generating problem unless the method explicitly tracks nonstationarity.";
  return `The experience stream must contain the states, actions, rewards, and next observations that ${algorithm.name} claims to update.`;
}

function targetAssumption(text: string, algorithm: AlgorithmDetail) {
  if (/max|q-learning|optimal|greedy/i.test(text)) return "The greedy target is meaningful only when the max action is taken over comparable action-value estimates.";
  if (/sarsa|on-policy|policy/i.test(text)) return "The target must match the policy whose value or improvement step the method is trying to learn.";
  if (/expected|dynamic programming|bellman/i.test(text)) return "Expected backups require the transition/reward expectations to be known, estimated, or intentionally approximated.";
  if (/gradient|semi-gradient|policy gradient/i.test(text)) return "The objective or surrogate gradient must point at the quantity the chapter says is being improved.";
  return `The target has to match the objective: ${algorithm.objective}`;
}

function updateAssumption(text: string, algorithm: AlgorithmDetail) {
  if (/step-size|alpha|incremental|gradient|semi-gradient/i.test(text)) return "Step-sizes must be small enough to learn rather than overwrite, yet large enough to move on the observed error.";
  if (/trace|lambda|eligibility/i.test(text)) return "Eligibility traces must decay and reset according to the credit-assignment horizon being claimed.";
  if (/average|sample-average/i.test(text)) return "Averaging updates assume the count or weighting scheme matches the intended estimator.";
  return `The update line must preserve the sign and subject of the core correction: ${algorithm.coreUpdate}`;
}

function representationAssumption(text: string, algorithm: AlgorithmDetail) {
  if (/feature|approx|weight|neural|linear|function approximation/i.test(text)) return "The representation must be expressive enough to carry the value, policy, or model distinction the update is trying to learn.";
  if (/state aggregation|state representation|state/i.test(text)) return "States must keep the information needed for future rewards; hiding relevant information turns the update into a biased summary.";
  if (/model|planning|search/i.test(text)) return "Stored model state must separate what has actually been observed from what is being imagined.";
  return "The stored estimates, counters, policy variables, and traces must name the same objects used by the formula and pseudocode.";
}

function evaluationAssumption(text: string, algorithm: AlgorithmDetail) {
  if (/control|policy improvement|greedy|actor/i.test(text)) return "Evaluation must be separated from improvement enough that a changing policy is not mistaken for a stable value estimate.";
  if (/off-policy|importance/i.test(text)) return "Diagnostics must inspect both raw returns and corrected returns, because high-variance weights can hide failure.";
  return `A hand-check should be able to replay one tiny update for ${algorithm.name}: old estimate, target, error, new estimate, and changed policy/model state.`;
}

function guaranteePhrase(text: string, algorithm: AlgorithmDetail) {
  if (/dynamic programming|bellman|expected/i.test(text)) return "If the model and expectations are right, repeated backups move estimates toward the Bellman-consistent solution for the policy or optimality target being used.";
  if (/monte carlo/i.test(text)) return "If returns are sampled from the right episodes and averaged correctly, the estimate moves toward the expected return for the visited state/action condition.";
  if (/temporal-difference|td|sarsa|q-learning|trace|lambda/i.test(text)) return "If bootstrapping targets are aligned with the policy/optimality claim and step-sizes are controlled, prediction errors push estimates toward a self-consistent value function.";
  if (/gradient|policy gradient|actor|preference/i.test(text)) return "If the gradient estimator matches the objective and variance is controlled, repeated steps move parameters toward behavior with higher expected return.";
  if (/planning|model|search|rollout/i.test(text)) return "If the model/search budget is faithful enough, extra simulated backups improve decision quality before or between real interactions.";
  return `If its assumptions hold, ${algorithm.name} makes the objective operational: ${algorithm.objective}`;
}

function failurePhrase(text: string, algorithm: AlgorithmDetail) {
  const listed = algorithm.failureModes[0];
  if (/off-policy|importance/i.test(text)) return `${listed ?? "The common failure"} becomes severe when behavior coverage is weak or correction weights explode; then the target policy is being evaluated from evidence it barely collected.`;
  if (/model|planning|search/i.test(text)) return `${listed ?? "The common failure"} often means the planner improved against a wrong model rather than the real task.`;
  if (/approx|feature|neural|gradient/i.test(text)) return `${listed ?? "The common failure"} usually means representation, bootstrapping, and step-size pressure are interacting rather than failing independently.`;
  return `${listed ?? "The common failure"} is a sign that the data, target, update, or evaluation assumption should be inspected before tuning more knobs.`;
}

function diagnosticPhrase(text: string, algorithm: AlgorithmDetail) {
  if (/bandit|action-value|q\(|q-learning|sarsa/i.test(text)) return "Log action counts, selected action, reward, old value, target, TD/error term, and new value for one tiny problem.";
  if (/policy gradient|actor|preference|softmax/i.test(text)) return "Log action probabilities before/after the update, sampled return or advantage, baseline, gradient sign, and entropy/exploration pressure.";
  if (/planning|model|search/i.test(text)) return "Compare one real transition, one stored model transition, and one planned backup; the three should tell a consistent story.";
  if (/feature|approx|weight/i.test(text)) return "Print features, weights, prediction, target, error, gradient direction, and norm change for one update.";
  return `Replay one update from ${algorithm.name} and make every number explain which assumption it is checking.`;
}

function repairData(text: string) {
  if (/off-policy|importance/i.test(text)) return "Increase behavior-policy coverage, clip or normalize extreme ratios for diagnosis, and separately report where coverage is missing.";
  if (/model|planning|search/i.test(text)) return "Validate model transitions against fresh real samples before trusting more planning depth.";
  return "Shrink the test world until every transition and reward can be written on one board.";
}

function repairTarget(text: string) {
  if (/max|optimal|greedy/i.test(text)) return "Check whether the greedy/max target is being used intentionally rather than accidentally replacing an on-policy target.";
  if (/policy gradient|actor/i.test(text)) return "Check the sign of the objective and make sure the advantage/return is attached to the action that was actually sampled.";
  return "Name the policy, value, model, or return that the target is estimating before changing hyperparameters.";
}

function repairUpdate(text: string) {
  if (/trace|lambda/i.test(text)) return "Reset and decay traces explicitly, then compare one-step, n-step, and trace returns on the same toy episode.";
  if (/step-size|gradient|semi-gradient|approx/i.test(text)) return "Lower the step-size and log update norms before blaming the concept.";
  return "Freeze all but one update line and verify the estimate moves in the predicted direction.";
}

function repairRepresentation(text: string) {
  if (/feature|approx|weight|neural/i.test(text)) return "Start with a tabular or one-hot version, then add features back until the failure reappears.";
  if (/state|representation/i.test(text)) return "Add back the missing state information or mark the problem as partially observed instead of pretending it is Markov.";
  return "Separate estimates, policy knobs, model state, and diagnostics into named fields so hidden coupling is visible.";
}

function haystack(algorithm: AlgorithmDetail) {
  return [algorithm.name, algorithm.family, algorithm.plain, algorithm.technical, algorithm.objective, algorithm.coreUpdate, ...algorithm.steps, ...algorithm.failureModes, ...algorithm.related].join(" ");
}

function compactList(items: string[]) {
  return Array.from(new Set(items.filter(Boolean).map((item) => item.trim()).filter(Boolean))).slice(0, 8);
}

function compactTags(tags: string[]) {
  return Array.from(new Set(tags.filter(Boolean).map((tag) => tag.trim()).filter(Boolean))).slice(0, 10);
}

export function assumptionsForAlgorithmFamily(family: string): AssumptionClinicCard[] {
  return allAssumptionClinicCards().filter((card) => card.family === family);
}

export function algorithmsWithAssumptionClinicForChapter(chapter: number): AlgorithmDetail[] {
  const ids = new Set(assumptionCardsForChapter(chapter).map((card) => card.algorithmId));
  return algorithmsForChapter(chapter).filter((algorithm) => ids.has(algorithm.id));
}

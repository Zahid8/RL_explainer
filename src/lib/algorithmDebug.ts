import { algorithmCatalog, algorithmsForChapter, type AlgorithmDetail } from "@/lib/algorithmCatalog";
import { allAssumptionClinicCards, type AssumptionClinicCard } from "@/lib/assumptionClinic";
import { allCodeLabCards, type CodeLabCard } from "@/lib/codeLab";

export const algorithmDebugModes = ["symptom", "diagnose", "repair", "test", "transfer"] as const;

export type AlgorithmDebugMode = (typeof algorithmDebugModes)[number];

export interface AlgorithmDebugCard {
  id: string;
  chapter: number;
  algorithmId: string;
  title: string;
  family: string;
  route: string;
  plainSymptom: string;
  diagnosis: string[];
  technicalFrame: string;
  repairPlan: string[];
  testFixture: string[];
  transfer: string;
  tags: string[];
}

let cachedCards: AlgorithmDebugCard[] | undefined;
let cachedCodeMap: Map<string, CodeLabCard> | undefined;
let cachedAssumptionMap: Map<string, AssumptionClinicCard> | undefined;

export function allAlgorithmDebugCards(): AlgorithmDebugCard[] {
  cachedCards ??= algorithmCatalog.map(debugCardForAlgorithm);
  return cachedCards;
}

export function algorithmDebugCardsForChapter(chapter: number): AlgorithmDebugCard[] {
  return allAlgorithmDebugCards().filter((card) => card.chapter === chapter);
}

export function algorithmDebugCardCount(chapter?: number): number {
  return typeof chapter === "number" ? algorithmDebugCardsForChapter(chapter).length : allAlgorithmDebugCards().length;
}

export function algorithmDebugModeCount(chapter?: number): number {
  return algorithmDebugCardCount(chapter) * algorithmDebugModes.length;
}

export function algorithmDebugChapterCount(): number {
  return new Set(allAlgorithmDebugCards().map((card) => card.chapter)).size;
}

export function algorithmDebugRepairStepCount(chapter?: number): number {
  const cards = typeof chapter === "number" ? algorithmDebugCardsForChapter(chapter) : allAlgorithmDebugCards();
  return cards.reduce((sum, card) => sum + card.repairPlan.length, 0);
}

export function algorithmDebugTestStepCount(chapter?: number): number {
  const cards = typeof chapter === "number" ? algorithmDebugCardsForChapter(chapter) : allAlgorithmDebugCards();
  return cards.reduce((sum, card) => sum + card.testFixture.length, 0);
}

export function algorithmsWithDebugClinicForChapter(chapter: number): AlgorithmDetail[] {
  const ids = new Set(algorithmDebugCardsForChapter(chapter).map((card) => card.algorithmId));
  return algorithmsForChapter(chapter).filter((algorithm) => ids.has(algorithm.id));
}

function debugCardForAlgorithm(algorithm: AlgorithmDetail): AlgorithmDebugCard {
  const codeCard = codeCardForAlgorithm(algorithm.id);
  const assumptionCard = assumptionCardForAlgorithm(algorithm.id);
  const text = haystack(algorithm);
  const firstFailure = algorithm.failureModes[0] ?? "the update appears to work on paper but fails when the data, target, or implementation is replayed";
  return {
    id: `${algorithm.id}-debug-clinic`,
    chapter: algorithm.chapter,
    algorithmId: algorithm.id,
    title: `${algorithm.name} debugging clinic`,
    family: algorithm.family,
    route: `/chapters/${algorithm.chapter}#debug`,
    plainSymptom: `Symptom story: ${firstFailure}. Before tuning ${algorithm.name}, freeze the run and write down what the learner saw, what target was computed, what changed, and what evidence would convince you that the fix worked.`,
    diagnosis: compactList([
      `Name the failure before touching parameters: ${firstFailure}.`,
      assumptionCard ? `Check the validity contract first: ${assumptionCard.diagnostic}` : diagnosticFor(text, algorithm),
      codeCard ? `Replay the implementation trace: ${codeCard.debugChecklist[0]}` : `Replay one update and print old estimate, target, error, new estimate, and policy/model state.`,
      `Ask whether the core update is still recognizable: ${algorithm.coreUpdate}.`,
      familyDiagnostic(text, algorithm),
      `Separate data coverage, target construction, update magnitude, representation, and evaluation into different suspects.`
    ]),
    technicalFrame: `Technical diagnosis: treat ${algorithm.name} as an experiment with observables. The objective is ${algorithm.objective}. A real debug pass must identify the sampled data distribution, the target or residual being formed, the update subject, the control knob being changed, and the invariant that should remain true after one step. If those objects cannot be named, the algorithm is not yet debuggable.`,
    repairPlan: compactList([
      assumptionCard?.repair[0] ?? repairData(text),
      assumptionCard?.repair[1] ?? repairTarget(text),
      assumptionCard?.repair[2] ?? repairUpdate(text),
      codeCard?.invariants[0] ?? `Preserve the update identity: ${algorithm.coreUpdate}.`,
      `Change exactly one suspect, rerun the tiny fixture, and keep the old/new target, error, action, and estimate log beside the result.`,
      repairRepresentation(text),
    ]),
    testFixture: compactList([
      codeCard?.testPlan[0] ?? `Build a tiny deterministic fixture for ${algorithm.name}: one or two states/actions, one reward pattern, and fixed choices.`,
      codeCard?.testPlan[1] ?? `Run one update and check old estimate, target, error, and new estimate by hand.`,
      `Force the suspected failure case and verify that the diagnostic actually becomes bad before the repair is applied.`,
      `Apply the repair and require the failing diagnostic to improve without hiding the original objective: ${algorithm.objective}.`,
      `Run a transfer fixture with a changed reward, horizon, behavior policy, model, or representation and confirm the same debug rule still catches the first break.`,
    ]),
    transfer: `Transfer rule: when ${algorithm.name} moves to a new task, do not ask whether the old hyperparameters still work. Ask which part of the data-target-update-representation chain changed, then rebuild the smallest fixture that would expose that change before running a large experiment.`,
    tags: compactTags([algorithm.family, algorithm.bookAnchor, ...algorithm.related, `Chapter ${algorithm.chapter}`, "debugging", "diagnostics", "repair", "algorithm clinic"]),
  };
}

function codeCardForAlgorithm(id: string): CodeLabCard | undefined {
  cachedCodeMap ??= new Map(allCodeLabCards().map((card) => [card.algorithmId, card]));
  return cachedCodeMap.get(id);
}

function assumptionCardForAlgorithm(id: string): AssumptionClinicCard | undefined {
  cachedAssumptionMap ??= new Map(allAssumptionClinicCards().map((card) => [card.algorithmId, card]));
  return cachedAssumptionMap.get(id);
}

function familyDiagnostic(text: string, algorithm: AlgorithmDetail) {
  if (/off-policy|importance|behavior/i.test(text)) return "Off-policy debug check: log behavior probability, target probability, correction weight, raw return, corrected return, and where coverage is missing.";
  if (/planning|model|dyna|search|rollout/i.test(text)) return "Planning debug check: compare a real transition, stored model transition, imagined backup, and final policy change before increasing search depth.";
  if (/gradient|policy gradient|actor|preference|parameter/i.test(text)) return "Gradient debug check: log action probability, return or advantage, baseline, gradient sign, update norm, and entropy before blaming randomness.";
  if (/feature|approx|weight|neural|linear/i.test(text)) return "Approximation debug check: print features, prediction, target, error, gradient direction, and weight norm on a one-feature fixture.";
  if (/trace|lambda|n-step/i.test(text)) return "Credit-assignment debug check: compare one-step, n-step, and trace returns on the same tiny episode and inspect trace decay/reset.";
  if (/bandit|action-value|q\(|sarsa|q-learning|control/i.test(text)) return "Control debug check: log action counts, selected action, reward, target, value before/after, and whether exploration explains the sample.";
  return `Generic debug check: replay ${algorithm.name} with one observation and verify data, target, error, update, and diagnostic columns by hand.`;
}

function diagnosticFor(text: string, algorithm: AlgorithmDetail) {
  if (/model|planning|search/i.test(text)) return "Check whether the planner is improving a false model instead of the real task.";
  if (/off-policy|importance/i.test(text)) return "Check behavior coverage and extreme correction weights before judging the target policy estimate.";
  if (/gradient|actor|preference/i.test(text)) return "Check gradient sign, baseline subtraction, and whether the sampled action receives the sampled advantage.";
  if (/feature|approx|weight/i.test(text)) return "Check whether representation and step-size create the failure together rather than independently.";
  return `Replay one ${algorithm.name} update and make every number explain which assumption it is checking.`;
}

function repairData(text: string) {
  if (/off-policy|importance/i.test(text)) return "Repair data first: increase behavior coverage and report missing support before changing the target algorithm.";
  if (/model|planning|search/i.test(text)) return "Repair data first: validate model transitions against fresh real samples before trusting deeper planning.";
  return "Repair data first: shrink the world until every transition and reward fits on one board.";
}

function repairTarget(text: string) {
  if (/max|optimal|greedy|q-learning/i.test(text)) return "Repair the target: verify that the greedy/max target is intentional and is not replacing an on-policy target by accident.";
  if (/policy gradient|actor|preference/i.test(text)) return "Repair the target: attach the return or advantage to the action actually sampled and verify the ascent/descent sign.";
  return "Repair the target: name the value, policy, model, return, or objective being estimated before changing hyperparameters.";
}

function repairUpdate(text: string) {
  if (/trace|lambda|n-step/i.test(text)) return "Repair the update: reset and decay traces explicitly, then compare one-step, n-step, and trace returns on the same toy episode.";
  if (/step-size|gradient|semi-gradient|approx|weight/i.test(text)) return "Repair the update: lower the step-size and log update norms before blaming the idea.";
  return "Repair the update: freeze all but one update line and verify the estimate moves in the predicted direction.";
}

function repairRepresentation(text: string) {
  if (/feature|approx|weight|neural/i.test(text)) return "Repair the representation: start tabular or one-hot, then add features back until the failure reappears.";
  if (/state|representation/i.test(text)) return "Repair the representation: add missing state information or label the problem as partially observed instead of pretending it is Markov.";
  return "Repair the representation: separate estimates, policy knobs, model state, and diagnostics into named fields so hidden coupling is visible.";
}

function haystack(algorithm: AlgorithmDetail) {
  return [algorithm.name, algorithm.family, algorithm.plain, algorithm.technical, algorithm.objective, algorithm.coreUpdate, ...algorithm.steps, ...algorithm.implementationNotes, ...algorithm.failureModes, ...algorithm.related].join(" ");
}

function compactList(items: (string | undefined)[]): string[] {
  return Array.from(new Set(items.filter(Boolean).map((item) => item!.trim()).filter(Boolean))).slice(0, 6);
}

function compactTags(tags: string[]) {
  return Array.from(new Set(tags.filter(Boolean).map((tag) => tag.trim()).filter(Boolean))).slice(0, 10);
}

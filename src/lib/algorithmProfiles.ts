import type { AlgorithmDetail } from "@/lib/algorithmCatalog";

export interface AlgorithmProfile {
  role: string;
  dataRegime: string;
  targetPolicy: string;
  modelUse: string;
  backupStyle: string;
  approximation: string;
  creditAssignment: string;
  objectiveView: string;
  convergenceHandle: string;
  computeMemory: string;
  bestUse: string;
  avoidWhen: string;
}

export function algorithmProfile(algorithm: AlgorithmDetail): AlgorithmProfile {
  const text =
    `${algorithm.name} ${algorithm.family} ${algorithm.bookAnchor} ${algorithm.coreUpdate} ${algorithm.technical} ${algorithm.related.join(" ")}`.toLowerCase();
  const chapter = algorithm.chapter;

  return {
    role: inferRole(text, chapter),
    dataRegime: inferDataRegime(text, chapter),
    targetPolicy: inferTargetPolicy(text, chapter),
    modelUse: inferModelUse(text, chapter),
    backupStyle: inferBackupStyle(text, chapter),
    approximation: inferApproximation(text, chapter),
    creditAssignment: inferCreditAssignment(text, chapter),
    objectiveView: inferObjectiveView(text, chapter),
    convergenceHandle: inferConvergenceHandle(text, chapter),
    computeMemory: inferComputeMemory(text, chapter),
    bestUse: inferBestUse(text, chapter),
    avoidWhen: inferAvoidWhen(text, chapter),
  };
}

export function profileRows(profile: AlgorithmProfile) {
  return [
    ["Role", profile.role],
    ["Data regime", profile.dataRegime],
    ["Policy relation", profile.targetPolicy],
    ["Model use", profile.modelUse],
    ["Backup style", profile.backupStyle],
    ["Approximation", profile.approximation],
    ["Credit assignment", profile.creditAssignment],
    ["Objective view", profile.objectiveView],
    ["Convergence handle", profile.convergenceHandle],
    ["Compute / memory", profile.computeMemory],
    ["Best use", profile.bestUse],
    ["Avoid when", profile.avoidWhen],
  ] as const;
}

function inferRole(text: string, chapter: number) {
  if (/bandit|ucb|optimistic|sample-average|gradient bandit/.test(text))
    return "Action selection and value estimation in a single-state decision problem.";
  if (
    /policy evaluation|prediction|td\(0\)|monte carlo prediction|value function/.test(
      text,
    ) &&
    !/control|sarsa|q-learning|actor/.test(text)
  )
    return "Prediction / policy evaluation: estimate the value of a fixed question or policy.";
  if (
    /control|sarsa|q-learning|actor|policy-gradient|reinforce|option value|value iteration|policy iteration/.test(
      text,
    )
  )
    return "Control / policy improvement: change behavior toward higher expected return.";
  if (/model|planning|search|rollout|mcts|dyna|sweeping/.test(text))
    return "Planning / decision-time computation: improve values or decisions with simulated experience.";
  if (/reward|shaping|formulation|agent-environment/.test(text))
    return "Problem design: define the objective or interface that later learning optimizes.";
  if (
    /dopamine|conditioning|rescorla|neural/.test(text) ||
    chapter === 14 ||
    chapter === 15
  )
    return "Explanatory model: connect RL update structure to behavioral or neural evidence.";
  if (/general value|gvf/.test(text))
    return "Predictive knowledge representation: learn reusable forecasts beyond reward.";
  return "Algorithmic procedure supporting prediction, control, planning, or problem formulation.";
}

function inferDataRegime(text: string, chapter: number) {
  if (/dynamic programming|policy iteration|value iteration/.test(text))
    return "Full known finite MDP model; no sampled experience required for the backup itself.";
  if (/monte carlo|reinforce|rollout/.test(text))
    return "Episodic sampled trajectories or simulated rollouts; waits for returns or rollout outcomes.";
  if (/continuing|average|differential/.test(text))
    return "Continuing stream; uses differential/average-reward signals instead of episode-only returns.";
  if (/batch|fitted|logged|lstd|least-squares/.test(text))
    return "Batch or replayed transition data; targets are fitted from stored samples.";
  if (/replay|dqn|target-network/.test(text))
    return "Online collection plus stored replay minibatches.";
  if (/planning|dyna|model|search|mcts|sweeping/.test(text))
    return "Real or learned model data plus simulated transitions/search trajectories.";
  if (chapter >= 9 && chapter <= 13)
    return "Sampled online data with feature or parameter sharing across states/actions.";
  return "Online sampled interaction or chapter-specific source data.";
}

function inferTargetPolicy(text: string, chapter: number) {
  if (
    /off-policy|q-learning|importance|watkins|gtd|tdc|emphatic|tree backup|q\(sigma\)|intra-option|fitted/.test(
      text,
    )
  )
    return "Off-policy or target/behavior separated; coverage or correction terms matter.";
  if (
    /on-policy|sarsa|actor|reinforce|policy-gradient|gradient bandit/.test(text)
  )
    return "On-policy or behavior-coupled; the update follows data from the current policy.";
  if (/dynamic programming|policy iteration|value iteration/.test(text))
    return "Explicit policy/model relation; evaluation uses pi and improvement may become greedy.";
  if (/bandit|ucb|optimistic/.test(text))
    return "Behavior is the action-selection rule itself; no separate state-conditioned target policy.";
  if (/reward|formulation|gvf|option/.test(text))
    return "Defines or composes policies rather than only evaluating one fixed behavior.";
  return chapter <= 8
    ? "Usually tabular on-policy unless the card names off-policy correction."
    : "Depends on target objective and data distribution; check the card's source cue.";
}

function inferModelUse(text: string, chapter: number) {
  if (
    /dynamic programming|known.*model|bellman expectation|bellman optimality/.test(
      text,
    )
  )
    return "Requires an explicit environment model for exact expected backups.";
  if (
    /dyna|planning|model|sweeping|trajectory sampling|real-time dynamic|heuristic search|rollout|mcts|alphago|option value/.test(
      text,
    )
  )
    return "Uses a learned, given, or searched model/simulator.";
  if (
    /monte carlo|td|sarsa|q-learning|reinforce|actor|bandit|gtd|emphatic/.test(
      text,
    )
  )
    return "Model-free update; learns from sampled rewards/transitions without enumerating dynamics.";
  if (/reward|formulation|gvf|option/.test(text))
    return "Model optional; the procedure defines signals or temporal abstraction that other methods use.";
  return "No explicit model requirement unless supplied by the surrounding application.";
}

function inferBackupStyle(text: string, chapter: number) {
  if (/sample-average|constant-step|gradient bandit|ucb|optimistic/.test(text))
    return "Immediate reward target; no temporal Bellman backup.";
  if (
    /dynamic programming|expected|tree backup|bellman expectation|bellman optimality/.test(
      text,
    )
  )
    return "Expected Bellman backup over actions/outcomes or policy branches.";
  if (/monte carlo|reinforce|rollout/.test(text))
    return "Complete sampled return or rollout return; high variance but no bootstrap in the basic target.";
  if (/n-step|lambda|trace|q\(sigma\)/.test(text))
    return "Multi-step mixture; interpolates between one-step bootstrapping and sampled returns.";
  if (/td\(0\)|sarsa|q-learning|dqn|actor-critic|differential/.test(text))
    return "One-step bootstrapped TD-style backup or TD-error-driven gradient.";
  if (/least-squares|lstd|fitted/.test(text))
    return "Regression/linear-system target built from Bellman-style samples.";
  if (/reward|formulation/.test(text))
    return "No value backup; defines the signal/interface for later backups.";
  return "Chapter-specific update; inspect target, error signal, and credit assignment on the card.";
}

function inferApproximation(text: string, chapter: number) {
  if (
    /tabular|bandit|dynamic programming|monte carlo es|td\(0\)|sarsa|q-learning|double q|dyna|sweeping/.test(
      text,
    ) &&
    chapter <= 8
  )
    return "Tabular / enumerated states or actions.";
  if (
    /linear|tile|coarse|fourier|least-squares|lstd|semi-gradient|gtd|tdc|emphatic|kernel|memory-based/.test(
      text,
    )
  )
    return "Function approximation, usually linear or feature based in the book treatment.";
  if (/neural|deep|dqn|alphago|td-gammon|backprop|network/.test(text))
    return "Nonlinear function approximation / neural network system.";
  if (/softmax|gaussian|policy parameter|actor|reinforce/.test(text))
    return "Parameterized stochastic policy, often with separate value-function approximation.";
  if (/reward|formulation|option|gvf/.test(text))
    return "Representation design rather than a single value approximator.";
  return chapter >= 9
    ? "Approximate/parameterized setting."
    : "Mostly tabular or conceptual setting.";
}

function inferCreditAssignment(text: string, chapter: number) {
  if (/bandit/.test(text))
    return "No delayed temporal credit beyond action-reward association.";
  if (/monte carlo|reinforce|rollout/.test(text))
    return "Episode/rollout return assigns credit after future outcomes are observed.";
  if (/td\(0\)|q-learning|sarsa|actor-critic|differential/.test(text))
    return "One-step TD error assigns immediate backward credit to the active estimate/features.";
  if (/n-step|lambda|trace|eligibility/.test(text))
    return "Explicit multi-step or eligibility-trace credit assignment across recent states/actions/features.";
  if (/planning|sweeping|dyna|search|mcts/.test(text))
    return "Credit is propagated by simulated backups, predecessor queues, or search-tree backups.";
  if (/option/.test(text))
    return "Temporal abstraction credit across option continuation and termination.";
  if (/reward|shaping/.test(text))
    return "Credit is shaped by reward specification; learning method then distributes it.";
  return "Credit pathway depends on the target and stored estimate named in the card.";
}

function inferObjectiveView(text: string, chapter: number) {
  if (/average|differential|continuing/.test(text))
    return "Average-reward / differential objective for continuing tasks.";
  if (
    /discount|gamma|bellman|td|sarsa|q-learning|dynamic programming|dyna|option/.test(
      text,
    )
  )
    return "Discounted or episodic return objective, unless the card explicitly says average reward.";
  if (/bandit|gradient bandit/.test(text))
    return "Expected immediate reward / regret tradeoff.";
  if (/policy-gradient|reinforce|actor|gaussian|softmax/.test(text))
    return "Direct performance-gradient objective over a parameterized policy.";
  if (/gvf|general value/.test(text))
    return "General prediction objective defined by cumulant, continuation, and policy.";
  if (/reward|formulation/.test(text))
    return "Defines the objective rather than solving a fixed one.";
  return "Expected return or chapter-specific prediction objective.";
}

function inferConvergenceHandle(text: string, chapter: number) {
  if (/dynamic programming|value iteration|policy iteration/.test(text))
    return "Contraction/fixed-point behavior under finite discounted/proper model assumptions.";
  if (/sample-average|monte carlo prediction|weighted/.test(text))
    return "Law-of-large-numbers averaging given sufficient coverage and finite variance.";
  if (/td\(0\)|sarsa|q-learning|double q/.test(text) && chapter <= 8)
    return "Tabular stochastic approximation with sufficient exploration and appropriate step sizes.";
  if (/linear|semi-gradient/.test(text))
    return "Projected fixed point or semi-gradient stability; strongest in on-policy linear settings.";
  if (/off-policy|gtd|tdc|emphatic|htd/.test(text))
    return "Stability requires correction objectives/weighting, coverage, and controlled ratios/emphasis.";
  if (/policy-gradient|reinforce|actor/.test(text))
    return "Stochastic-gradient logic; variance control and compatible critic quality are central.";
  if (/deep|neural|dqn|alphago|td-gammon/.test(text))
    return "Empirical stability; relies on engineering devices, representation, and evaluation.";
  if (/reward|formulation|option|gvf/.test(text))
    return "Correctness depends on matching definitions to the intended question/task.";
  return "Use the chapter's assumptions; tabular guarantees do not automatically transfer.";
}

function inferComputeMemory(text: string, chapter: number) {
  if (/dynamic programming/.test(text))
    return "Sweeps over state/action/model branches; expensive when the model or state space is large.";
  if (/monte carlo|reinforce/.test(text))
    return "Stores episode trajectories or returns; cheap per step but delayed updates.";
  if (/n-step/.test(text))
    return "Stores a rolling n-step buffer of states/actions/rewards/probabilities.";
  if (/lambda|trace|eligibility/.test(text))
    return "Stores eligibility traces, typically sparse vectors for active features.";
  if (/dyna|model|planning|sweeping/.test(text))
    return "Stores a model plus values; may also store predecessor maps or priority queues.";
  if (/mcts|search|rollout/.test(text))
    return "Decision-time compute and search-tree/rollout statistics.";
  if (/linear|semi-gradient|policy-gradient|actor|critic|neural/.test(text))
    return "Stores parameter vectors/networks and gradient state; minibatches or traces may add memory.";
  if (/bandit/.test(text))
    return "Stores per-action estimates, counts, or preferences.";
  return "Memory is dominated by the representation named in the card.";
}

function inferBestUse(text: string, chapter: number) {
  if (/bandit/.test(text))
    return "Use when actions affect immediate reward but not future state.";
  if (/dynamic programming/.test(text))
    return "Use when the finite model is known and exact planning is feasible.";
  if (/monte carlo/.test(text))
    return "Use when episodes are available and unbiased return samples are acceptable.";
  if (/td|sarsa|q-learning/.test(text))
    return "Use when online incremental learning with bootstrapping is needed.";
  if (/n-step|lambda|trace/.test(text))
    return "Use when one-step TD is too myopic but full returns are too delayed/noisy.";
  if (/planning|dyna|search|mcts|rollout/.test(text))
    return "Use when a model/simulator can trade computation for real experience.";
  if (/function|linear|tile|kernel|neural|deep|semi-gradient/.test(text))
    return "Use when state/action spaces are too large for tables and generalization is required.";
  if (/policy-gradient|reinforce|actor|gaussian/.test(text))
    return "Use when direct stochastic policy optimization or continuous actions are natural.";
  if (/option|gvf|reward/.test(text))
    return "Use when the problem needs temporal abstraction, auxiliary predictions, or better objective design.";
  return "Use when the chapter's assumptions match your data, objective, and representation.";
}

function inferAvoidWhen(text: string, chapter: number) {
  if (/bandit/.test(text))
    return "Avoid if actions have delayed state-dependent consequences that require an MDP model.";
  if (/dynamic programming/.test(text))
    return "Avoid if the model is unknown or the state-action branching makes full sweeps impossible.";
  if (/monte carlo|reinforce/.test(text))
    return "Avoid when episodes are very long and variance/delayed feedback is intolerable.";
  if (/td|q-learning|sarsa/.test(text) && chapter <= 8)
    return "Avoid naive tabular assumptions when approximation, off-policy data, and bootstrapping combine without safeguards.";
  if (/off-policy|importance/.test(text))
    return "Avoid without behavior-policy probabilities and support coverage.";
  if (/n-step|lambda|trace/.test(text))
    return "Avoid if trajectory bookkeeping, terminal resets, or off-policy trace handling cannot be tested carefully.";
  if (/planning|model|dyna|mcts|search/.test(text))
    return "Avoid if the model/simulator is too biased or decision-time compute is unavailable.";
  if (/deep|neural|function|semi-gradient/.test(text))
    return "Avoid scaling before a small feature/weight-norm sanity check passes.";
  if (/reward|shaping/.test(text))
    return "Avoid arbitrary shaping that changes the intended optimal behavior.";
  return "Avoid when the assumptions in the source cue do not match your task.";
}

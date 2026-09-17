import type { AlgorithmDetail } from "@/lib/algorithmCatalog";
import type { Accent } from "@/lib/paper";

export interface AlgorithmDossierSection {
  label: string;
  accent: Accent;
  easy: string;
  technical: string;
  checkpoints: string[];
}

export function algorithmDossier(algorithm: AlgorithmDetail): AlgorithmDossierSection[] {
  const name = algorithm.name.toLowerCase();
  const family = algorithm.family.toLowerCase();
  const text = `${algorithm.name} ${algorithm.family} ${algorithm.bookAnchor} ${algorithm.coreUpdate} ${algorithm.equations.join(" ")}`.toLowerCase();
  const knobs = inferKnobs(text, name, family);
  const stability = inferStabilityContract(name, family, algorithm.chapter);
  const invariants = inferImplementationInvariants(name, family);
  const estimator = inferEstimatorShape(name, family, algorithm.chapter);
  const diagnostics = inferDiagnostics(name, family);

  return [
    {
      label: "Inputs, stored state, and output",
      accent: "cyan",
      easy: `Treat ${algorithm.name} as a machine with a small set of memories: observations from the book's setting go in, ${outputPhrase(name, family)} comes out, and the stored estimates are revised after experience.`,
      technical: estimator,
      checkpoints: [
        "Write the exact random variables available before the update; do not let the target read future data except through the sampled transition or completed episode.",
        "Separate behavior data collection from the target being evaluated or improved; this matters especially for off-policy, planning, and policy-gradient methods.",
        "Record whether the method stores a table entry, a weight vector, a learned model, a trace, a policy parameter, or a search tree statistic.",
      ],
    },
    {
      label: "Target, error signal, and update anatomy",
      accent: "blue",
      easy: "Every learning rule on the page compares what it believed with a target, then moves partway toward the target instead of jumping all the way.",
      technical: `Core target/update: ${algorithm.coreUpdate} The anatomy is prediction, target, error/residual, step-size, and assignment of credit to the state, action, feature, trace, preference, model entry, or policy parameter named by the algorithm.`,
      checkpoints: [
        "Identify the prediction being changed: V(s), Q(s,a), q_hat(s,a,w), a policy preference H(a), actor parameters theta, a model p/r estimate, or an option component.",
        "Identify the target: sampled return, bootstrapped Bellman target, expected Bellman target, importance-weighted return, policy-gradient return, or search backup.",
        "Check whether the target is sampled, expected from a model, bootstrapped from current estimates, or differentiated through a parameterized objective.",
      ],
    },
    {
      label: "Bias, variance, bootstrapping, and sampling position",
      accent: "violet",
      easy: "The main tradeoff is how much the method trusts real sampled returns versus its own current estimates, and how noisy that choice makes learning.",
      technical: inferBiasVariancePosition(name, family, algorithm.chapter),
      checkpoints: [
        "Monte Carlo-style targets reduce bootstrap bias but can have high variance and require episode or rollout returns.",
        "TD and dynamic-programming targets bootstrap, so they can learn sooner but may propagate approximation or max-operator bias.",
        "Expected backups spend computation to reduce sampling variance; sampled backups spend experience or simulation to avoid summing over all outcomes.",
      ],
    },
    {
      label: "Control knobs and implementation choices",
      accent: "lime",
      easy: `The knobs decide how fast ${algorithm.name} moves, how much it explores, and how much past or simulated experience it reuses.`,
      technical: knobs.technical,
      checkpoints: knobs.checkpoints,
    },
    {
      label: "Convergence, stability, and validity contract",
      accent: "orange",
      easy: "This is the fine print: the update only behaves like the textbook story when its assumptions match the data, approximation, and policy setting.",
      technical: stability,
      checkpoints: [
        "Check whether the book's guarantee is tabular, linear approximation, on-policy, off-policy, episodic, continuing, discounted, or average-reward.",
        "Use diminishing step-sizes or small constant step-sizes according to whether the goal is convergence in a stationary task or tracking in a drifting task.",
        "For approximate/off-policy methods, monitor projected Bellman error, value scale, feature conditioning, and importance ratios rather than assuming tabular behavior carries over.",
      ],
    },
    {
      label: "Debugging checklist and failure signatures",
      accent: "orange",
      easy: "When learning looks wrong, inspect the bookkeeping before blaming the theory: most RL bugs are target, policy, episode-boundary, or trace bugs.",
      technical: diagnostics.technical,
      checkpoints: [...invariants, ...diagnostics.checkpoints].slice(0, 8),
    },
  ];
}

function inferKnobs(text: string, name: string, family: string) {
  const checkpoints = new Set<string>();
  const labels = new Set<string>();

  const add = (label: string, checkpoint: string) => {
    labels.add(label);
    checkpoints.add(checkpoint);
  };

  if (/[αa]lpha|step|td|sarsa|q-learning|monte carlo|gradient|bandit|actor|critic|gtd|tdc/.test(text)) add("step-size alpha", "Tune alpha against divergence, oscillation, and adaptation speed; use separate actor/critic/secondary step-sizes when the algorithm has multiple learners.");
  if (/gamma|discount|return|bellman|td|sarsa|q-learning|value|policy gradient|actor/.test(text)) add("discount gamma", "Confirm gamma matches the task horizon; gamma near one increases long-range credit assignment and value scale.");
  if (/epsilon|soft|explor|sarsa|q-learning|monte carlo control/.test(text)) add("exploration rate epsilon or soft-policy floor", "Keep enough exploratory probability for all actions required by the control proof or by practical coverage.");
  if (/lambda|trace|eligibility/.test(text)) add("trace-decay lambda", "Reset traces at episode boundaries and verify replacing/accumulating/dutch trace semantics match the intended algorithm.");
  if (/n-step|n step|tree-backup|q\(sigma\)/.test(text)) add("backup length n", "Choose n as the credit-assignment horizon: larger n is more return-like, smaller n is more TD-like.");
  if (/ucb|upper-confidence|mcts|tree search/.test(text)) add("optimism/search constant c", "Scale c relative to reward range and visit counts so uncertainty bonuses do not swamp value estimates forever.");
  if (/importance|off-policy|rho|ratio/.test(text)) add("importance ratio rho", "Compute behavior probabilities before sampling and guard products of ratios with log-space checks or deliberate truncation diagnostics.");
  if (/gradient bandit|softmax|policy parameter|reinforce|gaussian/.test(text)) add("temperature/preference scale", "Normalize action probabilities, subtract stable baselines where allowed, and check that gradients use log probabilities rather than raw probabilities.");
  if (/dyna|planning|model|prioritized|sweeping|rollout|search|mcts/.test(text)) add("planning budget/model refresh", "Track real updates separately from simulated backups and confirm stale model entries cannot dominate real evidence.");
  if (/tile|coarse|kernel|feature|linear|least-squares|memory-based/.test(text)) add("feature resolution and regularization", "Inspect feature activation counts, conditioning, and regularization because approximation quality is the algorithm's effective state space.");
  if (/average|differential/.test(text)) add("average reward step-size", "Update the reward-rate estimate on a compatible time-scale and debug by shifting all rewards by a constant.");
  if (/emphatic/.test(text)) add("interest/emphasis trace", "Log follow-on and emphasis weights; exploding emphasis usually means the target/behavior mismatch or interest function is wrong.");
  if (/option/.test(text)) add("initiation, intra-option policy, termination beta", "Check option termination and initiation masks before interpreting option-value learning failures.");

  if (!labels.size) add("step-size / sampling budget", "Start with the smallest parameter set that changes the estimate, then add exploration, traces, or planning only when the chapter's algorithm requires them.");

  return {
    technical: `Primary knobs: ${Array.from(labels).join(", ")}. These choices define the effective data distribution, target variance, update time-scale, and compute/experience tradeoff for ${family}.`,
    checkpoints: Array.from(checkpoints).slice(0, 6),
  };
}

function inferEstimatorShape(name: string, family: string, chapter: number) {
  if (/bandit/.test(family) || /bandit|ucb|optimistic|sample-average/.test(name)) return "The learner stores action-value estimates Q(a), action counts N(a), preferences H(a), or context-conditioned estimates; output is an action sampled greedily, epsilon-greedily, by UCB, or by softmax.";
  if (/dynamic programming|policy iteration|value iteration/.test(name)) return "The learner stores complete value tables and uses a known transition model p(s',r|s,a); output is an improved policy or a fixed-point value table after sweeping Bellman backups.";
  if (/monte carlo/.test(name)) return "The learner stores value estimates plus returns or weighted-return accumulators; output is a value function or epsilon-soft/greedy policy updated after sampled episodes.";
  if (/sarsa|q-learning|expected sarsa|td\(0\)|afterstate|double q/.test(name)) return "The learner stores tabular V(s), Q(s,a), or afterstate values; output is a behavior action plus a one-step bootstrapped value update after each transition.";
  if (/n-step|tree-backup|q\(sigma\)/.test(name)) return "The learner stores a rolling trajectory buffer of states, actions, rewards, and policies; output is a delayed backup once enough future rewards or tree terms are known.";
  if (/dyna|planning|model|sweeping|search|rollout|mcts/.test(name)) return "The learner stores both values and a model or search tree; output combines real-experience updates with simulated backups selected by queue, trajectory, rollout, or tree policy.";
  if (/function approximation|semi-gradient|linear|tile|least-squares|kernel|memory-based|gradient-td|tdc|emphatic|bellman-error/.test(name) || chapter >= 9 && chapter <= 12) return "The learner stores parameter vector w, features x(s) or x(s,a), and sometimes secondary weights or traces; output is a generalized value estimate rather than an isolated table entry.";
  if (/policy|reinforce|actor|critic|gaussian|softmax/.test(name)) return "The learner stores policy parameters theta and often critic weights w; output is an action distribution plus a gradient update using returns, TD errors, advantages, or differential rewards.";
  if (/rescorla|conditioning|dopamine|neural/.test(name)) return "The learner stores associative strengths or neural/actor-critic value signals; output is a prediction-error update used to explain behavioral or neural data.";
  if (/alpha|td-gammon|samuel|dqn|daily|memory|web|soaring|checkers/.test(name)) return "The learner stores an application-specific value/policy/search representation; output is a domain action chosen by learned evaluation, search, or controller optimization.";
  if (/option|general value|reward design/.test(name)) return "The learner stores predictions, options, or reward/task definitions; output is a reusable knowledge element or temporally extended control choice.";
  return `For chapter ${chapter}, the learner stores the book-specific estimate named in the card and outputs the policy, value, model, or prediction improved by the update.`;
}

function inferBiasVariancePosition(name: string, family: string, chapter: number) {
  if (/dynamic programming|value iteration|policy iteration|expected/.test(name)) return "This is an expected-backup position: variance is low because the model or policy expectation is enumerated, but the method pays model/computation cost and inherits any model misspecification.";
  if (/monte carlo|reinforce|rollout/.test(name)) return "This is a sampled-return position: the target can be unbiased for the chosen policy objective, but variance can be high because a whole return or rollout determines credit.";
  if (/td|sarsa|q-learning|afterstate|dyna/.test(name)) return "This is a bootstrapped position: updates happen before the full return is known, reducing delay and often variance while introducing dependence on current estimates.";
  if (/n-step|lambda|trace|q\(sigma\)|tree-backup/.test(name)) return "This is an interpolation position: n, lambda, sigma, or tree expansion controls the continuum between one-step bootstrap and longer sampled returns.";
  if (/importance|off-policy/.test(name)) return "This is an off-policy correction position: reuse is bought with probability ratios whose products can dominate variance unless weighted, per-decision, emphatic, or truncated structure is used.";
  if (/gradient|actor|critic|softmax|gaussian/.test(name) || chapter === 13) return "This is an objective-gradient position: the update follows a stochastic gradient estimate of performance, with baselines and critics reducing variance without changing the expected policy-gradient direction when used correctly.";
  if (/function|semi-gradient|linear|tile|kernel|least-squares/.test(name) || chapter >= 9 && chapter <= 11) return "This is an approximation position: samples update shared parameters, so generalization reduces sample burden but couples errors across states and can create projection or stability issues.";
  if (/model|search|mcts|planning/.test(name)) return "This is a computation-versus-experience position: simulated backups reduce real interaction cost, but the method can become biased by stale models, shallow rollouts, or tree policy imbalance.";
  return "The card's update should be located on the book's core axes: sampled versus expected, one-step versus multi-step, on-policy versus off-policy, and tabular versus approximate.";
}

function inferStabilityContract(name: string, family: string, chapter: number) {
  if (/bandit/.test(family)) return "Bandit estimates are stable when rewards are stationary for sample averages or when constant step-sizes deliberately track nonstationarity; exploration controls regret rather than Bellman consistency.";
  if (/dynamic programming|policy iteration|value iteration|generalized policy iteration/.test(name)) return "Tabular DP relies on a correct finite MDP model and repeated Bellman sweeps; contraction comes from discounted backups or proper episodic structure, while policy improvement assumes values are evaluated accurately enough.";
  if (/monte carlo/.test(name)) return "Monte Carlo prediction/control relies on adequate episode coverage; ordinary importance sampling can be unbiased with enormous variance, while weighted estimates trade small bias for bounded, better-conditioned behavior.";
  if (/q-learning|sarsa|expected sarsa|td\(0\)|double q|afterstate/.test(name)) return "Tabular TD-control stability depends on sufficient exploration, appropriate step-size schedules, and matching the update to on-policy or off-policy assumptions; max backups add overestimation pressure that Double Q specifically counters.";
  if (/n-step|tree-backup|q\(sigma\)/.test(name)) return "Multi-step methods require correct trajectory bookkeeping and policy probabilities across the backup horizon; off-policy variants must control products of ratios or use expectation/tree structure to avoid variance explosions.";
  if (/dyna|planning|prioritized|sweeping|mcts|search|rollout|model/.test(name)) return "Planning methods are only as stable as the model/search distribution feeding backups; stale models, missing predecessors, unbounded priorities, or rollout policies outside the task distribution can create confident wrong values.";
  if (/semi-gradient|function approximation|linear|tile|least-squares|kernel|memory/.test(name) || chapter === 9 || chapter === 10) return "On-policy semi-gradient prediction/control with appropriate features is the safe baseline; shared parameters mean convergence is to a projected solution, and nonlinear approximation needs additional practical safeguards not guaranteed by the tabular story.";
  if (/off-policy|gradient-td|tdc|emphatic|bellman-error/.test(name) || chapter === 11) return "This is the deadly-triad zone: function approximation, bootstrapping, and off-policy data can diverge. Gradient-TD and emphatic methods restore a well-defined objective or weighting under more restrictive linear/coverage conditions.";
  if (/lambda|trace|true online|watkins|gtd\(lambda\)|emphatic td\(lambda\)/.test(name)) return "Trace stability requires exact episode resets, correct decay, and compatibility with off-policy cuts or ratios; true-online variants preserve the intended forward-view equivalence more exactly online.";
  if (/policy|reinforce|actor|critic|gaussian|softmax/.test(name) || chapter === 13) return "Policy-gradient stability depends on differentiable stochastic policies, support for sampled actions, bounded variance through baselines/critics, and avoiding critic bias that changes the actor's intended direction.";
  if (/rescorla|conditioning|dopamine|neural/.test(name) || chapter === 14 || chapter === 15) return "Psychology/neuroscience models are explanatory fits, not universal control guarantees; the validity contract is qualitative and experimental alignment with prediction-error timing, blocking, contingency, or neural firing patterns.";
  if (chapter === 16) return "Application systems combine textbook updates with representation, search, replay, self-play, or domain constraints; stability is empirical and depends on the engineering wrapper as much as the nominal RL update.";
  if (chapter === 17) return "Frontier constructs such as GVFs, options, and reward design are compositional: correctness depends on cumulants, discounts, termination, state abstractions, and reward definitions matching the knowledge/control question actually being asked.";
  return "Use the contract stated by the surrounding chapter: finite/tabular assumptions are not interchangeable with approximate, off-policy, continuing, or hierarchical assumptions.";
}

function inferImplementationInvariants(name: string, family: string) {
  const items: string[] = [];
  if (/monte carlo|return/.test(name)) items.push("Episode boundaries must be correct before computing returns; one terminal reward shifted by one time-step changes every upstream target.");
  if (/first-visit/.test(name)) items.push("First-visit MC must ignore later visits to the same state or state-action pair within the episode.");
  if (/every-visit/.test(name)) items.push("Every-visit MC must update each occurrence, not just each unique state-action key.");
  if (/sarsa/.test(name)) items.push("Sarsa's target uses the actual next action drawn from the behavior policy, so sample A_{t+1} before computing the target.");
  if (/q-learning/.test(name)) items.push("Q-learning's target uses max_a Q(S_{t+1},a); do not accidentally use the exploratory behavior action unless implementing Sarsa.");
  if (/expected sarsa|tree-backup|expected model/.test(name)) items.push("Expected backups require a normalized probability distribution over actions or successor events; assert the probabilities sum to one.");
  if (/double q/.test(name)) items.push("Double Q must select the greedy action under one estimator and evaluate it under the other; using the same estimator reintroduces maximization bias.");
  if (/importance|off-policy/.test(name)) items.push("Store behavior probabilities with the transition; recomputing them after the policy changes corrupts importance ratios.");
  if (/lambda|trace/.test(name)) items.push("Clear traces on terminal transitions and when Watkins-style control cuts a trace after a non-greedy action.");
  if (/true online/.test(name)) items.push("True-online TD(lambda) needs the dutch-trace correction and the previous state's value estimate; dropping either breaks forward-view equivalence.");
  if (/gradient-td|tdc|gtd/.test(name)) items.push("Gradient-TD/TDC methods require secondary weights with their own time-scale; a single weight vector is not the algorithm.");
  if (/emphatic/.test(name)) items.push("Emphatic methods require follow-on/emphasis recursion; treating them as ordinary TD with bigger step-sizes misses the stabilizing weighting.");
  if (/policy|reinforce|actor|critic|gaussian|softmax|gradient bandit/.test(name) || /policy-gradient/.test(family)) items.push("Policy-gradient code should differentiate log pi(A|S), not the sampled action itself; detach baselines unless intentionally learning them.");
  if (/dyna|model|planning/.test(name)) items.push("Use the same value-update function for real and simulated transitions so planning cannot drift from direct learning semantics.");
  if (/prioritized/.test(name)) items.push("Prioritized sweeping needs predecessor bookkeeping; without predecessors, high-priority consequences do not flow backward efficiently.");
  if (/mcts/.test(name)) items.push("MCTS must update visit counts and returns along the selected path, not just at the expanded leaf.");
  if (/average|differential/.test(name)) items.push("For average-reward methods, debug invariance to adding a constant to all rewards; ordinary discounted code will fail this check.");
  if (!items.length) items.push("Log prediction, target, error, step-size, selected action, behavior probability, and terminal flag for a tiny hand-checkable problem.");
  return items;
}

function inferDiagnostics(name: string, family: string) {
  const checkpoints = new Set<string>();
  const add = (item: string) => checkpoints.add(item);
  add("Run a one-state or two-state toy problem where the correct value can be computed by hand.");
  add("Plot target minus prediction; exploding, always-positive, or always-negative errors usually identify a sign, terminal, or target bug.");
  if (/off-policy|importance|emphatic/.test(name)) add("Plot importance ratios or emphasis weights on a log scale and inspect rare transitions individually.");
  if (/function|linear|tile|kernel|semi-gradient|least-squares|gtd|tdc/.test(name)) add("Track feature norms and weight norms; sudden growth often precedes visible value divergence.");
  if (/policy|actor|critic|reinforce|softmax|gaussian|gradient/.test(name)) add("Track policy entropy and action probabilities; collapsed support can stop exploration and invalidate gradient estimates.");
  if (/model|dyna|planning|search|mcts|rollout/.test(name)) add("Compare real-transition backups with simulated backups for the same state-action pair to expose model staleness.");
  if (/lambda|trace|n-step/.test(name)) add("Print the backup window or active trace keys around terminal transitions; off-by-one errors are common.");

  return {
    technical: "Debug the algorithm as a dataflow graph: sampled transition or episode -> target construction -> error/gradient -> assignment of credit -> policy/action change. Each failure signature points to one edge in that graph.",
    checkpoints: Array.from(checkpoints),
  };
}

function outputPhrase(name: string, family: string) {
  if (/policy|actor|softmax|gaussian/.test(name) || /policy-gradient/.test(family)) return "an action distribution or improved policy";
  if (/model|planning|dyna|search|mcts|rollout/.test(name)) return "a value-backed plan, simulated backup, or searched action";
  if (/prediction|td|monte carlo|value|q-learning|sarsa|bandit/.test(name)) return "a value estimate or greedy/soft action choice";
  if (/option|general value/.test(name)) return "a reusable prediction or temporally extended action choice";
  return "the next estimate, prediction, or action recommended by the method";
}

import type { AlgorithmDetail } from "@/lib/algorithmCatalog";

export interface AlgorithmDerivationStep {
  label: string;
  easy: string;
  technical: string;
}

export interface AlgorithmDerivation {
  title: string;
  bigIdea: string;
  technicalPath: string;
  steps: AlgorithmDerivationStep[];
  equationNotes: string[];
  codingTrace: string[];
  proofObligation: string;
}

type AlgorithmKind =
  | "formulation"
  | "bandit"
  | "dynamicProgramming"
  | "monteCarlo"
  | "offPolicy"
  | "td"
  | "multiStep"
  | "planning"
  | "approximation"
  | "policyGradient"
  | "option"
  | "reward"
  | "gvf"
  | "neuro"
  | "application"
  | "generic";

export function algorithmDerivation(algorithm: AlgorithmDetail): AlgorithmDerivation {
  const text = `${algorithm.name} ${algorithm.family} ${algorithm.bookAnchor} ${algorithm.plain} ${algorithm.technical} ${algorithm.objective} ${algorithm.coreUpdate} ${algorithm.equations.join(" ")} ${algorithm.related.join(" ")}`.toLowerCase();
  const kind = classifyAlgorithm(text, algorithm.chapter);
  const subject = estimateSubject(kind, text);
  const target = targetConstruction(kind, algorithm);
  const error = errorSignal(kind, algorithm);
  const assignment = creditAssignment(kind, text);
  const control = controlMove(kind, text);
  const stability = stabilityRequirement(kind, text, algorithm.chapter);

  return {
    title: `${algorithm.name} derivation path`,
    bigIdea: `Easy: start with the quantity ${algorithm.name} wants to make reliable, build a target from the data or model available in ${algorithm.bookAnchor}, compare that target with the current estimate, and update only the memory that should receive credit.`,
    technicalPath: `Technical: view the method as stochastic approximation or optimization around ${subject}. The card's core update is ${algorithm.coreUpdate} The derivation decomposes into target construction (${target.short}), residual (${error.short}), credit assignment (${assignment.short}), and validity assumptions (${stability.short}).`,
    steps: [
      {
        label: "1. Name the estimand or decision rule",
        easy: `Ask what ${algorithm.name} is trying to know or choose before writing code: a value, an action score, a policy parameter, a model, a return target, or a problem definition.`,
        technical: subject,
      },
      {
        label: "2. Construct the learning target",
        easy: target.easy,
        technical: target.technical,
      },
      {
        label: "3. Form the residual / advantage / score",
        easy: error.easy,
        technical: error.technical,
      },
      {
        label: "4. Assign credit to the stored object",
        easy: assignment.easy,
        technical: assignment.technical,
      },
      {
        label: "5. Convert the estimate into behavior or planning pressure",
        easy: control.easy,
        technical: control.technical,
      },
      {
        label: "6. Check the assumptions that make the algebra legal",
        easy: stability.easy,
        technical: stability.technical,
      },
    ],
    equationNotes: equationNotes(kind, algorithm),
    codingTrace: codingTrace(kind, algorithm),
    proofObligation: stability.proof,
  };
}

export function derivationPreview(derivation: AlgorithmDerivation) {
  return [
    derivation.steps[0].label,
    derivation.steps[1].label,
    derivation.steps[2].label,
    `Proof/debug obligation: ${derivation.proofObligation}`,
  ];
}

function classifyAlgorithm(text: string, chapter: number): AlgorithmKind {
  if (/agent-environment|formulation|problem setup|mdp dynamics/.test(text)) return "formulation";
  if (/reward|shaping/.test(text)) return "reward";
  if (/general value|gvf/.test(text)) return "gvf";
  if (/option|smdp|intra-option|hierarchical/.test(text)) return "option";
  if (/reinforce|policy-gradient|actor|critic|softmax policy|gaussian policy|score-function/.test(text)) return "policyGradient";
  if (/planning|dyna|model|sweeping|search|rollout|mcts|trajectory sampling|real-time dynamic/.test(text)) return "planning";
  if (/linear|semi-gradient|tile|coarse|fourier|least-squares|lstd|gtd|tdc|emphatic|kernel|memory-based|fitted|dqn|deep|function approximation|td-gammon/.test(text)) return "approximation";
  if (/off-policy|importance|weighted|ordinary importance|per-decision|watkins|tree backup|q\(sigma\)/.test(text)) return "offPolicy";
  if (/n-step|lambda|trace|eligibility/.test(text)) return "multiStep";
  if (/monte carlo|exploring starts|every-visit|first-visit|return construction/.test(text)) return "monteCarlo";
  if (/dynamic programming|policy iteration|value iteration|bellman expectation|bellman optimality/.test(text)) return "dynamicProgramming";
  if (/bandit|ucb|optimistic|sample-average|constant-step|gradient bandit/.test(text)) return "bandit";
  if (/td\(0\)|sarsa|q-learning|expected sarsa|double q|afterstate|differential/.test(text)) return "td";
  if (/dopamine|conditioning|rescorla|psychology|neural|neuroscience/.test(text) || chapter === 14 || chapter === 15) return "neuro";
  if (chapter === 16) return "application";
  return "generic";
}

function estimateSubject(kind: AlgorithmKind, text: string) {
  switch (kind) {
    case "formulation":
      return "the estimand is the task definition itself: state/observation signal, action interface, reward/cumulant, termination or continuation rule, and the return criterion that later updates optimize.";
    case "bandit":
      return "the estimand is q_*(a)=E[R|A=a] or a preference-induced action distribution in a one-state decision problem; there is no transition-value recursion.";
    case "dynamicProgramming":
      return "the estimand is the exact Bellman fixed point for v_pi, q_pi, v_*, or q_* under a known finite MDP model p(s',r|s,a).";
    case "monteCarlo":
      return "the estimand is an expectation of complete sampled returns G_t under a policy; the estimate is revised only after the required return sample is available.";
    case "offPolicy":
      return "the estimand belongs to a target policy while data may come from a different behavior policy; the derivation must account for support and distribution mismatch.";
    case "td":
      return "the estimand is a bootstrapped value or action-value fixed point; a one-step target uses the next estimate before the full future return is known.";
    case "multiStep":
      return "the estimand is still a value or action value, but the target expands into a finite return/bootstrapping mixture controlled by n, lambda, sigma, or trace state.";
    case "planning":
      return "the estimand is improved by backing up real or simulated transitions from a model, search tree, rollout policy, or priority queue rather than only the latest real transition.";
    case "approximation":
      return "the estimand is represented by parameters w or theta, so the method targets a projected Bellman solution, semi-gradient objective, fitted regression target, or empirical performance criterion.";
    case "policyGradient":
      return "the estimand is a performance gradient with respect to policy parameters theta; the learned object is the stochastic policy itself rather than only an argmax over values.";
    case "option":
      return "the estimand lives at a temporally abstract level: option values, intra-option policies, termination probabilities, and initiation sets modify the effective transition timescale.";
    case "reward":
      return "the estimand is the objective signal, not a value table: the derivation asks whether reward transformations preserve the intended optimal-policy ordering.";
    case "gvf":
      return "the estimand is a general prediction about a cumulant under a policy and continuation function, so reward is just one special case of the target signal.";
    case "neuro":
      return "the estimand is explanatory: a temporal prediction error, associative strength, or behavioral quantity that links RL update algebra to psychology or neural measurements.";
    case "application":
      return "the estimand is embedded in a complete system: representation, simulator/data source, search, supervised targets, and evaluation protocol jointly define what is learned.";
    default:
      return text.includes("value")
        ? "the estimand is a value-like prediction or control quantity defined by the chapter's return objective."
        : "the estimand is the chapter-specific object named in the algorithm card and its source cue.";
  }
}

function targetConstruction(kind: AlgorithmKind, algorithm: AlgorithmDetail) {
  switch (kind) {
    case "bandit":
      return {
        short: "sampled immediate reward or confidence/preference score",
        easy: "Use the reward from the selected arm as the target; exploration rules add uncertainty or preference pressure before the next action is chosen.",
        technical: "The target is R_t for the chosen action, optionally filtered through an incremental mean, constant step-size tracker, UCB bonus, optimistic initialization, or softmax preference update.",
      };
    case "dynamicProgramming":
      return {
        short: "expected Bellman backup from the model",
        easy: "Enumerate what the model says can happen next and average those outcomes instead of waiting for samples.",
        technical: "Construct \u2211_{s',r} p(s',r|s,a)[r+\u03b3v(s')] for policy evaluation or max/greedy variants for optimality; the model supplies the expectation exactly up to sweep tolerance.",
      };
    case "monteCarlo":
      return {
        short: "complete empirical return",
        easy: "Wait until enough of the episode is known, add up the rewards, then use that return as the lesson.",
        technical: "The target is G_t, first-visit/every-visit return, or an exploring-start control return; no bootstrap term is needed in the basic target.",
      };
    case "offPolicy":
      return {
        short: "target-policy return or Bellman target corrected for behavior data",
        easy: "Reuse data from one policy only after correcting for the policy you actually want to evaluate or improve.",
        technical: "Targets include importance-sampled returns, weighted ratios, expected backups under the target policy, or off-policy control targets such as max_a Q(s',a), with support coverage required.",
      };
    case "td":
      return {
        short: "one-step bootstrapped target",
        easy: "Use the immediate reward plus the next estimate as a quick guess of the future.",
        technical: "Construct R_{t+1}+\u03b3V(S_{t+1}), R_{t+1}+\u03b3Q(S_{t+1},A_{t+1}), an expected next-action value, or a greedy next-action value depending on the control rule.",
      };
    case "multiStep":
      return {
        short: "multi-step return / trace-weighted target",
        easy: "Blend short-term bootstrapping with longer sampled reward chains so credit can travel farther than one step.",
        technical: "The target is an n-step return, lambda-return, eligibility-trace equivalent, tree-backup expansion, or sigma mixture of sampled and expected branches.",
      };
    case "planning":
      return {
        short: "simulated or searched Bellman target",
        easy: "Ask a model or simulator for extra practice transitions and back up their consequences before spending more real experience.",
        technical: "Targets come from learned model samples, predecessor priorities, rollout values, search-tree returns, or MCTS visit/value statistics, then are folded into the same value/policy update shape.",
      };
    case "approximation":
      return {
        short: "parameterized Bellman/regression/gradient target",
        easy: "Build a target for a shared set of weights so learning in one state can generalize to similar states.",
        technical: "The target can be semi-gradient TD, projected Bellman error, least-squares normal equations, fitted Q regression, or a neural target-network bootstrap depending on the card.",
      };
    case "policyGradient":
      return {
        short: "return or advantage multiplier for a score-function gradient",
        easy: "Increase the probability of actions that did better than the baseline and decrease relative probability for worse-than-baseline actions.",
        technical: "The update estimates \u2207_\u03b8 J(\u03b8) using \u2207_\u03b8 log \u03c0_\u03b8(A_t|S_t) multiplied by G_t, an advantage, or a TD-error critic signal.",
      };
    case "option":
      return {
        short: "temporally abstract Bellman target",
        easy: "Treat a whole option execution like a higher-level action, then back up its accumulated reward and termination outcome.",
        technical: "Targets combine intra-option rewards, continuation through option policy, termination beta, and the value available after an option stops or continues.",
      };
    case "reward":
      return {
        short: "objective transformation or shaping signal",
        easy: "Design the feedback so the learner is pushed toward the behavior you actually want, not a loophole.",
        technical: "The target is a reward/cumulant transformation; potential-based shaping requires F(s,s')=\u03b3\u03a6(s')-\u03a6(s) to preserve optimal policies in the discounted setting.",
      };
    case "gvf":
      return {
        short: "cumulant plus continuation prediction target",
        easy: "Predict a user-defined signal into the future, not necessarily reward.",
        technical: "A GVF target replaces reward and discount with cumulant C_{t+1} and continuation \u03b3_{t+1}, under a specified target policy.",
      };
    case "formulation":
    case "neuro":
    case "application":
    case "generic":
      return {
        short: "chapter-specific target from the source card",
        easy: `Use the card's objective as the target: ${algorithm.objective}`,
        technical: `The target construction is anchored by the core update/procedure: ${algorithm.coreUpdate}`,
      };
  }
}

function errorSignal(kind: AlgorithmKind, algorithm: AlgorithmDetail) {
  switch (kind) {
    case "policyGradient":
      return {
        short: "score times return/advantage",
        easy: "The mistake signal is whether the sampled action turned out better or worse than the baseline expectation.",
        technical: "Use a likelihood-ratio score multiplied by return, advantage, or TD error; baselines may reduce variance without changing the expected gradient when independent of the action.",
      };
    case "dynamicProgramming":
      return {
        short: "Bellman residual after an expected backup",
        easy: "Compare the old table entry to the model-averaged one-step lookahead.",
        technical: "The residual is Bv-v or the improvement gap between policy action values and the greedy action; convergence arguments use contraction or policy improvement.",
      };
    case "reward":
    case "formulation":
      return {
        short: "design mismatch rather than numeric TD error",
        easy: "The important error is a mismatch between the written objective and the behavior it incentivizes.",
        technical: "Debug by checking policy invariance, Markov sufficiency, reward hacking counterexamples, and whether terminal/continuing returns encode the task semantics.",
      };
    case "planning":
      return {
        short: "backup residual plus model/search uncertainty",
        easy: "A planning update is wrong when the simulated lesson disagrees with real experience or stale values.",
        technical: "The residual is TD/Bellman-like, but its quality also depends on model bias, rollout policy bias, priority staleness, and search-tree visit distribution.",
      };
    case "offPolicy":
      return {
        short: "corrected return or off-policy TD error",
        easy: "The error must say both what was surprising and how much this sample counts for the target policy.",
        technical: "Residuals are multiplied or reweighted by importance ratios, emphatic weights, or target-policy branch probabilities; ratio variance is part of the error budget.",
      };
    default:
      return {
        short: "target minus current prediction",
        easy: "Subtract the old guess from the newly built target; the sign says which way to move.",
        technical: `For this card, read the residual from the core update: ${algorithm.coreUpdate} In implementation, log target, prediction, residual, and step-size separately.`,
      };
  }
}

function creditAssignment(kind: AlgorithmKind, text: string) {
  if (kind === "bandit") {
    return {
      short: "selected action only",
      easy: "Only the arm you pulled receives this reward's lesson.",
      technical: "Update Q(A_t), N(A_t), or H(A_t) and any normalization terms; untouched actions change only through shared softmax normalization or confidence comparisons.",
    };
  }
  if (kind === "policyGradient") {
    return {
      short: "log-policy gradient at sampled state-action pairs",
      easy: "Credit goes to the tendency that produced the sampled action in the sampled state.",
      technical: "Apply \u2207 log \u03c0_\u03b8(A_t|S_t) with return/advantage scaling; actor-critic variants use critic TD error and may maintain actor traces.",
    };
  }
  if (kind === "multiStep" || /trace|eligibility|lambda|n-step/.test(text)) {
    return {
      short: "recent trajectory buffer or eligibility trace",
      easy: "Several recent states/actions share the lesson, with older ones usually receiving less credit.",
      technical: "Credit is routed through n-step indices, lambda-return weights, accumulating/replacing/dutch traces, or feature traces with episode-boundary resets.",
    };
  }
  if (kind === "planning") {
    return {
      short: "sampled state/action plus simulated predecessors/search ancestors",
      easy: "A model can push credit backward to places that might lead to the current surprise.",
      technical: "Dyna-style methods credit sampled model states; prioritized sweeping credits predecessors by priority; MCTS backs values up along the selected search path.",
    };
  }
  if (kind === "approximation") {
    return {
      short: "active features or shared parameters",
      easy: "The update changes every state/action that shares the same features or network weights.",
      technical: "Credit follows \u2207_w \u005chat v or \u2207_w \u005chat q, eligibility traces, replay minibatches, normal-equation features, or backpropagation through the approximator.",
    };
  }
  if (kind === "option") {
    return {
      short: "option duration, termination, and intra-option decisions",
      easy: "Credit spans the whole temporally extended choice and the lower-level actions inside it.",
      technical: "Backups assign credit across option-continuation terms, termination decisions, and intra-option policy actions at each primitive step.",
    };
  }
  return {
    short: "state/action/value named by the update",
    easy: "Credit goes to the table entry, parameter, trace, or design choice that produced the prediction being corrected.",
    technical: "Keep the updated object explicit: V(S_t), Q(S_t,A_t), model entry, weight vector, policy parameter, trace vector, or search statistic.",
  };
}

function controlMove(kind: AlgorithmKind, text: string) {
  if (kind === "dynamicProgramming") {
    return {
      easy: "After values are accurate enough, choose actions that look best under the model.",
      technical: "Policy improvement takes argmax_a \u2211 p(s',r|s,a)[r+\u03b3v(s')]; value iteration interleaves optimality backups with greedy policy extraction.",
    };
  }
  if (kind === "bandit") {
    return {
      easy: "Turn action scores into the next choice with greedy, epsilon-greedy, UCB, optimism, or softmax.",
      technical: "The behavior distribution is the exploration mechanism; regret/coverage depends on how scores, counts, bonuses, and preferences translate into action probabilities.",
    };
  }
  if (kind === "policyGradient") {
    return {
      easy: "There may be no separate greedy step; the policy parameters themselves are the behavior.",
      technical: "The control move is the parameter update \u03b8<-\u03b8+\u03b1\u005chat g, often with a critic/baseline; action probabilities change smoothly instead of via hard argmax.",
    };
  }
  if (kind === "planning") {
    return {
      easy: "Spend extra computation to improve the values or search policy before acting.",
      technical: "Control pressure comes from planning backups, rollout estimates, tree policy selection, priority ordering, or a final greedy/soft decision over planned values.",
    };
  }
  if (kind === "reward" || kind === "formulation") {
    return {
      easy: "The next algorithm inherits this choice; if the problem statement is wrong, all later control is wrong.",
      technical: "Behavior changes indirectly because the specified objective changes the optimality equations or the data distribution optimized by downstream algorithms.",
    };
  }
  return {
    easy: "Use the updated value, model, or parameters to make the next action slightly better or the next prediction more accurate.",
    technical: "Control is greedy/epsilon-greedy improvement, soft policy improvement, actor update, option selection, model-based planning, or a pure prediction output depending on the source cue.",
  };
}

function stabilityRequirement(kind: AlgorithmKind, text: string, chapter: number) {
  if (kind === "offPolicy") {
    return {
      short: "support coverage and controlled correction weights",
      easy: "Do not learn about actions the behavior policy never tries, and watch for giant correction ratios.",
      technical: "Require target-policy support under the behavior distribution; ordinary/weighted ratios, tree-backup expectations, gradient TD objectives, or emphatic weighting handle different parts of the mismatch.",
      proof: "Verify behavior probabilities are nonzero wherever the target can act, and log ratio/emphasis ranges.",
    };
  }
  if (kind === "approximation") {
    return {
      short: "feature conditioning plus on/off-policy stability contract",
      easy: "Shared weights can generalize helpfully or spread errors everywhere, so scale and coverage checks are mandatory.",
      technical: "Tabular contraction arguments may become projected fixed-point, semi-gradient, saddle-point, or empirical stability arguments; the deadly triad is the main warning sign.",
      proof: "Track weight norms, feature activations, target scale, and whether bootstrapping/off-policy/function approximation are combined without a stabilizer.",
    };
  }
  if (kind === "dynamicProgramming") {
    return {
      short: "known model and contraction/properness assumptions",
      easy: "The model must be the task you intend to solve; otherwise exact backups are exactly solving the wrong problem.",
      technical: "Discounted finite MDP evaluation uses Bellman contraction; undiscounted episodic cases need proper termination assumptions and stable sweep tolerances.",
      proof: "Confirm finite state/action coverage, model normalization, reward scale, gamma/properness, and monotone residual reduction.",
    };
  }
  if (kind === "policyGradient") {
    return {
      short: "unbiased score estimate and variance control",
      easy: "A noisy gradient can still point the right way on average, but only if the log-probability and baseline bookkeeping are right.",
      technical: "The policy-gradient theorem assumes differentiability, correct sampling distribution, valid baselines, and compatible critic logic when a critic replaces returns.",
      proof: "Check probability normalization, log-prob gradients, baseline independence from action, and actor/critic time-scale sanity.",
    };
  }
  if (kind === "planning") {
    return {
      short: "model bias and planning-budget accounting",
      easy: "More simulated practice helps only when the simulated world is useful enough.",
      technical: "Stability depends on model accuracy, search policy, stale priority handling, backup ordering, and not counting simulated samples as independent real evidence.",
      proof: "Compare planned targets against real transitions and log separate real-update vs planning-update error curves.",
    };
  }
  if (kind === "reward" || kind === "formulation") {
    return {
      short: "objective validity and invariance checks",
      easy: "The safest proof is a counterexample hunt: can the agent get high reward while doing the wrong thing?",
      technical: "For shaping, verify policy invariance conditions; for formulation, verify Markov state, action authority, reward timing, and termination/continuation semantics.",
      proof: "List at least three reward-hacking or non-Markov counterexamples before trusting downstream learning curves.",
    };
  }
  return {
    short: chapter <= 8 ? "tabular coverage and step-size assumptions" : "chapter-specific approximation and sampling assumptions",
    easy: "The update is only as trustworthy as its coverage, step-size, and episode/continuing bookkeeping.",
    technical: chapter <= 8
      ? "In tabular settings, use sufficient exploration/visitation and appropriate step-sizes; in continuing tasks, keep average-reward and discount semantics separate."
      : "In approximate settings, add feature conditioning, sampling distribution, and target-network/trace/off-policy safeguards as required by the method.",
    proof: "Run a tiny deterministic sanity case, a stochastic coverage case, and an episode-boundary/reset test before scaling.",
  };
}

function equationNotes(kind: AlgorithmKind, algorithm: AlgorithmDetail) {
  const given = algorithm.equations.length
    ? algorithm.equations.map((equation) => `Book/card equation to track: ${equation}`)
    : [`No standalone formula is listed for this card; track the procedural invariant in the core update: ${algorithm.coreUpdate}`];
  const kindNote: Record<AlgorithmKind, string> = {
    formulation: "Equation role: define variables and return semantics before substituting them into later Bellman or gradient equations.",
    bandit: "Equation role: the update is an incremental mean, constant-step tracker, confidence score, or preference-gradient step with no state transition recursion.",
    dynamicProgramming: "Equation role: every term inside the expectation is model-indexed; implementation bugs usually come from missing transition branches or wrong terminal handling.",
    monteCarlo: "Equation role: verify the return indexing and whether first-visit or every-visit samples are allowed to update the same state/action.",
    offPolicy: "Equation role: write behavior probability, target probability, ratio product, and corrected target on separate lines before coding.",
    td: "Equation role: separate prediction, bootstrap target, TD error, and assignment target; do not overwrite next-state values before reading them.",
    multiStep: "Equation role: check buffer indices, truncation at terminal states, and the equivalence between forward returns and backward traces.",
    planning: "Equation role: mark which terms come from the real environment and which come from the learned/given model or search tree.",
    approximation: "Equation role: distinguish the semi-gradient target from the gradient of the target; stop-gradient placement is the implementation version of this distinction.",
    policyGradient: "Equation role: keep log-policy gradient, return/advantage estimate, baseline, and discount/time weighting explicit.",
    option: "Equation role: include option termination and continuation terms; option boundaries change the time index of the backup.",
    reward: "Equation role: verify whether the transformation changes only learning speed or changes the optimal-policy ordering.",
    gvf: "Equation role: replace reward with cumulant and discount with continuation, then specify the policy under which the prediction is asked.",
    neuro: "Equation role: map prediction, outcome, and prediction error to observable behavioral/neural quantities without claiming stronger causality than the model supports.",
    application: "Equation role: identify which part is RL backup, supervised target, search target, or domain simulator; large systems often blend all four.",
    generic: "Equation role: name each random variable before substituting values; most RL derivation errors are off-by-one target mistakes.",
  };
  return [...given.slice(0, 2), kindNote[kind]];
}

function codingTrace(kind: AlgorithmKind, algorithm: AlgorithmDetail) {
  const base = [
    `Log the source cue (${algorithm.bookAnchor}) beside the implementation test so the code can be traced back to the chapter card.`,
    "For each update, print a one-row trace containing prediction_before, target, residual, step_size, and prediction_after.",
  ];
  if (kind === "offPolicy") base.push("Add behavior_prob, target_prob, rho, cumulative_rho, and any truncation/emphasis terms to the trace.");
  else if (kind === "policyGradient") base.push("Add log_prob, entropy/probability normalization, baseline, advantage_or_return, and actor step norm to the trace.");
  else if (kind === "planning") base.push("Tag every trace row as real, model, rollout, or search backup so simulated updates cannot hide model bias.");
  else if (kind === "multiStep") base.push("Include buffer index, n/lambda/sigma, terminal flag, and trace norm after every episode boundary.");
  else if (kind === "approximation") base.push("Include feature norm, weight norm, target scale, gradient norm, and replay/minibatch identity when applicable.");
  else base.push("Run a tiny hand-computed example and compare every intermediate scalar with the derivation block before scaling.");
  return base;
}

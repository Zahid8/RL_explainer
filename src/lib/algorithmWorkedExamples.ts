import type { AlgorithmDetail } from "@/lib/algorithmCatalog";

export interface AlgorithmWorkedExample {
  title: string;
  setup: string;
  easyWalkthrough: string;
  technicalWalkthrough: string;
  calculation: string[];
  implementationChecks: string[];
  debuggingProbe: string;
}

export function workedExampleForAlgorithm(algorithm: AlgorithmDetail): AlgorithmWorkedExample {
  const name = algorithm.name.toLowerCase();
  const text = `${algorithm.name} ${algorithm.family} ${algorithm.bookAnchor} ${algorithm.coreUpdate} ${algorithm.related.join(" ")}`.toLowerCase();

  if (text.includes("ucb") || text.includes("upper-confidence")) return ucbExample();
  if (text.includes("gradient bandit")) return gradientBanditExample();
  if (text.includes("bandit") || text.includes("optimistic") || text.includes("sample-average") || text.includes("constant-step")) return banditExample(algorithm.name);
  if (text.includes("policy iteration") || text.includes("value iteration") || text.includes("dynamic programming") || text.includes("bellman") || text.includes("policy improvement")) return dpExample(algorithm.name);
  if (text.includes("importance") || text.includes("off-policy mc") || text.includes("weighted")) return importanceExample(algorithm.name);
  if (text.includes("monte carlo") || text.includes("exploring starts") || text.includes("return construction")) return monteCarloExample(algorithm.name);
  if (text.includes("double q")) return doubleQExample();
  if (text.includes("expected sarsa") || text.includes("tree backup")) return expectedBackupExample(algorithm.name);
  if (text.includes("q-learning") || text.includes("dqn") || text.includes("deep q") || text.includes("target-network")) return qLearningExample(algorithm.name);
  if (text.includes("sarsa") || text.includes("td(0)") || text.includes("afterstate")) return tdControlExample(algorithm.name);
  if (text.includes("n-step") || text.includes("lambda") || text.includes("trace") || text.includes("eligibility") || text.includes("gtd") || text.includes("emphatic") || text.includes("htd")) return traceExample(algorithm.name);
  if (text.includes("dyna") || text.includes("planning") || text.includes("model") || text.includes("search") || text.includes("rollout") || text.includes("mcts")) return planningExample(algorithm.name);
  if (text.includes("function approximation") || text.includes("semi-gradient") || text.includes("linear") || text.includes("tile") || text.includes("least-squares") || text.includes("kernel") || text.includes("memory-based") || text.includes("fitted q")) return approximationExample(algorithm.name);
  if (text.includes("reinforce") || text.includes("policy-gradient") || text.includes("actor") || text.includes("critic") || text.includes("softmax") || text.includes("gaussian")) return policyGradientExample(algorithm.name);
  if (text.includes("option") || text.includes("smdp") || text.includes("hierarchical")) return optionExample(algorithm.name);
  if (text.includes("reward") || text.includes("shaping")) return rewardExample(algorithm.name);
  if (text.includes("general value") || text.includes("gvf")) return gvfExample();
  if (algorithm.chapter === 14 || algorithm.chapter === 15) return psychologyNeuroExample(algorithm.name);
  if (algorithm.chapter === 16) return applicationExample(algorithm.name);

  return genericExample(algorithm);
}

function banditExample(name: string): AlgorithmWorkedExample {
  return {
    title: "Worked bandit update microscope",
    setup: `${name}: suppose action A has estimate Q=1.20, count N=4, and the next reward is R=1.80.`,
    easyWalkthrough: "The arm did better than expected, so its score should move upward. A small step moves gently; a sample average moves by exactly the new sample's share.",
    technicalWalkthrough: "This is a one-state prediction problem. The target is the sampled reward, and the update is an incremental stochastic approximation step toward E[R|A].",
    calculation: [
      "sample-average step: alpha = 1/(N+1) = 0.20",
      "prediction error: R - Q = 1.80 - 1.20 = 0.60",
      "new estimate: Q <- 1.20 + 0.20 * 0.60 = 1.32",
      "constant alpha=0.10 would instead give Q <- 1.26 and retain more inertia",
    ],
    implementationChecks: [
      "Increment the action count after recording which alpha convention you use.",
      "Tie-breaking must be randomized if you want unbiased early exploration.",
      "For nonstationary bandits, prefer constant alpha and log reward drift over time.",
    ],
    debuggingProbe: "On a deterministic arm with reward 2, repeated updates should monotonically approach 2 without overshooting when alpha is in (0,1].",
  };
}

function ucbExample(): AlgorithmWorkedExample {
  return {
    title: "Worked UCB action-score microscope",
    setup: "At time t=100, action a has Q=1.0 and N=4, action b has Q=1.2 and N=25, with c=2.",
    easyWalkthrough: "UCB asks whether the less-tested action deserves another look. Even with a lower average, action a can win because its uncertainty bonus is larger.",
    technicalWalkthrough: "The action score adds an optimism bonus c sqrt(ln t / N(a)) to the current value estimate. The bonus shrinks as an action is sampled.",
    calculation: [
      "bonus(a) = 2 * sqrt(ln(100)/4) ~= 2.15, so score(a) ~= 3.15",
      "bonus(b) = 2 * sqrt(ln(100)/25) ~= 0.86, so score(b) ~= 2.06",
      "UCB chooses a even though Q(a) < Q(b), because a is under-sampled",
    ],
    implementationChecks: [
      "Handle N(a)=0 explicitly, usually by trying each action once before applying the formula.",
      "Scale c to the reward range; a huge c can explore forever.",
      "Use the global time count in the logarithm, not the action count again.",
    ],
    debuggingProbe: "If every action has equal Q, the action with the smallest count should have the largest UCB score.",
  };
}

function gradientBanditExample(): AlgorithmWorkedExample {
  return {
    title: "Worked preference-gradient microscope",
    setup: "Two actions have preferences H=[0,0], so pi=[0.5,0.5]. Action 1 is selected, reward R=2, baseline Rbar=1, alpha=0.1.",
    easyWalkthrough: "The chosen action did better than the baseline, so its preference rises and the unchosen action's preference falls a little through the softmax normalization.",
    technicalWalkthrough: "The update is stochastic gradient ascent on expected reward using the score-function gradient for a softmax policy over preferences.",
    calculation: [
      "advantage-like signal: R - Rbar = 1",
      "chosen action: H1 <- 0 + 0.1 * 1 * (1 - 0.5) = 0.05",
      "other action: H2 <- 0 - 0.1 * 1 * 0.5 = -0.05",
      "new softmax makes action 1 more likely than 0.5",
    ],
    implementationChecks: [
      "Update all action preferences, not just the chosen action.",
      "Compute probabilities from old preferences before applying the update.",
      "A reward baseline changes variance, not the expected gradient direction.",
    ],
    debuggingProbe: "With R equal to the baseline, every preference update should be zero.",
  };
}

function dpExample(name: string): AlgorithmWorkedExample {
  return {
    title: "Worked Bellman backup microscope",
    setup: `${name}: one action leads to s1 with probability 0.7 and reward 2, and to s2 with probability 0.3 and reward 0. Let gamma=0.9, V(s1)=5, V(s2)=1.`,
    easyWalkthrough: "Score the action by averaging each possible world response: immediate payoff plus the discounted value of where you land.",
    technicalWalkthrough: "A DP backup replaces samples with a full expectation over the known transition model p(s',r|s,a). Control variants then select or improve with the maximizing action.",
    calculation: [
      "branch 1 target = 2 + 0.9 * 5 = 6.5",
      "branch 2 target = 0 + 0.9 * 1 = 0.9",
      "expected backup = 0.7 * 6.5 + 0.3 * 0.9 = 4.82",
      "value iteration would compare this number with the same calculation for every action and take max",
    ],
    implementationChecks: [
      "Terminal successor values must be zero unless the task defines continuing terminal-like states.",
      "Policy evaluation averages over pi(a|s); value iteration maximizes over actions.",
      "In-place sweeps use some freshly updated values; synchronous sweeps use a copied old vector.",
    ],
    debuggingProbe: "In a one-state discounted MDP with reward r forever, value iteration should approach r/(1-gamma).",
  };
}

function monteCarloExample(name: string): AlgorithmWorkedExample {
  return {
    title: "Worked episode-return microscope",
    setup: `${name}: an episode produces rewards [0, 0, 1] with gamma=0.9.`,
    easyWalkthrough: "Monte Carlo waits until the outcome is known, then walks backward assigning the eventual payoff to earlier decisions.",
    technicalWalkthrough: "The target is a sampled return G_t, not a bootstrap. First-visit and every-visit variants differ only in which occurrences receive the return sample.",
    calculation: [
      "G_2 = 1",
      "G_1 = 0 + 0.9 * 1 = 0.9",
      "G_0 = 0 + 0.9 * 0.9 = 0.81",
      "an incremental update uses estimate <- estimate + alpha * (G_t - estimate)",
    ],
    implementationChecks: [
      "Compute returns backward to avoid repeatedly summing suffixes.",
      "For first-visit MC, check whether the state or state-action pair appeared earlier in the same episode.",
      "Do not bootstrap from V(S') inside a pure MC target.",
    ],
    debuggingProbe: "With gamma=1 and a terminal reward of 1, all earlier states in a reward-only-at-end episode should receive return 1.",
  };
}

function importanceExample(name: string): AlgorithmWorkedExample {
  return {
    title: "Worked importance-sampling microscope",
    setup: `${name}: target policy probability for a sampled action is 0.8 and behavior probability is 0.2 for two consecutive steps.`,
    easyWalkthrough: "The episode is four times more likely under the target at each step, so its evidence is amplified; this is powerful but can become noisy fast.",
    technicalWalkthrough: "Off-policy Monte Carlo multiplies target-over-behavior action probabilities. Weighted variants normalize cumulative weights to reduce variance at the cost of small bias.",
    calculation: [
      "single-step ratio rho = 0.8 / 0.2 = 4",
      "two-step trajectory ratio = 4 * 4 = 16",
      "ordinary IS target contribution = 16 * G",
      "weighted IS divides by cumulative weights C so one giant ratio cannot alone set the final scale",
    ],
    implementationChecks: [
      "Store behavior probabilities at data-collection time; do not recompute after the behavior policy changes.",
      "If b(a|s)=0 while pi(a|s)>0, coverage is violated and the estimate is invalid.",
      "Use logs or clipping diagnostics to find rare huge ratios.",
    ],
    debuggingProbe: "If target and behavior policies are identical, every ratio should be 1 and off-policy MC should match on-policy MC.",
  };
}

function tdControlExample(name: string): AlgorithmWorkedExample {
  return {
    title: "Worked one-step TD microscope",
    setup: `${name}: Q(S,A)=3.0, reward R=1, gamma=0.9, next sampled action value Q(S',A')=4.0, alpha=0.5.`,
    easyWalkthrough: "The update asks: reward now plus the next estimate says the action was worth 4.6, but we predicted 3.0, so move halfway upward.",
    technicalWalkthrough: "This is the sampled one-step bootstrapped target. For state-value TD use V(S'); for Sarsa use Q(S',A'); for afterstates use the value of the post-action state.",
    calculation: [
      "target = R + gamma * Q(S',A') = 1 + 0.9 * 4 = 4.6",
      "TD error delta = 4.6 - 3.0 = 1.6",
      "new Q = 3.0 + 0.5 * 1.6 = 3.8",
    ],
    implementationChecks: [
      "For Sarsa, sample A' before forming the target.",
      "Terminal next values should be zero.",
      "Log delta separately from the step-size-scaled update to catch reward-shift bugs.",
    ],
    debuggingProbe: "With alpha=1, the updated estimate should equal the one-step target exactly.",
  };
}

function qLearningExample(name: string): AlgorithmWorkedExample {
  return {
    title: "Worked max-backup microscope",
    setup: `${name}: Q(S,A)=3.0, reward R=1, gamma=0.9, next-state action values are [2,4,1], alpha=0.5.`,
    easyWalkthrough: "Even if the behavior explores, the target imagines the best next action. Here the best next estimate is 4.",
    technicalWalkthrough: "The off-policy control target uses max_a Q(S',a). Deep variants use the same target shape but approximate Q with networks and often stabilize it with replay or target networks.",
    calculation: [
      "max next value = 4",
      "target = 1 + 0.9 * 4 = 4.6",
      "delta = 4.6 - 3.0 = 1.6",
      "new Q = 3.8 with alpha=0.5",
    ],
    implementationChecks: [
      "Do not use the exploratory next action in the Q-learning target.",
      "Mask invalid actions before maxing.",
      "For target networks, ensure gradients do not flow into the target-network prediction.",
    ],
    debuggingProbe: "If all next action values are equal, Q-learning's target should match Expected Sarsa for any policy over those actions.",
  };
}

function doubleQExample(): AlgorithmWorkedExample {
  return {
    title: "Worked Double-Q microscope",
    setup: "Q1(S',.)=[2,5,4] and Q2(S',.)=[3,1,4]. Reward is 0 and gamma=1.",
    easyWalkthrough: "One table chooses the action it currently likes best; the other table judges that action. This avoids using the same noisy estimate twice.",
    technicalWalkthrough: "Double learning decouples argmax selection from value evaluation. A random choice decides which estimator is updated on each step.",
    calculation: [
      "if updating Q1, select argmax under Q1: action 2 with value 5",
      "evaluate selected action under Q2: Q2(S', action 2)=1",
      "target for Q1 is R + gamma * 1 = 1, not 5",
      "the reverse update would select under Q2 and evaluate under Q1",
    ],
    implementationChecks: [
      "Randomize which table receives the update.",
      "Selection and evaluation must use different estimators.",
      "Use Q1+Q2 or their average for behavior action selection.",
    ],
    debuggingProbe: "If selection and evaluation both read Q1, the implementation has collapsed back to ordinary Q-learning.",
  };
}

function expectedBackupExample(name: string): AlgorithmWorkedExample {
  return {
    title: "Worked expected-backup microscope",
    setup: `${name}: next action values are [2,4,6] and the policy probabilities are [0.2,0.5,0.3]. Reward is 1 and gamma=0.9.`,
    easyWalkthrough: "Instead of pretending one sampled next action is the whole story, average all next actions using the policy's probabilities.",
    technicalWalkthrough: "Expected Sarsa and tree-backup style targets replace part or all of a sampled action branch with an expectation under the target policy.",
    calculation: [
      "expected next value = 0.2*2 + 0.5*4 + 0.3*6 = 4.2",
      "target = 1 + 0.9 * 4.2 = 4.78",
      "a sampled Sarsa target would use only the sampled next action's value",
    ],
    implementationChecks: [
      "Probabilities must sum to one after tie handling and invalid-action masking.",
      "For epsilon-greedy expectations, include both greedy mass and epsilon/|A| mass.",
      "Tree-backup recursions must multiply continuation branches by policy probabilities.",
    ],
    debuggingProbe: "If the policy is deterministic, Expected Sarsa should reduce to Sarsa using that deterministic next action.",
  };
}

function traceExample(name: string): AlgorithmWorkedExample {
  return {
    title: "Worked trace-credit microscope",
    setup: `${name}: gamma=0.9, lambda=0.8. A feature was active one step ago with trace 1.0 and is not active now.`,
    easyWalkthrough: "The old feature still receives some blame, but less than before. The trace fades by gamma times lambda each step.",
    technicalWalkthrough: "Eligibility traces implement backward-view credit assignment. The trace vector determines which previous features receive the current TD error.",
    calculation: [
      "decay factor = gamma * lambda = 0.72",
      "old trace becomes 1.0 * 0.72 = 0.72",
      "if current TD error delta=2 and alpha=0.1, that old feature's weight increment is 0.1*2*0.72=0.144",
      "true-online variants add correction terms so this online backward view tracks the forward lambda-return more exactly",
    ],
    implementationChecks: [
      "Reset traces at episode boundaries.",
      "For replacing traces with binary features, cap active feature traces appropriately.",
      "For off-policy trace methods, apply ratio, cut, expectation, gradient, or emphasis logic exactly as specified.",
    ],
    debuggingProbe: "With lambda=0, the algorithm should reduce to the corresponding one-step method.",
  };
}

function planningExample(name: string): AlgorithmWorkedExample {
  return {
    title: "Worked planning-backup microscope",
    setup: `${name}: a learned model says action A in state S gives reward 1 and next state S'. Current max_a Q(S',a)=4, gamma=0.9, Q(S,A)=2, alpha=0.5.`,
    easyWalkthrough: "A simulated transition can train the value table exactly like a real transition, as long as the model is trusted.",
    technicalWalkthrough: "Planning methods use model-generated transitions or decision-time simulations to apply Bellman backups without additional real environment interaction.",
    calculation: [
      "model target = 1 + 0.9 * 4 = 4.6",
      "planning TD error = 4.6 - 2 = 2.6",
      "new Q(S,A) = 2 + 0.5 * 2.6 = 3.3",
      "prioritized sweeping would schedule predecessors whose targets changed most",
    ],
    implementationChecks: [
      "Keep model learning, planning selection, and value backup as separate testable modules.",
      "Compare a real transition update and a simulated transition update with the same tuple; they should match.",
      "Bound planning queues or tree expansion so decision time is predictable.",
    ],
    debuggingProbe: "If the model is perfect and planning budget is large, values should move toward the DP solution faster than direct learning alone.",
  };
}

function approximationExample(name: string): AlgorithmWorkedExample {
  return {
    title: "Worked function-approximation microscope",
    setup: `${name}: feature vector x=[1,0,2], weights w=[0.5,-1,0.25], target is 2.0, alpha=0.1.`,
    easyWalkthrough: "The prediction is a weighted sum of features. Only active features get credit for fixing the prediction error.",
    technicalWalkthrough: "For linear approximation, vhat(s,w)=w^T x(s). A semi-gradient update treats the target as fixed and moves weights by error times the feature vector.",
    calculation: [
      "prediction = 0.5*1 + (-1)*0 + 0.25*2 = 1.0",
      "error = target - prediction = 1.0",
      "weight change = alpha * error * x = [0.1, 0, 0.2]",
      "new weights = [0.6, -1, 0.45]",
    ],
    implementationChecks: [
      "Normalize or bound feature magnitudes before tuning alpha.",
      "For semi-gradient TD, do not differentiate through the bootstrapped target.",
      "Track weight norms and feature activation counts to detect divergence early.",
    ],
    debuggingProbe: "With one-hot features, linear semi-gradient updates should match the tabular update for the active state or action.",
  };
}

function policyGradientExample(name: string): AlgorithmWorkedExample {
  return {
    title: "Worked policy-gradient microscope",
    setup: `${name}: an action has log-probability gradient g=[0.3,-0.2], return or advantage estimate is 5, alpha=0.01.`,
    easyWalkthrough: "If the action worked better than expected, push the policy parameters in the direction that makes that action more likely next time.",
    technicalWalkthrough: "Score-function policy gradients multiply an objective sample, return, advantage, or TD error by grad log pi(A|S,theta). Baselines reduce variance when they do not depend on the action.",
    calculation: [
      "parameter step = alpha * signal * g",
      "delta theta = 0.01 * 5 * [0.3,-0.2] = [0.015,-0.010]",
      "with baseline b=3 and return G=5, signal becomes advantage 2 and the step is [0.006,-0.004]",
    ],
    implementationChecks: [
      "Differentiate log probability, not the sampled discrete action.",
      "Detach learned baselines from actor loss unless intentionally sharing gradients.",
      "Monitor entropy so the policy does not collapse before it has explored.",
    ],
    debuggingProbe: "If the advantage estimate is zero, the actor update should be zero even though the critic may still update.",
  };
}

function optionExample(name: string): AlgorithmWorkedExample {
  return {
    title: "Worked option-backup microscope",
    setup: `${name}: an option reaches S' with reward 1, gamma=0.9, Q(S',same option)=4, max next option value=6, termination beta(S')=0.25.`,
    easyWalkthrough: "If the option usually continues, value mostly comes from staying with it; if it terminates, value comes from choosing the best next option.",
    technicalWalkthrough: "Option backups blend continuation value and termination value. SMDP backups additionally discount across the option duration.",
    calculation: [
      "continuation mixture U = (1-0.25)*4 + 0.25*6 = 4.5",
      "one-step intra-option target = 1 + 0.9 * 4.5 = 5.05",
      "if the option lasted k primitive steps, an SMDP target would use gamma^k at termination",
    ],
    implementationChecks: [
      "Check initiation sets before allowing an option to be selected.",
      "Keep termination beta separate from the intra-option policy.",
      "For intra-option learning, update only options whose policies could explain the observed action.",
    ],
    debuggingProbe: "If beta=1 everywhere, the option backup should reduce to choosing among options after every primitive step.",
  };
}

function rewardExample(name: string): AlgorithmWorkedExample {
  return {
    title: "Worked shaping microscope",
    setup: `${name}: original reward R=0, gamma=0.9, potential Phi(S)=2 and Phi(S')=5.`,
    easyWalkthrough: "The shaping bonus says the next state looks closer to the goal, so the learner receives a temporary hint even before true reward arrives.",
    technicalWalkthrough: "Potential-based shaping adds gamma Phi(S') - Phi(S). Under the usual assumptions this changes learning speed without changing the optimal policy.",
    calculation: [
      "shaping F = 0.9 * 5 - 2 = 2.5",
      "shaped reward R' = 0 + 2.5 = 2.5",
      "if the move went backward to Phi(S')=1, F would be 0.9*1 - 2 = -1.1",
    ],
    implementationChecks: [
      "Keep original reward logs separate from shaped reward logs.",
      "Use the same gamma in shaping as in the learner's return objective.",
      "Handle terminal potentials deliberately, often with Phi(terminal)=0.",
    ],
    debuggingProbe: "Evaluate final policies on the original reward to detect accidental objective changes.",
  };
}

function gvfExample(): AlgorithmWorkedExample {
  return {
    title: "Worked GVF prediction microscope",
    setup: "A GVF asks: under policy pi, predict future battery drain cumulant with continuation discount gamma_t that stops at docking.",
    easyWalkthrough: "A GVF is a question the agent keeps answering about the future, not necessarily about reward.",
    technicalWalkthrough: "The value target is defined by a policy, cumulant, and continuation function. Standard prediction algorithms can then learn that question's answer.",
    calculation: [
      "question = policy pi + cumulant c_{t+1} + continuation gamma_{t+1}",
      "return = c_{t+1} + gamma_{t+1} c_{t+2} + gamma_{t+1} gamma_{t+2} c_{t+3} + ...",
      "TD target = c_{t+1} + gamma_{t+1} vhat(S_{t+1})",
    ],
    implementationChecks: [
      "Name each GVF question explicitly; do not hide cumulants inside reward variables.",
      "Continuation gamma can be state dependent and may terminate a prediction without ending the environment episode.",
      "Many GVFs can share features but should have separately logged targets/errors.",
    ],
    debuggingProbe: "A GVF with cumulant equal to reward and constant gamma should reproduce ordinary value prediction.",
  };
}

function psychologyNeuroExample(name: string): AlgorithmWorkedExample {
  return {
    title: "Worked prediction-error interpretation microscope",
    setup: `${name}: expected outcome value is 0.7, received outcome value is 1.0, alpha=0.2.`,
    easyWalkthrough: "The event was better than predicted, so the association or neural prediction signal strengthens.",
    technicalWalkthrough: "Psychology and neuroscience chapters map associative change or dopamine-like responses onto prediction-error learning, often TD-style rather than a new control objective.",
    calculation: [
      "prediction error = outcome - prediction = 1.0 - 0.7 = 0.3",
      "associative/value change = alpha * error = 0.06",
      "new prediction = 0.76 in a scalar Rescorla-Wagner-like case",
    ],
    implementationChecks: [
      "Keep explanatory model variables distinct from normative control variables.",
      "Plot error timing, not only cumulative reward.",
      "For conditioning models, verify omission trials create negative prediction errors.",
    ],
    debuggingProbe: "After learning perfectly predicted rewards, the error at reward delivery should approach zero.",
  };
}

function applicationExample(name: string): AlgorithmWorkedExample {
  return {
    title: "Worked application-system microscope",
    setup: `${name}: a deployed system wraps an RL update with representation, data collection, and decision constraints.`,
    easyWalkthrough: "The named application is not just an update rule; it is a full loop that decides what data arrives and how learned values are used.",
    technicalWalkthrough: "Application case studies combine core RL algorithms with function approximation, search, replay, self-play, offline data, or domain-specific simulators. The engineering wrapper is part of the algorithmic story.",
    calculation: [
      "define state/action/reward interface for the domain",
      "choose value, policy, model, search, or replay machinery",
      "train/update under the available data distribution",
      "evaluate with domain metrics and safety constraints, not only training return",
    ],
    implementationChecks: [
      "Log the behavior policy or data-collection process; many application failures are off-policy distribution failures.",
      "Separate training reward from deployment success metrics.",
      "Reproduce a tiny domain instance before scaling the representation.",
    ],
    debuggingProbe: "If a policy improves the training objective while harming the domain metric, the reward/interface definition is wrong or incomplete.",
  };
}

function genericExample(algorithm: AlgorithmDetail): AlgorithmWorkedExample {
  return {
    title: "Worked algorithm microscope",
    setup: `${algorithm.name}: instantiate the card by naming the prediction, target, error, step-size, and assignment of credit.`,
    easyWalkthrough: "Every RL method here changes a stored belief or policy after comparing what happened with what was expected or desired.",
    technicalWalkthrough: `The card's core update is: ${algorithm.coreUpdate}. Treat it as target construction plus an update operator over the stored object named by the family ${algorithm.family}.`,
    calculation: [
      "prediction <- current estimate for the active state/action/parameter",
      "target <- sampled return, Bellman target, model backup, or gradient signal",
      "error <- target - prediction, or gradient estimator for direct policy search",
      "parameters <- parameters + step-size * credit assignment term",
    ],
    implementationChecks: [
      "Run the algorithm on a one-state toy task before scaling up.",
      "Log prediction, target, error, and update norm at every step.",
      "Check terminal/continuing conventions against the chapter's assumptions.",
    ],
    debuggingProbe: "If the toy problem cannot be solved by hand and by code with matching numbers, the implementation is not ready for a larger environment.",
  };
}

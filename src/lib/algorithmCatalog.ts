export interface AlgorithmDetail {
  id: string;
  chapter: number;
  name: string;
  family: string;
  bookAnchor: string;
  plain: string;
  technical: string;
  objective: string;
  coreUpdate: string;
  steps: string[];
  pseudocode: string[];
  equations: string[];
  implementationNotes: string[];
  failureModes: string[];
  related: string[];
}

export const algorithmCatalog = [
  {
    "chapter": 1,
    "id": "ch1-1",
    "name": "Agent-environment problem formulation",
    "family": "RL problem setup",
    "bookAnchor": "Sections 1.1-1.4",
    "plain": "Before choosing an algorithm, draw the loop: what can act, what world answers, and what reward means success.",
    "technical": "Defines the decision boundary, action channel, observation/state information, reward signal, and long-run objective that every later algorithm assumes.",
    "objective": "Turn an informal sequential problem into an RL task.",
    "coreUpdate": "No numeric update; it is the modeling procedure that defines S, A, R, policy, and environment.",
    "steps": [
      "Separate agent-controlled decisions from environment dynamics.",
      "Name observations or states available at decision time.",
      "Define actions and rewards so expected return matches the real goal.",
      "Decide whether a model, simulator, or only experience will be available."
    ],
    "pseudocode": [
      "choose agent/environment boundary",
      "define state or observation signal",
      "define action set",
      "define reward and return objective",
      "only then choose an RL algorithm"
    ],
    "equations": [],
    "implementationNotes": [
      "Bad problem formulation cannot be rescued by a sophisticated update rule.",
      "This page treats formulation as the first algorithmic step."
    ],
    "failureModes": [
      "Reward proxies can produce unwanted optimized behavior.",
      "Partial observations can violate the intended Markov state assumption."
    ],
    "related": [
      "MDP dynamics",
      "reward design"
    ]
  },
  {
    "chapter": 1,
    "id": "ch1-2",
    "name": "Tic-tac-toe temporal-difference learner",
    "family": "Introductory TD control",
    "bookAnchor": "Section 1.5",
    "plain": "Score board positions by experience, then nudge earlier positions toward later positions after each move.",
    "technical": "The example informally introduces TD learning: value estimates for nonterminal positions are adjusted toward successor-position estimates, with terminal wins/losses/draws anchoring targets.",
    "objective": "Show how evaluative feedback can train a playing policy without labeled best moves.",
    "coreUpdate": "V(old position) <- V(old position) + alpha[V(new position) - V(old position)].",
    "steps": [
      "Initialize values for board positions.",
      "Choose moves using values plus occasional exploration.",
      "After a move, compare the old position value with the successor value.",
      "Move the old estimate partway toward the successor estimate."
    ],
    "pseudocode": [
      "initialize V(position)",
      "for each game:",
      "  choose moves from current values with exploration",
      "  after each transition old -> new:",
      "    V(old) <- V(old)+alpha*(V(new)-V(old))"
    ],
    "equations": [
      "V(S_t)\\leftarrow V(S_t)+\\alpha[V(S_{t+1})-V(S_t)]"
    ],
    "implementationNotes": [
      "The example foreshadows TD(0), afterstates, and self-play.",
      "Symmetries can reduce the number of distinct positions."
    ],
    "failureModes": [
      "Pure greedy play may stop discovering better lines.",
      "Updating only terminal outcomes slows temporal credit assignment."
    ],
    "related": [
      "TD(0) prediction",
      "afterstate TD control"
    ]
  },
  {
    "chapter": 2,
    "id": "ch2-1",
    "name": "Sample-average action-value estimation",
    "family": "Bandit estimation",
    "bookAnchor": "Sections 2.2 and 2.4",
    "plain": "Estimate each action by the average reward observed after choosing it.",
    "technical": "Maintains an empirical estimate Q(a) of q_*(a) using an incremental mean, giving equal weight to all rewards in a stationary problem.",
    "objective": "Estimate stationary action values with low memory.",
    "coreUpdate": "Q <- Q + (1/N)(R - Q).",
    "steps": [
      "Keep one count and one estimate per action.",
      "After selecting an action, increment only that action count.",
      "Move the estimate toward the received reward by one over the count."
    ],
    "pseudocode": [
      "initialize Q(a), N(a)=0",
      "choose action A",
      "observe reward R",
      "N(A) <- N(A)+1",
      "Q(A) <- Q(A)+(R-Q(A))/N(A)"
    ],
    "equations": [
      "Q_{n+1}=Q_n+\\frac{1}{n}(R_n-Q_n)"
    ],
    "implementationNotes": [
      "Use when the reward distribution is approximately stationary.",
      "This is the template for later incremental prediction updates."
    ],
    "failureModes": [
      "Adapts slowly if action values drift.",
      "Early unlucky rewards can mislead greedy action selection."
    ],
    "related": [
      "constant step-size",
      "epsilon-greedy"
    ]
  },
  {
    "chapter": 2,
    "id": "ch2-2",
    "name": "Constant-step-size action-value tracking",
    "family": "Bandit estimation",
    "bookAnchor": "Section 2.5",
    "plain": "Keep adapting forever by giving each new reward a fixed influence.",
    "technical": "Replaces the sample-average 1/n gain with alpha, producing an exponential recency-weighted estimate suitable for nonstationarity.",
    "objective": "Track drifting action values.",
    "coreUpdate": "Q <- Q + alpha(R - Q).",
    "steps": [
      "Pick a step-size alpha.",
      "Update the chosen action estimate toward reward.",
      "Let old rewards decay geometrically through repeated updates."
    ],
    "pseudocode": [
      "initialize Q(a)",
      "choose A",
      "observe R",
      "Q(A) <- Q(A)+alpha*(R-Q(A))"
    ],
    "equations": [
      "Q_{n+1}=Q_n+\\alpha(R_n-Q_n)"
    ],
    "implementationNotes": [
      "Alpha controls reactivity versus noise.",
      "Useful whenever the environment is changing."
    ],
    "failureModes": [
      "Too-small alpha lags behind drift.",
      "Too-large alpha chases noise."
    ],
    "related": [
      "sample-average",
      "unbiased constant step-size"
    ]
  },
  {
    "chapter": 2,
    "id": "ch2-3",
    "name": "epsilon-greedy action selection",
    "family": "Bandit exploration",
    "bookAnchor": "Section 2.2",
    "plain": "Usually take the best-known action, but sometimes try a random action.",
    "technical": "A simple behavior policy that chooses argmax Q with probability 1-epsilon and otherwise samples actions uniformly, guaranteeing continued exploration.",
    "objective": "Balance exploitation with undirected exploration.",
    "coreUpdate": "A <- argmax Q with probability 1-epsilon else random action.",
    "steps": [
      "Estimate action values.",
      "Flip an exploration coin.",
      "Exploit the current greedy action or explore uniformly."
    ],
    "pseudocode": [
      "if rand() < epsilon: A <- random action",
      "else: A <- argmax_a Q(a)",
      "observe R and update Q(A)"
    ],
    "equations": [],
    "implementationNotes": [
      "Counts as on-policy if learning evaluates the epsilon-greedy policy itself.",
      "Undirected exploration can waste samples on known bad actions."
    ],
    "failureModes": [
      "Can keep exploring forever even after the best action is obvious."
    ],
    "related": [
      "UCB",
      "optimistic initialization"
    ]
  },
  {
    "chapter": 2,
    "id": "ch2-4",
    "name": "Optimistic initial values",
    "family": "Bandit exploration",
    "bookAnchor": "Section 2.6",
    "plain": "Start every action with a value that is too high so the agent wants to try them.",
    "technical": "Initial value bias creates temporary exploration pressure because untried actions look better than tried-and-disappointed ones.",
    "objective": "Encourage early exploration without a random exploration parameter.",
    "coreUpdate": "Initialize Q_0(a) above plausible rewards.",
    "steps": [
      "Set Q(a) optimistically.",
      "Act greedily with respect to Q.",
      "Let observed rewards correct each action downward or upward."
    ],
    "pseudocode": [
      "for each action a: Q(a) <- high optimistic value",
      "repeat: choose argmax Q(a); observe R; update Q(a)"
    ],
    "equations": [],
    "implementationNotes": [
      "Best suited to stationary problems where early exploration is enough.",
      "The exploration drive disappears once estimates settle."
    ],
    "failureModes": [
      "Poor for nonstationary tasks unless optimism is reintroduced."
    ],
    "related": [
      "epsilon-greedy",
      "UCB"
    ]
  },
  {
    "chapter": 2,
    "id": "ch2-5",
    "name": "Upper-confidence-bound action selection",
    "family": "Bandit exploration",
    "bookAnchor": "Section 2.7",
    "plain": "Pick actions by combining how good they look with how uncertain they still are.",
    "technical": "Adds a confidence bonus to each estimated action value; actions with fewer selections receive larger bonuses.",
    "objective": "Explore uncertain actions deliberately.",
    "coreUpdate": "A_t = argmax_a [Q_t(a)+c sqrt(ln t / N_t(a))].",
    "steps": [
      "Try each action at least once.",
      "Compute exploitation score Q(a).",
      "Add uncertainty bonus from count and time.",
      "Choose the largest combined score."
    ],
    "pseudocode": [
      "for each action compute bonus c*sqrt(log(t)/N(a))",
      "A <- argmax_a Q(a)+bonus(a)",
      "observe R and update Q(A), N(A)"
    ],
    "equations": [
      "A_t=\\arg\\max_a\\left(Q_t(a)+c\\sqrt{\\frac{\\ln t}{N_t(a)}}\\right)"
    ],
    "implementationNotes": [
      "The exploration coefficient c tunes optimism under uncertainty."
    ],
    "failureModes": [
      "The standard form is less directly suited to nonstationary tasks without modification."
    ],
    "related": [
      "epsilon-greedy",
      "optimistic initialization"
    ]
  },
  {
    "chapter": 2,
    "id": "ch2-6",
    "name": "Gradient bandit algorithm",
    "family": "Policy preference method",
    "bookAnchor": "Section 2.8",
    "plain": "Learn action preferences directly: reward above baseline increases the chosen action probability.",
    "technical": "Maintains preferences H(a), turns them into softmax probabilities, and updates preferences in the policy-gradient direction using reward minus baseline.",
    "objective": "Optimize expected reward without estimating action values explicitly.",
    "coreUpdate": "H(a) adjusted by alpha(R-baseline)(1-pi(a)) for chosen action and -alpha(R-baseline)pi(a) for others.",
    "steps": [
      "Compute softmax probabilities from preferences.",
      "Sample an action.",
      "Compare reward with a baseline.",
      "Raise selected preference if reward is better than baseline; lower it otherwise."
    ],
    "pseudocode": [
      "pi(a) <- softmax(H(a))",
      "sample A ~ pi",
      "observe R",
      "B <- average reward baseline",
      "for all a update H(a) using R-B and indicator(a=A)"
    ],
    "equations": [
      "\\pi_t(a)=\\frac{e^{H_t(a)}}{\\sum_b e^{H_t(b)}}"
    ],
    "implementationNotes": [
      "The average reward baseline reduces variance but is not an action value."
    ],
    "failureModes": [
      "Large preference step-sizes can make the policy collapse too early."
    ],
    "related": [
      "policy gradient",
      "REINFORCE"
    ]
  },
  {
    "chapter": 2,
    "id": "ch2-7",
    "name": "Associative search / contextual bandits",
    "family": "Bandit with state",
    "bookAnchor": "Section 2.9",
    "plain": "Choose bandit actions conditional on a situation or context.",
    "technical": "Extends bandit learning from one stationary action set to multiple situations, foreshadowing full MDP state-conditioned policies without delayed consequences.",
    "objective": "Learn action preferences or values conditioned on context.",
    "coreUpdate": "Update the estimate or preference for the observed context-action pair.",
    "steps": [
      "Observe a context.",
      "Select an action using a bandit rule for that context.",
      "Receive immediate reward.",
      "Update only the context-action statistics."
    ],
    "pseudocode": [
      "observe context S",
      "choose A from policy conditioned on S",
      "observe immediate R",
      "update Q(S,A) or H(S,A)"
    ],
    "equations": [],
    "implementationNotes": [
      "Useful bridge from bandits to MDPs."
    ],
    "failureModes": [
      "No temporal credit assignment; next state dynamics are not part of the target."
    ],
    "related": [
      "MDP control",
      "policy approximation"
    ]
  },
  {
    "chapter": 3,
    "id": "ch3-1",
    "name": "Return construction",
    "family": "MDP evaluation primitive",
    "bookAnchor": "Sections 3.3-3.4",
    "plain": "Turn a stream of rewards into the one number the agent is trying to make large.",
    "technical": "Computes episodic or continuing discounted returns so value functions can be defined as conditional expectations of future reward sequences.",
    "objective": "Define the target quantity for prediction and control.",
    "coreUpdate": "G_t = R_{t+1} + gamma G_{t+1}, with terminal handling for episodic tasks.",
    "steps": [
      "Choose episodic or continuing notation.",
      "List rewards after the decision time.",
      "Discount later rewards by powers of gamma.",
      "Use the resulting scalar as the target for value prediction."
    ],
    "pseudocode": [
      "G <- 0",
      "for rewards backward from terminal time:",
      "  G <- R_next + gamma*G",
      "  assign G to the earlier time"
    ],
    "equations": [
      "G_t=R_{t+1}+\gamma R_{t+2}+\gamma^2R_{t+3}+\cdots"
    ],
    "implementationNotes": [
      "Backward computation is convenient for complete episodes.",
      "Continuing tasks may later use average reward instead of discounted return."
    ],
    "failureModes": [
      "Changing gamma changes the task objective, not just numerical scaling.",
      "Mixing reward and return causes credit-assignment mistakes."
    ],
    "related": [
      "Monte Carlo prediction",
      "average reward estimation"
    ]
  },
  {
    "chapter": 3,
    "id": "ch3-2",
    "name": "Bellman expectation backup",
    "family": "MDP backup operator",
    "bookAnchor": "Section 3.5",
    "plain": "A state value is immediate reward plus the value of where the policy tends to go next.",
    "technical": "Defines the recursive expectation operator for a fixed policy using action probabilities and transition/reward dynamics.",
    "objective": "Express policy evaluation as a recursive backup.",
    "coreUpdate": "v_pi(s) = sum_a pi(a|s) sum_{s',r} p(s',r|s,a)[r+gamma v_pi(s')].",
    "steps": [
      "Condition on the current state.",
      "Average over the policy's action distribution.",
      "Average over model outcomes for each action.",
      "Add immediate reward to discounted successor value."
    ],
    "pseudocode": [
      "for each state s:",
      "  target <- 0",
      "  for action a weighted by pi(a|s):",
      "    for model outcome s_next,r:",
      "      target += prob*(r+gamma*V(s_next))"
    ],
    "equations": [
      "v_\pi(s)=\sum_a\pi(a|s)\sum_{s',r}p(s',r|s,a)[r+\gamma v_\pi(s')]"
    ],
    "implementationNotes": [
      "This is the mathematical source of iterative policy evaluation.",
      "A sampled version becomes TD-style learning."
    ],
    "failureModes": [
      "Requires a Markov state representation for exact interpretation.",
      "Expected backups can be expensive when branching is high."
    ],
    "related": [
      "Iterative policy evaluation",
      "TD(0) prediction"
    ]
  },
  {
    "chapter": 3,
    "id": "ch3-3",
    "name": "Bellman optimality backup",
    "family": "MDP optimal-control operator",
    "bookAnchor": "Section 3.6",
    "plain": "For each state, look one step ahead and choose the action with the best reward-plus-future-value.",
    "technical": "Replaces policy averaging with maximization, defining the fixed point targeted by exact dynamic programming and approximated by many control algorithms.",
    "objective": "Define optimal values and greedy optimal policies.",
    "coreUpdate": "v_*(s) = max_a sum_{s',r} p(s',r|s,a)[r+gamma v_*(s')].",
    "steps": [
      "For each action, compute expected immediate reward plus discounted optimal successor value.",
      "Take the maximum over actions.",
      "Use greedy actions as the candidate optimal policy.",
      "Repeat as a backup operator when solving."
    ],
    "pseudocode": [
      "for each state s:",
      "  for each action a: score(a) <- expected reward plus successor value",
      "  V(s) <- max_a score(a)",
      "  pi(s) <- argmax_a score(a)"
    ],
    "equations": [
      "v_*(s)=\max_a\sum_{s',r}p(s',r|s,a)[r+\gamma v_*(s')]"
    ],
    "implementationNotes": [
      "Value iteration is the direct algorithmic form.",
      "Q-learning is a sampled action-value analogue."
    ],
    "failureModes": [
      "Exact optimality may be unreachable under approximation.",
      "Noisy max estimates can create overestimation bias in sampled methods."
    ],
    "related": [
      "Value iteration",
      "Q-learning"
    ]
  },
  {
    "chapter": 4,
    "id": "ch4-1",
    "name": "Iterative policy evaluation",
    "family": "Dynamic programming",
    "bookAnchor": "Section 4.1",
    "plain": "Given a policy and a model, repeatedly recompute each state value from one-step lookahead.",
    "technical": "Applies the Bellman expectation backup until the value table approximates v_pi.",
    "objective": "Evaluate a fixed policy exactly in a tabular known-model setting.",
    "coreUpdate": "v_{k+1}(s) <- sum_a pi(a|s) sum_{s,r} p(s,r|s,a)[r+gamma v_k(s)].",
    "steps": [
      "Fix the policy.",
      "Sweep through states.",
      "Use the model to average reward plus successor value.",
      "Repeat until changes are small."
    ],
    "pseudocode": [
      "initialize V(s)",
      "repeat until stable:",
      "  for each state s:",
      "    V(s) <- expected backup under pi and model"
    ],
    "equations": [
      "v_{k+1}(s)=\\sum_a\\pi(a|s)\\sum_{s',r}p(s',r|s,a)[r+\\gamma v_k(s')]"
    ],
    "implementationNotes": [
      "Can be synchronous or in-place.",
      "The model cost scales with successors per action."
    ],
    "failureModes": [
      "Requires known dynamics.",
      "Full sweeps become expensive in large state spaces."
    ],
    "related": [
      "policy iteration",
      "GPI"
    ]
  },
  {
    "chapter": 4,
    "id": "ch4-2",
    "name": "Policy improvement",
    "family": "Dynamic programming",
    "bookAnchor": "Section 4.2",
    "plain": "Make the policy greedy with respect to the values you just estimated.",
    "technical": "Uses q_pi derived from v_pi and the model; the policy-improvement theorem justifies replacing actions that look better.",
    "objective": "Turn evaluation into control.",
    "coreUpdate": "pi_new(s) <- argmax_a q_pi(s,a).",
    "steps": [
      "Evaluate current policy.",
      "Compute one-step action lookahead.",
      "Choose greedy action(s).",
      "Check whether policy changed."
    ],
    "pseudocode": [
      "for each state s:",
      "  pi_old <- pi(s)",
      "  pi(s) <- argmax_a expected_one_step_return(s,a,V)",
      "stable <- stable and pi(s)==pi_old"
    ],
    "equations": [
      "\\pi'(s)=\\arg\\max_a q_\\pi(s,a)"
    ],
    "implementationNotes": [
      "Tie handling matters for termination."
    ],
    "failureModes": [
      "If values are inaccurate, approximate improvement can be nonmonotonic."
    ],
    "related": [
      "policy iteration",
      "value iteration"
    ]
  },
  {
    "chapter": 4,
    "id": "ch4-3",
    "name": "Policy iteration",
    "family": "Dynamic programming",
    "bookAnchor": "Section 4.3",
    "plain": "Alternate evaluating a policy and making it greedy until it stops changing.",
    "technical": "A complete generalized-policy-iteration instance with exact tabular policy evaluation and greedy improvement.",
    "objective": "Find an optimal policy with a known model.",
    "coreUpdate": "repeat policy evaluation then policy improvement.",
    "steps": [
      "Start with any policy.",
      "Evaluate it to convergence or sufficient accuracy.",
      "Improve greedily.",
      "Stop when the policy is stable."
    ],
    "pseudocode": [
      "initialize pi",
      "loop:",
      "  evaluate V_pi",
      "  policyStable <- improve pi greedily wrt V",
      "  if policyStable break"
    ],
    "equations": [],
    "implementationNotes": [
      "Exact policy iteration can use full evaluation or truncated evaluation."
    ],
    "failureModes": [
      "Full evaluation may be overkill when improvement will soon change the policy."
    ],
    "related": [
      "value iteration",
      "modified policy iteration"
    ]
  },
  {
    "chapter": 4,
    "id": "ch4-4",
    "name": "Value iteration",
    "family": "Dynamic programming",
    "bookAnchor": "Section 4.4",
    "plain": "Use optimal backups directly instead of fully evaluating each intermediate policy.",
    "technical": "Combines truncated policy evaluation with greedy improvement through repeated Bellman optimality backups.",
    "objective": "Compute optimal values and a greedy optimal policy.",
    "coreUpdate": "v(s) <- max_a sum p(r+s) [r+gamma v(s’)].",
    "steps": [
      "Initialize values.",
      "Apply max-backup to every state.",
      "Repeat until value changes are small.",
      "Extract greedy policy from final values."
    ],
    "pseudocode": [
      "initialize V",
      "repeat until stable:",
      "  for each s: V(s) <- max_a expected_return(s,a,V)",
      "pi(s) <- greedy action under V"
    ],
    "equations": [
      "v_{k+1}(s)=\\max_a\\sum_{s',r}p(s',r|s,a)[r+\\gamma v_k(s')]"
    ],
    "implementationNotes": [
      "Often faster than exact policy iteration for small tabular tasks."
    ],
    "failureModes": [
      "Still model-based and tabular; max backups can be expensive."
    ],
    "related": [
      "policy iteration",
      "Q-learning"
    ]
  },
  {
    "chapter": 4,
    "id": "ch4-5",
    "name": "Asynchronous dynamic programming",
    "family": "Dynamic programming",
    "bookAnchor": "Section 4.5",
    "plain": "Update states in any useful order rather than sweeping every state together.",
    "technical": "Uses in-place Bellman backups over selected states, requiring continuing coverage of relevant states for convergence.",
    "objective": "Save computation and focus updates.",
    "coreUpdate": "Apply Bellman backups to selected states.",
    "steps": [
      "Pick a state ordering or priority.",
      "Update one or a batch of states in place.",
      "Use updated values immediately.",
      "Ensure no important state is ignored forever."
    ],
    "pseudocode": [
      "while not done:",
      "  choose state s",
      "  V(s) <- Bellman backup using current V"
    ],
    "equations": [],
    "implementationNotes": [
      "Connects to prioritized sweeping and real-time dynamic programming."
    ],
    "failureModes": [
      "Bad update ordering can waste computation or delay convergence."
    ],
    "related": [
      "prioritized sweeping",
      "RTDP"
    ]
  },
  {
    "chapter": 4,
    "id": "ch4-6",
    "name": "Generalized policy iteration",
    "family": "Control pattern",
    "bookAnchor": "Section 4.6",
    "plain": "One process evaluates the policy; another improves it; they push each other toward better behavior.",
    "technical": "Abstracts evaluation and improvement so later MC, TD, approximation, and planning algorithms can be seen as interleavings of the same two pressures.",
    "objective": "Understand the shared skeleton of control algorithms.",
    "coreUpdate": "Evaluation update + improvement update interleaved.",
    "steps": [
      "Maintain value estimates.",
      "Use them to make policy more greedy.",
      "Use policy-generated data or model backups to improve estimates.",
      "Repeat continuously."
    ],
    "pseudocode": [
      "loop:",
      "  update value estimate toward current policy",
      "  update policy toward greediness wrt value"
    ],
    "equations": [],
    "implementationNotes": [
      "This is a conceptual algorithmic pattern, not only a DP procedure."
    ],
    "failureModes": [
      "Mistaking approximate GPI for guaranteed monotonic exact improvement."
    ],
    "related": [
      "Sarsa",
      "Monte Carlo control",
      "actor-critic"
    ]
  },
  {
    "chapter": 5,
    "id": "ch5-1",
    "name": "First-visit Monte Carlo prediction",
    "family": "Monte Carlo",
    "bookAnchor": "Section 5.1",
    "plain": "Wait until an episode ends, then average returns after the first visit to each state.",
    "technical": "Estimates v_pi(s) from complete sampled returns without bootstrapping or a model.",
    "objective": "Evaluate an episodic policy from sampled episodes.",
    "coreUpdate": "V(s) <- average of first-visit returns G_t.",
    "steps": [
      "Generate an episode under pi.",
      "For each state, find its first visit.",
      "Compute the return from that time.",
      "Add it to the state average."
    ],
    "pseudocode": [
      "generate episode",
      "for each first visit to s:",
      "  G <- return after visit",
      "  append G to Returns(s)",
      "  V(s) <- average(Returns(s))"
    ],
    "equations": [
      "V(S_t)\\leftarrow V(S_t)+\\alpha(G_t-V(S_t))"
    ],
    "implementationNotes": [
      "Every-visit MC is a close variant."
    ],
    "failureModes": [
      "Requires episodic returns or a defined cutoff.",
      "Can have high variance for long episodes."
    ],
    "related": [
      "TD(0)",
      "every-visit MC"
    ]
  },
  {
    "chapter": 5,
    "id": "ch5-2",
    "name": "Every-visit Monte Carlo prediction",
    "family": "Monte Carlo",
    "bookAnchor": "Section 5.1",
    "plain": "Use every occurrence of a state in an episode as a training sample.",
    "technical": "Averages returns following all visits; asymptotically similar to first-visit in many settings but with different sample dependence.",
    "objective": "Evaluate a policy using all observed visits.",
    "coreUpdate": "V(s) <- average of every-visit returns.",
    "steps": [
      "Generate an episode.",
      "For every time a state appears, compute return.",
      "Update that state estimate."
    ],
    "pseudocode": [
      "generate episode",
      "for each time t:",
      "  G <- return from t",
      "  update V(S_t) toward G"
    ],
    "equations": [],
    "implementationNotes": [
      "Often simple to implement incrementally."
    ],
    "failureModes": [
      "Multiple visits within an episode are correlated."
    ],
    "related": [
      "first-visit MC"
    ]
  },
  {
    "chapter": 5,
    "id": "ch5-3",
    "name": "Monte Carlo exploring starts control",
    "family": "Monte Carlo control",
    "bookAnchor": "Section 5.3",
    "plain": "Force starts to cover every state-action pair, then learn greedy action values from returns.",
    "technical": "Combines MC action-value estimation with greedy policy improvement under an exploring-starts coverage assumption.",
    "objective": "Find an optimal policy without a model in episodic tabular tasks.",
    "coreUpdate": "Q(s,a) <- average returns; pi(s) <- argmax_a Q(s,a).",
    "steps": [
      "Start episodes from varied state-action pairs.",
      "Generate an episode following current policy.",
      "Update Q for visited state-actions from complete returns.",
      "Improve policy greedily."
    ],
    "pseudocode": [
      "initialize Q, pi",
      "loop:",
      "  choose exploring start S0,A0",
      "  generate episode",
      "  update Q from first visits",
      "  pi(s) <- argmax_a Q(s,a)"
    ],
    "equations": [],
    "implementationNotes": [
      "Exploring starts are often unrealistic but conceptually clean."
    ],
    "failureModes": [
      "No exploring starts means coverage must be maintained another way."
    ],
    "related": [
      "epsilon-soft MC control"
    ]
  },
  {
    "chapter": 5,
    "id": "ch5-4",
    "name": "On-policy epsilon-soft Monte Carlo control",
    "family": "Monte Carlo control",
    "bookAnchor": "Section 5.4",
    "plain": "Keep the policy exploratory while gradually making high-value actions more likely.",
    "technical": "Uses epsilon-soft policies to preserve coverage while evaluating and improving the same behavior policy.",
    "objective": "Control without exploring starts.",
    "coreUpdate": "pi(a|s)=epsilon/|A| plus 1-epsilon on greedy action.",
    "steps": [
      "Generate episodes with the current epsilon-soft policy.",
      "Update action-value estimates from returns.",
      "Make policy epsilon-greedy with respect to Q."
    ],
    "pseudocode": [
      "initialize epsilon-soft pi",
      "loop episodes:",
      "  generate episode under pi",
      "  update Q from returns",
      "  pi <- epsilon-greedy(Q)"
    ],
    "equations": [],
    "implementationNotes": [
      "On-policy because the learned policy is also the behavior policy."
    ],
    "failureModes": [
      "Continued exploration caps final determinism unless epsilon decays."
    ],
    "related": [
      "Sarsa",
      "MC ES"
    ]
  },
  {
    "chapter": 5,
    "id": "ch5-5",
    "name": "Off-policy Monte Carlo prediction with ordinary importance sampling",
    "family": "Off-policy MC",
    "bookAnchor": "Section 5.5",
    "plain": "Evaluate a target policy using episodes produced by a different behavior policy.",
    "technical": "Weights returns by products of target-probability over behavior-probability ratios to correct the sampling distribution.",
    "objective": "Estimate v_pi or q_pi from off-policy data.",
    "coreUpdate": "V <- average of rho G.",
    "steps": [
      "Generate data under behavior b.",
      "Compute trajectory importance ratio for target pi.",
      "Multiply return by ratio.",
      "Average weighted returns."
    ],
    "pseudocode": [
      "for each episode from b:",
      "  for each relevant time t:",
      "    rho <- product pi(A|S)/b(A|S)",
      "    update estimate with rho*G"
    ],
    "equations": [
      "\\rho_{t:T-1}=\\prod_{k=t}^{T-1}\\frac{\\pi(A_k|S_k)}{b(A_k|S_k)}"
    ],
    "implementationNotes": [
      "Ordinary IS is unbiased under coverage conditions."
    ],
    "failureModes": [
      "Variance can be enormous or infinite in some tasks."
    ],
    "related": [
      "weighted importance sampling",
      "per-decision IS"
    ]
  },
  {
    "chapter": 5,
    "id": "ch5-6",
    "name": "Weighted importance-sampling Monte Carlo prediction",
    "family": "Off-policy MC",
    "bookAnchor": "Section 5.5",
    "plain": "Normalize importance-weighted returns so rare huge weights dominate less.",
    "technical": "Forms a ratio of weighted return sums to weight sums, often lowering variance at the cost of finite-sample bias.",
    "objective": "Make off-policy MC prediction more numerically stable.",
    "coreUpdate": "V <- sum rho G / sum rho.",
    "steps": [
      "Accumulate weighted return numerator.",
      "Accumulate importance weight denominator.",
      "Return their ratio."
    ],
    "pseudocode": [
      "C(s) <- C(s)+rho",
      "V(s) <- V(s)+(rho/C(s))*(G-V(s))"
    ],
    "equations": [
      "V(s)=\\frac{\\sum_i \\rho_i G_i}{\\sum_i \\rho_i}"
    ],
    "implementationNotes": [
      "The incremental form is important for memory efficiency."
    ],
    "failureModes": [
      "If weights are zero, no target-policy evidence was present."
    ],
    "related": [
      "ordinary IS",
      "incremental weighted IS"
    ]
  },
  {
    "chapter": 5,
    "id": "ch5-7",
    "name": "Incremental weighted off-policy Monte Carlo",
    "family": "Off-policy MC",
    "bookAnchor": "Section 5.6",
    "plain": "Update a weighted off-policy estimate online across episodes without storing all returns.",
    "technical": "Maintains cumulative weights C and performs a weighted incremental update for action values or state values.",
    "objective": "Implement weighted IS efficiently.",
    "coreUpdate": "Q <- Q + (W/C)(G-Q).",
    "steps": [
      "Process an episode backward.",
      "Update cumulative weight for each state-action.",
      "Move estimate by normalized weight.",
      "Stop when target policy would not choose the sampled action in deterministic-control cases."
    ],
    "pseudocode": [
      "G <- 0; W <- 1",
      "for t from T-1 downto 0:",
      "  G <- gamma*G + R_{t+1}",
      "  C(S_t,A_t)+=W",
      "  Q += (W/C)*(G-Q)",
      "  W *= pi(A_t|S_t)/b(A_t|S_t)"
    ],
    "equations": [
      "Q\\leftarrow Q+\\frac{W}{C}(G-Q)"
    ],
    "implementationNotes": [
      "Backward processing is natural because returns are known from the end."
    ],
    "failureModes": [
      "Late zero ratios can erase earlier credit in deterministic target-policy control."
    ],
    "related": [
      "off-policy MC control"
    ]
  },
  {
    "chapter": 5,
    "id": "ch5-8",
    "name": "Off-policy Monte Carlo control",
    "family": "Off-policy MC control",
    "bookAnchor": "Section 5.7",
    "plain": "Explore with one policy while improving a greedy target policy.",
    "technical": "Uses weighted importance sampling to estimate action values for the target policy while behavior remains exploratory.",
    "objective": "Learn a greedy target policy from exploratory episodes.",
    "coreUpdate": "Q updated by weighted IS; pi(s)=argmax_a Q(s,a).",
    "steps": [
      "Generate an episode under behavior b.",
      "Walk backward through the episode.",
      "Update Q with weighted return.",
      "Improve target policy greedily.",
      "Stop backup when action disagrees with deterministic target."
    ],
    "pseudocode": [
      "initialize Q, target pi, behavior b",
      "loop episodes from b:",
      "  update Q backward with W",
      "  pi(S_t) <- argmax_a Q(S_t,a)",
      "  if A_t != pi(S_t) break"
    ],
    "equations": [],
    "implementationNotes": [
      "Behavior must cover target actions."
    ],
    "failureModes": [
      "Greedy deterministic targets can cause many backups to terminate early."
    ],
    "related": [
      "Q-learning",
      "importance sampling"
    ]
  },
  {
    "chapter": 5,
    "id": "ch5-9",
    "name": "Per-decision importance sampling",
    "family": "Off-policy MC",
    "bookAnchor": "Section 5.9",
    "plain": "Correct each reward contribution only by the policy ratios that actually precede it.",
    "technical": "Rearranges off-policy return estimation so ratios are applied incrementally per reward, reducing variance relative to full-trajectory products.",
    "objective": "Reduce off-policy MC variance.",
    "coreUpdate": "Use partial products for individual return terms.",
    "steps": [
      "Write return as sum of reward terms.",
      "Attach only needed ratios to each term.",
      "Update estimate using the decomposed corrected return."
    ],
    "pseudocode": [
      "for reward term at time k:",
      "  weight by product ratios from t through k-1",
      "sum corrected terms into return estimate"
    ],
    "equations": [],
    "implementationNotes": [
      "Foreshadows per-decision corrections in n-step methods."
    ],
    "failureModes": [
      "Still relies on coverage and can remain high variance."
    ],
    "related": [
      "n-step off-policy",
      "control variates"
    ]
  },
  {
    "chapter": 6,
    "id": "ch6-1",
    "name": "TD(0) prediction",
    "family": "Temporal-difference learning",
    "bookAnchor": "Section 6.1",
    "plain": "Update a state after one step using reward plus the next state prediction.",
    "technical": "Bootstraps from V(S_{t+1}) and samples the transition from experience, blending MC sampling with DP bootstrapping.",
    "objective": "Evaluate a policy online without a model.",
    "coreUpdate": "V(S_t) <- V(S_t)+alpha[R+gamma V(S_{t+1})-V(S_t)].",
    "steps": [
      "Observe state S.",
      "Take action under policy.",
      "Observe reward and next state.",
      "Compute TD error.",
      "Update the old state value immediately."
    ],
    "pseudocode": [
      "initialize V",
      "for each step:",
      "  observe S,R,S_next",
      "  delta <- R + gamma*V(S_next)-V(S)",
      "  V(S) <- V(S)+alpha*delta"
    ],
    "equations": [
      "\\delta_t=R_{t+1}+\\gamma V(S_{t+1})-V(S_t)"
    ],
    "implementationNotes": [
      "Works in continuing tasks naturally."
    ],
    "failureModes": [
      "Bootstrapping bias appears if successor estimates are poor."
    ],
    "related": [
      "Monte Carlo prediction",
      "TD(lambda)"
    ]
  },
  {
    "chapter": 6,
    "id": "ch6-2",
    "name": "Sarsa",
    "family": "TD control",
    "bookAnchor": "Section 6.4",
    "plain": "Learn action values using the next action actually selected by the current policy.",
    "technical": "On-policy TD control with target R+gamma Q(S_{t+1},A_{t+1}); the update evaluates/improves the behavior policy.",
    "objective": "Learn a control policy while accounting for exploratory actions.",
    "coreUpdate": "Q(S,A) <- Q(S,A)+alpha[R+gamma Q(S_next,A_next)-Q(S,A)].",
    "steps": [
      "Choose A from epsilon-greedy Q.",
      "Take A, observe R and S_next.",
      "Choose A_next from same policy.",
      "Update Q(S,A) toward R plus Q(S_next,A_next)."
    ],
    "pseudocode": [
      "initialize Q",
      "for each episode:",
      "  choose A from policy(Q)",
      "  loop:",
      "    take A, observe R,S_next",
      "    choose A_next from policy(Q)",
      "    update Q(S,A)",
      "    S,A <- S_next,A_next"
    ],
    "equations": [
      "Q(S_t,A_t)\\leftarrow Q(S_t,A_t)+\\alpha[R_{t+1}+\\gamma Q(S_{t+1},A_{t+1})-Q(S_t,A_t)]"
    ],
    "implementationNotes": [
      "Safer than Q-learning in cliff walking during exploration."
    ],
    "failureModes": [
      "Learns the value of the exploratory policy, not the greedy target alone."
    ],
    "related": [
      "Expected Sarsa",
      "n-step Sarsa"
    ]
  },
  {
    "chapter": 6,
    "id": "ch6-3",
    "name": "Q-learning",
    "family": "TD control",
    "bookAnchor": "Section 6.5",
    "plain": "Learn about the greedy target action even while behaving exploratorily.",
    "technical": "Off-policy TD control whose target uses max_a Q(S_{t+1},a), independent of the next behavior action.",
    "objective": "Learn optimal action values under sufficient exploration.",
    "coreUpdate": "Q(S,A) <- Q(S,A)+alpha[R+gamma max_a Q(S_next,a)-Q(S,A)].",
    "steps": [
      "Choose an exploratory action.",
      "Observe reward and next state.",
      "Find the largest next action value.",
      "Update the current state-action toward that greedy target."
    ],
    "pseudocode": [
      "initialize Q",
      "loop:",
      "  A <- behavior policy such as epsilon-greedy",
      "  observe R,S_next",
      "  Q(S,A)+=alpha*(R+gamma*max_a Q(S_next,a)-Q(S,A))"
    ],
    "equations": [
      "Q(S_t,A_t)\\leftarrow Q(S_t,A_t)+\\alpha[R_{t+1}+\\gamma\\max_a Q(S_{t+1},a)-Q(S_t,A_t)]"
    ],
    "implementationNotes": [
      "Canonical tabular off-policy control algorithm."
    ],
    "failureModes": [
      "Maximization bias; unsafe exploratory behavior can still collect poor rewards during learning."
    ],
    "related": [
      "Double Q-learning",
      "Expected Sarsa"
    ]
  },
  {
    "chapter": 6,
    "id": "ch6-4",
    "name": "Expected Sarsa",
    "family": "TD control",
    "bookAnchor": "Section 6.6",
    "plain": "Use the expected value of the next policy rather than one sampled next action.",
    "technical": "Replaces Sarsa’s sampled Q(S’,A’) target with sum_a pi(a|S’)Q(S’,a), reducing target variance when policy probabilities are known.",
    "objective": "Control with lower variance TD targets.",
    "coreUpdate": "Target = R + gamma sum_a pi(a|S_next)Q(S_next,a).",
    "steps": [
      "Act using the behavior/target policy.",
      "Observe transition.",
      "Compute policy-weighted next action value.",
      "Update current action value."
    ],
    "pseudocode": [
      "expected <- sum_a pi(a|S_next)*Q(S_next,a)",
      "Q(S,A)+=alpha*(R+gamma*expected-Q(S,A))"
    ],
    "equations": [
      "R_{t+1}+\\gamma\\sum_a\\pi(a|S_{t+1})Q(S_{t+1},a)"
    ],
    "implementationNotes": [
      "Can be on-policy or off-policy depending on the target policy used."
    ],
    "failureModes": [
      "Requires summing over actions."
    ],
    "related": [
      "Sarsa",
      "Q-learning"
    ]
  },
  {
    "chapter": 6,
    "id": "ch6-5",
    "name": "Double Q-learning",
    "family": "TD control",
    "bookAnchor": "Section 6.7",
    "plain": "Use one value table to choose the max action and another to evaluate it.",
    "technical": "Splits action selection and evaluation between two estimators to reduce positive maximization bias.",
    "objective": "Reduce overestimation from noisy max backups.",
    "coreUpdate": "Update Q1 with Q2-evaluated argmax from Q1, or symmetrically update Q2.",
    "steps": [
      "Maintain Q1 and Q2.",
      "Randomly choose which table to update.",
      "Use the chosen table to select the greedy next action.",
      "Use the other table to evaluate that action in the target."
    ],
    "pseudocode": [
      "if coin flip:",
      "  a* <- argmax_a Q1(S_next,a)",
      "  Q1(S,A)+=alpha*(R+gamma*Q2(S_next,a*)-Q1(S,A))",
      "else symmetric update Q2 using Q1"
    ],
    "equations": [],
    "implementationNotes": [
      "Often important when action-value estimates are noisy."
    ],
    "failureModes": [
      "Two estimators increase memory and can under-estimate in some variants."
    ],
    "related": [
      "Q-learning",
      "Double Expected Sarsa"
    ]
  },
  {
    "chapter": 6,
    "id": "ch6-6",
    "name": "Afterstate TD control",
    "family": "Specialized TD control",
    "bookAnchor": "Section 6.8",
    "plain": "Evaluate the state after the agent moves but before random environment effects.",
    "technical": "Uses domain structure where many actions can lead to the same afterstate, reducing redundant value estimates.",
    "objective": "Exploit deterministic action effects in games and board tasks.",
    "coreUpdate": "Update value of afterstates from subsequent outcomes.",
    "steps": [
      "Map action choices to afterstates.",
      "Choose actions by afterstate value.",
      "Observe environment response.",
      "Update the afterstate value using TD."
    ],
    "pseudocode": [
      "after <- transition_after_agent_action(S,A)",
      "choose A by V(after)",
      "observe R,S_next",
      "V(after)+=alpha*(R+gamma*V(next_after)-V(after))"
    ],
    "equations": [],
    "implementationNotes": [
      "Useful in tic-tac-toe, backgammon, and similar games."
    ],
    "failureModes": [
      "Requires a meaningful afterstate representation."
    ],
    "related": [
      "TD-Gammon",
      "Sarsa"
    ]
  },
  {
    "chapter": 7,
    "id": "ch7-1",
    "name": "n-step TD prediction",
    "family": "Multi-step TD",
    "bookAnchor": "Section 7.1",
    "plain": "Wait n rewards, then bootstrap from the value n steps later.",
    "technical": "Generalizes TD(0) and Monte Carlo by using an n-step return as the target.",
    "objective": "Tune bias/variance and credit-assignment length.",
    "coreUpdate": "V(S_t) <- V(S_t)+alpha[G_{t:t+n}-V(S_t)].",
    "steps": [
      "Store recent rewards and states.",
      "When n steps are available, build the n-step return.",
      "Update the earlier state.",
      "Flush remaining updates at episode end."
    ],
    "pseudocode": [
      "for each time t:",
      "  store transition",
      "  tau <- t-n+1",
      "  if tau >= 0: update V(S_tau) toward G_{tau:tau+n}"
    ],
    "equations": [
      "G_{t:t+n}=R_{t+1}+\\cdots+\\gamma^n V(S_{t+n})"
    ],
    "implementationNotes": [
      "n=1 is TD(0); n to episode end is MC."
    ],
    "failureModes": [
      "Large n delays updates and can increase variance."
    ],
    "related": [
      "TD(lambda)",
      "n-step Sarsa"
    ]
  },
  {
    "chapter": 7,
    "id": "ch7-2",
    "name": "n-step Sarsa",
    "family": "Multi-step control",
    "bookAnchor": "Section 7.2",
    "plain": "Use n rewards plus a later action-value bootstrap for on-policy control.",
    "technical": "Extends Sarsa by updating Q(S_t,A_t) toward an n-step action-value return.",
    "objective": "Propagate delayed rewards faster in control.",
    "coreUpdate": "Q <- Q + alpha[G_{t:t+n}-Q].",
    "steps": [
      "Generate behavior under the current policy.",
      "Store states, actions, rewards.",
      "Update a state-action pair once its n-step target is known."
    ],
    "pseudocode": [
      "store S,A,R circularly",
      "tau <- t-n+1",
      "if tau>=0:",
      "  build n-step Sarsa return",
      "  update Q(S_tau,A_tau)"
    ],
    "equations": [],
    "implementationNotes": [
      "Often helps sparse-delayed control tasks."
    ],
    "failureModes": [
      "Needs careful episode-end bookkeeping."
    ],
    "related": [
      "Sarsa",
      "Sarsa(lambda)"
    ]
  },
  {
    "chapter": 7,
    "id": "ch7-3",
    "name": "n-step off-policy TD with importance sampling",
    "family": "Off-policy multi-step",
    "bookAnchor": "Section 7.3",
    "plain": "Use behavior-policy data for target-policy n-step prediction by correcting action probabilities.",
    "technical": "Multiplies the n-step update by a product of target/behavior action probabilities over the relevant interval.",
    "objective": "Evaluate a target policy from different behavior.",
    "coreUpdate": "Update scaled by rho_{t:t+n}.",
    "steps": [
      "Collect trajectory under behavior b.",
      "Build n-step target for pi.",
      "Compute importance ratio product.",
      "Scale the update."
    ],
    "pseudocode": [
      "rho <- product pi(A_k|S_k)/b(A_k|S_k)",
      "V(S_t)+=alpha*rho*(G-V(S_t))"
    ],
    "equations": [],
    "implementationNotes": [
      "Ratio interval matters; using too many ratios adds variance."
    ],
    "failureModes": [
      "Long products are high variance."
    ],
    "related": [
      "per-decision IS",
      "tree backup"
    ]
  },
  {
    "chapter": 7,
    "id": "ch7-4",
    "name": "Per-decision n-step control variates",
    "family": "Off-policy multi-step",
    "bookAnchor": "Section 7.4",
    "plain": "Correct off-policy returns piece by piece and use control variates to reduce variance.",
    "technical": "Uses expected terms as baselines so importance-sampled components do not change the expected target but can reduce variance.",
    "objective": "Make off-policy multi-step learning less noisy.",
    "coreUpdate": "Return recursion mixes sampled corrected terms and expected control variate terms.",
    "steps": [
      "Write the return recursively.",
      "Insert an expectation term with zero expected correction.",
      "Apply ratios only to stochastic deviations."
    ],
    "pseudocode": [
      "for each backup depth:",
      "  combine expected value under pi",
      "  add rho times sampled deviation from expectation"
    ],
    "equations": [],
    "implementationNotes": [
      "Conceptual bridge to tree-backup and Q(sigma)."
    ],
    "failureModes": [
      "More complex to implement and debug."
    ],
    "related": [
      "tree backup",
      "Q(sigma)"
    ]
  },
  {
    "chapter": 7,
    "id": "ch7-5",
    "name": "Tree-backup algorithm",
    "family": "Expected multi-step control",
    "bookAnchor": "Section 7.5",
    "plain": "Back up expected action branches instead of relying on raw importance ratios.",
    "technical": "Uses target-policy probabilities over non-sampled actions at each depth, avoiding full trajectory importance-sampling products.",
    "objective": "Off-policy action-value learning with lower variance.",
    "coreUpdate": "Expected branches under pi plus sampled path continuation.",
    "steps": [
      "At each next state, average over target-policy action probabilities.",
      "Continue down the sampled action branch.",
      "Accumulate expected side branches.",
      "Update the root action value."
    ],
    "pseudocode": [
      "G <- Q at leaf or terminal return",
      "for k backward:",
      "  G <- R + gamma*(sum_non_sample pi Q + pi(sample)*G)",
      "update Q"
    ],
    "equations": [],
    "implementationNotes": [
      "Works naturally with stochastic target policies."
    ],
    "failureModes": [
      "Can be biased relative to sampled target if probabilities are wrong or expensive to compute."
    ],
    "related": [
      "Expected Sarsa",
      "Q(sigma)"
    ]
  },
  {
    "chapter": 7,
    "id": "ch7-6",
    "name": "n-step Q(sigma)",
    "family": "Unified multi-step control",
    "bookAnchor": "Section 7.6",
    "plain": "Use sigma to choose how sampled or expected each backup step is.",
    "technical": "Interpolates between Sarsa-style sampled backups (sigma=1) and tree-backup expected backups (sigma=0).",
    "objective": "Unify and tune multi-step control targets.",
    "coreUpdate": "Mixed return combines sigma sampled branch and 1-sigma expectation.",
    "steps": [
      "Choose sigma per time or depth.",
      "Build a return that mixes sampled and expected next-action contributions.",
      "Update Q toward that mixed return."
    ],
    "pseudocode": [
      "for each depth k:",
      "  sampled <- Q(S_k,A_k)",
      "  expected <- sum_a pi(a|S_k)Q(S_k,a)",
      "  mix according to sigma_k",
      "backup mixed return"
    ],
    "equations": [],
    "implementationNotes": [
      "Sigma can be constant or state/time dependent."
    ],
    "failureModes": [
      "More hyperparameters and bookkeeping."
    ],
    "related": [
      "Sarsa",
      "tree backup"
    ]
  },
  {
    "chapter": 8,
    "id": "ch8-1",
    "name": "Dyna-Q",
    "family": "Planning and learning",
    "bookAnchor": "Section 8.2",
    "plain": "Learn from real experience, learn a model, then replay simulated experience from that model.",
    "technical": "Integrates direct Q-learning, one-step model learning, and random-sample planning updates.",
    "objective": "Use a learned model to amplify limited real experience.",
    "coreUpdate": "Real and simulated transitions both update Q with Q-learning.",
    "steps": [
      "Act in the real environment.",
      "Update Q from the real transition.",
      "Store transition in the model.",
      "Repeat planning updates from sampled model entries."
    ],
    "pseudocode": [
      "observe real S,A,R,S_next",
      "Q-learning update",
      "Model(S,A)<-(R,S_next)",
      "repeat n times:",
      "  sample S,A previously observed",
      "  R,S_next <- Model(S,A)",
      "  Q-learning update"
    ],
    "equations": [],
    "implementationNotes": [
      "Planning steps trade computation for sample efficiency."
    ],
    "failureModes": [
      "Wrong or stale models can hurt."
    ],
    "related": [
      "Dyna-Q+",
      "prioritized sweeping"
    ]
  },
  {
    "chapter": 8,
    "id": "ch8-2",
    "name": "Dyna-Q+",
    "family": "Exploration and planning",
    "bookAnchor": "Section 8.3",
    "plain": "Add a bonus for state-actions not tried recently so planning explores stale possibilities.",
    "technical": "Augments model rewards with a time-since-visited exploration bonus, helping discover environmental changes such as shortcuts.",
    "objective": "Adapt planning to changing environments.",
    "coreUpdate": "Model reward plus kappa sqrt(time since last tried).",
    "steps": [
      "Track recency of each state-action.",
      "During planning, add exploration bonus for long-untried actions.",
      "Use bonus transition in Q-learning update."
    ],
    "pseudocode": [
      "Model stores observed transitions and last-visit times",
      "during planning: R_bonus <- R + kappa*sqrt(tau)",
      "Q-learning update with R_bonus"
    ],
    "equations": [],
    "implementationNotes": [
      "Encourages checking forgotten actions."
    ],
    "failureModes": [
      "Bonus can overvalue impossible or bad actions if model assumptions are wrong."
    ],
    "related": [
      "Dyna-Q",
      "exploration"
    ]
  },
  {
    "chapter": 8,
    "id": "ch8-3",
    "name": "Prioritized sweeping",
    "family": "Focused planning",
    "bookAnchor": "Section 8.4",
    "plain": "Update predecessors of states whose values changed a lot.",
    "technical": "Maintains predecessor information and a priority queue keyed by Bellman-error magnitude to focus model-based backups.",
    "objective": "Spend planning computation where it matters.",
    "coreUpdate": "Priority = |target - Q(s,a)|.",
    "steps": [
      "Store predecessors in the model.",
      "After a transition, compute priority.",
      "Push high-priority state-actions.",
      "Pop and update, then propagate priority to predecessors."
    ],
    "pseudocode": [
      "if priority(S,A)>theta push queue",
      "while planning budget:",
      "  S,A <- pop largest priority",
      "  update Q(S,A)",
      "  for predecessors of S: recompute priority and push"
    ],
    "equations": [],
    "implementationNotes": [
      "Very efficient in sparse deterministic tasks."
    ],
    "failureModes": [
      "Predecessor bookkeeping can be expensive in large stochastic tasks."
    ],
    "related": [
      "asynchronous DP",
      "Dyna-Q"
    ]
  },
  {
    "chapter": 8,
    "id": "ch8-4",
    "name": "Expected model updates",
    "family": "Planning backups",
    "bookAnchor": "Section 8.5",
    "plain": "Average over all modeled successors in one backup.",
    "technical": "Computes a Bellman expectation or optimality backup from the model distribution instead of sampling one successor.",
    "objective": "Reduce variance per backup when branching is manageable.",
    "coreUpdate": "Expected target sums over next states and rewards.",
    "steps": [
      "Enumerate possible successors.",
      "Weight each by model probability.",
      "Compute expected reward plus successor value.",
      "Update value/action value."
    ],
    "pseudocode": [
      "target <- sum_{s,r} modelProb*(r+gamma*value(s_next))",
      "Q(S,A)+=alpha*(target-Q(S,A))"
    ],
    "equations": [],
    "implementationNotes": [
      "Best when branching factor is small."
    ],
    "failureModes": [
      "Can be expensive with many successors."
    ],
    "related": [
      "sample updates",
      "DP"
    ]
  },
  {
    "chapter": 8,
    "id": "ch8-5",
    "name": "Trajectory sampling",
    "family": "Planning search control",
    "bookAnchor": "Section 8.6",
    "plain": "Use the model to simulate trajectories from relevant starting states.",
    "technical": "Focuses planning updates on state-action distributions likely under a policy instead of uniform state sweeps.",
    "objective": "Allocate planning to reachable/relevant states.",
    "coreUpdate": "Sample model rollouts and update along them.",
    "steps": [
      "Choose a start state.",
      "Select actions according to policy or search control.",
      "Sample model transitions.",
      "Update along the simulated trajectory."
    ],
    "pseudocode": [
      "S <- start",
      "repeat rollout length:",
      "  A <- policy/search-control(S)",
      "  sample R,S_next from model",
      "  update value/Q",
      "  S <- S_next"
    ],
    "equations": [],
    "implementationNotes": [
      "Connects Dyna to decision-time planning."
    ],
    "failureModes": [
      "Can miss important rare states if the sampling policy is narrow."
    ],
    "related": [
      "RTDP",
      "MCTS"
    ]
  },
  {
    "chapter": 8,
    "id": "ch8-6",
    "name": "Real-time dynamic programming",
    "family": "Planning and control",
    "bookAnchor": "Section 8.7",
    "plain": "Back up states encountered while following the current greedy trajectory.",
    "technical": "Applies dynamic-programming backups selectively to states reached from start states under current behavior/greedy choices.",
    "objective": "Plan efficiently in large MDPs from relevant starts.",
    "coreUpdate": "Bellman optimality backups along simulated or real trajectories.",
    "steps": [
      "Start from a relevant state.",
      "Choose greedy or exploratory action.",
      "Apply Bellman backup to current state.",
      "Move to successor and repeat."
    ],
    "pseudocode": [
      "while not terminal:",
      "  V(S) <- Bellman optimality backup",
      "  A <- greedy action",
      "  S <- successor sampled or selected from model"
    ],
    "equations": [],
    "implementationNotes": [
      "Useful when only a subset of states matter."
    ],
    "failureModes": [
      "Needs reachability and exploration assumptions for broad convergence."
    ],
    "related": [
      "asynchronous DP",
      "trajectory sampling"
    ]
  },
  {
    "chapter": 8,
    "id": "ch8-7",
    "name": "Heuristic search with value backups",
    "family": "Decision-time planning",
    "bookAnchor": "Section 8.9",
    "plain": "Use a model to look ahead from the current state and back up leaf evaluations.",
    "technical": "Implements search as ordered one-step backups, using a heuristic or value function at search leaves.",
    "objective": "Choose a better current action using computation at decision time.",
    "coreUpdate": "Back up leaf values toward the root.",
    "steps": [
      "Expand possible futures from current state.",
      "Evaluate leaves.",
      "Back up values toward root.",
      "Choose the root action with best backed-up value."
    ],
    "pseudocode": [
      "build partial search tree",
      "evaluate leaves with heuristic V",
      "backup values from leaves to root",
      "act with best root action"
    ],
    "equations": [],
    "implementationNotes": [
      "Makes planning explicitly action-conditional at decision time."
    ],
    "failureModes": [
      "Tree growth can explode with branching factor."
    ],
    "related": [
      "rollout",
      "MCTS"
    ]
  },
  {
    "chapter": 8,
    "id": "ch8-8",
    "name": "Rollout algorithms",
    "family": "Decision-time planning",
    "bookAnchor": "Section 8.10",
    "plain": "Estimate each candidate action by simulating complete continuations under a rollout policy.",
    "technical": "Uses Monte Carlo simulation from current state, starting with each action and then following a base policy, to estimate action returns.",
    "objective": "Improve a base policy at decision time.",
    "coreUpdate": "Choose action with best average rollout return.",
    "steps": [
      "For each candidate action, simulate many trajectories.",
      "After first action, follow rollout policy.",
      "Average returns.",
      "Take action with highest estimate."
    ],
    "pseudocode": [
      "for each action a:",
      "  returns <- simulate from current state taking a then rollout policy",
      "choose argmax average return"
    ],
    "equations": [],
    "implementationNotes": [
      "Can improve weak base policies if simulation is available."
    ],
    "failureModes": [
      "High simulation cost and rollout-policy bias."
    ],
    "related": [
      "MCTS",
      "Monte Carlo control"
    ]
  },
  {
    "chapter": 8,
    "id": "ch8-9",
    "name": "Monte Carlo tree search",
    "family": "Decision-time planning",
    "bookAnchor": "Section 8.11",
    "plain": "Grow a search tree where simulations suggest it is most useful.",
    "technical": "Combines tree policy selection, expansion, rollout evaluation, and backup of simulated returns.",
    "objective": "Plan in huge game trees without exhaustive search.",
    "coreUpdate": "Selection/expansion/rollout/backup loop.",
    "steps": [
      "Select a path through the existing tree.",
      "Expand a new node.",
      "Roll out from it using a default policy.",
      "Back up the return along the selected path."
    ],
    "pseudocode": [
      "repeat simulation budget:",
      "  node <- select tree path",
      "  expand node",
      "  G <- rollout from node",
      "  backup G through path",
      "act with best root child"
    ],
    "equations": [],
    "implementationNotes": [
      "UCT is a common tree-selection rule, though implementation details vary."
    ],
    "failureModes": [
      "Compute-heavy; rollout quality and exploration constants matter."
    ],
    "related": [
      "AlphaGo",
      "rollout algorithms"
    ]
  },
  {
    "chapter": 9,
    "id": "ch9-1",
    "name": "Gradient Monte Carlo with function approximation",
    "family": "Approximate prediction",
    "bookAnchor": "Section 9.3",
    "plain": "Use complete returns as supervised targets for a value approximator.",
    "technical": "Performs stochastic gradient descent on squared error between return G_t and v_hat(S_t,w).",
    "objective": "Learn value predictions with differentiable approximators.",
    "coreUpdate": "w <- w + alpha(G - v_hat) grad v_hat.",
    "steps": [
      "Generate an episode.",
      "Compute return for a visited state.",
      "Compute prediction error.",
      "Move weights along the value gradient."
    ],
    "pseudocode": [
      "for each visited state S_t:",
      "  G <- return",
      "  w <- w + alpha*(G-vhat(S_t,w))*grad_vhat(S_t,w)"
    ],
    "equations": [
      "\\mathbf{w}_{t+1}=\\mathbf{w}_t+\\alpha(G_t-\\hat v(S_t,\\mathbf{w}_t))\\nabla\\hat v(S_t,\\mathbf{w}_t)"
    ],
    "implementationNotes": [
      "True stochastic gradient when G is an unbiased target."
    ],
    "failureModes": [
      "Must wait for returns and can be high variance."
    ],
    "related": [
      "semi-gradient TD",
      "supervised learning"
    ]
  },
  {
    "chapter": 9,
    "id": "ch9-2",
    "name": "Semi-gradient TD(0)",
    "family": "Approximate prediction",
    "bookAnchor": "Section 9.3",
    "plain": "Use a bootstrapped TD target but only differentiate the prediction being updated.",
    "technical": "Treats R+gamma v_hat(S’,w) as a fixed target for gradient purposes, yielding a practical semi-gradient update.",
    "objective": "Online approximate value prediction.",
    "coreUpdate": "w <- w + alpha delta grad v_hat(S,w).",
    "steps": [
      "Observe transition.",
      "Compute TD error with current weights.",
      "Compute gradient of current-state prediction.",
      "Update weights."
    ],
    "pseudocode": [
      "delta <- R + gamma*vhat(S_next,w)-vhat(S,w)",
      "w <- w + alpha*delta*grad_vhat(S,w)"
    ],
    "equations": [
      "\\delta=R+\\gamma\\hat v(S',w)-\\hat v(S,w)"
    ],
    "implementationNotes": [
      "Stable on-policy with linear approximation under standard assumptions."
    ],
    "failureModes": [
      "Can diverge off-policy under the deadly triad."
    ],
    "related": [
      "Gradient TD",
      "TD(lambda)"
    ]
  },
  {
    "chapter": 9,
    "id": "ch9-3",
    "name": "Semi-gradient n-step TD",
    "family": "Approximate prediction",
    "bookAnchor": "Section 9.3",
    "plain": "Use an n-step target with a differentiable value function.",
    "technical": "Moves weights toward an n-step bootstrapped return while treating the target as fixed.",
    "objective": "Trade backup length under approximation.",
    "coreUpdate": "w <- w + alpha(G_n - v_hat) grad v_hat.",
    "steps": [
      "Store transitions until n-step target is available.",
      "Compute n-step return.",
      "Update weights by semi-gradient."
    ],
    "pseudocode": [
      "G <- n-step return",
      "w += alpha*(G-vhat(S,w))*grad_vhat(S,w)"
    ],
    "equations": [],
    "implementationNotes": [
      "Connects Chapter 7 multi-step ideas to function approximation."
    ],
    "failureModes": [
      "Large n can increase variance; approximation couples states."
    ],
    "related": [
      "n-step TD",
      "semi-gradient Sarsa"
    ]
  },
  {
    "chapter": 9,
    "id": "ch9-4",
    "name": "Linear TD with feature vectors",
    "family": "Approximate prediction",
    "bookAnchor": "Section 9.4",
    "plain": "Represent value as a weighted sum of features and update weights by feature activity.",
    "technical": "For v_hat=w^T x, the gradient is x, so TD updates are sparse and efficient when features are sparse.",
    "objective": "Scalable tabular-like prediction with generalization.",
    "coreUpdate": "w <- w + alpha delta x(S).",
    "steps": [
      "Compute features x(S).",
      "Compute TD error.",
      "Add alpha delta times the feature vector to weights."
    ],
    "pseudocode": [
      "x <- features(S)",
      "delta <- R+gamma*w dot x_next - w dot x",
      "w <- w + alpha*delta*x"
    ],
    "equations": [
      "\\hat v(s,w)=w^T x(s)"
    ],
    "implementationNotes": [
      "Tile coding makes x sparse and updates cheap."
    ],
    "failureModes": [
      "Bad features cause bad generalization."
    ],
    "related": [
      "tile coding",
      "semi-gradient TD"
    ]
  },
  {
    "chapter": 9,
    "id": "ch9-5",
    "name": "Tile coding / coarse coding representation",
    "family": "Feature construction",
    "bookAnchor": "Section 9.5",
    "plain": "Turn continuous states into overlapping active tiles so nearby states share learning.",
    "technical": "Uses multiple offset tilings or receptive fields to create sparse binary features for linear methods.",
    "objective": "Control generalization geometry.",
    "coreUpdate": "Feature vector has ones for active tiles.",
    "steps": [
      "Choose ranges and tiling count.",
      "Offset tilings.",
      "Encode each state by active tile indices.",
      "Use linear updates on active weights."
    ],
    "pseudocode": [
      "active <- tileCoder(S)",
      "value <- sum_{i in active} w_i",
      "for i in active: w_i += alpha*error"
    ],
    "equations": [],
    "implementationNotes": [
      "Scale alpha by number of active tilings."
    ],
    "failureModes": [
      "Poor scaling or offsets can create aliasing."
    ],
    "related": [
      "linear TD",
      "semi-gradient Sarsa"
    ]
  },
  {
    "chapter": 9,
    "id": "ch9-6",
    "name": "Least-squares TD",
    "family": "Approximate prediction",
    "bookAnchor": "Section 9.8",
    "plain": "Solve for linear value weights from accumulated TD relationships.",
    "technical": "Builds and solves a linear system derived from projected TD fixed-point equations.",
    "objective": "Data-efficient linear policy evaluation.",
    "coreUpdate": "A w = b from accumulated features and TD differences.",
    "steps": [
      "Collect feature transitions.",
      "Accumulate matrix A and vector b.",
      "Solve the linear system for w."
    ],
    "pseudocode": [
      "A += x_t (x_t - gamma*x_next)^T",
      "b += x_t R_next",
      "w <- inverse(A) b"
    ],
    "equations": [],
    "implementationNotes": [
      "Can use regularization for numerical stability."
    ],
    "failureModes": [
      "Matrix operations scale poorly with feature dimension."
    ],
    "related": [
      "linear TD",
      "projected Bellman equation"
    ]
  },
  {
    "chapter": 9,
    "id": "ch9-7",
    "name": "Memory-based value approximation",
    "family": "Nonparametric approximation",
    "bookAnchor": "Section 9.9",
    "plain": "Predict by looking up similar remembered states.",
    "technical": "Stores experiences or examples and interpolates value from nearest neighbors or local models.",
    "objective": "Use local generalization without fixed global features.",
    "coreUpdate": "value <- weighted average of nearby stored targets.",
    "steps": [
      "Store examples.",
      "Define similarity/distance.",
      "Find neighbors for query state.",
      "Average or locally fit values."
    ],
    "pseudocode": [
      "neighbors <- nearest stored states to s",
      "return weightedAverage(values(neighbors))"
    ],
    "equations": [],
    "implementationNotes": [
      "Similarity metric is the model."
    ],
    "failureModes": [
      "Memory and lookup cost can grow with data."
    ],
    "related": [
      "kernel methods",
      "case-based reasoning"
    ]
  },
  {
    "chapter": 9,
    "id": "ch9-8",
    "name": "Kernel-based value approximation",
    "family": "Nonparametric approximation",
    "bookAnchor": "Section 9.10",
    "plain": "Use a kernel similarity function to predict values from stored samples.",
    "technical": "Implicitly maps states into a high-dimensional feature space and predicts through weighted similarities.",
    "objective": "Flexible smooth approximation.",
    "coreUpdate": "value <- sum_i alpha_i K(s,s_i).",
    "steps": [
      "Choose a kernel.",
      "Store support samples.",
      "Compute similarities to query state.",
      "Combine weighted contributions."
    ],
    "pseudocode": [
      "for query s:",
      "  value <- sum_i coeff_i * K(s,s_i)"
    ],
    "equations": [],
    "implementationNotes": [
      "Can represent rich functions."
    ],
    "failureModes": [
      "Often scales poorly as samples grow."
    ],
    "related": [
      "memory-based approximation",
      "linear features"
    ]
  },
  {
    "chapter": 10,
    "id": "ch10-1",
    "name": "Episodic semi-gradient Sarsa",
    "family": "Approximate control",
    "bookAnchor": "Section 10.1",
    "plain": "Use differentiable action values to run Sarsa in large or continuous state spaces.",
    "technical": "Updates q_hat(S,A,w) toward a one-step Sarsa target using the gradient of the current action-value estimate.",
    "objective": "On-policy approximate control in episodic tasks.",
    "coreUpdate": "w <- w + alpha[R+gamma q_hat(S’,A’,w)-q_hat(S,A,w)] grad q_hat(S,A,w).",
    "steps": [
      "Choose action from policy derived from q_hat.",
      "Observe transition and next action.",
      "Compute TD error.",
      "Update action-value weights."
    ],
    "pseudocode": [
      "A <- epsilon-greedy(qhat(S,.,w))",
      "observe R,S_next",
      "A_next <- epsilon-greedy(qhat(S_next,.,w))",
      "delta <- R+gamma*qhat(S_next,A_next,w)-qhat(S,A,w)",
      "w += alpha*delta*grad_qhat(S,A,w)"
    ],
    "equations": [],
    "implementationNotes": [
      "Needs action-discriminating features."
    ],
    "failureModes": [
      "Control changes data distribution while weights generalize."
    ],
    "related": [
      "Sarsa",
      "n-step semi-gradient Sarsa"
    ]
  },
  {
    "chapter": 10,
    "id": "ch10-2",
    "name": "Semi-gradient n-step Sarsa",
    "family": "Approximate control",
    "bookAnchor": "Section 10.2",
    "plain": "Back up multiple rewards before bootstrapping approximate action values.",
    "technical": "Combines n-step action-value returns with semi-gradient updates to q_hat.",
    "objective": "Improve delayed-reward approximate control.",
    "coreUpdate": "w <- w + alpha(G_n - q_hat) grad q_hat.",
    "steps": [
      "Collect n-step trajectory.",
      "Build n-step Sarsa return.",
      "Update weights for the earlier state-action."
    ],
    "pseudocode": [
      "tau <- t-n+1",
      "G <- n-step action-value return",
      "w += alpha*(G-qhat(S_tau,A_tau,w))*grad_qhat(S_tau,A_tau,w)"
    ],
    "equations": [],
    "implementationNotes": [
      "Used in Mountain Car with tile coding."
    ],
    "failureModes": [
      "n and alpha interact strongly."
    ],
    "related": [
      "Sarsa(lambda)",
      "tile coding"
    ]
  },
  {
    "chapter": 10,
    "id": "ch10-3",
    "name": "Average reward estimation",
    "family": "Continuing control",
    "bookAnchor": "Section 10.3",
    "plain": "Learn the long-run reward rate and judge actions by reward above or below it.",
    "technical": "Maintains an estimate of average reward as part of continuing-task differential learning.",
    "objective": "Optimize continuing tasks without discounting.",
    "coreUpdate": "Rbar <- Rbar + beta delta.",
    "steps": [
      "Compute differential TD error.",
      "Update average reward estimate.",
      "Update differential value estimates."
    ],
    "pseudocode": [
      "delta <- R - Rbar + nextValue - currentValue",
      "Rbar <- Rbar + beta*delta",
      "update value weights by delta"
    ],
    "equations": [],
    "implementationNotes": [
      "Average reward is a distinct objective from discounted return."
    ],
    "failureModes": [
      "Requires continuing-task assumptions and careful step-sizes."
    ],
    "related": [
      "differential Sarsa"
    ]
  },
  {
    "chapter": 10,
    "id": "ch10-4",
    "name": "Differential semi-gradient Sarsa",
    "family": "Continuing approximate control",
    "bookAnchor": "Section 10.5",
    "plain": "For never-ending tasks, update action values using reward relative to the learned average reward.",
    "technical": "Uses differential TD errors with q_hat and an average reward estimate for on-policy continuing control.",
    "objective": "Approximate control under average-reward objective.",
    "coreUpdate": "delta = R - Rbar + q_hat(S’,A’) - q_hat(S,A).",
    "steps": [
      "Choose action on-policy.",
      "Observe transition.",
      "Compute differential TD error.",
      "Update average reward.",
      "Update action-value weights."
    ],
    "pseudocode": [
      "delta <- R - Rbar + qhat(S_next,A_next,w)-qhat(S,A,w)",
      "Rbar <- Rbar + beta*delta",
      "w <- w + alpha*delta*grad_qhat(S,A,w)"
    ],
    "equations": [
      "\\delta=R_{t+1}-\\bar R+\\hat q(S_{t+1},A_{t+1},w)-\\hat q(S_t,A_t,w)"
    ],
    "implementationNotes": [
      "Useful for access-control style continuing tasks."
    ],
    "failureModes": [
      "Average reward and value step-sizes can interact."
    ],
    "related": [
      "average reward",
      "semi-gradient Sarsa"
    ]
  },
  {
    "chapter": 11,
    "id": "ch11-1",
    "name": "Off-policy semi-gradient TD with approximation",
    "family": "Off-policy approximation",
    "bookAnchor": "Section 11.1",
    "plain": "Try to evaluate one policy from another policy’s data using bootstrapped approximate updates.",
    "technical": "Combines importance sampling ratios with semi-gradient TD; it exposes the deadly triad when paired with bootstrapping and approximation.",
    "objective": "Off-policy prediction under approximation.",
    "coreUpdate": "w <- w + alpha rho delta grad v_hat.",
    "steps": [
      "Collect data from behavior policy.",
      "Compute target/behavior action ratio.",
      "Compute bootstrapped TD error.",
      "Scale semi-gradient update by ratio."
    ],
    "pseudocode": [
      "rho <- pi(A|S)/b(A|S)",
      "delta <- R + gamma*vhat(S_next,w)-vhat(S,w)",
      "w += alpha*rho*delta*grad_vhat(S,w)"
    ],
    "equations": [],
    "implementationNotes": [
      "Important as a warning case, not only a recommended method."
    ],
    "failureModes": [
      "Can diverge with linear approximation."
    ],
    "related": [
      "deadly triad",
      "Gradient TD",
      "Emphatic TD"
    ]
  },
  {
    "chapter": 11,
    "id": "ch11-2",
    "name": "Gradient-TD / TDC methods",
    "family": "Stable off-policy approximation",
    "bookAnchor": "Section 11.7",
    "plain": "Add secondary weights so the update follows a stable projected objective.",
    "technical": "GTD/TDC optimize projected Bellman-error objectives using coupled primary and secondary weight vectors.",
    "objective": "Stabilize linear off-policy TD learning.",
    "coreUpdate": "Primary update corrected by secondary weights; secondary weights estimate gradient terms.",
    "steps": [
      "Maintain value weights w and auxiliary weights h.",
      "Compute TD error and features.",
      "Update h toward correction estimate.",
      "Update w with TD term minus correction."
    ],
    "pseudocode": [
      "delta <- R + gamma*w dot x_next - w dot x",
      "h <- h + beta*(delta - h dot x)*x",
      "w <- w + alpha*(delta*x - gamma*x_next*(x dot h))"
    ],
    "equations": [],
    "implementationNotes": [
      "Two-timescale step-size tuning matters."
    ],
    "failureModes": [
      "More complex and sometimes slower than naive TD."
    ],
    "related": [
      "TDC",
      "GTD2",
      "MSPBE"
    ]
  },
  {
    "chapter": 11,
    "id": "ch11-3",
    "name": "Emphatic TD",
    "family": "Stable off-policy approximation",
    "bookAnchor": "Section 11.8",
    "plain": "Change how much each state update matters so off-policy bootstrapping has the right emphasis.",
    "technical": "Uses interest and follow-on traces to construct emphasis weights that correct the distribution mismatch induced by target-policy bootstrapping.",
    "objective": "Stabilize off-policy value learning with function approximation.",
    "coreUpdate": "TD update scaled by emphasis M_t.",
    "steps": [
      "Specify interest in states.",
      "Track follow-on trace through ratios and discounting.",
      "Compute emphasis.",
      "Scale TD update by emphasis."
    ],
    "pseudocode": [
      "F_t <- rho_{t-1}*gamma_t*F_{t-1}+interest(S_t)",
      "M_t <- lambda_t*interest(S_t)+(1-lambda_t)*F_t",
      "w += alpha*M_t*rho_t*delta*x_t"
    ],
    "equations": [],
    "implementationNotes": [
      "Connects state weighting to the target policy’s bootstrapping flow."
    ],
    "failureModes": [
      "Ratios and emphases can still create variance."
    ],
    "related": [
      "Gradient TD",
      "Emphatic TD(lambda)"
    ]
  },
  {
    "chapter": 11,
    "id": "ch11-4",
    "name": "Bellman-error gradient descent diagnostic",
    "family": "Objective analysis",
    "bookAnchor": "Sections 11.5-11.6",
    "plain": "The obvious squared Bellman-error objective cannot usually be sampled correctly from one next state.",
    "technical": "Mean-squared Bellman error gradients require products of expectations, leading to the double-sampling problem.",
    "objective": "Understand why alternative objectives are needed.",
    "coreUpdate": "Naive sampled BE gradients are biased without independent successor samples.",
    "steps": [
      "Write Bellman error as expected target minus value.",
      "Square it.",
      "Differentiate.",
      "Notice the need for independent next-state samples."
    ],
    "pseudocode": [
      "BE <- E[R+gamma v(S_next)|S]-v(S)",
      "gradient of BE^2 needs product of expectations"
    ],
    "equations": [],
    "implementationNotes": [
      "This is a methodological warning more than a practical algorithm."
    ],
    "failureModes": [
      "Naive implementation optimizes the wrong objective."
    ],
    "related": [
      "MSPBE",
      "Gradient TD"
    ]
  },
  {
    "chapter": 12,
    "id": "ch12-1",
    "name": "Offline lambda-return algorithm",
    "family": "Eligibility traces",
    "bookAnchor": "Sections 12.1 and 12.3",
    "plain": "Mix all n-step returns after enough future information is available.",
    "technical": "Computes lambda-returns as forward-view targets and updates values from those targets, usually after or with delayed access to future rewards.",
    "objective": "Use the conceptual trace target directly.",
    "coreUpdate": "V <- V + alpha(G^lambda - V).",
    "steps": [
      "Generate trajectory or wait for horizon.",
      "Compute lambda-weighted mixture of n-step returns.",
      "Update each visited state."
    ],
    "pseudocode": [
      "for each state time t:",
      "  compute G_lambda_t from future rewards",
      "  V(S_t)+=alpha*(G_lambda_t-V(S_t))"
    ],
    "equations": [
      "G_t^\\lambda=(1-\\lambda)\\sum_{n\\ge1}\\lambda^{n-1}G_{t:t+n}"
    ],
    "implementationNotes": [
      "Clarifies what backward traces approximate or implement."
    ],
    "failureModes": [
      "Delayed/offline unless truncated or online variants are used."
    ],
    "related": [
      "TD(lambda)",
      "true online TD(lambda)"
    ]
  },
  {
    "chapter": 12,
    "id": "ch12-2",
    "name": "TD(lambda)",
    "family": "Eligibility traces",
    "bookAnchor": "Section 12.2",
    "plain": "Let each TD error update recently visited states according to a fading trace.",
    "technical": "Backward-view TD(lambda) maintains eligibility traces decaying by gamma lambda and applies current TD error to all eligible components.",
    "objective": "Online multi-step credit assignment.",
    "coreUpdate": "z <- gamma lambda z + grad v; w <- w + alpha delta z.",
    "steps": [
      "Maintain trace vector z.",
      "Decay z each time step.",
      "Increment trace for current state/features.",
      "Compute TD error.",
      "Update weights or table entries by delta times z."
    ],
    "pseudocode": [
      "z <- gamma*lambda*z + x(S)",
      "delta <- R + gamma*vhat(S_next,w)-vhat(S,w)",
      "w <- w + alpha*delta*z"
    ],
    "equations": [
      "z_t=\\gamma\\lambda z_{t-1}+x_t"
    ],
    "implementationNotes": [
      "lambda=0 gives TD(0); high lambda approaches MC-like credit."
    ],
    "failureModes": [
      "Accumulating traces can become large with repeated visits."
    ],
    "related": [
      "true online TD(lambda)",
      "Sarsa(lambda)"
    ]
  },
  {
    "chapter": 12,
    "id": "ch12-3",
    "name": "True online TD(lambda)",
    "family": "Eligibility traces",
    "bookAnchor": "Section 12.5",
    "plain": "Make the online backward view exactly match the online forward view for linear value functions.",
    "technical": "Uses Dutch traces and correction terms to remove discrepancies caused by changing weights during the episode.",
    "objective": "Exact online lambda-return equivalence under linear approximation.",
    "coreUpdate": "Dutch trace plus correction update.",
    "steps": [
      "Compute old prediction.",
      "Update Dutch trace.",
      "Compute TD error.",
      "Apply true-online weight correction."
    ],
    "pseudocode": [
      "v_old <- previous prediction",
      "z <- gamma*lambda*z + (1-alpha*gamma*lambda*z dot x)*x",
      "delta <- R + gamma*w dot x_next - w dot x",
      "w <- w + alpha*(delta + v - v_old)*z - alpha*(v-v_old)*x"
    ],
    "equations": [],
    "implementationNotes": [
      "Important for precise trace behavior with linear approximation."
    ],
    "failureModes": [
      "Formula is easier to implement incorrectly than conventional TD(lambda)."
    ],
    "related": [
      "Dutch traces",
      "online lambda-return"
    ]
  },
  {
    "chapter": 12,
    "id": "ch12-4",
    "name": "Sarsa(lambda)",
    "family": "Eligibility traces control",
    "bookAnchor": "Section 12.7",
    "plain": "Use eligibility traces over state-action pairs so one TD error updates recent actions.",
    "technical": "Extends TD(lambda) to action-value control with traces for state-action features.",
    "objective": "Speed on-policy control with delayed rewards.",
    "coreUpdate": "z <- gamma lambda z + grad q; w <- w + alpha delta z.",
    "steps": [
      "Choose actions on-policy.",
      "Maintain state-action eligibility trace.",
      "Compute Sarsa TD error.",
      "Update all eligible weights."
    ],
    "pseudocode": [
      "z <- gamma*lambda*z + grad_q(S,A,w)",
      "delta <- R + gamma*qhat(S_next,A_next,w)-qhat(S,A,w)",
      "w <- w + alpha*delta*z"
    ],
    "equations": [],
    "implementationNotes": [
      "Replacing traces are often useful in tabular control."
    ],
    "failureModes": [
      "Off-policy actions require special trace handling."
    ],
    "related": [
      "Watkins Q(lambda)",
      "true online Sarsa(lambda)"
    ]
  },
  {
    "chapter": 12,
    "id": "ch12-5",
    "name": "Watkins Q(lambda)",
    "family": "Off-policy traces",
    "bookAnchor": "Section 12.10",
    "plain": "Use Q-learning targets but cut traces when behavior takes a nongreedy action.",
    "technical": "Maintains eligibility traces for greedy paths and resets or cuts them after exploratory actions to preserve off-policy greedy control logic.",
    "objective": "Combine traces with greedy off-policy control.",
    "coreUpdate": "Q-learning TD error with trace cutting.",
    "steps": [
      "Act with exploratory behavior.",
      "Update traces for visited state-action.",
      "Use max next-action target.",
      "If next action is nongreedy, clear traces."
    ],
    "pseudocode": [
      "delta <- R + gamma*max_a Q(S_next,a)-Q(S,A)",
      "Q <- Q + alpha*delta*z",
      "if A_next is greedy: z <- gamma*lambda*z else z <- 0"
    ],
    "equations": [],
    "implementationNotes": [
      "Trace cutting prevents backing up exploratory deviations as if they were greedy."
    ],
    "failureModes": [
      "Frequent exploration can cut traces often and reduce benefit."
    ],
    "related": [
      "Q-learning",
      "Tree Backup(lambda)"
    ]
  },
  {
    "chapter": 12,
    "id": "ch12-6",
    "name": "Tree Backup(lambda)",
    "family": "Off-policy traces",
    "bookAnchor": "Section 12.10",
    "plain": "Use expected target-policy branches with lambda traces rather than cutting on every nongreedy action.",
    "technical": "Extends tree-backup ideas to lambda-return mixtures, using target-policy probabilities to control trace continuation.",
    "objective": "Lower-variance off-policy trace control.",
    "coreUpdate": "Expected tree-backup lambda return.",
    "steps": [
      "Compute expected action values under target policy.",
      "Continue sampled branch weighted by target probability and lambda.",
      "Update action values toward the tree-backup return."
    ],
    "pseudocode": [
      "build lambda tree-backup return backward",
      "use pi probabilities for branch weights",
      "update Q toward return"
    ],
    "equations": [],
    "implementationNotes": [
      "Avoids raw importance sampling products."
    ],
    "failureModes": [
      "Requires target-policy probabilities and careful recursion."
    ],
    "related": [
      "Tree-backup",
      "Q(sigma)"
    ]
  },
  {
    "chapter": 12,
    "id": "ch12-7",
    "name": "GTD(lambda) / GQ(lambda)",
    "family": "Stable off-policy traces",
    "bookAnchor": "Section 12.11",
    "plain": "Combine gradient-corrected off-policy learning with eligibility traces.",
    "technical": "Extends Gradient-TD ideas to multi-step trace settings for stable off-policy learning under linear approximation.",
    "objective": "Stable off-policy prediction/control with traces.",
    "coreUpdate": "Gradient-TD updates with trace vector.",
    "steps": [
      "Maintain eligibility trace.",
      "Compute TD error.",
      "Update auxiliary weights.",
      "Update primary weights with gradient correction."
    ],
    "pseudocode": [
      "z <- rho*(x + gamma*lambda*z)",
      "delta <- R + gamma*w dot x_next - w dot x",
      "update h and w with GTD/GQ corrections"
    ],
    "equations": [],
    "implementationNotes": [
      "Often written in multiple variants."
    ],
    "failureModes": [
      "Complex and sensitive to step-sizes/ratios."
    ],
    "related": [
      "Gradient TD",
      "Emphatic TD(lambda)"
    ]
  },
  {
    "chapter": 12,
    "id": "ch12-8",
    "name": "Emphatic TD(lambda)",
    "family": "Stable off-policy traces",
    "bookAnchor": "Section 12.11",
    "plain": "Use emphasis and traces together so off-policy multi-step learning weights states properly.",
    "technical": "Adds follow-on/emphasis weighting to lambda-trace TD updates, addressing distribution mismatch with bootstrapping.",
    "objective": "Stable off-policy trace learning.",
    "coreUpdate": "Trace and TD update scaled by emphasis.",
    "steps": [
      "Compute importance ratio.",
      "Update follow-on trace and emphasis.",
      "Update eligibility trace.",
      "Apply emphasized TD update."
    ],
    "pseudocode": [
      "F <- rho_prev*gamma*F + interest",
      "M <- lambda*interest + (1-lambda)*F",
      "z <- rho*(gamma*lambda*z + M*x)",
      "w <- w + alpha*delta*z"
    ],
    "equations": [],
    "implementationNotes": [
      "Direct descendant of emphatic one-step TD."
    ],
    "failureModes": [
      "Can have high variance with large ratios."
    ],
    "related": [
      "Emphatic TD",
      "GTD(lambda)"
    ]
  },
  {
    "chapter": 13,
    "id": "ch13-1",
    "name": "Softmax policy parameterization",
    "family": "Policy gradients",
    "bookAnchor": "Section 13.1",
    "plain": "Represent a stochastic policy by preferences turned into probabilities.",
    "technical": "Uses differentiable preferences h(s,a,theta), often linear in features, and softmax normalization for discrete actions.",
    "objective": "Make policies differentiable for gradient optimization.",
    "coreUpdate": "pi(a|s)=exp(h(s,a))/sum_b exp(h(s,b)).",
    "steps": [
      "Compute action preferences.",
      "Normalize with softmax.",
      "Sample action.",
      "Differentiate log probability for learning."
    ],
    "pseudocode": [
      "h_a <- theta dot x(s,a)",
      "pi(a|s) <- exp(h_a)/sum_b exp(h_b)",
      "A ~ pi(.|s)"
    ],
    "equations": [
      "\\pi(a|s,\\theta)=\\frac{e^{h(s,a,\\theta)}}{\\sum_b e^{h(s,b,\\theta)}}"
    ],
    "implementationNotes": [
      "Temperature or preference scaling changes exploration."
    ],
    "failureModes": [
      "Can saturate if preferences get too large."
    ],
    "related": [
      "REINFORCE",
      "actor-critic"
    ]
  },
  {
    "chapter": 13,
    "id": "ch13-2",
    "name": "REINFORCE",
    "family": "Policy gradients",
    "bookAnchor": "Section 13.3",
    "plain": "Increase the probability of actions that led to high returns.",
    "technical": "Monte Carlo policy-gradient algorithm using return times the score-function gradient of log policy.",
    "objective": "Optimize a parameterized stochastic policy directly.",
    "coreUpdate": "theta <- theta + alpha G_t grad log pi(A_t|S_t).",
    "steps": [
      "Generate an episode.",
      "For each time step, compute return.",
      "Compute score-function gradient.",
      "Move parameters in return-weighted direction."
    ],
    "pseudocode": [
      "generate episode",
      "for each t:",
      "  G <- return from t",
      "  theta <- theta + alpha*G*grad_log_pi(A_t|S_t,theta)"
    ],
    "equations": [
      "\\theta_{t+1}=\\theta_t+\\alpha G_t\\nabla\\ln\\pi(A_t|S_t,\\theta_t)"
    ],
    "implementationNotes": [
      "Unbiased but often high variance."
    ],
    "failureModes": [
      "Needs episodic returns or a continuing variant."
    ],
    "related": [
      "REINFORCE with baseline",
      "actor-critic"
    ]
  },
  {
    "chapter": 13,
    "id": "ch13-3",
    "name": "REINFORCE with baseline",
    "family": "Policy gradients",
    "bookAnchor": "Section 13.4",
    "plain": "Judge the return relative to what was expected from that state.",
    "technical": "Subtracts a state-dependent baseline, often v_hat(s), from the return without changing the expected gradient.",
    "objective": "Reduce policy-gradient variance.",
    "coreUpdate": "theta <- theta + alpha(G_t - b(S_t)) grad log pi.",
    "steps": [
      "Estimate or choose a baseline.",
      "Compute return minus baseline.",
      "Use the advantage-like term in REINFORCE update.",
      "Update baseline separately if learned."
    ],
    "pseudocode": [
      "deltaReturn <- G - b(S)",
      "theta += alpha*deltaReturn*grad_log_pi(A|S)",
      "update baseline weights toward G"
    ],
    "equations": [
      "\\theta_{t+1}=\\theta_t+\\alpha(G_t-b(S_t))\\nabla\\ln\\pi(A_t|S_t,\\theta_t)"
    ],
    "implementationNotes": [
      "Baseline must not depend on action for the standard proof."
    ],
    "failureModes": [
      "A bad baseline can increase variance even if unbiased."
    ],
    "related": [
      "actor-critic",
      "advantage"
    ]
  },
  {
    "chapter": 13,
    "id": "ch13-4",
    "name": "Actor-critic",
    "family": "Policy gradients",
    "bookAnchor": "Section 13.5",
    "plain": "Use a critic to give the actor lower-variance online feedback.",
    "technical": "Combines a parameterized policy (actor) with a value estimator (critic), often using TD error as an advantage estimate.",
    "objective": "Online policy-gradient control.",
    "coreUpdate": "actor update proportional to delta grad log pi; critic update by TD.",
    "steps": [
      "Sample action from actor.",
      "Observe transition.",
      "Critic computes TD error.",
      "Update critic value weights.",
      "Update actor policy weights using TD error."
    ],
    "pseudocode": [
      "A ~ pi_theta(.|S)",
      "observe R,S_next",
      "delta <- R + gamma*vhat(S_next,w)-vhat(S,w)",
      "w <- critic TD update",
      "theta <- theta + alpha_theta*delta*grad_log_pi(A|S,theta)"
    ],
    "equations": [],
    "implementationNotes": [
      "TD error acts like a learned advantage estimate."
    ],
    "failureModes": [
      "Actor and critic step-sizes interact."
    ],
    "related": [
      "REINFORCE with baseline",
      "neural actor-critic"
    ]
  },
  {
    "chapter": 13,
    "id": "ch13-5",
    "name": "Continuing policy-gradient actor-critic",
    "family": "Policy gradients",
    "bookAnchor": "Section 13.6",
    "plain": "Optimize average reward with policy gradients in continuing tasks.",
    "technical": "Uses differential value/average reward ideas inside actor-critic updates for continuing objectives.",
    "objective": "Direct policy optimization without episode boundaries.",
    "coreUpdate": "Actor update uses differential TD error.",
    "steps": [
      "Maintain average reward estimate.",
      "Compute differential TD error.",
      "Update critic.",
      "Update actor with score function times differential signal."
    ],
    "pseudocode": [
      "delta <- R - Rbar + vhat(S_next)-vhat(S)",
      "Rbar <- Rbar + beta*delta",
      "critic update",
      "theta += alpha*delta*grad_log_pi"
    ],
    "equations": [],
    "implementationNotes": [
      "Pairs Chapter 10 average reward with policy gradients."
    ],
    "failureModes": [
      "Requires careful continuing-task stationarity assumptions."
    ],
    "related": [
      "differential Sarsa",
      "actor-critic"
    ]
  },
  {
    "chapter": 13,
    "id": "ch13-6",
    "name": "Gaussian policy-gradient parameterization",
    "family": "Continuous-action policy gradients",
    "bookAnchor": "Section 13.7",
    "plain": "For continuous actions, output parameters of a probability distribution such as a Gaussian.",
    "technical": "Differentiates log probability of sampled continuous action with respect to mean and variance parameters.",
    "objective": "Handle continuous action spaces.",
    "coreUpdate": "theta update uses grad log Normal(a;mu_theta(s),sigma_theta(s)).",
    "steps": [
      "Compute distribution parameters from state.",
      "Sample continuous action.",
      "Observe return or advantage.",
      "Update distribution parameters via log-probability gradient."
    ],
    "pseudocode": [
      "mu,sigma <- network_or_linear_map(S,theta)",
      "A ~ Normal(mu,sigma)",
      "theta += alpha*advantage*grad_log_prob(A|mu,sigma)"
    ],
    "equations": [],
    "implementationNotes": [
      "Variance parameterization must keep sigma positive."
    ],
    "failureModes": [
      "Too-small variance kills exploration; too-large variance makes learning noisy."
    ],
    "related": [
      "REINFORCE",
      "actor-critic"
    ]
  },
  {
    "chapter": 14,
    "id": "ch14-1",
    "name": "Rescorla-Wagner learning rule",
    "family": "Psychology model",
    "bookAnchor": "Section 14.2.2",
    "plain": "Learn cue strength from outcome surprise.",
    "technical": "Updates associative strength in proportion to actual outcome minus summed predicted outcome, a precursor to TD-style prediction-error learning.",
    "objective": "Model classical conditioning phenomena.",
    "coreUpdate": "Delta V_i = alpha_i beta(lambda - sum_j V_j).",
    "steps": [
      "Represent cue strengths.",
      "Compute prediction from all active cues.",
      "Compute surprise.",
      "Update active cue strengths."
    ],
    "pseudocode": [
      "prediction <- sum active cue strengths",
      "error <- outcome - prediction",
      "for active cue i: V_i += alpha_i*beta*error"
    ],
    "equations": [
      "\\Delta V_i=\\alpha_i\\beta(\\lambda-\\sum_j V_j)"
    ],
    "implementationNotes": [
      "Explains blocking-like phenomena."
    ],
    "failureModes": [
      "No temporal chain unless extended by TD representations."
    ],
    "related": [
      "TD conditioning model"
    ]
  },
  {
    "chapter": 14,
    "id": "ch14-2",
    "name": "TD model of classical conditioning",
    "family": "Psychology model",
    "bookAnchor": "Section 14.2.3",
    "plain": "Move prediction error backward from reward time to predictive cues.",
    "technical": "Applies TD prediction to stimulus representations so value predictions and TD errors evolve over time within a trial.",
    "objective": "Model temporally extended conditioning.",
    "coreUpdate": "V <- V + alpha delta features; delta = reward + gamma next prediction - current prediction.",
    "steps": [
      "Encode stimulus over time.",
      "Predict future US/reward.",
      "Compute TD error each time step.",
      "Update active stimulus features."
    ],
    "pseudocode": [
      "x_t <- stimulus representation",
      "delta <- r_{t+1}+gamma*w dot x_{t+1}-w dot x_t",
      "w += alpha*delta*x_t"
    ],
    "equations": [],
    "implementationNotes": [
      "Representation choice strongly affects timing predictions."
    ],
    "failureModes": [
      "Presence-only representations cannot capture all timing effects."
    ],
    "related": [
      "dopamine TD error",
      "Rescorla-Wagner"
    ]
  },
  {
    "chapter": 14,
    "id": "ch14-3",
    "name": "Model-based goal-directed evaluation",
    "family": "Psychology/control model",
    "bookAnchor": "Section 14.6",
    "plain": "Use a model of consequences to replan when outcome values change.",
    "technical": "Contrasts cached model-free values with model-based lookahead sensitive to devaluation and transition changes.",
    "objective": "Explain goal-directed behavior and cognitive maps.",
    "coreUpdate": "Action value computed by lookahead through a model.",
    "steps": [
      "Learn or assume transition/outcome model.",
      "Update current reward/outcome values.",
      "Evaluate actions by planning through the model.",
      "Choose action with best current consequence."
    ],
    "pseudocode": [
      "for each action:",
      "  simulate/model successor outcomes",
      "  compute current value using updated rewards",
      "choose best action"
    ],
    "equations": [],
    "implementationNotes": [
      "Important conceptual bridge to planning."
    ],
    "failureModes": [
      "Planning can be computationally costly and model-dependent."
    ],
    "related": [
      "Dyna",
      "heuristic search"
    ]
  },
  {
    "chapter": 15,
    "id": "ch15-1",
    "name": "Dopamine TD-error model",
    "family": "Neuroscience model",
    "bookAnchor": "Sections 15.3-15.6",
    "plain": "Explain dopamine bursts and dips as prediction errors.",
    "technical": "Maps phasic dopamine-like signals to TD error dynamics as cues become predictive of reward.",
    "objective": "Connect RL prediction errors to neural data.",
    "coreUpdate": "delta_t = r_t + gamma V(t+1)-V(t).",
    "steps": [
      "Represent trial time states.",
      "Learn values by TD.",
      "Track TD error over learning.",
      "Compare error timing to dopamine response."
    ],
    "pseudocode": [
      "delta <- r + gamma*V(next)-V(current)",
      "V(current)+=alpha*delta",
      "interpret delta as phasic teaching signal"
    ],
    "equations": [],
    "implementationNotes": [
      "Best understood as a computational correspondence."
    ],
    "failureModes": [
      "Do not reduce dopamine to raw reward magnitude."
    ],
    "related": [
      "TD conditioning model",
      "actor-critic"
    ]
  },
  {
    "chapter": 15,
    "id": "ch15-2",
    "name": "Neural actor-critic learning rule",
    "family": "Neuroscience model",
    "bookAnchor": "Sections 15.7-15.8",
    "plain": "Use critic-like value prediction and actor-like action preferences modulated by dopamine-like error.",
    "technical": "Maps actor-critic components to possible neural substrates and uses TD error with eligibility-like activity traces.",
    "objective": "Explain action learning in neural terms.",
    "coreUpdate": "Critic and actor synapses update from TD error times eligibility/activity.",
    "steps": [
      "Critic predicts future reward.",
      "TD error is broadcast as teaching signal.",
      "Actor updates action tendencies that were eligible.",
      "Critic updates prediction weights."
    ],
    "pseudocode": [
      "delta <- reward + nextValue - value",
      "critic weights += alpha_c*delta*critic eligibility",
      "actor weights += alpha_a*delta*actor eligibility"
    ],
    "equations": [],
    "implementationNotes": [
      "Eligibility traces make delayed modulation plausible."
    ],
    "failureModes": [
      "Biological mapping is schematic, not exact circuit proof."
    ],
    "related": [
      "actor-critic",
      "dopamine TD error"
    ]
  },
  {
    "chapter": 16,
    "id": "ch16-1",
    "name": "TD-Gammon",
    "family": "Application algorithm",
    "bookAnchor": "Section 16.1",
    "plain": "Use self-play and TD learning to train a neural value function for backgammon.",
    "technical": "Combines nonlinear value approximation, TD(lambda)-style updates, and self-play-generated positions.",
    "objective": "Learn strong game evaluation without hand-labeled targets.",
    "coreUpdate": "Network weights updated from TD errors between successive positions.",
    "steps": [
      "Generate games through self-play.",
      "Evaluate board positions with a neural network.",
      "Compute TD error between successive predictions and final outcome.",
      "Update network weights."
    ],
    "pseudocode": [
      "play self-play game",
      "for each position transition:",
      "  delta <- reward + nextPrediction - currentPrediction",
      "  weights += alpha*delta*eligibility/gradient"
    ],
    "equations": [],
    "implementationNotes": [
      "Historical proof that TD plus self-play can be powerful."
    ],
    "failureModes": [
      "Depends on representation, self-play curriculum, and compute."
    ],
    "related": [
      "afterstates",
      "AlphaGo Zero"
    ]
  },
  {
    "chapter": 16,
    "id": "ch16-2",
    "name": "Samuel checkers learning/search",
    "family": "Application algorithm",
    "bookAnchor": "Section 16.2",
    "plain": "Combine board evaluation learning with lookahead search.",
    "technical": "Uses backed-up evaluations over game trees and learned evaluation features in a classic game-playing system.",
    "objective": "Improve play by combining evaluation and search.",
    "coreUpdate": "Back up leaf evaluations through possible moves.",
    "steps": [
      "Evaluate board positions.",
      "Search possible move sequences.",
      "Back up evaluations to choose moves.",
      "Adjust evaluation from experience."
    ],
    "pseudocode": [
      "expand move tree",
      "evaluate leaves",
      "backup values to root",
      "select best move",
      "learn evaluator from outcomes/backups"
    ],
    "equations": [],
    "implementationNotes": [
      "Prefigures modern value-plus-search systems."
    ],
    "failureModes": [
      "Search depth and evaluator quality are tightly coupled."
    ],
    "related": [
      "heuristic search",
      "TD-Gammon"
    ]
  },
  {
    "chapter": 16,
    "id": "ch16-3",
    "name": "Watson Daily-Double wagering policy",
    "family": "Application algorithm",
    "bookAnchor": "Section 16.3",
    "plain": "Choose wagers by optimizing expected game outcome, not immediate score alone.",
    "technical": "Formulates wagering as a decision problem using estimated win probabilities and outcome values.",
    "objective": "Make high-stakes one-shot decisions under uncertainty.",
    "coreUpdate": "Select wager maximizing expected value of eventual win probability.",
    "steps": [
      "Estimate state of game.",
      "Enumerate legal wagers.",
      "Predict outcomes for possible correctness/results.",
      "Choose wager with best expected objective."
    ],
    "pseudocode": [
      "for each wager w:",
      "  compute expected win probability over outcomes",
      "choose argmax_w expected objective"
    ],
    "equations": [],
    "implementationNotes": [
      "Shows RL/DP thinking in a specialized decision."
    ],
    "failureModes": [
      "Quality depends on probability model and objective."
    ],
    "related": [
      "MDP formulation",
      "planning"
    ]
  },
  {
    "chapter": 16,
    "id": "ch16-4",
    "name": "RL memory controller",
    "family": "Application algorithm",
    "bookAnchor": "Section 16.4",
    "plain": "Learn low-level memory scheduling decisions from performance reward.",
    "technical": "Models DRAM scheduling as a sequential decision task with state features, actions, and performance-oriented rewards.",
    "objective": "Optimize computer-system control policies.",
    "coreUpdate": "Policy/value updates from simulated benchmark rewards.",
    "steps": [
      "Encode memory-controller state.",
      "Choose scheduling command/action.",
      "Observe performance-related reward.",
      "Update policy/control rule."
    ],
    "pseudocode": [
      "observe controller state",
      "choose memory action",
      "observe reward/performance",
      "update RL controller parameters"
    ],
    "equations": [],
    "implementationNotes": [
      "Highlights RL outside games."
    ],
    "failureModes": [
      "Simulation fidelity and reward design are critical."
    ],
    "related": [
      "approximate control",
      "reward design"
    ]
  },
  {
    "chapter": 16,
    "id": "ch16-5",
    "name": "Deep Q-network style Atari learning",
    "family": "Deep RL application",
    "bookAnchor": "Section 16.5",
    "plain": "Learn action values from high-dimensional game screens.",
    "technical": "Uses deep convolutional approximation for action values with stabilizing devices such as replay and target construction in the Atari case study.",
    "objective": "Control from raw visual observations.",
    "coreUpdate": "Deep network trained toward TD/Q-learning targets.",
    "steps": [
      "Preprocess image observations.",
      "Choose action with exploration.",
      "Store transitions.",
      "Sample/reuse transitions for TD targets.",
      "Update network weights."
    ],
    "pseudocode": [
      "observe frames",
      "A <- epsilon-greedy Q_network(frames)",
      "store transition",
      "sample minibatch",
      "target <- R + gamma max_a Q_target(S_next,a)",
      "gradient step on squared TD error"
    ],
    "equations": [],
    "implementationNotes": [
      "The book presents this as an application case study."
    ],
    "failureModes": [
      "Deadly triad risks are central in deep value learning."
    ],
    "related": [
      "Q-learning",
      "deep convolutional network"
    ]
  },
  {
    "chapter": 16,
    "id": "ch16-6",
    "name": "AlphaGo pipeline",
    "family": "Search plus learning application",
    "bookAnchor": "Section 16.6.1",
    "plain": "Use learned policies and values to guide Monte Carlo tree search in Go.",
    "technical": "Combines supervised policy learning, reinforcement learning, value networks, and MCTS for decision-time planning.",
    "objective": "Master Go with learning-guided search.",
    "coreUpdate": "MCTS guided/evaluated by policy and value networks.",
    "steps": [
      "Train policy network from expert/self-play data.",
      "Train value network for position evaluation.",
      "Use networks to guide and evaluate MCTS.",
      "Choose moves from search results."
    ],
    "pseudocode": [
      "policy prior <- p_network(s)",
      "value estimate <- v_network(s)",
      "MCTS uses priors, rollouts/value estimates",
      "play best searched move"
    ],
    "equations": [],
    "implementationNotes": [
      "Shows system integration more than a single update rule."
    ],
    "failureModes": [
      "Compute and data pipelines dominate performance."
    ],
    "related": [
      "MCTS",
      "AlphaGo Zero"
    ]
  },
  {
    "chapter": 16,
    "id": "ch16-7",
    "name": "AlphaGo Zero self-play algorithm",
    "family": "Search plus learning application",
    "bookAnchor": "Section 16.6.2",
    "plain": "Start from self-play only: search improves moves, then the network learns from search.",
    "technical": "Iterates self-play MCTS, training targets from search visit distributions and game outcomes, and network replacement/evaluation.",
    "objective": "Learn policy and value without human examples.",
    "coreUpdate": "Network f_theta(s)->(p,v) trained on (state, MCTS policy, outcome).",
    "steps": [
      "Use current network to guide MCTS self-play.",
      "Record states, search-improved move probabilities, and outcomes.",
      "Train network to predict search policy and winner.",
      "Use improved network for later self-play."
    ],
    "pseudocode": [
      "for each self-play move:",
      "  pi_search <- MCTS(f_theta, state)",
      "  sample/play move from pi_search",
      "after game outcome z: store (s,pi_search,z)",
      "train theta on policy and value losses"
    ],
    "equations": [],
    "implementationNotes": [
      "Closed loop of policy improvement and evaluation."
    ],
    "failureModes": [
      "Requires enormous compute/search budget."
    ],
    "related": [
      "MCTS",
      "TD-Gammon",
      "self-play"
    ]
  },
  {
    "chapter": 16,
    "id": "ch16-8",
    "name": "Personalized web-service value optimization",
    "family": "Application algorithm",
    "bookAnchor": "Section 16.7",
    "plain": "Optimize long-term user value rather than only immediate clicks.",
    "technical": "Frames recommendation/service choices as sequential decisions where lifetime value can differ from click-through reward.",
    "objective": "Align web actions with long-horizon outcomes.",
    "coreUpdate": "Learn or plan from user-state, action, and long-term value estimates.",
    "steps": [
      "Define user state and action choices.",
      "Choose action/recommendation.",
      "Observe short- and long-term signals.",
      "Update value/policy toward lifetime objective."
    ],
    "pseudocode": [
      "S <- user/session state",
      "A <- recommendation/service action",
      "observe reward signals over horizon",
      "update policy/value for LTV objective"
    ],
    "equations": [],
    "implementationNotes": [
      "Reward design is the central lesson."
    ],
    "failureModes": [
      "Short-term proxy rewards can be exploited."
    ],
    "related": [
      "reward design",
      "GVFs"
    ]
  },
  {
    "chapter": 16,
    "id": "ch16-9",
    "name": "Thermal soaring reinforcement learning",
    "family": "Application algorithm",
    "bookAnchor": "Section 16.8",
    "plain": "Learn aircraft control that gains altitude by exploiting thermals.",
    "technical": "Uses reinforcement learning in a continuous control/simulation setting with state variables for flight and atmospheric cues.",
    "objective": "Control a glider in turbulent updrafts.",
    "coreUpdate": "Policy/value updates from simulated flight reward.",
    "steps": [
      "Represent flight state.",
      "Select control action such as bank angle.",
      "Observe altitude/energy reward and new state.",
      "Update controller."
    ],
    "pseudocode": [
      "observe flight state",
      "choose control",
      "simulate next air/glider state",
      "reward altitude/energy progress",
      "update controller"
    ],
    "equations": [],
    "implementationNotes": [
      "Illustrates RL for physical control."
    ],
    "failureModes": [
      "Simulator realism and safety constraints matter."
    ],
    "related": [
      "Mountain Car",
      "continuous control"
    ]
  },
  {
    "chapter": 17,
    "id": "ch17-1",
    "name": "General value function learning",
    "family": "Predictive knowledge",
    "bookAnchor": "Section 17.1",
    "plain": "Use value-function machinery to predict many future signals, not only reward.",
    "technical": "Defines predictions by cumulant, policy, discount/termination, and state, enabling auxiliary tasks and predictive knowledge.",
    "objective": "Represent knowledge as learnable predictions.",
    "coreUpdate": "GVF target is discounted sum of cumulants under a policy.",
    "steps": [
      "Specify cumulant signal.",
      "Specify policy and discount/termination.",
      "Choose state representation.",
      "Learn prediction with TD-style methods."
    ],
    "pseudocode": [
      "question <- (policy, cumulant, discount)",
      "target <- cumulant + gamma*nextPrediction",
      "update GVF value estimate"
    ],
    "equations": [],
    "implementationNotes": [
      "Auxiliary tasks in deep RL are related in spirit."
    ],
    "failureModes": [
      "A GVF is only meaningful if the question is well specified."
    ],
    "related": [
      "TD prediction",
      "auxiliary tasks"
    ]
  },
  {
    "chapter": 17,
    "id": "ch17-2",
    "name": "Options framework",
    "family": "Temporal abstraction",
    "bookAnchor": "Section 17.2",
    "plain": "Treat a temporally extended behavior as an action with a start set, internal policy, and stopping rule.",
    "technical": "Formalizes multi-step courses of action as options with initiation set, option policy, and termination function, enabling hierarchical control.",
    "objective": "Plan and learn over extended actions.",
    "coreUpdate": "option o=(I_o, pi_o, beta_o).",
    "steps": [
      "Check which options are available.",
      "Select an option.",
      "Follow its internal policy until termination.",
      "Update higher-level value over the option outcome."
    ],
    "pseudocode": [
      "available <- {o: S in I_o}",
      "choose option o",
      "while not terminated beta_o: follow pi_o",
      "backup reward sequence to option-value estimate"
    ],
    "equations": [
      "o=(\\mathcal{I}_o,\\pi_o,\\beta_o)"
    ],
    "implementationNotes": [
      "Connects primitive actions to hierarchy."
    ],
    "failureModes": [
      "Bad options can restrict exploration or hide important decisions."
    ],
    "related": [
      "SMDP learning",
      "hierarchical RL"
    ]
  },
  {
    "chapter": 17,
    "id": "ch17-3",
    "name": "Reward design and shaping workflow",
    "family": "Problem design",
    "bookAnchor": "Section 17.4",
    "plain": "Design the signal the agent actually optimizes, then test for loopholes.",
    "technical": "Treats reward as the formal objective interface; shaping or advice must preserve or deliberately change the intended optimal behavior.",
    "objective": "Avoid optimizing the wrong thing.",
    "coreUpdate": "Reward specification plus validation loop.",
    "steps": [
      "State the real goal.",
      "Translate it to reward/cumulant signals.",
      "Check whether optimal behavior matches intent.",
      "Look for exploitable shortcuts."
    ],
    "pseudocode": [
      "define objective in words",
      "define reward R(s,a,s_next)",
      "analyze induced optimal policy",
      "revise if it optimizes proxy instead of goal"
    ],
    "equations": [],
    "implementationNotes": [
      "Potential-based shaping is one formal safe-shaping idea, though details depend on setting."
    ],
    "failureModes": [
      "Reward hacking and proxy misspecification."
    ],
    "related": [
      "GVFs",
      "web-service value optimization"
    ]
  },

  {
    "chapter": 8,
    "id": "ch8-10",
    "name": "Random-sample one-step tabular Q-planning",
    "family": "Planning backup",
    "bookAnchor": "Section 8.1 boxed Q-planning procedure",
    "plain": "Practice Q-learning updates in imagination by sampling state-action pairs from the model instead of waiting for the real world to visit them.",
    "technical": "A model-based planning primitive that samples a state-action pair, samples or enumerates the model's predicted next reward and state, and applies the ordinary one-step Q-learning target to the stored action value.",
    "objective": "Turn a learned or given model into additional Bellman backups between real actions.",
    "coreUpdate": "Q(S,A) <- Q(S,A)+alpha[R+gamma max_a Q(S',a)-Q(S,A)] using a model-generated transition.",
    "steps": [
      "Select a previously seen or model-supported state-action pair.",
      "Query the model for reward and successor state.",
      "Build the one-step Q-learning target from the simulated transition.",
      "Update Q exactly as direct reinforcement learning would."
    ],
    "pseudocode": [
      "repeat planning step:",
      "  sample S,A from planning distribution",
      "  R,S_next <- Model(S,A)",
      "  Q(S,A) <- Q(S,A)+alpha*(R+gamma*max_a Q(S_next,a)-Q(S,A))"
    ],
    "equations": [
      "Q(s,a)\\leftarrow Q(s,a)+\\alpha[r+\\gamma\\max_{a'}Q(s',a')-Q(s,a)]"
    ],
    "implementationNotes": [
      "Use the same update routine for real and simulated transitions to prevent semantic drift.",
      "The planning distribution is an algorithmic choice; uniform sampling is simple but often inefficient."
    ],
    "failureModes": [
      "Sampling impossible or stale state-action pairs can waste computation.",
      "A biased model produces confident but wrong value propagation."
    ],
    "related": [
      "Dyna-Q",
      "Q-learning",
      "trajectory sampling"
    ]
  },
  {
    "chapter": 10,
    "id": "ch10-5",
    "name": "Differential semi-gradient n-step Sarsa",
    "family": "Average-reward approximate control",
    "bookAnchor": "Section 10.5 boxed algorithm",
    "plain": "For continuing tasks, learn from chunks of reward after subtracting the current average reward estimate at every step.",
    "technical": "Extends differential semi-gradient Sarsa by replacing the one-step differential TD target with an n-step differential return, updating action-value weights and the average reward estimate on compatible time-scales.",
    "objective": "Improve approximate action values in continuing control problems without discounting.",
    "coreUpdate": "w <- w + alpha [G_{t:t+n}-qhat(S_t,A_t,w)] grad qhat(S_t,A_t,w), with differential rewards R-bar subtracted inside G.",
    "steps": [
      "Maintain a rolling buffer of states, actions, rewards, and average-reward estimates.",
      "Construct an n-step differential return by subtracting R_bar from each reward.",
      "Bootstrap from qhat at the nth successor if nonterminal/continuing.",
      "Update weights toward that differential target and update R_bar from TD error."
    ],
    "pseudocode": [
      "for each continuing step:",
      "  store S_t,A_t,R_{t+1}",
      "  tau <- t-n+1",
      "  G <- sum_{k=tau+1}^{tau+n}(R_k-R_bar)+qhat(S_{tau+n},A_{tau+n},w)",
      "  w <- w+alpha*(G-qhat(S_tau,A_tau,w))*grad qhat"
    ],
    "equations": [
      "G_{t:t+n}=\\sum_{k=t+1}^{t+n}(R_k-\\bar R)+\\hat q(S_{t+n},A_{t+n},w)"
    ],
    "implementationNotes": [
      "Do not use a terminal reset in a continuing task unless the problem is continuing only by artificial episodes.",
      "The reward-rate estimate can lag badly if alpha_R is too small."
    ],
    "failureModes": [
      "Using discounted-return code here silently changes the objective.",
      "Incorrect buffer indexing turns the n-step return into a shifted target."
    ],
    "related": [
      "differential Sarsa",
      "average reward",
      "n-step Sarsa"
    ]
  },
  {
    "chapter": 12,
    "id": "ch12-9",
    "name": "Online lambda-return algorithm",
    "family": "Eligibility traces / forward view",
    "bookAnchor": "Section 12.4",
    "plain": "Redo earlier updates whenever a longer lambda-return becomes available, so online predictions track the forward-view target more closely.",
    "technical": "Maintains interim lambda-returns and revises recent state estimates online, bridging the conceptual forward view and practical incremental trace methods before true-online refinements.",
    "objective": "Make forward-view lambda-return learning operate during an episode instead of only after it.",
    "coreUpdate": "Recompute interim G_t^lambda from newly observed rewards and bootstrap values, then correct affected predictions.",
    "steps": [
      "Keep recent states and previous interim lambda-return estimates.",
      "After each new transition, update the interim return for earlier times.",
      "Apply corrections to the corresponding value estimates.",
      "At episode end, finish remaining returns with terminal values."
    ],
    "pseudocode": [
      "after observing R,S_next:",
      "  for recent tau:",
      "    recompute interim lambda-return G_tau^lambda|t",
      "    V(S_tau) <- V(S_tau)+alpha*(new-old interim target)"
    ],
    "equations": [
      "G_t^\\lambda=(1-\\lambda)\\sum_{n=1}^{\\infty}\\lambda^{n-1}G_{t:t+n}"
    ],
    "implementationNotes": [
      "This algorithm is mainly explanatory; backward-view TD(lambda) and true-online TD(lambda) are usually easier to implement efficiently."
    ],
    "failureModes": [
      "Naively redoing many updates can be expensive.",
      "Mixing old and new weights in recomputed returns can break the intended equivalence."
    ],
    "related": [
      "offline lambda-return",
      "TD(lambda)",
      "true online TD(lambda)"
    ]
  },
  {
    "chapter": 12,
    "id": "ch12-10",
    "name": "True online Sarsa(lambda)",
    "family": "Control traces",
    "bookAnchor": "Section 12.7 boxed algorithm",
    "plain": "Use Sarsa with a dutch trace correction so online control matches the lambda-return idea more faithfully while learning action values.",
    "technical": "Combines action-value function approximation, epsilon-greedy or target-policy action selection, dutch traces, and the true-online correction term with Q_old to preserve online forward-view equivalence.",
    "objective": "Provide an online trace-based control algorithm with better theoretical forward-view alignment than conventional Sarsa(lambda).",
    "coreUpdate": "w <- w + alpha(delta + Q - Q_old) z - alpha(Q - Q_old) x, with z <- gamma lambda z + (1-alpha gamma lambda z^T x)x.",
    "steps": [
      "Select actions from the current policy or epsilon-greedy action values.",
      "Compute current and next action-value predictions.",
      "Update the dutch eligibility trace for the active state-action features.",
      "Apply the true-online weight correction and carry Q_old forward."
    ],
    "pseudocode": [
      "Q <- w dot x(S,A)",
      "delta <- R + gamma*Q_next - Q",
      "z <- gamma*lambda*z + (1-alpha*gamma*lambda*z dot x)*x",
      "w <- w + alpha*(delta+Q-Q_old)*z - alpha*(Q-Q_old)*x",
      "Q_old <- Q_next"
    ],
    "equations": [
      "z_t=\\gamma\\lambda z_{t-1}+(1-\\alpha\\gamma\\lambda z_{t-1}^\\top x_t)x_t",
      "w_{t+1}=w_t+\\alpha(\\delta_t+Q_t-Q_{old})z_t-\\alpha(Q_t-Q_{old})x_t"
    ],
    "implementationNotes": [
      "Requires storing Q_old and the previous feature vector; omitting either changes the algorithm.",
      "Works naturally with sparse binary features such as tile coding."
    ],
    "failureModes": [
      "Using accumulating traces instead of dutch traces loses the true-online property.",
      "Forgetting to zero terminal features causes terminal bootstrapping leakage."
    ],
    "related": [
      "Sarsa(lambda)",
      "true online TD(lambda)",
      "tile coding"
    ]
  },
  {
    "chapter": 12,
    "id": "ch12-11",
    "name": "Expected Sarsa(lambda)",
    "family": "Control traces",
    "bookAnchor": "Section 12.9 notes",
    "plain": "Replace the sampled next action in trace-based Sarsa with the policy's expected next value when that expectation is available.",
    "technical": "A trace-based action-value method that uses Expected Sarsa's policy expectation inside the TD error while retaining eligibility traces over recently responsible state-action features.",
    "objective": "Reduce next-action sampling variance in lambda-style control backups.",
    "coreUpdate": "delta <- R + gamma sum_a pi(a|S') qhat(S',a,w) - qhat(S,A,w); then update traced features.",
    "steps": [
      "Compute the expected next action value under the target/behavior policy.",
      "Form the Expected-Sarsa TD error.",
      "Update or decay action-value traces.",
      "Adjust weights for all active traced features."
    ],
    "pseudocode": [
      "expected <- sum_a pi(a|S_next)*qhat(S_next,a,w)",
      "delta <- R + gamma*expected - qhat(S,A,w)",
      "z <- trace_update(z,x(S,A))",
      "w <- w + alpha*delta*z"
    ],
    "equations": [
      "\\delta_t=R_{t+1}+\\gamma\\sum_a\\pi(a|S_{t+1})\\hat q(S_{t+1},a,w)-\\hat q(S_t,A_t,w)"
    ],
    "implementationNotes": [
      "Requires enumerating actions or approximating the expectation.",
      "In epsilon-greedy policies, compute the exact greedy-action mass including ties."
    ],
    "failureModes": [
      "Using a sampled A' turns it back into Sarsa(lambda).",
      "Wrong policy probabilities bias the expectation and the control update."
    ],
    "related": [
      "Expected Sarsa",
      "Sarsa(lambda)",
      "Tree Backup(lambda)"
    ]
  },
  {
    "chapter": 12,
    "id": "ch12-12",
    "name": "Hybrid TD(lambda) / HTD(lambda)",
    "family": "Off-policy traces",
    "bookAnchor": "Section 12.11 notes",
    "plain": "Blend ordinary TD-style traces with gradient-style corrections to get a more stable off-policy trace method.",
    "technical": "HTD(lambda) combines aspects of conventional TD(lambda) and gradient-TD trace algorithms, aiming to retain practical learning speed while addressing off-policy instability in linear approximation.",
    "objective": "Provide a compromise trace algorithm in the off-policy approximate prediction setting.",
    "coreUpdate": "Hybrid correction between TD(lambda)-style primary weights and gradient-TD secondary correction terms.",
    "steps": [
      "Maintain primary value weights and any required correction quantities.",
      "Compute off-policy TD error with ratios or target-policy weighting.",
      "Apply a hybrid trace/correction update.",
      "Monitor stability against TD(lambda) and GTD(lambda) baselines."
    ],
    "pseudocode": [
      "rho <- pi(A|S)/b(A|S)",
      "delta <- R + gamma*vhat(S_next,w) - vhat(S,w)",
      "update traces and hybrid correction",
      "w <- w + corrected off-policy trace step"
    ],
    "equations": [],
    "implementationNotes": [
      "Treat as an advanced off-policy linear method; log ratios, traces, and weight norms.",
      "Compare against emphatic TD(lambda) when emphasis weighting is available."
    ],
    "failureModes": [
      "Can still be sensitive to feature conditioning and large behavior-target mismatch.",
      "A missing correction term makes it ordinary off-policy TD(lambda), which can diverge."
    ],
    "related": [
      "GTD(lambda)",
      "Emphatic TD(lambda)",
      "deadly triad"
    ]
  },
  {
    "chapter": 13,
    "id": "ch13-7",
    "name": "One-step actor-critic (episodic)",
    "family": "Actor-critic",
    "bookAnchor": "Section 13.5 boxed algorithm",
    "plain": "Let a critic judge the last action with a one-step TD error, then let the actor make that action more or less likely.",
    "technical": "Uses a differentiable stochastic actor and differentiable value-function critic; the critic updates by semi-gradient TD and the actor updates log policy parameters proportional to the TD error and discount weighting term.",
    "objective": "Make policy-gradient control fully online instead of waiting for complete Monte Carlo returns.",
    "coreUpdate": "delta <- R + gamma vhat(S',w) - vhat(S,w); w <- w + alpha_w delta grad vhat; theta <- theta + alpha_theta I delta grad log pi(A|S,theta).",
    "steps": [
      "Sample an action from the current actor.",
      "Observe reward and next state.",
      "Compute the critic's one-step TD error.",
      "Update critic weights and actor parameters from the same error signal."
    ],
    "pseudocode": [
      "A ~ pi(.|S,theta)",
      "take A observe R,S_next",
      "delta <- R + gamma*vhat(S_next,w)-vhat(S,w)",
      "w <- w+alpha_w*delta*grad_w vhat(S,w)",
      "theta <- theta+alpha_theta*I*delta*grad_theta log pi(A|S,theta)"
    ],
    "equations": [
      "\\delta_t=R_{t+1}+\\gamma\\hat v(S_{t+1},w)-\\hat v(S_t,w)",
      "\\theta\\leftarrow\\theta+\\alpha_\\theta I_t\\delta_t\\nabla_\\theta\\ln\\pi(A_t|S_t,\\theta)"
    ],
    "implementationNotes": [
      "The actor and critic need separate step-sizes.",
      "The critic baseline reduces variance but its bias can steer the actor if poorly learned."
    ],
    "failureModes": [
      "Updating the actor with raw reward instead of TD error loses bootstrapped advantage information.",
      "A saturated policy can make gradients vanish before the critic improves."
    ],
    "related": [
      "REINFORCE with baseline",
      "continuing actor-critic",
      "TD error"
    ]
  },
  {
    "chapter": 13,
    "id": "ch13-8",
    "name": "Actor-critic with eligibility traces (episodic)",
    "family": "Actor-critic traces",
    "bookAnchor": "Section 13.5 boxed trace algorithm",
    "plain": "Keep one trace for the actor and one trace for the critic so a TD error can credit many recent choices, not just the last one.",
    "technical": "Maintains separate eligibility traces z_theta and z_w for the policy-gradient log-probability features and value-gradient features; the same TD error updates both traced parameter sets.",
    "objective": "Combine actor-critic online learning with multi-step credit assignment.",
    "coreUpdate": "z_w <- gamma lambda_w z_w + grad_w vhat(S,w); z_theta <- gamma lambda_theta z_theta + I grad_theta log pi(A|S,theta); w,theta move by delta times their traces.",
    "steps": [
      "Initialize actor and critic traces at episode start.",
      "Sample action and compute TD error after the transition.",
      "Accumulate/decay critic and actor traces separately.",
      "Apply TD-error-scaled updates to both parameter vectors."
    ],
    "pseudocode": [
      "delta <- R + gamma*vhat(S_next,w)-vhat(S,w)",
      "z_w <- gamma*lambda_w*z_w + grad_w vhat(S,w)",
      "z_theta <- gamma*lambda_theta*z_theta + I*grad log pi(A|S,theta)",
      "w <- w + alpha_w*delta*z_w",
      "theta <- theta + alpha_theta*delta*z_theta"
    ],
    "equations": [
      "z^\\theta_t=\\gamma\\lambda_\\theta z^\\theta_{t-1}+I_t\\nabla_\\theta\\ln\\pi(A_t|S_t,\\theta)",
      "z^w_t=\\gamma\\lambda_w z^w_{t-1}+\\nabla_w\\hat v(S_t,w)"
    ],
    "implementationNotes": [
      "Separate lambda values are allowed for actor and critic.",
      "Reset both traces at episode boundaries and handle terminal vhat as zero."
    ],
    "failureModes": [
      "Sharing a single trace between actor and critic mixes incompatible feature spaces.",
      "Large traces can create high-variance actor steps."
    ],
    "related": [
      "one-step actor-critic",
      "TD(lambda)",
      "eligibility traces"
    ]
  },
  {
    "chapter": 16,
    "id": "ch16-10",
    "name": "Experience replay for deep Q-learning",
    "family": "Deep RL stabilizer",
    "bookAnchor": "Section 16.5 Atari/DQN discussion",
    "plain": "Store past transitions and train on shuffled memories so a neural Q-learner does not chase only the latest correlated experience.",
    "technical": "A replay buffer changes the update distribution for DQN-style Q-learning by sampling stored transitions, improving data reuse and weakening temporal correlations in stochastic-gradient updates.",
    "objective": "Stabilize and improve sample efficiency of neural-network Q-learning.",
    "coreUpdate": "Sample (S,A,R,S') from replay and minimize [R+gamma max_a Q_target(S',a)-Q(S,A;w)]^2.",
    "steps": [
      "Append each real transition to a finite replay buffer.",
      "Sample minibatches uniformly or by priority.",
      "Compute Q-learning targets for sampled transitions.",
      "Apply stochastic-gradient updates to network weights."
    ],
    "pseudocode": [
      "D <- replay buffer",
      "after each step store (S,A,R,S_next,done)",
      "batch <- sample(D)",
      "target <- R + gamma*(1-done)*max_a Q_target(S_next,a)",
      "gradient step on squared TD error"
    ],
    "equations": [
      "L(w)=\\mathbb{E}_{(s,a,r,s')\\sim D}[(r+\\gamma\\max_{a'}Q(s',a';w^-)-Q(s,a;w))^2]"
    ],
    "implementationNotes": [
      "Replay does not by itself fix overestimation; combine with target networks or double methods as needed.",
      "Coverage in the buffer controls what the network can learn."
    ],
    "failureModes": [
      "A stale or imbalanced buffer can overrepresent old behavior.",
      "Sequential sampling from replay defeats the decorrelation purpose."
    ],
    "related": [
      "DQN",
      "Q-learning",
      "target network"
    ]
  },
  {
    "chapter": 16,
    "id": "ch16-11",
    "name": "Target-network stabilized DQN",
    "family": "Deep RL stabilizer",
    "bookAnchor": "Section 16.5 Atari/DQN discussion",
    "plain": "Use a slower frozen copy of the Q-network to make targets less like a moving mirror.",
    "technical": "DQN-style learning periodically copies online weights into target weights w^- and uses the target network in the bootstrap term, reducing harmful feedback between predictions and targets.",
    "objective": "Reduce instability caused by chasing bootstrap targets produced by the same rapidly changing network.",
    "coreUpdate": "y=R+gamma max_a Q(S',a;w^-), then update online w to reduce (y-Q(S,A;w))^2; periodically set w^- <- w.",
    "steps": [
      "Maintain online and target Q-network weights.",
      "Compute TD targets with the target network only.",
      "Update the online network by gradient descent.",
      "Periodically or slowly copy online weights to target weights."
    ],
    "pseudocode": [
      "target <- R + gamma*max_a Q(S_next,a;w_target)",
      "w <- w - alpha*grad_w(target-Q(S,A;w))^2",
      "every C steps: w_target <- w"
    ],
    "equations": [
      "y_t=R_{t+1}+\\gamma\\max_a Q(S_{t+1},a;w^-)"
    ],
    "implementationNotes": [
      "Hard updates use a copy interval; soft updates use Polyak averaging.",
      "Keep target-network parameters out of the gradient graph."
    ],
    "failureModes": [
      "Updating the target every step collapses the stabilizing separation.",
      "A target updated too rarely can make learning lag behind a changed policy distribution."
    ],
    "related": [
      "DQN",
      "experience replay",
      "Q-learning"
    ]
  },
  {
    "chapter": 16,
    "id": "ch16-12",
    "name": "Fitted Q-iteration / batch reinforcement learning",
    "family": "Batch RL",
    "bookAnchor": "Section 16.6 web-service applications",
    "plain": "When interaction is expensive or historical, repeatedly fit a value model to a fixed dataset instead of learning only online.",
    "technical": "Fitted Q-iteration builds supervised regression targets from a batch of transitions and iteratively refits an action-value approximator to approximate Bellman optimality over the dataset distribution.",
    "objective": "Learn value-based policies from logged datasets when online exploration is unavailable or limited.",
    "coreUpdate": "Fit Q_k to targets y_i=r_i+gamma max_a Q_{k-1}(s'_i,a) over all logged transitions.",
    "steps": [
      "Collect or load a batch of transition tuples.",
      "Initialize an action-value regressor.",
      "Build Bellman targets with the previous regressor.",
      "Refit the regressor and repeat for several fitted iterations."
    ],
    "pseudocode": [
      "for k in fitted iterations:",
      "  for each logged transition i:",
      "    y_i <- r_i + gamma*max_a Q_{k-1}(s_i_next,a)",
      "  fit regressor Q_k to (s_i,a_i)->y_i"
    ],
    "equations": [
      "y_i^{(k)}=r_i+\\gamma\\max_a Q_{k-1}(s'_i,a)"
    ],
    "implementationNotes": [
      "Logged-action coverage is critical; extrapolating to unseen actions is a major risk.",
      "Use validation/off-policy evaluation before deployment."
    ],
    "failureModes": [
      "Distribution shift can make high-valued unseen actions artifacts of the function approximator.",
      "Batch data may encode a poor behavior policy with limited support."
    ],
    "related": [
      "LTV optimization",
      "Q-learning",
      "function approximation"
    ]
  },
  {
    "chapter": 17,
    "id": "ch17-4",
    "name": "Intra-option learning",
    "family": "Hierarchical RL",
    "bookAnchor": "Section 17.3 options discussion",
    "plain": "Update an option whenever the current experience is consistent with that option, even if the agent did not explicitly choose it at the top level.",
    "technical": "Uses off-policy updates for option-value or intra-option value functions so temporally extended actions can learn from primitive transitions generated during ongoing behavior.",
    "objective": "Make option learning more data-efficient than waiting only for completed option executions.",
    "coreUpdate": "Option-value backups combine immediate reward with continuation probability 1-beta_o(s') and termination value beta_o(s') max_o' Q(s',o').",
    "steps": [
      "For each relevant option, test whether its intra-option policy assigns probability to the observed action.",
      "Compute the option continuation/termination backup.",
      "Apply an off-policy correction if learning about an option not currently controlling behavior.",
      "Update option values before the option necessarily terminates."
    ],
    "pseudocode": [
      "for option o consistent with transition:",
      "  target <- R + gamma*((1-beta_o(S_next))*Q(S_next,o)+beta_o(S_next)*max_o2 Q(S_next,o2))",
      "  Q(S,o) <- Q(S,o)+alpha*rho*(target-Q(S,o))"
    ],
    "equations": [
      "U(s',o)=(1-\\beta_o(s'))Q(s',o)+\\beta_o(s')\\max_{o'}Q(s',o')"
    ],
    "implementationNotes": [
      "You must implement initiation sets and termination functions before debugging value updates.",
      "Off-policy intra-option learning can reuse much more experience than option-completion learning."
    ],
    "failureModes": [
      "Updating options whose policies could not have generated the action creates invalid credit.",
      "Bad termination probabilities can trap the agent in or out of options."
    ],
    "related": [
      "options framework",
      "SMDP learning",
      "off-policy learning"
    ]
  },
  {
    "chapter": 17,
    "id": "ch17-5",
    "name": "Option value iteration / SMDP planning",
    "family": "Hierarchical planning",
    "bookAnchor": "Section 17.3 option Bellman equations",
    "plain": "Plan over skills as if they were actions that last for a while, discounting across however long each skill runs.",
    "technical": "Generalizes Bellman optimality backups to semi-Markov options by backing up reward accumulated over an option's duration plus discounted value at the option termination state.",
    "objective": "Use dynamic programming ideas when the action choices are temporally extended options rather than primitive actions.",
    "coreUpdate": "V(s) <- max_o E[R_{t+1}+...+gamma^{k-1}R_{t+k}+gamma^k V(S_{t+k}) | S_t=s,o].",
    "steps": [
      "Enumerate available options from the state's initiation set.",
      "Evaluate each option's multi-step reward and termination distribution.",
      "Discount the terminal state's value by the random duration.",
      "Choose or improve the policy over options."
    ],
    "pseudocode": [
      "for each state s:",
      "  for each option o in I(s):",
      "    backup[o] <- expected discounted reward during o + expected gamma^duration*V(termination_state)",
      "  V(s) <- max_o backup[o]"
    ],
    "equations": [
      "V(s)=\\max_o\\mathbb{E}[R_{t+1}+\\cdots+\\gamma^{k-1}R_{t+k}+\\gamma^kV(S_{t+k})|S_t=s,o]"
    ],
    "implementationNotes": [
      "Duration k is random; do not treat all options as one-step unless they actually terminate every step.",
      "Planning over options trades a smaller decision tree for model/option-evaluation complexity."
    ],
    "failureModes": [
      "Ignoring option duration overvalues long options.",
      "An option set with poor coverage can make the hierarchical optimum worse than primitive-action control."
    ],
    "related": [
      "options framework",
      "value iteration",
      "SMDP"
    ]
  },
  {
    "chapter": 17,
    "id": "ch17-6",
    "name": "Potential-based reward shaping",
    "family": "Reward design",
    "bookAnchor": "Section 17.4 reward design discussion",
    "plain": "Give extra hints using a potential score, but structure them so the best final policy stays the same.",
    "technical": "Adds shaping reward F(s,s')=gamma Phi(s')-Phi(s), which changes transient learning signals while preserving optimal policies under standard discounted assumptions.",
    "objective": "Speed learning without changing which behavior is truly optimal.",
    "coreUpdate": "R'_t = R_t + gamma Phi(S_{t+1}) - Phi(S_t).",
    "steps": [
      "Define a potential function that measures progress-like state information.",
      "Add the discounted potential difference to each reward.",
      "Train the RL algorithm on shaped reward.",
      "Check policy invariance and remove shaping from evaluation if needed."
    ],
    "pseudocode": [
      "Phi <- progress potential",
      "for transition S,R,S_next:",
      "  F <- gamma*Phi(S_next)-Phi(S)",
      "  shaped_R <- R + F",
      "  feed shaped_R to learner"
    ],
    "equations": [
      "F(s,s')=\\gamma\\Phi(s')-\\Phi(s)",
      "R'(s,a,s')=R(s,a,s')+F(s,s')"
    ],
    "implementationNotes": [
      "Use shaping as an optimization aid, not as a hidden change to the task objective.",
      "Potential-based shaping is safest when the discount and terminal handling match the theoretical assumptions."
    ],
    "failureModes": [
      "Arbitrary shaping can create reward hacking and different optimal policies.",
      "Terminal potentials handled incorrectly can add spurious terminal bonuses."
    ],
    "related": [
      "reward design",
      "potential functions",
      "policy invariance"
    ]
  }

] satisfies AlgorithmDetail[];

export const algorithmTotals = {
  total: algorithmCatalog.length,
  chapters: new Set(algorithmCatalog.map((algorithm) => algorithm.chapter)).size,
  families: new Set(algorithmCatalog.map((algorithm) => algorithm.family)).size,
};

export function algorithmsForChapter(chapter: number) {
  return algorithmCatalog.filter((algorithm) => algorithm.chapter === chapter);
}

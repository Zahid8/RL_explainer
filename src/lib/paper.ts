export type Accent = "cyan" | "orange" | "blue" | "violet" | "lime";

export interface Term {
  id: string;
  sym: string;
  name: string;
  plain: string;
  precise: string;
  why: string;
  appears: string;
  accent: Accent;
  glyph: GlyphKind;
}

export type GlyphKind =
  | "agent"
  | "policy"
  | "reward"
  | "value"
  | "model"
  | "return"
  | "discount"
  | "transition"
  | "bellman"
  | "epsilon"
  | "ucb"
  | "importance"
  | "td"
  | "lambda"
  | "gradient"
  | "weights"
  | "expectation"
  | "trace"
  | "option"
  | "average";

export interface Chapter {
  n: number;
  title: string;
  part: "Foundations" | "Tabular" | "Approximation" | "Looking deeper";
  pages: string;
  claim: string;
  easy: string;
  technical: string;
  keyIdeas: string[];
  sections: string[];
  equations: string[];
  algorithms: string[];
  examples: string[];
  commonConfusions: string[];
  bridge: string;
}

export interface AlgorithmLine {
  n: number;
  indent: number;
  text: string;
  tag?: "loop" | "update" | "choice" | "model" | "target";
  note: string;
}

export const book = {
  title: "Reinforcement Learning: An Introduction",
  subtitle: "Second edition chapter-by-chapter explainer",
  authors: "Richard S. Sutton and Andrew G. Barto",
  source: "RLbook2020.pdf, 2020 MIT Press PDF of the 2018 second edition",
  claim:
    "Reinforcement learning is the study of agents that learn what to do by interacting with an environment, balancing reward now against value later.",
  stats: [
    { value: "17", label: "chapters explained" },
    { value: "3", label: "parts: tabular, approximation, deeper links" },
    { value: "548", label: "PDF pages parsed" },
    { value: "2000+", label: "detail tiles and notes" },
  ],
};

export const parts = [
  {
    id: "tabular",
    name: "Part I",
    label: "Tabular solution methods",
    chapters: "2-8",
    plain: "Start with small worlds where every state and action can fit in a table.",
    precise:
      "Introduces value functions, Bellman equations, dynamic programming, Monte Carlo, temporal-difference learning, n-step bootstrapping, and tabular planning.",
  },
  {
    id: "approximation",
    name: "Part II",
    label: "Approximate solution methods",
    chapters: "9-13",
    plain: "Replace the table with features, weights, and policies that generalize across many states.",
    precise:
      "Extends prediction, control, off-policy learning, eligibility traces, and policy gradients to function approximation and parameterized policies.",
  },
  {
    id: "deeper",
    name: "Part III",
    label: "Looking deeper",
    chapters: "14-17",
    plain: "Connect the algorithms to psychology, neuroscience, applications, and unresolved frontiers.",
    precise:
      "Maps RL concepts to conditioning, dopamine prediction errors, historical systems, deep RL case studies, options, GVFs, state, reward design, and AI futures.",
  },
];

export const terms: Term[] = [
  {
    id: "agent",
    sym: "\\text{agent}",
    name: "agent",
    plain: "The learner that chooses actions and changes from experience.",
    precise: "The decision-making system that receives states and rewards from the environment and emits actions.",
    why: "Every chapter asks how this learner should choose, evaluate, or improve behavior.",
    appears: "Chapters 1, 3, 8, 14-17",
    accent: "cyan",
    glyph: "agent",
  },
  {
    id: "policy",
    sym: "\\pi(a\\mid s)",
    name: "policy",
    plain: "The agent's habit: in this situation, how likely is each move?",
    precise: "A mapping from states to action probabilities; deterministic policies choose one action, stochastic policies define a distribution.",
    why: "Learning is ultimately policy improvement, even when the algorithm spends most of its time estimating values.",
    appears: "Chapters 1, 3-6, 10, 13",
    accent: "cyan",
    glyph: "policy",
  },
  {
    id: "reward",
    sym: "R_{t+1}",
    name: "reward signal",
    plain: "The scalar feedback telling the agent what just happened was good or bad.",
    precise: "The immediate numerical consequence emitted after action A_t and transition to S_{t+1}.",
    why: "The book treats reward as the definition of the goal, not as a hint or label supplied by a teacher.",
    appears: "Chapters 1, 3, 10, 17",
    accent: "orange",
    glyph: "reward",
  },
  {
    id: "return",
    sym: "G_t",
    name: "return",
    plain: "The total future payoff counted from now onward.",
    precise: "A discounted or undiscounted sum of future rewards, commonly G_t = R_{t+1} + gamma R_{t+2} + ... .",
    why: "Prediction methods learn expected return; control methods choose actions that improve it.",
    appears: "Chapters 3, 5-7, 12-13",
    accent: "blue",
    glyph: "return",
  },
  {
    id: "discount",
    sym: "\\gamma",
    name: "discount factor",
    plain: "A knob that makes later rewards count less than sooner rewards.",
    precise: "A scalar in [0, 1] multiplying future rewards in the return and Bellman equations.",
    why: "It helps continuing tasks have finite values and controls the planning horizon.",
    appears: "Chapters 3, 6, 7, 10, 12",
    accent: "lime",
    glyph: "discount",
  },
  {
    id: "value-state",
    sym: "v_\\pi(s)",
    name: "state-value function",
    plain: "How good this state is if the agent keeps following policy pi.",
    precise: "The expected return from state s under policy pi: v_pi(s) = E_pi[G_t | S_t=s].",
    why: "It turns delayed reward into a local score that can guide decisions.",
    appears: "Chapters 1, 3-9, 14-15",
    accent: "blue",
    glyph: "value",
  },
  {
    id: "value-action",
    sym: "q_\\pi(s,a)",
    name: "action-value function",
    plain: "How good it is to take this action now, then continue with policy pi.",
    precise: "The expected return conditioned on S_t=s and A_t=a under policy pi.",
    why: "Control is easier when the algorithm can compare actions directly without a model.",
    appears: "Chapters 3, 5-7, 10, 13",
    accent: "blue",
    glyph: "value",
  },
  {
    id: "transition",
    sym: "p(s',r\\mid s,a)",
    name: "environment dynamics",
    plain: "The world's response table: what might happen next if the agent acts here.",
    precise: "The joint probability of next state s' and reward r given current state s and action a.",
    why: "Dynamic programming and planning use this directly; model-free learning estimates values without it.",
    appears: "Chapters 3-4, 8",
    accent: "violet",
    glyph: "transition",
  },
  {
    id: "bellman",
    sym: "v = \\mathcal{B}_\\pi v",
    name: "Bellman backup",
    plain: "Update today's estimate from the immediate reward plus tomorrow's estimate.",
    precise: "A recursive operator equating a value to expected one-step reward plus discounted successor value.",
    why: "Nearly every algorithm in the book is a way to approximate or exploit this recursion.",
    appears: "Chapters 3-8, 11",
    accent: "cyan",
    glyph: "bellman",
  },
  {
    id: "epsilon",
    sym: "\\varepsilon",
    name: "epsilon exploration",
    plain: "Occasionally try something that is not currently believed to be best.",
    precise: "With probability epsilon select a non-greedy or random action instead of the greedy action.",
    why: "Without exploration, early unlucky estimates can permanently hide better actions.",
    appears: "Chapters 2, 5-6, 10",
    accent: "orange",
    glyph: "epsilon",
  },
  {
    id: "ucb",
    sym: "Q_t(a)+c\\sqrt{\\frac{\\ln t}{N_t(a)}}",
    name: "upper confidence bound",
    plain: "Prefer actions that are either promising or not tried enough yet.",
    precise: "An action-selection score adding an uncertainty bonus to the estimated action value.",
    why: "It gives exploration a directed optimism instead of random dithering.",
    appears: "Chapter 2",
    accent: "lime",
    glyph: "ucb",
  },
  {
    id: "td-error",
    sym: "\\delta_t",
    name: "TD error",
    plain: "The surprise between what the agent predicted and what the next step revealed.",
    precise: "Often delta_t = R_{t+1} + gamma V(S_{t+1}) - V(S_t), with variants for action values and average reward.",
    why: "TD, Sarsa, Q-learning, actor-critic, and dopamine interpretations all revolve around this error signal.",
    appears: "Chapters 6, 10, 12-15",
    accent: "orange",
    glyph: "td",
  },
  {
    id: "importance",
    sym: "\\rho_{t:T-1}",
    name: "importance-sampling ratio",
    plain: "A correction for learning from data collected by a different behavior.",
    precise: "A product of target-policy probabilities divided by behavior-policy probabilities over a trajectory or decision sequence.",
    why: "Off-policy learning needs it to reuse experience while estimating a different policy, but variance can explode.",
    appears: "Chapters 5, 7, 11-12",
    accent: "violet",
    glyph: "importance",
  },
  {
    id: "lambda",
    sym: "\\lambda",
    name: "trace-decay parameter",
    plain: "How much credit from a new surprise spreads backward through recent memories.",
    precise: "A scalar controlling the mixture over n-step returns or the decay of eligibility traces.",
    why: "It interpolates between one-step bootstrapping and Monte Carlo-style long backups.",
    appears: "Chapters 7, 12",
    accent: "lime",
    glyph: "lambda",
  },
  {
    id: "eligibility",
    sym: "\\mathbf{z}_t",
    name: "eligibility trace",
    plain: "A fading spotlight on recently used features or states.",
    precise: "A trace vector accumulating recent feature activity, then decaying by gamma lambda or a related rule.",
    why: "It lets TD methods update many recently responsible predictions from one new error.",
    appears: "Chapter 12",
    accent: "cyan",
    glyph: "trace",
  },
  {
    id: "weights",
    sym: "\\mathbf{w}",
    name: "weight vector",
    plain: "The adjustable knobs of an approximate value function.",
    precise: "Parameters of a linear or nonlinear function approximator, updated by semi-gradient or gradient methods.",
    why: "Part II replaces tables with weights so learning can generalize across large state spaces.",
    appears: "Chapters 9-13",
    accent: "violet",
    glyph: "weights",
  },
  {
    id: "gradient",
    sym: "\\nabla",
    name: "gradient",
    plain: "An arrow showing how to change parameters to move the objective upward or downward fastest.",
    precise: "The vector of partial derivatives of an objective with respect to parameters.",
    why: "Function approximation and policy gradients need parameter updates rather than table replacements.",
    appears: "Chapters 9, 11, 13",
    accent: "orange",
    glyph: "gradient",
  },
  {
    id: "expectation",
    sym: "\\mathbb{E}[\\cdot]",
    name: "expectation",
    plain: "The long-run average over all random ways events could unfold.",
    precise: "A probability-weighted average over trajectories, transitions, or actions.",
    why: "RL equations state what should be true on average, while algorithms estimate it from samples.",
    appears: "Throughout Chapters 2-13",
    accent: "blue",
    glyph: "expectation",
  },
  {
    id: "average-reward",
    sym: "\\bar{R}",
    name: "average reward",
    plain: "The steady reward rate in continuing tasks.",
    precise: "The long-run average reward per time step, used in differential value methods.",
    why: "Chapter 10 argues it is often a better continuing-task objective than discounted return.",
    appears: "Chapter 10",
    accent: "lime",
    glyph: "average",
  },
  {
    id: "option",
    sym: "\\langle I,\\pi,\\beta\\rangle",
    name: "option",
    plain: "A reusable temporally extended skill with a start set, inner policy, and stop rule.",
    precise: "A semi-Markov action defined by initiation set I, intra-option policy pi, and termination function beta.",
    why: "Options are the book's front-door to temporal abstraction and hierarchical RL.",
    appears: "Chapter 17",
    accent: "violet",
    glyph: "option",
  },
];

export const chapters: Chapter[] = [
  {
    n: 1,
    title: "Introduction",
    part: "Foundations",
    pages: "1-22",
    claim: "RL is not supervised learning with delayed labels; it is goal-directed trial-and-error interaction.",
    easy: "Imagine learning a game by playing it. Nobody tells you the best move on each turn; you try moves, see wins or losses later, and slowly learn which situations are promising.",
    technical: "Defines the agent-environment loop, policy, reward signal, value function, optional model, exploration, exploitation, and the value-backup idea through tic-tac-toe.",
    keyIdeas: ["Agent-environment interface", "Policy, reward, value, model", "Exploration versus exploitation", "Learning from evaluative feedback", "Value backups"],
    sections: ["1.1 Reinforcement Learning", "1.2 Examples", "1.3 Elements of Reinforcement Learning", "1.4 Limitations and Scope", "1.5 Tic-Tac-Toe", "1.6 Summary", "1.7 Early History"],
    equations: ["V(S_t) <- V(S_t) + alpha [V(S_{t+1}) - V(S_t)]"],
    algorithms: ["Value-based tic-tac-toe self-improvement", "Mostly greedy action selection with occasional exploration"],
    examples: ["Chess", "robot control", "breakfast decisions", "tic-tac-toe"],
    commonConfusions: ["Reward is immediate; value is long-term prediction.", "A model is optional; a policy is not.", "Exploration can reduce short-term performance while improving learning."],
    bridge: "Chapter 2 isolates the exploration problem in the simplest possible setting: one state and many actions.",
  },
  {
    n: 2,
    title: "Multi-armed Bandits",
    part: "Tabular",
    pages: "25-46",
    claim: "Before learning state-to-state behavior, learn the pure exploration problem: which action should be tried next?",
    easy: "A bandit is like choosing among slot machines. You only learn about a machine by pulling its arm, but every pull spent learning is also a pull where you wanted reward.",
    technical: "Studies k-armed bandits with sample-average action values, incremental updates, constant step-sizes for nonstationarity, optimistic starts, UCB, gradient bandits, and contextual bandits.",
    keyIdeas: ["Action-value estimates", "Sample-average update", "Constant alpha tracking", "Optimism under uncertainty", "Gradient preferences and softmax"],
    sections: ["2.1 k-armed Bandit Problem", "2.2 Action-value Methods", "2.3 10-armed Testbed", "2.4 Incremental Implementation", "2.5 Nonstationary Problems", "2.6 Optimistic Initial Values", "2.7 UCB", "2.8 Gradient Bandits", "2.9 Contextual Bandits", "2.10 Summary"],
    equations: ["Q_{n+1}=Q_n + (1/n)(R_n-Q_n)", "Q_{n+1}=Q_n + alpha(R_n-Q_n)", "A_t = argmax_a [Q_t(a)+c sqrt(ln t / N_t(a))]", "Pr{A_t=a}= exp(H_t(a))/sum_b exp(H_t(b))"],
    algorithms: ["epsilon-greedy", "sample-average bandit", "constant-step nonstationary bandit", "UCB", "gradient bandit"],
    examples: ["10-armed testbed", "nonstationary drifting rewards", "associative search"],
    commonConfusions: ["Greedy is not optimal while estimates are uncertain.", "Sample averages remember the distant past; constant alpha forgets it.", "Gradient bandits learn preferences, not values."],
    bridge: "Chapter 3 adds state transitions so an action's consequences can unfold over time.",
  },
  {
    n: 3,
    title: "Finite Markov Decision Processes",
    part: "Tabular",
    pages: "47-72",
    claim: "The MDP is the mathematical shape of the RL problem: state, action, reward, next state, repeat.",
    easy: "An MDP is a board game rulebook for uncertainty. It says where you can be, what you can do, what reward you get, and where the move may send you.",
    technical: "Formalizes p(s',r|s,a), episodic and continuing tasks, returns, discounting, unified notation, policies, state-value and action-value functions, Bellman equations, optimality, and approximation limits.",
    keyIdeas: ["Markov property", "Return G_t", "Discount gamma", "Bellman expectation equations", "Optimal value functions"],
    sections: ["3.1 Agent-Environment Interface", "3.2 Goals and Rewards", "3.3 Returns and Episodes", "3.4 Unified Notation", "3.5 Policies and Value Functions", "3.6 Optimal Policies and Optimal Value Functions", "3.7 Optimality and Approximation", "3.8 Summary"],
    equations: ["G_t = R_{t+1}+gamma R_{t+2}+...", "v_pi(s)=E_pi[G_t | S_t=s]", "q_pi(s,a)=E_pi[G_t | S_t=s,A_t=a]", "v_*(s)=max_a q_*(s,a)"],
    algorithms: ["No main algorithm; this chapter defines the problem and objective"],
    examples: ["recycling robot", "gridworld", "episodic terminal states"],
    commonConfusions: ["The Markov state need not be raw sensor input; it is whatever makes the future conditionally independent of older history.", "Discounting is not the same as termination.", "Optimality is defined inside the chosen state/reward formulation."],
    bridge: "Chapter 4 assumes the MDP dynamics are known and solves Bellman equations by dynamic programming.",
  },
  {
    n: 4,
    title: "Dynamic Programming",
    part: "Tabular",
    pages: "73-90",
    claim: "If the full MDP model is known, Bellman backups can evaluate and improve policies exactly in tables.",
    easy: "Dynamic programming is sweeping a spreadsheet until every state's number agrees with the numbers of the states it can lead to.",
    technical: "Covers iterative policy evaluation, policy improvement theorem, policy iteration, value iteration, asynchronous DP, generalized policy iteration, and the computational limits of full sweeps.",
    keyIdeas: ["Policy evaluation", "Policy improvement", "Policy iteration", "Value iteration", "Generalized policy iteration"],
    sections: ["4.1 Policy Evaluation", "4.2 Policy Improvement", "4.3 Policy Iteration", "4.4 Value Iteration", "4.5 Asynchronous DP", "4.6 Generalized Policy Iteration", "4.7 Efficiency", "4.8 Summary"],
    equations: ["v_{k+1}(s)=sum_a pi(a|s) sum_{s',r} p(s',r|s,a)[r+gamma v_k(s')]", "v_{k+1}(s)=max_a sum_{s',r} p(s',r|s,a)[r+gamma v_k(s')]"],
    algorithms: ["iterative policy evaluation", "policy iteration", "value iteration", "asynchronous DP"],
    examples: ["gridworld", "gambler's problem", "generalized policy iteration diagram"],
    commonConfusions: ["Prediction evaluates a fixed policy; control changes the policy.", "Value iteration combines evaluation and improvement in one backup.", "DP is powerful but needs a complete model."],
    bridge: "Chapter 5 removes the known model and learns from sampled episodes instead.",
  },
  {
    n: 5,
    title: "Monte Carlo Methods",
    part: "Tabular",
    pages: "91-118",
    claim: "You can learn values from complete sampled returns without knowing transition probabilities.",
    easy: "Play an episode to the end, add up what actually happened, then use that total to revise every visited situation.",
    technical: "Introduces first-visit and every-visit MC prediction, action-value estimation, exploring starts, epsilon-soft on-policy control, off-policy prediction and control by ordinary and weighted importance sampling, plus per-decision variants.",
    keyIdeas: ["Complete-episode returns", "First-visit and every-visit estimates", "Exploring starts", "On-policy versus off-policy", "Importance sampling"],
    sections: ["5.1 MC Prediction", "5.2 Action Values", "5.3 MC Control", "5.4 Without Exploring Starts", "5.5 Off-policy Prediction", "5.6 Incremental Implementation", "5.7 Off-policy Control", "5.8 Discounting-aware IS", "5.9 Per-decision IS", "5.10 Summary"],
    equations: ["V(s) <- average of returns following visits to s", "rho_{t:T-1}=prod_{k=t}^{T-1} pi(A_k|S_k)/b(A_k|S_k)", "V_{n+1}=V_n + (W_n/C_n)(G_n - V_n)"],
    algorithms: ["first-visit MC prediction", "on-policy first-visit MC control", "off-policy MC prediction", "weighted importance sampling control"],
    examples: ["blackjack", "racetrack", "ordinary versus weighted importance sampling variance"],
    commonConfusions: ["MC waits for episode termination; TD does not.", "Off-policy learning needs coverage: behavior must try actions the target might take.", "Weighted importance sampling is biased early but usually lower variance."],
    bridge: "Chapter 6 bootstraps after one step, combining sampling with Bellman-style targets.",
  },
  {
    n: 6,
    title: "Temporal-Difference Learning",
    part: "Tabular",
    pages: "119-140",
    claim: "TD learning updates from experience before the final outcome is known.",
    easy: "Instead of waiting for the whole trip, revise your estimate after each stop using the reward just received plus your estimate of what remains.",
    technical: "Develops TD(0), compares TD and MC, proves batch TD behavior, then presents Sarsa, Q-learning, Expected Sarsa, maximization bias, Double Learning, afterstates, and game special cases.",
    keyIdeas: ["Bootstrapping", "TD error", "Sarsa", "Q-learning", "Expected Sarsa", "Double learning"],
    sections: ["6.1 TD Prediction", "6.2 Advantages", "6.3 Optimality of TD(0)", "6.4 Sarsa", "6.5 Q-learning", "6.6 Expected Sarsa", "6.7 Maximization Bias and Double Learning", "6.8 Games and Afterstates", "6.9 Summary"],
    equations: ["V(S_t) <- V(S_t)+alpha[R_{t+1}+gamma V(S_{t+1})-V(S_t)]", "Q(S_t,A_t) <- Q(S_t,A_t)+alpha[R_{t+1}+gamma Q(S_{t+1},A_{t+1})-Q(S_t,A_t)]", "Q(S_t,A_t) <- Q(S_t,A_t)+alpha[R_{t+1}+gamma max_a Q(S_{t+1},a)-Q(S_t,A_t)]"],
    algorithms: ["TD(0)", "Sarsa", "Q-learning", "Expected Sarsa", "Double Q-learning"],
    examples: ["random walk", "cliff walking", "maximization bias example", "tic-tac-toe afterstates"],
    commonConfusions: ["Sarsa is on-policy because its target uses the action actually selected.", "Q-learning is off-policy because its target uses the greedy action.", "The max operator can overestimate noisy action values."],
    bridge: "Chapter 7 asks what happens if the backup spans more than one step but less than a full episode.",
  },
  {
    n: 7,
    title: "n-step Bootstrapping",
    part: "Tabular",
    pages: "141-158",
    claim: "One-step TD and full-return MC are endpoints of a spectrum of n-step targets.",
    easy: "Look ahead a few rewards, then use your estimate for the rest. The farther you look, the less you rely on today's guess but the longer you wait.",
    technical: "Defines n-step returns, n-step TD prediction, n-step Sarsa, off-policy n-step learning with importance sampling, control variates, tree-backup, and unifying n-step Q(sigma).",
    keyIdeas: ["n-step return", "Backup length", "Per-decision importance sampling", "Tree backup", "Q(sigma)"],
    sections: ["7.1 n-step TD Prediction", "7.2 n-step Sarsa", "7.3 n-step Off-policy Learning", "7.4 Control Variates", "7.5 Tree Backup", "7.6 n-step Q(sigma)", "7.7 Summary"],
    equations: ["G_{t:t+n}=R_{t+1}+...+gamma^{n-1}R_{t+n}+gamma^n V_{t+n-1}(S_{t+n})", "V_{t+n}(S_t) <- V_{t+n-1}(S_t)+alpha[G_{t:t+n}-V_{t+n-1}(S_t)]"],
    algorithms: ["n-step TD", "n-step Sarsa", "off-policy n-step Sarsa", "n-step Tree Backup", "n-step Q(sigma)"],
    examples: ["random walk n-step performance", "backup diagrams", "cliff walking variants"],
    commonConfusions: ["n controls target length, not episode length.", "Tree-backup avoids sampling ratios by backing up expectations over non-sampled actions.", "Q(sigma) mixes sample backups and expectation backups."],
    bridge: "Chapter 8 adds learned models so experience can be replayed as simulated planning updates.",
  },
  {
    n: 8,
    title: "Planning and Learning with Tabular Methods",
    part: "Tabular",
    pages: "159-194",
    claim: "Learning, planning, and acting can share the same backup machinery when a model is available or learned.",
    easy: "The agent can practice in its head. Real experience updates the model, and the model generates pretend experiences for more updates.",
    technical: "Introduces models, Dyna, Dyna-Q, model error, Dyna-Q+, prioritized sweeping, expected versus sample updates, trajectory sampling, RTDP, decision-time planning, heuristic search, rollout, and MCTS.",
    keyIdeas: ["Model learning", "Dyna architecture", "Prioritized sweeping", "Sample versus expected updates", "Decision-time planning", "MCTS"],
    sections: ["8.1 Models and Planning", "8.2 Dyna", "8.3 Wrong Models", "8.4 Prioritized Sweeping", "8.5 Expected vs Sample Updates", "8.6 Trajectory Sampling", "8.7 RTDP", "8.8 Decision-time Planning", "8.9 Heuristic Search", "8.10 Rollout", "8.11 MCTS", "8.12 Chapter Summary", "8.13 Part I Summary"],
    equations: ["Planning backup uses the same Q update with simulated S, A, R, S'", "Priority often tracks magnitude of value change"],
    algorithms: ["Dyna-Q", "Dyna-Q+", "prioritized sweeping", "RTDP", "rollout", "Monte Carlo tree search"],
    examples: ["blocking maze", "shortcut maze", "queue Dyna", "trajectory sampling", "Go-style tree search"],
    commonConfusions: ["A model can be learned, supplied, or partial.", "Planning updates and learning updates can be mathematically identical.", "A wrong model can be worse than no model unless exploration detects change."],
    bridge: "Part II begins when the table is too large and values must be approximated.",
  },
  {
    n: 9,
    title: "On-policy Prediction with Approximation",
    part: "Approximation",
    pages: "197-242",
    claim: "Large state spaces need value functions that generalize, not tables that memorize.",
    easy: "Instead of keeping a score for every address in a huge city, learn a formula from features like distance, traffic, and weather.",
    technical: "Defines value-function approximation, the mean-squared value error objective, stochastic-gradient and semi-gradient TD methods, linear features, feature construction, neural networks, LSTD, memory-based methods, kernels, and interest/emphasis.",
    keyIdeas: ["Function approximation", "VE objective", "Semi-gradient learning", "Linear features", "Feature construction", "Least-squares TD"],
    sections: ["9.1 Value-function Approximation", "9.2 Prediction Objective", "9.3 Stochastic-gradient and Semi-gradient Methods", "9.4 Linear Methods", "9.5 Feature Construction", "9.6 Step-size Selection", "9.7 Neural Networks", "9.8 LSTD", "9.9 Memory-based", "9.10 Kernel-based", "9.11 Interest and Emphasis", "9.12 Summary"],
    equations: ["VE(w)=sum_s mu(s)[v_pi(s)-vhat(s,w)]^2", "w <- w + alpha [U_t - vhat(S_t,w)] nabla vhat(S_t,w)", "vhat(s,w)=w^T x(s)"],
    algorithms: ["gradient Monte Carlo", "semi-gradient TD(0)", "linear TD", "least-squares TD"],
    examples: ["1000-state random walk", "polynomial basis", "Fourier basis", "coarse coding", "tile coding", "radial basis functions"],
    commonConfusions: ["Semi-gradient methods ignore part of the target's dependence on weights.", "Generalization is both the point and the danger.", "Feature scaling affects stable step sizes."],
    bridge: "Chapter 10 uses approximate action values for control rather than prediction alone.",
  },
  {
    n: 10,
    title: "On-policy Control with Approximation",
    part: "Approximation",
    pages: "243-256",
    claim: "Approximate control needs stable updates while the policy and value estimates keep changing together.",
    easy: "Now the formula does not just judge states; it helps choose actions, and every choice changes the data the formula sees next.",
    technical: "Covers episodic semi-gradient control, semi-gradient n-step Sarsa, average-reward continuing control, deprecating discounted continuing control, and differential semi-gradient n-step Sarsa.",
    keyIdeas: ["Approximate action values", "Semi-gradient Sarsa", "Episodic versus continuing control", "Average reward", "Differential value"],
    sections: ["10.1 Episodic Semi-gradient Control", "10.2 Semi-gradient n-step Sarsa", "10.3 Average Reward", "10.4 Deprecating Discounted Setting", "10.5 Differential Semi-gradient n-step Sarsa", "10.6 Summary"],
    equations: ["w <- w + alpha [G_{t:t+n}-qhat(S_t,A_t,w)] nabla qhat(S_t,A_t,w)", "delta_t = R_{t+1} - Rbar_t + qhat(S_{t+1},A_{t+1},w) - qhat(S_t,A_t,w)"],
    algorithms: ["episodic semi-gradient Sarsa", "semi-gradient n-step Sarsa", "differential semi-gradient Sarsa"],
    examples: ["mountain car", "access-control queue"],
    commonConfusions: ["Discounting can solve mathematical convenience while changing the continuing-task objective.", "Average reward cares about reward rate, not distance to termination.", "Control with approximation is more fragile than prediction."],
    bridge: "Chapter 11 shows why off-policy bootstrapping with approximation can diverge and how gradient-TD responds.",
  },
  {
    n: 11,
    title: "Off-policy Methods with Approximation",
    part: "Approximation",
    pages: "257-286",
    claim: "The deadly triad explains a major fault line in RL stability: bootstrapping, off-policy learning, and approximation together can diverge.",
    easy: "Three useful tools can form an unstable triangle. Use all three casually, and the estimate may run away instead of improving.",
    technical: "Surveys semi-gradient off-policy methods, divergence examples, the deadly triad, linear value-function geometry, Bellman error objectives, why Bellman error is not learnable from samples, Gradient-TD, Emphatic-TD, and variance reduction.",
    keyIdeas: ["Deadly triad", "Projected Bellman error", "Bellman error limitations", "Gradient-TD", "Emphatic weighting"],
    sections: ["11.1 Semi-gradient Methods", "11.2 Divergence Examples", "11.3 Deadly Triad", "11.4 Linear Geometry", "11.5 Bellman Error Descent", "11.6 Bellman Error Not Learnable", "11.7 Gradient-TD", "11.8 Emphatic-TD", "11.9 Reducing Variance", "11.10 Summary"],
    equations: ["MSBE(w)=sum_s mu(s)[vhat(s,w)-sum_{a,s',r} pi(a|s)p(s',r|s,a)(r+gamma vhat(s',w))]^2", "w update and secondary-weight update in GTD-style methods"],
    algorithms: ["semi-gradient off-policy TD", "GTD", "GTD2", "TDC", "Emphatic-TD"],
    examples: ["Baird's counterexample", "deadly triad diagrams", "excursion objective"],
    commonConfusions: ["The problem is not off-policy alone; it is the combination with bootstrapping and approximation.", "The true Bellman error needs double samples or a model.", "Stable gradient methods often optimize different weighted objectives."],
    bridge: "Chapter 12 revisits the multi-step idea through backward-view traces under approximation and off-policy corrections.",
  },
  {
    n: 12,
    title: "Eligibility Traces",
    part: "Approximation",
    pages: "287-320",
    claim: "Eligibility traces are the backward-view mechanism that makes multi-step learning online and efficient.",
    easy: "When a surprise happens, traces tell the agent which recent states or features still deserve credit or blame.",
    technical: "Covers lambda-returns, TD(lambda), truncated returns, online lambda-return, true online TD(lambda), Dutch traces, Sarsa(lambda), variable lambda/gamma, off-policy traces with control variates, Watkins's Q(lambda), Tree-Backup(lambda), stable off-policy traces, and implementation issues.",
    keyIdeas: ["lambda-return", "Forward view", "Backward view", "Eligibility trace vector", "True online equivalence", "Off-policy trace cutting"],
    sections: ["12.1 lambda-return", "12.2 TD(lambda)", "12.3 Truncated lambda-return", "12.4 Online lambda-return", "12.5 True Online TD(lambda)", "12.6 Dutch Traces", "12.7 Sarsa(lambda)", "12.8 Variable lambda and gamma", "12.9 Off-policy Control Variates", "12.10 Watkins Q(lambda) to Tree-Backup(lambda)", "12.11 Stable Off-policy Methods", "12.12 Implementation Issues", "12.13 Conclusions"],
    equations: ["G_t^lambda = (1-lambda) sum_{n=1}^{infty} lambda^{n-1} G_{t:t+n}", "z_t = gamma lambda z_{t-1} + nabla vhat(S_t,w_t)", "w_{t+1}=w_t+alpha delta_t z_t"],
    algorithms: ["TD(lambda)", "true online TD(lambda)", "Sarsa(lambda)", "Watkins's Q(lambda)", "Tree-Backup(lambda)", "GTD(lambda) variants"],
    examples: ["random walk", "mountain car with traces", "online equivalence demonstrations"],
    commonConfusions: ["Forward view defines the target; backward view implements it online.", "lambda is not the learning rate.", "Replacing, accumulating, and Dutch traces differ under function approximation."],
    bridge: "Chapter 13 stops relying on value-derived greedy policies and optimizes parameterized policies directly.",
  },
  {
    n: 13,
    title: "Policy Gradient Methods",
    part: "Approximation",
    pages: "321-338",
    claim: "Sometimes the cleanest route to better behavior is to adjust the policy itself in the direction of higher expected return.",
    easy: "Instead of learning a scoreboard and picking the best action, directly tune the action habit so good sampled actions become more likely.",
    technical: "Introduces policy approximation advantages, the policy gradient theorem, REINFORCE, baselines, actor-critic methods, continuing-problem gradients, and policy parameterization for continuous actions.",
    keyIdeas: ["Parameterized stochastic policy", "Policy gradient theorem", "REINFORCE", "Baseline variance reduction", "Actor-critic", "Continuous actions"],
    sections: ["13.1 Policy Approximation", "13.2 Policy Gradient Theorem", "13.3 REINFORCE", "13.4 REINFORCE with Baseline", "13.5 Actor-Critic", "13.6 Continuing Problems", "13.7 Continuous Actions", "13.8 Summary"],
    equations: ["nabla J(theta) proportional to sum_s mu(s) sum_a q_pi(s,a) nabla pi(a|s,theta)", "theta_{t+1}=theta_t+alpha G_t nabla ln pi(A_t|S_t,theta_t)", "theta update uses [G_t - b(S_t)] for a baseline"],
    algorithms: ["REINFORCE", "REINFORCE with baseline", "one-step actor-critic", "continuing actor-critic"],
    examples: ["short corridor with switched actions", "softmax preferences", "Gaussian policy for continuous action"],
    commonConfusions: ["A baseline can reduce variance without changing the expected gradient if it does not depend on the action.", "Actor and critic are roles, not necessarily separate neural networks.", "Policy gradients optimize a performance objective, but samples can be noisy."],
    bridge: "Part III shows how these computational ideas illuminate behavior, brains, and applications.",
  },
  {
    n: 14,
    title: "Psychology",
    part: "Looking deeper",
    pages: "341-376",
    claim: "RL algorithms echo long-studied behavioral phenomena in animal learning and psychology.",
    easy: "Many ideas that look computational - prediction, surprise, habit, goal-directed behavior - also describe how animals learn from cues and consequences.",
    technical: "Connects RL prediction and control to classical conditioning, blocking, higher-order conditioning, the Rescorla-Wagner model, TD simulations, instrumental conditioning, delayed reinforcement, cognitive maps, habitual and goal-directed behavior.",
    keyIdeas: ["Classical conditioning", "Prediction error", "Rescorla-Wagner", "TD model of conditioning", "Instrumental conditioning", "Habits versus goal-directed control"],
    sections: ["14.1 Prediction and Control", "14.2 Classical Conditioning", "14.2.1 Blocking", "14.2.2 Rescorla-Wagner", "14.2.3 TD Model", "14.2.4 TD Simulations", "14.3 Instrumental Conditioning", "14.4 Delayed Reinforcement", "14.5 Cognitive Maps", "14.6 Habitual and Goal-directed Behavior", "14.7 Summary"],
    equations: ["Delta V_i = alpha_i beta (lambda - sum_j V_j) in Rescorla-Wagner form", "TD error plays the role of time-local prediction error"],
    algorithms: ["TD model simulations of conditioning", "Actor-critic interpretation of behavior"],
    examples: ["blocking", "conditioned inhibition", "secondary conditioning", "maze learning", "habit devaluation"],
    commonConfusions: ["Psychological value is not always identical to engineered reward.", "TD models explain some timing effects that static associative models cannot.", "Habitual and goal-directed systems can cooperate or compete."],
    bridge: "Chapter 15 moves from behavior to neural mechanisms, especially dopamine and prediction errors.",
  },
  {
    n: 15,
    title: "Neuroscience",
    part: "Looking deeper",
    pages: "377-420",
    claim: "Dopamine responses resemble reward prediction errors, making TD learning a bridge between algorithms and brain data.",
    easy: "Some neurons fire not simply when reward arrives, but when reward is better or worse than expected - exactly the kind of surprise TD learning uses.",
    technical: "Reviews neuroscience basics, reward and reinforcement signals, the reward prediction error hypothesis, dopamine, experimental evidence, TD/dopamine correspondence, neural actor-critic, actor and critic learning rules, hedonistic neurons, collective RL, model-based brain methods, and addiction.",
    keyIdeas: ["Reward prediction error hypothesis", "Dopamine", "TD error correspondence", "Neural actor-critic", "Addiction as distorted learning signal"],
    sections: ["15.1 Neuroscience Basics", "15.2 Reward Signals", "15.3 RPE Hypothesis", "15.4 Dopamine", "15.5 Experimental Support", "15.6 TD Error/Dopamine", "15.7 Neural Actor-Critic", "15.8 Learning Rules", "15.9 Hedonistic Neurons", "15.10 Collective RL", "15.11 Model-based Brain Methods", "15.12 Addiction", "15.13 Summary"],
    equations: ["delta_t = R_{t+1}+gamma V(S_{t+1})-V(S_t) as computational analogue of prediction error"],
    algorithms: ["neural actor-critic sketches", "TD prediction simulations"],
    examples: ["dopamine shift from reward to predictive cue", "blocking data", "basal ganglia actor-critic", "addiction hypotheses"],
    commonConfusions: ["The claim is correspondence, not that brains literally run a textbook algorithm line by line.", "Dopamine is not simple pleasure; timing and prediction matter.", "Model-based and model-free distinctions are computational abstractions."],
    bridge: "Chapter 16 returns to engineered systems and case studies where RL achieved visible performance gains.",
  },
  {
    n: 16,
    title: "Applications and Case Studies",
    part: "Looking deeper",
    pages: "421-458",
    claim: "RL's ideas have repeatedly mattered in games, memory control, personalization, robotics, and large-scale decision systems.",
    easy: "The chapter is a gallery: backgammon, checkers, Jeopardy wagering, Atari, Go, web services, and gliders all use the same loop of value, policy, and feedback in different clothes.",
    technical: "Surveys TD-Gammon, Samuel's checkers, Watson wagering, memory control, human-level video game play, AlphaGo, AlphaGo Zero, personalized web services, and thermal soaring.",
    keyIdeas: ["Self-play", "Value approximation", "Search plus learning", "Experience replay", "Deep Q-learning", "Policy/value networks", "Real-world reward design"],
    sections: ["16.1 TD-Gammon", "16.2 Samuel's Checkers", "16.3 Watson Wagering", "16.4 Memory Control", "16.5 Video Game Play", "16.6 Go", "16.6.1 AlphaGo", "16.6.2 AlphaGo Zero", "16.7 Personalized Web Services", "16.8 Thermal Soaring"],
    equations: ["Case studies emphasize system design more than new notation"],
    algorithms: ["TD(lambda) in TD-Gammon", "deep Q-network style learning", "MCTS with policy/value guidance", "contextual bandit personalization"],
    examples: ["TD-Gammon", "Samuel checkers", "IBM Watson Daily Double", "Atari DQN", "AlphaGo", "AlphaGo Zero", "ad recommendation", "autonomous soaring"],
    commonConfusions: ["Case-study success often depends on representation, compute, search, and engineering, not just the update rule.", "Self-play changes the data distribution as the agent improves.", "Deep RL systems still inherit tabular concepts."],
    bridge: "Chapter 17 asks what remains incomplete: abstractions, state, reward design, and AI's future impact.",
  },
  {
    n: 17,
    title: "Frontiers",
    part: "Looking deeper",
    pages: "459-480",
    claim: "The book closes by pointing beyond core algorithms to questions of knowledge, abstraction, state, reward, and society.",
    easy: "After learning the toolkit, the hard question becomes what to ask the agent to predict, how to break time into useful skills, what counts as state, and what rewards we should choose.",
    technical: "Covers general value functions and auxiliary tasks, temporal abstraction via options, observations and state, designing reward signals, remaining issues, and reinforcement learning's possible role in future AI.",
    keyIdeas: ["General value functions", "Auxiliary tasks", "Options", "State representation", "Reward design", "Future AI issues"],
    sections: ["17.1 GVFs and Auxiliary Tasks", "17.2 Options", "17.3 Observations and State", "17.4 Designing Reward Signals", "17.5 Remaining Issues", "17.6 RL and the Future of AI"],
    equations: ["GVFs generalize value predictions beyond ordinary reward", "Option tuple <I, pi, beta>"],
    algorithms: ["option learning concepts", "auxiliary prediction learning", "reward-design practices"],
    examples: ["Horde-style predictions", "temporal abstraction", "state construction", "reward misspecification"],
    commonConfusions: ["More reward is only desirable if the reward signal truly encodes the intended goal.", "State is a representation problem, not merely a variable name.", "Options are actions extended over time, not just action labels."],
    bridge: "The final bridge is back to practice: formulate the right MDP, choose the right approximation, and test whether the reward really means what you think it means.",
  },
];

export const algorithmLines: AlgorithmLine[] = [
  { n: 1, indent: 0, text: "initialize Q(s,a) or v(s) arbitrarily", tag: "target", note: "Start with estimates; in tables these are numbers, under approximation they are parameters." },
  { n: 2, indent: 0, text: "for each episode or continuing interaction", tag: "loop", note: "Learning is driven by repeated interaction, not a fixed labeled dataset." },
  { n: 3, indent: 1, text: "observe S_t and choose A_t from the current policy", tag: "choice", note: "The policy may be greedy, epsilon-greedy, softmax, UCB, or directly parameterized." },
  { n: 4, indent: 1, text: "receive R_{t+1} and S_{t+1}", tag: "model", note: "The environment supplies the only ground-truth signal: reward and the next observation/state." },
  { n: 5, indent: 1, text: "build a target: return, one-step TD, n-step target, or policy-gradient sample", tag: "target", note: "This is where MC, TD, n-step, traces, and actor-critic differ most." },
  { n: 6, indent: 1, text: "update estimate toward target with step-size alpha", tag: "update", note: "The common shape is old estimate plus alpha times prediction error." },
  { n: 7, indent: 1, text: "improve the policy from the updated estimates or gradient", tag: "update", note: "Generalized policy iteration alternates pressure to evaluate and pressure to improve." },
  { n: 8, indent: 1, text: "if a model exists, plan with simulated backups", tag: "model", note: "Dyna and search reuse the same backup idea on imagined transitions." },
];

export const glossary = [
  { term: "Bootstrapping", def: "Updating an estimate using another learned estimate as part of the target." },
  { term: "Control", def: "The problem of improving behavior, not merely predicting returns under a fixed policy." },
  { term: "Coverage", def: "An off-policy requirement: the behavior policy must give nonzero probability to actions the target policy may use." },
  { term: "Deadly triad", def: "The potentially divergent combination of bootstrapping, off-policy learning, and function approximation." },
  { term: "Episodic task", def: "A task that naturally breaks into episodes ending in terminal states." },
  { term: "Function approximation", def: "Representing value functions or policies with parameterized functions instead of tables." },
  { term: "Generalized policy iteration", def: "The interacting process by which policy evaluation and policy improvement push each other toward better behavior." },
  { term: "Model-based", def: "Using a model of environment transitions/rewards for planning or decision-time lookahead." },
  { term: "Model-free", def: "Learning values or policies directly from experience without using an explicit transition model." },
  { term: "On-policy", def: "Learning about the same policy used to generate behavior." },
  { term: "Off-policy", def: "Learning about a target policy while following a different behavior policy." },
  { term: "Prediction", def: "Estimating values or returns for a fixed policy." },
  { term: "Semi-gradient", def: "A gradient-style update that treats the bootstrapped target as fixed for the purpose of differentiation." },
];

export const equations = [
  {
    label: "Return",
    tex: String.raw`G_t = R_{t+1}+\gamma R_{t+2}+\gamma^2 R_{t+3}+\cdots`,
    plain: "Add future rewards, shrinking them by gamma as they move farther away.",
  },
  {
    label: "State value",
    tex: String.raw`v_\pi(s)=\mathbb{E}_\pi[G_t\mid S_t=s]`,
    plain: "The value of a state is the average return from that state under policy pi.",
  },
  {
    label: "Bellman expectation backup",
    tex: String.raw`v_\pi(s)=\sum_a \pi(a\mid s)\sum_{s',r}p(s',r\mid s,a)\left[r+\gamma v_\pi(s')\right]`,
    plain: "A state's value equals immediate reward plus discounted value of possible next states, averaged over choices and world outcomes.",
  },
  {
    label: "TD(0)",
    tex: String.raw`V(S_t) \leftarrow V(S_t)+\alpha\left[R_{t+1}+\gamma V(S_{t+1})-V(S_t)\right]`,
    plain: "Move today's estimate toward reward plus tomorrow's estimate.",
  },
  {
    label: "Q-learning",
    tex: String.raw`Q(S_t,A_t) \leftarrow Q(S_t,A_t)+\alpha\left[R_{t+1}+\gamma\max_a Q(S_{t+1},a)-Q(S_t,A_t)\right]`,
    plain: "Learn the value of the action taken using the best action believed available next.",
  },
  {
    label: "Policy gradient sample",
    tex: String.raw`\theta_{t+1}=\theta_t+\alpha\,G_t\,\nabla_\theta\ln \pi(A_t\mid S_t,\theta_t)`,
    plain: "Increase the probability of sampled actions in proportion to how good their return was.",
  },
];

export interface BlackboardStage {
  label: string;
  beginner: string;
  technical: string;
  visualCue: string;
  boardNote: string;
  check: string;
}

export interface ChapterBlackboard {
  chapter: number;
  title: string;
  prompt: string;
  metaphor: string;
  stages: BlackboardStage[];
}

const s = (label: string, beginner: string, technical: string, visualCue: string, boardNote: string, check: string): BlackboardStage => ({ label, beginner, technical, visualCue, boardNote, check });

export const chapterBlackboards: ChapterBlackboard[] = [
  {
    chapter: 1,
    title: "Agent-environment loop",
    prompt: "Build the RL problem before naming an algorithm.",
    metaphor: "Two boxes pass arrows: the learner acts; the world answers with information and reward.",
    stages: [
      s("Separate", "Decide what part chooses actions and what part pushes back.", "Choose the agent/environment boundary and list observations, actions, and reward timing.", "Two boxes with action and reward arrows.", "Boundary first; formulas second.", "Can you say what is inside the agent and what is outside it?"),
      s("Reward", "Turn the goal into a number without telling the agent the correct move.", "Define R so maximizing expected return matches the desired behavior.", "A reward spark appears after a delay.", "Reward is feedback, not supervision.", "Could a high reward accidentally reward the wrong behavior?"),
      s("Value", "Give the agent a forecast of future reward from situations or actions.", "Define v_pi or q_pi as expected return under a policy.", "State circles glow with predicted future payoff.", "Values are predictions, not immediate rewards.", "Can you distinguish reward now from value of the future?"),
      s("Improve", "Use better forecasts to choose better behavior next time.", "Policy improvement changes action probabilities using learned value estimates.", "Policy arrows rotate toward brighter futures.", "Learning changes the policy through predictions.", "What must be estimated before the agent can improve?"),
    ],
  },
  {
    chapter: 2,
    title: "Bandit exploration board",
    prompt: "Learn the exploration/exploitation tradeoff in the smallest possible world.",
    metaphor: "Arms are bars; bar height is estimated reward; glow is uncertainty.",
    stages: [
      s("Estimate", "Keep a running guess for each action's reward.", "Update Q(a) by old estimate plus step-size times reward error.", "Bars move up or down after samples.", "Every arm owns an estimate.", "Which number changes after pulling one arm?"),
      s("Exploit", "Pick the action that currently looks best.", "A greedy policy selects argmax_a Q(a).", "Spotlight moves to the tallest bar.", "Greedy uses current knowledge.", "What risk appears if early samples were misleading?"),
      s("Explore", "Sometimes buy information by trying less-certain actions.", "Epsilon-greedy, UCB, and optimism add exploration pressure in different ways.", "Question marks pulse over under-sampled bars.", "Exploration controls future data.", "Which method explores randomly and which explores by uncertainty?"),
      s("Adapt", "If rewards drift, old evidence should not dominate forever.", "Constant step-sizes track nonstationary action values better than pure sample averages.", "Old bar heights fade while new rewards tug harder.", "Tracking needs recency weighting.", "Why can averaging all past rewards be too slow?"),
    ],
  },
  {
    chapter: 3,
    title: "MDP map board",
    prompt: "Translate delayed decision making into states, actions, dynamics, returns, and values.",
    metaphor: "A map of states with action arrows, reward tokens, and value glow.",
    stages: [
      s("State", "Name the situation the agent uses to decide.", "The Markov state contains enough information for p(s',r|s,a).", "A dashboard summarizes history.", "State is predictive information.", "What history can be safely forgotten?"),
      s("Return", "Add future rewards into the score the agent tries to make large.", "G_t is a discounted or episodic sum of future rewards.", "Reward beads line up on a timeline.", "Return is the target of prediction.", "How does gamma change the horizon?"),
      s("Bellman", "Value can be written using one step plus the value after that step.", "Bellman expectation equations define recursive consistency under a policy.", "A state pulls brightness from successor states.", "Recursion is the core trick.", "What immediate and future pieces appear in a Bellman backup?"),
      s("Optimal", "Replace policy averaging with choosing the best action.", "Bellman optimality equations use max over actions for v_* or q_*.", "The brightest outgoing arrow is circled.", "Control introduces maximization.", "Why is optimality harder than evaluation?"),
    ],
  },
  {
    chapter: 4,
    title: "Dynamic-programming sweep",
    prompt: "Solve a known finite MDP by repeated expected backups.",
    metaphor: "Value ink spreads backward through a fully known map.",
    stages: [
      s("Evaluate", "Freeze the policy and make values match its future.", "Iterative policy evaluation applies Bellman expectation backups.", "Numbers smooth across a grid.", "Prediction before improvement.", "What policy is being evaluated?"),
      s("Improve", "Turn policy arrows toward actions that look better under the value map.", "Policy improvement greedifies with respect to one-step lookahead or q_pi.", "Arrows rotate toward brighter cells.", "Values guide action changes.", "Why does exact greedification not make the policy worse?"),
      s("Iterate", "Alternate evaluating and improving until arrows stop changing.", "Policy iteration reaches optimality in finite discounted settings when evaluation/improvement are exact.", "Two gears labeled evaluate and improve mesh together.", "GPI is the pattern.", "Which gear is prediction and which is control?"),
      s("Compress", "Value iteration merges improvement into each backup.", "Bellman optimality backups update values with max_a expected one-step returns.", "A max gate sits inside the backup arrow.", "Full evaluation is not always needed.", "What stopping signal indicates values have nearly stabilized?"),
    ],
  },
  {
    chapter: 5,
    title: "Monte Carlo episode board",
    prompt: "Learn from complete sampled episodes when the model is unknown.",
    metaphor: "A path of footprints receives the return that followed it.",
    stages: [
      s("Sample", "Let an episode finish so the outcome is known.", "MC targets are realized returns rather than bootstrapped estimates.", "A trajectory runs to a terminal flag.", "Wait for the outcome.", "Why is ordinary MC naturally episodic?"),
      s("Average", "Use many returns after visits to estimate value.", "First-visit and every-visit MC average G_t for visited states or state-actions.", "Return labels attach to footprints.", "Experience replaces the model expectation.", "What is the difference between first visit and every visit?"),
      s("Control", "Estimate action values so choices can improve without a model.", "MC control uses q estimates and policy improvement, with coverage from exploring starts or soft policies.", "Each state contains a menu of action scores.", "Control needs action comparison.", "Why are state values alone not enough without a model?"),
      s("Correct", "Off-policy data must be reweighted to describe another policy.", "Importance sampling ratios correct behavior-policy trajectories toward target-policy estimates.", "Two colored paths receive a likelihood-ratio scale.", "Correction can explode in variance.", "What coverage condition is mandatory?"),
    ],
  },
  {
    chapter: 6,
    title: "Temporal-difference balance scale",
    prompt: "Update immediately from reward plus a bootstrapped next estimate.",
    metaphor: "A scale compares old prediction with reward plus next prediction.",
    stages: [
      s("Predict", "Carry an estimate before the next outcome is fully known.", "V(S_t) predicts expected return under the current policy.", "Current state holds a forecast bubble.", "Prediction is local.", "What return is being approximated?"),
      s("Compare", "After one step, compare the old prediction to a one-step target.", "delta_t = R_{t+1}+gamma V(S_{t+1})-V(S_t).", "The TD scale tilts by delta.", "TD error is surprise.", "Which term is sampled and which is bootstrapped?"),
      s("Control", "Use action-value TD targets to improve behavior.", "Sarsa backs up the sampled next action; Q-learning backs up the greedy next action.", "A next-state menu shows sampled versus max action.", "Target choice defines on/off-policy learning.", "Which method learns about the behavior policy?"),
      s("Debias", "A max over noisy estimates can be too optimistic.", "Double learning separates action selection from action evaluation to reduce maximization bias.", "Two value tables cross-check a max decision.", "Two estimators reduce upward noise selection.", "Why does max prefer positive noise?"),
    ],
  },
  {
    chapter: 7,
    title: "n-step backup slider",
    prompt: "Slide between one-step TD and full-return Monte Carlo.",
    metaphor: "A movable bracket selects how many real rewards to include before bootstrapping.",
    stages: [
      s("Choose n", "Pick how many future rewards to wait for.", "The n-step return sums n rewards then bootstraps from time t+n.", "A bracket stretches across a reward timeline.", "n trades delay, bias, and variance.", "What happens when n=1?"),
      s("Control", "Apply the same backup-length idea to action values.", "n-step Sarsa updates Q from sampled rewards and a later action-value estimate.", "State-action footprints replace state-only footprints.", "Actions are part of the trace.", "Why does control need policy probabilities?"),
      s("Off-policy", "Correct or redesign backups when data comes from another policy.", "Importance sampling, control variates, and tree-backup ideas handle policy mismatch.", "Behavior and target paths split colors.", "Mismatch is a probability problem.", "When can importance ratios become huge?"),
      s("Blend", "Interpolate sampled and expected branches.", "Q(sigma) blends Sarsa-like sampling with tree-backup expectation.", "A tree has some followed branches and some averaged branches.", "Backup design is adjustable.", "What does sigma control?"),
    ],
  },
  {
    chapter: 8,
    title: "Planning studio",
    prompt: "Use a model to learn from imagined experience as well as real experience.",
    metaphor: "A real world and a simulator feed the same update machinery.",
    stages: [
      s("Model", "Learn or use a simulator of next states and rewards.", "A model maps state-action pairs to predicted transitions and rewards.", "A simulator box sits beside the environment.", "Models create practice data.", "What does the model need to output?"),
      s("Dyna", "Mix real updates with planning updates.", "Dyna applies the same RL update to real and model-generated transitions.", "Real and simulated arrows enter one update block.", "Planning is updating from imagined samples.", "Why can one real step produce many learning updates?"),
      s("Prioritize", "Plan first where value changes matter most.", "Prioritized sweeping queues predecessors of states whose values changed substantially.", "A shock wave moves backward through a graph.", "Computation is focused credit assignment.", "Why update predecessors?"),
      s("Search", "At decision time, simulate futures from the current state.", "Rollouts and MCTS evaluate root actions using simulated trajectories and selective tree growth.", "A search tree grows from the current state.", "Planning can be local and immediate.", "What makes MCTS asymmetric?"),
    ],
  },
  {
    chapter: 9,
    title: "Function-approximation surface",
    prompt: "Replace tables with parameterized predictions that generalize.",
    metaphor: "A flexible surface over state space is pulled by samples.",
    stages: [
      s("Represent", "Choose features or a network that turns states into predictions.", "v_hat(s,w) or q_hat(s,a,w) approximates value through parameters w.", "Features feed a prediction surface.", "Representation controls generalization.", "Which states share parameters?"),
      s("Objective", "Decide what prediction error matters and under what distribution.", "Mean squared value error and related objectives weight states by a distribution.", "A loss landscape appears under the surface.", "Approximation requires an error criterion.", "Which states does the objective care about most?"),
      s("Gradient", "Move weights in a direction that reduces prediction error.", "Gradient and semi-gradient methods use derivatives of predictions with respect to weights.", "A sample tugs the surface along a gradient arrow.", "Weights are the learning object.", "What part does a semi-gradient ignore?"),
      s("Scale", "Use linear features, neural nets, kernels, or memory to express structure.", "Different approximation architectures define different hypothesis spaces and computational tradeoffs.", "Several lenses project the same state differently.", "The function class limits what can be learned.", "What can your representation not express?"),
    ],
  },
  {
    chapter: 10,
    title: "Approximate-control cockpit",
    prompt: "Improve a policy while value estimates are parameterized and changing.",
    metaphor: "A rider adjusts the steering model while riding the bicycle.",
    stages: [
      s("Score", "Use a function to score actions in the current state.", "q_hat(s,a,w) replaces a tabular Q(s,a).", "State features enter action meters.", "Control needs action-specific predictions.", "Which action score is updated?"),
      s("Act", "Choose using the current approximate values plus exploration.", "On-policy methods such as semi-gradient Sarsa evaluate and improve the behavior policy.", "The policy arrow follows the meters with epsilon noise.", "Data comes from the policy being learned.", "Why does exploration affect the value learned?"),
      s("Average", "For continuing tasks, optimize reward rate rather than episode total.", "Differential value functions subtract the average reward baseline in continuing formulations.", "A treadmill shows ongoing reward flow.", "No terminal flag means different bookkeeping.", "What replaces the episodic return?"),
      s("Stabilize", "Tune features and step-sizes because shared weights couple decisions.", "Semi-gradient control is practical but sensitive to approximation and update scale.", "One weight knob moves several action meters.", "Generalization links errors.", "Which shared feature could cause interference?"),
    ],
  },
  {
    chapter: 11,
    title: "Deadly-triad warning board",
    prompt: "See why off-policy bootstrapping with approximation can diverge.",
    metaphor: "Three warning lights form a feedback loop.",
    stages: [
      s("Approximate", "Predictions share parameters across states.", "Function approximation projects value functions into a limited space.", "A complex value shape casts a shadow onto a plane.", "Projection changes the target.", "What error remains even at the best approximation?"),
      s("Bootstrap", "Targets depend on current estimates.", "Bootstrapped targets include learned successor values.", "A prediction points at another prediction.", "The learner chases itself.", "How can an error feed future targets?"),
      s("Off-policy", "Data distribution differs from the target policy.", "Behavior-policy samples may not weight states as the target-policy objective needs.", "Two paths cross the same graph with different colors.", "Distribution mismatch tilts learning.", "Which states are over- or under-sampled?"),
      s("Repair", "Use objectives or emphases designed for this setting.", "Gradient-TD and emphatic-TD methods address parts of the instability with auxiliary weights or state emphasis.", "A leveler corrects a tilted floor.", "Stability requires design.", "What objective is the update actually descending?"),
    ],
  },
  {
    chapter: 12,
    title: "Eligibility-trace paint trail",
    prompt: "Assign credit backward through recent responsibility traces.",
    metaphor: "Fading footprints receive paint when a TD error arrives.",
    stages: [
      s("Trace", "Remember recently visited states, actions, or features.", "Eligibility traces decay with time and are refreshed by current activity.", "Footprints fade behind the agent.", "Recent causes stay eligible.", "Which features are currently eligible?"),
      s("Lambda", "Choose how far credit should flow.", "Lambda weights a mixture of n-step returns or controls trace decay.", "A slider changes footprint brightness length.", "Lambda blends backup horizons.", "What do lambda=0 and lambda near 1 resemble?"),
      s("Online", "Update during the episode without waiting for a forward return.", "Backward-view algorithms implement trace-based online updates; true-online methods improve equivalence under changing weights.", "Forward and backward clocks are synchronized.", "Implementation detail changes math.", "Why can changing weights break a naive equivalence?"),
      s("Off-policy", "Cut or correct traces when behavior diverges from target.", "Watkins, tree-backup, control-variate, and emphatic trace methods manage policy mismatch.", "Some footprints are clipped when paths disagree.", "Not all past credit remains valid.", "When should an off-policy trace be reduced?"),
    ],
  },
  {
    chapter: 13,
    title: "Policy-gradient mixing board",
    prompt: "Optimize the policy directly by pushing action probabilities.",
    metaphor: "Action probabilities are sliders on a control board.",
    stages: [
      s("Parameterize", "Represent the policy as adjustable probabilities.", "pi(a|s,theta) is differentiable with respect to theta.", "Sliders produce an action distribution.", "The policy itself is learned.", "What parameter changes the chosen action probability?"),
      s("Sample", "Use sampled actions and returns to estimate improvement direction.", "Score-function gradients use grad log pi(A_t|S_t,theta) times a return or advantage.", "A sampled action slider receives pressure.", "Good outcomes increase probability pressure.", "Why use log probability?"),
      s("Baseline", "Subtract ordinary expectation so only better-than-expected outcomes push strongly.", "Action-independent baselines reduce variance without biasing the gradient.", "A center line separates advantage from raw return.", "Baseline is variance control.", "Why must the baseline not depend on the sampled action?"),
      s("Critic", "Learn a value function to judge the actor's actions online.", "Actor-critic methods use TD errors or advantages from a critic to update the actor.", "A coach sends feedback to a performer.", "Policy and value learners cooperate.", "What does the critic estimate?"),
    ],
  },
  {
    chapter: 14,
    title: "Psychology bridge board",
    prompt: "Use RL language to understand prediction and action learning in behavior.",
    metaphor: "Cue prediction and action consequence loops sit side by side.",
    stages: [
      s("Cue", "A signal becomes meaningful when it predicts an outcome.", "Classical conditioning can be modeled with prediction errors over cues and outcomes.", "A bell arrow points toward food.", "Prediction learning can happen without action choice.", "What changes when a cue becomes predictive?"),
      s("Block", "A new cue may fail to learn if an old cue already predicts the outcome.", "Blocking follows from reduced prediction error when the outcome is already expected.", "One cue absorbs the surprise before another cue appears.", "No surprise means little learning.", "Why does expectation reduce learning?"),
      s("Act", "Instrumental behavior learns consequences of actions.", "Action-dependent rewards map to policy/value learning rather than pure cue prediction.", "A lever enters the reward path.", "Actions change the future.", "What makes this different from classical conditioning?"),
      s("Map", "Goal-directed behavior can use internal models while habits use cached tendencies.", "Model-based and model-free distinctions help explain flexible versus habitual behavior.", "A fast habit road and a planning road split.", "Multiple control systems can coexist.", "Which system fails after outcome devaluation?"),
    ],
  },
  {
    chapter: 15,
    title: "Dopamine prediction-error board",
    prompt: "Connect TD-like errors to neural reward-learning hypotheses.",
    metaphor: "A surprise meter moves from reward time to cue time.",
    stages: [
      s("Unexpected", "An unpredicted reward creates a burst of positive surprise.", "Positive reward-prediction error resembles R plus next value exceeding old value.", "A spike appears over reward delivery.", "Surprise drives learning.", "What was the old prediction?"),
      s("Predicted", "After learning, the cue carries the surprise and reward itself is expected.", "TD prediction error shifts backward to earlier predictive cues.", "The spike moves from reward to cue.", "Prediction cancels later surprise.", "Why is reward-time error smaller now?"),
      s("Omitted", "If expected reward does not arrive, surprise goes negative.", "A negative prediction error appears when expected value is not fulfilled.", "A dip appears where reward should have been.", "Missing outcomes teach too.", "What expectation was violated?"),
      s("Caution", "Brains are more complex than one scalar error.", "Actor-critic and dopamine hypotheses are computational mappings, not complete biological descriptions.", "The neat RL loop is overlaid with biological circuitry.", "Models are lenses, not full anatomy.", "What does the model leave out?"),
    ],
  },
  {
    chapter: 16,
    title: "Applications system board",
    prompt: "Read each application as a system of representation, data, objective, planning, and learning.",
    metaphor: "Each application picks tools from a wall: self-play, search, networks, values, rewards.",
    stages: [
      s("Represent", "Decide how the task state becomes usable input.", "Applications use handcrafted features, neural representations, or domain encodings.", "Raw world data passes through a representation filter.", "Input design controls learnability.", "What information enters the learner?"),
      s("Generate", "Choose where experience comes from.", "Self-play, simulators, logged interaction, and real-world trials produce different data distributions.", "Data pipes feed the learner from several sources.", "Experience source is part of the algorithm.", "Is exploration safe or simulated?"),
      s("Search", "Some systems plan deeply at decision time.", "Game systems often combine learned value/policy networks with tree search or rollout evaluation.", "A search tree plugs into a neural evaluator.", "Learning and search amplify each other.", "Which part evaluates leaf nodes?"),
      s("Deploy", "Real tasks require reward and safety checks.", "Applications must handle constraints, objective mismatch, off-policy evaluation, and simulator errors.", "A compass labeled reward points through a constraint gate.", "Engineering decides whether RL is usable.", "What happens if reward is misaligned?"),
    ],
  },
  {
    chapter: 17,
    title: "Future-agent design board",
    prompt: "Assemble frontier ideas: many predictions, skills, state construction, reward design, and open-ended learning.",
    metaphor: "The agent becomes a scientist with dashboards, skills, memory, and objective checks.",
    stages: [
      s("Predict", "Learn many forecasts, not only the main task return.", "General value functions ask many policy-conditioned predictive questions.", "A dashboard of future-question gauges lights up.", "Prediction can be knowledge.", "What signal is each GVF predicting?"),
      s("Abstract", "Use temporally extended actions as reusable skills.", "Options define initiation, internal policy, and termination over multiple time steps.", "A macro-action unfolds into primitive actions.", "Skills make time hierarchical.", "When should the option terminate?"),
      s("Construct", "Build state from observations and memory.", "State representation must preserve information needed for prediction and control.", "Raw observations flow into a memory/state builder.", "The agent must decide what to remember.", "What hidden variable matters for the future?"),
      s("Align", "Design rewards and auxiliary tasks that point toward intended behavior.", "Reward specification, auxiliary prediction, continual learning, and scalable exploration remain open design problems.", "Reward and state form the foundation under an agent tower.", "Problem formulation remains central.", "Could optimizing the reward produce unwanted behavior?"),
    ],
  },
];

export function blackboardForChapter(chapterNumber: number): ChapterBlackboard {
  const board = chapterBlackboards.find((item) => item.chapter === chapterNumber);
  if (!board) throw new Error(`Missing blackboard for chapter ${chapterNumber}`);
  return board;
}

export function blackboardStageCount() {
  return chapterBlackboards.reduce((sum, board) => sum + board.stages.length, 0);
}

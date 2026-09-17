export interface FormulaNote {
  chapter: number;
  family: string;
  label: string;
  tex: string;
  easy: string;
  technical: string;
  symbols: string[];
  useWhen: string;
  watchOut: string;
}

export const formulaAtlas = [
  {
    "chapter": 1,
    "family": "Problem setup",
    "label": "Return as the agent's scorecard",
    "tex": "G_t = R_{t+1} + \\gamma R_{t+2} + \\gamma^2 R_{t+3} + \\cdots",
    "easy": "Add up future rewards, making farther rewards count less when gamma is below one.",
    "technical": "The return is the scalar target that value functions predict and policies try to improve; later chapters vary how much of it is sampled versus bootstrapped.",
    "symbols": [
      "G_t",
      "R_{t+1}",
      "\\gamma"
    ],
    "useWhen": "Use this whenever a chapter asks what quantity the agent ultimately optimizes.",
    "watchOut": "Do not confuse immediate reward R with the multi-step return G."
  },
  {
    "chapter": 1,
    "family": "Problem setup",
    "label": "Value as expected return",
    "tex": "v_\\pi(s) = \\mathbb{E}_\\pi[G_t \\mid S_t=s]",
    "easy": "A state is valuable if starting there usually leads to good future reward under the policy.",
    "technical": "This definition connects the informal tic-tac-toe value estimates to the formal prediction problem used throughout the book.",
    "symbols": [
      "v_\\pi",
      "s",
      "\\pi"
    ],
    "useWhen": "Use for policy evaluation and every later state-value estimate.",
    "watchOut": "The subscript pi matters: change the policy and the value function changes."
  },
  {
    "chapter": 2,
    "family": "Bandits",
    "label": "Sample-average action value",
    "tex": "Q_{n+1} = Q_n + \\frac{1}{n}(R_n - Q_n)",
    "easy": "Move the estimate toward the newest reward by one-over-count.",
    "technical": "The incremental mean exposes the error-correction pattern estimate plus step-size times target error.",
    "symbols": [
      "Q_n",
      "R_n",
      "1/n"
    ],
    "useWhen": "Use for stationary bandit action-value estimates.",
    "watchOut": "For drifting rewards, 1/n gives old data too much permanent weight."
  },
  {
    "chapter": 2,
    "family": "Bandits",
    "label": "Constant step-size tracking",
    "tex": "Q_{n+1} = Q_n + \\alpha (R_n - Q_n)",
    "easy": "Keep adapting by giving each new reward a fixed amount of influence.",
    "technical": "With constant alpha, old rewards receive exponentially decaying weights, which tracks nonstationarity better than a sample average.",
    "symbols": [
      "\\alpha",
      "Q_n",
      "R_n"
    ],
    "useWhen": "Use for nonstationary bandits or any setting where the target drifts.",
    "watchOut": "Large alpha reacts quickly but increases noise."
  },
  {
    "chapter": 2,
    "family": "Bandits",
    "label": "Upper-confidence-bound action choice",
    "tex": "A_t = \\arg\\max_a \\left[Q_t(a) + c\\sqrt{\\frac{\\ln t}{N_t(a)}}\\right]",
    "easy": "Pick actions that look good, with a bonus for actions you have not tested enough.",
    "technical": "The uncertainty bonus shrinks with the action count and grows slowly with total time, encouraging directed exploration.",
    "symbols": [
      "c",
      "N_t(a)",
      "Q_t(a)"
    ],
    "useWhen": "Use to explain exploration that is not uniform random epsilon-greedy exploration.",
    "watchOut": "The formula assumes action counts are nonzero or are handled by trying each action first."
  },
  {
    "chapter": 2,
    "family": "Bandits",
    "label": "Softmax action preferences",
    "tex": "\\Pr\\{A_t=a\\} = \\frac{e^{H_t(a)}}{\\sum_b e^{H_t(b)}}",
    "easy": "Turn learned preferences into action probabilities.",
    "technical": "Gradient bandits learn preference parameters H rather than value estimates, then use softmax to define the stochastic policy.",
    "symbols": [
      "H_t(a)",
      "\\Pr\\{A_t=a\\}"
    ],
    "useWhen": "Use for gradient-bandit methods and as preparation for policy-gradient parameterizations.",
    "watchOut": "Preferences are relative; adding the same constant to all H values does not change probabilities."
  },
  {
    "chapter": 3,
    "family": "MDPs",
    "label": "One-step dynamics",
    "tex": "p(s',r\\mid s,a)=\\Pr\\{S_t=s', R_t=r \\mid S_{t-1}=s, A_{t-1}=a\\}",
    "easy": "The model says what next situation and reward can follow a state-action choice.",
    "technical": "This conditional distribution is the finite-MDP dynamics object used by Bellman equations and dynamic programming.",
    "symbols": [
      "p",
      "s'",
      "r",
      "s",
      "a"
    ],
    "useWhen": "Use whenever a method assumes a known model or simulator distribution.",
    "watchOut": "The model includes rewards as well as next states."
  },
  {
    "chapter": 3,
    "family": "MDPs",
    "label": "Action-value definition",
    "tex": "q_\\pi(s,a)=\\mathbb{E}_\\pi[G_t\\mid S_t=s,A_t=a]",
    "easy": "An action is good if taking it in this state usually leads to high future reward.",
    "technical": "Action values support model-free control because they compare actions directly without requiring one-step lookahead through a model.",
    "symbols": [
      "q_\\pi",
      "s",
      "a"
    ],
    "useWhen": "Use for Sarsa, Q-learning, Monte Carlo control, and policy improvement without a model.",
    "watchOut": "q_pi evaluates an action and then follows pi afterward."
  },
  {
    "chapter": 3,
    "family": "MDPs",
    "label": "Bellman expectation equation",
    "tex": "v_\\pi(s)=\\sum_a \\pi(a\\mid s)\\sum_{s',r}p(s',r\\mid s,a)[r+\\gamma v_\\pi(s')]",
    "easy": "Average over the policy's action, then over the world's possible replies.",
    "technical": "This recursive identity is the foundation of policy evaluation, expected backups, and many prediction targets.",
    "symbols": [
      "\\pi",
      "p",
      "\\gamma",
      "v_\\pi"
    ],
    "useWhen": "Use when evaluating a fixed policy with a known model.",
    "watchOut": "This is expectation under a policy, not the optimality equation."
  },
  {
    "chapter": 3,
    "family": "MDPs",
    "label": "Bellman optimality equation",
    "tex": "v_*(s)=\\max_a\\sum_{s',r}p(s',r\\mid s,a)[r+\\gamma v_*(s')]",
    "easy": "The best value of a state is the best one-step choice plus the best future value afterward.",
    "technical": "The maximization replaces policy averaging and defines the fixed point targeted by optimal-control methods.",
    "symbols": [
      "v_*",
      "\\max_a",
      "p"
    ],
    "useWhen": "Use for value iteration, greedy improvement, and optimality discussions.",
    "watchOut": "Exact optimality requires the model and full representability; approximation weakens this ideal."
  },
  {
    "chapter": 4,
    "family": "Dynamic programming",
    "label": "Iterative policy evaluation",
    "tex": "v_{k+1}(s)=\\sum_a\\pi(a\\mid s)\\sum_{s',r}p(s',r\\mid s,a)[r+\\gamma v_k(s')]",
    "easy": "Repeatedly refresh each state's value using the current table of successor values.",
    "technical": "This is the Bellman expectation backup applied iteratively with old estimates on the right-hand side.",
    "symbols": [
      "v_k",
      "v_{k+1}",
      "\\pi"
    ],
    "useWhen": "Use when describing DP prediction for a known policy.",
    "watchOut": "A sweep can be synchronous or in-place/asynchronous depending on implementation."
  },
  {
    "chapter": 4,
    "family": "Dynamic programming",
    "label": "Greedy policy improvement",
    "tex": "\\pi'(s) = \\arg\\max_a q_\\pi(s,a)",
    "easy": "After evaluating a policy, choose the action that the evaluation says is best.",
    "technical": "Policy improvement is justified by the policy-improvement theorem when the new action value is no worse than the old value.",
    "symbols": [
      "\\pi'",
      "q_\\pi"
    ],
    "useWhen": "Use to connect evaluation to control in generalized policy iteration.",
    "watchOut": "Greedy improvement assumes the action values are accurate enough for the claim being made."
  },
  {
    "chapter": 4,
    "family": "Dynamic programming",
    "label": "Value iteration backup",
    "tex": "v_{k+1}(s)=\\max_a\\sum_{s',r}p(s',r\\mid s,a)[r+\\gamma v_k(s')]",
    "easy": "Do one optimal lookahead update instead of fully evaluating each intermediate policy.",
    "technical": "Value iteration applies Bellman optimality backups, folding truncated evaluation and improvement into one update.",
    "symbols": [
      "v_{k+1}",
      "\\max_a"
    ],
    "useWhen": "Use for model-known tabular optimal control.",
    "watchOut": "It still requires expected backups over the model."
  },
  {
    "chapter": 5,
    "family": "Monte Carlo",
    "label": "Monte Carlo incremental mean",
    "tex": "V(S_t) \\leftarrow V(S_t) + \\alpha [G_t - V(S_t)]",
    "easy": "After the episode, move the visited state's estimate toward the return that actually happened.",
    "technical": "MC prediction can use full-return targets in the same error-correction form as bandits, with G_t replacing an immediate reward sample.",
    "symbols": [
      "G_t",
      "V(S_t)",
      "\\alpha"
    ],
    "useWhen": "Use when a complete episode return is available.",
    "watchOut": "MC does not bootstrap in this target."
  },
  {
    "chapter": 5,
    "family": "Monte Carlo",
    "label": "Importance-sampling ratio",
    "tex": "\\rho_{t:T-1}=\\prod_{k=t}^{T-1}\\frac{\\pi(A_k\\mid S_k)}{b(A_k\\mid S_k)}",
    "easy": "Reweight a trajectory by how much more or less likely the target policy was to take the observed actions.",
    "technical": "The product corrects expectations from behavior policy b to target policy pi for the sampled action sequence.",
    "symbols": [
      "\\rho",
      "\\pi",
      "b"
    ],
    "useWhen": "Use for off-policy Monte Carlo prediction and control.",
    "watchOut": "Long products can have extreme variance or become zero."
  },
  {
    "chapter": 5,
    "family": "Monte Carlo",
    "label": "Weighted importance-sampling estimate",
    "tex": "V(s)=\\frac{\\sum_i \\rho_i G_i}{\\sum_i \\rho_i}",
    "easy": "Average returns after giving each one a policy-likelihood weight, then normalize by total weight.",
    "technical": "Weighted IS reduces variance relative to ordinary IS in many finite samples while introducing finite-sample bias.",
    "symbols": [
      "\\rho_i",
      "G_i"
    ],
    "useWhen": "Use to explain ordinary versus weighted off-policy MC estimators.",
    "watchOut": "If all weights are zero, the estimate is undefined without a convention."
  },
  {
    "chapter": 6,
    "family": "Temporal difference",
    "label": "TD error",
    "tex": "\\delta_t = R_{t+1}+\\gamma V(S_{t+1})-V(S_t)",
    "easy": "Surprise equals reward plus the next prediction minus the old prediction.",
    "technical": "The one-step TD error is the reusable learning signal for TD prediction, control, traces, actor-critic, and dopamine comparisons.",
    "symbols": [
      "\\delta_t",
      "R_{t+1}",
      "V"
    ],
    "useWhen": "Use whenever a chapter updates from a one-step bootstrapped target.",
    "watchOut": "The same symbol later appears with action values, average reward, or function approximation."
  },
  {
    "chapter": 6,
    "family": "Temporal difference",
    "label": "TD(0) prediction update",
    "tex": "V(S_t) \\leftarrow V(S_t)+\\alpha\\delta_t",
    "easy": "Move the old state's value in the direction of the TD surprise.",
    "technical": "TD(0) updates online after each transition using the bootstrapped one-step target.",
    "symbols": [
      "\\alpha",
      "\\delta_t"
    ],
    "useWhen": "Use for the simplest model-free bootstrapping algorithm.",
    "watchOut": "The update changes only the visited table entry in tabular prediction."
  },
  {
    "chapter": 6,
    "family": "Temporal difference",
    "label": "Sarsa update",
    "tex": "Q(S_t,A_t)\\leftarrow Q(S_t,A_t)+\\alpha[R_{t+1}+\\gamma Q(S_{t+1},A_{t+1})-Q(S_t,A_t)]",
    "easy": "Learn about the action you took using the next action you actually chose.",
    "technical": "Sarsa is on-policy TD control because the target includes the next action sampled from the current behavior/target policy.",
    "symbols": [
      "S_t",
      "A_t",
      "A_{t+1}"
    ],
    "useWhen": "Use for on-policy action-value control.",
    "watchOut": "The update target changes if the next action is exploratory."
  },
  {
    "chapter": 6,
    "family": "Temporal difference",
    "label": "Q-learning update",
    "tex": "Q(S_t,A_t)\\leftarrow Q(S_t,A_t)+\\alpha[R_{t+1}+\\gamma\\max_a Q(S_{t+1},a)-Q(S_t,A_t)]",
    "easy": "Learn about the action you took using the best-looking next action, whether or not you actually take it.",
    "technical": "Q-learning is off-policy control because the target backs up the greedy target policy while behavior can remain exploratory.",
    "symbols": [
      "\\max_a",
      "Q"
    ],
    "useWhen": "Use for the standard tabular off-policy control update.",
    "watchOut": "The max over noisy estimates can create overestimation bias."
  },
  {
    "chapter": 6,
    "family": "Temporal difference",
    "label": "Expected Sarsa target",
    "tex": "R_{t+1}+\\gamma\\sum_a\\pi(a\\mid S_{t+1})Q(S_{t+1},a)",
    "easy": "Instead of sampling one next action, average over the next actions the policy might take.",
    "technical": "Expected Sarsa replaces the sampled next action value with its expectation under the policy, often reducing variance.",
    "symbols": [
      "\\pi",
      "Q"
    ],
    "useWhen": "Use to compare sampled and expected TD control targets.",
    "watchOut": "You must know or compute the policy probabilities for next actions."
  },
  {
    "chapter": 7,
    "family": "Multi-step",
    "label": "n-step return",
    "tex": "G_{t:t+n}=R_{t+1}+\\gamma R_{t+2}+\\cdots+\\gamma^{n-1}R_{t+n}+\\gamma^n V(S_{t+n})",
    "easy": "Use n real rewards, then attach a bootstrap value at the end.",
    "technical": "The n-step return interpolates between TD and Monte Carlo by varying backup length.",
    "symbols": [
      "n",
      "G_{t:t+n}",
      "V(S_{t+n})"
    ],
    "useWhen": "Use for n-step TD prediction and as the basis for n-step control.",
    "watchOut": "At episode end, the bootstrap term disappears."
  },
  {
    "chapter": 7,
    "family": "Multi-step",
    "label": "n-step Sarsa update",
    "tex": "Q(S_t,A_t)\\leftarrow Q(S_t,A_t)+\\alpha[G_{t:t+n}-Q(S_t,A_t)]",
    "easy": "When the n-step target is ready, update the earlier state-action pair toward it.",
    "technical": "The action-value n-step return uses rewards and a later action-value bootstrap under the policy.",
    "symbols": [
      "G_{t:t+n}",
      "Q"
    ],
    "useWhen": "Use for delayed-update multi-step control.",
    "watchOut": "Implementation needs a buffer because the target arrives n steps later."
  },
  {
    "chapter": 7,
    "family": "Multi-step",
    "label": "n-step off-policy ratio",
    "tex": "\\rho_{t+1:t+n-1}=\\prod_{k=t+1}^{t+n-1}\\frac{\\pi(A_k\\mid S_k)}{b(A_k\\mid S_k)}",
    "easy": "Correct the part of the multi-step path whose actions came from the behavior policy.",
    "technical": "The ratio interval depends on which actions affect the backed-up target for the n-step method.",
    "symbols": [
      "\\rho",
      "\\pi",
      "b"
    ],
    "useWhen": "Use for off-policy n-step returns.",
    "watchOut": "Applying ratios over too long an interval adds avoidable variance."
  },
  {
    "chapter": 8,
    "family": "Planning",
    "label": "Dyna model entry",
    "tex": "Model(S_t,A_t) \\leftarrow (R_{t+1},S_{t+1})",
    "easy": "Remember what happened after a state-action pair so you can replay it in planning.",
    "technical": "In deterministic tabular Dyna, the learned model stores the observed reward and next state for each experienced state-action pair.",
    "symbols": [
      "Model",
      "S_t",
      "A_t"
    ],
    "useWhen": "Use to explain how real experience supplies simulated planning updates.",
    "watchOut": "In stochastic worlds, a model needs distributions or samples, not one fixed successor."
  },
  {
    "chapter": 8,
    "family": "Planning",
    "label": "Prioritized sweeping priority",
    "tex": "P = |R + \\gamma \\max_a Q(S',a) - Q(S,A)|",
    "easy": "Give high planning priority to updates with large predicted TD error.",
    "technical": "Prioritized sweeping ranks predecessor backups by estimated action-value change or Bellman error magnitude.",
    "symbols": [
      "P",
      "Q",
      "R"
    ],
    "useWhen": "Use for focused planning rather than uniform random model replay.",
    "watchOut": "Priority is a search-control heuristic, not a new objective."
  },
  {
    "chapter": 9,
    "family": "Approximation",
    "label": "Linear value approximation",
    "tex": "\\hat v(s,\\mathbf{w})=\\mathbf{w}^\\top \\mathbf{x}(s)",
    "easy": "Predict a state's value by adding feature values weighted by learned weights.",
    "technical": "Linear approximation makes gradients simple and lets one weight update generalize across every state using that feature.",
    "symbols": [
      "\\mathbf{w}",
      "\\mathbf{x}(s)",
      "\\hat v"
    ],
    "useWhen": "Use for Part II examples using features, tile coding, and linear theory.",
    "watchOut": "Feature design determines the geometry of generalization."
  },
  {
    "chapter": 9,
    "family": "Approximation",
    "label": "Gradient Monte Carlo update",
    "tex": "\\mathbf{w}_{t+1}=\\mathbf{w}_t+\\alpha[G_t-\\hat v(S_t,\\mathbf{w}_t)]\\nabla\\hat v(S_t,\\mathbf{w}_t)",
    "easy": "Change the weights to make the value prediction closer to the observed return.",
    "technical": "This is stochastic-gradient descent on squared prediction error when G_t is an unbiased target for v_pi(S_t).",
    "symbols": [
      "\\nabla\\hat v",
      "G_t",
      "\\mathbf{w}"
    ],
    "useWhen": "Use to connect supervised-learning gradients to value prediction.",
    "watchOut": "For TD targets, the method becomes semi-gradient because the target also depends on weights."
  },
  {
    "chapter": 9,
    "family": "Approximation",
    "label": "Semi-gradient TD update",
    "tex": "\\mathbf{w}_{t+1}=\\mathbf{w}_t+\\alpha[R_{t+1}+\\gamma\\hat v(S_{t+1},\\mathbf{w}_t)-\\hat v(S_t,\\mathbf{w}_t)]\\nabla\\hat v(S_t,\\mathbf{w}_t)",
    "easy": "Use a one-step bootstrap target but only differentiate the prediction being updated.",
    "technical": "The target is treated as fixed during differentiation, making this a semi-gradient update.",
    "symbols": [
      "\\mathbf{w}",
      "\\nabla\\hat v",
      "\\gamma"
    ],
    "useWhen": "Use for on-policy TD prediction with function approximation.",
    "watchOut": "Semi-gradient is a practical update, not the full gradient of mean-squared value error."
  },
  {
    "chapter": 10,
    "family": "Approximate control",
    "label": "Semi-gradient Sarsa control",
    "tex": "\\mathbf{w}_{t+1}=\\mathbf{w}_t+\\alpha[G_{t:t+n}-\\hat q(S_t,A_t,\\mathbf{w}_t)]\\nabla\\hat q(S_t,A_t,\\mathbf{w}_t)",
    "easy": "Move action-value weights toward the n-step Sarsa target for the action you took.",
    "technical": "Approximate on-policy control uses action-value gradients and sampled n-step targets while the policy is improved from q_hat.",
    "symbols": [
      "\\hat q",
      "G_{t:t+n}",
      "\\mathbf{w}"
    ],
    "useWhen": "Use for episodic approximate Sarsa and Mountain Car-style examples.",
    "watchOut": "Changing weights changes many state-action values, including unvisited ones with shared features."
  },
  {
    "chapter": 10,
    "family": "Average reward",
    "label": "Average reward objective",
    "tex": "r(\\pi)=\\lim_{h\\to\\infty}\\frac{1}{h}\\sum_{t=1}^{h}\\mathbb{E}[R_t\\mid A_{0:t-1}\\sim\\pi]",
    "easy": "Judge a continuing policy by its long-run reward per time step.",
    "technical": "Average reward is an alternative continuing-task objective that avoids imposing a discount horizon.",
    "symbols": [
      "r(\\pi)",
      "h",
      "R_t"
    ],
    "useWhen": "Use for continuing control tasks without natural episodes.",
    "watchOut": "It is not just gamma close to one; it changes the value definitions."
  },
  {
    "chapter": 10,
    "family": "Average reward",
    "label": "Differential TD error",
    "tex": "\\delta_t=R_{t+1}-\\bar R+\\hat q(S_{t+1},A_{t+1},\\mathbf{w})-\\hat q(S_t,A_t,\\mathbf{w})",
    "easy": "Treat reward above the current average as positive news and below-average reward as negative news.",
    "technical": "Differential Sarsa subtracts the learned average reward baseline and updates relative action values in continuing tasks.",
    "symbols": [
      "\\bar R",
      "\\delta_t",
      "\\hat q"
    ],
    "useWhen": "Use for average-reward control algorithms.",
    "watchOut": "The average reward estimate must be learned alongside the value weights."
  },
  {
    "chapter": 11,
    "family": "Off-policy approximation",
    "label": "Projected Bellman error shape",
    "tex": "\\operatorname{MSPBE}(\\mathbf{w})=\\|\\Pi T_\\pi \\hat v_{\\mathbf{w}}-\\hat v_{\\mathbf{w}}\\|_\\mu^2",
    "easy": "Measure Bellman inconsistency after projecting back into the functions your approximator can represent.",
    "technical": "Projected objectives account for the fact that Bellman-updated approximate values may leave the approximation subspace.",
    "symbols": [
      "\\Pi",
      "T_\\pi",
      "\\mu"
    ],
    "useWhen": "Use when explaining why Gradient-TD methods optimize different objectives than naive TD.",
    "watchOut": "The projection distribution matters; changing mu changes the objective."
  },
  {
    "chapter": 11,
    "family": "Off-policy approximation",
    "label": "Deadly triad as a diagnostic",
    "tex": "\\text{divergence risk} \\uparrow \\quad\\text{when}\\quad \\text{bootstrapping}+\\text{off-policy}+\\text{approximation}",
    "easy": "Three individually useful tools can form an unstable feedback loop together.",
    "technical": "The chapter's counterexamples show divergence can arise from this combination even with linear approximation.",
    "symbols": [
      "bootstrapping",
      "off-policy",
      "approximation"
    ],
    "useWhen": "Use as the stability checklist before trusting an off-policy approximate method.",
    "watchOut": "This is a diagnostic relation, not a numeric theorem formula."
  },
  {
    "chapter": 12,
    "family": "Eligibility traces",
    "label": "lambda-return mixture",
    "tex": "G_t^\\lambda=(1-\\lambda)\\sum_{n=1}^{\\infty}\\lambda^{n-1}G_{t:t+n}",
    "easy": "Average all backup lengths, controlled by lambda.",
    "technical": "The forward view defines a geometrically weighted mixture of n-step returns, with episodic terminal corrections when needed.",
    "symbols": [
      "\\lambda",
      "G_{t:t+n}"
    ],
    "useWhen": "Use to explain the conceptual target for TD(lambda).",
    "watchOut": "In finite episodes, the final Monte Carlo term needs special handling."
  },
  {
    "chapter": 12,
    "family": "Eligibility traces",
    "label": "Accumulating trace update",
    "tex": "\\mathbf{z}_t=\\gamma\\lambda\\mathbf{z}_{t-1}+\\nabla\\hat v(S_t,\\mathbf{w}_t)",
    "easy": "Keep a fading memory of recently active features.",
    "technical": "The eligibility vector determines how strongly the current TD error updates each recent feature or state component.",
    "symbols": [
      "\\mathbf{z}_t",
      "\\gamma",
      "\\lambda"
    ],
    "useWhen": "Use for backward-view trace algorithms.",
    "watchOut": "Replacing, Dutch, and off-policy traces modify this basic pattern."
  },
  {
    "chapter": 13,
    "family": "Policy gradients",
    "label": "Policy gradient theorem",
    "tex": "\\nabla J(\\theta) \\propto \\sum_s \\mu(s)\\sum_a q_\\pi(s,a)\\nabla\\pi(a\\mid s,\\theta)",
    "easy": "Increase action probabilities in states where those actions have high value.",
    "technical": "The theorem rewrites the performance gradient in terms of value-weighted policy derivatives under the on-policy state distribution.",
    "symbols": [
      "J(\\theta)",
      "q_\\pi",
      "\\nabla\\pi"
    ],
    "useWhen": "Use as the foundation for REINFORCE and actor-critic.",
    "watchOut": "The proportionality hides constants and distribution details; use the book's assumptions for formal statements."
  },
  {
    "chapter": 13,
    "family": "Policy gradients",
    "label": "Score-function policy-gradient update",
    "tex": "\\theta_{t+1}=\\theta_t+\\alpha G_t\\nabla\\ln\\pi(A_t\\mid S_t,\\theta_t)",
    "easy": "Make the sampled action more likely when the return was good.",
    "technical": "REINFORCE uses the log-policy gradient times a Monte Carlo return as an unbiased sample update under suitable conditions.",
    "symbols": [
      "\\theta",
      "G_t",
      "\\nabla\\ln\\pi"
    ],
    "useWhen": "Use for episodic Monte Carlo policy-gradient learning.",
    "watchOut": "Variance can be high without a baseline."
  },
  {
    "chapter": 13,
    "family": "Policy gradients",
    "label": "Baseline form",
    "tex": "\\theta_{t+1}=\\theta_t+\\alpha (G_t-b(S_t))\\nabla\\ln\\pi(A_t\\mid S_t,\\theta_t)",
    "easy": "Compare the return to what was normally expected from that state.",
    "technical": "A state-dependent baseline can reduce variance without changing the expected gradient because it does not depend on the sampled action.",
    "symbols": [
      "b(S_t)",
      "G_t"
    ],
    "useWhen": "Use to explain REINFORCE with baseline and actor-critic advantages.",
    "watchOut": "The standard invariance argument requires the baseline not to depend on the action."
  },
  {
    "chapter": 14,
    "family": "Psychology",
    "label": "Rescorla-Wagner error",
    "tex": "\\Delta V_i = \\alpha_i\\beta(\\lambda - \\sum_j V_j)",
    "easy": "A cue learns when the outcome is more or less surprising than predicted by all cues together.",
    "technical": "The associative update changes each cue strength in proportion to prediction error, connecting conditioning phenomena to error-driven learning.",
    "symbols": [
      "V_i",
      "\\lambda",
      "\\alpha_i\\beta"
    ],
    "useWhen": "Use for classical conditioning, blocking, and the bridge to TD models.",
    "watchOut": "This is not temporally extended until TD predictions are introduced."
  },
  {
    "chapter": 15,
    "family": "Neuroscience",
    "label": "TD error timing hypothesis",
    "tex": "\\delta_t = r_t + \\gamma V(t+1)-V(t)",
    "easy": "Dopamine-like surprise appears when reward or a cue changes expected future value.",
    "technical": "The chapter compares phasic dopamine responses with TD-error timing: reward response before learning, cue response after learning, and dips for omitted expected reward.",
    "symbols": [
      "\\delta_t",
      "r_t",
      "V(t)"
    ],
    "useWhen": "Use for the reward-prediction-error hypothesis.",
    "watchOut": "Do not reduce the hypothesis to dopamine equals reward."
  },
  {
    "chapter": 16,
    "family": "Applications",
    "label": "Self-play improvement loop",
    "tex": "\\pi_{k+1} \\approx \\operatorname{Improve}(\\pi_k, \\text{search/self-play data})",
    "easy": "Use the current player to make better training games, then train a stronger player from them.",
    "technical": "Case studies such as TD-Gammon and AlphaGo-style systems repeatedly couple policy/value learning with self-generated experience and, often, search.",
    "symbols": [
      "\\pi_k",
      "self-play",
      "search"
    ],
    "useWhen": "Use as a system-level equation for game-playing applications.",
    "watchOut": "This is a schematic, not a reported numeric result."
  },
  {
    "chapter": 17,
    "family": "Frontiers",
    "label": "Option tuple",
    "tex": "o = (\\mathcal{I}_o, \\pi_o, \\beta_o)",
    "easy": "An option says where it can start, how it behaves, and when it stops.",
    "technical": "Temporal abstraction formalizes multi-step courses of action with initiation set, internal policy, and termination function.",
    "symbols": [
      "\\mathcal{I}_o",
      "\\pi_o",
      "\\beta_o"
    ],
    "useWhen": "Use for options and hierarchical reinforcement learning.",
    "watchOut": "An option is more structured than repeating a primitive action."
  },
  {
    "chapter": 17,
    "family": "Frontiers",
    "label": "General value function question",
    "tex": "v(s)=\\mathbb{E}\\left[\\sum_{k=0}^{\\infty}\\left(\\prod_{i=1}^{k}\\gamma_{t+i}\\right)c_{t+k+1}\\mid S_t=s\\right]",
    "easy": "Predict a future signal, over a chosen horizon, under a chosen way of behaving.",
    "technical": "GVFs generalize value functions by replacing reward with cumulants and allowing question-specific discounts/terminations and policies.",
    "symbols": [
      "c_t",
      "\\gamma_t",
      "v(s)"
    ],
    "useWhen": "Use for auxiliary tasks and predictive knowledge beyond reward.",
    "watchOut": "A GVF is defined by the whole question: cumulant, policy, discount, and state representation."
  }
] satisfies FormulaNote[];

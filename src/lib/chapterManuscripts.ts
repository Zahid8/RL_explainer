export interface ChapterManuscriptSection {
  title: string;
  beginner: string;
  visual: string;
  technical: string;
  takeaway: string;
}

export interface ChapterManuscript {
  n: number;
  opening: string;
  sections: ChapterManuscriptSection[];
  closing: string;
}

export const chapterManuscripts: ChapterManuscript[] = [
  {
    n: 1,
    opening: "Begin reinforcement learning with a simple question: how can a learner improve when nobody hands it the correct action? The learner must act, notice consequences, and reshape future behavior. Chapter 1 names that loop before any heavy math appears.",
    sections: [
      {
        title: "The agent is not the whole world",
        beginner: "The agent is the part that chooses. The environment is everything that answers those choices. This boundary is a design decision: in a robot it might separate the controller from the room; in a game it separates the player program from the game engine.",
        visual: "Draw two boxes. Put the agent on the left, the environment on the right, an action arrow going right, and state/reward arrows coming left. Every later algorithm is a more precise way to update the left box.",
        technical: "Formally, at time t the agent receives information, selects A_t, then receives R_{t+1} and S_{t+1}. A policy maps information to action probabilities. A value function predicts long-run return under a policy.",
        takeaway: "If you cannot draw the boundary, you cannot define the RL problem."
      },
      {
        title: "Reward is a goal signal, not a teacher",
        beginner: "A reward does not say which action was correct. It says how good the recent outcome was according to the objective. The agent must discover which earlier choices made that reward more likely.",
        visual: "Show a delayed spark: an action at the left, several blank time steps, and a reward flash at the right. The learning problem is to send credit backward without knowing the hidden cause with certainty.",
        technical: "The target is expected return, not isolated reward. Return aggregates future rewards, often with discounting, and value estimates become the agent's local forecasts of that return.",
        takeaway: "RL is hard because consequences are delayed, noisy, and action-dependent."
      },
      {
        title: "Tic-tac-toe is the first backup picture",
        beginner: "The introductory game example teaches the first taste of value backup: if a later board position looks more likely to win, earlier positions that led there should become more attractive.",
        visual: "Draw board positions as nodes along a game path. The final win brightens the last node, then brightness moves backward along the path to earlier choices.",
        technical: "This anticipates temporal-difference learning: update a current estimate toward a later estimate plus observed outcome, rather than waiting for a perfect model of every continuation.",
        takeaway: "The book's central engine is already visible: predict, compare, update, act again."
      }
    ],
    closing: "Leave Chapter 1 able to translate any everyday learning story into agent, environment, action, reward, policy, value, and model."
  },
  {
    n: 2,
    opening: "Bandits strip reinforcement learning down to repeated choice under uncertainty. There is no long state trajectory yet; the only puzzle is how to choose while still learning what the choices are worth.",
    sections: [
      {
        title: "Estimates are living guesses",
        beginner: "Each action starts with an uncertain guess about reward. After the action is tried, the guess should move toward the reward that actually arrived, but not necessarily jump all the way there.",
        visual: "Draw each action as a bar. A reward pulls the bar upward or downward by a spring. A small step-size makes the spring gentle; a large step-size makes it snap quickly.",
        technical: "The incremental update has the form new estimate = old estimate + step-size times error. This algebraic shape returns throughout prediction and control.",
        takeaway: "Most RL updates are old belief plus a correction."
      },
      {
        title: "Exploration is information buying",
        beginner: "Choosing the current best action earns reward according to current knowledge. Trying another action may lose reward now but reveal that the current belief is wrong.",
        visual: "Show a spotlight on the best-known arm and dim question marks over less-tried arms. Epsilon-greedy sometimes moves the spotlight randomly; UCB moves it toward uncertainty.",
        technical: "Exploration methods alter action selection, not the reward process itself. Epsilon-greedy injects random trials, optimistic initialization biases early estimates upward, UCB adds an uncertainty bonus, and gradient bandits adjust preferences.",
        takeaway: "An agent controls its future data by how it explores."
      },
      {
        title: "The bandit lesson scales upward",
        beginner: "Even when later chapters add states and delayed futures, the agent still faces the bandit question locally: exploit the best-known action or gather information?",
        visual: "Put a bandit bar chart inside every state circle of a future MDP. Each state contains its own choice uncertainty.",
        technical: "Contextual bandits add situation-dependent actions but still avoid bootstrapping over future states. They bridge pure bandits and full MDP control.",
        takeaway: "Before learning long plans, learn how estimates and exploration behave in one-step worlds."
      }
    ],
    closing: "Leave Chapter 2 able to explain why exploration is not a nuisance but the data-generation engine of learning."
  },
  {
    n: 3,
    opening: "Finite Markov decision processes provide the formal stage. States, actions, rewards, transition probabilities, returns, policies, and value functions become the grammar used by the rest of the book.",
    sections: [
      {
        title: "State means enough information for prediction",
        beginner: "A state is not just a label for where the agent is. It should contain the information needed to predict what happens next after each action.",
        visual: "Draw a dashboard. If the dashboard has all predictive gauges, the future depends on the dashboard and the action, not on the hidden history behind it.",
        technical: "The Markov property says the current state summarizes history for predicting next states and rewards. The dynamics are p(s', r | s, a), including both where the world moves and what reward is emitted.",
        takeaway: "Good state design is predictive compression."
      },
      {
        title: "Value is recursive future expectation",
        beginner: "The value of a state is not just the reward right now. It is the expected total future payoff if the agent behaves according to a policy.",
        visual: "Draw a state with arrows to successor states. Each arrow carries immediate reward plus the brightness of the successor. The current state's brightness is the weighted average of those arrow outcomes.",
        technical: "Bellman expectation equations express v_pi and q_pi recursively: immediate reward plus discounted successor value under the policy and dynamics.",
        takeaway: "A Bellman equation is a self-consistency rule for predictions."
      },
      {
        title: "Optimality adds a max operator",
        beginner: "Prediction asks how good a policy is. Control asks what the best policy could be. That switch introduces choosing the best action, not merely averaging over the current one.",
        visual: "At each state, draw several action arrows and highlight the arrow with the largest backed-up value. The highlighted arrows together form a greedy policy.",
        technical: "Optimal value functions satisfy Bellman optimality equations. The max over actions makes control nonlinear and harder than policy evaluation, but it also makes greedy action selection direct when q_* is known.",
        takeaway: "Control is prediction plus action improvement."
      }
    ],
    closing: "Leave Chapter 3 able to read every later algorithm as an attempt to estimate or optimize MDP value objects."
  },
  {
    n: 4,
    opening: "Dynamic programming is the clean ideal case: the MDP model is known, the tables are finite, and value information can be swept through the state space by Bellman backups.",
    sections: [
      {
        title: "Policy evaluation makes predictions consistent",
        beginner: "If a policy is fixed, values should match what happens when that policy is followed. Evaluation repeatedly repairs values until they agree with the policy and model.",
        visual: "Imagine a grid whose numbers are smoothed again and again. Each square looks at its successor squares and rewrites itself from their weighted values.",
        technical: "Iterative policy evaluation applies Bellman expectation backups. With suitable conditions, repeated sweeps converge toward v_pi for the fixed policy.",
        takeaway: "Evaluation answers: what future does this policy create?"
      },
      {
        title: "Policy improvement rotates the arrows",
        beginner: "Once values describe the future, the agent can ask whether another action leads to better valued states. If so, the policy should change.",
        visual: "Show arrows in each grid cell rotating toward brighter neighboring cells after the value map becomes clearer.",
        technical: "The policy improvement theorem justifies greedifying with respect to one-step lookahead from v_pi or action values q_pi. Exact improvement yields a policy no worse than the old one.",
        takeaway: "Prediction supplies the map; improvement changes the route."
      },
      {
        title: "Generalized policy iteration is the pattern",
        beginner: "Most RL algorithms are not pure evaluation or pure improvement. They let the value estimate and policy chase each other until they settle into agreement.",
        visual: "Draw two gears: one labeled evaluate, one labeled improve. Turning either gear moves the other.",
        technical: "Policy iteration, value iteration, and many sampled methods instantiate GPI: value functions move toward policy consistency while policies move toward greediness with respect to current values.",
        takeaway: "GPI is the skeleton behind much of the book."
      }
    ],
    closing: "Leave Chapter 4 seeing dynamic programming as the model-based reference solution that later sampling methods approximate."
  },
  {
    n: 5,
    opening: "Monte Carlo methods remove the known-model assumption. Instead of computing expected futures from dynamics, the agent samples complete episodes and learns from the returns that actually occurred.",
    sections: [
      {
        title: "A complete episode is a training example",
        beginner: "After an episode ends, every visited state can be assigned the return that followed it. The learner averages those returns to estimate value.",
        visual: "Draw footprints through an episode. When the finish line reward is known, write the later total beside each footprint.",
        technical: "First-visit and every-visit Monte Carlo prediction estimate v_pi from sampled returns. The target is not bootstrapped; it is the realized return after a visit.",
        takeaway: "Monte Carlo learns from full outcomes, not one-step guesses."
      },
      {
        title: "Control needs action values",
        beginner: "Without a model, knowing only state values does not tell which action to choose. The agent needs estimates for state-action pairs.",
        visual: "Inside each state, draw a mini menu of actions with separate scores. The policy can choose the highest menu item without simulating the model.",
        technical: "Monte Carlo control estimates q_pi(s,a), then improves the policy using generalized policy iteration. Exploring starts or soft policies are used to keep state-action coverage.",
        takeaway: "Model-free control usually needs values attached to actions."
      },
      {
        title: "Off-policy learning pays with variance",
        beginner: "Learning about one policy from another policy's data is possible only if the behavior policy sometimes takes the actions the target policy would take.",
        visual: "Draw two colored paths through the same tree. Importance sampling reweights the behavior path to ask how plausible it would have been under the target path.",
        technical: "Ordinary and weighted importance sampling use probability ratios between target and behavior policies. The correction is principled but can have very high variance for long trajectories.",
        takeaway: "Off-policy Monte Carlo is clean in theory and fragile in variance."
      }
    ],
    closing: "Leave Chapter 5 knowing why sampling can replace a model and why full-return learning becomes expensive or noisy."
  },
  {
    n: 6,
    opening: "Temporal-difference learning is the first major fusion: it samples real experience like Monte Carlo and bootstraps from current estimates like dynamic programming.",
    sections: [
      {
        title: "The TD error is local surprise",
        beginner: "After one transition, the agent compares what it expected with what it got plus what it now expects from the next state.",
        visual: "Draw a balance scale: old value on one side, reward plus next value on the other. The tilt is the TD error.",
        technical: "TD(0) updates V(S_t) toward R_{t+1}+gamma V(S_{t+1}). The error delta_t is the target minus the current estimate.",
        takeaway: "TD learns immediately from partial experience."
      },
      {
        title: "Sarsa learns the value of its own behavior",
        beginner: "Sarsa updates using the next action the agent actually selected. If the agent is exploratory, the value estimate includes the risk of that exploration.",
        visual: "Show a five-item chain: state, action, reward, next state, next action. The last action is not imaginary; it is the behavior that really happened.",
        technical: "Sarsa is on-policy TD control: Q(S_t,A_t) moves toward R_{t+1}+gamma Q(S_{t+1},A_{t+1}). Policy improvement is usually epsilon-greedy with respect to Q.",
        takeaway: "On-policy control evaluates the policy it actually uses."
      },
      {
        title: "Q-learning separates behavior from target",
        beginner: "Q-learning may behave exploratorily but updates as if the next choice will be greedy. It learns about the greedy target while collecting data another way.",
        visual: "At the next state, draw many action scores and circle the maximum, even if the behavior arrow went elsewhere.",
        technical: "The Q-learning target is R_{t+1}+gamma max_a Q(S_{t+1},a), making the update off-policy in its target. Expected Sarsa and double learning refine variance and maximization bias issues.",
        takeaway: "The backup target determines the policy being learned about."
      }
    ],
    closing: "Leave Chapter 6 able to explain TD error, on-policy versus off-policy targets, and why TD became a central RL workhorse."
  },
  {
    n: 7,
    opening: "n-step methods give the learner a backup-length dial. One-step TD is fast and bootstrapped; Monte Carlo is long and sampled. n-step returns live between them.",
    sections: [
      {
        title: "Backup length controls the evidence mix",
        beginner: "A short backup trusts current estimates quickly. A long backup waits for more real rewards before using an estimate.",
        visual: "Draw a timeline with a sliding bracket. The bracket captures n rewards, then plugs into a value estimate at its right edge.",
        technical: "The n-step return sums n discounted rewards and then bootstraps from the value at time t+n. Larger n changes bias, variance, and delay.",
        takeaway: "n is a design knob for how much real future to sample before bootstrapping."
      },
      {
        title: "Control extends the same dial to action values",
        beginner: "For control, the backup can target action values and improve behavior while using multi-step evidence.",
        visual: "Show a path of state-action pairs, not just states. The return flows through several decisions before bootstrapping.",
        technical: "n-step Sarsa backs up sampled rewards plus a later action-value estimate. Off-policy versions need importance sampling or backup rules that avoid sampling target actions directly.",
        takeaway: "Multi-step control must track both rewards and the policies that produced actions."
      },
      {
        title: "Tree backup and Q(sigma) blend sampling and expectation",
        beginner: "Some backups sample the next action; others average over possible next actions. The book shows methods that mix those choices.",
        visual: "Draw a branching tree. Some branches are followed as sampled paths; others are averaged as expected side branches.",
        technical: "Tree backup uses expectations over target-policy actions without importance sampling sampled target actions. Q(sigma) interpolates between sample-based Sarsa-like backups and expectation-based tree backups.",
        takeaway: "Backup structure is not one-size-fits-all; it trades computation, variance, and policy correction."
      }
    ],
    closing: "Leave Chapter 7 ready for eligibility traces, which efficiently combine many backup lengths at once."
  },
  {
    n: 8,
    opening: "Planning and learning meet when the agent has a model. A model lets experience be replayed, imagined, searched, and prioritized, but it also introduces the danger of learning from wrong imagination.",
    sections: [
      {
        title: "A model creates simulated experience",
        beginner: "If the agent can predict what a state-action pair will produce, it can practice without acting in the real world each time.",
        visual: "Draw the real world and a simulator feeding identical transition records into the same update box.",
        technical: "Dyna architectures learn from real transitions and model-generated transitions using the same value-update machinery. The model supplies predicted next states and rewards.",
        takeaway: "Planning is learning updates applied to imagined data."
      },
      {
        title: "Priority focuses computation",
        beginner: "Not every simulated update matters equally. If one state's value changes a lot, predecessors that lead to it may deserve attention first.",
        visual: "Show a shock wave moving backward through a graph. Prioritized sweeping follows the strongest shock rather than sweeping blindly.",
        technical: "Prioritized sweeping maintains a queue of states or state-action pairs whose backups are expected to cause large changes, often using predecessor information from the model.",
        takeaway: "Good planning spends computation where values are likely to change."
      },
      {
        title: "Decision-time search plans at the moment of action",
        beginner: "Sometimes the agent does not need to improve a stored value table everywhere; it can search ahead from the current state just before choosing.",
        visual: "Draw a tree growing outward from the current state. Rollouts and Monte Carlo tree search estimate which root action looks best.",
        technical: "Rollout methods evaluate candidate actions with simulated trajectories under a base policy. MCTS builds an asymmetric search tree, balancing exploration of actions in the tree with value estimates from rollouts or learned evaluators.",
        takeaway: "Planning can happen in the background or right at decision time."
      }
    ],
    closing: "Leave Chapter 8 seeing models as accelerators that must be checked against reality."
  },
  {
    n: 9,
    opening: "Function approximation begins when tables no longer fit. Instead of storing one value per state, the learner uses parameters that generalize across many states.",
    sections: [
      {
        title: "Generalization is both power and risk",
        beginner: "Changing one weight can improve many related states at once, but it can also damage predictions for states that share the same representation.",
        visual: "Draw a flexible sheet over a landscape. A sample pulls one spot on the sheet, and nearby areas move because the sheet is connected.",
        technical: "Approximate value functions such as v_hat(s,w) or q_hat(s,a,w) map features and weights to predictions. Learning adjusts w to reduce an objective such as mean squared value error under a state distribution.",
        takeaway: "Approximation turns value learning into parameter optimization."
      },
      {
        title: "Semi-gradient methods chase bootstrapped targets",
        beginner: "The target can depend on the current weights, but semi-gradient methods treat the target as fixed while taking the update step.",
        visual: "Show an archer aiming at a target mounted on the same moving cart. The update aims at the target's current position, even though the target may move later.",
        technical: "Semi-gradient TD uses gradients of the prediction with respect to weights, but not the full derivative of the bootstrapped target. This is computationally simple and often effective on-policy.",
        takeaway: "Semi-gradient updates are practical approximations, not exact gradients of every implied objective."
      },
      {
        title: "Representation shapes what can be learned",
        beginner: "Features decide which states look similar to the learner. Bad features hide important distinctions; good features share data where sharing is helpful.",
        visual: "Draw colored lenses over the state space. The learner sees through the lenses, not through raw reality.",
        technical: "Linear methods, tile coding, radial basis functions, neural networks, memory-based methods, and kernels all define different approximation spaces and generalization patterns.",
        takeaway: "Before asking whether learning works, ask what the representation makes expressible."
      }
    ],
    closing: "Leave Chapter 9 understanding why large-scale RL is as much about representation and objectives as about update rules."
  },
  {
    n: 10,
    opening: "On-policy control with approximation asks the agent to improve behavior while using shared parameters. The estimates guide the policy, and the policy generates the data that changes the estimates.",
    sections: [
      {
        title: "Action-value approximation supports direct choice",
        beginner: "When there are too many state-action pairs for a table, the agent learns a function that scores actions from features.",
        visual: "Draw a control panel where state features enter on the left and action scores come out as meters on the right.",
        technical: "Episodic semi-gradient control extends Sarsa-style updates to parameterized action-value functions q_hat(s,a,w), using sampled targets and gradients with respect to w.",
        takeaway: "Control with approximation learns a scoring machine, not a table."
      },
      {
        title: "Continuing tasks need a different baseline",
        beginner: "Some tasks never naturally end. In those cases, average reward can describe performance better than discounted episode return.",
        visual: "Draw a treadmill rather than a race track. The question is not final score at the finish; it is reward rate while running forever.",
        technical: "Average-reward formulations use differential returns and estimate the average reward rate. Differential semi-gradient methods update values relative to that continuing baseline.",
        takeaway: "The objective must match the time structure of the task."
      },
      {
        title: "On-policy does not mean simple",
        beginner: "Even when the data and target policy match, approximation can introduce sensitivity to step-sizes, features, and exploration.",
        visual: "Show a rider adjusting a bicycle while moving. The rider's current steering creates the data used to tune the steering model.",
        technical: "Semi-gradient n-step Sarsa and differential variants rely on compatible data from the current behavior policy, but stability and performance still depend on representation, step-size, and target construction.",
        takeaway: "On-policy approximation is safer than many off-policy cases, but it is still an optimization problem."
      }
    ],
    closing: "Leave Chapter 10 able to connect tabular control ideas to parameterized value functions and continuing objectives."
  },
  {
    n: 11,
    opening: "Off-policy learning with approximation is where familiar updates can break. The deadly triad names the dangerous combination: function approximation, bootstrapping, and off-policy data.",
    sections: [
      {
        title: "The deadly triad is a feedback problem",
        beginner: "The learner uses shared parameters, updates from its own estimates, and learns from data generated by another policy. Errors can reinforce themselves instead of washing out.",
        visual: "Draw three warning lights connected in a loop. When all three are on, a small estimate error can circle back amplified.",
        technical: "Off-policy bootstrapped updates with function approximation may not correspond to a stable contraction or true gradient descent objective, so iterates can diverge even in simple examples.",
        takeaway: "Tabular intuition does not automatically survive approximation."
      },
      {
        title: "Projected solutions explain what approximation changes",
        beginner: "With approximation, the exact value function may not fit inside the chosen function class. The algorithm can only aim for a projected version.",
        visual: "Show a shadow of a complex shape cast onto a flat wall. The wall is the approximation space; the shadow is the best representable version.",
        technical: "Linear value-function geometry introduces projection operators, Bellman error, projected Bellman error, and distribution-weighted objectives. Which error is minimized matters.",
        takeaway: "Approximation changes the target, not just the storage format."
      },
      {
        title: "Gradient and emphatic methods repair pieces of the puzzle",
        beginner: "One response is to define an objective that really can be descended. Another is to change how much each state matters so the data distribution better supports the target.",
        visual: "Draw a tilted floor being leveled by two tools: one tool changes the descent direction, the other changes which floor tiles carry weight.",
        technical: "Gradient-TD methods introduce auxiliary weights to optimize projected objectives. Emphatic TD adjusts state emphasis to address off-policy distribution mismatch.",
        takeaway: "Stable off-policy approximation needs carefully designed objectives or weighting."
      }
    ],
    closing: "Leave Chapter 11 cautious: powerful RL combinations require stability analysis, not only empirical hope."
  },
  {
    n: 12,
    opening: "Eligibility traces make credit assignment feel continuous. Instead of choosing a single backup length, the learner maintains fading traces of recent responsibility and uses TD errors to update many past states or features.",
    sections: [
      {
        title: "Lambda blends backup lengths",
        beginner: "Lambda decides how far credit flows backward. Low lambda behaves more like one-step TD; high lambda behaves more like Monte Carlo.",
        visual: "Draw a row of fading footprints. A reward splash colors recent footprints strongly and older footprints weakly.",
        technical: "The lambda-return averages n-step returns with weights controlled by lambda. Forward views define the target; backward views implement equivalent or approximate online updates with traces.",
        takeaway: "Lambda is a smooth dial over temporal credit assignment."
      },
      {
        title: "True online methods fix timing mismatch",
        beginner: "When learning happens during an episode, the exact relationship between forward-looking returns and backward traces can be subtle. True online methods keep them aligned more carefully.",
        visual: "Show two synchronized clocks: one tracks what the forward view would have wanted, the other tracks the online trace update.",
        technical: "True online TD(lambda) and Dutch traces correct the online backward view so it better matches the intended forward-view updates under changing weights.",
        takeaway: "Online implementation details matter when weights change during the trajectory."
      },
      {
        title: "Traces become harder off-policy",
        beginner: "If the behavior policy differs from the target policy, old traces may represent actions the target policy would not have taken.",
        visual: "Draw footprints that change color when the path switches from behavior-policy evidence to target-policy evidence; some footprints fade or are cut.",
        technical: "Watkins's Q(lambda), tree-backup(lambda), control variates, variable lambda, and stable off-policy trace methods manage how traces survive under policy mismatch.",
        takeaway: "Eligibility traces are powerful because they spread credit; off-policy learning is hard because it must decide which credit is legitimate."
      }
    ],
    closing: "Leave Chapter 12 seeing traces as the efficient online bridge between one-step TD and long-return learning."
  },
  {
    n: 13,
    opening: "Policy-gradient methods stop treating the policy as a byproduct of value estimates. They parameterize the policy directly and adjust its action probabilities to improve expected return.",
    sections: [
      {
        title: "The policy itself can be differentiable",
        beginner: "Instead of asking which action has the highest learned value, the agent maintains a probability distribution over actions and nudges that distribution after experience.",
        visual: "Draw action probabilities as sliders. Good evidence pushes the sampled action's slider up; normalization shifts the others.",
        technical: "Parameterized policies pi(a|s,theta) allow gradient ascent on performance objectives. The policy-gradient theorem gives a way to express the gradient using action-value-like weighting of score terms.",
        takeaway: "A policy can be the optimized object, not only the final greedy readout."
      },
      {
        title: "REINFORCE uses sampled returns as pressure",
        beginner: "If an action was followed by high return, make that action more likely in similar circumstances. If the return was low, make it less likely.",
        visual: "Show a sampled trajectory stamping arrows with plus or minus pressure according to the outcome that followed.",
        technical: "REINFORCE uses the score-function term grad log pi(A_t|S_t,theta) multiplied by a return. Baselines reduce variance without changing the expected gradient when they do not depend on the sampled action.",
        takeaway: "Policy-gradient learning turns outcome quality into probability pressure."
      },
      {
        title: "Actor-critic splits acting and judging",
        beginner: "The actor chooses actions. The critic estimates value and tells the actor whether an outcome was better or worse than expected.",
        visual: "Draw a performer and a coach. The performer changes the policy; the coach produces the advantage or TD error signal.",
        technical: "Actor-critic methods combine policy-gradient updates with learned value functions, often using TD errors or advantage estimates to reduce variance and support continuing or online learning.",
        takeaway: "Modern policy optimization often lives in the actor-critic family."
      }
    ],
    closing: "Leave Chapter 13 able to explain why stochastic differentiable policies matter for continuous actions and modern deep RL."
  },
  {
    n: 14,
    opening: "The psychology chapter connects RL ideas to behavior. Prediction, control, cues, habits, goals, and maps become ways to interpret classical and instrumental conditioning.",
    sections: [
      {
        title: "Classical conditioning is prediction learning",
        beginner: "A cue becomes meaningful when it predicts something important. The organism learns that the cue changes what to expect next.",
        visual: "Draw a bell cue before food. At first surprise occurs at food; after learning, surprise moves to the bell.",
        technical: "TD-style prediction errors can model aspects of cue learning, including how predictions shift from outcomes to earlier predictors and why blocking can occur.",
        takeaway: "Prediction errors are not only engineering signals; they can describe behavioral adaptation."
      },
      {
        title: "Instrumental conditioning is action learning",
        beginner: "Now the organism's action changes what happens. The question is not just what predicts reward but what behavior produces it.",
        visual: "Draw a lever between the animal and reward. The reward depends on pressing, so the action sits inside the causal loop.",
        technical: "Instrumental conditioning maps naturally to policy and value learning: actions are selected, consequences follow, and future action tendencies change according to value or reinforcement history.",
        takeaway: "Prediction and control are related but distinct behavioral problems."
      },
      {
        title: "Habits and maps show multiple control systems",
        beginner: "Some behavior becomes automatic through repetition. Other behavior uses an internal model of the world to plan. Both can look intelligent, but they fail differently.",
        visual: "Draw two routes to action: a fast habit road and a slower map-based planning road.",
        technical: "Habitual control resembles cached value or policy learning, while goal-directed behavior and cognitive maps suggest model-based evaluation of consequences and state relationships.",
        takeaway: "RL vocabulary helps compare adaptive systems, not reduce them to one mechanism."
      }
    ],
    closing: "Leave Chapter 14 able to talk about RL as a language for behavior, not only a set of algorithms."
  },
  {
    n: 15,
    opening: "The neuroscience chapter asks how RL-like signals might appear in brains. The key bridge is reward-prediction error, especially in interpretations of dopamine activity.",
    sections: [
      {
        title: "Prediction error can move in time",
        beginner: "When reward is unexpected, the surprise happens at reward time. After a cue reliably predicts reward, the surprise moves earlier to the cue.",
        visual: "Draw a spike first over the reward, then after learning over the cue, with a dip when expected reward is omitted.",
        technical: "Temporal-difference error has the same qualitative timing: unexpected reward creates positive error; predicted reward reduces later error; omitted expected reward creates negative error.",
        takeaway: "TD error provides a compact computational story for some dopamine patterns."
      },
      {
        title: "Actor-critic gives a neural architecture metaphor",
        beginner: "One system can learn how good situations are, while another learns which actions to take. The critic's error signal trains both.",
        visual: "Draw brain loops as actor and critic circuits sharing a scalar teaching signal.",
        technical: "Neural actor-critic hypotheses map value prediction, policy tendency, and error-modulated plasticity onto interacting brain systems, while remaining simplified models rather than literal full anatomy.",
        takeaway: "Computational roles can guide biological hypotheses."
      },
      {
        title: "Biology adds constraints and complications",
        beginner: "Brains are not clean tables or simple neural networks. They have many cell types, neuromodulators, circuits, drives, and timescales.",
        visual: "Overlay the neat RL loop with messy biological layers: sensors, hormones, memories, social context, and motor systems.",
        technical: "Topics such as hedonistic neurons, collective RL, model-based brain methods, and addiction show both the reach and limits of direct RL analogies.",
        takeaway: "RL is a useful computational lens, not a complete biological explanation."
      }
    ],
    closing: "Leave Chapter 15 able to explain the dopamine/RPE connection carefully, including what it does and does not claim."
  },
  {
    n: 16,
    opening: "The applications chapter turns ideas into systems. Each success story combines representation, learning signal, search or planning, data generation, and engineering constraints.",
    sections: [
      {
        title: "Games reveal different tool mixtures",
        beginner: "TD-Gammon, checkers, Atari, and Go are not the same recipe. Each uses a different mix of value learning, self-play, features or networks, and search.",
        visual: "Draw a toolbox beside each game: some boxes contain self-play, some search, some neural networks, some handcrafted features.",
        technical: "Game applications illustrate bootstrapped value learning, function approximation, Monte Carlo tree search, policy/value networks, and large-scale experience generation under relatively clear objectives.",
        takeaway: "Applications are algorithmic systems, not isolated update rules."
      },
      {
        title: "Self-play creates a moving curriculum",
        beginner: "In games, the agent can improve by playing against versions of itself. As it improves, its opponent improves too.",
        visual: "Draw a ladder where each rung is a stronger self-generated opponent, forcing the learner upward.",
        technical: "Self-play changes the data distribution over time and can support policy/value improvement when the environment is competitive and simulation is cheap enough.",
        takeaway: "The source of experience can be as important as the learning update."
      },
      {
        title: "Real-world tasks make reward and safety central",
        beginner: "Personalization or thermal soaring is not just about maximizing a game score. The reward must reflect the real objective and respect constraints.",
        visual: "Draw reward as a compass. If the compass points slightly wrong, the agent can travel far in the wrong direction.",
        technical: "Applied RL requires state construction, off-policy evaluation concerns, exploration limits, simulator fidelity, reward design, and domain-specific safety or performance constraints.",
        takeaway: "Deployment turns RL theory into a systems-design problem."
      }
    ],
    closing: "Leave Chapter 16 reading applications by decomposing their representation, objective, data source, planner, learner, and constraints."
  },
  {
    n: 17,
    opening: "The final chapter looks beyond standard algorithms toward the ingredients of more general intelligence: many predictions, temporally extended actions, state construction, reward design, and open-ended learning.",
    sections: [
      {
        title: "General value functions make prediction plural",
        beginner: "An agent should not predict only its main reward. It can learn many forecasts about future signals under many ways of behaving.",
        visual: "Draw the agent with a dashboard of small gauges, each answering a different question about the future.",
        technical: "General value functions extend the value-function idea to many cumulants, policies, and discounts, enabling auxiliary predictive knowledge beyond a single task reward.",
        takeaway: "Prediction can be a general knowledge representation."
      },
      {
        title: "Options make actions last longer",
        beginner: "Instead of choosing only primitive actions, an agent can choose a skill that runs for a while and stops under certain conditions.",
        visual: "Draw a macro button labeled 'navigate to door' that internally presses many smaller movement buttons before terminating.",
        technical: "Options include an initiation set, an internal policy, and a termination rule. They create temporal abstraction and support planning or learning over extended courses of action.",
        takeaway: "Temporal abstraction lets agents reason in skills, not only reflexes."
      },
      {
        title: "State and reward design remain frontier problems",
        beginner: "If the agent observes the wrong information or optimizes the wrong reward, better algorithms may only make it fail faster.",
        visual: "Draw two foundations under a tower: state on one side, reward on the other. Cracks in either foundation tilt the whole tower.",
        technical: "Observation-to-state construction, reward specification, auxiliary tasks, continual learning, and scalable exploration remain core challenges for RL as a path toward broader AI.",
        takeaway: "The future of RL depends on problem formulation as much as algorithmic improvement."
      }
    ],
    closing: "Leave Chapter 17 with a research map: build agents that ask many predictive questions, compose skills, construct useful state, and align reward with intended behavior."
  }
];

export function manuscriptForChapter(chapterNumber: number): ChapterManuscript {
  const manuscript = chapterManuscripts.find((item) => item.n === chapterNumber);
  if (!manuscript) throw new Error(`Missing manuscript for chapter ${chapterNumber}`);
  return manuscript;
}

export function manuscriptSectionCount() {
  return chapterManuscripts.reduce((sum, chapter) => sum + chapter.sections.length, 0);
}

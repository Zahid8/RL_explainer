export interface MasteryStepCard {
  label: string;
  source: string;
  easy: string;
  technical: string;
  steps: string[];
}

export interface MasteryTrap {
  mistake: string;
  fix: string;
  why: string;
}

export interface MasteryCheck {
  prompt: string;
  answer: string;
}

export interface ChapterMastery {
  n: number;
  title: string;
  thesis: string;
  derivations: MasteryStepCard[];
  process: MasteryStepCard[];
  traps: MasteryTrap[];
  checks: MasteryCheck[];
}

export const chapterMastery = [
  {
    "n": 1,
    "title": "The Reinforcement Learning Problem",
    "thesis": "The chapter defines the entire lens: learning is not a detached prediction task but an agent changing action from evaluative feedback over time.",
    "derivations": [
      {
        "label": "Agent-environment loop",
        "source": "Sections 1.1-1.4",
        "easy": "Draw a circle: the agent acts, the world answers with a new situation and a score, and the agent changes what it will do next.",
        "technical": "The loop anticipates the MDP formalism: actions influence later states, rewards evaluate behavior, and the policy is learned from interaction rather than supplied as labels.",
        "steps": [
          "Start with a decision maker and everything outside it as the environment.",
          "At each step the agent emits an action, not a supervised answer.",
          "The environment returns information that will later become state and reward variables.",
          "Learning means changing the policy so future action choices improve long-run reward."
        ]
      },
      {
        "label": "Tic-tac-toe value backup",
        "source": "Section 1.5",
        "easy": "A board position gets a score by looking at what happened after you reached similar boards before.",
        "technical": "The example introduces temporal-difference learning informally: update the estimate of a preceding state toward the estimate of a later state, with terminal outcomes anchoring the values.",
        "steps": [
          "Assign a value estimate to board positions under the current playing policy.",
          "Generate games through self-play or experience.",
          "After a move, compare the older position estimate with the newer position estimate.",
          "Move the older estimate partway toward the newer one; wins/losses supply boundary targets."
        ]
      }
    ],
    "process": [
      {
        "label": "Problem formulation recipe",
        "source": "Sections 1.1-1.4",
        "easy": "Before choosing an algorithm, decide what counts as the learner, the world, an action, and a reward.",
        "technical": "The chapter's definitions become a checklist for formal modeling: agent boundary, environment boundary, action set, observations/state information, reward signal, and performance objective.",
        "steps": [
          "Name the controllable choices.",
          "Name the feedback signal and verify it evaluates the goal rather than a proxy accident.",
          "Decide what information the agent can observe at decision time.",
          "Separate learning from planning only after the interface is clear."
        ]
      },
      {
        "label": "Three research threads merged",
        "source": "Section 1.7",
        "easy": "RL grew by combining trial-and-error learning, optimal control, and temporal-difference learning.",
        "technical": "The early-history section frames RL as the convergence of learning automata/trial-and-error search, dynamic programming/optimal control, and TD prediction ideas.",
        "steps": [
          "Trial-and-error work emphasized learning from scalar reinforcement.",
          "Dynamic programming supplied Bellman equations and optimal-control structure.",
          "TD methods supplied bootstrapping from later predictions.",
          "Modern RL uses all three, often inside one algorithm."
        ]
      }
    ],
    "traps": [
      {
        "mistake": "Treating reward as the value function.",
        "fix": "Reward is immediate feedback; value is a prediction of future cumulative reward.",
        "why": "The book's later equations depend on keeping one-step signals separate from long-horizon predictions."
      },
      {
        "mistake": "Calling any optimization problem reinforcement learning.",
        "fix": "Require sequential interaction, actions that affect future data, and evaluative feedback.",
        "why": "This distinguishes RL from supervised learning and ordinary planning."
      },
      {
        "mistake": "Assuming a model is always known.",
        "fix": "Separate model-free experience updates from model-based planning updates.",
        "why": "Chapters 4 and 8 split these cases explicitly."
      }
    ],
    "checks": [
      {
        "prompt": "If the reward is delayed until the end of a game, what must the learner still estimate?",
        "answer": "It must estimate earlier states/actions by their expected contribution to the terminal outcome, which is why value functions and TD propagation matter."
      },
      {
        "prompt": "Why is tic-tac-toe a better opening example than a one-shot classifier?",
        "answer": "Because action choices change later positions, and feedback arrives after a sequence, so the learner must assign credit through time."
      },
      {
        "prompt": "What is the first modeling decision in an RL problem?",
        "answer": "Draw the agent-environment boundary so actions, observations/state, and rewards are defined consistently."
      }
    ]
  },
  {
    "n": 2,
    "title": "Multi-armed Bandits",
    "thesis": "Bandits isolate exploration: the learner chooses among actions, sees immediate rewards, and must balance trying uncertain actions against exploiting high estimates.",
    "derivations": [
      {
        "label": "Sample-average update",
        "source": "Sections 2.2 and 2.4",
        "easy": "A new reward changes an action's average a little; the more samples you already have, the smaller the change.",
        "technical": "The incremental mean rewrites Q_{n+1}=Q_n + (1/n)(R_n-Q_n), establishing the error-correction form used throughout TD learning.",
        "steps": [
          "Keep the old estimate Q_n for one action.",
          "Observe reward R_n from choosing that action again.",
          "Compute the prediction error R_n - Q_n.",
          "Scale by 1/n for a stationary sample average, or by constant alpha for recency weighting."
        ]
      },
      {
        "label": "UCB and gradient-bandit pressure",
        "source": "Sections 2.7-2.8",
        "easy": "UCB adds a bonus for actions you do not understand yet; gradient bandits learn preferences rather than reward averages.",
        "technical": "UCB selects by estimate plus uncertainty bonus, while gradient bandits update action preferences using reward minus a baseline and the softmax policy gradient form.",
        "steps": [
          "UCB starts with an exploitation term Q_t(a).",
          "Add an uncertainty term that shrinks with action count and grows with time.",
          "Gradient bandits maintain preferences H_t(a), not direct values.",
          "A reward above baseline raises the selected preference and lowers others proportionally to their probabilities."
        ]
      }
    ],
    "process": [
      {
        "label": "Exploration benchmark logic",
        "source": "Section 2.3",
        "easy": "The 10-armed testbed is a controlled playground for comparing action-selection rules.",
        "technical": "The testbed fixes reward distributions so average reward and optimal-action percentage can expose exploration-exploitation behavior without state dynamics.",
        "steps": [
          "Generate many independent bandit tasks.",
          "Run each method long enough to show transient and steady behavior.",
          "Average over tasks to reduce randomness.",
          "Compare both reward and optimal-action rates because they answer different questions."
        ]
      },
      {
        "label": "Nonstationary tracking",
        "source": "Section 2.5",
        "easy": "If the slot machines drift, old evidence should fade.",
        "technical": "Constant step-size updates produce exponentially recency-weighted averages, which track changing action values better than sample averages.",
        "steps": [
          "Use alpha instead of 1/n.",
          "Recent rewards keep weight alpha.",
          "Older rewards decay by repeated multiplication by 1-alpha.",
          "This sacrifices asymptotic exact averaging for adaptability."
        ]
      }
    ],
    "traps": [
      {
        "mistake": "Thinking epsilon-greedy explores intelligently.",
        "fix": "It explores uniformly at random; it does not prefer uncertain actions unless they are sampled.",
        "why": "UCB exists partly because random exploration wastes trials on well-known poor actions."
      },
      {
        "mistake": "Using sample averages in a drifting problem.",
        "fix": "Use constant step-size or another recency mechanism.",
        "why": "Old rewards dominate 1/n averages and slow adaptation."
      },
      {
        "mistake": "Comparing methods only by final reward.",
        "fix": "Inspect learning curves and optimal-action percentages too.",
        "why": "Early exploration cost and eventual exploitation quality can trade off."
      }
    ],
    "checks": [
      {
        "prompt": "What changes in the update when alpha is constant?",
        "answer": "The estimate becomes a recency-weighted average, so old rewards fade geometrically rather than retaining equal weight."
      },
      {
        "prompt": "Why does optimistic initialization encourage exploration?",
        "answer": "Untried actions look artificially good; disappointing samples reduce them, causing the learner to try alternatives."
      },
      {
        "prompt": "Why is the bandit chapter before MDPs?",
        "answer": "It isolates action selection and exploration without delayed reward, state transitions, or bootstrapping."
      }
    ]
  },
  {
    "n": 3,
    "title": "Finite Markov Decision Processes",
    "thesis": "Chapter 3 supplies the formal language: state, action, reward, transition dynamics, return, policy, value, and optimality.",
    "derivations": [
      {
        "label": "Return definitions",
        "source": "Sections 3.3-3.4",
        "easy": "The agent does not chase the next reward only; it evaluates a whole stream of rewards, possibly discounted.",
        "technical": "The return G_t is a discounted sum in continuing or episodic notation, with gamma controlling present value and terminal states handled by unified time indexing.",
        "steps": [
          "List rewards after time t.",
          "Multiply rewards farther away by powers of gamma.",
          "Stop naturally at terminal time in episodic tasks or continue indefinitely in continuing tasks.",
          "Use the unified notation so algorithms do not need separate symbols for both cases."
        ]
      },
      {
        "label": "Bellman expectation and optimality equations",
        "source": "Sections 3.5-3.6",
        "easy": "A state's value equals the reward you expect now plus the value you expect after the next step.",
        "technical": "Value functions decompose recursively using p(s',r|s,a) and pi(a|s); optimal value functions replace policy averaging with maximization over actions.",
        "steps": [
          "Condition on the first action selected by the policy.",
          "Average over next reward and next state from the dynamics.",
          "Add immediate reward to discounted successor value.",
          "For optimality, choose the action that gives the best expected one-step lookahead."
        ]
      }
    ],
    "process": [
      {
        "label": "MDP modeling workflow",
        "source": "Sections 3.1-3.2",
        "easy": "State should contain what matters for predicting the consequences of actions.",
        "technical": "The Markov property is a modeling claim that the selected state representation makes future dynamics depend on the present state and action rather than the full history.",
        "steps": [
          "Choose state variables available at decision time.",
          "Check whether missing history changes transition or reward predictions.",
          "Define action choices at the same decision times.",
          "Specify reward so maximizing return matches the intended objective."
        ]
      },
      {
        "label": "Optimality with approximation caution",
        "source": "Section 3.7",
        "easy": "Perfect optimality is a compass, not always a reachable destination.",
        "technical": "The section warns that large problems force approximation; optimal equations still define targets, but practical methods may settle for useful approximate policies.",
        "steps": [
          "Define optimal values formally.",
          "Notice the full state/action space may be too large.",
          "Use optimality as a reference standard.",
          "Evaluate approximate solutions by control performance and representation limits."
        ]
      }
    ],
    "traps": [
      {
        "mistake": "Assuming observation always equals Markov state.",
        "fix": "Treat state as the information representation needed for prediction; raw observations may be partial.",
        "why": "Chapter 17 later returns to observation/state issues explicitly."
      },
      {
        "mistake": "Using reward shaping without checking the objective.",
        "fix": "Ensure rewards encode the goal rather than merely an easy-to-measure behavior.",
        "why": "The reward hypothesis makes reward central, so bad reward design changes the problem."
      },
      {
        "mistake": "Confusing v_pi with v_*.",
        "fix": "v_pi evaluates a specified policy; v_* is the best achievable value over policies.",
        "why": "Policy evaluation and control separate these roles in later algorithms."
      }
    ],
    "checks": [
      {
        "prompt": "What information appears in p(s',r|s,a)?",
        "answer": "It specifies the probability of each next state and reward given the current state and action."
      },
      {
        "prompt": "Why does discounting help mathematically?",
        "answer": "It can make infinite reward sums finite and weighs near rewards more heavily, though continuing tasks may also use average reward later."
      },
      {
        "prompt": "What makes Bellman equations recursive?",
        "answer": "They define value in terms of immediate reward plus the value of successor states."
      }
    ]
  },
  {
    "n": 4,
    "title": "Dynamic Programming",
    "thesis": "With a known model, Bellman equations become computable backups for policy evaluation, policy improvement, and value iteration.",
    "derivations": [
      {
        "label": "Iterative policy evaluation backup",
        "source": "Section 4.1",
        "easy": "Sweep over the table and replace each state's value by a one-step lookahead estimate under the current policy.",
        "technical": "The Bellman expectation equation becomes an iterative update v_{k+1}(s)=sum_a pi(a|s) sum_{s',r} p(s',r|s,a)[r+gamma v_k(s')].",
        "steps": [
          "Fix the policy pi.",
          "For each state, enumerate actions weighted by pi.",
          "For each action, enumerate model outcomes.",
          "Use old successor values to write the next value estimate."
        ]
      },
      {
        "label": "Policy improvement theorem logic",
        "source": "Sections 4.2-4.4",
        "easy": "If choosing a new action looks at least as good as following the old policy, the new policy cannot be worse.",
        "technical": "Greedy improvement compares q_pi(s, pi'(s)) with v_pi(s); repeated evaluation and improvement yields policy iteration, while value iteration folds them together with optimal backups.",
        "steps": [
          "Evaluate the current policy enough to compare actions.",
          "Choose greedy actions with respect to the evaluation.",
          "Use the theorem to justify monotonic improvement in the exact case.",
          "Iterate, or combine evaluation and improvement through value iteration."
        ]
      }
    ],
    "process": [
      {
        "label": "Generalized policy iteration",
        "source": "Section 4.6",
        "easy": "One process estimates values; another makes the policy greedy with those estimates.",
        "technical": "GPI abstracts the interaction of policy evaluation and policy improvement, allowing partial evaluation, approximate updates, and asynchronous variants.",
        "steps": [
          "Start with any policy and value estimate.",
          "Evaluation moves values toward the policy's value function.",
          "Improvement moves the policy toward greediness with those values.",
          "The two processes can interleave rather than finish in clean phases."
        ]
      },
      {
        "label": "Asynchronous sweeping",
        "source": "Section 4.5",
        "easy": "You do not have to update every state in lockstep.",
        "technical": "Asynchronous DP updates subsets or individual states, provided all relevant states continue to receive attention under suitable conditions.",
        "steps": [
          "Choose an ordering or priority for states.",
          "Apply Bellman backups in place.",
          "Reuse newly updated values immediately if desired.",
          "Convergence can still occur without full synchronous sweeps."
        ]
      }
    ],
    "traps": [
      {
        "mistake": "Calling DP model-free.",
        "fix": "DP needs transition/reward dynamics or an exact generative model for expected backups.",
        "why": "Monte Carlo and TD chapters relax this requirement."
      },
      {
        "mistake": "Thinking value iteration fully evaluates each policy.",
        "fix": "It uses optimal backups that combine improvement with truncated evaluation.",
        "why": "This is why it can be faster than full policy iteration."
      },
      {
        "mistake": "Ignoring computational cost of expected backups.",
        "fix": "Count states, actions, and possible next states.",
        "why": "The book later compares expected and sample updates in planning."
      }
    ],
    "checks": [
      {
        "prompt": "What is the backup diagram for DP showing?",
        "answer": "It shows how a state's update fans out over all actions and next-state/reward outcomes according to the model."
      },
      {
        "prompt": "Why is GPI important beyond DP?",
        "answer": "Most later control algorithms still alternate value estimation pressure and policy improvement pressure."
      },
      {
        "prompt": "What does known model buy you?",
        "answer": "It lets you compute expected Bellman backups without waiting for sampled experience."
      }
    ]
  },
  {
    "n": 5,
    "title": "Monte Carlo Methods",
    "thesis": "Monte Carlo methods learn from complete sampled returns, avoiding a model but waiting until enough future reward has been observed.",
    "derivations": [
      {
        "label": "First-visit and every-visit returns",
        "source": "Section 5.1",
        "easy": "Average the actual returns that followed visits to a state, either once per episode or every time it appears.",
        "technical": "MC prediction estimates v_pi(s) by empirical averages of G_t after visits to s; first-visit and every-visit variants differ in which visits contribute.",
        "steps": [
          "Generate episodes under the policy being evaluated.",
          "Find visits to the state of interest.",
          "Compute the return from each selected visit to episode end.",
          "Average those returns, or update incrementally toward them."
        ]
      },
      {
        "label": "Importance sampling ratio",
        "source": "Sections 5.5-5.9",
        "easy": "If the data came from one policy but you want to evaluate another, reweight episodes by how likely the target policy would have made the same choices.",
        "technical": "Off-policy MC uses products of target-policy probabilities over behavior-policy probabilities; ordinary and weighted importance sampling trade bias, variance, and consistency properties.",
        "steps": [
          "Record the probability of each action under the target policy.",
          "Record the probability of each same action under the behavior policy.",
          "Multiply the ratios across the relevant part of the trajectory.",
          "Use the product to reweight returns; per-decision variants distribute correction through time."
        ]
      }
    ],
    "process": [
      {
        "label": "Monte Carlo control with exploring starts",
        "source": "Section 5.3",
        "easy": "Force experience to cover all starts, then repeatedly evaluate returns and make the policy greedy.",
        "technical": "MC ES alternates episode generation from exploring starts, return averaging for q estimates, and greedy policy improvement over action values.",
        "steps": [
          "Begin episodes from state-action pairs with nonzero coverage.",
          "Use complete returns to update Q(S_t,A_t).",
          "Improve the policy greedily with respect to Q.",
          "Repeat so evaluation and improvement form sampled GPI."
        ]
      },
      {
        "label": "Control without exploring starts",
        "source": "Sections 5.4 and 5.7",
        "easy": "Use soft behavior policies so every action can still be tried.",
        "technical": "On-policy MC control uses epsilon-soft policies; off-policy control separates a behavior policy that explores from a target policy that improves greedily.",
        "steps": [
          "Maintain coverage through epsilon-soft or behavior-policy exploration.",
          "Estimate action values from returns.",
          "Improve the target policy while preserving data coverage.",
          "Use importance sampling when target and behavior differ."
        ]
      }
    ],
    "traps": [
      {
        "mistake": "Forgetting MC waits for episode completion.",
        "fix": "Use MC where episodes are natural or returns can be observed; use TD for online bootstrapping.",
        "why": "The TD chapter is motivated partly by this limitation."
      },
      {
        "mistake": "Assuming off-policy MC ratios are harmless.",
        "fix": "Track variance; full-trajectory products can explode or collapse.",
        "why": "The book devotes multiple sections to ordinary, weighted, and per-decision variants."
      },
      {
        "mistake": "Using state values for model-free control without care.",
        "fix": "Use action values when the model is not available to choose greedily by lookahead.",
        "why": "Section 5.2 makes this transition explicit."
      }
    ],
    "checks": [
      {
        "prompt": "Why are action values central in MC control?",
        "answer": "Without a model, knowing v(s) alone does not tell which action leads to better successor states."
      },
      {
        "prompt": "What does coverage mean in off-policy learning?",
        "answer": "The behavior policy must assign nonzero probability to actions that the target policy may take, or ratios and evaluation become undefined."
      },
      {
        "prompt": "Why can weighted importance sampling be biased yet attractive?",
        "answer": "It normalizes extreme ratios, often reducing variance even though finite-sample bias is introduced."
      }
    ]
  },
  {
    "n": 6,
    "title": "Temporal-Difference Learning",
    "thesis": "TD methods learn immediately from the difference between consecutive predictions, combining sampling from MC with bootstrapping from DP.",
    "derivations": [
      {
        "label": "TD(0) error",
        "source": "Section 6.1",
        "easy": "After one step, compare what you predicted before with reward plus what you predict now.",
        "technical": "The TD error delta_t=R_{t+1}+gamma V(S_{t+1})-V(S_t) drives an incremental update to V(S_t) without waiting for the final return.",
        "steps": [
          "Predict V(S_t).",
          "Observe R_{t+1} and S_{t+1}.",
          "Build a one-step target R_{t+1}+gamma V(S_{t+1}).",
          "Move V(S_t) toward that target by step-size alpha."
        ]
      },
      {
        "label": "Sarsa, Q-learning, Expected Sarsa targets",
        "source": "Sections 6.4-6.6",
        "easy": "The methods differ in what next-action value they use in the target.",
        "technical": "Sarsa uses the sampled next action under the behavior/target policy, Q-learning uses a max over next actions, and Expected Sarsa averages next action values under the policy.",
        "steps": [
          "Sarsa target: reward plus q of the actual next action.",
          "Q-learning target: reward plus max_a q at the next state.",
          "Expected Sarsa target: reward plus policy-weighted expected q at the next state.",
          "This single target choice changes on-policy/off-policy behavior and variance."
        ]
      }
    ],
    "process": [
      {
        "label": "Online control loop",
        "source": "Sections 6.4-6.6",
        "easy": "Act, observe one transition, update one action value, then keep going.",
        "technical": "TD control uses sampled transitions to update action-value estimates while the policy evolves through epsilon-greedy or related improvement.",
        "steps": [
          "Choose A_t from the current behavior policy.",
          "Observe R_{t+1}, S_{t+1}.",
          "Construct the method-specific TD target.",
          "Update Q(S_t,A_t) and choose the next action if required."
        ]
      },
      {
        "label": "Double learning fix",
        "source": "Section 6.7",
        "easy": "Do not let the same noisy estimates both choose and evaluate the maximum.",
        "technical": "Double Q-learning splits action selection and evaluation across two value tables to reduce maximization bias.",
        "steps": [
          "Maintain two independent estimates.",
          "Use one estimate to choose the maximizing action.",
          "Use the other estimate to evaluate that chosen action.",
          "Update one table at a time, usually selected randomly."
        ]
      }
    ],
    "traps": [
      {
        "mistake": "Saying TD is always biased and MC is always better.",
        "fix": "TD trades bias from bootstrapping for lower variance and online updates.",
        "why": "Section 6.2 compares advantages rather than declaring one universally superior."
      },
      {
        "mistake": "Confusing behavior policy with target policy.",
        "fix": "Track which policy generates actions and which policy the update is evaluating/improving.",
        "why": "This distinction determines whether an algorithm is on-policy or off-policy."
      },
      {
        "mistake": "Ignoring maximization bias.",
        "fix": "Use Double learning when noisy max estimates inflate values.",
        "why": "The chapter shows overestimation can change control performance."
      }
    ],
    "checks": [
      {
        "prompt": "What does TD borrow from MC and DP?",
        "answer": "It samples actual experience like MC but bootstraps from existing value estimates like DP."
      },
      {
        "prompt": "Why is Expected Sarsa sometimes lower variance than Sarsa?",
        "answer": "It averages over possible next actions instead of using one sampled next action in the target."
      },
      {
        "prompt": "What is an afterstate?",
        "answer": "A state representation after the agent's move but before the environment's random response, useful in games like tic-tac-toe or backgammon."
      }
    ]
  },
  {
    "n": 7,
    "title": "n-step Bootstrapping",
    "thesis": "n-step methods fill the spectrum between one-step TD and Monte Carlo by waiting several rewards before bootstrapping.",
    "derivations": [
      {
        "label": "n-step return",
        "source": "Section 7.1",
        "easy": "Look ahead n rewards, then use the value estimate at that future state as the tail.",
        "technical": "The n-step target sums rewards through n steps plus gamma^n times the estimated value at S_{t+n}, reducing to TD(0) at n=1 and approaching MC near episode length.",
        "steps": [
          "Choose a backup length n.",
          "Accumulate discounted rewards for n steps.",
          "If the episode has not ended, append the discounted bootstrap value.",
          "Update the state or state-action pair from time t when the target is available."
        ]
      },
      {
        "label": "Off-policy n-step correction",
        "source": "Sections 7.3-7.5",
        "easy": "When the behavior policy differs, correct only the action choices that influence the backed-up target.",
        "technical": "n-step off-policy learning uses products of importance-sampling ratios over relevant action probabilities; tree-backup and control-variate methods reduce direct reliance on full sampled ratios.",
        "steps": [
          "Identify the time interval included in the backup.",
          "Compute target-over-behavior action probability ratios.",
          "Scale the return or TD errors as required by the method.",
          "Alternative algorithms replace some sampled branches with expectations under the target policy."
        ]
      }
    ],
    "process": [
      {
        "label": "n-step Sarsa workflow",
        "source": "Section 7.2",
        "easy": "Keep a short queue of recent transitions; update a past state-action when enough future rewards are known.",
        "technical": "The algorithm delays each update until the n-step action-value return can be assembled from stored rewards and the bootstrap action value.",
        "steps": [
          "Store S, A, and R as the episode unfolds.",
          "At time t, compute tau=t-n+1 as the state-action now ready for update.",
          "Build the n-step Sarsa return for tau.",
          "Update Q(S_tau,A_tau) and continue until terminal cleanup finishes pending updates."
        ]
      },
      {
        "label": "Q(sigma) unification",
        "source": "Section 7.6",
        "easy": "Use sigma to decide how much the backup follows sampled actions versus expected action branches.",
        "technical": "n-step Q(sigma) interpolates between Sarsa-like sampled backups and tree-backup-like expected backups, revealing a continuum of return operators.",
        "steps": [
          "At each depth, choose sigma in [0,1].",
          "sigma=1 keeps the sampled action path.",
          "sigma=0 uses expected policy probabilities over actions.",
          "Intermediate values mix sample and expectation to tune variance and bias."
        ]
      }
    ],
    "traps": [
      {
        "mistake": "Treating n only as a computational delay.",
        "fix": "Recognize n changes the target's bias-variance profile and credit assignment length.",
        "why": "The random-walk examples emphasize performance variation with n."
      },
      {
        "mistake": "Applying full-episode importance ratios when only part of the backup matters.",
        "fix": "Use the ratio interval specified by the n-step target.",
        "why": "Unnecessary ratios add variance."
      },
      {
        "mistake": "Seeing tree-backup as unrelated to Sarsa.",
        "fix": "View both as points on the Q(sigma) sample-expectation spectrum.",
        "why": "The chapter's unifying algorithm is designed to show this relation."
      }
    ],
    "checks": [
      {
        "prompt": "What happens at n=1?",
        "answer": "The n-step return becomes a one-step TD target."
      },
      {
        "prompt": "What happens when n reaches the rest of the episode?",
        "answer": "The backup approaches a Monte Carlo return with no bootstrap tail."
      },
      {
        "prompt": "Why use expected backups in off-policy n-step methods?",
        "answer": "They can reduce variance by averaging over target-policy actions instead of multiplying long sampled ratios."
      }
    ]
  },
  {
    "n": 8,
    "title": "Planning and Learning with Tabular Methods",
    "thesis": "Planning and learning share backup machinery; the difference is whether updates are driven by real experience or simulated model experience.",
    "derivations": [
      {
        "label": "Dyna update equivalence",
        "source": "Section 8.2",
        "easy": "Real experience teaches both the value table and the model; simulated experience from the model uses the same update rule again.",
        "technical": "Dyna integrates direct RL updates, model learning, and planning backups by sampling previously observed state-action pairs from a learned model and applying the same TD control update.",
        "steps": [
          "Take a real action and observe reward and next state.",
          "Update action values from the real transition.",
          "Store or update the model for that state-action pair.",
          "Repeat several planning updates using transitions sampled from the model."
        ]
      },
      {
        "label": "Prioritized sweeping key",
        "source": "Section 8.4",
        "easy": "If one value changes a lot, update the states that can lead into it first.",
        "technical": "Prioritized sweeping maintains predecessors and a priority queue based on expected value-change magnitude, focusing planning updates where Bellman error is likely largest.",
        "steps": [
          "After a transition changes a value estimate, estimate the size of the induced backup error.",
          "Insert affected predecessor state-action pairs into a priority queue.",
          "Pop high-priority items for planning updates.",
          "Propagate newly induced priorities backward through the predecessor graph."
        ]
      }
    ],
    "process": [
      {
        "label": "Expected versus sample updates",
        "source": "Section 8.5",
        "easy": "You can average over every possible model outcome or sample one outcome cheaply.",
        "technical": "Expected updates reduce variance but cost more per backup when branching is large; sample updates are cheaper and may spread computation over more states/actions.",
        "steps": [
          "Count the number of successor branches in the model.",
          "Compare one expected backup's cost with several sample backups.",
          "Use expected backups where branching is small or exactness is valuable.",
          "Use samples when breadth would consume the planning budget."
        ]
      },
      {
        "label": "Decision-time planning ladder",
        "source": "Sections 8.8-8.11",
        "easy": "Before acting, simulate possible futures; the deeper and more selective the search, the more planning resembles game-tree search.",
        "technical": "Heuristic search, rollout algorithms, and Monte Carlo tree search apply planning computation at action-selection time rather than only in background learning.",
        "steps": [
          "Start from the current state.",
          "Use a model to expand possible action consequences.",
          "Evaluate leaves using rollout returns, value estimates, or heuristics.",
          "Choose the root action with the best backed-up assessment."
        ]
      }
    ],
    "traps": [
      {
        "mistake": "Assuming learned models are harmless.",
        "fix": "Account for model error and nonstationarity.",
        "why": "The blocking maze and shortcut maze examples show stale or wrong models can mislead planning."
      },
      {
        "mistake": "Separating planning algorithms from RL updates completely.",
        "fix": "Notice both use backups and targets; only the source of experience differs.",
        "why": "This is the conceptual point of Dyna."
      },
      {
        "mistake": "Treating MCTS as only a board-game trick.",
        "fix": "Understand it as sample-based decision-time planning with selective tree growth.",
        "why": "The chapter places MCTS in the general planning/control taxonomy."
      }
    ],
    "checks": [
      {
        "prompt": "What are Dyna's three simultaneous activities?",
        "answer": "Direct RL, model learning, and planning from simulated model experience."
      },
      {
        "prompt": "Why can prioritized sweeping be much faster than uniform planning?",
        "answer": "It spends backups on places likely to change values rather than sampling all stored transitions evenly."
      },
      {
        "prompt": "What is search control?",
        "answer": "The mechanism deciding which states or state-action pairs receive planning backups."
      }
    ]
  },
  {
    "n": 9,
    "title": "On-policy Prediction with Approximation",
    "thesis": "A value table becomes a parameterized function, so updates generalize across states and representation becomes part of the algorithm.",
    "derivations": [
      {
        "label": "Mean-squared value error objective",
        "source": "Section 9.2",
        "easy": "Approximation needs a weighted definition of which state errors matter most.",
        "technical": "The value-error objective sums squared differences between true values and approximate values under a state weighting distribution, usually tied to on-policy visitation.",
        "steps": [
          "Choose the value function being approximated.",
          "Choose a distribution over states that defines importance.",
          "Measure squared error at each state.",
          "Minimize the weighted aggregate, knowing the function class may not represent the exact value function."
        ]
      },
      {
        "label": "Semi-gradient TD with features",
        "source": "Sections 9.3-9.4",
        "easy": "Change weights in the direction that would reduce the current target error, while pretending the bootstrap target is fixed.",
        "technical": "For linear v_hat(s,w)=w^T x(s), the gradient is x(s), and semi-gradient TD updates weights by alpha times TD error times the feature vector.",
        "steps": [
          "Represent each state by features x(s).",
          "Compute a sampled TD or return target.",
          "Compute error target - v_hat(s,w).",
          "Move weights along the gradient of v_hat for the visited state."
        ]
      }
    ],
    "process": [
      {
        "label": "Feature-construction menu",
        "source": "Section 9.5",
        "easy": "Features decide which states share learning.",
        "technical": "The chapter compares polynomials, Fourier bases, coarse coding, tile coding, and radial basis functions as ways to encode smoothness, locality, sparsity, and resolution.",
        "steps": [
          "Use polynomial/Fourier features for broad smooth trends.",
          "Use coarse coding or tile coding for sparse local generalization.",
          "Use radial basis functions for smooth localized bumps.",
          "Scale step-size to feature activity and norms."
        ]
      },
      {
        "label": "Alternative approximators",
        "source": "Sections 9.7-9.10",
        "easy": "Not every value function has to be a linear tile coder.",
        "technical": "The chapter introduces neural networks, least-squares TD, memory-based methods, and kernel methods as different computational/statistical tradeoffs.",
        "steps": [
          "Neural networks learn nonlinear internal features.",
          "LSTD uses linear algebra to exploit linear structure.",
          "Memory-based methods predict from stored neighbors.",
          "Kernel methods predict from similarity functions, often with scaling costs."
        ]
      }
    ],
    "traps": [
      {
        "mistake": "Assuming a lower training error means better control later.",
        "fix": "Check the state distribution and generalization region relevant to the policy.",
        "why": "The objective is weighted by a distribution, not uniform truth everywhere."
      },
      {
        "mistake": "Forgetting semi-gradient is not a true gradient of the bootstrapped objective.",
        "fix": "State explicitly which terms are treated as fixed during differentiation.",
        "why": "This matters for stability and motivates later off-policy corrections."
      },
      {
        "mistake": "Choosing alpha without feature scaling.",
        "fix": "Normalize or account for number/magnitude of active features.",
        "why": "Feature norms directly scale weight changes."
      }
    ],
    "checks": [
      {
        "prompt": "Why can one approximate update change many state values?",
        "answer": "The same weights are used by many states, so changing a weight changes all states whose features depend on it."
      },
      {
        "prompt": "Why is tile coding popular in examples?",
        "answer": "It gives sparse, local, controllable generalization with simple linear updates."
      },
      {
        "prompt": "What does projection mean here?",
        "answer": "When the exact value function is outside the approximator, learning can only find a representable approximation under some weighting."
      }
    ]
  },
  {
    "n": 10,
    "title": "On-policy Control with Approximation",
    "thesis": "Approximate control uses parameterized action values and must handle changing data distributions plus continuing-task objectives.",
    "derivations": [
      {
        "label": "Episodic semi-gradient Sarsa",
        "source": "Sections 10.1-10.2",
        "easy": "Use features for state-action pairs, build an n-step Sarsa target, and move weights toward it.",
        "technical": "Semi-gradient Sarsa updates q_hat(S_t,A_t,w) by the target error times the gradient of q_hat with respect to w, often under epsilon-greedy on-policy control.",
        "steps": [
          "Encode the current state-action pair.",
          "Generate an on-policy trajectory.",
          "Build a one-step or n-step Sarsa target.",
          "Update weights using the action-value gradient at the earlier pair."
        ]
      },
      {
        "label": "Average-reward differential target",
        "source": "Sections 10.3-10.5",
        "easy": "In a continuing task, judge actions by reward above or below the long-run average reward rate.",
        "technical": "Differential methods estimate the average reward and update differential action values using TD errors that subtract the current average reward estimate.",
        "steps": [
          "Maintain an estimate of average reward per time step.",
          "Compute TD errors using reward minus that average baseline.",
          "Update the average reward estimate from observed errors.",
          "Update action-value weights toward differential returns."
        ]
      }
    ],
    "process": [
      {
        "label": "Mountain Car lesson",
        "source": "Sections 10.1-10.2",
        "easy": "The agent must learn to move away from the goal first because momentum matters.",
        "technical": "Mountain Car demonstrates how features, step-size, exploration, and n-step return length affect approximate control in a continuous state space.",
        "steps": [
          "Represent position and velocity with features.",
          "Learn action values for thrust choices.",
          "Use multi-step targets to propagate delayed success.",
          "Evaluate learning curves across parameter choices rather than one lucky run."
        ]
      },
      {
        "label": "Access-control lesson",
        "source": "Section 10.5",
        "easy": "A server decides whether to accept jobs while keeping long-run service quality high.",
        "technical": "The access-control example illustrates continuing average-reward control where differential values compare choices relative to steady reward rate.",
        "steps": [
          "Define continuing states such as available servers and job priority.",
          "Select accept/reject actions under an exploratory policy.",
          "Update average reward and differential action values.",
          "Improve toward actions with better differential value."
        ]
      }
    ],
    "traps": [
      {
        "mistake": "Treating discounted continuing control and average reward as the same objective.",
        "fix": "Keep the objective explicit; average reward optimizes steady reward rate without artificial discount horizon.",
        "why": "The chapter deliberately deprecates discounting for some continuing settings."
      },
      {
        "mistake": "Ignoring that control changes the data distribution.",
        "fix": "Update policies carefully and monitor stability.",
        "why": "Prediction under a fixed policy is simpler than control with an improving policy."
      },
      {
        "mistake": "Using state features but forgetting action discrimination.",
        "fix": "Represent state-action values so different actions can receive different weights or feature channels.",
        "why": "Control needs action comparisons."
      }
    ],
    "checks": [
      {
        "prompt": "Why is q_hat more useful than v_hat for model-free approximate control?",
        "answer": "Action values let the policy compare actions directly without a transition model."
      },
      {
        "prompt": "What does a differential value measure?",
        "answer": "It measures desirability relative to the average reward baseline in a continuing task."
      },
      {
        "prompt": "Why can n-step targets help Mountain Car?",
        "answer": "They propagate delayed progress over several time steps rather than relying only on one-step bootstrapping."
      }
    ]
  },
  {
    "n": 11,
    "title": "Off-policy Methods with Approximation",
    "thesis": "The deadly triad explains why useful ingredients can diverge together, motivating projected objectives, gradient-TD, and emphatic weighting.",
    "derivations": [
      {
        "label": "Deadly triad mechanism",
        "source": "Sections 11.1-11.3",
        "easy": "Learning from someone else's data, bootstrapping, and sharing weights can push estimates in a self-reinforcing wrong direction.",
        "technical": "Function approximation couples states, off-policy sampling changes the update distribution, and bootstrapping uses current estimates as targets; together they can produce divergence even linearly.",
        "steps": [
          "Approximation means an update at one state changes predictions elsewhere.",
          "Off-policy learning weights updates by behavior-state visitation, not target visitation.",
          "Bootstrapped targets include the learner's own current predictions.",
          "The feedback loop can amplify error rather than contract it."
        ]
      },
      {
        "label": "Bellman error and double sampling",
        "source": "Sections 11.5-11.6",
        "easy": "The obvious squared Bellman error cannot be sampled cleanly from one next state.",
        "technical": "The gradient of the mean-squared Bellman error involves products of expectations; unbiased estimation generally needs two independent successor samples from the same state-action, which ordinary experience lacks.",
        "steps": [
          "Write Bellman error as expected target minus current prediction.",
          "Square that expectation difference.",
          "Notice the gradient contains an expectation multiplied by another expectation.",
          "A single sampled successor estimates an expectation of a product, not the needed product of expectations."
        ]
      }
    ],
    "process": [
      {
        "label": "Gradient-TD two-timescale idea",
        "source": "Section 11.7",
        "easy": "Use extra weights to estimate the correction that ordinary TD ignores.",
        "technical": "GTD/TDC-style algorithms optimize projected Bellman-error objectives with primary value weights and secondary weights that estimate gradient correction terms.",
        "steps": [
          "Choose a projected Bellman objective such as MSPBE.",
          "Maintain primary value weights.",
          "Maintain secondary weights for correction terms.",
          "Update both from samples so the primary update follows a true gradient direction under assumptions."
        ]
      },
      {
        "label": "Emphatic-TD weighting idea",
        "source": "Section 11.8",
        "easy": "Give more learning weight to states whose predictions are followed by many important bootstraps.",
        "technical": "Emphatic TD uses interest and follow-on traces to construct emphasis weights that correct the mismatch between behavior distribution and target-policy bootstrapping flow.",
        "steps": [
          "Specify interest in states.",
          "Track follow-on traces through target-policy discounting and importance ratios.",
          "Compute emphasis from interest plus follow-on influence.",
          "Scale TD updates by this emphasis to regain stable weighting."
        ]
      }
    ],
    "traps": [
      {
        "mistake": "Thinking divergence is only a deep-network problem.",
        "fix": "Study the linear counterexamples.",
        "why": "The chapter uses simple examples to show the instability is algorithmic."
      },
      {
        "mistake": "Assuming importance sampling alone fixes everything.",
        "fix": "Separate expectation correction from stability of bootstrapped approximation.",
        "why": "Correcting action probabilities does not remove every projection/distribution problem."
      },
      {
        "mistake": "Minimizing Bellman error from ordinary samples naively.",
        "fix": "Account for double-sampling or use objectives designed for available data.",
        "why": "The Bellman error gradient is not directly learnable from one successor sample."
      }
    ],
    "checks": [
      {
        "prompt": "Name the deadly triad.",
        "answer": "Function approximation, bootstrapping, and off-policy learning."
      },
      {
        "prompt": "Why introduce projected Bellman error?",
        "answer": "Because with approximation the Bellman update may leave the representable function space, so it must be projected back under a weighting."
      },
      {
        "prompt": "What does emphasis correct?",
        "answer": "It changes update weighting to reflect interest and target-policy bootstrapping flow rather than raw behavior visitation alone."
      }
    ]
  },
  {
    "n": 12,
    "title": "Eligibility Traces",
    "thesis": "Eligibility traces implement mixtures of many backup lengths online by keeping a decaying memory of recently visited states, actions, or features.",
    "derivations": [
      {
        "label": "lambda-return mixture",
        "source": "Section 12.1",
        "easy": "Instead of choosing one backup length, average all backup lengths with shorter ones weighted more when lambda is small.",
        "technical": "The lambda-return is a geometrically weighted mixture of n-step returns, interpolating between TD(0) at lambda=0 and Monte Carlo-like returns as lambda approaches 1.",
        "steps": [
          "Compute each n-step return conceptually.",
          "Weight the n-step return by powers of lambda.",
          "Normalize with 1-lambda for continuing mixtures, with terminal handling in episodes.",
          "Use lambda to tune bias, variance, and temporal credit assignment."
        ]
      },
      {
        "label": "Backward trace equivalence",
        "source": "Sections 12.2 and 12.5",
        "easy": "A TD error can update many recent states because their traces say they are still eligible for credit.",
        "technical": "Backward-view TD(lambda) maintains traces that decay by gamma lambda and are incremented by current features; true online TD(lambda) refines the update to match an online forward view exactly for linear approximation.",
        "steps": [
          "Carry an eligibility vector alongside weights.",
          "Decay old eligibility each time step.",
          "Add current state's features or state indicator.",
          "Multiply the current TD error by the trace to update all eligible weights."
        ]
      }
    ],
    "process": [
      {
        "label": "Trace variants in control",
        "source": "Sections 12.7-12.10",
        "easy": "Different algorithms decide when traces should continue, shrink, or be cut.",
        "technical": "Sarsa(lambda), Watkins's Q(lambda), Tree-Backup(lambda), and related control-variate methods differ in how traces handle off-policy actions and expected branches.",
        "steps": [
          "On-policy Sarsa traces can follow actual selected actions.",
          "Watkins's Q(lambda) cuts traces after nongreedy actions for greedy off-policy control.",
          "Tree-backup variants use target-policy probabilities instead of raw ratios.",
          "Control variates tune variance while preserving expected targets."
        ]
      },
      {
        "label": "Implementation details that matter",
        "source": "Sections 12.6 and 12.12",
        "easy": "Trace formulas look small but repeated features, online updates, and numerical storage choices change behavior.",
        "technical": "Dutch traces, replacing/accumulating trace choices, sparse feature storage, and variable gamma/lambda affect exactness, speed, and memory use.",
        "steps": [
          "Choose accumulating, replacing, Dutch, or other trace rules deliberately.",
          "Exploit sparse features to avoid dense updates when possible.",
          "Handle terminal gamma and state-dependent lambda carefully.",
          "Check whether the intended forward-view equivalence actually holds."
        ]
      }
    ],
    "traps": [
      {
        "mistake": "Saying lambda is just another step-size.",
        "fix": "lambda controls backup-length mixture and credit trace decay, not update magnitude directly.",
        "why": "alpha and lambda play distinct roles."
      },
      {
        "mistake": "Assuming ordinary TD(lambda) and true online TD(lambda) are identical.",
        "fix": "Use true online formulas when exact online forward/backward equivalence under linear approximation is required.",
        "why": "Changing weights during an episode creates subtle differences."
      },
      {
        "mistake": "Letting off-policy traces run unchecked.",
        "fix": "Use trace cutting, expected backups, ratios, or emphatic/gradient corrections as appropriate.",
        "why": "Off-policy multi-step traces can introduce high variance or instability."
      }
    ],
    "checks": [
      {
        "prompt": "What are the two views of eligibility traces?",
        "answer": "The forward view defines lambda-returns from future rewards; the backward view implements them online with decaying traces."
      },
      {
        "prompt": "What does lambda=0 recover?",
        "answer": "One-step TD-style learning."
      },
      {
        "prompt": "Why are traces useful for delayed reward?",
        "answer": "They let one later TD error affect multiple recent states or features that may have contributed to it."
      }
    ]
  },
  {
    "n": 13,
    "title": "Policy Gradient Methods",
    "thesis": "Instead of deriving a policy from values, policy-gradient methods parameterize the policy directly and adjust it in the direction of better expected return.",
    "derivations": [
      {
        "label": "Policy gradient theorem",
        "source": "Section 13.2",
        "easy": "To improve a stochastic policy, increase the log-probability of actions in proportion to how good they turned out to be.",
        "technical": "The theorem expresses the performance gradient as an expectation over state visitation, action-value, and the score function gradient of the policy log probability, avoiding explicit derivatives of the state distribution.",
        "steps": [
          "Parameterize pi(a|s,theta).",
          "Define a scalar performance objective.",
          "Differentiate expected return with respect to theta.",
          "Use the theorem to write the gradient in sampleable score-function form."
        ]
      },
      {
        "label": "Baseline invariance",
        "source": "Section 13.4",
        "easy": "Subtracting a state-dependent baseline can reduce noise without changing the expected gradient direction.",
        "technical": "Because the expected score function over actions is zero, subtracting b(s) from the return/action-value term leaves the policy-gradient expectation unchanged while potentially reducing variance.",
        "steps": [
          "Start from a score-function update weighted by return.",
          "Subtract b(S_t) that does not depend on the sampled action.",
          "The baseline term's expected contribution is zero under the policy.",
          "Choose b(s), often a value estimate, to reduce variance."
        ]
      }
    ],
    "process": [
      {
        "label": "REINFORCE to actor-critic",
        "source": "Sections 13.3-13.5",
        "easy": "REINFORCE waits for returns; actor-critic adds a learned critic to provide lower-variance online feedback.",
        "technical": "REINFORCE uses Monte Carlo returns in the policy-gradient update, while actor-critic methods use learned value functions and TD errors as advantage-like signals.",
        "steps": [
          "Sample trajectories from the current stochastic policy.",
          "Estimate return or advantage for actions taken.",
          "Update actor parameters by score function times that estimate.",
          "Update critic parameters to improve future advantage estimates."
        ]
      },
      {
        "label": "Continuous action parameterization",
        "source": "Section 13.7",
        "easy": "For continuous actions, output a distribution such as a Gaussian and learn its parameters.",
        "technical": "The policy can parameterize means, variances, or other distributional parameters; gradients use log-probability derivatives for the sampled continuous action.",
        "steps": [
          "Choose a differentiable action distribution.",
          "Map state features to distribution parameters.",
          "Sample an action for exploration and control.",
          "Apply the score-function gradient to the log probability of that action."
        ]
      }
    ],
    "traps": [
      {
        "mistake": "Thinking policy gradient eliminates value functions.",
        "fix": "Value functions are optional for action selection but valuable as critics/baselines.",
        "why": "Actor-critic is a central policy-gradient family."
      },
      {
        "mistake": "Using a baseline that depends on the action without correction.",
        "fix": "Use state-only baselines for the standard invariance argument.",
        "why": "Action-dependent baselines can bias the gradient unless handled carefully."
      },
      {
        "mistake": "Assuming deterministic greedy improvement is required.",
        "fix": "Policy-gradient methods often keep stochastic policies throughout learning.",
        "why": "The gradient is defined through probabilities and score functions."
      }
    ],
    "checks": [
      {
        "prompt": "Why does the policy gradient theorem matter?",
        "answer": "It gives a sampleable gradient expression without differentiating the state distribution explicitly."
      },
      {
        "prompt": "What does REINFORCE use as its learning signal?",
        "answer": "Monte Carlo returns, optionally minus a baseline."
      },
      {
        "prompt": "What is the actor and what is the critic?",
        "answer": "The actor is the parameterized policy; the critic estimates value or advantage signals used to train the actor."
      }
    ]
  },
  {
    "n": 14,
    "title": "Psychology",
    "thesis": "RL concepts explain and sharpen classical psychology topics such as prediction, conditioning, delayed reinforcement, cognitive maps, and habit versus goal-directed behavior.",
    "derivations": [
      {
        "label": "Rescorla-Wagner to TD connection",
        "source": "Sections 14.2.2-14.2.4",
        "easy": "Learning changes most when an outcome is surprising; TD extends surprise to predictions across time.",
        "technical": "The Rescorla-Wagner error compares actual outcome with summed associative prediction, while TD errors compare reward plus next prediction with current prediction, handling temporally extended stimuli.",
        "steps": [
          "Represent cues as predictors of outcomes.",
          "Compute prediction error as outcome minus current prediction.",
          "Update cue associations in proportion to error.",
          "TD replaces a single outcome prediction with predictions chained through time."
        ]
      },
      {
        "label": "Habit and goal-directed split",
        "source": "Section 14.6",
        "easy": "A habit chooses what has worked; a goal-directed system reasons about current outcomes and consequences.",
        "technical": "The chapter connects model-free cached values with habitual control and model-based evaluation with goal-directed behavior, including outcome devaluation logic.",
        "steps": [
          "A habitual controller stores action tendencies or cached values.",
          "A goal-directed controller evaluates action-outcome relationships using a model.",
          "Outcome devaluation tests whether behavior updates when reward desirability changes.",
          "RL provides algorithmic language for the distinction."
        ]
      }
    ],
    "process": [
      {
        "label": "Conditioning phenomena map",
        "source": "Sections 14.2.1-14.2.4",
        "easy": "Blocking, higher-order conditioning, and timing effects become tests of prediction-error theories.",
        "technical": "TD models explain why already-predicted outcomes generate reduced learning, and why prediction errors can shift backward from reward time to cue time.",
        "steps": [
          "Train a cue to predict reward.",
          "Add a second cue and observe whether it gains association.",
          "Track the prediction error over time within a trial.",
          "Compare simulated error patterns with behavioral conditioning effects."
        ]
      },
      {
        "label": "Cognitive maps and delayed reinforcement",
        "source": "Sections 14.4-14.5",
        "easy": "Animals can appear to learn structure before reward arrives, suggesting internal maps and planning-like use of experience.",
        "technical": "The chapter relates latent learning, cognitive maps, and delayed reinforcement to model-based RL, state representation, and credit assignment through time.",
        "steps": [
          "Separate learning an environment model from immediately receiving reward.",
          "Use later reward to evaluate previously learned structure.",
          "Connect delayed reinforcement to temporal credit assignment.",
          "Compare model-free and model-based explanations."
        ]
      }
    ],
    "traps": [
      {
        "mistake": "Treating psychology chapters as nontechnical extras.",
        "fix": "Use them as model-comparison tests for RL mechanisms.",
        "why": "They clarify what prediction errors, models, and cached values imply behaviorally."
      },
      {
        "mistake": "Equating dopamine with reward itself.",
        "fix": "Keep the prediction-error interpretation separate from raw pleasure or reward magnitude.",
        "why": "Chapter 15 develops this distinction neurologically."
      },
      {
        "mistake": "Assuming habit and goal-directed systems are mutually exclusive in behavior.",
        "fix": "View them as interacting control influences.",
        "why": "Real behavior can reflect mixtures and arbitration."
      }
    ],
    "checks": [
      {
        "prompt": "Why does blocking support prediction-error learning?",
        "answer": "A new cue learns little when the outcome is already predicted by an old cue, so surprise is small."
      },
      {
        "prompt": "How does TD improve over a static associative model?",
        "answer": "It handles predictions at successive times and shifts error signals backward through temporal chains."
      },
      {
        "prompt": "What does outcome devaluation test?",
        "answer": "Whether behavior depends on current outcome value or cached habitual action strength."
      }
    ]
  },
  {
    "n": 15,
    "title": "Neuroscience",
    "thesis": "The chapter links TD errors and actor-critic ideas to dopamine, basal ganglia circuitry, addiction, and distributed reinforcement learning in the brain.",
    "derivations": [
      {
        "label": "Reward prediction error hypothesis",
        "source": "Sections 15.3-15.6",
        "easy": "Dopamine activity resembles a surprise signal: response to unexpected reward, transfer to predictive cue, and dip when expected reward is omitted.",
        "technical": "The RPE hypothesis aligns phasic dopamine with TD error patterns generated as predictions learn, including temporal transfer of error from reward to conditioned stimulus.",
        "steps": [
          "Before learning, reward is unexpected, so the error occurs at reward delivery.",
          "After learning, the cue predicts reward, so the error shifts to cue onset.",
          "If expected reward is omitted, the error becomes negative at expected reward time.",
          "These temporal signatures parallel TD error simulations."
        ]
      },
      {
        "label": "Neural actor-critic sketch",
        "source": "Sections 15.7-15.8",
        "easy": "One system evaluates predictions while another learns action tendencies, both modulated by prediction errors.",
        "technical": "Actor-critic interpretations map critic-like value learning and actor-like policy/action selection to interacting neural systems, with dopamine-like TD errors modulating plasticity.",
        "steps": [
          "Critic learns predictions of future reinforcement.",
          "TD-like error signals unexpected changes in predicted reinforcement.",
          "Actor updates action tendencies based on those errors.",
          "Learning rules combine eligibility-like traces with neuromodulatory signals."
        ]
      }
    ],
    "process": [
      {
        "label": "Experimental-support pattern",
        "source": "Section 15.5",
        "easy": "The neuroscience argument depends on matching timing patterns, not just saying dopamine feels good.",
        "technical": "Empirical support comes from dopamine neuron firing patterns under unexpected reward, predicted reward, omitted reward, and cue conditioning paradigms.",
        "steps": [
          "Identify behavioral events and predicted rewards.",
          "Record phasic neural responses over learning.",
          "Compare response timing with TD error predictions.",
          "Look for both positive and negative prediction-error signatures."
        ]
      },
      {
        "label": "Addiction interpretation",
        "source": "Section 15.12",
        "easy": "Drugs may hijack learning signals so actions toward the drug are reinforced even when outcomes become harmful.",
        "technical": "The chapter discusses addiction through altered reward-prediction/reinforcement signals, distorted value learning, and persistent control consequences.",
        "steps": [
          "Consider pharmacological effects on dopamine/reinforcement signals.",
          "Ask how artificial prediction errors would update values and policies.",
          "Explain persistence despite devaluation or negative outcomes.",
          "Connect to habit and goal-directed distinctions from Chapter 14."
        ]
      }
    ],
    "traps": [
      {
        "mistake": "Reducing the chapter to a one-line dopamine equals reward slogan.",
        "fix": "Preserve the TD-error timing pattern and omitted-reward dip.",
        "why": "The correspondence is specifically about prediction error, not reward magnitude alone."
      },
      {
        "mistake": "Overclaiming exact neural implementation.",
        "fix": "Frame RL models as computational hypotheses and correspondences.",
        "why": "The book is careful about biological complexity."
      },
      {
        "mistake": "Ignoring multiple timescales and circuits.",
        "fix": "Track actor, critic, model-based, and collective reinforcement ideas separately.",
        "why": "The chapter includes more than a single dopamine pathway story."
      }
    ],
    "checks": [
      {
        "prompt": "What is the strongest timing signature of TD-like dopamine?",
        "answer": "The response shifts from unexpected reward to the predictive cue after learning, with a negative response when expected reward is omitted."
      },
      {
        "prompt": "Why do eligibility traces fit neural learning stories?",
        "answer": "They allow recent synaptic/activity patterns to be modified when a later neuromodulatory error signal arrives."
      },
      {
        "prompt": "How does addiction connect to prediction-error learning?",
        "answer": "Artificially altered reinforcement signals can repeatedly update values and policies in ways that do not match long-term welfare."
      }
    ]
  },
  {
    "n": 16,
    "title": "Applications and Case Studies",
    "thesis": "The application chapter shows RL ideas in complete systems, from games and web services to energy control and flight, emphasizing representation, search, and engineering constraints.",
    "derivations": [
      {
        "label": "TD-Gammon learning loop",
        "source": "Section 16.1",
        "easy": "A neural network evaluated board positions while self-play supplied the experience.",
        "technical": "TD-Gammon combined TD(lambda)-style value learning, nonlinear function approximation, and self-play in backgammon, showing the power of bootstrapped value learning in a rich game.",
        "steps": [
          "Represent a backgammon position as network input.",
          "Use the network to estimate outcome probabilities or value.",
          "Generate experience through self-play.",
          "Update weights from temporal-difference errors across positions."
        ]
      },
      {
        "label": "AlphaGo to AlphaGo Zero ladder",
        "source": "Sections 16.6.1-16.6.2",
        "easy": "Go systems combine learned evaluation/policy with search; AlphaGo Zero removes human examples and learns from self-play.",
        "technical": "The case study contrasts supervised/pretrained components, reinforcement learning, Monte Carlo tree search, value networks, policy networks, and self-play-only training in AlphaGo Zero.",
        "steps": [
          "Use policy/value estimates to guide search.",
          "Use search outcomes to improve training targets.",
          "Generate stronger self-play data as the policy improves.",
          "Iterate learning and search so each amplifies the other."
        ]
      }
    ],
    "process": [
      {
        "label": "Atari system reading",
        "source": "Section 16.5",
        "easy": "The Atari example illustrates deep value learning directly from high-dimensional observations.",
        "technical": "Human-level video-game play highlights representation learning, replayed experience, target construction, exploration, and benchmark evaluation in deep RL systems.",
        "steps": [
          "Process image observations into value estimates.",
          "Choose actions with exploration.",
          "Store and reuse transitions to stabilize learning.",
          "Compare performance across games while noting varying difficulty."
        ]
      },
      {
        "label": "Non-game applications",
        "source": "Sections 16.3-16.8",
        "easy": "The same RL loop appears in wagering, memory control, recommendations, and thermal soaring, but each domain changes the state, reward, and safety constraints.",
        "technical": "The case studies emphasize problem formulation, simulator/model availability, data cost, delayed reward, and policy deployment constraints across domains.",
        "steps": [
          "Define the operational decision and timing.",
          "Select a reward that matches the real objective.",
          "Choose representation and model/search tools appropriate to the domain.",
          "Evaluate with domain-specific risk and data limitations."
        ]
      }
    ],
    "traps": [
      {
        "mistake": "Reading applications as isolated success stories.",
        "fix": "Extract the RL design pattern in each case: representation, feedback, exploration, updates, and evaluation.",
        "why": "The chapter is a bridge from algorithms to deployed systems."
      },
      {
        "mistake": "Assuming every application permits risky exploration.",
        "fix": "Consider simulators, offline data, constraints, or planning before online deployment.",
        "why": "Real domains may have safety, cost, or user-experience limits."
      },
      {
        "mistake": "Ignoring compute and engineering details.",
        "fix": "Track replay, search, self-play, function approximation, and evaluation protocol.",
        "why": "System performance often comes from algorithmic plus engineering integration."
      }
    ],
    "checks": [
      {
        "prompt": "Why was TD-Gammon historically important?",
        "answer": "It showed TD learning with nonlinear approximation and self-play could reach strong performance in a complex game."
      },
      {
        "prompt": "What role does search play in AlphaGo-style systems?",
        "answer": "Search improves action selection and generates stronger targets/data for learning."
      },
      {
        "prompt": "Why do web-service and control applications require careful reward design?",
        "answer": "Measured short-term metrics may not match long-term user or system objectives."
      }
    ]
  },
  {
    "n": 17,
    "title": "Frontiers",
    "thesis": "The final chapter names open design dimensions: predictive knowledge, temporal abstraction, state construction, reward design, scalability, and RL's future scientific role.",
    "derivations": [
      {
        "label": "General value functions",
        "source": "Section 17.1",
        "easy": "A value function can predict more than reward; it can answer many if-I-behave-this-way questions about future signals.",
        "technical": "GVFs generalize value predictions by specifying policies, cumulants, discounts/termination, and signals, making value learning a framework for predictive knowledge and auxiliary tasks.",
        "steps": [
          "Choose a signal to predict, not necessarily reward.",
          "Choose a policy under which the prediction is defined.",
          "Choose a discount/termination condition for the question's horizon.",
          "Learn the prediction using value-learning machinery."
        ]
      },
      {
        "label": "Options formalism",
        "source": "Section 17.2",
        "easy": "An option is a temporally extended action: it has a way to start, a policy while running, and a condition for stopping.",
        "technical": "Options consist of an initiation set, internal policy, and termination function, enabling planning and learning over multi-step action abstractions.",
        "steps": [
          "Define where the option can be initiated.",
          "Define the option's internal action policy.",
          "Define when it terminates.",
          "Treat the option as an action at a higher temporal level."
        ]
      }
    ],
    "process": [
      {
        "label": "State representation frontier",
        "source": "Section 17.3",
        "easy": "The agent's state is not handed down by nature; it is constructed from observations and memory.",
        "technical": "The chapter discusses observations versus state, partial observability, predictive state, memory, and representation learning as unresolved foundations for scalable RL.",
        "steps": [
          "Distinguish raw observation from information sufficient for prediction/control.",
          "Use memory when current observation is insufficient.",
          "Consider predictive representations that encode future-relevant information.",
          "Evaluate state construction by control and prediction performance."
        ]
      },
      {
        "label": "Reward design frontier",
        "source": "Section 17.4",
        "easy": "A learner optimizes the reward you give it, so bad reward design can produce technically successful but unwanted behavior.",
        "technical": "The reward-design section frames reward as a communication channel for goals, including shaping, advice, human feedback, and the risks of misspecification.",
        "steps": [
          "State the real task objective in words.",
          "Check whether the reward signal makes that objective optimal.",
          "Use shaping or instruction without changing intended optimal behavior when possible.",
          "Monitor for loopholes and unintended incentives."
        ]
      }
    ],
    "traps": [
      {
        "mistake": "Treating the final chapter as a conclusion only.",
        "fix": "Read it as a research agenda with formal tools: GVFs, options, state, reward, and open issues.",
        "why": "It points to what remains hard after the preceding algorithms."
      },
      {
        "mistake": "Assuming temporal abstraction is just faster primitive action repetition.",
        "fix": "Use the full option structure: initiation, policy, termination.",
        "why": "That structure determines how options compose with planning and learning."
      },
      {
        "mistake": "Separating state and reward design from algorithm choice.",
        "fix": "Treat them as equally central components of the RL problem.",
        "why": "No update rule can fix a fundamentally wrong state signal or reward objective."
      }
    ],
    "checks": [
      {
        "prompt": "What are the components of an option?",
        "answer": "Initiation set, internal policy, and termination function."
      },
      {
        "prompt": "How does a GVF differ from an ordinary reward value function?",
        "answer": "It can predict arbitrary cumulant signals under specified policies and horizons, not only task reward."
      },
      {
        "prompt": "Why is reward design a frontier rather than a solved detail?",
        "answer": "Because reward is the agent's objective interface, and misspecification can produce unwanted optimized behavior."
      }
    ]
  }
] satisfies ChapterMastery[];

export const masteryTotals = {
  chapters: chapterMastery.length,
  derivations: chapterMastery.reduce((sum, chapter) => sum + chapter.derivations.length, 0),
  processWalkthroughs: chapterMastery.reduce((sum, chapter) => sum + chapter.process.length, 0),
  traps: chapterMastery.reduce((sum, chapter) => sum + chapter.traps.length, 0),
  checks: chapterMastery.reduce((sum, chapter) => sum + chapter.checks.length, 0),
};

export const masteryDetailCount = masteryTotals.derivations + masteryTotals.processWalkthroughs + masteryTotals.traps + masteryTotals.checks;

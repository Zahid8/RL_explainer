export type ExerciseKind = "conceptual" | "derivation" | "algorithm design" | "programming" | "interpretation";

export interface ExerciseCoachCard {
  id: string;
  chapter: number;
  kind: ExerciseKind;
  title: string;
  easyGoal: string;
  technicalGoal: string;
  strategy: string[];
  checkpoint: string;
  tags: string[];
}

export const exerciseCoachCards = [
  {
    "id": "1.1",
    "chapter": 1,
    "kind": "conceptual",
    "title": "Self-play training design",
    "easyGoal": "Use self-play training design to test whether the chapter's agent-environment boundaries, self-play, and exploratory tic-tac-toe learning is understood operationally, not only verbally.",
    "technicalGoal": "Translate the question into the formal objects of agent-environment boundaries, self-play, and exploratory tic-tac-toe learning; identify which assumptions are fixed and which variables the exercise asks you to vary.",
    "strategy": [
      "Restate the question as a concrete state/action/reward/value or policy object.",
      "Test the idea on a tiny case before answering generally.",
      "Separate intuitive language from the formal claim you would defend."
    ],
    "checkpoint": "Checkpoint: you can say what would change if the policy, reward, or state definition changed.",
    "tags": [
      "conceptual",
      "Reinforcement Learning Problem"
    ]
  },
  {
    "id": "1.2",
    "chapter": 1,
    "kind": "conceptual",
    "title": "State symmetry compression",
    "easyGoal": "Use state symmetry compression to test whether the chapter's agent-environment boundaries, self-play, and exploratory tic-tac-toe learning is understood operationally, not only verbally.",
    "technicalGoal": "Translate the question into the formal objects of agent-environment boundaries, self-play, and exploratory tic-tac-toe learning; identify which assumptions are fixed and which variables the exercise asks you to vary.",
    "strategy": [
      "Restate the question as a concrete state/action/reward/value or policy object.",
      "Test the idea on a tiny case before answering generally.",
      "Separate intuitive language from the formal claim you would defend."
    ],
    "checkpoint": "Checkpoint: you can say what would change if the policy, reward, or state definition changed.",
    "tags": [
      "conceptual",
      "Reinforcement Learning Problem"
    ]
  },
  {
    "id": "1.3",
    "chapter": 1,
    "kind": "conceptual",
    "title": "Greedy Play",
    "easyGoal": "Use greedy play to test whether the chapter's agent-environment boundaries, self-play, and exploratory tic-tac-toe learning is understood operationally, not only verbally.",
    "technicalGoal": "Translate the question into the formal objects of agent-environment boundaries, self-play, and exploratory tic-tac-toe learning; identify which assumptions are fixed and which variables the exercise asks you to vary.",
    "strategy": [
      "Restate the question as a concrete state/action/reward/value or policy object.",
      "Test the idea on a tiny case before answering generally.",
      "Separate intuitive language from the formal claim you would defend."
    ],
    "checkpoint": "Checkpoint: you can say what would change if the policy, reward, or state definition changed.",
    "tags": [
      "conceptual",
      "Reinforcement Learning Problem"
    ]
  },
  {
    "id": "1.4",
    "chapter": 1,
    "kind": "conceptual",
    "title": "Learning from Exploration",
    "easyGoal": "Use learning from exploration to test whether the chapter's agent-environment boundaries, self-play, and exploratory tic-tac-toe learning is understood operationally, not only verbally.",
    "technicalGoal": "Translate the question into the formal objects of agent-environment boundaries, self-play, and exploratory tic-tac-toe learning; identify which assumptions are fixed and which variables the exercise asks you to vary.",
    "strategy": [
      "Restate the question as a concrete state/action/reward/value or policy object.",
      "Test the idea on a tiny case before answering generally.",
      "Separate intuitive language from the formal claim you would defend."
    ],
    "checkpoint": "Checkpoint: you can say what would change if the policy, reward, or state definition changed.",
    "tags": [
      "conceptual",
      "Reinforcement Learning Problem"
    ]
  },
  {
    "id": "1.5",
    "chapter": 1,
    "kind": "conceptual",
    "title": "Other Improvements",
    "easyGoal": "Use other improvements to test whether the chapter's agent-environment boundaries, self-play, and exploratory tic-tac-toe learning is understood operationally, not only verbally.",
    "technicalGoal": "Translate the question into the formal objects of agent-environment boundaries, self-play, and exploratory tic-tac-toe learning; identify which assumptions are fixed and which variables the exercise asks you to vary.",
    "strategy": [
      "Restate the question as a concrete state/action/reward/value or policy object.",
      "Test the idea on a tiny case before answering generally.",
      "Separate intuitive language from the formal claim you would defend."
    ],
    "checkpoint": "Checkpoint: you can say what would change if the policy, reward, or state definition changed.",
    "tags": [
      "conceptual",
      "Reinforcement Learning Problem"
    ]
  },
  {
    "id": "2.1",
    "chapter": 2,
    "kind": "conceptual",
    "title": "epsilon-greedy probability",
    "easyGoal": "Use epsilon-greedy probability to test whether the chapter's action-value estimation, exploration, and bandit experiment design is understood operationally, not only verbally.",
    "technicalGoal": "Translate the question into the formal objects of action-value estimation, exploration, and bandit experiment design; identify which assumptions are fixed and which variables the exercise asks you to vary.",
    "strategy": [
      "Restate the question as a concrete state/action/reward/value or policy object.",
      "Test the idea on a tiny case before answering generally.",
      "Separate intuitive language from the formal claim you would defend."
    ],
    "checkpoint": "Checkpoint: you can say what would change if the policy, reward, or state definition changed.",
    "tags": [
      "conceptual",
      "Bandits",
      "epsilon"
    ]
  },
  {
    "id": "2.2",
    "chapter": 2,
    "kind": "conceptual",
    "title": "Bandit example",
    "easyGoal": "Use bandit example to test whether the chapter's action-value estimation, exploration, and bandit experiment design is understood operationally, not only verbally.",
    "technicalGoal": "Translate the question into the formal objects of action-value estimation, exploration, and bandit experiment design; identify which assumptions are fixed and which variables the exercise asks you to vary.",
    "strategy": [
      "Restate the question as a concrete state/action/reward/value or policy object.",
      "Test the idea on a tiny case before answering generally.",
      "Separate intuitive language from the formal claim you would defend."
    ],
    "checkpoint": "Checkpoint: you can say what would change if the policy, reward, or state definition changed.",
    "tags": [
      "conceptual",
      "Bandits"
    ]
  },
  {
    "id": "2.3",
    "chapter": 2,
    "kind": "interpretation",
    "title": "Bandits exercise 2.3",
    "easyGoal": "Read bandits exercise 2.3 as evidence: identify the axes, the compared methods, and the mechanism that explains the curve or diagram.",
    "technicalGoal": "Connect the visible pattern to action-value estimation, exploration, and bandit experiment design: determine which algorithmic choice changes the curve and which confounders, such as step-size or exploration, must be controlled.",
    "strategy": [
      "Read axes, averaging protocol, and compared methods before interpreting the winner.",
      "Explain the curve by a mechanism from the chapter, not by the method name alone.",
      "Ask what would change under a different step-size, exploration rate, or representation."
    ],
    "checkpoint": "Checkpoint: you can explain why the plotted effect appears, not only which line is higher.",
    "tags": [
      "interpretation",
      "Bandits"
    ]
  },
  {
    "id": "2.4",
    "chapter": 2,
    "kind": "conceptual",
    "title": "Bandits exercise 2.4",
    "easyGoal": "Use bandits exercise 2.4 to test whether the chapter's action-value estimation, exploration, and bandit experiment design is understood operationally, not only verbally.",
    "technicalGoal": "Translate the question into the formal objects of action-value estimation, exploration, and bandit experiment design; identify which assumptions are fixed and which variables the exercise asks you to vary.",
    "strategy": [
      "Restate the question as a concrete state/action/reward/value or policy object.",
      "Test the idea on a tiny case before answering generally.",
      "Separate intuitive language from the formal claim you would defend."
    ],
    "checkpoint": "Checkpoint: you can say what would change if the policy, reward, or state definition changed.",
    "tags": [
      "conceptual",
      "Bandits"
    ]
  },
  {
    "id": "2.5",
    "chapter": 2,
    "kind": "programming",
    "title": "Bandits exercise 2.5",
    "easyGoal": "Build or replicate a small experiment around bandits exercise 2.5 so the chapter's action-value estimation, exploration, and bandit experiment design becomes measurable.",
    "technicalGoal": "Specify the environment, policy/update rule, step-size or sweep parameters, random seeds/runs, and the plot or statistic that would verify the expected action-value estimation, exploration, and bandit experiment design behavior.",
    "strategy": [
      "Write the smallest reproducible environment or task variant first.",
      "Log the exact parameters that affect the learning curve or policy.",
      "Average over enough runs to separate mechanism from random luck."
    ],
    "checkpoint": "Checkpoint: your answer should include both the implementation choice and the plotted/measured comparison.",
    "tags": [
      "programming",
      "Bandits"
    ]
  },
  {
    "id": "2.6",
    "chapter": 2,
    "kind": "interpretation",
    "title": "Mysterious Spikes",
    "easyGoal": "Read mysterious spikes as evidence: identify the axes, the compared methods, and the mechanism that explains the curve or diagram.",
    "technicalGoal": "Connect the visible pattern to action-value estimation, exploration, and bandit experiment design: determine which algorithmic choice changes the curve and which confounders, such as step-size or exploration, must be controlled.",
    "strategy": [
      "Read axes, averaging protocol, and compared methods before interpreting the winner.",
      "Explain the curve by a mechanism from the chapter, not by the method name alone.",
      "Ask what would change under a different step-size, exploration rate, or representation."
    ],
    "checkpoint": "Checkpoint: you can explain why the plotted effect appears, not only which line is higher.",
    "tags": [
      "interpretation",
      "Bandits"
    ]
  },
  {
    "id": "2.7",
    "chapter": 2,
    "kind": "conceptual",
    "title": "Unbiased Constant-Step-Size Trick",
    "easyGoal": "Use unbiased constant-step-size trick to test whether the chapter's action-value estimation, exploration, and bandit experiment design is understood operationally, not only verbally.",
    "technicalGoal": "Translate the question into the formal objects of action-value estimation, exploration, and bandit experiment design; identify which assumptions are fixed and which variables the exercise asks you to vary.",
    "strategy": [
      "Restate the question as a concrete state/action/reward/value or policy object.",
      "Test the idea on a tiny case before answering generally.",
      "Separate intuitive language from the formal claim you would defend."
    ],
    "checkpoint": "Checkpoint: you can say what would change if the policy, reward, or state definition changed.",
    "tags": [
      "conceptual",
      "Bandits"
    ]
  },
  {
    "id": "2.8",
    "chapter": 2,
    "kind": "algorithm design",
    "title": "UCB Spikes",
    "easyGoal": "Modify an algorithm around ucb spikes while preserving what data is sampled, what target is built, and what quantity is updated.",
    "technicalGoal": "State the input variables, loop order, target construction, update equation, and termination condition; check whether the method is on-policy, off-policy, episodic, or continuing.",
    "strategy": [
      "Name the target before writing the update.",
      "Mark which policy generates data and which policy is being evaluated or improved.",
      "Confirm every stored variable is available at the time the pseudocode uses it."
    ],
    "checkpoint": "Checkpoint: someone else should be able to run the pseudocode without guessing when each update happens.",
    "tags": [
      "algorithm design",
      "Bandits"
    ]
  },
  {
    "id": "2.9",
    "chapter": 2,
    "kind": "derivation",
    "title": "Softmax equivalence",
    "easyGoal": "Turn softmax equivalence into a symbolic check: start from definitions, keep the conditioning explicit, and reach the requested identity or update form.",
    "technicalGoal": "Write the relevant value/return/probability expression, substitute the chapter definitions, align time indices and conditioning variables, then simplify without changing the target policy or objective.",
    "strategy": [
      "Copy the relevant definition onto a scratch line in your own notation.",
      "Expand one expectation, sum, or product at a time; do not skip time indices.",
      "Check the endpoint by substituting an easy special case such as gamma=0 or lambda=0."
    ],
    "checkpoint": "Checkpoint: every equality should preserve the same policy, conditioning event, and time index meaning.",
    "tags": [
      "derivation",
      "Bandits"
    ]
  },
  {
    "id": "2.10",
    "chapter": 2,
    "kind": "conceptual",
    "title": "Action-value dynamic programming",
    "easyGoal": "Use action-value dynamic programming to test whether the chapter's action-value estimation, exploration, and bandit experiment design is understood operationally, not only verbally.",
    "technicalGoal": "Translate the question into the formal objects of action-value estimation, exploration, and bandit experiment design; identify which assumptions are fixed and which variables the exercise asks you to vary.",
    "strategy": [
      "Restate the question as a concrete state/action/reward/value or policy object.",
      "Test the idea on a tiny case before answering generally.",
      "Separate intuitive language from the formal claim you would defend."
    ],
    "checkpoint": "Checkpoint: you can say what would change if the policy, reward, or state definition changed.",
    "tags": [
      "conceptual",
      "Bandits",
      "Dyna",
      "value"
    ]
  },
  {
    "id": "2.11",
    "chapter": 2,
    "kind": "programming",
    "title": "Nonstationary bandit tracking",
    "easyGoal": "Build or replicate a small experiment around nonstationary bandit tracking so the chapter's action-value estimation, exploration, and bandit experiment design becomes measurable.",
    "technicalGoal": "Specify the environment, policy/update rule, step-size or sweep parameters, random seeds/runs, and the plot or statistic that would verify the expected action-value estimation, exploration, and bandit experiment design behavior.",
    "strategy": [
      "Write the smallest reproducible environment or task variant first.",
      "Log the exact parameters that affect the learning curve or policy.",
      "Average over enough runs to separate mechanism from random luck."
    ],
    "checkpoint": "Checkpoint: your answer should include both the implementation choice and the plotted/measured comparison.",
    "tags": [
      "programming",
      "Bandits"
    ]
  },
  {
    "id": "3.1",
    "chapter": 3,
    "kind": "conceptual",
    "title": "MDP framework adequacy",
    "easyGoal": "Use mdp framework adequacy to test whether the chapter's MDP formulation, returns, value functions, and Bellman equations is understood operationally, not only verbally.",
    "technicalGoal": "Translate the question into the formal objects of MDP formulation, returns, value functions, and Bellman equations; identify which assumptions are fixed and which variables the exercise asks you to vary.",
    "strategy": [
      "Restate the question as a concrete state/action/reward/value or policy object.",
      "Test the idea on a tiny case before answering generally.",
      "Separate intuitive language from the formal claim you would defend."
    ],
    "checkpoint": "Checkpoint: you can say what would change if the policy, reward, or state definition changed.",
    "tags": [
      "conceptual",
      "Finite MDPs"
    ]
  },
  {
    "id": "3.2",
    "chapter": 3,
    "kind": "conceptual",
    "title": "MDP framework adequacy",
    "easyGoal": "Use mdp framework adequacy to test whether the chapter's MDP formulation, returns, value functions, and Bellman equations is understood operationally, not only verbally.",
    "technicalGoal": "Translate the question into the formal objects of MDP formulation, returns, value functions, and Bellman equations; identify which assumptions are fixed and which variables the exercise asks you to vary.",
    "strategy": [
      "Restate the question as a concrete state/action/reward/value or policy object.",
      "Test the idea on a tiny case before answering generally.",
      "Separate intuitive language from the formal claim you would defend."
    ],
    "checkpoint": "Checkpoint: you can say what would change if the policy, reward, or state definition changed.",
    "tags": [
      "conceptual",
      "Finite MDPs"
    ]
  },
  {
    "id": "3.3",
    "chapter": 3,
    "kind": "conceptual",
    "title": "Driving as an MDP",
    "easyGoal": "Use driving as an mdp to test whether the chapter's MDP formulation, returns, value functions, and Bellman equations is understood operationally, not only verbally.",
    "technicalGoal": "Translate the question into the formal objects of MDP formulation, returns, value functions, and Bellman equations; identify which assumptions are fixed and which variables the exercise asks you to vary.",
    "strategy": [
      "Restate the question as a concrete state/action/reward/value or policy object.",
      "Test the idea on a tiny case before answering generally.",
      "Separate intuitive language from the formal claim you would defend."
    ],
    "checkpoint": "Checkpoint: you can say what would change if the policy, reward, or state definition changed.",
    "tags": [
      "conceptual",
      "Finite MDPs"
    ]
  },
  {
    "id": "3.4",
    "chapter": 3,
    "kind": "conceptual",
    "title": "Finite MDPs exercise 3.4",
    "easyGoal": "Use finite mdps exercise 3.4 to test whether the chapter's MDP formulation, returns, value functions, and Bellman equations is understood operationally, not only verbally.",
    "technicalGoal": "Translate the question into the formal objects of MDP formulation, returns, value functions, and Bellman equations; identify which assumptions are fixed and which variables the exercise asks you to vary.",
    "strategy": [
      "Restate the question as a concrete state/action/reward/value or policy object.",
      "Test the idea on a tiny case before answering generally.",
      "Separate intuitive language from the formal claim you would defend."
    ],
    "checkpoint": "Checkpoint: you can say what would change if the policy, reward, or state definition changed.",
    "tags": [
      "conceptual",
      "Finite MDPs"
    ]
  },
  {
    "id": "3.5",
    "chapter": 3,
    "kind": "derivation",
    "title": "Finite MDPs exercise 3.5",
    "easyGoal": "Turn finite mdps exercise 3.5 into a symbolic check: start from definitions, keep the conditioning explicit, and reach the requested identity or update form.",
    "technicalGoal": "Write the relevant value/return/probability expression, substitute the chapter definitions, align time indices and conditioning variables, then simplify without changing the target policy or objective.",
    "strategy": [
      "Copy the relevant definition onto a scratch line in your own notation.",
      "Expand one expectation, sum, or product at a time; do not skip time indices.",
      "Check the endpoint by substituting an easy special case such as gamma=0 or lambda=0."
    ],
    "checkpoint": "Checkpoint: every equality should preserve the same policy, conditioning event, and time index meaning.",
    "tags": [
      "derivation",
      "Finite MDPs"
    ]
  },
  {
    "id": "3.6",
    "chapter": 3,
    "kind": "conceptual",
    "title": "Pole-balancing formulation",
    "easyGoal": "Use pole-balancing formulation to test whether the chapter's MDP formulation, returns, value functions, and Bellman equations is understood operationally, not only verbally.",
    "technicalGoal": "Translate the question into the formal objects of MDP formulation, returns, value functions, and Bellman equations; identify which assumptions are fixed and which variables the exercise asks you to vary.",
    "strategy": [
      "Restate the question as a concrete state/action/reward/value or policy object.",
      "Test the idea on a tiny case before answering generally.",
      "Separate intuitive language from the formal claim you would defend."
    ],
    "checkpoint": "Checkpoint: you can say what would change if the policy, reward, or state definition changed.",
    "tags": [
      "conceptual",
      "Finite MDPs"
    ]
  },
  {
    "id": "3.7",
    "chapter": 3,
    "kind": "conceptual",
    "title": "Maze reward design",
    "easyGoal": "Use maze reward design to test whether the chapter's MDP formulation, returns, value functions, and Bellman equations is understood operationally, not only verbally.",
    "technicalGoal": "Translate the question into the formal objects of MDP formulation, returns, value functions, and Bellman equations; identify which assumptions are fixed and which variables the exercise asks you to vary.",
    "strategy": [
      "Restate the question as a concrete state/action/reward/value or policy object.",
      "Test the idea on a tiny case before answering generally.",
      "Separate intuitive language from the formal claim you would defend."
    ],
    "checkpoint": "Checkpoint: you can say what would change if the policy, reward, or state definition changed.",
    "tags": [
      "conceptual",
      "Finite MDPs"
    ]
  },
  {
    "id": "3.8",
    "chapter": 3,
    "kind": "conceptual",
    "title": "Return calculation",
    "easyGoal": "Use return calculation to test whether the chapter's MDP formulation, returns, value functions, and Bellman equations is understood operationally, not only verbally.",
    "technicalGoal": "Translate the question into the formal objects of MDP formulation, returns, value functions, and Bellman equations; identify which assumptions are fixed and which variables the exercise asks you to vary.",
    "strategy": [
      "Restate the question as a concrete state/action/reward/value or policy object.",
      "Test the idea on a tiny case before answering generally.",
      "Separate intuitive language from the formal claim you would defend."
    ],
    "checkpoint": "Checkpoint: you can say what would change if the policy, reward, or state definition changed.",
    "tags": [
      "conceptual",
      "Finite MDPs"
    ]
  },
  {
    "id": "3.9",
    "chapter": 3,
    "kind": "conceptual",
    "title": "Finite MDPs exercise 3.9",
    "easyGoal": "Use finite mdps exercise 3.9 to test whether the chapter's MDP formulation, returns, value functions, and Bellman equations is understood operationally, not only verbally.",
    "technicalGoal": "Translate the question into the formal objects of MDP formulation, returns, value functions, and Bellman equations; identify which assumptions are fixed and which variables the exercise asks you to vary.",
    "strategy": [
      "Restate the question as a concrete state/action/reward/value or policy object.",
      "Test the idea on a tiny case before answering generally.",
      "Separate intuitive language from the formal claim you would defend."
    ],
    "checkpoint": "Checkpoint: you can say what would change if the policy, reward, or state definition changed.",
    "tags": [
      "conceptual",
      "Finite MDPs"
    ]
  },
  {
    "id": "3.10",
    "chapter": 3,
    "kind": "derivation",
    "title": "Return identity proof",
    "easyGoal": "Turn return identity proof into a symbolic check: start from definitions, keep the conditioning explicit, and reach the requested identity or update form.",
    "technicalGoal": "Write the relevant value/return/probability expression, substitute the chapter definitions, align time indices and conditioning variables, then simplify without changing the target policy or objective.",
    "strategy": [
      "Copy the relevant definition onto a scratch line in your own notation.",
      "Expand one expectation, sum, or product at a time; do not skip time indices.",
      "Check the endpoint by substituting an easy special case such as gamma=0 or lambda=0."
    ],
    "checkpoint": "Checkpoint: every equality should preserve the same policy, conditioning event, and time index meaning.",
    "tags": [
      "derivation",
      "Finite MDPs"
    ]
  },
  {
    "id": "3.11",
    "chapter": 3,
    "kind": "conceptual",
    "title": "Stochastic policy probabilities",
    "easyGoal": "Use stochastic policy probabilities to test whether the chapter's MDP formulation, returns, value functions, and Bellman equations is understood operationally, not only verbally.",
    "technicalGoal": "Translate the question into the formal objects of MDP formulation, returns, value functions, and Bellman equations; identify which assumptions are fixed and which variables the exercise asks you to vary.",
    "strategy": [
      "Restate the question as a concrete state/action/reward/value or policy object.",
      "Test the idea on a tiny case before answering generally.",
      "Separate intuitive language from the formal claim you would defend."
    ],
    "checkpoint": "Checkpoint: you can say what would change if the policy, reward, or state definition changed.",
    "tags": [
      "conceptual",
      "Finite MDPs",
      "policy"
    ]
  },
  {
    "id": "3.12",
    "chapter": 3,
    "kind": "derivation",
    "title": "Finite MDPs exercise 3.12",
    "easyGoal": "Turn finite mdps exercise 3.12 into a symbolic check: start from definitions, keep the conditioning explicit, and reach the requested identity or update form.",
    "technicalGoal": "Write the relevant value/return/probability expression, substitute the chapter definitions, align time indices and conditioning variables, then simplify without changing the target policy or objective.",
    "strategy": [
      "Copy the relevant definition onto a scratch line in your own notation.",
      "Expand one expectation, sum, or product at a time; do not skip time indices.",
      "Check the endpoint by substituting an easy special case such as gamma=0 or lambda=0."
    ],
    "checkpoint": "Checkpoint: every equality should preserve the same policy, conditioning event, and time index meaning.",
    "tags": [
      "derivation",
      "Finite MDPs"
    ]
  },
  {
    "id": "3.13",
    "chapter": 3,
    "kind": "derivation",
    "title": "Finite MDPs exercise 3.13",
    "easyGoal": "Turn finite mdps exercise 3.13 into a symbolic check: start from definitions, keep the conditioning explicit, and reach the requested identity or update form.",
    "technicalGoal": "Write the relevant value/return/probability expression, substitute the chapter definitions, align time indices and conditioning variables, then simplify without changing the target policy or objective.",
    "strategy": [
      "Copy the relevant definition onto a scratch line in your own notation.",
      "Expand one expectation, sum, or product at a time; do not skip time indices.",
      "Check the endpoint by substituting an easy special case such as gamma=0 or lambda=0."
    ],
    "checkpoint": "Checkpoint: every equality should preserve the same policy, conditioning event, and time index meaning.",
    "tags": [
      "derivation",
      "Finite MDPs"
    ]
  },
  {
    "id": "3.14",
    "chapter": 3,
    "kind": "derivation",
    "title": "Bellman equation practice",
    "easyGoal": "Turn bellman equation practice into a symbolic check: start from definitions, keep the conditioning explicit, and reach the requested identity or update form.",
    "technicalGoal": "Write the relevant value/return/probability expression, substitute the chapter definitions, align time indices and conditioning variables, then simplify without changing the target policy or objective.",
    "strategy": [
      "Copy the relevant definition onto a scratch line in your own notation.",
      "Expand one expectation, sum, or product at a time; do not skip time indices.",
      "Check the endpoint by substituting an easy special case such as gamma=0 or lambda=0."
    ],
    "checkpoint": "Checkpoint: every equality should preserve the same policy, conditioning event, and time index meaning.",
    "tags": [
      "derivation",
      "Finite MDPs",
      "Bellman",
      "value"
    ]
  },
  {
    "id": "3.15",
    "chapter": 3,
    "kind": "conceptual",
    "title": "Gridworld values and policies",
    "easyGoal": "Use gridworld values and policies to test whether the chapter's MDP formulation, returns, value functions, and Bellman equations is understood operationally, not only verbally.",
    "technicalGoal": "Translate the question into the formal objects of MDP formulation, returns, value functions, and Bellman equations; identify which assumptions are fixed and which variables the exercise asks you to vary.",
    "strategy": [
      "Restate the question as a concrete state/action/reward/value or policy object.",
      "Test the idea on a tiny case before answering generally.",
      "Separate intuitive language from the formal claim you would defend."
    ],
    "checkpoint": "Checkpoint: you can say what would change if the policy, reward, or state definition changed.",
    "tags": [
      "conceptual",
      "Finite MDPs",
      "gridworld",
      "value"
    ]
  },
  {
    "id": "3.16",
    "chapter": 3,
    "kind": "conceptual",
    "title": "Finite MDPs exercise 3.16",
    "easyGoal": "Use finite mdps exercise 3.16 to test whether the chapter's MDP formulation, returns, value functions, and Bellman equations is understood operationally, not only verbally.",
    "technicalGoal": "Translate the question into the formal objects of MDP formulation, returns, value functions, and Bellman equations; identify which assumptions are fixed and which variables the exercise asks you to vary.",
    "strategy": [
      "Restate the question as a concrete state/action/reward/value or policy object.",
      "Test the idea on a tiny case before answering generally.",
      "Separate intuitive language from the formal claim you would defend."
    ],
    "checkpoint": "Checkpoint: you can say what would change if the policy, reward, or state definition changed.",
    "tags": [
      "conceptual",
      "Finite MDPs"
    ]
  },
  {
    "id": "3.17",
    "chapter": 3,
    "kind": "derivation",
    "title": "Bellman equation practice",
    "easyGoal": "Turn bellman equation practice into a symbolic check: start from definitions, keep the conditioning explicit, and reach the requested identity or update form.",
    "technicalGoal": "Write the relevant value/return/probability expression, substitute the chapter definitions, align time indices and conditioning variables, then simplify without changing the target policy or objective.",
    "strategy": [
      "Copy the relevant definition onto a scratch line in your own notation.",
      "Expand one expectation, sum, or product at a time; do not skip time indices.",
      "Check the endpoint by substituting an easy special case such as gamma=0 or lambda=0."
    ],
    "checkpoint": "Checkpoint: every equality should preserve the same policy, conditioning event, and time index meaning.",
    "tags": [
      "derivation",
      "Finite MDPs",
      "Bellman",
      "value"
    ]
  },
  {
    "id": "3.18",
    "chapter": 3,
    "kind": "conceptual",
    "title": "Finite MDPs exercise 3.18",
    "easyGoal": "Use finite mdps exercise 3.18 to test whether the chapter's MDP formulation, returns, value functions, and Bellman equations is understood operationally, not only verbally.",
    "technicalGoal": "Translate the question into the formal objects of MDP formulation, returns, value functions, and Bellman equations; identify which assumptions are fixed and which variables the exercise asks you to vary.",
    "strategy": [
      "Restate the question as a concrete state/action/reward/value or policy object.",
      "Test the idea on a tiny case before answering generally.",
      "Separate intuitive language from the formal claim you would defend."
    ],
    "checkpoint": "Checkpoint: you can say what would change if the policy, reward, or state definition changed.",
    "tags": [
      "conceptual",
      "Finite MDPs",
      "value"
    ]
  },
  {
    "id": "3.19",
    "chapter": 3,
    "kind": "conceptual",
    "title": "Finite MDPs exercise 3.19",
    "easyGoal": "Use finite mdps exercise 3.19 to test whether the chapter's MDP formulation, returns, value functions, and Bellman equations is understood operationally, not only verbally.",
    "technicalGoal": "Translate the question into the formal objects of MDP formulation, returns, value functions, and Bellman equations; identify which assumptions are fixed and which variables the exercise asks you to vary.",
    "strategy": [
      "Restate the question as a concrete state/action/reward/value or policy object.",
      "Test the idea on a tiny case before answering generally.",
      "Separate intuitive language from the formal claim you would defend."
    ],
    "checkpoint": "Checkpoint: you can say what would change if the policy, reward, or state definition changed.",
    "tags": [
      "conceptual",
      "Finite MDPs",
      "value"
    ]
  },
  {
    "id": "3.20",
    "chapter": 3,
    "kind": "conceptual",
    "title": "Golf value functions",
    "easyGoal": "Use golf value functions to test whether the chapter's MDP formulation, returns, value functions, and Bellman equations is understood operationally, not only verbally.",
    "technicalGoal": "Translate the question into the formal objects of MDP formulation, returns, value functions, and Bellman equations; identify which assumptions are fixed and which variables the exercise asks you to vary.",
    "strategy": [
      "Restate the question as a concrete state/action/reward/value or policy object.",
      "Test the idea on a tiny case before answering generally.",
      "Separate intuitive language from the formal claim you would defend."
    ],
    "checkpoint": "Checkpoint: you can say what would change if the policy, reward, or state definition changed.",
    "tags": [
      "conceptual",
      "Finite MDPs",
      "value"
    ]
  },
  {
    "id": "3.21",
    "chapter": 3,
    "kind": "conceptual",
    "title": "Optimality equations",
    "easyGoal": "Use optimality equations to test whether the chapter's MDP formulation, returns, value functions, and Bellman equations is understood operationally, not only verbally.",
    "technicalGoal": "Translate the question into the formal objects of MDP formulation, returns, value functions, and Bellman equations; identify which assumptions are fixed and which variables the exercise asks you to vary.",
    "strategy": [
      "Restate the question as a concrete state/action/reward/value or policy object.",
      "Test the idea on a tiny case before answering generally.",
      "Separate intuitive language from the formal claim you would defend."
    ],
    "checkpoint": "Checkpoint: you can say what would change if the policy, reward, or state definition changed.",
    "tags": [
      "conceptual",
      "Finite MDPs",
      "value"
    ]
  },
  {
    "id": "3.22",
    "chapter": 3,
    "kind": "interpretation",
    "title": "Finite MDPs exercise 3.22",
    "easyGoal": "Read finite mdps exercise 3.22 as evidence: identify the axes, the compared methods, and the mechanism that explains the curve or diagram.",
    "technicalGoal": "Connect the visible pattern to MDP formulation, returns, value functions, and Bellman equations: determine which algorithmic choice changes the curve and which confounders, such as step-size or exploration, must be controlled.",
    "strategy": [
      "Read axes, averaging protocol, and compared methods before interpreting the winner.",
      "Explain the curve by a mechanism from the chapter, not by the method name alone.",
      "Ask what would change under a different step-size, exploration rate, or representation."
    ],
    "checkpoint": "Checkpoint: you can explain why the plotted effect appears, not only which line is higher.",
    "tags": [
      "interpretation",
      "Finite MDPs"
    ]
  },
  {
    "id": "3.23",
    "chapter": 3,
    "kind": "derivation",
    "title": "Recycling-robot equations",
    "easyGoal": "Turn recycling-robot equations into a symbolic check: start from definitions, keep the conditioning explicit, and reach the requested identity or update form.",
    "technicalGoal": "Write the relevant value/return/probability expression, substitute the chapter definitions, align time indices and conditioning variables, then simplify without changing the target policy or objective.",
    "strategy": [
      "Copy the relevant definition onto a scratch line in your own notation.",
      "Expand one expectation, sum, or product at a time; do not skip time indices.",
      "Check the endpoint by substituting an easy special case such as gamma=0 or lambda=0."
    ],
    "checkpoint": "Checkpoint: every equality should preserve the same policy, conditioning event, and time index meaning.",
    "tags": [
      "derivation",
      "Finite MDPs",
      "Bellman"
    ]
  },
  {
    "id": "3.24",
    "chapter": 3,
    "kind": "interpretation",
    "title": "Gridworld values and policies",
    "easyGoal": "Read gridworld values and policies as evidence: identify the axes, the compared methods, and the mechanism that explains the curve or diagram.",
    "technicalGoal": "Connect the visible pattern to MDP formulation, returns, value functions, and Bellman equations: determine which algorithmic choice changes the curve and which confounders, such as step-size or exploration, must be controlled.",
    "strategy": [
      "Read axes, averaging protocol, and compared methods before interpreting the winner.",
      "Explain the curve by a mechanism from the chapter, not by the method name alone.",
      "Ask what would change under a different step-size, exploration rate, or representation."
    ],
    "checkpoint": "Checkpoint: you can explain why the plotted effect appears, not only which line is higher.",
    "tags": [
      "interpretation",
      "Finite MDPs",
      "gridworld",
      "value"
    ]
  },
  {
    "id": "3.25",
    "chapter": 3,
    "kind": "derivation",
    "title": "Finite MDPs exercise 3.25",
    "easyGoal": "Turn finite mdps exercise 3.25 into a symbolic check: start from definitions, keep the conditioning explicit, and reach the requested identity or update form.",
    "technicalGoal": "Write the relevant value/return/probability expression, substitute the chapter definitions, align time indices and conditioning variables, then simplify without changing the target policy or objective.",
    "strategy": [
      "Copy the relevant definition onto a scratch line in your own notation.",
      "Expand one expectation, sum, or product at a time; do not skip time indices.",
      "Check the endpoint by substituting an easy special case such as gamma=0 or lambda=0."
    ],
    "checkpoint": "Checkpoint: every equality should preserve the same policy, conditioning event, and time index meaning.",
    "tags": [
      "derivation",
      "Finite MDPs"
    ]
  },
  {
    "id": "3.26",
    "chapter": 3,
    "kind": "derivation",
    "title": "Finite MDPs exercise 3.26",
    "easyGoal": "Turn finite mdps exercise 3.26 into a symbolic check: start from definitions, keep the conditioning explicit, and reach the requested identity or update form.",
    "technicalGoal": "Write the relevant value/return/probability expression, substitute the chapter definitions, align time indices and conditioning variables, then simplify without changing the target policy or objective.",
    "strategy": [
      "Copy the relevant definition onto a scratch line in your own notation.",
      "Expand one expectation, sum, or product at a time; do not skip time indices.",
      "Check the endpoint by substituting an easy special case such as gamma=0 or lambda=0."
    ],
    "checkpoint": "Checkpoint: every equality should preserve the same policy, conditioning event, and time index meaning.",
    "tags": [
      "derivation",
      "Finite MDPs"
    ]
  },
  {
    "id": "3.27",
    "chapter": 3,
    "kind": "derivation",
    "title": "Finite MDPs exercise 3.27",
    "easyGoal": "Turn finite mdps exercise 3.27 into a symbolic check: start from definitions, keep the conditioning explicit, and reach the requested identity or update form.",
    "technicalGoal": "Write the relevant value/return/probability expression, substitute the chapter definitions, align time indices and conditioning variables, then simplify without changing the target policy or objective.",
    "strategy": [
      "Copy the relevant definition onto a scratch line in your own notation.",
      "Expand one expectation, sum, or product at a time; do not skip time indices.",
      "Check the endpoint by substituting an easy special case such as gamma=0 or lambda=0."
    ],
    "checkpoint": "Checkpoint: every equality should preserve the same policy, conditioning event, and time index meaning.",
    "tags": [
      "derivation",
      "Finite MDPs"
    ]
  },
  {
    "id": "3.28",
    "chapter": 3,
    "kind": "derivation",
    "title": "Finite MDPs exercise 3.28",
    "easyGoal": "Turn finite mdps exercise 3.28 into a symbolic check: start from definitions, keep the conditioning explicit, and reach the requested identity or update form.",
    "technicalGoal": "Write the relevant value/return/probability expression, substitute the chapter definitions, align time indices and conditioning variables, then simplify without changing the target policy or objective.",
    "strategy": [
      "Copy the relevant definition onto a scratch line in your own notation.",
      "Expand one expectation, sum, or product at a time; do not skip time indices.",
      "Check the endpoint by substituting an easy special case such as gamma=0 or lambda=0."
    ],
    "checkpoint": "Checkpoint: every equality should preserve the same policy, conditioning event, and time index meaning.",
    "tags": [
      "derivation",
      "Finite MDPs"
    ]
  },
  {
    "id": "3.29",
    "chapter": 3,
    "kind": "derivation",
    "title": "Bellman equation practice",
    "easyGoal": "Turn bellman equation practice into a symbolic check: start from definitions, keep the conditioning explicit, and reach the requested identity or update form.",
    "technicalGoal": "Write the relevant value/return/probability expression, substitute the chapter definitions, align time indices and conditioning variables, then simplify without changing the target policy or objective.",
    "strategy": [
      "Copy the relevant definition onto a scratch line in your own notation.",
      "Expand one expectation, sum, or product at a time; do not skip time indices.",
      "Check the endpoint by substituting an easy special case such as gamma=0 or lambda=0."
    ],
    "checkpoint": "Checkpoint: every equality should preserve the same policy, conditioning event, and time index meaning.",
    "tags": [
      "derivation",
      "Finite MDPs",
      "Bellman",
      "value"
    ]
  },
  {
    "id": "4.1",
    "chapter": 4,
    "kind": "conceptual",
    "title": "Dynamic Programming exercise 4.1",
    "easyGoal": "Use dynamic programming exercise 4.1 to test whether the chapter's dynamic-programming backups, policy iteration, and value iteration is understood operationally, not only verbally.",
    "technicalGoal": "Translate the question into the formal objects of dynamic-programming backups, policy iteration, and value iteration; identify which assumptions are fixed and which variables the exercise asks you to vary.",
    "strategy": [
      "Restate the question as a concrete state/action/reward/value or policy object.",
      "Test the idea on a tiny case before answering generally.",
      "Separate intuitive language from the formal claim you would defend."
    ],
    "checkpoint": "Checkpoint: you can say what would change if the policy, reward, or state definition changed.",
    "tags": [
      "conceptual",
      "Dynamic Programming",
      "Dyna",
      "policy"
    ]
  },
  {
    "id": "4.2",
    "chapter": 4,
    "kind": "conceptual",
    "title": "Gridworld values and policies",
    "easyGoal": "Use gridworld values and policies to test whether the chapter's dynamic-programming backups, policy iteration, and value iteration is understood operationally, not only verbally.",
    "technicalGoal": "Translate the question into the formal objects of dynamic-programming backups, policy iteration, and value iteration; identify which assumptions are fixed and which variables the exercise asks you to vary.",
    "strategy": [
      "Restate the question as a concrete state/action/reward/value or policy object.",
      "Test the idea on a tiny case before answering generally.",
      "Separate intuitive language from the formal claim you would defend."
    ],
    "checkpoint": "Checkpoint: you can say what would change if the policy, reward, or state definition changed.",
    "tags": [
      "conceptual",
      "Dynamic Programming",
      "gridworld",
      "value"
    ]
  },
  {
    "id": "4.3",
    "chapter": 4,
    "kind": "derivation",
    "title": "Dynamic Programming exercise 4.3",
    "easyGoal": "Turn dynamic programming exercise 4.3 into a symbolic check: start from definitions, keep the conditioning explicit, and reach the requested identity or update form.",
    "technicalGoal": "Write the relevant value/return/probability expression, substitute the chapter definitions, align time indices and conditioning variables, then simplify without changing the target policy or objective.",
    "strategy": [
      "Copy the relevant definition onto a scratch line in your own notation.",
      "Expand one expectation, sum, or product at a time; do not skip time indices.",
      "Check the endpoint by substituting an easy special case such as gamma=0 or lambda=0."
    ],
    "checkpoint": "Checkpoint: every equality should preserve the same policy, conditioning event, and time index meaning.",
    "tags": [
      "derivation",
      "Dynamic Programming",
      "Dyna"
    ]
  },
  {
    "id": "4.4",
    "chapter": 4,
    "kind": "algorithm design",
    "title": "Policy-iteration mechanics",
    "easyGoal": "Modify an algorithm around policy-iteration mechanics while preserving what data is sampled, what target is built, and what quantity is updated.",
    "technicalGoal": "State the input variables, loop order, target construction, update equation, and termination condition; check whether the method is on-policy, off-policy, episodic, or continuing.",
    "strategy": [
      "Name the target before writing the update.",
      "Mark which policy generates data and which policy is being evaluated or improved.",
      "Confirm every stored variable is available at the time the pseudocode uses it."
    ],
    "checkpoint": "Checkpoint: someone else should be able to run the pseudocode without guessing when each update happens.",
    "tags": [
      "algorithm design",
      "Dynamic Programming",
      "policy"
    ]
  },
  {
    "id": "4.5",
    "chapter": 4,
    "kind": "conceptual",
    "title": "Policy-iteration mechanics",
    "easyGoal": "Use policy-iteration mechanics to test whether the chapter's dynamic-programming backups, policy iteration, and value iteration is understood operationally, not only verbally.",
    "technicalGoal": "Translate the question into the formal objects of dynamic-programming backups, policy iteration, and value iteration; identify which assumptions are fixed and which variables the exercise asks you to vary.",
    "strategy": [
      "Restate the question as a concrete state/action/reward/value or policy object.",
      "Test the idea on a tiny case before answering generally.",
      "Separate intuitive language from the formal claim you would defend."
    ],
    "checkpoint": "Checkpoint: you can say what would change if the policy, reward, or state definition changed.",
    "tags": [
      "conceptual",
      "Dynamic Programming",
      "policy",
      "value"
    ]
  },
  {
    "id": "4.6",
    "chapter": 4,
    "kind": "conceptual",
    "title": "epsilon-greedy probability",
    "easyGoal": "Use epsilon-greedy probability to test whether the chapter's dynamic-programming backups, policy iteration, and value iteration is understood operationally, not only verbally.",
    "technicalGoal": "Translate the question into the formal objects of dynamic-programming backups, policy iteration, and value iteration; identify which assumptions are fixed and which variables the exercise asks you to vary.",
    "strategy": [
      "Restate the question as a concrete state/action/reward/value or policy object.",
      "Test the idea on a tiny case before answering generally.",
      "Separate intuitive language from the formal claim you would defend."
    ],
    "checkpoint": "Checkpoint: you can say what would change if the policy, reward, or state definition changed.",
    "tags": [
      "conceptual",
      "Dynamic Programming",
      "epsilon"
    ]
  },
  {
    "id": "4.7",
    "chapter": 4,
    "kind": "programming",
    "title": "Policy-iteration mechanics",
    "easyGoal": "Build or replicate a small experiment around policy-iteration mechanics so the chapter's dynamic-programming backups, policy iteration, and value iteration becomes measurable.",
    "technicalGoal": "Specify the environment, policy/update rule, step-size or sweep parameters, random seeds/runs, and the plot or statistic that would verify the expected dynamic-programming backups, policy iteration, and value iteration behavior.",
    "strategy": [
      "Write the smallest reproducible environment or task variant first.",
      "Log the exact parameters that affect the learning curve or policy.",
      "Average over enough runs to separate mechanism from random luck."
    ],
    "checkpoint": "Checkpoint: your answer should include both the implementation choice and the plotted/measured comparison.",
    "tags": [
      "programming",
      "Dynamic Programming",
      "policy"
    ]
  },
  {
    "id": "4.8",
    "chapter": 4,
    "kind": "conceptual",
    "title": "Optimality equations",
    "easyGoal": "Use optimality equations to test whether the chapter's dynamic-programming backups, policy iteration, and value iteration is understood operationally, not only verbally.",
    "technicalGoal": "Translate the question into the formal objects of dynamic-programming backups, policy iteration, and value iteration; identify which assumptions are fixed and which variables the exercise asks you to vary.",
    "strategy": [
      "Restate the question as a concrete state/action/reward/value or policy object.",
      "Test the idea on a tiny case before answering generally.",
      "Separate intuitive language from the formal claim you would defend."
    ],
    "checkpoint": "Checkpoint: you can say what would change if the policy, reward, or state definition changed.",
    "tags": [
      "conceptual",
      "Dynamic Programming"
    ]
  },
  {
    "id": "4.9",
    "chapter": 4,
    "kind": "programming",
    "title": "Gambler value iteration",
    "easyGoal": "Build or replicate a small experiment around gambler value iteration so the chapter's dynamic-programming backups, policy iteration, and value iteration becomes measurable.",
    "technicalGoal": "Specify the environment, policy/update rule, step-size or sweep parameters, random seeds/runs, and the plot or statistic that would verify the expected dynamic-programming backups, policy iteration, and value iteration behavior.",
    "strategy": [
      "Write the smallest reproducible environment or task variant first.",
      "Log the exact parameters that affect the learning curve or policy.",
      "Average over enough runs to separate mechanism from random luck."
    ],
    "checkpoint": "Checkpoint: your answer should include both the implementation choice and the plotted/measured comparison.",
    "tags": [
      "programming",
      "Dynamic Programming",
      "value"
    ]
  },
  {
    "id": "4.10",
    "chapter": 4,
    "kind": "conceptual",
    "title": "Action-value dynamic programming",
    "easyGoal": "Use action-value dynamic programming to test whether the chapter's dynamic-programming backups, policy iteration, and value iteration is understood operationally, not only verbally.",
    "technicalGoal": "Translate the question into the formal objects of dynamic-programming backups, policy iteration, and value iteration; identify which assumptions are fixed and which variables the exercise asks you to vary.",
    "strategy": [
      "Restate the question as a concrete state/action/reward/value or policy object.",
      "Test the idea on a tiny case before answering generally.",
      "Separate intuitive language from the formal claim you would defend."
    ],
    "checkpoint": "Checkpoint: you can say what would change if the policy, reward, or state definition changed.",
    "tags": [
      "conceptual",
      "Dynamic Programming",
      "Dyna",
      "value"
    ]
  },
  {
    "id": "5.1",
    "chapter": 5,
    "kind": "interpretation",
    "title": "Monte Carlo Methods exercise 5.1",
    "easyGoal": "Read monte carlo methods exercise 5.1 as evidence: identify the axes, the compared methods, and the mechanism that explains the curve or diagram.",
    "technicalGoal": "Connect the visible pattern to Monte Carlo prediction/control and importance sampling: determine which algorithmic choice changes the curve and which confounders, such as step-size or exploration, must be controlled.",
    "strategy": [
      "Read axes, averaging protocol, and compared methods before interpreting the winner.",
      "Explain the curve by a mechanism from the chapter, not by the method name alone.",
      "Ask what would change under a different step-size, exploration rate, or representation."
    ],
    "checkpoint": "Checkpoint: you can explain why the plotted effect appears, not only which line is higher.",
    "tags": [
      "interpretation",
      "Monte Carlo Methods"
    ]
  },
  {
    "id": "5.2",
    "chapter": 5,
    "kind": "conceptual",
    "title": "Jack car-rental program",
    "easyGoal": "Use jack car-rental program to test whether the chapter's Monte Carlo prediction/control and importance sampling is understood operationally, not only verbally.",
    "technicalGoal": "Translate the question into the formal objects of Monte Carlo prediction/control and importance sampling; identify which assumptions are fixed and which variables the exercise asks you to vary.",
    "strategy": [
      "Restate the question as a concrete state/action/reward/value or policy object.",
      "Test the idea on a tiny case before answering generally.",
      "Separate intuitive language from the formal claim you would defend."
    ],
    "checkpoint": "Checkpoint: you can say what would change if the policy, reward, or state definition changed.",
    "tags": [
      "conceptual",
      "Monte Carlo Methods",
      "blackjack"
    ]
  },
  {
    "id": "5.3",
    "chapter": 5,
    "kind": "conceptual",
    "title": "Monte Carlo exploring starts",
    "easyGoal": "Use monte carlo exploring starts to test whether the chapter's Monte Carlo prediction/control and importance sampling is understood operationally, not only verbally.",
    "technicalGoal": "Translate the question into the formal objects of Monte Carlo prediction/control and importance sampling; identify which assumptions are fixed and which variables the exercise asks you to vary.",
    "strategy": [
      "Restate the question as a concrete state/action/reward/value or policy object.",
      "Test the idea on a tiny case before answering generally.",
      "Separate intuitive language from the formal claim you would defend."
    ],
    "checkpoint": "Checkpoint: you can say what would change if the policy, reward, or state definition changed.",
    "tags": [
      "conceptual",
      "Monte Carlo Methods"
    ]
  },
  {
    "id": "5.4",
    "chapter": 5,
    "kind": "algorithm design",
    "title": "Monte Carlo exploring starts",
    "easyGoal": "Modify an algorithm around monte carlo exploring starts while preserving what data is sampled, what target is built, and what quantity is updated.",
    "technicalGoal": "State the input variables, loop order, target construction, update equation, and termination condition; check whether the method is on-policy, off-policy, episodic, or continuing.",
    "strategy": [
      "Name the target before writing the update.",
      "Mark which policy generates data and which policy is being evaluated or improved.",
      "Confirm every stored variable is available at the time the pseudocode uses it."
    ],
    "checkpoint": "Checkpoint: someone else should be able to run the pseudocode without guessing when each update happens.",
    "tags": [
      "algorithm design",
      "Monte Carlo Methods"
    ]
  },
  {
    "id": "5.5",
    "chapter": 5,
    "kind": "conceptual",
    "title": "Monte Carlo Methods exercise 5.5",
    "easyGoal": "Use monte carlo methods exercise 5.5 to test whether the chapter's Monte Carlo prediction/control and importance sampling is understood operationally, not only verbally.",
    "technicalGoal": "Translate the question into the formal objects of Monte Carlo prediction/control and importance sampling; identify which assumptions are fixed and which variables the exercise asks you to vary.",
    "strategy": [
      "Restate the question as a concrete state/action/reward/value or policy object.",
      "Test the idea on a tiny case before answering generally.",
      "Separate intuitive language from the formal claim you would defend."
    ],
    "checkpoint": "Checkpoint: you can say what would change if the policy, reward, or state definition changed.",
    "tags": [
      "conceptual",
      "Monte Carlo Methods"
    ]
  },
  {
    "id": "5.6",
    "chapter": 5,
    "kind": "derivation",
    "title": "Action-value dynamic programming",
    "easyGoal": "Turn action-value dynamic programming into a symbolic check: start from definitions, keep the conditioning explicit, and reach the requested identity or update form.",
    "technicalGoal": "Write the relevant value/return/probability expression, substitute the chapter definitions, align time indices and conditioning variables, then simplify without changing the target policy or objective.",
    "strategy": [
      "Copy the relevant definition onto a scratch line in your own notation.",
      "Expand one expectation, sum, or product at a time; do not skip time indices.",
      "Check the endpoint by substituting an easy special case such as gamma=0 or lambda=0."
    ],
    "checkpoint": "Checkpoint: every equality should preserve the same policy, conditioning event, and time index meaning.",
    "tags": [
      "derivation",
      "Monte Carlo Methods",
      "Dyna",
      "value"
    ]
  },
  {
    "id": "5.7",
    "chapter": 5,
    "kind": "interpretation",
    "title": "Monte Carlo Methods exercise 5.7",
    "easyGoal": "Read monte carlo methods exercise 5.7 as evidence: identify the axes, the compared methods, and the mechanism that explains the curve or diagram.",
    "technicalGoal": "Connect the visible pattern to Monte Carlo prediction/control and importance sampling: determine which algorithmic choice changes the curve and which confounders, such as step-size or exploration, must be controlled.",
    "strategy": [
      "Read axes, averaging protocol, and compared methods before interpreting the winner.",
      "Explain the curve by a mechanism from the chapter, not by the method name alone.",
      "Ask what would change under a different step-size, exploration rate, or representation."
    ],
    "checkpoint": "Checkpoint: you can explain why the plotted effect appears, not only which line is higher.",
    "tags": [
      "interpretation",
      "Monte Carlo Methods"
    ]
  },
  {
    "id": "5.8",
    "chapter": 5,
    "kind": "interpretation",
    "title": "Monte Carlo Methods exercise 5.8",
    "easyGoal": "Read monte carlo methods exercise 5.8 as evidence: identify the axes, the compared methods, and the mechanism that explains the curve or diagram.",
    "technicalGoal": "Connect the visible pattern to Monte Carlo prediction/control and importance sampling: determine which algorithmic choice changes the curve and which confounders, such as step-size or exploration, must be controlled.",
    "strategy": [
      "Read axes, averaging protocol, and compared methods before interpreting the winner.",
      "Explain the curve by a mechanism from the chapter, not by the method name alone.",
      "Ask what would change under a different step-size, exploration rate, or representation."
    ],
    "checkpoint": "Checkpoint: you can explain why the plotted effect appears, not only which line is higher.",
    "tags": [
      "interpretation",
      "Monte Carlo Methods"
    ]
  },
  {
    "id": "5.9",
    "chapter": 5,
    "kind": "algorithm design",
    "title": "Monte Carlo Methods exercise 5.9",
    "easyGoal": "Modify an algorithm around monte carlo methods exercise 5.9 while preserving what data is sampled, what target is built, and what quantity is updated.",
    "technicalGoal": "State the input variables, loop order, target construction, update equation, and termination condition; check whether the method is on-policy, off-policy, episodic, or continuing.",
    "strategy": [
      "Name the target before writing the update.",
      "Mark which policy generates data and which policy is being evaluated or improved.",
      "Confirm every stored variable is available at the time the pseudocode uses it."
    ],
    "checkpoint": "Checkpoint: someone else should be able to run the pseudocode without guessing when each update happens.",
    "tags": [
      "algorithm design",
      "Monte Carlo Methods",
      "policy"
    ]
  },
  {
    "id": "5.10",
    "chapter": 5,
    "kind": "derivation",
    "title": "Monte Carlo Methods exercise 5.10",
    "easyGoal": "Turn monte carlo methods exercise 5.10 into a symbolic check: start from definitions, keep the conditioning explicit, and reach the requested identity or update form.",
    "technicalGoal": "Write the relevant value/return/probability expression, substitute the chapter definitions, align time indices and conditioning variables, then simplify without changing the target policy or objective.",
    "strategy": [
      "Copy the relevant definition onto a scratch line in your own notation.",
      "Expand one expectation, sum, or product at a time; do not skip time indices.",
      "Check the endpoint by substituting an easy special case such as gamma=0 or lambda=0."
    ],
    "checkpoint": "Checkpoint: every equality should preserve the same policy, conditioning event, and time index meaning.",
    "tags": [
      "derivation",
      "Monte Carlo Methods",
      "average reward"
    ]
  },
  {
    "id": "5.11",
    "chapter": 5,
    "kind": "algorithm design",
    "title": "Monte Carlo Methods exercise 5.11",
    "easyGoal": "Modify an algorithm around monte carlo methods exercise 5.11 while preserving what data is sampled, what target is built, and what quantity is updated.",
    "technicalGoal": "State the input variables, loop order, target construction, update equation, and termination condition; check whether the method is on-policy, off-policy, episodic, or continuing.",
    "strategy": [
      "Name the target before writing the update.",
      "Mark which policy generates data and which policy is being evaluated or improved.",
      "Confirm every stored variable is available at the time the pseudocode uses it."
    ],
    "checkpoint": "Checkpoint: someone else should be able to run the pseudocode without guessing when each update happens.",
    "tags": [
      "algorithm design",
      "Monte Carlo Methods",
      "off-policy",
      "policy"
    ]
  },
  {
    "id": "5.12",
    "chapter": 5,
    "kind": "programming",
    "title": "Racetrack (programming)",
    "easyGoal": "Build or replicate a small experiment around racetrack (programming) so the chapter's Monte Carlo prediction/control and importance sampling becomes measurable.",
    "technicalGoal": "Specify the environment, policy/update rule, step-size or sweep parameters, random seeds/runs, and the plot or statistic that would verify the expected Monte Carlo prediction/control and importance sampling behavior.",
    "strategy": [
      "Write the smallest reproducible environment or task variant first.",
      "Log the exact parameters that affect the learning curve or policy.",
      "Average over enough runs to separate mechanism from random luck."
    ],
    "checkpoint": "Checkpoint: your answer should include both the implementation choice and the plotted/measured comparison.",
    "tags": [
      "programming",
      "Monte Carlo Methods"
    ]
  },
  {
    "id": "5.13",
    "chapter": 5,
    "kind": "derivation",
    "title": "Monte Carlo Methods exercise 5.13",
    "easyGoal": "Turn monte carlo methods exercise 5.13 into a symbolic check: start from definitions, keep the conditioning explicit, and reach the requested identity or update form.",
    "technicalGoal": "Write the relevant value/return/probability expression, substitute the chapter definitions, align time indices and conditioning variables, then simplify without changing the target policy or objective.",
    "strategy": [
      "Copy the relevant definition onto a scratch line in your own notation.",
      "Expand one expectation, sum, or product at a time; do not skip time indices.",
      "Check the endpoint by substituting an easy special case such as gamma=0 or lambda=0."
    ],
    "checkpoint": "Checkpoint: every equality should preserve the same policy, conditioning event, and time index meaning.",
    "tags": [
      "derivation",
      "Monte Carlo Methods"
    ]
  },
  {
    "id": "5.14",
    "chapter": 5,
    "kind": "algorithm design",
    "title": "Monte Carlo Methods exercise 5.14",
    "easyGoal": "Modify an algorithm around monte carlo methods exercise 5.14 while preserving what data is sampled, what target is built, and what quantity is updated.",
    "technicalGoal": "State the input variables, loop order, target construction, update equation, and termination condition; check whether the method is on-policy, off-policy, episodic, or continuing.",
    "strategy": [
      "Name the target before writing the update.",
      "Mark which policy generates data and which policy is being evaluated or improved.",
      "Confirm every stored variable is available at the time the pseudocode uses it."
    ],
    "checkpoint": "Checkpoint: someone else should be able to run the pseudocode without guessing when each update happens.",
    "tags": [
      "algorithm design",
      "Monte Carlo Methods",
      "off-policy",
      "policy"
    ]
  },
  {
    "id": "5.15",
    "chapter": 5,
    "kind": "derivation",
    "title": "Importance-sampling analysis",
    "easyGoal": "Turn importance-sampling analysis into a symbolic check: start from definitions, keep the conditioning explicit, and reach the requested identity or update form.",
    "technicalGoal": "Write the relevant value/return/probability expression, substitute the chapter definitions, align time indices and conditioning variables, then simplify without changing the target policy or objective.",
    "strategy": [
      "Copy the relevant definition onto a scratch line in your own notation.",
      "Expand one expectation, sum, or product at a time; do not skip time indices.",
      "Check the endpoint by substituting an easy special case such as gamma=0 or lambda=0."
    ],
    "checkpoint": "Checkpoint: every equality should preserve the same policy, conditioning event, and time index meaning.",
    "tags": [
      "derivation",
      "Monte Carlo Methods",
      "importance sampling"
    ]
  },
  {
    "id": "6.1",
    "chapter": 6,
    "kind": "conceptual",
    "title": "Temporal-Difference Learning exercise 6.1",
    "easyGoal": "Use temporal-difference learning exercise 6.1 to test whether the chapter's TD prediction and control target choices is understood operationally, not only verbally.",
    "technicalGoal": "Translate the question into the formal objects of TD prediction and control target choices; identify which assumptions are fixed and which variables the exercise asks you to vary.",
    "strategy": [
      "Restate the question as a concrete state/action/reward/value or policy object.",
      "Test the idea on a tiny case before answering generally.",
      "Separate intuitive language from the formal claim you would defend."
    ],
    "checkpoint": "Checkpoint: you can say what would change if the policy, reward, or state definition changed.",
    "tags": [
      "conceptual",
      "Temporal-Difference Learning"
    ]
  },
  {
    "id": "6.2",
    "chapter": 6,
    "kind": "conceptual",
    "title": "Temporal-Difference Learning exercise 6.2",
    "easyGoal": "Use temporal-difference learning exercise 6.2 to test whether the chapter's TD prediction and control target choices is understood operationally, not only verbally.",
    "technicalGoal": "Translate the question into the formal objects of TD prediction and control target choices; identify which assumptions are fixed and which variables the exercise asks you to vary.",
    "strategy": [
      "Restate the question as a concrete state/action/reward/value or policy object.",
      "Test the idea on a tiny case before answering generally.",
      "Separate intuitive language from the formal claim you would defend."
    ],
    "checkpoint": "Checkpoint: you can say what would change if the policy, reward, or state definition changed.",
    "tags": [
      "conceptual",
      "Temporal-Difference Learning"
    ]
  },
  {
    "id": "6.3",
    "chapter": 6,
    "kind": "interpretation",
    "title": "Random-walk benchmark",
    "easyGoal": "Read random-walk benchmark as evidence: identify the axes, the compared methods, and the mechanism that explains the curve or diagram.",
    "technicalGoal": "Connect the visible pattern to TD prediction and control target choices: determine which algorithmic choice changes the curve and which confounders, such as step-size or exploration, must be controlled.",
    "strategy": [
      "Read axes, averaging protocol, and compared methods before interpreting the winner.",
      "Explain the curve by a mechanism from the chapter, not by the method name alone.",
      "Ask what would change under a different step-size, exploration rate, or representation."
    ],
    "checkpoint": "Checkpoint: you can explain why the plotted effect appears, not only which line is higher.",
    "tags": [
      "interpretation",
      "Temporal-Difference Learning",
      "random walk"
    ]
  },
  {
    "id": "6.4",
    "chapter": 6,
    "kind": "interpretation",
    "title": "Random-walk benchmark",
    "easyGoal": "Read random-walk benchmark as evidence: identify the axes, the compared methods, and the mechanism that explains the curve or diagram.",
    "technicalGoal": "Connect the visible pattern to TD prediction and control target choices: determine which algorithmic choice changes the curve and which confounders, such as step-size or exploration, must be controlled.",
    "strategy": [
      "Read axes, averaging protocol, and compared methods before interpreting the winner.",
      "Explain the curve by a mechanism from the chapter, not by the method name alone.",
      "Ask what would change under a different step-size, exploration rate, or representation."
    ],
    "checkpoint": "Checkpoint: you can explain why the plotted effect appears, not only which line is higher.",
    "tags": [
      "interpretation",
      "Temporal-Difference Learning",
      "random walk"
    ]
  },
  {
    "id": "6.5",
    "chapter": 6,
    "kind": "interpretation",
    "title": "Random-walk benchmark",
    "easyGoal": "Read random-walk benchmark as evidence: identify the axes, the compared methods, and the mechanism that explains the curve or diagram.",
    "technicalGoal": "Connect the visible pattern to TD prediction and control target choices: determine which algorithmic choice changes the curve and which confounders, such as step-size or exploration, must be controlled.",
    "strategy": [
      "Read axes, averaging protocol, and compared methods before interpreting the winner.",
      "Explain the curve by a mechanism from the chapter, not by the method name alone.",
      "Ask what would change under a different step-size, exploration rate, or representation."
    ],
    "checkpoint": "Checkpoint: you can explain why the plotted effect appears, not only which line is higher.",
    "tags": [
      "interpretation",
      "Temporal-Difference Learning",
      "random walk"
    ]
  },
  {
    "id": "6.6",
    "chapter": 6,
    "kind": "conceptual",
    "title": "Random-walk benchmark",
    "easyGoal": "Use random-walk benchmark to test whether the chapter's TD prediction and control target choices is understood operationally, not only verbally.",
    "technicalGoal": "Translate the question into the formal objects of TD prediction and control target choices; identify which assumptions are fixed and which variables the exercise asks you to vary.",
    "strategy": [
      "Restate the question as a concrete state/action/reward/value or policy object.",
      "Test the idea on a tiny case before answering generally.",
      "Separate intuitive language from the formal claim you would defend."
    ],
    "checkpoint": "Checkpoint: you can say what would change if the policy, reward, or state definition changed.",
    "tags": [
      "conceptual",
      "Temporal-Difference Learning",
      "random walk",
      "value"
    ]
  },
  {
    "id": "6.7",
    "chapter": 6,
    "kind": "conceptual",
    "title": "Temporal-Difference Learning exercise 6.7",
    "easyGoal": "Use temporal-difference learning exercise 6.7 to test whether the chapter's TD prediction and control target choices is understood operationally, not only verbally.",
    "technicalGoal": "Translate the question into the formal objects of TD prediction and control target choices; identify which assumptions are fixed and which variables the exercise asks you to vary.",
    "strategy": [
      "Restate the question as a concrete state/action/reward/value or policy object.",
      "Test the idea on a tiny case before answering generally.",
      "Separate intuitive language from the formal claim you would defend."
    ],
    "checkpoint": "Checkpoint: you can say what would change if the policy, reward, or state definition changed.",
    "tags": [
      "conceptual",
      "Temporal-Difference Learning",
      "off-policy",
      "policy"
    ]
  },
  {
    "id": "6.8",
    "chapter": 6,
    "kind": "derivation",
    "title": "Temporal-Difference Learning exercise 6.8",
    "easyGoal": "Turn temporal-difference learning exercise 6.8 into a symbolic check: start from definitions, keep the conditioning explicit, and reach the requested identity or update form.",
    "technicalGoal": "Write the relevant value/return/probability expression, substitute the chapter definitions, align time indices and conditioning variables, then simplify without changing the target policy or objective.",
    "strategy": [
      "Copy the relevant definition onto a scratch line in your own notation.",
      "Expand one expectation, sum, or product at a time; do not skip time indices.",
      "Check the endpoint by substituting an easy special case such as gamma=0 or lambda=0."
    ],
    "checkpoint": "Checkpoint: every equality should preserve the same policy, conditioning event, and time index meaning.",
    "tags": [
      "derivation",
      "Temporal-Difference Learning",
      "value"
    ]
  },
  {
    "id": "6.9",
    "chapter": 6,
    "kind": "programming",
    "title": "Windy Gridworld with King’s Moves (programming)",
    "easyGoal": "Build or replicate a small experiment around windy gridworld with king’s moves (programming) so the chapter's TD prediction and control target choices becomes measurable.",
    "technicalGoal": "Specify the environment, policy/update rule, step-size or sweep parameters, random seeds/runs, and the plot or statistic that would verify the expected TD prediction and control target choices behavior.",
    "strategy": [
      "Write the smallest reproducible environment or task variant first.",
      "Log the exact parameters that affect the learning curve or policy.",
      "Average over enough runs to separate mechanism from random luck."
    ],
    "checkpoint": "Checkpoint: your answer should include both the implementation choice and the plotted/measured comparison.",
    "tags": [
      "programming",
      "Temporal-Difference Learning",
      "gridworld"
    ]
  },
  {
    "id": "6.10",
    "chapter": 6,
    "kind": "programming",
    "title": "Stochastic Wind (programming)",
    "easyGoal": "Build or replicate a small experiment around stochastic wind (programming) so the chapter's TD prediction and control target choices becomes measurable.",
    "technicalGoal": "Specify the environment, policy/update rule, step-size or sweep parameters, random seeds/runs, and the plot or statistic that would verify the expected TD prediction and control target choices behavior.",
    "strategy": [
      "Write the smallest reproducible environment or task variant first.",
      "Log the exact parameters that affect the learning curve or policy.",
      "Average over enough runs to separate mechanism from random luck."
    ],
    "checkpoint": "Checkpoint: your answer should include both the implementation choice and the plotted/measured comparison.",
    "tags": [
      "programming",
      "Temporal-Difference Learning",
      "gridworld"
    ]
  },
  {
    "id": "6.11",
    "chapter": 6,
    "kind": "conceptual",
    "title": "Q-learning off-policy target",
    "easyGoal": "Use q-learning off-policy target to test whether the chapter's TD prediction and control target choices is understood operationally, not only verbally.",
    "technicalGoal": "Translate the question into the formal objects of TD prediction and control target choices; identify which assumptions are fixed and which variables the exercise asks you to vary.",
    "strategy": [
      "Restate the question as a concrete state/action/reward/value or policy object.",
      "Test the idea on a tiny case before answering generally.",
      "Separate intuitive language from the formal claim you would defend."
    ],
    "checkpoint": "Checkpoint: you can say what would change if the policy, reward, or state definition changed.",
    "tags": [
      "conceptual",
      "Temporal-Difference Learning",
      "off-policy",
      "Q-learning",
      "policy"
    ]
  },
  {
    "id": "6.12",
    "chapter": 6,
    "kind": "conceptual",
    "title": "Q-learning off-policy target",
    "easyGoal": "Use q-learning off-policy target to test whether the chapter's TD prediction and control target choices is understood operationally, not only verbally.",
    "technicalGoal": "Translate the question into the formal objects of TD prediction and control target choices; identify which assumptions are fixed and which variables the exercise asks you to vary.",
    "strategy": [
      "Restate the question as a concrete state/action/reward/value or policy object.",
      "Test the idea on a tiny case before answering generally.",
      "Separate intuitive language from the formal claim you would defend."
    ],
    "checkpoint": "Checkpoint: you can say what would change if the policy, reward, or state definition changed.",
    "tags": [
      "conceptual",
      "Temporal-Difference Learning",
      "off-policy",
      "Q-learning",
      "policy"
    ]
  },
  {
    "id": "6.13",
    "chapter": 6,
    "kind": "derivation",
    "title": "Double Expected Sarsa equations",
    "easyGoal": "Turn double expected sarsa equations into a symbolic check: start from definitions, keep the conditioning explicit, and reach the requested identity or update form.",
    "technicalGoal": "Write the relevant value/return/probability expression, substitute the chapter definitions, align time indices and conditioning variables, then simplify without changing the target policy or objective.",
    "strategy": [
      "Copy the relevant definition onto a scratch line in your own notation.",
      "Expand one expectation, sum, or product at a time; do not skip time indices.",
      "Check the endpoint by substituting an easy special case such as gamma=0 or lambda=0."
    ],
    "checkpoint": "Checkpoint: every equality should preserve the same policy, conditioning event, and time index meaning.",
    "tags": [
      "derivation",
      "Temporal-Difference Learning",
      "Sarsa"
    ]
  },
  {
    "id": "6.14",
    "chapter": 6,
    "kind": "conceptual",
    "title": "Jack car-rental program",
    "easyGoal": "Use jack car-rental program to test whether the chapter's TD prediction and control target choices is understood operationally, not only verbally.",
    "technicalGoal": "Translate the question into the formal objects of TD prediction and control target choices; identify which assumptions are fixed and which variables the exercise asks you to vary.",
    "strategy": [
      "Restate the question as a concrete state/action/reward/value or policy object.",
      "Test the idea on a tiny case before answering generally.",
      "Separate intuitive language from the formal claim you would defend."
    ],
    "checkpoint": "Checkpoint: you can say what would change if the policy, reward, or state definition changed.",
    "tags": [
      "conceptual",
      "Temporal-Difference Learning"
    ]
  },
  {
    "id": "7.1",
    "chapter": 7,
    "kind": "conceptual",
    "title": "n-step Bootstrapping exercise 7.1",
    "easyGoal": "Use n-step bootstrapping exercise 7.1 to test whether the chapter's multi-step returns and off-policy corrections is understood operationally, not only verbally.",
    "technicalGoal": "Translate the question into the formal objects of multi-step returns and off-policy corrections; identify which assumptions are fixed and which variables the exercise asks you to vary.",
    "strategy": [
      "Restate the question as a concrete state/action/reward/value or policy object.",
      "Test the idea on a tiny case before answering generally.",
      "Separate intuitive language from the formal claim you would defend."
    ],
    "checkpoint": "Checkpoint: you can say what would change if the policy, reward, or state definition changed.",
    "tags": [
      "conceptual",
      "n-step Bootstrapping"
    ]
  },
  {
    "id": "7.2",
    "chapter": 7,
    "kind": "programming",
    "title": "n-step return reasoning",
    "easyGoal": "Build or replicate a small experiment around n-step return reasoning so the chapter's multi-step returns and off-policy corrections becomes measurable.",
    "technicalGoal": "Specify the environment, policy/update rule, step-size or sweep parameters, random seeds/runs, and the plot or statistic that would verify the expected multi-step returns and off-policy corrections behavior.",
    "strategy": [
      "Write the smallest reproducible environment or task variant first.",
      "Log the exact parameters that affect the learning curve or policy.",
      "Average over enough runs to separate mechanism from random luck."
    ],
    "checkpoint": "Checkpoint: your answer should include both the implementation choice and the plotted/measured comparison.",
    "tags": [
      "programming",
      "n-step Bootstrapping",
      "value"
    ]
  },
  {
    "id": "7.3",
    "chapter": 7,
    "kind": "conceptual",
    "title": "Random-walk benchmark",
    "easyGoal": "Use random-walk benchmark to test whether the chapter's multi-step returns and off-policy corrections is understood operationally, not only verbally.",
    "technicalGoal": "Translate the question into the formal objects of multi-step returns and off-policy corrections; identify which assumptions are fixed and which variables the exercise asks you to vary.",
    "strategy": [
      "Restate the question as a concrete state/action/reward/value or policy object.",
      "Test the idea on a tiny case before answering generally.",
      "Separate intuitive language from the formal claim you would defend."
    ],
    "checkpoint": "Checkpoint: you can say what would change if the policy, reward, or state definition changed.",
    "tags": [
      "conceptual",
      "n-step Bootstrapping",
      "random walk"
    ]
  },
  {
    "id": "7.4",
    "chapter": 7,
    "kind": "derivation",
    "title": "n-step return reasoning",
    "easyGoal": "Turn n-step return reasoning into a symbolic check: start from definitions, keep the conditioning explicit, and reach the requested identity or update form.",
    "technicalGoal": "Write the relevant value/return/probability expression, substitute the chapter definitions, align time indices and conditioning variables, then simplify without changing the target policy or objective.",
    "strategy": [
      "Copy the relevant definition onto a scratch line in your own notation.",
      "Expand one expectation, sum, or product at a time; do not skip time indices.",
      "Check the endpoint by substituting an easy special case such as gamma=0 or lambda=0."
    ],
    "checkpoint": "Checkpoint: every equality should preserve the same policy, conditioning event, and time index meaning.",
    "tags": [
      "derivation",
      "n-step Bootstrapping",
      "Sarsa"
    ]
  },
  {
    "id": "7.5",
    "chapter": 7,
    "kind": "algorithm design",
    "title": "n-step Bootstrapping exercise 7.5",
    "easyGoal": "Modify an algorithm around n-step bootstrapping exercise 7.5 while preserving what data is sampled, what target is built, and what quantity is updated.",
    "technicalGoal": "State the input variables, loop order, target construction, update equation, and termination condition; check whether the method is on-policy, off-policy, episodic, or continuing.",
    "strategy": [
      "Name the target before writing the update.",
      "Mark which policy generates data and which policy is being evaluated or improved.",
      "Confirm every stored variable is available at the time the pseudocode uses it."
    ],
    "checkpoint": "Checkpoint: someone else should be able to run the pseudocode without guessing when each update happens.",
    "tags": [
      "algorithm design",
      "n-step Bootstrapping",
      "off-policy",
      "policy",
      "value"
    ]
  },
  {
    "id": "7.6",
    "chapter": 7,
    "kind": "derivation",
    "title": "Control-variate proof",
    "easyGoal": "Turn control-variate proof into a symbolic check: start from definitions, keep the conditioning explicit, and reach the requested identity or update form.",
    "technicalGoal": "Write the relevant value/return/probability expression, substitute the chapter definitions, align time indices and conditioning variables, then simplify without changing the target policy or objective.",
    "strategy": [
      "Copy the relevant definition onto a scratch line in your own notation.",
      "Expand one expectation, sum, or product at a time; do not skip time indices.",
      "Check the endpoint by substituting an easy special case such as gamma=0 or lambda=0."
    ],
    "checkpoint": "Checkpoint: every equality should preserve the same policy, conditioning event, and time index meaning.",
    "tags": [
      "derivation",
      "n-step Bootstrapping"
    ]
  },
  {
    "id": "7.7",
    "chapter": 7,
    "kind": "algorithm design",
    "title": "n-step Bootstrapping exercise 7.7",
    "easyGoal": "Modify an algorithm around n-step bootstrapping exercise 7.7 while preserving what data is sampled, what target is built, and what quantity is updated.",
    "technicalGoal": "State the input variables, loop order, target construction, update equation, and termination condition; check whether the method is on-policy, off-policy, episodic, or continuing.",
    "strategy": [
      "Name the target before writing the update.",
      "Mark which policy generates data and which policy is being evaluated or improved.",
      "Confirm every stored variable is available at the time the pseudocode uses it."
    ],
    "checkpoint": "Checkpoint: someone else should be able to run the pseudocode without guessing when each update happens.",
    "tags": [
      "algorithm design",
      "n-step Bootstrapping",
      "off-policy",
      "policy",
      "value"
    ]
  },
  {
    "id": "7.8",
    "chapter": 7,
    "kind": "derivation",
    "title": "n-step return reasoning",
    "easyGoal": "Turn n-step return reasoning into a symbolic check: start from definitions, keep the conditioning explicit, and reach the requested identity or update form.",
    "technicalGoal": "Write the relevant value/return/probability expression, substitute the chapter definitions, align time indices and conditioning variables, then simplify without changing the target policy or objective.",
    "strategy": [
      "Copy the relevant definition onto a scratch line in your own notation.",
      "Expand one expectation, sum, or product at a time; do not skip time indices.",
      "Check the endpoint by substituting an easy special case such as gamma=0 or lambda=0."
    ],
    "checkpoint": "Checkpoint: every equality should preserve the same policy, conditioning event, and time index meaning.",
    "tags": [
      "derivation",
      "n-step Bootstrapping",
      "off-policy",
      "policy"
    ]
  },
  {
    "id": "7.9",
    "chapter": 7,
    "kind": "conceptual",
    "title": "n-step return reasoning",
    "easyGoal": "Use n-step return reasoning to test whether the chapter's multi-step returns and off-policy corrections is understood operationally, not only verbally.",
    "technicalGoal": "Translate the question into the formal objects of multi-step returns and off-policy corrections; identify which assumptions are fixed and which variables the exercise asks you to vary.",
    "strategy": [
      "Restate the question as a concrete state/action/reward/value or policy object.",
      "Test the idea on a tiny case before answering generally.",
      "Separate intuitive language from the formal claim you would defend."
    ],
    "checkpoint": "Checkpoint: you can say what would change if the policy, reward, or state definition changed.",
    "tags": [
      "conceptual",
      "n-step Bootstrapping",
      "off-policy",
      "policy"
    ]
  },
  {
    "id": "7.10",
    "chapter": 7,
    "kind": "programming",
    "title": "n-step Bootstrapping exercise 7.10",
    "easyGoal": "Build or replicate a small experiment around n-step bootstrapping exercise 7.10 so the chapter's multi-step returns and off-policy corrections becomes measurable.",
    "technicalGoal": "Specify the environment, policy/update rule, step-size or sweep parameters, random seeds/runs, and the plot or statistic that would verify the expected multi-step returns and off-policy corrections behavior.",
    "strategy": [
      "Write the smallest reproducible environment or task variant first.",
      "Log the exact parameters that affect the learning curve or policy.",
      "Average over enough runs to separate mechanism from random luck."
    ],
    "checkpoint": "Checkpoint: your answer should include both the implementation choice and the plotted/measured comparison.",
    "tags": [
      "programming",
      "n-step Bootstrapping",
      "off-policy",
      "policy"
    ]
  },
  {
    "id": "7.11",
    "chapter": 7,
    "kind": "derivation",
    "title": "Action-value dynamic programming",
    "easyGoal": "Turn action-value dynamic programming into a symbolic check: start from definitions, keep the conditioning explicit, and reach the requested identity or update form.",
    "technicalGoal": "Write the relevant value/return/probability expression, substitute the chapter definitions, align time indices and conditioning variables, then simplify without changing the target policy or objective.",
    "strategy": [
      "Copy the relevant definition onto a scratch line in your own notation.",
      "Expand one expectation, sum, or product at a time; do not skip time indices.",
      "Check the endpoint by substituting an easy special case such as gamma=0 or lambda=0."
    ],
    "checkpoint": "Checkpoint: every equality should preserve the same policy, conditioning event, and time index meaning.",
    "tags": [
      "derivation",
      "n-step Bootstrapping",
      "Dyna",
      "value"
    ]
  },
  {
    "id": "8.1",
    "chapter": 8,
    "kind": "interpretation",
    "title": "Planning and Learning exercise 8.1",
    "easyGoal": "Read planning and learning exercise 8.1 as evidence: identify the axes, the compared methods, and the mechanism that explains the curve or diagram.",
    "technicalGoal": "Connect the visible pattern to model learning, planning updates, and search control: determine which algorithmic choice changes the curve and which confounders, such as step-size or exploration, must be controlled.",
    "strategy": [
      "Read axes, averaging protocol, and compared methods before interpreting the winner.",
      "Explain the curve by a mechanism from the chapter, not by the method name alone.",
      "Ask what would change under a different step-size, exploration rate, or representation."
    ],
    "checkpoint": "Checkpoint: you can explain why the plotted effect appears, not only which line is higher.",
    "tags": [
      "interpretation",
      "Planning and Learning",
      "planning"
    ]
  },
  {
    "id": "8.2",
    "chapter": 8,
    "kind": "conceptual",
    "title": "Dyna model/planning analysis",
    "easyGoal": "Use dyna model/planning analysis to test whether the chapter's model learning, planning updates, and search control is understood operationally, not only verbally.",
    "technicalGoal": "Translate the question into the formal objects of model learning, planning updates, and search control; identify which assumptions are fixed and which variables the exercise asks you to vary.",
    "strategy": [
      "Restate the question as a concrete state/action/reward/value or policy object.",
      "Test the idea on a tiny case before answering generally.",
      "Separate intuitive language from the formal claim you would defend."
    ],
    "checkpoint": "Checkpoint: you can say what would change if the policy, reward, or state definition changed.",
    "tags": [
      "conceptual",
      "Planning and Learning",
      "Dyna",
      "planning"
    ]
  },
  {
    "id": "8.3",
    "chapter": 8,
    "kind": "interpretation",
    "title": "Dyna model/planning analysis",
    "easyGoal": "Read dyna model/planning analysis as evidence: identify the axes, the compared methods, and the mechanism that explains the curve or diagram.",
    "technicalGoal": "Connect the visible pattern to model learning, planning updates, and search control: determine which algorithmic choice changes the curve and which confounders, such as step-size or exploration, must be controlled.",
    "strategy": [
      "Read axes, averaging protocol, and compared methods before interpreting the winner.",
      "Explain the curve by a mechanism from the chapter, not by the method name alone.",
      "Ask what would change under a different step-size, exploration rate, or representation."
    ],
    "checkpoint": "Checkpoint: you can explain why the plotted effect appears, not only which line is higher.",
    "tags": [
      "interpretation",
      "Planning and Learning",
      "Dyna",
      "planning"
    ]
  },
  {
    "id": "8.4",
    "chapter": 8,
    "kind": "programming",
    "title": "Exploration bonus analysis",
    "easyGoal": "Build or replicate a small experiment around exploration bonus analysis so the chapter's model learning, planning updates, and search control becomes measurable.",
    "technicalGoal": "Specify the environment, policy/update rule, step-size or sweep parameters, random seeds/runs, and the plot or statistic that would verify the expected model learning, planning updates, and search control behavior.",
    "strategy": [
      "Write the smallest reproducible environment or task variant first.",
      "Log the exact parameters that affect the learning curve or policy.",
      "Average over enough runs to separate mechanism from random luck."
    ],
    "checkpoint": "Checkpoint: your answer should include both the implementation choice and the plotted/measured comparison.",
    "tags": [
      "programming",
      "Planning and Learning"
    ]
  },
  {
    "id": "8.5",
    "chapter": 8,
    "kind": "algorithm design",
    "title": "Dyna model/planning analysis",
    "easyGoal": "Modify an algorithm around dyna model/planning analysis while preserving what data is sampled, what target is built, and what quantity is updated.",
    "technicalGoal": "State the input variables, loop order, target construction, update equation, and termination condition; check whether the method is on-policy, off-policy, episodic, or continuing.",
    "strategy": [
      "Name the target before writing the update.",
      "Mark which policy generates data and which policy is being evaluated or improved.",
      "Confirm every stored variable is available at the time the pseudocode uses it."
    ],
    "checkpoint": "Checkpoint: someone else should be able to run the pseudocode without guessing when each update happens.",
    "tags": [
      "algorithm design",
      "Planning and Learning",
      "Dyna",
      "planning"
    ]
  },
  {
    "id": "8.6",
    "chapter": 8,
    "kind": "conceptual",
    "title": "Planning and Learning exercise 8.6",
    "easyGoal": "Use planning and learning exercise 8.6 to test whether the chapter's model learning, planning updates, and search control is understood operationally, not only verbally.",
    "technicalGoal": "Translate the question into the formal objects of model learning, planning updates, and search control; identify which assumptions are fixed and which variables the exercise asks you to vary.",
    "strategy": [
      "Restate the question as a concrete state/action/reward/value or policy object.",
      "Test the idea on a tiny case before answering generally.",
      "Separate intuitive language from the formal claim you would defend."
    ],
    "checkpoint": "Checkpoint: you can say what would change if the policy, reward, or state definition changed.",
    "tags": [
      "conceptual",
      "Planning and Learning",
      "planning"
    ]
  },
  {
    "id": "8.7",
    "chapter": 8,
    "kind": "interpretation",
    "title": "Planning and Learning exercise 8.7",
    "easyGoal": "Read planning and learning exercise 8.7 as evidence: identify the axes, the compared methods, and the mechanism that explains the curve or diagram.",
    "technicalGoal": "Connect the visible pattern to model learning, planning updates, and search control: determine which algorithmic choice changes the curve and which confounders, such as step-size or exploration, must be controlled.",
    "strategy": [
      "Read axes, averaging protocol, and compared methods before interpreting the winner.",
      "Explain the curve by a mechanism from the chapter, not by the method name alone.",
      "Ask what would change under a different step-size, exploration rate, or representation."
    ],
    "checkpoint": "Checkpoint: you can explain why the plotted effect appears, not only which line is higher.",
    "tags": [
      "interpretation",
      "Planning and Learning",
      "planning"
    ]
  },
  {
    "id": "8.8",
    "chapter": 8,
    "kind": "programming",
    "title": "Planning and Learning exercise 8.8",
    "easyGoal": "Build or replicate a small experiment around planning and learning exercise 8.8 so the chapter's model learning, planning updates, and search control becomes measurable.",
    "technicalGoal": "Specify the environment, policy/update rule, step-size or sweep parameters, random seeds/runs, and the plot or statistic that would verify the expected model learning, planning updates, and search control behavior.",
    "strategy": [
      "Write the smallest reproducible environment or task variant first.",
      "Log the exact parameters that affect the learning curve or policy.",
      "Average over enough runs to separate mechanism from random luck."
    ],
    "checkpoint": "Checkpoint: your answer should include both the implementation choice and the plotted/measured comparison.",
    "tags": [
      "programming",
      "Planning and Learning",
      "planning"
    ]
  },
  {
    "id": "9.1",
    "chapter": 9,
    "kind": "derivation",
    "title": "Tabular methods as approximation",
    "easyGoal": "Turn tabular methods as approximation into a symbolic check: start from definitions, keep the conditioning explicit, and reach the requested identity or update form.",
    "technicalGoal": "Write the relevant value/return/probability expression, substitute the chapter definitions, align time indices and conditioning variables, then simplify without changing the target policy or objective.",
    "strategy": [
      "Copy the relevant definition onto a scratch line in your own notation.",
      "Expand one expectation, sum, or product at a time; do not skip time indices.",
      "Check the endpoint by substituting an easy special case such as gamma=0 or lambda=0."
    ],
    "checkpoint": "Checkpoint: every equality should preserve the same policy, conditioning event, and time index meaning.",
    "tags": [
      "derivation",
      "Function Approximation"
    ]
  },
  {
    "id": "9.2",
    "chapter": 9,
    "kind": "conceptual",
    "title": "Function Approximation exercise 9.2",
    "easyGoal": "Use function approximation exercise 9.2 to test whether the chapter's features, approximation objectives, and representation geometry is understood operationally, not only verbally.",
    "technicalGoal": "Translate the question into the formal objects of features, approximation objectives, and representation geometry; identify which assumptions are fixed and which variables the exercise asks you to vary.",
    "strategy": [
      "Restate the question as a concrete state/action/reward/value or policy object.",
      "Test the idea on a tiny case before answering generally.",
      "Separate intuitive language from the formal claim you would defend."
    ],
    "checkpoint": "Checkpoint: you can say what would change if the policy, reward, or state definition changed.",
    "tags": [
      "conceptual",
      "Function Approximation"
    ]
  },
  {
    "id": "9.3",
    "chapter": 9,
    "kind": "conceptual",
    "title": "Function Approximation exercise 9.3",
    "easyGoal": "Use function approximation exercise 9.3 to test whether the chapter's features, approximation objectives, and representation geometry is understood operationally, not only verbally.",
    "technicalGoal": "Translate the question into the formal objects of features, approximation objectives, and representation geometry; identify which assumptions are fixed and which variables the exercise asks you to vary.",
    "strategy": [
      "Restate the question as a concrete state/action/reward/value or policy object.",
      "Test the idea on a tiny case before answering generally.",
      "Separate intuitive language from the formal claim you would defend."
    ],
    "checkpoint": "Checkpoint: you can say what would change if the policy, reward, or state definition changed.",
    "tags": [
      "conceptual",
      "Function Approximation"
    ]
  },
  {
    "id": "9.4",
    "chapter": 9,
    "kind": "conceptual",
    "title": "Function Approximation exercise 9.4",
    "easyGoal": "Use function approximation exercise 9.4 to test whether the chapter's features, approximation objectives, and representation geometry is understood operationally, not only verbally.",
    "technicalGoal": "Translate the question into the formal objects of features, approximation objectives, and representation geometry; identify which assumptions are fixed and which variables the exercise asks you to vary.",
    "strategy": [
      "Restate the question as a concrete state/action/reward/value or policy object.",
      "Test the idea on a tiny case before answering generally.",
      "Separate intuitive language from the formal claim you would defend."
    ],
    "checkpoint": "Checkpoint: you can say what would change if the policy, reward, or state definition changed.",
    "tags": [
      "conceptual",
      "Function Approximation"
    ]
  },
  {
    "id": "9.5",
    "chapter": 9,
    "kind": "conceptual",
    "title": "Tile-coding design",
    "easyGoal": "Use tile-coding design to test whether the chapter's features, approximation objectives, and representation geometry is understood operationally, not only verbally.",
    "technicalGoal": "Translate the question into the formal objects of features, approximation objectives, and representation geometry; identify which assumptions are fixed and which variables the exercise asks you to vary.",
    "strategy": [
      "Restate the question as a concrete state/action/reward/value or policy object.",
      "Test the idea on a tiny case before answering generally.",
      "Separate intuitive language from the formal claim you would defend."
    ],
    "checkpoint": "Checkpoint: you can say what would change if the policy, reward, or state definition changed.",
    "tags": [
      "conceptual",
      "Function Approximation",
      "tile coding"
    ]
  },
  {
    "id": "9.6",
    "chapter": 9,
    "kind": "derivation",
    "title": "Function Approximation exercise 9.6",
    "easyGoal": "Turn function approximation exercise 9.6 into a symbolic check: start from definitions, keep the conditioning explicit, and reach the requested identity or update form.",
    "technicalGoal": "Write the relevant value/return/probability expression, substitute the chapter definitions, align time indices and conditioning variables, then simplify without changing the target policy or objective.",
    "strategy": [
      "Copy the relevant definition onto a scratch line in your own notation.",
      "Expand one expectation, sum, or product at a time; do not skip time indices.",
      "Check the endpoint by substituting an easy special case such as gamma=0 or lambda=0."
    ],
    "checkpoint": "Checkpoint: every equality should preserve the same policy, conditioning event, and time index meaning.",
    "tags": [
      "derivation",
      "Function Approximation"
    ]
  },
  {
    "id": "9.7",
    "chapter": 9,
    "kind": "conceptual",
    "title": "Neural-network feature exercise",
    "easyGoal": "Use neural-network feature exercise to test whether the chapter's features, approximation objectives, and representation geometry is understood operationally, not only verbally.",
    "technicalGoal": "Translate the question into the formal objects of features, approximation objectives, and representation geometry; identify which assumptions are fixed and which variables the exercise asks you to vary.",
    "strategy": [
      "Restate the question as a concrete state/action/reward/value or policy object.",
      "Test the idea on a tiny case before answering generally.",
      "Separate intuitive language from the formal claim you would defend."
    ],
    "checkpoint": "Checkpoint: you can say what would change if the policy, reward, or state definition changed.",
    "tags": [
      "conceptual",
      "Function Approximation"
    ]
  },
  {
    "id": "9.8",
    "chapter": 9,
    "kind": "derivation",
    "title": "Function Approximation exercise 9.8",
    "easyGoal": "Turn function approximation exercise 9.8 into a symbolic check: start from definitions, keep the conditioning explicit, and reach the requested identity or update form.",
    "technicalGoal": "Write the relevant value/return/probability expression, substitute the chapter definitions, align time indices and conditioning variables, then simplify without changing the target policy or objective.",
    "strategy": [
      "Copy the relevant definition onto a scratch line in your own notation.",
      "Expand one expectation, sum, or product at a time; do not skip time indices.",
      "Check the endpoint by substituting an easy special case such as gamma=0 or lambda=0."
    ],
    "checkpoint": "Checkpoint: every equality should preserve the same policy, conditioning event, and time index meaning.",
    "tags": [
      "derivation",
      "Function Approximation"
    ]
  },
  {
    "id": "10.1",
    "chapter": 10,
    "kind": "algorithm design",
    "title": "Approximate On-policy Control exercise 10.1",
    "easyGoal": "Modify an algorithm around approximate on-policy control exercise 10.1 while preserving what data is sampled, what target is built, and what quantity is updated.",
    "technicalGoal": "State the input variables, loop order, target construction, update equation, and termination condition; check whether the method is on-policy, off-policy, episodic, or continuing.",
    "strategy": [
      "Name the target before writing the update.",
      "Mark which policy generates data and which policy is being evaluated or improved.",
      "Confirm every stored variable is available at the time the pseudocode uses it."
    ],
    "checkpoint": "Checkpoint: someone else should be able to run the pseudocode without guessing when each update happens.",
    "tags": [
      "algorithm design",
      "Approximate On-policy Control",
      "policy"
    ]
  },
  {
    "id": "10.2",
    "chapter": 10,
    "kind": "algorithm design",
    "title": "Expected Sarsa pseudocode",
    "easyGoal": "Modify an algorithm around expected sarsa pseudocode while preserving what data is sampled, what target is built, and what quantity is updated.",
    "technicalGoal": "State the input variables, loop order, target construction, update equation, and termination condition; check whether the method is on-policy, off-policy, episodic, or continuing.",
    "strategy": [
      "Name the target before writing the update.",
      "Mark which policy generates data and which policy is being evaluated or improved.",
      "Confirm every stored variable is available at the time the pseudocode uses it."
    ],
    "checkpoint": "Checkpoint: someone else should be able to run the pseudocode without guessing when each update happens.",
    "tags": [
      "algorithm design",
      "Approximate On-policy Control",
      "Sarsa",
      "gradient"
    ]
  },
  {
    "id": "10.3",
    "chapter": 10,
    "kind": "interpretation",
    "title": "Approximate On-policy Control exercise 10.3",
    "easyGoal": "Read approximate on-policy control exercise 10.3 as evidence: identify the axes, the compared methods, and the mechanism that explains the curve or diagram.",
    "technicalGoal": "Connect the visible pattern to semi-gradient control and average-reward continuing tasks: determine which algorithmic choice changes the curve and which confounders, such as step-size or exploration, must be controlled.",
    "strategy": [
      "Read axes, averaging protocol, and compared methods before interpreting the winner.",
      "Explain the curve by a mechanism from the chapter, not by the method name alone.",
      "Ask what would change under a different step-size, exploration rate, or representation."
    ],
    "checkpoint": "Checkpoint: you can explain why the plotted effect appears, not only which line is higher.",
    "tags": [
      "interpretation",
      "Approximate On-policy Control",
      "policy"
    ]
  },
  {
    "id": "10.4",
    "chapter": 10,
    "kind": "algorithm design",
    "title": "Q-learning off-policy target",
    "easyGoal": "Modify an algorithm around q-learning off-policy target while preserving what data is sampled, what target is built, and what quantity is updated.",
    "technicalGoal": "State the input variables, loop order, target construction, update equation, and termination condition; check whether the method is on-policy, off-policy, episodic, or continuing.",
    "strategy": [
      "Name the target before writing the update.",
      "Mark which policy generates data and which policy is being evaluated or improved.",
      "Confirm every stored variable is available at the time the pseudocode uses it."
    ],
    "checkpoint": "Checkpoint: someone else should be able to run the pseudocode without guessing when each update happens.",
    "tags": [
      "algorithm design",
      "Approximate On-policy Control",
      "off-policy",
      "Q-learning",
      "gradient"
    ]
  },
  {
    "id": "10.5",
    "chapter": 10,
    "kind": "derivation",
    "title": "Differential control equations",
    "easyGoal": "Turn differential control equations into a symbolic check: start from definitions, keep the conditioning explicit, and reach the requested identity or update form.",
    "technicalGoal": "Write the relevant value/return/probability expression, substitute the chapter definitions, align time indices and conditioning variables, then simplify without changing the target policy or objective.",
    "strategy": [
      "Copy the relevant definition onto a scratch line in your own notation.",
      "Expand one expectation, sum, or product at a time; do not skip time indices.",
      "Check the endpoint by substituting an easy special case such as gamma=0 or lambda=0."
    ],
    "checkpoint": "Checkpoint: every equality should preserve the same policy, conditioning event, and time index meaning.",
    "tags": [
      "derivation",
      "Approximate On-policy Control"
    ]
  },
  {
    "id": "10.6",
    "chapter": 10,
    "kind": "conceptual",
    "title": "Approximate On-policy Control exercise 10.6",
    "easyGoal": "Use approximate on-policy control exercise 10.6 to test whether the chapter's semi-gradient control and average-reward continuing tasks is understood operationally, not only verbally.",
    "technicalGoal": "Translate the question into the formal objects of semi-gradient control and average-reward continuing tasks; identify which assumptions are fixed and which variables the exercise asks you to vary.",
    "strategy": [
      "Restate the question as a concrete state/action/reward/value or policy object.",
      "Test the idea on a tiny case before answering generally.",
      "Separate intuitive language from the formal claim you would defend."
    ],
    "checkpoint": "Checkpoint: you can say what would change if the policy, reward, or state definition changed.",
    "tags": [
      "conceptual",
      "Approximate On-policy Control",
      "policy"
    ]
  },
  {
    "id": "10.7",
    "chapter": 10,
    "kind": "conceptual",
    "title": "Average-reward ring analysis",
    "easyGoal": "Use average-reward ring analysis to test whether the chapter's semi-gradient control and average-reward continuing tasks is understood operationally, not only verbally.",
    "technicalGoal": "Translate the question into the formal objects of semi-gradient control and average-reward continuing tasks; identify which assumptions are fixed and which variables the exercise asks you to vary.",
    "strategy": [
      "Restate the question as a concrete state/action/reward/value or policy object.",
      "Test the idea on a tiny case before answering generally.",
      "Separate intuitive language from the formal claim you would defend."
    ],
    "checkpoint": "Checkpoint: you can say what would change if the policy, reward, or state definition changed.",
    "tags": [
      "conceptual",
      "Approximate On-policy Control",
      "average reward"
    ]
  },
  {
    "id": "10.8",
    "chapter": 10,
    "kind": "algorithm design",
    "title": "Approximate On-policy Control exercise 10.8",
    "easyGoal": "Modify an algorithm around approximate on-policy control exercise 10.8 while preserving what data is sampled, what target is built, and what quantity is updated.",
    "technicalGoal": "State the input variables, loop order, target construction, update equation, and termination condition; check whether the method is on-policy, off-policy, episodic, or continuing.",
    "strategy": [
      "Name the target before writing the update.",
      "Mark which policy generates data and which policy is being evaluated or improved.",
      "Confirm every stored variable is available at the time the pseudocode uses it."
    ],
    "checkpoint": "Checkpoint: someone else should be able to run the pseudocode without guessing when each update happens.",
    "tags": [
      "algorithm design",
      "Approximate On-policy Control",
      "policy"
    ]
  },
  {
    "id": "10.9",
    "chapter": 10,
    "kind": "algorithm design",
    "title": "n-step return reasoning",
    "easyGoal": "Modify an algorithm around n-step return reasoning while preserving what data is sampled, what target is built, and what quantity is updated.",
    "technicalGoal": "State the input variables, loop order, target construction, update equation, and termination condition; check whether the method is on-policy, off-policy, episodic, or continuing.",
    "strategy": [
      "Name the target before writing the update.",
      "Mark which policy generates data and which policy is being evaluated or improved.",
      "Confirm every stored variable is available at the time the pseudocode uses it."
    ],
    "checkpoint": "Checkpoint: someone else should be able to run the pseudocode without guessing when each update happens.",
    "tags": [
      "algorithm design",
      "Approximate On-policy Control",
      "Sarsa",
      "gradient"
    ]
  },
  {
    "id": "11.1",
    "chapter": 11,
    "kind": "derivation",
    "title": "n-step return reasoning",
    "easyGoal": "Turn n-step return reasoning into a symbolic check: start from definitions, keep the conditioning explicit, and reach the requested identity or update form.",
    "technicalGoal": "Write the relevant value/return/probability expression, substitute the chapter definitions, align time indices and conditioning variables, then simplify without changing the target policy or objective.",
    "strategy": [
      "Copy the relevant definition onto a scratch line in your own notation.",
      "Expand one expectation, sum, or product at a time; do not skip time indices.",
      "Check the endpoint by substituting an easy special case such as gamma=0 or lambda=0."
    ],
    "checkpoint": "Checkpoint: every equality should preserve the same policy, conditioning event, and time index meaning.",
    "tags": [
      "derivation",
      "Off-policy Approximation",
      "off-policy",
      "gradient",
      "policy"
    ]
  },
  {
    "id": "11.2",
    "chapter": 11,
    "kind": "derivation",
    "title": "n-step return reasoning",
    "easyGoal": "Turn n-step return reasoning into a symbolic check: start from definitions, keep the conditioning explicit, and reach the requested identity or update form.",
    "technicalGoal": "Write the relevant value/return/probability expression, substitute the chapter definitions, align time indices and conditioning variables, then simplify without changing the target policy or objective.",
    "strategy": [
      "Copy the relevant definition onto a scratch line in your own notation.",
      "Expand one expectation, sum, or product at a time; do not skip time indices.",
      "Check the endpoint by substituting an easy special case such as gamma=0 or lambda=0."
    ],
    "checkpoint": "Checkpoint: every equality should preserve the same policy, conditioning event, and time index meaning.",
    "tags": [
      "derivation",
      "Off-policy Approximation",
      "gradient"
    ]
  },
  {
    "id": "11.3",
    "chapter": 11,
    "kind": "programming",
    "title": "Q-learning off-policy target",
    "easyGoal": "Build or replicate a small experiment around q-learning off-policy target so the chapter's off-policy approximation stability and Bellman-error objectives becomes measurable.",
    "technicalGoal": "Specify the environment, policy/update rule, step-size or sweep parameters, random seeds/runs, and the plot or statistic that would verify the expected off-policy approximation stability and Bellman-error objectives behavior.",
    "strategy": [
      "Write the smallest reproducible environment or task variant first.",
      "Log the exact parameters that affect the learning curve or policy.",
      "Average over enough runs to separate mechanism from random luck."
    ],
    "checkpoint": "Checkpoint: your answer should include both the implementation choice and the plotted/measured comparison.",
    "tags": [
      "programming",
      "Off-policy Approximation",
      "off-policy",
      "Q-learning",
      "gradient"
    ]
  },
  {
    "id": "11.4",
    "chapter": 11,
    "kind": "derivation",
    "title": "Prove (11.24). Hint",
    "easyGoal": "Turn prove (11.24). hint into a symbolic check: start from definitions, keep the conditioning explicit, and reach the requested identity or update form.",
    "technicalGoal": "Write the relevant value/return/probability expression, substitute the chapter definitions, align time indices and conditioning variables, then simplify without changing the target policy or objective.",
    "strategy": [
      "Copy the relevant definition onto a scratch line in your own notation.",
      "Expand one expectation, sum, or product at a time; do not skip time indices.",
      "Check the endpoint by substituting an easy special case such as gamma=0 or lambda=0."
    ],
    "checkpoint": "Checkpoint: every equality should preserve the same policy, conditioning event, and time index meaning.",
    "tags": [
      "derivation",
      "Off-policy Approximation"
    ]
  },
  {
    "id": "12.1",
    "chapter": 12,
    "kind": "conceptual",
    "title": "Eligibility Traces exercise 12.1",
    "easyGoal": "Use eligibility traces exercise 12.1 to test whether the chapter's lambda-returns, traces, and forward/backward equivalence is understood operationally, not only verbally.",
    "technicalGoal": "Translate the question into the formal objects of lambda-returns, traces, and forward/backward equivalence; identify which assumptions are fixed and which variables the exercise asks you to vary.",
    "strategy": [
      "Restate the question as a concrete state/action/reward/value or policy object.",
      "Test the idea on a tiny case before answering generally.",
      "Separate intuitive language from the formal claim you would defend."
    ],
    "checkpoint": "Checkpoint: you can say what would change if the policy, reward, or state definition changed.",
    "tags": [
      "conceptual",
      "Eligibility Traces",
      "traces"
    ]
  },
  {
    "id": "12.2",
    "chapter": 12,
    "kind": "conceptual",
    "title": "Eligibility Traces exercise 12.2",
    "easyGoal": "Use eligibility traces exercise 12.2 to test whether the chapter's lambda-returns, traces, and forward/backward equivalence is understood operationally, not only verbally.",
    "technicalGoal": "Translate the question into the formal objects of lambda-returns, traces, and forward/backward equivalence; identify which assumptions are fixed and which variables the exercise asks you to vary.",
    "strategy": [
      "Restate the question as a concrete state/action/reward/value or policy object.",
      "Test the idea on a tiny case before answering generally.",
      "Separate intuitive language from the formal claim you would defend."
    ],
    "checkpoint": "Checkpoint: you can say what would change if the policy, reward, or state definition changed.",
    "tags": [
      "conceptual",
      "Eligibility Traces",
      "traces"
    ]
  },
  {
    "id": "12.3",
    "chapter": 12,
    "kind": "conceptual",
    "title": "Eligibility Traces exercise 12.3",
    "easyGoal": "Use eligibility traces exercise 12.3 to test whether the chapter's lambda-returns, traces, and forward/backward equivalence is understood operationally, not only verbally.",
    "technicalGoal": "Translate the question into the formal objects of lambda-returns, traces, and forward/backward equivalence; identify which assumptions are fixed and which variables the exercise asks you to vary.",
    "strategy": [
      "Restate the question as a concrete state/action/reward/value or policy object.",
      "Test the idea on a tiny case before answering generally.",
      "Separate intuitive language from the formal claim you would defend."
    ],
    "checkpoint": "Checkpoint: you can say what would change if the policy, reward, or state definition changed.",
    "tags": [
      "conceptual",
      "Eligibility Traces",
      "off-policy",
      "traces"
    ]
  },
  {
    "id": "12.1",
    "chapter": 12,
    "kind": "conceptual",
    "title": "Eligibility Traces exercise 12.1",
    "easyGoal": "Use eligibility traces exercise 12.1 to test whether the chapter's lambda-returns, traces, and forward/backward equivalence is understood operationally, not only verbally.",
    "technicalGoal": "Translate the question into the formal objects of lambda-returns, traces, and forward/backward equivalence; identify which assumptions are fixed and which variables the exercise asks you to vary.",
    "strategy": [
      "Restate the question as a concrete state/action/reward/value or policy object.",
      "Test the idea on a tiny case before answering generally.",
      "Separate intuitive language from the formal claim you would defend."
    ],
    "checkpoint": "Checkpoint: you can say what would change if the policy, reward, or state definition changed.",
    "tags": [
      "conceptual",
      "Eligibility Traces",
      "traces"
    ]
  },
  {
    "id": "12.4",
    "chapter": 12,
    "kind": "derivation",
    "title": "Eligibility Traces exercise 12.4",
    "easyGoal": "Turn eligibility traces exercise 12.4 into a symbolic check: start from definitions, keep the conditioning explicit, and reach the requested identity or update form.",
    "technicalGoal": "Write the relevant value/return/probability expression, substitute the chapter definitions, align time indices and conditioning variables, then simplify without changing the target policy or objective.",
    "strategy": [
      "Copy the relevant definition onto a scratch line in your own notation.",
      "Expand one expectation, sum, or product at a time; do not skip time indices.",
      "Check the endpoint by substituting an easy special case such as gamma=0 or lambda=0."
    ],
    "checkpoint": "Checkpoint: every equality should preserve the same policy, conditioning event, and time index meaning.",
    "tags": [
      "derivation",
      "Eligibility Traces",
      "traces"
    ]
  },
  {
    "id": "12.5",
    "chapter": 12,
    "kind": "conceptual",
    "title": "Eligibility Traces exercise 12.5",
    "easyGoal": "Use eligibility traces exercise 12.5 to test whether the chapter's lambda-returns, traces, and forward/backward equivalence is understood operationally, not only verbally.",
    "technicalGoal": "Translate the question into the formal objects of lambda-returns, traces, and forward/backward equivalence; identify which assumptions are fixed and which variables the exercise asks you to vary.",
    "strategy": [
      "Restate the question as a concrete state/action/reward/value or policy object.",
      "Test the idea on a tiny case before answering generally.",
      "Separate intuitive language from the formal claim you would defend."
    ],
    "checkpoint": "Checkpoint: you can say what would change if the policy, reward, or state definition changed.",
    "tags": [
      "conceptual",
      "Eligibility Traces",
      "traces"
    ]
  },
  {
    "id": "12.6",
    "chapter": 12,
    "kind": "algorithm design",
    "title": "Dutch trace adaptation",
    "easyGoal": "Modify an algorithm around dutch trace adaptation while preserving what data is sampled, what target is built, and what quantity is updated.",
    "technicalGoal": "State the input variables, loop order, target construction, update equation, and termination condition; check whether the method is on-policy, off-policy, episodic, or continuing.",
    "strategy": [
      "Name the target before writing the update.",
      "Mark which policy generates data and which policy is being evaluated or improved.",
      "Confirm every stored variable is available at the time the pseudocode uses it."
    ],
    "checkpoint": "Checkpoint: someone else should be able to run the pseudocode without guessing when each update happens.",
    "tags": [
      "algorithm design",
      "Eligibility Traces",
      "Sarsa",
      "traces"
    ]
  },
  {
    "id": "12.7",
    "chapter": 12,
    "kind": "derivation",
    "title": "Eligibility Traces exercise 12.7",
    "easyGoal": "Turn eligibility traces exercise 12.7 into a symbolic check: start from definitions, keep the conditioning explicit, and reach the requested identity or update form.",
    "technicalGoal": "Write the relevant value/return/probability expression, substitute the chapter definitions, align time indices and conditioning variables, then simplify without changing the target policy or objective.",
    "strategy": [
      "Copy the relevant definition onto a scratch line in your own notation.",
      "Expand one expectation, sum, or product at a time; do not skip time indices.",
      "Check the endpoint by substituting an easy special case such as gamma=0 or lambda=0."
    ],
    "checkpoint": "Checkpoint: every equality should preserve the same policy, conditioning event, and time index meaning.",
    "tags": [
      "derivation",
      "Eligibility Traces",
      "traces"
    ]
  },
  {
    "id": "12.8",
    "chapter": 12,
    "kind": "derivation",
    "title": "Eligibility Traces exercise 12.8",
    "easyGoal": "Turn eligibility traces exercise 12.8 into a symbolic check: start from definitions, keep the conditioning explicit, and reach the requested identity or update form.",
    "technicalGoal": "Write the relevant value/return/probability expression, substitute the chapter definitions, align time indices and conditioning variables, then simplify without changing the target policy or objective.",
    "strategy": [
      "Copy the relevant definition onto a scratch line in your own notation.",
      "Expand one expectation, sum, or product at a time; do not skip time indices.",
      "Check the endpoint by substituting an easy special case such as gamma=0 or lambda=0."
    ],
    "checkpoint": "Checkpoint: every equality should preserve the same policy, conditioning event, and time index meaning.",
    "tags": [
      "derivation",
      "Eligibility Traces",
      "traces",
      "value"
    ]
  },
  {
    "id": "12.9",
    "chapter": 12,
    "kind": "conceptual",
    "title": "Eligibility Traces exercise 12.9",
    "easyGoal": "Use eligibility traces exercise 12.9 to test whether the chapter's lambda-returns, traces, and forward/backward equivalence is understood operationally, not only verbally.",
    "technicalGoal": "Translate the question into the formal objects of lambda-returns, traces, and forward/backward equivalence; identify which assumptions are fixed and which variables the exercise asks you to vary.",
    "strategy": [
      "Restate the question as a concrete state/action/reward/value or policy object.",
      "Test the idea on a tiny case before answering generally.",
      "Separate intuitive language from the formal claim you would defend."
    ],
    "checkpoint": "Checkpoint: you can say what would change if the policy, reward, or state definition changed.",
    "tags": [
      "conceptual",
      "Eligibility Traces",
      "off-policy",
      "traces",
      "policy"
    ]
  },
  {
    "id": "12.10",
    "chapter": 12,
    "kind": "derivation",
    "title": "Eligibility Traces exercise 12.10",
    "easyGoal": "Turn eligibility traces exercise 12.10 into a symbolic check: start from definitions, keep the conditioning explicit, and reach the requested identity or update form.",
    "technicalGoal": "Write the relevant value/return/probability expression, substitute the chapter definitions, align time indices and conditioning variables, then simplify without changing the target policy or objective.",
    "strategy": [
      "Copy the relevant definition onto a scratch line in your own notation.",
      "Expand one expectation, sum, or product at a time; do not skip time indices.",
      "Check the endpoint by substituting an easy special case such as gamma=0 or lambda=0."
    ],
    "checkpoint": "Checkpoint: every equality should preserve the same policy, conditioning event, and time index meaning.",
    "tags": [
      "derivation",
      "Eligibility Traces",
      "traces",
      "value"
    ]
  },
  {
    "id": "12.11",
    "chapter": 12,
    "kind": "conceptual",
    "title": "Eligibility Traces exercise 12.11",
    "easyGoal": "Use eligibility traces exercise 12.11 to test whether the chapter's lambda-returns, traces, and forward/backward equivalence is understood operationally, not only verbally.",
    "technicalGoal": "Translate the question into the formal objects of lambda-returns, traces, and forward/backward equivalence; identify which assumptions are fixed and which variables the exercise asks you to vary.",
    "strategy": [
      "Restate the question as a concrete state/action/reward/value or policy object.",
      "Test the idea on a tiny case before answering generally.",
      "Separate intuitive language from the formal claim you would defend."
    ],
    "checkpoint": "Checkpoint: you can say what would change if the policy, reward, or state definition changed.",
    "tags": [
      "conceptual",
      "Eligibility Traces",
      "off-policy",
      "traces",
      "policy"
    ]
  },
  {
    "id": "12.12",
    "chapter": 12,
    "kind": "conceptual",
    "title": "Eligibility Traces exercise 12.12",
    "easyGoal": "Use eligibility traces exercise 12.12 to test whether the chapter's lambda-returns, traces, and forward/backward equivalence is understood operationally, not only verbally.",
    "technicalGoal": "Translate the question into the formal objects of lambda-returns, traces, and forward/backward equivalence; identify which assumptions are fixed and which variables the exercise asks you to vary.",
    "strategy": [
      "Restate the question as a concrete state/action/reward/value or policy object.",
      "Test the idea on a tiny case before answering generally.",
      "Separate intuitive language from the formal claim you would defend."
    ],
    "checkpoint": "Checkpoint: you can say what would change if the policy, reward, or state definition changed.",
    "tags": [
      "conceptual",
      "Eligibility Traces",
      "traces"
    ]
  },
  {
    "id": "12.13",
    "chapter": 12,
    "kind": "conceptual",
    "title": "Dutch trace adaptation",
    "easyGoal": "Use dutch trace adaptation to test whether the chapter's lambda-returns, traces, and forward/backward equivalence is understood operationally, not only verbally.",
    "technicalGoal": "Translate the question into the formal objects of lambda-returns, traces, and forward/backward equivalence; identify which assumptions are fixed and which variables the exercise asks you to vary.",
    "strategy": [
      "Restate the question as a concrete state/action/reward/value or policy object.",
      "Test the idea on a tiny case before answering generally.",
      "Separate intuitive language from the formal claim you would defend."
    ],
    "checkpoint": "Checkpoint: you can say what would change if the policy, reward, or state definition changed.",
    "tags": [
      "conceptual",
      "Eligibility Traces",
      "off-policy",
      "traces",
      "policy"
    ]
  },
  {
    "id": "12.14",
    "chapter": 12,
    "kind": "conceptual",
    "title": "Double Expected Sarsa equations",
    "easyGoal": "Use double expected sarsa equations to test whether the chapter's lambda-returns, traces, and forward/backward equivalence is understood operationally, not only verbally.",
    "technicalGoal": "Translate the question into the formal objects of lambda-returns, traces, and forward/backward equivalence; identify which assumptions are fixed and which variables the exercise asks you to vary.",
    "strategy": [
      "Restate the question as a concrete state/action/reward/value or policy object.",
      "Test the idea on a tiny case before answering generally.",
      "Separate intuitive language from the formal claim you would defend."
    ],
    "checkpoint": "Checkpoint: you can say what would change if the policy, reward, or state definition changed.",
    "tags": [
      "conceptual",
      "Eligibility Traces",
      "Sarsa",
      "traces"
    ]
  },
  {
    "id": "13.1",
    "chapter": 13,
    "kind": "conceptual",
    "title": "Gridworld values and policies",
    "easyGoal": "Use gridworld values and policies to test whether the chapter's policy-gradient parameterizations, baselines, and actor-critic logic is understood operationally, not only verbally.",
    "technicalGoal": "Translate the question into the formal objects of policy-gradient parameterizations, baselines, and actor-critic logic; identify which assumptions are fixed and which variables the exercise asks you to vary.",
    "strategy": [
      "Restate the question as a concrete state/action/reward/value or policy object.",
      "Test the idea on a tiny case before answering generally.",
      "Separate intuitive language from the formal claim you would defend."
    ],
    "checkpoint": "Checkpoint: you can say what would change if the policy, reward, or state definition changed.",
    "tags": [
      "conceptual",
      "Policy Gradients",
      "Dyna",
      "gridworld",
      "value"
    ]
  },
  {
    "id": "13.2",
    "chapter": 13,
    "kind": "conceptual",
    "title": "Policy Gradients exercise 13.2",
    "easyGoal": "Use policy gradients exercise 13.2 to test whether the chapter's policy-gradient parameterizations, baselines, and actor-critic logic is understood operationally, not only verbally.",
    "technicalGoal": "Translate the question into the formal objects of policy-gradient parameterizations, baselines, and actor-critic logic; identify which assumptions are fixed and which variables the exercise asks you to vary.",
    "strategy": [
      "Restate the question as a concrete state/action/reward/value or policy object.",
      "Test the idea on a tiny case before answering generally.",
      "Separate intuitive language from the formal claim you would defend."
    ],
    "checkpoint": "Checkpoint: you can say what would change if the policy, reward, or state definition changed.",
    "tags": [
      "conceptual",
      "Policy Gradients",
      "gradient",
      "policy"
    ]
  },
  {
    "id": "13.3",
    "chapter": 13,
    "kind": "conceptual",
    "title": "Softmax equivalence",
    "easyGoal": "Use softmax equivalence to test whether the chapter's policy-gradient parameterizations, baselines, and actor-critic logic is understood operationally, not only verbally.",
    "technicalGoal": "Translate the question into the formal objects of policy-gradient parameterizations, baselines, and actor-critic logic; identify which assumptions are fixed and which variables the exercise asks you to vary.",
    "strategy": [
      "Restate the question as a concrete state/action/reward/value or policy object.",
      "Test the idea on a tiny case before answering generally.",
      "Separate intuitive language from the formal claim you would defend."
    ],
    "checkpoint": "Checkpoint: you can say what would change if the policy, reward, or state definition changed.",
    "tags": [
      "conceptual",
      "Policy Gradients",
      "policy"
    ]
  },
  {
    "id": "13.4",
    "chapter": 13,
    "kind": "derivation",
    "title": "Gaussian policy-gradient derivatives",
    "easyGoal": "Turn gaussian policy-gradient derivatives into a symbolic check: start from definitions, keep the conditioning explicit, and reach the requested identity or update form.",
    "technicalGoal": "Write the relevant value/return/probability expression, substitute the chapter definitions, align time indices and conditioning variables, then simplify without changing the target policy or objective.",
    "strategy": [
      "Copy the relevant definition onto a scratch line in your own notation.",
      "Expand one expectation, sum, or product at a time; do not skip time indices.",
      "Check the endpoint by substituting an easy special case such as gamma=0 or lambda=0."
    ],
    "checkpoint": "Checkpoint: every equality should preserve the same policy, conditioning event, and time index meaning.",
    "tags": [
      "derivation",
      "Policy Gradients",
      "gradient",
      "policy"
    ]
  },
  {
    "id": "13.5",
    "chapter": 13,
    "kind": "conceptual",
    "title": "Stochastic policy probabilities",
    "easyGoal": "Use stochastic policy probabilities to test whether the chapter's policy-gradient parameterizations, baselines, and actor-critic logic is understood operationally, not only verbally.",
    "technicalGoal": "Translate the question into the formal objects of policy-gradient parameterizations, baselines, and actor-critic logic; identify which assumptions are fixed and which variables the exercise asks you to vary.",
    "strategy": [
      "Restate the question as a concrete state/action/reward/value or policy object.",
      "Test the idea on a tiny case before answering generally.",
      "Separate intuitive language from the formal claim you would defend."
    ],
    "checkpoint": "Checkpoint: you can say what would change if the policy, reward, or state definition changed.",
    "tags": [
      "conceptual",
      "Policy Gradients",
      "policy"
    ]
  },
  {
    "id": "17.1",
    "chapter": 17,
    "kind": "conceptual",
    "title": "Options without discounting",
    "easyGoal": "Use options without discounting to test whether the chapter's temporal abstraction with options is understood operationally, not only verbally.",
    "technicalGoal": "Translate the question into the formal objects of temporal abstraction with options; identify which assumptions are fixed and which variables the exercise asks you to vary.",
    "strategy": [
      "Restate the question as a concrete state/action/reward/value or policy object.",
      "Test the idea on a tiny case before answering generally.",
      "Separate intuitive language from the formal claim you would defend."
    ],
    "checkpoint": "Checkpoint: you can say what would change if the policy, reward, or state definition changed.",
    "tags": [
      "conceptual",
      "Frontiers"
    ]
  }
] satisfies ExerciseCoachCard[];

export const exerciseCoachTotals = {
  total: exerciseCoachCards.length,
  chapters: new Set(exerciseCoachCards.map((card) => card.chapter)).size,
  conceptual: exerciseCoachCards.filter((card) => card.kind === "conceptual").length,
  derivation: exerciseCoachCards.filter((card) => card.kind === "derivation").length,
  algorithmDesign: exerciseCoachCards.filter((card) => card.kind === "algorithm design").length,
  programming: exerciseCoachCards.filter((card) => card.kind === "programming").length,
  interpretation: exerciseCoachCards.filter((card) => card.kind === "interpretation").length,
};

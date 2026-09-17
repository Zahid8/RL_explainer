import { algorithmsForChapter } from "@/lib/algorithmCatalog";
import { chapterDeepDives, type SectionDeepDive } from "@/lib/deepDives";
import { formulaAtlas } from "@/lib/formulaAtlas";
import { chapters, terms, type Chapter, type Term } from "@/lib/paper";

export interface StandaloneVocabularyItem {
  name: string;
  plain: string;
  technical: string;
  why: string;
}

export interface StandaloneLectureBeat {
  section: string;
  question: string;
  fromScratch: string;
  visualLecture: string;
  technicalBuild: string;
  boardWork: string[];
  checkpoint: string;
  terms: string[];
}

export interface StandaloneChapterLecture {
  n: number;
  promise: string;
  startFromZero: string[];
  mentalModel: string;
  whyNow: string;
  learningContract: string[];
  vocabulary: StandaloneVocabularyItem[];
  beats: StandaloneLectureBeat[];
  handsOnSequence: string[];
  technicalFinish: string[];
  completionStandard: string;
  nextChapterBridge: string;
}

const scaffolds: Record<number, { zero: string[]; mentalModel: string; whyNow: string; promise: string }> = {
  1: {
    promise: "By the end you can look at any learning problem and draw the agent, environment, actions, rewards, values, and policy before naming an algorithm.",
    zero: [
      "Start with a creature in a world. The creature can do something, the world changes, and a number says whether the recent interaction was useful. Reinforcement learning studies how the creature can improve through that loop rather than by being shown labeled correct answers.",
      "The first hard idea is delayed consequence. A move can look bad now but enable a good future, or look good now but trap the agent later. The book therefore talks about reward, return, value, and policy instead of only immediate success.",
      "Think of Chapter 1 as the vocabulary and drawing lesson. It gives you the picture that every later equation is formalizing: sense, act, receive reward, update expectations, and act better next time."
    ],
    mentalModel: "Draw a loop with the agent on the left and the environment on the right. Arrows going out are actions; arrows coming back are observations and rewards. Values live inside the agent as forecasts of future reward; the policy is the agent's current habit for choosing actions.",
    whyNow: "Without this modeling boundary, later algorithms are just formulas. With it, you can ask whether a problem is really sequential, what the reward is optimizing, what information the agent has, and which part must be learned."
  },
  2: {
    promise: "By the end you can explain exploration versus exploitation using one-step decisions before the complication of states and long futures appears.",
    zero: [
      "Imagine repeatedly choosing among several slot machines. Each pull produces a reward, but there is no map, no next state, and no delayed chain of consequences. The only question is which option to try now.",
      "This simple world isolates the central tension of learning: use the action that currently looks best, or spend a choice gathering information about an action that might be better.",
      "Bandit methods teach the update pattern that will reappear everywhere: keep an estimate, observe an error, and move the estimate partway toward the new evidence."
    ],
    mentalModel: "Picture each action as a vertical bar whose height is the current estimate and whose glow is uncertainty. Greedy chooses the tallest bar; exploratory methods sometimes sample dimmer bars to reveal whether the height estimate is wrong.",
    whyNow: "The chapter gives the cleanest possible laboratory for step-sizes, sample averages, optimism, upper confidence bounds, preferences, and baselines before adding Markov dynamics."
  },
  3: {
    promise: "By the end you can write the formal language of finite Markov decision processes and understand what value functions and Bellman equations are saying.",
    zero: [
      "Now choices can move the agent from one situation to another. The result of an action is not only a reward; it is also the next state from which future rewards become possible or impossible.",
      "A Markov decision process is the grammar for this world. It lists states, actions, transition probabilities, reward probabilities, policies, returns, and values so that delayed decision making can be stated precisely.",
      "The key mental shift is recursion: the value of being somewhere equals immediate reward plus the value of where you tend to land next. Bellman equations are that sentence written mathematically."
    ],
    mentalModel: "Draw a map of rooms. In each room the agent chooses a door. Each door leads probabilistically to another room and drops a reward token. A policy is a door-selection rule; a value is the long-run score expected from a room or door.",
    whyNow: "Every later method is either solving, estimating, or approximating the value and policy objects defined here."
  },
  4: {
    promise: "By the end you can solve small known MDPs by sweeping tables with Bellman backups and alternating prediction with improvement.",
    zero: [
      "Suppose the entire world model is known: for every state and action you know where it can lead and what rewards can occur. Dynamic programming asks what to do with that complete map.",
      "The answer is to repeatedly back up information through the map. Prediction makes values consistent with a policy; improvement changes the policy to prefer actions with better backed-up values.",
      "The chapter is the idealized reference case. Later methods keep the backup logic but remove the unrealistic assumption that the full model is available."
    ],
    mentalModel: "Picture ink spreading backward from rewarding states through a grid. Each sweep lets neighboring states update their value from successor states; policy arrows rotate toward brighter successors.",
    whyNow: "Dynamic programming provides the exact Bellman machinery that sampled reinforcement learning approximates."
  },
  5: {
    promise: "By the end you can learn values and policies from complete episodes without knowing the environment model.",
    zero: [
      "Monte Carlo learning says: stop trying to average over all possible futures analytically; instead, let an episode happen and use the total reward that actually followed.",
      "The learner records visits to states or actions, waits until the episode ends, computes the return after each visit, and averages those returns into value estimates.",
      "The price is patience and variance. You do not bootstrap, so the target is an actual return, but you must wait and off-policy corrections can become unstable."
    ],
    mentalModel: "Imagine following a path through a maze and then pouring the final score backward along the visited footprints. Every footprint receives the actual outcome that followed it.",
    whyNow: "Monte Carlo methods remove model access and show how sampled experience can drive generalized policy iteration."
  },
  6: {
    promise: "By the end you can update after a single transition using temporal-difference errors and distinguish Sarsa, Q-learning, and Expected Sarsa.",
    zero: [
      "Temporal-difference learning combines two earlier ideas: sample real experience like Monte Carlo, but bootstrap from current estimates like dynamic programming.",
      "Instead of waiting for an episode to end, the agent observes one reward and one next state, builds a one-step target, and immediately updates the current value estimate.",
      "The TD error becomes a reusable learning signal: it is the difference between what just happened plus what you now expect and what you previously predicted."
    ],
    mentalModel: "Picture a moving flashlight. At each step it lights the current square and the next square; the update adjusts the current square based on the reward just seen plus the next square's brightness.",
    whyNow: "TD is the central bridge of the book and the basis for many practical control algorithms."
  },
  7: {
    promise: "By the end you can choose backup lengths between one-step TD and full Monte Carlo returns, including off-policy n-step variants.",
    zero: [
      "One-step TD updates quickly but relies heavily on current estimates. Monte Carlo waits longer but uses more actual reward. n-step methods put a slider between those extremes.",
      "A return can include several real rewards and then bootstrap from an estimate at the final step. Longer backups usually reduce bootstrap bias but increase delay and variance.",
      "Off-policy n-step methods add the complication of correcting or avoiding probability mismatch when the data policy differs from the policy being learned about."
    ],
    mentalModel: "Draw a timeline with reward beads. A one-step backup grabs one bead then a value estimate; a three-step backup grabs three beads then a value estimate; Monte Carlo grabs all remaining beads.",
    whyNow: "Backup length becomes a design axis for algorithms and prepares the eligibility-trace machinery of Chapter 12."
  },
  8: {
    promise: "By the end you can explain how models, planning, and learning combine in Dyna-style architectures, prioritized sweeping, rollouts, and search.",
    zero: [
      "A model lets the agent imagine experience. If the model predicts next states and rewards, the agent can update values from simulated transitions as well as real ones.",
      "Planning is therefore learning from internally generated experience. The same backup can be applied to a real transition or a model-generated transition; the difference is the source of the data.",
      "The chapter also teaches caution: planning with a wrong model can reinforce mistakes, so search and model learning must be tied to fresh evidence."
    ],
    mentalModel: "Picture two practice fields: the real world and a simulator. Dyna alternates between real plays and simulated drills, using the same value-update muscles on both.",
    whyNow: "This chapter closes the tabular arc by showing how sample backups, models, and decision-time search fit together."
  },
  9: {
    promise: "By the end you can replace tables with parameterized value functions and understand the objectives behind prediction with approximation.",
    zero: [
      "Tables fail when there are too many states. Function approximation solves this by representing value as a formula with weights, features, or a neural network that generalizes across states.",
      "Learning now changes parameters rather than individual table entries. The same experience can influence many states because they share features or network weights.",
      "This power brings a new question: what error is the learner minimizing, under what state distribution, and how does the update move weights in that objective landscape?"
    ],
    mentalModel: "Imagine replacing a spreadsheet with a flexible surface stretched over state space. Each sample pulls on the surface near its feature footprint, and the weights control the surface shape.",
    whyNow: "Approximation is the gateway from small tabular examples to realistic problems with large or continuous state spaces."
  },
  10: {
    promise: "By the end you can do on-policy control with approximation, including episodic and continuing average-reward formulations.",
    zero: [
      "Prediction with approximation estimates values for a fixed policy. Control uses those estimates to improve behavior while the estimates are still changing.",
      "Semi-gradient control methods update action-value parameters from sampled targets and choose actions from the same evolving policy, usually with exploration mixed in.",
      "Continuing tasks add another issue: average reward can be a better objective than discounted episodic return when there is no natural endpoint."
    ],
    mentalModel: "Picture a cyclist adjusting a balance model while actively riding. The estimates guide the ride, and the ride supplies the data that changes the estimates.",
    whyNow: "It extends the tabular control story into the approximate setting while staying on-policy to avoid the worst instability."
  },
  11: {
    promise: "By the end you can explain why off-policy learning with bootstrapping and function approximation can diverge, and how gradient/emphatic methods respond.",
    zero: [
      "The dangerous combination is known as the deadly triad: function approximation, bootstrapping, and off-policy learning. Each ingredient is useful, but together they can push value estimates away from any stable solution.",
      "The chapter shows that semi-gradient intuition can fail because the update is not necessarily descending a true objective when the data distribution and target policy do not match.",
      "Gradient-TD and emphatic methods repair parts of this story by defining learnable objectives or changing which states receive emphasis."
    ],
    mentalModel: "Imagine trying to level a wobbly table while standing on a moving floor. Off-policy data tilts the floor, bootstrapping uses the table's current tilt as a reference, and approximation ties all legs together.",
    whyNow: "This is the stability chapter: it teaches why practical off-policy approximate RL needs more than copying tabular updates."
  },
  12: {
    promise: "By the end you can understand eligibility traces and lambda-returns as efficient ways to blend many backup lengths online.",
    zero: [
      "Eligibility traces remember which states, actions, or features were recently responsible for experience. When an error arrives, credit flows backward along these fading memories.",
      "Lambda controls the blend of backup lengths. At one extreme the update resembles one-step TD; near the other it approaches Monte Carlo-style credit assignment.",
      "The chapter turns that intuition into forward views, backward views, true-online corrections, Dutch traces, and off-policy trace variants."
    ],
    mentalModel: "Picture footprints fading behind the agent. A surprise reward or TD error splashes paint backward, and fresher footprints receive more color than older ones.",
    whyNow: "Traces make multi-step learning computationally practical and connect earlier n-step ideas to online algorithms."
  },
  13: {
    promise: "By the end you can optimize a parameterized policy directly using gradients, baselines, actor-critic methods, and continuous-action distributions.",
    zero: [
      "Value-based methods often learn what actions are good and then choose greedily or epsilon-greedily. Policy-gradient methods instead parameterize the policy itself and adjust its probabilities toward actions that produced good returns.",
      "The core trick is the score-function gradient: increase the log-probability of sampled actions in proportion to how much better their outcomes were than a baseline.",
      "Actor-critic methods combine a policy learner, the actor, with a value learner, the critic, that supplies lower-variance learning signals."
    ],
    mentalModel: "Imagine action probabilities as sliders on a mixing board. A good episode nudges the sliders that produced it upward; a baseline prevents every merely average outcome from sounding like proof.",
    whyNow: "Direct policy optimization is essential for stochastic policies, continuous actions, and many modern deep RL systems."
  },
  14: {
    promise: "By the end you can connect RL prediction and control ideas to classical conditioning, instrumental conditioning, habits, and cognitive maps.",
    zero: [
      "The algorithms are not just engineering tools; they also resemble learning patterns studied in psychology. Prediction errors, cues, actions, and delayed reinforcement all have behavioral interpretations.",
      "Classical conditioning focuses on prediction: cues come to forecast future outcomes. Instrumental conditioning focuses on action: behavior changes because consequences depend on what is done.",
      "The chapter uses RL vocabulary to organize these phenomena without claiming that every biological detail is captured by a simple algorithm."
    ],
    mentalModel: "Picture two learning loops side by side: one learns that a bell predicts food; the other learns that pressing a lever changes the chance of food. RL supplies equations for both kinds of adaptation.",
    whyNow: "It broadens the reader from algorithms as code to algorithms as models of adaptive behavior."
  },
  15: {
    promise: "By the end you can explain why dopamine responses are often interpreted as reward-prediction errors and how RL ideas map onto neural learning hypotheses.",
    zero: [
      "Neuroscience asks how biological systems might implement learning signals. A central bridge to RL is the reward-prediction error: the difference between received outcome and expected outcome.",
      "Dopamine neurons have response patterns that often shift from unexpected rewards to cues that predict rewards, resembling TD error behavior in simple conditioning tasks.",
      "The chapter explores this connection alongside actor-critic architectures, neural learning rules, addiction, and the limits of simple correspondences."
    ],
    mentalModel: "Imagine the brain carrying a surprise meter. At first reward itself spikes surprise; after learning, the predictive cue spikes surprise; when an expected reward is omitted, surprise dips below baseline.",
    whyNow: "It shows how a mathematical learning signal can become a hypothesis about biological credit assignment."
  },
  16: {
    promise: "By the end you can read major RL applications as combinations of representation, search, self-play, function approximation, and reward design.",
    zero: [
      "Applications show RL under engineering pressure. The question is no longer only whether an update is correct; it is how representation, compute, simulation, search, and objectives combine in working systems.",
      "Game systems such as TD-Gammon, checkers, Atari, and Go demonstrate different mixes of value learning, self-play, neural networks, and planning.",
      "Other applications, such as personalization or thermal soaring, remind us that real deployments depend on interaction data, constraints, and carefully chosen reward signals."
    ],
    mentalModel: "Picture a toolbox wall. Each application takes different tools: value functions, policies, search trees, simulators, features, neural networks, self-play, and domain-specific rewards.",
    whyNow: "After the algorithmic chapters, applications demonstrate how the abstractions become systems."
  },
  17: {
    promise: "By the end you can discuss the book's frontier ideas: auxiliary predictions, options, state construction, reward design, and open problems for intelligent agents.",
    zero: [
      "The final chapter asks what remains when the standard algorithm menu is not enough. Intelligent agents may need many predictions, temporal abstractions, constructed state representations, and robust reward designs.",
      "General value functions extend prediction beyond the main reward; options let policies operate over extended time; state construction asks what information the agent should remember or represent.",
      "The chapter is a research compass: it identifies the design questions that determine whether RL scales into broader intelligence."
    ],
    mentalModel: "Picture the agent becoming a scientist inside its world: it asks many predictive questions, builds reusable skills, compresses observations into state, and tests whether its rewards point at the intended behavior.",
    whyNow: "It turns the completed course into a map of open problems and reusable abstractions."
  }
};

export function standaloneLectureForChapter(chapter: Chapter): StandaloneChapterLecture {
  const deep = chapterDeepDives[chapter.n];
  const scaffold = scaffolds[chapter.n];
  const algorithms = algorithmsForChapter(chapter.n);
  const formulas = formulaAtlas.filter((formula) => formula.chapter === chapter.n);
  const previous = chapters.find((item) => item.n === chapter.n - 1);
  const next = chapters.find((item) => item.n === chapter.n + 1);

  const sectionDetails = deep?.sectionDetails ?? chapter.sections.map((section): SectionDeepDive => ({
    section,
    easy: chapter.easy,
    technical: chapter.technical,
    details: chapter.keyIdeas,
    terms: [...chapter.equations, ...chapter.algorithms].slice(0, 4),
  }));

  return {
    n: chapter.n,
    promise: scaffold.promise,
    startFromZero: scaffold.zero,
    mentalModel: scaffold.mentalModel,
    whyNow: scaffold.whyNow,
    learningContract: [
      `Problem you should be able to name: ${chapter.claim}`,
      `Plain-language story you should be able to teach: ${chapter.easy}`,
      `Technical object you should be able to manipulate: ${chapter.technical}`,
      algorithms.length ? `Algorithmic machinery introduced here: ${algorithms.slice(0, 5).map((algorithm) => algorithm.name).join("; ")}${algorithms.length > 5 ? "; ..." : ""}.` : "This chapter is mostly conceptual; the output is a clean modeling vocabulary rather than a new numeric update.",
      formulas.length ? `Formal expressions to read slowly: ${formulas.slice(0, 4).map((formula) => formula.label).join("; ")}${formulas.length > 4 ? "; ..." : ""}.` : "The formulas in this chapter are definitions or setup tools rather than a long derivation chain.",
    ],
    vocabulary: vocabularyForChapter(chapter, sectionDetails),
    beats: sectionDetails.map((section, index) => lectureBeat(chapter, section, index)),
    handsOnSequence: handsOnSequence(chapter, algorithms.length, formulas.length),
    technicalFinish: [
      previous ? `Connect backward: Chapter ${previous.n} (${previous.title}) supplies this prerequisite idea: ${previous.bridge}` : "Connect backward: this is the entry point, so build the agent/environment/reward vocabulary carefully before moving on.",
      `State the chapter's formal contribution without examples: ${chapter.technical}`,
      algorithms.length ? `For each algorithm card in this chapter, identify the data it consumes, the target it constructs, the update it applies, and the failure mode that would invalidate it.` : "For each concept in this chapter, identify the modeling boundary, the quantity being predicted or optimized, and the assumption that would break it.",
      formulas.length ? `For each formula card, say what is random, what is conditioned on, what is estimated, and what would be different under another policy or representation.` : "Translate every definition into a drawing before memorizing notation.",
    ],
    completionStandard: `You are done with Chapter ${chapter.n} when you can explain every section below to a beginner, then switch registers and write the technical object, update target, or modeling assumption it corresponds to.`,
    nextChapterBridge: next ? `Next, Chapter ${next.n} (${next.title}) uses this chapter as follows: ${chapter.bridge}` : "This is the final bridge: use the chapter as a checklist for future RL systems you design or read about.",
  };
}

export function standaloneLectureTileCount(): number {
  return chapters.reduce((sum, chapter) => sum + standaloneLectureForChapter(chapter).beats.length, 0);
}

function vocabularyForChapter(chapter: Chapter, sectionDetails: SectionDeepDive[]): StandaloneVocabularyItem[] {
  const mentioned = new Set(sectionDetails.flatMap((section) => section.terms).map(normalize));
  const chapterTerms = terms.filter((term) => termAppearsInChapter(term, chapter.n));
  const sectionTerms = terms.filter((term) => mentioned.has(normalize(term.name)) || mentioned.has(normalize(term.id)) || mentioned.has(normalize(term.sym)));
  const merged = uniqueTerms([...chapterTerms, ...sectionTerms]).slice(0, 8);
  if (merged.length) return merged.map(vocabularyItem);

  return chapter.keyIdeas.slice(0, 6).map((idea) => ({
    name: idea,
    plain: `The beginner handle for this chapter idea is: ${idea}.`,
    technical: `Use it to unpack Chapter ${chapter.n}'s technical story: ${chapter.technical}`,
    why: `It appears because the chapter's goal is ${chapter.claim}`,
  }));
}

function vocabularyItem(term: Term): StandaloneVocabularyItem {
  return {
    name: term.name,
    plain: term.plain,
    technical: term.precise,
    why: term.why,
  };
}

function uniqueTerms(input: Term[]): Term[] {
  const seen = new Set<string>();
  const output: Term[] = [];
  for (const term of input) {
    if (seen.has(term.id)) continue;
    seen.add(term.id);
    output.push(term);
  }
  return output;
}

function lectureBeat(chapter: Chapter, section: SectionDeepDive, index: number): StandaloneLectureBeat {
  const termsText = section.terms.length ? section.terms.join(", ") : "the chapter vocabulary";
  const firstDetail = section.details[0] ?? section.easy;
  const visual = visualForSection(section, chapter);
  return {
    section: section.section,
    question: questionForSection(section, chapter),
    fromScratch: `If this is your first exposure, read the section as answering one small question inside Chapter ${chapter.n}: ${section.easy} In ordinary language, this means you should be able to point to the learner, the information it has, the choice or estimate being changed, and the feedback that tells it whether the change helped.`,
    visualLecture: visual,
    technicalBuild: `${section.technical} The technical move is not isolated: it connects to the chapter's main claim, "${chapter.claim}", and uses ${termsText} as the vocabulary for saying the idea precisely.`,
    boardWork: [
      `Write the section title in the center: ${section.section}. Under it, write the beginner sentence: ${section.easy}`,
      `Draw the picture: ${visual}`,
      `Translate the picture into symbols or implementation objects: ${section.technical}`,
      ...section.details.slice(0, 3).map((detail) => `Check the detail: ${detail}`),
      `Close the board by saying how this section changes your answer to the chapter question: ${chapter.claim}`,
    ],
    checkpoint: `Move on when you can explain why this statement is true without rereading it: ${firstDetail}`,
    terms: section.terms,
  };
}

function questionForSection(section: SectionDeepDive, chapter: Chapter): string {
  const title = section.section.replace(/^\d+(?:\.\d+)*\s*/, "");
  if (/summary/i.test(title)) return `How do the pieces of Chapter ${chapter.n} fit into one reusable method?`;
  if (/example|testbed|application|game|go|gammon|checkers|soaring|services/i.test(title)) return `What does ${title} demonstrate that definitions alone would hide?`;
  if (/policy|control|improvement|actor|option/i.test(title)) return `How does ${title} change the agent's behavior, not just its predictions?`;
  if (/value|return|reward|bellman|td|lambda|gradient|error/i.test(title)) return `What quantity is ${title} trying to estimate, optimize, or use as an error signal?`;
  if (/model|planning|search|rollout|mcts/i.test(title)) return `How does ${title} let the agent use imagined or structured experience?`;
  return `What new ingredient does ${title} add to the chapter's learning story?`;
}

function visualForSection(section: SectionDeepDive, chapter: Chapter): string {
  const haystack = `${section.section} ${section.easy} ${section.technical} ${section.terms.join(" ")}`.toLowerCase();
  if (/bandit|arm|ucb|optimistic|preference/.test(haystack)) return "draw action arms as bars; the bar height is current estimated reward and the glow around each bar is uncertainty or exploration pressure.";
  if (/bellman|dynamic programming|backup|policy evaluation|value iteration/.test(haystack)) return "draw states as circles connected by arrows; a backup pulls reward and successor-value information backward through the arrows.";
  if (/monte carlo|episode|return|importance/.test(haystack)) return "draw one full episode as a path of footprints; after the terminal outcome, pour the realized return backward onto the visited footprints.";
  if (/td|sarsa|q-learning|expected|double/.test(haystack)) return "draw two adjacent time steps; the current estimate is corrected by reward plus the next estimate, producing a visible TD-error arrow.";
  if (/n-step|tree backup|sigma/.test(haystack)) return "draw a timeline with a movable bracket; the bracket length controls how many real rewards are included before bootstrapping.";
  if (/model|planning|dyna|search|rollout|mcts/.test(haystack)) return "draw a real environment beside a simulator; arrows from both feed the same update box, but simulated arrows carry a model-trust warning.";
  if (/approximation|feature|weight|gradient|neural|linear/.test(haystack)) return "draw a smooth surface over many states; each sample tugs on shared weights that reshape nearby predictions together.";
  if (/off-policy|emphatic|deadly|divergence/.test(haystack)) return "draw two colored policies walking different paths; the learner must correct for data coming from one path while judging another.";
  if (/trace|lambda|eligibility|dutch/.test(haystack)) return "draw fading footprints behind the agent; a new TD error sends credit backward with brightness controlled by lambda and recency.";
  if (/policy gradient|reinforce|actor|critic|continuous/.test(haystack)) return "draw action probabilities as sliders; returns or advantages push the sampled-action slider up or down while a critic stabilizes the movement.";
  if (/conditioning|dopamine|neural|reward-prediction|habit|cognitive/.test(haystack)) return "draw a surprise meter that moves from reward time to cue time as prediction improves, linking behavior to error signals.";
  if (/option|gvf|state|reward signal|future/.test(haystack)) return "draw an agent with extra internal dashboards: one for many predictions, one for reusable skills, one for state construction, and one for reward checks.";
  return `draw Chapter ${chapter.n} as a layered board: beginner story on the left, formal object in the center, and implementation consequence on the right.`;
}

function handsOnSequence(chapter: Chapter, algorithmCount: number, formulaCount: number): string[] {
  return [
    `First pass: cover the technical text and say Chapter ${chapter.n}'s easy story aloud: ${chapter.easy}`,
    `Second pass: open each section beat and redraw the visual metaphor in your own notation; do not move on until the picture makes the technical sentence feel inevitable.`,
    algorithmCount ? `Third pass: for each of the ${algorithmCount} algorithm cards, identify the data stream, target, update rule, exploration/control decision, and failure mode.` : "Third pass: turn the conceptual vocabulary into a concrete RL problem statement with agent, environment, actions, rewards, observations, and objective.",
    formulaCount ? `Fourth pass: for each of the ${formulaCount} formula cards, name every symbol, the conditioning information, and whether the expression is a definition, target, objective, or update.` : "Fourth pass: convert every definition into a tiny example with made-up numbers or states.",
    "Final pass: answer the self-checks without looking, then teach the chapter to an imaginary beginner before switching to the technical version.",
  ];
}

function normalize(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "").trim();
}

function termAppearsInChapter(term: Term, chapterNumber: number) {
  const ranges = term.appears.match(/\d+(?:-\d+)?/g) ?? [];
  return ranges.some((range) => {
    const [start, end = start] = range.split("-").map(Number);
    return chapterNumber >= start && chapterNumber <= end;
  });
}

import { formulaAtlas, type FormulaNote } from "@/lib/formulaAtlas";

export const symbolLectureModes = ["plain", "technical", "formula", "pitfall", "check"] as const;

export type SymbolLectureMode = (typeof symbolLectureModes)[number];

export interface SymbolCard {
  id: string;
  chapter: number;
  symbol: string;
  spokenAs: string;
  family: string;
  role: string;
  plain: string;
  technical: string;
  formulaLabels: string[];
  formulaTex: string[];
  pitfall: string;
  selfCheck: string;
  tags: string[];
}

let cachedCards: SymbolCard[] | undefined;

export function allSymbolCards(): SymbolCard[] {
  cachedCards ??= buildSymbolCards(formulaAtlas);
  return cachedCards;
}

export function symbolCardsForChapter(chapter: number): SymbolCard[] {
  return allSymbolCards().filter((card) => card.chapter === chapter);
}

export function symbolCardCount(chapter?: number): number {
  return typeof chapter === "number" ? symbolCardsForChapter(chapter).length : allSymbolCards().length;
}

export function symbolLectureModeCount(chapter?: number): number {
  return symbolCardCount(chapter) * symbolLectureModes.length;
}

export function uniqueSymbolCount(): number {
  return new Set(allSymbolCards().map((card) => card.symbol)).size;
}

export function symbolChapterCount(): number {
  return new Set(allSymbolCards().map((card) => card.chapter)).size;
}

function buildSymbolCards(formulas: FormulaNote[]): SymbolCard[] {
  const grouped = new Map<string, { chapter: number; symbol: string; formulas: FormulaNote[] }>();

  for (const formula of formulas) {
    for (const symbol of formula.symbols) {
      const key = `${formula.chapter}::${symbol}`;
      const entry = grouped.get(key) ?? { chapter: formula.chapter, symbol, formulas: [] };
      entry.formulas.push(formula);
      grouped.set(key, entry);
    }
  }

  return Array.from(grouped.values())
    .sort((a, b) => a.chapter - b.chapter || a.symbol.localeCompare(b.symbol))
    .map(({ chapter, symbol, formulas }) => {
      const guide = guideForSymbol(symbol, formulas, chapter);
      const families = unique(formulas.map((formula) => formula.family));
      const labels = unique(formulas.map((formula) => formula.label));
      return {
        id: `chapter-${chapter}-symbol-${slug(symbol)}`,
        chapter,
        symbol,
        spokenAs: guide.spokenAs,
        family: families.join(" / "),
        role: guide.role,
        plain: guide.plain,
        technical: guide.technical,
        formulaLabels: labels,
        formulaTex: unique(formulas.map((formula) => formula.tex)),
        pitfall: guide.pitfall,
        selfCheck: guide.selfCheck,
        tags: compactTags(["symbol", `Chapter ${chapter}`, guide.kind, ...families, ...labels]),
      } satisfies SymbolCard;
    });
}

function guideForSymbol(symbol: string, formulas: FormulaNote[], chapter: number) {
  const context = formulas[0];
  const labels = formulas.map((formula) => formula.label).join(", ");
  const formulaUse = context.useWhen.toLowerCase();
  const fallback = {
    spokenAs: cleanSpoken(symbol),
    kind: "notation",
    role: `A chapter-${chapter} notation handle used in ${labels}.`,
    plain: `${cleanSpoken(symbol)} is a compact label used by this chapter's formulas so a repeated idea can be named instead of explained from scratch every time.`,
    technical: `Within ${labels}, ${symbol} participates in the chapter's formal update or definition. Read it with the formula's conditions, policy/model assumptions, and target quantity before using it algebraically.`,
    pitfall: `Do not memorize ${symbol} as a free-floating mark; its meaning is fixed by the chapter, the formula family, and the conditioning variables around it.`,
    selfCheck: `Point to ${symbol} in the formula and say what object it names, what changes it, and what would be wrong if you replaced it with a similar-looking quantity.`,
  };

  const exact: Record<string, typeof fallback> = {
    "G_t": guide("return G at time t", "return", "the scorecard from time t onward", "Add the future rewards that matter for the decision being judged.", "A random return target indexed by time; prediction methods estimate its expectation and control methods try to make its distribution better under the policy.", "Do not treat it as the next reward only; it is a multi-step discounted or episodic sum.", "What rewards are inside G_t, and where does discounting enter?"),
    "R_{t+1}": guide("reward after time t", "reward", "the next feedback signal", "The immediate feedback received after an action changes the situation.", "A scalar sample emitted by the environment transition after S_t,A_t; it is one term inside return and backup targets.", "Do not confuse immediate reward with long-run value or return.", "Which event produced R_{t+1}, and is it already discounted?"),
    "R_n": guide("reward sample n", "reward", "one observed bandit payoff", "The payoff from the nth action pull or trial.", "A sampled reward used to update an empirical action-value estimate in incremental bandit formulas.", "Do not average rewards from different action distributions unless the estimator accounts for that change.", "Which action produced R_n and which estimate is it updating?"),
    "R_t": guide("reward at time t", "reward", "the time-indexed feedback sample", "The reward signal observed at a particular step.", "A reward random variable in continuing or average-reward notation; its centering may depend on the chapter objective.", "Do not assume the time index convention matches every formula; check whether reward follows action t or precedes state t.", "What time step does this reward belong to in the displayed update?"),
    "r_t": guide("realized reward at time t", "reward", "the observed reward number", "The actual reward observed at this moment.", "A lowercase realized reward used in conditioning/neuroscience formulas, often inside a TD-error timing hypothesis.", "Do not reduce it to pleasure; in TD models it is an input to a prediction-error equation.", "What prediction is r_t being compared against?"),
    "r": guide("reward outcome", "reward", "the reward part of a model outcome", "One possible reward the world can return after a state-action choice.", "A reward value in the transition distribution p(s',r|s,a), paired with a possible next state.", "Do not separate the reward model from the next-state model when the formula joins them.", "Which state-action choice makes this r possible?"),
    "\\gamma": guide("gamma discount", "discount", "the future-reward volume knob", "A number that decides how much future rewards matter now.", "The discount factor controlling contraction, horizon length, return weighting, and in some chapters termination-like weighting.", "Gamma is not a learning rate; it changes the target, not merely the update speed.", "If gamma shrinks, what happens to far-future rewards?"),
    "\\gamma_t": guide("time-varying gamma", "discount", "a horizon choice that can change over time", "A step-specific future-weight switch.", "A possibly state/question-dependent discount or continuation signal in generalized value functions.", "Do not assume it is the same constant gamma from early chapters.", "What future signal stops mattering when gamma_t is small or zero?"),
    "v_\\pi": guide("value under policy pi", "value", "how good a state is under a specific way of acting", "The long-run goodness of a state if the agent follows policy pi.", "The policy-conditioned state-value function, defined as an expected return and changed whenever the policy changes.", "Dropping the policy subscript hides the most important condition: whose behavior is being evaluated.", "If pi changes, why can v_pi change even in the same MDP?"),
    "v_*": guide("optimal state value", "value", "the best possible state score", "The value a state would have if the agent acted optimally from there onward.", "The fixed point of the Bellman optimality operator for state values when the model/representation supports exact optimality.", "Do not claim v_* is known just because an algorithm estimates something called value.", "What maximization makes v_* different from v_pi?"),
    "v(s)": guide("value of state s", "value", "a prediction attached to a state", "A question-specific prediction for state s.", "A state-value function notation used in generalized prediction contexts; the cumulant, policy, and discount define what is predicted.", "Do not assume reward is the cumulant unless the chapter says so.", "What question is this v(s) answering?"),
    "q_\\pi": guide("action value under policy pi", "action value", "how good an action is before following pi", "The long-run goodness of choosing an action in a state, then continuing with policy pi.", "The policy-conditioned action-value function, useful for comparing actions without one-step model lookahead.", "Do not read q_pi as an optimal action value unless the star or max condition appears.", "What happens after the first action in q_pi(s,a)?"),
    "Q": guide("action-value estimate Q", "action value", "the table or function of action scores", "The agent's current guess about how good choices are.", "An estimated action-value object updated by TD, Sarsa, Q-learning, or related control rules.", "Do not treat Q as ground truth; it is an estimate whose target and policy relation matter.", "Is this Q evaluating the behavior policy, target policy, or greedy target?"),
    "Q_n": guide("Q estimate after n samples", "action value", "the running action score", "The current estimate before the next sample-average update.", "A bandit estimate indexed by observation count n, updated by an error-correction step.", "The n index is a count, not an environment state.", "What new reward will move Q_n to Q_{n+1}?"),
    "Q_t(a)": guide("Q at time t for action a", "action value", "the current score for action a", "The action's estimated payoff at the current decision time.", "A time-indexed action-value estimate used with uncertainty bonuses or action selection rules.", "Do not confuse Q_t(a) with the true value q_*(a).", "How does the action count affect confidence in Q_t(a)?"),
    "\\alpha": guide("alpha step-size", "step size", "how far the estimate moves", "The learning knob that says how much a new error changes the old estimate.", "The scalar step-size or learning rate multiplying an error term in incremental updates.", "Alpha is not the discount; it changes update speed/noise, not the definition of future return.", "If alpha doubles, what part of the update doubles?"),
    "1/n": guide("one over n average weight", "step size", "the shrinking sample-average step", "The nth sample gets one-over-n influence in a running average.", "The exact incremental-mean step-size for stationary sample averages.", "It adapts too slowly when the reward process drifts.", "Why does the first sample matter more than the hundredth?"),
    "c": guide("confidence/exploration constant", "exploration", "the optimism bonus knob", "A knob that controls how much uncertainty can pull the agent toward under-tested actions.", "In UCB-style selection c scales the count-based confidence bonus added to estimated value.", "This c is not the cumulant c_t used in GVFs.", "What happens if c is set to zero?"),
    "c_t": guide("cumulant c at time t", "cumulant", "the signal a GVF predicts", "The thing being predicted, which may be reward or some other future signal.", "The time-indexed cumulant in a generalized value function question, paired with a policy and continuation/discount rule.", "Do not assume every GVF predicts reward; c_t names the chosen signal.", "What real-world signal would you choose as c_t for this prediction?"),
    "N_t(a)": guide("count of action a", "count", "how often action a has been tried", "A memory of action experience used to judge uncertainty.", "The time-indexed action count inside an exploration bonus denominator.", "Zero counts require special handling before division.", "Why does a small N_t(a) increase the UCB bonus?"),
    "H_t(a)": guide("preference for action a", "policy preference", "a learned action liking before probabilities", "A score that is turned into a probability, not a value estimate of reward by itself.", "A parameter-like action preference in gradient-bandit softmax action selection.", "Only differences among preferences matter; adding a constant to all preferences changes nothing.", "How does softmax turn H_t(a) into an action probability?"),
    "\\Pr\\{A_t=a\\}": guide("probability action A_t equals a", "probability", "the chance of choosing action a", "The policy's probability of selecting a particular action now.", "A stochastic action-selection probability, often produced by softmax over preferences.", "Do not treat the chosen action and its probability as the same object.", "If this probability rises, what should happen to other action probabilities?"),
    "p": guide("transition probability model", "model", "the world's one-step reply rule", "A probability rule for what next state and reward can follow a choice.", "The finite-MDP dynamics distribution p(s',r|s,a), used by Bellman equations and dynamic programming backups.", "Do not omit rewards from the model; p covers next states and rewards together.", "What four variables appear in p(s',r|s,a)?"),
    "P": guide("model transition matrix or probability", "model", "the predicted next-state movement", "A compact model object for how states transition.", "A transition-probability object used in planning/model-based formulas, often paired with reward predictions.", "Do not confuse P the model with pi the policy.", "Does P describe the environment, the agent's behavior, or both through a policy?"),
    "Model": guide("learned or known model", "model", "the agent's internal world simulator", "A way to predict what would happen after a state-action choice.", "A transition/reward approximation used for planning updates, simulated experience, or Dyna-style backups.", "A model can be wrong; planning with it can amplify model bias.", "What data trained or defined this model?"),
    "s": guide("state s", "state", "one situation label", "A compact description of the situation the agent uses for decision making.", "A state argument in value, model, and Bellman expressions; it should contain enough information for the assumed Markov property.", "A state is not necessarily the raw world; it is the representation supplied to the agent.", "What information must be in s for the next-step model to work?"),
    "s'": guide("next state s prime", "next state", "a possible next situation", "The state that might come after taking action a in state s.", "A successor-state variable summed or sampled inside one-step dynamics and Bellman backups.", "Do not read s' as a derivative; here prime means next candidate state.", "Which current state-action pair leads to this s'?"),
    "S_t": guide("state at time t", "state", "the random state now", "The situation observed at time t before or around the action choice.", "A random variable for the time-indexed state in trajectory notation.", "Capital S_t is a random variable; lowercase s is a particular value it can take.", "What particular lowercase state did S_t realize in the example?"),
    "A_t": guide("action at time t", "action", "the chosen move now", "The action selected at time t.", "A random variable for the time-indexed action in trajectory notation, usually sampled from a policy conditioned on S_t.", "Do not confuse A_t with an action set; it is the selected action variable.", "Which policy or rule produced A_t?"),
    "A_{t+1}": guide("next action", "action", "the action chosen after the next state", "The next chosen move, important when the update follows the behavior trajectory.", "The next time-indexed action used by on-policy TD control targets such as Sarsa.", "Using A_{t+1} means the update depends on what the policy actually does next.", "Why does Sarsa include A_{t+1} while Q-learning uses a max?"),
    "a": guide("action a", "action", "one candidate move", "A possible choice available to the agent.", "An action argument in policy, value, or model functions; Bellman sums/maximizations range over such actions.", "Do not assume every state has the same legal actions unless the environment says so.", "Is a being evaluated, sampled, or maximized over here?"),
    "\\max_a": guide("maximize over actions", "optimization", "choose the best action by the current score", "Look across actions and keep the one with the largest backed-up value.", "The optimality operator's action maximization, replacing policy averaging with greedy selection.", "A max over estimates can introduce overestimation when estimates are noisy.", "What action set is the max ranging over?"),
    "v_k": guide("value estimate at iteration k", "iteration", "the old value table for a sweep", "The current table before the next dynamic-programming refresh.", "The kth iterate in policy evaluation or value iteration, appearing on the right side of the backup.", "k counts algorithm iterations, not environment time.", "What makes v_{k+1} different from v_k?"),
    "v_{k+1}": guide("next value iterate", "iteration", "the refreshed value table", "The new value estimate after applying one backup step.", "The updated value iterate produced by a Bellman expectation or optimality backup.", "Do not assume one update is convergence; many sweeps may be required.", "Which backup produced v_{k+1}?"),
    "\\pi": guide("policy pi", "policy", "the agent's way of choosing actions", "A rule that says what the agent tends to do in each state.", "A mapping or distribution over actions conditioned on states; it defines evaluation expectations and behavior/target distinctions.", "The policy is not the value function; it generates behavior that values evaluate.", "What action probabilities does pi assign in this state?"),
    "\\pi'": guide("improved policy pi prime", "policy", "the next policy after improvement", "A changed behavior rule chosen after looking at current values.", "A policy produced by greedy or near-greedy improvement with respect to q_pi or another evaluation object.", "Improvement claims require the evaluation object to match the assumptions of the theorem.", "What evidence says pi prime is no worse than pi?"),
    "\\pi_k": guide("policy at iteration k", "policy", "the current policy in an improvement loop", "The policy version before the next self-play/search improvement step.", "A policy iterate in application systems that repeatedly generate data, improve/search, and train a new policy.", "This is schematic notation, not a guaranteed exact policy-improvement theorem by itself.", "What data or search process turns pi_k into pi_{k+1}?"),
    "b": guide("behavior policy b", "behavior policy", "the policy that generated the data", "The policy actually used to collect experience.", "The behavior policy in off-policy learning, contrasted with target policy pi and appearing in importance-sampling denominators.", "Do not evaluate pi from b data without correcting or otherwise accounting for the mismatch.", "Which actions are likely under b but not under pi?"),
    "b(S_t)": guide("baseline at state S_t", "baseline", "a comparison value used to reduce noise", "A reference number subtracted so gradient estimates wobble less.", "A state-dependent baseline in policy-gradient estimators; it can reduce variance without biasing the gradient when used correctly.", "The baseline should not change the expected gradient direction by depending on the sampled action improperly.", "Why can subtracting b(S_t) leave the policy gradient unbiased?"),
    "\\rho": guide("importance-sampling ratio", "off-policy correction", "how much more the target policy liked this trajectory", "A weight that corrects data collected under one policy for another policy.", "A likelihood ratio or product of target-policy probabilities over behavior-policy probabilities.", "Products of ratios can explode, vanish, or create high variance.", "Which policy is in the numerator and which is in the denominator?"),
    "\\rho_i": guide("importance weight for sample i", "off-policy correction", "one episode's correction weight", "The correction weight attached to one sampled return.", "A sample-level importance weight in ordinary or weighted off-policy Monte Carlo estimation.", "If all weights are zero, a weighted estimate needs a convention.", "What trajectory produced rho_i and G_i?"),
    "G_i": guide("return sample i", "return", "one observed return in a dataset", "The return measured from one sampled episode or occurrence.", "A sample return paired with an importance weight in off-policy Monte Carlo estimators.", "Do not compare G_i values without knowing their start state and policy correction.", "What start condition and policy weight belong to this G_i?"),
    "\\delta_t": guide("TD error delta", "prediction error", "surprise in one update", "How wrong the old prediction was after seeing reward plus the next prediction.", "The temporal-difference error, a bootstrapped residual that drives TD prediction/control updates and reward-prediction-error models.", "Delta is not automatically good or bad reward; it is signed prediction surprise.", "Which target minus old estimate makes this delta?"),
    "V": guide("state-value estimate V", "value", "the current state-score table or function", "The agent's current estimate of state goodness.", "A state-value estimator, table, or function used inside TD, MC, and dynamic-programming targets.", "V may be an approximation, not an exact expectation.", "What target is this V being moved toward?"),
    "V(S_t)": guide("value estimate at current state", "value", "the current state's predicted score", "The predicted future score attached to the state just visited.", "A state-value estimate evaluated at the random state S_t, often corrected toward a return or bootstrapped target.", "Do not confuse V(S_t) with the actual return that follows.", "What observed target updates V(S_t)?"),
    "V(S_{t+n})": guide("value after n steps", "bootstrap value", "the estimated score at the n-step landing state", "After n real rewards, use a value estimate for the rest of the future.", "The bootstrapping tail in an n-step return target.", "If the episode ended before t+n, this term may disappear.", "Where does sampling stop and bootstrapping begin?"),
    "V(t)": guide("value prediction at time t", "prediction", "the expected future signal at a time point", "A prediction about future reward/signal from a moment in a conditioning timeline.", "A time-indexed value prediction used in TD-error timing accounts of dopamine-like signals.", "Do not confuse time t with a state label unless the model defines time as state.", "What cue or time point does V(t) predict from?"),
    "V_i": guide("associative strength of cue i", "association", "how strongly cue i predicts the outcome", "A learned strength for one cue in a conditioning model.", "A cue-specific associative value updated by prediction error in Rescorla-Wagner style learning.", "It is not a full RL state-value function unless the model is extended temporally.", "Which cue owns V_i?"),
    "n": guide("n-step horizon", "horizon", "how many real rewards to wait before bootstrapping", "The number of steps included before a value estimate fills in the rest.", "An integer horizon controlling the bias-variance position of n-step targets.", "Bigger n is not always better; variance and delay increase.", "What happens when n=1 and when n reaches episode end?"),
    "G_{t:t+n}": guide("n-step return", "return", "a return cut after n steps", "A target that uses n observed rewards and then a value estimate.", "The n-step bootstrapped return balancing sampling depth against bootstrapping bias.", "Do not mix up the time interval with multiplication; t:t+n names the target window.", "Which rewards and bootstrap term are inside this target?"),
    "\\mathbf{w}": guide("weight vector w", "function approximation", "the parameters of the value function", "The adjustable knobs of a learned prediction function.", "A parameter vector for linear or differentiable value approximation.", "Changing w changes predictions for many states at once, not just one table cell.", "Which features does w multiply?"),
    "\\mathbf{x}(s)": guide("feature vector x of state s", "features", "the numeric description of state s", "A list of numbers the approximator uses to represent a state.", "A feature vector mapping raw state to the inputs of a linear or nonlinear value function.", "Bad features can make even a correct update learn the wrong generalization.", "What information from s is encoded in x(s)?"),
    "\\hat v": guide("approximate value v hat", "function approximation", "the value predicted by an approximator", "A learned approximation instead of an exact table value.", "A parameterized estimate of a value function, typically written with weights and features.", "The hat signals approximation error may remain even with much data.", "What parameters make this v-hat prediction?"),
    "\\nabla\\hat v": guide("gradient of approximate value", "gradient", "how the prediction changes with parameters", "The direction that says which knobs affect the value estimate.", "The derivative of the value approximator with respect to its parameters, used in semi-gradient updates.", "Semi-gradient methods ignore some target dependencies on the parameters.", "Which parameters is this gradient taken with respect to?"),
    "\\hat q": guide("approximate action value q hat", "function approximation", "an approximated action score", "A learned function's estimate for how good an action is in a state.", "A parameterized action-value estimate used when tabular q-values are too large or continuous.", "Approximation plus bootstrapping plus off-policy data can be unstable.", "What state-action features feed q-hat?"),
    "r(\\pi)": guide("average reward under policy pi", "average reward", "the long-run reward rate", "The ongoing reward per time step when following policy pi.", "The continuing-task average reward objective used instead of discounted return.", "Do not combine average reward and discounted return assumptions without checking the objective.", "Over a long run, what reward rate does pi achieve?"),
    "h": guide("differential value h", "average reward", "relative state value", "How much better a state is than the long-run average baseline.", "A bias/differential value function in average-reward formulations, measuring transient advantage relative to average reward.", "It is not the same as discounted return value.", "What baseline is h measured against?"),
    "\\bar R": guide("average reward estimate", "average reward", "the learned long-run reward baseline", "The agent's estimate of typical reward per step.", "An estimate of the continuing-task average reward used to center TD errors.", "If bar R is wrong, differential-value updates can be systematically shifted.", "How does the TD error change when bar R increases?"),
    "\\Pi": guide("projection operator Pi", "projection", "the closest representable value shape", "A mathematical snap-to-grid step into the function class.", "The projection operator mapping a Bellman target back into the approximator's representable subspace under a weighting distribution.", "Projection depends on the norm/weighting; closest under one distribution may not be closest under another.", "What function space and weighting define this projection?"),
    "T_\\pi": guide("Bellman operator T pi", "operator", "the policy's backup transform", "Apply the policy's one-step expectation backup to a value function.", "The Bellman operator for policy pi, central to fixed-point and projected-Bellman-error analysis.", "Do not confuse the operator with one sampled TD update.", "What value function goes into T_pi and what backup comes out?"),
    "\\mu": guide("state weighting mu", "distribution", "which states count most in the error", "A weighting over states for measuring approximation error.", "A state distribution or weighting measure used in projected objectives and stability analysis.", "Changing mu changes what approximation errors are considered important.", "Which states get the largest weight under mu?"),
    "bootstrapping": guide("bootstrapping", "update property", "learning from your own current guess", "Use an existing estimate as part of the target instead of waiting for the full outcome.", "A target-construction property where an update includes estimated future value, central to TD and dynamic programming.", "Bootstrapping can reduce variance but introduces bias from current estimates.", "Where does the target contain an estimate rather than an observed reward?"),
    "off-policy": guide("off-policy", "data regime", "learning about one policy from another policy's data", "The data-collecting behavior differs from the policy being learned or evaluated.", "A policy-relation property requiring corrections, special objectives, or algorithms designed for behavior-target mismatch.", "Ignoring the mismatch can create biased estimates or instability.", "Which policy generated the data and which policy is the target?"),
    "approximation": guide("approximation", "representation", "using a function instead of a full table", "A compressed predictor replaces one exact number per state/action.", "Function approximation generalizes across states/actions through parameters or features.", "Generalization can help scale and also spread errors to unrelated states.", "What is being shared through the approximator?"),
    "\\lambda": guide("lambda trace/mixing parameter", "trace", "the knob between short and long backups", "A number that blends short bootstrapped targets with longer experience traces.", "A trace-decay or backup-mixing parameter; in conditioning contexts it may also name an outcome magnitude, so read the local formula.", "Lambda's meaning is context-sensitive; do not assume every lambda is eligibility trace decay.", "In this formula, is lambda decaying credit, mixing returns, or naming an outcome?"),
    "\\mathbf{z}_t": guide("eligibility trace vector z", "trace", "memory of recently active features", "A fading memory of which parameters deserve credit now.", "The accumulating or replacing eligibility trace vector used to assign TD error backward through recent features/states.", "Trace definitions differ across algorithms; replacing and accumulating traces are not identical.", "Which features are currently eligible for the TD error?"),
    "J(\\theta)": guide("objective J of theta", "objective", "the score the policy parameters try to improve", "A function that says how good the current policy parameters are.", "The scalar performance objective optimized by policy-gradient methods.", "The objective may be episodic return, continuing average reward, or another performance measure.", "What data estimates the gradient of J(theta)?"),
    "\\theta": guide("theta policy parameters", "parameters", "the knobs of the policy", "Numbers that control how the policy chooses actions.", "A parameter vector for a differentiable policy or actor model.", "Theta is not a state; updating theta changes future action probabilities.", "Which probability changes if theta moves in the gradient direction?"),
    "\\nabla\\pi": guide("policy gradient", "gradient", "how policy probabilities change", "The direction showing how action probabilities respond to parameter changes.", "A derivative of the policy with respect to parameters, used to build gradient estimators.", "Raw probability gradients often appear with likelihood-ratio transformations for sampling.", "Which parameter and action probability does this gradient refer to?"),
    "\\nabla\\ln\\pi": guide("score-function gradient", "gradient", "the gradient of log action probability", "A sampled action's sensitivity signal for policy-gradient learning.", "The likelihood-ratio/score-function term that turns sampled returns into an unbiased gradient estimator under suitable assumptions.", "It must be multiplied by an appropriate return/advantage signal; alone it is not the update objective.", "What return or advantage weights this log-policy gradient?"),
    "self-play": guide("self-play data", "application loop", "experience generated by playing against current or past versions", "The learner creates practice games for itself.", "A data-generation scheme where the current system produces training targets through games against itself or its variants.", "Self-play can overfit to its own ecosystem if evaluation/opponent diversity is poor.", "What opponent or search process produced the self-play data?"),
    "search": guide("search procedure", "application loop", "lookahead used to improve decisions or targets", "A planner explores possible futures before choosing or training.", "A decision-time or training-time lookahead procedure coupled to learned value/policy estimates in systems such as game agents.", "Search quality depends on model/rules, computational budget, and value guidance.", "What does search add that the raw policy does not?"),
    "\\mathcal{I}_o": guide("option initiation set", "option", "where an option is allowed to start", "The states in which a temporally extended action is available.", "The initiation set of option o in the options framework.", "An option cannot be chosen everywhere unless its initiation set says so.", "Which states belong to this option's initiation set?"),
    "\\pi_o": guide("option policy", "option", "the option's internal behavior", "The policy followed while the option is running.", "The intra-option policy that selects primitive actions until the option terminates.", "Do not confuse pi_o with the top-level policy over options.", "What primitive actions does pi_o choose?"),
    "\\beta_o": guide("option termination rule", "option", "when the option stops", "The rule that decides when control returns to the higher-level chooser.", "The termination function/probability for option o.", "Termination is part of the option definition, not an afterthought.", "In which states is beta_o high?"),
    "\\alpha_i\\beta": guide("cue-specific learning-rate product", "conditioning", "how strongly cue i updates", "A cue's update size scaled by learning and outcome factors.", "The product of cue salience/learning rate and outcome learning parameter in associative learning equations.", "The beta here is not the option termination beta_o.", "Which cue-specific factor changes the update for V_i?"),
  };

  if (exact[symbol]) return exact[symbol];
  if (symbol === "R") return guide("reward model R", "model", "the model's reward prediction", "The reward part of a learned or known model.", "A reward function/model component used with transition dynamics for planning backups.", "Do not confuse model reward R with one sampled reward R_t.", "What state-action transition does this R predict?");
  if (formulaUse.includes("rescorla") || context.family === "Conditioning") return { ...fallback, kind: "conditioning" };
  return fallback;
}

function guide(spokenAs: string, kind: string, role: string, plain: string, technical: string, pitfall: string, selfCheck: string) {
  return { spokenAs, kind, role, plain, technical, pitfall, selfCheck };
}

function cleanSpoken(symbol: string) {
  return symbol
    .replace(/\\/g, "")
    .replace(/_/g, " sub ")
    .replace(/\^/g, " to the ")
    .replace(/[{}]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function compactTags(tags: string[]) {
  return unique(tags.filter(Boolean).map((tag) => tag.trim()).filter(Boolean)).slice(0, 10);
}

function unique<T>(items: T[]) {
  return Array.from(new Set(items));
}

function slug(input: string) {
  return input
    .replace(/\\/g, "")
    .replace(/'/g, "-prime")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase() || "symbol";
}

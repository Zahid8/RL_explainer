"use client";

import { useMemo, useState, type ReactNode } from "react";
import type { FormulaNote } from "@/lib/formulaAtlas";
import { TeX } from "./Math";

const lectureModes = ["plain", "symbols", "trace", "use", "pitfall"] as const;

type LectureMode = (typeof lectureModes)[number];

const modeLabels: Record<LectureMode, string> = {
  plain: "Plain story",
  symbols: "Symbols",
  trace: "Trace it",
  use: "Use case",
  pitfall: "Pitfall",
};

export function FormulaLectureReader({ formulas, contextTitle, compact = false }: { formulas: FormulaNote[]; contextTitle: string; compact?: boolean }) {
  const [formulaIndex, setFormulaIndex] = useState(0);
  const [mode, setMode] = useState<LectureMode>("plain");
  const safeIndex = Math.min(formulaIndex, Math.max(formulas.length - 1, 0));
  const formula = formulas[safeIndex];
  const modeIndex = lectureModes.indexOf(mode);
  const geometry = useMemo(() => geometryFor(safeIndex, modeIndex), [safeIndex, modeIndex]);

  if (!formula) return null;

  return (
    <article className="formula-lecture-reader overflow-hidden rounded-xl border border-line bg-panel" data-mode={mode} data-formula={formula.label}>
      <div className="grid gap-px bg-line lg:grid-cols-[0.95fr_1.05fr]">
        <div className="bg-ink p-5 text-white lg:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2"><ReaderChip>Interactive formula lecturer</ReaderChip><ReaderChip accent="lime">{safeIndex + 1}/{formulas.length}</ReaderChip></div>
            <span className="mono rounded-full border border-white/20 px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-white/70">{modeLabels[mode]}</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-white/60">{contextTitle}</p>
          <h3 className="display mt-2 text-3xl font-medium text-white">{formula.label}</h3>
          <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.04] p-4">
            <TeX block>{formula.tex}</TeX>
          </div>

          <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.04] p-4">
            <svg viewBox="0 0 430 250" role="img" aria-label={`${formula.label} formula lecture diagram`} className="h-auto w-full">
              <defs>
                <linearGradient id={`formula-grad-${formula.chapter}-${safeIndex}-${modeIndex}`} x1="0" x2="1">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="50%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#84cc16" />
                </linearGradient>
              </defs>
              <rect x="8" y="8" width="414" height="234" rx="24" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.14)" />
              <path d={geometry.path} fill="none" stroke={`url(#formula-grad-${formula.chapter}-${safeIndex}-${modeIndex})`} strokeWidth="5" strokeLinecap="round" strokeDasharray="10 10" className="rl-dash" />
              {geometry.nodes.map((node, index) => (
                <g key={node.label}>
                  <circle cx={node.x} cy={node.y} r={index === modeIndex % geometry.nodes.length ? 28 : 23} fill={index === modeIndex % geometry.nodes.length ? "#8b5cf6" : "rgba(255,255,255,0.12)"} stroke="rgba(255,255,255,0.55)" strokeWidth="2" />
                  <text x={node.x} y={node.y + 4} textAnchor="middle" className="fill-white text-[10px] font-semibold">{node.label}</text>
                </g>
              ))}
              <foreignObject x="30" y="174" width="370" height="54">
                <div className="rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-xs leading-snug text-white/75">
                  {formula.family} • {formula.symbols.slice(0, 4).join(" • ")}
                </div>
              </foreignObject>
            </svg>
          </div>
          <p className="mt-4 rounded-lg border border-white/10 bg-white/[0.04] p-3 text-sm leading-relaxed text-white/70"><span className="text-white">Lecture control:</span> choose an equation, then move from the everyday story to symbols, trace, use case, and failure mode.</p>
        </div>

        <div className="bg-panel p-5 lg:p-6">
          <div className="grid gap-4">
            <div>
              <p className="eyebrow mb-2">Choose formula</p>
              <div className={`grid gap-2 ${compact || formulas.length > 8 ? "max-h-72 overflow-auto pr-1" : "md:grid-cols-2"}`}>
                {formulas.map((item, index) => (
                  <button key={`${item.chapter}-${item.label}`} onClick={() => setFormulaIndex(index)} className={`rounded-lg border px-3 py-2 text-left text-sm leading-snug transition ${index === safeIndex ? "border-violet bg-violet/[0.08] text-ink" : "border-line bg-white text-muted hover:border-violet hover:text-ink"}`}>
                    <span className="mono block text-[10px] uppercase tracking-[0.12em] text-dim">Ch {item.chapter} · {item.family}</span>
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="eyebrow mb-2">Lecture mode</p>
              <div className="flex flex-wrap gap-2">
                {lectureModes.map((item) => (
                  <button key={item} onClick={() => setMode(item)} className={`rounded-full border px-3 py-2 text-sm transition ${item === mode ? "border-violet bg-violet text-white" : "border-line bg-white text-muted hover:border-violet hover:text-ink"}`}>
                    {modeLabels[item]}
                  </button>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-line bg-white p-5">
              <div className="flex flex-wrap gap-2"><ReaderChip accent="blue">Ch {formula.chapter}</ReaderChip><ReaderChip>{formula.family}</ReaderChip><ReaderChip accent="lime">{modeLabels[mode]}</ReaderChip></div>
              <h4 className="display mt-3 text-3xl font-medium text-ink">{modeHeadline(mode)}</h4>
              <ModeContent formula={formula} mode={mode} />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function ModeContent({ formula, mode }: { formula: FormulaNote; mode: LectureMode }) {
  if (mode === "symbols") {
    return (
      <div className="mt-4 grid gap-3">
        {formula.symbols.map((symbol) => (
          <div key={symbol} className="rounded-lg border border-line bg-panel-2 p-3">
            <p className="mono text-[11px] text-violet"><TeX>{symbol}</TeX></p>
            <p className="mt-2 text-sm leading-relaxed text-muted">{symbolMeaning(symbol, formula)}</p>
          </div>
        ))}
      </div>
    );
  }

  if (mode === "trace") {
    return (
      <ol className="mt-4 grid gap-2 text-sm leading-relaxed text-muted">
        {traceSteps(formula).map((step, index) => <li key={step} className="flex gap-2"><span className="text-violet">{index + 1}.</span><span>{step}</span></li>)}
      </ol>
    );
  }

  const text = {
    plain: `${formula.easy} In lecture terms, read the equation as a compact board drawing: the left side names the quantity we want, and the right side explains how experience, expectation, a model, or an update supplies it.`,
    use: `${formula.useWhen} Technically, keep it beside the chapter's algorithms as the target, objective, probability rule, or diagnostic shape that tells the implementation what should be computed.`,
    pitfall: `${formula.watchOut} A good self-check is to point at every symbol, say whether it is observed, estimated, optimized, or averaged over, and then explain what would break if that symbol were changed.`,
  }[mode];

  return <p className="mt-4 text-sm leading-relaxed text-muted">{text}</p>;
}

function modeHeadline(mode: LectureMode) {
  return {
    plain: "Read the equation as a sentence.",
    symbols: "Name every moving part.",
    trace: "Walk from question to computation.",
    use: "Know when this formula becomes active.",
    pitfall: "Avoid the common wrong reading.",
  }[mode];
}

function traceSteps(formula: FormulaNote) {
  return [
    `Start with the learning question: ${formula.technical}`,
    familyTrace(formula.family),
    `Read the left side of the formula as the object being predicted, chosen, improved, or diagnosed in Chapter ${formula.chapter}.`,
    `Read the right side as the mechanism: rewards, values, probabilities, counts, features, traces, gradients, or options supply the calculation.`,
    `Finish with the plain-language check: ${formula.easy}`,
  ];
}

function familyTrace(family: string) {
  if (/problem|mdp/i.test(family)) return "Translate the environment story into state, action, reward, policy, and value quantities before doing algebra.";
  if (/bandit/i.test(family)) return "Freeze the state away, compare actions directly, and focus on how evidence changes an action estimate or preference.";
  if (/dynamic/i.test(family)) return "Assume the model is known, enumerate the possible next outcomes, and turn one-step lookahead into a table update.";
  if (/monte/i.test(family)) return "Wait for sampled returns, then use entire episodes or policy-ratio weights as the training signal.";
  if (/temporal|multi-step|trace/i.test(family)) return "Blend immediate reward with bootstrapped future estimates so the update can happen before the whole future is known.";
  if (/planning/i.test(family)) return "Use a learned or known model to rehearse updates without requiring every backup to come from fresh real interaction.";
  if (/approx/i.test(family)) return "Replace a table entry with parameters and features, then update weights in the direction suggested by the target error.";
  if (/policy/i.test(family)) return "Differentiate the policy's probability of chosen actions and weight that score by return, value, or advantage information.";
  if (/psychology|neuroscience/i.test(family)) return "Interpret the equation as a prediction-error story that relates learning signals to observed behavior or neural timing.";
  if (/applications/i.test(family)) return "Treat the formula as a system loop: experience generation, evaluation, search, and policy improvement feed one another.";
  if (/frontiers/i.test(family)) return "Generalize the usual state-value question by changing the time scale, prediction signal, policy, or termination rule.";
  return "Identify what is observed, what is estimated, and what is averaged or optimized before applying the equation.";
}

function symbolMeaning(symbol: string, formula: FormulaNote) {
  const normalized = symbol.replace(/\s/g, "");
  if (/G/.test(normalized)) return "Return: the future reward total used as a target or score. It is usually sampled in Monte Carlo ideas and partially bootstrapped in TD-style ideas.";
  if (/R|r_t|reward/i.test(normalized)) return "Reward: the immediate scalar feedback from the environment. It is observed, but the long-term consequence still has to be estimated.";
  if (/gamma|\\gamma/.test(normalized)) return "Discount or continuation factor: the knob that says how much later consequences should count in the present calculation.";
  if (/pi|\\pi|policy/.test(normalized)) return "Policy: the rule assigning actions or action probabilities. When the policy changes, the values and many targets change with it.";
  if (/^s'?$/i.test(normalized) || /S_t|S_/.test(normalized)) return "State: the information used to condition a prediction or action choice. Values are always tied to what the state representation makes visible.";
  if (/^a$/i.test(normalized) || /A_t|A_/.test(normalized)) return "Action: the choice made by the agent. Control formulas compare or update action-conditioned quantities.";
  if (/V|v_|v\(/.test(normalized)) return "State-value estimate: the predicted return from a state or time. It compresses future experience into one number.";
  if (/Q|q_/.test(normalized)) return "Action-value estimate: the predicted return after choosing a particular action, then following the relevant policy or control rule.";
  if (/alpha|\\alpha/.test(normalized)) return "Step size: the learning-rate knob controlling how much a new error or target changes the current estimate.";
  if (/rho|\\rho/.test(normalized)) return "Importance-sampling ratio: the likelihood correction for learning about one policy from data generated by another policy.";
  if (/w|\\mathbf\{w\}/.test(normalized)) return "Weight vector: the learned parameters of a function approximator. Updating it changes many state or action estimates at once.";
  if (/^x(\(|_|$)/.test(normalized) || /\\mathbf\{x\}/.test(normalized)) return "Feature vector: the numeric description of a state or state-action pair that lets approximation generalize beyond a table.";
  if (/nabla|\\nabla/.test(normalized)) return "Gradient: a direction for changing parameters so an estimate, objective, or policy probability moves the desired way.";
  if (/delta|\\delta/.test(normalized)) return "Prediction error: observed reward plus revised future prediction minus the old prediction. It is the reusable surprise signal.";
  if (/lambda|\\lambda/.test(normalized)) return "Trace or mixture parameter: the knob that decides how much credit spreads across different backup lengths or past features.";
  if (/theta|\\theta/.test(normalized)) return "Policy parameter vector: the knobs of a parameterized policy. Policy-gradient methods adjust these knobs directly.";
  if (/b\(|baseline|b/.test(normalized)) return "Baseline or behavior-policy symbol depending on context: check the formula label to decide whether it subtracts variance or generated the data.";
  if (/Model|p\(|P/.test(normalized)) return "Model or transition quantity: a description of what next state and reward can follow a state-action choice.";
  if (/max/.test(normalized)) return "Max operator: the control move that keeps the best action according to the current value estimate or model lookahead.";
  if (/H_t/.test(normalized)) return "Preference parameter: a learned score that becomes an action probability after the softmax transformation.";
  if (/N_t|1\/n|^n$/.test(normalized)) return "Count or horizon: either how many samples/actions have been seen or how many future steps a backup spans.";
  if (/\\beta|beta/.test(normalized)) return "Termination or conditioning parameter: in options it can stop a temporally extended action; in psychology it can scale associative learning.";
  if (/c_t|cumulant/i.test(normalized)) return "Cumulant: the signal a general value function predicts, which may be reward or any other future quantity of interest.";
  return `A local symbol in "${formula.label}". Ask whether it is observed from experience, estimated by the learner, averaged under a policy/model, or optimized by an update.`;
}

function ReaderChip({ children, accent = "violet" }: { children: ReactNode; accent?: "violet" | "lime" | "blue" }) {
  const color = {
    violet: "border-violet/30 bg-violet/[0.08] text-violet",
    lime: "border-lime/30 bg-lime/[0.08] text-lime",
    blue: "border-blue/30 bg-blue/[0.08] text-blue",
  }[accent];
  return <span className={`mono inline-flex rounded-full border px-2.5 py-1 text-[11px] ${color}`}>{children}</span>;
}

function geometryFor(formulaIndex: number, modeIndex: number) {
  const layouts = [
    { path: "M58 172 C102 78 178 70 215 130 S320 190 370 82", nodes: [[58, 172, "ask"], [148, 82, "symbol"], [238, 150, "target"], [340, 96, "check"]] },
    { path: "M62 92 H136 L208 172 L288 92 H368", nodes: [[62, 92, "data"], [136, 92, "weight"], [208, 172, "error"], [288, 92, "update"], [368, 92, "test"]] },
    { path: "M58 184 L120 70 L198 128 L276 78 L368 174", nodes: [[58, 184, "state"], [120, 70, "action"], [198, 128, "reward"], [276, 78, "value"], [368, 174, "policy"]] },
  ];
  const layout = layouts[(formulaIndex + modeIndex) % layouts.length];
  return { path: layout.path, nodes: layout.nodes.map(([x, y, label]) => ({ x: Number(x), y: Number(y), label: String(label) })) };
}

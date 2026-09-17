import { AlgorithmPlayer } from "@/components/AlgorithmPlayer";
import { BookMap } from "@/components/BookMap";
import { ChapterExplorer } from "@/components/ChapterExplorer";
import { EquationWall } from "@/components/EquationWall";
import { EvidenceGuide } from "@/components/EvidenceGuide";
import { ExerciseCoach } from "@/components/ExerciseCoach";
import { FormulaAtlas } from "@/components/FormulaAtlas";
import { Glossary } from "@/components/Glossary";
import { Hero } from "@/components/Hero";
import { MasteryNotebook } from "@/components/MasteryNotebook";
import { Nav } from "@/components/Nav";
import { Section, Note } from "@/components/Section";
import { TermLab } from "@/components/TermLab";
import { BanditLab } from "@/components/figures/BanditLab";
import { BellmanLab } from "@/components/figures/BellmanLab";
import { TraceLab } from "@/components/figures/TraceLab";
import { chapters } from "@/lib/paper";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Section
        id="terms"
        eyebrow="00 - Term lab"
        title={<>Every symbol gets a plain-English handle before it appears in formulas.</>}
        lead="The original book is mathematically careful. This lab gives the notation a visual and verbal anchor so the chapter explanations can stay technical without becoming opaque."
      >
        <TermLab />
      </Section>
      <Section
        id="map"
        eyebrow="01 - Book map"
        title={<>The book moves from tables, to approximation, to the broader science of learning.</>}
        lead="TASK.md is written for papers, so this explainer adapts its two-layer design to a textbook: overview first, then dense chapter cards with exact section coverage."
        tint
      >
        <BookMap />
      </Section>
      <Section
        id="chapters"
        eyebrow="02 - Chapter-by-chapter explainer"
        title={<>Seventeen chapters, each with the technical layer and the easy layer side by side.</>}
        lead="Use the filters or search box to jump. Every chapter card includes the section checklist from the PDF contents, key ideas, algorithm names, equations/forms, examples, confusions, and a bridge to the next chapter."
      >
        <ChapterExplorer />
      </Section>
      <Section
        id="mastery"
        eyebrow="03 - Ultra-detail notebook"
        title={<>The deeper study layer adds derivations, algorithms, traps, and checks for every chapter.</>}
        lead="The first chapter cards give the map. This notebook goes another level down: it turns key equations into step-by-step derivation clinics, turns procedures into walkthroughs, and names the mistakes that usually break understanding."
        tint
      >
        <MasteryNotebook />
      </Section>
      <Section
        id="equations"
        eyebrow="04 - Equation spine"
        title={<>Six equations carry most of the book&apos;s algorithmic shape.</>}
        lead="The exact book contains many more equations. This spine highlights the recurring forms that reappear as dynamic programming, Monte Carlo, TD, traces, approximation, and policy gradients."
      >
        <EquationWall />
        <FormulaAtlas />
      </Section>
      <Section
        id="evidence"
        eyebrow="05 - Figure and example companion"
        title={<>Every major visual anchor becomes a study card: what it shows and why it matters.</>}
        lead="The book teaches through plots, backup diagrams, tasks, and named examples. This companion makes those anchors searchable without copying the original figures."
        tint
      >
        <EvidenceGuide />
      </Section>
      <Section
        id="exercises"
        eyebrow="06 - Exercise coach"
        title={<>Every exercise becomes a guided practice card: goal, method, and checkpoint.</>}
        lead="The original exercise text belongs in the book. This layer gives a study plan around it: what skill each numbered exercise trains, how to start, and how to know your solution is coherent."
      >
        <ExerciseCoach />
      </Section>
      <Section
        id="algorithms"
        eyebrow="07 - Algorithm player"
        title={<>Most RL algorithms differ in the target they build and the policy pressure they apply.</>}
        lead="The player abstracts the family resemblance: interact, construct a target, update, improve, and optionally plan. Specific chapters specialize each line."
      >
        <AlgorithmPlayer />
      </Section>
      <Section
        id="labs"
        eyebrow="08 - Interactive labs"
        title={<>Three browser labs compute the central mechanics instead of only describing them.</>}
        lead="The labs use synthetic teaching numbers, clearly marked as illustrative. They are not benchmark results from the book."
      >
        <div className="grid gap-6">
          <BanditLab />
          <BellmanLab />
          <TraceLab />
        </div>
      </Section>
      <Section
        id="study"
        eyebrow="09 - Study route"
        title={<>A practical route through the details.</>}
        lead="For a first pass, read by dependencies rather than page count: formulation, tabular backups, sampling, approximation, policy gradients, then the broader connections."
      >
        <div className="grid gap-5 lg:grid-cols-4">
          {[
            ["Formulate", "Chapters 1-3", "Agent, state, action, reward, return, policy, value, and dynamics."],
            ["Solve tables", "Chapters 4-8", "Exact backups, sampled returns, TD updates, n-step methods, and planning."],
            ["Generalize", "Chapters 9-13", "Features, weights, stability problems, traces, and policy gradients."],
            ["Connect", "Chapters 14-17", "Psychology, dopamine, applications, options, state, reward, and frontiers."],
          ].map(([title, range, copy]) => (
            <article key={title} className="rounded-xl border border-line bg-panel p-6">
              <p className="eyebrow">{range}</p>
              <h3 className="display mt-3 text-3xl font-medium text-ink">{title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted">{copy}</p>
            </article>
          ))}
        </div>
        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          <Note title="Accuracy note">
            <p>This explainer is paraphrased from the extracted PDF and organized around the book&apos;s chapter and section structure. It avoids copying the book&apos;s prose and labels synthetic diagrams/labs as illustrative.</p>
          </Note>
          <Note title="Coverage note">
            <p>The chapter list covers {chapters.length} chapters, all top-level sections shown in the PDF contents, 161 section notes, a 170-tile mastery notebook, a 44-item formula atlas, a 147-card figure/example companion, and 145 exercise-coach cards. For classroom use, treat the cards as a guided map, not as a replacement for exercises or proofs in the book.</p>
          </Note>
        </div>
      </Section>
      <Section
        id="glossary"
        eyebrow="10 - Glossary"
        title={<>The recurring vocabulary, unfolded one term at a time.</>}
        lead="These definitions are written for readers who may be meeting reinforcement learning for the first time but still need the technical distinction."
        tint
      >
        <Glossary />
      </Section>
      <footer className="border-t border-line bg-ink text-white">
        <div className="mx-auto grid max-w-[1280px] gap-5 px-6 py-12 lg:grid-cols-[1fr_auto] lg:px-10">
          <div>
            <p className="eyebrow text-white/60">Footer</p>
            <p className="display mt-2 text-3xl">RLbook 2020 Explainer</p>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/70">Built from TASK.md&apos;s explainer-site spec and the local RLbook2020.pdf. All long-form explanations are paraphrased; equations are included as technical notation needed for study.</p>
          </div>
          <a className="mono self-start rounded-full border border-white/20 px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-white/80" href="#top">Back to top</a>
        </div>
      </footer>
    </main>
  );
}

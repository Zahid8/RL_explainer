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
import { MotionGlyph } from "@/components/MotionGlyph";
import { Nav } from "@/components/Nav";
import { Section, Note } from "@/components/Section";
import { TermLab } from "@/components/TermLab";
import { ZeroKnowledgeLadderReader } from "@/components/ZeroKnowledgeLadderReader";
import { BanditLab } from "@/components/figures/BanditLab";
import { BellmanLab } from "@/components/figures/BellmanLab";
import { TraceLab } from "@/components/figures/TraceLab";
import { manuscriptSectionCount } from "@/lib/chapterManuscripts";
import { formulaLectureModeCount } from "@/lib/formulaAtlas";
import { blackboardStageCount } from "@/lib/interactiveBlackboards";
import { chapters } from "@/lib/paper";
import { sectionLessonModeCount, sectionNarrativeCount } from "@/lib/sectionNarratives";
import { standaloneLectureTileCount } from "@/lib/standaloneBook";
import { zeroKnowledgeLadders, zeroKnowledgeModeCount, zeroKnowledgeRungCount } from "@/lib/zeroKnowledgeLadders";

export default function Home() {
  const lectureBeats = standaloneLectureTileCount();
  const manuscriptMoves = manuscriptSectionCount();
  const blackboardStages = blackboardStageCount();
  const sectionNarratives = sectionNarrativeCount();
  const guidedSectionModes = sectionLessonModeCount();
  const formulaLectureModes = formulaLectureModeCount();
  const zeroKnowledgeRungs = zeroKnowledgeRungCount();
  const zeroKnowledgeModes = zeroKnowledgeModeCount();

  return (
    <main>
      <Nav />
      <Hero />
      <Section
        id="book"
        eyebrow="00 - Standalone web book"
        title={<>A complete original RL lecture book, not a companion checklist.</>}
        lead="The site now teaches the material as a first-principles course: each chapter starts from zero, uses graphical mental models, then builds the technical definitions, equations, algorithms, and checkpoints in its own words."
        tint
      >
        <StandaloneBookPledge lectureBeats={lectureBeats} manuscriptMoves={manuscriptMoves} blackboardStages={blackboardStages} sectionNarratives={sectionNarratives} guidedSectionModes={guidedSectionModes} formulaLectureModes={formulaLectureModes} zeroKnowledgeRungs={zeroKnowledgeRungs} zeroKnowledgeModes={zeroKnowledgeModes} />
      </Section>
      <Section
        id="primer"
        eyebrow="00b - Zero-knowledge primer"
        title={<>Start here if reinforcement learning is totally new.</>}
        lead="Before the dense chapter cards, every chapter gets a five-rung ladder that begins with everyday intuition, draws the board picture, names the technical object, and gives a practice prompt."
      >
        <ZeroKnowledgeLadderReader ladders={zeroKnowledgeLadders} contextTitle="Whole-book beginner-to-technical starter ladder" />
      </Section>
      <Section
        id="terms"
        eyebrow="01 - Term lab"
        title={<>Every symbol gets a plain-English handle before it appears in formulas.</>}
        lead="The web book is mathematically careful, but it never assumes you already speak RL notation. This lab gives each symbol a visual and verbal anchor before the chapter lessons use it."
      >
        <TermLab />
      </Section>
      <Section
        id="map"
        eyebrow="02 - Book map"
        title={<>The book moves from tables, to approximation, to the broader science of learning.</>}
        lead="Use this as the route map for the standalone course: foundations first, tabular backups next, approximation after that, then psychology, neuroscience, applications, and open design questions."
        tint
      >
        <BookMap />
      </Section>
      <Section
        id="chapters"
        eyebrow="03 - Chapter-by-chapter web book"
        title={<>Seventeen chapters, each with the technical layer and the easy layer side by side.</>}
        lead="Use the filters or search box to jump. Every chapter opens into a full standalone lecture page with from-scratch explanations, graphical board work, section beats, technical definitions, algorithms, formulas, examples, confusions, and a bridge to the next chapter."
      >
        <ChapterExplorer />
      </Section>
      <Section
        id="mastery"
        eyebrow="04 - Ultra-detail notebook"
        title={<>The deeper study layer adds derivations, algorithms, traps, and checks for every chapter.</>}
        lead="The first chapter cards give the map. This notebook goes another level down: it turns key equations into step-by-step derivation clinics, turns procedures into walkthroughs, and names the mistakes that usually break understanding."
        tint
      >
        <MasteryNotebook />
      </Section>
      <Section
        id="equations"
        eyebrow="05 - Equation spine"
        title={<>Six equations carry most of the book&apos;s algorithmic shape.</>}
        lead="The exact book contains many more equations. This spine highlights the recurring forms that reappear as dynamic programming, Monte Carlo, TD, traces, approximation, and policy gradients."
      >
        <EquationWall />
        <FormulaAtlas />
      </Section>
      <Section
        id="evidence"
        eyebrow="06 - Figure and example lecture atlas"
        title={<>Every major visual anchor becomes a study card: what it shows and why it matters.</>}
        lead="The course teaches through plots, backup diagrams, tasks, and named examples. This atlas makes those anchors searchable and explains the idea without copying the original figures."
        tint
      >
        <EvidenceGuide />
      </Section>
      <Section
        id="exercises"
        eyebrow="07 - Exercise coach"
        title={<>Every exercise becomes a guided practice card: goal, method, and checkpoint.</>}
        lead="The original exercise text belongs in the book. This layer gives a study plan around it: what skill each numbered exercise trains, how to start, and how to know your solution is coherent."
      >
        <ExerciseCoach />
      </Section>
      <Section
        id="algorithms"
        eyebrow="08 - Algorithm player"
        title={<>Most RL algorithms differ in the target they build and the policy pressure they apply.</>}
        lead="The player abstracts the family resemblance: interact, construct a target, update, improve, and optionally plan. Specific chapters specialize each line; the standalone algorithm index cross-links all 109 cards back to their chapter treatments."
      >
        <AlgorithmPlayer />
      </Section>
      <Section
        id="labs"
        eyebrow="09 - Interactive labs"
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
        eyebrow="10 - Study route"
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
              <div className="flex items-start justify-between gap-3">
                <div><p className="eyebrow">{range}</p><h3 className="display mt-3 text-3xl font-medium text-ink">{title}</h3></div>
                <MotionGlyph label={title} variant={title === "Connect" ? "tree" : title === "Generalize" ? "bars" : title === "Solve tables" ? "formula" : "target"} accent={title === "Connect" ? "violet" : title === "Generalize" ? "lime" : title === "Solve tables" ? "blue" : "cyan"} />
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted">{copy}</p>
            </article>
          ))}
        </div>
        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          <Note title="Accuracy note">
            <p>This is an original standalone teaching site organized around the book&apos;s chapter and section structure. It avoids copying the book&apos;s prose and labels synthetic diagrams/labs as illustrative.</p>
          </Note>
          <Note title="Coverage note">
            <p>The chapter list covers {chapters.length} chapters, {zeroKnowledgeRungs} zero-knowledge starter rungs, {zeroKnowledgeModes} primer modes, {manuscriptMoves} bespoke manuscript moves, {blackboardStages} interactive blackboard stages, {sectionNarratives} section-level textbook manuscripts, {guidedSectionModes} guided section modes, {formulaLectureModes} formula lecture modes, {lectureBeats} standalone lecture beats, all top-level sections shown in the PDF contents, 161 section notes, a 170-tile mastery notebook, a 44-item formula atlas, a 147-card figure/example atlas, and 145 exercise-coach cards. Use the route pages as a complete original lecture path, then use the practice prompts to check whether the ideas are really yours.</p>
          </Note>
        </div>
      </Section>
      <Section
        id="glossary"
        eyebrow="11 - Glossary"
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
            <p className="display mt-2 text-3xl">RLbook standalone web textbook</p>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/70">Built from TASK.md&apos;s explainer-site spec and the local RLbook2020.pdf structure. All long-form explanations are original paraphrases; equations are included as technical notation needed for study.</p>
          </div>
          <a className="mono self-start rounded-full border border-white/20 px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-white/80" href="#top">Back to top</a>
        </div>
      </footer>
    </main>
  );
}

function StandaloneBookPledge({ lectureBeats, manuscriptMoves, blackboardStages, sectionNarratives, guidedSectionModes, formulaLectureModes, zeroKnowledgeRungs, zeroKnowledgeModes }: { lectureBeats: number; manuscriptMoves: number; blackboardStages: number; sectionNarratives: number; guidedSectionModes: number; formulaLectureModes: number; zeroKnowledgeRungs: number; zeroKnowledgeModes: number }) {
  const cards = [
    ["Start from zero", `${zeroKnowledgeRungs} zero-knowledge starter rungs and ${zeroKnowledgeModes} primer modes make every chapter begin with everyday intuition, a board picture, technical wording, and a practice check.`],
    ["Draw before equations", `${blackboardStages} clickable blackboard stages let each chapter show a visual model, beginner explanation, technical explanation, board note, and self-check before the dense cards.`],
    ["Teach each section", `${sectionNarratives} section-level textbook manuscripts, ${guidedSectionModes} guided section modes, ${manuscriptMoves} bespoke manuscript moves, and ${lectureBeats} section-level lecture beats turn the chapter outline into prose lessons, questions, visual metaphors, technical builds, board-work steps, and checkpoints.`],
    ["Go technical", `${formulaLectureModes} formula lecture modes sit beside algorithms, derivations, profiles, worked microscopes, traps, and implementation checks so equations are taught as stories, symbol maps, traces, use cases, and pitfalls.`],
    ["Stay original", "The wording is newly written for this web book: it follows the chapter structure and technical ideas without copying the copyrighted prose or figures."],
  ];

  return (
    <div className="grid gap-5 lg:grid-cols-5">
      {cards.map(([title, text], index) => (
        <article key={title} className="rounded-xl border border-line bg-panel p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="mono text-[11px] uppercase tracking-[0.14em] text-cyan">Book principle {index + 1}</p>
              <h3 className="display mt-3 text-3xl font-medium text-ink">{title}</h3>
            </div>
            <MotionGlyph label={title} variant={index === 1 ? "tree" : index === 2 ? "bars" : index === 3 ? "formula" : index === 4 ? "check" : "loop"} accent={index === 3 ? "violet" : index === 4 ? "lime" : "cyan"} />
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted">{text}</p>
          {index === 0 ? <a className="mono mt-4 inline-flex rounded-full border border-cyan bg-white px-3 py-2 text-[11px] uppercase tracking-[0.14em] text-cyan hover:bg-cyan hover:text-white" href="/book">Open linear book mode</a> : null}
        </article>
      ))}
    </div>
  );
}

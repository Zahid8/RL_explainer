import { AlgorithmPlayer } from "@/components/AlgorithmPlayer";
import { BookSearch } from "@/components/BookSearch";
import { BookMap } from "@/components/BookMap";
import { ChapterExplorer } from "@/components/ChapterExplorer";
import { ChapterPracticeCoach } from "@/components/ChapterPracticeCoach";
import { ChapterLectureTheater } from "@/components/ChapterLectureTheater";
import { ChapterSimulatorLab } from "@/components/ChapterSimulatorLab";
import { ConceptLectureDeck } from "@/components/ConceptLectureDeck";
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
import { WorkedExampleStudio } from "@/components/WorkedExampleStudio";
import { MisconceptionClinic } from "@/components/MisconceptionClinic";
import { ZeroKnowledgeLadderReader } from "@/components/ZeroKnowledgeLadderReader";
import { BanditLab } from "@/components/figures/BanditLab";
import { BellmanLab } from "@/components/figures/BellmanLab";
import { TraceLab } from "@/components/figures/TraceLab";
import { manuscriptSectionCount } from "@/lib/chapterManuscripts";
import { formulaLectureModeCount } from "@/lib/formulaAtlas";
import { allBookIndexEntries, bookIndexChapterCount, bookIndexEntryCount, bookIndexLayerCount } from "@/lib/bookIndex";
import { blackboardStageCount } from "@/lib/interactiveBlackboards";
import { chapters } from "@/lib/paper";
import { allPracticeCards, practiceCardCount, practiceModeCount } from "@/lib/chapterPractice";
import { allConceptCards, conceptCardCount, conceptModeCount } from "@/lib/conceptAtlas";
import { allWorkedExamples, workedExampleCount, workedExampleModeCount } from "@/lib/chapterWorkedExamples";
import { allMisconceptionCards, misconceptionCardCount, misconceptionModeCount } from "@/lib/chapterMisconceptions";
import { allLectureTheaters, lectureTheaterCount, lectureTheaterModeCount, lectureTheaterSlideCount } from "@/lib/chapterLectureTheater";
import { allSimulators, simulatorControlCount, simulatorCount, simulatorReadoutCount } from "@/lib/chapterSimulators";
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
  const practiceCards = allPracticeCards();
  const practiceCardTotal = practiceCardCount();
  const practiceModes = practiceModeCount();
  const lectureTheaters = allLectureTheaters();
  const theaterTotal = lectureTheaterCount();
  const theaterSlides = lectureTheaterSlideCount();
  const theaterModes = lectureTheaterModeCount();
  const conceptCards = allConceptCards();
  const conceptCardTotal = conceptCardCount();
  const conceptModes = conceptModeCount();
  const workedExamples = allWorkedExamples();
  const workedExampleTotal = workedExampleCount();
  const workedExampleModes = workedExampleModeCount();
  const misconceptionCards = allMisconceptionCards();
  const misconceptionTotal = misconceptionCardCount();
  const misconceptionModes = misconceptionModeCount();
  const simulators = allSimulators();
  const simulatorTotal = simulatorCount();
  const simulatorControls = simulatorControlCount();
  const simulatorReadouts = simulatorReadoutCount();
  const searchEntries = allBookIndexEntries();
  const searchEntryTotal = bookIndexEntryCount();
  const searchLayerTotal = bookIndexLayerCount();
  const searchChapterTotal = bookIndexChapterCount();

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
        <StandaloneBookPledge lectureBeats={lectureBeats} manuscriptMoves={manuscriptMoves} blackboardStages={blackboardStages} sectionNarratives={sectionNarratives} guidedSectionModes={guidedSectionModes} formulaLectureModes={formulaLectureModes} zeroKnowledgeRungs={zeroKnowledgeRungs} zeroKnowledgeModes={zeroKnowledgeModes} practiceCardTotal={practiceCardTotal} practiceModes={practiceModes} conceptCardTotal={conceptCardTotal} conceptModes={conceptModes} workedExampleTotal={workedExampleTotal} workedExampleModes={workedExampleModes} misconceptionTotal={misconceptionTotal} misconceptionModes={misconceptionModes} simulatorTotal={simulatorTotal} simulatorControls={simulatorControls} simulatorReadouts={simulatorReadouts} theaterTotal={theaterTotal} theaterSlides={theaterSlides} theaterModes={theaterModes} searchEntryTotal={searchEntryTotal} searchLayerTotal={searchLayerTotal} searchChapterTotal={searchChapterTotal} />
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
        id="theater"
        eyebrow="00c - Guided lecture theater"
        title={<>Walk every chapter like a live lecture from zero to advanced.</>}
        lead="Each chapter now has a five-slide lecture arc: start from nothing, draw the world, name the technical objects, run one method by hand, and transfer the idea forward. Switch modes to see the beginner story, board picture, technical pass, equation lens, and teach-back check."
        tint
      >
        <ChapterLectureTheater theaters={lectureTheaters} contextTitle="Whole-book guided lecture theater" />
      </Section>
      <Section
        id="search"
        eyebrow="00d - Whole-book search"
        title={<>The complete RL web book is now searchable from one desk.</>}
        lead="Search beginner stories, board pictures, technical formulas, algorithm cards, worked traces, misconceptions, simulator knobs, section manuscripts, figure anchors, and exercise guides across all chapters."
      >
        <BookSearch entries={searchEntries} contextTitle="Whole-book searchable lecture index" compact />
      </Section>
      <Section
        id="recall"
        eyebrow="00e - Active recall coach"
        title={<>Do not just read the chapter — prove you can teach it.</>}
        lead="The practice coach gives every chapter five oral-exam checkpoints: explain the idea, draw it, read the math, choose the method, and repair a misconception. Reveal the hint, solution, trap, and transfer only after trying."
        tint
      >
        <ChapterPracticeCoach cards={practiceCards} contextTitle="Whole-book active recall checkpoints" />
      </Section>
      <Section
        id="concepts"
        eyebrow="00f - Concept microscope"
        title={<>Every important RL word is taught as a mini lecture.</>}
        lead="The concept microscope sits between practice and the notation lab: choose a chapter concept, then switch among plain role, board picture, technical use, contrast, and self-check so terminology is learned from scratch instead of memorized."
      >
        <ConceptLectureDeck concepts={conceptCards} contextTitle="Whole-book concept microscope" />
      </Section>
      <Section
        id="worked"
        eyebrow="00g - Worked example studio"
        title={<>Every chapter gets concrete toy worlds and hand traces.</>}
        lead="The worked example studio turns chapter ideas into tiny examples: read the scenario, draw the board, follow a trace, inspect the pitfall, then solve a mini exercise. It is the bridge from explanation to doing."
        tint
      >
        <WorkedExampleStudio examples={workedExamples} contextTitle="Whole-book worked example studio" />
      </Section>
      <Section
        id="clinic"
        eyebrow="00h - Misconception clinic"
        title={<>Repair the wrong ideas before they become habits.</>}
        lead="A standalone lecture has to say why tempting shortcuts fail. The clinic shows the wrong sentence, why it sounds plausible, how to repair it on the board, what changes technically, and how to test the repair."
      >
        <MisconceptionClinic cards={misconceptionCards} contextTitle="Whole-book misconception clinic" />
      </Section>
      <Section
        id="simulators"
        eyebrow="00i - Chapter simulator lab"
        title={<>Experiment with the knobs behind every chapter.</>}
        lead="Each chapter gets a live teaching simulator with sliders for exploration pressure, update strength, and future horizon. The readouts show how learning speed, stability, bias, and variance trade off before the dense math arrives."
        tint
      >
        <ChapterSimulatorLab simulators={simulators} contextTitle="Whole-book chapter simulator lab" />
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
            <p>The chapter list covers {chapters.length} chapters, {searchEntryTotal} searchable explanation entries across {searchLayerTotal} index layers, {zeroKnowledgeRungs} zero-knowledge starter rungs, {zeroKnowledgeModes} primer modes, {theaterTotal} lecture theaters, {theaterSlides} guided lecture slides, {theaterModes} theater explanation modes, {practiceCardTotal} active-recall checkpoints, {practiceModes} practice reveal modes, {conceptCardTotal} concept microscope cards, {conceptModes} concept lecture modes, {workedExampleTotal} worked examples, {workedExampleModes} worked-example modes, {misconceptionTotal} misconception clinic cards, {misconceptionModes} misconception repair modes, {simulatorTotal} chapter simulators, {simulatorControls} simulator controls, {simulatorReadouts} simulator readouts, {manuscriptMoves} bespoke manuscript moves, {blackboardStages} interactive blackboard stages, {sectionNarratives} section-level textbook manuscripts, {guidedSectionModes} guided section modes, {formulaLectureModes} formula lecture modes, {lectureBeats} standalone lecture beats, all top-level sections shown in the PDF contents, 161 section notes, a 170-tile mastery notebook, a 44-item formula atlas, a 147-card figure/example atlas, and 145 exercise-coach cards. Use the route pages as a complete original lecture path, then use the practice prompts to check whether the ideas are really yours.</p>
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

function StandaloneBookPledge({ lectureBeats, manuscriptMoves, blackboardStages, sectionNarratives, guidedSectionModes, formulaLectureModes, zeroKnowledgeRungs, zeroKnowledgeModes, practiceCardTotal, practiceModes, conceptCardTotal, conceptModes, workedExampleTotal, workedExampleModes, misconceptionTotal, misconceptionModes, simulatorTotal, simulatorControls, simulatorReadouts, theaterTotal, theaterSlides, theaterModes, searchEntryTotal, searchLayerTotal, searchChapterTotal }: { lectureBeats: number; manuscriptMoves: number; blackboardStages: number; sectionNarratives: number; guidedSectionModes: number; formulaLectureModes: number; zeroKnowledgeRungs: number; zeroKnowledgeModes: number; practiceCardTotal: number; practiceModes: number; conceptCardTotal: number; conceptModes: number; workedExampleTotal: number; workedExampleModes: number; misconceptionTotal: number; misconceptionModes: number; simulatorTotal: number; simulatorControls: number; simulatorReadouts: number; theaterTotal: number; theaterSlides: number; theaterModes: number; searchEntryTotal: number; searchLayerTotal: number; searchChapterTotal: number }) {
  const cards = [
    ["Start from zero", `${zeroKnowledgeRungs} zero-knowledge starter rungs and ${zeroKnowledgeModes} primer modes make every chapter begin with everyday intuition, a board picture, technical wording, and a practice check.`],
    ["Draw before equations", `${blackboardStages} clickable blackboard stages let each chapter show a visual model, beginner explanation, technical explanation, board note, and self-check before the dense cards.`],
    ["Lecture in slides", `${theaterTotal} guided lecture theaters, ${theaterSlides} slide stages, and ${theaterModes} explanation modes walk each chapter from beginner story to board picture, technical pass, equation lens, and teach-back check.`],
    ["Search everything", `${searchEntryTotal} searchable explanation entries across ${searchLayerTotal} layers and ${searchChapterTotal} chapters put the standalone book at your fingertips: type a word, choose a layer, and jump directly into the right chapter explanation.`],
    ["Teach each section", `${sectionNarratives} section-level textbook manuscripts, ${guidedSectionModes} guided section modes, ${manuscriptMoves} bespoke manuscript moves, and ${lectureBeats} section-level lecture beats turn the chapter outline into prose lessons, questions, visual metaphors, technical builds, board-work steps, and checkpoints.`],
    ["Go technical", `${formulaLectureModes} formula lecture modes sit beside algorithms, derivations, profiles, worked microscopes, traps, and implementation checks so equations are taught as stories, symbol maps, traces, use cases, and pitfalls.`],
    ["Name each idea", `${conceptCardTotal} concept microscope cards and ${conceptModes} lecture modes make key terms earn plain-language roles, board pictures, technical uses, contrasts, and self-checks.`],
    ["Work examples", `${workedExampleTotal} worked examples and ${workedExampleModes} example modes turn abstractions into toy worlds, board traces, tiny target calculations, method traces, and debug repairs.`],
    ["Repair mistakes", `${misconceptionTotal} misconception clinic cards and ${misconceptionModes} repair modes show why tempting shortcuts fail, how to redraw them, and what changes technically.`],
    ["Experiment live", `${simulatorTotal} chapter simulators expose ${simulatorControls} sliders and ${simulatorReadouts} readouts so readers can vary exploration, update strength, and horizon while watching learning speed, stability, bias, and variance trade off.`],
    ["Teach it back", `${practiceCardTotal} active-recall checkpoints and ${practiceModes} reveal modes ask readers to explain, draw, translate math, choose methods, repair traps, and transfer each chapter to a new domain.`],
    ["Stay original", "The wording is newly written for this web book: it follows the chapter structure and technical ideas without copying the copyrighted prose or figures."],
  ];

  return (
    <div className="grid gap-5 lg:grid-cols-3 xl:grid-cols-11">
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

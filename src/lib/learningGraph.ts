import { algorithmsForChapter } from "@/lib/algorithmCatalog";
import { analogiesForChapter } from "@/lib/analogies";
import { assumptionCardsForChapter } from "@/lib/assumptionClinic";
import { chapterDependencyMap } from "@/lib/chapterDependencyMap";
import { chapterExamCardsForChapter } from "@/lib/chapterExam";
import { practiceCardsForChapter } from "@/lib/chapterPractice";
import { exerciseSolutionCardsForChapter } from "@/lib/exerciseSolutionStudio";
import { simulatorForChapter } from "@/lib/chapterSimulators";
import { workedExamplesForChapter } from "@/lib/chapterWorkedExamples";
import { codeLabCardsForChapter } from "@/lib/codeLab";
import { conceptCardsForChapter } from "@/lib/conceptAtlas";
import { formulasForChapter } from "@/lib/formulaAtlas";
import { foundationDictionaryCardsForChapter } from "@/lib/foundationDictionary";
import { mathRescueCardsForChapter } from "@/lib/mathRescue";
import { visualStoriesForChapter } from "@/lib/visualStory";
import { methodCompareCardsForChapter } from "@/lib/methodCompare";
import { proofCardsForChapter } from "@/lib/proofLab";
import { chapters } from "@/lib/paper";
import { sectionMasteryCardsForChapter } from "@/lib/sectionMastery";
import { socraticTutorCardsForChapter } from "@/lib/socraticTutor";
import { caseStudiesForChapter } from "@/lib/caseStudies";
import { projectCardsForChapter } from "@/lib/projectStudio";
import { evidenceReplayCardsForChapter } from "@/lib/evidenceReplay";
import { symbolCardsForChapter } from "@/lib/symbolAtlas";

export type LearningGraphNodeKind = "chapter" | "foundation" | "math" | "story" | "analogy" | "tutor" | "case" | "concept" | "section" | "formula" | "symbol" | "proof" | "algorithm" | "compare" | "code" | "assumption" | "example" | "practice" | "exercise" | "exam" | "project" | "evidence" | "simulator" | "prerequisite" | "unlock";

export interface LearningGraphNode {
  id: string;
  chapter: number;
  kind: LearningGraphNodeKind;
  title: string;
  easy: string;
  technical: string;
  route: string;
  tags: string[];
  x: number;
  y: number;
}

export interface LearningGraphEdge {
  id: string;
  chapter: number;
  from: string;
  to: string;
  relation: string;
  easy: string;
  technical: string;
}

export interface ChapterLearningGraph {
  chapter: number;
  title: string;
  promise: string;
  route: string;
  nodes: LearningGraphNode[];
  edges: LearningGraphEdge[];
  readingPath: string[];
  legend: { kind: LearningGraphNodeKind; label: string; easy: string; technical: string }[];
}

let cachedGraphs: ChapterLearningGraph[] | undefined;

export function allLearningGraphs(): ChapterLearningGraph[] {
  cachedGraphs ??= chapters.map((chapter) => learningGraphForChapter(chapter.n));
  return cachedGraphs;
}

export function learningGraphForChapter(chapterNumber: number): ChapterLearningGraph {
  const chapter = chapters.find((entry) => entry.n === chapterNumber);
  if (!chapter) throw new Error(`Missing chapter ${chapterNumber}`);

  const algorithms = algorithmsForChapter(chapterNumber);
  const foundations = foundationDictionaryCardsForChapter(chapterNumber).slice(0, 5);
  const mathCards = mathRescueCardsForChapter(chapterNumber).slice(0, 4);
  const storyCards = visualStoriesForChapter(chapterNumber).slice(0, 4);
  const analogyCards = analogiesForChapter(chapterNumber).slice(0, 4);
  const tutorCards = socraticTutorCardsForChapter(chapterNumber).slice(0, 4);
  const caseStudies = caseStudiesForChapter(chapterNumber).slice(0, 4);
  const projectCards = projectCardsForChapter(chapterNumber).slice(0, 4);
  const evidenceReplays = evidenceReplayCardsForChapter(chapterNumber).slice(0, 5);
  const concepts = conceptCardsForChapter(chapterNumber).slice(0, 6);
  const sectionMasteryCards = sectionMasteryCardsForChapter(chapterNumber).slice(0, 4);
  const formulas = formulasForChapter(chapterNumber).slice(0, 4);
  const symbols = symbolCardsForChapter(chapterNumber).slice(0, 5);
  const proofCards = proofCardsForChapter(chapterNumber).slice(0, 4);
  const compareCards = methodCompareCardsForChapter(chapterNumber).slice(0, 5);
  const codeCards = codeLabCardsForChapter(chapterNumber).slice(0, 5);
  const assumptionCards = assumptionCardsForChapter(chapterNumber).slice(0, 5);
  const examples = workedExamplesForChapter(chapterNumber).slice(0, 4);
  const practice = practiceCardsForChapter(chapterNumber).slice(0, 3);
  const exerciseSolutions = exerciseSolutionCardsForChapter(chapterNumber).slice(0, 4);
  const examCards = chapterExamCardsForChapter(chapterNumber).slice(0, 4);
  const simulator = simulatorForChapter(chapterNumber);
  const dependencies = chapterDependencyMap(chapter, chapters, algorithms);
  const nodes: LearningGraphNode[] = [];
  const edges: LearningGraphEdge[] = [];
  const centerId = nodeId(chapterNumber, "chapter", chapter.title);

  const addNode = (node: LearningGraphNode) => nodes.push({ ...node, tags: compactTags(node.tags) });
  const addEdge = (edge: LearningGraphEdge) => edges.push(edge);

  addNode({
    id: centerId,
    chapter: chapterNumber,
    kind: "chapter",
    title: `Chapter ${chapterNumber}: ${chapter.title}`,
    easy: chapter.easy,
    technical: chapter.technical,
    route: `/chapters/${chapterNumber}`,
    tags: [chapter.part, ...chapter.keyIdeas.slice(0, 4)],
    x: 50,
    y: 50,
  });

  foundations.forEach((card, index) => {
    const id = nodeId(chapterNumber, "foundation", card.term);
    addNode({
      id,
      chapter: chapterNumber,
      kind: "foundation",
      title: card.term,
      easy: card.beginnerMeaning,
      technical: `${card.technicalMeaning} Trap: ${card.commonTrap}`,
      route: `/chapters/${chapterNumber}#foundations`,
      tags: [card.sourceLabel, ...card.tags],
      ...ringPoint("foundation", index, foundations.length),
    });
    addEdge({
      id: edgeId(centerId, id, "foundation"),
      chapter: chapterNumber,
      from: centerId,
      to: id,
      relation: "chapter defines foundation term",
      easy: `The foundation node makes ${card.term} usable before the dense chapter layer depends on it.`,
      technical: `The foundation node packages plain meaning, board picture, technical role, trap, and teach-back check.`,
    });
  });


  mathCards.forEach((card, index) => {
    const id = nodeId(chapterNumber, "math", card.object);
    const foundation = foundations[index % Math.max(foundations.length, 1)];
    const from = foundation ? nodeId(chapterNumber, "foundation", foundation.term) : centerId;
    addNode({
      id,
      chapter: chapterNumber,
      kind: "math",
      title: card.object,
      easy: `${card.intuition} Picture: ${card.boardPicture}`,
      technical: `${card.notationBridge} Pitfall: ${card.pitfall}`,
      route: `/chapters/${chapterNumber}#math-rescue`,
      tags: [card.sourceLabel, ...card.tags],
      ...ringPoint("math", index, mathCards.length),
    });
    addEdge({
      id: edgeId(from, id, "math rescue"),
      chapter: chapterNumber,
      from,
      to: id,
      relation: "foundation becomes mathematical object",
      easy: `The math rescue node turns ${card.object} into intuition, drawing, notation, use, and self-check before dense formulas.`,
      technical: `The math rescue node connects source layer ${card.sourceLabel} to the chapter's symbol and update language.`,
    });
  });



  storyCards.forEach((card, index) => {
    const id = nodeId(chapterNumber, "story", card.title);
    const mathCard = mathCards[index % Math.max(mathCards.length, 1)];
    const foundation = foundations[index % Math.max(foundations.length, 1)];
    const from = mathCard ? nodeId(chapterNumber, "math", mathCard.object) : foundation ? nodeId(chapterNumber, "foundation", foundation.term) : centerId;
    addNode({
      id,
      chapter: chapterNumber,
      kind: "story",
      title: card.title.replace(/^Scene: /, ""),
      easy: `${card.setting} Observe: ${card.learnerSees}`,
      technical: `${card.technicalTranslation} Check: ${card.checkpoint}`,
      route: `/chapters/${chapterNumber}#visual-story`,
      tags: [card.sourceLabel, ...card.tags],
      ...ringPoint("story", index, storyCards.length),
    });
    addEdge({
      id: edgeId(from, id, "visual story"),
      chapter: chapterNumber,
      from,
      to: id,
      relation: "object becomes visual scene",
      easy: `The visual story node turns ${card.title.replace(/^Scene: /, "")} into a learner-world-feedback movie before formulas appear.`,
      technical: `The story node packages scene, observation, move, board animation, technical translation, pitfall, and blank-board check.`,
    });
  });



  analogyCards.forEach((card, index) => {
    const id = nodeId(chapterNumber, "analogy", card.title);
    const story = storyCards[index % Math.max(storyCards.length, 1)];
    const mathCard = mathCards[index % Math.max(mathCards.length, 1)];
    const from = story ? nodeId(chapterNumber, "story", story.title) : mathCard ? nodeId(chapterNumber, "math", mathCard.object) : centerId;
    addNode({
      id,
      chapter: chapterNumber,
      kind: "analogy",
      title: card.title,
      easy: card.everyday,
      technical: `${card.technical} Limits: ${card.limits}`,
      route: `/chapters/${chapterNumber}#analogies`,
      tags: [card.sourceLabel, card.anchor, ...card.tags],
      ...ringPoint("analogy", index, analogyCards.length),
    });
    addEdge({
      id: edgeId(from, id, "analogy bridge"),
      chapter: chapterNumber,
      from,
      to: id,
      relation: "scene becomes analogy bridge",
      easy: `The analogy node maps a familiar situation to ${card.anchor} while warning where the bridge stops being exact.`,
      technical: `The analogy bridge packages everyday story, mapping rows, technical translation, limits, and transfer check.`,
    });
  });


  tutorCards.forEach((card, index) => {
    const id = nodeId(chapterNumber, "tutor", card.title);
    const analogy = analogyCards[index % Math.max(analogyCards.length, 1)];
    const story = storyCards[index % Math.max(storyCards.length, 1)];
    const from = analogy ? nodeId(chapterNumber, "analogy", analogy.title) : story ? nodeId(chapterNumber, "story", story.title) : centerId;
    addNode({
      id,
      chapter: chapterNumber,
      kind: "tutor",
      title: card.title.replace(/^Tutor: /, ""),
      easy: `${card.learnerQuestion} Hint: ${card.tutorHint}`,
      technical: `${card.technicalAnswer} Try: ${card.tryIt}`,
      route: `/chapters/${chapterNumber}#socratic-tutor`,
      tags: [card.sourceLabel, card.anchor, ...card.tags],
      ...ringPoint("tutor", index, tutorCards.length),
    });
    addEdge({
      id: edgeId(from, id, "socratic tutor"),
      chapter: chapterNumber,
      from,
      to: id,
      relation: "analogy becomes tutor dialogue",
      easy: `The tutor node turns ${card.anchor} into a beginner question, hint, board trace, technical answer, and fresh attempt.`,
      technical: `The Socratic tutor packages learner question, tutor hint, board steps, technical answer, try-it prompt, expected answer, and misconception probe.`,
    });
  });

  caseStudies.forEach((card, index) => {
    const id = nodeId(chapterNumber, "case", card.title);
    const tutor = tutorCards[index % Math.max(tutorCards.length, 1)];
    const analogy = analogyCards[index % Math.max(analogyCards.length, 1)];
    const story = storyCards[index % Math.max(storyCards.length, 1)];
    const from = tutor ? nodeId(chapterNumber, "tutor", tutor.title) : analogy ? nodeId(chapterNumber, "analogy", analogy.title) : story ? nodeId(chapterNumber, "story", story.title) : centerId;
    addNode({
      id,
      chapter: chapterNumber,
      kind: "case",
      title: card.title,
      easy: `${card.scene} Goal: ${card.learnerGoal}`,
      technical: `${card.technicalPass} Debug: ${card.debugProbe}`,
      route: `/chapters/${chapterNumber}#case-studies`,
      tags: [card.sourceLabel, card.anchor, ...card.tags],
      ...ringPoint("case", index, caseStudies.length),
    });
    addEdge({
      id: edgeId(from, id, "case study"),
      chapter: chapterNumber,
      from,
      to: id,
      relation: "tutor dialogue becomes complete case",
      easy: `The case node turns ${card.anchor} into a full scenario with a scene, board walk, debug probe, and transfer challenge.`,
      technical: `The case study node connects source layer ${card.sourceLabel} to scene, board frames, technical pass, debug probe, success checks, and transfer.`,
    });
  });

  concepts.forEach((concept, index) => {
    const id = nodeId(chapterNumber, "concept", concept.term);
    addNode({
      id,
      chapter: chapterNumber,
      kind: "concept",
      title: concept.term,
      easy: concept.plain,
      technical: `${concept.technical} ${concept.contrast}`,
      route: `/chapters/${chapterNumber}#concepts`,
      tags: [concept.kind, concept.section, ...concept.tags],
      ...ringPoint("concept", index, concepts.length),
    });
    const caseStudy = caseStudies[index % Math.max(caseStudies.length, 1)];
    const tutor = tutorCards[index % Math.max(tutorCards.length, 1)];
    const analogy = analogyCards[index % Math.max(analogyCards.length, 1)];
    const story = storyCards[index % Math.max(storyCards.length, 1)];
    const foundation = foundations[index % Math.max(foundations.length, 1)];
    const storyOrFoundationId = caseStudy ? nodeId(chapterNumber, "case", caseStudy.title) : tutor ? nodeId(chapterNumber, "tutor", tutor.title) : analogy ? nodeId(chapterNumber, "analogy", analogy.title) : story ? nodeId(chapterNumber, "story", story.title) : foundation ? nodeId(chapterNumber, "foundation", foundation.term) : centerId;
    addEdge({
      id: edgeId(storyOrFoundationId, id, "concept"),
      chapter: chapterNumber,
      from: storyOrFoundationId,
      to: id,
      relation: "complete case becomes concept",
      easy: `The learner first runs a complete case, then uses ${concept.term} as a named handle for the chapter story.`,
      technical: `The concept node inherits case-study context plus the chapter's formal objects and narrows them through ${concept.section}.`,
    });
  });

  sectionMasteryCards.forEach((card, index) => {
    const id = nodeId(chapterNumber, "section", card.section);
    const concept = concepts[index % Math.max(concepts.length, 1)];
    const from = concept ? nodeId(chapterNumber, "concept", concept.term) : centerId;
    addNode({
      id,
      chapter: chapterNumber,
      kind: "section",
      title: card.section,
      easy: `${card.prompt} Diagnostic: ${card.diagnostic}`,
      technical: `${card.technical} Transfer: ${card.transfer}`,
      route: `/chapters/${chapterNumber}#section-mastery`,
      tags: ["section mastery", ...card.tags],
      ...ringPoint("section", index, sectionMasteryCards.length),
    });
    addEdge({
      id: edgeId(from, id, "section mastery"),
      chapter: chapterNumber,
      from,
      to: id,
      relation: "concept becomes section mastery",
      easy: `The section card asks the learner to teach ${card.section} before moving to formula or exam layers.`,
      technical: `The section node packages prompt, hint, answer, technical pass, diagnostic guard, and transfer test for a named section.`,
    });
  });

  formulas.forEach((formula, index) => {
    const id = nodeId(chapterNumber, "formula", formula.label);
    const concept = concepts[index % Math.max(concepts.length, 1)];
    const mathCard = mathCards[index % Math.max(mathCards.length, 1)];
    const mathId = mathCard ? nodeId(chapterNumber, "math", mathCard.object) : undefined;
    addNode({
      id,
      chapter: chapterNumber,
      kind: "formula",
      title: formula.label,
      easy: `${formula.easy} Use when: ${formula.useWhen}`,
      technical: `${formula.tex}. ${formula.technical} Watch out: ${formula.watchOut}`,
      route: `/chapters/${chapterNumber}#formulas`,
      tags: [formula.family, ...formula.symbols, formula.label],
      ...ringPoint("formula", index, formulas.length),
    });
    addEdge({
      id: edgeId(mathId ?? (concept ? nodeId(chapterNumber, "concept", concept.term) : centerId), id, "formula"),
      chapter: chapterNumber,
      from: mathId ?? (concept ? nodeId(chapterNumber, "concept", concept.term) : centerId),
      to: id,
      relation: "concept becomes notation",
      easy: `The visual idea becomes a formula handle: ${formula.label}.`,
      technical: `The formula node formalizes a concept through symbols ${formula.symbols.slice(0, 4).join(", ")}.`,
    });
  });

  symbols.forEach((symbol, index) => {
    const id = nodeId(chapterNumber, "symbol", symbol.symbol);
    const formula = formulas.find((item) => symbol.formulaLabels.includes(item.label)) ?? formulas[index % Math.max(formulas.length, 1)];
    addNode({
      id,
      chapter: chapterNumber,
      kind: "symbol",
      title: symbol.symbol,
      easy: `${symbol.spokenAs}: ${symbol.plain}`,
      technical: `${symbol.technical} Pitfall: ${symbol.pitfall}`,
      route: `/chapters/${chapterNumber}#symbols`,
      tags: [symbol.spokenAs, symbol.role, ...symbol.tags],
      ...ringPoint("symbol", index, symbols.length),
    });
    addEdge({
      id: edgeId(formula ? nodeId(chapterNumber, "formula", formula.label) : centerId, id, "symbol"),
      chapter: chapterNumber,
      from: formula ? nodeId(chapterNumber, "formula", formula.label) : centerId,
      to: id,
      relation: "formula exposes symbol",
      easy: `The formula becomes less scary when ${symbol.spokenAs} has a plain role.`,
      technical: `The symbol node records notation semantics, formula context, pitfall, and self-check before the formula is manipulated.`,
    });
  });

  proofCards.forEach((card, index) => {
    const id = nodeId(chapterNumber, "proof", card.title);
    const formula = formulas[index % Math.max(formulas.length, 1)];
    addNode({
      id,
      chapter: chapterNumber,
      kind: "proof",
      title: card.title,
      easy: `${card.plain} Claim: ${card.claim}`,
      technical: `${card.proofSketch.join(" ")} Stress test: ${card.stressTest}`,
      route: `/chapters/${chapterNumber}#proofs`,
      tags: [card.kind, card.family, ...card.tags],
      ...ringPoint("proof", index, proofCards.length),
    });
    addEdge({
      id: edgeId(formula ? nodeId(chapterNumber, "formula", formula.label) : centerId, id, "proof"),
      chapter: chapterNumber,
      from: formula ? nodeId(chapterNumber, "formula", formula.label) : centerId,
      to: id,
      relation: "formula earns proof",
      easy: `The proof card explains why the equation or chapter claim should be believed rather than memorized.`,
      technical: `The proof node exposes claim, ingredients, proof sketch, equation bridge, and stress-test counterexample.`,
    });
  });

  algorithms.slice(0, 7).forEach((algorithm, index) => {
    const id = nodeId(chapterNumber, "algorithm", algorithm.name);
    const formula = formulas[index % Math.max(formulas.length, 1)];
    addNode({
      id,
      chapter: chapterNumber,
      kind: "algorithm",
      title: algorithm.name,
      easy: `${algorithm.plain} Objective: ${algorithm.objective}`,
      technical: `${algorithm.technical} Core update: ${algorithm.coreUpdate}`,
      route: `/chapters/${chapterNumber}#${algorithm.id}`,
      tags: [algorithm.family, algorithm.bookAnchor, ...algorithm.related],
      ...ringPoint("algorithm", index, Math.min(algorithms.length, 7)),
    });
    addEdge({
      id: edgeId(formula ? nodeId(chapterNumber, "formula", formula.label) : centerId, id, "algorithm"),
      chapter: chapterNumber,
      from: formula ? nodeId(chapterNumber, "formula", formula.label) : centerId,
      to: id,
      relation: "notation becomes method",
      easy: `${algorithm.name} turns the chapter's idea into steps a learner could run.`,
      technical: `The method consumes the chapter's target/residual vocabulary and exposes implementation steps, pseudocode, and failure modes.`,
    });
  });

  compareCards.forEach((card, index) => {
    const id = nodeId(chapterNumber, "compare", card.title);
    const algorithm = algorithms.find((item) => item.id === card.algorithmId) ?? algorithms[index % Math.max(algorithms.length, 1)];
    addNode({
      id,
      chapter: chapterNumber,
      kind: "compare",
      title: `${card.algorithmName} vs ${card.compareWith}`,
      easy: `${card.primaryQuestion} ${card.plainComparison}`,
      technical: `${card.technicalComparison} Tradeoff: ${card.tradeoff}`,
      route: `/chapters/${chapterNumber}#method-compare`,
      tags: [card.family, card.algorithmName, card.compareWith, ...card.tags],
      ...ringPoint("compare", index, compareCards.length),
    });
    addEdge({
      id: edgeId(algorithm ? nodeId(chapterNumber, "algorithm", algorithm.name) : centerId, id, "compare"),
      chapter: chapterNumber,
      from: algorithm ? nodeId(chapterNumber, "algorithm", algorithm.name) : centerId,
      to: id,
      relation: "method gets compared",
      easy: `The comparison node asks when to choose the method instead of a nearby alternative.`,
      technical: `The comparison node exposes choice criteria, profile axes, tradeoffs, failure checks, and transfer bridges.`,
    });
  });

  codeCards.forEach((card, index) => {
    const id = nodeId(chapterNumber, "code", card.title);
    const algorithm = algorithms.find((item) => item.id === card.algorithmId) ?? algorithms[index % Math.max(algorithms.length, 1)];
    addNode({
      id,
      chapter: chapterNumber,
      kind: "code",
      title: card.title.replace(" implementation lab", ""),
      easy: card.plain,
      technical: `${card.implementationGoal} Invariant: ${card.invariants[0]}`,
      route: `/chapters/${chapterNumber}#code-lab`,
      tags: [card.family, ...card.tags],
      ...ringPoint("code", index, codeCards.length),
    });
    addEdge({
      id: edgeId(algorithm ? nodeId(chapterNumber, "algorithm", algorithm.name) : centerId, id, "code"),
      chapter: chapterNumber,
      from: algorithm ? nodeId(chapterNumber, "algorithm", algorithm.name) : centerId,
      to: id,
      relation: "method becomes implementation",
      easy: `The code lab turns the method into variables, loops, tests, and debug checks.`,
      technical: `The implementation node exposes scaffold code, invariants, tiny tests, and failure-mode debugging for the algorithm.`,
    });
  });

  assumptionCards.forEach((card, index) => {
    const id = nodeId(chapterNumber, "assumption", card.title);
    const algorithm = algorithms.find((item) => item.id === card.algorithmId) ?? algorithms[index % Math.max(algorithms.length, 1)];
    addNode({
      id,
      chapter: chapterNumber,
      kind: "assumption",
      title: card.title.replace(" assumptions and guarantee", ""),
      easy: card.plain,
      technical: `${card.guarantee} Failure: ${card.failure}`,
      route: `/chapters/${chapterNumber}#assumptions`,
      tags: [card.family, ...card.tags],
      ...ringPoint("assumption", index, assumptionCards.length),
    });
    addEdge({
      id: edgeId(algorithm ? nodeId(chapterNumber, "algorithm", algorithm.name) : centerId, id, "assumption"),
      chapter: chapterNumber,
      from: algorithm ? nodeId(chapterNumber, "algorithm", algorithm.name) : centerId,
      to: id,
      relation: "method earns conditions",
      easy: `The assumption clinic asks when the method deserves trust and what breaks first.`,
      technical: `The assumption node exposes data, target, update, representation, guarantee, failure, and repair conditions.`,
    });
  });

  examples.forEach((example, index) => {
    const id = nodeId(chapterNumber, "example", example.title);
    const algorithm = algorithms[index % Math.max(algorithms.length, 1)];
    addNode({
      id,
      chapter: chapterNumber,
      kind: "example",
      title: example.title,
      easy: `${example.scenario} ${example.plainWalkthrough}`,
      technical: `${example.technicalTrace} ${example.answerCheck}`,
      route: `/chapters/${chapterNumber}#worked`,
      tags: [example.kind, ...example.tags],
      ...ringPoint("example", index, examples.length),
    });
    addEdge({
      id: edgeId(algorithm ? nodeId(chapterNumber, "algorithm", algorithm.name) : centerId, id, "example"),
      chapter: chapterNumber,
      from: algorithm ? nodeId(chapterNumber, "algorithm", algorithm.name) : centerId,
      to: id,
      relation: "method gets traced",
      easy: `The example lets you follow the method with a finger before trusting the abstraction.`,
      technical: `The worked node asks for data, target, update, pitfall, and answer-check evidence.`,
    });
  });

  practice.forEach((card, index) => {
    const id = nodeId(chapterNumber, "practice", card.title);
    const example = examples[index % Math.max(examples.length, 1)];
    addNode({
      id,
      chapter: chapterNumber,
      kind: "practice",
      title: card.title,
      easy: `${card.prompt} Hint: ${card.hint}`,
      technical: `${card.solution} Trap: ${card.trap} Transfer: ${card.transfer}`,
      route: `/chapters/${chapterNumber}#practice`,
      tags: [card.skill, ...card.tags],
      ...ringPoint("practice", index, practice.length),
    });
    addEdge({
      id: edgeId(example ? nodeId(chapterNumber, "example", example.title) : centerId, id, "practice"),
      chapter: chapterNumber,
      from: example ? nodeId(chapterNumber, "example", example.title) : centerId,
      to: id,
      relation: "example becomes recall",
      easy: `Try the checkpoint after the example so the idea becomes yours.`,
      technical: `The recall node tests explanation, drawing, mathematical translation, method choice, trap repair, and transfer.`,
    });
  });

  exerciseSolutions.forEach((card, index) => {
    const id = nodeId(chapterNumber, "exercise", `${card.exerciseId}-${card.title}`);
    const practiceCard = practice[index % Math.max(practice.length, 1)];
    addNode({
      id,
      chapter: chapterNumber,
      kind: "exercise",
      title: `Exercise ${card.exerciseId}: ${card.title.replace(" solution studio", "")}`,
      easy: `${card.attemptPrompt} Hint: ${card.hint[0]}`,
      technical: `${card.technicalSolution} Debug: ${card.debugChecklist[0]}`,
      route: `/chapters/${chapterNumber}#exercise-solutions`,
      tags: [card.kind, ...card.tags],
      ...ringPoint("exercise", index, exerciseSolutions.length),
    });
    addEdge({
      id: edgeId(practiceCard ? nodeId(chapterNumber, "practice", practiceCard.title) : centerId, id, "exercise"),
      chapter: chapterNumber,
      from: practiceCard ? nodeId(chapterNumber, "practice", practiceCard.title) : centerId,
      to: id,
      relation: "recall becomes exercise solution",
      easy: `The exercise solution node asks the learner to attempt, hint, solve, debug, and extend a numbered practice problem.`,
      technical: `The solution node exposes attempt prompt, mini-world, hint sequence, technical solution, debug checklist, grading rubric, and extension challenge.`,
    });
  });

  examCards.forEach((card, index) => {
    const id = nodeId(chapterNumber, "exam", card.title);
    const exerciseCard = exerciseSolutions[index % Math.max(exerciseSolutions.length, 1)];
    const practiceCard = practice[index % Math.max(practice.length, 1)];
    const priorNode = exerciseCard ? nodeId(chapterNumber, "exercise", `${exerciseCard.exerciseId}-${exerciseCard.title}`) : practiceCard ? nodeId(chapterNumber, "practice", practiceCard.title) : centerId;
    addNode({
      id,
      chapter: chapterNumber,
      kind: "exam",
      title: card.title,
      easy: `${card.prompt} Diagnostic: ${card.diagnostic}`,
      technical: `${card.solution} Rubric: ${card.rubric.join(" ")}`,
      route: `/chapters/${chapterNumber}#exam`,
      tags: [card.kind, ...card.tags],
      ...ringPoint("exam", index, examCards.length),
    });
    addEdge({
      id: edgeId(priorNode, id, "exam"),
      chapter: chapterNumber,
      from: priorNode,
      to: id,
      relation: "practice becomes exam",
      easy: `The exam card asks the learner to prove the chapter after recall and exercise-solution practice.`,
      technical: `The exam node packages prompt, plan, solution, rubric, diagnostic, and transfer into a mastery check.`,
    });
  });

  projectCards.forEach((card, index) => {
    const id = nodeId(chapterNumber, "project", card.title);
    const examCard = examCards[index % Math.max(examCards.length, 1)];
    const codeCard = codeCards[index % Math.max(codeCards.length, 1)];
    const caseStudy = caseStudies[index % Math.max(caseStudies.length, 1)];
    const priorNode = examCard ? nodeId(chapterNumber, "exam", examCard.title) : codeCard ? nodeId(chapterNumber, "code", codeCard.title) : caseStudy ? nodeId(chapterNumber, "case", caseStudy.title) : centerId;
    addNode({
      id,
      chapter: chapterNumber,
      kind: "project",
      title: card.title,
      easy: `${card.drivingQuestion} ${card.brief}`,
      technical: `${card.technicalFrame} Rubric: ${card.rubric.join(" ")}`,
      route: `/chapters/${chapterNumber}#projects`,
      tags: [card.sourceLabel, ...card.tags],
      ...ringPoint("project", index, projectCards.length),
    });
    addEdge({
      id: edgeId(priorNode, id, "project"),
      chapter: chapterNumber,
      from: priorNode,
      to: id,
      relation: "mastery becomes project",
      easy: `The project node turns chapter study into a buildable artifact, tiny experiment, rubric check, and transfer extension.`,
      technical: `The project node exposes driving question, build milestones, experiment plan, technical frame, rubric, deliverables, and extension challenge.`,
    });
  });

  evidenceReplays.forEach((card, index) => {
    const id = nodeId(chapterNumber, "evidence", `${card.ref}-${card.title}`);
    const project = projectCards[index % Math.max(projectCards.length, 1)];
    const examCard = examCards[index % Math.max(examCards.length, 1)];
    const caseStudy = caseStudies[index % Math.max(caseStudies.length, 1)];
    const priorNode = project ? nodeId(chapterNumber, "project", project.title) : examCard ? nodeId(chapterNumber, "exam", examCard.title) : caseStudy ? nodeId(chapterNumber, "case", caseStudy.title) : centerId;
    addNode({
      id,
      chapter: chapterNumber,
      kind: "evidence",
      title: `${card.ref}: ${card.title}`,
      easy: card.plainRead,
      technical: `${card.technicalFrame} Pitfall: ${card.pitfall}`,
      route: `/chapters/${chapterNumber}#evidence-replay`,
      tags: [card.kind, card.ref, ...card.tags],
      ...ringPoint("evidence", index, evidenceReplays.length),
    });
    addEdge({
      id: edgeId(priorNode, id, "evidence replay"),
      chapter: chapterNumber,
      from: priorNode,
      to: id,
      relation: "chapter artifact becomes evidence replay",
      easy: `The evidence node turns ${card.ref} into read, reconstruct, technical, pitfall, and transfer practice.`,
      technical: `The evidence replay node preserves the original anchor as an interpreted mechanism without reproducing source artwork or prose.`,
    });
  });

  const simulatorId = nodeId(chapterNumber, "simulator", simulator.title);
  addNode({
    id: simulatorId,
    chapter: chapterNumber,
    kind: "simulator",
    title: simulator.title,
    easy: `${simulator.question} ${simulator.setup}`,
    technical: `${simulator.technicalGuide} ${simulator.pitfall}`,
    route: `/chapters/${chapterNumber}#simulators`,
    tags: ["simulator", ...simulator.tags],
    x: 50,
    y: 93,
  });
  addEdge({
    id: edgeId(centerId, simulatorId, "experiment"),
    chapter: chapterNumber,
    from: centerId,
    to: simulatorId,
    relation: "chapter becomes experiment",
    easy: "The simulator exposes the knobs behind the chapter so the idea can be felt, not only read.",
    technical: "Exploration, update strength, and horizon controls show learning speed, stability, bias, and variance tradeoffs.",
  });

  dependencies.incoming.slice(0, 3).forEach((link, index) => {
    const id = nodeId(chapterNumber, "prerequisite", `${link.chapter}-${link.title}`);
    addNode({
      id,
      chapter: chapterNumber,
      kind: "prerequisite",
      title: `Prerequisite: Ch ${link.chapter}`,
      easy: link.easy,
      technical: link.technical,
      route: `/chapters/${link.chapter}`,
      tags: ["prerequisite", link.relation, link.title],
      x: 12,
      y: 22 + index * 15,
    });
    addEdge({
      id: edgeId(id, centerId, "prerequisite"),
      chapter: chapterNumber,
      from: id,
      to: centerId,
      relation: "feeds this chapter",
      easy: `Chapter ${link.chapter} supplies a mental object used here.`,
      technical: link.technical,
    });
  });

  dependencies.outgoing.slice(0, 3).forEach((link, index) => {
    const id = nodeId(chapterNumber, "unlock", `${link.chapter}-${link.title}`);
    addNode({
      id,
      chapter: chapterNumber,
      kind: "unlock",
      title: `Unlocks: Ch ${link.chapter}`,
      easy: link.easy,
      technical: link.technical,
      route: `/chapters/${link.chapter}`,
      tags: ["unlock", link.relation, link.title],
      x: 88,
      y: 22 + index * 15,
    });
    addEdge({
      id: edgeId(centerId, id, "unlock"),
      chapter: chapterNumber,
      from: centerId,
      to: id,
      relation: "unlocks later chapter",
      easy: `This chapter makes Chapter ${link.chapter} easier to read.`,
      technical: link.technical,
    });
  });

  return {
    chapter: chapterNumber,
    title: chapter.title,
    promise: `Graphical map for Chapter ${chapterNumber}: start from the chapter node, move through foundation terms, math rescue objects, visual story scenes, analogy bridges, Socratic tutor dialogues, case studies, concepts, section mastery checks, formulas, decoded symbols, proof sketches, methods, comparison boards, code scaffolds, assumptions, examples, practice, exercise solutions, chapter exams, project builds, evidence replays, and simulator knobs, then check prerequisites and unlocks.`,
    route: `/chapters/${chapterNumber}`,
    nodes,
    edges,
    readingPath: [
      "Read the center chapter promise.",
      "Click foundation nodes until the vocabulary has a plain meaning, board picture, technical role, trap, and teach-back check.",
      "Click math rescue nodes until returns, expectations, backups, gradients, ratios, traces, and updates have intuition before notation.",
      "Click visual story nodes to watch learner, world, choice, feedback, memory, and next move before formulas appear.",
      "Click analogy nodes to map a familiar story into exact RL objects and read the limits before trusting it.",
      "Click tutor nodes to ask a beginner question, take a hint, draw the board, read the technical answer, and try a fresh case.",
      "Click case nodes to run one complete scenario through scene, board walk, technical translation, debug probe, and transfer.",
      "Click concept nodes until the plain story is clear.",
      "Open section mastery nodes to test whether you can teach each named section cold.",
      "Move to formulas only after you can draw the concept and pass the section check.",
      "Decode symbol nodes before opening proof nodes that explain why the equation or chapter claim is valid.",
      "Use algorithm nodes to name the procedure, then comparison nodes to choose among nearby methods by data, target, backup style, model use, and failure risk.",
      "Use code nodes to turn the chosen method into variables, loops, invariants, and tests.",
      "Open assumption nodes to see when the method is valid, what guarantee it wants, and how to repair broken conditions.",
      "Use examples and practice nodes to rehearse the idea, then open exercise solution nodes to attempt, debug, and extend numbered problems.",
      "Open exam nodes to grade and transfer mastery.",
      "Open project nodes to build an artifact, run an experiment, grade it with a rubric, and transfer it.",
      "Open evidence nodes to read, reconstruct, translate, debug, and transfer the chapter figures, tables, and examples.",
      "Use simulator nodes to test whether the chapter story survives knob changes.",
    ],
    legend: graphLegend,
  };
}

export function learningGraphNodeCount(chapter?: number): number {
  const graphs = typeof chapter === "number" ? [learningGraphForChapter(chapter)] : allLearningGraphs();
  return graphs.reduce((sum, graph) => sum + graph.nodes.length, 0);
}

export function learningGraphEdgeCount(chapter?: number): number {
  const graphs = typeof chapter === "number" ? [learningGraphForChapter(chapter)] : allLearningGraphs();
  return graphs.reduce((sum, graph) => sum + graph.edges.length, 0);
}

export function learningGraphChapterCount(): number {
  return allLearningGraphs().length;
}

export const graphLegend: ChapterLearningGraph["legend"] = [
  { kind: "chapter", label: "Chapter center", easy: "The main question of the chapter.", technical: "The formal objects and assumptions that define the chapter." },
  { kind: "foundation", label: "Foundation term", easy: "A word learned from scratch before formulas use it.", technical: "Plain meaning, board picture, technical role, trap, and teach-back." },
  { kind: "math", label: "Math rescue", easy: "A calculation learned before notation gets dense.", technical: "Intuition, board picture, notation bridge, chapter use, pitfall, and self-check." },
  { kind: "story", label: "Visual story", easy: "A scene that makes the chapter visible before formulas.", technical: "Scene, observation, move, board animation, technical translation, pitfall, and check." },
  { kind: "analogy", label: "Analogy bridge", easy: "A familiar story mapped carefully to exact RL objects.", technical: "Everyday doorway, mapping rows, technical translation, limits, and transfer check." },
  { kind: "tutor", label: "Socratic tutor", easy: "A beginner question answered as a guided tutor loop.", technical: "Learner question, hint, board steps, technical answer, try-it prompt, expected answer, and misconception probe." },
  { kind: "case", label: "Case study", easy: "A complete scenario where the chapter idea works end to end.", technical: "Scene, learner goal, board frames, technical pass, debug probe, success checks, and transfer challenge." },
  { kind: "concept", label: "Concept", easy: "A word or idea you should be able to draw.", technical: "A chapter-specific object, distinction, or warning." },
  { kind: "section", label: "Section mastery", easy: "A named section turned into a teach-back checkpoint.", technical: "Prompt, hint, answer, technical pass, diagnostic, and transfer for a section." },
  { kind: "formula", label: "Formula", easy: "A compact way to say the idea exactly.", technical: "Symbols, targets, expectations, and watch-outs." },
  { kind: "symbol", label: "Symbol", easy: "A mathematical mark decoded in plain English.", technical: "Notation semantics, formula context, pitfalls, and self-checks." },
  { kind: "proof", label: "Proof", easy: "Why the claim should be believed.", technical: "Claim, ingredients, proof sketch, equation bridge, and stress test." },
  { kind: "algorithm", label: "Algorithm", easy: "The procedure that changes estimates or behavior.", technical: "Target, residual, update, control pressure, and failure mode." },
  { kind: "compare", label: "Method comparison", easy: "When to choose one method over a nearby alternative.", technical: "Choice criteria, profile axes, tradeoffs, failure checks, and transfer bridges." },
  { kind: "code", label: "Code lab", easy: "A method rewritten as implementation scaffolding.", technical: "State, target, update, invariants, tests, and debug checks." },
  { kind: "assumption", label: "Assumption", easy: "When the method deserves trust.", technical: "Data, target, update, representation, guarantee, failure, and repair conditions." },
  { kind: "example", label: "Worked example", easy: "A tiny world where the idea moves.", technical: "Trace-level evidence for the update." },
  { kind: "practice", label: "Practice", easy: "A checkpoint to test ownership.", technical: "Prompt, solution, trap, and transfer." },
  { kind: "exercise", label: "Exercise solution", easy: "A numbered practice problem turned into an attempt-hint-solution loop.", technical: "Attempt prompt, mini-world, hint, technical solution, debug checklist, rubric, and extension." },
  { kind: "exam", label: "Chapter exam", easy: "A self-graded mastery prompt.", technical: "Prompt, plan, solution, rubric, diagnostic, and transfer." },
  { kind: "project", label: "Project studio", easy: "A buildable proof that the chapter can be used.", technical: "Driving question, build milestones, experiment plan, technical frame, rubric, deliverables, and extension." },
  { kind: "evidence", label: "Evidence replay", easy: "A figure, table, or example rebuilt as a reusable mechanism.", technical: "Read, reconstruct, technical frame, pitfall, and transfer modes for book anchors." },
  { kind: "simulator", label: "Simulator", easy: "A live knob model of the chapter.", technical: "Exploration, step-size, horizon, and stability tradeoffs." },
  { kind: "prerequisite", label: "Prerequisite", easy: "Earlier chapters feeding this one.", technical: "Incoming assumptions and notation." },
  { kind: "unlock", label: "Unlock", easy: "Later chapters made easier.", technical: "Outgoing abstractions and limitations." },
];

function ringPoint(kind: LearningGraphNodeKind, index: number, total: number): { x: number; y: number } {
  const lanes: Record<string, { start: number; end: number; radius: number }> = {
    foundation: { start: 185, end: 325, radius: 24 },
    math: { start: 250, end: 390, radius: 28 },
    story: { start: 145, end: 285, radius: 32 },
    analogy: { start: 125, end: 245, radius: 40 },
    tutor: { start: 110, end: 235, radius: 44 },
    case: { start: 95, end: 220, radius: 47 },
    concept: { start: 205, end: 335, radius: 36 },
    section: { start: 175, end: 265, radius: 30 },
    formula: { start: 300, end: 420, radius: 25 },
    symbol: { start: 255, end: 375, radius: 41 },
    proof: { start: 285, end: 405, radius: 33 },
    algorithm: { start: 25, end: 155, radius: 34 },
    compare: { start: 350, end: 470, radius: 38 },
    code: { start: 15, end: 145, radius: 43 },
    assumption: { start: 335, end: 455, radius: 45 },
    example: { start: 65, end: 150, radius: 48 },
    practice: { start: 210, end: 300, radius: 49 },
    exercise: { start: 95, end: 190, radius: 54 },
    exam: { start: 150, end: 245, radius: 56 },
    project: { start: 300, end: 390, radius: 55 },
    evidence: { start: 235, end: 330, radius: 58 },
  };
  const lane = lanes[kind] ?? { start: 0, end: 360, radius: 38 };
  const angle = total <= 1 ? (lane.start + lane.end) / 2 : lane.start + ((lane.end - lane.start) * index) / (total - 1);
  const rad = (Math.PI / 180) * angle;
  return { x: Math.round(50 + Math.cos(rad) * lane.radius), y: Math.round(50 + Math.sin(rad) * lane.radius) };
}

function nodeId(chapter: number, kind: string, title: string) {
  return `ch-${chapter}-${kind}-${slug(title)}`;
}

function edgeId(from: string, to: string, relation: string) {
  return `${from}--${slug(relation)}--${to}`;
}

function compactTags(tags: Array<string | undefined | null>) {
  return Array.from(new Set(tags.filter(Boolean).map((tag) => String(tag).trim()).filter(Boolean))).slice(0, 10);
}

function slug(value: string) {
  return value
    .toLowerCase()
    .replace(/'/g, "-prime")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 64) || "node";
}

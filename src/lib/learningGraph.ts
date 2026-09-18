import { algorithmsForChapter } from "@/lib/algorithmCatalog";
import { chapterDependencyMap } from "@/lib/chapterDependencyMap";
import { practiceCardsForChapter } from "@/lib/chapterPractice";
import { simulatorForChapter } from "@/lib/chapterSimulators";
import { workedExamplesForChapter } from "@/lib/chapterWorkedExamples";
import { conceptCardsForChapter } from "@/lib/conceptAtlas";
import { formulasForChapter } from "@/lib/formulaAtlas";
import { chapters } from "@/lib/paper";
import { symbolCardsForChapter } from "@/lib/symbolAtlas";

export type LearningGraphNodeKind = "chapter" | "concept" | "formula" | "symbol" | "algorithm" | "example" | "practice" | "simulator" | "prerequisite" | "unlock";

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
  const concepts = conceptCardsForChapter(chapterNumber).slice(0, 6);
  const formulas = formulasForChapter(chapterNumber).slice(0, 4);
  const symbols = symbolCardsForChapter(chapterNumber).slice(0, 5);
  const examples = workedExamplesForChapter(chapterNumber).slice(0, 4);
  const practice = practiceCardsForChapter(chapterNumber).slice(0, 3);
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
    addEdge({
      id: edgeId(centerId, id, "concept"),
      chapter: chapterNumber,
      from: centerId,
      to: id,
      relation: "chapter explains concept",
      easy: `Chapter ${chapterNumber} uses ${concept.term} as a named handle for the learner's story.`,
      technical: `The concept node inherits the chapter's formal objects and narrows them through ${concept.section}.`,
    });
  });

  formulas.forEach((formula, index) => {
    const id = nodeId(chapterNumber, "formula", formula.label);
    const concept = concepts[index % Math.max(concepts.length, 1)];
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
      id: edgeId(concept?.id ?? centerId, id, "formula"),
      chapter: chapterNumber,
      from: concept ? nodeId(chapterNumber, "concept", concept.term) : centerId,
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
    promise: `Graphical map for Chapter ${chapterNumber}: start from the chapter node, move through concepts, formulas, decoded symbols, methods, examples, practice, and simulator knobs, then check prerequisites and unlocks.`,
    route: `/chapters/${chapterNumber}`,
    nodes,
    edges,
    readingPath: [
      "Read the center chapter promise.",
      "Click concept nodes until the plain story is clear.",
      "Move to formulas only after you can draw the concept.",
      "Decode symbol nodes before using algorithm nodes to see how notation becomes update steps.",
      "Use examples, practice, and simulator nodes to prove transfer.",
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
  { kind: "concept", label: "Concept", easy: "A word or idea you should be able to draw.", technical: "A chapter-specific object, distinction, or warning." },
  { kind: "formula", label: "Formula", easy: "A compact way to say the idea exactly.", technical: "Symbols, targets, expectations, and watch-outs." },
  { kind: "symbol", label: "Symbol", easy: "A mathematical mark decoded in plain English.", technical: "Notation semantics, formula context, pitfalls, and self-checks." },
  { kind: "algorithm", label: "Algorithm", easy: "The procedure that changes estimates or behavior.", technical: "Target, residual, update, control pressure, and failure mode." },
  { kind: "example", label: "Worked example", easy: "A tiny world where the idea moves.", technical: "Trace-level evidence for the update." },
  { kind: "practice", label: "Practice", easy: "A checkpoint to test ownership.", technical: "Prompt, solution, trap, and transfer." },
  { kind: "simulator", label: "Simulator", easy: "A live knob model of the chapter.", technical: "Exploration, step-size, horizon, and stability tradeoffs." },
  { kind: "prerequisite", label: "Prerequisite", easy: "Earlier chapters feeding this one.", technical: "Incoming assumptions and notation." },
  { kind: "unlock", label: "Unlock", easy: "Later chapters made easier.", technical: "Outgoing abstractions and limitations." },
];

function ringPoint(kind: LearningGraphNodeKind, index: number, total: number): { x: number; y: number } {
  const lanes: Record<string, { start: number; end: number; radius: number }> = {
    concept: { start: 205, end: 335, radius: 34 },
    formula: { start: 300, end: 420, radius: 25 },
    symbol: { start: 255, end: 375, radius: 41 },
    algorithm: { start: 25, end: 155, radius: 34 },
    example: { start: 65, end: 150, radius: 48 },
    practice: { start: 210, end: 300, radius: 49 },
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

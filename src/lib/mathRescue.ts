import { algorithmsForChapter } from "@/lib/algorithmCatalog";
import { conceptCardsForChapter } from "@/lib/conceptAtlas";
import { formulasForChapter } from "@/lib/formulaAtlas";
import { chapters, type Chapter } from "@/lib/paper";
import { zeroKnowledgeLadderForChapter } from "@/lib/zeroKnowledgeLadders";

export const mathRescueModes = ["intuition", "picture", "notation", "use", "check"] as const;

export type MathRescueMode = (typeof mathRescueModes)[number];
export type MathRescueSource = "formula" | "concept" | "algorithm" | "starter";

export interface MathRescueCard {
  id: string;
  chapter: number;
  chapterTitle: string;
  part: string;
  object: string;
  source: MathRescueSource;
  sourceLabel: string;
  route: string;
  intuition: string;
  boardPicture: string;
  notationBridge: string;
  chapterUse: string;
  selfCheck: string;
  pitfall: string;
  symbols: string[];
  tags: string[];
}

type Candidate = Omit<MathRescueCard, "id" | "chapter" | "chapterTitle" | "part" | "route" | "tags"> & { tags: string[] };

let cachedCards: MathRescueCard[] | undefined;

export function allMathRescueCards(): MathRescueCard[] {
  cachedCards ??= chapters.flatMap((chapter) => mathRescueCardsForChapter(chapter.n));
  return cachedCards;
}

export function mathRescueCardsForChapter(chapterNumber: number): MathRescueCard[] {
  const chapter = chapters.find((entry) => entry.n === chapterNumber);
  if (!chapter) throw new Error(`Missing chapter ${chapterNumber}`);

  const candidates = mathRescueCandidatesForChapter(chapter);
  const chosen = roundRobinUnique(candidates, 10);

  return chosen.map((candidate, index) => ({
    id: `math-rescue-ch${chapter.n}-${slug(candidate.object)}-${index + 1}`,
    chapter: chapter.n,
    chapterTitle: chapter.title,
    part: chapter.part,
    route: `/chapters/${chapter.n}#math-rescue`,
    ...candidate,
    tags: compactTags(["math rescue", candidate.source, `Chapter ${chapter.n}`, chapter.part, ...candidate.tags, ...candidate.symbols, ...chapter.keyIdeas.slice(0, 2)]),
  }));
}

export function mathRescueCardCount(chapter?: number): number {
  return typeof chapter === "number" ? mathRescueCardsForChapter(chapter).length : allMathRescueCards().length;
}

export function mathRescueModeCount(chapter?: number): number {
  return mathRescueCardCount(chapter) * mathRescueModes.length;
}

export function mathRescueChapterCount(): number {
  return new Set(allMathRescueCards().map((card) => card.chapter)).size;
}

export function mathRescueObjectCount(): number {
  return new Set(allMathRescueCards().map((card) => normalize(card.object))).size;
}

export function mathRescueSymbolCount(): number {
  return new Set(allMathRescueCards().flatMap((card) => card.symbols.map(normalize)).filter(Boolean)).size;
}

export function mathRescueSourceCount(): number {
  return new Set(allMathRescueCards().map((card) => card.source)).size;
}

function mathRescueCandidatesForChapter(chapter: Chapter): Candidate[][] {
  const formulas = formulasForChapter(chapter.n).slice(0, 5).map((formula): Candidate => ({
    object: formula.label,
    source: "formula",
    sourceLabel: "formula bridge",
    intuition: formula.easy,
    boardPicture: `Draw ${formula.label} as a story before writing symbols: put the thing being estimated on the left, the evidence or target on the right, and arrows for what is averaged, discounted, bootstrapped, sampled, or optimized.`,
    notationBridge: `${formula.technical} Formal shape: ${formula.tex}. Say every symbol aloud: ${formula.symbols.join(", ") || "the chapter objects"}.`,
    chapterUse: `${formula.useWhen} In Chapter ${chapter.n}, this mathematical object supports the claim: ${chapter.claim}`,
    selfCheck: `Cover the equation and explain ${formula.label} in three steps: what is known, what is random or estimated, and what update or comparison the chapter performs next.`,
    pitfall: formula.watchOut,
    symbols: formula.symbols,
    tags: [formula.family, formula.label],
  }));

  const concepts = conceptCardsForChapter(chapter.n).slice(0, 5).map((concept): Candidate => ({
    object: concept.term,
    source: "concept",
    sourceLabel: "concept-to-math bridge",
    intuition: concept.plain,
    boardPicture: concept.visual,
    notationBridge: `${concept.technical} Treat this as the mathematical role behind the word, not as a memorized definition.`,
    chapterUse: `Chapter ${chapter.n} uses ${concept.term} inside ${concept.section} to move from the easy story toward the technical object: ${chapter.technical}`,
    selfCheck: concept.check,
    pitfall: concept.contrast,
    symbols: inferSymbols(concept.term),
    tags: [concept.kind, concept.section, ...concept.tags],
  }));

  const algorithms = algorithmsForChapter(chapter.n).slice(0, 4).map((algorithm): Candidate => ({
    object: `${algorithm.name} update logic`,
    source: "algorithm",
    sourceLabel: "algorithm math bridge",
    intuition: algorithm.plain,
    boardPicture: `Draw ${algorithm.name} as estimate → target → error → update. Put data on the left, the target in the middle, the changed value/policy/weights on the right, and the diagnostic underneath.`,
    notationBridge: `${algorithm.technical} Core mathematical move: ${algorithm.coreUpdate || "define the objects before an update is possible"}.`,
    chapterUse: `Use this when Chapter ${chapter.n} asks how a mathematical target becomes a step-by-step learning procedure. Objective: ${algorithm.objective}`,
    selfCheck: `Run a one-transition toy example and name: stored object, target, error, step-size or optimizer, and the condition that would make the update invalid.`,
    pitfall: algorithm.failureModes[0] ?? `Do not apply ${algorithm.name} without checking the data, target, and representation assumptions first.`,
    symbols: inferSymbols(`${algorithm.name} ${algorithm.coreUpdate} ${algorithm.equations.join(" ")}`),
    tags: [algorithm.family, algorithm.name, ...algorithm.related],
  }));

  const starter = zeroKnowledgeLadderForChapter(chapter.n).rungs.slice(0, 5).map((rung): Candidate => ({
    object: `${rung.title} as math`,
    source: "starter",
    sourceLabel: "from-scratch premise",
    intuition: rung.plain,
    boardPicture: rung.visual,
    notationBridge: `${rung.technical} The math later turns this premise into named random variables, estimates, policies, targets, or updates.`,
    chapterUse: `Before the formulas in Chapter ${chapter.n}, this premise explains why the chapter needs a technical object at all: ${chapter.claim}`,
    selfCheck: rung.practice,
    pitfall: `Do not jump from the story to algebra until you can say what ${rung.title.toLowerCase()} contributes to state, action, reward, return, value, policy, model, target, or update.`,
    symbols: rung.tags,
    tags: rung.tags,
  }));

  return [formulas, concepts, algorithms, starter];
}

function roundRobinUnique(pools: Candidate[][], limit: number): Candidate[] {
  const selected: Candidate[] = [];
  const seen = new Set<string>();
  const maxLength = Math.max(...pools.map((pool) => pool.length));
  for (let row = 0; row < maxLength && selected.length < limit; row++) {
    for (const pool of pools) {
      const candidate = pool[row];
      if (!candidate) continue;
      const key = normalize(candidate.object);
      if (!key || seen.has(key)) continue;
      seen.add(key);
      selected.push(candidate);
      if (selected.length >= limit) break;
    }
  }
  return selected;
}

function inferSymbols(text: string) {
  const matches = text.match(/[A-Z]_[a-zA-Z0-9{}\\]+|[A-Z]\([^)]+\)|[a-zA-Z]_[a-zA-Z0-9{}\\]+|\\[a-zA-Z]+|\b(?:alpha|gamma|lambda|theta|epsilon|rho|delta|w|pi|v|q|Q|V|G|R|S|A)\b/g) ?? [];
  return compactTags(matches.map((item) => item.replace(/[{}]/g, ""))).slice(0, 6);
}

function compactTags(tags: Array<string | undefined | null>) {
  return Array.from(new Set(tags.filter(Boolean).map((tag) => String(tag).trim()).filter(Boolean))).slice(0, 14);
}

function normalize(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9\\]+/g, " ").trim();
}

function slug(value: string) {
  return normalize(value).replace(/\\+/g, " lambda ").replace(/\s+/g, "-").slice(0, 72) || "object";
}

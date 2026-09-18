import { algorithmCatalog, algorithmsForChapter, type AlgorithmDetail } from "@/lib/algorithmCatalog";
import { algorithmProfile, profileRows } from "@/lib/algorithmProfiles";
import { chapters } from "@/lib/paper";

export const methodCompareModes = ["choose", "axis", "tradeoff", "failure", "bridge"] as const;

export type MethodCompareMode = (typeof methodCompareModes)[number];

export interface MethodCompareCard {
  id: string;
  algorithmId: string;
  chapter: number;
  chapterTitle: string;
  family: string;
  title: string;
  algorithmName: string;
  route: string;
  compareWith: string;
  primaryQuestion: string;
  plainComparison: string;
  technicalComparison: string;
  chooseWhen: string[];
  axisRows: { label: string; current: string; contrast: string }[];
  tradeoff: string;
  failureMode: string;
  bridge: string;
  tags: string[];
}

let cachedCards: MethodCompareCard[] | undefined;

export function allMethodCompareCards(): MethodCompareCard[] {
  cachedCards ??= algorithmCatalog.map(methodCompareCardForAlgorithm);
  return cachedCards;
}

export function methodCompareCardsForChapter(chapter: number): MethodCompareCard[] {
  return allMethodCompareCards().filter((card) => card.chapter === chapter);
}

export function methodCompareCardsForFamily(family: string): MethodCompareCard[] {
  return allMethodCompareCards().filter((card) => card.family === family);
}

export function methodCompareCardCount(chapter?: number): number {
  return typeof chapter === "number" ? methodCompareCardsForChapter(chapter).length : allMethodCompareCards().length;
}

export function methodCompareModeCount(chapter?: number): number {
  return methodCompareCardCount(chapter) * methodCompareModes.length;
}

export function methodCompareChapterCount(): number {
  return new Set(allMethodCompareCards().map((card) => card.chapter)).size;
}

export function methodCompareFamilyCount(): number {
  return new Set(allMethodCompareCards().map((card) => card.family)).size;
}

function methodCompareCardForAlgorithm(algorithm: AlgorithmDetail): MethodCompareCard {
  const chapter = chapters.find((entry) => entry.n === algorithm.chapter);
  if (!chapter) throw new Error(`Missing chapter ${algorithm.chapter}`);

  const contrast = contrastAlgorithm(algorithm);
  const profile = algorithmProfile(algorithm);
  const contrastProfile = algorithmProfile(contrast);
  const rows = profileRows(profile);
  const contrastRows = profileRows(contrastProfile);
  const axisRows = rows.slice(0, 8).map(([label, current], index) => ({
    label,
    current,
    contrast: contrastRows[index]?.[1] ?? contrast.technical,
  }));
  const axisSummary = axisRows.slice(0, 4).map((row) => `${row.label.toLowerCase()}: ${row.current}`).join("; ");
  const contrastAxisSummary = axisRows.slice(0, 4).map((row) => `${row.label.toLowerCase()}: ${row.contrast}`).join("; ");

  return {
    id: `method-compare-${algorithm.id}-${slug(contrast.id)}`,
    algorithmId: algorithm.id,
    chapter: algorithm.chapter,
    chapterTitle: chapter.title,
    family: algorithm.family,
    title: `${algorithm.name} comparison studio`,
    algorithmName: algorithm.name,
    route: `/chapters/${algorithm.chapter}#method-compare`,
    compareWith: contrast.name,
    primaryQuestion: `When should I use ${algorithm.name} instead of ${contrast.name}?`,
    plainComparison: `${algorithm.name} is useful when the learner's immediate job is: ${algorithm.objective.toLowerCase()} Compare it with ${contrast.name}: ${contrast.plain} The practical question is not which name sounds more advanced; it is which information the learner has, which target it can build, and how much variance, bias, computation, or modeling risk it can tolerate.`,
    technicalComparison: `Technical comparison: ${algorithm.name} uses ${axisSummary}. ${contrast.name} instead emphasizes ${contrastAxisSummary}. The difference becomes operational in the target construction, policy relation, model access, and credit-assignment path before the update line is even run.`,
    chooseWhen: compactList([
      `Choose ${algorithm.name} when the chapter task matches this objective: ${algorithm.objective}`,
      `Use it when this core update or decision rule is the right mental object: ${algorithm.coreUpdate}`,
      `Prefer it when its data contract fits: ${profile.dataRegime}`,
      `Prefer ${contrast.name} when the setup instead looks like: ${contrast.objective}`,
      `Before choosing, name the state/action/value or policy object; if that object is not available, the method choice is premature.`,
    ]),
    axisRows,
    tradeoff: tradeoffFrame(algorithm, contrast, profile.bestUse, profile.avoidWhen),
    failureMode: failureFrame(algorithm, contrast, profile.avoidWhen),
    bridge: bridgeFrame(algorithm, contrast, chapter),
    tags: compactTags(["method comparison", `Chapter ${algorithm.chapter}`, chapter.part, algorithm.family, algorithm.name, contrast.name, ...algorithm.related, ...chapter.keyIdeas.slice(0, 3)]),
  };
}

function contrastAlgorithm(algorithm: AlgorithmDetail): AlgorithmDetail {
  const related = algorithm.related.map((item) => item.toLowerCase());
  const namedRelated = algorithmCatalog.find((candidate) => candidate.id !== algorithm.id && related.some((term) => candidate.name.toLowerCase().includes(term) || candidate.family.toLowerCase().includes(term)));
  if (namedRelated) return namedRelated;

  const familyPeer = algorithmCatalog.find((candidate) => candidate.id !== algorithm.id && candidate.family === algorithm.family);
  if (familyPeer) return familyPeer;

  const chapterPeer = algorithmsForChapter(algorithm.chapter).find((candidate) => candidate.id !== algorithm.id);
  if (chapterPeer) return chapterPeer;

  return algorithmCatalog.find((candidate) => candidate.id !== algorithm.id) ?? algorithm;
}

function tradeoffFrame(algorithm: AlgorithmDetail, contrast: AlgorithmDetail, bestUse: string, avoidWhen: string) {
  return `Tradeoff board: ${algorithm.name} buys ${bestUse.toLowerCase()} The price is that ${avoidWhen.toLowerCase()} ${contrast.name} changes the bargain: it solves or softens a different pressure, but it also inherits its own target, data, and stability costs. A good comparison names the resource being spent—samples, model access, computation, memory, variance, bias, or stability—before naming a winner.`;
}

function failureFrame(algorithm: AlgorithmDetail, contrast: AlgorithmDetail, avoidWhen: string) {
  const firstFailure = algorithm.failureModes[0] ?? "the target or assumptions do not match the data";
  const contrastFailure = contrast.failureModes[0] ?? "the comparison method is solving a different problem";
  return `Failure check: ${algorithm.name} is fragile when ${firstFailure.toLowerCase()} Also watch this avoid-when rule: ${avoidWhen} If you switch to ${contrast.name}, do not assume the failure disappears; check whether ${contrastFailure.toLowerCase()} is now the active risk.`;
}

function bridgeFrame(algorithm: AlgorithmDetail, contrast: AlgorithmDetail, chapter: (typeof chapters)[number]) {
  return `Bridge forward: in Chapter ${chapter.n}, ${chapter.title}, compare methods by tracing the same tiny transition or episode through both procedures. First write the objects shared by both methods, then mark the line where ${algorithm.name} and ${contrast.name} diverge. That divergence is the advanced lesson: algorithm families differ by targets, behavior/target-policy relation, model use, backup depth, and representation, not just by names.`;
}

function compactList(items: Array<string | undefined | null>) {
  return items.filter(Boolean).map((item) => String(item).trim()).filter(Boolean).slice(0, 6);
}

function compactTags(tags: Array<string | undefined | null>) {
  return Array.from(new Set(tags.filter(Boolean).map((tag) => String(tag).trim()).filter(Boolean))).slice(0, 12);
}

function slug(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 72) || "method";
}

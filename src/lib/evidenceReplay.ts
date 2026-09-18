import { evidenceGuideItems, type EvidenceGuideItem, type EvidenceKind } from "@/lib/evidenceGuide";
import { chapters } from "@/lib/paper";

export const evidenceReplayModes = ["read", "reconstruct", "technical", "pitfall", "transfer"] as const;
export type EvidenceReplayMode = (typeof evidenceReplayModes)[number];

export interface EvidenceReplayCard {
  id: string;
  chapter: number;
  chapterTitle: string;
  kind: EvidenceKind;
  ref: string;
  title: string;
  route: string;
  sourceLabel: string;
  plainRead: string;
  reconstruction: string[];
  technicalFrame: string;
  pitfall: string;
  transfer: string;
  tags: string[];
}

let cachedCards: EvidenceReplayCard[] | undefined;

export function allEvidenceReplayCards(): EvidenceReplayCard[] {
  cachedCards ??= evidenceGuideItems.map((item, index) => replayCard(item, index));
  return cachedCards;
}

export function evidenceReplayCardsForChapter(chapter: number): EvidenceReplayCard[] {
  return allEvidenceReplayCards().filter((card) => card.chapter === chapter);
}

export function evidenceReplayCardCount(chapter?: number): number {
  return typeof chapter === "number" ? evidenceReplayCardsForChapter(chapter).length : allEvidenceReplayCards().length;
}

export function evidenceReplayModeCount(chapter?: number): number {
  return evidenceReplayCardCount(chapter) * evidenceReplayModes.length;
}

export function evidenceReplayChapterCount(): number {
  return new Set(allEvidenceReplayCards().map((card) => card.chapter)).size;
}

export function evidenceReplayReconstructionStepCount(chapter?: number): number {
  const cards = typeof chapter === "number" ? evidenceReplayCardsForChapter(chapter) : allEvidenceReplayCards();
  return cards.reduce((sum, card) => sum + card.reconstruction.length, 0);
}

export function evidenceReplayKindCount(kind?: EvidenceKind): number {
  return kind ? allEvidenceReplayCards().filter((card) => card.kind === kind).length : new Set(allEvidenceReplayCards().map((card) => card.kind)).size;
}

function replayCard(item: EvidenceGuideItem, index: number): EvidenceReplayCard {
  const chapter = chapters.find((entry) => entry.n === item.chapter);
  const kindPhrase = item.kind === "figure" ? "visual figure" : item.kind === "table" ? "summary table" : "worked example";
  const chapterTitle = chapter?.title ?? `Chapter ${item.chapter}`;
  const tags = compactTags([item.kind, item.ref, chapterTitle, ...item.tags]);
  return {
    id: `evidence-replay-ch${item.chapter}-${slug(item.ref)}-${slug(item.title)}-${index + 1}`,
    chapter: item.chapter,
    chapterTitle,
    kind: item.kind,
    ref: item.ref,
    title: item.title,
    route: `/chapters/${item.chapter}#evidence-replay`,
    sourceLabel: `${item.kind} replay`,
    plainRead: `Start by reading ${item.ref} as a ${kindPhrase}: ${item.easy} The learner's job is to name the moving parts before judging the result.`,
    reconstruction: reconstructionSteps(item, chapterTitle),
    technicalFrame: `Technical frame: ${item.technical} In Chapter ${item.chapter} (${chapterTitle}), this anchor should be tied back to ${joinList(item.tags.slice(0, 4)) || "the chapter's state, action, reward, value, policy, model, update, or objective"}. The safe interpretation is the one that preserves the same target, conditioning information, and sampling story from the picture/example/table into the equation or algorithm that follows.`,
    pitfall: pitfallFor(item),
    transfer: `Transfer test: redraw ${item.ref} for a two-state or two-action toy world, change one assumption such as reward noise, horizon, behavior policy, representation, or model access, and say which part of ${item.title} would change first while the core chapter idea remains intact.`,
    tags,
  };
}

function reconstructionSteps(item: EvidenceGuideItem, chapterTitle: string): string[] {
  const objectName = item.tags[0] ?? item.title;
  const mechanism = item.tags[1] ?? item.kind;
  return [
    `Hide the caption and identify the learner, world, signal, and object being estimated or controlled in ${item.ref}.`,
    `Restate the easy read in your own words: ${item.easy}`,
    `Name the technical mechanism (${mechanism}) and connect it to Chapter ${item.chapter}: ${chapterTitle}.`,
    `Point to the decision, curve, table row, backup arrow, state feature, or example step that would change if ${objectName} changed.`,
  ];
}

function pitfallFor(item: EvidenceGuideItem): string {
  const tag = item.tags[0] ?? item.kind;
  if (item.kind === "figure") return `Common pitfall: treating ${item.ref} as decoration. The figure is evidence for a mechanism about ${tag}; reproduce the mechanism in words before memorizing its shape.`;
  if (item.kind === "table") return `Common pitfall: reading the table as a scoreboard only. Ask what target, policy, evaluation condition, and comparison baseline produced each row before drawing a conclusion.`;
  return `Common pitfall: copying the example's surface story. The example is a template for ${tag}; identify the state/action/reward/value or sampling object before solving a new instance.`;
}

function joinList(items: string[]): string {
  if (!items.length) return "";
  if (items.length === 1) return items[0];
  return `${items.slice(0, -1).join(", ")}, and ${items.at(-1)}`;
}

function compactTags(tags: string[]): string[] {
  return Array.from(new Set(tags.map((tag) => tag.trim()).filter(Boolean))).slice(0, 10);
}

function slug(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

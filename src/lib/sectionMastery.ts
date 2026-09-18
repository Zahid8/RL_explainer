import { chapters } from "@/lib/paper";
import { sectionLessonsForChapter } from "@/lib/sectionNarratives";

export const sectionMasteryModes = ["prompt", "hint", "answer", "technical", "transfer"] as const;

export type SectionMasteryMode = (typeof sectionMasteryModes)[number];

export interface SectionMasteryCard {
  id: string;
  chapter: number;
  chapterTitle: string;
  section: string;
  route: string;
  title: string;
  prompt: string;
  hint: string[];
  answer: string;
  technical: string;
  transfer: string;
  diagnostic: string;
  tags: string[];
}

let cachedCards: SectionMasteryCard[] | undefined;

export function allSectionMasteryCards(): SectionMasteryCard[] {
  cachedCards ??= chapters.flatMap((chapter) => sectionMasteryCardsForChapter(chapter.n));
  return cachedCards;
}

export function sectionMasteryCardsForChapter(chapterNumber: number): SectionMasteryCard[] {
  const chapter = chapters.find((entry) => entry.n === chapterNumber);
  if (!chapter) throw new Error(`Missing chapter ${chapterNumber}`);

  const lessons = sectionLessonsForChapter(chapterNumber);
  return lessons.map((lesson, index) => {
    const cleanTitle = stripSectionNumber(lesson.section);
    const terms = lesson.terms.length ? lesson.terms : chapter.keyIdeas.slice(0, 3);
    return {
      id: `chapter-${chapterNumber}-section-mastery-${index + 1}-${slug(lesson.section)}`,
      chapter: chapterNumber,
      chapterTitle: chapter.title,
      section: lesson.section,
      route: `/chapters/${chapterNumber}#section-mastery`,
      title: `${lesson.section} mastery check`,
      prompt: `Close the page and teach ${lesson.section} from scratch. Start with the everyday problem, draw the learner/environment picture in words, name the section's main object, and end by explaining why this section matters for Chapter ${chapterNumber}: ${chapter.title}.`,
      hint: compactList([
        `Begin with the board title: ${cleanTitle}.`,
        ...lesson.boardWalkthrough.slice(0, 3),
        `Use these terms only after the picture is clear: ${terms.slice(0, 4).join(", ")}.`,
      ]),
      answer: `${lesson.opener} A strong answer then says: ${lesson.fromScratch} Finish with the self-check: ${lesson.selfCheck}`,
      technical: `${lesson.technicalPass} ${lesson.formulaBridge} ${lesson.algorithmBridge}`,
      transfer: `Transfer test: move the section idea to a tiny new task with one or two states, one action choice, and one feedback signal. Explain which part of the board would stay the same, which term would be renamed, and how the next section would inherit the result. ${lesson.nextLink}`,
      diagnostic: lesson.misconceptionGuard,
      tags: compactTags(["section mastery", `Chapter ${chapterNumber}`, chapter.part, lesson.section, ...terms]),
    };
  });
}

export function sectionMasteryCardCount(chapter?: number): number {
  return typeof chapter === "number" ? sectionMasteryCardsForChapter(chapter).length : allSectionMasteryCards().length;
}

export function sectionMasteryModeCount(chapter?: number): number {
  return sectionMasteryCardCount(chapter) * sectionMasteryModes.length;
}

export function sectionMasteryChapterCount(): number {
  return new Set(allSectionMasteryCards().map((card) => card.chapter)).size;
}

function compactList(items: Array<string | undefined | null>) {
  return items.filter(Boolean).map((item) => String(item).trim()).filter(Boolean).slice(0, 5);
}

function compactTags(tags: Array<string | undefined | null>) {
  return Array.from(new Set(tags.filter(Boolean).map((tag) => String(tag).trim()).filter(Boolean))).slice(0, 10);
}

function stripSectionNumber(section: string) {
  return section.replace(/^\d+(?:\.\d+)*\s+/, "");
}

function slug(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 72) || "section";
}

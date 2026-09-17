import { algorithmsForChapter } from "@/lib/algorithmCatalog";
import { chapterDeepDives } from "@/lib/deepDives";
import { evidenceGuideItems } from "@/lib/evidenceGuide";
import { formulaAtlas } from "@/lib/formulaAtlas";
import { chapters } from "@/lib/paper";

export interface SectionTextbookLesson {
  chapter: number;
  chapterTitle: string;
  section: string;
  opener: string;
  fromScratch: string;
  technicalPass: string;
  boardWalkthrough: string[];
  algorithmBridge: string;
  formulaBridge: string;
  misconceptionGuard: string;
  selfCheck: string;
  nextLink: string;
  terms: string[];
}

export function sectionLessonsForChapter(chapterNumber: number): SectionTextbookLesson[] {
  const chapter = chapters.find((candidate) => candidate.n === chapterNumber);
  const deep = chapterDeepDives[chapterNumber];
  if (!chapter || !deep) return [];

  const algorithms = algorithmsForChapter(chapterNumber);
  const formulas = formulaAtlas.filter((formula) => formula.chapter === chapterNumber);
  const anchors = evidenceGuideItems.filter((item) => item.chapter === chapterNumber);

  return deep.sectionDetails.map((detail, index, all) => {
    const primaryTerms = detail.terms.length ? detail.terms : chapter.keyIdeas.slice(0, 3);
    const next = all[index + 1];
    const previous = all[index - 1];
    const sectionName = stripSectionNumber(detail.section);
    const anchorPhrase = anchors.length ? `${anchors.length} figure/example anchors in this chapter` : "the chapter's conceptual examples";
    const algorithmPhrase = algorithms.length
      ? `${algorithms.slice(0, 3).map((algorithm) => algorithm.name).join(", ")}${algorithms.length > 3 ? ", and related methods" : ""}`
      : "the chapter's problem formulation rather than a named algorithm";
    const formulaPhrase = formulas.length
      ? `${formulas.slice(0, 2).map((formula) => formula.label).join(" and ")}${formulas.length > 2 ? " plus later formulas" : ""}`
      : "the informal objects defined before formulas appear";

    return {
      chapter: chapterNumber,
      chapterTitle: chapter.title,
      section: detail.section,
      opener: `Read ${detail.section} as a self-contained mini-lesson inside Chapter ${chapterNumber}. The plain idea is: ${detail.easy} This matters for the chapter because ${deep.focus.toLowerCase()}`,
      fromScratch: `From scratch, ignore the notation for one minute and ask what the learner can see, what choice it can make, what feedback arrives, and what must be remembered. In this section, that story becomes: ${detail.easy} If you can explain that sentence using a drawing before using symbols, the technical version will feel like naming parts of the drawing rather than memorizing a formula.`,
      technicalPass: `${detail.technical} The technical pass should connect the section to ${primaryTerms.join(", ")}. The details to keep precise are: ${detail.details.join(" ")}`,
      boardWalkthrough: [
        `Write the section title, "${sectionName}", at the top of the board and draw the chapter object: ${chapter.easy}`,
        `Add the vocabulary chips ${primaryTerms.join(", ")} and point each chip to the part of the diagram it names.`,
        `Trace the mechanism: ${detail.details[0] ?? detail.technical}`,
        `Close the board by asking how this section changes the learner's policy, value estimate, model, representation, or evidence stream.`,
      ],
      algorithmBridge: `Algorithm bridge: this section prepares you to understand ${algorithmPhrase}. Even if no update rule appears inside the section, it defines the objects those algorithms will update, compare, sample, or stabilize.`,
      formulaBridge: `Formula bridge: connect the prose to ${formulaPhrase}. The formula is not a separate fact; it is the compact version of the same board story with variables replacing words.`,
      misconceptionGuard: misconceptionGuard(detail.section, primaryTerms, previous?.section),
      selfCheck: `Self-check: explain why "${detail.easy}" and "${detail.technical}" are the same idea at two levels. Then name one consequence from the section details without looking back.`,
      nextLink: next
        ? `Next, ${next.section} builds on this by asking you to carry the same objects into: ${next.easy}`
        : `This section closes the chapter thread. The next chapter should feel easier because you can carry forward ${primaryTerms.slice(0, 2).join(" and ")}.`,
      terms: primaryTerms,
    };
  });
}

export function sectionNarrativeCount() {
  return chapters.reduce((sum, chapter) => sum + sectionLessonsForChapter(chapter.n).length, 0);
}

function stripSectionNumber(section: string) {
  return section.replace(/^\d+(?:\.\d+)*\s+/, "");
}

function misconceptionGuard(section: string, terms: string[], previousSection?: string) {
  const termList = terms.slice(0, 3).join(", ");
  if (/summary/i.test(section)) {
    return `Do not treat the summary as skippable. It compresses the chapter's moving parts; use it to test whether ${termList} still point to concrete objects in your mental diagram.`;
  }
  if (/history|psychology|neuroscience|applications/i.test(section)) {
    return `Do not read this as a detached story. The names and examples are there to show why ${termList} matter when learning systems are placed in scientific or practical settings.`;
  }
  if (/off-policy|importance|emphatic|gradient/i.test(section)) {
    return `Do not collapse all data into one policy. Track which policy generated behavior, which policy is being evaluated or improved, and how ${termList} control the mismatch.`;
  }
  if (/control|improvement|optimal|policy/i.test(section)) {
    return `Do not confuse prediction with control. Prediction asks what will happen under a policy; this section uses ${termList} to change or compare behavior.`;
  }
  if (/value|bellman|return|backup|td|dynamic|programming/i.test(section)) {
    return `Do not memorize the backup as symbols only. The section is saying that present estimates borrow evidence from immediate feedback plus a later prediction; ${termList} are the names of that borrowing process.`;
  }
  return previousSection
    ? `Do not read this section in isolation. It inherits the objects from ${previousSection} and sharpens them through ${termList}.`
    : `Do not start with formulas. Start with the decision loop, then attach ${termList} to the parts of the loop.`;
}

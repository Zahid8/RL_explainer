import { chapterDeepDives, type SectionDeepDive } from "@/lib/deepDives";
import { chapters } from "@/lib/paper";

export interface ChapterConceptCard {
  chapter: number;
  id: string;
  term: string;
  section: string;
  kind: "concept" | "notation" | "method" | "warning" | "bridge";
  plain: string;
  visual: string;
  technical: string;
  contrast: string;
  check: string;
  tags: string[];
}

export const conceptLectureModes = ["plain", "visual", "technical", "contrast", "check"] as const;

type Candidate = {
  term: string;
  section: string;
  easy: string;
  technical: string;
  details: string[];
};

export function conceptCardsForChapter(chapterNumber: number): ChapterConceptCard[] {
  const chapter = chapters.find((entry) => entry.n === chapterNumber);
  if (!chapter) throw new Error(`Missing chapter ${chapterNumber}`);

  const deep = chapterDeepDives[chapterNumber];
  const candidates: Candidate[] = [];

  for (const section of deep?.sectionDetails ?? []) {
    for (const term of section.terms) candidates.push(candidateFromSection(term, section));
  }

  for (const idea of chapter.keyIdeas) {
    candidates.push({
      term: idea,
      section: "Chapter core idea",
      easy: chapter.easy,
      technical: chapter.technical,
      details: chapter.commonConfusions,
    });
  }

  for (const equation of chapter.equations.slice(0, 4)) {
    candidates.push({
      term: equation,
      section: "Chapter notation",
      easy: `This is one of the formal shapes Chapter ${chapterNumber} uses after the intuition is in place.`,
      technical: chapter.technical,
      details: chapter.keyIdeas,
    });
  }

  for (const algorithm of chapter.algorithms.slice(0, 4)) {
    candidates.push({
      term: algorithm,
      section: "Chapter method",
      easy: `This is one of the procedures Chapter ${chapterNumber} uses to turn experience into better behavior or better prediction.`,
      technical: chapter.technical,
      details: chapter.commonConfusions,
    });
  }

  const unique = uniqueCandidates(candidates).slice(0, 8);

  return unique.map((candidate, index) => {
    const kind = inferKind(candidate.term, candidate.section);
    const anchor = candidate.details[0] ?? chapter.claim;
    const nextAnchor = candidate.details[1] ?? chapter.bridge;
    const sectionName = candidate.section.replace(/^\d+(\.\d+)?\s*/, "");
    return {
      chapter: chapterNumber,
      id: `chapter-${chapterNumber}-concept-${slug(candidate.term)}-${index + 1}`,
      term: candidate.term,
      section: candidate.section,
      kind,
      plain: `Start with the everyday role of ${candidate.term}: in Chapter ${chapterNumber}, it helps explain ${candidate.easy.charAt(0).toLowerCase()}${candidate.easy.slice(1)} Before worrying about notation, ask what job this idea performs in the agent's learning loop.`,
      visual: `Draw ${candidate.term} as a labeled part of the loop for ${sectionName}: place the situation on the left, the choice in the middle, feedback on the right, and the learned estimate or behavior underneath. Then mark the arrow where ${candidate.term} changes what the agent can predict or choose.`,
      technical: `Technically, ${candidate.term} belongs to ${candidate.section}: ${candidate.technical} In the chapter's formal language, the term should be tied back to at least one of these anchors: ${chapter.keyIdeas.slice(0, 3).join("; ")}.`,
      contrast: `Do not confuse ${candidate.term} with the whole chapter. The term is one handle inside the larger claim: ${chapter.claim} A common failure is to memorize the word while missing the distinction it protects, such as data versus target, reward versus return, estimate versus policy, or model versus experience.`,
      check: `Self-check: explain ${candidate.term} in one sentence, draw where it sits in the loop, and answer this repair question: how would the chapter break if you ignored ${anchor}? Then connect it forward with: ${nextAnchor}`,
      tags: [kind, `Ch ${chapterNumber}`, sectionName, ...chapter.keyIdeas.slice(0, 2)].slice(0, 6),
    };
  });
}

export function allConceptCards() {
  return chapters.flatMap((chapter) => conceptCardsForChapter(chapter.n));
}

export function conceptCardCount(chapter?: number) {
  return typeof chapter === "number" ? conceptCardsForChapter(chapter).length : allConceptCards().length;
}

export function conceptModeCount(chapter?: number) {
  return conceptCardCount(chapter) * conceptLectureModes.length;
}

function candidateFromSection(term: string, section: SectionDeepDive): Candidate {
  return { term, section: section.section, easy: section.easy, technical: section.technical, details: section.details };
}

function uniqueCandidates(candidates: Candidate[]) {
  const seen = new Set<string>();
  const unique: Candidate[] = [];
  for (const candidate of candidates) {
    const key = normalize(candidate.term);
    if (!key || seen.has(key)) continue;
    seen.add(key);
    unique.push(candidate);
  }
  return unique;
}

function inferKind(term: string, section: string): ChapterConceptCard["kind"] {
  if (/\$|_|\*|pi|alpha|gamma|lambda|epsilon|q\(|v\(|G_t|R_t|S_t|A_t|p\(/i.test(term)) return "notation";
  if (/algorithm|iteration|sarsa|q-learning|monte carlo|td|gradient|planning|search|backup|update|method/i.test(term + " " + section)) return "method";
  if (/confusion|trap|risk|deadly|bias|variance|instability|off-policy/i.test(term + " " + section)) return "warning";
  if (/model|bridge|option|state|reward|policy|value|return|trace|feature/i.test(term)) return "bridge";
  return "concept";
}

function normalize(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function slug(value: string) {
  const base = normalize(value).replace(/\s+/g, "-");
  return base || "concept";
}

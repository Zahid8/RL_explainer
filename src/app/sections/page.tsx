import type { Metadata } from "next";
import Link from "next/link";
import { AnimatedConceptGraphic } from "@/components/AnimatedConceptGraphic";
import { MotionGlyph } from "@/components/MotionGlyph";
import { SectionMasteryStudio } from "@/components/SectionMasteryStudio";
import { Chip } from "@/components/Section";
import { allSectionMasteryCards, sectionMasteryCardCount, sectionMasteryChapterCount, sectionMasteryModeCount } from "@/lib/sectionMastery";
import { chapters } from "@/lib/paper";

export const metadata: Metadata = {
  title: "Section Mastery Studio | RLbook Explainer",
  description: "Section-level mastery prompts, hints, answers, technical passes, and transfer tests for the standalone RL web book.",
};

export default function SectionsPage() {
  const cards = allSectionMasteryCards();
  const byChapter = chapters.map((chapter) => [chapter.n, cards.filter((card) => card.chapter === chapter.n)] as const);
  const denseChapters = [...byChapter].sort((a, b) => b[1].length - a[1].length).slice(0, 6);

  return (
    <main className="min-h-screen bg-bg text-ink">
      <header className="border-b border-line bg-panel paper-grid">
        <div className="mx-auto max-w-[1280px] px-6 py-8 lg:px-10">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
            <Link href="/" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">← Home overview</Link>
            <Link href="/book" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Linear book</Link>
            <Link href="/foundations" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Foundations</Link>
            <Link href="/math" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-orange">Math rescue</Link>
            <Link href="/compare" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Compare methods</Link>
            <Link href="/exam" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Exam studio</Link>
            <Link href="/search" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Search</Link>
            <Link href="/exercises" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Exercise solutions</Link>
            <Link href="/coverage" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Coverage audit</Link>
          </div>
          <div className="grid gap-8 lg:grid-cols-[1fr_440px] lg:items-end">
            <div>
              <p className="eyebrow">Section mastery studio</p>
              <h1 className="display mt-4 max-w-5xl text-[clamp(42px,7vw,88px)] font-medium text-ink">Own every named section, not just every chapter.</h1>
              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted">
                The full web book has section manuscripts. This studio turns each named section into a mastery checkpoint: try to teach it cold, ask for a board hint, reveal a complete answer, switch to the technical pass, then transfer the idea to a tiny new task.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <Chip accent="cyan">{sectionMasteryCardCount()} section cards</Chip>
                <Chip accent="lime">{sectionMasteryModeCount()} mastery modes</Chip>
                <Chip accent="blue">{sectionMasteryChapterCount()} chapters</Chip>
                <Chip accent="violet">prompt + hint + answer</Chip>
                <Chip accent="orange">technical + transfer</Chip>
              </div>
            </div>
            <div className="grid gap-4">
              <AnimatedConceptGraphic label="Section mastery studio" variant="tree" caption="Each section becomes a small lecture loop: cold prompt, board hint, answer, technical pass, and transfer." compact />
              <div className="rounded-xl border border-line bg-white p-5">
                <div className="mb-3 flex items-start justify-between gap-3"><p className="eyebrow">Section density</p><MotionGlyph label="section density" variant="bars" accent="cyan" className="-mr-2 -mt-2 motion-glyph-small" /></div>
                <div className="grid gap-2">
                  {denseChapters.map(([chapter, items]) => (
                    <a key={chapter} href={`#sections-chapter-${chapter}`} className="flex items-center justify-between gap-3 rounded-lg border border-line bg-panel-2 px-3 py-2 text-sm hover:border-cyan">
                      <span className="text-muted">Chapter {chapter}</span>
                      <span className="display text-xl text-ink">{items.length}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1280px] px-6 py-12 lg:px-10">
        <SectionMasteryStudio cards={cards} contextTitle="Whole-book section mastery studio" />
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {byChapter.map(([chapter, items]) => (
            <a id={`sections-chapter-${chapter}`} key={chapter} href={`/chapters/${chapter}#section-mastery`} className="rounded-xl border border-line bg-panel p-5 hover:border-cyan">
              <div className="flex flex-wrap gap-2"><Chip accent="cyan">Chapter {chapter}</Chip><Chip accent="lime">{items.length} sections</Chip><Chip accent="blue">{items.length * 5} modes</Chip></div>
              <h2 className="display mt-4 text-2xl font-medium text-ink">Section mastery path</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">Includes {items.slice(0, 4).map((item) => item.section).join(", ")}{items.length > 4 ? ", and more" : ""}.</p>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { AnimatedConceptGraphic } from "@/components/AnimatedConceptGraphic";
import { MotionGlyph } from "@/components/MotionGlyph";
import { ProjectStudio } from "@/components/ProjectStudio";
import { Chip } from "@/components/Section";
import { allProjectCards, projectCardCount, projectChapterCount, projectDeliverableCount, projectMilestoneCount, projectModeCount, projectRubricCount, projectSourceCount } from "@/lib/projectStudio";
import { chapters } from "@/lib/paper";

export const metadata: Metadata = {
  title: "Project Studio | RLbook Explainer",
  description: "Hands-on reinforcement-learning projects that turn every chapter into buildable artifacts, experiments, rubrics, and transfer challenges.",
};

export default function ProjectsPage() {
  const cards = allProjectCards();
  const byChapter = chapters.map((chapter) => [chapter.n, cards.filter((card) => card.chapter === chapter.n)] as const).filter(([, items]) => items.length > 0);
  const bySource = Array.from(new Map(cards.map((card) => [card.sourceLabel, cards.filter((item) => item.sourceLabel === card.sourceLabel)] as const)).entries()).sort((a, b) => b[1].length - a[1].length);

  return (
    <main className="min-h-screen bg-bg text-ink">
      <header className="border-b border-line bg-panel paper-grid">
        <div className="mx-auto max-w-[1280px] px-6 py-8 lg:px-10">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
            <Link href="/" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">← Home overview</Link>
            <Link href="/book" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Linear book</Link>
            <Link href="/readiness" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Readiness</Link>
            <Link href="/cases" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Cases</Link>
            <Link href="/projects" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Projects</Link>
            <Link href="/evidence" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Evidence replay</Link>
            <Link href="/code" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Code lab</Link>
            <Link href="/debug" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-orange">Debug clinic</Link>
            <Link href="/coverage" className="mono rounded-full border border-line bg-white px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-muted hover:border-cyan">Coverage audit</Link>
          </div>
          <div className="grid gap-8 lg:grid-cols-[1fr_440px] lg:items-end">
            <div>
              <p className="eyebrow">Project studio</p>
              <h1 className="display mt-4 max-w-5xl text-[clamp(42px,7vw,88px)] font-medium text-ink">Build the chapter, test it, grade it, and transfer it.</h1>
              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted">
                The project layer turns reading into visible work. Each chapter gets a case artifact, an implementation experiment, and a mastery capstone with milestones, deliverables, technical frames, rubrics, and extensions.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <Chip accent="cyan">{projectCardCount()} projects</Chip>
                <Chip accent="lime">{projectModeCount()} project modes</Chip>
                <Chip accent="blue">{projectChapterCount()} chapters</Chip>
                <Chip accent="orange">{projectMilestoneCount()} milestones</Chip>
                <Chip accent="violet">{projectRubricCount()} rubric checks</Chip>
                <Chip accent="cyan">{projectDeliverableCount()} deliverables</Chip>
                <Chip accent="lime">{projectSourceCount()} source types</Chip>
              </div>
            </div>
            <div className="grid gap-4">
              <AnimatedConceptGraphic label="Project studio" variant="tree" caption="Projects connect case scenes, code scaffolds, simulator knobs, rubrics, and transfer tests into buildable chapter work." compact />
              <div className="rounded-xl border border-line bg-white p-5">
                <div className="mb-3 flex items-start justify-between gap-3"><p className="eyebrow">Project source blend</p><MotionGlyph label="project source layers" variant="tree" accent="lime" className="-mr-2 -mt-2 motion-glyph-small" /></div>
                <div className="grid gap-2">
                  {bySource.map(([source, items]) => (
                    <a key={source} href={`#source-${slug(source)}`} className="flex items-center justify-between gap-3 rounded-lg border border-line bg-panel-2 px-3 py-2 text-sm hover:border-lime">
                      <span className="text-muted">{source}</span>
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
        <ProjectStudio projects={cards} contextTitle="Whole-book project studio" />
        <section className="mt-10 grid gap-4 lg:grid-cols-4">
          {byChapter.map(([chapter, items]) => (
            <a id={`project-chapter-${chapter}`} key={chapter} href={`/chapters/${chapter}#projects`} className="rounded-xl border border-line bg-panel p-5 hover:border-lime">
              <div className="flex flex-wrap gap-2"><Chip accent="blue">Chapter {chapter}</Chip><Chip accent="cyan">{items.length} projects</Chip><Chip accent="lime">{items.length * 5} modes</Chip></div>
              <h2 className="display mt-4 text-2xl font-medium text-ink">Chapter build path</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">Projects include {items.map((item) => item.sourceLabel).join(", ")} with {items.reduce((sum, item) => sum + item.deliverables.length, 0)} deliverables.</p>
            </a>
          ))}
        </section>
        <section className="mt-12 grid gap-4 lg:grid-cols-3">
          {bySource.map(([source, items]) => (
            <article id={`source-${slug(source)}`} key={source} className="rounded-xl border border-line bg-panel p-5">
              <div className="flex flex-wrap gap-2"><Chip accent="cyan">{source}</Chip><Chip accent="violet">{items.length} projects</Chip></div>
              <h2 className="display mt-4 text-2xl font-medium text-ink">Project source layer</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">Uses {items.slice(0, 4).map((item) => item.title).join(", ")}{items.length > 4 ? ", and related projects" : ""} to convert explanations into buildable evidence.</p>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}

function slug(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60) || "source";
}

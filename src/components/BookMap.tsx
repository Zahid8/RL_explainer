import { chapters, parts } from "@/lib/paper";
import { Chip, Plain } from "./Section";

export function BookMap() {
  return (
    <div className="grid gap-5 lg:grid-cols-3">
      {parts.map((part, index) => (
        <article key={part.id} className="rounded-xl border border-line bg-panel p-6">
          <p className="eyebrow">{part.name} · Chapters {part.chapters}</p>
          <h3 className="display mt-3 text-3xl font-medium text-ink">{part.label}</h3>
          <p className="mt-4 text-sm leading-relaxed text-muted">{part.precise}</p>
          <Plain title="Easy mental model">
            <p>{part.plain}</p>
          </Plain>
          <div className="mt-5 flex flex-wrap gap-2">
            {chapters.filter((chapter) => chapter.part === (index === 0 ? "Tabular" : index === 1 ? "Approximation" : "Looking deeper")).map((chapter) => (
              <a key={chapter.n} href={`#chapter-${chapter.n}`}><Chip accent={index === 0 ? "cyan" : index === 1 ? "violet" : "lime"}>{chapter.n}. {chapter.title}</Chip></a>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}

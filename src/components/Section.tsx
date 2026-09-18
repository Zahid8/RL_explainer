import type { ReactNode } from "react";
import { AnimatedConceptGraphic } from "@/components/AnimatedConceptGraphic";
import { MotionGlyph } from "@/components/MotionGlyph";

export function Section({
  id,
  eyebrow,
  title,
  lead,
  children,
  tint = false,
}: {
  id: string;
  eyebrow: string;
  title: ReactNode;
  lead?: string;
  children: ReactNode;
  tint?: boolean;
}) {
  return (
    <section id={id} className={`scroll-mt-20 border-t border-line ${tint ? "bg-panel-2/50" : ""}`}>
      <div className="mx-auto w-full max-w-[1280px] px-6 py-20 md:py-28 lg:px-10">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
          <div>
            <p className="eyebrow mb-4">{eyebrow}</p>
            <h2 className="display text-[clamp(28px,4vw,46px)] font-medium text-ink">{title}</h2>
            {lead ? <p className="mt-5 max-w-3xl text-[17px] leading-relaxed text-muted">{lead}</p> : null}
          </div>
          <AnimatedConceptGraphic label={eyebrow} variant={visualVariantForSection(id)} caption={lead ?? "Animated reinforcement-learning concept map for this section."} compact />
        </div>
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}

function visualVariantForSection(id: string) {
  if (/algorithm|chapter|mastery/.test(id)) return "algorithm";
  if (/equation|formula|term|symbol/.test(id)) return "formula";
  if (/evidence|exercise|coverage/.test(id)) return "coverage";
  if (/map|study|glossary/.test(id)) return "tree";
  if (/lab/.test(id)) return "gradient";
  return "loop";
}

function glyphVariantForText(text: string): "loop" | "bars" | "tree" | "target" | "formula" | "check" {
  if (/equation|formula|technical|symbol/i.test(text)) return "formula";
  if (/map|chapter|route|glossary|figure/i.test(text)) return "tree";
  if (/algorithm|player|objective|target/i.test(text)) return "target";
  if (/check|coverage|accuracy|note/i.test(text)) return "check";
  if (/step|exercise|lab|process/i.test(text)) return "bars";
  return "loop";
}

export function Plain({ title = "Plain words", children }: { title?: string; children: ReactNode }) {
  return (
    <aside className="rounded-xl border border-line bg-white p-5">
      <div className="mb-3 flex items-start justify-between gap-3">
        <p className="eyebrow text-lime">{title}</p>
        <MotionGlyph label={title} variant={glyphVariantForText(title)} accent="lime" className="-mr-2 -mt-2 motion-glyph-small" />
      </div>
      <div className="text-[15px] leading-relaxed text-muted">{children}</div>
    </aside>
  );
}

export function Note({ title, children }: { title: string; children: ReactNode }) {
  return (
    <aside className="rounded-xl border border-line bg-panel-2 p-5">
      <div className="mb-2 flex items-start justify-between gap-3">
        <p className="mono text-xs uppercase tracking-[0.16em] text-dim">{title}</p>
        <MotionGlyph label={title} variant={glyphVariantForText(title)} accent="orange" className="-mr-2 -mt-2 motion-glyph-small" />
      </div>
      <div className="text-sm leading-relaxed text-muted">{children}</div>
    </aside>
  );
}

export function Chip({ children, accent = "cyan" }: { children: ReactNode; accent?: "cyan" | "orange" | "blue" | "violet" | "lime" }) {
  const color = {
    cyan: "border-cyan/30 bg-cyan/[0.08] text-cyan",
    orange: "border-orange/30 bg-orange/[0.08] text-orange",
    blue: "border-blue/30 bg-blue/[0.08] text-blue",
    violet: "border-violet/30 bg-violet/[0.08] text-violet",
    lime: "border-lime/30 bg-lime/[0.08] text-lime",
  }[accent];
  return <span className={`mono inline-flex rounded-full border px-2.5 py-1 text-[11px] ${color}`}>{children}</span>;
}

export function FigureFrame({ label, title, caption, children }: { label: string; title: string; caption: string; children: ReactNode }) {
  return (
    <figure className="rounded-xl border border-line bg-panel p-5">
      <div className="mb-4 flex flex-col gap-1 border-b border-line pb-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow">{label}</p>
          <h3 className="display mt-1 text-2xl font-medium text-ink">{title}</h3>
        </div>
        <MotionGlyph label={title} variant={glyphVariantForText(title)} accent="cyan" />
      </div>
      {children}
      <figcaption className="mt-4 text-sm leading-relaxed text-dim">{caption}</figcaption>
    </figure>
  );
}

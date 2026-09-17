import type { ReactNode } from "react";

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
        <p className="eyebrow mb-4">{eyebrow}</p>
        <h2 className="display text-[clamp(28px,4vw,46px)] font-medium text-ink">{title}</h2>
        {lead ? <p className="mt-5 max-w-3xl text-[17px] leading-relaxed text-muted">{lead}</p> : null}
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}

export function Plain({ title = "Plain words", children }: { title?: string; children: ReactNode }) {
  return (
    <aside className="rounded-xl border border-line bg-white p-5">
      <p className="eyebrow mb-3 text-lime">{title}</p>
      <div className="text-[15px] leading-relaxed text-muted">{children}</div>
    </aside>
  );
}

export function Note({ title, children }: { title: string; children: ReactNode }) {
  return (
    <aside className="rounded-xl border border-line bg-panel-2 p-5">
      <p className="mono mb-2 text-xs uppercase tracking-[0.16em] text-dim">{title}</p>
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
      </div>
      {children}
      <figcaption className="mt-4 text-sm leading-relaxed text-dim">{caption}</figcaption>
    </figure>
  );
}

"use client";

import { useMemo, useState, type ReactNode } from "react";
import type { ChapterProjectCard, ProjectStudioMode } from "@/lib/projectStudio";

type Accent = "cyan" | "orange" | "blue" | "violet" | "lime";

const projectModes = ["brief", "build", "experiment", "rubric", "extend"] as const satisfies readonly ProjectStudioMode[];

const modeLabels: Record<ProjectStudioMode, string> = {
  brief: "Brief",
  build: "Build",
  experiment: "Experiment",
  rubric: "Rubric",
  extend: "Extend",
};

export function ProjectStudio({ projects, contextTitle = "Project studio", compact = false }: { projects: ChapterProjectCard[]; contextTitle?: string; compact?: boolean }) {
  const [index, setIndex] = useState(0);
  const [mode, setMode] = useState<ProjectStudioMode>("brief");
  const safeIndex = Math.min(index, Math.max(projects.length - 1, 0));
  const project = projects[safeIndex];
  const modeIndex = projectModes.indexOf(mode);
  const geometry = useMemo(() => projectGeometry(safeIndex, modeIndex), [safeIndex, modeIndex]);

  if (!project) return null;

  return (
    <article className="project-studio overflow-hidden rounded-xl border border-line bg-panel" data-project-card={project.id} data-mode={mode} data-card-count={projects.length}>
      <div className="grid gap-px bg-line lg:grid-cols-[0.95fr_1.05fr]">
        <div className="bg-panel-2 p-5 lg:p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="flex flex-wrap gap-2"><ProjectChip>Project studio</ProjectChip><ProjectChip accent="blue">Ch {project.chapter}</ProjectChip><ProjectChip accent="lime">{safeIndex + 1}/{projects.length}</ProjectChip><ProjectChip accent="orange">{project.sourceLabel}</ProjectChip></div>
            <span className="mono rounded-full border border-line bg-white px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-muted">{modeLabels[mode]}</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted">{contextTitle}</p>
          <h3 className="display mt-2 text-3xl font-medium text-ink">{project.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted"><span className="font-medium text-ink">Driving question:</span> {project.drivingQuestion}</p>
          <svg viewBox="0 0 460 286" role="img" aria-label={`${project.title} project map`} className="mt-5 h-auto w-full">
            <defs>
              <linearGradient id={`project-grad-${project.chapter}-${safeIndex}-${modeIndex}`} x1="0" x2="1">
                <stop offset="0%" stopColor="#22c55e" />
                <stop offset="48%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
            <rect x="10" y="10" width="440" height="266" rx="26" fill="white" stroke="rgba(15,23,42,0.12)" />
            <path d={geometry.path} fill="none" stroke={`url(#project-grad-${project.chapter}-${safeIndex}-${modeIndex})`} strokeWidth="5" strokeLinecap="round" strokeDasharray="9 9" className="rl-dash" />
            <g>
              <rect x="34" y="38" width="132" height="62" rx="17" fill="#f0fdf4" stroke="rgba(34,197,94,0.34)" />
              <text x="100" y="66" textAnchor="middle" className="fill-ink text-[10px] font-semibold">project artifact</text>
              <text x="100" y="82" textAnchor="middle" className="fill-muted text-[8px]">diagram · code · report</text>
            </g>
            <g>
              <rect x="294" y="38" width="132" height="62" rx="17" fill="#f5f3ff" stroke="rgba(139,92,246,0.34)" />
              <text x="360" y="66" textAnchor="middle" className="fill-ink text-[10px] font-semibold">mastery proof</text>
              <text x="360" y="82" textAnchor="middle" className="fill-muted text-[8px]">rubric · transfer</text>
            </g>
            {geometry.nodes.map((node, nodeIndex) => {
              const active = nodeIndex === modeIndex % geometry.nodes.length;
              return (
                <g key={node.label}>
                  <circle cx={node.x} cy={node.y} r={active ? 30 : 22} fill={active ? "#22c55e" : "#f8fafc"} stroke="rgba(15,23,42,0.25)" strokeWidth="2" />
                  <text x={node.x} y={node.y + 4} textAnchor="middle" className={active ? "fill-white text-[9px] font-semibold" : "fill-ink text-[9px] font-semibold"}>{node.label}</text>
                </g>
              );
            })}
            <foreignObject x="42" y="224" width="376" height="42">
              <div className="rounded-lg border border-line bg-panel px-3 py-2 text-xs leading-snug text-muted">
                Project rule: build an artifact, run a tiny experiment, grade it, and transfer it before claiming mastery.
              </div>
            </foreignObject>
          </svg>
        </div>

        <div className="bg-panel p-5 lg:p-6">
          <div className="grid gap-4">
            <div>
              <p className="eyebrow mb-2">Choose project</p>
              <div className={`grid gap-2 ${compact || projects.length > 8 ? "max-h-72 overflow-auto pr-1" : "md:grid-cols-2"}`}>
                {projects.map((item, cardIndex) => (
                  <button key={item.id} type="button" onClick={() => setIndex(cardIndex)} className={`rounded-lg border px-3 py-2 text-left text-sm leading-snug transition ${cardIndex === safeIndex ? "border-lime bg-lime/[0.08] text-ink" : "border-line bg-white text-muted hover:border-lime hover:text-ink"}`}>
                    <span className="mono block text-[10px] uppercase tracking-[0.12em] text-dim">Ch {item.chapter} · {item.sourceLabel}</span>
                    {item.title}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="eyebrow mb-2">Project mode</p>
              <div className="flex flex-wrap gap-2">
                {projectModes.map((item) => (
                  <button key={item} type="button" onClick={() => setMode(item)} className={`rounded-full border px-3 py-2 text-sm transition ${item === mode ? "border-lime bg-lime text-white" : "border-line bg-white text-muted hover:border-lime hover:text-ink"}`}>{modeLabels[item]}</button>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-line bg-white p-5">
              <div className="flex flex-wrap gap-2"><ProjectChip accent="blue">Chapter {project.chapter}</ProjectChip><ProjectChip accent="lime">{modeLabels[mode]}</ProjectChip><ProjectChip accent="orange">{project.sourceLabel}</ProjectChip></div>
              <h4 className="display mt-3 text-3xl font-medium text-ink">{modeHeadline(mode)}</h4>
              <div className="mt-4 text-sm leading-relaxed text-muted">{renderMode(project, mode)}</div>
              <a href={project.route} className="mono mt-5 inline-flex rounded-full border border-lime bg-lime px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-white hover:bg-white hover:text-lime">Open chapter projects</a>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function renderMode(project: ChapterProjectCard, mode: ProjectStudioMode) {
  if (mode === "brief") return <div className="grid gap-3"><p>{project.brief}</p><TagRow tags={project.tags} /></div>;
  if (mode === "build") return <div className="grid gap-3"><NumberedList items={project.buildSteps} accent="cyan" /><Deliverables items={project.deliverables} /></div>;
  if (mode === "experiment") return <div className="grid gap-3"><div className="rounded-lg border border-cyan/30 bg-cyan/[0.06] p-4"><p>{project.experimentPlan}</p></div><p><span className="font-medium text-ink">Technical frame:</span> {project.technicalFrame}</p></div>;
  if (mode === "rubric") return <div className="grid gap-3"><NumberedList items={project.rubric} accent="lime" /></div>;
  return <div className="rounded-lg border border-violet/30 bg-violet/[0.06] p-4"><p>{project.extension}</p></div>;
}

function modeHeadline(mode: ProjectStudioMode) {
  return {
    brief: "Know what you are building and why.",
    build: "Follow the project milestones.",
    experiment: "Run the tiny experiment and inspect the technical frame.",
    rubric: "Grade mastery with visible criteria.",
    extend: "Change one assumption and transfer the result.",
  }[mode];
}

function NumberedList({ items, accent }: { items: string[]; accent: Accent }) {
  const color = accent === "orange" ? "text-orange" : accent === "violet" ? "text-violet" : accent === "lime" ? "text-lime" : "text-cyan";
  return <ol className="grid gap-2">{items.map((item, itemIndex) => <li key={item} className="flex gap-2"><span className={color}>{itemIndex + 1}.</span><span>{item}</span></li>)}</ol>;
}

function Deliverables({ items }: { items: string[] }) {
  return <div className="rounded-lg border border-line bg-panel-2 p-3"><p className="mono mb-2 text-[10px] uppercase tracking-[0.14em] text-dim">Deliverables</p><ul className="grid gap-1">{items.map((item) => <li key={item} className="flex gap-2"><span className="text-lime">✓</span><span>{item}</span></li>)}</ul></div>;
}

function TagRow({ tags }: { tags: string[] }) {
  return <div className="flex flex-wrap gap-1.5">{tags.slice(0, 9).map((tag) => <span key={tag} className="mono rounded-full border border-line bg-panel-2 px-2 py-1 text-[10px] text-dim">{tag}</span>)}</div>;
}

function ProjectChip({ children, accent = "cyan" }: { children: ReactNode; accent?: Accent }) {
  const color = {
    cyan: "border-cyan/30 bg-cyan/[0.08] text-cyan",
    orange: "border-orange/30 bg-orange/[0.08] text-orange",
    blue: "border-blue/30 bg-blue/[0.08] text-blue",
    violet: "border-violet/30 bg-violet/[0.08] text-violet",
    lime: "border-lime/30 bg-lime/[0.08] text-lime",
  }[accent];
  return <span className={`mono inline-flex rounded-full border px-2.5 py-1 text-[11px] ${color}`}>{children}</span>;
}

function projectGeometry(cardIndex: number, modeIndex: number) {
  const layouts = [
    { path: "M74 168 C136 104 176 190 232 138 S324 104 388 168", nodes: [[74, 168, "brief"], [150, 126, "build"], [232, 138, "test"], [312, 126, "grade"], [388, 168, "extend"]] },
    { path: "M70 126 L150 126 L230 178 L310 126 L390 126", nodes: [[70, 126, "case"], [150, 126, "artifact"], [230, 178, "variant"], [310, 126, "rubric"], [390, 126, "report"]] },
    { path: "M76 184 C132 206 158 86 226 116 S324 204 386 132", nodes: [[76, 184, "ask"], [148, 126, "make"], [226, 116, "run"], [318, 160, "judge"], [386, 132, "reuse"]] },
  ];
  const layout = layouts[(cardIndex + modeIndex) % layouts.length];
  return { path: layout.path, nodes: layout.nodes.map(([x, y, label]) => ({ x: Number(x), y: Number(y), label: String(label) })) };
}

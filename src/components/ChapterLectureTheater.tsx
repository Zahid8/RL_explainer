"use client";

import { useMemo, useState, type ReactNode } from "react";
import type { ChapterLectureTheater as ChapterLectureTheaterData, TheaterMode } from "@/lib/chapterLectureTheater";

const theaterModes: TheaterMode[] = ["beginner", "picture", "technical", "equation", "check"];

const modeLabels: Record<TheaterMode, string> = {
  beginner: "Beginner story",
  picture: "Board picture",
  technical: "Technical pass",
  equation: "Equation lens",
  check: "Teach-back check",
};

export function ChapterLectureTheater({ theaters, contextTitle = "Guided lecture theater", compact = false }: { theaters: ChapterLectureTheaterData[]; contextTitle?: string; compact?: boolean }) {
  const [theaterIndex, setTheaterIndex] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0);
  const [mode, setMode] = useState<TheaterMode>("beginner");
  const safeTheaterIndex = Math.min(theaterIndex, Math.max(theaters.length - 1, 0));
  const theater = theaters[safeTheaterIndex];
  const safeSlideIndex = Math.min(slideIndex, Math.max((theater?.slides.length ?? 1) - 1, 0));
  const slide = theater?.slides[safeSlideIndex];
  const modeIndex = theaterModes.indexOf(mode);
  const geometry = useMemo(() => geometryFor(safeSlideIndex, modeIndex), [safeSlideIndex, modeIndex]);

  if (!theater || !slide) return null;

  const chooseTheater = (index: number) => {
    setTheaterIndex(index);
    setSlideIndex(0);
    setMode("beginner");
  };

  return (
    <article className="chapter-lecture-theater overflow-hidden rounded-xl border border-line bg-panel" data-theater={theater.id} data-slide={slide.id} data-mode={mode}>
      <div className="grid gap-px bg-line lg:grid-cols-[0.95fr_1.05fr]">
        <div className="bg-ink p-5 text-white lg:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2"><TheaterChip>Lecture theater</TheaterChip><TheaterChip accent="lime">Ch {theater.chapter}</TheaterChip><TheaterChip accent="blue">Slide {safeSlideIndex + 1}/{theater.slides.length}</TheaterChip></div>
            <span className="mono rounded-full border border-white/20 px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-white/70">{modeLabels[mode]}</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-white/60">{contextTitle}</p>
          <h3 className="display mt-2 text-3xl font-medium text-white">{slide.headline}</h3>
          <p className="mt-3 text-sm leading-relaxed text-white/70"><span className="text-white">Lecture question:</span> {slide.prompt}</p>
          <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.04] p-4">
            <svg viewBox="0 0 470 310" role="img" aria-label={`${theater.title} ${slide.label} lecture board`} className="h-auto w-full">
              <defs>
                <linearGradient id={`theater-grad-${theater.chapter}-${safeSlideIndex}-${modeIndex}`} x1="0" x2="1">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="50%" stopColor="#a78bfa" />
                  <stop offset="100%" stopColor="#84cc16" />
                </linearGradient>
              </defs>
              <rect x="10" y="10" width="450" height="290" rx="26" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.14)" />
              <path d={geometry.path} fill="none" stroke={`url(#theater-grad-${theater.chapter}-${safeSlideIndex}-${modeIndex})`} strokeWidth="5" strokeLinecap="round" strokeDasharray="12 10" className="rl-dash" />
              {geometry.nodes.map((node, index) => (
                <g key={node.label}>
                  <circle cx={node.x} cy={node.y} r={index === modeIndex % geometry.nodes.length ? 31 : 24} fill={index === modeIndex % geometry.nodes.length ? node.color : "rgba(255,255,255,0.12)"} stroke="rgba(255,255,255,0.68)" strokeWidth="2" />
                  <text x={node.x} y={node.y + 4} textAnchor="middle" className="fill-white text-[10px] font-semibold">{node.label}</text>
                </g>
              ))}
              <foreignObject x="34" y="218" width="402" height="58">
                <div className="rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-xs leading-snug text-white/75">
                  {slide.boardSteps[modeIndex % slide.boardSteps.length]}
                </div>
              </foreignObject>
            </svg>
          </div>
          <div className="mt-4 rounded-lg border border-white/10 bg-white/[0.04] p-3 text-sm leading-relaxed text-white/70">
            <span className="text-white">Five-slide lecture arc:</span> start from nothing, draw the world, name the technical objects, run one method, then transfer it forward.
          </div>
        </div>

        <div className="bg-panel p-5 lg:p-6">
          <div className="grid gap-4">
            <div>
              <p className="eyebrow mb-2">Choose chapter theater</p>
              <div className={`grid gap-2 ${compact || theaters.length > 5 ? "max-h-56 overflow-auto pr-1" : "md:grid-cols-2"}`}>
                {theaters.map((item, index) => (
                  <button key={item.id} onClick={() => chooseTheater(index)} className={`rounded-lg border px-3 py-2 text-left text-sm leading-snug transition ${index === safeTheaterIndex ? "border-cyan bg-cyan/[0.08] text-ink" : "border-line bg-white text-muted hover:border-cyan hover:text-ink"}`}>
                    <span className="mono block text-[10px] uppercase tracking-[0.12em] text-dim">Chapter {item.chapter}</span>
                    {item.title.replace(/^Chapter \d+ lecture theater: /, "")}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="eyebrow mb-2">Lecture slide</p>
              <div className="grid gap-2 md:grid-cols-5">
                {theater.slides.map((item, index) => (
                  <button key={item.id} onClick={() => setSlideIndex(index)} className={`rounded-lg border px-3 py-2 text-left text-xs leading-snug transition ${index === safeSlideIndex ? "border-violet bg-violet text-white" : "border-line bg-white text-muted hover:border-violet hover:text-ink"}`}>
                    <span className="mono block text-[10px] uppercase tracking-[0.12em] opacity-70">{item.stage}</span>
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="eyebrow mb-2">Explanation mode</p>
              <div className="flex flex-wrap gap-2">
                {theaterModes.map((item) => (
                  <button key={item} onClick={() => setMode(item)} className={`rounded-full border px-3 py-2 text-sm transition ${item === mode ? "border-cyan bg-cyan text-white" : "border-line bg-white text-muted hover:border-cyan hover:text-ink"}`}>
                    {modeLabels[item]}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-line bg-white p-5">
              <div className="flex flex-wrap gap-2"><TheaterChip>Chapter {theater.chapter}</TheaterChip><TheaterChip accent="blue">{slide.label}</TheaterChip><TheaterChip accent="lime">{modeLabels[mode]}</TheaterChip></div>
              <h4 className="display mt-3 text-3xl font-medium text-ink">{modeHeadline(mode)}</h4>
              <p className="mt-4 text-sm leading-relaxed text-muted">{modeText(slide, mode)}</p>
              <div className="mt-4 grid gap-2 md:grid-cols-3">
                {slide.boardSteps.map((step, index) => <MiniStep key={step} index={index + 1} text={step} />)}
              </div>
              <p className="mt-4 rounded-lg border border-lime/30 bg-lime/[0.06] p-3 text-sm leading-relaxed text-muted"><span className="font-medium text-ink">Final chapter bridge:</span> {theater.finalTakeaway}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {slide.tags.map((tag) => <span key={tag} className="mono rounded-full border border-line bg-panel-2 px-2 py-1 text-[10px] text-dim">{tag}</span>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function modeText(slide: ChapterLectureTheaterData["slides"][number], mode: TheaterMode) {
  return {
    beginner: slide.beginner,
    picture: slide.picture,
    technical: slide.technical,
    equation: slide.equation,
    check: slide.check,
  }[mode];
}

function modeHeadline(mode: TheaterMode) {
  return {
    beginner: "Start with the plain story.",
    picture: "Draw before symbolizing.",
    technical: "Make the picture precise.",
    equation: "Read the formal lens.",
    check: "Teach it back without notes.",
  }[mode];
}

function MiniStep({ index, text }: { index: number; text: string }) {
  return <div className="rounded-lg border border-line bg-panel p-3"><p className="mono text-[10px] uppercase tracking-[0.14em] text-cyan">Board step {index}</p><p className="mt-2 text-xs leading-relaxed text-muted">{text}</p></div>;
}

function TheaterChip({ children, accent = "cyan" }: { children: ReactNode; accent?: "cyan" | "lime" | "blue" }) {
  const color = {
    cyan: "border-cyan/30 bg-cyan/[0.08] text-cyan",
    lime: "border-lime/30 bg-lime/[0.08] text-lime",
    blue: "border-blue/30 bg-blue/[0.08] text-blue",
  }[accent];
  return <span className={`mono inline-flex rounded-full border px-2.5 py-1 text-[11px] ${color}`}>{children}</span>;
}

function geometryFor(slideIndex: number, modeIndex: number) {
  const palette = ["#06b6d4", "#a78bfa", "#84cc16", "#f97316", "#38bdf8"];
  const layouts = [
    { path: "M62 220 C112 96 176 88 236 152 S340 236 404 74", nodes: [[62, 220, "story"], [142, 92, "draw"], [236, 152, "name"], [324, 154, "run"], [404, 74, "own"]] },
    { path: "M62 92 H142 V208 H238 V96 H404", nodes: [[62, 92, "why"], [142, 92, "loop"], [142, 208, "math"], [238, 208, "trace"], [404, 96, "next"]] },
    { path: "M60 180 L134 74 L226 134 L310 74 L408 196", nodes: [[60, 180, "start"], [134, 74, "world"], [226, 134, "object"], [310, 74, "method"], [408, 196, "check"]] },
  ];
  const layout = layouts[(slideIndex + modeIndex) % layouts.length];
  return {
    path: layout.path,
    nodes: layout.nodes.map(([x, y, label], index) => ({ x: Number(x), y: Number(y), label: String(label), color: palette[(index + slideIndex + modeIndex) % palette.length] })),
  };
}

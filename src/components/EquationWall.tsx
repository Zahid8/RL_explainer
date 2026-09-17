import { equations } from "@/lib/paper";
import { Plain } from "./Section";
import { TeX } from "./Math";

export function EquationWall() {
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      {equations.map((equation) => (
        <article key={equation.label} className="rounded-xl border border-line bg-panel p-5">
          <p className="eyebrow">{equation.label}</p>
          <TeX block>{equation.tex}</TeX>
          <Plain><p>{equation.plain}</p></Plain>
        </article>
      ))}
    </div>
  );
}

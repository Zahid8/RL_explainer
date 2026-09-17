"use client";

import { useState } from "react";
import { glossary } from "@/lib/paper";

export function Glossary() {
  const [open, setOpen] = useState(0);
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {glossary.map((item, index) => (
        <button key={item.term} onClick={() => setOpen(open === index ? -1 : index)} className={`rounded-xl border bg-panel p-5 text-left transition ${open === index ? "border-cyan" : "border-line hover:border-cyan/60"}`}>
          <div className="flex items-center justify-between gap-4">
            <h3 className="display text-2xl font-medium text-ink">{item.term}</h3>
            <span className={`text-2xl text-cyan transition-transform ${open === index ? "rotate-45" : ""}`}>+</span>
          </div>
          <div className={`grid transition-[grid-template-rows,opacity] duration-300 ${open === index ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
            <div className="overflow-hidden">
              <p className="mt-4 text-sm leading-relaxed text-muted">{item.def}</p>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}

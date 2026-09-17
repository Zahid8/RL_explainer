"use client";

import katex from "katex";
import { useMemo } from "react";

export function TeX({ children, block = false }: { children: string; block?: boolean }) {
  const html = useMemo(
    () => katex.renderToString(children, { displayMode: block, throwOnError: false, strict: false, trust: true }),
    [children, block],
  );
  return <span className={block ? "block my-4" : "inline"} dangerouslySetInnerHTML={{ __html: html }} />;
}

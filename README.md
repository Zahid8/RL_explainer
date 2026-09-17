# RLbook 2020 Explainer

A single-page, light-theme explainer site for `../RLbook2020.pdf` (Sutton & Barto, *Reinforcement Learning: An Introduction*, second edition PDF). It adapts the local `../TASK.md` paper-explainer spec to a textbook: every chapter gets a technical layer plus an easy explanation layer.

## What is included

- Hero overview with the RL learning-loop visual.
- Term lab covering 20 recurring symbols and concepts before formulas appear.
- Book map for the three major arcs: tabular methods, approximation, and deeper links.
- Chapter-by-chapter explorer for all 17 chapters, with:
  - section checklist from the PDF contents,
  - core claim,
  - plain-English explanation,
  - technical explanation,
  - key ideas,
  - algorithms,
  - equations/forms,
  - examples,
  - common confusions,
  - bridge to the next chapter.
- Equation spine for the recurring return, value, Bellman, TD, Q-learning, and policy-gradient forms.
- Algorithm player that shows the shared structure across RL methods.
- Interactive teaching labs for bandit exploration, Bellman backup arithmetic, and lambda-return mixing.
- Glossary for recurring RL vocabulary.

The prose is paraphrased from the PDF structure and RL concepts; it intentionally does not reproduce the book text. Synthetic figures/labs are labelled as illustrative teaching devices, not reported book results.

## Run locally

```bash
npm install
npm run dev
```

Then open the URL printed by Next.js, usually `http://localhost:3000`.

## Production build and validation

```bash
npm run lint -- --quiet
npx tsc --noEmit
npm run build
npm run start -- -p 3510
```

The latest validation was run on port `3510` with desktop and mobile headless Chrome screenshots under `tmp/qa/` (ignored by git).

## Important files

- `src/lib/paper.ts` - all explainer content, typed chapter data, terms, glossary, and equation metadata.
- `src/app/page.tsx` - page composition and section order.
- `src/components/TermLab.tsx` - interactive notation browser.
- `src/components/ChapterExplorer.tsx` - filterable chapter-by-chapter cards.
- `src/components/figures/` - SVG/browser-computed teaching figures.
- `src/components/three/` - dynamic R3F hero scene.

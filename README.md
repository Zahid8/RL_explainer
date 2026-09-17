# RLbook 2020 Explainer

A single-page, light-theme explainer site for `../RLbook2020.pdf` (Sutton & Barto, *Reinforcement Learning: An Introduction*, second edition PDF). It adapts the local `../TASK.md` paper-explainer spec to a textbook: every chapter gets a technical layer plus an easy explanation layer.

## What is included

- Hero overview with the RL learning-loop visual.
- Term lab covering 20 recurring symbols and concepts before formulas appear.
- Book map for the three major arcs: tabular methods, approximation, and deeper links.
- Chapter-by-chapter explorer for all 17 chapters, with:
  - links to standalone chapter pages at `/chapters/1` through `/chapters/17`,
  - deep detail mode containing 161 section-level notes,
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
- Ultra-detail mastery notebook for all 17 chapters, adding 170 more detail tiles:
  - derivation clinics for key equations and formal moves,
  - algorithm/process walkthroughs,
  - diagnostic traps with fixes,
  - self-check questions with answers.
- Equation spine for the recurring return, value, Bellman, TD, Q-learning, and policy-gradient forms.
- Formula atlas with 44 additional book-wide equations/formal templates, each with:
  - easy handle,
  - technical handle,
  - use-when note,
  - watch-out note,
  - symbol chips.
- Figure and example companion with 147 book anchors:
  - 103 figure guide cards,
  - 1 TD-Gammon result-table guide card,
  - 43 named-example guide cards,
  - easy read plus technical role for each anchor.
- Exercise coach with 145 numbered exercise guide cards:
  - skill being tested,
  - easy goal,
  - technical goal,
  - three-step solution strategy,
  - checkpoint for whether the answer is on track.
- Standalone, highly detailed chapter pages for every chapter, each combining:
  - chapter overview,
  - algorithmic machinery,
  - section deep dives,
  - mastery derivations/processes/traps/checks,
  - formula cards,
  - figure/example anchors,
  - exercise coaching.
- Algorithm catalog with 95 detailed algorithm/procedure cards across the book, including:
  - objective and core update,
  - operational steps,
  - pseudocode,
  - equations,
  - implementation notes,
  - failure modes,
  - six-section implementation dossiers covering inputs/state/output, target/error anatomy, bias-variance position, control knobs, stability contract, and debugging,
  - related methods.
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

## Public tunnel

The production build is bound through the existing Cloudflare `papers` tunnel at:

- `https://rl.zahid.win/`

Local runtime pieces on this workstation:

- `rlbook-explainer.service` user systemd service runs `npm run start -- -H 127.0.0.1 -p 3510`.
- `papers-tunnel.service` routes `rl.zahid.win` to `http://127.0.0.1:3510` from `~/.cloudflared/papers.yml`.

## Important files

- `src/lib/paper.ts` - core explainer content, typed chapter data, terms, glossary, and equation metadata.
- `src/lib/deepDives.ts` - 161 section-level detailed notes, mechanics, and remember-this summaries for every chapter.
- `src/lib/mastery.ts` - 170 additional derivation, process, diagnostic-trap, and self-check tiles for every chapter.
- `src/lib/formulaAtlas.ts` - 44 equation/formal-template cards spanning the whole book.
- `src/lib/evidenceGuide.ts` - 147 figure/table/example guide cards spanning all 17 chapters.
- `src/lib/exerciseCoach.ts` - 145 exercise-coach cards generated from the PDF exercise anchors without copying exercise text.
- `src/lib/algorithmCatalog.ts` and `src/lib/algorithmDossier.ts` - 95 detailed algorithm/procedure cards keyed by chapter.
- `src/app/page.tsx` - page composition and section order.
- `src/app/chapters/[chapter]/page.tsx` - static chapter-detail route for all 17 chapters.
- `src/components/TermLab.tsx` - interactive notation browser.
- `src/components/ChapterExplorer.tsx` - filterable chapter-by-chapter cards.
- `src/components/MasteryNotebook.tsx` - searchable ultra-detail notebook rendered below the chapter explorer.
- `src/components/FormulaAtlas.tsx` - searchable/filterable formula atlas rendered under the equation spine.
- `src/components/EvidenceGuide.tsx` - searchable/filterable companion for figures, the TD-Gammon table, and named examples.
- `src/components/ExerciseCoach.tsx` - searchable/filterable exercise coaching layer.
- `src/components/figures/` - SVG/browser-computed teaching figures.
- `src/components/three/` - dynamic R3F hero scene.

# RLbook 2020 Explainer

A standalone, light-theme web textbook for `../RLbook2020.pdf` (Sutton & Barto, *Reinforcement Learning: An Introduction*, second edition PDF). It adapts the local `../TASK.md` paper-explainer spec to a full chapter-by-chapter RL course: every chapter now starts from first principles, uses graphical lecture metaphors, then builds the technical layer in original wording.

## What is included

- Hero overview with the RL learning-loop visual and standalone web-book framing.
- Linear standalone book reader at `/book`, rendering all 17 chapters in order with table-of-contents anchors, zero-knowledge starter ladders, guided lecture theaters, active-recall practice coaches, concept microscopes, worked example studios, misconception clinics, chapter simulator labs, bespoke manuscript prose, clickable interactive blackboards, full section-level textbook manuscripts, guided section lecture controls, section mastery studios, contextual symbol decoders, implementation code labs, assumption guarantee clinics, proof intuition labs, chapter exam studios, interactive formula lecture controls, from-zero explanations, visual mental models, section lecture beats, board-work steps, whole-book search links, and links to full chapter labs.
- Whole-book search index at `/search`, plus search consoles on the homepage and every chapter page, indexing the standalone prose and technical explanations across chapter overviews, zero-primer rungs, lecture theater slides, active recall, concepts, worked examples, misconception repairs, simulators, manuscripts, section lessons, synthesis/dependency gates, source audits, algorithm cards, deep dives, mastery notes, formulas, contextual symbol cards, implementation code labs, assumption clinics, proof labs, chapter exam cards, figure/example anchors, and exercise guides.
- Interactive learning graph at `/graph`, plus graph consoles on the homepage and every chapter page, mapping prerequisites, concepts, formulas, decoded symbols, algorithms, implementation code labs, assumption clinics, proof labs, chapter exam prompts, section mastery checks, worked examples, practice prompts, simulator knobs, and later unlocks as a clickable graphical lecture map.
- Contextual symbol decoder at `/symbols`, plus symbol consoles on the homepage, `/book`, and every chapter page, with 109 chapter-context symbol cards, 77 unique notation marks, and 545 modes across plain meaning, technical role, formula context, pitfall, and self-check.
- Implementation code lab at `/code`, plus code consoles on the homepage, `/book`, and every chapter page, with 109 algorithm-to-code labs and 545 modes across plain plan, code scaffold, invariants, tiny tests, and debug checks.
- Assumption and guarantee clinic at `/assumptions`, plus trust consoles on the homepage, `/book`, and every chapter page, with 109 method-validity clinics and 545 modes across plain stakes, assumptions, guarantee, failure mode, and repair plan.
- Proof intuition lab at `/proofs`, plus proof consoles on the homepage, `/book`, and every chapter page, with 61 proof cards and 305 modes across plain idea, exact claim, proof sketch, equation bridge, and stress test.
- Chapter exam studio at `/exam`, plus exam consoles on the homepage, `/book`, and every chapter page, with 119 chapter exam cards and 595 modes across prompt, answer plan, solution, rubric, and transfer test.
- Section mastery studio at `/sections`, plus section mastery consoles on the homepage, `/book`, and every chapter page, with 161 section cards and 805 modes across prompt, hint, answer, technical pass, and transfer test.
- Zero-knowledge primer for readers with no RL background: 85 chapter starter rungs and 340 primer modes across plain explanation, board picture, technical pass, and practice prompt.
- Guided chapter lecture theater with 17 chapter theaters, 85 slide stages, and 425 modes across beginner story, board picture, technical pass, equation lens, and teach-back check.
- Active-recall practice coach with 85 chapter checkpoints and 425 reveal modes across prompt, hint, solution, trap, and transfer views.
- Concept microscope with 136 chapter concept cards and 680 lecture modes across plain role, board picture, technical use, contrast, and self-check views.
- Worked example studio with 85 chapter examples and 425 worked modes across scenario, board steps, technical trace, pitfall, and self-check views.
- Misconception clinic with 85 chapter repair cards and 425 repair modes across mistake, why tempting, repair, technical consequence, and self-check views.
- Chapter simulator lab with 17 live simulators, 51 control sliders, and 68 readouts for exploration pressure, update strength, future horizon, learning speed, stability, bias, and variance.
- Term lab covering 20 recurring symbols and concepts before formulas appear.
- Book map for the three major arcs: tabular methods, approximation, and deeper links.
- Chapter-by-chapter explorer for all 17 chapters, with:
  - links to standalone chapter pages at `/chapters/1` through `/chapters/17`,
  - a zero-knowledge starter ladder for every chapter with five prerequisite rungs and four interactive modes per rung,
  - a guided lecture theater for every chapter with five slide stages and five beginner-to-advanced explanation modes,
  - an active-recall practice coach for every chapter with five checkpoint cards and five reveal modes per card,
  - a concept microscope for every chapter that teaches key terms and notation as plain role, board picture, technical use, contrast, and self-check,
  - a worked example studio for every chapter with toy worlds, board traces, tiny target calculations, method traces, and debug repairs,
  - a misconception clinic for every chapter that diagnoses tempting wrong shortcuts and repairs them in plain and technical language,
  - a chapter-local search index for every chapter so terms, formulas, traps, methods, and examples can be found without leaving the page,
  - a contextual symbol decoder for every chapter so notation gets plain, technical, formula-context, pitfall, and self-check treatment,
  - an implementation code lab for every chapter so each algorithm becomes state, target, update, invariant, hand-test, and debug-check structure,
  - an assumption and guarantee clinic for every chapter so each method says when its data, target, update, representation, and diagnostics make the promise valid,
  - a proof intuition lab for every chapter so chapter claims and equations are explained as claims, ingredients, proof sketches, equation bridges, and stress tests,
  - a chapter exam studio for every chapter so readers try, plan, reveal, grade, and transfer chapter mastery prompts,
  - a section mastery studio for every chapter so readers try each named section cold, ask for a hint, reveal an answer, read the technical pass, and transfer the idea,
  - an interactive chapter learning graph for every chapter showing how prerequisites, concepts, formulas, decoded symbols, methods, implementation scaffolds, assumptions, guarantees, exam prompts, section mastery checks, examples, practice, simulator knobs, and next-chapter unlocks connect,
  - a chapter simulator lab for every chapter with live exploration/update/horizon sliders and learning/stability/bias/variance readouts,
  - bespoke original manuscript moves for every chapter,
  - an interactive blackboard for every chapter with four staged visual moves, beginner/technical explanations, board notes, and self-checks,
  - a full section-by-section textbook manuscript layer covering every section anchor with beginner framing, technical pass, board walkthrough, formula bridge, algorithm bridge, misconception guard, and self-check,
  - guided section lecture controls for every section, with six modes: beginner/from-scratch, technical, board, formula, algorithm, and self-check,
  - section mastery checks for every section, with five modes: prompt, hint, answer, technical, and transfer,
  - from-scratch lecture pages that teach each chapter as a self-contained lesson rather than as a companion checklist,
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
- Interactive formula lecturer for every formula-atlas entry, with 220 equation modes across story, symbol map, trace, use-case, and pitfall views.
- Figure and example lecture atlas with 147 book anchors:
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
  - Original chapter manuscript with beginner explanation, graphical lecture, technical version, and takeaway for each main move,
  - Zero-knowledge starter ladder that teaches prerequisite intuition before the chapter manuscript and technical cards,
  - Guided lecture theater that walks from beginner story to board picture, technical pass, equation lens, and teach-back check,
  - Active-recall practice coach that asks readers to explain, draw, read math, choose methods, repair misconceptions, and transfer the idea before revealing the answer,
  - Concept microscope that makes important words earn an everyday role, a board drawing, a technical use, a contrast, and a self-check,
  - Worked example studio that turns the chapter into tiny solved cases before exercises,
  - Misconception clinic that explains why wrong-but-plausible shortcuts fail and how to repair them,
  - Chapter simulator lab that lets readers vary exploration pressure, update strength, and future horizon before reading the dense technical cards,
  - Interactive blackboard lecture board with four clickable stages, an animated SVG model, beginner explanation, technical toggle, board note, and self-check,
  - Full section textbook manuscript rewriting every section as original beginner-to-technical prose,
  - Interactive section lecturer that lets readers choose a section and switch through six guided modes,
  - Section mastery studio that asks readers to teach each section cold, reveal hints/answers, read the technical pass, and transfer the section idea,
  - Contextual symbol decoder that explains each chapter mark before the formula lecturer uses it,
  - Implementation code lab that turns every chapter algorithm into a plain implementation plan, Python-style scaffold, invariants, tiny tests, and debug checklist,
  - Assumption and guarantee clinic that explains when each chapter method is valid, what it promises, how it breaks, and how to repair it,
  - Proof intuition lab that explains why chapter claims and equations are believable, how the proof sketch works, and where the argument breaks,
  - Chapter exam studio that asks teach-back, board, formula/proof, method/code, trust, trace, and experiment mastery prompts with plans, rubrics, and transfer tests,
  - Interactive formula lecturer that turns each chapter equation into story, symbol, trace, use-case, and pitfall modes,
  - Standalone from-scratch lecture with beginner openings, visual mental models, vocabulary, section lecture beats, board-work steps, and checkpoints,
  - Book-source algorithm audit mapping PDF algorithm boxes/source methods to detailed cards,
  - chapter synthesis ladder with dependencies, algorithm comparisons, study protocol, and oral-exam checks,
  - cross-chapter dependency map with prerequisites, outgoing unlocks, concept gates, skip risks, and review loop,
  - chapter overview,
  - algorithmic machinery,
  - section deep dives,
  - mastery derivations/processes/traps/checks,
  - formula cards,
  - figure/example anchors,
  - exercise coaching.
- Global algorithm index page at `/algorithms` with chapter coverage dashboard, family grouping, source cue mapping, and direct links to all expanded cards.
- Whole-book coverage audit page at `/coverage` proving chapter route coverage, whole-book search-index coverage, interactive learning-graph coverage, contextual symbol-decoder coverage, implementation code-lab coverage, assumption guarantee-clinic coverage, proof intuition-lab coverage, chapter exam-studio coverage, section mastery-studio coverage, zero-knowledge starter coverage, guided lecture theater coverage, active-recall practice coverage, concept microscope coverage, worked example coverage, misconception clinic coverage, chapter simulator lab coverage, manuscript coverage, section-level textbook coverage, guided section lecture coverage, interactive formula lecture coverage, interactive blackboard coverage, and algorithm detail-layer completeness from current repository data.
- Animated and interactive graphics throughout the site: every homepage section, chapter header/story block, guided lecture theater, contextual symbol decoder, implementation code lab, assumption guarantee clinic, proof intuition lab, chapter exam studio, section mastery studio, concept microscope, worked example studio, misconception clinic, chapter simulator lab, chapter section heading, formula reader, algorithm card, global algorithm index card/chapter cluster, and coverage section gets reusable hover/click reinforcement-learning motion sketches; every chapter also has a 4-stage blackboard; dense explanation cards, metrics, panels, proof blocks, exam cards, section mastery cards, notes, and study-route cards use animated micro-glyphs.
- Algorithm catalog with 109 detailed algorithm/procedure cards across the book, including:
  - objective and core update,
  - operational steps,
  - pseudocode,
  - equations,
  - implementation notes,
  - failure modes,
  - six-section implementation dossiers covering inputs/state/output, target/error anatomy, bias-variance position, control knobs, stability contract, and debugging,
  - worked update microscopes with toy numeric/symbolic traces and debug probes,
  - derivation paths that walk from estimand to target, residual, credit assignment, control move, and proof/debug obligation,
  - technical profile axes covering role, data regime, target-policy relation, model use, backup style, approximation, credit assignment, objective, convergence handle, compute/memory, best use, and avoid-when notes,
  - related methods.
- Algorithm player that shows the shared structure across RL methods.
- Interactive teaching labs for bandit exploration, Bellman backup arithmetic, and lambda-return mixing.
- Glossary for recurring RL vocabulary.

The prose is a standalone original teaching rewrite based on the PDF structure and RL concepts; it intentionally does not reproduce the book text. Synthetic figures/labs are labelled as illustrative teaching devices, not reported book results.

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

The latest validation was run on port `3510` with desktop and mobile headless Chrome screenshots under `tmp/qa/` (ignored by git). The animation QA also uses headless Chrome/CDP to click phase controls, confirm moving SVG dots and CSS animation names, and check that controls do not overflow on desktop or mobile routes. The whole-book search QA types a query on `/search`, verifies `data-query`/`data-layer`/`data-count` changes, confirms matches remain visible, and checks for zero input/button overflow. The learning-graph QA clicks a graph node, switches technical/path modes, changes chapters, verifies `data-node`/`data-view`/`data-chapter` changes, and checks for zero control overflow plus an active `rl-dash` animation. The symbol-decoder QA clicks a symbol card, switches technical/check modes, verifies `data-symbol`/`data-mode` changes, and checks for zero control overflow plus an active `rl-dash` animation. The implementation code-lab QA clicks an algorithm card, switches code/test/debug modes, verifies `data-code-card`/`data-mode` changes, and checks for zero control overflow plus an active `rl-dash` animation. The assumption-clinic QA clicks a method card, switches assumption/guarantee/failure/repair modes, verifies `data-assumption-card`/`data-mode` changes, and checks for zero control overflow plus an active `rl-dash` animation. The proof-lab QA clicks a proof card, switches claim/proof/equation/stress modes, verifies `data-proof-card`/`data-mode` changes, and checks for zero control overflow plus an active `rl-dash` animation. The chapter-exam QA clicks an exam card, switches plan/solution/rubric/transfer modes, verifies `data-exam-card`/`data-mode` changes, and checks for zero control overflow plus an active `rl-dash` animation. The section-mastery QA clicks a section card, switches hint/answer/technical/transfer modes, verifies `data-section-card`/`data-mode` changes, and checks for zero control overflow plus an active `rl-dash` animation. The guided-lecture-theater QA clicks slide and mode buttons, verifies `data-slide`/`data-mode` changes, and checks for zero button overflow plus an active `rl-dash` animation. The concept microscope QA clicks concept and mode buttons on `/chapters/1`, verifies `data-concept`/`data-mode` changes, and checks for zero button overflow plus an active `rl-dash` animation. The worked-example QA clicks example and mode buttons, verifies `data-example`/`data-mode` changes, and checks the same overflow and animation invariants. The misconception-clinic QA clicks repair-card and mode buttons, verifies `data-card`/`data-mode` changes, and checks the same overflow and animation invariants. The chapter-simulator QA moves a range slider, verifies `data-exploration` changes, and checks the same overflow and animation invariants.

## Public tunnel

The production build is bound through the existing Cloudflare `papers` tunnel at:

- `https://rl.zahid.win/`

Local runtime pieces on this workstation:

- `rlbook-explainer.service` user systemd service runs `npm run start -- -H 127.0.0.1 -p 3510`.
- The service `WorkingDirectory` must point at the active checkout: `/home/zahid/Projects/rl_book/rlbook-explainer`. If chapter pages return `500`, verify it with `systemctl --user cat rlbook-explainer.service` before debugging Next.js route code.
- `papers-tunnel.service` routes `rl.zahid.win` to `http://127.0.0.1:3510` from `~/.cloudflared/papers.yml`.

## Important files

- `src/lib/paper.ts` - core explainer content, typed chapter data, terms, glossary, and equation metadata.
- `src/lib/deepDives.ts` - 161 section-level detailed notes, mechanics, and remember-this summaries for every chapter.
- `src/lib/mastery.ts` - 170 additional derivation, process, diagnostic-trap, and self-check tiles for every chapter.
- `src/lib/formulaAtlas.ts` - 44 equation/formal-template cards spanning the whole book plus formula lecture mode counts/helpers.
- `src/lib/evidenceGuide.ts` - 147 figure/table/example guide cards spanning all 17 chapters.
- `src/lib/exerciseCoach.ts` - 145 exercise-coach cards generated from the PDF exercise anchors without copying exercise text.
- `src/lib/chapterSynthesis.ts` - chapter-level synthesis ladders connecting each chapter story to its algorithms, comparison axes, study protocol, and oral-exam checks.
- `src/lib/chapterDependencyMap.ts` - cross-chapter prerequisite/unlock maps, concept gates, skip risks, and review loops for every chapter page.
- `src/lib/zeroKnowledgeLadders.ts` - 85 starter rungs across all chapters, each with plain, visual, technical, and practice modes for readers who know no RL yet.
- `src/lib/chapterLectureTheater.ts` - 17 guided chapter theaters with 85 slide stages and 425 beginner/picture/technical/equation/check modes.
- `src/lib/chapterPractice.ts` - 85 active-recall checkpoints across all chapters with prompt, hint, solution, trap, and transfer modes.
- `src/lib/conceptAtlas.ts` - chapter concept microscope data generated from original chapter/section modules, with plain, visual, technical, contrast, and self-check modes.
- `src/lib/chapterWorkedExamples.ts` - 85 worked examples across all chapters with scenario, board, trace, pitfall, and self-check modes.
- `src/lib/chapterMisconceptions.ts` - 85 misconception clinic cards across all chapters with mistake, why tempting, repair, technical consequence, and self-check modes.
- `src/lib/chapterSimulators.ts` - 17 chapter simulator labs with exploration/update/horizon controls and learning/stability/bias/variance readouts.
- `src/lib/bookIndex.ts` - whole-book searchable knowledge index built from the standalone original explanation layers.
- `src/lib/codeLab.ts` - implementation code-lab data derived from algorithm cards, with plain plans, Python-style scaffolds, invariants, tiny tests, and debug checks.
- `src/lib/assumptionClinic.ts` - assumption/guarantee clinic data derived from algorithm cards, with validity contracts, guarantees, failures, diagnostics, and repairs.
- `src/lib/proofLab.ts` - proof-intuition data derived from chapter/formula/concept/algorithm modules, with chapter proof spines, formula proof cards, proof sketches, equation bridges, and stress tests.
- `src/lib/chapterExam.ts` - chapter mastery exam data synthesized from concepts, formulas, code labs, assumptions, proofs, worked examples, and simulators, with 119 prompt/plan/solution/rubric/transfer cards.
- `src/lib/sectionMastery.ts` - section mastery data synthesized from section manuscript lessons, with 161 prompt/hint/answer/technical/transfer cards.
- `src/lib/symbolAtlas.ts` - contextual notation decoder derived from formula symbols, with plain, technical, formula-context, pitfall, and self-check modes.
- `src/lib/learningGraph.ts` - chapter learning-graph data derived from concepts, formulas, decoded symbols, algorithms, implementation code labs, assumption clinics, proof labs, chapter exam prompts, section mastery checks, examples, practice prompts, simulators, and dependency maps.
- `src/lib/chapterManuscripts.ts` - bespoke original prose layer for all 17 chapters, with 51 beginner-to-technical manuscript moves.
- `src/lib/interactiveBlackboards.ts` - 17 chapter blackboards with 68 clickable visual stages spanning beginner explanation, technical explanation, board note, and self-check.
- `src/lib/sectionNarratives.ts` - section-by-section original textbook manuscript layer covering all 161 section anchors with from-scratch prose, technical pass, board walkthrough, formula/algorithm bridges, misconception guard, and self-check.
- `src/components/SectionLessonReader.tsx` - client-side guided lecture console for section manuscripts, exposing six modes per section with an animated board.
- `src/components/SymbolDecoder.tsx` - client-side notation lecture console for choosing symbols and switching among plain, technical, formula-context, pitfall, and self-check modes.
- `src/components/CodeLab.tsx` - client-side implementation console for choosing algorithm labs and switching among plain plan, code scaffold, invariants, tiny tests, and debug checks.
- `src/components/AssumptionClinic.tsx` - client-side trust console for choosing method clinics and switching among plain stakes, assumptions, guarantee, failure, and repair modes.
- `src/components/ProofLab.tsx` - client-side proof console for choosing chapter/formula proof cards and switching among plain idea, claim, proof sketch, equation bridge, and stress test modes.
- `src/components/ChapterExamStudio.tsx` - client-side exam console for choosing chapter exam cards and switching among prompt, plan, solution, rubric, and transfer modes.
- `src/components/SectionMasteryStudio.tsx` - client-side section mastery console for choosing section cards and switching among prompt, hint, answer, technical, and transfer modes.
- `src/components/FormulaLectureReader.tsx` - client-side equation lecture console for formula cards, exposing story, symbols, trace, use-case, and pitfall modes with an animated equation board.
- `src/components/ZeroKnowledgeLadderReader.tsx` - client-side starter ladder console that lets readers choose chapter/rung and switch among plain, visual, technical, and practice modes.
- `src/components/ChapterLectureTheater.tsx` - client-side lecture theater console for choosing chapter, slide, and beginner-to-advanced explanation mode.
- `src/components/ChapterPracticeCoach.tsx` - client-side active-recall console that reveals prompt, hint, solution, trap, and transfer views after the reader tries the checkpoint.
- `src/components/ConceptLectureDeck.tsx` - client-side concept microscope console for switching among plain role, board picture, technical use, contrast, and self-check views.
- `src/components/WorkedExampleStudio.tsx` - client-side worked-example console for switching among scenario, board, technical trace, pitfall, and self-check modes.
- `src/components/MisconceptionClinic.tsx` - client-side repair clinic for switching among mistake, temptation, repair, technical consequence, and self-check modes.
- `src/components/ChapterSimulatorLab.tsx` - client-side simulator console with chapter selection, range controls, and animated readout chart.
- `src/components/BookSearch.tsx` - client-side search console for filtering the knowledge index by query, layer, and chapter.
- `src/components/LearningGraphExplorer.tsx` - client-side clickable SVG learning graph for chapter maps, node details, technical/path modes, and direct layer links.
- `src/lib/standaloneBook.ts` - standalone web-book lecture layer for all 17 chapters, generating from-zero openings, visual mental models, vocabulary, section lecture beats, board-work steps, and checkpoints.
- `src/lib/coverageAudit.ts` - current-state coverage ledger for chapter routes and algorithm detail layers.
- `src/app/book/page.tsx` - linear standalone book reader that puts all 17 chapter lectures on one continuous web-book page.
- `src/app/search/page.tsx` - whole-book search page for the indexed standalone explanations.
- `src/app/graph/page.tsx` - whole-book interactive graph page for navigating chapter relationships visually.
- `src/app/symbols/page.tsx` - whole-book symbol decoder page for chapter-context notation explanations.
- `src/app/code/page.tsx` - whole-book implementation code-lab page for algorithm scaffolds, invariants, tests, and debugging checks.
- `src/app/assumptions/page.tsx` - whole-book assumption and guarantee clinic page for validity contracts, failure modes, and repairs.
- `src/app/proofs/page.tsx` - whole-book proof intuition page for chapter proof spines and formula-level proof sketches.
- `src/app/exam/page.tsx` - whole-book chapter exam studio page for oral-exam prompts, solution plans, self-grading rubrics, and transfer tests.
- `src/app/sections/page.tsx` - whole-book section mastery studio page for section-level prompts, hints, answers, technical passes, and transfer tests.
- `src/app/coverage/page.tsx` - rendered whole-book coverage audit and completeness matrix.
- `src/components/InteractiveBlackboard.tsx` - client-side staged blackboard component used by `/book` and every chapter route.
- `src/components/AnimatedConceptGraphic.tsx` - reusable animated SVG concept graphic with hover/click phase controls for section and algorithm visuals.
- `src/components/MotionGlyph.tsx` - lightweight server-rendered animated SVG micro-visuals used across metrics, notes, panels, proofs, study cards, and dense explanation blocks.
- `src/lib/algorithmCatalog.ts`, `src/lib/algorithmDerivations.ts`, `src/lib/algorithmDossier.ts`, `src/lib/algorithmWorkedExamples.ts`, and `src/lib/algorithmProfiles.ts` - 109 detailed algorithm/procedure cards keyed by chapter, with derivation, dossier, worked-example, and technical-profile enrichment.
- `src/lib/algorithmSourceAudit.ts` - PDF-source crosswalk mapping named algorithm boxes/methods to the detailed cards on each chapter page.
- `src/app/page.tsx` - page composition and section order.
- `src/app/chapters/[chapter]/page.tsx` - static chapter-detail route for all 17 chapters.
- `src/app/algorithms/page.tsx` - global whole-book algorithm index and coverage dashboard.
- `src/components/TermLab.tsx` - interactive notation browser.
- `src/components/ChapterExplorer.tsx` - filterable chapter-by-chapter cards.
- `src/components/MasteryNotebook.tsx` - searchable ultra-detail notebook rendered below the chapter explorer.
- `src/components/FormulaAtlas.tsx` - searchable/filterable formula atlas rendered under the equation spine.
- `src/components/EvidenceGuide.tsx` - searchable/filterable lecture atlas for figures, the TD-Gammon table, and named examples.
- `src/components/ExerciseCoach.tsx` - searchable/filterable exercise coaching layer.
- `src/components/figures/` - SVG/browser-computed teaching figures.
- `src/components/three/` - dynamic R3F hero scene.

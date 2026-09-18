# Graph Report - rlbook-explainer  (2026-09-18)

## Corpus Check
- 164 files · ~961,184 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 773 nodes · 1450 edges · 54 communities detected
- Extraction: 69% EXTRACTED · 31% INFERRED · 0% AMBIGUOUS · INFERRED: 452 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 17|Community 17]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 19|Community 19]]
- [[_COMMUNITY_Community 20|Community 20]]
- [[_COMMUNITY_Community 21|Community 21]]
- [[_COMMUNITY_Community 22|Community 22]]
- [[_COMMUNITY_Community 23|Community 23]]
- [[_COMMUNITY_Community 28|Community 28]]
- [[_COMMUNITY_Community 29|Community 29]]
- [[_COMMUNITY_Community 30|Community 30]]
- [[_COMMUNITY_Community 31|Community 31]]
- [[_COMMUNITY_Community 32|Community 32]]
- [[_COMMUNITY_Community 33|Community 33]]
- [[_COMMUNITY_Community 34|Community 34]]
- [[_COMMUNITY_Community 35|Community 35]]
- [[_COMMUNITY_Community 36|Community 36]]
- [[_COMMUNITY_Community 37|Community 37]]
- [[_COMMUNITY_Community 38|Community 38]]
- [[_COMMUNITY_Community 39|Community 39]]
- [[_COMMUNITY_Community 40|Community 40]]
- [[_COMMUNITY_Community 41|Community 41]]
- [[_COMMUNITY_Community 42|Community 42]]
- [[_COMMUNITY_Community 43|Community 43]]
- [[_COMMUNITY_Community 44|Community 44]]
- [[_COMMUNITY_Community 45|Community 45]]
- [[_COMMUNITY_Community 46|Community 46]]
- [[_COMMUNITY_Community 47|Community 47]]
- [[_COMMUNITY_Community 48|Community 48]]
- [[_COMMUNITY_Community 49|Community 49]]
- [[_COMMUNITY_Community 50|Community 50]]
- [[_COMMUNITY_Community 51|Community 51]]
- [[_COMMUNITY_Community 52|Community 52]]
- [[_COMMUNITY_Community 53|Community 53]]
- [[_COMMUNITY_Community 54|Community 54]]
- [[_COMMUNITY_Community 55|Community 55]]
- [[_COMMUNITY_Community 56|Community 56]]
- [[_COMMUNITY_Community 57|Community 57]]

## God Nodes (most connected - your core abstractions)
1. `buildCoverageAudit()` - 116 edges
2. `chapterCoverageRow()` - 78 edges
3. `BookPage()` - 61 edges
4. `buildBookIndexEntries()` - 36 edges
5. `learningGraphForChapter()` - 31 edges
6. `algorithmsForChapter()` - 24 edges
7. `workedExampleForAlgorithm()` - 22 edges
8. `conceptCardsForChapter()` - 20 edges
9. `workedExamplesForChapter()` - 16 edges
10. `simulatorForChapter()` - 16 edges

## Surprising Connections (you probably didn't know these)
- `chapterCoverageRow()` --calls--> `chapterSynthesis()`  [INFERRED]
  src/lib/coverageAudit.ts → /home/zahid/Projects/rl_bok/rlbook-explainer/src/lib/chapterSynthesis.ts
- `chapterCoverageRow()` --calls--> `sourceAuditsForChapter()`  [INFERRED]
  src/lib/coverageAudit.ts → /home/zahid/Projects/rl_bok/rlbook-explainer/src/lib/algorithmSourceAudit.ts
- `algorithmCoverageRow()` --calls--> `algorithmDerivation()`  [INFERRED]
  src/lib/coverageAudit.ts → /home/zahid/Projects/rl_bok/rlbook-explainer/src/lib/algorithmDerivations.ts
- `algorithmCoverageRow()` --calls--> `workedExampleForAlgorithm()`  [INFERRED]
  src/lib/coverageAudit.ts → /home/zahid/Projects/rl_bok/rlbook-explainer/src/lib/algorithmWorkedExamples.ts
- `chapterSynthesis()` --calls--> `buildBookIndexEntries()`  [INFERRED]
  /home/zahid/Projects/rl_bok/rlbook-explainer/src/lib/chapterSynthesis.ts → src/lib/bookIndex.ts

## Communities

### Community 0 - "Community 0"
Cohesion: 0.07
Nodes (50): AnalogiesPage(), BookPage(), allAnalogyCards(), analogiesForChapter(), analogyAnchorCount(), analogyCandidatesForChapter(), analogyCardCount(), analogyChapterCount() (+42 more)

### Community 1 - "Community 1"
Cohesion: 0.07
Nodes (50): DebugPage(), algorithmsForChapter(), algorithmDebugCardCount(), algorithmDebugCardsForChapter(), algorithmDebugChapterCount(), algorithmDebugModeCount(), algorithmDebugRepairStepCount(), algorithmDebugTestStepCount() (+42 more)

### Community 2 - "Community 2"
Cohesion: 0.08
Nodes (19): allBookIndexEntries(), bookIndexChapterCount(), bookIndexEntriesForChapter(), bookIndexEntryCount(), bookIndexLayerCount(), buildBookIndexEntries(), manuscriptForChapter(), manuscriptSectionCount() (+11 more)

### Community 3 - "Community 3"
Cohesion: 0.11
Nodes (22): FoundationsPage(), allFoundationDictionaryCards(), compactTags(), foundationCandidatesForChapter(), foundationDictionaryCardCount(), foundationDictionaryCardsForChapter(), foundationDictionaryChapterCount(), foundationDictionaryModeCount() (+14 more)

### Community 4 - "Community 4"
Cohesion: 0.13
Nodes (24): algorithmDossier(), inferBiasVariancePosition(), inferDiagnostics(), inferEstimatorShape(), inferImplementationInvariants(), inferKnobs(), inferStabilityContract(), outputPhrase() (+16 more)

### Community 5 - "Community 5"
Cohesion: 0.14
Nodes (24): AssumptionsPage(), algorithmsWithAssumptionClinicForChapter(), allAssumptionClinicCards(), assumptionCardCount(), assumptionCardForAlgorithm(), assumptionCardsForChapter(), assumptionChapterCount(), assumptionModeCount() (+16 more)

### Community 6 - "Community 6"
Cohesion: 0.16
Nodes (15): GraphPage(), chapterDependencyMap(), conceptGates(), dominantProfiles(), reviewLoop(), skipRisks(), topCounts(), allLearningGraphs() (+7 more)

### Community 7 - "Community 7"
Cohesion: 0.18
Nodes (21): applicationExample(), approximationExample(), banditExample(), doubleQExample(), dpExample(), expectedBackupExample(), genericExample(), gradientBanditExample() (+13 more)

### Community 8 - "Community 8"
Cohesion: 0.19
Nodes (19): CodePage(), algorithmsWithCodeLabForChapter(), allCodeLabCards(), codeLabCardCount(), codeLabCardForAlgorithm(), codeLabCardsForAlgorithmFamily(), codeLabCardsForChapter(), codeLabChapterCount() (+11 more)

### Community 9 - "Community 9"
Cohesion: 0.17
Nodes (16): ExamPage(), allChapterExamCards(), chapterExamCardCount(), chapterExamCardsForChapter(), chapterExamChapterCount(), chapterExamModeCount(), compactSentence(), compactTags() (+8 more)

### Community 10 - "Community 10"
Cohesion: 0.19
Nodes (16): ComparePage(), allMethodCompareCards(), bridgeFrame(), compactList(), compactTags(), contrastAlgorithm(), failureFrame(), methodCompareCardCount() (+8 more)

### Community 11 - "Community 11"
Cohesion: 0.2
Nodes (14): allSocraticTutorCards(), normalize(), roundRobinUnique(), slug(), socraticCandidatesForChapter(), socraticTutorAnchorCount(), socraticTutorBoardStepCount(), socraticTutorCardCount() (+6 more)

### Community 12 - "Community 12"
Cohesion: 0.24
Nodes (15): allProofLabCards(), chapterProofCard(), chapterProofSpineCount(), compactList(), compactTags(), formulaProofCard(), formulaProofCardCount(), proofCardCount() (+7 more)

### Community 13 - "Community 13"
Cohesion: 0.2
Nodes (15): allVisualStoryCards(), compactTags(), normalize(), roundRobinUnique(), slug(), visualStoriesForChapter(), visualStoryActorCount(), visualStoryCandidatesForChapter() (+7 more)

### Community 14 - "Community 14"
Cohesion: 0.21
Nodes (13): CasesPage(), allCaseStudies(), caseStudiesForChapter(), caseStudyAnchorCount(), caseStudyBoardFrameCount(), caseStudyCandidatesForChapter(), caseStudyCardCount(), caseStudyChapterCount() (+5 more)

### Community 15 - "Community 15"
Cohesion: 0.28
Nodes (14): EvidencePage(), allEvidenceReplayCards(), compactTags(), evidenceReplayCardCount(), evidenceReplayCardsForChapter(), evidenceReplayChapterCount(), evidenceReplayKindCount(), evidenceReplayModeCount() (+6 more)

### Community 16 - "Community 16"
Cohesion: 0.21
Nodes (13): allSymbolCards(), buildSymbolCards(), cleanSpoken(), compactTags(), guide(), guideForSymbol(), symbolCardCount(), symbolCardsForChapter() (+5 more)

### Community 17 - "Community 17"
Cohesion: 0.31
Nodes (13): allReadinessCards(), compactList(), compactTags(), makeCard(), normalize(), readinessCardCount(), readinessCardsForChapter(), readinessChapterCount() (+5 more)

### Community 18 - "Community 18"
Cohesion: 0.24
Nodes (13): ExercisesPage(), allExerciseSolutionCards(), compactList(), compactTags(), exerciseSolutionCardCount(), exerciseSolutionCardForCoach(), exerciseSolutionCardsForChapter(), exerciseSolutionChapterCount() (+5 more)

### Community 19 - "Community 19"
Cohesion: 0.3
Nodes (10): algorithmDerivation(), classifyAlgorithm(), codingTrace(), controlMove(), creditAssignment(), equationNotes(), errorSignal(), estimateSubject() (+2 more)

### Community 20 - "Community 20"
Cohesion: 0.36
Nodes (9): chapterSynthesis(), comparisonAxes(), dependencyStack(), groupBy(), implementationTest(), ladderItem(), oralExamPrompts(), studyProtocol() (+1 more)

### Community 21 - "Community 21"
Cohesion: 0.7
Nodes (3): audit(), evalJs(), send()

### Community 22 - "Community 22"
Cohesion: 0.7
Nodes (3): audit(), evalJs(), send()

### Community 23 - "Community 23"
Cohesion: 0.7
Nodes (3): audit(), evalJs(), send()

### Community 28 - "Community 28"
Cohesion: 0.67
Nodes (2): evalJs(), send()

### Community 29 - "Community 29"
Cohesion: 0.67
Nodes (2): evalJs(), send()

### Community 30 - "Community 30"
Cohesion: 0.67
Nodes (2): evalJs(), send()

### Community 31 - "Community 31"
Cohesion: 0.67
Nodes (2): evalJs(), send()

### Community 32 - "Community 32"
Cohesion: 0.67
Nodes (2): evalJs(), send()

### Community 33 - "Community 33"
Cohesion: 0.67
Nodes (2): evalJs(), send()

### Community 34 - "Community 34"
Cohesion: 0.67
Nodes (2): evalJs(), send()

### Community 35 - "Community 35"
Cohesion: 0.67
Nodes (2): evalJs(), send()

### Community 36 - "Community 36"
Cohesion: 0.67
Nodes (2): evalJs(), send()

### Community 37 - "Community 37"
Cohesion: 0.67
Nodes (2): evalJs(), send()

### Community 38 - "Community 38"
Cohesion: 0.67
Nodes (2): evalJs(), send()

### Community 39 - "Community 39"
Cohesion: 0.67
Nodes (2): evalJs(), send()

### Community 40 - "Community 40"
Cohesion: 0.67
Nodes (2): evalJs(), send()

### Community 41 - "Community 41"
Cohesion: 0.67
Nodes (2): evalJs(), send()

### Community 42 - "Community 42"
Cohesion: 0.67
Nodes (2): evalJs(), send()

### Community 43 - "Community 43"
Cohesion: 0.67
Nodes (2): evalJs(), send()

### Community 44 - "Community 44"
Cohesion: 0.67
Nodes (2): evalJs(), send()

### Community 45 - "Community 45"
Cohesion: 0.67
Nodes (2): evalJs(), send()

### Community 46 - "Community 46"
Cohesion: 0.67
Nodes (2): evalJs(), send()

### Community 47 - "Community 47"
Cohesion: 0.67
Nodes (2): evalJs(), send()

### Community 48 - "Community 48"
Cohesion: 0.67
Nodes (2): evalJs(), send()

### Community 49 - "Community 49"
Cohesion: 0.67
Nodes (2): evalJs(), send()

### Community 50 - "Community 50"
Cohesion: 0.67
Nodes (2): evalJs(), send()

### Community 51 - "Community 51"
Cohesion: 0.67
Nodes (2): evalJs(), send()

### Community 52 - "Community 52"
Cohesion: 0.67
Nodes (2): evalJs(), send()

### Community 53 - "Community 53"
Cohesion: 0.67
Nodes (2): evalJs(), send()

### Community 54 - "Community 54"
Cohesion: 0.67
Nodes (2): evalJs(), send()

### Community 55 - "Community 55"
Cohesion: 0.67
Nodes (2): evalJs(), send()

### Community 56 - "Community 56"
Cohesion: 0.67
Nodes (2): evalJs(), send()

### Community 57 - "Community 57"
Cohesion: 0.67
Nodes (2): evalJs(), send()

## Knowledge Gaps
- **Thin community `Community 28`** (4 nodes): `evalJs()`, `send()`, `waitJson()`, `audit-section-mastery-studio.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 29`** (4 nodes): `evalJs()`, `send()`, `waitJson()`, `audit-proof-lab.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 30`** (4 nodes): `evalJs()`, `send()`, `waitJson()`, `audit-worked-example-studio.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 31`** (4 nodes): `evalJs()`, `send()`, `waitJson()`, `audit-zero-knowledge-reader.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 32`** (4 nodes): `evalJs()`, `send()`, `waitJson()`, `audit-chapter-lecture-theater.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 33`** (4 nodes): `evalJs()`, `send()`, `waitJson()`, `audit-concept-deck.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 34`** (4 nodes): `evalJs()`, `send()`, `waitJson()`, `audit-formula-reader.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 35`** (4 nodes): `evalJs()`, `send()`, `waitJson()`, `audit-code-lab.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 36`** (4 nodes): `evalJs()`, `send()`, `waitJson()`, `audit-practice-coach.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 37`** (4 nodes): `evalJs()`, `send()`, `waitJson()`, `audit-evidence-replay-studio.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 38`** (4 nodes): `evalJs()`, `send()`, `waitJson()`, `audit-analogy-studio.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 39`** (4 nodes): `evalJs()`, `send()`, `waitJson()`, `audit-method-compare-studio.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 40`** (4 nodes): `evalJs()`, `send()`, `waitJson()`, `audit-project-studio.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 41`** (4 nodes): `evalJs()`, `send()`, `waitJson()`, `audit-chapter-simulator-lab.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 42`** (4 nodes): `evalJs()`, `send()`, `waitJson()`, `audit-chapter1-click.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 43`** (4 nodes): `audit-interactions.mjs`, `evalJs()`, `send()`, `waitJson()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 44`** (4 nodes): `evalJs()`, `send()`, `waitJson()`, `audit-learning-graph.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 45`** (4 nodes): `evalJs()`, `send()`, `waitJson()`, `audit-book-search.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 46`** (4 nodes): `evalJs()`, `send()`, `waitJson()`, `audit-foundation-dictionary-studio.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 47`** (4 nodes): `evalJs()`, `send()`, `waitJson()`, `audit-case-study-studio.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 48`** (4 nodes): `evalJs()`, `send()`, `waitJson()`, `audit-math-rescue-studio.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 49`** (4 nodes): `evalJs()`, `send()`, `waitJson()`, `audit-misconception-clinic.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 50`** (4 nodes): `evalJs()`, `send()`, `waitJson()`, `audit-assumption-clinic.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 51`** (4 nodes): `evalJs()`, `send()`, `waitJson()`, `audit-algorithm-debug-clinic.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 52`** (4 nodes): `evalJs()`, `send()`, `waitJson()`, `audit-symbol-decoder.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 53`** (4 nodes): `evalJs()`, `send()`, `waitJson()`, `audit-exercise-solution-studio.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 54`** (4 nodes): `evalJs()`, `send()`, `waitJson()`, `audit-readiness-coach.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 55`** (4 nodes): `evalJs()`, `send()`, `waitJson()`, `audit-visual-story-studio.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 56`** (4 nodes): `evalJs()`, `send()`, `waitJson()`, `audit-chapter-exam-studio.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 57`** (4 nodes): `evalJs()`, `send()`, `waitJson()`, `audit-socratic-tutor-studio.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `buildCoverageAudit()` connect `Community 0` to `Community 1`, `Community 2`, `Community 3`, `Community 5`, `Community 6`, `Community 8`, `Community 9`, `Community 10`, `Community 11`, `Community 12`, `Community 13`, `Community 14`, `Community 15`, `Community 16`, `Community 17`, `Community 18`?**
  _High betweenness centrality (0.188) - this node is a cross-community bridge._
- **Why does `chapterCoverageRow()` connect `Community 1` to `Community 0`, `Community 2`, `Community 3`, `Community 4`, `Community 5`, `Community 6`, `Community 8`, `Community 9`, `Community 10`, `Community 11`, `Community 12`, `Community 13`, `Community 14`, `Community 15`, `Community 16`, `Community 17`, `Community 18`, `Community 20`?**
  _High betweenness centrality (0.108) - this node is a cross-community bridge._
- **Why does `algorithmCoverageRow()` connect `Community 4` to `Community 0`, `Community 19`, `Community 7`?**
  _High betweenness centrality (0.088) - this node is a cross-community bridge._
- **Are the 114 inferred relationships involving `buildCoverageAudit()` (e.g. with `zeroKnowledgeRungCount()` and `zeroKnowledgeModeCount()`) actually correct?**
  _`buildCoverageAudit()` has 114 INFERRED edges - model-reasoned connections that need verification._
- **Are the 77 inferred relationships involving `chapterCoverageRow()` (e.g. with `algorithmsForChapter()` and `chapterSynthesis()`) actually correct?**
  _`chapterCoverageRow()` has 77 INFERRED edges - model-reasoned connections that need verification._
- **Are the 60 inferred relationships involving `BookPage()` (e.g. with `standaloneLectureTileCount()` and `manuscriptSectionCount()`) actually correct?**
  _`BookPage()` has 60 INFERRED edges - model-reasoned connections that need verification._
- **Are the 34 inferred relationships involving `buildBookIndexEntries()` (e.g. with `algorithmsForChapter()` and `standaloneLectureForChapter()`) actually correct?**
  _`buildBookIndexEntries()` has 34 INFERRED edges - model-reasoned connections that need verification._
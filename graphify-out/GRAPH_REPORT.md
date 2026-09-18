# Graph Report - rlbook-explainer  (2026-09-18)

## Corpus Check
- 122 files · ~914,404 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 524 nodes · 880 edges · 40 communities detected
- Extraction: 73% EXTRACTED · 27% INFERRED · 0% AMBIGUOUS · INFERRED: 236 edges (avg confidence: 0.8)
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
- [[_COMMUNITY_Community 25|Community 25]]
- [[_COMMUNITY_Community 26|Community 26]]
- [[_COMMUNITY_Community 27|Community 27]]
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

## God Nodes (most connected - your core abstractions)
1. `buildCoverageAudit()` - 56 edges
2. `chapterCoverageRow()` - 46 edges
3. `BookPage()` - 31 edges
4. `buildBookIndexEntries()` - 26 edges
5. `workedExampleForAlgorithm()` - 22 edges
6. `learningGraphForChapter()` - 21 edges
7. `algorithmsForChapter()` - 16 edges
8. `assumptionCardForAlgorithm()` - 16 edges
9. `algorithmProfile()` - 16 edges
10. `chapterExamCardsForChapter()` - 15 edges

## Surprising Connections (you probably didn't know these)
- `chapterCoverageRow()` --calls--> `chapterSynthesis()`  [INFERRED]
  src/lib/coverageAudit.ts → /home/zahid/Projects/rl_bok/rlbook-explainer/src/lib/chapterSynthesis.ts
- `algorithmCoverageRow()` --calls--> `sourceAuditsForChapter()`  [INFERRED]
  src/lib/coverageAudit.ts → /home/zahid/Projects/rl_bok/rlbook-explainer/src/lib/algorithmSourceAudit.ts
- `algorithmCoverageRow()` --calls--> `algorithmDossier()`  [INFERRED]
  src/lib/coverageAudit.ts → /home/zahid/Projects/rl_bok/rlbook-explainer/src/lib/algorithmDossier.ts
- `algorithmCoverageRow()` --calls--> `algorithmDerivation()`  [INFERRED]
  src/lib/coverageAudit.ts → /home/zahid/Projects/rl_bok/rlbook-explainer/src/lib/algorithmDerivations.ts
- `algorithmCoverageRow()` --calls--> `workedExampleForAlgorithm()`  [INFERRED]
  src/lib/coverageAudit.ts → /home/zahid/Projects/rl_bok/rlbook-explainer/src/lib/algorithmWorkedExamples.ts

## Communities

### Community 0 - "Community 0"
Cohesion: 0.07
Nodes (33): BookPage(), ComparePage(), manuscriptSectionCount(), allMisconceptionCards(), misconceptionCardCount(), misconceptionModeCount(), allPracticeCards(), practiceCardCount() (+25 more)

### Community 1 - "Community 1"
Cohesion: 0.12
Nodes (42): algorithmsForChapter(), sourceAuditsForChapter(), algorithmsWithAssumptionClinicForChapter(), assumptionCardsForChapter(), buildBookIndexEntries(), chapterExamCardsForChapter(), allLectureTheaters(), compactTags() (+34 more)

### Community 2 - "Community 2"
Cohesion: 0.15
Nodes (22): AssumptionsPage(), allAssumptionClinicCards(), assumptionCardCount(), assumptionCardForAlgorithm(), assumptionChapterCount(), assumptionModeCount(), assumptionsForAlgorithmFamily(), compactList() (+14 more)

### Community 3 - "Community 3"
Cohesion: 0.18
Nodes (21): applicationExample(), approximationExample(), banditExample(), doubleQExample(), dpExample(), expectedBackupExample(), genericExample(), gradientBanditExample() (+13 more)

### Community 4 - "Community 4"
Cohesion: 0.2
Nodes (17): CodePage(), allCodeLabCards(), codeLabCardCount(), codeLabCardForAlgorithm(), codeLabCardsForAlgorithmFamily(), codeLabChapterCount(), codeLabModeCount(), compactList() (+9 more)

### Community 5 - "Community 5"
Cohesion: 0.25
Nodes (13): allProofLabCards(), chapterProofSpineCount(), compactList(), compactTags(), formulaProofCard(), formulaProofCardCount(), proofCardCount(), proofCardsForFamily() (+5 more)

### Community 6 - "Community 6"
Cohesion: 0.23
Nodes (15): algorithmProfile(), inferApproximation(), inferAvoidWhen(), inferBackupStyle(), inferBestUse(), inferComputeMemory(), inferConvergenceHandle(), inferCreditAssignment() (+7 more)

### Community 7 - "Community 7"
Cohesion: 0.21
Nodes (12): allSymbolCards(), buildSymbolCards(), cleanSpoken(), compactTags(), guide(), guideForSymbol(), symbolCardCount(), symbolChapterCount() (+4 more)

### Community 8 - "Community 8"
Cohesion: 0.24
Nodes (12): ExercisesPage(), allExerciseSolutionCards(), compactList(), compactTags(), exerciseSolutionCardCount(), exerciseSolutionCardForCoach(), exerciseSolutionChapterCount(), exerciseSolutionModeCount() (+4 more)

### Community 9 - "Community 9"
Cohesion: 0.3
Nodes (10): algorithmDerivation(), classifyAlgorithm(), codingTrace(), controlMove(), creditAssignment(), equationNotes(), errorSignal(), estimateSubject() (+2 more)

### Community 10 - "Community 10"
Cohesion: 0.29
Nodes (8): GraphPage(), allLearningGraphs(), edgeId(), learningGraphChapterCount(), learningGraphEdgeCount(), learningGraphNodeCount(), nodeId(), slug()

### Community 11 - "Community 11"
Cohesion: 0.24
Nodes (7): handsOnSequence(), lectureBeat(), questionForSection(), standaloneLectureTileCount(), uniqueTerms(), visualForSection(), vocabularyForChapter()

### Community 12 - "Community 12"
Cohesion: 0.35
Nodes (7): allBookIndexEntries(), bookIndexChapterCount(), bookIndexEntriesForChapter(), bookIndexEntryCount(), bookIndexLayerCount(), layerBreakdown(), SearchPage()

### Community 13 - "Community 13"
Cohesion: 0.24
Nodes (5): allSectionMasteryCards(), sectionMasteryCardCount(), sectionMasteryChapterCount(), sectionMasteryModeCount(), SectionsPage()

### Community 14 - "Community 14"
Cohesion: 0.36
Nodes (9): chapterSynthesis(), comparisonAxes(), dependencyStack(), groupBy(), implementationTest(), ladderItem(), oralExamPrompts(), studyProtocol() (+1 more)

### Community 15 - "Community 15"
Cohesion: 0.42
Nodes (8): algorithmDossier(), inferBiasVariancePosition(), inferDiagnostics(), inferEstimatorShape(), inferImplementationInvariants(), inferKnobs(), inferStabilityContract(), outputPhrase()

### Community 16 - "Community 16"
Cohesion: 0.33
Nodes (7): ExamPage(), allChapterExamCards(), chapterExamCardCount(), chapterExamChapterCount(), chapterExamModeCount(), compactSentence(), compactTags()

### Community 17 - "Community 17"
Cohesion: 0.36
Nodes (6): chapterDependencyMap(), conceptGates(), dominantProfiles(), reviewLoop(), skipRisks(), topCounts()

### Community 18 - "Community 18"
Cohesion: 0.33
Nodes (7): allConceptCards(), candidateFromSection(), conceptCardCount(), conceptModeCount(), normalize(), slug(), uniqueCandidates()

### Community 19 - "Community 19"
Cohesion: 0.7
Nodes (3): audit(), evalJs(), send()

### Community 20 - "Community 20"
Cohesion: 0.7
Nodes (3): audit(), evalJs(), send()

### Community 21 - "Community 21"
Cohesion: 0.7
Nodes (3): audit(), evalJs(), send()

### Community 25 - "Community 25"
Cohesion: 0.67
Nodes (2): evalJs(), send()

### Community 26 - "Community 26"
Cohesion: 0.67
Nodes (2): evalJs(), send()

### Community 27 - "Community 27"
Cohesion: 0.67
Nodes (2): evalJs(), send()

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

## Knowledge Gaps
- **Thin community `Community 25`** (4 nodes): `evalJs()`, `send()`, `waitJson()`, `audit-section-mastery-studio.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 26`** (4 nodes): `evalJs()`, `send()`, `waitJson()`, `audit-proof-lab.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 27`** (4 nodes): `evalJs()`, `send()`, `waitJson()`, `audit-worked-example-studio.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 28`** (4 nodes): `evalJs()`, `send()`, `waitJson()`, `audit-zero-knowledge-reader.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 29`** (4 nodes): `evalJs()`, `send()`, `waitJson()`, `audit-chapter-lecture-theater.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 30`** (4 nodes): `evalJs()`, `send()`, `waitJson()`, `audit-concept-deck.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 31`** (4 nodes): `evalJs()`, `send()`, `waitJson()`, `audit-formula-reader.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 32`** (4 nodes): `evalJs()`, `send()`, `waitJson()`, `audit-code-lab.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 33`** (4 nodes): `evalJs()`, `send()`, `waitJson()`, `audit-practice-coach.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 34`** (4 nodes): `evalJs()`, `send()`, `waitJson()`, `audit-chapter-simulator-lab.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 35`** (4 nodes): `audit-interactions.mjs`, `evalJs()`, `send()`, `waitJson()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 36`** (4 nodes): `evalJs()`, `send()`, `waitJson()`, `audit-learning-graph.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 37`** (4 nodes): `evalJs()`, `send()`, `waitJson()`, `audit-book-search.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 38`** (4 nodes): `evalJs()`, `send()`, `waitJson()`, `audit-misconception-clinic.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 39`** (4 nodes): `evalJs()`, `send()`, `waitJson()`, `audit-assumption-clinic.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 40`** (4 nodes): `evalJs()`, `send()`, `waitJson()`, `audit-symbol-decoder.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 41`** (4 nodes): `evalJs()`, `send()`, `waitJson()`, `audit-exercise-solution-studio.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 42`** (4 nodes): `evalJs()`, `send()`, `waitJson()`, `audit-chapter-exam-studio.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `buildCoverageAudit()` connect `Community 0` to `Community 1`, `Community 2`, `Community 4`, `Community 5`, `Community 7`, `Community 8`, `Community 10`, `Community 11`, `Community 12`, `Community 13`, `Community 16`, `Community 18`?**
  _High betweenness centrality (0.137) - this node is a cross-community bridge._
- **Why does `algorithmCoverageRow()` connect `Community 6` to `Community 0`, `Community 1`, `Community 3`, `Community 9`, `Community 15`?**
  _High betweenness centrality (0.117) - this node is a cross-community bridge._
- **Why does `chapterCoverageRow()` connect `Community 1` to `Community 0`, `Community 2`, `Community 4`, `Community 5`, `Community 7`, `Community 8`, `Community 10`, `Community 12`, `Community 13`, `Community 14`, `Community 16`, `Community 17`, `Community 18`?**
  _High betweenness centrality (0.109) - this node is a cross-community bridge._
- **Are the 54 inferred relationships involving `buildCoverageAudit()` (e.g. with `zeroKnowledgeRungCount()` and `zeroKnowledgeModeCount()`) actually correct?**
  _`buildCoverageAudit()` has 54 INFERRED edges - model-reasoned connections that need verification._
- **Are the 45 inferred relationships involving `chapterCoverageRow()` (e.g. with `algorithmsForChapter()` and `chapterSynthesis()`) actually correct?**
  _`chapterCoverageRow()` has 45 INFERRED edges - model-reasoned connections that need verification._
- **Are the 30 inferred relationships involving `BookPage()` (e.g. with `standaloneLectureTileCount()` and `manuscriptSectionCount()`) actually correct?**
  _`BookPage()` has 30 INFERRED edges - model-reasoned connections that need verification._
- **Are the 24 inferred relationships involving `buildBookIndexEntries()` (e.g. with `algorithmsForChapter()` and `standaloneLectureForChapter()`) actually correct?**
  _`buildBookIndexEntries()` has 24 INFERRED edges - model-reasoned connections that need verification._
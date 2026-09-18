# Graph Report - rlbook-explainer  (2026-09-18)

## Corpus Check
- 97 files · ~887,601 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 390 nodes · 595 edges · 29 communities detected
- Extraction: 77% EXTRACTED · 23% INFERRED · 0% AMBIGUOUS · INFERRED: 137 edges (avg confidence: 0.8)
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
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 19|Community 19]]
- [[_COMMUNITY_Community 20|Community 20]]
- [[_COMMUNITY_Community 21|Community 21]]
- [[_COMMUNITY_Community 22|Community 22]]
- [[_COMMUNITY_Community 23|Community 23]]
- [[_COMMUNITY_Community 24|Community 24]]
- [[_COMMUNITY_Community 25|Community 25]]
- [[_COMMUNITY_Community 26|Community 26]]
- [[_COMMUNITY_Community 27|Community 27]]
- [[_COMMUNITY_Community 28|Community 28]]
- [[_COMMUNITY_Community 29|Community 29]]

## God Nodes (most connected - your core abstractions)
1. `buildCoverageAudit()` - 37 edges
2. `chapterCoverageRow()` - 34 edges
3. `workedExampleForAlgorithm()` - 22 edges
4. `buildBookIndexEntries()` - 20 edges
5. `learningGraphForChapter()` - 15 edges
6. `algorithmProfile()` - 15 edges
7. `workedExamplesForChapter()` - 12 edges
8. `algorithmsForChapter()` - 12 edges
9. `simulatorForChapter()` - 12 edges
10. `lectureTheaterForChapter()` - 12 edges

## Surprising Connections (you probably didn't know these)
- `chapterCoverageRow()` --calls--> `chapterSynthesis()`  [INFERRED]
  src/lib/coverageAudit.ts → /home/zahid/Projects/rl_bok/rlbook-explainer/src/lib/chapterSynthesis.ts
- `chapterCoverageRow()` --calls--> `sourceAuditsForChapter()`  [INFERRED]
  src/lib/coverageAudit.ts → /home/zahid/Projects/rl_bok/rlbook-explainer/src/lib/algorithmSourceAudit.ts
- `algorithmCoverageRow()` --calls--> `algorithmDossier()`  [INFERRED]
  src/lib/coverageAudit.ts → /home/zahid/Projects/rl_bok/rlbook-explainer/src/lib/algorithmDossier.ts
- `algorithmCoverageRow()` --calls--> `algorithmDerivation()`  [INFERRED]
  src/lib/coverageAudit.ts → /home/zahid/Projects/rl_bok/rlbook-explainer/src/lib/algorithmDerivations.ts
- `algorithmCoverageRow()` --calls--> `workedExampleForAlgorithm()`  [INFERRED]
  src/lib/coverageAudit.ts → /home/zahid/Projects/rl_bok/rlbook-explainer/src/lib/algorithmWorkedExamples.ts

## Communities

### Community 0 - "Community 0"
Cohesion: 0.11
Nodes (27): algorithmsForChapter(), allMisconceptionCards(), misconceptionCardCount(), misconceptionCardsForChapter(), misconceptionModeCount(), allPracticeCards(), practiceCardCount(), practiceCardsForChapter() (+19 more)

### Community 1 - "Community 1"
Cohesion: 0.11
Nodes (25): allLectureTheaters(), compactTags(), lectureTheaterCount(), lectureTheaterForChapter(), lectureTheaterModeCount(), lectureTheaterSlideCount(), theaterSlideId(), buildCoverageAudit() (+17 more)

### Community 2 - "Community 2"
Cohesion: 0.18
Nodes (21): applicationExample(), approximationExample(), banditExample(), doubleQExample(), dpExample(), expectedBackupExample(), genericExample(), gradientBanditExample() (+13 more)

### Community 3 - "Community 3"
Cohesion: 0.19
Nodes (19): CodePage(), algorithmsWithCodeLabForChapter(), allCodeLabCards(), codeLabCardCount(), codeLabCardForAlgorithm(), codeLabCardsForAlgorithmFamily(), codeLabCardsForChapter(), codeLabChapterCount() (+11 more)

### Community 4 - "Community 4"
Cohesion: 0.16
Nodes (12): allBookIndexEntries(), bookIndexChapterCount(), bookIndexEntriesForChapter(), bookIndexEntryCount(), bookIndexLayerCount(), buildBookIndexEntries(), manuscriptForChapter(), manuscriptSectionCount() (+4 more)

### Community 5 - "Community 5"
Cohesion: 0.2
Nodes (16): algorithmProfile(), inferApproximation(), inferAvoidWhen(), inferBackupStyle(), inferBestUse(), inferComputeMemory(), inferConvergenceHandle(), inferCreditAssignment() (+8 more)

### Community 6 - "Community 6"
Cohesion: 0.15
Nodes (3): glyphVariantForLabel(), glyphAccentForLabel(), glyphVariantForLabel()

### Community 7 - "Community 7"
Cohesion: 0.31
Nodes (9): GraphPage(), allLearningGraphs(), edgeId(), learningGraphChapterCount(), learningGraphEdgeCount(), learningGraphForChapter(), learningGraphNodeCount(), nodeId() (+1 more)

### Community 8 - "Community 8"
Cohesion: 0.24
Nodes (8): handsOnSequence(), lectureBeat(), questionForSection(), standaloneLectureForChapter(), standaloneLectureTileCount(), uniqueTerms(), visualForSection(), vocabularyForChapter()

### Community 9 - "Community 9"
Cohesion: 0.3
Nodes (10): algorithmDerivation(), classifyAlgorithm(), codingTrace(), controlMove(), creditAssignment(), equationNotes(), errorSignal(), estimateSubject() (+2 more)

### Community 10 - "Community 10"
Cohesion: 0.36
Nodes (9): chapterSynthesis(), comparisonAxes(), dependencyStack(), groupBy(), implementationTest(), ladderItem(), oralExamPrompts(), studyProtocol() (+1 more)

### Community 11 - "Community 11"
Cohesion: 0.36
Nodes (8): allConceptCards(), candidateFromSection(), conceptCardCount(), conceptCardsForChapter(), conceptModeCount(), normalize(), slug(), uniqueCandidates()

### Community 12 - "Community 12"
Cohesion: 0.36
Nodes (6): chapterDependencyMap(), conceptGates(), dominantProfiles(), reviewLoop(), skipRisks(), topCounts()

### Community 13 - "Community 13"
Cohesion: 0.42
Nodes (8): algorithmDossier(), inferBiasVariancePosition(), inferDiagnostics(), inferEstimatorShape(), inferImplementationInvariants(), inferKnobs(), inferStabilityContract(), outputPhrase()

### Community 14 - "Community 14"
Cohesion: 0.7
Nodes (3): audit(), evalJs(), send()

### Community 15 - "Community 15"
Cohesion: 0.7
Nodes (3): audit(), evalJs(), send()

### Community 16 - "Community 16"
Cohesion: 0.7
Nodes (3): audit(), evalJs(), send()

### Community 18 - "Community 18"
Cohesion: 0.67
Nodes (2): evalJs(), send()

### Community 19 - "Community 19"
Cohesion: 0.67
Nodes (2): evalJs(), send()

### Community 20 - "Community 20"
Cohesion: 0.67
Nodes (2): evalJs(), send()

### Community 21 - "Community 21"
Cohesion: 0.67
Nodes (2): evalJs(), send()

### Community 22 - "Community 22"
Cohesion: 0.67
Nodes (2): evalJs(), send()

### Community 23 - "Community 23"
Cohesion: 0.67
Nodes (2): evalJs(), send()

### Community 24 - "Community 24"
Cohesion: 0.67
Nodes (2): evalJs(), send()

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

## Knowledge Gaps
- **Thin community `Community 18`** (4 nodes): `evalJs()`, `send()`, `waitJson()`, `audit-worked-example-studio.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 19`** (4 nodes): `evalJs()`, `send()`, `waitJson()`, `audit-zero-knowledge-reader.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 20`** (4 nodes): `evalJs()`, `send()`, `waitJson()`, `audit-chapter-lecture-theater.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 21`** (4 nodes): `evalJs()`, `send()`, `waitJson()`, `audit-concept-deck.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 22`** (4 nodes): `evalJs()`, `send()`, `waitJson()`, `audit-formula-reader.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 23`** (4 nodes): `evalJs()`, `send()`, `waitJson()`, `audit-practice-coach.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 24`** (4 nodes): `evalJs()`, `send()`, `waitJson()`, `audit-chapter-simulator-lab.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 25`** (4 nodes): `audit-interactions.mjs`, `evalJs()`, `send()`, `waitJson()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 26`** (4 nodes): `evalJs()`, `send()`, `waitJson()`, `audit-learning-graph.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 27`** (4 nodes): `evalJs()`, `send()`, `waitJson()`, `audit-book-search.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 28`** (4 nodes): `evalJs()`, `send()`, `waitJson()`, `audit-misconception-clinic.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 29`** (4 nodes): `evalJs()`, `send()`, `waitJson()`, `audit-symbol-decoder.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `algorithmCoverageRow()` connect `Community 5` to `Community 1`, `Community 2`, `Community 13`, `Community 9`?**
  _High betweenness centrality (0.141) - this node is a cross-community bridge._
- **Why does `chapterCoverageRow()` connect `Community 0` to `Community 1`, `Community 3`, `Community 4`, `Community 5`, `Community 7`, `Community 8`, `Community 10`, `Community 11`, `Community 12`?**
  _High betweenness centrality (0.111) - this node is a cross-community bridge._
- **Why does `buildCoverageAudit()` connect `Community 1` to `Community 0`, `Community 3`, `Community 4`, `Community 7`, `Community 8`, `Community 11`?**
  _High betweenness centrality (0.101) - this node is a cross-community bridge._
- **Are the 35 inferred relationships involving `buildCoverageAudit()` (e.g. with `zeroKnowledgeRungCount()` and `zeroKnowledgeModeCount()`) actually correct?**
  _`buildCoverageAudit()` has 35 INFERRED edges - model-reasoned connections that need verification._
- **Are the 33 inferred relationships involving `chapterCoverageRow()` (e.g. with `algorithmsForChapter()` and `chapterSynthesis()`) actually correct?**
  _`chapterCoverageRow()` has 33 INFERRED edges - model-reasoned connections that need verification._
- **Are the 18 inferred relationships involving `buildBookIndexEntries()` (e.g. with `algorithmsForChapter()` and `standaloneLectureForChapter()`) actually correct?**
  _`buildBookIndexEntries()` has 18 INFERRED edges - model-reasoned connections that need verification._
- **Are the 10 inferred relationships involving `learningGraphForChapter()` (e.g. with `chapterCoverageRow()` and `algorithmsForChapter()`) actually correct?**
  _`learningGraphForChapter()` has 10 INFERRED edges - model-reasoned connections that need verification._
# Graph Report - rlbook-explainer  (2026-09-18)

## Corpus Check
- 93 files · ~883,708 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 355 nodes · 532 edges · 26 communities detected
- Extraction: 76% EXTRACTED · 24% INFERRED · 0% AMBIGUOUS · INFERRED: 127 edges (avg confidence: 0.8)
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
- [[_COMMUNITY_Community 17|Community 17]]
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

## God Nodes (most connected - your core abstractions)
1. `buildCoverageAudit()` - 34 edges
2. `chapterCoverageRow()` - 32 edges
3. `workedExampleForAlgorithm()` - 22 edges
4. `buildBookIndexEntries()` - 19 edges
5. `algorithmProfile()` - 15 edges
6. `learningGraphForChapter()` - 14 edges
7. `workedExamplesForChapter()` - 12 edges
8. `simulatorForChapter()` - 12 edges
9. `lectureTheaterForChapter()` - 12 edges
10. `algorithmsForChapter()` - 11 edges

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
Cohesion: 0.08
Nodes (27): manuscriptSectionCount(), allMisconceptionCards(), misconceptionCardCount(), misconceptionModeCount(), allWorkedExamples(), workedExampleCount(), workedExampleModeCount(), buildCoverageAudit() (+19 more)

### Community 1 - "Community 1"
Cohesion: 0.13
Nodes (34): algorithmsForChapter(), sourceAuditsForChapter(), buildBookIndexEntries(), allLectureTheaters(), compactTags(), lectureTheaterCount(), lectureTheaterForChapter(), lectureTheaterModeCount() (+26 more)

### Community 2 - "Community 2"
Cohesion: 0.18
Nodes (21): applicationExample(), approximationExample(), banditExample(), doubleQExample(), dpExample(), expectedBackupExample(), genericExample(), gradientBanditExample() (+13 more)

### Community 3 - "Community 3"
Cohesion: 0.23
Nodes (15): algorithmProfile(), inferApproximation(), inferAvoidWhen(), inferBackupStyle(), inferBestUse(), inferComputeMemory(), inferConvergenceHandle(), inferCreditAssignment() (+7 more)

### Community 4 - "Community 4"
Cohesion: 0.3
Nodes (10): algorithmDerivation(), classifyAlgorithm(), codingTrace(), controlMove(), creditAssignment(), equationNotes(), errorSignal(), estimateSubject() (+2 more)

### Community 5 - "Community 5"
Cohesion: 0.29
Nodes (8): GraphPage(), allLearningGraphs(), edgeId(), learningGraphChapterCount(), learningGraphEdgeCount(), learningGraphNodeCount(), nodeId(), slug()

### Community 6 - "Community 6"
Cohesion: 0.24
Nodes (7): handsOnSequence(), lectureBeat(), questionForSection(), standaloneLectureTileCount(), uniqueTerms(), visualForSection(), vocabularyForChapter()

### Community 7 - "Community 7"
Cohesion: 0.35
Nodes (7): allBookIndexEntries(), bookIndexChapterCount(), bookIndexEntriesForChapter(), bookIndexEntryCount(), bookIndexLayerCount(), layerBreakdown(), SearchPage()

### Community 8 - "Community 8"
Cohesion: 0.36
Nodes (9): chapterSynthesis(), comparisonAxes(), dependencyStack(), groupBy(), implementationTest(), ladderItem(), oralExamPrompts(), studyProtocol() (+1 more)

### Community 9 - "Community 9"
Cohesion: 0.42
Nodes (8): algorithmDossier(), inferBiasVariancePosition(), inferDiagnostics(), inferEstimatorShape(), inferImplementationInvariants(), inferKnobs(), inferStabilityContract(), outputPhrase()

### Community 10 - "Community 10"
Cohesion: 0.36
Nodes (6): chapterDependencyMap(), conceptGates(), dominantProfiles(), reviewLoop(), skipRisks(), topCounts()

### Community 11 - "Community 11"
Cohesion: 0.33
Nodes (7): allConceptCards(), candidateFromSection(), conceptCardCount(), conceptModeCount(), normalize(), slug(), uniqueCandidates()

### Community 12 - "Community 12"
Cohesion: 0.7
Nodes (3): audit(), evalJs(), send()

### Community 13 - "Community 13"
Cohesion: 0.7
Nodes (3): audit(), evalJs(), send()

### Community 14 - "Community 14"
Cohesion: 0.7
Nodes (3): audit(), evalJs(), send()

### Community 17 - "Community 17"
Cohesion: 0.67
Nodes (2): evalJs(), send()

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

## Knowledge Gaps
- **Thin community `Community 17`** (4 nodes): `evalJs()`, `send()`, `waitJson()`, `audit-worked-example-studio.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 18`** (4 nodes): `evalJs()`, `send()`, `waitJson()`, `audit-zero-knowledge-reader.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 19`** (4 nodes): `evalJs()`, `send()`, `waitJson()`, `audit-chapter-lecture-theater.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 20`** (4 nodes): `evalJs()`, `send()`, `waitJson()`, `audit-concept-deck.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 21`** (4 nodes): `evalJs()`, `send()`, `waitJson()`, `audit-formula-reader.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 22`** (4 nodes): `evalJs()`, `send()`, `waitJson()`, `audit-practice-coach.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 23`** (4 nodes): `evalJs()`, `send()`, `waitJson()`, `audit-chapter-simulator-lab.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 24`** (4 nodes): `audit-interactions.mjs`, `evalJs()`, `send()`, `waitJson()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 25`** (4 nodes): `evalJs()`, `send()`, `waitJson()`, `audit-learning-graph.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 26`** (4 nodes): `evalJs()`, `send()`, `waitJson()`, `audit-book-search.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 27`** (4 nodes): `evalJs()`, `send()`, `waitJson()`, `audit-misconception-clinic.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `algorithmCoverageRow()` connect `Community 3` to `Community 0`, `Community 1`, `Community 2`, `Community 4`, `Community 9`?**
  _High betweenness centrality (0.151) - this node is a cross-community bridge._
- **Why does `chapterCoverageRow()` connect `Community 1` to `Community 0`, `Community 5`, `Community 7`, `Community 8`, `Community 10`, `Community 11`?**
  _High betweenness centrality (0.111) - this node is a cross-community bridge._
- **Why does `buildCoverageAudit()` connect `Community 0` to `Community 1`, `Community 5`, `Community 6`, `Community 7`, `Community 11`?**
  _High betweenness centrality (0.094) - this node is a cross-community bridge._
- **Are the 32 inferred relationships involving `buildCoverageAudit()` (e.g. with `zeroKnowledgeRungCount()` and `zeroKnowledgeModeCount()`) actually correct?**
  _`buildCoverageAudit()` has 32 INFERRED edges - model-reasoned connections that need verification._
- **Are the 31 inferred relationships involving `chapterCoverageRow()` (e.g. with `algorithmsForChapter()` and `chapterSynthesis()`) actually correct?**
  _`chapterCoverageRow()` has 31 INFERRED edges - model-reasoned connections that need verification._
- **Are the 17 inferred relationships involving `buildBookIndexEntries()` (e.g. with `algorithmsForChapter()` and `standaloneLectureForChapter()`) actually correct?**
  _`buildBookIndexEntries()` has 17 INFERRED edges - model-reasoned connections that need verification._
- **Are the 2 inferred relationships involving `algorithmProfile()` (e.g. with `algorithmCoverageRow()` and `ladderItem()`) actually correct?**
  _`algorithmProfile()` has 2 INFERRED edges - model-reasoned connections that need verification._
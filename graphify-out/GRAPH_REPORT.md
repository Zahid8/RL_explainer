# Graph Report - rlbook-explainer  (2026-09-17)

## Corpus Check
- 54 files · ~825,162 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 189 nodes · 227 edges · 12 communities detected
- Extraction: 93% EXTRACTED · 7% INFERRED · 0% AMBIGUOUS · INFERRED: 15 edges (avg confidence: 0.8)
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
- [[_COMMUNITY_Community 12|Community 12]]

## God Nodes (most connected - your core abstractions)
1. `workedExampleForAlgorithm()` - 22 edges
2. `algorithmProfile()` - 15 edges
3. `algorithmDerivation()` - 11 edges
4. `algorithmDossier()` - 9 edges
5. `algorithmCoverageRow()` - 7 edges
6. `chapterCoverageRow()` - 6 edges
7. `chapterSynthesis()` - 6 edges
8. `chapterDependencyMap()` - 6 edges
9. `standaloneLectureForChapter()` - 5 edges
10. `comparisonAxes()` - 4 edges

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
Cohesion: 0.18
Nodes (21): applicationExample(), approximationExample(), banditExample(), doubleQExample(), dpExample(), expectedBackupExample(), genericExample(), gradientBanditExample() (+13 more)

### Community 1 - "Community 1"
Cohesion: 0.14
Nodes (13): algorithmsForChapter(), sourceAuditsForChapter(), buildCoverageAudit(), chapterCoverageRow(), requirementProofs(), handsOnSequence(), lectureBeat(), questionForSection() (+5 more)

### Community 2 - "Community 2"
Cohesion: 0.23
Nodes (15): algorithmProfile(), inferApproximation(), inferAvoidWhen(), inferBackupStyle(), inferBestUse(), inferComputeMemory(), inferConvergenceHandle(), inferCreditAssignment() (+7 more)

### Community 3 - "Community 3"
Cohesion: 0.3
Nodes (10): algorithmDerivation(), classifyAlgorithm(), codingTrace(), controlMove(), creditAssignment(), equationNotes(), errorSignal(), estimateSubject() (+2 more)

### Community 4 - "Community 4"
Cohesion: 0.36
Nodes (9): chapterSynthesis(), comparisonAxes(), dependencyStack(), groupBy(), implementationTest(), ladderItem(), oralExamPrompts(), studyProtocol() (+1 more)

### Community 5 - "Community 5"
Cohesion: 0.36
Nodes (6): chapterDependencyMap(), conceptGates(), dominantProfiles(), reviewLoop(), skipRisks(), topCounts()

### Community 6 - "Community 6"
Cohesion: 0.42
Nodes (8): algorithmDossier(), inferBiasVariancePosition(), inferDiagnostics(), inferEstimatorShape(), inferImplementationInvariants(), inferKnobs(), inferStabilityContract(), outputPhrase()

### Community 7 - "Community 7"
Cohesion: 0.29
Nodes (3): glyphVariantForLabel(), glyphAccentForLabel(), glyphVariantForLabel()

### Community 8 - "Community 8"
Cohesion: 0.7
Nodes (3): audit(), evalJs(), send()

### Community 9 - "Community 9"
Cohesion: 0.7
Nodes (3): audit(), evalJs(), send()

### Community 10 - "Community 10"
Cohesion: 0.7
Nodes (3): audit(), evalJs(), send()

### Community 12 - "Community 12"
Cohesion: 0.67
Nodes (2): evalJs(), send()

## Knowledge Gaps
- **Thin community `Community 12`** (4 nodes): `audit-interactions.mjs`, `evalJs()`, `send()`, `waitJson()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `algorithmCoverageRow()` connect `Community 2` to `Community 0`, `Community 1`, `Community 3`, `Community 6`?**
  _High betweenness centrality (0.190) - this node is a cross-community bridge._
- **Why does `chapterCoverageRow()` connect `Community 1` to `Community 4`, `Community 5`?**
  _High betweenness centrality (0.102) - this node is a cross-community bridge._
- **Why does `workedExampleForAlgorithm()` connect `Community 0` to `Community 2`?**
  _High betweenness centrality (0.096) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `algorithmProfile()` (e.g. with `algorithmCoverageRow()` and `ladderItem()`) actually correct?**
  _`algorithmProfile()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Are the 6 inferred relationships involving `algorithmCoverageRow()` (e.g. with `sourceAuditsForChapter()` and `algorithmDossier()`) actually correct?**
  _`algorithmCoverageRow()` has 6 INFERRED edges - model-reasoned connections that need verification._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.14 - nodes in this community are weakly interconnected._
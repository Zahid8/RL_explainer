# Graph Report - rlbook-explainer  (2026-09-17)

## Corpus Check
- 46 files · ~778,049 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 150 nodes · 176 edges · 7 communities detected
- Extraction: 94% EXTRACTED · 6% INFERRED · 0% AMBIGUOUS · INFERRED: 11 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]

## God Nodes (most connected - your core abstractions)
1. `workedExampleForAlgorithm()` - 22 edges
2. `algorithmProfile()` - 15 edges
3. `algorithmDerivation()` - 11 edges
4. `algorithmDossier()` - 9 edges
5. `algorithmCoverageRow()` - 7 edges
6. `chapterSynthesis()` - 6 edges
7. `chapterDependencyMap()` - 6 edges
8. `chapterCoverageRow()` - 5 edges
9. `comparisonAxes()` - 4 edges
10. `ladderItem()` - 3 edges

## Surprising Connections (you probably didn't know these)
- `chapterCoverageRow()` --calls--> `algorithmsForChapter()`  [INFERRED]
  src/lib/coverageAudit.ts → src/lib/algorithmCatalog.ts
- `chapterCoverageRow()` --calls--> `chapterSynthesis()`  [INFERRED]
  src/lib/coverageAudit.ts → src/lib/chapterSynthesis.ts
- `chapterCoverageRow()` --calls--> `chapterDependencyMap()`  [INFERRED]
  src/lib/coverageAudit.ts → src/lib/chapterDependencyMap.ts
- `algorithmCoverageRow()` --calls--> `algorithmDossier()`  [INFERRED]
  src/lib/coverageAudit.ts → src/lib/algorithmDossier.ts
- `algorithmCoverageRow()` --calls--> `algorithmDerivation()`  [INFERRED]
  src/lib/coverageAudit.ts → src/lib/algorithmDerivations.ts

## Communities

### Community 0 - "Community 0"
Cohesion: 0.18
Nodes (21): applicationExample(), approximationExample(), banditExample(), doubleQExample(), dpExample(), expectedBackupExample(), genericExample(), gradientBanditExample() (+13 more)

### Community 1 - "Community 1"
Cohesion: 0.27
Nodes (13): algorithmProfile(), inferApproximation(), inferAvoidWhen(), inferBackupStyle(), inferBestUse(), inferComputeMemory(), inferConvergenceHandle(), inferCreditAssignment() (+5 more)

### Community 2 - "Community 2"
Cohesion: 0.3
Nodes (10): algorithmDerivation(), classifyAlgorithm(), codingTrace(), controlMove(), creditAssignment(), equationNotes(), errorSignal(), estimateSubject() (+2 more)

### Community 3 - "Community 3"
Cohesion: 0.36
Nodes (9): chapterSynthesis(), comparisonAxes(), dependencyStack(), groupBy(), implementationTest(), ladderItem(), oralExamPrompts(), studyProtocol() (+1 more)

### Community 4 - "Community 4"
Cohesion: 0.24
Nodes (7): algorithmsForChapter(), profileRows(), sourceAuditsForChapter(), algorithmCoverageRow(), buildCoverageAudit(), chapterCoverageRow(), requirementProofs()

### Community 5 - "Community 5"
Cohesion: 0.36
Nodes (6): chapterDependencyMap(), conceptGates(), dominantProfiles(), reviewLoop(), skipRisks(), topCounts()

### Community 6 - "Community 6"
Cohesion: 0.42
Nodes (8): algorithmDossier(), inferBiasVariancePosition(), inferDiagnostics(), inferEstimatorShape(), inferImplementationInvariants(), inferKnobs(), inferStabilityContract(), outputPhrase()

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `algorithmCoverageRow()` connect `Community 4` to `Community 0`, `Community 1`, `Community 2`, `Community 6`?**
  _High betweenness centrality (0.240) - this node is a cross-community bridge._
- **Why does `workedExampleForAlgorithm()` connect `Community 0` to `Community 4`?**
  _High betweenness centrality (0.131) - this node is a cross-community bridge._
- **Why does `algorithmProfile()` connect `Community 1` to `Community 3`, `Community 4`?**
  _High betweenness centrality (0.111) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `algorithmProfile()` (e.g. with `algorithmCoverageRow()` and `ladderItem()`) actually correct?**
  _`algorithmProfile()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Are the 6 inferred relationships involving `algorithmCoverageRow()` (e.g. with `sourceAuditsForChapter()` and `algorithmDossier()`) actually correct?**
  _`algorithmCoverageRow()` has 6 INFERRED edges - model-reasoned connections that need verification._
# Graph Report - rlbook-explainer  (2026-09-17)

## Corpus Check
- 44 files · ~764,983 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 143 nodes · 160 edges · 6 communities detected
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]

## God Nodes (most connected - your core abstractions)
1. `workedExampleForAlgorithm()` - 21 edges
2. `algorithmProfile()` - 14 edges
3. `algorithmDerivation()` - 10 edges
4. `algorithmDossier()` - 8 edges
5. `chapterSynthesis()` - 5 edges
6. `chapterDependencyMap()` - 5 edges
7. `comparisonAxes()` - 4 edges
8. `ladderItem()` - 3 edges
9. `dominantProfiles()` - 3 edges
10. `dependencyStack()` - 2 edges

## Surprising Connections (you probably didn't know these)
- `ladderItem()` --calls--> `algorithmProfile()`  [INFERRED]
  src/lib/chapterSynthesis.ts → src/lib/algorithmProfiles.ts

## Communities

### Community 0 - "Community 0"
Cohesion: 0.18
Nodes (21): applicationExample(), approximationExample(), banditExample(), doubleQExample(), dpExample(), expectedBackupExample(), genericExample(), gradientBanditExample() (+13 more)

### Community 1 - "Community 1"
Cohesion: 0.25
Nodes (13): algorithmProfile(), inferApproximation(), inferAvoidWhen(), inferBackupStyle(), inferBestUse(), inferComputeMemory(), inferConvergenceHandle(), inferCreditAssignment() (+5 more)

### Community 2 - "Community 2"
Cohesion: 0.3
Nodes (10): algorithmDerivation(), classifyAlgorithm(), codingTrace(), controlMove(), creditAssignment(), equationNotes(), errorSignal(), estimateSubject() (+2 more)

### Community 3 - "Community 3"
Cohesion: 0.36
Nodes (9): chapterSynthesis(), comparisonAxes(), dependencyStack(), groupBy(), implementationTest(), ladderItem(), oralExamPrompts(), studyProtocol() (+1 more)

### Community 4 - "Community 4"
Cohesion: 0.36
Nodes (6): chapterDependencyMap(), conceptGates(), dominantProfiles(), reviewLoop(), skipRisks(), topCounts()

### Community 5 - "Community 5"
Cohesion: 0.42
Nodes (8): algorithmDossier(), inferBiasVariancePosition(), inferDiagnostics(), inferEstimatorShape(), inferImplementationInvariants(), inferKnobs(), inferStabilityContract(), outputPhrase()

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `algorithmProfile()` connect `Community 1` to `Community 3`?**
  _High betweenness centrality (0.017) - this node is a cross-community bridge._
- **Why does `ladderItem()` connect `Community 3` to `Community 1`?**
  _High betweenness centrality (0.013) - this node is a cross-community bridge._
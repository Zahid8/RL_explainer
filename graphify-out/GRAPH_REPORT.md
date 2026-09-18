# Graph Report - rlbook-explainer  (2026-09-18)

## Corpus Check
- 78 files · ~864,291 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 289 nodes · 386 edges · 21 communities detected
- Extraction: 83% EXTRACTED · 17% INFERRED · 0% AMBIGUOUS · INFERRED: 66 edges (avg confidence: 0.8)
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
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 17|Community 17]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 19|Community 19]]
- [[_COMMUNITY_Community 20|Community 20]]
- [[_COMMUNITY_Community 21|Community 21]]

## God Nodes (most connected - your core abstractions)
1. `chapterCoverageRow()` - 23 edges
2. `workedExampleForAlgorithm()` - 22 edges
3. `buildCoverageAudit()` - 21 edges
4. `algorithmProfile()` - 15 edges
5. `algorithmDerivation()` - 11 edges
6. `simulatorForChapter()` - 10 edges
7. `workedExamplesForChapter()` - 9 edges
8. `algorithmDossier()` - 9 edges
9. `algorithmsForChapter()` - 8 edges
10. `conceptCardsForChapter()` - 8 edges

## Surprising Connections (you probably didn't know these)
- `chapterCoverageRow()` --calls--> `chapterSynthesis()`  [INFERRED]
  src/lib/coverageAudit.ts → /home/zahid/Projects/rl_bok/rlbook-explainer/src/lib/chapterSynthesis.ts
- `chapterCoverageRow()` --calls--> `sourceAuditsForChapter()`  [INFERRED]
  src/lib/coverageAudit.ts → /home/zahid/Projects/rl_bok/rlbook-explainer/src/lib/algorithmSourceAudit.ts
- `algorithmCoverageRow()` --calls--> `algorithmDossier()`  [INFERRED]
  src/lib/coverageAudit.ts → /home/zahid/Projects/rl_bok/rlbook-explainer/src/lib/algorithmDossier.ts
- `algorithmCoverageRow()` --calls--> `algorithmProfile()`  [INFERRED]
  src/lib/coverageAudit.ts → /home/zahid/Projects/rl_bok/rlbook-explainer/src/lib/algorithmProfiles.ts
- `algorithmCoverageRow()` --calls--> `workedExampleForAlgorithm()`  [INFERRED]
  src/lib/coverageAudit.ts → /home/zahid/Projects/rl_bok/rlbook-explainer/src/lib/algorithmWorkedExamples.ts

## Communities

### Community 0 - "Community 0"
Cohesion: 0.09
Nodes (34): algorithmsForChapter(), manuscriptForChapter(), manuscriptSectionCount(), allMisconceptionCards(), misconceptionCardCount(), misconceptionCardsForChapter(), misconceptionModeCount(), allPracticeCards() (+26 more)

### Community 1 - "Community 1"
Cohesion: 0.18
Nodes (21): applicationExample(), approximationExample(), banditExample(), doubleQExample(), dpExample(), expectedBackupExample(), genericExample(), gradientBanditExample() (+13 more)

### Community 2 - "Community 2"
Cohesion: 0.2
Nodes (13): algorithmDerivation(), classifyAlgorithm(), codingTrace(), controlMove(), creditAssignment(), equationNotes(), errorSignal(), estimateSubject() (+5 more)

### Community 3 - "Community 3"
Cohesion: 0.27
Nodes (13): algorithmProfile(), inferApproximation(), inferAvoidWhen(), inferBackupStyle(), inferBestUse(), inferComputeMemory(), inferConvergenceHandle(), inferCreditAssignment() (+5 more)

### Community 4 - "Community 4"
Cohesion: 0.17
Nodes (3): glyphVariantForLabel(), glyphAccentForLabel(), glyphVariantForLabel()

### Community 5 - "Community 5"
Cohesion: 0.24
Nodes (8): handsOnSequence(), lectureBeat(), questionForSection(), standaloneLectureForChapter(), standaloneLectureTileCount(), uniqueTerms(), visualForSection(), vocabularyForChapter()

### Community 6 - "Community 6"
Cohesion: 0.36
Nodes (9): chapterSynthesis(), comparisonAxes(), dependencyStack(), groupBy(), implementationTest(), ladderItem(), oralExamPrompts(), studyProtocol() (+1 more)

### Community 7 - "Community 7"
Cohesion: 0.36
Nodes (8): allConceptCards(), candidateFromSection(), conceptCardCount(), conceptCardsForChapter(), conceptModeCount(), normalize(), slug(), uniqueCandidates()

### Community 8 - "Community 8"
Cohesion: 0.36
Nodes (6): chapterDependencyMap(), conceptGates(), dominantProfiles(), reviewLoop(), skipRisks(), topCounts()

### Community 9 - "Community 9"
Cohesion: 0.42
Nodes (8): algorithmDossier(), inferBiasVariancePosition(), inferDiagnostics(), inferEstimatorShape(), inferImplementationInvariants(), inferKnobs(), inferStabilityContract(), outputPhrase()

### Community 10 - "Community 10"
Cohesion: 0.5
Nodes (2): sectionLessonModeCount(), sectionNarrativeCount()

### Community 11 - "Community 11"
Cohesion: 0.7
Nodes (3): audit(), evalJs(), send()

### Community 12 - "Community 12"
Cohesion: 0.7
Nodes (3): audit(), evalJs(), send()

### Community 13 - "Community 13"
Cohesion: 0.7
Nodes (3): audit(), evalJs(), send()

### Community 15 - "Community 15"
Cohesion: 0.67
Nodes (2): evalJs(), send()

### Community 16 - "Community 16"
Cohesion: 0.67
Nodes (2): evalJs(), send()

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

## Knowledge Gaps
- **Thin community `Community 10`** (5 nodes): `misconceptionGuard()`, `sectionLessonModeCount()`, `sectionNarrativeCount()`, `stripSectionNumber()`, `sectionNarratives.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 15`** (4 nodes): `evalJs()`, `send()`, `waitJson()`, `audit-worked-example-studio.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 16`** (4 nodes): `evalJs()`, `send()`, `waitJson()`, `audit-zero-knowledge-reader.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 17`** (4 nodes): `evalJs()`, `send()`, `waitJson()`, `audit-concept-deck.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 18`** (4 nodes): `evalJs()`, `send()`, `waitJson()`, `audit-formula-reader.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 19`** (4 nodes): `evalJs()`, `send()`, `waitJson()`, `audit-practice-coach.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 20`** (4 nodes): `audit-interactions.mjs`, `evalJs()`, `send()`, `waitJson()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 21`** (4 nodes): `evalJs()`, `send()`, `waitJson()`, `audit-misconception-clinic.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `algorithmCoverageRow()` connect `Community 2` to `Community 0`, `Community 9`, `Community 3`, `Community 1`?**
  _High betweenness centrality (0.160) - this node is a cross-community bridge._
- **Why does `chapterCoverageRow()` connect `Community 0` to `Community 2`, `Community 5`, `Community 6`, `Community 7`, `Community 8`?**
  _High betweenness centrality (0.138) - this node is a cross-community bridge._
- **Why does `workedExampleForAlgorithm()` connect `Community 1` to `Community 2`?**
  _High betweenness centrality (0.069) - this node is a cross-community bridge._
- **Are the 22 inferred relationships involving `chapterCoverageRow()` (e.g. with `algorithmsForChapter()` and `chapterSynthesis()`) actually correct?**
  _`chapterCoverageRow()` has 22 INFERRED edges - model-reasoned connections that need verification._
- **Are the 19 inferred relationships involving `buildCoverageAudit()` (e.g. with `zeroKnowledgeRungCount()` and `zeroKnowledgeModeCount()`) actually correct?**
  _`buildCoverageAudit()` has 19 INFERRED edges - model-reasoned connections that need verification._
- **Are the 2 inferred relationships involving `algorithmProfile()` (e.g. with `algorithmCoverageRow()` and `ladderItem()`) actually correct?**
  _`algorithmProfile()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.09 - nodes in this community are weakly interconnected._
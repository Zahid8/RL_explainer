# Graph Report - rlbook-explainer  (2026-09-18)

## Corpus Check
- 151 files · ~947,879 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 699 nodes · 1273 edges · 54 communities detected
- Extraction: 70% EXTRACTED · 30% INFERRED · 0% AMBIGUOUS · INFERRED: 387 edges (avg confidence: 0.8)
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
- [[_COMMUNITY_Community 24|Community 24]]
- [[_COMMUNITY_Community 25|Community 25]]
- [[_COMMUNITY_Community 26|Community 26]]
- [[_COMMUNITY_Community 27|Community 27]]
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

## God Nodes (most connected - your core abstractions)
1. `buildCoverageAudit()` - 101 edges
2. `chapterCoverageRow()` - 67 edges
3. `BookPage()` - 54 edges
4. `buildBookIndexEntries()` - 33 edges
5. `learningGraphForChapter()` - 28 edges
6. `algorithmsForChapter()` - 22 edges
7. `workedExampleForAlgorithm()` - 22 edges
8. `conceptCardsForChapter()` - 19 edges
9. `workedExamplesForChapter()` - 16 edges
10. `simulatorForChapter()` - 16 edges

## Surprising Connections (you probably didn't know these)
- `chapterCoverageRow()` --calls--> `chapterSynthesis()`  [INFERRED]
  src/lib/coverageAudit.ts → /home/zahid/Projects/rl_bok/rlbook-explainer/src/lib/chapterSynthesis.ts
- `algorithmCoverageRow()` --calls--> `sourceAuditsForChapter()`  [INFERRED]
  src/lib/coverageAudit.ts → /home/zahid/Projects/rl_bok/rlbook-explainer/src/lib/algorithmSourceAudit.ts
- `algorithmCoverageRow()` --calls--> `algorithmDerivation()`  [INFERRED]
  src/lib/coverageAudit.ts → /home/zahid/Projects/rl_bok/rlbook-explainer/src/lib/algorithmDerivations.ts
- `algorithmCoverageRow()` --calls--> `workedExampleForAlgorithm()`  [INFERRED]
  src/lib/coverageAudit.ts → /home/zahid/Projects/rl_bok/rlbook-explainer/src/lib/algorithmWorkedExamples.ts
- `chapterSynthesis()` --calls--> `buildBookIndexEntries()`  [INFERRED]
  /home/zahid/Projects/rl_bok/rlbook-explainer/src/lib/chapterSynthesis.ts → src/lib/bookIndex.ts

## Communities

### Community 0 - "Community 0"
Cohesion: 0.06
Nodes (54): BookPage(), CasesPage(), allCaseStudies(), caseStudiesForChapter(), caseStudyAnchorCount(), caseStudyBoardFrameCount(), caseStudyCardCount(), caseStudyChapterCount() (+46 more)

### Community 1 - "Community 1"
Cohesion: 0.13
Nodes (45): algorithmsForChapter(), sourceAuditsForChapter(), analogiesForChapter(), analogyCandidatesForChapter(), algorithmsWithAssumptionClinicForChapter(), assumptionCardsForChapter(), buildBookIndexEntries(), caseStudyCandidatesForChapter() (+37 more)

### Community 2 - "Community 2"
Cohesion: 0.15
Nodes (23): algorithmDossier(), inferBiasVariancePosition(), inferDiagnostics(), inferEstimatorShape(), inferImplementationInvariants(), inferKnobs(), inferStabilityContract(), outputPhrase() (+15 more)

### Community 3 - "Community 3"
Cohesion: 0.15
Nodes (22): AssumptionsPage(), allAssumptionClinicCards(), assumptionCardCount(), assumptionCardForAlgorithm(), assumptionChapterCount(), assumptionModeCount(), assumptionsForAlgorithmFamily(), compactList() (+14 more)

### Community 4 - "Community 4"
Cohesion: 0.18
Nodes (21): applicationExample(), approximationExample(), banditExample(), doubleQExample(), dpExample(), expectedBackupExample(), genericExample(), gradientBanditExample() (+13 more)

### Community 5 - "Community 5"
Cohesion: 0.19
Nodes (19): CodePage(), algorithmsWithCodeLabForChapter(), allCodeLabCards(), codeLabCardCount(), codeLabCardForAlgorithm(), codeLabCardsForAlgorithmFamily(), codeLabCardsForChapter(), codeLabChapterCount() (+11 more)

### Community 6 - "Community 6"
Cohesion: 0.19
Nodes (16): ComparePage(), allMethodCompareCards(), bridgeFrame(), compactList(), compactTags(), contrastAlgorithm(), failureFrame(), methodCompareCardCount() (+8 more)

### Community 7 - "Community 7"
Cohesion: 0.25
Nodes (13): allProofLabCards(), chapterProofSpineCount(), compactList(), compactTags(), formulaProofCard(), formulaProofCardCount(), proofCardCount(), proofCardsForFamily() (+5 more)

### Community 8 - "Community 8"
Cohesion: 0.2
Nodes (13): allMathRescueCards(), compactTags(), inferSymbols(), mathRescueCardCount(), mathRescueChapterCount(), mathRescueModeCount(), mathRescueObjectCount(), mathRescueSourceCount() (+5 more)

### Community 9 - "Community 9"
Cohesion: 0.21
Nodes (13): allSymbolCards(), buildSymbolCards(), cleanSpoken(), compactTags(), guide(), guideForSymbol(), symbolCardCount(), symbolCardsForChapter() (+5 more)

### Community 10 - "Community 10"
Cohesion: 0.2
Nodes (13): allVisualStoryCards(), compactTags(), normalize(), roundRobinUnique(), slug(), visualStoryActorCount(), visualStoryCardCount(), visualStoryChapterCount() (+5 more)

### Community 11 - "Community 11"
Cohesion: 0.21
Nodes (11): AnalogiesPage(), allAnalogyCards(), analogyAnchorCount(), analogyCardCount(), analogyChapterCount(), analogyMappingCount(), analogyModeCount(), analogySourceCount() (+3 more)

### Community 12 - "Community 12"
Cohesion: 0.21
Nodes (12): FoundationsPage(), allFoundationDictionaryCards(), compactTags(), foundationDictionaryCardCount(), foundationDictionaryChapterCount(), foundationDictionaryModeCount(), foundationDictionarySourceCount(), foundationDictionaryTermCount() (+4 more)

### Community 13 - "Community 13"
Cohesion: 0.24
Nodes (13): ExercisesPage(), allExerciseSolutionCards(), compactList(), compactTags(), exerciseSolutionCardCount(), exerciseSolutionCardForCoach(), exerciseSolutionCardsForChapter(), exerciseSolutionChapterCount() (+5 more)

### Community 14 - "Community 14"
Cohesion: 0.3
Nodes (10): algorithmDerivation(), classifyAlgorithm(), codingTrace(), controlMove(), creditAssignment(), equationNotes(), errorSignal(), estimateSubject() (+2 more)

### Community 15 - "Community 15"
Cohesion: 0.29
Nodes (8): GraphPage(), allLearningGraphs(), edgeId(), learningGraphChapterCount(), learningGraphEdgeCount(), learningGraphNodeCount(), nodeId(), slug()

### Community 16 - "Community 16"
Cohesion: 0.24
Nodes (7): handsOnSequence(), lectureBeat(), questionForSection(), standaloneLectureTileCount(), uniqueTerms(), visualForSection(), vocabularyForChapter()

### Community 17 - "Community 17"
Cohesion: 0.35
Nodes (7): allBookIndexEntries(), bookIndexChapterCount(), bookIndexEntriesForChapter(), bookIndexEntryCount(), bookIndexLayerCount(), layerBreakdown(), SearchPage()

### Community 18 - "Community 18"
Cohesion: 0.24
Nodes (5): allSectionMasteryCards(), sectionMasteryCardCount(), sectionMasteryChapterCount(), sectionMasteryModeCount(), SectionsPage()

### Community 19 - "Community 19"
Cohesion: 0.36
Nodes (9): chapterSynthesis(), comparisonAxes(), dependencyStack(), groupBy(), implementationTest(), ladderItem(), oralExamPrompts(), studyProtocol() (+1 more)

### Community 20 - "Community 20"
Cohesion: 0.36
Nodes (6): chapterDependencyMap(), conceptGates(), dominantProfiles(), reviewLoop(), skipRisks(), topCounts()

### Community 21 - "Community 21"
Cohesion: 0.33
Nodes (7): allConceptCards(), candidateFromSection(), conceptCardCount(), conceptModeCount(), normalize(), slug(), uniqueCandidates()

### Community 22 - "Community 22"
Cohesion: 0.33
Nodes (7): ExamPage(), allChapterExamCards(), chapterExamCardCount(), chapterExamChapterCount(), chapterExamModeCount(), compactSentence(), compactTags()

### Community 23 - "Community 23"
Cohesion: 0.29
Nodes (3): glyphVariantForLabel(), glyphAccentForLabel(), glyphVariantForLabel()

### Community 24 - "Community 24"
Cohesion: 0.47
Nodes (3): allMisconceptionCards(), misconceptionCardCount(), misconceptionModeCount()

### Community 25 - "Community 25"
Cohesion: 0.7
Nodes (3): audit(), evalJs(), send()

### Community 26 - "Community 26"
Cohesion: 0.7
Nodes (3): audit(), evalJs(), send()

### Community 27 - "Community 27"
Cohesion: 0.7
Nodes (3): audit(), evalJs(), send()

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

## Knowledge Gaps
- **Thin community `Community 31`** (4 nodes): `evalJs()`, `send()`, `waitJson()`, `audit-section-mastery-studio.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 32`** (4 nodes): `evalJs()`, `send()`, `waitJson()`, `audit-proof-lab.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 33`** (4 nodes): `evalJs()`, `send()`, `waitJson()`, `audit-worked-example-studio.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 34`** (4 nodes): `evalJs()`, `send()`, `waitJson()`, `audit-zero-knowledge-reader.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 35`** (4 nodes): `evalJs()`, `send()`, `waitJson()`, `audit-chapter-lecture-theater.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 36`** (4 nodes): `evalJs()`, `send()`, `waitJson()`, `audit-concept-deck.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 37`** (4 nodes): `evalJs()`, `send()`, `waitJson()`, `audit-formula-reader.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 38`** (4 nodes): `evalJs()`, `send()`, `waitJson()`, `audit-code-lab.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 39`** (4 nodes): `evalJs()`, `send()`, `waitJson()`, `audit-practice-coach.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 40`** (4 nodes): `evalJs()`, `send()`, `waitJson()`, `audit-analogy-studio.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 41`** (4 nodes): `evalJs()`, `send()`, `waitJson()`, `audit-method-compare-studio.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 42`** (4 nodes): `evalJs()`, `send()`, `waitJson()`, `audit-chapter-simulator-lab.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 43`** (4 nodes): `evalJs()`, `send()`, `waitJson()`, `audit-chapter1-click.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 44`** (4 nodes): `audit-interactions.mjs`, `evalJs()`, `send()`, `waitJson()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 45`** (4 nodes): `evalJs()`, `send()`, `waitJson()`, `audit-learning-graph.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 46`** (4 nodes): `evalJs()`, `send()`, `waitJson()`, `audit-book-search.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 47`** (4 nodes): `evalJs()`, `send()`, `waitJson()`, `audit-foundation-dictionary-studio.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 48`** (4 nodes): `evalJs()`, `send()`, `waitJson()`, `audit-case-study-studio.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 49`** (4 nodes): `evalJs()`, `send()`, `waitJson()`, `audit-math-rescue-studio.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 50`** (4 nodes): `evalJs()`, `send()`, `waitJson()`, `audit-misconception-clinic.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 51`** (4 nodes): `evalJs()`, `send()`, `waitJson()`, `audit-assumption-clinic.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 52`** (4 nodes): `evalJs()`, `send()`, `waitJson()`, `audit-symbol-decoder.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 53`** (4 nodes): `evalJs()`, `send()`, `waitJson()`, `audit-exercise-solution-studio.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 54`** (4 nodes): `evalJs()`, `send()`, `waitJson()`, `audit-visual-story-studio.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 55`** (4 nodes): `evalJs()`, `send()`, `waitJson()`, `audit-chapter-exam-studio.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 56`** (4 nodes): `evalJs()`, `send()`, `waitJson()`, `audit-socratic-tutor-studio.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `buildCoverageAudit()` connect `Community 0` to `Community 1`, `Community 3`, `Community 5`, `Community 6`, `Community 7`, `Community 8`, `Community 9`, `Community 10`, `Community 11`, `Community 12`, `Community 13`, `Community 15`, `Community 16`, `Community 17`, `Community 18`, `Community 21`, `Community 22`, `Community 24`?**
  _High betweenness centrality (0.181) - this node is a cross-community bridge._
- **Why does `chapterCoverageRow()` connect `Community 1` to `Community 0`, `Community 3`, `Community 5`, `Community 6`, `Community 7`, `Community 8`, `Community 9`, `Community 10`, `Community 11`, `Community 12`, `Community 13`, `Community 15`, `Community 17`, `Community 18`, `Community 19`, `Community 20`, `Community 21`, `Community 22`, `Community 24`?**
  _High betweenness centrality (0.103) - this node is a cross-community bridge._
- **Why does `algorithmCoverageRow()` connect `Community 2` to `Community 0`, `Community 1`, `Community 4`, `Community 14`?**
  _High betweenness centrality (0.095) - this node is a cross-community bridge._
- **Are the 99 inferred relationships involving `buildCoverageAudit()` (e.g. with `zeroKnowledgeRungCount()` and `zeroKnowledgeModeCount()`) actually correct?**
  _`buildCoverageAudit()` has 99 INFERRED edges - model-reasoned connections that need verification._
- **Are the 66 inferred relationships involving `chapterCoverageRow()` (e.g. with `algorithmsForChapter()` and `chapterSynthesis()`) actually correct?**
  _`chapterCoverageRow()` has 66 INFERRED edges - model-reasoned connections that need verification._
- **Are the 53 inferred relationships involving `BookPage()` (e.g. with `standaloneLectureTileCount()` and `manuscriptSectionCount()`) actually correct?**
  _`BookPage()` has 53 INFERRED edges - model-reasoned connections that need verification._
- **Are the 31 inferred relationships involving `buildBookIndexEntries()` (e.g. with `algorithmsForChapter()` and `standaloneLectureForChapter()`) actually correct?**
  _`buildBookIndexEntries()` has 31 INFERRED edges - model-reasoned connections that need verification._
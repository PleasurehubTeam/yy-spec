# Ambiguity Detection for Requirements

## Purpose
Automatically scan generated requirements for ambiguities and underspecified areas. Mark them inline for user review rather than requiring interactive Q&A.

## When to Run
- **spec-requirements**: After generating requirements.md, before finalizing
- **feature**: During requirements generation phase

## Scanning Categories

Scan requirements across these 6 dimensions:

### 1. Functional Scope
- Are feature boundaries clearly defined? (what's in vs out)
- Are actor roles and permissions specified?

### 2. Data & Domain Model
- Are key entities and their relationships defined?
- Are data validation rules specified?
- Are state transitions documented?

### 3. Non-Functional Quality
- Are performance expectations quantified? (response time, throughput)
- Are security requirements explicit?
- Are scalability expectations stated?

### 4. Integration & Dependencies
- Are external system interactions defined?
- Are API contracts specified?
- Are failure/fallback behaviors documented?

### 5. Edge Cases & Constraints
- Are boundary conditions addressed?
- Are error scenarios covered?
- Are concurrency/race conditions considered?

### 6. Completion Signals
- Are acceptance criteria measurable?
- Is "done" clearly defined?

## Detection Method

For each dimension, classify as:
- **Clear**: Requirements adequately address this dimension
- **Partial**: Some coverage but gaps exist
- **Missing**: Not addressed at all

## Output Format

When ambiguities are found, add a section at the end of requirements.md:

```markdown
---

## Ambiguity Notes

> The following areas may need clarification before design. Review and update requirements above if needed, or proceed and address during design phase.

| # | Category | Status | Note |
|---|----------|--------|------|
| 1 | Non-Functional | Partial | No performance targets specified — design will assume standard thresholds |
| 2 | Edge Cases | Missing | Concurrent edit behavior undefined — design will choose last-write-wins |
| 3 | Integration | Partial | Auth provider not specified — design will propose options |
```

Also include in command output summary:
```
Ambiguity scan: 2 partial, 1 missing (see Ambiguity Notes section in requirements.md)
```

## Constraints
- Maximum 5 ambiguity notes (focus on most impactful)
- Each note MUST include a default assumption ("design will assume/choose/propose...")
- Ambiguities are informational — they do NOT block proceeding to design
- If all 6 dimensions are Clear: single line `Ambiguity scan: all clear`
- Do not ask interactive questions — mark and move on
- Scoring: Missing > Partial (Missing items listed first)

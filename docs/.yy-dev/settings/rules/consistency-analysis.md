# Cross-Artifact Consistency Analysis

## Purpose
Validate consistency across requirements.md, design.md, and tasks.md to catch gaps, conflicts, and drift before implementation begins.

## When to Run
- **spec-tasks**: Automatically after generating tasks.md
- **feature** (large path): After all spec documents are generated
- **plan-exec**: Before starting execution, as a pre-flight check

## Analysis Passes

### Pass 1: Requirements Coverage
Check that every requirement in requirements.md maps to at least one task in tasks.md.

- List unmapped requirements (if any)
- List tasks that don't trace back to any requirement (orphaned tasks)

### Pass 2: Design-Task Alignment
Check that every component/interface in design.md has corresponding implementation tasks.

- List design components without tasks
- List tasks referencing components not in design.md

### Pass 3: Inconsistency Detection
Scan for contradictions between documents:
- Terminology differences (same concept, different names)
- Scope conflicts (requirement says X, design says Y)
- Missing data flows (design references data not in requirements)

### Pass 4: Completeness Check
- Are all acceptance criteria from requirements testable via planned tasks?
- Do tasks cover error handling and edge cases from design?
- Are integration points between components covered by tasks?

## Output Format

Append to spec-tasks output:

```
## Consistency Check
- Requirements coverage: 15/15 (100%)
- Design components mapped: 8/8 (100%)
- Issues found: 1

| # | Type | Severity | Detail |
|---|------|----------|--------|
| 1 | Gap  | MEDIUM   | Requirement 3.2 (rate limiting) has no corresponding task |
```

If no issues: single line `Consistency check: All clear (15 requirements, 8 components, 0 issues)`

## Severity Levels
- **HIGH**: Core requirement unmapped, or direct contradiction between documents
- **MEDIUM**: Non-critical gap or terminology inconsistency
- **LOW**: Minor style or naming drift

## Constraints
- Read-only analysis — never modify spec files
- Maximum 10 findings reported (prioritize by severity)
- If >3 HIGH severity issues: recommend resolving before implementation
- If only MEDIUM/LOW: report and allow proceeding

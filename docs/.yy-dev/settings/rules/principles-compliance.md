# Principles Compliance Check

## Purpose
Validate that design decisions and task plans comply with project principles defined in `steering/principles.md`.

## When to Run
- **spec-design**: After generating design.md, before finalizing
- **spec-tasks**: After generating tasks.md, as part of output summary
- **feature** (large path): After generating all spec documents

## Check Process

### 1. Load Principles
Read `.yy-dev/steering/principles.md`. If file does not exist, skip compliance check with note: "No principles defined — consider running `/yy:steering` to generate."

### 2. Extract Checkable Rules
From each principle, extract the MUST / MUST NOT statement as a checkable assertion.

### 3. Evaluate Design/Tasks Against Rules
For each principle:
- **PASS**: Design/tasks clearly comply
- **WARN**: Potential conflict, but not definitive (explain concern)
- **FAIL**: Direct violation detected (explain which component/task violates and why)

### 4. Output Format
Append to command output (not a separate section in the spec files):

```
## Principles Compliance
| Principle | Status | Detail |
|-----------|--------|--------|
| Type Safety | PASS | All interfaces have explicit types |
| Test-First | PASS | TDD enforced in task sequence |
| No Direct DB | WARN | Task 3.2 accesses user table — verify domain boundary |
```

### 5. Severity Rules
- **Any FAIL**: Report as blocking issue, suggest design revision before proceeding
- **WARN only**: Report but allow proceeding, recommend review
- **All PASS**: Brief confirmation line, no table needed

## Constraints
- Never auto-modify spec files based on compliance results
- Principles are non-negotiable — cannot be reinterpreted to bypass findings
- Check is informational in output, not a hard gate (user decides whether to act)
- Keep output concise — max 5 rows in compliance table

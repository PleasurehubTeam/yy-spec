# Spec-Kit Enhancements: Principles + Consistency Analysis + Ambiguity Detection

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Embed spec-kit's three best capabilities (constitution/principles, cross-artifact consistency analysis, ambiguity detection) into yy-spec's existing workflow with zero new user commands.

**Architecture:** Add 4 new shared rule/template files, then modify existing command prompts to automatically load and apply them at the right moments. Changes cascade to all agents via shared settings.

**Tech Stack:** Markdown prompt templates, JSON manifests (no code changes to CLI)

---

## Summary of Changes

```
New files (4):
  shared/settings/templates/steering/principles.md    ← principles template
  shared/settings/rules/principles-compliance.md      ← how to check compliance
  shared/settings/rules/consistency-analysis.md       ← cross-doc analysis rules
  shared/settings/rules/ambiguity-detection.md        ← ambiguity scanning rules

Modified commands (claude-code, 4 files):
  commands/steering.md        ← generate principles.md during bootstrap
  commands/spec-requirements.md ← scan for ambiguities after generation
  commands/spec-design.md     ← principles compliance gate
  commands/spec-tasks.md      ← consistency analysis after task generation

Modified commands (claude-code-agent, 6 files):
  commands/steering.md        ← same as claude-code
  agents/steering.md          ← same as claude-code
  commands/spec-requirements.md ← same
  agents/spec-requirements.md ← same
  commands/spec-design.md     ← same
  agents/spec-design.md       ← same
  commands/spec-tasks.md      ← same
  agents/spec-tasks.md        ← same

Modified commands (other agents, 5 × 4 files):
  cursor, codex, gemini-cli, github-copilot, windsurf, opencode, opencode-agent, qwen-code
  ← same logical changes, adapted to each agent's format
```

**User impact:** Zero new commands. `steering` generates one extra file. `spec-requirements`, `spec-design`, `spec-tasks` each do slightly more work internally.

---

## Task 1: Create Principles Steering Template

**Files:**
- Create: `tools/yy-spec/templates/shared/settings/templates/steering/principles.md`

**Step 1: Write the principles template**

This is the "constitution" equivalent — a template that `steering` fills in with project-specific architectural laws.

```markdown
# Project Principles

Immutable architectural constraints that all specifications and implementations must comply with.

## Core Principles

[3-5 non-negotiable principles extracted from codebase analysis]

Each principle follows this format:
- **Name**: Short label
- **Rule**: What is required or forbidden (use MUST / MUST NOT)
- **Rationale**: Why this principle exists
- **Enforcement**: How violations are detected

### Example Principles

- **Type Safety**: All public interfaces MUST have explicit type definitions. Rationale: Prevents runtime errors at integration boundaries.
- **Test-First**: All features MUST have tests written before implementation code. Rationale: Ensures testability is designed in, not bolted on.
- **No Direct DB Access**: Services MUST NOT access database tables outside their domain boundary. Rationale: Prevents coupling between service domains.

## Technology Constraints

[Key technology decisions that are settled and non-negotiable]

- Language/runtime version requirements
- Framework choices and their implications
- Forbidden patterns or anti-patterns specific to this project

## Quality Gates

[Minimum standards that all code must meet]

- Test coverage expectations
- Performance thresholds (if applicable)
- Security requirements (if applicable)

---
_Principles are discovered from codebase patterns and team conventions._
_Update via `/yy:steering` when architectural decisions change._
_Compliance is automatically checked during spec-design and spec-tasks._
```

**Step 2: Commit**

```bash
git add tools/yy-spec/templates/shared/settings/templates/steering/principles.md
git commit -m "feat: add principles.md steering template (constitution equivalent)"
```

---

## Task 2: Create Principles Compliance Rule

**Files:**
- Create: `tools/yy-spec/templates/shared/settings/rules/principles-compliance.md`

**Step 1: Write the compliance checking rule**

This file defines HOW design and tasks are checked against principles. Referenced by `spec-design` and `spec-tasks`.

```markdown
# Principles Compliance Check

## Purpose
Validate that design decisions and task plans comply with project principles defined in `steering/principles.md`.

## When to Run
- **spec-design**: After generating design.md, before finalizing
- **spec-tasks**: After generating tasks.md, as part of output summary
- **feature** (large path): After generating all spec documents

## Check Process

### 1. Load Principles
Read `{{KIRO_DIR}}/steering/principles.md`. If file does not exist, skip compliance check with note: "No principles defined — consider running `/yy:steering` to generate."

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
```

**Step 2: Commit**

```bash
git add tools/yy-spec/templates/shared/settings/rules/principles-compliance.md
git commit -m "feat: add principles compliance check rule"
```

---

## Task 3: Create Consistency Analysis Rule

**Files:**
- Create: `tools/yy-spec/templates/shared/settings/rules/consistency-analysis.md`

**Step 1: Write the consistency analysis rule**

This is the "analyze" equivalent — defines how to cross-check requirements, design, and tasks for inconsistencies. Runs automatically after task generation.

```markdown
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

If no issues: single line "Consistency check: All clear (15 requirements, 8 components, 0 issues)"

## Severity Levels
- **HIGH**: Core requirement unmapped, or direct contradiction between documents
- **MEDIUM**: Non-critical gap or terminology inconsistency
- **LOW**: Minor style or naming drift

## Constraints
- Read-only analysis — never modify spec files
- Maximum 10 findings reported (prioritize by severity)
- If >3 HIGH severity issues: recommend resolving before implementation
- If only MEDIUM/LOW: report and allow proceeding
```

**Step 2: Commit**

```bash
git add tools/yy-spec/templates/shared/settings/rules/consistency-analysis.md
git commit -m "feat: add cross-artifact consistency analysis rule"
```

---

## Task 4: Create Ambiguity Detection Rule

**Files:**
- Create: `tools/yy-spec/templates/shared/settings/rules/ambiguity-detection.md`

**Step 1: Write the ambiguity detection rule**

This replaces spec-kit's interactive `clarify` command with an automatic scan embedded in requirements generation.

```markdown
# Ambiguity Detection for Requirements

## Purpose
Automatically scan generated requirements for ambiguities and underspecified areas. Mark them inline for user review rather than requiring interactive Q&A.

## When to Run
- **spec-requirements**: After generating requirements.md, before finalizing
- **feature**: During requirements generation phase

## Scanning Categories

Scan requirements across these 6 dimensions (adapted from spec-kit's 10, merged for efficiency):

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
- If all 6 dimensions are Clear: single line "Ambiguity scan: all clear"
- Do not ask interactive questions — mark and move on
- Scoring: Missing > Partial (Missing items listed first)
```

**Step 2: Commit**

```bash
git add tools/yy-spec/templates/shared/settings/rules/ambiguity-detection.md
git commit -m "feat: add ambiguity detection rule for requirements"
```

---

## Task 5: Modify Steering Command — Add Principles Generation

**Files:**
- Modify: `tools/yy-spec/templates/agents/claude-code/commands/steering.md`
- Modify: `tools/yy-spec/templates/agents/claude-code-agent/commands/steering.md`
- Modify: `tools/yy-spec/templates/agents/claude-code-agent/agents/steering.md`

**Step 1: Read all three files** (already read claude-code version; read the other two)

**Step 2: Modify claude-code steering command**

Add principles.md generation to both Bootstrap and Sync flows. Changes:

In **Bootstrap Flow** (after step 4 "Generate steering files"), add:

```markdown
5. Generate principles:
   - Load template from `{{KIRO_DIR}}/settings/templates/steering/principles.md`
   - Analyze codebase for implicit principles:
     - Check for linting configs, type checking settings → Type Safety principles
     - Check for test frameworks, CI configs → Testing principles
     - Check for architectural patterns (monorepo, microservices, etc.)
     - Check for security configs, auth patterns
   - Extract 3-5 core principles from observed patterns
   - Write `{{KIRO_DIR}}/steering/principles.md`
```

In **Sync Flow** (after step 3 "Detect drift"), add:

```markdown
   - **Principles file**: Check if principles.md exists, generate if missing
   - If exists: Verify principles still align with codebase patterns
```

Update **Bootstrap output** to include:

```markdown
- principles.md: [Key constraints]
```

**Step 3: Apply same changes to claude-code-agent/commands/steering.md and claude-code-agent/agents/steering.md**

Same logical additions adapted to the subagent delegation pattern.

**Step 4: Commit**

```bash
git add tools/yy-spec/templates/agents/claude-code/commands/steering.md
git add tools/yy-spec/templates/agents/claude-code-agent/commands/steering.md
git add tools/yy-spec/templates/agents/claude-code-agent/agents/steering.md
git commit -m "feat: steering generates principles.md during bootstrap"
```

---

## Task 6: Modify Spec-Requirements — Add Ambiguity Detection

**Files:**
- Modify: `tools/yy-spec/templates/agents/claude-code/commands/spec-requirements.md`
- Modify: `tools/yy-spec/templates/agents/claude-code-agent/commands/spec-requirements.md`
- Modify: `tools/yy-spec/templates/agents/claude-code-agent/agents/spec-requirements.md`

**Step 1: Read agent variants** (already read claude-code version)

**Step 2: Modify claude-code spec-requirements command**

In **Execution Steps**, after step 3 "Generate Requirements", add a new step:

```markdown
4. **Ambiguity Scan**:
   - Read `{{KIRO_DIR}}/settings/rules/ambiguity-detection.md`
   - Scan generated requirements across 6 dimensions
   - If ambiguities found: append "Ambiguity Notes" section to requirements.md
   - Include scan summary in command output
```

In **Output Description**, add:

```markdown
4. **Ambiguity Scan**: Summary of detected ambiguities (if any)
```

Renumber existing step 4 "Update Metadata" to step 5.

**Step 3: Apply same changes to claude-code-agent variants**

**Step 4: Commit**

```bash
git add tools/yy-spec/templates/agents/claude-code/commands/spec-requirements.md
git add tools/yy-spec/templates/agents/claude-code-agent/commands/spec-requirements.md
git add tools/yy-spec/templates/agents/claude-code-agent/agents/spec-requirements.md
git commit -m "feat: spec-requirements includes automatic ambiguity detection"
```

---

## Task 7: Modify Spec-Design — Add Principles Compliance Check

**Files:**
- Modify: `tools/yy-spec/templates/agents/claude-code/commands/spec-design.md`
- Modify: `tools/yy-spec/templates/agents/claude-code-agent/commands/spec-design.md`
- Modify: `tools/yy-spec/templates/agents/claude-code-agent/agents/spec-design.md`

**Step 1: Read agent variants**

**Step 2: Modify claude-code spec-design command**

In **Step 1: Load Context**, add to the read list:

```markdown
- `{{KIRO_DIR}}/steering/principles.md` (if exists, for compliance check)
- `{{KIRO_DIR}}/settings/rules/principles-compliance.md` for compliance process
```

After **Step 3: Generate Design Document**, add:

```markdown
### Step 4: Principles Compliance Check

1. If `{{KIRO_DIR}}/steering/principles.md` exists:
   - Read `{{KIRO_DIR}}/settings/rules/principles-compliance.md`
   - Evaluate design against each principle
   - Include compliance summary in command output
2. If principles.md does not exist: skip with note
```

In **Output Description**, add:

```markdown
6. **Principles Compliance**: Summary of compliance check results (if principles exist)
```

**Step 3: Apply same changes to claude-code-agent variants**

**Step 4: Commit**

```bash
git add tools/yy-spec/templates/agents/claude-code/commands/spec-design.md
git add tools/yy-spec/templates/agents/claude-code-agent/commands/spec-design.md
git add tools/yy-spec/templates/agents/claude-code-agent/agents/spec-design.md
git commit -m "feat: spec-design includes principles compliance check"
```

---

## Task 8: Modify Spec-Tasks — Add Consistency Analysis

**Files:**
- Modify: `tools/yy-spec/templates/agents/claude-code/commands/spec-tasks.md`
- Modify: `tools/yy-spec/templates/agents/claude-code-agent/commands/spec-tasks.md`
- Modify: `tools/yy-spec/templates/agents/claude-code-agent/agents/spec-tasks.md`

**Step 1: Read agent variants**

**Step 2: Modify claude-code spec-tasks command**

In **Step 1: Load Context**, add:

```markdown
- `{{KIRO_DIR}}/settings/rules/consistency-analysis.md` for post-generation analysis
- `{{KIRO_DIR}}/settings/rules/principles-compliance.md` for compliance check
- `{{KIRO_DIR}}/steering/principles.md` (if exists)
```

After **Step 3: Finalize**, add:

```markdown
### Step 4: Quality Analysis

1. **Consistency Check** (mandatory):
   - Read `{{KIRO_DIR}}/settings/rules/consistency-analysis.md`
   - Run 4-pass analysis across requirements.md, design.md, tasks.md
   - Include results in command output

2. **Principles Compliance** (if principles.md exists):
   - Read `{{KIRO_DIR}}/settings/rules/principles-compliance.md`
   - Evaluate task plan against principles
   - Include compliance summary in command output
```

In **Output Description**, after item 3 "Quality Validation", add:

```markdown
4. **Consistency Analysis**:
   - Requirements coverage: X/Y (Z%)
   - Design components mapped: A/B
   - Issues found: N (list if any)
5. **Principles Compliance**: Summary (if principles exist)
```

Renumber "Next Action" to item 6.

**Step 3: Apply same changes to claude-code-agent variants**

**Step 4: Commit**

```bash
git add tools/yy-spec/templates/agents/claude-code/commands/spec-tasks.md
git add tools/yy-spec/templates/agents/claude-code-agent/commands/spec-tasks.md
git add tools/yy-spec/templates/agents/claude-code-agent/agents/spec-tasks.md
git commit -m "feat: spec-tasks includes consistency analysis and compliance check"
```

---

## Task 9: Modify Feature Command — Embed All Three Checks

**Files:**
- Modify: `tools/yy-spec/templates/agents/claude-code/commands/feature.md`
- Modify: `tools/yy-spec/templates/agents/claude-code-agent/commands/feature.md`

**Step 1: Read agent variants**

**Step 2: Modify claude-code feature command**

In **Step 4A: Small Feature Path**, after generating design.md:

```markdown
1. **Generate design.md** (simplified):
   ...existing content...
   - Check against `{{KIRO_DIR}}/steering/principles.md` if exists (quick compliance check, report any WARN/FAIL)
```

In **Step 4B: Large Feature Path**, after generating all spec documents:

```markdown
3. **Quality Checks**:
   - Run ambiguity scan on requirements (per ambiguity-detection.md rules)
   - Run principles compliance on design (per principles-compliance.md rules)
   - Run consistency analysis across all documents (per consistency-analysis.md rules)
   - Include summary in output
```

**Step 3: Apply same changes to claude-code-agent variant**

**Step 4: Commit**

```bash
git add tools/yy-spec/templates/agents/claude-code/commands/feature.md
git add tools/yy-spec/templates/agents/claude-code-agent/commands/feature.md
git commit -m "feat: feature command embeds ambiguity, compliance, and consistency checks"
```

---

## Task 10: Update Other Agent Command Templates

**Files:**
- Modify: All corresponding commands in `cursor/`, `codex/`, `gemini-cli/`, `github-copilot/`, `windsurf/`, `opencode/`, `opencode-agent/`, `qwen-code/`

**Step 1: Inventory all agent variants**

For each agent, identify the files that correspond to steering, spec-requirements, spec-design, spec-tasks, and feature commands.

**Step 2: Apply the same logical changes**

Each agent's format may differ slightly:
- **Cursor**: `.md` files in `.cursor/commands/`
- **Codex**: `yy-spec-*` prefixed `.md` files
- **Gemini**: `.toml` format
- **GitHub Copilot**: `.prompt.md` format
- **Windsurf**: `yy-spec-*` prefixed `.md` files
- **OpenCode/OpenCode-Agent**: `.md` files
- **Qwen**: Documentation in `QWEN.md`

The core references to shared rules (`{{KIRO_DIR}}/settings/rules/*`) are the same across all agents — only the command file format and naming differ.

**Step 3: Commit per agent group**

```bash
git add tools/yy-spec/templates/agents/cursor/
git add tools/yy-spec/templates/agents/codex/
git add tools/yy-spec/templates/agents/gemini-cli/
git add tools/yy-spec/templates/agents/github-copilot/
git add tools/yy-spec/templates/agents/opencode/
git add tools/yy-spec/templates/agents/opencode-agent/
git add tools/yy-spec/templates/agents/windsurf/
git add tools/yy-spec/templates/agents/qwen-code/
git commit -m "feat: apply spec-kit enhancements to all agent templates"
```

---

## Task 11: Update README Documentation

**Files:**
- Modify: `README.md` (root, Chinese)
- Modify: `tools/yy-spec/README.md` (English)
- Modify: `tools/yy-spec/README_zh.md` (Chinese)

**Step 1: Add documentation about new capabilities**

In the "你将获得" / features section, add:
- **项目原则自动提取** — steering 自动发现并记录项目的架构原则，后续命令自动合规检查
- **跨文档一致性分析** — 任务生成后自动检查需求↔设计↔任务的覆盖率和一致性
- **需求歧义检测** — 需求生成后自动扫描模糊点并标记，无需手动澄清

In the steering section, mention that `principles.md` is now generated.

In the step-by-step workflow, mention the embedded checks at each stage.

**Step 2: Commit**

```bash
git add README.md tools/yy-spec/README.md tools/yy-spec/README_zh.md
git commit -m "docs: document principles, consistency analysis, and ambiguity detection"
```

---

## Execution Order & Dependencies

```
Task 1 ─┐
Task 2 ─┤ (P) — All 4 can be created in parallel (no dependencies)
Task 3 ─┤
Task 4 ─┘
         │
Task 5 ──┤ depends on Task 1 (principles template must exist)
Task 6 ──┤ depends on Task 4 (ambiguity rule must exist)
Task 7 ──┤ depends on Task 2 (compliance rule must exist)
Task 8 ──┘ depends on Tasks 2, 3 (compliance + consistency rules must exist)
         │
Task 9 ──┤ depends on Tasks 5-8 (all command modifications done)
Task 10 ─┘ depends on Tasks 5-8 (apply same patterns to other agents)
         │
Task 11 ── depends on all above (document what was built)
```

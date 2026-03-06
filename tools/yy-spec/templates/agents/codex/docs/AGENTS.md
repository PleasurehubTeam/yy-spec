# AI-DLC and Spec-Driven Development

Kiro-style Spec Driven Development implementation on AI-DLC (AI Development Life Cycle)

## Project Memory
Project memory keeps persistent guidance (steering, specs notes, component docs) so Codex honors your standards each run. Treat it as the long-lived source of truth for patterns, conventions, and decisions.

- Use `{{KIRO_DIR}}/steering/` for project-wide policies: architecture principles, naming schemes, security constraints, tech stack decisions, api standards, etc.
- Use local `AGENTS.md` files for feature or library context (e.g. `src/lib/payments/AGENTS.md`): describe domain assumptions, API contracts, or testing conventions specific to that folder. Codex auto-loads these when working in the matching path.
- Specs notes stay with each spec (under `{{KIRO_DIR}}/specs/`) to guide specification-level workflows.

## Project Context

### Paths
- Steering: `{{KIRO_DIR}}/steering/`
- Specs: `{{KIRO_DIR}}/specs/`

### Steering vs Specification

**Steering** (`{{KIRO_DIR}}/steering/`) - Guide AI with project-wide rules and context
**Specs** (`{{KIRO_DIR}}/specs/`) - Formalize development process for individual features

### Active Specifications
- Check `{{KIRO_DIR}}/specs/` for active specifications
- Use `/prompts:yy-spec-status [feature-name]` to check progress

## Development Guidelines
{{DEV_GUIDELINES}}

## Minimal Workflow
- Phase 0 (optional): `/prompts:yy-steering`, `/prompts:yy-steering-custom`
- Phase 1 (Specification):
  - `/prompts:yy-spec-init "description"`
  - `/prompts:yy-spec-requirements {feature}`
  - `/prompts:yy-validate-gap {feature}` (optional: for existing codebase)
  - `/prompts:yy-spec-design {feature} [-y]`
  - `/prompts:yy-validate-design {feature}` (optional: design review)
  - `/prompts:yy-spec-tasks {feature} [-y]`
- Phase 2 (Implementation): `/prompts:yy-spec-impl {feature} [tasks]`
  - `/prompts:yy-validate-impl {feature}` (optional: after implementation)
- Progress check: `/prompts:yy-spec-status {feature}` (use anytime)

## Development Rules
- 3-phase approval workflow: Requirements → Design → Tasks → Implementation
- Human review required each phase; use `-y` only for intentional fast-track
- Keep steering current and verify alignment with `/prompts:yy-spec-status`
- Step-by-Step commands auto-create spec directories if they don't exist (steering required as prerequisite)
- Follow the user's instructions precisely, and within that scope act autonomously: gather the necessary context and complete the requested work end-to-end in this run, asking questions only when essential information is missing or the instructions are critically ambiguous.

### Before Starting Any Development Task
When the user gives a development instruction (not a spec command), evaluate the request before implementing:
1. **Assess scope**: Is this a quick fix (1-2 files) or a substantial feature (new module, architecture change, multi-file)?
2. **If substantial** (>3 files, new dependencies, new directories, or architectural decisions):
   - Present a brief summary of what you plan to do (scope, affected files, approach)
   - Ask the user to confirm before proceeding, or suggest using the spec workflow
   - Do NOT start installing packages, creating directories, or writing code until confirmed
3. **If quick fix**: Proceed directly — no confirmation needed
4. **If the description is vague** (missing scope, behavior, or constraints): Ask 2-3 focused questions first, all in one message

## Steering Configuration
- Load entire `{{KIRO_DIR}}/steering/` as project memory
- Default files: `product.md`, `tech.md`, `structure.md`
- Custom files are supported (managed via `/prompts:yy-steering-custom`)

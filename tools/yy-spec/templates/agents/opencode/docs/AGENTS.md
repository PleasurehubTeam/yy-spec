# AI-DLC and Spec-Driven Development

Kiro-style Spec Driven Development implementation on AI-DLC (AI Development Life Cycle)

## Project Context

### Paths
- Steering: `{{KIRO_DIR}}/steering/`
- Specs: `{{KIRO_DIR}}/specs/`

### Steering vs Specification

**Steering** (`{{KIRO_DIR}}/steering/`) - Guide AI with project-wide rules and context
**Specs** (`{{KIRO_DIR}}/specs/`) - Formalize development process for individual features

### Active Specifications
- Check `{{KIRO_DIR}}/specs/` for active specifications
- Use `/yy-spec-status [feature-name]` to check progress

## Development Guidelines
{{DEV_GUIDELINES}}

## Minimal Workflow
- Phase 0 (optional): `/yy-steering`, `/yy-steering-custom`
- Phase 1 (Specification):
  - `/yy-spec-init "description"`
  - `/yy-spec-requirements {feature}`
  - `/yy-validate-gap {feature}` (optional: for existing codebase)
  - `/yy-spec-design {feature} [-y]`
  - `/yy-validate-design {feature}` (optional: design review)
  - `/yy-spec-tasks {feature} [-y]`
- Phase 2 (Implementation): `/yy-spec-impl {feature} [tasks]`
  - `/yy-validate-impl {feature}` (optional: after implementation)
- Progress check: `/yy-spec-status {feature}` (use anytime)

## Development Rules
- 3-phase approval workflow: Requirements → Design → Tasks → Implementation
- Human review required each phase; use `-y` only for intentional fast-track
- Keep steering current and verify alignment with `/yy-spec-status`
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
- Custom files are supported (managed via `/yy-steering-custom`)

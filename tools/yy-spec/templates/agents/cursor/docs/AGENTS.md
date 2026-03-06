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
- Use `/yy/spec-status [feature-name]` to check progress

## Development Guidelines
{{DEV_GUIDELINES}}

## Minimal Workflow
- Phase 0 (optional): `/yy/steering`, `/yy/steering-custom`
- Phase 1 (Specification):
  - `/yy/spec-init "description"`
  - `/yy/spec-requirements {feature}`
  - `/yy/validate-gap {feature}` (optional: for existing codebase)
  - `/yy/spec-design {feature} [-y]`
  - `/yy/validate-design {feature}` (optional: design review)
  - `/yy/spec-tasks {feature} [-y]`
- Phase 2 (Implementation): `/yy/spec-impl {feature} [tasks]`
  - `/yy/validate-impl {feature}` (optional: after implementation)
- Progress check: `/yy/spec-status {feature}` (use anytime)

## Development Rules
- 3-phase approval workflow: Requirements → Design → Tasks → Implementation
- Human review required each phase; use `-y` only for intentional fast-track
- Keep steering current and verify alignment with `/yy/spec-status`
- Follow the user's instructions precisely, and within that scope act autonomously: gather the necessary context and complete the requested work end-to-end in this run, asking questions only when essential information is missing or the instructions are critically ambiguous.

## Steering Configuration
- Load entire `{{KIRO_DIR}}/steering/` as project memory
- Default files: `product.md`, `tech.md`, `structure.md`
- Custom files are supported (managed via `/yy/steering-custom`)

# AI-DLC and Spec-Driven Development

Spec Driven Development implementation on AI-DLC (AI Development Life Cycle)

## Project Context

### Paths
- Steering: `{{KIRO_DIR}}/steering/`
- Specs: `{{KIRO_DIR}}/specs/`

### Steering vs Specification

**Steering** (`{{KIRO_DIR}}/steering/`) - Guide AI with project-wide rules and context
**Specs** (`{{KIRO_DIR}}/specs/`) - Formalize development process for individual features, bugs, and investigations

### Active Specifications
- Check `{{KIRO_DIR}}/specs/` for active specifications
- Use `/yy:status [spec-name]` to check progress

## Development Guidelines
{{DEV_GUIDELINES}}

## Workflow

### Auto Workflow (end-to-end, self-closing)
- `/yy:steering` — Establish/sync project context (essential for first-time and maintenance)
- `/yy:fix "description"` — Known bug → TDD fix → code review → update specs
- `/yy:investigate "description"` — Uncertain issue → systematic diagnosis → conclusion → can transition to fix
- `/yy:feature "description"` — New feature → auto-size → small: direct implementation / large: generate plan
- `/yy:plan-exec [spec]` — Execute a large feature plan (use in a new session)
- `/yy:status [spec]` — View spec status and progress

### Step-by-Step Workflow (manual control per phase)
- `/yy:spec-requirements <feature>` — Generate requirements document
- `/yy:spec-design <feature>` — Create technical design
- `/yy:spec-tasks <feature>` — Break down into implementation tasks
- `/yy:spec-impl <feature>` — Execute implementation with TDD
- `/yy:validate-gap <feature>` — Analyze gap between requirements and codebase
- `/yy:validate-design <feature>` — Validate design against requirements
- `/yy:validate-impl <feature>` — Validate implementation against specs

## Development Rules
- Auto Workflow commands (feature/fix/investigate) auto-create spec directories
- Step-by-Step commands require an existing spec — use `/yy:feature` first or create the spec directory manually
- First-time use auto-detects steering; missing steering triggers a prompt
- Auto Workflow completion includes automatic code review + changelog update
- Follow the user's instructions precisely, and within that scope act autonomously: gather the necessary context and complete the requested work end-to-end in this run, asking questions only when essential information is missing or the instructions are critically ambiguous.

## Steering Configuration
- Load entire `{{KIRO_DIR}}/steering/` as project memory
- Default files: `product.md`, `tech.md`, `structure.md`
- Customize templates in `{{KIRO_DIR}}/settings/templates/`

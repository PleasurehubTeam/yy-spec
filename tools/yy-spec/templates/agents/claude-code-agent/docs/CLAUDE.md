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
- Step-by-Step commands auto-create spec directories if they don't exist (steering required as prerequisite)
- First-time use auto-detects steering; missing steering triggers a prompt
- Auto Workflow completion includes automatic code review + changelog update

### Before Starting Any Development Task
When the user gives a development instruction (not a `/yy:` command), evaluate the request before implementing:
1. **Assess scope**: Is this a quick fix (1-2 files) or a substantial feature (new module, architecture change, multi-file)?
2. **If substantial** (>3 files, new dependencies, new directories, or architectural decisions):
   - Present a brief summary of what you plan to do (scope, affected files, approach)
   - Ask the user to confirm before proceeding, or suggest using `/yy:feature` for structured workflow
   - Do NOT start installing packages, creating directories, or writing code until confirmed
3. **If quick fix**: Proceed directly — no confirmation needed
4. **If the description is vague** (missing scope, behavior, or constraints): Ask 2-3 focused questions first, all in one message

## Steering Configuration
- Load entire `{{KIRO_DIR}}/steering/` as project memory
- Default files: `product.md`, `tech.md`, `structure.md`
- Customize templates in `{{KIRO_DIR}}/settings/templates/`

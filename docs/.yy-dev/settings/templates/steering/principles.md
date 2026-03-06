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

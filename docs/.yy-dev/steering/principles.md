# Project Principles

Immutable architectural constraints that all specifications and implementations must comply with.

## Core Principles

### 1. Reader-First Simplicity
- **Rule**: 所有内容 MUST 以零基础读者能理解的方式编写，避免未解释的术语
- **Rationale**: README 明确要求"当读者是傻子一样写"，降低学习门槛是核心目标
- **Enforcement**: 文档审查时检查是否存在未定义的专业术语

### 2. Scenario-Driven Organization
- **Rule**: 文档 MUST 以应用场景为主要分类维度，MUST NOT 按内部模块或 API 结构组织
- **Rationale**: 用户按"我想做什么"来查找内容，而非按"这个工具有哪些模块"
- **Enforcement**: 目录结构和导航菜单审查

### 3. Progressive Depth
- **Rule**: 内容 MUST 由浅入深组织，每个主题先给出最简使用方式，再逐步展开高级用法
- **Rationale**: 不同水平的读者都能快速找到对自己有用的信息
- **Enforcement**: 每篇文档开头必须有快速入门段落

### 4. Bilingual Consistency
- **Rule**: 中英文内容 MUST 保持结构一致，中文为主要维护语言
- **Rationale**: 项目面向中文开发者为主，但需要保留英文版本的可维护性
- **Enforcement**: 翻译更新时检查结构对齐

## Technology Constraints

- VitePress 作为静态站点生成器，不可更换
- Markdown 为唯一内容格式（可嵌入 Vue 组件）
- Node.js 18+ 运行环境

## Quality Gates

- 所有内部链接有效（无死链）
- 代码示例可直接复制运行
- 每篇文档不超过合理阅读长度（建议 5-10 分钟阅读量）

---
_Principles are discovered from codebase patterns and team conventions._
_Update via `/yy:steering` when architectural decisions change._
_Compliance is automatically checked during spec-design and spec-tasks._

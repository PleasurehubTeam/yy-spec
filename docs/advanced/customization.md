# 自定义配置

> 30 秒了解：通过调整 steering 文件、模板和规则，让 yy-ai-workflow 适应你的团队习惯。

## Steering 定制

Steering 文件位于 `.yy-dev/steering/`，你可以直接编辑：

- `product.md` — 修正产品描述和核心能力
- `tech.md` — 补充技术栈细节和开发规范
- `structure.md` — 调整目录结构描述
- `principles.md` — 添加或修改架构原则

修改后运行 `/yy:steering` 可以让 AI 重新同步上下文。

## 模板定制

规格文档模板位于 `.yy-dev/settings/templates/specs/`：

- `requirements.md` — 需求文档模板
- `design.md` — 技术设计模板
- `tasks.md` — 任务计划模板

## 规则定制

生成规则位于 `.yy-dev/settings/rules/`：

- `ears-format.md` — 需求格式规则
- `design-principles.md` — 设计原则
- `tasks-generation.md` — 任务生成规则

## 下一步

- [分步工作流](./step-by-step) — 了解完整的分步流程
- [方法论](/methodology/) — 理解背后的方法论

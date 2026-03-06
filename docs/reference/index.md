# 命令参考

> 所有 yy-spec slash command 的完整列表。在 Claude Code 中以 `/yy:` 前缀输入使用。

## 安装

```bash
npx yy-spec@latest --lang zh
```

安装后，所有命令以 slash command 形式在 Claude Code 中可用。

## 自动工作流命令

| 命令 | 说明 |
|------|------|
| `/yy:feature "描述"` | 新功能开发（端到端自动完成） |
| `/yy:fix "描述"` | 已知 Bug 修复（TDD 驱动） |
| `/yy:investigate "描述"` | 问题调查（系统化排查） |
| `/yy:plan-exec [spec]` | 执行大型功能计划 |
| `/yy:steering` | 建立/同步项目上下文 |
| `/yy:status [spec]` | 查看规格状态和进度 |

## 分步工作流命令

| 命令 | 说明 |
|------|------|
| `/yy:spec-requirements <feature>` | 生成需求文档 |
| `/yy:spec-design <feature>` | 创建技术设计 |
| `/yy:spec-tasks <feature>` | 分解实现任务 |
| `/yy:spec-impl <feature>` | 执行实现任务 |

## 验证命令

| 命令 | 说明 |
|------|------|
| `/yy:validate-gap <feature>` | 需求与代码的差距分析 |
| `/yy:validate-design <feature>` | 设计质量审查 |
| `/yy:validate-impl <feature>` | 实现与规格一致性验证 |

## 常用参数

- `-y` — 自动确认上一阶段的审批，跳过确认步骤
- `<task-number>` — 指定执行的任务编号（如 `1.1` 或 `1,2,3`）

## 其他 AI 编码工具

yy-spec 支持多种 AI 编码工具，安装时通过参数指定：

```bash
npx yy-spec@latest --cursor       # Cursor IDE
npx yy-spec@latest --gemini       # Gemini CLI
npx yy-spec@latest --codex        # Codex CLI
npx yy-spec@latest --copilot      # GitHub Copilot
npx yy-spec@latest --windsurf     # Windsurf IDE
```

命令用法在所有工具中一致。

## 下一步

- [新项目工作流](/new-project/) — 从实际场景了解命令用法
- [分步工作流详解](/advanced/step-by-step) — 分步命令的详细说明

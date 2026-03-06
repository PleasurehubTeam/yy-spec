# 快速上手

> 30 秒了解：yy-spec 是一套安装在项目中的 AI 开发工作流，通过 Claude Code 等 AI 编码工具的 slash command 驱动，从需求到实现全程规格化。

## 安装

在项目根目录运行一次即可：

```bash
npx yy-spec@latest --lang zh
```

这会在你的项目中生成：
- `.claude/commands/yy/` — 所有 slash command 定义
- `.yy-dev/settings/` — 模板和规则配置
- `CLAUDE.md` — 项目级 AI 指令

## 支持的 AI 编码工具

```bash
npx yy-spec@latest --claude       # Claude Code（默认）
npx yy-spec@latest --cursor       # Cursor IDE
npx yy-spec@latest --gemini       # Gemini CLI
npx yy-spec@latest --codex        # Codex CLI
npx yy-spec@latest --copilot      # GitHub Copilot
npx yy-spec@latest --windsurf     # Windsurf IDE
```

## 最快的开始方式

安装完成后，在 Claude Code 对话中输入：

```
/yy:steering
```

AI 会分析你的项目，建立上下文。然后：

```
/yy:feature "我的第一个功能"
```

AI 会自动完成需求分析、技术设计、任务分解和代码实现。

## 我应该从哪里开始？

| 你的情况 | 从这里开始 |
|---------|-----------|
| 全新项目，从零开始 | [新项目工作流](/new-project/) |
| 已有代码库，想接入工具 | [已有项目工作流](/existing-project/) |
| 想了解背后的方法论 | [方法论](/methodology/) |
| 只想查命令怎么用 | [命令参考](/reference/) |

## 下一步

- [新项目：初始化](/new-project/init) — 详细的初始化步骤
- [了解 AI-DLC](/methodology/ai-dlc) — 理解 AI 驱动开发的完整流程

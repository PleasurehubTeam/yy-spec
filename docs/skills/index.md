# Skills 推荐

> Skills 是模块化的 AI 能力扩展包，为 AI 编码工具注入特定领域的专业知识、工作流和最佳实践。

## 什么是 Skill？

Skill 是一种标准化的知识包格式，安装后 AI 编码助手（如 Claude Code）会在相关场景自动调用，提供专业指导。

例如：安装了 `find-skills` 后，当你问 "有没有帮助写测试的工具？"，AI 会自动搜索并推荐合适的 skill。

## 如何安装 Skill

使用 Skills CLI 安装：

```bash
npx skills add <owner/repo@skill-name> -g -y
```

- `-g` — 全局安装（用户级别，所有项目可用）
- `-y` — 跳过确认提示

浏览所有可用 skill：[skills.sh](https://skills.sh/)

## 推荐列表

| Skill | 用途 |
|-------|------|
| [find-skills](./find-skills) | 搜索和发现新 skill |
| [Superpowers](./superpowers) | 完整的 AI 编码工作流框架（TDD、调试、审查、计划执行） |
| [agent-browser](./agent-browser) | 命令行浏览器自动化（比 MCP 更省 token） |

更多 skill 介绍持续更新中。

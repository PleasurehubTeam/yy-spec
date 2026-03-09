# Skills 推荐

> Skills 是模块化的 AI 能力扩展包，为 AI 编码工具注入特定领域的专业知识、工作流和最佳实践。

## 什么是 Skill？

Skill 是一种标准化的知识包格式，安装后 AI 编码助手（如 Claude Code）可以获得特定领域的专业知识和工作流。

**重要**：大部分 skill 不会自动生效。你需要在对话中**明确告诉 AI 使用对应的 skill**，AI 才会去调用。只有少数插件（如 [Superpowers](/plugins/superpowers)）安装后会自动介入。

每个 skill 的触发方式不同，具体看各自的文档。

## 如何安装 Skill

使用 Skills CLI 安装：

```bash
npx skills add <owner/repo@skill-name> -g -y
```

- `-g` — 全局安装（用户级别，所有项目可用）
- `-y` — 跳过确认提示

浏览所有可用 skill：[skills.sh](https://skills.sh/)

## 推荐列表

| Skill | 用途 | 触发方式 |
|-------|------|---------|
| [find-skills](./find-skills) | 搜索和发现新 skill | 需要你说"找一个 XX 的 skill" |
| [agent-browser](./agent-browser) | 命令行浏览器自动化 | 需要你说"用 agent-browser 看看页面" |
| [skill-creator](./skill-creator) | 创建自己的 skill | 需要你说"帮我创建一个 skill" |

更多 skill 介绍持续更新中。

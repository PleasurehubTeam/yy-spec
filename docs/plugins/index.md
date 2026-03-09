# Plugin 推荐

> Plugin 是 Claude Code 的扩展包机制 — 一个 plugin 可以同时打包 skill、MCP server、slash command 和 hook，一次安装即可获得完整能力。

## 什么是 Plugin？

Plugin 是 Claude Code 原生支持的 npm 包扩展机制。每个 plugin 可以包含以下任意组合：

- **Skills** — 注入领域知识和工作流
- **MCP Servers** — 连接外部工具和服务
- **Slash Commands** — 自定义 `/命令`
- **Hooks** — 在特定事件时自动执行操作

## Plugin vs Skill vs MCP

| 维度 | Plugin | Skill | MCP |
|------|--------|-------|-----|
| 本质 | 打包分发机制 | 知识文件 | 工具连接协议 |
| 类比 | App Store 上的应用 | 一本说明书 | 一个硬件接口 |
| 安装方式 | `claude plugin add` | `npx skills add` | `claude mcp add` |
| 可包含 | skill + MCP + command + hook | 仅知识文本 | 仅工具能力 |
| 分发格式 | npm 包 | Git 仓库 | 命令行进程 |

**简单来说**：Plugin 是更高层的打包格式，可以把 skill 和 MCP server 组合在一起一键安装。

## 如何安装 Plugin

```bash
claude plugin add <npm-package-name>
```

例如安装 Superpowers 插件：

```bash
claude plugin add @anthropic/claude-code-superpowers
```

查看已安装的 plugin：

```bash
claude plugin list
```

移除 plugin：

```bash
claude plugin remove <npm-package-name>
```

## 推荐列表

| Plugin | 用途 | 包含能力 |
|--------|------|---------|
| Superpowers | AI 编码工作流框架（头脑风暴、TDD、调试、代码审查等） | Skills + Hooks |
| Sentry | Sentry 错误追踪集成 | MCP + Skills |
| PostHog | PostHog 产品分析集成 | MCP + Skills |
| Stripe | Stripe 支付集成辅助 | Skills |
| Figma | Figma 设计稿转代码 | Skills |

更多 plugin 介绍持续更新中。

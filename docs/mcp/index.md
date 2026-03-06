# MCP 推荐

> MCP（Model Context Protocol）是 AI 编码工具连接外部能力的标准协议 — 让 AI 不只能读写代码，还能操作浏览器、查数据库、调用 API。

## 什么是 MCP？

MCP 是一个开放协议，定义了 AI 工具与外部服务之间的通信方式。你可以把它理解为 AI 的"插头标准"：

- **没有 MCP**：AI 只能读写本地文件、运行终端命令
- **有了 MCP**：AI 可以打开浏览器、查询数据库、调用第三方 API、操作云服务……

每个 MCP Server 就是一个"适配器"，把某个外部能力接入 AI。

## MCP 与 Skill 的区别

| 维度 | MCP | Skill |
|------|-----|-------|
| 本质 | 工具连接（给 AI 新能力） | 知识注入（教 AI 新方法） |
| 类比 | 给手机装新硬件（摄像头、传感器） | 给手机装新 App |
| 举例 | Playwright MCP = AI 能操作浏览器 | TDD Skill = AI 懂得先写测试 |
| 运行方式 | 独立进程，通过协议通信 | 文本文件，加载到 AI 上下文中 |

两者互补：MCP 提供能力，Skill 提供方法。

## 如何添加 MCP Server

在 Claude Code 中：

```bash
claude mcp add <名称> <命令> [参数...]
```

例如添加 Playwright：

```bash
claude mcp add playwright npx @playwright/mcp@latest
```

添加后 AI 就拥有了该 MCP Server 提供的工具。但 AI 不会自动使用 — 你需要在对话中**明确要求 AI 执行相关操作**，它才会调用对应的 MCP 工具。

## 推荐列表

| MCP Server | 用途 |
|------------|------|
| [Playwright](/mcp/playwright) | 浏览器自动化（网页操作、测试、截图） |

更多 MCP Server 介绍持续更新中。

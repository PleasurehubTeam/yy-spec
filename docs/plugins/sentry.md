# Sentry

> 让 AI 直接查看、分析和处理 Sentry 中的错误 — 不用切出编辑器就能完成从发现问题到修复代码的全过程。

## 解决什么问题？

传统排查线上错误的流程：

1. 打开 Sentry 网页，找到报错
2. 复制错误信息，切回编辑器
3. 手动定位代码，猜测原因
4. 修复后再回 Sentry 确认

装了 Sentry 插件后，这一切都在 Claude Code 里完成 — **你说"看看线上有什么报错"，AI 就能直接查、直接分析、直接改代码。**

## 安装与验证

### 第一步：安装插件

```bash
/plugin install sentry
```

安装完成后**重启 Claude Code**。

### 第二步：验证 MCP 连接

重启后，先确认 Sentry MCP Server 已正常加载：

```
你：/mcp
```

在输出的 MCP Server 列表中应该能看到 `sentry`。如果没有，手动添加：

```bash
claude mcp add --transport http sentry https://mcp.sentry.dev/mcp
```

### 第三步：验证能用

```
你：/getIssues
```

如果能正常返回错误列表，说明一切就绪。如果提示认证失败，按 Sentry OAuth 提示完成登录授权。

### 前置条件

- **Sentry 账号**：需要有 Sentry 项目和对应权限
- **GitHub CLI**（可选）：如果要用 PR 代码审查功能，需要安装并认证 `gh`：
  ```bash
  brew install gh && gh auth login
  ```

## 插件提供什么

Sentry 插件包含三类能力：

### MCP 工具 — AI 可直接调用的 Sentry API

| 工具 | 用途 |
|------|------|
| `search_issues` | 搜索错误 |
| `get_issue_details` | 查看错误详情（堆栈、上下文、标签） |
| `search_events` | 搜索事件记录 |
| `get_trace_details` | 查看完整调用链路（Tracing） |
| `analyze_issue_with_seer` | 用 Seer AI 分析错误根因 |
| `find_projects` / `find_releases` | 查看项目和发布版本信息 |
| `update_issue` | 更新错误状态（标记已解决等） |
| `search_docs` / `get_doc` | 查询 Sentry 官方文档 |

### Slash 命令 — 你主动触发

| 命令 | 用途 |
|------|------|
| `/seer <问题>` | 用自然语言提问 Sentry 数据 |
| `/getIssues [项目名]` | 获取最近 10 条错误 |

### Skills — AI 在合适时机自动使用

| Skill | 用途 |
|-------|------|
| `sentry-code-review` | 分析 GitHub PR 上的 Sentry Bot 评论并自动修复 |
| `sentry-setup-tracing` | 给项目配置性能监控 |
| `sentry-setup-logging` | 给项目配置结构化日志 |
| `sentry-setup-metrics` | 给项目配置自定义指标 |
| `sentry-setup-ai-monitoring` | 给项目配置 AI Agent 监控 |

### Sub-Agent — AI 自动调度

| Agent | 用途 |
|-------|------|
| `issue-summarizer` | 并行分析多个错误，生成影响评估、根因分析和优先级报告 |

## 日常使用场景

### 场景一：每日巡检 — 看看线上有什么报错

最常用的入口。每天开工或发版后，先看看有没有新问题：

```
你：/getIssues my-project
```

AI 返回最近 10 条错误，包含标题、影响用户数、事件数量和 Sentry 链接。

想要更灵活的查询，用 `/seer`：

```
你：/seer 过去 24 小时 web-app 项目有什么 critical 错误？
你：/seer 哪些错误影响的用户最多？
你：/seer api-gateway 的请求延迟怎么样？
```

`/seer` 支持自然语言，你怎么问都行。

### 场景二：定位修复 — 某个错误要修

发现一个具体错误，想让 AI 帮你修：

```
你：分析一下 PROJ-1234 这个 Sentry 错误，找到原因并修复

AI：[调用 get_issue_details] 获取错误详情...
    错误发生在 src/api/users.ts:42
    TypeError: Cannot read property 'id' of undefined

    根因：用户未登录时 session 为 null，但代码直接访问了 session.user.id
    影响：320 个用户触发，最近 1 小时有 89 次

    [修改 src/api/users.ts] 添加空值检查
    [调用 update_issue] 已在 Sentry 标记为已解决
```

### 场景三：批量分析 — 了解整体健康状况

项目错误太多，想搞清楚优先级：

```
你：分析一下 my-project 最近的错误，哪些最紧急？
```

AI 会自动调度 `issue-summarizer` 子代理，并行获取多个错误的详情，然后输出：

- 按严重程度分级的错误清单
- 每个错误的影响用户数和趋势
- 根因分析和修复优先级建议
- 是否有多个错误指向同一个根因

### 场景四：PR 代码审查 — 修复 Sentry Bot 发现的问题

Sentry Bot 会在 GitHub PR 上留评论，指出代码中的潜在问题。让 AI 自动处理：

```
你：Review PR #118 and fix the Sentry comments
```

AI 会自动使用 `sentry-code-review` skill：

1. 通过 `gh` CLI 获取 PR 上 Sentry Bot 的评论
2. 解析每条评论的严重级别（CRITICAL / HIGH / MEDIUM / LOW）和置信度
3. 逐个验证问题是否仍存在
4. 对确认存在的问题实施修复
5. 输出修复报告（已修复 / 需人工审查）

::: tip 前提
这个场景需要 GitHub CLI（`gh`）已安装并认证。
:::

### 场景五：项目接入 — 给新项目配置 Sentry

刚开始用 Sentry，或者要给项目加新的监控能力：

```
你：给我的 Next.js 项目配置 Sentry Tracing
你：给项目加上 Sentry 的结构化日志
你：配置 Sentry 自定义指标来追踪订单转化率
```

AI 会使用对应的 setup skill，自动检测你的框架和项目结构，生成正确的配置代码。

## 使用技巧

### /seer 查询技巧

- **说清项目名**：`/seer web-app 项目最近有什么错误` 比 `最近有什么错误` 更精准
- **指定时间范围**：`过去 1 小时` / `最近 24 小时` / `上次发版之后`
- **可以追问**：先问大面，再针对某个错误深入
- **支持性能查询**：不只是错误，还能问延迟、吞吐量、慢查询

### 日常推荐工作流

```
1. /getIssues my-project          ← 开工先看看
2. /seer 哪些错误影响用户最多？     ← 确定优先级
3. 分析一下 PROJ-xxx 并修复        ← 逐个处理
4. PR 提交后让 Sentry Bot 审查     ← 防止引入新问题
```

## 故障排查

| 问题 | 解决方法 |
|------|---------|
| `/mcp` 看不到 sentry | 手动添加：`claude mcp add --transport http sentry https://mcp.sentry.dev/mcp`，然后重启 |
| `/getIssues` 报认证错误 | 重新完成 Sentry OAuth 认证 |
| PR 审查功能不可用 | 安装并认证 GitHub CLI：`brew install gh && gh auth login` |
| 命令不存在 | 确认插件已安装（`/plugin list`），然后重启 Claude Code |

## 下一步

- [Plugin 推荐列表](./) — 查看更多 Plugin
- [Superpowers](/plugins/superpowers) — AI 编码工作流框架

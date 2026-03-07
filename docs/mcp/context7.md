# Context7

> 让 AI 查到最新的库文档 — 不再用过时的 API，不再编造不存在的方法。

## 解决什么问题？

AI 的训练数据有截止日期。当你问"怎么用 Next.js 15 的 middleware"，AI 可能给你 Next.js 13 的写法，甚至编造一个根本不存在的 API。

Context7 解决这个问题：它让 AI 能实时查询库的官方文档，拿到最新、版本正确的代码示例。

**没装之前**：
```
你：用 Supabase 实现认证
AI：（给你一段半年前的写法，某个方法已经废弃了）
```

**装了之后**：
```
你：用 Supabase 实现认证，use context7
AI：（查询 Supabase 最新文档，给你当前版本的正确写法）
```

## 安装

先去 [context7.com/dashboard](https://context7.com/dashboard) 免费获取 API Key，然后：

```bash
claude mcp add --scope user context7 -- npx -y @upstash/context7-mcp --api-key YOUR_API_KEY
```

或者用远程模式（不需要本地跑 Node）：

```bash
claude mcp add --scope user --header "CONTEXT7_API_KEY: YOUR_API_KEY" --transport http context7 https://mcp.context7.com/mcp
```

## 怎么触发？

在你的提示词末尾加上 **`use context7`**：

```
用 Next.js 15 写一个 middleware，检查 JWT cookie，未登录跳转到 /login。use context7
```

AI 会先查 Next.js 15 的最新文档，然后基于真实的 API 来写代码。

### 指定具体的库

如果你知道要查哪个库，可以直接指定：

```
用 Supabase 做认证。use library /supabase/supabase
```

这样跳过搜索步骤，直接查对应库的文档，更快。

### 设置自动触发

如果你不想每次都手动加 `use context7`，可以在项目的 `CLAUDE.md` 或规则文件里加一条：

```markdown
当需要查询第三方库的用法时，自动使用 context7 查询最新文档。
```

这样 AI 在判断需要查文档时会自动调用。

## 什么时候该用？

- 用到的库**最近有大版本更新**（Next.js 14→15、React 18→19）
- AI 给的代码**跑不通**，怀疑 API 过时了
- 用到**不太热门的库**，AI 训练数据里可能覆盖不够
- 需要**版本特定**的写法（"我用的是 Vue 3，不是 Vue 2"）

## 什么时候不需要？

- 基础语法（JS/Python/Rust 语法不会过时）
- 非常成熟稳定的 API（Node.js fs、Python os）
- 你已经知道怎么写，只是让 AI 帮忙码字

## 下一步

- [MCP 推荐列表](./) — 查看更多 MCP Server
- [Playwright](/mcp/playwright) — 浏览器自动化

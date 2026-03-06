# find-skills

> 搜索和发现 AI skill 的入口工具 — 当你不确定是否有现成的 skill 可用时，先问它。

## 安装

```bash
npx skills add anthropic/find-skills -g -y
```

安装后无需手动调用，AI 会在合适的场景自动触发。

## 什么时候会触发？

当你在 Claude Code 中表达以下意图时，find-skills 会自动介入：

- "有没有帮我做 X 的工具？"
- "找一个关于 X 的 skill"
- "我想扩展 AI 的能力"
- "有没有专门做设计/测试/部署的 skill？"

简单来说，只要你在寻找某种能力扩展，它就会帮你搜索。

## 工作流程

### 1. 描述需求

直接用自然语言告诉 AI 你需要什么：

```
我想让 AI 帮我做 React 性能优化
```

### 2. AI 自动搜索

find-skills 会调用 Skills CLI 搜索匹配的 skill：

```bash
npx skills find react performance
```

### 3. 查看结果

AI 会展示搜索结果，包含：
- Skill 名称和功能描述
- 安装命令
- 详情链接

### 4. 一键安装

确认后，AI 直接帮你安装：

```bash
npx skills add vercel-labs/agent-skills@vercel-react-best-practices -g -y
```

## 手动搜索

你也可以直接在终端使用 Skills CLI：

```bash
# 交互式搜索
npx skills find

# 关键词搜索
npx skills find react testing

# 浏览所有 skill
# https://skills.sh/
```

## 常用搜索关键词

| 领域 | 推荐关键词 |
|------|-----------|
| Web 开发 | react, nextjs, typescript, css, tailwind |
| 测试 | testing, jest, playwright, e2e |
| DevOps | deploy, docker, kubernetes, ci-cd |
| 文档 | docs, readme, changelog, api-docs |
| 代码质量 | review, lint, refactor, best-practices |
| 设计 | ui, ux, design-system, accessibility |
| 效率工具 | workflow, automation, git |

## 其他 Skills CLI 命令

```bash
# 检查已安装 skill 的更新
npx skills check

# 更新所有 skill
npx skills update

# 创建自己的 skill
npx skills init my-skill
```

## 下一步

- [Skills 推荐列表](./) — 查看更多推荐 skill

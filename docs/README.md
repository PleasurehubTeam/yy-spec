# yy-ai-workflow docs

AI 开发者工具文档与知识平台 — 工具使用指南、AI 驱动开发方法论。

## 在线访问

https://pleasurehubteam.github.io/yy-spec/

## 内容结构

| 栏目 | 内容 |
|------|------|
| **Plugin 推荐** | Claude Code 插件使用指南（Superpowers、Sentry 等） |
| **Skills 推荐** | AI 编码能力扩展包（find-skills、agent-browser、skill-creator） |
| **MCP 推荐** | AI 外部工具连接（Playwright、Context7） |
| **yy-spec** | 规格驱动开发工具 — 从需求到实现的完整工作流 |
| **方法论** | AI-DLC（AI 开发生命周期）和规格驱动开发的理论基础 |

## 本地开发

```bash
cd docs
npm install
npm run dev
```

访问 http://localhost:5173/yy-spec/

## 部署

Push 到 `main` 分支后自动部署到 GitHub Pages（通过 `.github/workflows/deploy-docs.yml`）。

仅当 `docs/` 目录下有文件变更时触发。也可在 GitHub Actions 页面手动触发（workflow_dispatch）。

## 技术栈

- [VitePress](https://vitepress.dev/) — 静态站点生成
- GitHub Pages — 托管
- GitHub Actions — CI/CD

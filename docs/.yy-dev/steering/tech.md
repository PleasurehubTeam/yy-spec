# Technology Stack

## Architecture

VitePress 静态站点生成器，Markdown 驱动的文档站。内容即代码，所有文档以 Markdown 文件形式管理。

## Core Technologies

- **Framework**: VitePress（基于 Vue 3 + Vite）
- **Content**: Markdown / MDX
- **Language**: 简体中文为主，英文为辅

## Key Libraries

- VitePress — 静态站点生成与主题系统
- Vue 3 — 自定义组件（如需）

## Development Standards

### Content Quality
- 面向零基础读者，语言通俗易懂
- 由浅入深的内容组织
- 以应用场景作为内容分类维度

### Code Quality
- Markdown lint 保证文档格式一致性
- 内部链接有效性检查

## Development Environment

### Required Tools
- Node.js 18+
- pnpm / npm

### Common Commands
```bash
# Dev: npx vitepress dev
# Build: npx vitepress build
# Preview: npx vitepress preview
```

## Key Technical Decisions

- **VitePress over alternatives**: 与 yy-spec 的 Vue/Node 技术栈一致，支持 Markdown 扩展和 Vue 组件嵌入
- **场景驱动组织**: 不按功能模块分类，而按用户实际使用场景组织文档
- **中文优先**: 主要用户群为中文开发者

---
_Document standards and patterns, not every dependency_

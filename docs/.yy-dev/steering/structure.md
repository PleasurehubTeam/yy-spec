# Project Structure

## Organization Philosophy

场景驱动（Scenario-first）— 按读者的使用场景组织内容，而非按工具内部模块。内容由浅入深，新手友好。

## Directory Patterns

### 文档内容
**Location**: VitePress 默认内容目录（待建立）
**Purpose**: 所有 Markdown 文档内容
**Pattern**: 按场景/主题分目录，每个场景一个独立章节

### 公共资源
**Location**: `public/`
**Purpose**: 图片、静态资源
**Pattern**: 按所属章节组织

### VitePress 配置
**Location**: `.vitepress/`
**Purpose**: 站点配置、主题定制、导航和侧边栏配置

### 规格管理
**Location**: `.yy-dev/`
**Purpose**: AI 开发工作流的规格和 steering 文件
**Note**: 不纳入文档站内容，仅用于开发过程管理

## Naming Conventions

- **Files**: kebab-case（如 `command-reference.md`、`quick-start.md`）
- **Directories**: kebab-case（如 `getting-started/`、`advanced-usage/`）
- **Images**: kebab-case，带描述性前缀（如 `workflow-feature-flow.png`）

## Content Organization Principles

- 每篇文档聚焦一个场景或主题
- 开头有简明摘要，末尾有"下一步"引导
- 代码示例必须可直接复制运行
- 交叉引用使用相对链接

---
_Document patterns, not file trees. New files following patterns shouldn't require updates_

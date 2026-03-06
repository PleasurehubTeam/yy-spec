# 初始化新项目

> 30 秒了解：新项目的第一步是安装 yy-spec 并建立项目上下文（Steering），让 AI 理解你的项目结构、技术栈和约定。

## 前提条件

- Node.js 18 或更高版本
- Claude Code（或其他支持的 AI 编码工具）

## 第一步：安装 yy-spec

在项目根目录运行：

```bash
npx yy-spec@latest --lang zh
```

这会生成 `.claude/commands/yy/` 和 `.yy-dev/` 目录，包含所有命令和配置。

## 第二步：建立项目上下文

在 Claude Code 中输入：

```
/yy:steering
```

AI 会自动分析你的项目，生成以下上下文文件：

- `product.md` — 产品定位和核心能力
- `tech.md` — 技术栈和开发规范
- `structure.md` — 项目结构和命名约定
- `principles.md` — 架构原则和约束

这些文件保存在 `.yy-dev/steering/` 目录下。

## 第三步：验证

检查 `.yy-dev/steering/` 下的文件，确认内容准确反映了你的项目。如有偏差，直接编辑或重新运行 `/yy:steering`。

## 下一步

- [开发新功能](./feature) — 开始第一个功能开发
- [修复 Bug](./fix-bug) — 遇到问题时的修复流程

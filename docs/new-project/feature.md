# 新项目：开发新功能

> 30 秒了解：在 Claude Code 中用一条 slash command 启动完整的功能开发流程 — 从需求分析到代码实现，AI 全程辅助。

## 自动工作流（推荐）

最简单的方式，在 Claude Code 中输入：

```
/yy:feature "用户登录功能"
```

AI 会自动完成：
1. 创建规格目录
2. 生成需求文档
3. 创建技术设计
4. 分解实现任务
5. 逐步执行实现
6. 代码审查和变更记录

## 分步工作流

需要更精细控制时，在 Claude Code 中逐步执行：

```
/yy:spec-requirements login       # 生成需求
/yy:spec-design login -y          # 创建设计
/yy:spec-tasks login -y           # 分解任务
/yy:spec-impl login 1.1           # 逐个实现
```

## 什么时候用哪个？

| 场景 | 推荐方式 |
|------|---------|
| 功能明确，想快速完成 | `/yy:feature` 自动工作流 |
| 需求复杂，想逐步审核 | 分步 slash command |
| 探索性开发，边做边想 | 分步 slash command |

## 下一步

- [修复 Bug](./fix-bug) — Bug 修复有专门的工作流
- [调查问题](./investigate) — 不确定原因时先调查

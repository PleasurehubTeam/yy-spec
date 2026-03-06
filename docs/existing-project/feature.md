# 已有项目：开发新功能

> 30 秒了解：在已有代码库上开发新功能时，AI 会考虑现有架构，确保新代码与现有代码风格一致。

## 推荐流程

已有项目建议使用分步工作流，便于在每个阶段审核 AI 的理解是否准确：

```
# 1. 生成需求
/yy:spec-requirements user-auth

# 2. 分析现有代码与需求的差距（推荐）
/yy:validate-gap user-auth

# 3. 创建技术设计（基于 gap analysis 结果）
/yy:spec-design user-auth -y

# 4. 分解任务
/yy:spec-tasks user-auth -y

# 5. 逐个实现
/yy:spec-impl user-auth 1.1
```

## 为什么推荐分步工作流？

在已有项目中，AI 可能对现有架构的理解不完全准确。分步流程让你可以：

- **需求阶段**：确认 AI 理解了业务需求
- **Gap Analysis**：确认 AI 找到了正确的现有代码
- **设计阶段**：确认新功能与现有架构兼容
- **任务阶段**：确认任务拆分合理，不会破坏现有功能

## 也可以用自动工作流

如果你对项目很熟悉，确认 steering 准确：

```
/yy:feature "用户认证模块"
```

## 下一步

- [修复 Bug](./fix-bug) — Bug 修复流程
- [接入已有项目](./onboarding) — 如果还没初始化 steering

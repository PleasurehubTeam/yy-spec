# 进阶用法

> 30 秒了解：掌握分步工作流、自定义配置和验证工具，更精细地控制 AI 开发流程。

## 分步工作流

当你需要逐阶段控制时：

```bash
/yy:spec-requirements <feature>   # 生成需求
/yy:spec-design <feature>         # 创建设计
/yy:spec-tasks <feature>          # 分解任务
/yy:spec-impl <feature>           # 执行实现
```

## 验证工具

确保规格文档之间的一致性：

```bash
/yy:validate-gap <feature>        # 需求与代码的差距分析
/yy:validate-design <feature>     # 设计质量审查
/yy:validate-impl <feature>       # 实现与规格的一致性
```

## 下一步

- [分步工作流详解](./step-by-step) — 每个阶段的详细说明
- [自定义配置](./customization) — 模板、规则和 steering 定制

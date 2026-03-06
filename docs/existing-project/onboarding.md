# 接入已有项目

> 30 秒了解：在已有代码库中安装 yy-spec 后运行 steering，AI 会自动分析项目结构、技术栈和约定，生成项目上下文。

## 第一步：安装

在项目根目录运行：

```bash
npx yy-spec@latest --lang zh
```

## 第二步：建立项目上下文

在 Claude Code 中输入：

```
/yy:steering
```

AI 会自动分析：
- 项目目录结构和文件组织方式
- 技术栈（框架、语言、依赖）
- 代码风格和命名约定
- 现有的架构模式

生成的上下文文件保存在 `.yy-dev/steering/` 目录下。

## 第三步：审核和调整

仔细检查生成的 steering 文件，特别是：
- `principles.md` 中的架构原则是否准确
- `tech.md` 中的技术栈是否完整
- `structure.md` 中的目录结构描述是否正确

如有偏差，直接编辑文件或重新运行 `/yy:steering`。

## 配合 Gap Analysis

在已有项目上开发新功能时，建议先运行 gap analysis：

```
/yy:validate-gap <feature-name>
```

这会分析现有代码与新需求之间的差距，帮助设计阶段更准确。

## 下一步

- [开发新功能](./feature) — 在已有项目上添加功能
- [修复 Bug](./fix-bug) — 修复已有代码中的问题

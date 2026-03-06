# agent-browser

> 给 AI 一个浏览器 — 你说"帮我看看页面"，AI 就能真的打开浏览器去看。

## 这是什么？

agent-browser 是 Vercel 团队开源的浏览器自动化工具。安装后，AI 可以像真人一样操作浏览器：打开网页、点击按钮、填表单、截图、看控制台报错。

你不需要学任何命令 — 只需要用自然语言告诉 AI 你想做什么，它会自己调用 agent-browser 来执行。

## 安装

两步：

```bash
# 1. 安装工具
npm install -g agent-browser
agent-browser install

# 2. 安装 Skill（让 AI 知道怎么用）
npx skills add vercel-labs/agent-browser
```

## 你能用它做什么

### "帮我看看首页长什么样"

AI 会打开浏览器，导航到页面，截图给你看，然后描述页面内容和可能的问题。

### "测试一下登录流程"

AI 会打开登录页，输入测试账号，点提交，然后告诉你结果 — 成功了还是报错了，报了什么错。

### "注册表单填个错误邮箱看看有没有校验"

AI 会填入无效邮箱，提交，然后检查有没有正确的错误提示。

### "看看控制台有没有报错"

AI 会打开页面，读取控制台日志，列出所有错误和警告。

### "对比一下 staging 和 production 的页面差异"

AI 会分别打开两个环境的页面，做快照对比，告诉你哪些地方不一样。

### "帮我走一遍完整的购买流程"

AI 会从商品列表开始，加入购物车，填写地址，完成支付，验证每一步是否正常。

### "在手机尺寸下看看这个页面"

AI 会模拟 iPhone 视口，重新加载页面，截图让你看移动端效果。

## 和 Playwright MCP 怎么选？

两个工具做的事情一样，但方式不同：

| | agent-browser | [Playwright MCP](/mcp/playwright) |
|---|---|---|
| 安装方式 | CLI + Skill | MCP Server |
| 省 token | 更省 — 不占上下文 | 33 个工具 schema 常驻上下文 |
| 适合场景 | AI 主要在写代码，偶尔需要看浏览器 | AI 主要在做浏览器自动化 |

**推荐**：如果你主要用 AI 写代码，偶尔需要它打开浏览器看看效果，选 agent-browser。如果你的主要工作就是浏览器自动化测试，选 Playwright MCP。

两个可以同时装，不冲突。

## 安全相关

agent-browser 提供了安全限制选项，适合在生产环境或 CI 中使用：

- **域名白名单** — 限制 AI 只能访问指定网站
- **密码保险库** — 本地加密存储凭据，AI 看不到明文密码
- **操作确认** — 敏感操作需要你手动确认

详见 [GitHub 仓库](https://github.com/vercel-labs/agent-browser)。

## 下一步

- [Playwright MCP](/mcp/playwright) — MCP 方式的浏览器自动化
- [Skills 推荐列表](./) — 查看更多推荐 skill

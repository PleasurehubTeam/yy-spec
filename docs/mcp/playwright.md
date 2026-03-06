# Playwright MCP

> 让 AI 能操作浏览器 — 打开网页、点击按钮、填写表单、截图、跑端到端测试。

## 这是什么？

Playwright MCP 是微软官方出品的 MCP Server，基于 [Playwright](https://playwright.dev/) 浏览器自动化框架。装了之后，AI 可以像真人一样操作浏览器。

你不需要学任何 API — 只需要用自然语言告诉 AI 你想做什么，它会自己调用 Playwright 来执行。

## 安装

一行命令：

```bash
claude mcp add playwright npx @playwright/mcp@latest
```

搞定。不需要额外安装浏览器 — Playwright 会自动管理。

### 系统要求

- Node.js 18+

## 你能用它做什么

### "帮我看看首页长什么样"

AI 会打开浏览器，导航到你的页面，截图或读取页面结构，然后描述看到了什么、有没有问题。

### "测试一下登录流程"

AI 会打开登录页，输入测试账号密码，点提交，然后告诉你结果 — 是跳转到了首页，还是报了什么错。

### "注册表单填个错误邮箱，看看有没有校验"

AI 会在邮箱框里填入 "不是邮箱"，点提交，然后检查页面是否正确显示了错误提示。

### "看看有没有 JS 报错"

AI 会打开页面，读取浏览器控制台输出，列出所有错误和警告。

### "登录的时候看看发了什么请求"

AI 会监听网络请求，完成登录操作，然后告诉你发了什么请求、参数是什么、响应是什么。

### "帮我走一遍完整的购买流程"

AI 会从浏览商品开始，加入购物车，填写地址，完成支付，验证每一步是否正常。

### "在手机尺寸下看看这个页面"

AI 会模拟移动设备视口，重新加载页面，截图让你看效果。

## 两种工作模式

### Snapshot 模式（默认）

AI 通过页面的结构化数据（无障碍树）来理解内容，不需要"看"截图。快、省 token、精确。

**绝大多数场景用这个就够了。**

### Vision 模式

AI 通过截图来理解页面，用坐标点击。适合处理 Canvas、地图、图表等无障碍树无法描述的内容。

启用方式：

```bash
claude mcp add playwright npx @playwright/mcp@latest --caps vision
```

## 常用配置

大多数情况下不需要额外配置。以下是一些可能用到的选项：

```bash
# 不弹出浏览器窗口（后台运行）
claude mcp add playwright npx @playwright/mcp@latest --headless

# 指定浏览器
claude mcp add playwright npx @playwright/mcp@latest --browser firefox

# 模拟移动设备
claude mcp add playwright npx @playwright/mcp@latest --device "iPhone 15"

# 忽略 HTTPS 错误（开发环境自签名证书）
claude mcp add playwright npx @playwright/mcp@latest --ignore-https-errors

# 限制只能访问特定网站
claude mcp add playwright npx @playwright/mcp@latest --allowed-origins "localhost,*.mycompany.com"
```

完整配置项见 [GitHub 仓库](https://github.com/microsoft/playwright-mcp)。

## 和 agent-browser 怎么选？

两个工具做的事情一样，但方式不同：

| | Playwright MCP | [agent-browser](/skills/agent-browser) |
|---|---|---|
| 安装方式 | MCP Server | CLI + Skill |
| 省 token | 33 个工具 schema 常驻上下文 | 更省 — 不占上下文 |
| 适合场景 | AI 主要在做浏览器自动化 | AI 主要在写代码，偶尔看浏览器 |

**推荐**：如果你的工作大量涉及浏览器操作（测试、爬取、自动化），选 Playwright MCP。如果只是偶尔让 AI 看看页面效果，选 agent-browser 更省 token。

两个可以同时装，不冲突。

## 下一步

- [agent-browser](/skills/agent-browser) — CLI 方式的浏览器自动化
- [MCP 推荐列表](./) — 查看更多 MCP Server

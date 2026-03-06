# Playwright MCP

> 让 AI 能操作浏览器 — 打开网页、点击按钮、填写表单、截图、跑端到端测试，全部通过自然语言指挥。

## 这是什么？

Playwright MCP 是微软官方出品的 MCP Server，基于 [Playwright](https://playwright.dev/) 浏览器自动化框架。装了之后，AI 就多了一双"手"，可以像真人一样操作浏览器。

**没装之前**，你只能这样：
```
你：帮我检查一下登录页面的样式
AI：我没法打开浏览器，你截个图给我看看？
```

**装了之后**，你可以这样：
```
你：帮我检查一下登录页面的样式
AI：[打开浏览器] [导航到登录页] [截图] 我看到了，标题字号偏小，建议改成 24px...
```

## 安装

一行命令：

```bash
claude mcp add playwright npx @playwright/mcp@latest
```

搞定。不需要额外安装浏览器 — Playwright 会自动管理。

如果需要手动安装浏览器（比如在 CI 环境）：

```bash
npx playwright install
```

### 系统要求

- Node.js 18+
- 支持 macOS、Windows、Linux

## 两种工作模式

### Snapshot 模式（默认，推荐）

AI 通过**无障碍树（Accessibility Tree）**来理解页面内容，而不是看截图。

```
页面 HTML → 无障碍树 → AI 理解页面结构 → 发出操作指令
```

**优点**：
- 快 — 不需要处理图片
- 省 token — 结构化文本比图片小得多
- 准 — 通过元素引用（ref）精确定位，不会点错
- 不需要视觉模型

**工作原理**：

AI 调用 `browser_snapshot` 工具后，会得到类似这样的结构化数据：

```
- navigation "主导航"
  - link "首页" [ref=1]
  - link "产品" [ref=2]
  - link "关于" [ref=3]
- main
  - heading "欢迎使用" [level=1]
  - textbox "搜索..." [ref=4]
  - button "搜索" [ref=5]
```

然后 AI 说"点击 ref=5"就能精确点到搜索按钮。

### Vision 模式（可选）

启用后 AI 通过截图来理解页面，用坐标操作。适合需要判断视觉效果的场景。

启用方式 — 安装时加参数：

```bash
claude mcp add playwright npx @playwright/mcp@latest --caps vision
```

Vision 模式额外提供坐标操作工具（如 `browser_mouse_click_xy`），适合处理 Canvas、地图等无障碍树无法描述的内容。

## 完整工具列表

装完 Playwright MCP 后，AI 可以使用以下 33 个工具：

### 导航

| 工具 | 做什么 |
|------|--------|
| `browser_navigate` | 打开指定 URL |
| `browser_navigate_back` | 返回上一页 |
| `browser_tabs` | 查看所有标签页 |

### 页面交互

| 工具 | 做什么 |
|------|--------|
| `browser_click` | 点击元素 |
| `browser_type` | 在输入框中输入文字 |
| `browser_fill_form` | 一次性填写多个表单字段 |
| `browser_select_option` | 选择下拉选项 |
| `browser_hover` | 鼠标悬停 |
| `browser_drag` | 拖拽元素 |
| `browser_press_key` | 按键（Enter、Tab、Escape 等） |
| `browser_file_upload` | 上传文件 |
| `browser_handle_dialog` | 处理弹窗（alert、confirm、prompt） |

### 页面信息

| 工具 | 做什么 |
|------|--------|
| `browser_snapshot` | 获取页面无障碍树快照 |
| `browser_take_screenshot` | 截图 |
| `browser_console_messages` | 查看控制台日志 |
| `browser_network_requests` | 查看网络请求 |

### 高级操作

| 工具 | 做什么 |
|------|--------|
| `browser_evaluate` | 在页面中执行 JavaScript |
| `browser_run_code` | 执行 Playwright 脚本 |
| `browser_resize` | 调整浏览器窗口大小 |
| `browser_wait_for` | 等待某个条件满足 |
| `browser_close` | 关闭页面 |
| `browser_install` | 安装浏览器 |

### 测试断言

| 工具 | 做什么 |
|------|--------|
| `browser_generate_locator` | 生成元素定位器 |
| `browser_verify_text_visible` | 验证文本是否可见 |
| `browser_verify_element_visible` | 验证元素是否可见 |
| `browser_verify_list_visible` | 验证列表是否可见 |
| `browser_verify_value` | 验证表单值 |

### Vision 模式额外工具

以下工具需要启用 `--caps vision`：

| 工具 | 做什么 |
|------|--------|
| `browser_mouse_click_xy` | 点击指定坐标 |
| `browser_mouse_move_xy` | 移动鼠标到坐标 |
| `browser_mouse_drag_xy` | 从坐标 A 拖到坐标 B |
| `browser_mouse_down` | 按下鼠标 |
| `browser_mouse_up` | 释放鼠标 |
| `browser_mouse_wheel` | 滚轮滚动 |

### PDF 生成

需要启用 `--caps pdf`：

| 工具 | 做什么 |
|------|--------|
| `browser_pdf_save` | 将页面保存为 PDF |

## 使用场景

### 场景 1：检查页面样式

```
你：打开 localhost:3000，看看首页长什么样

AI：[browser_navigate → localhost:3000]
    [browser_take_screenshot]
    首页加载正常。导航栏有 3 个链接，主区域有一个大标题和搜索框...
```

### 场景 2：测试表单提交

```
你：测试一下注册表单，用错误的邮箱格式提交看看

AI：[browser_navigate → /register]
    [browser_fill_form → 姓名: "测试用户", 邮箱: "不是邮箱", 密码: "123456"]
    [browser_click → 提交按钮]
    [browser_snapshot]
    表单正确显示了错误提示："请输入有效的邮箱地址"
```

### 场景 3：端到端流程测试

```
你：帮我走一遍完整的购买流程

AI：[导航到商品列表]
    [点击第一个商品]
    [点击"加入购物车"]
    [导航到购物车]
    [点击"结账"]
    [填写收货地址]
    [选择支付方式]
    [点击"确认支付"]
    [验证订单确认页面]
    完整购买流程测试通过，共 8 个步骤，所有页面跳转正常。
```

### 场景 4：调试控制台错误

```
你：打开首页看看有没有 JS 报错

AI：[browser_navigate → localhost:3000]
    [browser_console_messages]
    发现 2 个错误：
    1. TypeError: Cannot read property 'map' of undefined (app.js:42)
    2. 404 Not Found: /api/user/profile
```

### 场景 5：检查网络请求

```
你：登录的时候看看发了什么请求

AI：[browser_navigate → /login]
    [browser_fill_form → 邮箱: "test@test.com", 密码: "password"]
    [browser_click → 登录按钮]
    [browser_network_requests]
    发送了 POST /api/auth/login，请求体包含 email 和 password，
    响应 200，返回了 JWT token 和用户信息。
```

## 常用配置

### 指定浏览器

```bash
# 使用 Chrome
claude mcp add playwright npx @playwright/mcp@latest --browser chrome

# 使用 Firefox
claude mcp add playwright npx @playwright/mcp@latest --browser firefox

# 使用 Edge
claude mcp add playwright npx @playwright/mcp@latest --browser msedge
```

### 无头模式

不弹出浏览器窗口，适合 CI 环境或后台运行：

```bash
claude mcp add playwright npx @playwright/mcp@latest --headless
```

### 设置视口大小

```bash
claude mcp add playwright npx @playwright/mcp@latest --viewport-size 1920x1080
```

### 模拟移动设备

```bash
claude mcp add playwright npx @playwright/mcp@latest --device "iPhone 15"
```

### 使用代理

```bash
claude mcp add playwright npx @playwright/mcp@latest --proxy-server http://myproxy:3128
```

### 忽略 HTTPS 错误

开发环境自签名证书时有用：

```bash
claude mcp add playwright npx @playwright/mcp@latest --ignore-https-errors
```

### 加载已有登录状态

如果你已经登录了某个网站，可以导出 cookies 然后加载：

```bash
claude mcp add playwright npx @playwright/mcp@latest --isolated --storage-state auth.json
```

### 限制可访问的网站

安全起见，限制 AI 只能访问特定域名：

```bash
claude mcp add playwright npx @playwright/mcp@latest --allowed-origins "localhost,*.mycompany.com"
```

## 浏览器状态管理

### 持久模式（默认）

浏览器的登录状态、cookies 会保留在本地缓存中，下次打开还在。

缓存位置：
- macOS：`~/Library/Caches/ms-playwright/mcp-chrome-profile`
- Linux：`~/.cache/ms-playwright/mcp-chrome-profile`
- Windows：`%USERPROFILE%\AppData\Local\ms-playwright\mcp-chrome-profile`

### 隔离模式

每次启动都是全新的浏览器，没有任何历史状态：

```bash
claude mcp add playwright npx @playwright/mcp@latest --isolated
```

## 连接已有浏览器

如果你想让 AI 操作你正在用的浏览器（比如已经登录了某个后台），可以安装 Chrome 扩展：

1. 安装 "Playwright MCP Bridge" Chrome 扩展
2. 配置时使用 extension 模式

这样 AI 就能直接操作你当前的浏览器标签页，无需重新登录。

## 常见问题

### 浏览器没弹出来？

确认没加 `--headless` 参数。默认是有头模式（会弹出窗口）。

### 页面加载太慢导致操作失败？

调大导航超时时间：

```bash
claude mcp add playwright npx @playwright/mcp@latest --timeout-navigation 120000
```

### 操作总是超时？

调大操作超时时间（默认 5 秒）：

```bash
claude mcp add playwright npx @playwright/mcp@latest --timeout-action 10000
```

### Snapshot 模式下找不到元素？

有些元素（如 Canvas 内容）在无障碍树中不可见，切换到 Vision 模式：

```bash
claude mcp add playwright npx @playwright/mcp@latest --caps vision
```

## 下一步

- [MCP 推荐列表](./) — 查看更多 MCP Server
- [Skills 推荐](/skills/) — 了解 AI 能力扩展

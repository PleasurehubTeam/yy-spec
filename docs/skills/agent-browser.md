# agent-browser

> 给 AI 一个命令行浏览器 — 用 shell 命令操作网页，比 MCP 更轻量、更省 token。

## 这是什么？

agent-browser 是 Vercel 团队开源的**命令行浏览器自动化工具**，专门为 AI agent 设计。底层基于 Playwright，但上层是一套 CLI 命令而不是 MCP 协议。

**和 Playwright MCP 的区别**：

| 维度 | agent-browser | Playwright MCP |
|------|--------------|----------------|
| 交互方式 | Shell 命令（`agent-browser click @e2`） | MCP 工具调用（`browser_click`） |
| Token 消耗 | 低 — 不加载工具 schema | 高 — 33 个工具的 schema 常驻上下文 |
| 适合场景 | AI 编码助手（上下文有限） | 探索性自动化（长时间运行） |
| 性能 | Rust CLI，亚毫秒解析 | Node.js 进程 |
| 安装方式 | 全局 CLI + Skill | MCP Server |

**简单来说**：做同样的事情，但 agent-browser 更省 token、更快。如果你的 AI 主要在写代码（上下文宝贵），用 agent-browser；如果你的 AI 主要在做浏览器自动化（上下文充裕），用 Playwright MCP。

## 安装

### 第 1 步：安装 CLI

推荐全局安装（最快）：

```bash
npm install -g agent-browser
agent-browser install  # 下载 Chromium
```

或者不安装直接用（稍慢）：

```bash
npx agent-browser install   # 首次需要下载 Chromium
npx agent-browser open example.com
```

macOS 也可以用 Homebrew：

```bash
brew install agent-browser
agent-browser install
```

### 第 2 步：安装 Skill

让 AI 知道怎么用这个工具：

```bash
npx skills add vercel-labs/agent-browser
```

这会在项目中添加 `.claude/skills/agent-browser/SKILL.md`，AI 在需要操作浏览器时会自动参考这个 skill。

## 核心工作流

agent-browser 的核心思路是 **snapshot → ref → 操作**：

### 第 1 步：打开页面

```bash
agent-browser open https://example.com
```

### 第 2 步：获取页面快照

```bash
agent-browser snapshot
```

输出的是无障碍树，每个可交互元素都有一个 ref 编号：

```
- heading "Example Domain" [ref=e1] [level=1]
- paragraph "This domain is for use in illustrative examples..."
- link "More information..." [ref=e2]
```

### 第 3 步：用 ref 操作元素

```bash
agent-browser click @e2          # 点击链接
agent-browser fill @e3 "hello"   # 填写输入框
agent-browser get text @e1       # 读取文本
```

### 第 4 步：页面变化后重新快照

```bash
agent-browser snapshot
```

就这四步，不断循环。AI 看快照 → 决定操作 → 用 ref 执行 → 看新快照。

## 命令速查

### 导航

```bash
agent-browser open <url>           # 打开 URL
agent-browser back                 # 返回
agent-browser forward              # 前进
agent-browser reload               # 刷新
agent-browser close                # 关闭浏览器
```

### 页面交互

```bash
agent-browser click <ref>           # 点击
agent-browser dblclick <ref>        # 双击
agent-browser fill <ref> "文本"     # 清空并填入
agent-browser type <ref> "文本"     # 追加输入
agent-browser press Enter            # 按键
agent-browser hover <ref>           # 悬停
agent-browser select <ref> "值"     # 选择下拉项
agent-browser check <ref>           # 勾选
agent-browser uncheck <ref>         # 取消勾选
agent-browser drag <src> <tgt>      # 拖拽
agent-browser upload <ref> file.png # 上传文件
agent-browser scroll down 500       # 向下滚动 500px
```

### 获取信息

```bash
agent-browser snapshot               # 无障碍树快照（推荐）
agent-browser snapshot -i            # 只看可交互元素
agent-browser snapshot -i -c         # 紧凑模式
agent-browser screenshot             # 截图
agent-browser screenshot --annotate  # 带标注的截图
agent-browser get text <ref>         # 获取文本
agent-browser get html <ref>         # 获取 HTML
agent-browser get value <ref>        # 获取表单值
agent-browser get url                # 当前 URL
agent-browser get title              # 页面标题
agent-browser get count <sel>        # 匹配元素数量
agent-browser console                # 控制台日志
agent-browser errors                 # JS 错误
```

### 检查状态

```bash
agent-browser is visible <ref>       # 是否可见
agent-browser is enabled <ref>       # 是否启用
agent-browser is checked <ref>       # 是否勾选
```

### 等待

```bash
agent-browser wait <selector>         # 等待元素出现
agent-browser wait 2000               # 等待 2 秒
agent-browser wait --text "欢迎"      # 等待文本出现
agent-browser wait --url "**/dashboard" # 等待 URL 匹配
agent-browser wait --load networkidle  # 等待网络空闲
```

### 语义定位器

不知道 ref？可以用语义方式找元素：

```bash
agent-browser find role button click --name "提交"
agent-browser find text "登录" click
agent-browser find label "邮箱" fill "test@test.com"
agent-browser find placeholder "搜索..." fill "关键词"
```

### 标签页管理

```bash
agent-browser tab                    # 列出所有标签页
agent-browser tab new https://...    # 新建标签页
agent-browser tab 2                  # 切换到第 2 个标签页
agent-browser tab close              # 关闭当前标签页
```

### 浏览器设置

```bash
agent-browser set viewport 1920 1080    # 设置视口大小
agent-browser set device "iPhone 15"    # 模拟设备
agent-browser set media dark            # 暗色模式
agent-browser set offline on            # 离线模式
agent-browser set geo 31.23 121.47      # 地理位置（上海）
```

### Cookies 和存储

```bash
agent-browser cookies                   # 查看所有 cookies
agent-browser cookies set name value    # 设置 cookie
agent-browser cookies clear             # 清除 cookies
agent-browser storage local             # 查看 localStorage
agent-browser storage local set key val # 设置值
```

### 网络拦截

```bash
agent-browser network route "*/api/*" --body '{"mock":true}'  # Mock API
agent-browser network route "*/ads/*" --abort                  # 屏蔽请求
agent-browser network requests                                 # 查看请求记录
agent-browser network requests --filter api                    # 过滤请求
```

### 页面对比（Diff）

```bash
agent-browser diff snapshot                           # 对比当前和上次快照
agent-browser diff screenshot --baseline before.png   # 视觉像素对比
agent-browser diff url https://v1.com https://v2.com  # 对比两个 URL
```

### 调试

```bash
agent-browser trace start            # 开始录制 trace
agent-browser trace stop             # 停止并保存
agent-browser highlight <ref>        # 高亮元素
agent-browser state save login.json  # 保存登录状态
agent-browser state load login.json  # 恢复登录状态
```

## 带标注的截图

```bash
agent-browser screenshot --annotate
```

这会在截图上标注每个可交互元素的编号 `[1]`、`[2]`、`[3]`...，编号和 ref 一一对应。适合需要视觉判断的场景（比如图标按钮、Canvas 内容）。

```
截图已保存：/tmp/screenshot-xxx.png
[1] @e1 button "提交"
[2] @e2 link "首页"
[3] @e3 textbox "邮箱"
```

截图之后可以直接用 ref 操作：

```bash
agent-browser click @e2   # 点击标注为 [2] 的"首页"链接
```

## 多会话

同时操作多个独立的浏览器实例：

```bash
# 两个独立会话
agent-browser --session user1 open https://app.com
agent-browser --session user2 open https://app.com

# 分别操作
agent-browser --session user1 fill @e1 "用户A"
agent-browser --session user2 fill @e1 "用户B"

# 查看活跃会话
agent-browser session list
```

每个会话有独立的：浏览器实例、Cookies、导航历史、登录状态。

## 持久化登录

### 方式 1：持久 Profile

```bash
# 用固定目录保存浏览器状态
agent-browser --profile ~/.myapp-profile open https://app.com
# 登录一次后，下次打开自动登录
agent-browser --profile ~/.myapp-profile open https://app.com/dashboard
```

### 方式 2：状态文件

```bash
# 登录后保存状态
agent-browser state save myapp-auth.json

# 下次加载
agent-browser state load myapp-auth.json
```

### 方式 3：HTTP Header 认证

跳过登录界面，直接带 token：

```bash
agent-browser open https://api.example.com --headers '{"Authorization": "Bearer <token>"}'
```

Header 只发送到指定域名，不会泄露到其他网站。

## 安全特性

agent-browser 为 AI agent 场景设计了多项安全措施：

| 功能 | 说明 | 用法 |
|------|------|------|
| 密码保险库 | 本地加密存储凭据，AI 看不到密码 | `agent-browser auth save github --url ...` |
| 内容边界标记 | 区分工具输出和页面内容，防注入 | `--content-boundaries` |
| 域名白名单 | 限制 AI 只能访问指定网站 | `--allowed-domains "localhost,*.mycompany.com"` |
| 操作策略 | 用策略文件限制危险操作 | `--action-policy ./policy.json` |
| 操作确认 | 敏感操作需要人工确认 | `--confirm-actions eval,download` |
| 输出长度限制 | 防止上下文溢出 | `--max-output 50000` |

## 连接已有浏览器

### 通过 CDP（Chrome DevTools Protocol）

```bash
# Chrome 启动时开启远程调试
# google-chrome --remote-debugging-port=9222

# 连接
agent-browser connect 9222
agent-browser snapshot
```

### 自动发现

```bash
agent-browser --auto-connect open example.com
```

自动找到本机运行中的 Chrome 并连接。

## iOS 模拟器支持

在 macOS 上可以控制 iOS 模拟器中的 Safari：

```bash
# 安装依赖（一次性）
npm install -g appium
appium driver install xcuitest

# 使用
agent-browser -p ios --device "iPhone 16 Pro" open https://example.com
agent-browser -p ios snapshot -i
agent-browser -p ios tap @e1
agent-browser -p ios swipe up
agent-browser -p ios screenshot mobile.png
```

## 云浏览器

不在本地跑浏览器？可以用云服务：

```bash
# Browserbase
export BROWSERBASE_API_KEY="your-key"
agent-browser -p browserbase open https://example.com

# Browser Use
export BROWSER_USE_API_KEY="your-key"
agent-browser -p browseruse open https://example.com

# Kernel（带反爬虫）
export KERNEL_API_KEY="your-key"
agent-browser -p kernel open https://example.com
```

所有命令在云模式下完全一样，只是浏览器跑在云端。

## 使用场景

### 测试开发中的页面

```bash
agent-browser open http://localhost:3000
agent-browser snapshot -i
# AI 看到所有可交互元素，开始测试
```

### 批量截图

```bash
agent-browser open https://app.com/page1 && agent-browser screenshot page1.png
agent-browser open https://app.com/page2 && agent-browser screenshot page2.png
```

### 表单自动化

```bash
agent-browser open https://app.com/register
agent-browser find label "姓名" fill "测试用户"
agent-browser find label "邮箱" fill "test@test.com"
agent-browser find role button click --name "注册"
agent-browser wait --text "注册成功"
```

### 对比两个版本

```bash
agent-browser diff url https://staging.app.com https://prod.app.com --screenshot
```

## 配置文件

创建 `agent-browser.json` 设置默认值，免得每次重复输入参数：

```json
{
  "headed": true,
  "profile": "./browser-data",
  "allowedDomains": "localhost,*.mycompany.com",
  "maxOutput": 50000
}
```

配置优先级：CLI 参数 > 环境变量 > 项目配置 > 用户配置（`~/.agent-browser/config.json`）

## 下一步

- [Playwright MCP](/mcp/playwright) — 如果你偏好 MCP 方式
- [Skills 推荐列表](./) — 查看更多推荐 skill
- [Superpowers](./superpowers) — AI 编码工作流框架

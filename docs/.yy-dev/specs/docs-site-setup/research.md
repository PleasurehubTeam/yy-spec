# 研究与设计决策日志

## 概要
- **功能**: `docs-site-setup`
- **发现范围**: 新功能（Greenfield）
- **关键发现**:
  - VitePress 提供 `vitepress/theme-without-fonts` 入口，可避免捆绑默认 Inter 字体，适合自定义字体方案
  - 通过 CSS 变量覆盖机制可实现 Newsprint 设计系统而无需完全自定义主题
  - `appearance: false` 配置可禁用暗色模式切换，满足仅浅色模式需求

## 研究日志

### VitePress 主题定制机制
- **背景**: 需确认 Newsprint 设计系统的最佳集成路径——完全自定义主题 vs 扩展默认主题
- **来源**: [VitePress 官方文档 - 扩展默认主题](https://vitepress.dev/guide/extending-default-theme)、[自定义主题](https://vitepress.dev/guide/custom-theme)
- **发现**:
  - 默认主题提供完整的导航栏、侧边栏、移动端适配、搜索等基础功能
  - 通过 `.vitepress/theme/index.ts` 导入默认主题并添加自定义 CSS 即可覆盖样式
  - CSS 变量列表可在 VitePress 源码 `vars.css` 中查看，涵盖颜色、字体、间距、圆角等
  - Layout 组件提供丰富的插槽（slots），可在不修改源码的情况下注入自定义内容
  - Vite alias 机制允许替换内部组件（如 VPNavBar），但不推荐用于次要修改
- **影响**: 选择扩展默认主题而非完全自定义，大幅降低开发和维护成本

### 字体加载策略
- **背景**: Newsprint 设计系统需要 4 种字体（Playfair Display、Lora、Inter、JetBrains Mono）
- **来源**: [VitePress 自定义字体讨论](https://github.com/vuejs/vitepress/discussions/3257)、[Paul Laros 博客](https://laros.io/adding-a-custom-font-to-the-vitepress-default-theme)
- **发现**:
  - `vitepress/theme-without-fonts` 入口不捆绑 Inter，避免字体冲突
  - Google Fonts CDN 通过 `head` 配置添加 preconnect + stylesheet 链接即可
  - 本地字体方案需 `transformHead` 钩子处理预加载，增加构建复杂度
  - `vite-plugin-webfont-dl` 插件可自动下载 CDN 字体并本地化，但增加依赖
- **影响**: 选择 Google Fonts CDN 方案，简单直接；未来可切换到本地字体

### 暗色模式禁用
- **背景**: Newsprint 设计系统仅支持浅色模式
- **来源**: [VitePress 站点配置](https://vitepress.dev/reference/site-config)
- **发现**:
  - `appearance: false` 禁用暗色模式切换，不注入主题切换脚本
  - 默认主题的导航栏中将不显示暗色/浅色切换按钮
- **影响**: 配置简单，一行配置即可

### 首页 Layout 插槽
- **背景**: 需要自定义首页以符合 Newsprint 风格
- **来源**: [VitePress 默认主题扩展](https://vitepress.dev/guide/extending-default-theme)
- **发现**:
  - Home layout 提供 `home-hero-before`、`home-hero-info`、`home-hero-after`、`home-features-before`、`home-features-after` 等插槽
  - 可通过 frontmatter 的 `hero` 和 `features` 字段配置首页内容
  - 更深度定制可通过 `layout: page` 配合自定义 Vue 组件实现
- **影响**: 初期使用默认 Home layout + CSS 覆盖，后期可渐进式升级为自定义组件

## 架构方案评估

| 方案 | 描述 | 优势 | 风险/限制 | 备注 |
|------|------|------|-----------|------|
| 扩展默认主题 | 导入默认主题 + CSS 变量覆盖 + 自定义 CSS | 保留全部默认功能，开发量小 | CSS 覆盖可能与主题升级冲突 | 推荐方案 |
| 完全自定义主题 | 从零实现 Layout 组件 | 完全控制样式和结构 | 需重新实现导航、侧边栏、移动适配等 | 开发量过大，不推荐 |
| 主题覆盖插件 | 使用 vitepress-plugin-theme-override | 精确替换单个组件 | 增加第三方依赖，社区维护不确定 | 备选方案 |

## 设计决策

### 决策：扩展默认主题 + CSS 覆盖
- **背景**: 需要在 VitePress 上实现 Newsprint 视觉风格
- **备选方案**:
  1. 完全自定义主题 — 完全控制但开发量巨大
  2. 扩展默认主题 — 保留功能，覆盖样式
  3. 使用社区主题 — 无适合的 Newsprint 风格主题
- **选定方案**: 扩展默认主题，通过 CSS 变量和自定义 CSS 实现 Newsprint 风格
- **理由**: 保留导航、侧边栏、搜索、移动适配等开箱即用功能，仅需关注视觉层定制
- **权衡**: 某些深度定制（如完全自定义导航栏）受限于默认主题结构
- **后续**: 实现中如遇默认主题无法覆盖的样式，可考虑 Vite alias 替换特定组件

### 决策：Google Fonts CDN 加载字体
- **背景**: 需要加载 4 种 Google Fonts 字体
- **备选方案**:
  1. Google Fonts CDN — 简单，全球 CDN 加速
  2. 本地字体文件 — 无外部依赖，隐私友好
  3. vite-plugin-webfont-dl — 自动下载本地化
- **选定方案**: Google Fonts CDN
- **理由**: 配置最简单，Google CDN 全球可用，大多数用户浏览器已缓存常用字体
- **权衡**: 依赖外部 CDN，中国大陆可能需要替代 CDN 源
- **后续**: 如中国大陆访问有问题，可切换到本地字体或国内 CDN 镜像

## 风险与缓解
- VitePress 主题升级可能破坏 CSS 覆盖 — 锁定主要版本，升级前测试样式
- Google Fonts CDN 在中国大陆可能加载慢 — 预留本地字体回退方案
- Newsprint 设计系统的 0px 圆角与默认主题的圆角冲突 — 全局 CSS 重置覆盖

## 参考
- [VitePress 扩展默认主题](https://vitepress.dev/guide/extending-default-theme) — 主题定制主要参考
- [VitePress 自定义主题](https://vitepress.dev/guide/custom-theme) — 主题接口定义
- [VitePress 站点配置](https://vitepress.dev/reference/site-config) — 配置参数参考
- [VitePress CSS 变量源码](https://github.com/vuejs/vitepress/blob/main/src/client/theme-default/styles/vars.css) — 可覆盖的 CSS 变量列表

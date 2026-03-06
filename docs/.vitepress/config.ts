import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'yy-ai-workflow',
  description: 'AI 开发者工具文档与知识平台 — 工具使用指南、AI 驱动开发生命周期、规格驱动开发方法论',
  lang: 'zh-CN',
  appearance: false,
  srcExclude: ['CLAUDE.md', 'README.md'],

  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    [
      'link',
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700;9..144,800&family=Nunito:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap',
      },
    ],
  ],

  themeConfig: {
    nav: [],

    sidebar: [
      {
        text: 'Skills 推荐',
        items: [
          { text: '概述', link: '/skills/' },
          { text: 'find-skills', link: '/skills/find-skills' },
          { text: 'Superpowers', link: '/skills/superpowers' },
        ],
      },
      {
        text: 'MCP 推荐',
        items: [
          { text: '概述', link: '/mcp/' },
          { text: 'Playwright', link: '/mcp/playwright' },
        ],
      },
      {
        text: 'yy-spec',
        items: [
          { text: '快速上手', link: '/getting-started/' },
          {
            text: '新项目工作流',
            collapsed: false,
            items: [
              { text: '概述', link: '/new-project/' },
              { text: '初始化项目', link: '/new-project/init' },
              { text: '开发新功能', link: '/new-project/feature' },
              { text: '修复 Bug', link: '/new-project/fix-bug' },
              { text: '调查问题', link: '/new-project/investigate' },
            ],
          },
          {
            text: '已有项目工作流',
            collapsed: false,
            items: [
              { text: '概述', link: '/existing-project/' },
              { text: '接入已有项目', link: '/existing-project/onboarding' },
              { text: '开发新功能', link: '/existing-project/feature' },
              { text: '修复 Bug', link: '/existing-project/fix-bug' },
              { text: '调查问题', link: '/existing-project/investigate' },
            ],
          },
          {
            text: '进阶用法',
            collapsed: true,
            items: [
              { text: '概述', link: '/advanced/' },
              { text: '分步工作流', link: '/advanced/step-by-step' },
              { text: '自定义配置', link: '/advanced/customization' },
            ],
          },
          { text: '命令参考', link: '/reference/' },
        ],
      },
      {
        text: '方法论',
        items: [
          { text: '概述', link: '/methodology/' },
          { text: 'AI-DLC', link: '/methodology/ai-dlc' },
          { text: '规格驱动开发', link: '/methodology/sdd' },
        ],
      },
    ],

    outline: {
      label: '页面导航',
    },
  },
})

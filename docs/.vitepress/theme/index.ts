import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme-without-fonts'
import './organic.css'
import CustomLayout from './CustomLayout.vue'

export default {
  extends: DefaultTheme,
  Layout: CustomLayout,
} satisfies Theme

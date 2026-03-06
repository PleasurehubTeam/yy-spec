<script setup>
import DefaultTheme from 'vitepress/theme-without-fonts'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #layout-top>
      <div class="newsprint-texture-overlay" />
    </template>
  </Layout>
</template>

<style scoped>
.newsprint-texture-overlay {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  background-image:
    linear-gradient(0deg, transparent 98%, rgba(0, 0, 0, 0.02) 100%),
    linear-gradient(90deg, transparent 98%, rgba(0, 0, 0, 0.02) 100%);
  background-size: 3px 3px;
  opacity: 0.5;
}
</style>

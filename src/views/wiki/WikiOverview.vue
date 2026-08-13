<template>
  <WikiArticle
    title="概览"
    lead="这里是百科的总览页，先放一些占位说明。"
    :paragraphs="paragraphs"
  />
</template>

<script lang="ts">
import WikiArticle from '@/components/WikiArticle.vue'

export default {
  name: 'WikiOverview',
  components: { WikiArticle },
  data() {
    return {
      paragraphs: [
        '百科用来整理平时用到的概念、项目笔记和开发备忘。',
        '左侧菜单可以切换不同分类，后续再逐步补全真实内容。',
        '当前页面只是结构占位，方便先把导航和布局定下来。',
      ],
    }
  },
}
</script>

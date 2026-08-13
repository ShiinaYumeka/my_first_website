<template>
  <WikiArticle
    title="Minecraft"
    lead="与 Minecraft 相关的玩法与技术笔记。"
    :paragraphs="paragraphs"
  />
</template>

<script lang="ts">
import WikiArticle from '@/components/WikiArticle.vue'

export default {
  name: 'WikiMinecraft',
  components: { WikiArticle },
  data() {
    return {
      paragraphs: [
        '可写数据包、Paper 插件、客户端模组等主题。',
        '战墙玩法、流派机制、命令结构都可以慢慢补进来。',
        '目前仅为占位，点击侧边栏即可切换到本页。',
      ],
    }
  },
}
</script>

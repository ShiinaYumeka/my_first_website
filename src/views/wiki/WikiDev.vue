<template>
  <WikiArticle
    title="开发备忘"
    lead="开发过程中常用的小技巧与待办。"
    :paragraphs="paragraphs"
  />
</template>

<script lang="ts">
import WikiArticle from '@/components/WikiArticle.vue'

export default {
  name: 'WikiDev',
  components: { WikiArticle },
  data() {
    return {
      paragraphs: [
        'Vue Router、组件拆分、样式变量等都可以记在这里。',
        '遇到反复查的命令或配置，也可以沉淀成短条目。',
        '内容先随便写，后面再替换成真实笔记。',
      ],
    }
  },
}
</script>

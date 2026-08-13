<template>
  <WikiArticle
    title="杂记"
    lead="不好归类的碎碎念和临时记录。"
    :paragraphs="paragraphs"
  />
</template>

<script lang="ts">
import WikiArticle from '@/components/WikiArticle.vue'

export default {
  name: 'WikiMisc',
  components: { WikiArticle },
  data() {
    return {
      paragraphs: [
        '灵感、链接、临时想法都可以先扔到这一栏。',
        '等条目变多了，再拆到更合适的分类里。',
        '这是占位子页面，用来验证菜单切换是否正常。',
      ],
    }
  },
}
</script>

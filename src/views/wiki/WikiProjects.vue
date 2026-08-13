<template>
  <WikiArticle
    title="项目笔记"
    lead="记录各个作品相关的想法与进度。"
    :paragraphs="paragraphs"
  />
</template>

<script lang="ts">
import WikiArticle from '@/components/WikiArticle.vue'

export default {
  name: 'WikiProjects',
  components: { WikiArticle },
  data() {
    return {
      paragraphs: [
        '可以把网站、安卓应用、模组等项目的背景和踩坑写在这里。',
        '例如：WallWar 的流派设计、Slay the Nana 的卡牌结构等。',
        '这里暂时用占位文字代替正式文档。',
      ],
    }
  },
}
</script>

<template>
  <WikiArticle
    title="总览"
    lead="百科目前分为三个条目，数据与展示分离，后续可按同一格式补全。"
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
        'Island配件：记录可装配对象、品质范围、冲突配件，以及中文效果与数值范围。',
        'Island装备：记录等阶、启用模式与对应价格、效果。',
        '战墙流派：采矿、农业、伐木、渔业、炼药、建筑，条目已建好，内容暂空。',
      ],
    }
  },
}
</script>

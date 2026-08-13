<template>
  <div class="page-block">
    <h1 class="title">Island 配件</h1>
    <p class="lead">以下为示例数据，可按同一字段结构替换为爬取结果。</p>

    <section class="grid" aria-label="配件列表">
      <PartCard
        v-for="part in parts"
        :key="part.id"
        :name="part.name"
        :attach-to="part.attachTo"
        :quality-range="part.qualityRange"
        :conflicts="part.conflicts"
        :effects="part.effects"
      />
    </section>
  </div>
</template>

<script lang="ts">
import PartCard from '@/components/wiki/PartCard.vue'
import { islandParts } from '@/data/wiki/islandParts'

export default {
  name: 'WikiIslandParts',
  components: { PartCard },
  data() {
    return {
      parts: islandParts,
    }
  },
}
</script>

<style scoped>
.page-block {
  max-width: 52rem;
}

.title {
  font-family: 'Fraunces', serif;
  font-size: clamp(1.9rem, 4vw, 2.5rem);
  font-weight: 600;
  letter-spacing: -0.02em;
  color: var(--ink);
}

.lead {
  margin-top: 0.6rem;
  font-size: 0.98rem;
  font-weight: 300;
  color: var(--ink-soft);
}

.grid {
  margin-top: 1.25rem;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

@media (max-width: 720px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>

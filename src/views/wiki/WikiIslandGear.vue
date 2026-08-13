<template>
  <div class="page-block">
    <h1 class="title">Island 装备</h1>
    <p class="lead">以下为示例数据，可按同一字段结构替换为爬取结果。</p>

    <section class="grid" aria-label="装备列表">
      <GearCard
        v-for="item in gear"
        :key="item.id"
        :name="item.name"
        :tier="item.tier"
        :modes="item.modes"
        :effects="item.effects"
      />
    </section>
  </div>
</template>

<script lang="ts">
import GearCard from '@/components/wiki/GearCard.vue'
import { islandGear } from '@/data/wiki/islandGear'

export default {
  name: 'WikiIslandGear',
  components: { GearCard },
  data() {
    return {
      gear: islandGear,
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

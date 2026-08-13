<template>
  <div class="page-block">
    <h1 class="title">战墙流派</h1>

    <section class="grid" aria-label="流派列表">
      <FactionCard v-for="faction in factions" :key="faction.id" :name="faction.name" />
    </section>
  </div>
</template>

<script lang="ts">
import FactionCard from '@/components/wiki/FactionCard.vue'
import { wallwarFactions } from '@/data/wiki/wallwarFactions'

export default {
  name: 'WikiWallwarFactions',
  components: { FactionCard },
  data() {
    return {
      factions: wallwarFactions,
    }
  },
}
</script>

<style scoped>
.page-block {
  width: 100%;
}

.title {
  font-family: 'Fraunces', serif;
  font-size: clamp(1.6rem, 3vw, 2.1rem);
  font-weight: 600;
  letter-spacing: -0.02em;
  color: var(--ink);
}

.grid {
  margin-top: 0.9rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
  gap: 0.65rem;
}
</style>

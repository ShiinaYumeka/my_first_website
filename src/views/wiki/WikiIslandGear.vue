<template>
  <div class="page-block">
    <h1 class="title">Islands 装备</h1>

    <div class="toolbar">
      <input
        v-model.trim="query"
        class="search"
        type="search"
        placeholder="按名称或效果搜索"
        aria-label="搜索装备"
      />
      <label class="filter">
        <span>等阶</span>
        <select v-model="tierFilter">
          <option value="">全部</option>
          <option v-for="tier in tiers" :key="tier" :value="tier">{{ tier }}</option>
        </select>
      </label>
      <label class="filter">
        <span>模式</span>
        <select v-model="modeFilter">
          <option value="">全部</option>
          <option v-for="mode in modes" :key="mode" :value="mode">{{ mode }}</option>
        </select>
      </label>
    </div>
    <p class="count">显示 {{ filteredGear.length }} / {{ gear.length }}</p>

    <section v-if="filteredGear.length" class="grid" aria-label="装备列表">
      <GearCard
        v-for="item in filteredGear"
        :key="item.id"
        :name="item.name"
        :tier="item.tier"
        :modes="item.modes"
        :effects="item.effects"
      />
    </section>
    <p v-else class="empty">没有匹配的装备</p>
  </div>
</template>

<script lang="ts">
import GearCard from '@/components/wiki/GearCard.vue'
import { islandGear } from '@/data/wiki/islandGear'
import type { IslandGear } from '@/types/wiki'

const TIER_ORDER = ['I', 'II', 'III', 'IV', 'V']

export default {
  name: 'WikiIslandGear',
  components: { GearCard },
  data() {
    return {
      gear: islandGear,
      query: '',
      tierFilter: '',
      modeFilter: '',
    }
  },
  computed: {
    tiers(): string[] {
      return [...new Set(this.gear.map((item) => item.tier))].sort(
        (a, b) => TIER_ORDER.indexOf(a) - TIER_ORDER.indexOf(b),
      )
    },
    modes(): string[] {
      return [...new Set(this.gear.flatMap((item) => item.modes.map((mode) => mode.name)))].sort((a, b) =>
        a.localeCompare(b, 'zh'),
      )
    },
    filteredGear(): IslandGear[] {
      const needle = this.query.toLowerCase()
      return this.gear.filter((item) => {
        if (this.tierFilter && item.tier !== this.tierFilter) return false
        if (this.modeFilter && !item.modes.some((mode) => mode.name === this.modeFilter)) return false
        if (!needle) return true
        const displayName = item.name.replace(/\s*[（(][一二三四五六七八九十]阶[）)]\s*/g, '')
        const haystack = [displayName, item.name, item.tier, ...item.effects, ...item.modes.map((mode) => `${mode.name} ${mode.price}`)]
          .join(' ')
          .toLowerCase()
        return haystack.includes(needle)
      })
    },
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

.toolbar {
  margin-top: 0.85rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
  align-items: center;
}

.search {
  flex: 1 1 16rem;
  min-width: 12rem;
  height: 2.15rem;
  padding: 0 0.75rem;
  border: 1px solid rgba(28, 40, 56, 0.14);
  border-radius: 0.55rem;
  background: rgba(255, 255, 255, 0.82);
  color: var(--ink);
  font: inherit;
  font-size: 0.9rem;
}

.search:focus,
.filter select:focus {
  outline: 2px solid rgba(79, 115, 105, 0.35);
  outline-offset: 1px;
}

.filter {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.82rem;
  color: var(--ink-soft);
}

.filter select {
  height: 2.15rem;
  padding: 0 0.55rem;
  border: 1px solid rgba(28, 40, 56, 0.14);
  border-radius: 0.55rem;
  background: rgba(255, 255, 255, 0.82);
  color: var(--ink);
  font: inherit;
  font-size: 0.86rem;
}

.count,
.empty {
  margin-top: 0.55rem;
  font-size: 0.8rem;
  color: var(--ink-soft);
}

.grid {
  margin-top: 0.75rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(16.5rem, 1fr));
  gap: 0.65rem;
}
</style>

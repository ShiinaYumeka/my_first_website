<template>
  <div class="page-block">
    <h1 class="title">战墙道具</h1>

    <div class="toolbar">
      <input
        v-model.trim="query"
        class="search"
        type="search"
        placeholder="按名称或效果搜索"
        aria-label="搜索道具"
      />
      <label class="filter">
        <span>分类</span>
        <select v-model="categoryFilter">
          <option value="">全部</option>
          <option v-for="category in categories" :key="category" :value="category">
            {{ category }}
          </option>
        </select>
      </label>
    </div>
    <p class="count">显示 {{ filteredItems.length }} / {{ items.length }}</p>

    <section v-if="filteredItems.length" class="grid" aria-label="道具列表">
      <WallwarItemCard
        v-for="item in filteredItems"
        :key="item.id"
        :name="item.name"
        :category="item.category"
        :effects="item.effects"
      />
    </section>
    <p v-else class="empty">没有匹配的道具</p>
  </div>
</template>

<script lang="ts">
import WallwarItemCard from '@/components/wiki/WallwarItemCard.vue'
import { wallwarItems } from '@/data/wiki/wallwarItems'
import type { WallwarItem } from '@/types/wiki'

const CATEGORY_ORDER = [
  '采矿',
  '农业',
  '伐木',
  '渔业',
  '建筑',
  '猎头',
  '猎人',
  'BOSS',
  '召唤',
  '坐骑',
  '凋灵',
  '杂项',
  '拆解',
]

export default {
  name: 'WikiWallwarItems',
  components: { WallwarItemCard },
  data() {
    return {
      items: wallwarItems,
      query: '',
      categoryFilter: '',
    }
  },
  computed: {
    categories(): string[] {
      const found = [...new Set(this.items.map((item) => item.category))]
      return found.sort(
        (a, b) => CATEGORY_ORDER.indexOf(a) - CATEGORY_ORDER.indexOf(b) || a.localeCompare(b, 'zh'),
      )
    },
    filteredItems(): WallwarItem[] {
      const needle = this.query.toLowerCase()
      return this.items.filter((item) => {
        if (this.categoryFilter && item.category !== this.categoryFilter) return false
        if (!needle) return true
        const haystack = [item.name, item.category, ...item.effects].join(' ').toLowerCase()
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

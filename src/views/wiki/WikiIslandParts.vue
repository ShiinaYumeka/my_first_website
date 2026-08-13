<template>
  <div class="page-block">
    <h1 class="title">Islands 配件</h1>

    <div class="toolbar">
      <input
        v-model.trim="query"
        class="search"
        type="search"
        placeholder="按名称或效果搜索"
        aria-label="搜索配件"
      />
      <label class="filter">
        <span>品质</span>
        <select v-model="qualityFilter">
          <option value="">全部</option>
          <option v-for="quality in qualities" :key="quality" :value="quality">{{ quality }}</option>
        </select>
      </label>
      <label class="filter">
        <span>可装配</span>
        <select v-model="attachFilter">
          <option value="">全部</option>
          <option v-for="item in attachOptions" :key="item" :value="item">{{ item }}</option>
        </select>
      </label>
    </div>
    <p class="count">显示 {{ filteredParts.length }} / {{ parts.length }}</p>

    <section v-if="filteredParts.length" class="grid" aria-label="配件列表">
      <PartCard
        v-for="part in filteredParts"
        :key="part.id"
        :name="part.name"
        :attach-to="part.attachTo"
        :quality-range="part.qualityRange"
        :conflicts="part.conflicts"
        :effects="part.effects"
      />
    </section>
    <p v-else class="empty">没有匹配的配件</p>
  </div>
</template>

<script lang="ts">
import PartCard from '@/components/wiki/PartCard.vue'
import { islandParts } from '@/data/wiki/islandParts'
import type { IslandPart } from '@/types/wiki'

const QUALITY_ORDER = ['白', '绿', '蓝', '紫', '金']

function qualitiesInRange(range: string): string[] {
  const pieces = range.split('~').map((piece) => piece.trim()).filter(Boolean)
  if (pieces.length === 0) return []
  if (pieces.length === 1) return pieces[0] ? [pieces[0]] : []
  const start = QUALITY_ORDER.indexOf(pieces[0] ?? '')
  const end = QUALITY_ORDER.indexOf(pieces[1] ?? '')
  if (start < 0 || end < 0) return pieces
  const from = Math.min(start, end)
  const to = Math.max(start, end)
  return QUALITY_ORDER.slice(from, to + 1)
}

export default {
  name: 'WikiIslandParts',
  components: { PartCard },
  data() {
    return {
      parts: islandParts,
      query: '',
      qualityFilter: '',
      attachFilter: '',
      qualities: QUALITY_ORDER,
    }
  },
  computed: {
    attachOptions(): string[] {
      return [...new Set(this.parts.flatMap((part) => part.attachTo))].sort((a, b) => a.localeCompare(b, 'zh'))
    },
    filteredParts(): IslandPart[] {
      const needle = this.query.toLowerCase()
      return this.parts.filter((part) => {
        if (this.qualityFilter && !qualitiesInRange(part.qualityRange).includes(this.qualityFilter)) {
          return false
        }
        if (this.attachFilter && !part.attachTo.includes(this.attachFilter)) {
          return false
        }
        if (!needle) return true
        const haystack = [
          part.name,
          ...part.attachTo,
          part.qualityRange,
          ...part.conflicts,
          ...part.effects.map((effect) => `${effect.text} ${effect.range}`),
        ]
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

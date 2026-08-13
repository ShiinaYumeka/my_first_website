<template>
  <article class="card">
    <h2 class="name">{{ name }}</h2>

    <p class="meta">
      <span><em>品质</em>{{ qualityRange }}</span>
      <span><em>装配</em>{{ attachToLabel }}</span>
      <span><em>冲突</em>{{ conflictsLabel }}</span>
    </p>

    <ul class="effects">
      <li v-for="(effect, index) in displayEffects" :key="index">
        <span class="effect-text">{{ effect.text }}</span>
        <span v-if="effect.range" class="effect-range">{{ effect.range }}</span>
      </li>
    </ul>
  </article>
</template>

<script lang="ts">
import type { IslandPartEffect } from '@/types/wiki'

export default {
  name: 'PartCard',
  props: {
    name: {
      type: String,
      required: true,
    },
    attachTo: {
      type: Array as () => string[],
      default: () => [],
    },
    qualityRange: {
      type: String,
      default: '',
    },
    conflicts: {
      type: Array as () => string[],
      default: () => [],
    },
    effects: {
      type: Array as () => IslandPartEffect[],
      default: () => [],
    },
  },
  computed: {
    attachToLabel(): string {
      return this.attachTo.length ? this.attachTo.join('、') : '—'
    },
    conflictsLabel(): string {
      return this.conflicts.length ? this.conflicts.join('、') : '无'
    },
    displayEffects(): { text: string; range: string }[] {
      return this.effects.map((effect) => ({
        text: effect.text.replace(/§./g, '').trim(),
        range: this.numericRange(effect.text, effect.range),
      }))
    },
  },
  methods: {
    numericRange(text: string, range: string): string {
      const cleaned = range.replace(/§./g, '').trim()
      if (!cleaned || cleaned === '固定' || cleaned === text.replace(/§./g, '').trim()) return ''
      return cleaned
    },
  },
}
</script>

<style scoped>
.card {
  padding: 0.7rem 0.8rem 0.75rem;
  border-radius: 0.7rem;
  background: rgba(255, 255, 255, 0.78);
  border: 1px solid rgba(28, 40, 56, 0.1);
  min-width: 0;
}

.name {
  font-family: 'Fraunces', serif;
  font-size: 1.02rem;
  font-weight: 600;
  line-height: 1.25;
  color: var(--ink);
}

.meta {
  margin-top: 0.35rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.2rem 0.7rem;
  font-size: 0.78rem;
  line-height: 1.4;
  color: var(--ink);
}

.meta em {
  font-style: normal;
  font-weight: 500;
  color: var(--ink-soft);
  margin-right: 0.28rem;
}

.effects {
  list-style: none;
  margin-top: 0.45rem;
  padding: 0.4rem 0 0;
  border-top: 1px solid rgba(28, 40, 56, 0.08);
  display: flex;
  flex-direction: column;
  gap: 0.18rem;
}

.effects li {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 0.55rem;
  font-size: 0.8rem;
  line-height: 1.4;
}

.effect-text {
  color: var(--ink);
  font-weight: 400;
}

.effect-range {
  color: var(--sage-deep);
  font-weight: 600;
  white-space: nowrap;
}
</style>

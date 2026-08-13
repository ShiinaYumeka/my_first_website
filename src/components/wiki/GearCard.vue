<template>
  <article class="card">
    <div class="header">
      <span class="tier">{{ tier }}</span>
      <h2 class="name">{{ displayName }}</h2>
    </div>

    <ul class="modes">
      <li v-for="mode in modes" :key="mode.name">
        <span class="mode-name">{{ mode.name }}</span>
        <span class="price">{{ mode.price }}</span>
      </li>
    </ul>

    <ul v-if="effects.length" class="effects">
      <li v-for="(effect, index) in effects" :key="index">{{ effect }}</li>
    </ul>
  </article>
</template>

<script lang="ts">
import type { IslandGearMode } from '@/types/wiki'

export default {
  name: 'GearCard',
  props: {
    name: {
      type: String,
      required: true,
    },
    tier: {
      type: String,
      required: true,
    },
    modes: {
      type: Array as () => IslandGearMode[],
      default: () => [],
    },
    effects: {
      type: Array as () => string[],
      default: () => [],
    },
  },
  computed: {
    displayName(): string {
      return this.name.replace(/\s*[（(][一二三四五六七八九十]阶[）)]\s*/g, '').trim()
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

.header {
  display: flex;
  align-items: baseline;
  gap: 0.55rem;
}

.tier {
  flex: 0 0 auto;
  min-width: 1.4rem;
  font-family: 'Fraunces', serif;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--sage-deep);
}

.name {
  font-family: 'Fraunces', serif;
  font-size: 1.02rem;
  font-weight: 600;
  line-height: 1.25;
  color: var(--ink);
}

.modes,
.effects {
  list-style: none;
  margin: 0;
  padding: 0;
}

.modes {
  margin-top: 0.4rem;
  display: flex;
  flex-direction: column;
  gap: 0.12rem;
}

.modes li {
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  font-size: 0.78rem;
  line-height: 1.4;
}

.mode-name {
  color: var(--ink-soft);
  font-weight: 500;
  white-space: nowrap;
}

.price {
  color: var(--ink);
  font-weight: 500;
  text-align: right;
}

.effects {
  margin-top: 0.4rem;
  padding-top: 0.35rem;
  border-top: 1px solid rgba(28, 40, 56, 0.08);
  display: flex;
  flex-direction: column;
  gap: 0.12rem;
}

.effects li {
  font-size: 0.78rem;
  line-height: 1.4;
  color: var(--ink);
  font-weight: 400;
}
</style>

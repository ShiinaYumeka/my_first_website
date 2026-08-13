<template>
  <article class="card">
    <div class="header">
      <h2 class="name">{{ name }}</h2>
      <span class="tier">等阶 {{ tier }}</span>
    </div>

    <div class="modes">
      <h3 class="label">启用模式 / 价格</h3>
      <ul>
        <li v-for="mode in modes" :key="mode.name">
          <span>{{ mode.name }}</span>
          <span class="price">{{ mode.price }}</span>
        </li>
      </ul>
    </div>

    <div class="effects">
      <h3 class="label">效果</h3>
      <ul>
        <li v-for="(effect, index) in effects" :key="index">{{ effect }}</li>
      </ul>
    </div>
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
}
</script>

<style scoped>
.card {
  padding: 1.2rem 1.25rem;
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.55);
  border: 1px solid rgba(28, 40, 56, 0.08);
  box-shadow: 0 8px 24px rgba(28, 40, 56, 0.06);
  min-width: 0;
}

.header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.75rem;
}

.name {
  font-family: 'Fraunces', serif;
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--ink);
}

.tier {
  font-size: 0.8rem;
  color: var(--sage-deep);
  white-space: nowrap;
}

.label {
  font-size: 0.82rem;
  font-weight: 500;
  color: var(--ink-soft);
}

.modes,
.effects {
  margin-top: 0.85rem;
}

.modes ul,
.effects ul {
  list-style: none;
  margin-top: 0.4rem;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.modes li,
.effects li {
  font-size: 0.88rem;
  font-weight: 300;
  color: var(--ink);
}

.modes li {
  display: flex;
  justify-content: space-between;
  gap: 0.75rem;
}

.price {
  color: var(--sage-deep);
}
</style>

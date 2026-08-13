<template>
  <article class="card">
    <h2 class="name">{{ name }}</h2>

    <dl class="fields">
      <div class="field">
        <dt>可装配对象</dt>
        <dd>{{ attachToLabel }}</dd>
      </div>
      <div class="field">
        <dt>品质范围</dt>
        <dd>{{ qualityRange }}</dd>
      </div>
      <div class="field">
        <dt>冲突配件</dt>
        <dd>{{ conflictsLabel }}</dd>
      </div>
    </dl>

    <div class="effects">
      <h3 class="effects-title">配件效果</h3>
      <ul>
        <li v-for="(effect, index) in effects" :key="index">
          <span class="effect-text">{{ effect.text }}</span>
          <span class="effect-range">{{ effect.range }}</span>
        </li>
      </ul>
    </div>
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

.name {
  font-family: 'Fraunces', serif;
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--ink);
}

.fields {
  margin-top: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.field {
  display: grid;
  grid-template-columns: 6.5rem minmax(0, 1fr);
  gap: 0.5rem;
  font-size: 0.88rem;
  line-height: 1.45;
}

.field dt {
  color: var(--ink-soft);
  font-weight: 500;
}

.field dd {
  color: var(--ink);
  font-weight: 300;
}

.effects {
  margin-top: 0.9rem;
}

.effects-title {
  font-size: 0.82rem;
  font-weight: 500;
  color: var(--ink-soft);
}

.effects ul {
  list-style: none;
  margin-top: 0.4rem;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.effects li {
  display: flex;
  justify-content: space-between;
  gap: 0.75rem;
  font-size: 0.88rem;
}

.effect-text {
  color: var(--ink);
  font-weight: 300;
}

.effect-range {
  color: var(--sage-deep);
  white-space: nowrap;
  font-size: 0.82rem;
}
</style>

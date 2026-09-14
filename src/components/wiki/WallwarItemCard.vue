<template>
  <article class="card">
    <div class="header">
      <span class="category">{{ category }}</span>
      <h2 class="name">{{ name }}</h2>
    </div>

    <ul v-if="effects.length" class="effects">
      <li v-for="(effect, index) in effects" :key="index">{{ effect }}</li>
    </ul>
    <p v-else class="empty">暂无效果说明</p>
  </article>
</template>

<script lang="ts">
export default {
  name: 'WallwarItemCard',
  props: {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      default: '',
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

.category {
  flex: 0 0 auto;
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.04em;
  color: var(--sage-deep);
  white-space: nowrap;
}

.name {
  font-family: 'Fraunces', serif;
  font-size: 1.02rem;
  font-weight: 600;
  line-height: 1.25;
  color: var(--ink);
}

.effects {
  list-style: none;
  margin: 0.4rem 0 0;
  padding: 0.35rem 0 0;
  border-top: 1px solid rgba(28, 40, 56, 0.08);
  display: flex;
  flex-direction: column;
  gap: 0.12rem;
}

.effects li,
.empty {
  font-size: 0.78rem;
  line-height: 1.4;
  color: var(--ink);
}

.empty {
  margin-top: 0.4rem;
  color: var(--ink-soft);
}
</style>

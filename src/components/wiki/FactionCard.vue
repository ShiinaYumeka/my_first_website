<template>
  <RouterLink class="card" :to="`/wiki/wallwar-factions/${id}`">
    <h2 class="name">{{ name }}</h2>
    <p class="summary">{{ summary }}</p>
    <span class="go">进入</span>
  </RouterLink>
</template>

<script lang="ts">
export default {
  name: 'FactionCard',
  props: {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
  },
}
</script>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  padding: 0.85rem 0.9rem 0.8rem;
  border-radius: 0.7rem;
  background: rgba(255, 255, 255, 0.78);
  border: 1px solid rgba(28, 40, 56, 0.1);
  min-width: 0;
  text-decoration: none;
  color: inherit;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.2s ease;
}

.card:hover {
  border-color: rgba(79, 115, 105, 0.35);
  box-shadow: 0 10px 24px rgba(28, 40, 56, 0.08);
  transform: translateY(-2px);
}

.name {
  font-family: 'Fraunces', serif;
  font-size: 1.12rem;
  font-weight: 600;
  color: var(--ink);
}

.summary {
  margin-top: 0.45rem;
  flex: 1;
  font-size: 0.84rem;
  font-weight: 300;
  line-height: 1.6;
  color: var(--ink);
}

.go {
  margin-top: 0.7rem;
  font-size: 0.82rem;
  font-weight: 500;
  letter-spacing: 0.04em;
  color: var(--sage-deep);
}
</style>

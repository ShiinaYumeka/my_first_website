<template>
  <article class="card">
    <h2 class="name">{{ name }}</h2>
  </article>
</template>

<script lang="ts">
export default {
  name: 'FactionCard',
  props: {
    name: {
      type: String,
      required: true,
    },
  },
}
</script>

<style scoped>
.card {
  padding: 0.7rem 0.85rem;
  border-radius: 0.7rem;
  background: rgba(255, 255, 255, 0.78);
  border: 1px solid rgba(28, 40, 56, 0.1);
  min-width: 0;
}

.name {
  font-family: 'Fraunces', serif;
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--ink);
}
</style>

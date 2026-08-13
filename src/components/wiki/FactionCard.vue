<template>
  <article class="card">
    <h2 class="name">{{ name }}</h2>
    <div class="body" aria-hidden="true"></div>
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
  padding: 1.2rem 1.25rem;
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.55);
  border: 1px solid rgba(28, 40, 56, 0.08);
  box-shadow: 0 8px 24px rgba(28, 40, 56, 0.06);
  min-height: 7.5rem;
}

.name {
  font-family: 'Fraunces', serif;
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--ink);
}

.body {
  margin-top: 0.75rem;
  min-height: 3.5rem;
}
</style>

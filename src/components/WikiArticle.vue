<template>
  <article class="article">
    <h1 class="title">{{ title }}</h1>
    <p class="lead">{{ lead }}</p>
    <div class="body">
      <p v-for="(paragraph, index) in paragraphs" :key="index">{{ paragraph }}</p>
    </div>
  </article>
</template>

<script lang="ts">
export default {
  name: 'WikiArticle',
  props: {
    title: {
      type: String,
      required: true,
    },
    lead: {
      type: String,
      required: true,
    },
    paragraphs: {
      type: Array as () => string[],
      default: () => [],
    },
  },
}
</script>

<style scoped>
.article {
  max-width: 42rem;
}

.title {
  font-family: 'Fraunces', serif;
  font-size: clamp(1.9rem, 4vw, 2.5rem);
  font-weight: 600;
  letter-spacing: -0.02em;
  color: var(--ink);
  line-height: 1.2;
}

.lead {
  margin-top: 0.75rem;
  font-size: 1.05rem;
  font-weight: 300;
  color: var(--ink-soft);
}

.body {
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
}

.body p {
  font-size: 0.98rem;
  font-weight: 300;
  line-height: 1.75;
  color: var(--ink);
}
</style>

<template>
  <article class="work-item">
    <a class="name" :href="url" target="_blank" rel="noopener noreferrer">
      {{ name }}
    </a>
    <p v-if="description" class="description">{{ description }}</p>
    <p class="meta">
      <span class="language">{{ language }}</span>
    </p>
  </article>
</template>

<script lang="ts">
export default {
  name: 'WorkItem',
  props: {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    language: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
}
</script>

<style scoped>
.work-item {
  padding: 1.35rem 1.4rem;
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.55);
  border: 1px solid rgba(28, 40, 56, 0.08);
  box-shadow: 0 8px 24px rgba(28, 40, 56, 0.06);
  transition:
    border-color 0.25s ease,
    box-shadow 0.25s ease,
    transform 0.25s ease;
}

.work-item:hover {
  border-color: rgba(79, 115, 105, 0.28);
  box-shadow: 0 12px 28px rgba(28, 40, 56, 0.1);
  transform: translateY(-2px);
}

.name {
  display: inline-block;
  font-family: 'Fraunces', serif;
  font-size: 1.25rem;
  font-weight: 600;
  letter-spacing: -0.01em;
  color: var(--sage-deep);
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition:
    color 0.25s ease,
    border-color 0.25s ease;
}

.name:hover {
  color: var(--ink);
  border-bottom-color: var(--sage);
}

.description {
  margin-top: 0.55rem;
  font-size: 0.95rem;
  font-weight: 300;
  color: var(--ink-soft);
  line-height: 1.6;
  white-space: pre-line;
}

.meta {
  margin-top: 0.85rem;
  font-size: 0.8rem;
  color: var(--ink-soft);
}

.language {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
}

.language::before {
  content: '';
  width: 0.55rem;
  height: 0.55rem;
  border-radius: 50%;
  background: var(--sage);
}
</style>

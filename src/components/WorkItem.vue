<template>
  <article class="work-item">
    <div class="header">
      <a class="name" :href="url" target="_blank" rel="noopener noreferrer">
        {{ name }}
      </a>
      <span class="visibility">{{ visibility }}</span>
    </div>
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
    visibility: {
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
  padding: 1.35rem 0;
  border-bottom: 1px solid rgba(28, 40, 56, 0.1);
}

.header {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.65rem;
}

.name {
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

.visibility {
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.04em;
  color: var(--ink-soft);
  padding: 0.1rem 0.45rem;
  border: 1px solid rgba(28, 40, 56, 0.14);
  border-radius: 0.25rem;
}

.description {
  margin-top: 0.45rem;
  font-size: 0.95rem;
  font-weight: 300;
  color: var(--ink-soft);
  line-height: 1.55;
}

.meta {
  margin-top: 0.65rem;
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

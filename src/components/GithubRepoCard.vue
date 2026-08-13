<template>
  <article class="repo-card">
    <a class="name" :href="htmlUrl" target="_blank" rel="noopener noreferrer">
      {{ name }}
    </a>
    <p v-if="description" class="description">{{ description }}</p>
    <p class="meta">
      <span v-if="language" class="language">{{ language }}</span>
      <span class="stat">★ {{ stargazers }}</span>
      <span class="stat">Fork {{ forks }}</span>
    </p>
  </article>
</template>

<script lang="ts">
export default {
  name: 'GithubRepoCard',
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
      default: '',
    },
    htmlUrl: {
      type: String,
      required: true,
    },
    stargazers: {
      type: Number,
      default: 0,
    },
    forks: {
      type: Number,
      default: 0,
    },
  },
}
</script>

<style scoped>
.repo-card {
  padding: 1.15rem 1.25rem;
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.55);
  border: 1px solid rgba(28, 40, 56, 0.08);
  box-shadow: 0 8px 24px rgba(28, 40, 56, 0.06);
  min-width: 0;
}

.name {
  display: inline-block;
  font-family: 'Fraunces', serif;
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--sage-deep);
  text-decoration: none;
  border-bottom: 1px solid transparent;
  word-break: break-word;
}

.name:hover {
  color: var(--ink);
  border-bottom-color: var(--sage);
}

.description {
  margin-top: 0.45rem;
  font-size: 0.88rem;
  font-weight: 300;
  color: var(--ink-soft);
  line-height: 1.55;
}

.meta {
  margin-top: 0.75rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  font-size: 0.78rem;
  color: var(--ink-soft);
}

.language {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
}

.language::before {
  content: '';
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: var(--sage);
}
</style>

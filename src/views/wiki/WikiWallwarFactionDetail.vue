<template>
  <article v-if="faction" class="guide">
    <p class="crumb">
      <RouterLink to="/wiki/wallwar-factions">战墙流派</RouterLink>
      <span>/</span>
      <span>{{ faction.name }}</span>
    </p>
    <h1 class="title">{{ faction.name }}</h1>
    <p class="lead">{{ faction.summary }}</p>
    <p class="hint">
      配方与道具效果见
      <RouterLink to="/wiki/wallwar-items">战墙道具</RouterLink>。
    </p>

    <section v-for="section in faction.sections" :key="section.heading" class="section">
      <h2 class="heading">{{ section.heading }}</h2>
      <p v-for="(paragraph, index) in section.paragraphs" :key="index">{{ paragraph }}</p>

      <ul v-if="section.items?.length" class="notes">
        <li v-for="item in section.items" :key="item.name">
          <strong>{{ item.name }}</strong>
          <span>{{ item.text }}</span>
        </li>
      </ul>

      <article v-for="block in section.blocks" :key="block.heading" class="block">
        <h3 class="block-title">{{ block.heading }}</h3>
        <p v-for="(paragraph, index) in block.paragraphs" :key="index">{{ paragraph }}</p>
        <ul v-if="block.items?.length" class="notes">
          <li v-for="item in block.items" :key="item.name">
            <strong>{{ item.name }}</strong>
            <span>{{ item.text }}</span>
          </li>
        </ul>
      </article>

      <ul v-if="section.achievements?.length" class="achievements">
        <li v-for="item in section.achievements" :key="item.name">
          <strong>{{ item.name }}</strong>
          <span>条件：{{ item.condition }}</span>
          <span v-if="item.reward">奖励：{{ item.reward }}</span>
        </li>
      </ul>
    </section>
  </article>
  <p v-else class="missing">未找到该流派</p>
</template>

<script lang="ts">
import { wallwarFactions } from '@/data/wiki/wallwarFactions'
import type { WallwarFaction } from '@/types/wiki'

export default {
  name: 'WikiWallwarFactionDetail',
  computed: {
    faction(): WallwarFaction | undefined {
      const id = String(this.$route.params.id ?? '')
      return wallwarFactions.find((item) => item.id === id)
    },
  },
}
</script>

<style scoped>
.guide {
  width: 100%;
  max-width: 46rem;
}

.crumb {
  display: flex;
  gap: 0.4rem;
  font-size: 0.82rem;
  color: var(--ink-soft);
}

.crumb a {
  color: var(--sage-deep);
  text-decoration: none;
}

.crumb a:hover {
  color: var(--ink);
}

.title {
  margin-top: 0.55rem;
  font-family: 'Fraunces', serif;
  font-size: clamp(1.7rem, 3.2vw, 2.3rem);
  font-weight: 600;
  letter-spacing: -0.02em;
  color: var(--ink);
}

.lead {
  margin-top: 0.55rem;
  font-size: 1.02rem;
  font-weight: 300;
  line-height: 1.7;
  color: var(--ink-soft);
}

.hint {
  margin-top: 0.45rem;
  font-size: 0.82rem;
  color: var(--ink-soft);
}

.hint a {
  color: var(--sage-deep);
  text-decoration: none;
}

.section {
  margin-top: 1.5rem;
  padding-top: 1.15rem;
  border-top: 1px solid rgba(28, 40, 56, 0.1);
}

.heading {
  font-family: 'Fraunces', serif;
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--ink);
}

.section > p,
.block > p {
  margin-top: 0.55rem;
  font-size: 0.95rem;
  font-weight: 300;
  line-height: 1.7;
  color: var(--ink);
}

.notes,
.achievements {
  list-style: none;
  margin: 0.7rem 0 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.notes li,
.achievements li {
  padding: 0.55rem 0.65rem;
  border-radius: 0.55rem;
  background: rgba(255, 255, 255, 0.62);
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.notes strong,
.achievements strong {
  font-size: 0.88rem;
  color: var(--sage-deep);
}

.notes span,
.achievements span {
  font-size: 0.82rem;
  line-height: 1.5;
  color: var(--ink);
}

.block {
  margin-top: 0.9rem;
  padding: 0.85rem 0.9rem;
  border-radius: 0.75rem;
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid rgba(28, 40, 56, 0.08);
}

.block-title {
  font-family: 'Fraunces', serif;
  font-size: 1.02rem;
  font-weight: 600;
  color: var(--ink);
}

.missing {
  color: var(--ink-soft);
}
</style>

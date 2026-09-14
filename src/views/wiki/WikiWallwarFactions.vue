<template>
  <div class="page-block">
    <h1 class="title">战墙流派</h1>
    <p class="lead">
      4v4 围绕阻隔四个队伍的基岩墙进行：收集物资、击杀其他阵营、成为最终存活的队伍。Boss
      模式则把玩家分成人数少、装备强的 Boss 阵营，与人数多、生产力高的人类阵营；Boss 可用命令方块制作独特套装，并按人类方人数提升血量上限。两种模式的对局节奏一致，都是收集、战斗、死斗。
    </p>
    <p class="lead">
      新手可先看采矿、渔业、伐木三本手册对应的板块；炼药同时收录召唤与酿造，建筑同时收录奇观、普通建筑与神降祭坛。配方与道具效果见
      <RouterLink to="/wiki/wallwar-items">战墙道具</RouterLink>。
    </p>

    <section class="grid" aria-label="流派列表">
      <FactionCard
        v-for="faction in factions"
        :key="faction.id"
        :id="faction.id"
        :name="faction.name"
        :summary="faction.summary"
      />
    </section>
  </div>
</template>

<script lang="ts">
import FactionCard from '@/components/wiki/FactionCard.vue'
import { wallwarFactions } from '@/data/wiki/wallwarFactions'

export default {
  name: 'WikiWallwarFactions',
  components: { FactionCard },
  data() {
    return {
      factions: wallwarFactions,
    }
  },
}
</script>

<style scoped>
.page-block {
  width: 100%;
}

.title {
  font-family: 'Fraunces', serif;
  font-size: clamp(1.6rem, 3vw, 2.1rem);
  font-weight: 600;
  letter-spacing: -0.02em;
  color: var(--ink);
}

.lead {
  margin-top: 0.55rem;
  max-width: 46rem;
  font-size: 0.95rem;
  font-weight: 300;
  line-height: 1.7;
  color: var(--ink-soft);
}

.lead a {
  color: var(--sage-deep);
  text-decoration: none;
}

.lead a:hover {
  color: var(--ink);
}

.grid {
  margin-top: 1.05rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(16.5rem, 1fr));
  gap: 0.7rem;
}
</style>

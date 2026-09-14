<template>
  <div class="overview">
    <h1 class="title">总览</h1>
    <p class="lead">
      这里汇总 Islands 与战墙相关的游戏资料。配件、装备与战墙道具来自实际配置，可用搜索和筛选快速定位；战墙六大流派按手册写成可点进阅读的图鉴页。
    </p>

    <section class="entries" aria-label="百科分类">
      <RouterLink
        v-for="entry in entries"
        :key="entry.to"
        class="entry"
        :to="entry.to"
      >
        <span class="entry-icon" aria-hidden="true">{{ entry.icon }}</span>
        <h2 class="entry-title">{{ entry.title }}</h2>
        <p class="entry-desc">{{ entry.description }}</p>
        <span class="entry-go">进入</span>
      </RouterLink>
    </section>
  </div>
</template>

<script lang="ts">
export default {
  name: 'WikiOverview',
  data() {
    return {
      entries: [
        {
          to: '/wiki/islands-parts',
          icon: '🔶',
          title: 'Islands 配件',
          description:
            '武器与工具可装配的配件图鉴。每条包含中文名称、品质范围、可装配对象、冲突配件，以及效果说明与数值区间。支持按名称、效果搜索，也可按品质和可装配对象筛选。',
        },
        {
          to: '/wiki/islands-gear',
          icon: '🔷',
          title: 'Islands 装备',
          description:
            '熔炉商店中的升级装备。记录各等阶名称、在经典 / 水晶 / 森林 / 单人 / MiniWar 中是否启用及对应价格，以及装备效果。可按名称、效果搜索，也可按等阶和模式筛选。',
        },
        {
          to: '/wiki/wallwar-factions',
          icon: '🧱',
          title: '战墙流派',
          description:
            '战墙小游戏的六大流派：采矿、农业、伐木、渔业、炼药（含召唤与酿造）、建筑（含奇观与神降）。列表页可看一句话定位，点进详情阅读玩法、流程、物品与成就；配方细节链到战墙道具。',
        },
        {
          to: '/wiki/wallwar-items',
          icon: '⚔️',
          title: '战墙道具',
          description:
            '从战墙数据包配方与战利品表整理出的道具效果一览。每条包含名称、分类，以及物品说明里的效果文本。可按名称、效果搜索，也可按采矿 / 农业 / 伐木等分类筛选。',
        },
      ],
    }
  },
}
</script>

<style scoped>
.overview {
  width: 100%;
  max-width: 52rem;
}

.title {
  font-family: 'Fraunces', serif;
  font-size: clamp(1.7rem, 3.2vw, 2.2rem);
  font-weight: 600;
  letter-spacing: -0.02em;
  color: var(--ink);
}

.lead {
  margin-top: 0.65rem;
  font-size: 0.98rem;
  font-weight: 300;
  line-height: 1.7;
  color: var(--ink-soft);
}

.entries {
  margin-top: 1.25rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(16.5rem, 1fr));
  gap: 0.8rem;
}

.entry {
  display: flex;
  flex-direction: column;
  padding: 1rem 1.05rem 0.95rem;
  border-radius: 0.85rem;
  background: rgba(255, 255, 255, 0.78);
  border: 1px solid rgba(28, 40, 56, 0.1);
  text-decoration: none;
  color: inherit;
  min-width: 0;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.2s ease;
}

.entry:hover {
  border-color: rgba(79, 115, 105, 0.35);
  box-shadow: 0 10px 24px rgba(28, 40, 56, 0.08);
  transform: translateY(-2px);
}

.entry-icon {
  font-size: 1.15rem;
  line-height: 1;
}

.entry-title {
  margin-top: 0.55rem;
  font-family: 'Fraunces', serif;
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--ink);
}

.entry-desc {
  margin-top: 0.45rem;
  flex: 1;
  font-size: 0.86rem;
  font-weight: 300;
  line-height: 1.6;
  color: var(--ink);
}

.entry-go {
  margin-top: 0.85rem;
  font-size: 0.82rem;
  font-weight: 500;
  letter-spacing: 0.04em;
  color: var(--sage-deep);
}
</style>

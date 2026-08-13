<template>
  <main class="page">
    <div class="atmosphere" aria-hidden="true"></div>

    <div class="content">
      <h1 class="title">作品</h1>

      <section class="works" aria-label="作品列表">
        <WorkItem
          v-for="work in works"
          :key="work.name"
          :name="work.name"
          :description="work.description"
          :language="work.language"
          :url="work.url"
        />
      </section>
    </div>
  </main>
</template>

<script lang="ts">
import WorkItem from '@/components/WorkItem.vue'

export default {
  name: 'WorksView',
  components: {
    WorkItem,
  },
  data() {
    return {
      works: [
        {
          name: 'Vue网站开发学习',
          description: '这是我制作的第一个网站项目（也就是本网站），通过WebStorm开发学习Vue这个集合框架如何使用。\n本网站有四个界面，主页、作品、百科、关于，每一栏都有作用。',
          language: 'Vue',
          url: 'https://github.com/ShiinaYumeka/my_first_website',
        },
        {
          name: 'Android应用开发学习',
          description: '这是我制作的首个安卓APP，用于学习Android Studio的开发。本应用有四个选项：主页、时间线、计算器、设置，支持滑动切换。',
          language: 'Kotlin',
          url: 'https://github.com/ShiinaYumeka/MyFirstApplication',
        },
        {
          name: '战墙WallWar数据包',
          description: '基于Minecraft数据包开发的墙战小游戏，是我首个独立制作并持续更新、运营的小游戏。本数据包在mc玩法的基础上拓展出六大流派：采矿、农业、伐木、渔业、炼药、建筑，游戏玩法丰富。',
          language: 'mcfunction',
          url: 'https://github.com/ShiinaYumeka/wallwar',
        },
        {
          name: 'Slay the Nana',
          description: '基于杀戮尖塔2开发的 C# 模组，是我首次接触C#以及非mc的二创开发。本模组添加了一个基础角色，以及全套角色卡牌、遗物、药水等，并可与原版角色、先古之民兼容。',
          language: 'C#',
          url: 'https://github.com/ShiinaYumeka/slay-the-nana',
        },
        {
          name: '决斗之战客户端模组',
          description: '基于Kotlin编写的客户端模组，致力于制作一个Minecraft客户端模组小游戏。',
          language: 'Kotlin',
          url: 'https://github.com/ShiinaYumeka/battle-war',
        },
        {
          name: '战墙WallWar客户端插件',
          description: '支持Minecraft Paper端 Java 插件扩展，用于帮助实现战墙小游戏中需要实现但难以用数据包实现的内容。',
          language: 'Java',
          url: 'https://github.com/ShiinaYumeka/wallwarplugins',
        },
      ],
    }
  },
}
</script>

<style scoped>
.page {
  position: relative;
  min-height: 100vh;
  padding: 5.5rem 1.5rem 3rem;
  overflow-x: hidden;
}

.atmosphere {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 80% 55% at 50% -10%, rgba(255, 255, 255, 0.7), transparent 55%),
    radial-gradient(ellipse 50% 40% at 85% 80%, rgba(109, 143, 134, 0.22), transparent 60%),
    radial-gradient(ellipse 45% 35% at 10% 70%, rgba(184, 205, 217, 0.55), transparent 55%),
    linear-gradient(165deg, #e8f0f5 0%, #d2e0e8 45%, #c5d8d4 100%);
}

.atmosphere::after {
  content: '';
  position: absolute;
  inset: 0;
  opacity: 0.35;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  mix-blend-mode: soft-light;
  pointer-events: none;
}

.content {
  position: relative;
  z-index: 1;
  max-width: 52rem;
  margin: 0 auto;
}

.title {
  font-family: 'Fraunces', serif;
  font-size: clamp(2.2rem, 6vw, 3rem);
  font-weight: 600;
  letter-spacing: -0.02em;
  color: var(--ink);
  margin-bottom: 1.25rem;
}

.works {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

@media (max-width: 640px) {
  .works {
    grid-template-columns: 1fr;
  }
}
</style>

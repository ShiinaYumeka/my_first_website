import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import WorksView from '@/views/WorksView.vue'
import WikiView from '@/views/WikiView.vue'
import AboutView from '@/views/AboutView.vue'
import WikiOverview from '@/views/wiki/WikiOverview.vue'
import WikiIslandParts from '@/views/wiki/WikiIslandParts.vue'
import WikiIslandGear from '@/views/wiki/WikiIslandGear.vue'
import WikiWallwarFactions from '@/views/wiki/WikiWallwarFactions.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/works',
      name: 'works',
      component: WorksView,
    },
    {
      path: '/wiki',
      component: WikiView,
      redirect: '/wiki/overview',
      children: [
        {
          path: 'overview',
          name: 'wiki-overview',
          component: WikiOverview,
        },
        {
          path: 'island-parts',
          name: 'wiki-island-parts',
          component: WikiIslandParts,
        },
        {
          path: 'island-gear',
          name: 'wiki-island-gear',
          component: WikiIslandGear,
        },
        {
          path: 'wallwar-factions',
          name: 'wiki-wallwar-factions',
          component: WikiWallwarFactions,
        },
      ],
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
  ],
})

export default router

import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import WorksView from '@/views/WorksView.vue'
import WikiView from '@/views/WikiView.vue'
import AboutView from '@/views/AboutView.vue'
import WikiOverview from '@/views/wiki/WikiOverview.vue'
import WikiIslandParts from '@/views/wiki/WikiIslandParts.vue'
import WikiIslandGear from '@/views/wiki/WikiIslandGear.vue'
import WikiWallwarFactions from '@/views/wiki/WikiWallwarFactions.vue'
import WikiWallwarFactionDetail from '@/views/wiki/WikiWallwarFactionDetail.vue'
import WikiWallwarItems from '@/views/wiki/WikiWallwarItems.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
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
          path: 'islands-parts',
          name: 'wiki-islands-parts',
          component: WikiIslandParts,
        },
        {
          path: 'island-parts',
          redirect: '/wiki/islands-parts',
        },
        {
          path: 'islands-gear',
          name: 'wiki-islands-gear',
          component: WikiIslandGear,
        },
        {
          path: 'island-gear',
          redirect: '/wiki/islands-gear',
        },
        {
          path: 'wallwar-factions',
          name: 'wiki-wallwar-factions',
          component: WikiWallwarFactions,
        },
        {
          path: 'wallwar-factions/:id',
          name: 'wiki-wallwar-faction',
          component: WikiWallwarFactionDetail,
        },
        {
          path: 'wallwar-items',
          name: 'wiki-wallwar-items',
          component: WikiWallwarItems,
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

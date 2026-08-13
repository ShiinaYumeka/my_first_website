import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import WorksView from '@/views/WorksView.vue'
import WikiView from '@/views/WikiView.vue'
import AboutView from '@/views/AboutView.vue'
import WikiOverview from '@/views/wiki/WikiOverview.vue'
import WikiProjects from '@/views/wiki/WikiProjects.vue'
import WikiMinecraft from '@/views/wiki/WikiMinecraft.vue'
import WikiDev from '@/views/wiki/WikiDev.vue'
import WikiMisc from '@/views/wiki/WikiMisc.vue'

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
          path: 'projects',
          name: 'wiki-projects',
          component: WikiProjects,
        },
        {
          path: 'minecraft',
          name: 'wiki-minecraft',
          component: WikiMinecraft,
        },
        {
          path: 'dev',
          name: 'wiki-dev',
          component: WikiDev,
        },
        {
          path: 'misc',
          name: 'wiki-misc',
          component: WikiMisc,
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

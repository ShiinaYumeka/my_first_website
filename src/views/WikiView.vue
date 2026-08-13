<template>
  <main class="page">
    <div class="atmosphere" aria-hidden="true"></div>

    <div class="layout">
      <aside class="sidebar" aria-label="百科目录">
        <div class="sidebar-brand">百科</div>

        <nav class="sidebar-nav">
          <RouterLink
            v-for="item in menu"
            :key="item.to"
            class="menu-item"
            :to="item.to"
            active-class="is-active"
          >
            <span class="menu-icon" aria-hidden="true">{{ item.icon }}</span>
            <span class="menu-label">{{ item.label }}</span>
          </RouterLink>
        </nav>
      </aside>

      <section class="panel">
        <RouterView />
      </section>
    </div>
  </main>
</template>

<script lang="ts">
export default {
  name: 'WikiView',
  data() {
    return {
      menu: [
        { to: '/wiki/overview', label: '总览', icon: '◇' },
        { to: '/wiki/island-parts', label: 'Island配件', icon: '▣' },
        { to: '/wiki/island-gear', label: 'Island装备', icon: '⬡' },
        { to: '/wiki/wallwar-factions', label: '战墙流派', icon: '○' },
      ],
    }
  },
}
</script>

<style scoped>
.page {
  position: relative;
  min-height: 100vh;
  padding: 4.25rem 0 0;
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

.layout {
  position: relative;
  z-index: 1;
  display: flex;
  min-height: calc(100vh - 4.25rem);
}

.sidebar {
  flex: 0 0 13.5rem;
  display: flex;
  flex-direction: column;
  padding: 1.5rem 0.85rem 2rem;
  background: rgba(255, 255, 255, 0.42);
  border-right: 1px solid rgba(28, 40, 56, 0.08);
  backdrop-filter: blur(8px);
}

.sidebar-brand {
  padding: 0.35rem 0.85rem 1.25rem;
  font-family: 'Fraunces', serif;
  font-size: 1.35rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: var(--ink);
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.55rem 0.85rem;
  border-radius: 0.65rem;
  color: var(--ink-soft);
  text-decoration: none;
  font-size: 0.92rem;
  font-weight: 500;
  letter-spacing: 0.02em;
  transition:
    color 0.2s ease,
    background-color 0.2s ease;
}

.menu-item:hover {
  color: var(--ink);
  background: rgba(255, 255, 255, 0.45);
}

.menu-item.is-active {
  color: var(--ink);
  background: rgba(109, 143, 134, 0.22);
}

.menu-icon {
  width: 1.1rem;
  text-align: center;
  font-size: 0.8rem;
  opacity: 0.75;
}

.menu-item.is-active .menu-icon {
  opacity: 1;
  color: var(--sage-deep);
}

.panel {
  flex: 1;
  min-width: 0;
  padding: 2rem 1.75rem 3rem;
}

@media (max-width: 720px) {
  .layout {
    flex-direction: column;
  }

  .sidebar {
    flex: none;
    border-right: none;
    border-bottom: 1px solid rgba(28, 40, 56, 0.08);
    padding-bottom: 1rem;
  }

  .sidebar-nav {
    flex-direction: row;
    overflow-x: auto;
    gap: 0.35rem;
    padding-bottom: 0.25rem;
  }

  .menu-item {
    white-space: nowrap;
  }

  .panel {
    padding: 1.5rem 1.25rem 2.5rem;
  }
}
</style>

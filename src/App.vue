<template>
  <div class="app-shell">
    <nav class="top-nav" aria-label="主导航">
      <RouterLink class="nav-link" to="/" active-class="" exact-active-class="is-active">主页</RouterLink>
      <RouterLink class="nav-link" to="/works" active-class="is-active">作品</RouterLink>
      <RouterLink class="nav-link" to="/wiki" active-class="is-active">百科</RouterLink>
      <RouterLink class="nav-link" to="/about" active-class="is-active">关于</RouterLink>
    </nav>

    <RouterView />
  </div>
</template>

<script lang="ts">
export default {
  name: 'App',
}
</script>

<style scoped>
.app-shell {
  min-height: 100vh;
}

.top-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  justify-content: center;
  gap: clamp(1.25rem, 5vw, 3rem);
  padding: 1.1rem 1.5rem;
  background: rgba(232, 240, 245, 0.72);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(28, 40, 56, 0.06);
}

.nav-link {
  color: var(--ink-soft);
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  letter-spacing: 0.06em;
  padding-bottom: 0.2rem;
  border-bottom: 1.5px solid transparent;
  transition:
    color 0.25s ease,
    border-color 0.25s ease;
}

.nav-link:hover {
  color: var(--ink);
}

.nav-link.is-active {
  color: var(--ink);
  border-bottom-color: var(--sage);
}
</style>

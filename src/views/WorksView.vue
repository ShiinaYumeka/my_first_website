<template>
  <main class="page">
    <div class="atmosphere" aria-hidden="true"></div>
    <h1 class="title">这是一个作品</h1>
  </main>
</template>

<script lang="ts">
export default {
  name: 'WorksView',
}
</script>

<style scoped>
.page {
  position: relative;
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 5rem 1.5rem 2.5rem;
  overflow: hidden;
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

.title {
  position: relative;
  z-index: 1;
  font-family: 'Fraunces', serif;
  font-size: clamp(2.4rem, 7vw, 3.4rem);
  font-weight: 600;
  letter-spacing: -0.02em;
  color: var(--ink);
}
</style>

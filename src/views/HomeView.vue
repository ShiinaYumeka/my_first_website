<template>
  <main class="page">
    <div class="atmosphere" aria-hidden="true"></div>

    <section class="profile">
      <img
        class="avatar"
        src="/icon.jpg"
        alt="ShiinaYumeka"
        width="160"
        height="160"
      />

      <h1 class="name">ShiinaYumeka</h1>
      <p class="tagline">My First Website</p>

      <ul class="links">
        <li>
          <a href="https://github.com/ShiinaYumeka" target="_blank" rel="noopener noreferrer">
            GitHub主页
          </a>
        </li>
      </ul>
    </section>
  </main>
</template>

<script lang="ts">
export default {
  name: 'HomeView',
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
  animation: drift 18s ease-in-out infinite alternate;
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

.profile {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 28rem;
}

.avatar {
  width: 9rem;
  height: 9rem;
  object-fit: cover;
  border-radius: 50%;
  border: 3px solid rgba(255, 255, 255, 0.75);
  box-shadow: 0 12px 40px rgba(28, 40, 56, 0.12);
  animation: rise 0.9s ease both;
}

.name {
  margin-top: 1.75rem;
  font-family: 'Fraunces', serif;
  font-size: clamp(2.4rem, 7vw, 3.4rem);
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.1;
  color: var(--ink);
  animation: rise 0.9s ease 0.12s both;
}

.tagline {
  margin-top: 0.85rem;
  font-size: 1.05rem;
  font-weight: 300;
  color: var(--ink-soft);
  letter-spacing: 0.02em;
  animation: rise 0.9s ease 0.22s both;
}

.links {
  list-style: none;
  margin-top: 2rem;
  padding: 0;
  display: flex;
  gap: 1.5rem;
  animation: rise 0.9s ease 0.34s both;
}

.links a {
  color: var(--sage-deep);
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  letter-spacing: 0.04em;
  border-bottom: 1px solid transparent;
  transition:
    color 0.25s ease,
    border-color 0.25s ease;
}

.links a:hover {
  color: var(--ink);
  border-bottom-color: var(--sage);
}

@keyframes rise {
  from {
    opacity: 0;
    transform: translateY(14px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes drift {
  from {
    transform: scale(1) translate(0, 0);
  }
  to {
    transform: scale(1.04) translate(-1%, 1%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .atmosphere,
  .avatar,
  .name,
  .tagline,
  .links {
    animation: none;
  }
}
</style>

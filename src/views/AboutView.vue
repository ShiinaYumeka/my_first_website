<template>
  <main class="page">
    <div class="atmosphere" aria-hidden="true"></div>

    <div class="content">
      <p class="eyebrow">About</p>
      <h1 class="title">关于</h1>
      <p class="lead">想联系我的话，可以从下面这些入口找到我。</p>

      <section class="cards" aria-label="联系方式">
        <a
          class="card"
          href="https://space.bilibili.com/673260403"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span class="icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <rect x="3.5" y="6.5" width="17" height="12" rx="3" stroke="currentColor" stroke-width="1.6" />
              <path d="M8 6.5 10.2 3.8M16 6.5 13.8 3.8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
              <path d="M9 12.2v2.2M15 12.2v2.2" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
            </svg>
          </span>
          <span class="card-body">
            <span class="label">B站主页</span>
            <span class="value">space.bilibili.com/673260403</span>
          </span>
        </a>

        <a
          class="card"
          href="https://github.com/ShiinaYumeka"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span class="icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.2A9.8 9.8 0 0 0 2.2 12c0 4.33 2.81 8 6.71 9.29.49.1.67-.21.67-.47v-1.66c-2.73.59-3.3-1.17-3.3-1.17-.45-1.14-1.1-1.45-1.1-1.45-.9-.62.07-.6.07-.6 1 .07 1.52 1.03 1.52 1.03.89 1.52 2.33 1.08 2.9.83.09-.65.35-1.08.63-1.33-2.18-.25-4.47-1.09-4.47-4.85 0-1.07.38-1.95 1.02-2.64-.1-.25-.44-1.27.1-2.64 0 0 .83-.27 2.73 1.01a9.4 9.4 0 0 1 4.97 0c1.9-1.28 2.73-1.01 2.73-1.01.54 1.37.2 2.39.1 2.64.64.69 1.02 1.57 1.02 2.64 0 3.77-2.3 4.6-4.49 4.84.36.31.68.92.68 1.86v2.76c0 .26.18.57.68.47A9.81 9.81 0 0 0 21.8 12 9.8 9.8 0 0 0 12 2.2Z" />
            </svg>
          </span>
          <span class="card-body">
            <span class="label">GitHub</span>
            <span class="value">github.com/ShiinaYumeka</span>
          </span>
        </a>

        <button class="card card-button" type="button" @click="copyText('qq', '3249250682')">
          <span class="icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M7.4 10.2c0-2.8 2-5.4 4.6-5.4s4.6 2.6 4.6 5.4c1.7.7 2.9 2.2 2.9 3.8 0 1.4-1 2.6-2.4 3.3.4 1.4-.2 2.8-1.7 3.2-1.2.3-2.4-.2-3.4-1.1-.6.2-1.2.3-1.8.3s-1.2-.1-1.8-.3c-1 1-2.2 1.4-3.4 1.1-1.5-.4-2.1-1.8-1.7-3.2C4.5 16.6 3.5 15.4 3.5 14c0-1.6 1.2-3.1 2.9-3.8Z" stroke="currentColor" stroke-width="1.5" />
            </svg>
          </span>
          <span class="card-body">
            <span class="label">QQ</span>
            <span class="value">3249250682</span>
            <span class="hint">{{ copied === 'qq' ? '已复制号码' : '点击复制' }}</span>
          </span>
        </button>

        <a class="card" href="mailto:IceBlueCrystal20536@outlook.com">
          <span class="icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <rect x="3.5" y="6" width="17" height="12" rx="2.2" stroke="currentColor" stroke-width="1.6" />
              <path d="m5 8 7 5 7-5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>
          <span class="card-body">
            <span class="label">邮箱</span>
            <span class="value">IceBlueCrystal20536@outlook.com</span>
          </span>
        </a>
      </section>
    </div>
  </main>
</template>

<script lang="ts">
export default {
  name: 'AboutView',
  data() {
    return {
      copied: '' as '' | 'qq',
    }
  },
  methods: {
    async copyText(key: 'qq', value: string) {
      try {
        await navigator.clipboard.writeText(value)
      } catch {
        const input = document.createElement('input')
        input.value = value
        document.body.appendChild(input)
        input.select()
        document.execCommand('copy')
        input.remove()
      }
      this.copied = key
      window.setTimeout(() => {
        if (this.copied === key) this.copied = ''
      }, 1600)
    },
  },
}
</script>

<style scoped>
.page {
  position: relative;
  min-height: 100vh;
  padding: 5.5rem 1.5rem 3rem;
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

.content {
  position: relative;
  z-index: 1;
  max-width: 42rem;
  margin: 0 auto;
}

.eyebrow {
  font-size: 0.78rem;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--sage-deep);
}

.title {
  margin-top: 0.35rem;
  font-family: 'Fraunces', serif;
  font-size: clamp(2.2rem, 6vw, 3rem);
  font-weight: 600;
  letter-spacing: -0.02em;
  color: var(--ink);
}

.lead {
  margin-top: 0.7rem;
  font-size: 1.02rem;
  font-weight: 300;
  color: var(--ink-soft);
}

.cards {
  margin-top: 1.6rem;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.85rem;
}

.card {
  display: flex;
  align-items: flex-start;
  gap: 0.85rem;
  min-width: 0;
  padding: 1.15rem 1.2rem;
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.58);
  border: 1px solid rgba(28, 40, 56, 0.08);
  box-shadow: 0 10px 28px rgba(28, 40, 56, 0.06);
  text-decoration: none;
  color: inherit;
  transition:
    transform 0.22s ease,
    box-shadow 0.22s ease,
    border-color 0.22s ease;
}

.card-button {
  font: inherit;
  text-align: left;
  cursor: pointer;
}

.card:hover {
  transform: translateY(-3px);
  border-color: rgba(79, 115, 105, 0.28);
  box-shadow: 0 16px 34px rgba(28, 40, 56, 0.1);
}

.icon {
  flex: 0 0 auto;
  display: grid;
  place-items: center;
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 0.75rem;
  background: rgba(109, 143, 134, 0.16);
  color: var(--sage-deep);
}

.icon svg {
  width: 1.2rem;
  height: 1.2rem;
}

.card-body {
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.18rem;
}

.label {
  font-size: 0.78rem;
  font-weight: 500;
  letter-spacing: 0.06em;
  color: var(--ink-soft);
}

.value {
  font-size: 0.92rem;
  color: var(--ink);
  word-break: break-all;
  line-height: 1.45;
}

.hint {
  font-size: 0.72rem;
  color: var(--sage-deep);
}

@media (max-width: 640px) {
  .cards {
    grid-template-columns: 1fr;
  }
}

@media (prefers-reduced-motion: reduce) {
  .card {
    transition: none;
  }

  .card:hover {
    transform: none;
  }
}
</style>

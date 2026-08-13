<template>
  <main class="page">
    <div class="atmosphere" aria-hidden="true"></div>

    <p v-if="status === 'loading'" class="status">正在加载 GitHub 资料…</p>
    <p v-else-if="status === 'error'" class="status error">{{ errorMessage }}</p>

    <div v-else-if="user" class="layout">
      <aside class="profile">
        <img
          class="avatar"
          :src="avatarSrc"
          :alt="displayName"
          width="160"
          height="160"
          @error="onAvatarError"
        />

        <h1 class="name">{{ displayName }}</h1>
        <p v-if="user.login" class="login">{{ user.login }}</p>
        <p v-if="user.bio" class="bio">{{ user.bio }}</p>
        <p v-if="user.type" class="type">{{ user.type }}</p>

        <ul class="facts">
          <li v-if="user.company">{{ user.company }}</li>
          <li v-if="user.location">{{ user.location }}</li>
          <li v-if="user.blog">
            <a :href="blogHref" target="_blank" rel="noopener noreferrer">{{ user.blog }}</a>
          </li>
          <li v-if="user.twitter_username">
            <a
              :href="`https://x.com/${user.twitter_username}`"
              target="_blank"
              rel="noopener noreferrer"
            >
              @{{ user.twitter_username }}
            </a>
          </li>
          <li v-if="user.email">
            <a :href="`mailto:${user.email}`">{{ user.email }}</a>
          </li>
          <li v-if="user.html_url">
            <a :href="user.html_url" target="_blank" rel="noopener noreferrer">GitHub 主页</a>
          </li>
        </ul>

        <p class="counts">
          <span>{{ user.followers }} 关注者</span>
          <span>{{ user.following }} 正在关注</span>
          <span>{{ user.public_repos }} 仓库</span>
          <span>{{ user.public_gists }} Gist</span>
        </p>

        <p v-if="createdLabel" class="joined">{{ createdLabel }}</p>

        <section v-if="user.organizations?.length" class="orgs">
          <h2 class="section-title">组织</h2>
          <ul class="org-list">
            <li v-for="org in user.organizations" :key="org.login">
              <a :href="org.html_url" :title="org.description || org.login" target="_blank" rel="noopener noreferrer">
                <img :src="org.avatar_url" :alt="org.login" width="32" height="32" />
                <span>{{ org.login }}</span>
              </a>
            </li>
          </ul>
        </section>
      </aside>

      <section class="main">
        <section v-if="user.activity" class="block">
          <h2 class="section-title">贡献</h2>
          <p class="activity-meta">
            {{ user.activity.from }} — {{ user.activity.to }}
            · 范围 {{ user.activity.scope }}
          </p>
          <p class="activity-totals">
            总计 {{ user.activity.total_contributions }}
            · Commit {{ user.activity.total_commit_contributions }}
            · Issue {{ user.activity.total_issue_contributions }}
            · PR {{ user.activity.total_pull_request_contributions }}
            · Review {{ user.activity.total_pull_request_review_contributions }}
          </p>
          <ContributionCalendar
            v-if="user.activity.contribution_calendar"
            :weeks="user.activity.contribution_calendar.weeks"
            :total="user.activity.contribution_calendar.total_contributions"
          />
        </section>

        <section v-if="user.activity?.timeline?.length" class="block">
          <h2 class="section-title">月度时间线</h2>
          <ul class="timeline">
            <li v-for="item in user.activity.timeline" :key="item.month">
              <span>{{ item.month }}</span>
              <span>{{ item.contribution_count }}</span>
            </li>
          </ul>
        </section>

        <section v-if="user.pinned_repositories?.length" class="block">
          <h2 class="section-title">Pinned</h2>
          <div class="repo-grid">
            <GithubRepoCard
              v-for="repo in user.pinned_repositories"
              :key="repo.full_name"
              :name="repo.name"
              :description="repo.description"
              :language="repo.language"
              :html-url="repo.html_url"
              :stargazers="repo.stargazers"
              :forks="repo.forks"
            />
          </div>
        </section>

        <section v-if="user.repositories?.length" class="block">
          <h2 class="section-title">最近仓库</h2>
          <div class="repo-grid">
            <GithubRepoCard
              v-for="repo in user.repositories"
              :key="repo.full_name"
              :name="repo.name"
              :description="repo.description"
              :language="repo.language"
              :html-url="repo.html_url"
              :stargazers="repo.stargazers"
              :forks="repo.forks"
            />
          </div>
        </section>
      </section>
    </div>
  </main>
</template>

<script lang="ts">
import ContributionCalendar from '@/components/ContributionCalendar.vue'
import GithubRepoCard from '@/components/GithubRepoCard.vue'
import { fetchGithubUser } from '@/api/githubUser'
import { UapiError, type GithubUser } from '@/types/githubUser'

export default {
  name: 'HomeView',
  components: {
    ContributionCalendar,
    GithubRepoCard,
  },
  data() {
    return {
      user: null as GithubUser | null,
      status: 'loading' as 'loading' | 'ready' | 'error',
      errorMessage: '',
      avatarFailed: false,
    }
  },
  computed: {
    displayName(): string {
      return this.user?.name || this.user?.login || 'ShiinaYumeka'
    },
    avatarSrc(): string {
      if (this.avatarFailed || !this.user?.avatar_url) return '/icon.jpg'
      return this.user.avatar_url
    },
    blogHref(): string {
      const blog = this.user?.blog ?? ''
      if (!blog) return ''
      return /^https?:\/\//i.test(blog) ? blog : `https://${blog}`
    },
    createdLabel(): string {
      if (!this.user?.created_at) return ''
      const date = new Date(this.user.created_at)
      if (Number.isNaN(date.getTime())) return ''
      return `加入于 ${date.getFullYear()} 年 ${date.getMonth() + 1} 月`
    },
  },
  created() {
    this.loadProfile()
  },
  methods: {
    onAvatarError() {
      this.avatarFailed = true
    },
    async loadProfile() {
      this.status = 'loading'
      try {
        this.user = await fetchGithubUser('ShiinaYumeka')
        this.status = 'ready'
      } catch (error) {
        this.status = 'error'
        if (error instanceof UapiError) {
          const requestHint = error.requestId ? `（${error.requestId}）` : ''
          this.errorMessage = `${error.message}${requestHint}`
        } else {
          this.errorMessage = '加载 GitHub 资料失败'
        }
      }
    },
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

.status {
  position: relative;
  z-index: 1;
  max-width: 64rem;
  margin: 0 auto;
  color: var(--ink-soft);
}

.status.error {
  color: #8a3b3b;
}

.layout {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 16.5rem minmax(0, 1fr);
  gap: 2.5rem;
  max-width: 64rem;
  margin: 0 auto;
  align-items: start;
}

.profile {
  display: flex;
  flex-direction: column;
}

.avatar {
  width: 9rem;
  height: 9rem;
  object-fit: cover;
  border-radius: 50%;
  border: 3px solid rgba(255, 255, 255, 0.75);
  box-shadow: 0 12px 40px rgba(28, 40, 56, 0.12);
}

.name {
  margin-top: 1.1rem;
  font-family: 'Fraunces', serif;
  font-size: 1.85rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.15;
  color: var(--ink);
}

.login,
.type,
.joined,
.activity-meta,
.activity-totals {
  color: var(--ink-soft);
  font-weight: 300;
}

.login {
  margin-top: 0.2rem;
  font-size: 1.05rem;
}

.bio {
  margin-top: 0.85rem;
  font-size: 0.95rem;
  line-height: 1.55;
  color: var(--ink);
}

.type {
  margin-top: 0.45rem;
  font-size: 0.82rem;
}

.facts {
  list-style: none;
  margin-top: 1.1rem;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  font-size: 0.9rem;
  color: var(--ink-soft);
}

.facts a {
  color: var(--sage-deep);
  text-decoration: none;
  border-bottom: 1px solid transparent;
}

.facts a:hover {
  color: var(--ink);
  border-bottom-color: var(--sage);
}

.counts {
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem 1rem;
  font-size: 0.85rem;
  color: var(--ink);
}

.joined {
  margin-top: 0.7rem;
  font-size: 0.82rem;
}

.orgs {
  margin-top: 1.4rem;
}

.org-list {
  list-style: none;
  margin-top: 0.6rem;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.org-list a {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--ink);
  text-decoration: none;
  font-size: 0.88rem;
}

.org-list img {
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 0.4rem;
  object-fit: cover;
}

.section-title {
  font-family: 'Fraunces', serif;
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--ink);
}

.main {
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
}

.block {
  min-width: 0;
}

.activity-meta {
  margin-top: 0.35rem;
  font-size: 0.85rem;
}

.activity-totals {
  margin: 0.35rem 0 0.9rem;
  font-size: 0.85rem;
}

.timeline {
  list-style: none;
  margin-top: 0.7rem;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(7.5rem, 1fr));
  gap: 0.45rem;
}

.timeline li {
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0.45rem 0.6rem;
  border-radius: 0.55rem;
  background: rgba(255, 255, 255, 0.5);
  font-size: 0.8rem;
  color: var(--ink-soft);
}

.repo-grid {
  margin-top: 0.75rem;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.85rem;
}

@keyframes drift {
  from {
    transform: scale(1) translate(0, 0);
  }
  to {
    transform: scale(1.04) translate(-1%, 1%);
  }
}

@media (max-width: 860px) {
  .layout {
    grid-template-columns: 1fr;
  }

  .repo-grid {
    grid-template-columns: 1fr;
  }
}

@media (prefers-reduced-motion: reduce) {
  .atmosphere {
    animation: none;
  }
}
</style>

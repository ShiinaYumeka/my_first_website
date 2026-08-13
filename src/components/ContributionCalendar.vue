<template>
  <div class="calendar" role="img" :aria-label="label">
    <div class="weeks">
      <div v-for="(week, weekIndex) in weeks" :key="week.first_day || weekIndex" class="week">
        <span
          v-for="day in paddedDays(week.contribution_days)"
          :key="day.key"
          class="day"
          :class="{ empty: day.empty }"
          :style="{ backgroundColor: day.color }"
          :title="day.title"
        />
      </div>
    </div>
    <p class="caption">{{ label }}</p>
  </div>
</template>

<script lang="ts">
import type { ContributionDay, ContributionWeek } from '@/types/githubUser'

interface DisplayDay {
  key: string
  color: string
  title: string
  empty: boolean
}

export default {
  name: 'ContributionCalendar',
  props: {
    weeks: {
      type: Array as () => ContributionWeek[],
      default: () => [],
    },
    total: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    label(): string {
      return `过去一年 ${this.total} 次贡献`
    },
  },
  methods: {
    paddedDays(days: ContributionDay[] = []): DisplayDay[] {
      const byWeekday = new Map<number, ContributionDay>()
      for (const day of days) {
        byWeekday.set(day.weekday, day)
      }

      const result: DisplayDay[] = []
      for (let weekday = 0; weekday <= 6; weekday += 1) {
        const day = byWeekday.get(weekday)
        if (day) {
          result.push({
            key: day.date,
            color: day.color || '#ebedf0',
            title: `${day.date}：${day.contribution_count} 次贡献`,
            empty: false,
          })
        } else {
          result.push({
            key: `empty-${weekday}`,
            color: 'transparent',
            title: '',
            empty: true,
          })
        }
      }
      return result
    },
  },
}
</script>

<style scoped>
.calendar {
  overflow-x: auto;
}

.weeks {
  display: flex;
  gap: 3px;
  min-width: min-content;
}

.week {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.day {
  width: 11px;
  height: 11px;
  border-radius: 2px;
  background: #ebedf0;
}

.day.empty {
  visibility: hidden;
}

.caption {
  margin-top: 0.75rem;
  font-size: 0.82rem;
  color: var(--ink-soft);
}
</style>

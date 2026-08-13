<template>
  <section class="panel" aria-label="随机数生成">
    <h2 class="section-title">随机数</h2>

    <form class="form" @submit.prevent="generate">
      <label class="field">
        <span>最小值</span>
        <input v-model.number="min" type="number" step="1" />
      </label>
      <label class="field">
        <span>最大值</span>
        <input v-model.number="max" type="number" step="1" />
      </label>
      <label class="field">
        <span>数量</span>
        <input v-model.number="count" type="number" step="1" min="1" />
      </label>

      <label class="check">
        <input v-model="allowRepeat" type="checkbox" />
        <span>允许重复</span>
      </label>
      <label class="check">
        <input v-model="allowDecimal" type="checkbox" />
        <span>生成小数</span>
      </label>
      <label v-if="allowDecimal" class="field">
        <span>小数位数</span>
        <input v-model.number="decimalPlaces" type="number" step="1" min="0" />
      </label>

      <button class="submit" type="submit" :disabled="loading">
        {{ loading ? '生成中…' : '生成' }}
      </button>
    </form>

    <p v-if="errorMessage" class="error" role="alert">{{ errorMessage }}</p>
    <ul v-else-if="numbers.length" class="numbers" aria-live="polite">
      <li v-for="(number, index) in numbers" :key="`${index}-${number}`">
        {{ number }}
      </li>
    </ul>
  </section>
</template>

<script lang="ts">
import { fetchRandomNumbers } from '@/api/randomNumber'
import { describeUapiError } from '@/api/uapi'

export default {
  name: 'RandomNumberPanel',
  data() {
    return {
      min: 1,
      max: 100,
      count: 1,
      allowRepeat: false,
      allowDecimal: false,
      decimalPlaces: 2,
      numbers: [] as number[],
      errorMessage: '',
      loading: false,
    }
  },
  methods: {
    async generate() {
      this.loading = true
      this.errorMessage = ''
      this.numbers = []

      try {
        const result = await fetchRandomNumbers({
          min: Number(this.min),
          max: Number(this.max),
          count: Number(this.count),
          allow_repeat: this.allowRepeat,
          allow_decimal: this.allowDecimal,
          decimal_places: Number(this.decimalPlaces),
        })
        this.numbers = result.numbers
      } catch (error) {
        this.errorMessage = describeUapiError(error)
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style scoped>
.panel {
  margin-top: 1.4rem;
  padding-top: 1.2rem;
  border-top: 1px solid rgba(28, 40, 56, 0.1);
}

.section-title {
  font-family: 'Fraunces', serif;
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--ink);
}

.form {
  margin-top: 0.7rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-size: 0.78rem;
  color: var(--ink-soft);
}

.field input {
  height: 2.05rem;
  padding: 0 0.65rem;
  border: 1px solid rgba(28, 40, 56, 0.14);
  border-radius: 0.55rem;
  background: rgba(255, 255, 255, 0.82);
  color: var(--ink);
  font: inherit;
  font-size: 0.88rem;
}

.field input:focus,
.submit:focus-visible {
  outline: 2px solid rgba(79, 115, 105, 0.35);
  outline-offset: 1px;
}

.check {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.82rem;
  color: var(--ink-soft);
}

.submit {
  margin-top: 0.2rem;
  height: 2.15rem;
  border: 0;
  border-radius: 0.55rem;
  background: var(--sage-deep);
  color: #f7fbf9;
  font: inherit;
  font-size: 0.88rem;
  font-weight: 500;
  letter-spacing: 0.04em;
  cursor: pointer;
}

.submit:hover:not(:disabled) {
  background: var(--ink);
}

.submit:disabled {
  opacity: 0.65;
  cursor: wait;
}

.error {
  margin-top: 0.65rem;
  font-size: 0.8rem;
  line-height: 1.45;
  color: #8a3b3b;
}

.numbers {
  list-style: none;
  margin-top: 0.7rem;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.numbers li {
  padding: 0.35rem 0.55rem;
  border-radius: 0.45rem;
  background: rgba(255, 255, 255, 0.55);
  font-size: 0.85rem;
  color: var(--ink);
  font-variant-numeric: tabular-nums;
}
</style>

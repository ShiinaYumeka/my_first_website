import { UapiError, type GithubUser } from '@/types/githubUser'

const API_URL = 'https://uapis.cn/api/v1/github/user'
const GITHUB_USER_PATTERN = /^[A-Za-z0-9-]{1,39}$/
const REQUEST_TIMEOUT_MS = 15_000
const MAX_RETRIES = 2
const BACKOFF_MS = [500, 1000, 2000]
const CACHE_KEY = 'uapi-github-user:ShiinaYumeka'
const DEFAULT_USER = 'ShiinaYumeka'

const RETRYABLE_STATUSES = new Set([408, 429, 500, 502, 503, 504])

function getApiKey(): string {
  return (import.meta.env.VITE_UAPI_KEY ?? '').trim()
}

function isGithubUsername(user: string): boolean {
  return GITHUB_USER_PATTERN.test(user)
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function asRecord(value: unknown): Record<string, unknown> | null {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    return value as Record<string, unknown>
  }
  return null
}

function readString(record: Record<string, unknown> | null, key: string): string {
  const value = record?.[key]
  return typeof value === 'string' ? value : ''
}

function parseErrorPayload(payload: unknown): { code: string; message: string } {
  const record = asRecord(payload)
  const codeValue = record?.code
  const code =
    typeof codeValue === 'string' && codeValue
      ? codeValue
      : readString(record, 'error') || 'UNKNOWN_ERROR'
  const message =
    readString(record, 'message') ||
    readString(record, 'error') ||
    '请求失败'
  return { code, message }
}

function retryDelayMs(response: Response, attempt: number): number {
  const retryAfter = response.headers.get('Retry-After')
  if (retryAfter) {
    const seconds = Number(retryAfter)
    if (Number.isFinite(seconds) && seconds >= 0) {
      return seconds * 1000
    }
  }
  return BACKOFF_MS[attempt] ?? BACKOFF_MS[BACKOFF_MS.length - 1] ?? 2000
}

async function requestGithubUser(user: string): Promise<GithubUser> {
  if (!isGithubUsername(user)) {
    throw new UapiError(400, 'INVALID_PARAMETER', 'GitHub 用户名格式不正确')
  }

  const url = new URL(API_URL)
  url.searchParams.set('user', user)
  url.searchParams.set('activity', 'true')
  url.searchParams.set('pinned', 'true')
  url.searchParams.set('repos', 'true')
  url.searchParams.set('repos_limit', '6')

  const key = getApiKey()
  const headers: HeadersInit = {}
  if (key) {
    headers.Authorization = `Bearer ${key}`
  }

  let lastError: unknown

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt += 1) {
    const controller = new AbortController()
    const timeoutId = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

    try {
      const response = await fetch(url.toString(), {
        method: 'GET',
        headers,
        signal: controller.signal,
      })

      const requestId = response.headers.get('X-Request-ID') ?? ''

      if (response.ok) {
        return (await response.json()) as GithubUser
      }

      let payload: unknown = null
      try {
        payload = await response.json()
      } catch {
        payload = null
      }

      const { code, message } = parseErrorPayload(payload)
      const error = new UapiError(response.status, code, message, requestId)

      const canRetry =
        attempt < MAX_RETRIES && RETRYABLE_STATUSES.has(response.status)
      if (canRetry) {
        await sleep(retryDelayMs(response, attempt))
        continue
      }

      throw error
    } catch (error) {
      lastError = error

      if (error instanceof UapiError) {
        throw error
      }

      const isAbort =
        error instanceof DOMException && error.name === 'AbortError'
      const canRetry = attempt < MAX_RETRIES
      if (isAbort && canRetry) {
        await sleep(BACKOFF_MS[attempt] ?? 2000)
        continue
      }

      if (isAbort) {
        throw new UapiError(408, 'REQUEST_TIMEOUT', '请求超时，请稍后重试')
      }

      if (canRetry) {
        await sleep(BACKOFF_MS[attempt] ?? 2000)
        continue
      }

      throw new UapiError(0, 'NETWORK_ERROR', '网络异常，请检查连接后重试')
    } finally {
      window.clearTimeout(timeoutId)
    }
  }

  if (lastError instanceof UapiError) {
    throw lastError
  }
  throw new UapiError(0, 'NETWORK_ERROR', '网络异常，请检查连接后重试')
}

function readCache(): GithubUser | null {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as GithubUser
  } catch {
    return null
  }
}

function writeCache(user: GithubUser): void {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(user))
  } catch {
    // Ignore quota / private-mode failures.
  }
}

export async function fetchGithubUser(
  user = DEFAULT_USER,
): Promise<GithubUser> {
  const cached = readCache()
  if (cached) return cached

  const data = await requestGithubUser(user)
  writeCache(data)
  return data
}

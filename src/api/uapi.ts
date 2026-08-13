import { UapiError } from '@/types/githubUser'

const REQUEST_TIMEOUT_MS = 15_000
const MAX_RETRIES = 2
const BACKOFF_MS = [500, 1000, 2000]
const RETRYABLE_STATUSES = new Set([408, 429, 500, 502, 503, 504])
const NON_RETRYABLE_CODES = new Set([
  'INVALID_ARGUMENT',
  'INVALID_PARAMETER',
  'INVALID_PARAMS',
  'UNAUTHORIZED',
  'AUTHENTICATION_REQUIRED',
  'INSUFFICIENT_CREDITS',
  'CORS_FORBIDDEN',
  'ACCESS_DENIED',
  'NOT_FOUND',
  'VISITOR_MONTHLY_QUOTA_EXHAUSTED',
])

export { UapiError }

export function getApiKey(): string {
  const key = (import.meta.env.VITE_UAPI_KEY ?? '').trim()
  if (key && !key.startsWith('uapi-')) {
    throw new UapiError(
      0,
      'INVALID_CONFIG',
      'UAPI 密钥格式无效，应以 uapi- 开头',
    )
  }
  return key
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => window.setTimeout(resolve, ms))
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

function parseErrorPayload(
  payload: unknown,
  status: number,
): { code: string; message: string } {
  const record = asRecord(payload)
  const codeValue = record?.code
  const errorValue = record?.error
  const details = record?.details

  let code = ''
  if (typeof codeValue === 'string' && codeValue) {
    code = codeValue
  } else if (typeof errorValue === 'string' && errorValue) {
    code = errorValue
  } else if (typeof codeValue === 'number' && codeValue === 429) {
    code = 'RATE_LIMIT_EXCEEDED'
  } else if (status === 429) {
    code = 'RATE_LIMIT_EXCEEDED'
  } else {
    code = 'UNKNOWN_ERROR'
  }

  const message =
    readString(record, 'message') ||
    (typeof details === 'string' ? details : '') ||
    (typeof errorValue === 'string' && errorValue !== code ? errorValue : '') ||
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

export async function uapiGet<T>(
  url: string,
  params: Record<string, string> = {},
): Promise<T> {
  const endpoint = new URL(url)
  for (const [key, value] of Object.entries(params)) {
    endpoint.searchParams.set(key, value)
  }

  const headers: HeadersInit = {
    Accept: 'application/json',
  }

  const apiKey = getApiKey()
  if (apiKey) {
    headers.Authorization = `Bearer ${apiKey}`
  }

  let lastError: unknown

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt += 1) {
    const controller = new AbortController()
    const timeoutId = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

    try {
      const response = await fetch(endpoint.toString(), {
        method: 'GET',
        headers,
        signal: controller.signal,
      })

      const requestId = response.headers.get('X-Request-ID') ?? ''

      if (response.ok) {
        return (await response.json()) as T
      }

      let payload: unknown = null
      try {
        payload = await response.json()
      } catch {
        payload = null
      }

      const { code, message } = parseErrorPayload(payload, response.status)
      const error = new UapiError(response.status, code, message, requestId)

      const canRetry =
        attempt < MAX_RETRIES &&
        RETRYABLE_STATUSES.has(response.status) &&
        !NON_RETRYABLE_CODES.has(code)
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

export function describeUapiError(error: unknown): string {
  if (!(error instanceof UapiError)) {
    return '请求失败，请稍后重试'
  }

  switch (error.code) {
    case 'INVALID_CONFIG':
      return error.message
    case 'INVALID_ARGUMENT':
    case 'INVALID_PARAMETER':
    case 'INVALID_PARAMS':
      return error.message || '请求参数无效'
    case 'UNAUTHORIZED':
    case 'AUTHENTICATION_REQUIRED':
      return 'API 密钥无效或未携带，请检查 .env.local 中的 VITE_UAPI_KEY'
    case 'INSUFFICIENT_CREDITS':
      return error.message || '账户积分不足，无法继续调用'
    case 'CORS_FORBIDDEN':
      return '浏览器跨域调用未携带有效密钥'
    case 'ACCESS_DENIED':
    case 'FORBIDDEN':
      return '当前密钥无权调用该接口'
    case 'NOT_FOUND':
      return '未找到请求的资源'
    case 'RATE_LIMIT_EXCEEDED':
    case 'SERVICE_BUSY':
      return '请求过于频繁，请稍后再试'
    case 'VISITOR_MONTHLY_QUOTA_EXHAUSTED':
      return '访客本月免费额度已用尽，请登录账号或等待下月重置'
    case 'REQUEST_TIMEOUT':
      return '请求超时，请稍后重试'
    case 'NETWORK_ERROR':
      return '网络异常，请检查连接后重试'
    case 'INTERNAL_SERVER_ERROR':
    case 'API_ERROR':
    case 'SERVICE_UNAVAILABLE':
    case 'UPSTREAM_TIMEOUT':
    case 'UPSTREAM_ERROR':
      return error.requestId
        ? `服务暂时不可用，请稍后重试（${error.requestId}）`
        : '服务暂时不可用，请稍后重试'
    default:
      return error.message || `请求失败（HTTP ${error.status}）`
  }
}

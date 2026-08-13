import { UapiError } from '@/types/githubUser'
import { uapiGet } from './uapi'

export interface RandomNumberResponse {
  numbers: number[]
}

export interface RandomNumberParams {
  min: number
  max: number
  count: number
  allow_repeat: boolean
  allow_decimal: boolean
  decimal_places: number
}

const RANDOM_NUMBER_API = 'https://uapis.cn/api/v1/misc/randomnumber'

function isInteger(value: number): boolean {
  return Number.isInteger(value)
}

export function validateRandomNumberParams(
  params: RandomNumberParams,
): string | null {
  const { min, max, count, allow_repeat, allow_decimal, decimal_places } =
    params

  if (!Number.isFinite(min) || !isInteger(min)) {
    return 'min 必须是整数'
  }
  if (!Number.isFinite(max) || !isInteger(max)) {
    return 'max 必须是整数'
  }
  if (!Number.isFinite(count) || !isInteger(count)) {
    return 'count 必须是整数'
  }
  if (min > max) {
    return "Invalid parameters. 'min' cannot be greater than 'max'."
  }
  if (!allow_repeat && max - min + 1 < count) {
    return '不重复生成时，取值范围 (max - min + 1) 必须大于或等于数量 count'
  }
  if (allow_decimal && (!Number.isFinite(decimal_places) || !isInteger(decimal_places))) {
    return 'decimal_places 必须是整数'
  }

  return null
}

export async function fetchRandomNumbers(
  params: RandomNumberParams,
): Promise<RandomNumberResponse> {
  const validationError = validateRandomNumberParams(params)
  if (validationError) {
    throw new UapiError(400, 'INVALID_ARGUMENT', validationError)
  }

  const query: Record<string, string> = {
    min: String(params.min),
    max: String(params.max),
    count: String(params.count),
    allow_repeat: String(params.allow_repeat),
    allow_decimal: String(params.allow_decimal),
  }

  if (params.allow_decimal) {
    query.decimal_places = String(params.decimal_places)
  }

  const data = await uapiGet<RandomNumberResponse>(RANDOM_NUMBER_API, query)

  if (!data || !Array.isArray(data.numbers)) {
    throw new UapiError(0, 'UNKNOWN_ERROR', '返回结果缺少 numbers 数组')
  }

  return data
}

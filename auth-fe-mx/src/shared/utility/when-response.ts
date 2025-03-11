import { and, curryN, propEq, T } from 'ramda'
import type {
  When200Json,
  WhenResponse,
  WhenResponse1Input,
} from '@/shared/utility/when-response.shape.ts'
import type { ResponseSync } from '@/shared/data/response-sync.ts'

export const whenResponse: WhenResponse = curryN(
  2,
  (
    conditionFn: (response: ResponseSync) => boolean,
    ifTrueFn: <TOutput>(response: ResponseSync) => TOutput | Promise<TOutput>,
  ) => [
    (response: ResponseSync) => response instanceof Response && conditionFn(response),
    ifTrueFn,
  ],
)

export const elseResponse: WhenResponse1Input = <TOutput>(
  fallbackFn: (response: ResponseSync) => TOutput | Promise<TOutput>,
) => [T, fallbackFn]

export const isJson = (response: ResponseSync): boolean =>
  response.isJson || response.headers.get('content-type')?.includes('application/json')
export const is200 = propEq(200, 'status')
export const is400 = propEq(400, 'status')

export const wrapJsonAsInput = <TInput>(if200JsonFn: (json: TInput) => TOutput | Promise<TOutput>) => (response) => if200JsonFn(response.jsonSync<TInput>())

export const when200 = whenResponse(is200)
export const when200Json: When200Json = <TInput, TOutput>(
  if200JsonFn: (json: TInput) => TOutput | Promise<TOutput>,
) => whenResponse(and(is200, isJson), wrapJsonAsInput<TInput>(if200JsonFn))

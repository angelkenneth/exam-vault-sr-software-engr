import { both, curryN, propEq, T } from 'ramda'
import type {
  WhenJsonResponse,
  WhenResponse,
  WhenResponse1Input,
} from '@/shared/utility/when-response.shape.ts'
import type { ResponseSync } from '@/shared/data/response-sync.ts'

export const whenResponse: WhenResponse = curryN(
  2,
  (
    conditionFn: (response: ResponseSync) => boolean,
    ifTrueFn: <TOutput = void>(response: ResponseSync) => TOutput | Promise<TOutput>,
  ) => [
    (response: ResponseSync) => response instanceof Response && conditionFn(response),
    ifTrueFn,
  ],
)

export const elseResponse: WhenResponse1Input = <TOutput = void>(
  fallbackFn: (response: ResponseSync) => TOutput | Promise<TOutput>,
) => [T, fallbackFn]

export const isJson = (response: ResponseSync): boolean =>
  response.isJson || response.headers.get('content-type')?.includes('application/json') || false
export const is200 = propEq(200, 'status')
export const is201 = propEq(201, 'status')
export const is400 = propEq(400, 'status')
export const is401 = propEq(401, 'status')
export const is404 = propEq(404, 'status')

export const wrapJsonAsInput =
  <TInput, TOutput = void>(if200JsonFn: (json: TInput) => TOutput | Promise<TOutput>) =>
  (response: ResponseSync) =>
    if200JsonFn(response.jsonSync<TInput>())

export const when200 = whenResponse(is200)
export const when200Json: WhenJsonResponse = <TInput, TOutput = void>(
  if200JsonFn: (json: TInput) => TOutput | Promise<TOutput>,
) => whenResponse((r) => both(is200, isJson)(r), wrapJsonAsInput<TInput, TOutput>(if200JsonFn))
export const when201 = whenResponse(is201)

export const when401 = whenResponse(is401)
export const when404 = whenResponse(is404)

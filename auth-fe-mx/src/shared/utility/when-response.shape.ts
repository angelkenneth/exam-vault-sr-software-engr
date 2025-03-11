import type { ResponseSync } from '@/shared/data/response-sync.ts'
import type { PlainZodError } from '@/shared/data/plain-zod-error.ts'

export interface WhenResponse {
  <TOutput>(
    conditionFn: (response: ResponseSync) => boolean,
    ifTrueFn: (response: ResponseSync) => TOutput | Promise<TOutput>,
  ): WhenResponseCondition<TOutput>

  (conditionFn: (response: ResponseSync) => boolean): WhenResponse1Input
}

export interface WhenResponse1Input {
  <TOutput>(ifTrueFn: (response: ResponseSync) => TOutput | Promise<TOutput>): WhenResponseCondition<TOutput>
}

export interface When200Json {
  <TInput, TOutput>(
    if200JsonFn: (json: TInput) => TOutput | Promise<TOutput>,
  ): WhenResponseCondition<TOutput>
}

export type WhenResponseCondition<TOutput> = [
  conditionFn: (response: ResponseSync) => boolean,
  ifTrueFn: (response: ResponseSync) => TOutput | Promise<TOutput>,
]

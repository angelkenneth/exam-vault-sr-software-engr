import { is400, isJson, whenResponse, wrapJsonAsInput } from '@/shared/utility/when-response.ts'
import { allPass } from 'ramda'
import type { ResponseSync } from '@/shared/data/response-sync.ts'
import type { WhenZodError } from '@/shared/utility/when-zod-error.shape.ts'
import type { ZodError } from 'zod'

export const isZodError = (response: ResponseSync): boolean =>
  response.jsonSync<ZodError>?.().name === 'ZodError'

export const whenZodError: WhenZodError = <TInput, TOutput = void>(
  ifZodErrorFn: (json: TInput) => TOutput | Promise<TOutput>,
) =>
  whenResponse(allPass([is400, isJson, isZodError]), wrapJsonAsInput<TInput, TOutput>(ifZodErrorFn))

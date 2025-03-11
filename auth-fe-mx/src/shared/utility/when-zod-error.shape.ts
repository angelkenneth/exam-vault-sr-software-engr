import type { PlainZodError } from '@/shared/data/plain-zod-error.ts'
import type { WhenResponseCondition } from '@/shared/utility/when-response.shape.ts'

export interface WhenZodError {
  <TInput, TOutput>(
    ifZodErrorFn: (zodError: PlainZodError<TInput>) => TOutput | Promise<TOutput>,
  ): WhenResponseCondition<TOutput>
}

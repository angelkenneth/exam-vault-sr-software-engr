import type { ZodError } from 'zod'

export type PlainZodError<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- copied from ZodError
  T = any,
> = Pick<ZodError<T>, 'name' | 'issues'>

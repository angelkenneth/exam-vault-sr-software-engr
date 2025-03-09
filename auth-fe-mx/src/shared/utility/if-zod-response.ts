import type { PlainZodError } from '@/shared/data/plain-zod-error.ts'

export const ifZodResponse =
  <TInput, TResult = never>(onZodErrorFn: (error: PlainZodError<TInput>) => TResult | Promise<TResult>) =>
  async (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- copied from Promise.catch
    reason: any,
  ): Promise<TResult> => {
    if (reason && reason instanceof Response) {
      const json = await reason.json()
      if (json.name === 'ZodError') {
        return onZodErrorFn(json)
      }
    }
    throw reason
  }

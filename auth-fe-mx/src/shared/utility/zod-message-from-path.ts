import { areSameArray } from '@/shared/utility/are-same-array.ts'
import type { PlainZodError } from '@/shared/data/plain-zod-error.ts'

/**
 * Returns the first message from the ZodError at the given path.
 */
export const zodMessageFromPath = <TInput>(
  path: string[],
  zodError: PlainZodError<TInput>,
): string | null => {
  const issue = zodError.issues.find((issue) => areSameArray(issue.path, path))
  if (issue) {
    return issue.message
  }
  return null
}

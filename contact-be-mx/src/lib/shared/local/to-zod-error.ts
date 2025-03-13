import { ZodError, ZodIssue } from 'zod';

export const toZodError = (keyErrorPair: Record<string, string>): ZodError => {
  const issues: ZodIssue[] = Object.entries(keyErrorPair).map(
    ([key, message]) => ({
      path: [key],
      message,
      code: 'custom',
    })
  );
  return new ZodError(issues);
};

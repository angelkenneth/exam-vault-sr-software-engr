import type { ZodError } from 'zod';

export type PlainZodError<T = any> = Pick<ZodError<T>, 'name' | 'issues'>;

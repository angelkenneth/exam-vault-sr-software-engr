import { z } from 'zod';

export const tokenInputSchema = z.object({
  token: z.string(),
});

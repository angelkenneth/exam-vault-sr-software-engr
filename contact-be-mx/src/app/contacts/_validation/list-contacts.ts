import { z } from 'zod';

export const listContactsSchema = z.object({
  excludeShared: z.boolean().optional(),
});

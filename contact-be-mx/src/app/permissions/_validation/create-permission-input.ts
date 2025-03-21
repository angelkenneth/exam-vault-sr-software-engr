import { z } from 'zod';

export const createPermissionInputSchema = z.strictObject({
  contactId: z.number().int().positive(),
  sharedToId: z.number().int().positive(),
  allowUpdate: z.boolean().default(false),
  allowDelete: z.boolean().default(false),
});

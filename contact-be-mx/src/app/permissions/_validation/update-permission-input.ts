import { z } from 'zod';

export const updatePermissionInputSchema = z.strictObject({
  contactId: z.number().int().positive().optional(),
  sharedToId: z.number().int().positive().optional(),
  allowUpdate: z.boolean().optional(),
  allowDelete: z.boolean().optional(),
});

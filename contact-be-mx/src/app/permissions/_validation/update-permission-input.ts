import { z } from 'zod';

export const updatePermissionInputSchema = z.strictObject({
  allowUpdate: z.boolean().optional(),
  allowDelete: z.boolean().optional(),
});

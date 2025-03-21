import { z } from 'zod';

export const deletePermissionInputSchema = z.strictObject({
  permissionId: z.coerce.number().int().positive(),
});

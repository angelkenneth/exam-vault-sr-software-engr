import { z } from 'zod';

export const getByIdPermissionInputSchema = z.strictObject({
  permissionId: z.coerce.number().int().positive(),
});

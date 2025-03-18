import { z } from 'zod';

export const getByIdContactInputSchema = z.strictObject({
  contactId: z.coerce.number().int().positive(),
});

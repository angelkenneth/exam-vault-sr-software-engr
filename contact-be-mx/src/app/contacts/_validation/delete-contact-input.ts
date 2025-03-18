import { z } from 'zod';

export const deleteContactInputSchema = z.strictObject({
  contactId: z.coerce.number().int(),
});

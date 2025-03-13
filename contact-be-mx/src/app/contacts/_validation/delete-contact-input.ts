import { z } from 'zod';

export const deleteContactInputSchema = z.strictObject({
  id: z.number(),
});

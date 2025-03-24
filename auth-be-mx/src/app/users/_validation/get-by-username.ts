import { z } from 'zod';

export const getByUsernameInputSchema = z.object({
  username: z.string().nonempty(),
});

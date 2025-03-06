import { z } from 'zod';
import { isValidUsername } from '@/app/users/_validation/is-valid-username';
import { isValidPassword } from '@/app/users/_validation/is-valid-password';

export const signInInputSchema = z.object({
  username: z.string().refine(isValidUsername, { message: 'Invalid username' }),
  password: z.string().refine(isValidPassword, { message: 'Invalid password' }),
});

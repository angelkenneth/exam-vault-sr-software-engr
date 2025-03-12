import { z, RefinementCtx } from 'zod';
import {
  isValidUsernameZodObfuscated,
  isValidUsernameZodVerbose,
} from '@/app/users/_validation/is-valid-username';
import {
  isValidPasswordZodObfuscated,
  isValidPasswordZodVerbose,
} from '@/app/users/_validation/is-valid-password';

export const createPasswordSchema = (
  isValidUsername: (username: string, ctx: RefinementCtx) => void,
  isValidPassword: (password: string, ctx: RefinementCtx) => void
) => ({
  username: z.string().nonempty().superRefine(isValidUsername),
  password: z.string().nonempty().superRefine(isValidPassword),
});

export const registerInputSchema = z.object(
  createPasswordSchema(isValidUsernameZodVerbose, isValidPasswordZodVerbose)
);
export const signInInputSchema = z.object(
  createPasswordSchema(
    isValidUsernameZodObfuscated,
    isValidPasswordZodObfuscated
  )
);

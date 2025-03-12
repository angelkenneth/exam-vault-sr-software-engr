import { pipe, prop } from 'ramda';
import { ZodIssueCode } from 'zod';
import type { RefinementCtx } from 'zod';

export const isValidUsernameDetailed = (username: string) => {
  const validationMap = {
    isLongEnough: username.length >= 8,
    isShortEnough: username.length <= 32,
    startsWithLetter: /^[a-zA-Z]/.test(username),
    areValidCharacters: /^[a-zA-Z0-9_]+$/.test(username),
  };
  const isValid = Object.values(validationMap).every(Boolean);
  return { ...validationMap, isValid };
};

export const isValidUsername = pipe(isValidUsernameDetailed, prop('isValid'));

export const isValidUsernameZodObfuscated = (
  username: string,
  ctx: RefinementCtx
) => {
  if (!isValidUsername(username)) {
    ctx.addIssue({
      code: ZodIssueCode.custom,
      message: 'Invalid username',
    });
  }
};

export const isValidUsernameZodVerbose = (
  username: string,
  ctx: RefinementCtx
) => {
  const {
    isValid,
    isLongEnough,
    isShortEnough,
    startsWithLetter,
    areValidCharacters,
    ...unexpectedValidation
  } = isValidUsernameDetailed(username);
  if (!isLongEnough) {
    ctx.addIssue({
      code: ZodIssueCode.too_small,
      message: 'Username must be at least 8 characters',
      type: 'string',
      inclusive: true,
      minimum: 8,
    });
  }
  if (!isShortEnough) {
    ctx.addIssue({
      code: ZodIssueCode.too_big,
      message: 'Username cannot be longer than 32 characters',
      type: 'string',
      inclusive: true,
      maximum: 32,
    });
  }
  if (!startsWithLetter) {
    ctx.addIssue({
      code: ZodIssueCode.custom,
      message: 'Username must start with a letter',
    });
  }
  if (!areValidCharacters) {
    ctx.addIssue({
      code: ZodIssueCode.custom,
      message: 'Username can only contain letters, numbers, and underscores',
    });
  }

  // Note: Ideally you would handle these cases gracefully
  Object.entries(unexpectedValidation).forEach(([key]) =>
    ctx.addIssue({
      code: ZodIssueCode.custom,
      message: `Failed: ${key}`,
    })
  );
};

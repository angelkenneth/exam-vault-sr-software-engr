import { pipe, prop } from 'ramda';
import { ZodIssueCode } from 'zod';
import type { RefinementCtx } from 'zod';
import { escapeRegex } from '@/lib/shared/escape-regex';

/**
 * Ref: https://owasp.org/www-community/password-special-characters
 */
export const validSpecialCharacters = '!"#$%&\'()*+,\-./:;<=>?@[\\]^_`{|}~';
export const validSpecialRegex = new RegExp(
  `[${escapeRegex(validSpecialCharacters)}]`,
  'g'
);

export const isValidPasswordDetailed = (password: string) => {
  const validationMap = {
    isLongEnough: password.length >= 8,
    isShortEnough: password.length <= 64,
    hasLowerCase: /[a-z]/.test(password),
    hasUpperCase: /[A-Z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecialCharacter: [...password.matchAll(validSpecialRegex)].length >= 1,
  };
  const isValid = Object.values(validationMap).every(Boolean);
  return { ...validationMap, isValid };
};

export const isValidPassword = pipe(isValidPasswordDetailed, prop('isValid'));

export const isValidPasswordZodObfuscated = (
  password: string,
  ctx: RefinementCtx
) => {
  if (!isValidPassword(password)) {
    ctx.addIssue({
      code: ZodIssueCode.custom,
      message: 'Invalid password',
    });
  }
};

export const isValidPasswordZodVerbose = (
  password: string,
  ctx: RefinementCtx
) => {
  const {
    isValid,
    isLongEnough,
    isShortEnough,
    hasLowerCase,
    hasUpperCase,
    hasNumber,
    hasSpecialCharacter,
    ...unexpectedValidation
  } = isValidPasswordDetailed(password);
  if (!isLongEnough) {
    ctx.addIssue({
      code: ZodIssueCode.too_small,
      message: 'Password must be at least 8 characters',
      type: 'string',
      inclusive: true,
      minimum: 8,
    });
  }
  if (!isShortEnough) {
    ctx.addIssue({
      code: ZodIssueCode.too_big,
      message: 'Password cannot be longer than 64 characters',
      type: 'string',
      inclusive: true,
      maximum: 64,
    });
  }
  if (!hasLowerCase) {
    ctx.addIssue({
      code: ZodIssueCode.custom,
      message: 'Password must contain a lowercase letter',
    });
  }
  if (!hasUpperCase) {
    ctx.addIssue({
      code: ZodIssueCode.custom,
      message: 'Password must contain an uppercase letter',
    });
  }
  if (!hasNumber) {
    ctx.addIssue({
      code: ZodIssueCode.custom,
      message: 'Password must contain a number',
    });
  }
  if (!hasSpecialCharacter) {
    ctx.addIssue({
      code: ZodIssueCode.custom,
      message: `Contain at least 1 special character: ${validSpecialCharacters}`,
    });
  }
  if (Object.keys(unexpectedValidation).length > 0) {
    ctx.addIssue({
      code: ZodIssueCode.custom,
      message: 'Unexpected validation issues',
    });
  }
};

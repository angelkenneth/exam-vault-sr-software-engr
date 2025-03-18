import { RefinementCtx, z } from 'zod';
import parsePhoneNumberFromString from 'libphonenumber-js';

/**
 * Ref: https://stackoverflow.com/a/78046054/912215
 */
export const isValidMobileNumberE164 = (
  mobileNumberE164: string,
  ctx: RefinementCtx
) => {
  const phone = parsePhoneNumberFromString(mobileNumberE164);
  if (phone && phone.isValid()) {
    return phone.number;
  }

  ctx.addIssue({
    code: z.ZodIssueCode.custom,
    message: 'Invalid phone number',
  });
  return z.NEVER;
};

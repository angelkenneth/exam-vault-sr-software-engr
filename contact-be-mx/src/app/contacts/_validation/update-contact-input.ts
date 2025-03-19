import { z } from 'zod';
import { isValidMobileNumberE164 } from '@/app/contacts/_validation/is-valid-mobile-number-e164';

export const updateContactInputSchema = z.strictObject({
  mobileNumberE164: z.string().nonempty().transform(isValidMobileNumberE164).optional(),
});

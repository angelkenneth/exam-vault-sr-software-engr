import { z } from 'zod';

export const createPermissionInputSchema = z
  .strictObject({
    contactId: z.number().int().positive(),
    sharedToId: z.number().int().positive().optional(),
    sharedToUsername: z.string().optional(),
    allowUpdate: z.boolean().default(false),
    allowDelete: z.boolean().default(false),
  })
  .superRefine((input, ctx) => {
    if (!input.sharedToId && !input.sharedToUsername) {
      ['sharedToId', 'sharedToUsername'].forEach((key) => {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: [key],
          message: 'sharedToId or sharedToUsername is required',
        });
      });
    }
  });

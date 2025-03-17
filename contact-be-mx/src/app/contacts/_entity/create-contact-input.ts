export interface CreateContactDatabaseInput {
  ownerId: number;
  mobileNumberE164: string;
}

export type CreateContactApiInput = Omit<
  CreateContactDatabaseInput,
  'ownerId'
>;

import { GenericUserInput, User } from '@/app/users/_local/user';
import { db } from '@/db';
import { usersTable } from '@/db/schema';

export const createUser = async (input: GenericUserInput): Promise<User> =>
  db
    .insert(usersTable)
    .values(input)
    .returning()
    .then((r) => r[0]);

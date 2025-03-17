import { User } from '@/app/users/_entity/user';
import { db } from '@/db';
import { usersTable } from '@/db/schema';
import { eq } from 'drizzle-orm';

export const getUserByUsername = async (
  username: string
): Promise<User | null> =>
  db
    .select()
    .from(usersTable)
    .where(eq(usersTable.username, username))
    .limit(1)
    .then((r) => r[0] || null);

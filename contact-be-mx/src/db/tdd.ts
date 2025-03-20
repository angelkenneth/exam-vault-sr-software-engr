import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';

const client = createClient({ url: 'file:db-tdd.sqlite3' });
export const db = drizzle(client);

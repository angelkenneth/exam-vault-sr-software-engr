import { ConfigModel } from '@/app/config/_local/model';
import { db } from '@/db';
import { configTable } from '@/db/schema';
import { randomString } from '@/lib/shared/random-string';

/**
 * Gets or creates the config row
 *
 * Note: I know, this is not secure, but good enough for demonstration
 */
export const getConfig = async (): Promise<ConfigModel> => {
  const [existingConfig] = await db.select().from(configTable).limit(1);
  if (existingConfig) {
    return existingConfig;
  }
  const secretKey = randomString(32);
  return db
    .insert(configTable)
    .values({ secretKey })
    .returning()
    .then((r) => r[0]);
};

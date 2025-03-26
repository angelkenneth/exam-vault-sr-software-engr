import { scryptSync, randomBytes } from "crypto";

/**
 * Ref: https://stackoverflow.com/a/67038052/912215
 */
export const hashPassword = (password: string): string => {
  const salt = randomBytes(16).toString("hex");
  const buf = scryptSync(password, salt, 64)
  return `${buf.toString("hex")}.${salt}`;
};

import { scryptSync, timingSafeEqual } from "crypto";

/**
 * Ref: https://stackoverflow.com/a/67038052/912215
 */
export const verifyPassword = (
  storedPassword: string,
  suppliedPassword: string
): boolean => {
  const [hashedPassword, salt] = storedPassword.split(".");
  const hashedPasswordBuf = Buffer.from(hashedPassword, "hex");
  const suppliedPasswordBuf = scryptSync(suppliedPassword, salt, 64);
  return timingSafeEqual(hashedPasswordBuf, suppliedPasswordBuf);
};

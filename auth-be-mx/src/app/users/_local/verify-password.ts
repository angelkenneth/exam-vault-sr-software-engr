import { compareSync } from 'bcrypt';

export const verifyPassword = (
  hashedPassword: string,
  inputPassword: string
): boolean => {
  return compareSync(inputPassword, hashedPassword);
};

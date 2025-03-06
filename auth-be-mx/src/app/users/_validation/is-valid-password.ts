export const isValidPassword = (password: string): boolean => {
  const isLongEnough = password.length >= 8;
  const isShortEnough = password.length <= 64;
  const hasLowerCase = /[a-z]/.test(password);
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialCharacter = /[^a-zA-Z0-9]/.test(password);
  return (
    isLongEnough &&
    isShortEnough &&
    hasLowerCase &&
    hasUpperCase &&
    hasNumber &&
    hasSpecialCharacter
  );
};

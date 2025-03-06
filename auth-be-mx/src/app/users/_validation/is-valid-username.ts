export const isValidUsername = (username: string): boolean => {
  const isLongEnough = username.length >= 8;
  const isShortEnough = username.length <= 32;
  const startsWithLetter = /^[a-zA-Z]/.test(username);
  const areValidCharacters = /^[a-zA-Z0-9_]+$/.test(username);
  return (
    isLongEnough && isShortEnough && startsWithLetter && areValidCharacters
  );
};

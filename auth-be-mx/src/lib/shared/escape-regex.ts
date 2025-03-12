/**
 * Credit: https://stackoverflow.com/a/3561711/912215
 */
export const escapeRegex = (str: string) =>
  str.replace(/[/\-\\^$*+?.()|[\]{}]/g, '\\$&');

export const areSameArray = <T>(a: T[], b: T[]): boolean => {
  if (a.length === 0 || b.length === 0) {
    return false
  }
  if (a.length !== b.length) {
    return false
  }
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return false
    }
  }
  return true
}

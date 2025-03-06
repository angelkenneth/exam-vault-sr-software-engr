import { expect, describe, it } from 'vitest';
import { isValidPassword } from './is-valid-password';

describe('isValidPassword', () => {
  describe('given an edge case', () => {
    const edgeCases = [
      { name: 'blank', input: '' },
      { name: 'short', input: 'aA1!' },
      { name: 'long', input: '_'.repeat(65) },
      { name: 'too simple', input: '' },
    ];
    it.each(edgeCases)('should return false for %s', ({ input }) => {
      expect(isValidPassword(input)).toBe(false);
    });
  });
  describe('given a valid password', () => {
    const validPasswords = ['aA1!aA1!', '123abcABC!@#'];
    it.each(validPasswords)('should return true for %s', (input) => {
      expect(isValidPassword(input)).toBe(true);
    });
  });
});

import { expect, describe, it } from 'vitest';
import {
  isValidPassword,
  validSpecialCharacters,
  validSpecialRegex,
} from './is-valid-password';
import { pluck } from 'ramda';

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

describe('validSpecialCharacters', () => {
  it('should still display properly', () => {
    /**
     * It must display properly, as seen in [OWASP](https://owasp.org/www-community/password-special-characters)
     * without the space.  This is used when displaying to the end user
     */
    expect(validSpecialCharacters).toBe('!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~');
  });
});

describe('validSpecialRegex', () => {
  describe('given unsafe regexp characters', () => {
    it('should still find them', () => {
      const input = "'[]\\-^";
      const output = pluck(0, [...input.matchAll(validSpecialRegex)]);
      expect(output).toEqual(["'", '[', ']', '\\', '-', '^']);
    });
  });
});

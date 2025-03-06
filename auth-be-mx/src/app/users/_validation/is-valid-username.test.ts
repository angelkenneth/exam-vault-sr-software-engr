import { expect, describe, it } from 'vitest';
import { isValidUsername } from './is-valid-username';

describe('isValidUsername', () => {
  describe('given a edge case', () => {
    const edgeCases = [
      { name: 'blank', input: '' },
      { name: 'too short', input: 'a' },
      { name: 'too long', input: 'a'.repeat(33) },
      { name: 'invalid characters', input: 'aA1!@' },
      { name: 'starts with non-letter', input: '1aA1aA12' },
    ];
    it.each(edgeCases)('should return false for %s', ({ input }) => {
      expect(isValidUsername(input)).toBe(false);
    });
  });
  describe('given a valid input', () => {
    const validUsernames = ['alpha_champ', 'some_32_character_username_12345'];
    it.each(validUsernames)('should return true for %s', (input) => {
      expect(isValidUsername(input)).toBe(true);
    });
  });
});

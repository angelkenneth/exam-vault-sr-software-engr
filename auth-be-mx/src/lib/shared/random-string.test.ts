import { expect, describe, it } from 'vitest';
import { randomString } from './random-string';

describe('randomString', () => {
  describe('given a length', () => {
    it('should be of that length', () => {
      const output = randomString(10);
      expect(output.length).toBe(10);
    });
  });
});

import { expect, describe, it } from 'vitest'
import { areSameArray } from './are-same-array.ts'

describe('areSameArray', () => {
  describe('given empty arrays', () => {
    it('should return false', () => {
      const output = areSameArray([], [])
      expect(output).toBe(false)
    })
  })
  describe('given they are the same', () => {
    describe('of length 1', () => {
      it('should return true', () => {
        const output = areSameArray(['a'], ['a'])
        expect(output).toBe(true)
      })
    })
    describe('of length 2', () => {
      it('should return true', () => {
        const output = areSameArray(['a', 'b'], ['a', 'b'])
        expect(output).toBe(true)
      })
    })
  })
  describe('given they are different', () => {
    it('should return false', () => {
      const output = areSameArray(['a'], ['b'])
      expect(output).toBe(false)
    })
  })
  describe('given one as an extraneous item', () => {
    it('should return false', () => {
      const output = areSameArray(['a'], ['a', 'b'])
      expect(output).toBe(false)
    })
  })
})

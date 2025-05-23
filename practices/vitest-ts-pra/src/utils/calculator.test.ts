import { describe, it, expect } from 'vitest'
import { add, subtract, multiply, divide } from './calculator'

describe('Calculator', () => {
  describe('add', () => {
    it('should add two numbers correctly', () => {
      expect(add(1, 2)).toBe(3)
      expect(add(-1, 1)).toBe(0)
      expect(add(0, 0)).toBe(0)
    })
  })

  describe('subtract', () => {
    it('should subtract two numbers correctly', () => {
      expect(subtract(3, 2)).toBe(1)
      expect(subtract(1, 1)).toBe(0)
      expect(subtract(0, 5)).toBe(-5)
    })
  })

  describe('multiply', () => {
    it('should multiply two numbers correctly', () => {
      expect(multiply(2, 3)).toBe(6)
      expect(multiply(-2, 3)).toBe(-6)
      expect(multiply(0, 5)).toBe(0)
    })
  })

  describe('divide', () => {
    it('should divide two numbers correctly', () => {
      expect(divide(6, 2)).toBe(3)
      expect(divide(5, 2)).toBe(2.5)
      expect(divide(0, 5)).toBe(0)
    })

    it('should throw error when dividing by zero', () => {
      expect(() => divide(5, 0)).toThrow('Division by zero is not allowed')
    })
  })
}) 
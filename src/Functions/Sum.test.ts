import { Sum } from './Sum'

// Тестируем функцию
describe('sum', () => {
    test('adds 1 + 4 to equal 5', () => {
        expect(Sum(1, 4)).toBe(5)
    })
    test('adds 1 + 5 to equal 6', () => {
        expect(Sum(1, 5)).toBe(6)
    })
})

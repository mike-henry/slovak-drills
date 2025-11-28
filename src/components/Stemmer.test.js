import { describe, test, expect } from 'vitest'
import { deriveStem } from './vocalGrammer.js'

describe('Basic Slovak stemmer', () => {

  test('Masculine -a endings', () => {
    expect(deriveStem('hrdina', 'M')).toBe('hrdin')
    expect(deriveStem('turista', 'M')).toBe('turist')
  })

  test('Masculine consonant endings', () => {
    expect(deriveStem('chlap', 'M')).toBe('chlap')
    expect(deriveStem('muž', 'M')).toBe('muž')
  })

  test('Feminine -a endings', () => {
    expect(deriveStem('žena', 'F')).toBe('žen')
    expect(deriveStem('kniha', 'F')).toBe('knih')
  })

  test('Neuter -o endings', () => {
    expect(deriveStem('mesto', 'N')).toBe('mest')
    expect(deriveStem('auto', 'N')).toBe('aut')
  })

})

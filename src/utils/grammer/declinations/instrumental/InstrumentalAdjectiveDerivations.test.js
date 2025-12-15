// InstrumentalAdjectiveDerivations.test.js

import { describe, test, expect } from 'vitest';
import Adjective from '../Adjective.js';
import Noun from '../Noun.js';
import { CASE_TYPE } from '../../WordTypes.js';

const CASE = CASE_TYPE.INSTRUMENTAL;

// Sample nouns for gender evaluation
const chlap = Noun.fromRaw({ sk: 'chlap', gender: 'M', animate: true });
const zena = Noun.fromRaw({ sk: 'žena', gender: 'F', animate: false });
const mesto = Noun.fromRaw({ sk: 'mesto', gender: 'N', animate: false });

// Plural forms (gender only matters)
const chlapi = Noun.fromRaw({ sk: 'chlapi', gender: 'M', animate: true });
const zeny = Noun.fromRaw({ sk: 'ženy', gender: 'F', animate: false });
const mesta = Noun.fromRaw({ sk: 'mestá', gender: 'N', animate: false });

const adjective = Adjective.fromRaw({ sk: 'dobrý', en: '' });

// ---------------------------
// Singular
// ---------------------------
describe('Instrumental Adjectives — Singular', () => {
  test('Masculine → dobrým', () => {
    expect(adjective.declinate(CASE, chlap).derived).toBe('dobrým');
  });

  test('Feminine → dobrou', () => {
    expect(adjective.declinate(CASE, zena).derived).toBe('dobrou');
  });

  test('Neuter → dobrým', () => {
    expect(adjective.declinate(CASE, mesto).derived).toBe('dobrým');
  });
});

// ---------------------------
// Plural
// ---------------------------
describe('Instrumental Adjectives — Plural', () => {
  test('Masculine plural → dobrými', () => {
    expect(adjective.declinate(CASE, chlapi, true).derived).toBe('dobrými');
  });

  test('Feminine plural → dobrými', () => {
    expect(adjective.declinate(CASE, zeny, true).derived).toBe('dobrými');
  });

  test('Neuter plural → dobrými', () => {
    expect(adjective.declinate(CASE, mesta, true).derived).toBe('dobrými');
  });
});

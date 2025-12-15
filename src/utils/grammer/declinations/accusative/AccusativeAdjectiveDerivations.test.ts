// AccusativeAdjectiveDerivations.test.js

import { describe, test, expect } from 'vitest';
import { CASE_TYPE, Gender } from '@/utils/grammer/WordTypes';
import Adjective from '../Adjective';
import Noun from '../Noun';


const CASE = CASE_TYPE.ACCUSATIVE;
// Sample nouns for gender + animate tests
const chlap: Noun = Noun.fromRaw({ en: '', sk: 'chlap', gender: Gender.Masculine, animate: true });
const stroj: Noun = Noun.fromRaw({ en: '', sk: 'stroj', gender: Gender.Masculine, animate: false });
const zena: Noun = Noun.fromRaw({ en: '', sk: 'žena', gender: Gender.Femenine, animate: false, });
const mesto: Noun = Noun.fromRaw({ en: '', sk: 'mesto', gender: Gender.Neutral, animate: false, });
const chlapi: Noun = Noun.fromRaw({ en: '', sk: 'chlapi', gender: Gender.Masculine, animate: true });
const stroje: Noun = Noun.fromRaw({ en: '', sk: 'stroje', gender: Gender.Masculine, animate: false });
const zeny: Noun = Noun.fromRaw({ en: '', sk: 'ženy', gender: Gender.Femenine, animate: false });
const mesta: Noun = Noun.fromRaw({ en: '', sk: 'mestá', gender: Gender.Neutral, animate: false });

const adjective: Adjective = Adjective.fromRaw({ en: '', sk: 'dobrý' });

// ---------------------------
// Singular
// ---------------------------
describe('Accusative Adjectives — Singular', () => {
  test('Masculine animate → dobrého', () => {
    expect(adjective.declinate(CASE, chlap).derived).toBe('dobrého');
  });

  test('Masculine inanimate → dobrý', () => {
    expect(adjective.declinate(CASE, stroj).derived).toBe('dobrý');
  });

  test('Feminine → dobrú', () => {
    expect(adjective.declinate(CASE, zena).derived).toBe('dobrú');
  });

  test('Neuter → dobré', () => {
    expect(adjective.declinate(CASE, mesto).derived).toBe('dobré');
  });
});

// ---------------------------
// Plural
// ---------------------------
describe('Accusative Adjectives — Plural', () => {
  test('Masculine animate → dobrých', () => {
    expect(adjective.declinate(CASE, chlapi, true).derived).toBe('dobrých');
  });

  test('Masculine inanimate → dobré', () => {
    expect(adjective.declinate(CASE, stroje, true).derived).toBe('dobré');
  });

  test('Feminine → dobré', () => {
    expect(adjective.declinate(CASE, zeny, true).derived).toBe('dobré');
  });

  test('Neuter → dobré', () => {
    expect(adjective.declinate(CASE, mesta, true).derived).toBe('dobré');
  });
});

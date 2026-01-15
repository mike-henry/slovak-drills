import { describe, test, expect } from 'vitest';
//import { locativeNounDeriver } from "./LocativeNounDerivations.js";
import { CASE_TYPE, Gender } from '../../WordTypes.js';
import Noun from '../Noun.js';

const CASE = CASE_TYPE.LOCATIVE;
describe('Locative Noun Derivations (explicit noun objects)', () => {
  // -------------------------
  // MASCULINE
  // -------------------------

  const chlap: Noun = Noun.fromRaw({ sk: 'chlap', en: '', gender: Gender.Masculine, animate: true });
  const terminal: Noun = Noun.fromRaw({ en: '', sk: 'terminál', gender: Gender.Masculine });
  const hrad: Noun = Noun.fromRaw({ en: '', sk: 'hrad', gender: Gender.Masculine, animate: false });
  const stroj: Noun = Noun.fromRaw({ en: '', sk: 'stroj', gender: Gender.Masculine, animate: false });

  // -------------------------
  // FEMININE
  // -------------------------

  const stanica: Noun = Noun.fromRaw({ en: '', sk: 'stanica', gender: Gender.Femenine, animate: false });
  const kost: Noun = Noun.fromRaw({ en: '', sk: 'kosť', gender: Gender.Femenine, animate: false });
  const zena: Noun = Noun.fromRaw({ en: '', sk: 'žena', gender: Gender.Femenine, animate: false });
  // -------------------------
  // NEUTER
  // -------------------------

  const mesto: Noun = Noun.fromRaw({ en: '', sk: 'mesto', gender: Gender.Neutral, animate: false });

  // -------------------------
  // SINGULAR TESTS
  // -------------------------

  test('masculine animate → -ovi (chlap → chlapovi)', () => {
    const result = chlap.declinate(CASE);
    expect(result.derived).toBe('chlapovi');
  });

  test('masculine inanimate hrad-class → -e (hrad → hrade)', () => {
    const result = hrad.declinate(CASE);
    expect(result.derived).toBe('hrade');
  });

  test('masculine inanimate stroj-class → -i (stroj → stroji)', () => {
    const result = stroj.declinate(CASE);
    expect(result.derived).toBe('stroji');
  });

  test('feminine -a with soft stem (stanica → stanici)', () => {
    const result = stanica.declinate(CASE);
    expect(result.derived).toBe('stanici');
  });

  test('feminine consonant-ending (kosť → kosti)', () => {
    const result = kost.declinate(CASE);
    expect(result.derived).toBe('kosti');
  });

  test('neuter -o → -e (mesto → meste)', () => {
    const result = mesto.declinate(CASE);
    expect(result.derived).toBe('meste');
  });

  // -------------------------
  // PLURAL TESTS
  // -------------------------

  test('masculine plural (stroj → strojoch)', () => {
    const result = stroj.declinate(CASE, true);
    expect(result.derived).toBe('strojoch');
  });

  test('masculine inanimate terminal → -i (terminál → terminálych)', () => {
    const result = terminal.declinate(CASE, true);
    expect(result.derived).toBe('terminálych');
  });

  test('neuter plural (mesto → mestách)', () => {
    const result = mesto.declinate(CASE, true);
    expect(result.derived).toBe('mestách');
  });

  test('feminine plural (žena → ženách)', () => {
    const result = zena.declinate(CASE, true);
    expect(result.derived).toBe('ženách');
  });
});

// ---------------------------
// PLURAL NOUNS (pluralOnly) — locative plural
// ---------------------------
describe('Plural nouns — locative plural', () => {
  // neuter plural
  const dvere: Noun = Noun.fromRaw({
    sk: 'dvere',
    singularForm: 'dvera', // surrogate singular
    gender: Gender.Neutral,
    animate: false,
    en: 'door',
    plural: true,
  });

  const usta: Noun = Noun.fromRaw({
    sk: 'ústa',
    singularForm: 'ústo', // surrogate singular
    gender: Gender.Neutral,
    animate: false,
    en: 'mouth',
    plural: true,
  });

  // feminine plural
  const ranajky: Noun = Noun.fromRaw({
    sk: 'raňajky',
    singularForm: 'raňajka', // surrogate singular
    gender: Gender.Femenine,
    animate: false,
    en: 'breakfast',
    plural: true,
  });

  const cestoviny: Noun = Noun.fromRaw({
    sk: 'cestoviny',
    singularForm: 'cestovina', // surrogate singular
    gender: Gender.Femenine,
    animate: false,
    en: 'pasta',
    plural: true,
  });

  // masculine plural
  const peniaze: Noun = Noun.fromRaw({
    sk: 'peniaze',
    singularForm: 'peniaz', // surrogate singular
    gender: Gender.Masculine,
    animate: false,
    en: 'money',
    plural: true,
  });

  const CASE = CASE_TYPE.LOCATIVE;

  test('Locative plural forms', () => {
    expect(dvere.declinate(CASE, true).derived).toBe('dverách');
    expect(usta.declinate(CASE, true).derived).toBe('ústach');
    expect(ranajky.declinate(CASE, true).derived).toBe('raňajkách');
    expect(cestoviny.declinate(CASE, true).derived).toBe('cestovinách');
    expect(peniaze.declinate(CASE, true).derived).toBe('peniazoch');
  });
});

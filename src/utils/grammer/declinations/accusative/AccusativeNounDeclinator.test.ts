import { describe, test, expect } from 'vitest';

import { CASE_TYPE, Gender } from '@/utils/grammer/WordTypes.js';
import Noun from '../Noun';

const CASE = CASE_TYPE.ACCUSATIVE;
// ---------------------------
// BASIC MASCULINE TESTS
// ---------------------------
describe('Masculine nouns — accusative singular and plural', () => {
  const chlap: Noun = Noun.fromRaw({ sk: 'chlap', gender: Gender.Masculine, animate: true, en: 'man' });
  const chlapec: Noun = Noun.fromRaw({ sk: 'chlapec', gender: Gender.Masculine, animate: true, en: 'man' });
  const muz: Noun = Noun.fromRaw({ sk: 'muž', gender: Gender.Masculine, animate: true, en: 'man' });
  const stroj: Noun = Noun.fromRaw({ sk: 'stroj', gender: Gender.Masculine, animate: false, en: 'machine' });
  const hrdina: Noun = Noun.fromRaw({ sk: 'hrdina', gender: Gender.Masculine, animate: true, en: 'hero' });
  const kolega: Noun = Noun.fromRaw({ sk: 'kolega', gender: Gender.Masculine, animate: true, en: 'colleague' });

  test('Masculine singular', () => {
    expect(chlap.declinate(CASE).derived).toBe('chlapa');
    expect(chlapec.declinate(CASE).derived).toBe('chlapca');
    expect(muz.declinate(CASE).derived).toBe('muža');
    expect(stroj.declinate(CASE).derived).toBe('stroj');
    expect(hrdina.declinate(CASE).derived).toBe('hrdinu');
    expect(kolega.declinate(CASE).derived).toBe('kolegu');
  });

  test('Masculine plural', () => {
    // Masculine animate → genitive plural
    expect(chlap.declinate(CASE, true).derived).toBe('chlapov');
    expect(chlapec.declinate(CASE, true).derived).toBe('chlapcov');
    expect(muz.declinate(CASE, true).derived).toBe('mužov');
    expect(hrdina.declinate(CASE, true).derived).toBe('hrdinov');
    expect(kolega.declinate(CASE, true).derived).toBe('kolegov');
    // Masculine inanimate → nominative plural
    expect(stroj.declinate(CASE, true).derived).toBe('stroje');
  });
});

// ---------------------------
// BASIC FEMININE TESTS
// ---------------------------
describe('Feminine nouns — accusative singular and plural', () => {
  const zena: Noun = Noun.fromRaw({ en: '', sk: 'žena', gender: Gender.Femenine, animate: false });
  const kniha: Noun = Noun.fromRaw({ en: '', sk: 'kniha', gender: Gender.Femenine, animate: false });
  const chemia: Noun = Noun.fromRaw({ en: '', sk: 'chémia', gender: Gender.Femenine, animate: false });
  const energia: Noun = Noun.fromRaw({ en: '', sk: 'energia', gender: Gender.Femenine, animate: false });
  const kost: Noun = Noun.fromRaw({ en: '', sk: 'kosť', gender: Gender.Femenine, animate: false });
  const vec: Noun = Noun.fromRaw({ en: '', sk: 'vec', gender: Gender.Femenine, animate: false });

  test('Feminine singular', () => {
    // expect(zena.declinate(CASE).derived).toBe("ženu");
    // expect(kniha.declinate(CASE).derived).toBe("knihu");
    expect(chemia.declinate(CASE).derived).toBe('chémiu');
    // expect(energia.declinate(CASE).derived).toBe("energiu");
    // expect(kost.declinate(CASE).derived).toBe("kosť");
    // expect(vec.declinate(CASE).derived).toBe("vec");
  });

  test('Feminine plural = nominative plural', () => {
    expect(zena.declinate(CASE, true).derived).toBe('ženy');
    expect(kniha.declinate(CASE, true).derived).toBe('knihy');
    expect(chemia.declinate(CASE, true).derived).toBe('chémie');
    expect(energia.declinate(CASE, true).derived).toBe('energie');
    expect(kost.declinate(CASE, true).derived).toBe('kosti');
    expect(vec.declinate(CASE, true).derived).toBe('veci');
  });
});

// ---------------------------
// BASIC NEUTER TESTS
// ---------------------------
describe('Neuter nouns — accusative singular and plural', () => {
  const mesto: Noun = Noun.fromRaw({ en: '', sk: 'mesto', gender: Gender.Neutral, animate: false });
  const auto: Noun = Noun.fromRaw({ en: '', sk: 'auto', gender: Gender.Neutral, animate: false });
  const srdce: Noun = Noun.fromRaw({ en: '', sk: 'srdce', gender: Gender.Neutral, animate: false });
  const more: Noun = Noun.fromRaw({ en: '', sk: 'more', gender: Gender.Neutral, animate: false });
  const vysvedcenie: Noun = Noun.fromRaw({ en: '', sk: 'vysvedčenie', gender: Gender.Neutral, animate: false });
  const minimum: Noun = Noun.fromRaw({ en: '', sk: 'minimum', gender: Gender.Neutral, animate: false });
  const studium: Noun = Noun.fromRaw({ en: '', sk: 'štúdium', gender: Gender.Neutral, animate: false });

  test('Neuter singular = nominative', () => {
    expect(mesto.declinate(CASE).derived).toBe('mesto');
    expect(auto.declinate(CASE).derived).toBe('auto');
    expect(srdce.declinate(CASE).derived).toBe('srdce');
    expect(more.declinate(CASE).derived).toBe('more');
    expect(vysvedcenie.declinate(CASE).derived).toBe('vysvedčenie');
    expect(minimum.declinate(CASE).derived).toBe('minimum');
    expect(studium.declinate(CASE).derived).toBe('štúdium');
  });

  test('Neuter plural = nominative plural', () => {
    expect(mesto.declinate(CASE, true).derived).toBe('mestá');
    expect(auto.declinate(CASE, true).derived).toBe('autá');
    expect(srdce.declinate(CASE, true).derived).toBe('srdcia');
    expect(more.declinate(CASE, true).derived).toBe('moria');
    expect(vysvedcenie.declinate(CASE, true).derived).toBe('vysvedčenia');
    expect(minimum.declinate(CASE, true).derived).toBe('minimá');
    expect(studium.declinate(CASE, true).derived).toBe('štúdiá');
  });
});

// ---------------------------
// EDGE CASES
// ---------------------------
describe('Edge cases — accusative singular and plural', () => {
  const a: Noun = Noun.fromRaw({ en: '', sk: 'a', gender: Gender.Femenine, animate: false });
  const o: Noun = Noun.fromRaw({ en: '', sk: 'o', gender: Gender.Neutral, animate: false });
  const k: Noun = Noun.fromRaw({ en: '', sk: 'k', gender: Gender.Masculine, animate: true });

  test('Single-letter singular', () => {
    expect(a.declinate(CASE).derived).toBe('u');
    expect(o.declinate(CASE).derived).toBe('o');
    expect(k.declinate(CASE).derived).toBe('ka');
  });

  test('Single-letter plural', () => {
    expect(a.declinate(CASE, true).derived).toBe('y');
    expect(o.declinate(CASE, true).derived).toBe('á');
    expect(k.declinate(CASE, true).derived).toBe('kov'); // masculine animate → genitive plural
  });
});

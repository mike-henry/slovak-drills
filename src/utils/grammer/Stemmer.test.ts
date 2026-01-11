import { describe, test, expect } from 'vitest';
import { deriveVocalStem } from './vocalGrammer';
import { Gender } from './WordTypes';
import Noun from './declinations/Noun';

// helper to quickly make a Noun object
function noun(sk: string, gender: Gender, plural = false, animate = false): Noun {
  return Noun.fromRaw({ sk, en: '', gender, plural, animate });
}

describe('Basic Slovak stemmer', () => {
  test('Masculine -a endings', () => {
    expect(deriveVocalStem(noun('hrdina', Gender.Masculine))).toBe('hrdin');
    expect(deriveVocalStem(noun('turista', Gender.Masculine))).toBe('turist');
  });

  test('Masculine consonant endings', () => {
    expect(deriveVocalStem(noun('chlap', Gender.Masculine))).toBe('chlap');
    expect(deriveVocalStem(noun('muž', Gender.Masculine))).toBe('muž');
    expect(deriveVocalStem(noun('chlapec', Gender.Masculine, false, true))).toBe('chlapc');
  });

  test('Feminine -a endings', () => {
    expect(deriveVocalStem(noun('žena', Gender.Femenine))).toBe('žen');
    expect(deriveVocalStem(noun('kniha', Gender.Femenine))).toBe('knih');
  });

  test('Neuter -o endings', () => {
    expect(deriveVocalStem(noun('mesto', Gender.Neutral))).toBe('mest');
    expect(deriveVocalStem(noun('auto', Gender.Neutral))).toBe('aut');
  });

  test('Neuter -a endings', () => {
    expect(deriveVocalStem(noun('prasa', Gender.Neutral))).toBe('prasat');
    expect(deriveVocalStem(noun('barča', Gender.Neutral))).toBe('barčat');
    expect(deriveVocalStem(noun('dieťa', Gender.Neutral))).toBe('dieťat'); // FIXME: irregular
  });
});

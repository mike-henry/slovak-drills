import { describe, test, expect } from 'vitest';
import { Gender } from './WordTypes';
import Noun from './declinations/Noun';

// helper to quickly make a Noun object
function noun(sk: string, gender: Gender, plural = false, animate = false, stem?: string): Noun {
  return Noun.fromRaw({ sk, en: '', gender, plural, animate, stem });
}

describe('Basic Slovak stemmer', () => {
  test('Masculine -a endings', () => {
    expect(noun('hrdina', Gender.Masculine).getStem()).toBe('hrdin');
    expect(noun('turista', Gender.Masculine).getStem()).toBe('turist');
  });

  test('Masculine consonant endings', () => {
    expect(noun('chlap', Gender.Masculine).getStem()).toBe('chlap');
    expect(noun('muž', Gender.Masculine).getStem()).toBe('muž');
    expect(noun('chlapec', Gender.Masculine, false, true).getStem()).toBe('chlapc');
  });

  test('Feminine -a endings', () => {
    expect(noun('žena', Gender.Femenine).getStem()).toBe('žen');
    expect(noun('kniha', Gender.Femenine).getStem()).toBe('knih');
  });

  test('Neuter -o endings', () => {
    expect(noun('mesto', Gender.Neutral).getStem()).toBe('mest');
    expect(noun('auto', Gender.Neutral).getStem()).toBe('aut');
  });

  test('Neuter -a endings', () => {
    expect(noun('prasa', Gender.Neutral).getStem()).toBe('prasat');
    expect(noun('barča', Gender.Neutral).getStem()).toBe('barčat');
    expect(noun('dieťa', Gender.Neutral).getStem()).toBe('dieťat'); // irregular
  });

  test('Masculine -ec alternations', () => {
    expect(noun('starec', Gender.Masculine).getStem()).toBe('starc');
    expect(noun('otec', Gender.Masculine).getStem()).toBe('otc');
    expect(noun('mladík', Gender.Masculine).getStem()).toBe('mladík'); // no change
  });

  test('Feminine -ia endings', () => {
    expect(noun('chémia', Gender.Femenine).getStem()).toBe('chémi');
    expect(noun('komédia', Gender.Femenine).getStem()).toBe('komédi');
    expect(noun('romancia', Gender.Femenine).getStem()).toBe('romanci');
  });

  test('Plural-sensitive neuter stems', () => {
    expect(noun('dieťa', Gender.Neutral, false).getStem()).toBe('dieťat');
    expect(noun('dieťa', Gender.Neutral, true).getStem()).toBe('dieťat'); // same
    expect(noun('more', Gender.Neutral, true).getStem()).toBe('mor'); // plural stem
  });

  test('Words with diphthongs', () => {
    expect(noun('srdiečko', Gender.Neutral).getStem()).toBe('srdiečk');
    expect(noun('pódium', Gender.Neutral).getStem()).toBe('pódi');
  });

  test('Neuter -um endings', () => {
    expect(noun('múzeum', Gender.Neutral).getStem()).toBe('múze');
    expect(noun('gymnázium', Gender.Neutral).getStem()).toBe('gymnázi');
  });

  test('Neuter -ie endings', () => {
    expect(noun('pole', Gender.Neutral).getStem()).toBe('pol'); // -e
    expect(noun('more', Gender.Neutral).getStem()).toBe('mor'); // -e
    expect(noun('srdce', Gender.Neutral).getStem()).toBe('srdc'); // -ce
    expect(noun('zviera', Gender.Neutral).getStem()).toBe('zvierat'); // irregular class
  });

  test('Stem override takes precedence over automatic rules', () => {
    expect(noun('kôň', Gender.Masculine, false, true, 'koň').getStem()).toBe('koň');
    expect(noun('človek', Gender.Masculine, false, true, 'ľud').getStem()).toBe('ľud');
    expect(noun('oko', Gender.Neutral, false, false, 'oč').getStem()).toBe('oč');
    expect(noun('dievča', Gender.Neutral, false, false, 'dievčat').getStem()).toBe('dievčat');
  });
});

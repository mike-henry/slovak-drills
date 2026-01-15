// Hard consonants in Slovak

import { Gender } from '../WordTypes';
import type Noun from './Noun';

const HARD_CONSONANTS: string[] = ['h', 'ch', 'k', 'g', 'd', 't', 'n', 'l', 'r'];

// Soft consonants in Slovak

const SOFT_CONSONANTS: string[] = ['č', 'dž', 'š', 'ž', 'c', 'dz', 'j', 'ď', 'ť', 'ň', 'ľ'];

const NEUTRAL_CONSONANTS: string[] = ['b', 'f', 'm', 'p', 'v', 's', 'z'];

// All consonants
const CONSONANTS = [...HARD_CONSONANTS, ...SOFT_CONSONANTS, ...NEUTRAL_CONSONANTS];

// Vowels in Slovak
const VOWELS: string[] = ['a', 'á', 'e', 'é', 'i', 'í', 'o', 'ó', 'u', 'ú', 'y', 'ý', 'ä', 'ô'];

// Check if a word ends with a consonant
const endsWith = (word: string, consenent: string[]) => {
  if (!word || word.length === 0) return false;
  for (const d of consenent) {
    if (word.endsWith(d)) {
      return true;
    }
  }
  return false;
};

export const endsWithHardConsonant = (w: string) => endsWith(w, HARD_CONSONANTS);
export const endsWithSoftConsonant = (w: string) => endsWith(w, SOFT_CONSONANTS);
export const endsWithNeutralConsonant = (w: string) => endsWith(w, NEUTRAL_CONSONANTS);
export const endsWithConsonant = (w: string) => endsWith(w, CONSONANTS);
export const endsWithVowel = (w: string) => endsWith(w, VOWELS);

const IRREGULAR_STEMS = {
  dieťa: 'dieťat',
  mláďa: 'mláďat',
  kôň: 'koň', // special class later
  // ... more later
};

function masculineStem(noun: Noun): string {
  const word = noun.sk.toLowerCase();

  // Masculines ending in -a → remove -a
  // Masculines ending in -o/-e → remove vowel
  if (word.endsWith('a') || word.endsWith('o') || word.endsWith('e')) {
    return word.slice(0, -1);
  }

  // Consonant-ending masculine → unchanged stem
  if (endsWithConsonant(word)) {
    if (word.endsWith('ec')) {
      return word.slice(0, -2) + 'c';
    }
    return word;
  }

  return word;
}

function feminineStem(noun: Noun): string {
  const word = noun.sk.toLowerCase();

  // -ia → remove -ia, add -i
  if (word.endsWith('ie')) {
    return word.slice(0, -2);
  }

  // -a → remove -a
  if (word.endsWith('a')) {
    return word.slice(0, -1);
  }

  // Consonant-ending feminine → unchanged
  return word;
}

function neuterStem(noun: Noun) {
  let word = noun.sk.toLowerCase();

  // -um → remove -um
  if (word.endsWith('um')) {
    return word.slice(0, -2);
  }

  // -ie → replace with -i
  if (word.endsWith('ie')) {
    return word.slice(0, noun.plural ? -1 : -2);
  }

  // -o or -e → remove vowel
  if (word.endsWith('o') || word.endsWith('e')) {
    return word.slice(0, -1);
  }

  // -a → remove vowel add at
  if (word.endsWith('a')) {
    return word.slice(0, -1) + (noun.plural ? '' : 'at');
  }

  return word;
}

export function deriveNounStem(noun: Noun): string {
  if (noun.stem) return noun.stem;
  switch (noun.gender) {
    case Gender.Masculine:
      return masculineStem(noun);
    case Gender.Femenine:
      return feminineStem(noun);
    case Gender.Neutral:
      return neuterStem(noun);
    default:
      throw new Error(`Invalid gender '${noun.gender}' — must be 'Masculine', 'Feminine', or 'Nueter'.`);
  }
}

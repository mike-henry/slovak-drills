import { NominativeNounDeclinator } from '../nominative/NominativeNounDeclinator.js';
import { genitiveNounDeriver } from '../genative/GenitiveNounDerivations.js';

import DerivedWord from '../../DerivedWord.js';
import { Gender } from '@/utils/grammer/WordTypes.js';
import type Noun from '../Noun.js';
import type { NounDeclinator } from '../Noun.js';

/**
 * Get the accusative singular form of a Slovak noun
 * @param {Noun } noun - noun in Slovak
 * @returns {DerivedWord} - accusative singular
 */
function accusativeSingular(noun: Noun): DerivedWord {
  let derived: string;
  let explanation: string;
  const stem = noun.getStem();
  switch (noun.gender) {
    case Gender.Masculine:
      // Inanimate → same as nominative
      if (!noun.animate) {
        const nominative = NominativeNounDeclinator.singular(noun);
        derived = nominative.derived; // neuter singular = nominative
        explanation = `for non animate, neuter noun accusative = nominative  (${nominative.explanation})`;
        break;
      }

      // Animate ending in -a → -u
      if (noun.sk.endsWith('a')) {
        derived = stem + 'u'; // hrdina → hrdinu
        explanation = `animate noun stem (${stem}) + u`;
      } else {
        // const stem = noun.getStem();
        derived = stem + 'a'; // chlap → chlapa
        explanation = `animate noun ${stem} + a`;
      }
      break;
    // Animate consonant-ending → +a
    case Gender.Femenine:
      // -a → -u also -ia → -iu
      if (noun.sk.endsWith('a')) {
        derived = stem + 'u';
        explanation = `feminine noun stem (${stem}) + u`;
      } else {
        derived = noun.sk; // consonant-ending feminine → unchanged
        explanation = `consonant-ending feminine noun unchanged (${noun.sk})`;
      }

      break;
    case Gender.Neutral:
      const nominative = NominativeNounDeclinator.singular(noun);
      derived = nominative.derived; // neuter singular = nominative
      explanation = `neuter noun accusative = nominative  (${nominative.explanation})`;
      break;
    default:
      throw new Error("Invalid gender: use 'M', 'F', or 'N'");
  }
  return new DerivedWord(derived, explanation);
}

function accusativePlural(noun: Noun): DerivedWord {
  return noun.gender === Gender.Masculine && noun.animate
    ? genitiveNounDeriver.plural(noun)
    : NominativeNounDeclinator.plural(noun);
}

export const AccusativeNounDeclinator: NounDeclinator = {
  singular: (noun: Noun) => {
    // noun.sk = the word
    // noun.gender = M/F/N
    // noun.animate = boolean (only meaningful for masculine)
    const derivation = accusativeSingular(noun);
    return new DerivedWord(derivation.derived, derivation.explanation, [
      'noun://accusative?noun-introduction&noun-stems&noun-endings-singular',
    ]);
  },
  plural: (noun: Noun) => {
    const derivation = accusativePlural(noun);
    return new DerivedWord(derivation.derived, derivation.explanation, [
      'noun://accusative?noun-introduction&noun-stems&noun-endings-plural',
    ]);
  },
};

import type Noun from '../Noun.js';
import { deriveVocalStem } from '../../vocalGrammer.js';
import DerivedWord from '../../DerivedWord';
import type { NounDeclinator } from '../Noun.js';

/**
 * Instrumental singular
 */

function instrumentalSingular(noun: Noun) {
  const word = noun.sk;
  const stem = deriveVocalStem(noun);

  let derived = '';
  let explanation = '';

  switch (noun.gender) {
    case 'M':
      derived = stem + 'om';
      explanation = `masculine instrumental singular = stem (${stem}) + om`;
      break;

    case 'F':
      if (word.endsWith('ia')) {
        derived = stem + 'iou';
        explanation = `feminine ending -ia → instrumental singular = stem (${stem}) + iou`;
      } else if (word.endsWith('a')) {
        derived = stem + 'ou';
        explanation = `feminine ending -a → instrumental singular = stem (${stem}) + ou`;
      } else {
        derived = stem + 'ou';
        explanation = `consonant-ending feminine → instrumental singular = stem (${stem}) + ou`;
      }
      break;

    case 'N':
      if (word.endsWith('ie')) {
        derived = stem + 'ím';
        explanation = `neuter ending -ie → instrumental singular = stem (${stem}) + ím`;
      } else {
        derived = stem + 'om';
        explanation = `neuter instrumental singular = stem (${stem}) + om`;
      }
      break;

    default:
      throw new Error('Invalid gender');
  }

  return new DerivedWord(derived, explanation, [
    'noun://instrumental?noun-stems',
    'noun://instrumental?noun-endings-plural',
  ]);
}

/**
 * Instrumental plural
 */
export function instrumentalPlural(noun: Noun): DerivedWord {
  const word = noun.sk;
  const stem = deriveVocalStem(noun);
  let derived: string;
  let explanation: string;

  // ----- MASCULINE -----
  if (noun.gender === 'M') {
    if (word.endsWith('a')) {
      derived = stem + 'ami';
      explanation = `masculine ending -a → instrumental plural = stem (${stem}) + ami`;
    } else {
      derived = stem + 'mi';
      explanation = `masculine consonant-ending → instrumental plural = stem (${stem}) + mi`;
    }
  } else if (noun.gender === 'F') {
    // ----- FEMININE -----
    if (word.endsWith('ia')) {
      derived = stem + 'iami';
      explanation = `feminine ending -ia → instrumental plural = stem (${stem}) + iami`;
    } else {
      derived = stem + 'ami';
      explanation = `feminine instrumental plural = stem (${stem}) + ami`;
    }
  } else if (noun.gender === 'N') {
    // ----- NEUTER -----
    derived = stem + (noun.sk.endsWith('nie') || noun.sk.endsWith('tie') ? 'iami' : 'ami');
    explanation = `neuter instrumental plural = stem (${stem}) + ami`;
  } else throw new Error('Invalid gender for instrumental plural');
  return new DerivedWord(derived, explanation, [
    'noun://instrumental?noun-stems',
    'noun://instrumental?noun-endings-plural',
  ]);
}

export const InstrumentalNounDeriver: NounDeclinator = {
  singular: (noun: Noun) => instrumentalSingular(noun),

  plural: (noun: Noun) => instrumentalPlural(noun),
};

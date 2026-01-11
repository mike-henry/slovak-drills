// InstrumentalAdjectiveDerivations.js

import { Gender } from '@/utils/grammer/WordTypes';

import type Noun from '../Noun';

import { adjectives } from '../../wordStore';

import DerivedWord from '../../DerivedWord';
import { STANDARD_SECTIONS } from '@/documents/DocumentLoader';
import type { AdjectiveDeclinator } from '../Adjective';
import type Adjective from '../Adjective';

/**
 * Instrumental adjective — singular
 */
function instrumentalAdjectiveSingular(adjective: string, noun: Noun): DerivedWord {
  const { gender } = noun;
  let derived: string;
  let explanation: string = 'nyi';

  const base = adjective.slice(0, -1); // dobr-
  switch (noun.gender) {
    case Gender.Masculine:
      derived = base + 'ým';
      break;
    case Gender.Femenine:
      derived = base + 'ou';
      break;
    case Gender.Neutral:
      derived = base + 'ým';
      break;
    default:
      throw new Error('Invalid gender for instrumental adjective singular');
  }
  return new DerivedWord(derived, explanation, [`adjective://instrumental?${STANDARD_SECTIONS.adjectiveEndings}`]);
}

/**
 * Instrumental adjective — plural
 */
function instrumentalAdjectivePlural(adjective: String): DerivedWord {
  const base = adjective.slice(0, -1); // dobr-

  return new DerivedWord(base + 'ými', '', [`adjective://instrumental?${STANDARD_SECTIONS.adjectiveEndings}`]); // same for all genders
}

export const instrumentalAdjectiveDeriver = {
  singular: (adjective, noun) => instrumentalAdjectiveSingular(adjective.sk, noun),
  plural: (adjective, noun) => instrumentalAdjectivePlural(adjective.sk),
};

export const InstrumentalAdjectiveDeriver: AdjectiveDeclinator = {
  singular: (adjective: Adjective, noun: Noun) => instrumentalAdjectiveSingular(adjective.sk, noun),
  plural: (adjective: Adjective, noun: Noun) => instrumentalAdjectivePlural(adjective.sk),
};

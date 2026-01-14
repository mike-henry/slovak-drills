import type { NounDeclinator } from '../Noun.ts';
import Noun from '../Noun.ts';
import { endsWithSoftConsonant } from '@/utils/grammer/declinations/NounUtils.ts';

import DerivedWord from '@/utils/grammer/DerivedWord.ts';
import { Gender } from '../../WordTypes.ts';

const getLast = (str: string) => str.slice(-1);

// Masculine & neuter softening
const SOFTENING_MAP = {
  k: 'c',
  g: 'z',
  h: 'z',
  ch: 'š',
  d: 'ď',
  t: 'ť',
  n: 'ň',
  l: 'ľ',
};

// Feminine softening (for consonant-ending nouns)
const FEMININE_SOFTEN_MAP = {
  ť: 't',
  ď: 'd',
  ň: 'n',
  ľ: 'l',
  š: 's',
  ž: 'z',
  č: 'c',
};

export function softenStem(stem, gender, originalWord) {
  if (!stem || stem.length <= 1) return stem; // <- don't soften single-letter stems

  if (gender === 'F') {
    const lastChar = stem.slice(-1);
    if (FEMININE_SOFTEN_MAP[lastChar]) {
      return stem.slice(0, -1) + FEMININE_SOFTEN_MAP[lastChar];
    }
  } else if (gender === 'M') {
    // Only soften if original word does NOT end with "a"
    if (!originalWord.endsWith('a')) {
      for (const [hard, soft] of Object.entries(SOFTENING_MAP)) {
        if (stem.endsWith(hard)) {
          return stem.slice(0, -hard.length) + soft;
        }
      }
    }
  }
  return stem;
}

interface PluralRule {
  gender: Gender;
  ending?: string;
  animate?: boolean;
  softStem?: boolean;
  suffix: string;
  explanation: (stem: string) => string;
  useSoftenedStem: boolean; // NEW
}

/**
 * Basic Nominative Plural Generator (Slovak)
 * - Uses deriveStem()
 * - Naive suffixes based on gender and ending
 * - No softening or irregular handling
 *
 * @param {string} word - nominative singular noun
 * @param {"M"|"F"|"N"} gender - grammatical gender
 * @returns {string} plural form
 */
function nominativePlural(noun: Noun): DerivedWord {
  const word = noun.sk;
  const gender = noun.gender;
  const animate = noun.animate;
  const pluralOnly = noun.plural;

  if (![Gender.Masculine, Gender.Femenine, Gender.Neutral].includes(gender)) {
    throw new Error(`Invalid gender: ${gender}. Must be 'M', 'F', or 'N'.`);
  }

  const originalStem = noun.getStem();
  const softenedStem = softenStem(originalStem, gender, word);
  const softStem = endsWithSoftConsonant(originalStem);

  if (pluralOnly) {
    return new DerivedWord(word, `"${word}" only has plural form`);
  }

  // Table of rules (same logic as before)

  const pluralRules: PluralRule[] = [
    // Masculine
    {
      gender: Gender.Masculine,
      ending: 'a',
      suffix: 'ovia',
      useSoftenedStem: true,
      explanation: (s) => `stem ${s} + ovia for masculine nouns ending in -a`,
    },
    {
      gender: Gender.Masculine,
      animate: true,
      suffix: 'i',
      useSoftenedStem: false,
      explanation: (s) => `stem ${s} + i for masculine animate nouns`,
    },
    {
      gender: Gender.Masculine,
      softStem: true,
      suffix: 'e',
      useSoftenedStem: false,
      explanation: (s) => `soft-stem masculine inanimate → stem ${s} + e`,
    },
    {
      gender: Gender.Masculine,
      suffix: 'y',
      useSoftenedStem: false,
      explanation: (s) => `hard-stem masculine inanimate → stem ${s} + y`,
    },

    // Feminine
    {
      gender: Gender.Femenine,
      ending: 'ie',
      suffix: 'ia',
      useSoftenedStem: true,
      explanation: (s) => `stem ${s} + ia for feminines ending with ie`,
    },
    {
      gender: Gender.Femenine,
      ending: 'ia',
      suffix: 'e',
      useSoftenedStem: true,
      explanation: (s) => `stem ${s} + ie for feminines ending with ia`,
    },
    {
      gender: Gender.Femenine,
      ending: 'a',
      softStem: true,
      suffix: 'e',
      useSoftenedStem: true,
      explanation: (s) => `softened stem (${s}) + e for feminines with soft consonant-ending`,
    },
    {
      gender: Gender.Femenine,
      ending: 'a',
      suffix: 'y',
      useSoftenedStem: true,
      explanation: (s) => `stem (${s}) + y for feminines ending with -a`,
    },
    {
      gender: Gender.Femenine,
      suffix: 'i',
      useSoftenedStem: true,
      explanation: (s) => `stem (${s}) + i for consonant-ending feminines`,
    },

    // Neuter
    {
      gender: Gender.Neutral,
      ending: 'o',
      suffix: 'á',
      useSoftenedStem: true,
      explanation: (s) => `stem ${s} + á for neuters ending with o`,
    },
    {
      gender: Gender.Neutral,
      ending: 'e',
      suffix: 'ia',
      useSoftenedStem: true,
      explanation: (s) => `stem ${s} + ia for neuters ending with e`,
    },
    {
      gender: Gender.Neutral,
      ending: 'ie',
      suffix: 'ia',
      useSoftenedStem: true,
      explanation: (s) => `stem ${s} + ia for neuters ending with ie`,
    },
    {
      gender: Gender.Neutral,
      ending: 'um',
      suffix: 'á',
      useSoftenedStem: true,
      explanation: (s) => `stem ${s} + á for neuters ending with um`,
    },
  ];

  const rule = pluralRules.find(
    (r) =>
      r.gender === gender &&
      (r.ending ? word.endsWith(r.ending) : true) &&
      (r.animate !== undefined ? r.animate === animate : true) &&
      (r.softStem !== undefined ? r.softStem === softStem : true),
  );

  if (!rule) {
    throw new Error(`No pluralization rule found for "${word}" (gender: ${gender}).`);
  }
  const stemToUse = rule.useSoftenedStem ? softenedStem : originalStem;
  const derived = stemToUse + rule.suffix;
  return new DerivedWord(derived, rule.explanation(stemToUse), [
    'noun://nominative?noun-stems',
    'noun://nominative?noun-endings-plural',
  ]);
}

export const NominativeNounDeclinator: NounDeclinator = {
  singular(noun: Noun): DerivedWord {
    return new DerivedWord(noun.sk, 'nominative singular is the base form');
  },
  plural(noun: Noun): DerivedWord {
    const response = nominativePlural(noun);
    return new DerivedWord(response.derived, response.explanation, [
      'noun://nominative?noun-stems',
      'noun://nominative?noun-endings-plural',
    ]);
  },
};

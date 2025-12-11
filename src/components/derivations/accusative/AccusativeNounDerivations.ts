import { nominativeNounDeriver } from "../nominative/NominativeNounDerivations.js";
import { genitiveNounDeriver } from "../GenitiveNounDerivations.js"

import { deriveStem, deriveVocalStem } from "@/components/vocalGrammer.ts";
import { DerivedWord, type NounDeriver } from "../Derivers.js";
import { Gender, type Noun } from "@/components/grammer/WordTypes.js";

const IRREGULAR_ACCUSATIVE = {
  otec: "otca",
  kôň: "koňa",
  syn: "syna",
  // add more irregulars as needed
};

// Softening map for consonants before -a
const SOFTENING_MAP = {
  k: "c",
  g: "z",
  h: "z",
  ch: "š",
};
/**
 * Get the accusative singular form of a Slovak noun
 *
 * @param {string} word - noun in Slovak
 * @param {"M"|"F"|"N"} gender - grammatical gender
 * @param {boolean} [animate=false] - only used for masculine nouns
 * @returns {string} - accusative singular
 */
function accusativeSingular(noun:Noun) {
  let derived;
  let explanation;
  
  switch (noun.gender) {
    case "M":
      // Inanimate → same as nominative
      if (!noun.animate) {
        const nominative = nominativeNounDeriver.singular(noun);
        derived = nominative.derived; // neuter singular = nominative
        explanation = `for non animate, neuter noun accusative = nominative  (${nominative.explanation})`;
        break;
      }

      // Irregular animate
      if (IRREGULAR_ACCUSATIVE[noun.sk]) {
        derived = IRREGULAR_ACCUSATIVE[noun.sk];
        explanation = `irregular animate noun ${noun.sk} → ${derived}`;
      }

      // Animate ending in -a → -u
      if (noun.sk.endsWith("a")){
         derived = noun.sk.slice(0, -1) + "u"; // hrdina → hrdinu
         explanation = `animate noun stem (${noun.sk.slice(0, -1)}) + u`;
      } else {
           const stem = deriveVocalStem(noun)
           derived = stem + "a"; // chlap → chlapa
           explanation = `animate noun ${stem} + a`;
      }
      break;
      // Animate consonant-ending → +a
      
    case "F":
      // -a → -u also -ia → -iu
      if (noun.sk.endsWith("a")) {
        derived = noun.sk.slice(0, -1) + "u";
        explanation = `feminine noun stem (${noun.sk.slice(0, -1)}) + u`;
      } else{
        derived = noun.sk; // consonant-ending feminine → unchanged
        explanation = `consonant-ending feminine noun unchanged (${noun.sk})`;
      }

      break
    case "N":
      const nominative = nominativeNounDeriver.singular(noun);
      derived = nominative.derived; // neuter singular = nominative
      explanation = `neuter noun accusative = nominative  (${nominative.explanation})`;
      break;
    default:
      throw new Error("Invalid gender: use 'M', 'F', or 'N'");
      
  }
  return { derived, explanation };
}

function accusativePlural(noun:Noun):DerivedWord {
    return noun.gender === Gender.Masculine && noun.animate
    ? genitiveNounDeriver.plural(noun)
    : nominativeNounDeriver.plural(noun);
}

export const accusativeNounDeriver = {
  singular: (noun) => {
    // noun.sk = the word
    // noun.gender = M/F/N
    // noun.animate = boolean (only meaningful for masculine)
    const derivation = accusativeSingular(noun);

    return {
      derived: derivation.derived,
      explanation: derivation.explanation,
      documentation: ['noun-endings-singular']
    }
  },

  plural: (noun:Noun) => {
    const derivation =  accusativePlural(noun);
        return {
      derived: derivation.derived,
      explanation: derivation.explanation,
      documentation: ['noun-endings-plural']
    }
  },
};


export const AccusativeNounDeriver:NounDeriver = {
  singular: (noun:Noun) => {
    // noun.sk = the word
    // noun.gender = M/F/N
    // noun.animate = boolean (only meaningful for masculine)
    const derivation = accusativeSingular(noun);
    return new DerivedWord( derivation.derived,derivation.explanation, ['noun-endings-singular'])
  },
  plural: (noun) => {
    const derivation =  accusativePlural(noun);
    return new DerivedWord( derivation.derived,derivation.explanation, ['noun-endings-plural'])
    }
  
};


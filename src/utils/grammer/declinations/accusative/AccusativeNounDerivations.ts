import { NominativeNounDeriver } from "../nominative/NominativeNounDerivations.js";
import { genitiveNounDeriver } from "../genative/GenitiveNounDerivations.js"

import {  deriveVocalStem } from "@/utils/grammer/vocalGrammer.js";
import DerivedWord from "../../DerivedWord.js";
import { Gender } from "@/utils/grammer/WordTypes.js";
import type Noun from "../Noun.js";
import type { NounDeclinator } from "../Noun.js";

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
function accusativeSingular(noun:Noun):DerivedWord {
  let derived:string;
  let explanation:string;
  
  switch (noun.gender) {
    case Gender.Masculine:
    //case "M":
      // Inanimate → same as nominative
      if (!noun.animate) {
        const nominative = NominativeNounDeriver.singular(noun);
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
    case Gender.Femenine:  
    //case "F":
      // -a → -u also -ia → -iu
      if (noun.sk.endsWith("a")) {
        derived = noun.sk.slice(0, -1) + "u";
        explanation = `feminine noun stem (${noun.sk.slice(0, -1)}) + u`;
      } else{
        derived = noun.sk; // consonant-ending feminine → unchanged
        explanation = `consonant-ending feminine noun unchanged (${noun.sk})`;
      }

      break
    case Gender.Neutral:  
    //case "N":
      const nominative = NominativeNounDeriver.singular(noun);
      derived = nominative.derived; // neuter singular = nominative
      explanation = `neuter noun accusative = nominative  (${nominative.explanation})`;
      break;
    default:
      throw new Error("Invalid gender: use 'M', 'F', or 'N'");
  }
  return new DerivedWord( derived, explanation );
}

function accusativePlural(noun:Noun):DerivedWord {
    return noun.gender === Gender.Masculine && noun.animate
    ? genitiveNounDeriver.plural(noun)
    : NominativeNounDeriver.plural(noun);
}



export const AccusativeNounDeclinator:NounDeclinator = {
  singular: (noun:Noun) => {
    // noun.sk = the word
    // noun.gender = M/F/N
    // noun.animate = boolean (only meaningful for masculine)
    const derivation = accusativeSingular(noun);
    return new DerivedWord( derivation.derived,derivation.explanation, ['noun-endings-singular'])
  },
  plural: (noun:Noun) => {
    const derivation =  accusativePlural(noun);
    return new DerivedWord( derivation.derived,derivation.explanation, ['noun-endings-plural'])
    }
  
};


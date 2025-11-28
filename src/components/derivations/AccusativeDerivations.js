import { deriveStem } from "../vocalGrammer.js";
import { nominativeNounDeriver } from "./NominativeDerivations.js";
import { genitiveNounDeriver } from "./GenitiveDerivations.js";

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
function accusativeSingular(word, gender, animate = false) {
  switch (gender) {
    case "M":
      // Inanimate → same as nominative
      if (!animate)
        return nominativeNounDeriver.singular({ sk: word, gender, animate });

      // Irregular animate
      if (IRREGULAR_ACCUSATIVE[word]) return IRREGULAR_ACCUSATIVE[word];

      // Animate ending in -a → -u
      if (word.endsWith("a")) return word.slice(0, -1) + "u"; // hrdina → hrdinu
      
      // Animate consonant-ending → +a
      return word + "a"; // chlap → chlapa
    case "F":
      // -a → -u also -ia → -iu
      if (word.endsWith("a")) {
        return word.slice(0, -1) + "u";
      }
    case "N":
      return nominativeNounDeriver.singular({ sk: word, gender, animate }); // neuter singular = nominative

    default:
      throw new Error("Invalid gender: use 'M', 'F', or 'N'");
  }
}


function accusativePlural(word, gender, animate = false) {
   return (gender === "M" && animate) ? 
    genitiveNounDeriver.plural({ sk: word, gender, animate })
   : nominativeNounDeriver.plural({ sk: word, gender, animate });
  }


export const accusativeNounDeriver = {
  singular: (noun) => {
    // noun.sk = the word
    // noun.gender = M/F/N
    // noun.animate = boolean (only meaningful for masculine)
    return accusativeSingular(noun.sk, noun.gender, noun.animate);
  },

  plural: (noun) => {
    // We'll add accusativePlural later — leave stub to mirror nominative
    // return accusativePlural(noun.sk, noun.gender, noun.animate);
    return  accusativePlural(noun.sk,noun.gender,noun.animate);
  },
};

import { nominativeNounDeriver } from "./NominativeNounDerivations.js";
import { genitiveNounDeriver } from "./GenitiveNounDerivations.js";

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
  let derived;
  let explanation;
  
  switch (gender) {
    case "M":
      // Inanimate → same as nominative
      if (!animate) {
        const nominative = nominativeNounDeriver.singular({
          sk: word,
          gender,
          animate,
        });
        derived = nominative.derived; // neuter singular = nominative
        explanation = `for non animate, neuter noun accusative = nominative  (${nominative.explanation})`;
        break;
      }

      // Irregular animate
      if (IRREGULAR_ACCUSATIVE[word]) {
        derived = IRREGULAR_ACCUSATIVE[word];
        explanation = `irregular animate noun ${word} → ${derived}`;
      }

      // Animate ending in -a → -u
      if (word.endsWith("a")){
         derived = word.slice(0, -1) + "u"; // hrdina → hrdinu
         explanation = `animate noun stem (${word.slice(0, -1)}) + u`;
      } else {
           derived = word + "a"; // chlap → chlapa
           explanation = `animate noun ${word} + a`;
      }
      break;
      // Animate consonant-ending → +a
      
    case "F":
      // -a → -u also -ia → -iu
      if (word.endsWith("a")) {
        derived = word.slice(0, -1) + "u";
        explanation = `feminine noun stem (${word.slice(0, -1)}) + u`;
      } else{
        derived = word; // consonant-ending feminine → unchanged
        explanation = `consonant-ending feminine noun unchanged (${word})`;
      }

      break
    case "N":
      const nominative = nominativeNounDeriver.singular({
        sk: word,
        gender,
        animate,
      });
      derived = nominative.derived; // neuter singular = nominative
      explanation = `neuter noun accusative = nominative  (${nominative.explanation})`;
      break;
    default:
      throw new Error("Invalid gender: use 'M', 'F', or 'N'");
      
  }
  return { derived, explanation };
}

function accusativePlural(word, gender, animate = false) {
  
  return gender === "M" && animate
    ? genitiveNounDeriver.plural({ sk: word, gender, animate })
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
    return accusativePlural(noun.sk, noun.gender, noun.animate);
  },
};



import { deriveStem, endsWithSoftConsonant, endsWithHardConsonant } from "../vocalGrammer.js";
import { nominativeNounDeriver } from "./NominativeDerivations.js";


//ONLY FOR  IMPLEMENTATION FOR PLURAL

// Irregular genitive plurals for masculine animate nouns
const IRREGULAR_GENITIVE_PLURAL = {
  "otec": "otcov",
  "syn": "synov",
  "kôň": "koní",
  "človek": "ľudí",
  // add more irregulars here
};

/**
 * Generate genitive plural for masculine animate nouns
 *
 * @param {string} word - Slovak noun
 * @returns {string} genitive plural
 */
function genitivePlural(word, gender, animate = false) {
  if(gender !== "M" || !animate)  return nominativeNounDeriver.plural({ sk: word, gender, animate });
  if (IRREGULAR_GENITIVE_PLURAL[word]) return IRREGULAR_GENITIVE_PLURAL[word];



  const stem = deriveStem(word, gender);

  // Simple softening for common cases can be added later
  if (endsWithSoftConsonant(stem) || endsWithHardConsonant(stem)) {
    return stem + "ov";
  }

  // fallback
  return stem + "ov";
}

/**
 * Genitive noun deriver object
 */
export const genitiveNounDeriver = {
  singular: (noun) => {
    throw new Error("Genitive singular not implemented yet");
  },

  plural: (noun) => genitivePlural(noun.sk,noun.gender, noun.animate)
  
};

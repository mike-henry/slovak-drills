import type Noun from "../Noun";
import {  endsWithSoftConsonant, endsWithHardConsonant, deriveVocalStem } from "@/utils/grammer/vocalGrammer";
import  DerivedWord from "../../DerivedWord";
import { NominativeNounDeriver } from "../nominative/NominativeNounDerivations";


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
function genitivePlural(noun:Noun):DerivedWord {
  if(noun.gender !== "M" || !noun.animate)  return NominativeNounDeriver.plural(noun);
  if (IRREGULAR_GENITIVE_PLURAL[noun.sk]) return IRREGULAR_GENITIVE_PLURAL[noun.sk];

let derived:string;
let explanation:string;

  const stem = deriveVocalStem(noun);

  // Simple softening for common cases can be added later
  if (endsWithSoftConsonant(stem) || endsWithHardConsonant(stem)) {
    derived =  stem + "ov";
    explanation = `stem (${stem}) + ov for masculine animate nouns`;
  } else {
    derived = stem + "ov";
    explanation = `stem (${stem}) + ov for masculine animate nouns`;
  }

  // fallback
  return new DerivedWord( derived, explanation );
}

/**
 * Genitive noun deriver object
 */
export const genitiveNounDeriver = {
  singular: (noun:Noun) => {
    throw new Error("Genitive singular not implemented yet");
  },

plural: (noun:Noun) => genitivePlural(noun)
  
};

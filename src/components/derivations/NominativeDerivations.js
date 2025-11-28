


import { deriveStem ,endsWithSoftConsonant} from "../vocalGrammer.js";


// Masculine & neuter softening
const SOFTENING_MAP = {
  "k": "c",
  "g": "z",
  "h": "z",
  "ch": "š",
  "d": "ď",
  "t": "ť",
  "n": "ň",
  "l": "ľ"
};

// Feminine softening (for consonant-ending nouns)
const FEMININE_SOFTEN_MAP = {
  "ť": "t",
  "ď": "d",
  "ň": "n",
  "ľ": "l",
  "š": "s",
  "ž": "z",
  "č": "c"
};



export function softenStem(stem, gender, originalWord) {
 
 if (!stem || stem.length <= 1) return stem; // <- don't soften single-letter stems

  if (gender === "F") {
    const lastChar = stem.slice(-1);
    if (FEMININE_SOFTEN_MAP[lastChar]) {
      return stem.slice(0, -1) + FEMININE_SOFTEN_MAP[lastChar];
    }
  } else if (gender === "M"){
     // Only soften if original word does NOT end with "a"
    if (!originalWord.endsWith("a")) {
      for (const [hard, soft] of Object.entries(SOFTENING_MAP)) {
        if (stem.endsWith(hard)) {
          return stem.slice(0, -hard.length) + soft;
        }
      }
    }
  }
  return stem;
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
function nominativePlural(word, gender, animate = false) {
  let stem = deriveStem(word, gender);
   
  stem = softenStem(stem, gender,word); // apply softening before suffix
  

  if (gender === "M") {
    if (word.endsWith("a")) {
      return stem + "ovia"; // hrdina → hrdinovia, kolega → kolegovia
    }
    if (!animate) return stem + "e"; // stroj → stroje
    return stem + "i";       // chlap → chlapi, muž → muži
  }

  if (gender === "F") {
    if (word.endsWith("ie")) return stem + "ia";
    if (word.endsWith("ia")) return stem + "ie"; // chemia → chémie
    if (word.endsWith("a")){
         if (endsWithSoftConsonant(stem)) return stem + "e"; // stanica -> stanice
         return stem + "y"; // žena → ženy
    }
     return stem + "i"; // consonant-ending feminines: kosť → kosti

     
  }

  if (gender === "N") {
    if (word.endsWith("o")) return stem + "á";   // mesto → mestá
    if (word.endsWith("e")) return stem + "ia";  // srdce → srdcia
    if (word.endsWith("ie")) return stem + "ia"; // vysvedčenie → vysvedčenia
    if (word.endsWith("um")) return stem + "á";  // minimum → minimá
    return stem;
  }

  throw new Error("Invalid gender: must be 'M', 'F', or 'N'");
}

export const  nominativeNounDeriver ={
    singular: (noun) =>  noun.sk,
    plural: (noun) => nominativePlural(noun.sk,noun.gender, noun.animate)
}

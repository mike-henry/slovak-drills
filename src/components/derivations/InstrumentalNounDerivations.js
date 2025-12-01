import { deriveStem } from "../vocalGrammer.js";
import { nominativeNounDeriver } from "./NominativeNounDerivations.js";

/**
 * Get the instrumental singular form of a Slovak noun
 *
 * @param {string} word - noun in Slovak
 * @param {"M"|"F"|"N"} gender - grammatical gender
 * @param {boolean} [animate=false] - only used for masculine nouns
 * @returns {string} - instrumental singular
 */
function instrumentalSingular(word, gender, animate = false) {
  const stem = deriveStem(word, gender);

  switch (gender) {
    case "M":
      return stem + "om"; // chlap → chlapom, hrdina → hrdinom
    case "F":
      if (word.endsWith("ia")) return stem + "iou"; // chémia → chémiou
      if (word.endsWith("a")) return stem + "ou"; // žena → ženou, kniha → knihou
      return stem + "ou"; // consonant-ending feminines: kosť → kosťou
    case "N":
      if (word.endsWith("ie")) return stem + "ím"; // vysvedčenie → vysvedčením
      return stem + "om"; // mesto → mestom, more → morom
    default:
      throw new Error("Invalid gender");
  }
}

/**
 * Get the instrumental plural form of a Slovak noun
 *
 * @param {string} word - noun in Slovak
 * @param {"M"|"F"|"N"} gender - grammatical gender
 * @param {boolean} [animate=false] - only used for masculine nouns
 * @returns {string} - instrumental plural
 */

// ---------------------------
// INSTRUMENTAL PLURAL
// ---------------------------
export function instrumentalPlural(word, gender, animate = false) {
  // Derive the singular stem first
  const stem = deriveStem(word, gender, true);

  // ------------------- MASCULINE -------------------
  if (gender === "M") {
    // animate or inanimate, same suffix for plural: -mi
    if (word.endsWith("a")) {
      // masculine nouns ending in -a (hrdina → hrdinami)
      return stem + "ami";
    }
    // consonant-ending masculine (chlap → chlapmi)
    return stem + "mi";
  }

  // ------------------- FEMININE -------------------
  if (gender === "F") {
    // All feminine plurals: -ami
    if(word.endsWith("ia"))  return stem + "iami"; // chémia → chémiami
    return stem + "ami";
  }

  // ------------------- NEUTER -------------------
  if (gender === "N") {
    // All neuter plurals: -ami
    return stem + "ami";
  }

  throw new Error("Invalid gender for instrumental plural");
}

export const instrumentalNounDeriver = {
  singular: (noun) => instrumentalSingular(noun.sk, noun.gender, noun.animate),
  plural: (noun) => instrumentalPlural(noun.sk, noun.gender, noun.animate),
};

import {
  deriveStem,
  endsWithSoftConsonant,
  endsWithConsonant,
} from "../vocalGrammer.js";

import { nominativeNounDeriver,softenStem } from "./NominativeDerivations.js";

// kosť-class consonants that lose diacritic before -i
const SOFTEN_MAP = {
  "ť": "t",
  "ď": "d",
  "ň": "n",
  "ľ": "l",
};

/**
 * LOCATIVE — SINGULAR
 */
function locativeSingular(word, gender, animate = false) {
  const stem = deriveStem(word, gender);

  // ---------- MASCULINE ----------
  if (gender === "M") {
    // Animate → -ovi (chlap → o chlapovi)
    if (animate) return stem + "ovi";

    // Inanimate: determine hrad vs stroj class
    const nomPl = nominativeNounDeriver.plural({
      sk: word,
      gender,
      animate,
    });

    // stroj-class → plural in -e → locative in -i
    if (nomPl.endsWith("e")) {
      return stem + "i"; // stroj → o stroji
    }

    // hrad-class → -e
    return stem + "e"; // hrad → o hrade
  }

  // ---------- FEMININE ----------
  if (gender === "F") {
    if (endsWithConsonant(word)) {
        const softenedStem = softenStem(stem,gender,word);
        return softenedStem + "i"; // kosť → kosti
    }

    // Ending in -ia → -ii
    if (word.endsWith("ia")) {
      return stem + "ii"; // chémia → chémii
    }
    // Ending in -a → -e or -i
    if (word.endsWith("a")) {
      if (endsWithSoftConsonant(stem)) {
        return stem + "i"; // stanica → stanici
      }
      return stem + "e"; // žena → žene
    }

    // Consonant-ending feminine (kosť class) → -i
    return stem + "i"; // kosť → kosti
  }

  // ---------- NEUTER ----------
  if (gender === "N") {
    if (word.endsWith("ie")) return stem + "í"; // vysvedčenie → vysvedčení
    if (word.endsWith("o")) return stem + "e"; // mesto → meste
    if (word.endsWith("e")) return stem + "i"; // srdce → srdci
    if (word.endsWith("um")) return stem + "e"; // centrum → centre
    return stem + "e"; // fallback
  }

  throw new Error("Invalid gender for locative singular");
}

const IRREGULAR_LOC_PL = {
  // add known irregular locative plurals here, e.g.:
  // "ľudia": "ľuďoch", // example only — verify before adding
};

/**
 * LOCATIVE — PLURAL
 */
export function locativePlural(word, gender, animate = false) {
  const nomPl = nominativeNounDeriver.plural({ sk: word, gender, animate });
  
  // --- FEMININE SPECIAL CASES ---
  if (gender === "F") {
    if (nomPl.endsWith("ie")) return nomPl.slice(0, -2) + "iách"; // chémie → chémiách
    if (nomPl.endsWith("ia")) return nomPl.slice(0, -2) + "iach"; // chémie → chémiách
    if (nomPl.endsWith("y")) return nomPl.slice(0, -1) + "ách"; // ženy → ženách
    if (nomPl.endsWith("e")) return nomPl.slice(0, -1) + "iach"; // stanice → staniciach
    if (nomPl.endsWith("i")) return nomPl.slice(0, -1) + "iach"; // kosti → kostiach
  }

  // --- MASCULINE ---
  if (gender === "M") {
    if (nomPl.endsWith("i")) return nomPl.slice(0, -1) + "och"; // chlapi → chlapoch
    if (nomPl.endsWith("e")) return nomPl.slice(0, -1) + "och"; // stroje → strojoch
  }

  // --- NEUTER ---
  if (gender === "N") {
    if (nomPl.endsWith("á")) return nomPl.slice(0, -1) + "ách"; // mestá → mestách
    if (nomPl.endsWith("a")) return nomPl.slice(0, -1) + "ach"; // srdcia → srdciach
    if (nomPl.endsWith("ie")) return nomPl.slice(0, -2) + "iach"; // vysvedčenia → vysvedčeniach
  }

  // fallback — rarely needed
  return nomPl + "ch";
}

export const locativeNounDeriver = {
  singular: locativeSingular,
  plural: locativePlural,
};

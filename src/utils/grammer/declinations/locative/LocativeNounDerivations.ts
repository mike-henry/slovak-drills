import type { NounDeclinator } from "../Noun.js";
import {
  // deriveStem,
  endsWithSoftConsonant,
  endsWithConsonant,
  deriveVocalStem,
} from "../../vocalGrammer.js";
import DerivedWord from "../../DerivedWord.js";

import {
  NominativeNounDeriver,
  softenStem,
} from "../nominative/NominativeNounDerivations.js";
import type Noun from "../Noun.js";

// kosť-class consonants that lose diacritic before -i
const SOFTEN_MAP = {
  ť: "t",
  ď: "d",
  ň: "n",
  ľ: "l",
};

/**
 * LOCATIVE — SINGULAR
 */
function locativeSingular(noun:Noun): DerivedWord {
  const word = noun.sk
  const animate = noun.animate
  const gender = noun.gender
  const stem = deriveVocalStem(noun);
  let derived:string;
  let explanation:string;

  const nominativePluralDerived = () =>
    NominativeNounDeriver.plural(noun).derived;

  // ---------- MASCULINE ----------
  if (gender === "M") {
    // Animate → -ovi (chlap → o chlapovi)
    if (animate) {
      derived = stem + "ovi";
      explanation = `animate noun ${stem} + ov + i`;
      return new DerivedWord( derived, explanation );
    }
    // Inanimate: determine hrad vs stroj class
    // stroj-class → plural in -e → locative in -i
    if (nominativePluralDerived().endsWith("e")) {
      derived = stem + "i"; // stroj → o stroji
      explanation = `inanimate noun ${stem} + i`;
    } else {
      // hrad-class → -e
      derived = stem + "e"; // hrad → o hrade
      explanation = `inanimate noun ${stem} + e`;
    }

    return new DerivedWord( derived, explanation );
  }

  // ---------- FEMININE ----------
  if (gender === "F") {
    if (endsWithConsonant(word)) {
      const softenedStem = softenStem(stem, gender, word);
      derived = softenedStem + "i"; // kosť → kosti
      explanation = `feminine consonant-ending noun softened ${softenedStem} + i`;
    }
    // Ending in -ia → -ii
    else if (word.endsWith("ia")) {
      derived = stem + "ii"; // chémia → chémii
      explanation = `feminine noun ${stem} + ii`;
    }
    // Ending in -a → -e or -i
    else if (word.endsWith("a")) {
      if (endsWithSoftConsonant(stem)) {
        derived = stem + "i"; // stanica → stanici
        explanation = `feminine noun with soft consonant stem ${stem} + i`;
      } else {
        derived = stem + "e";
        explanation = `feminine noun with hard consonant stem ${stem} + e`;
      }
    } else {
      derived = stem + "i"; // other feminines
      explanation = `feminine noun ${stem} + i`;
    }
    return new DerivedWord( derived, explanation );
  }

  // ---------- NEUTER ----------
  if (gender === "N") {
    if (word.endsWith("ie")) {
      derived = stem + "í";
      explanation = `neuter noun ${stem} + í`;
    } // vysvedčenie → vysvedčení
    else if (word.endsWith("o")) {
      derived = stem + "e";
      explanation = `neuter noun ${stem} + e`;
    } // mesto → meste
    else if (word.endsWith("e")) {
      derived = stem + "i";
      explanation = `neuter noun ${stem} + i`;
    } // srdce → srdci
    else if (word.endsWith("um")) {
      derived = stem + "e";
      explanation = `neuter noun ${stem} + e`;
    } // centrum → centre
    else {
      derived = stem + "e";
      explanation = `neuter noun ${stem} + e`;
    } // fallback
  } else {
    throw new Error("Invalid gender for locative singular");
  }
  return new DerivedWord( derived, explanation );
}

const IRREGULAR_LOC_PL = {
  // add known irregular locative plurals here, e.g.:
  // "ľudia": "ľuďoch", // example only — verify before adding
};

/**
 * LOCATIVE — PLURAL
 */
export function locativePlural(noun:Noun): DerivedWord {
  const nomPl = NominativeNounDeriver.plural(noun).derived;
  const animate = noun.animate;
  const word = noun.sk;
  const gender = noun.gender
  let derived: string;
  let explanation: string;
  let stemed1 = () => nomPl.slice(0, -1); // helper to get stem by removing last  char
  let stemed2 = () => nomPl.slice(0, -2); // helper to get stem by removing last 2 chars

  // --- FEMININE SPECIAL CASES ---
  if (gender === "F") {
    if (nomPl.endsWith("ie")) {
      derived = stemed2() + "iách";
      explanation = `stem ${stemed2()} + iách`;
    } // stanice → staniciach
    else if (nomPl.endsWith("ia")) {
      derived = stemed2() + "iach";
      explanation = `stem ${stemed2()} + iách`;
    } // chémie → chémiách
    else if (nomPl.endsWith("y")) {
      derived = stemed1() + "ách";
      explanation = `stem ${stemed1()} + ách`;
    } else if (nomPl.endsWith("e")) {
      // stanice → staniciach
      derived = stemed1() + "iach";
      explanation = `stem ${stemed1()} + iách`;
    } else if (nomPl.endsWith("i")) {
      // kosti → kostiach
      derived = stemed1() + "iach";
      explanation = `stem ${stemed1()} + iách`;
    }
    return new DerivedWord( derived, explanation );
  }

  // --- MASCULINE ---
  else if (gender === "M") {
    if (nomPl.endsWith("i")) {
      derived = stemed1() + "och"; // chlapi → chlapoch
      explanation = `stem ${stemed1()} + och`;
    } else if (nomPl.endsWith("e")) {
      derived = stemed1() + "och";
      explanation = `stem ${stemed1()} + och`;
    } // stroje → strojoch
    else {
      derived = stemed1() + "ych";
      explanation = `stem ${stemed1()} + ych`;
    }
  }
  // --- NEUTER ---
  else if (gender === "N") {
    if (nomPl.endsWith("á")) {
      derived = stemed1() + "ách"; // mestá → mestách
      explanation = `stem ${stemed1()} + ách`;
    } else if (nomPl.endsWith("a")) {
      derived = stemed1() + "ach"; // srdcia → srdciach
      explanation = `stem ${stemed1()} + ach`;
    } else if (nomPl.endsWith("ie")) {
      explanation = stemed2() + "iach"; // vysvedčenia → vysvedčeniach
      explanation = `stem ${stemed2()} + iach`;
    } // vysvedčenia → vysvedčeniach
  } else {
    // fallback — rarely needed
    derived = nomPl + "ch";
  }

  return new DerivedWord( derived, explanation );
}


export const LocativeNounDeriver: NounDeclinator = {
  singular: (noun: Noun) =>
    locativeSingular(noun),
  plural: (noun: Noun) => locativePlural(noun),
};

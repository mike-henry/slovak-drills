import {
  deriveStem,
  endsWithSoftConsonant,
  endsWithConsonant,
} from "../vocalGrammer.js";

import { nominativeNounDeriver,softenStem } from "./NominativeNounDerivations.js";

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
  let derived;
  let explanation;

const nominativePluralDerived = () => nominativeNounDeriver.plural({
      sk: word,
      gender,
      animate,
    }).derived



  // ---------- MASCULINE ----------
  if (gender === "M") {
    // Animate → -ovi (chlap → o chlapovi)
    if (animate) { derived = stem + "ovi"; explanation= `animate noun ${stem} + ov + i`; return {derived, explanation}; }
    // Inanimate: determine hrad vs stroj class
    // stroj-class → plural in -e → locative in -i
    if (nominativePluralDerived().endsWith("e")) {
      derived = stem + "i"; // stroj → o stroji
      explanation= `inanimate noun ${stem} + i` ;
    } else {
      // hrad-class → -e
      derived = stem + "e"; // hrad → o hrade
      explanation= `inanimate noun ${stem} + e` ;
    }

    return { derived, explanation };
    
  }

  // ---------- FEMININE ----------
  if (gender === "F") {
    if (endsWithConsonant(word)) {
        const softenedStem = softenStem(stem,gender,word);
        derived = softenedStem + "i"; // kosť → kosti
        explanation= `feminine consonant-ending noun softened ${softenedStem} + i` ;
    }
    // Ending in -ia → -ii
    else if (word.endsWith("ia")) {
      derived = stem + "ii"; // chémia → chémii
      explanation= `feminine noun ${stem} + ii` ;
    }
    // Ending in -a → -e or -i
    else if (word.endsWith("a")) {
      if (endsWithSoftConsonant(stem)) {
        derived = stem + "i"; // stanica → stanici
        explanation= `feminine noun with soft consonant stem ${stem} + i` ;
      } else {
        derived = stem + "e";
        explanation= `feminine noun with hard consonant stem ${stem} + e` ;
      }
      
    } else {
      derived = stem + "i"; // other feminines
      explanation= `feminine noun ${stem} + i` ;
    }
    return { derived, explanation };
  }

  // ---------- NEUTER ----------
  if (gender === "N") {
    if (word.endsWith("ie")){
       derived = stem + "í";
        explanation= `neuter noun ${stem} + í`;
      } // vysvedčenie → vysvedčení
    else if (word.endsWith("o")) {
      derived = stem + "e"; 
      explanation= `neuter noun ${stem} + e`;
    }// mesto → meste
    else if (word.endsWith("e")) {
      derived = stem + "i"; 
      explanation= `neuter noun ${stem} + i`;
    }// srdce → srdci
    else if (word.endsWith("um")) {
      derived = stem + "e";
      explanation= `neuter noun ${stem} + e`;
    } // centrum → centre
    else {
      derived = stem + "e";
      explanation= `neuter noun ${stem} + e`;
    } // fallback
  } else {
     throw new Error("Invalid gender for locative singular");
  }
  return { derived, explanation };
}

const IRREGULAR_LOC_PL = {
  // add known irregular locative plurals here, e.g.:
  // "ľudia": "ľuďoch", // example only — verify before adding
};

/**
 * LOCATIVE — PLURAL
 */
export function locativePlural(word, gender, animate = false) {
  const nomPl = nominativeNounDeriver.plural({ sk: word, gender, animate }).derived;
  let derived;
  let explanation;
  let stemed1 =  () => nomPl.slice(0, -1) // helper to get stem by removing last  char
  let stemed2 =  () => nomPl.slice(0, -2) // helper to get stem by removing last 2 chars
  
  // --- FEMININE SPECIAL CASES ---
  if (gender === "F") {
    if (nomPl.endsWith("ie")) {
      derived = stemed2(stemed2) + "iách"; 
      explanation = `stem ${stemed2()} + iách`;
    } // stanice → staniciach
    else if (nomPl.endsWith("ia")) {
      derived = stemed2() + "iach"; 
      explanation = `stem ${stemed2()} + iách`;
    }// chémie → chémiách
    else if (nomPl.endsWith("ia")) {
      derived = stemed2() + "iach"; 
      explanation = `stem ${stemed2()} + iách`;     
    } // chémie → chémiách
    else if (nomPl.endsWith("y")) { 
      derived = stemed1() + "ách"; 
      explanation = `stem ${stemed1()} + ách`;
    }
    else if (nomPl.endsWith("e")) { // stanice → staniciach
      derived = stemed1() + "iach"; 
      explanation = `stem ${stemed1()} + iách`;
    }
    else if (nomPl.endsWith("i")) { // kosti → kostiach
      derived = stemed1() + "iach"; 
      explanation = `stem ${stemed1()} + iách`;
    }
    return { derived, explanation };
  }

  // --- MASCULINE ---
  else if (gender === "M") {
    if (nomPl.endsWith("i")) {
      derived = stemed1() + "och"; // chlapi → chlapoch
    explanation = `stem ${stemed1()} + och`;
    }
    else if (nomPl.endsWith("e")) {
      derived = stemed1() + "och";
      explanation = `stem ${stemed1()} + och`;
    }  // stroje → strojoch
  }
  // --- NEUTER ---
  else if (gender === "N") {
    if (nomPl.endsWith("á")) {  derived =  stemed1()  + "ách"; // mestá → mestách
      explanation = `stem ${stemed1()} + ách`;
    }
    else if (nomPl.endsWith("a")) { derived= stemed1() + "ach"; // srdcia → srdciach
      explanation = `stem ${stemed1()} + ach`;
    }
    else if (nomPl.endsWith("ie")) { return stem2() + "iach"; // vysvedčenia → vysvedčeniach
       explanation = `stem ${stem2()} + iach`;
    } // vysvedčenia → vysvedčeniach
  }  
    else {
      // fallback — rarely needed
       derived = nomPl + "ch";
  }


  return { derived, explanation };
}

export const locativeNounDeriver = {
  singular: (noun) =>locativeSingular(noun.sk,noun.gender,noun.animate),
  plural: (noun) =>locativePlural(noun.sk,noun.gender,noun.animate)
};

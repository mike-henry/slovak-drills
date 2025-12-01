import { deriveStem, endsWithSoftConsonant } from "../vocalGrammer.js";

// Masculine & neuter softening
const SOFTENING_MAP = {
  k: "c",
  g: "z",
  h: "z",
  ch: "š",
  d: "ď",
  t: "ť",
  n: "ň",
  l: "ľ",
};

// Feminine softening (for consonant-ending nouns)
const FEMININE_SOFTEN_MAP = {
  ť: "t",
  ď: "d",
  ň: "n",
  ľ: "l",
  š: "s",
  ž: "z",
  č: "c",
};

export function softenStem(stem, gender, originalWord) {
  if (!stem || stem.length <= 1) return stem; // <- don't soften single-letter stems

  if (gender === "F") {
    const lastChar = stem.slice(-1);
    if (FEMININE_SOFTEN_MAP[lastChar]) {
      return stem.slice(0, -1) + FEMININE_SOFTEN_MAP[lastChar];
    }
  } else if (gender === "M") {
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
  let derived;
  let explanation;

  stem = softenStem(stem, gender, word); // apply softening before suffix
console.log("nominativePlural:");
  switch (gender) {
    case "M":
      if (word.endsWith("a")) {
        derived = stem + "ovia";
        explanation = `softened stem (${stem}) + ovia for masculine nouns ending with -a`;
      } else {
        if (animate) {
          derived = stem + "ovia";
          explanation = `softened stem (${stem}) + ovia for masculine animate nouns`;
        }

        if (!animate) {
          derived = stem + "e";
          explanation = `softened stem (${stem}) + e for masculine inanimate nouns`;
          // stroj → stroje
        } else {
          derived = stem + "i";
          explanation = `softened stem (${stem}) + i for masculine nouns`;
        }
      }

      break;
    case "F":
      if (word.endsWith("ie")) {
        derived = stem + "ia";
        explanation = `stem ${stem} + ia for feminines ending with ie`;
      } else if (word.endsWith("ia")) {
        derived = stem + "ie";
        explanation = `stem ${stem} + ie for feminines ending with ia`;
        // chemia → chémie
      } else if (word.endsWith("a")) {
        if (endsWithSoftConsonant(stem)) {
          // stanica -> stanice
          derived = stem + "e";
          explanation = `softened stem (${stem}) + e for feminines with soft consonant-ending`;
        } else {
          // žena → ženy
          derived = stem + "y";
          explanation = `stem (${stem}) + y for feminines ending with -a`;
        }
      } else {
        derived = stem + "i"; // consonant-ending feminines: kosť → kosti
        explanation = `stem (${stem}) + i for consonant-ending feminines`;
      }
      break;
    case "N":
      if (word.endsWith("o")) {
        derived = stem + "á"; // mesto → mestá
        explanation = `stem ${stem} + á for neuters ending with o`;
      } else if (word.endsWith("e")) {
        derived = stem + "ia";
        explanation = `stem ${stem} + ia for neuters ending with e`;
      } else if (word.endsWith("ie")) {
        derived = stem + "ia";
        explanation = `stem ${stem} + ia for neuters ending with ie`;
      } else if (word.endsWith("um")) {
        derived = stem + "á";
        explanation = `stem ${stem} + á for neuters ending with um`;
      } else {
        derived = stem;
        explanation = `unchanged stem for neuters`;
      }
      break;
    default:
      throw new Error("Invalid gender: must be 'M', 'F', or 'N'");
  }
  return { derived, explanation };
}

export const nominativeNounDeriver = {
  singular: (noun) => {
    return {
      derived: noun.sk,
      explanation: "nominative singular is the base form",
    };
  },
  plural: (noun) => nominativePlural(noun.sk, noun.gender, noun.animate),
};

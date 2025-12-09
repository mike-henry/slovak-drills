import type { Gender, Noun } from "../grammer/WordTypes.ts";
import { deriveStem, endsWithSoftConsonant } from "../vocalGrammer.ts";
import type { NounDeriver } from "./Derivers.ts";
import { CaseDerivedNoun } from "./Derivers.ts";

const getLast = (str) => str.slice(-1);

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
  č: "c",
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
function nominativePlural(
  word,
  gender: Gender,
  animate = false,
  pluralOnly = false
) {
  let orgininalStem = deriveStem(word, gender, pluralOnly, animate);
  let derived;
  let explanation;

  const softenedStem = softenStem(orgininalStem, gender, word); // apply softening before suffix

  if (pluralOnly) {
    return {
      derived: word,
      explanation: `"${word}" only has plural form`,
    };
  }

  switch (gender) {
    case "M":
      // nouns ending in -a (hrdina, kolega...)
      if (word.endsWith("a")) {
        derived = softenedStem + "ovia";
        explanation = `stem ${softenedStem} + ovia for masculine nouns ending in -a`;
        break;
      }

      // Animate masculine → regular -i (NOT softening!)
      if (animate) {
        // Many animate nouns use -i (chlap → chlapi)
        // Irregular ones like syn → synovia will be handled separately
        derived = softenedStem + "i";
        explanation = `stem ${softenedStem} + i for masculine animate nouns`;
        break;
      }
      if (endsWithSoftConsonant(orgininalStem)) {
        derived = orgininalStem + "e"; // stroj → stroje
        explanation = `soft-stem masculine inanimate → stem ${softenedStem} + e`;
      } else {
        derived = orgininalStem + "y"; // hrad → hrady
        explanation = `hard-stem masculine inanimate → stem ${softenedStem} + y`;
      }

      break;

    case "F":
      if (word.endsWith("ie")) {
        derived = softenedStem + "ia";
        explanation = `stem ${softenedStem} + ia for feminines ending with ie`;
      } else if (word.endsWith("ia")) {
        derived = softenedStem + "ie";
        explanation = `stem ${softenedStem} + ie for feminines ending with ia`;
        // chemia → chémie
      } else if (word.endsWith("a")) {
        if (endsWithSoftConsonant(orgininalStem)) {
          // stanica -> stanice
          derived = softenedStem + "e";
          explanation = `softened stem (${softenedStem}) + e for feminines with soft consonant-ending`;
        } else {
          // žena → ženy
          derived = softenedStem + "y";
          explanation = `stem (${softenedStem}) + y for feminines ending with -a`;
        }
      } else {
        derived = softenedStem + "i"; // consonant-ending feminines: kosť → kosti
        explanation = `stem (${softenedStem}) + i for consonant-ending feminines`;
      }
      break;
    case "N":
      if (word.endsWith("o")) {
        derived = softenedStem + "á"; // mesto → mestá
        explanation = `stem ${softenedStem} + á for neuters ending with o`;
      } else if (word.endsWith("e")) {
        derived = softenedStem + "ia";
        explanation = `stem ${softenedStem} + ia for neuters ending with e`;
      } else if (word.endsWith("ie")) {
        derived = softenedStem + "ia";
        explanation = `stem ${softenedStem} + ia for neuters ending with ie`;
      } else if (word.endsWith("um")) {
        derived = softenedStem + "á";
        explanation = `stem ${softenedStem} + á for neuters ending with um`;
      } else {
        derived = softenedStem;
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
  plural: (noun) =>
    nominativePlural(noun.sk, noun.gender, noun.animate, noun.plural),
};

export const NominativeNounDeriver: NounDeriver = {
  singular(noun: Noun): CaseDerivedNoun {
    // throw new Error("Method not implemented.");
    return new CaseDerivedNoun(noun.sk, "nominative singular is the base form");
  },
  plural(noun: Noun): CaseDerivedNoun {
    const response = nominativePlural(
      noun.sk,
      noun.gender,
      noun.animate,
      noun.plural
    );
    return new CaseDerivedNoun(response.derived, response.explanation);
  },
};

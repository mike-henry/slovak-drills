import { deriveStem } from "../vocalGrammer.js";
import { nominativeNounDeriver } from "./NominativeNounDerivations.js";

/**
 * Instrumental singular
 */
function instrumentalSingular(word, gender, animate = false) {
  const stem = deriveStem(word, gender);

  switch (gender) {
    case "M": {
      const derived = stem + "om";
      return {
        derived,
        explanation: `masculine instrumental singular = stem (${stem}) + om`,
      };
    }

    case "F": {
      if (word.endsWith("ia")) {
        const derived = stem + "iou";
        return {
          derived,
          explanation: `feminine ending -ia → instrumental singular = stem (${stem}) + iou`,
        };
      }

      if (word.endsWith("a")) {
        const derived = stem + "ou";
        return {
          derived,
          explanation: `feminine ending -a → instrumental singular = stem (${stem}) + ou`,
        };
      }

      const derived = stem + "ou";
      return {
        derived,
        explanation: `consonant-ending feminine → instrumental singular = stem (${stem}) + ou`,
      };
    }

    case "N": {
      if (word.endsWith("ie")) {
        const derived = stem + "ím";
        return {
          derived,
          explanation: `neuter ending -ie → instrumental singular = stem (${stem}) + ím`,
        };
      }

      const derived = stem + "om";
      return {
        derived,
        explanation: `neuter instrumental singular = stem (${stem}) + om`,
      };
    }

    default:
      throw new Error("Invalid gender");
  }
}

/**
 * Instrumental plural
 */
export function instrumentalPlural(word, gender, animate = false) {
  const stem = deriveStem(word, gender, true);

  // ----- MASCULINE -----
  if (gender === "M") {
    if (word.endsWith("a")) {
      const derived = stem + "ami";
      return {
        derived,
        explanation: `masculine ending -a → instrumental plural = stem (${stem}) + ami`,
      };
    }

    const derived = stem + "mi";
    return {
      derived,
      explanation: `masculine consonant-ending → instrumental plural = stem (${stem}) + mi`,
    };
  }

  // ----- FEMININE -----
  if (gender === "F") {
    if (word.endsWith("ia")) {
      const derived = stem + "iami";
      return {
        derived,
        explanation: `feminine ending -ia → instrumental plural = stem (${stem}) + iami`,
      };
    }

    const derived = stem + "ami";
    return {
      derived,
      explanation: `feminine instrumental plural = stem (${stem}) + ami`,
    };
  }

  // ----- NEUTER -----
  if (gender === "N") {
    const derived = stem + "ami";
    return {
      derived,
      explanation: `neuter instrumental plural = stem (${stem}) + ami`,
    };
  }

  throw new Error("Invalid gender for instrumental plural");
}

export const instrumentalNounDeriver = {
  singular: (noun) =>
    instrumentalSingular(
      noun.sk,
      noun.gender,
      noun.animate
    ),

  plural: (noun) =>
    instrumentalPlural(
      noun.sk,
      noun.gender,
      noun.animate
    ),
};

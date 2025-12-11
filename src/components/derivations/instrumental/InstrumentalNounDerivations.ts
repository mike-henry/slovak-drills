import type { Noun } from "@/components/grammer/WordTypes.js";
import { deriveStem, deriveVocalStem } from "../../vocalGrammer.js";
import type { NounDeriver } from "../Derivers.js";
import { nominativeNounDeriver } from "../nominative/NominativeNounDerivations.js";

/**
 * Instrumental singular
 */
function instrumentalSingular(noun:Noun) {
  const word = noun.sk
  const stem = deriveVocalStem(noun);

  switch (noun.gender) {
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
export function instrumentalPlural(noun:Noun) {
  const word = noun.sk
  const stem = deriveVocalStem(noun);

  // ----- MASCULINE -----
  if (noun.gender === "M") {
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
  if (noun.gender === "F") {
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
  if (noun.gender === "N") {
    const derived = stem +  ((noun.sk.endsWith("nie") ||noun.sk.endsWith("tie") ) ? "iami": "ami");
    return {
      derived,
      explanation: `neuter instrumental plural = stem (${stem}) + ami`,
    };
  }

  throw new Error("Invalid gender for instrumental plural");
}

export const instrumentalNounDeriver = {
  singular: (noun) =>
    instrumentalSingular(noun),

  plural: (noun) =>
    instrumentalPlural(noun),
};

export const InstrumentalNounDeriver:NounDeriver = {
  singular: (noun:Noun) =>
    instrumentalSingular(
      noun
    ),

  plural: (noun:Noun) =>
    instrumentalPlural(
      noun
    ),
};

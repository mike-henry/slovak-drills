import { locativeNounDeriver } from "./LocativeNounDerivations.js";
import { accusativeNounDeriver } from "./AccusativeNounDerivations.js";
import { instrumentalNounDeriver } from "./InstrumentalNounDerivations";
import { nominativeNounDeriver } from "./NominativeNounDerivations.js";
import { instrumentalAdjectiveDeriver } from "./InstrumentalAdjectiveDerivations.js";
import { nominativeAdjectiveDeriver } from "./NominativeAdjectiveDerivations.js";
import { accusativeAdjectiveDeriver } from "./AccusativeAdjectiveDerivations.js";
import { locativeAdjectiveDeriver } from "./LocativeAdjectiveDerivations.js";
import { STANDARD_SECTIONS} from "../../documents/DocumentLoader.js"

export const nounDeriver = (vocalCase) => {
  switch (vocalCase) {
    case CASE.LOCATIVE:
      return locativeNounDeriver;
    case CASE.ACCUSATIVE:
      return accusativeNounDeriver;
    case CASE.NOMINATIVE:
      return nominativeNounDeriver;
    case CASE.INSTRUMENTAL:
      return instrumentalNounDeriver;
    default:
      throw new Error(`Noun deriver for case ${vocalCase} not implemented yet`);
  }
};

const adjectiveDeriver = (vocalCase) => {
  switch (vocalCase) {
    case CASE.INSTRUMENTAL:
      return instrumentalAdjectiveDeriver;
    case CASE.ACCUSATIVE:
      return accusativeAdjectiveDeriver;
    case CASE.NOMINATIVE:
      return nominativeAdjectiveDeriver;
    case CASE.LOCATIVE:
      return locativeAdjectiveDeriver;
    default:
      throw new Error(
        `Adjective deriver for case ${vocalCase} not implemented yet`
      );
  }
};

export const CASE = {
  NOMINATIVE: "nominative",
  GENITIVE: "genitive",
  DATIVE: "dative",
  ACCUSATIVE: "accusative",
  INSTRUMENTAL: "instrumental",
  LOCATIVE: "locative",
  VOCATIVE: "vocative",
};


// Derived form  ________________________________________________________________________________________________

export const deriveAdjectiveNounCase = (
  adjective,
  noun,
  caseName,
  plural = false
) => {
  const nounInCasederiver = plural
    ? nounDeriver(caseName).plural
    : nounDeriver(caseName).singular;
  const adjectiveInCasederiver = plural
    ? adjectiveDeriver(caseName).plural
    : adjectiveDeriver(caseName).singular;
  const nounInCase = nounInCasederiver(noun);
  const adjectiveInCase = adjectiveInCasederiver(adjective, noun);
  const adjectiveDocumentation = adjectiveInCase.documentation? adjectiveInCase.documentation: STANDARD_SECTIONS.adjectiveEndings
  const nounDocumentation = nounInCase.documentation? nounInCase.documentation: STANDARD_SECTIONS.adjectiveEndings
  return {
    derived: `${adjectiveInCase.derived} ${nounInCase.derived}`,
    explanation: `for ${caseName} - adjective:${adjectiveInCase.explanation}, noun:${nounInCase.explanation}`,
    documentation: {
      noun: nounDocumentation,
      adjective: adjectiveDocumentation
    }
  };
};

export const deriveNounCase = (noun, caseName, plural = false) => {
  const nounInCasederiver = plural
    ? nounDeriver(caseName).plural
    : nounDeriver(caseName).singular;
  const nounInCase = nounInCasederiver(noun);
  const documentation = nounInCase.documentation? nounInCase.documentation: STANDARD_SECTIONS.nounEndings
  return {
    derived: nounInCase.derived,
    explanation: `for ${caseName} - noun:${nounInCase.explanation}`,
    documentation
  };
};

export const deriveAdjectiveCase = (
  adjective,
  noun,
  caseName,
  plural = false
) => {
  const adjectiveInCasederiver = plural
    ? adjectiveDeriver(caseName).plural
    : adjectiveDeriver(caseName).singular;
  const adjectiveInCase = adjectiveInCasederiver(adjective, noun);
  return {
    derived: adjectiveInCase.derived,
    explanation: `for ${caseName} - adjective:${adjectiveInCase.explanation}`,
  };
};

// InstrumentalAdjectiveDerivations.js

import {
  Gender,
  type Adjective,
  type Noun,
} from "@/components/grammer/WordTypes";

import { adjectives } from "../../wordStore";
import type { AdjectiveDeriver } from "../Derivers";
import { DerivedWord } from "../Derivers";

/**
 * Instrumental adjective — singular
 */
function instrumentalAdjectiveSingular(adj, nounInfo: Noun): DerivedWord {
  const { gender } = nounInfo;
  let derived: string;
  let explanation: string = "nyi"

  const base = adj.slice(0, -1); // dobr-
  switch (nounInfo.gender) {
    case Gender.Masculine:
      derived = base + "ým";
      break;
    case Gender.Femenine:
      derived = base + "ou";
      break;
    case Gender.Neutral:
      derived = base + "ým";
      break;
    default:
      throw new Error("Invalid gender for instrumental adjective singular");
  }
  return new DerivedWord(derived, explanation);
}

/**
 * Instrumental adjective — plural
 */
function instrumentalAdjectivePlural(adj:String):DerivedWord {
  const base = adj.slice(0, -1); // dobr-

  return new DerivedWord( base + "ými",""); // same for all genders
}

export const instrumentalAdjectiveDeriver = {
  singular: (adjective, noun) =>
    instrumentalAdjectiveSingular(adjective.sk, noun),
  plural: (adjective, noun) => instrumentalAdjectivePlural(adjective.sk),
};

export const InstrumentalAdjectiveDeriver: AdjectiveDeriver = {
  singular: (adjective: Adjective, noun: Noun) =>
    instrumentalAdjectiveSingular(adjective.sk, noun),
  plural: (adjective: Adjective, noun: Noun) =>
    instrumentalAdjectivePlural(adjective.sk),
};

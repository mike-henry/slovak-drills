// AccusativeAdjectiveDerivations.js

import type { AdjectiveDeclinator  } from  "../Adjective";;
import  DerivedWord from "../../DerivedWord";
import type Adjective from "../Adjective";
import type Noun from "../Noun";
import { STANDARD_SECTIONS } from "@/documents/DocumentLoader";


function accusativeAdjectiveSingular(adjective:string, noun:Noun) {
  const { gender, animate } = noun;
  let derived:string;
  let explanation:string;

  // Adjective base  (dobr-)
  const base = adjective.slice(0, -1); // remove -ý

  // ---------- MASCULINE ----------
  switch (gender) {
    case "M":
      if (animate) {
        derived = base + "ého"; // dobrého psa
        explanation = `animate masculine adjective stem (${base}) + ého for accusative masculine singular`;
      } else {
        derived = base + "ý"; // dobrý dom
        explanation = `inanimate masculine adjective stem (${base}) + ý for accusative masculine singular`;
      }
      break;

    // ---------- FEMININE ----------
    case "F":
      derived = base + "ú"; // dobrú ženu
      explanation = `feminine adjective stem (${base}) + ú for accusative feminine singular`;
      break;

    // ---------- NEUTER ----------
    case "N":
      derived = base + "é"; // dobré mesto
      explanation = `neuter adjective stem (${base}) + é for accusative neuter singular`;
      break;

    default:
      throw new Error("Invalid gender for accusative adjective singular");
  }
  return new DerivedWord(derived,explanation);
}

function accusativeAdjectivePlural(adj, noun:Noun) {
  const { gender, animate } = noun;
  let derived;
  let explanation;
  const base = adj.slice(0, -1); // dobr-
  switch (gender) {
    // ---------- MASCULINE ----------
    case "M":
      if (animate) {
        derived = base + "ých"; // dobrých chlapov
        explanation = `animate masculine adjective stem (${base}) + ých for accusative masculine plural`;
      } else {
        derived = base + "é"; // dobré stromy
        explanation = `inanimate masculine adjective stem (${base}) + é for accusative masculine plural`;
      }
      break;
    // ---------- FEMININE ----------
    case "F":
      derived = base + "é"; // dobré ženy
      explanation = `feminine adjective stem (${base}) + é for accusative feminine plural`;
      break;
    // ---------- NEUTER ----------
    case "N":
      derived = base + "é"; // dobré mestá
      explanation = `neuter adjective stem (${base}) + é for accusative neuter plural`;
      break;
    default:
      throw new Error("Invalid gender for accusative adjective plural");

  }
  return new DerivedWord(derived,explanation,[STANDARD_SECTIONS.adjectiveEndings]);
}

export const AccusativeAdjectiveDeriver:AdjectiveDeclinator = {
  singular: (adjective:Adjective, noun:Noun) => accusativeAdjectiveSingular(adjective.sk, noun),
  plural:  (adjective:Adjective, noun:Noun) => accusativeAdjectivePlural(adjective.sk, noun)
};
// AdjectiveDerivations.js

import { NominativeNounDeriver } from "./NominativeNounDerivations";

/**
 * Derive the stem of an adjective (base form ends in -ý / -á / -é)
 */
function deriveAdjectiveStem(adj) {
  if (!adj) return "";
  adj = adj.toLowerCase();
  

  // Remove ending: masculine -ý, feminine -á, neuter -é
  if (adj.endsWith("ý") || adj.endsWith("á") || adj.endsWith("é")) {
    return adj.slice(0, -1);
  }

  return adj;
}

/**
 * Nominative singular adjective
 */
function nominativeSingular(adj, noun) {
  const stem = deriveAdjectiveStem(adj);
  let derived;
  let explanation;

  switch (noun.gender) {
    case "M":
      if( noun.animate){
        derived=   stem + "ý"
        explanation= `adjective stem (${stem}) + ý for animate masculine singular`;
       } else {
         derived =stem + "ý"; // animate/inanimate same in nominative
         explanation= `adjective stem (${stem}) + ý for inanimate masculine singular`;
       }
      break
    case "F":
      derived = stem + "á";
      explanation = `femanine adjective stem (${stem}) + á `;
      break
    case "N":
      derived = stem + "é";
      explanation = `neuter adjective stem (${stem}) + é `;
      break;
    default:
      throw new Error("Invalid gender for adjective nominative singular");
  }
  return { derived, explanation };
}

/**
 * Nominative plural adjective
 */
function nominativePlural(adj, noun) {
  const stem = deriveAdjectiveStem(adj);
let derived;
let explanation;
  switch (noun.gender) {
    case "M":
      if (noun.animate) {
        derived = stem + "í";
        explanation = `adjective stem (${stem}) + í for animate masculine plural`;
        
      } else {
        derived = stem + "é";
        explanation = `adjective stem (${stem}) + é for inanimate masculine plural`;
      }
      break
    case "F":
      derived = stem + "é"; // feminine plural
      explanation = `adjective stem (${stem}) + é for feminine plural`;
      break;
    case "N":
      derived = stem + "é"; // neuter plural
      explanation = `adjective stem (${stem}) + é for neuter plural`;
      break;
    default:
      throw new Error("Invalid gender for adjective nominative plural");
  }
  return { derived, explanation };
}

export const nominativeAdjectiveDeriver = {
  singular: (adjective,noun) =>nominativeSingular(adjective.sk,noun),
  plural: (adjective,noun) =>nominativePlural(adjective.sk,noun),
};

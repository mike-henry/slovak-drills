// LocativeAdjectiveDerivations.js

/**
 * Locative adjective — singular
 */
function locativeAdjectiveSingular(adj, nounInfo) {
  const { gender } = nounInfo;

  const base = adj.slice(0, -1); // dobr-
  let derived;
  let explanation;
  switch(gender) {
    case "M":
      derived = base + "om";
      explanation = `adjective stem (${base}) + om `;
      break;
    case "F":
      derived = base + "ej";
      explanation = `adjective stem (${base}) + ej `;
      break;
    case "N":
      derived = base + "om";
      explanation = `adjective stem (${base}) + om `;
      break;
    default:
      throw new Error("Invalid gender for locative adjective singular");
  }
    return { derived, explanation  }
  }
  

/**
 * Locative adjective — plural
 */
function locativeAdjectivePlural(adj) {
  const base = adj.slice(0, -1); // dobr-

  return {derived:base + "ých"  ,explanation : `stem ${base} + ých" same for all genders` }; // same for all genders
}

export const locativeAdjectiveDeriver = {
  singular: (adjective, noun) =>locativeAdjectiveSingular(adjective.sk,noun),
  plural: (adjective, noun) =>locativeAdjectivePlural(adjective.sk, noun),
};

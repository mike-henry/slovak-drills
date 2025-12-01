// InstrumentalAdjectiveDerivations.js

/**
 * Instrumental adjective — singular
 */
function instrumentalAdjectiveSingular(adj, nounInfo) {
  const { gender } = nounInfo;

  const base = adj.slice(0, -1); // dobr-

  if (gender === "M") return base + "ým";
  if (gender === "F") return base + "ou";
  if (gender === "N") return base + "ým";

  throw new Error("Invalid gender for instrumental adjective singular");
}

/**
 * Instrumental adjective — plural
 */
function instrumentalAdjectivePlural(adj) {
  const base = adj.slice(0, -1); // dobr-

  return base + "ými"; // same for all genders
}

export const instrumentalAdjectiveDeriver = {
  singular: instrumentalAdjectiveSingular,
  plural: instrumentalAdjectivePlural,
};

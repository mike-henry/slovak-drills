// DativeDemonstrativeDerivations.js

function dativeSingular({ gender }) {
  switch (gender) {
    case "M": return "tomu";
    case "F": return "tej";
    case "N": return "tomu";
    default: throw new Error("Invalid gender for dative demonstrative singular");
  }
}

function dativePlural() {
  return "tým";
}

export const dativeDemonstrativeDeriver = {
  singular: dativeSingular,
  plural: dativePlural,
};

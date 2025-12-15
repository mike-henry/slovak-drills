// AccusativeDemonstrativeDerivations.js

function accusativeSingular({ gender, animate }) {
  switch (gender) {
    case "M":
      return animate ? "toho" : "ten";   // toho psa, ten dom
    case "F":
      return "tú";
    case "N":
      return "to";
    default:
      throw new Error("Invalid gender for accusative demonstrative singular");
  }
}

function accusativePlural({ gender, animate }) {
  switch (gender) {
    case "M":
      return animate ? "tých" : "tie";   // tých psov, tie stromy
    case "F":
    case "N":
      return "tie";
    default:
      throw new Error("Invalid gender for accusative demonstrative plural");
  }
}

export const accusativeDemonstrativeDeriver = {
  singular: accusativeSingular,
  plural: accusativePlural,
};

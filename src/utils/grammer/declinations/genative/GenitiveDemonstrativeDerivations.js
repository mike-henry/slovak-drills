// GenitiveDemonstrativeDerivations.js

function genitiveSingular({ gender }) {
  switch (gender) {
    case "M": return "toho";
    case "F": return "tej";
    case "N": return "toho";
    default: throw new Error("Invalid gender for genitive demonstrative singular");
  }
}

function genitivePlural() {
  return "tých";
}

export const genitiveDemonstrativeDeriver = {
  singular: genitiveSingular,
  plural: genitivePlural,
};

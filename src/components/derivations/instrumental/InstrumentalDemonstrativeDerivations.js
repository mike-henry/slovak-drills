// InstrumentalDemonstrativeDerivations.js

function instrumentalSingular({ gender }) {
  switch (gender) {
    case "M": return "tým";
    case "F": return "tou";
    case "N": return "tým";
    default: throw new Error("Invalid gender for instrumental demonstrative singular");
  }
}

function instrumentalPlural() {
  return "tými";
}

export const instrumentalDemonstrativeDeriver = {
  singular: instrumentalSingular,
  plural: instrumentalPlural,
};

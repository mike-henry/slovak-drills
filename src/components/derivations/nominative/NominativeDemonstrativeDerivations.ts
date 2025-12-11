// NominativeDemonstrativeDerivations.js

import type { Noun } from "../../grammer/WordTypes";



function nominativeSingular(gender) {
  let derived;
  let explanation;
  switch (gender) {
    case "M":
      derived = "ten";
      explanation = `demonstrative stem  + en `;
      break;
    case "F":
      derived = "tá";
      explanation = `demonstrative stem  + á `;
      break;
    case "N":
      derived = "to";
      explanation = `demonstrative stem (t) + o `;
      break;
    default:
      throw new Error("Invalid gender for nominative demonstrative singular");
  }
  return { derived, explanation };
}

function nominativePlural(gender) {
    let derived;
    let explanation;
  switch (gender) {
    case "M":
      derived = "tí";
      explanation = `demonstrative stem (t) + í `;
      break;
    case "F":
      derived = "tie";
      explanation = `demonstrative stem (t) + ie `;
      break;
    case "N":
      derived = "tie";
      explanation = `demonstrative stem (t) + ie `;
      break;
    default:
      throw new Error("Invalid gender for nominative demonstrative plural");
  }
  return { derived, explanation };
}

export const nominativeDemonstrativeDeriver = {
  singular: (noun) => nominativeSingular(noun.gender),
  plural: (noun) => nominativePlural(noun.gender),
};


export const NominativeDemonstrativeDeriver = {
  singular: (noun:Noun) => nominativeSingular(noun.gender),
  plural: (noun:Noun) => nominativePlural(noun.gender),
};

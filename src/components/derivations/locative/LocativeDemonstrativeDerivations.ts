// LocativeDemonstrativeDerivations.js

import { Gender, type Noun } from "../../grammer/WordTypes";

function locativeSingular(noun:Noun) {
  let derived;
  let explanation;
  switch (noun.gender) {
    case Gender.Masculine: {
      derived = "tom";
      explanation = `demonstrative stem (t) + om `;
      break;
    }
    case Gender.Femenine: {
      derived = "tej";
      explanation = `demonstrative stem (t) + ej `;
      break;
    }
    case Gender.Neutral: {
      derived = "tom";
      explanation = `demonstrative stem (t) + om `;
      break;
    }
    default:
      throw new Error("Invalid gender for locative demonstrative singular");
  }
  return { derived, explanation };
}

function locativePlural(noun:Noun) {
  return {
    derived: "tých",
    explanation: `demonstrative stem (t) + ých same for all genders`,
  }; // same for all genders}
}

export const locativeDemonstrativeDeriver = {
  singular: (noun) =>locativeSingular(noun),
  plural: (noun) =>locativePlural(noun),
};


export const LocativeDemonstrativeDeriver = {
  singular: (noun:Noun) =>locativeSingular(noun),
  plural: (noun:Noun) =>locativePlural(noun),
};

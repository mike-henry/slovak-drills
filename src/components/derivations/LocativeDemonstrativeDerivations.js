// LocativeDemonstrativeDerivations.js

function locativeSingular({ gender }) {
  let derived;
  let explanation;
  switch (gender) {
    case "M": {
      derived = "tom";
      explanation = `demonstrative stem (t) + om `;
      break;
    }
    case "F": {
      derived = "tej";
      explanation = `demonstrative stem (t) + ej `;
      break;
    }
    case "N": {
      derived = "tom";
      explanation = `demonstrative stem (t) + om `;
      break;
    }
    default:
      throw new Error("Invalid gender for locative demonstrative singular");
  }
  return { derived, explanation };
}

function locativePlural() {
  return {
    derived: "tých",
    explanation: `demonstrative stem (t) + ých same for all genders`,
  }; // same for all genders}
}

export const locativeDemonstrativeDeriver = {
  singular: locativeSingular,
  plural: locativePlural,
};

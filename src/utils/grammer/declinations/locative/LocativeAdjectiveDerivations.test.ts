// LocativeAdjectiveDerivations.test.js

import { describe, test, expect } from "vitest";
import Noun from "../Noun";
import { CASE_TYPE, Gender } from "../../WordTypes";
import Adjective from "../Adjective";

const CASE = CASE_TYPE.LOCATIVE;
// Example nouns for gender detection
const chlap = Noun.fromRaw( { sk: "chlap", gender: Gender.Masculine, animate: true, en:"" });
const zena  = Noun.fromRaw( { sk: "žena", gender: Gender.Femenine, animate: false, en:"" });
const mesto = Noun.fromRaw( { sk: "mesto", gender: Gender.Neutral, animate: false, en:"" });

// Plural gender categories
const chlapi = Noun.fromRaw( { sk: "chlapi", gender: Gender.Masculine, animate: true , en:""});
const zeny   = Noun.fromRaw( { sk: "ženy", gender: Gender.Femenine, animate: false, en:"" });
const mesta  = Noun.fromRaw( { sk: "mestá", gender:Gender.Femenine, animate: false, en:"" });

const adjective = Adjective.fromRaw( { sk: "dobrý" ,en:""});;

// ---------------------------
// Singular
// ---------------------------
describe("Locative Adjectives — Singular", () => {
  test("Masculine → dobrom", () => {
    expect(adjective.declinate(CASE,chlap).derived).toBe("dobrom");
  });

  test("Feminine → dobrej", () => {
    expect(adjective.declinate(CASE, zena).derived).toBe("dobrej");
  });

  test("Neuter → dobrom", () => {
    expect(adjective.declinate(CASE, mesto).derived).toBe("dobrom");
  });
});

// ---------------------------
// Plural
// ---------------------------
describe("Locative Adjectives — Plural", () => {
  test("Masculine plural → dobrých", () => {
    expect(adjective.declinate(CASE, chlapi,true).derived).toBe("dobrých");
  });

  test("Feminine plural → dobrých", () => {
    expect(adjective.declinate(CASE, zeny,true).derived).toBe("dobrých");
  });

  test("Neuter plural → dobrých", () => {
    expect(adjective.declinate(CASE, mesta, true).derived).toBe("dobrých");
  });
});

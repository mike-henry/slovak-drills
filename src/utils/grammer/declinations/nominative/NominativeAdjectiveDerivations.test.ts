// AdjectiveDerivations.test.js

import { describe, test, expect } from "vitest";
import { CASE_TYPE, Gender } from "../../WordTypes";
import Noun from "../Noun";
import Adjective from "../Adjective";

const CASE = CASE_TYPE.NOMINATIVE
// ---------------------------
// BASIC ADJECTIVE TESTS
// ---------------------------
describe("Nominative Adjectives — Singular", () => {
  const chlap = Noun.fromRaw({ en: "", sk: "chlap", gender: Gender.Masculine, animate: true });
  const stroj = Noun.fromRaw({ en: "", sk: "stroj", gender: Gender.Masculine, animate: false });
  const zena = Noun.fromRaw({ en: "", sk: "žena", gender: Gender.Femenine, animate: false });
  const mesto = Noun.fromRaw({ en: "", sk: "mesto", gender: Gender.Neutral, animate: false });

  const adjective = Adjective.fromRaw({ en: "", sk: "dobrý" });

  test("Masculine animate singular → -ý", () => {
    expect(adjective.declinate(CASE, chlap).derived).toBe("dobrý");
  });

  test("Masculine inanimate singular → -ý", () => {
    expect(adjective.declinate(CASE,stroj).derived).toBe("dobrý");
  });

  test("Feminine singular → -á", () => {
    expect(adjective.declinate(CASE,zena).derived).toBe("dobrá");
  });

  test("Neuter singular → -é", () => {
    expect(adjective.declinate(CASE,mesto).derived).toBe("dobré");
  });
});

// ---------------------------
// BASIC ADJECTIVE TESTS — Plural
// ---------------------------
describe("Nominative Adjectives — Plural", () => {
  const chlapi = Noun.fromRaw({ en: "", sk: "chlapi", gender: Gender.Masculine, animate: true });
  const stroje = Noun.fromRaw({ en: "", sk: "stroje", gender: Gender.Masculine, animate: false });
  const zeny = Noun.fromRaw({ en: "", sk: "ženy", gender: Gender.Femenine, animate: false });
  const mesta = Noun.fromRaw({ en: "", sk: "mestá", gender: Gender.Neutral, animate: false });

  const adjective = Adjective.fromRaw({ en: "", sk: "dobrý" });

  test("Masculine animate plural → -í", () => {
    expect(adjective.declinate(CASE, chlapi,true).derived).toBe("dobrí");
  });

  test("Masculine inanimate plural → -é", () => {
    expect(adjective.declinate(CASE, stroje,true).derived).toBe("dobré");
  });

  test("Feminine plural → -é", () => {
    expect(adjective.declinate(CASE, zeny,true).derived).toBe("dobré");
  });

  test("Neuter plural → -é", () => {
    expect(adjective.declinate(CASE, mesta,true).derived).toBe("dobré");
  });
});

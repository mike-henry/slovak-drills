// AdjectiveDerivations.test.js

import { describe, test, expect } from "vitest";
import { NominativeAdjectiveDeriver  } from "./NominativeAdjectiveDerivations";
import { Adjective, Gender, type Noun } from "../../grammer/WordTypes";

// ---------------------------
// BASIC ADJECTIVE TESTS
// ---------------------------
describe("Nominative Adjectives — Singular", () => {
  const chlap:Noun = { en: "" ,sk: "chlap", gender: Gender.Masculine, animate: true };
  const stroj:Noun  = { en: "" ,sk: "stroj", gender: Gender.Masculine, animate: false };
  const zena:Noun   = { en: "" ,sk: "žena", gender: Gender.Femenine, animate: false };
  const mesto:Noun  = { en: "" ,sk: "mesto", gender: Gender.Neutral, animate: false };

  const adj:Adjective =  { en: "" ,sk: "dobrý" };

  test("Masculine animate singular → -ý", () => {
    expect(NominativeAdjectiveDeriver.singular(adj, chlap).derived).toBe("dobrý");
  });

  test("Masculine inanimate singular → -ý", () => {
    expect(NominativeAdjectiveDeriver.singular(adj, stroj).derived).toBe("dobrý");
  });

  test("Feminine singular → -á", () => {
    expect(NominativeAdjectiveDeriver .singular(adj, zena).derived).toBe("dobrá");
  });

  test("Neuter singular → -é", () => {
    expect(NominativeAdjectiveDeriver.singular(adj, mesto).derived).toBe("dobré");
  });
});

// ---------------------------
// BASIC ADJECTIVE TESTS — Plural
// ---------------------------
describe("Nominative Adjectives — Plural", () => {
  const chlapi:Noun  = { en: "" ,sk: "chlapi", gender: Gender.Masculine, animate: true };
  const stroje:Noun  = { en: "" ,sk: "stroje", gender: Gender.Masculine, animate: false };
  const zeny :Noun   = { en: "" ,sk: "ženy", gender: Gender.Femenine, animate: false };
  const mesta :Noun  = { en: "" ,sk: "mestá", gender: Gender.Neutral, animate: false };

  const adj:Adjective = { en:"",sk :"dobrý" };

  test("Masculine animate plural → -í", () => {
    expect(NominativeAdjectiveDeriver.plural(adj, chlapi).derived).toBe("dobrí");
  });

  test("Masculine inanimate plural → -é", () => {
    expect(NominativeAdjectiveDeriver.plural(adj, stroje).derived).toBe("dobré");
  });

  test("Feminine plural → -é", () => {
    expect(NominativeAdjectiveDeriver.plural(adj, zeny).derived).toBe("dobré");
  });

  test("Neuter plural → -é", () => {
    expect(NominativeAdjectiveDeriver.plural(adj, mesta).derived).toBe("dobré");
  });
});

// AccusativeAdjectiveDerivations.test.js

import { describe, test, expect } from "vitest";
import { AccusativeAdjectiveDeriver } from "./AccusativeAdjectiveDerivations";
import { Adjective, Gender, type Noun } from "@/components/grammer/WordTypes";

// Sample nouns for gender + animate tests
const chlap:Noun  = {en:"", sk: "chlap", gender: Gender.Masculine, animate: true };
const stroj :Noun = { en:"", sk: "stroj",gender: Gender.Masculine, animate: false };
const zena  :Noun = { en:"", sk: "žena", gender: Gender.Femenine, animate: false };
const mesto :Noun = { en:"", sk: "mesto", gender: Gender.Neutral, animate: false };

const chlapi :Noun = { en:"", sk: "chlapi",gender: Gender.Masculine, animate: true };
const stroje :Noun = { en:"", sk: "stroje",gender: Gender.Masculine, animate: false };
const zeny   :Noun = { en:"", sk: "ženy",gender: Gender.Femenine, animate: false };
const mesta  :Noun = { en:"", sk: "mestá",gender: Gender.Neutral, animate: false };

const adj:Adjective = { en:"", sk:"dobrý" };

// ---------------------------
// Singular
// ---------------------------
describe("Accusative Adjectives — Singular", () => {
  test("Masculine animate → dobrého", () => {
    expect(AccusativeAdjectiveDeriver.singular(adj, chlap).derived).toBe("dobrého");
  });

  test("Masculine inanimate → dobrý", () => {
    expect(AccusativeAdjectiveDeriver.singular(adj, stroj).derived).toBe("dobrý");
  });

  test("Feminine → dobrú", () => {
    expect(AccusativeAdjectiveDeriver.singular(adj, zena).derived).toBe("dobrú");
  });

  test("Neuter → dobré", () => {
    expect(AccusativeAdjectiveDeriver.singular(adj, mesto).derived).toBe("dobré");
    
  });
});

// ---------------------------
// Plural
// ---------------------------
describe("Accusative Adjectives — Plural", () => {
  test("Masculine animate → dobrých", () => {
    expect(AccusativeAdjectiveDeriver.plural(adj, chlapi).derived).toBe("dobrých");
  });

  test("Masculine inanimate → dobré", () => {
    expect(AccusativeAdjectiveDeriver.plural(adj, stroje).derived).toBe("dobré");
  });

  test("Feminine → dobré", () => {
    expect(AccusativeAdjectiveDeriver.plural(adj, zeny).derived).toBe("dobré");
  });

  test("Neuter → dobré", () => {
    expect(AccusativeAdjectiveDeriver.plural(adj, mesta).derived).toBe("dobré");
  });
});

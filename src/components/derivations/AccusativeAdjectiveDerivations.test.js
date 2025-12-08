// AccusativeAdjectiveDerivations.test.js

import { describe, test, expect } from "vitest";
import { accusativeAdjectiveDeriver } from "./AccusativeAdjectiveDerivations.js";

// Sample nouns for gender + animate tests
const chlap = { sk: "chlap", gender: "M", animate: true };
const stroj = { sk: "stroj", gender: "M", animate: false };
const zena  = { sk: "žena", gender: "F", animate: false };
const mesto = { sk: "mesto", gender: "N", animate: false };

const chlapi = { sk: "chlapi", gender: "M", animate: true };
const stroje = { sk: "stroje", gender: "M", animate: false };
const zeny   = { sk: "ženy", gender: "F", animate: false };
const mesta  = { sk: "mestá", gender: "N", animate: false };

const adj =  { sk:"dobrý" };

// ---------------------------
// Singular
// ---------------------------
describe("Accusative Adjectives — Singular", () => {
  test("Masculine animate → dobrého", () => {
    expect(accusativeAdjectiveDeriver.singular(adj, chlap).derived).toBe("dobrého");
  });

  test("Masculine inanimate → dobrý", () => {
    expect(accusativeAdjectiveDeriver.singular(adj, stroj).derived).toBe("dobrý");
  });

  test("Feminine → dobrú", () => {
    expect(accusativeAdjectiveDeriver.singular(adj, zena).derived).toBe("dobrú");
  });

  test("Neuter → dobré", () => {
    expect(accusativeAdjectiveDeriver.singular(adj, mesto).derived).toBe("dobré");
    
  });
});

// ---------------------------
// Plural
// ---------------------------
describe("Accusative Adjectives — Plural", () => {
  test("Masculine animate → dobrých", () => {
    expect(accusativeAdjectiveDeriver.plural(adj, chlapi).derived).toBe("dobrých");
  });

  test("Masculine inanimate → dobré", () => {
    expect(accusativeAdjectiveDeriver.plural(adj, stroje).derived).toBe("dobré");
  });

  test("Feminine → dobré", () => {
    expect(accusativeAdjectiveDeriver.plural(adj, zeny).derived).toBe("dobré");
  });

  test("Neuter → dobré", () => {
    expect(accusativeAdjectiveDeriver.plural(adj, mesta).derived).toBe("dobré");
  });
});

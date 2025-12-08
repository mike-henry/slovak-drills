// LocativeAdjectiveDerivations.test.js

import { describe, test, expect } from "vitest";
import { locativeAdjectiveDeriver } from "./LocativeAdjectiveDerivations.js";

// Example nouns for gender detection
const chlap = { sk: "chlap", gender: "M", animate: true };
const zena  = { sk: "žena", gender: "F", animate: false };
const mesto = { sk: "mesto", gender: "N", animate: false };

// Plural gender categories
const chlapi = { sk: "chlapi", gender: "M", animate: true };
const zeny   = { sk: "ženy", gender: "F", animate: false };
const mesta  = { sk: "mestá", gender: "N", animate: false };

const adj =  { sk: "dobrý" };

// ---------------------------
// Singular
// ---------------------------
describe("Locative Adjectives — Singular", () => {
  test("Masculine → dobrom", () => {
    expect(locativeAdjectiveDeriver.singular(adj, chlap).derived).toBe("dobrom");
  });

  test("Feminine → dobrej", () => {
    expect(locativeAdjectiveDeriver.singular(adj, zena).derived).toBe("dobrej");
  });

  test("Neuter → dobrom", () => {
    expect(locativeAdjectiveDeriver.singular(adj, mesto).derived).toBe("dobrom");
  });
});

// ---------------------------
// Plural
// ---------------------------
describe("Locative Adjectives — Plural", () => {
  test("Masculine plural → dobrých", () => {
    expect(locativeAdjectiveDeriver.plural(adj, chlapi).derived).toBe("dobrých");
  });

  test("Feminine plural → dobrých", () => {
    expect(locativeAdjectiveDeriver.plural(adj, zeny).derived).toBe("dobrých");
  });

  test("Neuter plural → dobrých", () => {
    expect(locativeAdjectiveDeriver.plural(adj, mesta).derived).toBe("dobrých");
  });
});

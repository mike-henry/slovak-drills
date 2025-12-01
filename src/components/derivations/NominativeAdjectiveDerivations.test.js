// AdjectiveDerivations.test.js

import { describe, test, expect } from "vitest";
import { nominativeAdjectiveDeriver } from "./NominativeAdjectiveDerivations.js";

// ---------------------------
// BASIC ADJECTIVE TESTS
// ---------------------------
describe("Nominative Adjectives — Singular", () => {
  const chlap = { sk: "chlap", gender: "M", animate: true };
  const stroj = { sk: "stroj", gender: "M", animate: false };
  const zena  = { sk: "žena", gender: "F", animate: false };
  const mesto = { sk: "mesto", gender: "N", animate: false };

  const adj = "dobrý";

  test("Masculine animate singular → -ý", () => {
    expect(nominativeAdjectiveDeriver.singular(adj, chlap).derived).toBe("dobrý");
  });

  test("Masculine inanimate singular → -ý", () => {
    expect(nominativeAdjectiveDeriver.singular(adj, stroj).derived).toBe("dobrý");
  });

  test("Feminine singular → -á", () => {
    expect(nominativeAdjectiveDeriver .singular(adj, zena).derived).toBe("dobrá");
  });

  test("Neuter singular → -é", () => {
    expect(nominativeAdjectiveDeriver.singular(adj, mesto).derived).toBe("dobré");
  });
});

// ---------------------------
// BASIC ADJECTIVE TESTS — Plural
// ---------------------------
describe("Nominative Adjectives — Plural", () => {
  const chlapi = { sk: "chlapi", gender: "M", animate: true };
  const stroje = { sk: "stroje", gender: "M", animate: false };
  const zeny   = { sk: "ženy", gender: "F", animate: false };
  const mesta  = { sk: "mestá", gender: "N", animate: false };

  const adj = "dobrý";

  test("Masculine animate plural → -í", () => {
    expect(nominativeAdjectiveDeriver.plural(adj, chlapi).derived).toBe("dobrí");
  });

  test("Masculine inanimate plural → -é", () => {
    expect(nominativeAdjectiveDeriver.plural(adj, stroje).derived).toBe("dobré");
  });

  test("Feminine plural → -é", () => {
    expect(nominativeAdjectiveDeriver.plural(adj, zeny).derived).toBe("dobré");
  });

  test("Neuter plural → -é", () => {
    expect(nominativeAdjectiveDeriver.plural(adj, mesta).derived).toBe("dobré");
  });
});

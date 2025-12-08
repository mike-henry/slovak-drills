// InstrumentalAdjectiveDerivations.test.js

import { describe, test, expect } from "vitest";
import { instrumentalAdjectiveDeriver } from "./InstrumentalAdjectiveDerivations.js";

// Sample nouns for gender evaluation
const chlap = { sk: "chlap", gender: "M", animate: true };
const zena  = { sk: "žena", gender: "F", animate: false };
const mesto = { sk: "mesto", gender: "N", animate: false };

// Plural forms (gender only matters)
const chlapi = { sk: "chlapi", gender: "M", animate: true };
const zeny   = { sk: "ženy", gender: "F", animate: false };
const mesta  = { sk: "mestá", gender: "N", animate: false };

const adj =  { sk: "dobrý" };

// ---------------------------
// Singular
// ---------------------------
describe("Instrumental Adjectives — Singular", () => {
  test("Masculine → dobrým", () => {
    expect(instrumentalAdjectiveDeriver.singular(adj, chlap)).toBe("dobrým");
  });

  test("Feminine → dobrou", () => {
    expect(instrumentalAdjectiveDeriver.singular(adj, zena)).toBe("dobrou");
  });

  test("Neuter → dobrým", () => {
    expect(instrumentalAdjectiveDeriver.singular(adj, mesto)).toBe("dobrým");
  });
});

// ---------------------------
// Plural
// ---------------------------
describe("Instrumental Adjectives — Plural", () => {
  test("Masculine plural → dobrými", () => {
    expect(instrumentalAdjectiveDeriver.plural(adj, chlapi)).toBe("dobrými");
  });

  test("Feminine plural → dobrými", () => {
    expect(instrumentalAdjectiveDeriver.plural(adj, zeny)).toBe("dobrými");
  });

  test("Neuter plural → dobrými", () => {
    expect(instrumentalAdjectiveDeriver.plural(adj, mesta)).toBe("dobrými");
  });
});

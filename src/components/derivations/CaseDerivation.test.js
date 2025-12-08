import { describe, test, expect, vi } from "vitest";

import {
  nounDeriver,
  deriveNounCase,
  deriveAdjectiveCase,
  deriveAdjectiveNounCase,
  CASE
} from "./CaseDerivation.js";

import { STANDARD_SECTIONS } from "../../documents/DocumentLoader.js";

// ---------------------------------------------------------------------
// MODULE Mocks — paths **must match exactly** the import statements
// inside CaseDerivations.js
// ---------------------------------------------------------------------

vi.mock("./LocativeNounDerivations.js", () => ({
  locativeNounDeriver: {
    singular: vi.fn(() => ({
      derived: "noun-loc-sing",
      explanation: "loc noun explanation",
      documentation: "loc docs"
    })),
    plural: vi.fn(() => ({
      derived: "noun-loc-pl",
      explanation: "loc noun explanation plural",
      documentation: "loc docs plural"
    }))
  },
}));

vi.mock("./AccusativeNounDerivations.js", () => ({
  accusativeNounDeriver: {
    singular: vi.fn(() => ({
      derived: "noun-acc-sing",
      explanation: "acc noun explanation"
    })),
    plural: vi.fn(() => ({
      derived: "noun-acc-pl",
      explanation: "acc noun explanation plural"
    }))
  },
}));

vi.mock("./InstrumentalNounDerivations.js", () => ({
  instrumentalNounDeriver: {
    singular: vi.fn(() => ({
      derived: "noun-inst-sing",
      explanation: "inst noun explanation"
    }))
  },
}));

vi.mock("./NominativeNounDerivations.js", () => ({
  nominativeNounDeriver: {
    singular: vi.fn(() => ({
      derived: "noun-nom-sing",
      explanation: "nom noun explanation"
    }))
  },
}));

vi.mock("./InstrumentalAdjectiveDerivations.js", () => ({
  instrumentalAdjectiveDeriver: {
    singular: vi.fn(() => ({
      derived: "adj-inst-sing",
      explanation: "inst adjective explanation"
    }))
  },
}));

vi.mock("./NominativeAdjectiveDerivations.js", () => ({
  nominativeAdjectiveDeriver: {
    singular: vi.fn(() => ({
      derived: "adj-nom-sing",
      explanation: "nom adjective explanation"
    }))
  },
}));

vi.mock("./AccusativeAdjectiveDerivations.js", () => ({
  accusativeAdjectiveDeriver: {
    singular: vi.fn(() => ({
      derived: "adj-acc-sing",
      explanation: "acc adjective explanation"
    }))
  },
}));

vi.mock("./LocativeAdjectiveDerivations.js", () => ({
  locativeAdjectiveDeriver: {
    singular: vi.fn(() => ({
      derived: "adj-loc-sing",
      explanation: "loc adjective explanation"
    }))
  },
}));

// ---------------------------------------------------------------------
// TESTS
// ---------------------------------------------------------------------

describe("nounDeriver", () => {
  test("returns the correct deriver", () => {
    expect(nounDeriver(CASE.LOCATIVE)).toHaveProperty("singular");
    expect(nounDeriver(CASE.ACCUSATIVE)).toHaveProperty("singular");
  });

  test("throws on invalid case", () => {
    expect(() => nounDeriver("wrong")).toThrow();
  });
});

describe("deriveNounCase()", () => {
  test("derives noun in singular", () => {
    const result = deriveNounCase({ sk: "test" }, CASE.NOMINATIVE);

    expect(result.derived).toBe("noun-nom-sing");
    expect(result.explanation).toMatch(/nominative/);
  });

  test("derives noun in plural", () => {
    const result = deriveNounCase({ sk: "test" }, CASE.LOCATIVE, true);
    expect(result.documentation).toBe("loc docs plural");
    expect(result.derived).toBe("noun-loc-pl");
    expect(result.explanation).toMatch(/locative/);
  });
});

describe("deriveAdjectiveCase()", () => {
  test("derives adjective", () => {
    const result = deriveAdjectiveCase("big", { sk: "tree" }, CASE.NOMINATIVE);

    expect(result.derived).toBe("adj-nom-sing");
    expect(result.explanation).toMatch(/nominative/);
  });
});

describe("deriveAdjectiveNounCase()", () => {
  test("combines adjective + noun", () => {
    const result = deriveAdjectiveNounCase(
      "big",
      { sk: "tree" },
      CASE.ACCUSATIVE
    );

    expect(result.derived).toBe("adj-acc-sing noun-acc-sing");
    expect(result.explanation).toMatch(/accusative/);
  });

  test("uses documentation if present", () => {
    const result = deriveAdjectiveNounCase("a", { sk: "b" }, CASE.LOCATIVE);
    
    expect(result.derived).toBe("adj-loc-sing noun-loc-sing");
  });
});

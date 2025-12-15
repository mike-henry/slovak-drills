import { describe, test, expect } from "vitest";
import { instrumentalDemonstrativeDeriver } from "./InstrumentalDemonstrativeDerivations.js";

describe("Instrumental Demonstrative Deriver", () => {
  test("singular forms", () => {
    expect(instrumentalDemonstrativeDeriver.singular({ gender: "M" })).toBe("tým");
    expect(instrumentalDemonstrativeDeriver.singular({ gender: "F" })).toBe("tou");
    expect(instrumentalDemonstrativeDeriver.singular({ gender: "N" })).toBe("tým");
  });

  test("plural forms", () => {
    expect(instrumentalDemonstrativeDeriver.plural({ gender: "M" })).toBe("tými");
    expect(instrumentalDemonstrativeDeriver.plural({ gender: "F" })).toBe("tými");
    expect(instrumentalDemonstrativeDeriver.plural({ gender: "N" })).toBe("tými");
  });
});

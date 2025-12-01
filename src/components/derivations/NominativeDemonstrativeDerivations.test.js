import { describe, test, expect } from "vitest";
import { nominativeDemonstrativeDeriver } from "./NominativeDemonstrativeDerivations.js";


describe("Nominative Demonstrative Deriver", () => {
  test("singular forms", () => {
    expect(nominativeDemonstrativeDeriver.singular({ gender: "M" }).derived).toBe("ten");
    expect(nominativeDemonstrativeDeriver.singular( {gender: "F" }).derived).toBe("tá");
    expect(nominativeDemonstrativeDeriver.singular({ gender: "N" }).derived).toBe("to");
  });

  test("plural forms", () => {
    expect(nominativeDemonstrativeDeriver.plural({ gender: "M" }).derived).toBe("tí");
    expect(nominativeDemonstrativeDeriver.plural({ gender: "F" }).derived).toBe("tie");
    expect(nominativeDemonstrativeDeriver.plural({ gender: "N" }).derived).toBe("tie");
  });
});

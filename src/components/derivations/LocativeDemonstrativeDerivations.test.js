import { describe, test, expect } from "vitest";
import { locativeDemonstrativeDeriver } from "./LocativeDemonstrativeDerivations.js";

describe("Locative Demonstrative Deriver", () => {
  test("singular forms", () => {
    expect(locativeDemonstrativeDeriver.singular({ gender: "M" }).derived).toBe("tom");
    expect(locativeDemonstrativeDeriver.singular({ gender: "F" }).derived).toBe("tej");
    expect(locativeDemonstrativeDeriver.singular({ gender: "N" }).derived).toBe("tom");
  });

  test("plural forms", () => {
    expect(locativeDemonstrativeDeriver.plural({ gender: "M" }).derived).toBe("tých");
    expect(locativeDemonstrativeDeriver.plural({ gender: "F" }).derived).toBe("tých");
    expect(locativeDemonstrativeDeriver.plural({ gender: "N" }).derived).toBe("tých");
  });
});
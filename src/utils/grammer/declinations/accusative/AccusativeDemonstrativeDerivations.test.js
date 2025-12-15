import { describe, test, expect } from "vitest";
import { accusativeDemonstrativeDeriver } from "./AccusativeDemonstrativeDerivations.js";

describe("Accusative Demonstrative Deriver", () => {
  test("singular forms", () => {
    expect(accusativeDemonstrativeDeriver.singular({ gender: "M", animate: true })).toBe("toho");
    expect(accusativeDemonstrativeDeriver.singular({ gender: "M", animate: false })).toBe("ten");
    expect(accusativeDemonstrativeDeriver.singular({ gender: "F" })).toBe("tú");
    expect(accusativeDemonstrativeDeriver.singular({ gender: "N" })).toBe("to");
  });

  test("plural forms", () => {
    expect(accusativeDemonstrativeDeriver.plural({ gender: "M", animate: true })).toBe("tých");
    expect(accusativeDemonstrativeDeriver.plural({ gender: "M", animate: false })).toBe("tie");
    expect(accusativeDemonstrativeDeriver.plural({ gender: "F" })).toBe("tie");
    expect(accusativeDemonstrativeDeriver.plural({ gender: "N" })).toBe("tie");
  });
});
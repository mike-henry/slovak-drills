import { describe, test, expect } from "vitest";
import { LocativeDemonstrativeDeriver } from "./LocativeDemonstrativeDerivations.ts";
import { Gender, type Noun } from "../../grammer/WordTypes.js";

describe("Locative Demonstrative Deriver", () => {
  const masculine: Noun = { en: "test", sk: "test", gender: Gender.Masculine };
  const femenine: Noun = { en: "test", sk: "test", gender: Gender.Femenine };
  const neutral: Noun = { en: "test", sk: "test", gender: Gender.Neutral };
  test("singular forms", () => {
    expect(LocativeDemonstrativeDeriver.singular(masculine).derived).toBe("tom");
    expect(LocativeDemonstrativeDeriver.singular(femenine).derived).toBe("tej");
    expect(LocativeDemonstrativeDeriver.singular(neutral).derived).toBe("tom");
  });

  test("plural forms", () => {
    expect(LocativeDemonstrativeDeriver.plural(masculine).derived).toBe("tých");
    expect(LocativeDemonstrativeDeriver.plural(femenine).derived).toBe("tých");
    expect(LocativeDemonstrativeDeriver.plural(neutral).derived).toBe("tých");
  });
});

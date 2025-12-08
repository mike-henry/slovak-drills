import { describe, test, expect } from "vitest";
import { locativeNounDeriver } from "./LocativeNounDerivations.js";

describe("Locative Noun Derivations (explicit noun objects)", () => {
  // -------------------------
  // MASCULINE
  // -------------------------

  const chlap = { sk: "chlap", gender: "M", animate: true };
  const terminal = { sk: "terminál", gender: "M" };
  const hrad = { sk: "hrad", gender: "M", animate: false };
  const stroj = { sk: "stroj", gender: "M", animate: false };

  // -------------------------
  // FEMININE
  // -------------------------

  const stanica = { sk: "stanica", gender: "F", animate: false };
  const kost = { sk: "kosť", gender: "F", animate: false };

  // -------------------------
  // NEUTER
  // -------------------------

  const mesto = { sk: "mesto", gender: "N", animate: false };

  // -------------------------
  // SINGULAR TESTS
  // -------------------------

  test("masculine animate → -ovi (chlap → chlapovi)", () => {
    const result = locativeNounDeriver.singular(chlap);
    expect(result.derived).toBe("chlapovi");
  });

  test("masculine inanimate hrad-class → -e (hrad → hrade)", () => {
    const result = locativeNounDeriver.singular(hrad);
    expect(result.derived).toBe("hrade");
  });

  test("masculine inanimate stroj-class → -i (stroj → stroji)", () => {
    const result = locativeNounDeriver.singular(stroj);
    expect(result.derived).toBe("stroji");
  });

  test("feminine -a with soft stem (stanica → stanici)", () => {
    const result = locativeNounDeriver.singular(stanica);
    expect(result.derived).toBe("stanici");
  });

  test("feminine consonant-ending (kosť → kosti)", () => {
    const result = locativeNounDeriver.singular(kost);
    expect(result.derived).toBe("kosti");
  });

  test("neuter -o → -e (mesto → meste)", () => {
    const result = locativeNounDeriver.singular(mesto);
    expect(result.derived).toBe("meste");
  });

  // -------------------------
  // PLURAL TESTS
  // -------------------------

  test("masculine plural (stroj → strojoch)", () => {
    const result = locativeNounDeriver.plural(stroj);
    expect(result.derived).toBe("strojoch");
  });

  test("masculine inanimate terminal → -i (terminál → terminálych)", () => {
    const result = locativeNounDeriver.plural(terminal);
    expect(result.derived).toBe("terminálych");
  });

  test("neuter plural (mesto → mestách)", () => {
    const result = locativeNounDeriver.plural(mesto);
    expect(result.derived).toBe("mestách");
  });

  test("feminine plural (žena → ženách)", () => {
    const result = locativeNounDeriver.plural({
      sk: "žena",
      gender: "F",
      animate: false,
    });
    expect(result.derived).toBe("ženách");
  });
});

import { describe, test, expect } from "vitest";
import { locativeNounDeriver } from "./LocativeNounDerivations.js";

describe("Locative Noun Derivations (explicit noun objects)", () => {

  // -------------------------
  // MASCULINE
  // -------------------------

  const CHLAP = {
    sk: "chlap",
    gender: "M",
    animate: true,
  };

  const HRAD = {
    sk: "hrad",
    gender: "M",
    animate: false,
  };

  const STROJ = {
    sk: "stroj",
    gender: "M",
    animate: false,
  };

  // -------------------------
  // FEMININE
  // -------------------------

  const STANICA = {
    sk: "stanica",
    gender: "F",
    animate: false,
  };

  const KOST = {
    sk: "kosť",
    gender: "F",
    animate: false,
  };

  // -------------------------
  // NEUTER
  // -------------------------

  const MESTO = {
    sk: "mesto",
    gender: "N",
    animate: false,
  };

  // -------------------------
  // SINGULAR TESTS
  // -------------------------

  test("masculine animate → -ovi (chlap → chlapovi)", () => {
    const result = locativeNounDeriver.singular(CHLAP);
    expect(result.derived).toBe("chlapovi");
  });

  test("masculine inanimate hrad-class → -e (hrad → hrade)", () => {
    const result = locativeNounDeriver.singular(HRAD);
    expect(result.derived).toBe("hrade");
  });

  test("masculine inanimate stroj-class → -i (stroj → stroji)", () => {
    const result = locativeNounDeriver.singular(STROJ);
    expect(result.derived).toBe("stroji");
  });

  test("feminine -a with soft stem (stanica → stanici)", () => {
    const result = locativeNounDeriver.singular(STANICA);
    expect(result.derived).toBe("stanici");
  });

  test("feminine consonant-ending (kosť → kosti)", () => {
    const result = locativeNounDeriver.singular(KOST);
    expect(result.derived).toBe("kosti");
  });

  test("neuter -o → -e (mesto → meste)", () => {
    const result = locativeNounDeriver.singular(MESTO);
    expect(result.derived).toBe("meste");
  });

  // -------------------------
  // PLURAL TESTS
  // -------------------------

  test("masculine plural (stroj → strojoch)", () => {
    const result = locativeNounDeriver.plural(STROJ);
    expect(result.derived).toBe("strojoch");
  });

  test("neuter plural (mesto → mestách)", () => {
    const result = locativeNounDeriver.plural(MESTO);
    expect(result.derived).toBe("mestách");
  });

  test("feminine plural (žena → ženách)", () => {
    const result = locativeNounDeriver.plural({
      sk: "žena",
      gender: "F",
      animate: false
    });
    expect(result.derived).toBe("ženách");
  });

});

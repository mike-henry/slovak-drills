import { describe, test, expect } from "vitest";
import { locativeNounDeriver } from "./LocativeNounDerivations.js";

const L = locativeNounDeriver;

describe("Locative — Singular", () => {

  // --------------------
  // MASCULINE ANIMATE
  // --------------------
  test("chlap → chlapovi", () => {
    expect(L.singular("chlap", "M", true).derived).toBe("chlapovi");
  });

  test("syn → synovi", () => {
    expect(L.singular("syn", "M", true).derived).toBe("synovi");
  });

  test("vojak → vojakovi", () => {
    expect(L.singular("vojak", "M", true).derived).toBe("vojakovi");
  });


  // --------------------
  // MASCULINE INANIMATE
  // --------------------
  test("stroj → stroji", () => {
    expect(L.singular("stroj", "M", false).derived).toBe("stroji");
  });

  test("papier → papieri", () => {
    expect(L.singular("papier", "M", false).derived).toBe("papieri");
  });


  // --------------------
  // FEMININE (-a, hard stem)
  // --------------------
  test("žena → žene", () => {
    expect(L.singular("žena", "F").derived).toBe("žene");
  });

  test("kniha → knihe", () => {
    expect(L.singular("kniha", "F").derived).toBe("knihe");
  });


  // --------------------
  // FEMININE (-a, soft stem)
  // --------------------
  test("stanica → stanici", () => {
    expect(L.singular("stanica", "F").derived).toBe("stanici");
  });

  test("ulica → ulici", () => {
    expect(L.singular("ulica", "F").derived).toBe("ulici");
  });


  // --------------------
  // FEMININE (-ia → -ii)
  // --------------------
  test("chémia → chémii", () => {
    expect(L.singular("chémia", "F").derived).toBe("chémii");
  });


  // --------------------
  // FEMININE consonant-ending (kosť-type)
  // --------------------
  test("kosť → kosti", () => {
    expect(L.singular("kosť", "F").derived).toBe("kosti");
  });


  // --------------------
  // NEUTER -o
  // --------------------
  test("mesto → meste", () => {
    expect(L.singular("mesto", "N").derived).toBe("meste");
  });


  // --------------------
  // NEUTER -e
  // --------------------
  test("srdce → srdci", () => {
    expect(L.singular("srdce", "N").derived).toBe("srdci");
  });


  // --------------------
  // NEUTER -um
  // --------------------
  test("centrum → centre", () => {
    expect(L.singular("centrum", "N").derived).toBe("centre");
  });


  // --------------------
  // NEUTER -ie
  // --------------------
  test("vysvedčenie → vysvedčení", () => {
    expect(L.singular("vysvedčenie", "N").derived).toBe("vysvedčení");
  });

});


describe("Locative — Plural", () => {

  // All genders → -och

  // FEMININE
  test("ženy → ženách", () => {
    expect(L.plural("žena", "F").derived).toBe("ženách");
  });

  test("stanice → staniciach", () => {
    expect(L.plural("stanica", "F").derived).toBe("staniciach");
  });

  test("chémie → chémiách", () => {
    expect(L.plural("chémia", "F").derived).toBe("chémiách");
  });

  test("kosti → kostiach", () => {
    expect(L.plural("kosť", "F").derived).toBe("kostiach");
  });


  // MASCULINE
  test("chlapi → chlapoch", () => {
    expect(L.plural("chlap", "M", true).derived).toBe("chlapoch");
  });

  test("stroje → strojoch", () => {
    expect(L.plural("stroj", "M", false).derived).toBe("strojoch");
  });


  // NEUTER
  test("mestá → mestách", () => {
    expect(L.plural("mesto", "N").derived).toBe("mestách");
  });

  test("srdcia → srdciach", () => {
    expect(L.plural("srdce", "N").derived).toBe("srdciach");
  });

  test("vysvedčenia → vysvedčeniach", () => {
    expect(L.plural("vysvedčenie", "N").derived).toBe("vysvedčeniach");
  });

});

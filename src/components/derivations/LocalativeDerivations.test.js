import { describe, test, expect } from "vitest";
import { locativeNounDeriver } from "./LocalativeDerivations.js";

const L = locativeNounDeriver;

describe("Locative — Singular", () => {

  // --------------------
  // MASCULINE ANIMATE
  // --------------------
  test("chlap → chlapovi", () => {
    expect(L.singular("chlap", "M", true)).toBe("chlapovi");
  });

  test("syn → synovi", () => {
    expect(L.singular("syn", "M", true)).toBe("synovi");
  });

  test("vojak → vojakovi", () => {
    expect(L.singular("vojak", "M", true)).toBe("vojakovi");
  });


  // --------------------
  // MASCULINE INANIMATE
  // --------------------
  test("stroj → stroji", () => {
    expect(L.singular("stroj", "M", false)).toBe("stroji");
  });

  test("papier → papieri", () => {
    expect(L.singular("papier", "M", false)).toBe("papieri");
  });


  // --------------------
  // FEMININE (-a, hard stem)
  // --------------------
  test("žena → žene", () => {
    expect(L.singular("žena", "F")).toBe("žene");
  });

  test("kniha → knihe", () => {
    expect(L.singular("kniha", "F")).toBe("knihe");
  });


  // --------------------
  // FEMININE (-a, soft stem)
  // --------------------
  test("stanica → stanici", () => {
    expect(L.singular("stanica", "F")).toBe("stanici");
  });

  test("ulica → ulici", () => {
    expect(L.singular("ulica", "F")).toBe("ulici");
  });


  // --------------------
  // FEMININE (-ia → -ii)
  // --------------------
  test("chémia → chémii", () => {
    expect(L.singular("chémia", "F")).toBe("chémii");
  });


  // --------------------
  // FEMININE consonant-ending (kosť-type)
  // --------------------
  test("kosť → kosti", () => {
    expect(L.singular("kosť", "F")).toBe("kosti");
  });


  // --------------------
  // NEUTER -o
  // --------------------
  test("mesto → meste", () => {
    expect(L.singular("mesto", "N")).toBe("meste");
  });


  // --------------------
  // NEUTER -e
  // --------------------
  test("srdce → srdci", () => {
    expect(L.singular("srdce", "N")).toBe("srdci");
  });


  // --------------------
  // NEUTER -um
  // --------------------
  test("centrum → centre", () => {
    expect(L.singular("centrum", "N")).toBe("centre");
  });


  // --------------------
  // NEUTER -ie
  // --------------------
  test("vysvedčenie → vysvedčení", () => {
    expect(L.singular("vysvedčenie", "N")).toBe("vysvedčení");
  });

});


describe("Locative — Plural", () => {

  // All genders → -och

  // FEMININE
  test("ženy → ženách", () => {
    expect(L.plural("žena", "F")).toBe("ženách");
  });

  test("stanice → staniciach", () => {
    expect(L.plural("stanica", "F")).toBe("staniciach");
  });

  test("chémie → chémiách", () => {
    expect(L.plural("chémia", "F")).toBe("chémiách");
  });

  test("kosti → kostiach", () => {
    expect(L.plural("kosť", "F")).toBe("kostiach");
  });


  // MASCULINE
  test("chlapi → chlapoch", () => {
    expect(L.plural("chlap", "M", true)).toBe("chlapoch");
  });

  test("stroje → strojoch", () => {
    expect(L.plural("stroj", "M", false)).toBe("strojoch");
  });


  // NEUTER
  test("mestá → mestách", () => {
    expect(L.plural("mesto", "N")).toBe("mestách");
  });

  test("srdcia → srdciach", () => {
    expect(L.plural("srdce", "N")).toBe("srdciach");
  });

  test("vysvedčenia → vysvedčeniach", () => {
    expect(L.plural("vysvedčenie", "N")).toBe("vysvedčeniach");
  });

});

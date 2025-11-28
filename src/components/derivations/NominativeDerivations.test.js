import { describe, test, expect } from "vitest";
import { nominativeNounDeriver } from "./NominativeDerivations.js";

// ---------------------------
// BASIC MASCULINE TESTS
// ---------------------------
describe("Masculine nouns — singular and plural", () => {
  const chlap = { sk: "chlap", gender: "M", animate: true, en: "man" };
  const muz   = { sk: "muž", gender: "M", animate: true, en: "man" };
  const stroj = { sk: "stroj", gender: "M", animate: false, en: "machine" };
  const hrdina = { sk: "hrdina", gender: "M", animate: true, en: "hero" };
  const kolega = { sk: "kolega", gender: "M", animate: true, en: "colleague" };

  test("Masculine singular (NOM)", () => {
    expect(nominativeNounDeriver.singular(chlap)).toBe("chlap");
    expect(nominativeNounDeriver.singular(muz)).toBe("muž");
    expect(nominativeNounDeriver.singular(stroj)).toBe("stroj");
    expect(nominativeNounDeriver.singular(hrdina)).toBe("hrdina");
    expect(nominativeNounDeriver.singular(kolega)).toBe("kolega");
  });

  test("Masculine plural (NOM)", () => {
    expect(nominativeNounDeriver.plural(chlap)).toBe("chlapi");
    expect(nominativeNounDeriver.plural(muz)).toBe("muži");
    expect(nominativeNounDeriver.plural(stroj)).toBe("stroje");
    expect(nominativeNounDeriver.plural(hrdina)).toBe("hrdinovia");
    expect(nominativeNounDeriver.plural(kolega)).toBe("kolegovia");
  });
});

// ---------------------------
// BASIC FEMININE TESTS
// ---------------------------
describe("Feminine nouns — singular and plural", () => {
  const zena  = { sk: "žena", gender: "F", animate: false, en: "woman" };
  const kniha = { sk: "kniha", gender: "F", animate: false, en: "book" };
  const chemia  = { sk: "chémia", gender: "F", animate: false, en: "chemistry" };
  const energia = { sk: "energia", gender: "F", animate: false, en: "energy" };
  const kost = { sk: "kosť", gender: "F", animate: false, en: "bone" };
  const vec  = { sk: "vec", gender: "F", animate: false, en: "thing" };

  test("Feminine singular (NOM)", () => {
    expect(nominativeNounDeriver.singular(zena)).toBe("žena");
    expect(nominativeNounDeriver.singular(kniha)).toBe("kniha");
    expect(nominativeNounDeriver.singular(chemia)).toBe("chémia");
    expect(nominativeNounDeriver.singular(energia)).toBe("energia");
    expect(nominativeNounDeriver.singular(kost)).toBe("kosť");
    expect(nominativeNounDeriver.singular(vec)).toBe("vec");
  });

  test("Feminine plural (NOM)", () => {
    expect(nominativeNounDeriver.plural(zena)).toBe("ženy");
    expect(nominativeNounDeriver.plural(kniha)).toBe("knihy");
    expect(nominativeNounDeriver.plural(chemia)).toBe("chémie");
    expect(nominativeNounDeriver.plural(energia)).toBe("energie");
    expect(nominativeNounDeriver.plural(kost)).toBe("kosti");
    expect(nominativeNounDeriver.plural(vec)).toBe("veci");
  });
});

// ---------------------------
// BASIC NEUTER TESTS
// ---------------------------
describe("Neuter nouns — singular and plural", () => {
  const mesto = { sk: "mesto", gender: "N", animate: false, en: "city" };
  const auto  = { sk: "auto", gender: "N", animate: false, en: "car" };
  const srdce = { sk: "srdce", gender: "N", animate: false, en: "heart" };
  const more  = { sk: "more", gender: "N", animate: false, en: "sea" };
  const vysvedcenie = { sk: "vysvedčenie", gender: "N", animate: false, en: "report" };
  const minimum  = { sk: "minimum", gender: "N", animate: false, en: "minimum" };
  const studium  = { sk: "štúdium", gender: "N", animate: false, en: "study" };

  test("Neuter singular (NOM)", () => {
    expect(nominativeNounDeriver.singular(mesto)).toBe("mesto");
    expect(nominativeNounDeriver.singular(auto)).toBe("auto");
    expect(nominativeNounDeriver.singular(srdce)).toBe("srdce");
    expect(nominativeNounDeriver.singular(more)).toBe("more");
    expect(nominativeNounDeriver.singular(vysvedcenie)).toBe("vysvedčenie");
    expect(nominativeNounDeriver.singular(minimum)).toBe("minimum");
    expect(nominativeNounDeriver.singular(studium)).toBe("štúdium");
  });

  test("Neuter plural (NOM)", () => {
    expect(nominativeNounDeriver.plural(mesto)).toBe("mestá");
    expect(nominativeNounDeriver.plural(auto)).toBe("autá");
    expect(nominativeNounDeriver.plural(srdce)).toBe("srdcia");
    expect(nominativeNounDeriver.plural(more)).toBe("moria");
    expect(nominativeNounDeriver.plural(vysvedcenie)).toBe("vysvedčenia");
    expect(nominativeNounDeriver.plural(minimum)).toBe("minimá");
    expect(nominativeNounDeriver.plural(studium)).toBe("štúdiá");
  });
});

// ---------------------------
// EDGE CASES
// ---------------------------
describe("Edge cases — singular and plural", () => {
  const a = { sk: "a", gender: "F", animate: false, en: "letter a" };
  const o = { sk: "o", gender: "N", animate: false, en: "letter o" };
  const k = { sk: "k", gender: "M", animate: true, en: "letter k" };

  test("Single-letter singular (NOM)", () => {
    expect(nominativeNounDeriver.singular(a)).toBe("a");
    expect(nominativeNounDeriver.singular(o)).toBe("o");
    expect(nominativeNounDeriver.singular(k)).toBe("k");
  });

  test("Single-letter plural (NOM)", () => {
    expect(nominativeNounDeriver.plural(a)).toBe("y");
    expect(nominativeNounDeriver.plural(o)).toBe("á");
    expect(nominativeNounDeriver.plural(k)).toBe("ki");
  });
});

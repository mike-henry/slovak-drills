import { describe, test, expect } from "vitest";
import { accusativeNounDeriver } from "./AccusativeDerivations.js";

// ---------------------------
// BASIC MASCULINE TESTS
// ---------------------------
describe("Masculine nouns — accusative singular and plural", () => {
  const chlap = { sk: "chlap", gender: "M", animate: true, en: "man" };
  const muz = { sk: "muž", gender: "M", animate: true, en: "man" };
  const stroj = { sk: "stroj", gender: "M", animate: false, en: "machine" };
  const hrdina = { sk: "hrdina", gender: "M", animate: true, en: "hero" };
  const kolega = { sk: "kolega", gender: "M", animate: true, en: "colleague" };

  test("Masculine singular", () => {
    expect(accusativeNounDeriver.singular(chlap)).toBe("chlapa");
    expect(accusativeNounDeriver.singular(muz)).toBe("muža");
    expect(accusativeNounDeriver.singular(stroj)).toBe("stroj");
    expect(accusativeNounDeriver.singular(hrdina)).toBe("hrdinu");
    expect(accusativeNounDeriver.singular(kolega)).toBe("kolegu");
  });

  test("Masculine plural", () => {
    // Masculine animate → genitive plural
    expect(accusativeNounDeriver.plural(chlap)).toBe("chlapov");
    expect(accusativeNounDeriver.plural(muz)).toBe("mužov");
    expect(accusativeNounDeriver.plural(hrdina)).toBe("hrdinov");
    expect(accusativeNounDeriver.plural(kolega)).toBe("kolegov");
    // Masculine inanimate → nominative plural
    expect(accusativeNounDeriver.plural(stroj)).toBe("stroje");
  });
});

// ---------------------------
// BASIC FEMININE TESTS
// ---------------------------
describe("Feminine nouns — accusative singular and plural", () => {
  const zena = { sk: "žena", gender: "F", animate: false };
  const kniha = { sk: "kniha", gender: "F", animate: false };
  const chemia = { sk: "chémia", gender: "F", animate: false };
  const energia = { sk: "energia", gender: "F", animate: false };
  const kost = { sk: "kosť", gender: "F", animate: false };
  const vec = { sk: "vec", gender: "F", animate: false };

  test("Feminine singular", () => {
    expect(accusativeNounDeriver.singular(zena)).toBe("ženu");
    expect(accusativeNounDeriver.singular(kniha)).toBe("knihu");
    expect(accusativeNounDeriver.singular(chemia)).toBe("chémiu");
    expect(accusativeNounDeriver.singular(energia)).toBe("energiu");
    expect(accusativeNounDeriver.singular(kost)).toBe("kosť");
    expect(accusativeNounDeriver.singular(vec)).toBe("vec");
  });

  test("Feminine plural = nominative plural", () => {
    expect(accusativeNounDeriver.plural(zena)).toBe("ženy");
    expect(accusativeNounDeriver.plural(kniha)).toBe("knihy");
    expect(accusativeNounDeriver.plural(chemia)).toBe("chémie");
    expect(accusativeNounDeriver.plural(energia)).toBe("energie");
    expect(accusativeNounDeriver.plural(kost)).toBe("kosti");
    expect(accusativeNounDeriver.plural(vec)).toBe("veci");
  });
});

// ---------------------------
// BASIC NEUTER TESTS
// ---------------------------
describe("Neuter nouns — accusative singular and plural", () => {
  const mesto = { sk: "mesto", gender: "N", animate: false };
  const auto = { sk: "auto", gender: "N", animate: false };
  const srdce = { sk: "srdce", gender: "N", animate: false };
  const more = { sk: "more", gender: "N", animate: false };
  const vysvedcenie = { sk: "vysvedčenie", gender: "N", animate: false };
  const minimum = { sk: "minimum", gender: "N", animate: false };
  const studium = { sk: "štúdium", gender: "N", animate: false };

  test("Neuter singular = nominative", () => {
    expect(accusativeNounDeriver.singular(mesto)).toBe("mesto");
    expect(accusativeNounDeriver.singular(auto)).toBe("auto");
    expect(accusativeNounDeriver.singular(srdce)).toBe("srdce");
    expect(accusativeNounDeriver.singular(more)).toBe("more");
    expect(accusativeNounDeriver.singular(vysvedcenie)).toBe("vysvedčenie");
    expect(accusativeNounDeriver.singular(minimum)).toBe("minimum");
    expect(accusativeNounDeriver.singular(studium)).toBe("štúdium");
  });

  test("Neuter plural = nominative plural", () => {
    expect(accusativeNounDeriver.plural(mesto)).toBe("mestá");
    expect(accusativeNounDeriver.plural(auto)).toBe("autá");
    expect(accusativeNounDeriver.plural(srdce)).toBe("srdcia");
    expect(accusativeNounDeriver.plural(more)).toBe("moria");
    expect(accusativeNounDeriver.plural(vysvedcenie)).toBe("vysvedčenia");
    expect(accusativeNounDeriver.plural(minimum)).toBe("minimá");
    expect(accusativeNounDeriver.plural(studium)).toBe("štúdiá");
  });
});

// ---------------------------
// EDGE CASES
// ---------------------------
describe("Edge cases — accusative singular and plural", () => {
  const a = { sk: "a", gender: "F", animate: false };
  const o = { sk: "o", gender: "N", animate: false };
  const k = { sk: "k", gender: "M", animate: true };

  test("Single-letter singular", () => {
    expect(accusativeNounDeriver.singular(a)).toBe("u");
    expect(accusativeNounDeriver.singular(o)).toBe("o");
    expect(accusativeNounDeriver.singular(k)).toBe("ka");
  });

  test("Single-letter plural", () => {
    expect(accusativeNounDeriver.plural(a)).toBe("y");
    expect(accusativeNounDeriver.plural(o)).toBe("á");
    expect(accusativeNounDeriver.plural(k)).toBe("kov"); // masculine animate → genitive plural
  });
});

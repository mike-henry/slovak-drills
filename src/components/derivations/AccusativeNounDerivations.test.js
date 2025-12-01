import { describe, test, expect } from "vitest";
import { accusativeNounDeriver } from "./AccusativeNounDerivations.js";

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
    expect(accusativeNounDeriver.singular(chlap).derived).toBe("chlapa");
    expect(accusativeNounDeriver.singular(muz).derived).toBe("muža");
    expect(accusativeNounDeriver.singular(stroj).derived).toBe("stroj");
    expect(accusativeNounDeriver.singular(hrdina).derived).toBe("hrdinu");
    expect(accusativeNounDeriver.singular(kolega).derived).toBe("kolegu");
  });

  test("Masculine plural", () => {
    // Masculine animate → genitive plural
    expect(accusativeNounDeriver.plural(chlap).derived).toBe("chlapov");
    expect(accusativeNounDeriver.plural(muz).derived).toBe("mužov");
    expect(accusativeNounDeriver.plural(hrdina).derived).toBe("hrdinov");
    expect(accusativeNounDeriver.plural(kolega).derived).toBe("kolegov");
    // Masculine inanimate → nominative plural
    expect(accusativeNounDeriver.plural(stroj).derived).toBe("stroje");
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
    expect(accusativeNounDeriver.singular(zena).derived).toBe("ženu");
    expect(accusativeNounDeriver.singular(kniha).derived).toBe("knihu");
    expect(accusativeNounDeriver.singular(chemia).derived).toBe("chémiu");
    expect(accusativeNounDeriver.singular(energia).derived).toBe("energiu");
    expect(accusativeNounDeriver.singular(kost).derived).toBe("kosť");
    expect(accusativeNounDeriver.singular(vec).derived).toBe("vec");
  });

  test("Feminine plural = nominative plural", () => {
    expect(accusativeNounDeriver.plural(zena).derived).toBe("ženy");
    expect(accusativeNounDeriver.plural(kniha).derived).toBe("knihy");
    expect(accusativeNounDeriver.plural(chemia).derived).toBe("chémie");
    expect(accusativeNounDeriver.plural(energia).derived).toBe("energie");
    expect(accusativeNounDeriver.plural(kost).derived).toBe("kosti");
    expect(accusativeNounDeriver.plural(vec).derived).toBe("veci");
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
    expect(accusativeNounDeriver.singular(mesto).derived).toBe("mesto");
    expect(accusativeNounDeriver.singular(auto).derived).toBe("auto");
    expect(accusativeNounDeriver.singular(srdce).derived).toBe("srdce");
    expect(accusativeNounDeriver.singular(more).derived).toBe("more");
    expect(accusativeNounDeriver.singular(vysvedcenie).derived).toBe("vysvedčenie");
    expect(accusativeNounDeriver.singular(minimum).derived).toBe("minimum");
    expect(accusativeNounDeriver.singular(studium).derived).toBe("štúdium");
  });

  test("Neuter plural = nominative plural", () => {
    expect(accusativeNounDeriver.plural(mesto).derived).toBe("mestá");
    expect(accusativeNounDeriver.plural(auto).derived).toBe("autá");
    expect(accusativeNounDeriver.plural(srdce).derived).toBe("srdcia");
    expect(accusativeNounDeriver.plural(more).derived).toBe("moria");
    expect(accusativeNounDeriver.plural(vysvedcenie).derived).toBe("vysvedčenia");
    expect(accusativeNounDeriver.plural(minimum).derived).toBe("minimá");
    expect(accusativeNounDeriver.plural(studium).derived).toBe("štúdiá");
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
    expect(accusativeNounDeriver.singular(a).derived).toBe("u");
    expect(accusativeNounDeriver.singular(o).derived).toBe("o");
    expect(accusativeNounDeriver.singular(k).derived).toBe("ka");
  });

  test("Single-letter plural", () => {
    expect(accusativeNounDeriver.plural(a).derived).toBe("y");
    expect(accusativeNounDeriver.plural(o).derived).toBe("á");
    expect(accusativeNounDeriver.plural(k).derived).toBe("kov"); // masculine animate → genitive plural
  });
});

import { describe, test, expect } from "vitest";
import { nominativeNounDeriver } from "./NominativeNounDerivations.js";

// ---------------------------
// BASIC MASCULINE TESTS
// ---------------------------
describe("Masculine nouns — singular and plural", () => {
  const chlap = { sk: "chlap", gender: "M", animate: true, en: "man" };
  const chlapec = { sk: "chlapec", gender: "M", animate: true, en: "man" };
  const muz   = { sk: "muž", gender: "M", animate: true, en: "man" };
  const stroj = { sk: "stroj", gender: "M", animate: false, en: "machine" };
  const hrdina = { sk: "hrdina", gender: "M", animate: true, en: "hero" };
  const kolega = { sk: "kolega", gender: "M", animate: true, en: "colleague" };
  const plan = { sk: "plán", gender: "M",  en: "plan" };

  test("Masculine singular (NOM)", () => {
    expect(nominativeNounDeriver.singular(chlap).derived).toBe("chlap");
    expect(nominativeNounDeriver.singular(muz).derived).toBe("muž");
    expect(nominativeNounDeriver.singular(stroj).derived).toBe("stroj");
    expect(nominativeNounDeriver.singular(hrdina).derived).toBe("hrdina");
    expect(nominativeNounDeriver.singular(kolega).derived).toBe("kolega");
  });

  test("Masculine plural (NOM)", () => {
    expect(nominativeNounDeriver.plural(chlap).derived).toBe("chlapi");
    expect(nominativeNounDeriver.plural(chlapec).derived).toBe("chlapci");
    expect(nominativeNounDeriver.plural(muz).derived).toBe("muži");
    expect(nominativeNounDeriver.plural(stroj).derived).toBe("stroje");
    expect(nominativeNounDeriver.plural(hrdina).derived).toBe("hrdinovia");
    expect(nominativeNounDeriver.plural(kolega).derived).toBe("kolegovia");
    expect(nominativeNounDeriver.plural(plan).derived).toBe("plány");
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
  const pokladna = { sk: "pokladňa", gender: "F", animate: false, en: "cash desk" };
  const nohavice = { sk: "nohavice", gender: "N", animate: false, plural:true ,en: "trousers" };
  nohavice 


  test("Feminine singular (NOM)", () => {
    expect(nominativeNounDeriver.singular(zena).derived).toBe("žena");
    expect(nominativeNounDeriver.singular(kniha).derived).toBe("kniha");
    expect(nominativeNounDeriver.singular(chemia).derived).toBe("chémia");
    expect(nominativeNounDeriver.singular(energia).derived).toBe("energia");
    expect(nominativeNounDeriver.singular(kost).derived).toBe("kosť");
    expect(nominativeNounDeriver.singular(vec).derived).toBe("vec");
    expect(nominativeNounDeriver.singular(pokladna).derived).toBe("pokladňa");
    expect(nominativeNounDeriver.singular(nohavice).derived).toBe("nohavice");
  });

  test("Feminine plural (NOM)", () => {
    expect(nominativeNounDeriver.plural(zena).derived).toBe("ženy");
    expect(nominativeNounDeriver.plural(kniha).derived).toBe("knihy");
    expect(nominativeNounDeriver.plural(chemia).derived).toBe("chémie");
    expect(nominativeNounDeriver.plural(energia).derived).toBe("energie");
    expect(nominativeNounDeriver.plural(kost).derived).toBe("kosti");
    expect(nominativeNounDeriver.plural(vec).derived).toBe("veci");
    expect(nominativeNounDeriver.plural(pokladna).derived).toBe("pokladne");
    expect(nominativeNounDeriver.plural(nohavice).derived).toBe("nohavice");
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
    expect(nominativeNounDeriver.singular(mesto).derived).toBe("mesto");
    expect(nominativeNounDeriver.singular(auto).derived).toBe("auto");
    expect(nominativeNounDeriver.singular(srdce).derived).toBe("srdce");
    expect(nominativeNounDeriver.singular(more).derived).toBe("more");
    expect(nominativeNounDeriver.singular(vysvedcenie).derived).toBe("vysvedčenie");
    expect(nominativeNounDeriver.singular(minimum).derived).toBe("minimum");
    expect(nominativeNounDeriver.singular(studium).derived).toBe("štúdium");
  });

  test("Neuter plural (NOM)", () => {
    expect(nominativeNounDeriver.plural(mesto).derived).toBe("mestá");
    expect(nominativeNounDeriver.plural(auto).derived).toBe("autá");
    expect(nominativeNounDeriver.plural(srdce).derived).toBe("srdcia");
    expect(nominativeNounDeriver.plural(more).derived).toBe("moria");
    expect(nominativeNounDeriver.plural(vysvedcenie).derived).toBe("vysvedčenia");
    expect(nominativeNounDeriver.plural(minimum).derived).toBe("minimá");
    expect(nominativeNounDeriver.plural(studium).derived).toBe("štúdiá");
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
    expect(nominativeNounDeriver.singular(a).derived).toBe("a");
    expect(nominativeNounDeriver.singular(o).derived).toBe("o");
    expect(nominativeNounDeriver.singular(k).derived).toBe("k");
  });

  test("Single-letter plural (NOM)", () => {
    expect(nominativeNounDeriver.plural(a).derived).toBe("y");
    expect(nominativeNounDeriver.plural(o).derived).toBe("á");
    expect(nominativeNounDeriver.plural(k).derived).toBe("ki");
  });
});

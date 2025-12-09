import { describe, test, expect } from "vitest";
import { NominativeNounDeriver } from "./NominativeNounDerivations";
import { Gender, Noun } from "../grammer/WordTypes.js";
  
// ---------------------------
// BASIC MASCULINE TESTS
// ---------------------------
describe("Masculine nouns — singular and plural", () => {
  const chlap: Noun  = { sk: "chlap", gender: Gender.Masculine, animate: true, en: "man" };
  const chlapec: Noun = { sk: "chlapec", gender: Gender.Masculine, animate: true, en: "man" };
  const muz: Noun   = { sk: "muž", gender: Gender.Masculine, animate: true, en: "man" };
  const stroj: Noun = { sk: "stroj", gender: Gender.Masculine, animate: false, en: "machine" };
  const hrdina: Noun = { sk: "hrdina", gender: Gender.Masculine, animate: true, en: "hero" };
  const kolega : Noun= { sk: "kolega", gender: Gender.Masculine, animate: true, en: "colleague" };
  const plan: Noun = { sk: "plán", gender: Gender.Masculine,  en: "plan" };

  test("Masculine singular (NOM)", () => {
    expect(NominativeNounDeriver.singular(chlap).derived).toBe("chlap");
    expect(NominativeNounDeriver.singular(muz).derived).toBe("muž");
    expect(NominativeNounDeriver.singular(stroj).derived).toBe("stroj");
    expect(NominativeNounDeriver.singular(hrdina).derived).toBe("hrdina");
    expect(NominativeNounDeriver.singular(kolega).derived).toBe("kolega");
  });

  test("Masculine plural (NOM)", () => {
    expect(NominativeNounDeriver.plural(chlap).derived).toBe("chlapi");
    expect(NominativeNounDeriver.plural(chlapec).derived).toBe("chlapci");
    expect(NominativeNounDeriver.plural(muz).derived).toBe("muži");
    expect(NominativeNounDeriver.plural(stroj).derived).toBe("stroje");
    expect(NominativeNounDeriver.plural(hrdina).derived).toBe("hrdinovia");
    expect(NominativeNounDeriver.plural(kolega).derived).toBe("kolegovia");
    expect(NominativeNounDeriver.plural(plan).derived).toBe("plány");
  });
});

// ---------------------------
// BASIC FEMININE TESTS
// ---------------------------
describe("Feminine nouns — singular and plural", () => {
  const zena: Noun  = { sk: "žena", gender: Gender.Femenine, animate: false, en: "woman" };
  const kniha: Noun = { sk: "kniha", gender: Gender.Femenine, animate: false, en: "book" };
  const chemia: Noun  = { sk: "chémia", gender: Gender.Femenine, animate: false, en: "chemistry" };
  const energia: Noun = { sk: "energia", gender: Gender.Femenine, animate: false, en: "energy" };
  const kost: Noun = { sk: "kosť", gender: Gender.Femenine, animate: false, en: "bone" };
  const vec: Noun  = { sk: "vec", gender: Gender.Femenine, animate: false, en: "thing" };
  const pokladna: Noun = { sk: "pokladňa", gender: Gender.Femenine, animate: false, en: "cash desk" };
  const nohavice: Noun = { sk: "nohavice", gender: Gender.Neutral, animate: false, plural:true ,en: "trousers" };
 


  test("Feminine singular (NOM)", () => {
    expect(NominativeNounDeriver.singular(zena).derived).toBe("žena");
    expect(NominativeNounDeriver.singular(kniha).derived).toBe("kniha");
    expect(NominativeNounDeriver.singular(chemia).derived).toBe("chémia");
    expect(NominativeNounDeriver.singular(energia).derived).toBe("energia");
    expect(NominativeNounDeriver.singular(kost).derived).toBe("kosť");
    expect(NominativeNounDeriver.singular(vec).derived).toBe("vec");
    expect(NominativeNounDeriver.singular(pokladna).derived).toBe("pokladňa");
    expect(NominativeNounDeriver.singular(nohavice).derived).toBe("nohavice");
  });

  test("Feminine plural (NOM)", () => {
    expect(NominativeNounDeriver.plural(zena).derived).toBe("ženy");
    expect(NominativeNounDeriver.plural(kniha).derived).toBe("knihy");
    expect(NominativeNounDeriver.plural(chemia).derived).toBe("chémie");
    expect(NominativeNounDeriver.plural(energia).derived).toBe("energie");
    expect(NominativeNounDeriver.plural(kost).derived).toBe("kosti");
    expect(NominativeNounDeriver.plural(vec).derived).toBe("veci");
    expect(NominativeNounDeriver.plural(pokladna).derived).toBe("pokladne");
    expect(NominativeNounDeriver.plural(nohavice).derived).toBe("nohavice");
  });
});

// ---------------------------
// BASIC NEUTER TESTS
// ---------------------------
describe("Neuter nouns — singular and plural", () => {
  const mesto: Noun = { sk: "mesto", gender: Gender.Neutral, animate: false, en: "city" };
  const auto : Noun = { sk: "auto", gender: Gender.Neutral, animate: false, en: "car" };
  const srdce: Noun = { sk: "srdce", gender: Gender.Neutral, animate: false, en: "heart" };
  const more : Noun = { sk: "more", gender: Gender.Neutral, animate: false, en: "sea" };
  const vysvedcenie: Noun = { sk: "vysvedčenie", gender: Gender.Neutral, animate: false, en: "report" };
  const minimum: Noun  = { sk: "minimum", gender: Gender.Neutral, animate: false, en: "minimum" };
  const studium : Noun = { sk: "štúdium", gender: Gender.Neutral, animate: false, en: "study" };

  test("Neuter singular (NOM)", () => {
    expect(NominativeNounDeriver.singular(mesto).derived).toBe("mesto");
    expect(NominativeNounDeriver.singular(auto).derived).toBe("auto");
    expect(NominativeNounDeriver.singular(srdce).derived).toBe("srdce");
    expect(NominativeNounDeriver.singular(more).derived).toBe("more");
    expect(NominativeNounDeriver.singular(vysvedcenie).derived).toBe("vysvedčenie");
    expect(NominativeNounDeriver.singular(minimum).derived).toBe("minimum");
    expect(NominativeNounDeriver.singular(studium).derived).toBe("štúdium");
  });

  test("Neuter plural (NOM)", () => {
    expect(NominativeNounDeriver.plural(mesto).derived).toBe("mestá");
    expect(NominativeNounDeriver.plural(auto).derived).toBe("autá");
    expect(NominativeNounDeriver.plural(srdce).derived).toBe("srdcia");
    expect(NominativeNounDeriver.plural(more).derived).toBe("moria");
    expect(NominativeNounDeriver.plural(vysvedcenie).derived).toBe("vysvedčenia");
    expect(NominativeNounDeriver.plural(minimum).derived).toBe("minimá");
    expect(NominativeNounDeriver.plural(studium).derived).toBe("štúdiá");
  });
});

// ---------------------------
// EDGE CASES
// ---------------------------
describe("Edge cases — singular and plural", () => {
  const a: Noun = { sk: "a", gender: Gender.Femenine, animate: false, en: "letter a" };
  const o: Noun = { sk: "o", gender: Gender.Neutral, animate: false, en: "letter o" };
  const k: Noun = { sk: "k", gender: Gender.Masculine, animate: true, en: "letter k" };

  test("Single-letter singular (NOM)", () => {
    expect(NominativeNounDeriver.singular(a).derived).toBe("a");
    expect(NominativeNounDeriver.singular(o).derived).toBe("o");
    expect(NominativeNounDeriver.singular(k).derived).toBe("k");
  });

  test("Single-letter plural (NOM)", () => {
    expect(NominativeNounDeriver.plural(a).derived).toBe("y");
    expect(NominativeNounDeriver.plural(o).derived).toBe("á");
    expect(NominativeNounDeriver.plural(k).derived).toBe("ki");
  });
});

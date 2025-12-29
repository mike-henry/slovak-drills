import { describe, test, expect } from "vitest";
import { CASE_TYPE, Gender } from "../../WordTypes.js";
import Noun from "../Noun.ts";

  const CASE = CASE_TYPE.NOMINATIVE
// ---------------------------
// BASIC MASCULINE TESTS
// ---------------------------
describe("Masculine nouns — singular and plural", () => {
  const chlap: Noun = Noun.fromRaw( {sk: "chlap", gender: Gender.Masculine, animate: true, en: "man" });
  const chlapec: Noun = Noun.fromRaw( {sk: "chlapec", gender: Gender.Masculine, animate: true, en: "man" });
  const muz: Noun = Noun.fromRaw( { sk: "muž", gender: Gender.Masculine, animate: true, en: "man" });
  const stroj: Noun = Noun.fromRaw( {sk: "stroj", gender: Gender.Masculine, animate: false, en: "machine" });
  const hrdina: Noun = Noun.fromRaw( {sk: "hrdina", gender: Gender.Masculine, animate: true, en: "hero" });
  const kolega: Noun = Noun.fromRaw( { sk: "kolega", gender: Gender.Masculine, animate: true, en: "colleague" });
  const plan: Noun = Noun.fromRaw( {sk: "plán", gender: Gender.Masculine,  en: "plan" });

  test("Masculine singular (NOM)", () => {
    expect(chlap.declinate(CASE).derived).toBe("chlap");
    expect(muz.declinate(CASE).derived).toBe("muž");
    expect(stroj.declinate(CASE).derived).toBe("stroj");
    expect(hrdina.declinate(CASE).derived).toBe("hrdina");
    expect(kolega.declinate(CASE).derived).toBe("kolega");
  });

  test("Masculine plural (NOM)", () => {
    expect(chlap.declinate(CASE,true).derived).toBe("chlapi");
    expect(chlapec.declinate(CASE,true).derived).toBe("chlapci");
    expect(muz.declinate(CASE,true).derived).toBe("muži");
    expect(stroj.declinate(CASE,true).derived).toBe("stroje");
    expect(hrdina.declinate(CASE,true).derived).toBe("hrdinovia");
    expect(kolega.declinate(CASE,true).derived).toBe("kolegovia");
    expect(plan.declinate(CASE,true).derived).toBe("plány");
  });
});

// ---------------------------
// BASIC FEMININE TESTS
// ---------------------------
describe("Feminine nouns — singular and plural", () => {
  const zena: Noun  =  Noun.fromRaw({ sk: "žena", gender: Gender.Femenine, animate: false, en: "woman" });
  const kniha: Noun = Noun.fromRaw( {sk: "kniha", gender: Gender.Femenine, animate: false, en: "book" });
  const chemia: Noun  = Noun.fromRaw( { sk: "chémia", gender: Gender.Femenine, animate: false, en: "chemistry" });
  const energia: Noun = Noun.fromRaw( {sk: "energia", gender: Gender.Femenine, animate: false, en: "energy" });
  const kost: Noun = Noun.fromRaw( {sk: "kosť", gender: Gender.Femenine, animate: false, en: "bone" });
  const vec: Noun  = Noun.fromRaw({ sk: "vec", gender: Gender.Femenine, animate: false, en: "thing" });
  const pokladna: Noun = Noun.fromRaw( {sk: "pokladňa", gender: Gender.Femenine, animate: false, en: "cash desk" });
  const nohavice: Noun = Noun.fromRaw( {sk: "nohavice", gender: Gender.Neutral, animate: false, plural:true ,en: "trousers" });
 


  test("Feminine singular (NOM)", () => {
    expect(zena.declinate(CASE).derived).toBe("žena");
    expect(kniha.declinate(CASE).derived).toBe("kniha");
    expect(chemia.declinate(CASE).derived).toBe("chémia");
    expect(energia.declinate(CASE).derived).toBe("energia");
    expect(kost.declinate(CASE).derived).toBe("kosť");
    expect(vec.declinate(CASE).derived).toBe("vec");
    expect(pokladna.declinate(CASE).derived).toBe("pokladňa");
    expect(nohavice.declinate(CASE).derived).toBe("nohavice");
  });

  test("Feminine plural (NOM)", () => {
    expect(zena.declinate(CASE,true).derived).toBe("ženy");
    expect(kniha.declinate(CASE,true).derived).toBe("knihy");
    expect(chemia.declinate(CASE,true).derived).toBe("chémie");
    expect(energia.declinate(CASE,true).derived).toBe("energie");
    expect(kost.declinate(CASE,true).derived).toBe("kosti");
    expect(vec.declinate(CASE,true).derived).toBe("veci");
    expect(pokladna.declinate(CASE,true).derived).toBe("pokladne");
    expect(nohavice.declinate(CASE,true).derived).toBe("nohavice");
  });
});

// ---------------------------
// BASIC NEUTER TESTS
// ---------------------------
describe("Neuter nouns — singular and plural", () => {
  const mesto: Noun = Noun.fromRaw( {sk: "mesto", gender: Gender.Neutral, animate: false, en: "city" });
  const auto : Noun = Noun.fromRaw( {sk: "auto", gender: Gender.Neutral, animate: false, en: "car" });
  const srdce: Noun = Noun.fromRaw( {sk: "srdce", gender: Gender.Neutral, animate: false, en: "heart" });
  const more : Noun = Noun.fromRaw( {sk: "more", gender: Gender.Neutral, animate: false, en: "sea" });
  const vysvedcenie: Noun = Noun.fromRaw( {sk: "vysvedčenie", gender: Gender.Neutral, animate: false, en: "report" });
  const minimum: Noun  = Noun.fromRaw( { sk: "minimum", gender: Gender.Neutral, animate: false, en: "minimum" });
  const studium : Noun = Noun.fromRaw( {sk: "štúdium", gender: Gender.Neutral, animate: false, en: "study" });

  test("Neuter singular (NOM)", () => {
    expect(mesto.declinate(CASE).derived).toBe("mesto");
    expect(auto.declinate(CASE).derived).toBe("auto");
    expect(srdce.declinate(CASE).derived).toBe("srdce");
    expect(more.declinate(CASE).derived).toBe("more");
    expect(vysvedcenie.declinate(CASE).derived).toBe("vysvedčenie");
    expect(minimum.declinate(CASE).derived).toBe("minimum");
    expect(studium.declinate(CASE).derived).toBe("štúdium");
  });

  test("Neuter plural (NOM)", () => {
    expect(mesto.declinate(CASE,true).derived).toBe("mestá");
    expect(auto.declinate(CASE,true).derived).toBe("autá");
    expect(srdce.declinate(CASE,true).derived).toBe("srdcia");
    expect(more.declinate(CASE,true).derived).toBe("moria");
    expect(vysvedcenie.declinate(CASE,true).derived).toBe("vysvedčenia");
    expect(minimum.declinate(CASE,true).derived).toBe("minimá");
    expect(studium.declinate(CASE,true).derived).toBe("štúdiá");
  });
});

// ---------------------------
// EDGE CASES
// ---------------------------
describe("Edge cases — singular and plural", () => {
  const a: Noun = Noun.fromRaw( {sk: "a", gender: Gender.Femenine, animate: false, en: "letter a" });
  const o: Noun = Noun.fromRaw( {sk: "o", gender: Gender.Neutral, animate: false, en: "letter o" });
  const k: Noun = Noun.fromRaw( {sk: "k", gender: Gender.Masculine, animate: true, en: "letter k" });

  test("Single-letter singular (NOM)", () => {
    expect(a.declinate(CASE).derived).toBe("a");
    expect(o.declinate(CASE).derived).toBe("o");
    expect(k.declinate(CASE).derived).toBe("k");
  });

  test("Single-letter plural (NOM)", () => {
    expect(a.declinate(CASE,true).derived).toBe("y");
    expect(o.declinate(CASE,true).derived).toBe("á");
    expect(k.declinate(CASE,true).derived).toBe("ki");
  });
});

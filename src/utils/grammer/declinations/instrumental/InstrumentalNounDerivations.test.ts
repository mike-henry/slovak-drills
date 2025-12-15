import { describe, test, expect } from "vitest";
import { CASE_TYPE, Gender } from "@/utils/grammer/WordTypes";
import Noun from "../Noun";

const CASE = CASE_TYPE.INSTRUMENTAL;

// ---------------------------------------------------------
// MASCULINE — INSTRUMENTAL SINGULAR
// ---------------------------------------------------------
describe("Masculine nouns — instrumental singular", () => {
  const chlap:Noun = Noun.fromRaw( { en: "", sk: "chlap", gender: Gender.Masculine, animate: true });
  const muz:Noun = Noun.fromRaw( { en: "", sk: "muž", gender: Gender.Masculine, animate: true });
  const stroj:Noun = Noun.fromRaw( { en: "", sk: "stroj", gender: Gender.Masculine, animate: false });
  const hrdina:Noun = Noun.fromRaw( { en: "", sk: "hrdina", gender: Gender.Masculine, animate: true });
  const kolega:Noun = Noun.fromRaw( { en: "", sk: "kolega", gender: Gender.Masculine, animate: true });

  test("Masculine animate → -om", () => {
    expect(chlap.declinate(CASE).derived).toBe("chlapom");
    expect(muz.declinate(CASE).derived).toBe("mužom");
  });

  test("Masculine animate ending in -a → stem + om", () => {
    expect(hrdina.declinate(CASE).derived).toBe("hrdinom");
    expect(kolega.declinate(CASE).derived).toBe("kolegom");
  });

  test("Masculine inanimate → -om", () => {
    expect(stroj.declinate(CASE).derived).toBe("strojom");
  });
});

// ---------------------------------------------------------
// FEMININE — INSTRUMENTAL SINGULAR
// ---------------------------------------------------------
describe("Feminine nouns — instrumental singular", () => {
  const zena:Noun = Noun.fromRaw( { en: "", sk: "žena", gender: Gender.Femenine });
  const kniha:Noun = Noun.fromRaw( { en: "", sk: "kniha", gender: Gender.Femenine });
  const chemia:Noun = Noun.fromRaw( { en: "", sk: "chémia", gender: Gender.Femenine });
  const kost:Noun = Noun.fromRaw( { en: "", sk: "kosť", gender: Gender.Femenine });
  const radost:Noun = Noun.fromRaw( { en: "", sk: "radosť", gender: Gender.Femenine });

  test("Feminine -a → -ou", () => {
    expect(zena.declinate(CASE).derived).toBe("ženou");
    expect(kniha.declinate(CASE).derived).toBe("knihou");
  });

  test("Feminine -ia → -ou", () => {
    expect(chemia.declinate(CASE).derived).toBe("chémiou");
  });

  test("Feminine consonant-ending → +ou", () => {
    expect(kost.declinate(CASE).derived).toBe("kosťou");
    expect(radost.declinate(CASE).derived).toBe("radosťou");
  });
});

// ---------------------------------------------------------
// NEUTER — INSTRUMENTAL SINGULAR
// ---------------------------------------------------------
describe("Neuter nouns — instrumental singular", () => {
  const mesto:Noun = Noun.fromRaw( { en: "", sk: "mesto", gender: Gender.Neutral });
  const auto:Noun = Noun.fromRaw( { en: "", sk: "auto", gender: Gender.Neutral });
  const srdce:Noun = Noun.fromRaw( { en: "", sk: "srdce", gender: Gender.Neutral });
  const more:Noun = Noun.fromRaw( { en: "", sk: "more", gender: Gender.Neutral });
  const vysvedcenie:Noun = Noun.fromRaw( { en: "", sk: "vysvedčenie", gender: Gender.Neutral });
  const minimum:Noun = Noun.fromRaw( { en: "", sk: "minimum", gender: Gender.Neutral });
  const studium:Noun = Noun.fromRaw( { en: "", sk: "štúdium", gender: Gender.Neutral });

  test("Neuter -o → -om", () => {
    expect(mesto.declinate(CASE).derived).toBe("mestom");   
    expect(auto.declinate(CASE).derived).toBe("autom");
  });

  test("Neuter -e → -om", () => {
    expect(srdce.declinate(CASE).derived).toBe("srdcom");
    expect(more.declinate(CASE).derived).toBe("morom");
  });

  test("Neuter -ie → -ím", () => {
    expect(vysvedcenie.declinate(CASE).derived).toBe("vysvedčením");
  });

  test("Neuter -um → -om", () => {
    expect(minimum.declinate(CASE).derived).toBe("minimom");
    expect(studium.declinate(CASE).derived).toBe("štúdiom");
  });
});

// ---------------------------------------------------------
// MASCULINE — INSTRUMENTAL PLURAL
// ---------------------------------------------------------
describe("Masculine nouns — instrumental plural", () => {
  const chlap:Noun = Noun.fromRaw( { en: "", sk: "chlap", gender: Gender.Masculine, animate: true });
  const muz:Noun = Noun.fromRaw( { en: "", sk: "muž", gender: Gender.Masculine, animate: true });
  const stroj:Noun = Noun.fromRaw( { en: "", sk: "stroj", gender: Gender.Masculine, animate: false });
  const hrdina:Noun = Noun.fromRaw( { en: "", sk: "hrdina", gender: Gender.Masculine, animate: true });
  const kolega:Noun = Noun.fromRaw( { en: "", sk: "kolega", gender: Gender.Masculine, animate: true });

  test("All masculine (animate & inanimate) consonant-ending → -mi", () => {
    expect(chlap.declinate(CASE,true).derived).toBe("chlapmi");
    expect(muz.declinate(CASE,true).derived).toBe("mužmi");
    expect(stroj.declinate(CASE,true).derived).toBe("strojmi");
  });

  test("Masculine ending in -a → -ami", () => {
    expect(hrdina.declinate(CASE,true).derived).toBe("hrdinami");
    expect(kolega.declinate(CASE,true).derived).toBe("kolegami");
  });
});

// ---------------------------------------------------------
// FEMININE — INSTRUMENTAL PLURAL
// ---------------------------------------------------------
describe("Feminine nouns — instrumental plural", () => {
  const zena:Noun = Noun.fromRaw( { en: "", sk: "žena", gender: Gender.Femenine });
  const kniha:Noun = Noun.fromRaw( { en: "", sk: "kniha", gender: Gender.Femenine });
  const chemia:Noun = Noun.fromRaw( { en: "", sk: "chémia", gender: Gender.Femenine });
  const kost:Noun = Noun.fromRaw( { en: "", sk: "kosť", gender: Gender.Femenine });
  const vec:Noun = Noun.fromRaw( { en: "", sk: "vec", gender: Gender.Femenine });

  test("Feminine -a → -ami", () => {
    expect(zena.declinate(CASE,true).derived).toBe("ženami");
    expect(kniha.declinate(CASE,true).derived).toBe("knihami");
  });

  test("Feminine -ia → -ami", () => {
    expect(chemia.declinate(CASE,true).derived).toBe("chémiami");
  });

  test("Feminine consonant-ending → -ami", () => {
    expect(kost.declinate(CASE,true).derived).toBe("kosťami");
    expect(vec.declinate(CASE,true).derived).toBe("vecami");
  });
});

// ---------------------------------------------------------
// NEUTER — INSTRUMENTAL PLURAL
// ---------------------------------------------------------
describe("Neuter nouns — instrumental plural", () => {
  const mesto:Noun = Noun.fromRaw( { en: "", sk: "mesto", gender: Gender.Neutral });
  const auto:Noun = Noun.fromRaw( { en: "", sk: "auto", gender: Gender.Neutral });
  const srdce:Noun = Noun.fromRaw( { en: "", sk: "srdce", gender: Gender.Neutral });
  const more:Noun = Noun.fromRaw( { en: "", sk: "more", gender: Gender.Neutral });
  const vysvedcenie:Noun = Noun.fromRaw( { en: "", sk: "vysvedčenie", gender: Gender.Neutral });

  test("All neuters → -ami", () => {
    expect(mesto.declinate(CASE,true).derived).toBe("mestami");
    expect(auto.declinate(CASE,true).derived).toBe("autami");
    expect(srdce.declinate(CASE,true).derived).toBe("srdcami");
    expect(more.declinate(CASE,true).derived).toBe("morami");
    expect(vysvedcenie.declinate(CASE,true).derived).toBe("vysvedčeniami");
  });
});

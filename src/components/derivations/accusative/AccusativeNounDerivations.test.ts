import { describe, test, expect } from "vitest";
import { AccusativeNounDeriver as accusativeNounDeriver } from "./AccusativeNounDerivations.js";
import { Gender, type Noun } from "@/components/grammer/WordTypes.js";

// ---------------------------
// BASIC MASCULINE TESTS
// ---------------------------
describe("Masculine nouns — accusative singular and plural", () => {
  const chlap:Noun = {  sk: "chlap", gender: Gender.Masculine, animate: true, en: "man" };
  const chlapec:Noun = {  sk: "chlapec", gender: Gender.Masculine, animate: true, en: "man" };
  const muz:Noun = {  sk: "muž", gender: Gender.Masculine, animate: true, en: "man" };
  const stroj:Noun = {  sk: "stroj", gender: Gender.Masculine, animate: false, en: "machine" };
  const hrdina:Noun = {  sk: "hrdina", gender: Gender.Masculine, animate: true, en: "hero" };
  const kolega:Noun = {  sk: "kolega", gender: Gender.Masculine, animate: true, en: "colleague" };

  test("Masculine singular", () => {
    expect(accusativeNounDeriver.singular(chlap).derived).toBe("chlapa");
    expect(accusativeNounDeriver.singular(chlapec).derived).toBe("chlapca");
    expect(accusativeNounDeriver.singular(muz).derived).toBe("muža");
    expect(accusativeNounDeriver.singular(stroj).derived).toBe("stroj");
    expect(accusativeNounDeriver.singular(hrdina).derived).toBe("hrdinu");
    expect(accusativeNounDeriver.singular(kolega).derived).toBe("kolegu");
  });

  test("Masculine plural", () => {
    // Masculine animate → genitive plural
    expect(accusativeNounDeriver.plural(chlap).derived).toBe("chlapov");
    expect(accusativeNounDeriver.plural(chlapec).derived).toBe("chlapcov");
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
  const zena:Noun = { en:"", sk: "žena", gender: Gender.Femenine, animate: false };
  const kniha:Noun = { en:"", sk: "kniha",  gender: Gender.Femenine, animate: false };
  const chemia:Noun = { en:"", sk: "chémia",  gender: Gender.Femenine, animate: false };
  const energia:Noun = { en:"", sk: "energia",  gender: Gender.Femenine, animate: false };
  const kost:Noun = { en:"", sk: "kosť",  gender: Gender.Femenine, animate: false };
  const vec:Noun = { en:"", sk: "vec",  gender: Gender.Femenine, animate: false };
  const chlapec:Noun = {  sk: "chlapec", gender: Gender.Masculine, animate: true, en: "man" };

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
  const mesto:Noun = { en:"", sk: "mesto", gender: Gender.Neutral, animate: false };
  const auto:Noun = { en:"", sk: "auto",  gender: Gender.Neutral, animate: false };
  const srdce:Noun = { en:"", sk: "srdce",  gender: Gender.Neutral, animate: false };
  const more:Noun = { en:"", sk: "more",  gender: Gender.Neutral, animate: false };
  const vysvedcenie:Noun = { en:"", sk: "vysvedčenie",  gender: Gender.Neutral, animate: false };
  const minimum:Noun = { en:"", sk: "minimum",  gender: Gender.Neutral, animate: false };
  const studium:Noun = { en:"", sk: "štúdium",  gender: Gender.Neutral, animate: false };


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
  const a:Noun = { en:"", sk: "a",  gender: Gender.Femenine, animate: false };
  const o:Noun = { en:"", sk: "o",  gender: Gender.Neutral, animate: false };
  const k:Noun = { en:"", sk: "k", gender: Gender.Masculine, animate: true };

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

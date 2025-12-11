import { describe, test, expect } from "vitest";
import { InstrumentalNounDeriver as instrumentalNounDeriver } from "./InstrumentalNounDerivations";
import { Gender, type Noun } from "@/components/grammer/WordTypes";

// ---------------------------------------------------------
// MASCULINE — INSTRUMENTAL SINGULAR
// ---------------------------------------------------------
describe("Masculine nouns — instrumental singular", () => {
  const chlap:Noun = {en:"", sk: "chlap", gender: Gender.Masculine, animate: true };
  const muz:Noun = {en:"", sk: "muž", gender: Gender.Masculine, animate: true };
  const stroj:Noun = {en:"", sk: "stroj", gender: Gender.Masculine, animate: false };
  const hrdina:Noun = {en:"", sk: "hrdina", gender: Gender.Masculine, animate: true };
  const kolega:Noun = {en:"", sk: "kolega", gender: Gender.Masculine, animate: true };

  test("Masculine animate → -om", () => {
    expect(instrumentalNounDeriver.singular(chlap).derived).toBe("chlapom");
    expect(instrumentalNounDeriver.singular(muz).derived).toBe("mužom");
  });

  test("Masculine animate ending in -a → stem + om", () => {
    expect(instrumentalNounDeriver.singular(hrdina).derived).toBe("hrdinom");
    expect(instrumentalNounDeriver.singular(kolega).derived).toBe("kolegom");
  });

  test("Masculine inanimate → -om", () => {
    expect(instrumentalNounDeriver.singular(stroj).derived).toBe("strojom");
  });
});

// ---------------------------------------------------------
// FEMININE — INSTRUMENTAL SINGULAR
// ---------------------------------------------------------
describe("Feminine nouns — instrumental singular", () => {
  const zena:Noun = {en:"", sk: "žena",  gender: Gender.Femenine };
  const kniha:Noun = {en:"", sk: "kniha",  gender: Gender.Femenine };
  const chemia:Noun = {en:"", sk: "chémia",  gender: Gender.Femenine };
  const kost:Noun = {en:"", sk: "kosť",  gender: Gender.Femenine };
  const radost:Noun = {en:"", sk: "radosť",  gender: Gender.Femenine };

  test("Feminine -a → -ou", () => {
    expect(instrumentalNounDeriver.singular(zena).derived).toBe("ženou");
    expect(instrumentalNounDeriver.singular(kniha).derived).toBe("knihou");
  });

  test("Feminine -ia → -ou", () => {
    expect(instrumentalNounDeriver.singular(chemia).derived).toBe("chémiou");
  });

  test("Feminine consonant-ending → +ou", () => {
    expect(instrumentalNounDeriver.singular(kost).derived).toBe("kosťou");
    expect(instrumentalNounDeriver.singular(radost).derived).toBe("radosťou");
  });
});

// ---------------------------------------------------------
// NEUTER — INSTRUMENTAL SINGULAR
// ---------------------------------------------------------
describe("Neuter nouns — instrumental singular", () => {
  const mesto:Noun = {en:"", sk: "mesto",  gender: Gender.Neutral };
  const auto:Noun = {en:"", sk: "auto",  gender: Gender.Neutral };
  const srdce:Noun = {en:"", sk: "srdce",  gender: Gender.Neutral };
  const more:Noun = {en:"", sk: "more",  gender: Gender.Neutral };
  const vysvedcenie:Noun = {en:"", sk: "vysvedčenie",  gender: Gender.Neutral };
  const minimum:Noun = {en:"", sk: "minimum",  gender: Gender.Neutral };
  const studium:Noun = {en:"", sk: "štúdium",  gender: Gender.Neutral };

  test("Neuter -o → -om", () => {
    expect(instrumentalNounDeriver.singular(mesto).derived).toBe("mestom");
    expect(instrumentalNounDeriver.singular(auto).derived).toBe("autom");
  });

  test("Neuter -e → -om", () => {
    expect(instrumentalNounDeriver.singular(srdce).derived).toBe("srdcom");
    expect(instrumentalNounDeriver.singular(more).derived).toBe("morom");
  });

  test("Neuter -ie → -ím", () => {
    expect(instrumentalNounDeriver.singular(vysvedcenie).derived).toBe("vysvedčením");
  });

  test("Neuter -um → -om", () => {
    expect(instrumentalNounDeriver.singular(minimum).derived).toBe("minimom");
    expect(instrumentalNounDeriver.singular(studium).derived).toBe("štúdiom");
  });
});

// ---------------------------------------------------------
// MASCULINE — INSTRUMENTAL PLURAL
// ---------------------------------------------------------
describe("Masculine nouns — instrumental plural", () => {
  const chlap:Noun = {en:"", sk: "chlap", gender: Gender.Masculine, animate: true };
  const muz:Noun = {en:"", sk: "muž", gender: Gender.Masculine, animate: true };
  const stroj:Noun = {en:"", sk: "stroj", gender: Gender.Masculine, animate: false };
  const hrdina:Noun = {en:"", sk: "hrdina", gender: Gender.Masculine, animate: true };
  const kolega:Noun = {en:"", sk: "kolega", gender: Gender.Masculine, animate: true };

  test("All masculine (animate & inanimate) consonant-ending → -mi", () => {
    expect(instrumentalNounDeriver.plural(chlap).derived).toBe("chlapmi");
    expect(instrumentalNounDeriver.plural(muz).derived).toBe("mužmi");
    expect(instrumentalNounDeriver.plural(stroj).derived).toBe("strojmi");
  });

  test("Masculine ending in -a → -ami", () => {
    expect(instrumentalNounDeriver.plural(hrdina).derived).toBe("hrdinami");
    expect(instrumentalNounDeriver.plural(kolega).derived).toBe("kolegami");
  });
});

// ---------------------------------------------------------
// FEMININE — INSTRUMENTAL PLURAL
// ---------------------------------------------------------
describe("Feminine nouns — instrumental plural", () => {
  const zena:Noun = {en:"", sk: "žena",  gender: Gender.Femenine };
  const kniha:Noun = {en:"", sk: "kniha",  gender: Gender.Femenine };
  const chemia:Noun = {en:"", sk: "chémia",  gender: Gender.Femenine };
  const kost:Noun = {en:"", sk: "kosť",  gender: Gender.Femenine };
  const vec:Noun = {en:"", sk: "vec",  gender: Gender.Femenine };

  test("Feminine -a → -ami", () => {
    expect(instrumentalNounDeriver.plural(zena).derived).toBe("ženami");
    expect(instrumentalNounDeriver.plural(kniha).derived).toBe("knihami");
  });

  test("Feminine -ia → -ami", () => {
    expect(instrumentalNounDeriver.plural(chemia).derived).toBe("chémiami");
  });

  test("Feminine consonant-ending → -ami", () => {
    expect(instrumentalNounDeriver.plural(kost).derived).toBe("kosťami");
    expect(instrumentalNounDeriver.plural(vec).derived).toBe("vecami");
  });
});

// ---------------------------------------------------------
// NEUTER — INSTRUMENTAL PLURAL
// ---------------------------------------------------------
describe("Neuter nouns — instrumental plural", () => {
  const mesto:Noun = {en:"", sk: "mesto",  gender: Gender.Neutral };
  const auto:Noun = {en:"", sk: "auto",  gender: Gender.Neutral };
  const srdce:Noun = {en:"", sk: "srdce",  gender: Gender.Neutral };
  const more:Noun = {en:"", sk: "more",  gender: Gender.Neutral };
  const vysvedcenie:Noun = {en:"", sk: "vysvedčenie",  gender: Gender.Neutral };

  test("All neuters → -ami", () => {
    expect(instrumentalNounDeriver.plural(mesto).derived).toBe("mestami");
    expect(instrumentalNounDeriver.plural(auto).derived).toBe("autami");
    expect(instrumentalNounDeriver.plural(srdce).derived).toBe("srdcami");
    expect(instrumentalNounDeriver.plural(more).derived).toBe("morami");
    expect(instrumentalNounDeriver.plural(vysvedcenie).derived).toBe("vysvedčeniami");
  });
});

import { describe, test, expect } from "vitest";
import { instrumentalNounDeriver } from "./InstrumentalNounDerivations.js";

// ---------------------------------------------------------
// MASCULINE — INSTRUMENTAL SINGULAR
// ---------------------------------------------------------
describe("Masculine nouns — instrumental singular", () => {
  const chlap = { sk: "chlap", gender: "M", animate: true };
  const muz = { sk: "muž", gender: "M", animate: true };
  const stroj = { sk: "stroj", gender: "M", animate: false };
  const hrdina = { sk: "hrdina", gender: "M", animate: true };
  const kolega = { sk: "kolega", gender: "M", animate: true };

  test("Masculine animate → -om", () => {
    expect(instrumentalNounDeriver.singular(chlap)).toBe("chlapom");
    expect(instrumentalNounDeriver.singular(muz)).toBe("mužom");
  });
  
  test("Masculine animate ending in -a → stem + om", () => {
    expect(instrumentalNounDeriver.singular(hrdina)).toBe("hrdinom");
    expect(instrumentalNounDeriver.singular(kolega)).toBe("kolegom");
  });

  test("Masculine inanimate → -om", () => {
    expect(instrumentalNounDeriver.singular(stroj)).toBe("strojom");
  });
});

// ---------------------------------------------------------
// FEMININE — INSTRUMENTAL SINGULAR
// ---------------------------------------------------------
describe("Feminine nouns — instrumental singular", () => {
  const zena = { sk: "žena", gender: "F" };
  const kniha = { sk: "kniha", gender: "F" };
  const chemia = { sk: "chémia", gender: "F" };
  const kost = { sk: "kosť", gender: "F" };
  const radost = { sk: "radosť", gender: "F" };

  test("Feminine -a → -ou", () => {
    expect(instrumentalNounDeriver.singular(zena)).toBe("ženou");
    expect(instrumentalNounDeriver.singular(kniha)).toBe("knihou");
  });

  test("Feminine -ia → -ou", () => {
    expect(instrumentalNounDeriver.singular(chemia)).toBe("chémiou");
  });

  test("Feminine consonant-ending → +ou", () => {
    expect(instrumentalNounDeriver.singular(kost)).toBe("kosťou");
    expect(instrumentalNounDeriver.singular(radost)).toBe("radosťou");
  });
});

// ---------------------------------------------------------
// NEUTER — INSTRUMENTAL SINGULAR
// ---------------------------------------------------------
describe("Neuter nouns — instrumental singular", () => {
  const mesto = { sk: "mesto", gender: "N" };
  const auto = { sk: "auto", gender: "N" };
  const srdce = { sk: "srdce", gender: "N" };
  const more = { sk: "more", gender: "N" };
  const vysvedcenie = { sk: "vysvedčenie", gender: "N" };
  const minimum = { sk: "minimum", gender: "N" };
  const studium = { sk: "štúdium", gender: "N" };

  test("Neuter -o → -om", () => {
    expect(instrumentalNounDeriver.singular(mesto)).toBe("mestom");
    expect(instrumentalNounDeriver.singular(auto)).toBe("autom");
  });

  test("Neuter -e → -om", () => {
    expect(instrumentalNounDeriver.singular(srdce)).toBe("srdcom");
    expect(instrumentalNounDeriver.singular(more)).toBe( "morom"); // depending on your stem rules
  });

  test("Neuter -ie → -ím", () => {
    expect(instrumentalNounDeriver.singular(vysvedcenie)).toBe("vysvedčením");
  });

  test("Neuter -um → -om", () => {
    expect(instrumentalNounDeriver.singular(minimum)).toBe("minimom");
    expect(instrumentalNounDeriver.singular(studium)).toBe("štúdiom");
  });
});

// ---------------------------------------------------------
// MASCULINE — INSTRUMENTAL PLURAL
// ---------------------------------------------------------
describe("Masculine nouns — instrumental plural", () => {
  const chlap = { sk: "chlap", gender: "M", animate: true };
  const muz = { sk: "muž", gender: "M", animate: true };
  const stroj = { sk: "stroj", gender: "M", animate: false };
  const hrdina = { sk: "hrdina", gender: "M", animate: true };
  const kolega = { sk: "kolega", gender: "M", animate: true };

  test("All masculine (animate & inanimate) consonant-ending → -mi", () => {
    expect(instrumentalNounDeriver.plural(chlap)).toBe("chlapmi");
    expect(instrumentalNounDeriver.plural(muz)).toBe("mužmi");
    expect(instrumentalNounDeriver.plural(stroj)).toBe("strojmi");
  });

  test("Masculine ending in -a → -ami", () => {
    expect(instrumentalNounDeriver.plural(hrdina)).toBe("hrdinami");
    expect(instrumentalNounDeriver.plural(kolega)).toBe("kolegami");
  });
});

// ---------------------------------------------------------
// FEMININE — INSTRUMENTAL PLURAL
// ---------------------------------------------------------
describe("Feminine nouns — instrumental plural", () => {
  const zena = { sk: "žena", gender: "F" };
  const kniha = { sk: "kniha", gender: "F" };
  const chemia = { sk: "chémia", gender: "F" };
  const kost = { sk: "kosť", gender: "F" };
  const vec = { sk: "vec", gender: "F" };

  test("Feminine -a → -ami", () => {
    expect(instrumentalNounDeriver.plural(zena)).toBe("ženami");
    expect(instrumentalNounDeriver.plural(kniha)).toBe("knihami");
  });

  test("Feminine -ia → -ami", () => {
    expect(instrumentalNounDeriver.plural(chemia)).toBe("chémiami");
  });

  test("Feminine consonant-ending → -ami", () => {
    expect(instrumentalNounDeriver.plural(kost)).toBe("kosťami");
    expect(instrumentalNounDeriver.plural(vec)).toBe("vecami");
  });
});

// ---------------------------------------------------------
// NEUTER — INSTRUMENTAL PLURAL
// ---------------------------------------------------------
describe("Neuter nouns — instrumental plural", () => {
  const mesto = { sk: "mesto", gender: "N" };
  const auto = { sk: "auto", gender: "N" };
  const srdce = { sk: "srdce", gender: "N" };
  const more = { sk: "more", gender: "N" };
  const vysvedcenie = { sk: "vysvedčenie", gender: "N" };

  test("All neuters → -ami", () => {
    expect(instrumentalNounDeriver.plural(mesto)).toBe("mestami");
    expect(instrumentalNounDeriver.plural(auto)).toBe("autami");
    expect(instrumentalNounDeriver.plural(srdce)).toBe("srdcami");
    expect(instrumentalNounDeriver.plural(more)).toBe("morami");
    expect(instrumentalNounDeriver.plural(vysvedcenie)).toBe("vysvedčeniami");
  });
});



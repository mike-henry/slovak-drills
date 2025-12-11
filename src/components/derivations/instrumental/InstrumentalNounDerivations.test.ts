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
  const zena = { sk: "žena", gender: "F" };
  const kniha = { sk: "kniha", gender: "F" };
  const chemia = { sk: "chémia", gender: "F" };
  const kost = { sk: "kosť", gender: "F" };
  const radost = { sk: "radosť", gender: "F" };

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
  const mesto = { sk: "mesto", gender: "N" };
  const auto = { sk: "auto", gender: "N" };
  const srdce = { sk: "srdce", gender: "N" };
  const more = { sk: "more", gender: "N" };
  const vysvedcenie = { sk: "vysvedčenie", gender: "N" };
  const minimum = { sk: "minimum", gender: "N" };
  const studium = { sk: "štúdium", gender: "N" };

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
  const chlap = { sk: "chlap", gender: "M", animate: true };
  const muz = { sk: "muž", gender: "M", animate: true };
  const stroj = { sk: "stroj", gender: "M", animate: false };
  const hrdina = { sk: "hrdina", gender: "M", animate: true };
  const kolega = { sk: "kolega", gender: "M", animate: true };

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
  const zena = { sk: "žena", gender: "F" };
  const kniha = { sk: "kniha", gender: "F" };
  const chemia = { sk: "chémia", gender: "F" };
  const kost = { sk: "kosť", gender: "F" };
  const vec = { sk: "vec", gender: "F" };

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
  const mesto = { sk: "mesto", gender: "N" };
  const auto = { sk: "auto", gender: "N" };
  const srdce = { sk: "srdce", gender: "N" };
  const more = { sk: "more", gender: "N" };
  const vysvedcenie = { sk: "vysvedčenie", gender: "N" };

  test("All neuters → -ami", () => {
    expect(instrumentalNounDeriver.plural(mesto).derived).toBe("mestami");
    expect(instrumentalNounDeriver.plural(auto).derived).toBe("autami");
    expect(instrumentalNounDeriver.plural(srdce).derived).toBe("srdcami");
    expect(instrumentalNounDeriver.plural(more).derived).toBe("morami");
    expect(instrumentalNounDeriver.plural(vysvedcenie).derived).toBe("vysvedčeniami");
  });
});

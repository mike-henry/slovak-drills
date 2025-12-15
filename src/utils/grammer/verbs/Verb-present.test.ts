import { describe, test, expect } from "vitest";


import { CASE_TYPE, Gender, Person } from "../WordTypes";
import Verb from "./Verb";

// ---------------------------
// Regular verbs
// ---------------------------
const regularVerbs = {
  robit: new Verb("robiť", "to do"),
  ucit: new Verb("učiť", "to teach"),
  vidiet: new Verb("vidieť", "to see"),
  telefonovat: new Verb("telefonovať", "to call"),
  zabudnut: new Verb(
    "zabudnúť",
    "to forget",
    false,
    CASE_TYPE.ACCUSATIVE,
    "zabudn"
  ),
  padnut: new Verb("padnúť", "to fall"),
  sadnutSi: new Verb("sadnúť si", "to sit down", true), // reflexive
  letnut: new Verb("letnúť", "to fly briefly"),
};

describe("Present tense — Regular verbs", () => {
  test("robiť (-ať) singular/plural", () => {
    expect(regularVerbs.robit.conjugatePresent(Person.I).derived).toBe("robím");
    expect(regularVerbs.robit.conjugatePresent(Person.YOU).derived).toBe(
      "robíš"
    );
    expect(regularVerbs.robit.conjugatePresent(Person.HE).derived).toBe("robí");
    expect(regularVerbs.robit.conjugatePresent(Person.WE).derived).toBe(
      "robíme"
    );
    expect(regularVerbs.robit.conjugatePresent(Person.YOU_PL).derived).toBe(
      "robíte"
    );
    expect(regularVerbs.robit.conjugatePresent(Person.THEY).derived).toBe(
      "robia"
    );
  });

  test("učiť (-iť) singular/plural", () => {
    expect(regularVerbs.ucit.conjugatePresent(Person.I).derived).toBe("učím");
    expect(regularVerbs.ucit.conjugatePresent(Person.THEY).derived).toBe(
      "učia"
    );
  });

  test("vidieť (-eť) singular/plural", () => {
    expect(regularVerbs.vidiet.conjugatePresent(Person.I).derived).toBe(
      "vidím"
    );
    expect(regularVerbs.vidiet.conjugatePresent(Person.THEY).derived).toBe(
      "vidia"
    );
  });

  test("telefonovať (-ovať) singular/plural", () => {
    expect(regularVerbs.telefonovat.conjugatePresent(Person.I).derived).toBe(
      "telefonujem"
    );
    expect(regularVerbs.telefonovat.conjugatePresent(Person.THEY).derived).toBe(
      "telefonujú"
    );
  });

  test("zabudnúť (-ut/-núť) singular/plural", () => {
    expect(regularVerbs.zabudnut.conjugatePresent(Person.I).derived).toBe(
      "zabudnem"
    );
    expect(regularVerbs.zabudnut.conjugatePresent(Person.THEY).derived).toBe(
      "zabudnú"
    );
  });

  test("sadnúť si (-núť reflexive) singular/plural", () => {
    expect(regularVerbs.sadnutSi.conjugatePresent(Person.I).derived).toBe(
      "sadnem si"
    );
    expect(regularVerbs.sadnutSi.conjugatePresent(Person.THEY).derived).toBe(
      "sadnú si"
    );
  });

  test("basic singular/plural forms", () => {
    expect(regularVerbs.letnut.conjugatePresent(Person.I).derived).toBe(
      "letnem"
    );

    expect(regularVerbs.letnut.conjugatePresent(Person.YOU).derived).toBe(
      "letneš"
    );

    expect(regularVerbs.letnut.conjugatePresent(Person.HE).derived).toBe(
      "letne"
    );

    expect(regularVerbs.letnut.conjugatePresent(Person.WE).derived).toBe(
      "letneme"
    );

    expect(regularVerbs.letnut.conjugatePresent(Person.YOU_PL).derived).toBe(
      "letnete"
    );

    expect(regularVerbs.letnut.conjugatePresent(Person.THEY).derived).toBe(
      "letnú"
    );
  });

  test("padnúť (-ut/-núť) singular/plural", () => {
    expect(regularVerbs.padnut.conjugatePresent(Person.I).derived).toBe(
      "padnem"
    );
    expect(regularVerbs.padnut.conjugatePresent(Person.THEY).derived).toBe(
      "padnú"
    );
  });
});

// ---------------------------
// Reflexive verbs
// ---------------------------
const reflexiveVerbs = {
  spravatSa: new Verb("správať sa", "to behave", true),
  zasluzitSi: new Verb("zaslúžiť si", "to deserve", true),
  ucitSa: new Verb("učiť sa", "to learn", true),
  rozhodnutSa: new Verb("rozhodnúť sa", "to decide", true),
  stretnutSa: new Verb("stretnúť sa", "to meet", true),
  sadnutSi: new Verb("sadnúť si", "to sit down", true),
};

describe("Present tense — Reflexive verbs", () => {
  test("správať sa", () => {
    expect(reflexiveVerbs.spravatSa.conjugatePresent(Person.I).derived).toBe(
      "správam sa"
    );
    expect(reflexiveVerbs.spravatSa.conjugatePresent(Person.THEY).derived).toBe(
      "správajú sa"
    );
  });

  test("zaslúžiť si", () => {
    expect(reflexiveVerbs.zasluzitSi.conjugatePresent(Person.I).derived).toBe(
      "zaslúžim si"
    );
    expect(
      reflexiveVerbs.zasluzitSi.conjugatePresent(Person.THEY).derived
    ).toBe("zaslúžia si");
  });

  test("učiť sa", () => {
    expect(reflexiveVerbs.ucitSa.conjugatePresent(Person.I).derived).toBe(
      "učím sa"
    );
    expect(reflexiveVerbs.ucitSa.conjugatePresent(Person.THEY).derived).toBe(
      "učia sa"
    );
  });

  test("sadnúť si", () => {
    expect(reflexiveVerbs.sadnutSi.conjugatePresent(Person.I).derived).toBe(
      "sadnem si"
    );
    expect(reflexiveVerbs.sadnutSi.conjugatePresent(Person.THEY).derived).toBe(
      "sadnú si"
    );
  });

  test("gender override", () => {
    expect(
      reflexiveVerbs.spravatSa.conjugatePresent(Person.THEY, Gender.Femenine)
        .derived
    ).toBe("správajú sa");
  });
});

// ---------------------------
// Fully irregular verbs (presentMap)
// ---------------------------
const irregularVerbs = {
  byt: new Verb("byť", "to be", false, CASE_TYPE.ACCUSATIVE, undefined, {
    [Person.I]: "som",
    [Person.YOU]: "si",
    [Person.HE]: "je",
    [Person.SHE]: "je",
    [Person.IT]: "je",
    [Person.WE]: "sme",
    [Person.YOU_PL]: "ste",
    [Person.THEY]: "sú",
  }),
  ist: new Verb(
    "ísť",
    "to go",
    false,
    CASE_TYPE.ACCUSATIVE,
    "id", // irregular stem
    {
      [Person.I]: "idem",
      [Person.YOU]: "ideš",
      [Person.THEY]: "idú",
    }
  ),
  dat: new Verb("dať", "to give", false, CASE_TYPE.ACCUSATIVE, undefined, {
    [Person.I]: "dám",
    [Person.YOU]: "dáš",
    [Person.HE]: "dá",
    [Person.WE]: "dáme",
    [Person.THEY]: "dajú",
  }),
};

describe("Present tense — Irregular verbs", () => {
  test.skip("byť", () => {
    expect(irregularVerbs.byt.conjugatePresent(Person.I).derived).toBe("som");
    expect(irregularVerbs.byt.conjugatePresent(Person.THEY).derived).toBe("sú");
  });

  test.skip("ísť", () => {
    expect(irregularVerbs.ist.conjugatePresent(Person.I).derived).toBe("idem");
    expect(irregularVerbs.ist.conjugatePresent(Person.HE).derived).toBe("ide"); // stem + ending
    expect(irregularVerbs.ist.conjugatePresent(Person.THEY).derived).toBe(
      "idú"
    );
  });

  test.skip("dať", () => {
    expect(irregularVerbs.dat.conjugatePresent(Person.I).derived).toBe("dám");
    expect(irregularVerbs.dat.conjugatePresent(Person.WE).derived).toBe("dáme");
    expect(irregularVerbs.dat.conjugatePresent(Person.THEY).derived).toBe(
      "dajú"
    );
  });
});

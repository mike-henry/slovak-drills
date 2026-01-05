import { describe, test, expect } from "vitest";


import { CASE_TYPE, Gender} from "../WordTypes";
import Verb from "./Verb";
import { Pronoun } from "../Pronoun";
import { conjugateWithPronoun } from "./VerbUtils";

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

describe("Present tense —  verbs with subject pronouns", () => {
  test("robiť (-ať) singular/plural", () => {
    expect(conjugateWithPronoun(Pronoun.I, regularVerbs.robit,Pronoun.THAT).derived).toBe("robím to");
    // expect(regularVerbs.vidiet.conjugatePresent(Pronoun.YOU).derived).toBe(
    //   "robíš"
    // );
    // expect(regularVerbs.vidiet.conjugatePresent(Pronoun.HE).derived).toBe("robí");
    // expect(regularVerbs.vidiet.conjugatePresent(Pronoun.WE).derived).toBe(
    //   "robíme"
    // );
    // expect(regularVerbs.vidiet.conjugatePresent(Pronoun.YOU_PL).derived).toBe(
    //   "robíte"
    // );
    // expect(regularVerbs.robit.conjugatePresent(Pronoun.THEY).derived).toBe(
    //   "robia"
    // );
  });

//   test("učiť (-iť) singular/plural", () => {
//     expect(regularVerbs.ucit.conjugatePresent(Pronoun.I).derived).toBe("učím");
//     expect(regularVerbs.ucit.conjugatePresent(Pronoun.THEY).derived).toBe(
//       "učia"
//     );
//   });

//   test("vidieť (-eť) singular/plural", () => {
//     expect(regularVerbs.vidiet.conjugatePresent(Pronoun.I).derived).toBe(
//       "vidím"
//     );
//     expect(regularVerbs.vidiet.conjugatePresent(Pronoun.THEY).derived).toBe(
//       "vidia"
//     );
//   });

//   test("telefonovať (-ovať) singular/plural", () => {
//     expect(regularVerbs.telefonovat.conjugatePresent(Pronoun.I).derived).toBe(
//       "telefonujem"
//     );
//     expect(regularVerbs.telefonovat.conjugatePresent(Pronoun.THEY).derived).toBe(
//       "telefonujú"
//     );
//   });

//   test("zabudnúť (-ut/-núť) singular/plural", () => {
//     expect(regularVerbs.zabudnut.conjugatePresent(Pronoun.I).derived).toBe(
//       "zabudnem"
//     );
//     expect(regularVerbs.zabudnut.conjugatePresent(Pronoun.THEY).derived).toBe(
//       "zabudnú"
//     );
//   });

//   test("sadnúť si (-núť reflexive) singular/plural", () => {
//     expect(regularVerbs.sadnutSi.conjugatePresent(Pronoun.I).derived).toBe(
//       "sadnem si"
//     );
//     expect(regularVerbs.sadnutSi.conjugatePresent(Pronoun.THEY).derived).toBe(
//       "sadnú si"
//     );
//   });

//   test("basic singular/plural forms", () => {
//     expect(regularVerbs.letnut.conjugatePresent(Pronoun.I).derived).toBe(
//       "letnem"
//     );

//     expect(regularVerbs.letnut.conjugatePresent(Pronoun.YOU).derived).toBe(
//       "letneš"
//     );

//     expect(regularVerbs.letnut.conjugatePresent(Pronoun.HE).derived).toBe(
//       "letne"
//     );

//     expect(regularVerbs.letnut.conjugatePresent(Pronoun.WE).derived).toBe(
//       "letneme"
//     );

//     expect(regularVerbs.letnut.conjugatePresent(Pronoun.YOU_PL).derived).toBe(
//       "letnete"
//     );

//     expect(regularVerbs.letnut.conjugatePresent(Pronoun.THEY).derived).toBe(
//       "letnú"
//     );
//   });

//   test("padnúť (-ut/-núť) singular/plural", () => {
//     expect(regularVerbs.padnut.conjugatePresent(Pronoun.I).derived).toBe(
//       "padnem"
//     );
//     expect(regularVerbs.padnut.conjugatePresent(Pronoun.THEY).derived).toBe(
//       "padnú"
//     );
//   });
// });

// // ---------------------------
// // Reflexive verbs
// // ---------------------------
// const reflexiveVerbs = {
//   spravatSa: new Verb("správať sa", "to behave", true),
//   zasluzitSi: new Verb("zaslúžiť si", "to deserve", true,undefined,undefined,undefined,['it-short']),
//   ucitSa: new Verb("učiť sa", "to learn", true),
//   rozhodnutSa: new Verb("rozhodnúť sa", "to decide", true),
//   stretnutSa: new Verb("stretnúť sa", "to meet", true),
//   sadnutSi: new Verb("sadnúť si", "to sit down", true),
// };

// describe("Present tense — Reflexive verbs", () => {
//   test("správať sa", () => {
//     expect(reflexiveVerbs.spravatSa.conjugatePresent(Pronoun.I).derived).toBe(
//       "správam sa"
//     );
//     expect(reflexiveVerbs.spravatSa.conjugatePresent(Pronoun.THEY).derived).toBe(
//       "správajú sa"
//     );
//   });

//   test("zaslúžiť si", () => {
//     expect(reflexiveVerbs.zasluzitSi.conjugatePresent(Pronoun.I).derived).toBe(
//       "zaslúžim si"
//     );
//     expect(
//       reflexiveVerbs.zasluzitSi.conjugatePresent(Pronoun.THEY).derived
//     ).toBe("zaslúžia si");
//   });

//   test("učiť sa", () => {
//     expect(reflexiveVerbs.ucitSa.conjugatePresent(Pronoun.I).derived).toBe(
//       "učím sa"
//     );
//     expect(reflexiveVerbs.ucitSa.conjugatePresent(Pronoun.THEY).derived).toBe(
//       "učia sa"
//     );
//   });

//   test("sadnúť si", () => {
//     expect(reflexiveVerbs.sadnutSi.conjugatePresent(Pronoun.I).derived).toBe(
//       "sadnem si"
//     );
//     expect(reflexiveVerbs.sadnutSi.conjugatePresent(Pronoun.THEY).derived).toBe(
//       "sadnú si"
//     );
//   });

//   test("gender override", () => {
//     expect(
//       reflexiveVerbs.spravatSa.conjugatePresent(Pronoun.THEY, Gender.Femenine)
//         .derived
//     ).toBe("správajú sa");
//   });
});


import { describe, test, expect } from "vitest";
import { NominativeDemonstrativeDeriver } from "./NominativeDemonstrativeDerivations";
import { Gender } from "../../WordTypes";
import  Noun  from "../Noun";



//const withGender = (gender:Gender) => return Noun

describe("Nominative Demonstrative Deriver", () => {

   const masculine :Noun = {en:"test", sk:"test", gender: Gender.Masculine }
   const femenine :Noun = {en:"test", sk:"test", gender: Gender.Femenine }
   const neutral :Noun = {en:"test", sk:"test", gender: Gender.Neutral }

  test("singular forms", () => {
    expect(NominativeDemonstrativeDeriver.singular(masculine).derived).toBe("ten");
    expect(NominativeDemonstrativeDeriver.singular( femenine).derived).toBe("tá");
    expect(NominativeDemonstrativeDeriver.singular(neutral).derived).toBe("to");
  });

  test("plural forms", () => {
    expect(NominativeDemonstrativeDeriver.plural(masculine).derived).toBe("tí");
    expect(NominativeDemonstrativeDeriver.plural(femenine).derived).toBe("tie");
    expect(NominativeDemonstrativeDeriver.plural(neutral).derived).toBe("tie");
  });
});

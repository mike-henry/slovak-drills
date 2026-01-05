import { describe, it, expect } from "vitest"
import  { PRONOUN_META, Pronoun, getPronounDeclension, getPronounForm } from "./Pronoun"
import { CASE_TYPE } from "./WordTypes"

/**
 * These  tests are obsolete !!!  PRONOUN_META will be deprecated.
 */

describe("Pronoun metadata usage", () => {

  it("provides English and Slovak display values for each pronoun", () => {
  
    expect(getPronounDeclension(Pronoun.I).en).toBe("I")
    expect(getPronounDeclension(Pronoun.I).nominative.long).toBe("ja")

    expect(getPronounDeclension(Pronoun.WE).en).toBe("we")
    expect(getPronounDeclension(Pronoun.WE).nominative.long).toBe("my")
  })

  it("contains metadata for every Pronoun enum value", () => {
    const pronouns = Object.values(Pronoun)
    for (const pronoun of pronouns) {
      expect(getPronounDeclension(pronoun)).toBeDefined()
      expect(getPronounForm(pronoun)).toBeDefined()
      expect(expect(getPronounForm(pronoun))).toEqual(getPronounForm(pronoun,CASE_TYPE.ACCUSATIVE,"short"))
    }

  })

  it("correctly identifies grammatical person and number", () => {
    const they = PRONOUN_META[Pronoun.THEY]

    expect(they.person).toBe(3)
    expect(they.number).toBe("plural")
  })

  it("demonstrates how conjugation code uses Pronoun directly", () => {
    const person: Pronoun = Pronoun.YOU_PL

    // This simulates how your conjugators work
    expect(person).toBe(Pronoun.YOU_PL)

    // UI layer uses metadata
    const display = PRONOUN_META[person]
    expect(display.sk).toBe("vy")
    expect(display.number).toBe("plural")
  })

})

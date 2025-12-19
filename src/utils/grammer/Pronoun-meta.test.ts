import { describe, it, expect } from "vitest"
import { Pronoun, PRONOUN_META } from "./WordTypes"


describe("Pronoun metadata usage", () => {

  it("provides English and Slovak display values for each pronoun", () => {
    expect(PRONOUN_META[Pronoun.I].en).toBe("I")
    expect(PRONOUN_META[Pronoun.I].sk).toBe("ja")

    expect(PRONOUN_META[Pronoun.WE].en).toBe("we")
    expect(PRONOUN_META[Pronoun.WE].sk).toBe("my")
  })

  it("contains metadata for every Pronoun enum value", () => {
    const pronouns = Object.values(Pronoun)

    for (const pronoun of pronouns) {
      expect(PRONOUN_META[pronoun]).toBeDefined()
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

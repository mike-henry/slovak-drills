import { BaseConjugator } from "./BaseConjugator";
import type Verb from "./Verb";

import DerivedWord from "../DerivedWord";
import { Pronoun } from "../Pronoun";

export default class AtConjugator extends BaseConjugator {

  constructor(verb: Verb) {
    super(verb);
  }

  deriveStem(): string {
    // Allow presentStem override
    if (this.verb.presentStem) return this.verb.presentStem;

    const base = this.getBaseInfinitive();

    // Regular -ať verbs → remove last 3 characters
    if (base.endsWith("ať")) {
      return base.slice(0, -1 );  // remove "ť"
    }

    return base;
  }

  getEnding(person: Pronoun): string {

      const hasLongVowel =() => /[áéíóúý]$/.test(this.getStem())
    const endings: Record<Pronoun, string> = {
      [Pronoun.I]:  "m" ,
      [Pronoun.YOU]:  "š",
      [Pronoun.HE]: "",
      [Pronoun.SHE]: "",
      [Pronoun.IT]: "",
      [Pronoun.WE]: "me",
      [Pronoun.YOU_PL]: "te",
      [Pronoun.THEY]: "jú",
    };

    return endings[person];
  }

  deriveConjugate(person: Pronoun): DerivedWord {
    const stem = this.getStem();
    const ending = this.getEnding(person);

    return new DerivedWord(
      stem + ending,
      `Regular -ať conjugation: stem '${stem}' + ending '${ending}'`
    );
  }
}

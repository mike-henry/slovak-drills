import { BaseConjugator } from "./BaseConjugator";
import type { Verb } from "./Verb";
import { Pronoun } from "../WordTypes";
import DerivedWord from "../DerivedWord";

export class AtConjugator extends BaseConjugator {

  constructor(verb: Verb) {
    super(verb);
  }

  deriveStem(): string {
    // Allow presentStem override
    if (this.verb.presentStem) return this.verb.presentStem;

    const base = this.getBaseInfinitive();

    // Regular -ať verbs → remove last 3 characters
    if (base.endsWith("ať")) {
      return base.slice(0, -2 );  // remove "ať"
    }

    return base;
  }

  getEnding(person: Pronoun): string {

      const hasLongVowel =() => /[áéíóúý]$/.test(this.getStem())
    const endings: Record<Pronoun, string> = {
      [Pronoun.I]: hasLongVowel() ? "ám":  "am" ,
      [Pronoun.YOU]: "áš",
      [Pronoun.HE]: "á",
      [Pronoun.SHE]: "á",
      [Pronoun.IT]: "á",
      [Pronoun.WE]: "áme",
      [Pronoun.YOU_PL]: "áte",
      [Pronoun.THEY]: "ajú",
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

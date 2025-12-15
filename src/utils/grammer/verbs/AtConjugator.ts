import { BaseConjugator } from "./BaseConjugator";
import type { Verb } from "./Verb";
import { Person } from "../WordTypes";
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

  getEnding(person: Person): string {

      const hasLongVowel =() => /[áéíóúý]$/.test(this.getStem())
    const endings: Record<Person, string> = {
      [Person.I]: hasLongVowel() ? "ám":  "am" ,
      [Person.YOU]: "áš",
      [Person.HE]: "á",
      [Person.SHE]: "á",
      [Person.IT]: "á",
      [Person.WE]: "áme",
      [Person.YOU_PL]: "áte",
      [Person.THEY]: "ajú",
    };

    return endings[person];
  }

  deriveConjugate(person: Person): DerivedWord {
    const stem = this.getStem();
    const ending = this.getEnding(person);

    return new DerivedWord(
      stem + ending,
      `Regular -ať conjugation: stem '${stem}' + ending '${ending}'`
    );
  }
}

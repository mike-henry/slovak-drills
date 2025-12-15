import DerivedWord from "../DerivedWord";
import  { Person } from "../WordTypes";
import { BaseConjugator } from "./BaseConjugator";
import type { Verb } from "./Verb";

export class NutConjugator extends BaseConjugator {
  

  constructor(verb: Verb, ) {
    super(verb);
  }

   deriveStem(): string {
    if (this.verb.presentStem) return this.verb.presentStem;
    const base = this.getBaseInfinitive();
      return base.slice(0, -2);   // fallback for -ut verbs
  }

  getEnding(person: Person): string {
    const endings: Record<Person, string> = {
      [Person.I]: "em",
      [Person.YOU]: "eš",
      [Person.HE]: "e",
      [Person.SHE]: "e",
      [Person.IT]: "e",
      [Person.WE]: "eme",
      [Person.YOU_PL]: "ete",
      [Person.THEY]: "ú",
    };
    return endings[person];
  }

  deriveConjugate(person: Person): DerivedWord {
    const stem = this.getStem();
    const ending = this.getEnding(person);
    return new DerivedWord(
      stem + ending,
      `Regular -núť/-ut conjugation: stem '${stem}' + ending '${ending}'`
    );
  }
}

import DerivedWord from "../DerivedWord";
import  { Pronoun } from "../WordTypes";
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

  getEnding(person: Pronoun): string {
    const endings: Record<Pronoun, string> = {
      [Pronoun.I]: "em",
      [Pronoun.YOU]: "eš",
      [Pronoun.HE]: "e",
      [Pronoun.SHE]: "e",
      [Pronoun.IT]: "e",
      [Pronoun.WE]: "eme",
      [Pronoun.YOU_PL]: "ete",
      [Pronoun.THEY]: "ú",
    };
    return endings[person];
  }

  deriveConjugate(person: Pronoun): DerivedWord {
    const stem = this.getStem();
    const ending = this.getEnding(person);
    return new DerivedWord(
      stem + ending,
      `Regular -núť/-ut conjugation: stem '${stem}' + ending '${ending}'`
    );
  }
}

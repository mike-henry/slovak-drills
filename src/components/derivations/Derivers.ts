import { Adjective, Noun } from "../grammer/WordTypes";

export interface NounDeriver {
  singular(noun: Noun): DerivedWord;
  plural(noun: Noun): DerivedWord;
}

export interface AdjectiveDeriver {
  singular(adjective: Adjective, noun: Noun): DerivedWord;
  plural(adjective: Adjective, noun: Noun): DerivedWord;
}

export class DerivedWord {
  readonly derived: string;
  readonly explanation: string;
  readonly documentation?: string[];

  constructor(derived: string, explanation: string, documentation?: string[]) {
    this.derived = derived;
    this.explanation = explanation;
    this.documentation = documentation ?? [];
  }
}

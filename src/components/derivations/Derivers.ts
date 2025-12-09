import {Noun} from "../grammer/WordTypes"

export interface NounDeriver {
    singular(noun:Noun):CaseDerivedNoun;
    plural(noun:Noun):CaseDerivedNoun;
}

export class CaseDerivedNoun {
  readonly derived: string;
  readonly explanation: string;
  readonly documentation?: string;

  constructor(
    derived: string,
    explanation: string,
    documentation?: string
  ) {
    this.derived = derived;
    this.explanation = explanation;
    this.documentation = documentation;
  }
}

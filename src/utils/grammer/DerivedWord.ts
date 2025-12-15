

export default class DerivedWord {
  readonly derived: string;
  readonly explanation: string;
  readonly documentation: string[];

  constructor(derived: string, explanation: string, documentation: string[] = []) {
    this.derived = derived;
    this.explanation = explanation;
    this.documentation = documentation;
  }
}



export default class DerivedWord {
  readonly derived: string;
  readonly explanation: string;
  readonly documentation: string[];

  constructor(derived: string, explanation: string, documentation: string[] = []) {
    this.derived = derived;
    this.explanation = explanation;
    this.documentation = documentation;
  }

  static combineDerivedWords(items: DerivedWord[]): DerivedWord {
    const derived = items.map(i => i.derived).join(" ");
    const explanation = items.map(i => i.explanation).join(", ");
    const documentation = items.flatMap(i => i.documentation);
    return new DerivedWord(derived, explanation, documentation);
  }

  static combineDerivedWordMap(map: Map<string, DerivedWord>): DerivedWord {
    const derivedParts: string[] = [];
    const explanationParts: string[] = [];
    const documentation: string[] = [];

    for (const [key, value] of Array.from(map.entries())) {
      derivedParts.push(value.derived);
      explanationParts.push(`${key}: ${value.explanation}`);
      documentation.push(...value.documentation);
    }

    return new DerivedWord(
      derivedParts.join(" "),
      explanationParts.join(", "),
      documentation
    );
  }

}

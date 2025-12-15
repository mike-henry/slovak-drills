import DerivedWord from "../DerivedWord";
import { Person, Gender } from "../WordTypes";
import { BaseConjugator } from "./BaseConjugator";


export class OvatConjugator extends BaseConjugator {
  deriveStem(): string {
    // Remove 'ovať' from infinitive
    return this.getBaseInfinitive().slice(0, -4);
  }

  getEnding(person: Person, gender?: Gender): string {
    const endings: Record<Person, string> = {
      [Person.I]: "ujem",
      [Person.YOU]: "uješ",
      [Person.HE]: "uje",
      [Person.SHE]: "uje",
      [Person.IT]: "uje",
      [Person.WE]: "ujeme",
      [Person.YOU_PL]: "ujete",
      [Person.THEY]: "ujú",
    };
    return endings[person];
  }

  deriveConjugate(person: Person, gender?: Gender): DerivedWord {
    const stem = this.getStem();
    const ending = this.getEnding(person);
    return new DerivedWord(
      stem + ending,
      `Regular -ovať conjugation: stem '${stem}' + ending '${ending}'`
    );
  }
}

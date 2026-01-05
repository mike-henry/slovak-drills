import DerivedWord from "../DerivedWord";
import { Pronoun } from "../Pronoun";
import {  Gender } from "../WordTypes";
import { BaseConjugator } from "./BaseConjugator";


export class OvatConjugator extends BaseConjugator {
  deriveStem(): string {
    // Remove 'ovať' from infinitive
    return this.getBaseInfinitive().slice(0, -4);
  }

  getEnding(person: Pronoun, gender?: Gender): string {
    const endings: Record<Pronoun, string> = {
      [Pronoun.I]: "ujem",
      [Pronoun.YOU]: "uješ",
      [Pronoun.HE]: "uje",
      [Pronoun.SHE]: "uje",
      [Pronoun.IT]: "uje",
      [Pronoun.WE]: "ujeme",
      [Pronoun.YOU_PL]: "ujete",
      [Pronoun.THEY]: "ujú",
    };
    return endings[person];
  }

  deriveConjugate(person: Pronoun, gender?: Gender): DerivedWord {
    const stem = this.getStem();
    const ending = this.getEnding(person);
    return new DerivedWord(
      stem + ending,
      `Regular -ovať conjugation: stem '${stem}' + ending '${ending}'`
    );
  }
}

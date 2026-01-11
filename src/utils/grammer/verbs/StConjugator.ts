import DerivedWord from '../DerivedWord';
import { Pronoun } from '../Pronoun';
import { Gender } from '../WordTypes';
import { BaseConjugator } from './BaseConjugator';

const DOCUMENTREF = 'verb://st'; // Temporary, replace with iet reference when available
export class StConjugator extends BaseConjugator {
  deriveStem(_: Pronoun): string {
    // remove -sť
    const withoutSt = this.getBaseInfinitive().slice(0, -2);

    // heuristic default: add -d
    return withoutSt + 'd';
  }

  getEnding(person: Pronoun): string {
    const endings: Record<Pronoun, string> = {
      [Pronoun.I]: 'em',
      [Pronoun.YOU]: 'eš',
      [Pronoun.HE]: 'e',
      [Pronoun.SHE]: 'e',
      [Pronoun.THAT]: 'e',
      [Pronoun.IT]: 'e',
      [Pronoun.WE]: 'eme',
      [Pronoun.YOU_PL]: 'ete',
      [Pronoun.THEY]: 'u',
    };
    return endings[person];
  }

  deriveConjugate(person: Pronoun, gender?: Gender): DerivedWord {
    const stem = this.getStem(person);
    const ending = this.getEnding(person);

    return new DerivedWord(stem + ending, `-sť conjugation (heuristic): stem '${stem}' + ending '${ending}'`, [
      DOCUMENTREF,
    ]);
  }
}

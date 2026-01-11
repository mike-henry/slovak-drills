import DerivedWord from '../DerivedWord';
import { Pronoun } from '../Pronoun';
import { Gender } from '../WordTypes';
import { BaseConjugator } from './BaseConjugator';

const DOCUMENTREF = 'verb://it'; // Temporary, replace with iet reference when available

export class ItConjugator extends BaseConjugator {
  deriveConjugate(person: Pronoun, gender?: Gender): DerivedWord {
    const stem = this.getStem(person);
    const ending = this.getEnding(person);

    return new DerivedWord(stem + ending, `Regular -iť conjugation: stem '${stem}' + ending '${ending}'`, [
      DOCUMENTREF,
    ]);
  }

  deriveStem(person: Pronoun): string {
    return person === Pronoun.THEY
      ? this.getBaseInfinitive().slice(0, -2) + 'i'
      : this.getBaseInfinitive().slice(0, -2) + 'í';
  }
  getEnding(person: Pronoun): string {
    const endings: Record<Pronoun, string> = {
      [Pronoun.I]: 'm',
      [Pronoun.YOU]: 'š',
      [Pronoun.HE]: '',
      [Pronoun.SHE]: '',
      [Pronoun.THAT]: '',
      [Pronoun.IT]: '',
      [Pronoun.WE]: 'me',
      [Pronoun.YOU_PL]: 'te',
      [Pronoun.THEY]: 'a',
    };
    return endings[person];
  }
}

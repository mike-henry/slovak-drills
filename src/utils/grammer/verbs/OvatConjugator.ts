import DerivedWord from '../DerivedWord';
import { Pronoun } from '../Pronoun';
import { Gender } from '../WordTypes';
import { BaseConjugator } from './BaseConjugator';

const DOCUMENTREF = 'verb://ovat'; // Temporary, replace with iet reference when available
export class OvatConjugator extends BaseConjugator {
  deriveStem(person: Pronoun): string {
    // Remove 'ovať' from infinitive and  use 'uj' or 'uje' to create stem
    return this.getBaseInfinitive().slice(0, -4) + (person == Pronoun.THEY ? 'uj' : 'uje');
  }

  getEnding(person: Pronoun, gender?: Gender): string {
    const endings: Record<Pronoun, string> = {
      [Pronoun.I]: 'm',
      [Pronoun.YOU]: 'š',
      [Pronoun.HE]: '',
      [Pronoun.SHE]: '',
      [Pronoun.IT]: '',
      [Pronoun.THAT]: '',
      [Pronoun.WE]: 'me',
      [Pronoun.YOU_PL]: 'te',
      [Pronoun.THEY]: 'ú',
    };
    return endings[person];
  }

  deriveConjugate(person: Pronoun, gender?: Gender): DerivedWord {
    const stem = this.getStem(person);
    const ending = this.getEnding(person);
    return new DerivedWord(stem + ending, `Regular -ovať conjugation: stem '${stem}' + ending '${ending}'`, [
      DOCUMENTREF,
    ]);
  }
}

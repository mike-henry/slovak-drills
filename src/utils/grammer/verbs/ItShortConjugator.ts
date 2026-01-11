import DerivedWord from '../DerivedWord';
import { Pronoun } from '../Pronoun';
import { Gender } from '../WordTypes';
import { BaseConjugator } from './BaseConjugator';

const DOCUMENTREF = 'verb://it-short'; // Temporary, replace with iet reference when available

export class ItShortConjugator extends BaseConjugator {
  deriveConjugate(person: Pronoun, gender?: Gender): DerivedWord {
    const stem = this.getStem(person);
    const ending = this.getEnding(person);
    console.log(`ItShortConjugator: stem='${stem}', ending='${ending}'`);
    return new DerivedWord(stem + ending, `Regular -iť conjugation: stem '${stem}' + ending '${ending}'`, [
      DOCUMENTREF,
    ]);
  }

  deriveStem(): string {
    return this.getBaseInfinitive().slice(0, -2) + 'i';
  }
  getEnding(person: Pronoun): string {
    const endings: Record<Pronoun, string> = {
      [Pronoun.I]: 'm',
      [Pronoun.YOU]: 'š',
      [Pronoun.HE]: '',
      [Pronoun.SHE]: '',
      [Pronoun.IT]: '',
      [Pronoun.THAT]: '',
      [Pronoun.WE]: 'me',
      [Pronoun.YOU_PL]: 'te',
      [Pronoun.THEY]: 'a',
    };
    return endings[person];
  }
}

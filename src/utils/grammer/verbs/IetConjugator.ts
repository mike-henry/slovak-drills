import DerivedWord from '../DerivedWord';
import { Pronoun } from '../Pronoun';
import { Gender } from '../WordTypes';
import { BaseConjugator } from './BaseConjugator';

export class IetConjugator extends BaseConjugator {
  deriveStem(person: Pronoun): string {
    // if (this.verb.presentStem) return this.verb.presentStem;
    // Regular -ieť verbs: remove 'ieť'
    const b = this.getBaseInfinitive().slice(0, -3);
    return this.getBaseInfinitive().slice(0, -3) + (person === Pronoun.THEY ? 'i' : 'í');
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
      [Pronoun.THEY]: 'a',
    };
    return endings[person];
  }

  deriveConjugate(person: Pronoun, gender?: Gender): DerivedWord {
    const stem = this.getStem(person);
    const ending = this.getEnding(person);
    return new DerivedWord(stem + ending, `Regular -ieť conjugation: stem '${stem}' + ending '${ending}'`);
  }
}

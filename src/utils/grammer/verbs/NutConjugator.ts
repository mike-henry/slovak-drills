import DerivedWord from '../DerivedWord';
import { Pronoun } from '../Pronoun';

import { BaseConjugator } from './BaseConjugator';
import Verb from './Verb';
const DOCUMENTREF = 'verb://nut'; // Temporary, replace with iet reference when available

export class NutConjugator extends BaseConjugator {
  constructor(verb: Verb) {
    super(verb);
  }

  deriveStem(person: Pronoun): string {
    const base = this.getBaseInfinitive();
    return base.slice(0, -2) + (person === Pronoun.THEY ? '' : 'e'); // fallback for -ut verbs
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
      [Pronoun.THEY]: 'ú',
    };
    return endings[person];
  }

  deriveConjugate(person: Pronoun): DerivedWord {
    const stem = this.getStem(person);
    const ending = this.getEnding(person);
    return new DerivedWord(stem + ending, `Regular -núť/-ut conjugation: stem '${stem}' + ending '${ending}'`, [
      DOCUMENTREF,
    ]);
  }
}

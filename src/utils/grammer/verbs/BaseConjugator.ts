import DerivedWord from '../DerivedWord';
import type { Pronoun } from '../Pronoun';
import type { Gender } from '../WordTypes';

import type { PresentConjugator } from './PresentConjugator';
import type Verb from './Verb';

export abstract class BaseConjugator implements PresentConjugator {
  constructor(protected verb: Verb) {}

  abstract getEnding(person: Pronoun, gender?: Gender): string;
  abstract deriveStem(person: Pronoun): string;
  getStem(person: Pronoun): string {
    // 1. Highest priority → presentStem from verb
    if (this.verb.presentStem && this.verb.presentStem.length > 0) return this.verb.presentStem;
    return this.deriveStem(person);
  }
  abstract deriveConjugate(person: Pronoun, gender?: Gender): DerivedWord;
  conjugate(person: Pronoun, gender?: Gender): DerivedWord {
    const deriveConjugation = this.deriveConjugate(person, gender);
    const aux = this.extractReflexiveParticle();
    return new DerivedWord(
      `${deriveConjugation.derived} ${aux}`.trim(),
      `${deriveConjugation.explanation}` + (aux.length > 0) ? ` plus the reflexiv aux ${aux}` : '',
    );
  }
  protected getBaseInfinitive(): string {
    const sk = this.verb.sk;
    if (!this.verb.reflexive) return sk;
    return sk.replace(/\s+(sa|si)$/, '');
  }
  protected extractReflexiveParticle(): string {
    const match = this.verb.sk.match(/\b(sa|si)\b$/);
    return match ? (match[1] as 'si' | 'sa') : '';
  }
}

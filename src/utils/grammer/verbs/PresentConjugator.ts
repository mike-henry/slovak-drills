import type DerivedWord from '../DerivedWord';
import type { Pronoun } from '../Pronoun';
import type { Gender } from '../WordTypes';

// ---------------------------
// Internal only conjugators
// ---------------------------
export interface PresentConjugator {
  getStem(person: Pronoun): string;
  getEnding(person: Pronoun, gender?: Gender): string;

  conjugate(person: Pronoun, gender?: Gender): DerivedWord;
}

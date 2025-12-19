import type DerivedWord from "../DerivedWord";
import type { Pronoun, Gender } from "../WordTypes";

// ---------------------------
// Internal only conjugators
// ---------------------------
export interface PresentConjugator {
    getStem(): string;
    getEnding(person: Pronoun, gender?: Gender): string;
    conjugate(person: Pronoun, gender?: Gender): DerivedWord;
}

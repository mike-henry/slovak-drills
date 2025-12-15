import type DerivedWord from "../DerivedWord";
import type { Person, Gender } from "../WordTypes";

// ---------------------------
// Internal only conjugators
// ---------------------------
export interface PresentConjugator {
    getStem(): string;
    getEnding(person: Person, gender?: Gender): string;
    conjugate(person: Person, gender?: Gender): DerivedWord;
}

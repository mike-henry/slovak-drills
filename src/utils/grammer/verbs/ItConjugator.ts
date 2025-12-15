import DerivedWord from "../DerivedWord";
import { Person, Gender } from "../WordTypes";
import { BaseConjugator } from "./BaseConjugator";

export class ItConjugator extends BaseConjugator {
    deriveConjugate(person: Person, gender?: Gender): DerivedWord {
        const stem = this.getStem();
        const ending = this.getEnding(person);
        return new DerivedWord(
            stem + ending,
            `Regular -iť conjugation: stem '${stem}' + ending '${ending}'`
        );
    }

    deriveStem(): string {
        return this.getBaseInfinitive().slice(0, -2);
    }
    getEnding(person: Person, gender?: Gender): string | null {
        const longEndings: Record<Person, string> = {
            [Person.I]:  "ím",
            [Person.YOU]: "íš",
            [Person.HE]: "í",
            [Person.WE]: "íme",
            [Person.YOU_PL]: "íte",
            [Person.THEY]: "ia",
            [Person.SHE]: "í",
            [Person.IT]: "í",
        };

          const shortEndings: Record<Person, string> = {
            [Person.I]:  "im",
            [Person.YOU]: "iš",
            [Person.HE]: "i",
            [Person.WE]: "ime",
            [Person.YOU_PL]: "ite",
            [Person.THEY]: "ia",
            [Person.SHE]: "i",
            [Person.IT]: "i",
        };
        
        const endings = this.hasLongVowel()?  shortEndings:  longEndings;

        return endings[person];
    }
}

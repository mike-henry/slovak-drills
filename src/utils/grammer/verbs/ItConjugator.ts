import DerivedWord from "../DerivedWord";
import { Pronoun, Gender } from "../WordTypes";
import { BaseConjugator } from "./BaseConjugator";

export class ItConjugator extends BaseConjugator {
    deriveConjugate(person: Pronoun, gender?: Gender): DerivedWord {
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
    getEnding(person: Pronoun, gender?: Gender): string | null {
        const longEndings: Record<Pronoun, string> = {
            [Pronoun.I]:  "ím",
            [Pronoun.YOU]: "íš",
            [Pronoun.HE]: "í",
            [Pronoun.WE]: "íme",
            [Pronoun.YOU_PL]: "íte",
            [Pronoun.THEY]: "ia",
            [Pronoun.SHE]: "í",
            [Pronoun.IT]: "í",
        };

          const shortEndings: Record<Pronoun, string> = {
            [Pronoun.I]:  "im",
            [Pronoun.YOU]: "iš",
            [Pronoun.HE]: "i",
            [Pronoun.WE]: "ime",
            [Pronoun.YOU_PL]: "ite",
            [Pronoun.THEY]: "ia",
            [Pronoun.SHE]: "i",
            [Pronoun.IT]: "i",
        };
        
        const endings = this.hasLongVowel()?  shortEndings:  longEndings;

        return endings[person];
    }
}

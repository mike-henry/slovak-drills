import DerivedWord from "../DerivedWord";
import { Person, Gender } from "../WordTypes";
import { BaseConjugator } from "./BaseConjugator";

export class IetConjugator extends BaseConjugator {
    deriveStem(): string {
        if (this.verb.presentStem) return this.verb.presentStem;
        // Regular -ieť verbs: remove 'ieť'
        return this.getBaseInfinitive().slice(0, -3);
    }

    getEnding(person: Person, gender?: Gender): string {
        const endings: Record<Person, string> = {
            [Person.I]: "ím",
            [Person.YOU]: "íš",
            [Person.HE]: "í",
            [Person.SHE]: "í",
            [Person.IT]: "í",
            [Person.WE]: "íme",
            [Person.YOU_PL]: "íte",
            [Person.THEY]: "ia",
        };
        return endings[person];
    }

    deriveConjugate(person: Person, gender?: Gender): DerivedWord {
        const stem = this.getStem();
        const ending = this.getEnding(person);
        return new DerivedWord(
            stem + ending,
            `Regular -ieť conjugation: stem '${stem}' + ending '${ending}'`
        );
    }
}

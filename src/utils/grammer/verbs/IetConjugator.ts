import DerivedWord from "../DerivedWord";
import  { Pronoun } from "../Pronoun";
import {  Gender } from "../WordTypes";
import { BaseConjugator } from "./BaseConjugator";

export class IetConjugator extends BaseConjugator {
    deriveStem(): string {
        if (this.verb.presentStem) return this.verb.presentStem;
        // Regular -ieť verbs: remove 'ieť'
        return this.getBaseInfinitive().slice(0, -3);
    }

    getEnding(person: Pronoun, gender?: Gender): string {
        const endings: Record<Pronoun, string> = {
            [Pronoun.I]: "ím",
            [Pronoun.YOU]: "íš",
            [Pronoun.HE]: "í",
            [Pronoun.SHE]: "í",
            [Pronoun.IT]: "í",
            [Pronoun.WE]: "íme",
            [Pronoun.YOU_PL]: "íte",
            [Pronoun.THEY]: "ia",
        };
        return endings[person];
    }

    deriveConjugate(person: Pronoun, gender?: Gender): DerivedWord {
        const stem = this.getStem();
        const ending = this.getEnding(person);
        return new DerivedWord(
            stem + ending,
            `Regular -ieť conjugation: stem '${stem}' + ending '${ending}'`
        );
    }
}

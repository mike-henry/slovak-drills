import DerivedWord from "../DerivedWord";
import { Pronoun } from "../Pronoun";
import {  Gender } from "../WordTypes";
import { BaseConjugator } from "./BaseConjugator";

export class ItShortConjugator extends BaseConjugator {
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
    getEnding(person: Pronoun): string {
        const endings: Record<Pronoun, string> = {
            [Pronoun.I]: "im",
            [Pronoun.YOU]: "iš",
            [Pronoun.HE]: "i",
            [Pronoun.SHE]: "i",
            [Pronoun.IT]: "i",
            [Pronoun.WE]: "ime",
            [Pronoun.YOU_PL]: "ite",
            [Pronoun.THEY]: "ia",
        };
        return endings[person];
    }
}

import DerivedWord from "../DerivedWord";
import type { Pronoun } from "../Pronoun";
import type {  Gender } from "../WordTypes";
import { BaseConjugator } from "./BaseConjugator";

export class IrregularConjugator extends BaseConjugator {
    deriveStem(): string  {
        return this.getBaseInfinitive(); // Use the base infinitive for irregular verbs
    }

    getEnding(person: Pronoun, gender?: Gender): string {
        return ""; // Irregular verbs have specific forms, so we return an empty string here
    }

    deriveConjugate(person: Pronoun, gender?: Gender): DerivedWord {
        const form = this.verb.presentMap[person];
        if (!form) {
            throw new Error("Invalid person or stem for irregular conjugation.");
        }
        return new DerivedWord(
            form,
            `Irregular conjugation: word '${this.verb}' + ending '${form}'`
        );
    }
}

import DerivedWord from "../DerivedWord";
import { getPronounForm, type Pronoun } from "../Pronoun";
import type Verb from "./Verb";




export function conjugateWithPronoun(pronoun: Pronoun, verb: Verb, subject: Pronoun): DerivedWord {
    let derived: string
    let explanation: string
    derived = `${verb.conjugatePresent(pronoun).derived} ${getPronounForm(subject, verb.caseType)}`
    return new DerivedWord(derived, explanation)
}
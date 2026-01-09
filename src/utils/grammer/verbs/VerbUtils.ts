import DerivedWord from "../DerivedWord";
import { getPronounDeclension, getPronounForm, type Pronoun } from "../Pronoun";
import { CASE_TYPE } from "../WordTypes";
import type Verb from "./Verb";




export function conjugateWithPronoun(object: Pronoun, verb: Verb, subject: Pronoun): DerivedWord {
    // let derived: string
    // let explanation: string
    // derived = `${verb.conjugatePresent(object).derived} ${getPronounForm(subject, verb.caseType)}`
    // explanation = `Present tense conjugation of '${verb.sk}' ('${verb.en}') for '${getPronounDeclension(subject).nominative.long}`

    return DerivedWord.combineDerivedWords([verb.conjugatePresent(object), getPronounForm(subject, verb.caseType)])
 
}
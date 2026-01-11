import DerivedWord from '../DerivedWord';
import { getPronounDeclension, getPronounForm, type Pronoun } from '../Pronoun';
import { CASE_TYPE } from '../WordTypes';
import type Verb from './Verb';

export function conjugateWithPronoun(object: Pronoun, verb: Verb, subject: Pronoun): DerivedWord {
  return DerivedWord.combineDerivedWords([verb.conjugatePresent(object), getPronounForm(subject, verb.caseType)]);
}

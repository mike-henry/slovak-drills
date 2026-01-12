import DerivedWord from '../DerivedWord';
import type Proposition from '../Proposition';
import type { CASE_TYPE } from '../WordTypes';
import type Adjective from './Adjective';
import type Noun from './Noun';

export const declinateAdjectiveWithNoun = (
  adjective: Adjective,
  noun: Noun,
  caseType: CASE_TYPE,
  plural = false,
): DerivedWord => {
  const map = new Map<string, DerivedWord>();
  map.set('for adjective', adjective.declinate(caseType, noun, plural));
  map.set('for noun', noun.declinate(caseType, plural));
  return DerivedWord.combineDerivedWordMap(map);
};

export const declinatePropositionAdjectiveWithNoun = (
  adjective: Adjective,
  noun: Noun,
  proposition: Proposition,
  plural = false,
): DerivedWord => {
  const declinated = declinateAdjectiveWithNoun(adjective, noun, proposition.caseType, plural);
  return new DerivedWord(
    `${proposition.sk} ${declinated.derived}`,
    `with ${proposition.sk} (${proposition.en}), ${declinated.explanation}`,
    declinated.documentation,
  );
};

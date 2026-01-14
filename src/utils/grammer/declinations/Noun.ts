import { WORD, Gender, CASE_TYPE } from '@/utils/grammer/WordTypes';
import type DerivedWord from '../DerivedWord';
import { LocativeNounDeriver } from './locative/LocativeNounDerivations';
import { AccusativeNounDeclinator } from './accusative/AccusativeNounDeclinator';
import { InstrumentalNounDeriver } from './instrumental/InstrumentalNounDerivations';
import { NominativeNounDeclinator } from './nominative/NominativeNounDeclinator';
import { deriveVocalStem } from './NounUtils';

const DeclinatorsByCase: Record<CASE_TYPE, NounDeclinator> = {
  [CASE_TYPE.LOCATIVE]: LocativeNounDeriver,
  [CASE_TYPE.ACCUSATIVE]: AccusativeNounDeclinator,
  [CASE_TYPE.NOMINATIVE]: NominativeNounDeclinator,
  [CASE_TYPE.INSTRUMENTAL]: InstrumentalNounDeriver,
  [CASE_TYPE.GENITIVE]: undefined,
  [CASE_TYPE.DATIVE]: undefined,
  [CASE_TYPE.VOCATIVE]: undefined,
};

export default class Noun extends WORD {
  gender: Gender;
  animate?: boolean;
  plural?: boolean;
  stem?: string;

  private constructor(sk: string, gender: Gender, animate?: boolean, plural?: boolean, en = '', stem?: string) {
    super();
    this.sk = sk;
    this.en = en;
    this.gender = gender;
    this.animate = animate;
    this.plural = plural;
    this.stem = stem;
  }

  declinate(caseType: CASE_TYPE, plural = false): DerivedWord {
    const declinator = DeclinatorsByCase[caseType];
    if (!declinator) throw new Error(`Noun declinator for case ${caseType} not implemented yet ${declinator}`);
    return plural ? declinator.plural(this) : declinator.singular(this);
  }

  getStem(): string {
    if (this.stem) return this.stem; // highest priority
    return deriveVocalStem(this); // fallback to utils
  }

  static fromRaw(params: {
    sk: string;
    en: string;
    gender: Gender;
    animate?: boolean;
    plural?: boolean;
    stem?: string;
  }): Noun {
    return new Noun(params.sk, params.gender, params.animate, params.plural, params.en, params.stem);
  }
}

export interface NounDeclinator {
  singular(noun: Noun): DerivedWord;
  plural(noun: Noun): DerivedWord;
}

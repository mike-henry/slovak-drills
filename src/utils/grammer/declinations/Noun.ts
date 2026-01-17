import { WORD, Gender, CASE_TYPE } from '@/utils/grammer/WordTypes';
import type DerivedWord from '../DerivedWord';
import { LocativeNounDeriver } from './locative/LocativeNounDerivations';
import { AccusativeNounDeclinator } from './accusative/AccusativeNounDeclinator';
import { InstrumentalNounDeriver } from './instrumental/InstrumentalNounDerivations';
import { NominativeNounDeclinator } from './nominative/NominativeNounDeclinator';
import { deriveNounStem } from './NounUtils';

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
  singularForm?: string;

  private constructor(
    sk: string,
    gender: Gender,
    animate?: boolean,
    plural?: boolean,
    en = '',
    stem?: string,
    singularForm?: string,
  ) {
    super();
    this.sk = sk;
    this.en = en;
    this.gender = gender;
    this.animate = animate;
    this.plural = plural;
    this.stem = stem;
    this.singularForm = singularForm;
  }

  declinate(caseType: CASE_TYPE, plural = false): DerivedWord {
    const declinator = DeclinatorsByCase[caseType];
    if (!declinator) throw new Error(`Noun declinator for case ${caseType} not implemented yet ${declinator}`);
    return plural ? declinator.plural(this) : declinator.singular(this);
  }

  getStem(): string {
    return deriveNounStem(this); // fallback to utils
  }

  createSingular(): Noun {
    if (!this.singularForm) throw new Error('singular form not present');
    if (!this.plural) throw new Error('singular form only possible for plural form nouns');
    return new Noun(this.singularForm, this.gender, this.animate, this.plural, this.en, this.stem);
  }

  static fromRaw(params: {
    sk: string;
    en: string;
    gender: Gender;
    animate?: boolean;
    plural?: boolean;
    stem?: string;
    singularForm?: string;
  }): Noun {
    return new Noun(
      params.sk,
      params.gender,
      params.animate,
      params.plural,
      params.en,
      params.stem,
      params.singularForm,
    );
  }
}

export interface NounDeclinator {
  singular(noun: Noun): DerivedWord;
  plural(noun: Noun): DerivedWord;
}

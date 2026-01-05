import { WORD, Gender, CASE_TYPE } from "@/utils/grammer/WordTypes";
import type DerivedWord from "../DerivedWord";
import { LocativeNounDeriver } from "./locative/LocativeNounDerivations";
import { AccusativeNounDeclinator } from "./accusative/AccusativeNounDeclinator";
import { InstrumentalNounDeriver } from "./instrumental/InstrumentalNounDerivations";
import { NominativeNounDeclinator } from "./nominative/NominativeNounDeclinator";


const DeclinatorsByCase: Record<CASE_TYPE, NounDeclinator> = {
  [CASE_TYPE.LOCATIVE]: LocativeNounDeriver,
  [CASE_TYPE.ACCUSATIVE]: AccusativeNounDeclinator,
  [CASE_TYPE.NOMINATIVE]: NominativeNounDeclinator,
  [CASE_TYPE.INSTRUMENTAL]: InstrumentalNounDeriver,
  [CASE_TYPE.GENITIVE]: undefined,
  [CASE_TYPE.DATIVE]: undefined,
  [CASE_TYPE.VOCATIVE]: undefined
}



export default class Noun extends WORD {
  gender: Gender;
  animate?: boolean;
  plural?: boolean;

  private constructor(
    sk: string,
    gender: Gender,
    animate?: boolean,
    plural?: boolean,
    en = ""
  ) {
    super();
    this.sk = sk;
    this.en = en;
    this.gender = gender;
    this.animate = animate;
    this.plural = plural;
  }

  declinate(caseType: CASE_TYPE, plural = false): DerivedWord {
    const declinator = DeclinatorsByCase[caseType];
    if (!declinator) throw new Error(`Noun declinator for case ${caseType} not implemented yet ${declinator}`);
    return plural ? declinator.plural(this) : declinator.singular(this)
  }

  static fromRaw(params: {
    sk: string;
    en: string;
    gender: Gender;
    animate?: boolean;
    plural?: boolean;
  }): Noun {
    return new Noun(
      params.sk,
      params.gender,
      params.animate,
      params.plural,
      params.en
    );
  }
}

export interface NounDeclinator {
  singular(noun: Noun): DerivedWord;
  plural(noun: Noun): DerivedWord;
}

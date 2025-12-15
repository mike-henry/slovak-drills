import { CASE_TYPE, WORD } from "../WordTypes";
import type DerivedWord from "../DerivedWord";
import type Noun from "./Noun";
import { AccusativeAdjectiveDeriver } from "./accusative/AccusativeAdjectiveDerivations";
import { InstrumentalAdjectiveDeriver } from "./instrumental/InstrumentalAdjectiveDerivations";
import { LocativeAdjectiveDeriver } from "./locative/LocativeAdjectiveDerivations";
import { NominativeAdjectiveDeriver } from "./nominative/NominativeAdjectiveDerivations";

const DeclinatorsByCase: Record<CASE_TYPE, AdjectiveDeclinator> = {
  [CASE_TYPE.LOCATIVE]: LocativeAdjectiveDeriver,
  [CASE_TYPE.ACCUSATIVE]: AccusativeAdjectiveDeriver,
  [CASE_TYPE.NOMINATIVE]: NominativeAdjectiveDeriver,
  [CASE_TYPE.INSTRUMENTAL]: InstrumentalAdjectiveDeriver,
  [CASE_TYPE.GENITIVE]: undefined,
  [CASE_TYPE.DATIVE]: undefined,
  [CASE_TYPE.VOCATIVE]: undefined
}

export default class Adjective extends WORD {

  private constructor(
    sk: string,
    en: string
  ) {
    super();
    this.sk = sk;
    this.en = en;
  }

  static fromRaw(params: {
    sk: string;
    en: string;

  }): Adjective {
    return new Adjective(
      params.sk,
      params.en
    );
  }

  declinate(caseType: CASE_TYPE, noun: Noun, plural = false): DerivedWord {
    const declinator = DeclinatorsByCase[caseType];
    if (!declinator) throw new Error(`Noun declinator for case ${caseType} not implemented yet`);
    return plural ? declinator.plural(this, noun) : declinator.singular(this, noun)
  }
}

export interface AdjectiveDeclinator {
  singular(adjective: Adjective, noun: Noun): DerivedWord;
  plural(adjective: Adjective, noun: Noun): DerivedWord;
}

import DerivedWord from "../DerivedWord";
import { WORD, CASE_TYPE, Gender, Pronoun } from "../WordTypes";
import { AtConjugator } from "./AtConjugator";
import { IetConjugator } from "./IetConjugator";
import { IrregularConjugator } from "./IrregularConjugator";
import { ItConjugator } from "./ItConjugator";
import { NutConjugator } from "./NutConjugator";
import { OvatConjugator } from "./OvatConjugator";
import type { PresentConjugator } from "./PresentConjugator";

export default class Verb extends WORD {
  reflexive: boolean;
  presentStem?: string;
  presentMap?: Partial<Record<Pronoun, string>>;
  caseType: CASE_TYPE;
  constructor(
    sk: string,
    en: string,
    reflexive: boolean = false,
    caseType: CASE_TYPE = CASE_TYPE.ACCUSATIVE,
    presentStem?: string,
    presentMap?: Partial<Record<Pronoun, string>>
  ) {
    super();
    this.sk = sk;
    this.en = en;
    this.reflexive = reflexive;
    this.caseType = caseType;
    this.presentStem = presentStem;
    this.presentMap = presentMap;
  }

  static fromRaw(params: {
    sk: string;
    en: string;
    reflexive?: boolean;
    caseType: CASE_TYPE;
    presentStem?: string,
    presentMap?: Partial<Record<Pronoun, string>>
  }): Verb {
    const defaultReflexive = params.reflexive || params.sk.endsWith(" sa") || params.sk.endsWith(" si") ? true : false
    return new Verb(
      params.sk,
      params.en,
      defaultReflexive,
      params.caseType,
      params.presentStem,
      params.presentMap
    );
  }

  conjugatePresent(person: Pronoun, gender?: Gender): DerivedWord {
    const presentConjugator = this.getConjugator(person);
    return presentConjugator.conjugate(person, gender);
  }

  private getConjugator(person: Pronoun): PresentConjugator {
    const base = this.removeAuxillary();
    if (this.presentMap && this.presentMap[person]) return new IrregularConjugator(this);
    else if (base.endsWith("ieť")) return new IetConjugator(this);
    else if (base.endsWith("ovať")) return new OvatConjugator(this);
    else if (base.endsWith("núť")) return new NutConjugator(this);
    else if (base.endsWith("ut")) return new NutConjugator(this);
    else if (base.endsWith("ať")) return new AtConjugator(this);
    else if (base.endsWith("iť")) return new ItConjugator(this);

    return new ItConjugator(this);
  }
  private removeAuxillary() {
    return this.sk.replace(/\s+(sa|si)$/, "");
  }
}

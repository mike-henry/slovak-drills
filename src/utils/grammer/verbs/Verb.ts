import DerivedWord from "../DerivedWord";
import { Pronoun } from "../Pronoun";
import { WORD, CASE_TYPE, Gender } from "../WordTypes";
import AtConjugator from "./AtConjugator";
import { IetConjugator } from "./IetConjugator";
import { IrregularConjugator } from "./IrregularConjugator";
import { ItConjugator } from "./ItConjugator";
import { ItShortConjugator } from "./ItShortConjugator";
import { NutConjugator } from "./NutConjugator";
import { OvatConjugator } from "./OvatConjugator";
import type { PresentConjugator } from "./PresentConjugator";

export default class Verb extends WORD {
  reflexive: boolean;
  presentStem?: string;
  labels: string[];
  presentMap?: Partial<Record<Pronoun, string>>;
  caseType: CASE_TYPE;
  constructor(
    sk: string,
    en: string,
    reflexive: boolean = false,
    caseType: CASE_TYPE = CASE_TYPE.ACCUSATIVE,
    presentStem?: string,
    presentMap?: Partial<Record<Pronoun, string>>,
    labels?: string[]
  ) {
    super();
    this.sk = sk;
    this.en = en;
    this.reflexive = reflexive;
    this.caseType = caseType;
    this.presentStem = presentStem;
    this.presentMap = presentMap;
    this.labels = labels ? labels : []
  }

  static fromRaw(params: {
    sk: string;
    en: string;
    reflexive?: boolean;
    caseType: CASE_TYPE;
    presentStem?: string,
    presentMap?: Partial<Record<Pronoun, string>>,
    labels?: string[]
  }): Verb {
    const defaultReflexive = params.reflexive || params.sk.endsWith(" sa") || params.sk.endsWith(" si") ? true : false
    return new Verb(
      params.sk,
      params.en,
      defaultReflexive,
      params.caseType,
      params.presentStem,
      params.presentMap,
      params.labels
    );
  }

  conjugatePresent(person: Pronoun, gender?: Gender): DerivedWord {
    const presentConjugator = this.getConjugator(person);
    return presentConjugator.conjugate(person, gender);
  }

  private getConjugator(person: Pronoun): PresentConjugator {
    const baseInfinative = this.removeAuxillary();

    switch (this.getVerbClass()) {
      case "at": return new AtConjugator(this);
      case "it-long": return new ItConjugator(this);
      case "it-short": return new ItShortConjugator(this);
      case "iet": return new IetConjugator(this);
      case "ovat": return new OvatConjugator(this);
      case "nut": return new NutConjugator(this);
      case "irregular": return new IrregularConjugator(this);
      default: return new IrregularConjugator(this);
    }
  }
  private removeAuxillary() {
    return this.sk.replace(/\s+(sa|si)$/, "");
  }

  private inferDefaultClass(infinitive: string): string {
    if (infinitive.endsWith("ať") && !infinitive.endsWith("ovať")) return "at";
    if (infinitive.endsWith("ovať")) return "ovat";
    if (infinitive.endsWith("núť") || infinitive.endsWith("uť")) return "nut";
    if (infinitive.endsWith("ieť")) return "iet";
    if (infinitive.endsWith("iť")) return "it-long"; // default
    return "irregular"; // fallback
  }

  private getVerbClass(): string {
    const baseInfinative = this.removeAuxillary();
    const verbClass = this.inferDefaultClass(baseInfinative)
    if (!this.labels) return verbClass;
    if (this.labels.includes("it-short")) return "it-short";
    if (this.labels.includes("irregular")) return "irregular";
    if (this.labels.includes("at")) return "at";
    if (this.labels.includes("iet")) return "iet";
    if (this.labels.includes("ovat")) return "ovat";
    if (this.labels.includes("nut")) return "nut";
    return verbClass;
  }



}

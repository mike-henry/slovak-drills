export class WORD {
  sk: string;
  en: string;
}

export enum Gender {
  Masculine = "M",
  Femenine = "F",
  Neutral = "N",
}

export enum CASE_TYPE {
  NOMINATIVE = "nominative",
  GENITIVE = "genitive",
  DATIVE = "dative",
  ACCUSATIVE = "accusative",
  INSTRUMENTAL = "instrumental",
  LOCATIVE = "locative",
  VOCATIVE = "vocative",
}

export enum Pronoun {
  I = "I",
  YOU = "YOU",
  HE = "HE",
  SHE = "SHE",
  IT = "IT",
  WE = "WE",
  YOU_PL = "YOU_PL",
  THEY = "THEY"
}


export interface PronounMeta {
  en: string
  sk: string
  person: 1 | 2 | 3
  number: "singular" | "plural"
}

export const PRONOUN_META: Record<Pronoun, PronounMeta> = {
  [Pronoun.I]: {
    en: "I",
    sk: "ja",
    person: 1,
    number: "singular",
  },
  [Pronoun.YOU]: {
    en: "you",
    sk: "ty",
    person: 2,
    number: "singular",
  },
  [Pronoun.HE]: {
    en: "he",
    sk: "on",
    person: 3,
    number: "singular",
  },
  [Pronoun.SHE]: {
    en: "she",
    sk: "ona",
    person: 3,
    number: "singular",
  },
  [Pronoun.IT]: {
    en: "it",
    sk: "ono",
    person: 3,
    number: "singular",
  },
  [Pronoun.WE]: {
    en: "we",
    sk: "my",
    person: 1,
    number: "plural",
  },
  [Pronoun.YOU_PL]: {
    en: "you*",
    sk: "vy",
    person: 2,
    number: "plural",
  },
  [Pronoun.THEY]: {
    en: "they",
    sk: "oni",
    person: 3,
    number: "plural",
  },
}

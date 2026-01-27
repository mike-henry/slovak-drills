import { WORD, Gender, CASE_TYPE } from '@/utils/grammer/WordTypes';
import type DerivedWord from '../DerivedWord';
import { LocativeNounDeriver } from './locative/LocativeNounDerivations';
import { AccusativeNounDeclinator } from './accusative/AccusativeNounDeclinator';
import { InstrumentalNounDeriver } from './instrumental/InstrumentalNounDerivations';
import { NominativeNounDeclinator } from './nominative/NominativeNounDeclinator';
import { deriveNounStem } from './NounUtils';
import { bus } from '@/events/bus.js';

import { loadWords } from '../LoadingUtil';

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
  labels: string[];
  static allLabels: Set<string> = new Set();
  static nouns: Noun[] = [];

  private constructor(
    sk: string,
    gender: Gender,
    animate?: boolean,
    plural?: boolean,
    en = '',
    stem?: string,
    singularForm?: string,
    labels?: string[],
  ) {
    super();
    this.sk = sk;
    this.en = en;
    this.gender = gender;
    this.animate = animate;
    this.plural = plural;
    this.stem = stem;
    this.singularForm = singularForm;
    this.labels = labels ? labels : [];
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

  static getLabels(): string[] {
    return Noun.allLabels.values().toArray().sort();
  }

  static getRandom = (): Noun => {
    while (!LOADED) {
      /* wait */
    } // no better way for now

    const filterFn: (item: Noun) => boolean =
      nounFilter.length == 0 ? (n) => true : (item: Noun) => nounFilter.some((label) => item.labels.includes(label));

    const shuffled = shuffleArray(Noun.nouns).filter(filterFn);
    return shuffled[Math.floor(Math.random() * shuffled.length)];
  };

  static fromRaw(params: {
    sk: string;
    en: string;
    gender: Gender;
    animate?: boolean;
    plural?: boolean;
    stem?: string;
    singularForm?: string;
    labels?: string[];
  }): Noun {
    params.labels?.forEach((value) => Noun.allLabels.add(value));
    return new Noun(
      params.sk,
      params.gender,
      params.animate,
      params.plural,
      params.en,
      params.stem,
      params.singularForm,
      params.labels,
    );
  }
}

let nounFilter: string[] = [];
bus.on('noun-active-labels-updated', (labels) => {
  nounFilter = labels;
});

export interface NounDeclinator {
  singular(noun: Noun): DerivedWord;
  plural(noun: Noun): DerivedWord;
}

function shuffleArray<T>(array: readonly T[]): T[] {
  const a = array.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* --------------------------------------------
   Default fallback nouns with accusative forms
   -------------------------------------------- */
const DEFAULT_NOUNS: Noun[] = [
  Noun.fromRaw({
    sk: 'žena',
    en: 'woman',
    gender: Gender.Femenine,
  }),
  Noun.fromRaw({
    sk: 'chlap',
    en: 'man',
    gender: Gender.Masculine,
  }),
  Noun.fromRaw({
    sk: 'auto',
    en: 'car',
    gender: Gender.Neutral,
  }),
  Noun.fromRaw({
    sk: 'pes',
    en: 'dog',
    gender: Gender.Masculine,
  }),
  Noun.fromRaw({
    sk: 'mačka',
    en: 'cat',
    gender: Gender.Femenine,
  }),
  Noun.fromRaw({
    sk: 'strom',
    en: 'tree',
    gender: Gender.Masculine,
  }),
  Noun.fromRaw({
    sk: 'mesto',
    en: 'city',
    gender: Gender.Neutral,
  }),
  Noun.fromRaw({
    sk: 'dieťa',
    en: 'child',
    gender: Gender.Neutral,
  }),
  Noun.fromRaw({
    sk: 'muž',
    en: 'man (adult male)',
    gender: Gender.Masculine,
  }),
  Noun.fromRaw({
    sk: 'učiteľ',
    en: 'teacher',
    gender: Gender.Masculine,
  }),
  Noun.fromRaw({
    sk: 'stôl',
    en: 'table',
    gender: Gender.Masculine,
  }),
  Noun.fromRaw({
    sk: 'mama',
    en: 'mother',
    gender: Gender.Femenine,
  }),
  Noun.fromRaw({
    sk: 'sestra',
    en: 'sister',
    gender: Gender.Femenine,
  }),
  Noun.fromRaw({
    sk: 'chlapec',
    en: 'boy',
    gender: Gender.Masculine,
  }),
  Noun.fromRaw({
    sk: 'kniha',
    en: 'book',
    gender: Gender.Femenine,
  }),
  Noun.fromRaw({
    sk: 'okno',
    en: 'window',
    gender: Gender.Neutral,
  }),
  Noun.fromRaw({
    sk: 'list',
    en: 'letter',
    gender: Gender.Masculine,
  }),
  Noun.fromRaw({
    sk: 'vlak',
    en: 'train',
    gender: Gender.Masculine,
  }),
  Noun.fromRaw({
    sk: 'ruka',
    en: 'hand',
    gender: Gender.Femenine,
  }),
  Noun.fromRaw({
    sk: 'hlava',
    en: 'head',
    gender: Gender.Femenine,
  }),
];
const NOUNS = 'slovak-nouns-A1.json';

let LOADED = false;
loadWords(NOUNS, Noun.nouns, DEFAULT_NOUNS, Noun.fromRaw).then((result) => {
  LOADED = true;
  Noun.nouns = result;
  bus.emit('noun-all-labels-updated', Noun.getLabels());
  console.info(`✅ Nouns loaded: ${Noun.nouns.length}`);
});

import { CASE_TYPE, WORD } from '../WordTypes';
import type DerivedWord from '../DerivedWord';
import type Noun from './Noun';
import { AccusativeAdjectiveDeriver } from './accusative/AccusativeAdjectiveDerivations';
import { InstrumentalAdjectiveDeriver } from './instrumental/InstrumentalAdjectiveDerivations';
import { LocativeAdjectiveDeriver } from './locative/LocativeAdjectiveDerivations';
import { NominativeAdjectiveDeriver } from './nominative/NominativeAdjectiveDerivations';
import { loadWords } from '../LoadingUtil';
import { bus } from '@/events/bus';

const DeclinatorsByCase: Record<CASE_TYPE, AdjectiveDeclinator> = {
  [CASE_TYPE.LOCATIVE]: LocativeAdjectiveDeriver,
  [CASE_TYPE.ACCUSATIVE]: AccusativeAdjectiveDeriver,
  [CASE_TYPE.NOMINATIVE]: NominativeAdjectiveDeriver,
  [CASE_TYPE.INSTRUMENTAL]: InstrumentalAdjectiveDeriver,
  [CASE_TYPE.GENITIVE]: undefined,
  [CASE_TYPE.DATIVE]: undefined,
  [CASE_TYPE.VOCATIVE]: undefined,
};

export default class Adjective extends WORD {
  private constructor(sk: string, en: string, labels?: string[]) {
    super();
    this.sk = sk;
    this.en = en;
    this.labels = labels ? labels : [];
  }

  static allLabels: Set<string> = new Set();
  static adjectives: Adjective[] = [];
  static fromRaw(params: { sk: string; en: string; labels?: string[] }): Adjective {
    return new Adjective(params.sk, params.en, params.labels ? params.labels : []);
  }
  static getLabels(): string[] {
    return Adjective.allLabels.values().toArray().sort();
  }
  static getRandom = (): Adjective => {
    while (!LOADED) {
      /* wait */
    } // no better way for now

    const filterFn: (item: Adjective) => boolean =
      filter.length == 0 ? (n) => true : (item: Adjective) => filter.some((label) => item.labels.includes(label));
    return WORD.getRandomWord<Adjective>(Adjective.adjectives, filterFn);
  };

  declinate(caseType: CASE_TYPE, noun: Noun, plural = false): DerivedWord {
    if (noun.plural) return this.declinate(caseType, noun.createSingular(), true);
    const declinator = DeclinatorsByCase[caseType];
    if (!declinator) throw new Error(`Noun declinator for case ${caseType} not implemented yet`);
    return plural ? declinator.plural(this, noun) : declinator.singular(this, noun);
  }
}

export interface AdjectiveDeclinator {
  singular(adjective: Adjective, noun: Noun): DerivedWord;
  plural(adjective: Adjective, noun: Noun): DerivedWord;
}

const ADJECTIVES = 'slovak-adjectives-A1.json';
const DEFAULT_ADJECTIVES: Adjective[] = [
  Adjective.fromRaw({ sk: 'dobrý', en: 'good' }),
  Adjective.fromRaw({ sk: 'nový', en: 'new' }),
];
let filter: string[] = [];
let LOADED = false;

bus.on('adjective-active-labels-updated', (labels) => {
  filter = labels;
});
loadWords(ADJECTIVES, Adjective.adjectives, DEFAULT_ADJECTIVES, Adjective.fromRaw).then((result) => {
  LOADED = true;
  Adjective.adjectives = result;
  bus.emit('adjective-all-labels-updated', Adjective.getLabels());
  console.info(`✅ Adjectives loaded: ${Adjective.adjectives.length} from ${ADJECTIVES}`);
});
